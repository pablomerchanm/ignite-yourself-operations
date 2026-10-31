// Mide /v3 renderizada y la vuelca a JSON para reconstruirla en Figma:
// por sección, sus textos (con estilo, tramos y líneas reales), fotos (con
// recorte), vectores, rellenos, filetes y degradados.
// uso: node extract.mjs <ancho> <alto> <salida.json>
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
import fs from "node:fs";

const [w, h, out] = [+process.argv[2], +process.argv[3], process.argv[4]];
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: w, height: h }, reducedMotion: "reduce", deviceScaleFactor: 1 });
await p.goto("http://localhost:3124/v3", { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
// recorre la página para que carguen las imágenes diferidas
await p.evaluate(async () => {
  for (let y = 0; y < document.documentElement.scrollHeight; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); }
  scrollTo(0, 0);
});
await p.waitForTimeout(800);

const data = await p.evaluate(() => {
  const px = (v) => parseFloat(v) || 0;
  const rgba = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return null;
    const [r, g, bl, a = "1"] = m[1].split(/[ ,/]+/).filter(Boolean);
    return { r: +r / 255, g: +g / 255, b: +bl / 255, a: +a };
  };
  const visible = (el) => {
    for (let e = el; e && e !== document.body; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.display === "none" || cs.visibility === "hidden" || +cs.opacity === 0) return false;
      if (/srOnly/.test(e.className && e.className.toString())) return false;
      if (cs.position === "fixed") return false;
    }
    return true;
  };
  const isInline = (el) => ["inline", "contents"].includes(getComputedStyle(el).display);
  const sameFont = (a, b) => {
    const x = getComputedStyle(a), y = getComputedStyle(b);
    return x.fontFamily === y.fontFamily && x.fontSize === y.fontSize && x.fontWeight === y.fontWeight;
  };
  // el bloque de un texto: el antepasado no en línea más cercano; las líneas
  // en span de bloque con la misma fuente se funden en su padre
  const blockOf = (el) => {
    let blk = el;
    while (blk && isInline(blk)) blk = blk.parentElement;
    while (blk && blk.tagName === "SPAN" && blk.parentElement && sameFont(blk, blk.parentElement)) {
      let up = blk.parentElement;
      while (up && isInline(up)) up = up.parentElement;
      blk = up;
    }
    return blk;
  };
  const lineKeyOf = (el, blk) => {
    let k = null;
    for (let e = el; e && e !== blk; e = e.parentElement) if (e.tagName === "SPAN" && getComputedStyle(e).display === "block") k = e;
    return k;
  };
  const styleOf = (el) => {
    const cs = getComputedStyle(el);
    return {
      family: cs.fontFamily, stretch: cs.fontStretch, weight: +cs.fontWeight, italic: cs.fontStyle === "italic",
      size: px(cs.fontSize), lh: cs.lineHeight === "normal" ? null : px(cs.lineHeight), ls: cs.letterSpacing === "normal" ? 0 : px(cs.letterSpacing),
      transform: cs.textTransform, color: rgba(cs.color), align: cs.textAlign, deco: cs.textDecorationLine, nowrap: cs.whiteSpace === "nowrap",
    };
  };
  const sections = Array.from(document.querySelectorAll("body > header, header#mario, main > *, body footer")).filter((s, i, a) => a.indexOf(s) === i && s.offsetHeight > 0);
  return sections.map((sec) => {
    const sb = sec.getBoundingClientRect();
    const ox = sb.left + scrollX, oy = sb.top + scrollY;
    const rel = (r) => ({ x: r.left + scrollX - ox, y: r.top + scrollY - oy, w: r.width, h: r.height });
    const nodes = [];
    const scs = getComputedStyle(sec);
    // 1) rellenos, filetes y degradados (en orden de documento)
    const all = [sec, ...sec.querySelectorAll("*")].filter((e) => !(e.closest("svg") && e.tagName !== "svg") && visible(e));
    const lastDesc = (e) => { let i = all.indexOf(e), j = i; while (j + 1 < all.length && e.contains(all[j + 1])) j++; return j; };
    for (const [idx, e] of all.entries()) {
      const mark = nodes.length;
      if (e.tagName === "svg") continue;
      const cs = getComputedStyle(e);
      const r = rel(e.getBoundingClientRect());
      if (r.w < 1 || r.h < 1) continue;
      const bg = rgba(cs.backgroundColor);
      if (e !== sec && bg && bg.a > 0.01) nodes.push({ kind: "rect", ...r, fill: bg, name: (e.className && e.className.toString().split(" ")[0].replace(/^v3-module__\w+__/, "")) || e.tagName.toLowerCase() });
      if (cs.backgroundImage.includes("gradient")) nodes.push({ kind: "gradient", ...r, css: cs.backgroundImage, size: cs.backgroundSize, pos: cs.backgroundPosition, name: "fondo" });
      for (const side of ["Top", "Right", "Bottom", "Left"]) {
        const bw = px(cs[`border${side}Width`]);
        const bc = rgba(cs[`border${side}Color`]);
        if (bw > 0 && cs[`border${side}Style`] !== "none" && bc && bc.a > 0) {
          const line = side === "Top" ? { x: r.x, y: r.y, w: r.w, h: bw } : side === "Bottom" ? { x: r.x, y: r.y + r.h - bw, w: r.w, h: bw } : side === "Left" ? { x: r.x, y: r.y, w: bw, h: r.h } : { x: r.x + r.w - bw, y: r.y, w: bw, h: r.h };
          nodes.push({ kind: "rect", ...line, fill: bc, name: "filete" });
        }
      }
      for (const pseudo of ["::before", "::after"]) {
        const ps = getComputedStyle(e, pseudo);
        if (ps.content !== "none" && ps.backgroundImage.includes("gradient")) nodes.push({ kind: "gradient", ...r, css: ps.backgroundImage, size: "auto", pos: "0% 0%", name: "fundido", order: pseudo === "::after" ? lastDesc(e) + 0.5 : idx - 0.5 });
      }
      if (e.tagName === "IMG") {
        // la foto: su caja visible (la del contenedor que la recorta) y el recorte
        let clip = e.parentElement;
        while (clip && getComputedStyle(clip).overflow === "visible" && clip !== sec) clip = clip.parentElement;
        if (clip && (clip.tagName === "PICTURE" || getComputedStyle(clip).overflow === "visible")) clip = e.parentElement;
        const cr = rel(clip.getBoundingClientRect());
        const ir = rel(e.getBoundingClientRect());
        nodes.push({
          kind: "image", ...ir, clip: cr, src: e.currentSrc || e.src, nw: e.naturalWidth, nh: e.naturalHeight, fit: cs.objectFit, pos: cs.objectPosition, filter: cs.filter,
          name: e.alt ? e.alt.slice(0, 40) : "foto",
        });
      }
      for (let k = mark; k < nodes.length; k++) if (nodes[k].order === undefined) nodes[k].order = idx;
    }
    // 2) vectores
    for (const s of sec.querySelectorAll("svg")) {
      if (s.parentElement.closest("svg") || !visible(s)) continue;
      const r = rel(s.getBoundingClientRect());
      if (r.w < 1) continue;
      const cs = getComputedStyle(s);
      const col = rgba(cs.color);
      const hex = col ? "#" + [col.r, col.g, col.b].map((v) => Math.round(v * 255).toString(16).padStart(2, "0")).join("") : "#000000";
      const c = s.cloneNode(true);
      c.setAttribute("width", r.w.toFixed(2));
      c.setAttribute("height", r.h.toFixed(2));
      c.removeAttribute("class");
      c.removeAttribute("style");
      c.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      let markup = c.outerHTML.replace(/currentColor/g, hex);
      // atributos de presentación heredados del CSS
      if (!/fill=/.test(markup.slice(0, markup.indexOf(">")))) markup = markup.replace("<svg", `<svg fill="${cs.fill.startsWith("rgb") ? hex : cs.fill === "none" ? "none" : hex}"`);
      if (cs.stroke && cs.stroke !== "none" && !/stroke=/.test(markup.slice(0, markup.indexOf(">")))) markup = markup.replace("<svg", `<svg stroke="${hex}" stroke-width="${cs.strokeWidth}"`);
      nodes.push({ kind: "svg", ...r, markup, opacity: col ? col.a : 1, name: s.getAttribute("aria-label") || (s.closest("[class*=Logo],[class*=heroMark],[class*=footer]") ? "logo" : s.closest("[class*=hds]") ? "emblema" : "icono") });
    }
    // 3) textos, agrupados por bloque
    const walker = document.createTreeWalker(sec, NodeFilter.SHOW_TEXT);
    const blocks = new Map();
    for (let t = walker.nextNode(); t; t = walker.nextNode()) {
      if (t.parentElement.closest("svg, script, style, option:not(:checked)") || !visible(t.parentElement)) continue;
      if (t.parentElement.closest("select") && !t.parentElement.closest("option:checked")) continue;
      const blk = blockOf(t.parentElement);
      if (!t.textContent.trim() && !blocks.has(blk)) continue;
      if (!blocks.has(blk)) blocks.set(blk, []);
      blocks.get(blk).push(t);
    }
    // placeholders de los campos, como texto
    for (const inp of sec.querySelectorAll("input[placeholder], textarea[placeholder]")) {
      if (!visible(inp) || !inp.placeholder) continue;
      const cs = getComputedStyle(inp, "::placeholder");
      const r = rel(inp.getBoundingClientRect());
      const st = styleOf(inp);
      st.color = rgba(cs.color) || st.color;
      nodes.push({ kind: "text", x: r.x + px(getComputedStyle(inp).paddingLeft), y: r.y, w: r.w, h: r.h, text: inp.placeholder, style: st, runs: [], lines: null, center: true, name: "placeholder" });
    }
    for (const [blk, texts] of blocks) {
      const base = styleOf(texts[0].parentElement);
      let str = "", lastKey = undefined;
      const runs = [];
      const rects = [];
      for (const t of texts) {
        // un espacio entre palabras: no cambia de línea
        if (!t.textContent.trim()) { if (str && !/[ \n]$/.test(str)) str += " "; continue; }
        const k = lineKeyOf(t.parentElement, blk);
        let s = t.textContent.replace(/\s+/g, " ");
        if (lastKey !== undefined && k !== lastKey) { str = str.replace(/ $/, "") + "\n"; s = s.replace(/^ /, ""); }
        if (str === "" || str.endsWith("\n")) s = s.replace(/^ /, "");
        if (str.endsWith(" ") && s.startsWith(" ")) s = s.slice(1);
        const st = styleOf(t.parentElement);
        const start = str.length;
        str += s;
        if (st.family !== base.family || st.weight !== base.weight || st.italic !== base.italic || JSON.stringify(st.color) !== JSON.stringify(base.color) || st.deco !== base.deco || st.size !== base.size)
          runs.push({ start, end: str.length, style: st });
        lastKey = k;
        const rg = document.createRange();
        rg.selectNodeContents(t);
        if (t.textContent.trim()) for (const r of rg.getClientRects()) if (r.width > 0) rects.push(r);
      }
      str = str.replace(/ +\n/g, "\n").replace(/\s+$/, "");
      if (!rects.length || !str.trim()) continue;
      const x0 = Math.min(...rects.map((r) => r.left)), y0 = Math.min(...rects.map((r) => r.top));
      const x1 = Math.max(...rects.map((r) => r.right)), y1 = Math.max(...rects.map((r) => r.bottom));
      // las líneas reales (para la condensada, que en Figma es más ancha)
      let lines = null;
      if (/archivo/i.test(base.family)) {
        const words = [];
        for (const t of texts) {
          const re = /\S+/g;
          let m;
          while ((m = re.exec(t.textContent))) {
            const rg = document.createRange();
            rg.setStart(t, m.index); rg.setEnd(t, m.index + m[0].length);
            const r = rg.getClientRects()[0];
            if (r) words.push({ w: m[0], top: Math.round(r.top) });
          }
        }
        lines = [];
        for (const wd of words) {
          const last = lines[lines.length - 1];
          if (last && Math.abs(last.top - wd.top) < base.size * 0.4) last.t += " " + wd.w;
          else lines.push({ top: wd.top, t: wd.w });
        }
        lines = lines.map((l) => l.t);
      }
      const br = blk.getBoundingClientRect();
      const ca = rects[0].height;
      nodes.push({
        kind: "text", x: x0 + scrollX - ox, y: y0 + scrollY - oy, w: x1 - x0, h: y1 - y0, blockW: br.width, ca, text: str, style: base, runs, lines,
        name: (blk.className && blk.className.toString().split(" ").map((c) => c.replace(/^v3-module__\w+__/, ""))[0]) || blk.tagName.toLowerCase(),
      });
    }
    return {
      id: sec.id, tag: sec.tagName.toLowerCase(), cls: sec.className.toString().replace(/v3-module__\w+__/g, ""),
      w: sb.width, h: sb.height, bg: rgba(scs.backgroundColor), nodes,
    };
  });
});
fs.writeFileSync(out, JSON.stringify(data));
console.log(data.map((s) => `${s.id || s.cls} ${Math.round(s.h)}px · ${s.nodes.length} nodos (${["text", "image", "svg", "rect", "gradient"].map((k) => k[0] + s.nodes.filter((n) => n.kind === k).length).join(" ")})`).join("\n"));
await b.close();
