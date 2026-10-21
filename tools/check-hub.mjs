// Control de calidad de un hub, en Chromium de verdad.
//
//   node tools/check-hub.mjs <carpeta> [--shots <carpeta-de-capturas>]
//
// Sirve la carpeta en local y revisa: desbordes horizontales de 360 a 1440 px,
// títulos que se salen de su tarjeta, errores de JS, un solo h1, alt en las
// fotos, rel=noopener, enlaces sin destino, la barra inferior (sí en móvil, no
// en escritorio), todo visible con reduced-motion, la UTM de la visita hasta el
// checkout y el DM de Instagram dentro del navegador de la app.
// Con --shots guarda capturas de página completa a 390 y 1280 px.
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';

const DIR = process.argv[2] && path.resolve(process.argv[2]);
if (!DIR || !fs.existsSync(path.join(DIR, 'index.html'))) {
  console.error('Uso: node tools/check-hub.mjs <carpeta con index.html> [--shots <salida>]');
  process.exit(2);
}
const si = process.argv.indexOf('--shots');
const SHOTS = si > 0 && process.argv[si + 1] ? path.resolve(process.argv[si + 1]) : null;

const req = createRequire(import.meta.url);
let pw;
try { pw = req('playwright'); } catch { pw = createRequire(execSync('npm root -g').toString().trim() + '/')('playwright'); }
const exe = '/opt/pw-browsers/chromium';
const browser = await pw.chromium.launch(fs.existsSync(exe) && fs.statSync(exe).isFile() ? { executablePath: exe } : {});

const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4', '.woff2': 'font/woff2' };
const server = http.createServer((q, r) => {
  let p = decodeURIComponent(new URL(q.url, 'http://x').pathname);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(DIR, p);
  if (!f.startsWith(DIR) || !fs.existsSync(f)) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(r);
});
await new Promise(ok => server.listen(0, '127.0.0.1', ok));
const ORIGIN = `http://127.0.0.1:${server.address().port}`;

const fails = [], notes = [];
const fail = m => fails.push(m);

async function open(opts, query = '') {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, ...opts });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('response', r => { if (r.url().startsWith(ORIGIN) && r.status() >= 400) errs.push(`${r.status()} ${r.url()}`); });
  await page.goto(ORIGIN + '/' + query, { waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  return { ctx, page, errs };
}

// 1 · anchos: desbordes, títulos que se salen, barra inferior, errores
for (const w of [360, 390, 768, 1024, 1280, 1440]) {
  const { ctx, page, errs } = await open({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  const r = await page.evaluate(() => {
    const over = document.documentElement.scrollWidth - innerWidth;
    const titles = [...document.querySelectorAll('.ttl, .pill, .bar__cta, .row__tx b')]
      .filter(el => el.scrollWidth > el.clientWidth + 1)
      .map(el => (el.closest('[id]')?.id || '?') + ': «' + el.textContent.trim().slice(0, 30) + '»');
    const bar = document.querySelector('.bar');
    return { over, titles, bar: bar ? getComputedStyle(bar).display !== 'none' : null };
  });
  if (r.over > 1) fail(`${w}px: desborde horizontal de ${r.over}px`);
  for (const t of r.titles) fail(`${w}px: el texto se sale de su caja → ${t}`);
  if (r.bar !== null && (w < 768) !== r.bar) fail(`${w}px: barra inferior ${r.bar ? 'visible' : 'oculta'} (debería estar ${w < 768 ? 'visible' : 'oculta'})`);
  for (const e of errs) fail(`${w}px: ${e}`);
  await ctx.close();
}

// 2 · estructura y accesibilidad básica
{
  const { ctx, page } = await open({ reducedMotion: 'reduce' });
  const r = await page.evaluate(() => ({
    h1: document.querySelectorAll('h1').length,
    noAlt: [...document.querySelectorAll('img:not([alt])')].map(i => i.getAttribute('src')),
    noRel: [...document.querySelectorAll('a[target=_blank]')].filter(a => !/noopener/.test(a.rel)).map(a => a.href),
    noHref: [...document.querySelectorAll('a:not([href])')].length,
    hidden: [...document.querySelectorAll('.c')].filter(c => getComputedStyle(c).opacity === '0').map(c => c.id),
    desc: document.querySelector('meta[name=description]')?.content || '',
    cards: document.querySelectorAll('.c').length,
  }));
  if (r.h1 !== 1) fail(`hay ${r.h1} h1 (debe haber uno)`);
  if (r.noAlt.length) fail(`fotos sin alt: ${r.noAlt.join(', ')}`);
  if (r.noRel.length) fail(`target=_blank sin rel=noopener: ${r.noRel.join(', ')}`);
  if (r.noHref) fail(`${r.noHref} enlaces sin href`);
  if (r.hidden.length) fail(`con reduced-motion siguen ocultas: ${r.hidden.join(', ')}`);
  if (!r.desc) fail('sin meta description');
  notes.push(`${r.cards} tarjetas`);
  await ctx.close();
}

// 3 · la entrada en cascada termina y deja todo visible
{
  const { ctx, page } = await open({});
  await page.evaluate(async () => { for (let y = 0; y <= document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); } });
  await page.waitForTimeout(1800);
  const left = await page.evaluate(() => [...document.querySelectorAll('.c:not(.is-pending)')].filter(c => getComputedStyle(c).opacity !== '1').map(c => c.id));
  if (left.length) fail(`tras recorrer la página siguen sin entrar: ${left.join(', ')}`);
  await ctx.close();
}

// 4 · UTM de la visita → enlaces de checkout (data-utm)
{
  const { ctx, page } = await open({}, '?utm_source=qa&utm_campaign=check');
  const r = await page.evaluate(() => [...document.querySelectorAll('a[data-utm]')].map(a => a.href));
  for (const h of r) if (!/utm_source=qa/.test(h) || !/utm_campaign=check/.test(h)) fail(`el checkout no lleva la UTM de la visita: ${h}`);
  notes.push(`${r.length} enlaces con UTM`);
  await ctx.close();
}

// 5 · DM de Instagram dentro del navegador de la app
{
  const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 300.0.0.0';
  const { ctx, page } = await open({ userAgent: ua });
  const left = await page.evaluate(() => document.querySelectorAll('a[href^="https://ig.me/m/"]').length);
  if (left) fail(`en el navegador de Instagram quedan ${left} enlaces ig.me (deberían ir al perfil)`);
  await ctx.close();
}

// 6 · capturas
if (SHOTS) {
  fs.mkdirSync(SHOTS, { recursive: true });
  for (const w of [390, 1280]) {
    const { ctx, page } = await open({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    const f = path.join(SHOTS, `${path.basename(DIR)}-${w}.png`);
    await page.screenshot({ path: f, fullPage: true });
    notes.push(`captura: ${f}`);
    await ctx.close();
  }
}

await browser.close();
server.close();
console.log(`${fails.length ? '✗' : '✓'} ${path.basename(DIR)} · ${notes.join(' · ')}`);
for (const f of fails) console.log('  ✗ ' + f);
process.exit(fails.length ? 1 : 0);
