import { chromium } from 'playwright';
import fs from 'fs';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const D='/home/user/ignite-yourself-operations/clients/jorge-arce/adriana-gareis';
for (const [path,file] of [['/adriana-gareis/',D+'/index.html']]) {
  const p=await (await b.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'})).newPage();
  await p.goto('http://127.0.0.1:8904'+path,{waitUntil:'networkidle'});
  await p.waitForTimeout(1000);
  const o=await p.evaluate(()=>({site:document.getElementById('site').innerHTML,
    secs:document.querySelectorAll('#site section').length}));
  let h=fs.readFileSync(file,'utf8');
  const before=h.length;
  h=h.replace(/<main id="site">[\s\S]*?<\/main>/,'<main id="site">'+o.site+'</main>');
  if(h.length===before) throw new Error('no se inyecto: '+file);
  fs.writeFileSync(file,h);
  console.log(path,'→',o.secs,'secciones ·',o.site.length,'chars');
  await p.context().close();
}
await b.close();
