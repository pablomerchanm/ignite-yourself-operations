// Genera los scripts de use_figma a partir de las medidas (d.json, m.json).
//   node gen.mjs setup               → out/setup.js
//   node gen.mjs sections ids.json   → out/<vp>-<n>.js (uno por sección) + out/images.json
import fs from "node:fs";

const PUB = "/home/user/ignite-yourself-operations/clients/mario-lignarolo/public";
const LOGO_TS = "/home/user/ignite-yourself-operations/clients/mario-lignarolo/app/v3/logo-path.ts";
const EMBLEM_TS = "/home/user/ignite-yourself-operations/clients/mario-lignarolo/app/v3/hds-emblem-path.ts";
const VP = {
  d: { file: "d.json", label: "Escritorio", w: 1440, h: 900, cols: 12, gutter: 30, margin: 54 },
  m: { file: "m.json", label: "Móvil", w: 390, h: 844, cols: 4, gutter: 16, margin: 24 },
};
fs.mkdirSync("out", { recursive: true });

/* ── Tokens de la web (v3.module.css) ── */
const hex = (h) => ({ r: parseInt(h.slice(1, 3), 16) / 255, g: parseInt(h.slice(3, 5), 16) / 255, b: parseInt(h.slice(5, 7), 16) / 255 });
const TOKENS = {
  "papel": "#f5f4f0", "tinta": "#111214", "negro": "#0e0f12", "negro-2": "#0a0b0d", "carbón": "#2b2e34", "piedra": "#6f7177",
  "sobre-negro": "#f2f0eb", "sobre-negro/lectura": "#d6d4ce", "sobre-negro/suave": "#96999f", "estudio/suelo": "#e5e5e4", "estudio/techo": "#c7c7c7", "foto/fondo": "#e8e6e1",
};
const tokenFor = (c) => {
  if (!c || c.a < 0.99) return null;
  for (const [k, v] of Object.entries(TOKENS)) {
    const t = hex(v);
    if (Math.abs(t.r - c.r) < 0.006 && Math.abs(t.g - c.g) < 0.006 && Math.abs(t.b - c.b) < 0.006) return k;
  }
  return null;
};

/* ── Fuentes ── */
const fontOf = (st) => {
  const w = st.weight;
  if (/archivo/i.test(st.family)) {
    if (st.stretch === "125%") return { family: "Archivo", style: w >= 800 ? "ExtraBold" : w >= 700 ? "Bold" : "SemiBold" };
    // la condensada de la web (wdth 66) no se puede fijar por API: Archivo Narrow
    return { family: "Archivo Narrow", style: w >= 700 ? "Bold" : w >= 600 ? "SemiBold" : w >= 500 ? "Medium" : "Regular" };
  }
  if (/cormorant/i.test(st.family)) {
    const base = w >= 700 ? "Bold" : w >= 600 ? "SemiBold" : w >= 500 ? "Medium" : w >= 400 ? "Regular" : "Light";
    return { family: "Cormorant Garamond", style: st.italic ? (base === "Regular" ? "Italic" : `${base} Italic`) : base };
  }
  const gw = { 100: "Thin", 200: "ExtraLight", 300: "Light", 400: "Regular", 450: "Regular", 500: "Medium", 600: "SemiBold", 700: "Bold", 800: "ExtraBold", 900: "Black" };
  return { family: "Geist", style: gw[Math.round(w / 50) * 50] || gw[Math.round(w / 100) * 100] || "Regular" };
};

/* ── Roles: nombres de los estilos de texto ── */
const ROLE = {
  heroStatement: "Portada", statement: "Golpe", hdsMast: "Hipertrofia del Ser", bannerPhrase: "Banner", quiet: "Voz", lectura: "Lectura",
  scrubText: "Manifiesto", aboutText: "About", tag: "Etiqueta", cardTitle: "Entrada", reelTitle: "Reel", talkTitle: "Conversación",
  talkRowTitle: "Conversación/lista", lgMark: "Lignarolo", contactLead: "Para", small: "Dato", link: "Enlace", aboutLink: "Enlace versal",
  btn: "Botón", navContact: "Menú", button: "Botón formulario", conceptIndex: "Índice", subLegal: "Legal", legal: "Legal", pendingNote: "Nota",
  placeholder: "Campo", span: "Dato medio",
};
const sigOf = (st) => [fontOf(st).family, fontOf(st).style, +st.size.toFixed(2), st.lh ? +st.lh.toFixed(2) : "auto", +st.ls.toFixed(2), st.transform].join("|");
function roleOf(n) {
  const st = n.style;
  if (n.name === "li") return /archivo/i.test(st.family) ? "Golpe" : /cormorant/i.test(st.family) ? "Concepto" : "Menú";
  if (n.name === "statement" && st.size < 26) return "Pregunta";
  if (n.name === "bannerPhrase") return st.size > 50 ? "Banner grande" : "Banner";
  return ROLE[n.name] || "Texto";
}
function buildStyles() {
  const styles = new Map(); // sig|vp → {name, font, size, lh, ls, upper}
  for (const [vp, cfg] of Object.entries(VP)) {
    for (const s of JSON.parse(fs.readFileSync(cfg.file))) for (const n of s.nodes) if (n.kind === "text") {
      const key = vp + "|" + sigOf(n.style);
      if (styles.has(key)) continue;
      styles.set(key, { vp, role: roleOf(n), font: fontOf(n.style), size: +n.style.size.toFixed(2), lh: n.style.lh ? +n.style.lh.toFixed(2) : null, ls: +n.style.ls.toFixed(3), upper: n.style.transform === "uppercase" });
    }
  }
  // nombres únicos por punto de corte
  const seen = new Map();
  for (const st of styles.values()) {
    const base = `${VP[st.vp].label}/${st.role}`;
    const k = seen.get(base) || 0;
    seen.set(base, k + 1);
    st.name = k ? `${base} ${Math.round(st.size)}` : base;
  }
  return styles;
}

/* ── Degradados CSS → pinturas de Figma ── */
function splitTop(s) {
  const out = []; let depth = 0, cur = "";
  for (const ch of s) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) { out.push(cur.trim()); cur = ""; } else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}
const parseColor = (s) => {
  const m = s.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const [r, g, b, a = "1"] = m[1].split(/[ ,/]+/).filter(Boolean);
  return { r: +r / 255, g: +g / 255, b: +b / 255, a: +a };
};
const DIR = {
  "to right": [[1, 0, 0], [0, 1, 0]], "to left": [[-1, 0, 1], [0, 1, 0]],
  "to bottom": [[0, 1, 0], [-1, 0, 1]], "to top": [[0, -1, 1], [1, 0, 0]],
};
function gradientPaints(css) {
  const layers = splitTop(css);
  const paints = [];
  for (const L of layers) {
    const m = L.match(/^linear-gradient\((.*)\)$/s);
    if (!m) continue;
    const args = splitTop(m[1]);
    let dir = "to bottom";
    if (/^to /.test(args[0])) dir = args.shift();
    else if (/deg$/.test(args[0])) { const a = parseFloat(args.shift()); dir = { 0: "to top", 90: "to right", 180: "to bottom", 270: "to left" }[((a % 360) + 360) % 360] || "to bottom"; }
    const stops = args.map((a) => { const c = parseColor(a); const p = a.match(/(-?[\d.]+)%\s*$/); return { color: c, pos: p ? +p[1] / 100 : null }; }).filter((s) => s.color);
    stops.forEach((s, i) => { if (s.pos === null) s.pos = stops.length === 1 ? 0 : i / (stops.length - 1); });
    paints.push({ type: "GRADIENT_LINEAR", gradientTransform: DIR[dir] || DIR["to bottom"], gradientStops: stops.map((s) => ({ position: Math.min(1, Math.max(0, s.pos)), color: s.color })) });
  }
  return paints; // en orden CSS: la primera capa es la de arriba
}
// una capa de fondo con tamaño/posición propios → su rectángulo
function layerRect(n, i) {
  const sizes = splitTop(n.size || "auto"), poss = splitTop(n.pos || "0% 0%");
  const sz = (sizes[i] || sizes[0] || "auto").split(/\s+/), ps = (poss[i] || poss[0] || "0% 0%").split(/\s+/);
  const dim = (v, full) => (v === "auto" || v === undefined ? full : v.endsWith("%") ? (full * parseFloat(v)) / 100 : parseFloat(v));
  const w = dim(sz[0], n.w), h = dim(sz[1] ?? sz[0], n.h);
  const pos = (v, full, size) => (v.endsWith("%") ? ((full - size) * parseFloat(v)) / 100 : parseFloat(v));
  return { x: n.x + pos(ps[0] || "0%", n.w, w), y: n.y + pos(ps[1] || "0%", n.h, h), w, h };
}

/* ── Fotos: archivo de origen, recorte (cover + object-position) y filtros ── */
function imageFile(src) {
  const u = new URL(src);
  const path = u.pathname === "/_next/image" ? decodeURIComponent(u.searchParams.get("url")) : decodeURIComponent(u.pathname);
  return PUB + path;
}
function cropOf(n) {
  const bw = n.clip.w, bh = n.clip.h, iw = n.nw || 1, ih = n.nh || 1;
  const s = Math.max(bw / iw, bh / ih), dw = iw * s, dh = ih * s;
  const [px, py] = (n.pos || "50% 50%").split(/\s+/).map((v) => (v.endsWith("%") ? parseFloat(v) / 100 : 0.5));
  const ox = (bw - dw) * px, oy = (bh - dh) * py;
  return [[bw / dw, 0, -ox / dw], [0, bh / dh, -oy / dh]];
}
function filtersOf(f) {
  const out = {};
  for (const [, fn, v] of (f || "").matchAll(/(\w+)\(([\d.]+)\)/g)) {
    const x = +v;
    if (fn === "saturate") out.saturation = +(x - 1).toFixed(2);
    if (fn === "grayscale") out.saturation = -x;
    if (fn === "contrast") out.contrast = +(x - 1).toFixed(2);
    if (fn === "brightness") out.exposure = +(x - 1).toFixed(2);
    if (fn === "sepia") out.temperature = +(x * 0.5).toFixed(2);
  }
  return out;
}

/* ── Nombres de las secciones ── */
function sectionName(s, i, list) {
  const map = { mario: "01 · Portada", origen: "03 · Origen", psicocibernetica: "04 · Psicocibernética", hipertrofia: "05 · Hipertrofia del Ser", emprendimiento: "06 · Emprendimiento", perspectivas: "07 · Perspectivas", contacto: "08 · Contacto" };
  if (map[s.id]) return map[s.id];
  if (/about/.test(s.cls)) return "02 · About";
  if (/footer/.test(s.cls)) return "09 · Pie";
  if (/banner/.test(s.cls)) return list.slice(0, i).some((x) => /banner/.test(x.cls)) ? "Banner · SER más" : "Banner · Músculo";
  return s.id || s.cls;
}

const mode = process.argv[2];
const styles = buildStyles();

if (mode === "setup") {
  const fonts = [...new Map([...styles.values()].map((s) => [s.font.family + s.font.style, s.font])).values()];
  const secs = Object.fromEntries(Object.entries(VP).map(([vp, cfg]) => {
    const list = JSON.parse(fs.readFileSync(cfg.file));
    return [vp, list.map((s, i) => ({ name: sectionName(s, i, list), w: Math.round(s.w), h: Math.round(s.h), bg: s.bg && s.bg.a > 0 ? s.bg : hex(TOKENS["papel"]), bgTok: s.bg && s.bg.a > 0 ? tokenFor(s.bg) : "papel" }))];
  }));
  const code = `
const TOKENS = ${JSON.stringify(Object.fromEntries(Object.entries(TOKENS).map(([k, v]) => [k, hex(v)])))};
const STYLES = ${JSON.stringify([...styles.values()].map((s) => ({ name: s.name, font: s.font, size: s.size, lh: s.lh, ls: s.ls, upper: s.upper })))};
const FONTS = ${JSON.stringify(fonts)};
const SECS = ${JSON.stringify(secs)};
const VP = ${JSON.stringify(VP)};
await Promise.all(FONTS.map((f) => figma.loadFontAsync(f)));
const page = figma.currentPage;
page.name = "Home v3";
// colores de la marca
const col = figma.variables.createVariableCollection("Marca · color");
const vars = {};
for (const [k, c] of Object.entries(TOKENS)) {
  const v = figma.variables.createVariable(k, col, "COLOR");
  v.setValueForMode(col.modes[0].modeId, { r: c.r, g: c.g, b: c.b, a: 1 });
  v.scopes = ["FRAME_FILL", "SHAPE_FILL", "TEXT_FILL", "STROKE_COLOR"];
  vars[k] = v.id;
}
// estilos de texto
const styleIds = {};
for (const s of STYLES) {
  const t = figma.createTextStyle();
  t.name = s.name;
  t.fontName = s.font;
  t.fontSize = s.size;
  t.lineHeight = s.lh ? { unit: "PIXELS", value: s.lh } : { unit: "AUTO" };
  t.letterSpacing = { unit: "PIXELS", value: s.ls };
  t.textCase = s.upper ? "UPPER" : "ORIGINAL";
  styleIds[s.name] = t.id;
}
// los dos lienzos: escritorio y móvil, con una sección por marco
const varObj = {};
for (const [k, id] of Object.entries(vars)) varObj[k] = await figma.variables.getVariableByIdAsync(id);
const paint = (c, tok) => { let p = { type: "SOLID", color: { r: c.r, g: c.g, b: c.b } }; if (tok && varObj[tok]) p = figma.variables.setBoundVariableForPaint(p, "color", varObj[tok]); return p; };
const out = { vars, styleIds, wrappers: {}, sections: {} };
let x = 0;
for (const vp of ["d", "m"]) {
  const cfg = VP[vp];
  const wrap = figma.createAutoLayout("VERTICAL", { name: cfg.label + " · " + cfg.w, itemSpacing: 0 });
  wrap.x = x; wrap.y = 0;
  wrap.fills = [];
  out.wrappers[vp] = wrap.id;
  out.sections[vp] = [];
  for (const s of SECS[vp]) {
    const f = figma.createFrame();
    f.name = s.name;
    f.resize(s.w, s.h);
    f.fills = [paint(s.bg, s.bgTok)];
    f.clipsContent = true;
    f.layoutGrids = [{ pattern: "COLUMNS", alignment: "STRETCH", count: cfg.cols, gutterSize: cfg.gutter, offset: cfg.margin, visible: false }];
    wrap.appendChild(f);
    out.sections[vp].push(f.id);
  }
  x += cfg.w + 200;
}
// componentes (logos), a la izquierda
const comps = figma.createFrame();
comps.name = "Componentes";
comps.resize(560, 400);
comps.x = -760; comps.y = 0;
comps.fills = [paint(TOKENS["negro"], "negro")];
out.components = comps.id;
return out;`;
  fs.writeFileSync("out/setup.js", code);
  console.log("setup.js", code.length, "car ·", styles.size, "estilos ·", fonts.length, "fuentes");
}

if (mode === "logos") {
  // los dos logos, como componentes (sus trazados son grandes: un script cada uno)
  const ids = JSON.parse(fs.readFileSync(process.argv[3]));
  const logo = fs.readFileSync(LOGO_TS, "utf8");
  const lvb = logo.match(/LOGO_VIEWBOX = "([^"]+)"/)[1], lpath = logo.match(/LOGO_PATH = "([^"]+)"/)[1];
  const emb = fs.readFileSync(EMBLEM_TS, "utf8");
  const evb = emb.match(/HDS_EMBLEM_VIEWBOX = "([^"]+)"/)[1], epath = emb.match(/HDS_EMBLEM_PATH = "([^"]+)"/)[1];
  const mk = (name, vb, d, x, y, w) => {
    const [, , vw, vh] = vb.split(" ").map(Number);
    const h = (w * vh) / vw;
    return `const holder = await figma.getNodeByIdAsync("${ids.components}");
const svg = figma.createNodeFromSvg('<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h.toFixed(2)}" viewBox="${vb}"><path fill-rule="evenodd" fill="#F2F0EB" d="${d}"/></svg>');
const comp = figma.createComponentFromNode(svg);
comp.name = "${name}";
holder.appendChild(comp);
comp.x = ${x}; comp.y = ${y};
const v = await figma.variables.getVariableByIdAsync("${ids.vars["sobre-negro"]}");
for (const n of comp.findAllWithCriteria({ types: ["VECTOR"] })) n.fills = [figma.variables.setBoundVariableForPaint({ type: "SOLID", color: { r: 0.95, g: 0.94, b: 0.92 } }, "color", v)];
return { id: comp.id, w: comp.width, h: comp.height };`;
  };
  fs.writeFileSync("out/logo.js", mk("Logo · Mario Lignarolo", lvb, lpath, 40, 40, 300));
  fs.writeFileSync("out/emblem.js", mk("Emblema · Hipertrofia del Ser", evb, epath, 40, 140, 120));
  console.log("logo.js", fs.statSync("out/logo.js").size, "· emblem.js", fs.statSync("out/emblem.js").size);
}

if (mode === "sections") {
  const ids = JSON.parse(fs.readFileSync(process.argv[3]));
  const images = [];
  const styleBySig = new Map([...styles.entries()].map(([k, v]) => [k, v.name]));
  for (const [vp, cfg] of Object.entries(VP)) {
    const list = JSON.parse(fs.readFileSync(cfg.file));
    list.forEach((s, si) => {
      const fonts = new Map();
      const addFont = (f) => fonts.set(f.family + "|" + f.style, f);
      // orden de pintura: fondos y fotos (orden del documento), luego vectores y textos
      const back = s.nodes.filter((n) => ["rect", "gradient", "image"].includes(n.kind)).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
      const front = s.nodes.filter((n) => n.kind === "svg").concat(s.nodes.filter((n) => n.kind === "text"));
      const ops = [];
      for (const n of [...back, ...front]) {
        const r = (v) => +v.toFixed(1);
        if (n.kind === "rect") {
          ops.push({ k: "rect", name: n.name, x: r(n.x), y: r(n.y), w: r(Math.max(n.w, 1)), h: r(Math.max(n.h, 1)), c: n.fill, t: tokenFor(n.fill) });
        } else if (n.kind === "gradient") {
          const paints = gradientPaints(n.css);
          const layered = n.size && n.size !== "auto" && splitTop(n.size).length > 1;
          if (!layered) ops.push({ k: "grad", name: n.name, x: r(n.x), y: r(n.y), w: r(n.w), h: r(n.h), p: [...paints].reverse() });
          else paints.forEach((p, i) => { const L = layerRect(n, i); ops.push({ k: "grad", name: n.name + " " + (i + 1), x: r(L.x), y: r(L.y), w: r(L.w), h: r(L.h), p: [p] }); });
        } else if (n.kind === "image") {
          const file = imageFile(n.src);
          const ref = `${vp}-${si}-${images.length}`;
          images.push({ ref, file, crop: cropOf(n), filters: filtersOf(n.filter) });
          ops.push({ k: "img", ref, name: "Foto · " + file.split("/").pop(), x: r(n.clip.x), y: r(n.clip.y), w: r(n.clip.w), h: r(n.clip.h) });
        } else if (n.kind === "svg") {
          if (n.markup.length > 8000) {
            const comp = /hds|emblema/i.test(n.name) || n.h > n.w ? ids.emblem : ids.logo;
            ops.push({ k: "inst", comp, name: comp === ids.emblem ? "Emblema" : "Logo", x: r(n.x), y: r(n.y), w: r(n.w), h: r(n.h) });
          } else ops.push({ k: "svg", name: n.w < 24 ? "Icono · flecha" : "Vector", x: r(n.x), y: r(n.y), w: r(n.w), h: r(n.h), m: n.markup, o: n.opacity });
        } else if (n.kind === "text") {
          const st = n.style;
          const font = fontOf(st);
          addFont(font);
          const lh = st.lh || st.size * 1.2;
          const single = n.h <= Math.max(lh, n.ca || 0) * 1.45;
          const text = n.lines ? n.lines.join("\n") : n.text;
          const y = n.center ? n.y + (n.h - lh) / 2 : n.y - (lh - (n.ca || lh)) / 2;
          const runs = n.runs.map((u) => { const f = fontOf(u.style); addFont(f); return { s: u.start, e: u.end, f, c: u.style.color, t: tokenFor(u.style.color), u: /underline/.test(u.style.deco) }; })
            .filter((u) => !n.lines); // con líneas reescritas, los índices no valen: sin tramos
          ops.push({
            k: "text", name: roleOf(n), x: r(n.x), y: r(y), w: r(n.w + 3), auto: !!n.lines || single, s: styleBySig.get(vp + "|" + sigOf(st)), text, c: st.color, t: tokenFor(st.color),
            al: st.align === "center" ? "CENTER" : st.align === "right" || st.align === "end" ? "RIGHT" : "LEFT", u: /underline/.test(st.deco), runs,
          });
        }
      }
      const code = `
const OPS = ${JSON.stringify(ops)};
const FONTS = ${JSON.stringify([...fonts.values()])};
const STYLE_IDS = ${JSON.stringify(ids.styleIds)};
const VARS = ${JSON.stringify(ids.vars)};
const frame = await figma.getNodeByIdAsync("${ids.sections[vp][si]}");
await Promise.all(FONTS.map((f) => figma.loadFontAsync(f)));
const varObj = {};
await Promise.all(Object.entries(VARS).map(async ([k, id]) => { varObj[k] = await figma.variables.getVariableByIdAsync(id); }));
const paint = (c, tok) => { let p = { type: "SOLID", color: { r: c.r, g: c.g, b: c.b }, opacity: c.a ?? 1 }; if (tok && varObj[tok]) p = figma.variables.setBoundVariableForPaint(p, "color", varObj[tok]); return p; };
const comps = {};
const created = [], images = {};
for (const o of OPS) {
  let node;
  if (o.k === "rect" || o.k === "grad" || o.k === "img") {
    node = figma.createRectangle();
    node.resize(Math.max(o.w, 0.5), Math.max(o.h, 0.5));
    node.fills = o.k === "rect" ? [paint(o.c, o.t)] : o.k === "grad" ? o.p : [{ type: "SOLID", color: { r: 0.85, g: 0.84, b: 0.82 } }];
    if (o.k === "img") images[o.ref] = node.id;
  } else if (o.k === "inst") {
    comps[o.comp] ||= await figma.getNodeByIdAsync(o.comp);
    node = comps[o.comp].createInstance();
    node.resize(o.w, o.h);
  } else if (o.k === "svg") {
    node = figma.createNodeFromSvg(o.m);
    if (o.o < 1) node.opacity = o.o;
  } else if (o.k === "text") {
    node = figma.createText();
    frame.appendChild(node);
    if (o.s && STYLE_IDS[o.s]) await node.setTextStyleIdAsync(STYLE_IDS[o.s]);
    node.characters = o.text;
    node.fills = [paint(o.c, o.t)];
    node.textAlignHorizontal = o.al;
    if (o.u) node.textDecoration = "UNDERLINE";
    for (const u of o.runs) {
      node.setRangeFontName(u.s, u.e, u.f);
      node.setRangeFills(u.s, u.e, [paint(u.c, u.t)]);
      if (u.u) node.setRangeTextDecoration(u.s, u.e, "UNDERLINE");
    }
    if (o.auto) node.textAutoResize = "WIDTH_AND_HEIGHT";
    else { node.resize(o.w, node.height); node.textAutoResize = "HEIGHT"; }
  }
  node.name = o.name;
  if (node.parent !== frame) frame.appendChild(node);
  node.x = o.x; node.y = o.y;
  created.push(node.id);
}
return { section: frame.name, created: created.length, images };`;
      const fname = `out/${vp}-${String(si).padStart(2, "0")}.js`;
      fs.writeFileSync(fname, code);
      console.log(fname, sectionName(s, si, list), code.length, "car");
    });
  }
  fs.writeFileSync("out/images.json", JSON.stringify(images));
  console.log(images.length, "fotos");
}
