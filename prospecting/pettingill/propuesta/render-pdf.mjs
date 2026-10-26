// Regenera el PDF de la propuesta desde proposal-pdf.html (A4, con fondos).
// uso: node prospecting/pettingill/propuesta/render-pdf.mjs
// Se publica junto con la propuesta solo cuando proposal.active es true en pettingill/content.json.
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import path from 'path';
import { fileURLToPath } from 'url';
const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, 'web/Ignite-Yourself-Proposal-Bernard-Pettingill.pdf');
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage();
await p.goto('file://' + path.join(here, 'proposal-pdf.html'), { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
await p.pdf({ path: out, format: 'A4', printBackground: true, preferCSSPageSize: true });
await b.close();
console.log('PDF:', out);
