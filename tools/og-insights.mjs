// Tarjetas para compartir (1200×630) de Insights: una para /insights y una por
// artículo publicado. Mismo lenguaje que la og-cover de la home: fondo cálido,
// resplandor naranja, Spark, Inter Tight 800 e IBM Plex Mono.
//
//   node tools/og-insights.mjs            (después: python3 tools/build-insights.py)
//
// Necesita Playwright con Chromium. Si no está disponible, no pasa nada: cada
// artículo sin og.jpg propio usa la tarjeta general /insights/og.jpg.
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const SRC = path.join(ROOT, 'editorial', 'insights');
const OUT = path.join(ROOT, 'clients', 'jorge-arce', 'insights');
const SPARK = 'data:image/png;base64,' + fs.readFileSync(path.join(ROOT, 'clients/jorge-arce/igy/assets/spark.png')).toString('base64');

let chromium;
try {
  ({ chromium } = await import(process.env.PLAYWRIGHT || 'playwright'));
} catch {
  ({ chromium } = await import('/opt/node-tools/node_modules/playwright/index.mjs'));
}

function front(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  const d = {};
  if (!m) return d;
  for (const line of m[1].split('\n')) {
    const k = line.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
    if (k) d[k[1]] = k[2].trim().replace(/^(["'])(.*)\1$/, '$2');
  }
  return d;
}
const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const cards = [];
const idx = front(fs.readFileSync(path.join(SRC, '_index.md'), 'utf8'));
cards.push({ out: path.join(OUT, 'og.jpg'), kicker: 'Insights', title: idx.title + '.', sub: idx.subtitle, big: true });
for (const f of fs.readdirSync(SRC)) {
  if (!f.endsWith('.md') || f.startsWith('_') || f.toUpperCase() === 'README.MD') continue;
  const d = front(fs.readFileSync(path.join(SRC, f), 'utf8'));
  if (d.draft === 'true') continue;
  cards.push({ out: path.join(OUT, d.slug, 'og.jpg'), kicker: d.category, title: d.title });
}

const html = (c) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;700;800&family=IBM+Plex+Mono:wght@500&display=block" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#100C07;color:#FBF9F6;font-family:'Inter Tight',sans-serif;position:relative;overflow:hidden}
body::before{content:'';position:absolute;left:78%;top:8%;transform:translate(-50%,-50%);width:1100px;height:1100px;background:radial-gradient(circle,rgba(245,121,0,.42) 0%,rgba(245,121,0,.12) 34%,rgba(245,121,0,0) 62%)}
body::after{content:'';position:absolute;inset:0;opacity:.45;mix-blend-mode:overlay;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")}
.in{position:absolute;inset:64px 72px 56px;display:flex;flex-direction:column;z-index:2}
.k{font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:19px;letter-spacing:.16em;text-transform:uppercase;color:#FFA62E;display:flex;align-items:center;gap:14px}
.k img{width:22px;filter:brightness(0) saturate(100%) invert(65%) sepia(80%) saturate(1500%) hue-rotate(345deg)}
h1{margin-top:auto;font-weight:800;letter-spacing:-.045em;line-height:.98;font-size:${c.big ? 132 : 70}px;max-width:${c.big ? 9 : 17}ch}
.sub{margin-top:22px;font-weight:700;letter-spacing:-.02em;font-size:32px;color:rgba(251,249,246,.78)}
.f{margin-top:40px;display:flex;justify-content:space-between;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:15px;letter-spacing:.12em;text-transform:uppercase;color:rgba(251,249,246,.5)}
.f b{color:#FFA62E;font-weight:500}
</style></head><body><div class="in">
<p class="k"><img src="${SPARK}" alt="">${esc(c.kicker)}</p>
<h1>${esc(c.title)}</h1>${c.sub ? `<p class="sub">${esc(c.sub)}</p>` : ''}
<p class="f"><span>Ignite Yourself · <b>igniteyourself.co/insights</b></span><span>The Authority Gap</span></p>
</div></body></html>`;

const exe = fs.existsSync('/opt/pw-browsers/chromium') ? { executablePath: '/opt/pw-browsers/chromium' } : {};
const b = await chromium.launch(exe);
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
for (const c of cards) {
  await p.setContent(html(c), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  fs.mkdirSync(path.dirname(c.out), { recursive: true });
  await p.screenshot({ path: c.out, type: 'jpeg', quality: 88 });
  console.log('og', path.relative(ROOT, c.out));
}
await b.close();
