# Bernard "Biff" Pettingill — Authority Platform, preview privado.
# Parte de la plantilla de Mark Cooke, con la calibracion sin fotografia de
# Freudenthal (Biff no ha autorizado retratos) y cuatro piezas propias:
#   legend  — la clave de fuentes (autodeclarado / documento / registro externo / conteo)
#   figs    — las tres cifras publicadas, cada una con lo que mide y donde aparece
#   tally   — el listado testimonial contado por ano, con tabla accesible
#   pubs    — publicaciones con autor, revista, identificador y registro externo
# Todo el texto vive en pettingill/content.json; este script solo reparte y deriva.
import json, re, os, copy

TPL = '/home/user/ignite-yourself-operations/clients/jorge-arce/mark-cooke/index.html'
DST = '/home/user/ignite-yourself-operations/clients/jorge-arce/pettingill'

base = open(TPL, encoding='utf-8').read()
full = json.load(open(DST + '/content.json', encoding='utf-8'))
S = {(s.get('id') or s['type']): s for s in full['sections']}

def sub1(p, r, s, flags=0, tag=''):
    out, n = re.subn(p, r, s, count=1, flags=flags)
    assert n == 1, 'no encontrado: ' + tag
    return out

# ---------------------------------------------------------------- 1. rutas
base = base.replace('/mark-cooke/', '/pettingill/')

# ------------------------------------------- 2. sin foto: hero y method
base = sub1(r"'<section class=\"hero\" id=\"top\">'\+bigimg\(s\.img,'ph'\)\+",
            "'<section class=\"hero'+(s.plate?' plate':'')+(s.img&&s.img.src?' photo':'')+'\" id=\"top\">'+heroimg(s.img)+",
            base, tag='hero-bigimg')
base = sub1(r"bigimg\(s\.img,'ph wr','data-r1'\)\+",
            "(s.img?bigimg(s.img,'ph wr','data-r1'):'')+",
            base, tag='method-bigimg')
base = base.replace('/* ---------- hero: calibrado a la fotografia de Mark ---------- */',
                    '/* ---------- hero: reglas heredadas de fotografia (inertes aqui) ---------- */')
base = base.replace('/* en vertical el recorte es horizontal: Mark se corre al centro y la rampa',
                    '/* (heredado del concepto con fotografia; sin imagen no aplica)')

# ------------------------------------------------------- 3. cabeza del documento
TITLE = 'Bernard “Biff” Pettingill, Ph.D. — Forensic Economist &amp; Expert Witness'
DESC = ('A private authority-platform concept: the forensic economics record of '
        'Bernard F. Pettingill, Jr., Ph.D., with the source behind every figure.')
URL = 'https://igniteyourself.co/pettingill'

base = sub1(r'<title>[^<]*</title>', f'<title>{TITLE}</title>', base, tag='title')
base = sub1(r'(<meta name="description" content=")[^"]*(">)',
            lambda m: m.group(1) + DESC + m.group(2), base, tag='desc')
base = sub1(r'(<meta property="og:site_name" content=")[^"]*(">)',
            lambda m: m.group(1) + 'Bernard F. Pettingill, Jr., Ph.D.' + m.group(2), base, tag='og-site')
base = sub1(r'(<meta property="og:title" content=")[^"]*(">)',
            lambda m: m.group(1) + TITLE + m.group(2), base, tag='og-title')
base = sub1(r'(<meta property="og:description" content=")[^"]*(">)',
            lambda m: m.group(1) + DESC + m.group(2), base, tag='og-desc')
base = sub1(r'(<meta property="og:url" content=")[^"]*(">)',
            lambda m: m.group(1) + URL + m.group(2), base, tag='og-url')

# La tarjeta social heredada era la de Mark: fuera hasta que haya una propia.
for pat in [r'\s*<meta property="og:image"[^>]*>', r'\s*<meta property="og:image:width"[^>]*>',
            r'\s*<meta property="og:image:height"[^>]*>', r'\s*<meta name="twitter:card"[^>]*>',
            r'\s*<link rel="icon"[^>]*>', r'\s*<link rel="apple-touch-icon"[^>]*>']:
    base = re.sub(pat, '', base, count=1)

base = sub1(r'(<meta name="robots"[^>]*>)',
            lambda m: m.group(1) + '\n<link rel="icon" href="/pettingill/assets/icon.svg" type="image/svg+xml">'
            '\n<meta property="og:image" content="https://igniteyourself.co/pettingill/assets/og.jpg">'
            '\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">'
            '\n<meta name="twitter:card" content="summary_large_image">',
            base, tag='icon-new')

# ------------------------------------------- 4. texto enriquecido: fuente y enlace
# <src>…</src> pinta la etiqueta de procedencia; [texto](url) un enlace en linea.
# rich() escapa primero, asi que solo se reabren estas dos formas.
base = sub1(r'function rich\(s\)\{return esc\(s\)', 'function rich0(s){return esc(s)', base, tag='rich0')
RICH = r"""
function heroimg(img){if(!img||!img.src)return'';
  var m=img.mobile?'<source media="(max-width:860px)" srcset="'+esc(img.mobile)+'">':'';
  return'<div class="ph"><picture>'+m+'<img src="'+esc(img.src)+'" alt="'+esc(img.alt||'')+'"></picture></div>'}
function rich(s){return rich0(s)
  .replace(/&lt;src&gt;/g,'<span class="src">').replace(/&lt;\/src&gt;/g,'</span>')
  .replace(/&lt;sup&gt;/g,'<sup>').replace(/&lt;\/sup&gt;/g,'</sup>')
  .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,function(m,t,u){var ext=/^https?:/.test(u);
    return'<a class="ilink" href="'+u+'"'+(ext?' target="_blank" rel="noopener"':'')+'>'+t+'</a>'})}
"""
base = sub1(r'(function bigimg\()', lambda m: RICH + m.group(1), base, tag='rich')

# -------- la ficha de firma: enlaces internos sin pestana nueva, con data-path
base = sub1(r"""\(s\.social\|\|\[\]\)\.map\(function\(x\)\{return'<a class="go" href="'\+esc\(x\.h\)\+'" target="_blank" rel="noopener">'\+esc\(x\.t\)\+'</a>'\}\)\.join\(''\)\+""",
            """(s.social||[]).map(function(x){var ext=/^https?:/.test(x.h);return'<a class="go" href="'+esc(x.h)+'"'+(ext?' target="_blank" rel="noopener"':'')+(x.path?' data-path="'+esc(x.path)+'"':'')+'>'+esc(x.t)+'</a>'}).join('')+""",
            base, tag='practice-social')

# ---------------------------------------------------------- 5. partials propios
PARTIALS = r"""
nums:function(s){
  return'<section class="nums'+(s.ink?' ink':'')+'" id="'+esc(s.id||'nums')+'"><div class="wrap">'+
  (s.label?'<div class="smallcap wr" data-r1>'+esc(s.label)+'</div>':'')+
  '<div class="ngrid" data-cards>'+(s.items||[]).map(function(it){
    return'<div class="nit wr"><div class="nn">'+rich(it.n)+'</div><div class="nk">'+rich(it.k)+'</div>'+
      (it.src?'<span class="src">'+esc(it.src)+'</span>':'')+'</div>'}).join('')+'</div>'+
  (s.more?'<div class="pmore wr" data-r1><a href="'+esc(s.more.h)+'">'+esc(s.more.t)+'</a></div>':'')+
  '</div></section>'},
stmt:function(s){
  return'<section class="stmt'+(s.ink?' ink':'')+(s.img?' withimg':'')+(s.align==='right'?' tr':'')+'" id="'+esc(s.id||'stmt')+'">'+
  (s.img&&s.img.src?'<div class="sph"><img src="'+esc(s.img.src)+'" alt="'+esc(s.img.alt||'')+'" loading="lazy"'+(s.img.pos?' style="object-position:'+esc(s.img.pos)+'"':'')+'></div>':'')+
  '<div class="wrap" data-r2>'+
  (s.label?'<div class="slab smallcap wr">'+esc(s.label)+'</div>':'')+
  '<h2 class="sq wr">'+rich(s.quote)+'</h2>'+
  (s.sub?'<p class="ssub wr">'+rich(s.sub)+'</p>':'')+
  (s.keys?'<ul class="skeys'+(s.tags?' astags':'')+' wr">'+(s.keys||[]).map(function(k){return'<li>'+(s.tags?'<span class="src">'+esc(k)+'</span>':esc(k))+'</li>'}).join('')+'</ul>':'')+
  '<div class="sfoot wr">'+
    (s.src?'<span class="src">'+esc(s.src)+'</span>':'<span></span>')+
    (s.more?'<a class="smore" href="'+esc(s.more.h)+'">'+esc(s.more.t)+'</a>':'')+
  '</div>'+
  '</div></section>'},
legend:function(s){
  return'<section class="legend" id="'+esc(s.id||'legend')+'"><div class="wrap">'+
  '<div class="shead rail" data-r2><div class="rlab"><span class="rnum wr">'+esc(s.no||'')+'</span><span class="smallcap wr">'+esc(s.label)+'</span></div>'+
  '<div><h2 class="d56 wr">'+rich(s.title)+'</h2>'+(s.lede?'<p class="elede wr">'+rich(s.lede)+'</p>':'')+'</div></div>'+
  '<div class="lgd" data-cards>'+(s.items||[]).map(function(it){
    return'<div class="lgi wr"><span class="src">'+esc(it.k)+'</span><p>'+rich(it.d)+'</p></div>'}).join('')+'</div>'+
  '</div></section>'},
figs:function(s){
  return'<section class="figs" id="'+esc(s.id||'figs')+'"><div class="wrap">'+
  '<div class="phead" data-r2><span class="rnum wr">'+esc(s.no||'')+'</span><span class="smallcap wr">'+esc(s.label)+'</span></div>'+
  '<h2 class="d80 ptitle wr" data-r1>'+rich(s.title)+'</h2>'+
  '<div class="fgs" data-cards>'+(s.cards||[]).map(function(c){
    return'<div class="fgc wr'+(c.pending?' pend':'')+'">'+
      '<div class="fgn">'+esc(c.n)+'</div>'+
      '<div class="fgw">'+esc(c.what)+'</div>'+
      '<a class="fgwhere" href="'+esc(c.href)+'" target="_blank" rel="noopener">'+esc(c.where)+'</a>'+
      '<p class="fgs-st"><span class="dot" aria-hidden="true"></span>'+esc(c.status)+'</p>'+
    '</div>'}).join('')+'</div>'+
  '</div></section>'},
tally:function(s){
  var ys=s.years||[],ser=s.series||[];
  var tot=ys.map(function(y){return ser.reduce(function(a,k){return a+(y[k.k]||0)},0)});
  var max=Math.max.apply(null,tot),top=Math.ceil(max/20)*20,peak=tot.indexOf(max);
  var grid=[];for(var g=20;g<=top;g+=20)grid.push(g);
  function cap(y){return y.y+' — '+ser.map(function(k){return(y[k.k]||0)+' '+k.t.toLowerCase()}).join(', ')}
  var chart='<div class="tch" role="img" aria-label="Testimony listing entries per year, stacked by depositions and trials. Peak: '+esc(ys[peak].y)+', '+max+' entries.">'+
    '<div class="tgrid" aria-hidden="true">'+grid.map(function(g){return'<span style="bottom:'+(g/top*100)+'%"><em>'+g+'</em></span>'}).join('')+'</div>'+
    '<div class="tbars">'+ys.map(function(y,i){
      var segs=ser.map(function(k){var v=y[k.k]||0;return v?'<i class="tseg" style="height:'+(v/top*100)+'%;background:'+esc(k.c)+'"></i>':''}).join('');
      return'<div class="tcol" tabindex="0" data-tip="'+esc(cap(y))+'"><div class="tstack">'+
        (i===peak?'<b class="tpeak">'+tot[i]+'</b>':'')+segs+'</div><span class="tyr">'+esc(y.y)+'</span></div>'}).join('')+'</div>'+
    '<div class="ttip" aria-hidden="true"></div></div>';
  var legend='<div class="tlg">'+ser.map(function(k){return'<span><i style="background:'+esc(k.c)+'"></i>'+esc(k.t)+'</span>'}).join('')+'</div>';
  var table='<details class="ttab"><summary>View as table</summary><table><thead><tr><th>Year</th>'+
    ser.map(function(k){return'<th>'+esc(k.t)+'</th>'}).join('')+'<th>Total</th></tr></thead><tbody>'+
    ys.map(function(y,i){return'<tr><td>'+esc(y.y)+'</td>'+ser.map(function(k){return'<td>'+(y[k.k]||0)+'</td>'}).join('')+'<td>'+tot[i]+'</td></tr>'}).join('')+
    '</tbody></table></details>';
  return'<section class="tally" id="'+esc(s.id||'tally')+'"><div class="wrap">'+
  '<div class="shead rail" data-r2><div class="rlab"><span class="rnum wr">'+esc(s.no||'')+'</span><span class="smallcap wr">'+esc(s.label)+'</span></div>'+
  '<div><h2 class="d80 wr">'+rich(s.title)+'</h2>'+(s.lede?'<p class="elede wr">'+rich(s.lede)+'</p>':'')+
  (s.doc?'<a class="tdoc wr" href="'+esc(s.doc.h)+'" target="_blank" rel="noopener">'+esc(s.doc.t)+'</a>':'')+'</div></div>'+
  '<div class="tstats" data-cards>'+(s.stats||[]).map(function(x){return'<div class="tst wr"><div class="tn">'+esc(x.n)+'</div><div class="smallcap">'+esc(x.k)+'</div><p>'+esc(x.d)+'</p></div>'}).join('')+'</div>'+
  '<div class="tlay" data-r1><div class="tmain"><div class="thd"><span class="smallcap">Entries per year</span>'+legend+'</div>'+chart+table+'</div>'+
  (s.beyond?'<div class="tbey"><span class="smallcap">'+esc(s.beyond.k)+'</span><span class="lcount">'+('0'+s.beyond.items.length).slice(-2)+'</span><ul>'+
    s.beyond.items.map(function(x){return'<li>'+esc(x)+'</li>'}).join('')+'</ul></div>':'')+'</div>'+
  (s.fn?'<div class="efn wr smallcap" data-r1>'+esc(s.fn)+'</div>':'')+
  '</div></section>'},
pubs:function(s){
  return'<section class="pubs" id="'+esc(s.id||'pubs')+'"><div class="wrap">'+
  '<div class="shead rail" data-r2><div class="rlab"><span class="rnum wr">'+esc(s.no||'')+'</span><span class="smallcap wr">'+esc(s.label)+'</span></div>'+
  '<div><h2 class="d80 wr">'+rich(s.title)+'</h2>'+(s.lede?'<p class="elede wr">'+rich(s.lede)+'</p>':'')+'</div></div>'+
  '<ol class="plist">'+(s.items||[]).map(function(p){
    return'<li class="prow wr" data-r1>'+
      '<span class="pyr">'+esc(p.y)+'</span>'+
      '<div class="pmain"><h3><a href="'+esc(p.h)+'" target="_blank" rel="noopener">'+esc(p.t)+'</a></h3>'+
        '<p class="pau">'+esc(p.a)+'</p><p class="pve">'+esc(p.v)+'</p>'+
        (p.why?'<p class="pwhy"><span class="smallcap">For counsel</span>'+esc(p.why)+'</p>':'')+'</div>'+
      '<div class="pside"><span class="src'+(p.pending?' pend':'')+'">'+esc(p.src)+'</span><span class="pid">'+esc(p.id)+'</span></div>'+
    '</li>'}).join('')+'</ol>'+
  '</div></section>'},
"""
base = sub1(r'var partials=\{', lambda m: m.group(0) + PARTIALS, base, tag='partials')

# El tooltip del grafico: delegacion en document, asi funciona igual sobre el
# HTML pre-renderizado y sobre el que pinta el fetch.
TIPJS = r"""<script>
(function(){
  function show(col){var ch=col.closest('.tch');if(!ch)return;var tip=ch.querySelector('.ttip');
    tip.textContent=col.getAttribute('data-tip');
    var r=col.getBoundingClientRect(),cr=ch.getBoundingClientRect();
    var x=r.left-cr.left+r.width/2;x=Math.max(90,Math.min(cr.width-90,x));
    tip.style.left=x+'px';tip.classList.add('on');col.classList.add('hot')}
  function hide(col){var ch=col.closest('.tch');if(!ch)return;ch.querySelector('.ttip').classList.remove('on');col.classList.remove('hot')}
  document.addEventListener('mouseover',function(e){var c=e.target.closest&&e.target.closest('.tcol');if(c)show(c)});
  document.addEventListener('mouseout',function(e){var c=e.target.closest&&e.target.closest('.tcol');if(c&&!c.contains(e.relatedTarget))hide(c)});
  document.addEventListener('focusin',function(e){var c=e.target.closest&&e.target.closest('.tcol');if(c)show(c)});
  document.addEventListener('focusout',function(e){var c=e.target.closest&&e.target.closest('.tcol');if(c)hide(c)});
})();
</script>"""
base = sub1(r'</body>', TIPJS + '\n</body>', base, tag='tipjs')

# --------------------------------------------------------- 6. calibrado visual
CAL = """<style>
/* ============ Calibrado Pettingill: sin fotografia, acento laton de archivo ============ */
:root{
  --red:#B5833F;              /* laton: libro de cuentas, no alarma */
  --brass:#B5833F;
  --dep:#3B64A0;
  --sec:clamp(118px,17vh,206px);
}

/* ---------- barra superior permanente ---------- */
.topbar{pointer-events:auto}
.topbar .tname{pointer-events:auto}
.tnav{display:flex;gap:clamp(18px,2.8vw,42px)}
.tnav a{font-size:11px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;
  opacity:.62;padding-bottom:3px;border-bottom:1px solid transparent;transition:opacity .2s,border-color .2s}
.tnav a:hover{opacity:1}
.tnav a.on{opacity:1;border-bottom-color:rgba(255,255,255,.6)}
.menuchip,.menupanel{display:none}
.tbot{display:none}

/* ---------- hero sin fotografia: campo de tinta, regla fina, escala ---------- */
.hero{background:var(--ink);min-height:clamp(620px,92svh,940px);
  justify-content:flex-end;padding-bottom:clamp(72px,11vh,132px)}
.hero::before{content:'';position:absolute;inset:0;
  background:
    radial-gradient(120% 90% at 12% 108%,rgba(181,131,63,.16),rgba(181,131,63,0) 60%),
    linear-gradient(180deg,rgba(255,255,255,.045) 0%,rgba(255,255,255,0) 30%)}
.hero::after{content:'';position:absolute;left:clamp(20px,5vw,80px);right:clamp(20px,5vw,80px);
  top:clamp(96px,13vh,150px);height:1px;background:rgba(255,255,255,.13)}
.hero .inr{padding-top:clamp(120px,16vh,190px)}
.hero .hname{white-space:normal;font-size:clamp(46px,9.4vw,138px);max-width:12ch}
.hero .hname .it{color:rgba(255,255,255,.5);font-weight:400}
.hero .hsub{max-width:24ch}
.hero .hnote{display:block;position:relative;padding-left:22px;
  max-width:54ch;font-size:clamp(14px,1.18vw,18px);line-height:1.66;color:rgba(255,255,255,.82)}
.hero .hnote::before{position:absolute;left:0;top:.72em;margin-top:0}
.hero .hnote .it{color:rgba(255,255,255,.58)}

/* ============ Tipografia de marca: serif para afirmar, grotesca para probar ============ */
@font-face{font-family:'Editors Note';src:url(/pettingill/assets/fonts/EditorsNote-Light.otf) format('opentype');font-weight:300;font-style:normal;font-display:swap}
@font-face{font-family:'Editors Note';src:url(/pettingill/assets/fonts/EditorsNote-Regular.otf) format('opentype');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'Editors Note';src:url(/pettingill/assets/fonts/EditorsNote-LightItalic.otf) format('opentype');font-weight:300;font-style:italic;font-display:swap}
@font-face{font-family:'Editors Note';src:url(/pettingill/assets/fonts/EditorsNote-Italic.otf) format('opentype');font-weight:400;font-style:italic;font-display:swap}
:root{--serif:'Editors Note',Georgia,'Times New Roman',serif;--bg:#EDE7DC;--line:rgba(20,22,26,.14)}
body{background:var(--bg)}
.legend{background:#E4DED2}
.sq,.d80,.d56,.d97,.ptitle,.mission .wrap>p,.band .bq,.pmain h3,.pcard h3,.mrow h4,.skeys li,.fname{
  font-family:var(--serif);font-weight:300;letter-spacing:-.012em}
.sq .it,.d80 .it,.d56 .it,.d97 .it,.ptitle .it,.mission p .it,.band .bq .it,.hero .hname .it{
  font-family:var(--serif);font-style:italic;font-weight:300}
.sq{font-size:clamp(44px,7.4vw,124px);line-height:.98;max-width:12ch}
.d80{font-size:clamp(38px,5.6vw,84px);line-height:1;letter-spacing:-.01em}
.d56{font-size:clamp(28px,3.6vw,50px);line-height:1.06;letter-spacing:-.005em}
.reserve .d97{font-size:clamp(38px,4.6vw,70px);line-height:1;letter-spacing:-.01em}
.mission .wrap>p{font-size:clamp(32px,4.4vw,68px);line-height:1.06;max-width:22ch;letter-spacing:-.01em}
.band .bq{font-size:clamp(34px,4.6vw,70px);line-height:1.02;max-width:20ch}
.pmain h3{font-weight:400;font-size:clamp(21px,1.9vw,30px);line-height:1.18;letter-spacing:0}
.pcard h3{font-weight:400;letter-spacing:0;font-size:clamp(22px,2vw,32px)}
.mrow h4{font-weight:400;letter-spacing:0;font-size:clamp(19px,1.6vw,25px)}
.skeys li{font-weight:400;letter-spacing:0;font-size:clamp(20px,2vw,30px)}
.fname{font-size:clamp(44px,7vw,110px);letter-spacing:-.02em}
.topbar .tname{font-family:var(--serif);font-weight:400;font-size:15px;letter-spacing:.16em;text-transform:uppercase}

/* ---------- la firma: logo en placa, enlaces, version en tinta ---------- */
.practice .prlogo{background:var(--ink);padding:22px 28px;border:0}
.practice .prlogo img{width:clamp(200px,20vw,260px)}
.practice.ink .prlogo{padding:0}
.practice.ink{background:var(--ink);color:#fff;padding:var(--sec) 0}
.practice.ink .smallcap{color:rgba(255,255,255,.5)}
.practice.ink .rnum{color:rgba(255,255,255,.34)}
.practice.ink .elede{color:rgba(255,255,255,.72)}
.practice.ink .prrole{color:#fff}
.practice.ink .prdesc{color:rgba(255,255,255,.78)}
.practice.ink .prmeta{color:rgba(255,255,255,.5)}
.practice.ink .prlogo{background:transparent}
.practice.ink .prid .go{border-bottom-color:rgba(255,255,255,.45);color:#fff}
.practice.ink .lhead .smallcap{color:rgba(255,255,255,.72)}
.practice.ink .lgrid{border-top-color:rgba(255,255,255,.3)}
.practice.ink .lcell{border-bottom-color:rgba(255,255,255,.13)}
.fmark{display:inline-block;background:transparent;padding:0;margin-bottom:22px}
.fmark img{width:clamp(190px,18vw,250px);height:auto}
.tnav a.ext{opacity:.85}

/* ---------- hero a sangre: la fotografia manda, el texto vive en su sombra ---------- */
.hero.photo::before{content:none}
.hero.photo .ph img{filter:contrast(1.04) brightness(.96) saturate(.9);object-position:68% 30%}
.hero.photo .ph::after{background:
  linear-gradient(90deg,rgba(14,16,19,.8) 0%,rgba(14,16,19,.5) 36%,rgba(14,16,19,.06) 64%),
  linear-gradient(180deg,rgba(14,16,19,.38) 0%,rgba(14,16,19,0) 30%,rgba(14,16,19,.62) 100%)}
.hero.photo .inr{padding-right:0}
.hero .hname{font-family:var(--serif);font-weight:300;letter-spacing:-.02em;line-height:.94;
  font-size:clamp(52px,8.8vw,136px);max-width:9.2ch;white-space:normal}
.hero .hcred{margin-top:clamp(14px,2vh,22px)}
.hero .hname .it{color:rgba(255,255,255,.7)}
.hero .hsub{font-family:'Instrument Sans',sans-serif;font-weight:400;font-size:clamp(16px,1.35vw,21px);
  line-height:1.5;letter-spacing:-.01em;max-width:42ch;color:rgba(255,255,255,.88);margin-top:clamp(22px,3vh,34px)}
.hero .hsub .it{color:rgba(255,255,255,.56);font-weight:400}

/* ---------- hero con placa: retrato a tamano medio, no a sangre ----------
   El unico retrato publico mide 216px; a sangre completa se desharia. Como placa
   funciona, y cuando llegue fotografia propia basta quitar "plate" en el JSON. */
.hero.plate .ph{position:absolute;inset:auto clamp(20px,5vw,80px) clamp(72px,11vh,132px) auto;
  width:clamp(240px,24vw,380px);aspect-ratio:3/4;overflow:hidden;z-index:1}
.hero.plate .ph img{object-position:50% 18%;filter:grayscale(1) contrast(1.1) brightness(.9)}
.hero.plate .ph::after{background:linear-gradient(180deg,rgba(20,22,26,0) 58%,rgba(20,22,26,.5) 100%)}
.hero.plate .ph::before{content:'';position:absolute;left:0;right:0;bottom:0;height:3px;background:var(--brass);z-index:2}
.hero.plate .inr{padding-right:clamp(280px,30vw,480px)}
.hero.plate .hname{font-size:clamp(44px,8.4vw,122px);max-width:none}
.hero.plate .hsub{max-width:26ch;font-size:clamp(20px,2.1vw,30px)}

/* ---------- nums: tres cifras como objeto grafico ---------- */
.nums{padding:var(--sec) 0}
.nums.ink{background:var(--ink);color:#fff}
.nums.ink .smallcap{color:rgba(255,255,255,.5)}
.ngrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:clamp(36px,5vh,60px);
  border-top:1px solid rgba(255,255,255,.3)}
.nit{padding:clamp(34px,5vh,56px) clamp(16px,2.4vw,40px) 10px 0;border-right:1px solid rgba(255,255,255,.13)}
.nit+.nit{padding-left:clamp(16px,2.4vw,40px)}
.nit:last-child{border-right:0}
.nn{font-weight:500;letter-spacing:-.055em;line-height:.86;font-size:clamp(64px,8.6vw,138px);font-variant-numeric:tabular-nums;white-space:nowrap}
.nn sup{font-size:.42em;vertical-align:top;position:relative;top:.12em;letter-spacing:0;color:var(--brass)}
.nk{margin-top:22px;font-size:clamp(16px,1.5vw,22px);letter-spacing:-.02em;line-height:1.3;max-width:16ch}
.nit .src{display:table;margin-top:22px;color:rgba(255,255,255,.5)}
.nums .pmore a{color:#fff;border-color:rgba(255,255,255,.45)}
@media(max-width:860px){.ngrid{grid-template-columns:1fr}.nit{border-right:0;padding-left:0!important;
  border-bottom:1px solid rgba(255,255,255,.13);padding-bottom:30px}.nit:last-child{border-bottom:0}
  .nn{font-size:clamp(64px,20vw,110px)}}

/* ---------- stmt: una frase por pantalla ---------- */
.stmt{position:relative;min-height:clamp(540px,86svh,900px);display:flex;align-items:center;overflow:hidden;
  padding:clamp(80px,12vh,140px) 0}
.stmt.ink{background:var(--ink);color:#fff}
.stmt .wrap{position:relative;z-index:2;width:100%}
.slab{display:block;margin-bottom:clamp(26px,4vh,40px)}
.stmt.ink .slab{color:rgba(255,255,255,.5)}
.sq{font-weight:500;letter-spacing:-.048em;line-height:.98;font-size:clamp(40px,6.8vw,116px);max-width:13ch}
.sq .it{font-weight:400;color:rgba(14,14,26,.42)}
.stmt.ink .sq .it{color:rgba(255,255,255,.48)}
.ssub{margin-top:clamp(26px,4vh,40px);max-width:46ch;font-size:clamp(15px,1.3vw,19px);line-height:1.6;color:#3c3f44}
.stmt.ink .ssub{color:rgba(255,255,255,.78)}
.skeys{list-style:none;margin-top:clamp(36px,5.5vh,64px);display:grid;grid-template-columns:repeat(4,minmax(0,1fr));
  border-top:1px solid currentColor;max-width:1100px}
.skeys li{padding:18px clamp(12px,1.6vw,24px) 18px 0;font-size:clamp(16px,1.55vw,23px);font-weight:500;
  letter-spacing:-.02em;border-bottom:1px solid var(--line)}
.stmt.ink .skeys li{border-bottom-color:rgba(255,255,255,.14)}
.skeys.astags{display:flex;flex-wrap:wrap;gap:12px;border-top:0;max-width:none}
.skeys.astags li{padding:0;border:0}
.stmt.ink .skeys.astags .src{color:rgba(255,255,255,.72);font-size:11.5px;padding:7px 12px 6px}
.sfoot{display:flex;justify-content:space-between;align-items:baseline;gap:20px;flex-wrap:wrap;
  margin-top:clamp(40px,6vh,72px);max-width:1100px}
.stmt .sfoot .src{color:var(--gray)}
.stmt.ink .sfoot .src{color:rgba(255,255,255,.5)}
.smore{font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;border-bottom:1px solid;
  padding-bottom:4px;transition:border-color .3s;border-color:rgba(20,22,26,.4)}
.smore:hover{border-color:currentColor}
.stmt.ink .smore{color:#fff;border-color:rgba(255,255,255,.45)}
.stmt.withimg{color:#fff}
.stmt .sph{position:absolute;inset:0;z-index:1}
.stmt .sph img{width:100%;height:100%;object-fit:cover;filter:none}
.stmt .sph::after{content:'';position:absolute;inset:0;background:
  linear-gradient(90deg,rgba(14,16,19,.5) 0%,rgba(14,16,19,.22) 34%,rgba(14,16,19,0) 55%),
  linear-gradient(180deg,rgba(14,16,19,0) 55%,rgba(14,16,19,.42) 100%)}
.stmt.withimg{min-height:clamp(600px,92svh,980px);align-items:flex-end;padding-bottom:clamp(64px,9vh,110px)}
.stmt.withimg .sq{font-size:clamp(40px,5.4vw,90px);max-width:8.6ch}
/* texto a la derecha, sobre el vacio de la imagen */
.stmt.tr .wrap{display:flex;flex-direction:column;align-items:flex-end}
.stmt.tr .wrap>*{width:min(100%,620px)}
.stmt.tr .sph::after{background:
  linear-gradient(270deg,rgba(14,16,19,.55) 0%,rgba(14,16,19,.25) 34%,rgba(14,16,19,0) 55%),
  linear-gradient(180deg,rgba(14,16,19,0) 55%,rgba(14,16,19,.42) 100%)}
.stmt.tr .sq{max-width:none;font-size:clamp(40px,5vw,84px)}
@media(max-width:860px){.stmt.tr .wrap{align-items:flex-start}.stmt.tr .wrap>*{width:100%}}
.stmt.withimg .skeys{grid-template-columns:1fr 1fr;max-width:560px}
.stmt.withimg .sfoot{max-width:560px}
.stmt.withimg .sq .it{color:rgba(255,255,255,.7)}
.stmt.withimg .ssub,.stmt.withimg .slab{color:rgba(255,255,255,.78)}
.stmt.withimg .skeys{border-top-color:rgba(255,255,255,.5)}
.stmt.withimg .skeys li{border-bottom-color:rgba(255,255,255,.18)}
.stmt.withimg .smore{color:#fff;border-color:rgba(255,255,255,.5)}
.stmt.withimg .sfoot .src{color:rgba(255,255,255,.6)}
/* movil: la foto en la franja superior, el texto debajo sobre tinta (como el hero) */
@media(max-width:860px){.stmt.withimg{min-height:100svh;background:var(--ink);color:#fff;display:flex;align-items:flex-end;padding:0 0 clamp(48px,7vh,72px)}
  .stmt.withimg .sph{inset:0 0 auto 0;height:56svh}
  .stmt.withimg .sph::after,.stmt.tr .sph::after{background:linear-gradient(180deg,rgba(20,22,26,0) 0%,rgba(20,22,26,0) 55%,rgba(20,22,26,.85) 88%,#14161A 100%)}
  .stmt.withimg .wrap{padding-top:50svh}
  .stmt.withimg .sq{font-size:clamp(36px,10.5vw,56px)}}
@media(max-width:860px){.stmt{min-height:auto;padding:clamp(72px,12vh,110px) 0}
  .sq{font-size:clamp(38px,11.5vw,64px)}.skeys{grid-template-columns:1fr 1fr}}

/* ---------- band sin fotografia ---------- */
.band .bph{display:none}
.band{background:var(--ink);color:#fff;min-height:auto;padding:clamp(96px,15vh,180px) 0}
.band .bin{position:relative;background:none}
.band .bin::before{content:none}
.band .bq{max-width:21ch}
.band.proposal{background:#1B1E23}
.band.proposal .bq{max-width:24ch}
.band.proposal .bwho{max-width:56ch;text-transform:none;letter-spacing:0;font-size:13.5px;line-height:1.6;color:rgba(255,255,255,.55)}

/* ---------- method sin fotografia: filas a dos columnas ---------- */
.method .lay{grid-template-columns:1fr}
.method .ph{display:none}
.method .mintro{max-width:64ch}
.mrow{display:grid;grid-template-columns:clamp(180px,22vw,320px) minmax(0,1fr);
  gap:clamp(20px,3.5vw,56px);align-items:start}
.mrow p{max-width:64ch}
@media(max-width:860px){.mrow{grid-template-columns:1fr;gap:10px}}

/* ---------- escala y silencio ---------- */
.d80{font-size:clamp(36px,5.5vw,82px);letter-spacing:-.046em;line-height:.98}
.shead.rail,.shead.lft{margin-bottom:clamp(54px,8vh,90px)}
.pit .pn{font-size:clamp(22px,2.4vw,36px)}
.plede,.elede{font-size:clamp(13.5px,1.1vw,16px)}
.pathgrid{margin-top:clamp(52px,7.5vh,84px)}
.ink .phead{margin-bottom:16px}
.ptitle{color:#fff;max-width:17ch;margin-bottom:clamp(44px,6.5vh,76px)}
.lgrid.wide .lcell{font-size:clamp(13.5px,1.05vw,15.5px);line-height:1.6;letter-spacing:0;text-transform:none}

/* ---------- salidas progresivas ---------- */
.pmore{margin-top:clamp(30px,4.2vh,46px);display:flex;justify-content:flex-end}
.pmore a,.bmore{display:inline-block;font-size:11px;font-weight:500;letter-spacing:.2em;
  text-transform:uppercase;border-bottom:1px solid;padding-bottom:4px;transition:border-color .3s}
.pmore a,.bmore{color:#fff;border-color:rgba(255,255,255,.45)}
.pmore a:hover,.bmore:hover{border-color:#fff}

/* ---------- la etiqueta de procedencia: la pieza que define el sitio ---------- */
.src{display:inline-block;font-family:ui-monospace,'SF Mono',Menlo,monospace;font-size:10px;font-weight:500;
  letter-spacing:.09em;text-transform:uppercase;line-height:1.5;padding:3px 8px 2px;
  border:1px solid currentColor;border-radius:2px;color:var(--gray);white-space:normal}
.pit .src{display:table;margin-top:14px;color:rgba(255,255,255,.55)}
.src.pend{border-style:dashed}
.ilink{border-bottom:1px solid currentColor;padding-bottom:1px;white-space:nowrap;opacity:.9}
.ilink:hover{opacity:1}
.method .ilink{color:#fff;border-bottom-color:rgba(255,255,255,.4);margin-left:2px}

/* ---------- legend ---------- */
.legend{padding:var(--sec) 0;background:#EAE8E4}
.lgd{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:0;border-top:1px solid var(--ink)}
.lgi{padding:26px clamp(14px,1.8vw,28px) 6px 0;border-right:1px solid var(--line)}
.lgi:last-child{border-right:0}
.lgi+.lgi{padding-left:clamp(14px,1.8vw,28px)}
.lgi .src{color:var(--ink)}
.lgi p{margin-top:16px;max-width:34ch;color:#3c3f44;font-size:14px;line-height:1.6}
@media(max-width:980px){.lgd{grid-template-columns:1fr 1fr}.lgi:nth-child(2){border-right:0}
  .lgi:nth-child(3){padding-left:0}.lgi:nth-child(n+3){border-top:1px solid var(--line)}}
@media(max-width:560px){.lgd{grid-template-columns:1fr}.lgi{border-right:0;padding-left:0!important}
  .lgi+.lgi{border-top:1px solid var(--line)}}

/* ---------- figs: las tres cifras ---------- */
.figs{background:var(--ink);color:#fff;padding:var(--sec) 0}
.figs .phead{display:flex;gap:18px;align-items:baseline;margin-bottom:16px}
.figs .smallcap{color:rgba(255,255,255,.5)}
.figs .rnum{color:rgba(255,255,255,.34)}
.fgs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid rgba(255,255,255,.3)}
.fgc{padding:clamp(28px,4vh,44px) clamp(16px,2.4vw,40px) 8px 0;border-right:1px solid rgba(255,255,255,.13)}
.fgc+.fgc{padding-left:clamp(16px,2.4vw,40px)}
.fgc:last-child{border-right:0}
.fgn{font-weight:500;letter-spacing:-.05em;line-height:.9;font-size:clamp(56px,8vw,128px)}
.fgc.pend .fgn{color:rgba(255,255,255,.42)}
.fgw{margin-top:18px;font-size:clamp(16px,1.4vw,21px);letter-spacing:-.02em;line-height:1.3;max-width:20ch}
.fgwhere{display:inline-block;margin-top:18px;font-size:12.5px;line-height:1.5;color:rgba(255,255,255,.62);
  border-bottom:1px solid rgba(255,255,255,.25);padding-bottom:2px;max-width:36ch}
.fgwhere:hover{color:#fff;border-bottom-color:#fff}
.fgs-st{margin-top:22px;font-size:12.5px;line-height:1.55;color:rgba(255,255,255,.78);max-width:34ch;
  display:flex;gap:10px;align-items:baseline}
.fgs-st .dot{flex:0 0 7px;height:7px;border-radius:50%;background:var(--brass);transform:translateY(-1px)}
.fgc.pend .fgs-st .dot{background:transparent;border:1px dashed rgba(255,255,255,.7)}
@media(max-width:860px){.fgs{grid-template-columns:1fr}.fgc{border-right:0;padding-left:0!important;
  border-bottom:1px solid rgba(255,255,255,.13);padding-bottom:30px}}

/* ---------- tally: el listado contado ---------- */
.tally{padding:var(--sec) 0}
.tdoc{display:inline-block;margin-top:22px;font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;
  border-bottom:1px solid var(--ink);padding-bottom:4px}
.tstats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid var(--ink)}
.tst{padding:26px clamp(12px,1.6vw,26px) 4px 0}
.tst+.tst{padding-left:clamp(12px,1.6vw,26px);border-left:1px solid var(--line)}
.tn{font-weight:500;letter-spacing:-.05em;line-height:.9;font-size:clamp(44px,5.6vw,86px)}
.tst .smallcap{display:block;margin-top:14px;color:var(--ink)}
.tst p{margin-top:8px;font-size:13px;line-height:1.55;color:var(--gray);max-width:28ch}
.tlay{display:grid;grid-template-columns:minmax(0,1fr) clamp(220px,22vw,300px);gap:clamp(30px,5vw,80px);
  margin-top:clamp(56px,8vh,96px);align-items:start}
.thd{display:flex;justify-content:space-between;align-items:baseline;gap:16px;flex-wrap:wrap;
  padding-bottom:14px;border-bottom:1px solid var(--ink)}
.thd .smallcap{color:var(--ink)}
.tlg{display:flex;gap:18px;font-size:12px;color:#3c3f44}
.tlg span{display:inline-flex;align-items:center;gap:8px}
.tlg i{width:10px;height:10px;border-radius:2px;display:inline-block}
.tch{position:relative;height:clamp(240px,34vh,340px);margin-top:28px;padding-left:30px}
.tgrid{position:absolute;left:30px;right:0;top:0;bottom:28px}
.tgrid span{position:absolute;left:0;right:0;height:0;border-top:1px solid var(--line)}
.tgrid em{position:absolute;left:-30px;top:-8px;font-style:normal;font-size:10.5px;color:var(--gray);
  font-variant-numeric:tabular-nums}
.tbars{position:absolute;left:30px;right:0;top:0;bottom:0;display:flex;gap:clamp(6px,1.4vw,18px);align-items:stretch}
.tcol{flex:1 1 0;display:flex;flex-direction:column;justify-content:flex-end;outline:none;cursor:default;min-width:0}
.tstack{position:relative;flex:1 1 auto;display:flex;flex-direction:column-reverse;justify-content:flex-start;gap:2px;
  margin:0 auto;width:min(100%,46px);padding-bottom:0;margin-bottom:28px}
.tseg{display:block;width:100%;flex:0 0 auto}
.tstack .tseg:last-of-type{border-radius:4px 4px 0 0}
.tstack .tseg:first-of-type{border-radius:0}
.tstack .tseg:only-of-type{border-radius:4px 4px 0 0}
.tcol .tyr{position:absolute;bottom:0;transform:translateY(0);font-size:11px;color:var(--gray);
  font-variant-numeric:tabular-nums;width:46px;text-align:center}
.tcol{position:relative;align-items:center}
.tcol .tyr{left:50%;margin-left:-23px}
.tpeak{position:absolute;left:50%;transform:translate(-50%,-100%);top:-6px;font-size:12px;font-weight:500;
  color:var(--ink);font-variant-numeric:tabular-nums}
.tstack{justify-content:flex-start}
.tcol.hot .tseg,.tcol:focus-visible .tseg{filter:brightness(1.08)}
.tcol:focus-visible .tyr{color:var(--ink);font-weight:500}
.tbars:hover .tcol:not(.hot) .tseg{opacity:.55}
.ttip{position:absolute;top:-12px;transform:translate(-50%,-100%);background:var(--ink);color:#fff;
  font-size:12px;line-height:1.4;padding:8px 11px;border-radius:3px;white-space:nowrap;pointer-events:none;
  opacity:0;transition:opacity .15s}
.ttip.on{opacity:1}
.ttab{margin-top:22px;font-size:13px}
.ttab summary{cursor:pointer;font-size:11px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--gray)}
.ttab table{margin-top:14px;border-collapse:collapse;width:100%;max-width:520px;font-variant-numeric:tabular-nums}
.ttab th,.ttab td{text-align:left;padding:7px 12px 7px 0;border-bottom:1px solid var(--line)}
.ttab th{font-weight:500}
.tbey{border-top:1px solid var(--ink);padding-top:14px;display:grid;grid-template-columns:1fr auto;align-items:baseline}
.tbey .smallcap{color:var(--ink)}
.tbey ul{grid-column:1/-1;list-style:none;margin-top:16px}
.tbey li{padding:9px 0;border-bottom:1px solid var(--line);font-size:14px}
.tally .efn{margin-top:clamp(36px,5vh,56px);max-width:110ch;line-height:1.8}
@media(max-width:980px){.tlay{grid-template-columns:1fr}.tstats{grid-template-columns:1fr 1fr}
  .tst:nth-child(3){padding-left:0;border-left:0}.tst:nth-child(n+3){border-top:1px solid var(--line)}}

/* ---------- pubs ---------- */
.pubs{padding:var(--sec) 0}
.plist{list-style:none;border-top:1px solid var(--ink)}
.prow{display:grid;grid-template-columns:clamp(64px,8vw,120px) minmax(0,1fr) clamp(200px,20vw,280px);
  gap:clamp(16px,2.6vw,44px);padding:clamp(26px,3.6vh,40px) 0;border-bottom:1px solid var(--line)}
.pyr{font-size:clamp(18px,1.6vw,24px);font-weight:500;letter-spacing:-.02em;font-variant-numeric:tabular-nums}
.pmain h3{font-weight:500;font-size:clamp(19px,1.75vw,27px);letter-spacing:-.025em;line-height:1.2;max-width:34ch}
.pmain h3 a{background-image:linear-gradient(currentColor,currentColor);background-size:0 1px;
  background-repeat:no-repeat;background-position:0 100%;transition:background-size .35s var(--ease-out)}
.pmain h3 a:hover{background-size:100% 1px}
.pau{margin-top:12px;font-size:14px;color:var(--ink)}
.pve{margin-top:4px;font-size:13.5px;color:var(--gray);max-width:70ch}
.pwhy{margin-top:16px;font-size:13.5px;color:#3c3f44;max-width:66ch}
.pwhy .smallcap{margin-right:12px;color:var(--brass)}
.pside{display:flex;flex-direction:column;gap:12px;align-items:flex-start}
.pid{font-family:ui-monospace,'SF Mono',Menlo,monospace;font-size:11px;line-height:1.5;color:var(--gray);word-break:break-all}
@media(max-width:860px){.prow{grid-template-columns:1fr;gap:10px}.pside{flex-direction:row;flex-wrap:wrap;align-items:center}}

/* ---------- movil: botonera fija de pestanas ---------- */
@media(max-width:860px){
  .tnav{display:none}
  .topbar{mix-blend-mode:normal;background:rgba(20,22,26,.9);
    -webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);
    pointer-events:auto;flex-wrap:wrap;align-items:center;padding:13px 18px 0;row-gap:0}
  .topbar .u11{font-size:9.5px;letter-spacing:.12em}
  .topbar .ncta{border-bottom-color:rgba(255,255,255,.4)}
  .tbot{order:3;flex:1 1 100%;display:flex;margin-top:11px;border-top:1px solid rgba(255,255,255,.14)}
  .tbot a{flex:1 1 0;text-align:center;padding:11px 0 12px;white-space:nowrap;
    font-size:9px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;
    color:rgba(255,255,255,.6);border-bottom:2px solid transparent;transition:color .2s,border-color .2s}
  .tbot a.on{color:#fff;border-bottom-color:rgba(255,255,255,.75)}
  :root{--barh:86px;--phh:0px}
  section{scroll-margin-top:calc(var(--barh) + 12px)}
  .hero{min-height:100svh;padding:0 0 clamp(96px,12vh,124px)}
  .hero .inr{padding-top:calc(var(--barh) + clamp(54px,9vh,86px))}
  .hero::after{top:calc(var(--barh) + clamp(26px,4vh,40px))}
  .hero .hname{font-size:clamp(42px,12.4vw,72px);max-width:none}
  .hero.photo{--phh:46svh;justify-content:flex-start;padding:0 0 clamp(72px,10vh,110px)}
  .hero.photo .ph{position:absolute;inset:0 0 auto 0;height:var(--phh)}
  .hero.photo .ph img{object-position:50% 22%}
  .hero.photo .ph::after{background:linear-gradient(180deg,rgba(20,22,26,.5) 0%,rgba(20,22,26,0) 32%,
    rgba(20,22,26,.18) 60%,rgba(20,22,26,.9) 90%,#14161A 100%)}
  .hero.photo::after{content:none}
  .hero.photo .inr{padding-top:calc(var(--phh) + 6px)}
  .hero .hname{font-size:clamp(46px,13.5vw,74px)}
  .hero .hsub{max-width:none;font-size:16px}
  .hero.plate{justify-content:flex-start}
  .hero.plate .ph{position:relative;inset:auto;width:min(44vw,180px);height:auto;
    margin:calc(var(--barh) + clamp(40px,6vh,56px)) 0 0 18px}
  .hero.plate .inr{padding-top:clamp(34px,5vh,48px);padding-right:0}
  .hero.plate .hsub{max-width:22ch;font-size:clamp(19px,5.4vw,24px)}
  .hero .hsub{max-width:20ch}
  .hero .hnote{max-width:none}
  .tch{padding-left:24px}.tgrid,.tbars{left:24px}.tgrid em{left:-24px}
  .tcol .tyr{font-size:9.5px}
  .tbey ul{columns:2;column-gap:20px}
  .tbey li{break-inside:avoid}
}
</style>"""

# ------------------------------------------------------------- 7. navegacion
NAV = [
    {"t": "Overview",      "h": "/pettingill"},
    {"t": "The Practice",  "h": "/pettingill/practice"},
    {"t": "The Testimony", "h": "/pettingill/testimony"},
    {"t": "The Research",  "h": "/pettingill/research"},
    {"t": "The Record",    "h": "/pettingill/record"},
    {"t": "Enquiry",       "h": "#inquiry"},
]
NAVHTML = ('<nav class="menupanel" id="nitems" aria-label="Site">'
           + ''.join(f'<a href="{n["h"]}">{n["t"]}</a>' for n in NAV) + '</nav>')
TNAV = [("The Practice",  "/pettingill/practice",  "practice"),
        ("The Testimony", "/pettingill/testimony", "testimony"),
        ("The Research",  "/pettingill/research",  "research"),
        ("The Record",    "/pettingill/record",    "record")]
TABS = [("Overview",  "/pettingill",           "home"),
        ("Practice",  "/pettingill/practice",  "practice"),
        ("Testimony", "/pettingill/testimony", "testimony"),
        ("Research",  "/pettingill/research",  "research"),
        ("Record",    "/pettingill/record",    "record")]

def topbar_html(active):
    ON = ' class="on"'
    links = ''.join(f'<a href="{h}"{ON if k == active else ""}>{t}</a>' for t, h, k in TNAV)
    links += '<a class="ext" href="https://www.pettingillanalytics.com/" target="_blank" rel="noopener">Pettingill Analytics ↗</a>'
    akey = active or 'home'
    tabs = ''.join(f'<a href="{h}"{ON if k == akey else ""}>{t}</a>' for t, h, k in TABS)
    return ('<div class="topbar">'
            '<a class="u11 smallcap tname" href="/pettingill" style="color:#fff">Pettingill</a>'
            f'<nav class="tnav" aria-label="Primary">{links}</nav>'
            '<a class="u11 smallcap ncta" id="ncta" href="#inquiry" style="color:#fff">Discuss a matter</a>'
            f'<nav class="tbot" aria-label="Primary">{tabs}</nav></div>')

# ---------------------------------------------------------- 8. reparto por pagina
def deep(k):
    return copy.deepcopy(S[k])

def renum(secs):
    n = 1
    for s in secs:
        if s['type'] in ('hero', 'band', 'nums', 'stmt'):
            continue
        s['no'] = f'{n:02d}'
        n += 1
    return secs

def page(title, desc, secs):
    return {"meta": {"title": title, "description": desc},
            "logo": full['logo'], "nav": NAV, "navcta": full['navcta'], "sections": renum(secs)}

inq = lambda: deep('inquiry')

PAGES = {
    'home': page(TITLE.replace('&amp;', '&'), DESC,
        [deep('hero'), deep('numbers'), deep('s-question'), deep('s-training'), deep('s-research'),
         deep('s-sourced'), deep('firm-home'), inq()]),
    'practice': page('The Practice — Bernard F. Pettingill, Jr., Ph.D.',
        'Four economic questions he is retained on, how to read the sources on this site, and the documents a paralegal needs to start an engagement.',
        [deep('practice-open'), deep('routes'), deep('sources'), deep('engage'), inq()]),
    'testimony': page('The Testimony — Bernard F. Pettingill, Jr., Ph.D.',
        'The three published testimony figures, what each counts, and a count of the public testimony listing since 2017.',
        [deep('testimony-lede'), deep('figures'), deep('listing'), deep('band-register'), inq()]),
    'research': page('The Research — Bernard F. Pettingill, Jr., Ph.D.',
        'Selected publications from 1979 to 2025, each linked to a record outside his own websites, and further work listed on his CV.',
        [deep('research-lede'), deep('publications'), deep('research-cv'), inq()]),
    'record': page('The Record — Bernard F. Pettingill, Jr., Ph.D.',
        'Education, academic appointments and professional organizations as stated on his CV, and his firm, Pettingill Analytics.',
        [deep('record-education'), deep('record-academic'), deep('record-orgs'), deep('firm'), inq()]),
}

os.makedirs(DST, exist_ok=True)
for name, data in PAGES.items():
    with open(f'{DST}/{name}.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')

# ------------------------------------------------------------- 9. derivar HTML
def derive(json_path, title, ogurl, out_dir, active):
    h = base
    h = sub1(r'<title>[^<]*</title>', f'<title>{title}</title>', h, tag='t-' + (active or 'home'))
    h = sub1(r'(<meta property="og:title" content=")[^"]*(">)', lambda m: m.group(1) + title + m.group(2), h, tag='ogt')
    h = sub1(r'(<meta property="og:url" content=")[^"]*(">)', lambda m: m.group(1) + ogurl + m.group(2), h, tag='ogu')
    h = sub1(r"fetch\('/pettingill/[a-z-]+\.json'\)", f"fetch('{json_path}')", h, tag='fetch')
    h = sub1(r'<div class="topbar">.*?</div>', lambda m: topbar_html(active), h, flags=re.S, tag='topbar')
    h = sub1(r'<nav class="menupanel"[^>]*>.*?</nav>', NAVHTML, h, flags=re.S, tag='nav')
    h = sub1(r'<main id="site">.*?</main>', '<main id="site"></main>', h, flags=re.S, tag='main')
    h = sub1(r'(<meta name="robots"[^>]*>)', lambda m: m.group(1) + '\n<meta name="theme-color" content="#14161A">', h, tag='theme')
    h = sub1(r'</head>', CAL + '\n</head>', h, tag='css')
    os.makedirs(out_dir, exist_ok=True)
    open(out_dir + '/index.html', 'w', encoding='utf-8').write(h)
    print('  ', out_dir.replace(DST, 'pettingill') or 'pettingill', 'ok')

derive('/pettingill/home.json', TITLE, URL, DST, None)
derive('/pettingill/practice.json', 'The Practice — Bernard F. Pettingill, Jr., Ph.D.', URL + '/practice', DST + '/practice', 'practice')
derive('/pettingill/testimony.json', 'The Testimony — Bernard F. Pettingill, Jr., Ph.D.', URL + '/testimony', DST + '/testimony', 'testimony')
derive('/pettingill/research.json', 'The Research — Bernard F. Pettingill, Jr., Ph.D.', URL + '/research', DST + '/research', 'research')
derive('/pettingill/record.json', 'The Record — Bernard F. Pettingill, Jr., Ph.D.', URL + '/record', DST + '/record', 'record')
print('pettingill listo')
