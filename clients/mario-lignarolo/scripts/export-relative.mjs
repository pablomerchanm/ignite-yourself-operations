// Hace relativas las rutas absolutas de la exportación estática (`out/`),
// para que el sitio funcione servido desde una subcarpeta (GitHub Pages,
// vistas previas). Uso: node scripts/export-relative.mjs out
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const root = process.argv[2] ?? "out";

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

// Prefijo relativo desde el archivo hasta la raíz de `out/` ("" o "../").
const toRoot = (file) => {
  const r = relative(dirname(file), root);
  return r ? r + "/" : "";
};

const ROOTS = ["_next/", "mario/", "links/", "og.jpg"];
let changed = 0;

for (const file of walk(root)) {
  if (!/\.(html|js|css)$/.test(file)) continue;
  const prefix = toRoot(file);
  let s = readFileSync(file, "utf8");
  const before = s;
  if (file.endsWith(".js")) {
    // Carga de chunks en cliente: Next usa "/_next/" como base. Se resuelve
    // contra la página (index.html, en la raíz), no contra el archivo JS.
    s = s.replace(/"\/_next\/"/g, '"_next/"');
  } else {
    for (const r of ROOTS) {
      // Tras comilla, paréntesis (url()) o comilla escapada en el payload de React.
      s = s.replace(new RegExp(`(?<=["'(]|\\\\")/${r.replace(".", "\\.")}`, "g"), `${prefix}${r}`);
    }
  }
  if (s !== before) {
    writeFileSync(file, s);
    changed++;
  }
}
console.log(`export-relative: ${changed} archivos ajustados en ${root}/`);
