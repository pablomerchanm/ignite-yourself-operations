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
DESC = ('Bernard F. Pettingill, Jr., Ph.D.: forensic economist and expert witness since 1985. '
        'Economic damages in personal injury, wrongful death and medical malpractice.')
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
/* Iconos de linea del oficio. Un trazo por icono se mueve en reposo (clase idraw / ifade / ispin / ihand). */
var ICONS={
  care:'<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5"/><path class="idraw" d="M8.5 15h2l1.5-3 2 6 1.5-3h2"/>',
  earn:'<path d="M4 4v16h16"/><path class="idraw" d="M7 15l3.5-4 3 2.5L19 7"/><circle class="ifade" cx="19" cy="7" r="1.2"/>',
  support:'<path d="M4 20h16"/><path d="M7 20v-7"/><path class="ifade" d="M12 20V5"/><path d="M17 20v-10"/>',
  house:'<path d="M4 11l8-7 8 7"/><path d="M6.5 9.5V20h11V9.5"/><circle cx="12" cy="14.5" r="2.6"/><path class="ihand" d="M12 14.5v-1.7"/>',
  quote:'<path d="M9.5 8.5c-2 .3-3.5 1.8-3.5 4v3h3.5v-3.5H8c0-1.2.6-1.9 1.5-2.2z"/><path class="ifade" d="M17.5 8.5c-2 .3-3.5 1.8-3.5 4v3h3.5v-3.5H16c0-1.2.6-1.9 1.5-2.2z"/>',
  doc:'<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5"/><path d="M9 12h6"/><path d="M9 15.5h4"/><circle class="ispin" cx="16.5" cy="17" r="2.6" stroke-dasharray="2 1.5"/>',
  link:'<path d="M10 14a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1 1"/><path class="idraw" d="M14 10a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1-1"/>',
  tally:'<path d="M5 6v12"/><path d="M9 6v12"/><path d="M13 6v12"/><path d="M17 6v12"/><path class="idraw" d="M3 16L19 8"/>',
  cv:'<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5"/><path class="idraw" d="M9 12h6"/><path class="idraw" d="M9 15.5h6"/><path class="idraw" d="M9 19h4"/>',
  list:'<circle cx="5.5" cy="7" r=".9"/><path d="M9 7h10"/><circle cx="5.5" cy="12" r=".9"/><path d="M9 12h10"/><circle cx="5.5" cy="17" r=".9"/><path class="idraw" d="M9 17h7"/>',
  check:'<rect x="4" y="4" width="16" height="16" rx="1.5"/><path class="idraw" d="M8 12.5l2.8 2.8L16.5 9"/>',
  sign:'<path d="M4 19h16"/><path class="idraw" d="M5 15.5c2-5 4-5.5 5-2s2 4 3.5 0 2.5-4 3.5-1 1.5 1.5 2.5.5"/>'
};
function ico(n){var d=ICONS[n];if(!d)return n||'';
  return'<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+
    d.replace(/<(path|circle|rect) /g,'<$1 pathLength="1" ')+'</svg>'}
"""
base = sub1(r'(function bigimg\()', lambda m: RICH + m.group(1), base, tag='rich')

# Los iconos de las tarjetas y de las filas de documentos se nombran en el JSON y se resuelven aqui.
base = sub1(r"""\(c\.icon\?'<span class="picon" aria-hidden="true">'\+c\.icon\+'</span>':''\)\+""",
            """(c.icon?'<span class="picon" aria-hidden="true">'+ico(c.icon)+'</span>':'')+""",
            base, tag='paths-icon')
base = sub1(r"""'<div class="mrow wr" data-r1 data-rule><h4>'\+rich\(r\.t\)\+'</h4>""",
            """'<div class="mrow wr'+(r.icon?' hasico':'')+'" data-r1 data-rule>'+(r.icon?'<span class="mico" aria-hidden="true">'+ico(r.icon)+'</span>':'')+'<h4>'+rich(r.t)+'</h4>""",
            base, tag='method-icon')

# -------- subpaginas: solo el pie, sin el formulario completo
base = sub1(r"""return'<section class="reserve paths-in" id="'\+esc\(s\.id\|\|'inquiry'\)\+'"><div class="wrap">'\+""",
            """return(s.noform?'':'<section class="reserve paths-in" id="'+esc(s.id||'inquiry')+'"><div class="wrap">'+""", base, tag='inq-open')
base = sub1(r"""'</div></div></section>'\+\n  '<footer class="kfoot">""",
            """'</div></div></section>')+\n  '<footer class="kfoot">""", base, tag='inq-close')

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
  return'<section class="stmt'+(s.ink?' ink':'')+(s.img?' withimg':'')+(s.align==='right'?' tr':'')+(s.compact?' compact':'')+(s.opener?' opener':'')+'" id="'+esc(s.id||'stmt')+'">'+
  (s.img&&s.img.src?'<div class="sph"><img src="'+esc(s.img.src)+'" alt="'+esc(s.img.alt||'')+'" loading="lazy"'+(s.img.pos?' style="object-position:'+esc(s.img.pos)+'"':'')+'></div>':'')+
  '<div class="wrap" data-r2>'+
  (s.logo?'<img class="slogo wr" src="'+esc(s.logo)+'" alt="'+esc(s.label||'')+'">':'')+
  (s.label&&!s.logo?'<div class="slab smallcap wr">'+esc(s.label)+'</div>':'')+
  '<h2 class="sq wr">'+rich(s.quote)+'</h2>'+
  (s.sub?'<p class="ssub wr">'+rich(s.sub)+'</p>':'')+
  (s.keys?'<ul class="skeys'+(s.tags?' astags':'')+' wr">'+(s.keys||[]).map(function(k){return'<li>'+(s.tags?'<span class="src">'+esc(k)+'</span>':esc(k))+'</li>'}).join('')+'</ul>':'')+
  '<div class="sfoot wr">'+
    (s.src?'<span class="src">'+esc(s.src)+'</span>':'')+
    (s.more?'<a class="smore" href="'+esc(s.more.h)+'"'+(/^https?:/.test(s.more.h)?' target="_blank" rel="noopener"':'')+'>'+esc(s.more.t)+(/^https?:/.test(s.more.h)?' \u2197':'')+'</a>':'')+
  '</div>'+
  '</div></section>'},
legend:function(s){
  return'<section class="legend" id="'+esc(s.id||'legend')+'"><div class="wrap">'+
  '<div class="shead rail" data-r2><div class="rlab"><span class="rnum wr">'+esc(s.no||'')+'</span><span class="smallcap wr">'+esc(s.label)+'</span></div>'+
  '<div><h2 class="d56 wr">'+rich(s.title)+'</h2>'+(s.lede?'<p class="elede wr">'+rich(s.lede)+'</p>':'')+'</div></div>'+
  '<div class="lgd" data-cards>'+(s.items||[]).map(function(it){
    return'<div class="lgi wr">'+(it.icon?'<span class="lgico" aria-hidden="true">'+ico(it.icon)+'</span>':'')+'<span class="src">'+esc(it.k)+'</span><p>'+rich(it.d)+'</p></div>'}).join('')+'</div>'+
  '</div></section>'},
scrub:function(s){
  var ps=s.paras||[];var n=('0'+ps.length).slice(-2);
  return'<section class="scrub'+(s.ink?' ink':'')+'" id="'+esc(s.id||'scrub')+'" data-pin="'+(s.pin||2.4)+'"><div class="wrap sclay">'+
  '<div class="scaside">'+(s.label?'<div class="smallcap scl">'+esc(s.label)+'</div>':'')+
    '<div class="sctrack" aria-hidden="true"><span class="scfill"></span></div>'+
    '<div class="scnav"><button type="button" class="scarr" data-qprev aria-label="Previous">&larr;</button>'+
    '<button type="button" class="scarr" data-qnext aria-label="Next">&rarr;</button>'+
    '<span class="sccnt"><span data-qcur>01</span>/'+n+'</span></div></div>'+
  '<div class="scmain">'+ps.map(function(t){return'<p class="scp">'+rich(t)+'</p>'}).join('')+
    '<div class="scsign">'+(s.keys?'<ul class="skeys astags">'+s.keys.map(function(k){return'<li><span class="src">'+esc(k)+'</span></li>'}).join('')+'</ul>':'')+
    (s.more?'<a class="smore" href="'+esc(s.more.h)+'">'+esc(s.more.t)+'</a>':'')+'</div>'+
  '</div></div></section>'},
brief:function(s){
  return'<section class="brf" id="'+esc(s.id||'brief')+'"><div class="wrap">'+
  (s.label?'<div class="smallcap brl wr" data-r1>'+esc(s.label)+'</div>':'')+
  '<div class="brgrid" data-cards>'+(s.items||[]).map(function(it,i){
    return'<div class="bri wr"><span class="brn">0'+(i+1)+'</span><h3>'+rich(it.k)+'</h3><p class="brt">'+rich(it.t)+'</p>'+(it.d?'<p class="brd">'+rich(it.d)+'</p>':'')+'</div>'}).join('')+'</div>'+
  '</div></section>'},
quote:function(s){
  return'<section class="qt" id="'+esc(s.id||'quote')+'"><div class="wrap" data-r2>'+
  (s.lead?'<p class="qlead wr">'+esc(s.lead)+'</p>':'')+
  '<blockquote class="qq wr">'+esc(s.q)+'</blockquote>'+
  (s.who?'<p class="qwho wr">'+esc(s.who)+'</p>':'')+
  '</div></section>'},
counsel:function(s){
  return'<section class="csl'+(s.light?' light':'')+'" id="'+esc(s.id||'counsel')+'"><div class="wrap">'+
  '<div class="cshead" data-r2><span class="smallcap wr">'+esc(s.label)+'</span><h2 class="d56 wr">'+rich(s.title)+'</h2></div>'+
  '<div class="csgrid'+((s.items||[]).length===3?' c3':'')+'" data-cards>'+(s.items||[]).map(function(it){
    var ext=/^https?:/.test(it.h);
    return'<a class="csc wr" href="'+esc(it.h)+'"'+(ext?' target="_blank" rel="noopener"':'')+'>'+
      '<span class="cstop"><span class="csico" aria-hidden="true">'+ico(it.icon)+'</span><span class="cstag">'+esc(it.tag)+'</span></span>'+
      '<span class="cst">'+esc(it.t)+'</span><span class="csd">'+esc(it.d)+'</span>'+
      '<span class="csa">'+esc(it.a)+'<i aria-hidden="true">'+(ext?'&nearr;':'&rarr;')+'</i></span></a>'}).join('')+'</div>'+
  '</div></section>'},
clusters:function(s){
  return'<section class="rcl" id="'+esc(s.id||'clusters')+'"><div class="wrap">'+
  '<div class="shead rail" data-r2><div class="rlab"><span class="rnum wr">'+esc(s.no||'')+'</span><span class="smallcap wr">'+esc(s.label)+'</span></div>'+
  '<div><h2 class="d56 wr">'+rich(s.title)+'</h2></div></div>'+
  '<div class="rclgrid" data-cards>'+(s.groups||[]).map(function(g){
    var n=(g.papers||[]).length;
    return'<div class="rcg wr"><div class="rcghd"><span class="rcn">'+n+'</span><span class="rcnk">'+(n===1?'paper':'papers')+'</span></div>'+
      '<h3>'+esc(g.t)+'</h3>'+
      '<a class="rcarea" href="'+esc(g.h)+'"><span class="smallcap">In practice</span>'+esc(g.area)+'</a>'+
      '<ul>'+(g.papers||[]).map(function(p){return'<li><a href="'+esc(p.h)+'" target="_blank" rel="noopener"><b>'+esc(p.y)+'</b><span>'+esc(p.t)+'</span></a></li>'}).join('')+'</ul></div>'}).join('')+'</div>'+
  '</div></section>'},
retain:function(s){
  function lk(l){var ext=/^https?:/.test(l.h);return'<a class="rtl" href="'+esc(l.h)+'"'+(ext?' target="_blank" rel="noopener"':'')+'>'+esc(l.t)+'</a>'}
  return'<section class="rtn" id="'+esc(s.id||'retain')+'"><div class="wrap">'+
  '<div class="shead rail" data-r2><div class="rlab"><span class="rnum wr">'+esc(s.no||'')+'</span><span class="smallcap wr">'+esc(s.label)+'</span></div>'+
  '<div><h2 class="d56 wr">'+rich(s.title)+'</h2></div></div>'+
  '<div class="rtlay">'+
    '<ol class="rtsteps" data-cards>'+(s.steps||[]).map(function(st,i){
      return'<li class="wr"><span class="rtn-n">0'+(i+1)+'</span><div><h3>'+esc(st.t)+'</h3><p>'+esc(st.d)+'</p>'+
        (st.links?'<div class="rtlinks">'+st.links.map(lk).join('')+'</div>':'')+'</div></li>'}).join('')+'</ol>'+
    '<aside class="rtcard wr" data-r1><span class="smallcap">'+esc(s.termsLabel||'Terms')+'</span>'+
      '<dl>'+(s.terms||[]).map(function(x){return'<div><dt>'+esc(x.k)+'</dt><dd>'+esc(x.v)+'</dd></div>'}).join('')+'</dl>'+
      (s.cta?'<a class="rtcta" href="'+esc(s.cta.h)+'" target="_blank" rel="noopener">'+esc(s.cta.t)+'<span aria-hidden="true">&nearr;</span></a>':'')+
      (s.ctaNote?'<p class="rtnote">'+esc(s.ctaNote)+'</p>':'')+
      (s.alt?'<a class="rtalt" href="'+esc(s.alt.h)+'">'+esc(s.alt.t)+'</a>':'')+
    '</aside>'+
  '</div></div></section>'},
index:function(s){
  return'<section class="ix" id="'+esc(s.id||'index')+'"><div class="wrap">'+
  '<div class="ixhead" data-r2>'+(s.label?'<span class="smallcap wr">'+esc(s.label)+'</span>':'')+'<h2 class="d56 wr">'+rich(s.title)+'</h2></div>'+
  '<div class="ixgrid" data-cards>'+(s.cards||[]).map(function(c,i){
    return'<a class="ixc wr" href="'+esc(c.h)+'"><span class="ixn">0'+(i+1)+'</span><span class="ixico" aria-hidden="true">'+ico(c.icon)+'</span>'+
      '<span class="ixt">'+esc(c.t)+'</span><span class="ixd">'+esc(c.d)+'</span><span class="ixgo" aria-hidden="true">&rarr;</span></a>'}).join('')+'</div>'+
  '</div></section>'},
notes:function(s){
  return'<section class="nts'+(s.tint?' tint':'')+'" id="'+esc(s.id||'notes')+'"><div class="wrap">'+
  '<div class="shead rail" data-r2><div class="rlab"><span class="rnum wr">'+esc(s.no||'')+'</span><span class="smallcap wr">'+esc(s.label)+'</span></div>'+
  '<div><h2 class="d56 wr">'+rich(s.title)+'</h2>'+(s.lede?'<p class="elede wr">'+rich(s.lede)+'</p>':'')+'</div></div>'+
  '<ul class="ntlist" data-cards>'+(s.items||[]).map(function(n){
    return'<li class="wr"><a href="'+esc(n.h)+'" target="_blank" rel="noopener"><span class="ntt">'+esc(n.t)+'</span><span class="ntk">'+esc(n.k)+'</span><span class="ntgo" aria-hidden="true">&nearr;</span></a></li>'}).join('')+'</ul>'+
  (s.src?'<div class="tlsrc wr" data-r1><span class="src">'+esc(s.src)+'</span></div>':'')+
  '</div></section>'},
next:function(s){
  return'<section class="nxt" id="next"><div class="wrap"><a class="nxa" href="'+esc(s.h)+'" data-r2>'+
  '<span class="smallcap wr">'+esc(s.k||'Next')+'</span><span class="nxt-t wr">'+rich(s.t)+'<i aria-hidden="true">&rarr;</i></span>'+
  (s.d?'<span class="nxd wr">'+esc(s.d)+'</span>':'')+'</a>'+
  (s.alt?'<a class="nxalt" href="'+esc(s.alt.h)+'">'+esc(s.alt.t)+'</a>':'')+'</div></section>'},
timeline:function(s){
  var a=s.from,b=s.to,span=(b-a)||1;function pct(y){return((y-a)/span*100).toFixed(2)}
  var tiers=['hi','lo','up'];
  var marks=(s.marks||[]).map(function(m,i){var p=(m.y-a)/span*100;
    return'<div class="tlm '+(m.tier||tiers[i%3])+(m.brass?' brass':'')+(p<12?' al':p>88?' ar':'')+'" style="left:'+pct(m.y)+'%">'+
      '<i class="tldot"></i><span class="tlyr">'+m.y+'</span><span class="tlt">'+esc(m.t)+(m.n?' <b>&times;'+m.n+'</b>':'')+'</span></div>'}).join('');
  var ranges=(s.ranges||[]).map(function(r){var right=(r.b-a)/span*100>72;
    return'<div class="tlr'+(r.brass?' brass':'')+(right?' labl':'')+'" style="left:'+pct(r.a)+'%;width:'+((r.b-r.a)/span*100).toFixed(2)+'%">'+
      '<i class="tlbar"></i><span class="tlrt">'+esc(r.t)+' <em>'+r.a+'–'+r.b+'</em></span></div>'}).join('');
  return'<section class="tl'+(s.tint?' tint':'')+'" id="'+esc(s.id||'timeline')+'"><div class="wrap">'+
  '<div class="shead rail" data-r2><div class="rlab"><span class="rnum wr">'+esc(s.no||'')+'</span><span class="smallcap wr">'+esc(s.label)+'</span></div>'+
  '<div><h2 class="d56 wr">'+rich(s.title)+'</h2>'+(s.lede?'<p class="elede wr">'+rich(s.lede)+'</p>':'')+'</div></div>'+
  '<div class="tlwrap wr" data-r1 aria-hidden="true"><div class="tltrack"><span class="tlfill"></span>'+
    ((s.marks||[]).some(function(m){return m.y===a})?'':'<span class="tlend l">'+a+'</span>')+
    ((s.marks||[]).some(function(m){return m.y===b})?'':'<span class="tlend r">'+b+'</span>')+'</div><div class="tlmarks">'+marks+'</div>'+
    (ranges?'<div class="tlrs">'+(s.rlabel?'<span class="smallcap tlrl">'+esc(s.rlabel)+'</span>':'')+ranges+'</div>':'')+'</div>'+
  '<ul class="tllist wr" data-r1>'+(s.marks||[]).map(function(m){return'<li><b>'+m.y+'</b>'+esc(m.t)+(m.n?' (×'+m.n+')':'')+'</li>'}).join('')+
    (s.ranges||[]).map(function(r){return'<li><b>'+r.a+'–'+r.b+'</b>'+esc(r.t)+'</li>'}).join('')+'</ul>'+
  (s.src?'<div class="tlsrc wr" data-r1><span class="src">'+esc(s.src)+'</span></div>':'')+
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
      '<div class="pside">'+(p.src?'<span class="src">'+esc(p.src)+'</span>':'')+'<span class="pid">'+esc(p.id)+'</span></div>'+
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

# ------------------------------------------------- 5b. motion propio (dentro de init, solo con MOTION)
PETJS = r"""
  /* ===== Pettingill: el nombre sube desde una mascara, palabra a palabra ===== */
  (function(){
    var h=document.querySelector('.hero .hname');if(!h||h.querySelector('.hw'))return;
    var ws=[];
    (function walk(node){
      Array.prototype.slice.call(node.childNodes).forEach(function(n){
        if(n.nodeType===3){
          var parts=n.textContent.split(/(\s+)/).filter(function(t){return t!==''});
          var frag=document.createDocumentFragment();
          parts.forEach(function(t){
            if(/^\s+$/.test(t)){frag.appendChild(document.createTextNode(t));return}
            var m=document.createElement('span');m.className='hwm';
            var w=document.createElement('span');w.className='hw';w.textContent=t;
            m.appendChild(w);frag.appendChild(m);ws.push(w);
          });
          node.replaceChild(frag,n);
        }else if(n.nodeType===1){walk(n)}
      });
    })(h);
    if(ws.length)gsap.fromTo(ws,{yPercent:110},{yPercent:0,duration:1.25,ease:'expo.out',stagger:.09,delay:.3});
  })();

  /* ===== las cifras cuentan hasta su valor ===== */
  (function(){
    function fmt(v,comma){v=Math.round(v);var s=String(v);return comma?s.replace(/\B(?=(\d{3})+(?!\d))/g,','):s}
    document.querySelectorAll('.nn,.fgn,.tn').forEach(function(el){
      var tn=null;for(var i=0;i<el.childNodes.length;i++){var n=el.childNodes[i];if(n.nodeType===3&&/\d/.test(n.textContent)){tn=n;break}}
      if(!tn)return;var m=tn.textContent.match(/^(\s*)([\d,]+)(.*)$/);if(!m)return;
      var pre=m[1],num=m[2],post=m[3],val=parseInt(num.replace(/,/g,''),10),comma=num.indexOf(',')>-1;
      var year=!comma&&num.length===4&&val>=1900&&val<=2100;
      var o={v:year?val-24:0};tn.textContent=pre+fmt(o.v,comma)+post;
      gsap.to(o,{v:val,duration:year?1:1.6,ease:'power3.out',
        scrollTrigger:{trigger:el,start:'top 90%',once:true},
        onUpdate:function(){tn.textContent=pre+fmt(o.v,comma)+post}});
    });
  })();

  /* ===== el grafico del listado crece columna a columna ===== */
  document.querySelectorAll('.tch').forEach(function(ch){
    var cols=ch.querySelectorAll('.tcol');if(!cols.length)return;
    var tl=gsap.timeline({scrollTrigger:{trigger:ch,start:'top 85%',once:true}});
    cols.forEach(function(col,i){
      col.querySelectorAll('.tseg').forEach(function(seg){
        var hgt=seg.style.height;tl.fromTo(seg,{height:0},{height:hgt,duration:1,ease:'power3.out'},i*.05)});
      var pk=col.querySelector('.tpeak');if(pk)tl.fromTo(pk,{opacity:0,y:6},{opacity:1,y:0,duration:.45,ease:'expo.out'},i*.05+.75);
    });
  });

  /* ===== los iconos se dibujan al llegar, y despues respiran ===== */
  document.querySelectorAll('.ico').forEach(function(sv){
    var shapes=sv.querySelectorAll('path,circle,rect');if(!shapes.length)return;
    gsap.set(shapes,{strokeDasharray:1,strokeDashoffset:1});
    gsap.to(shapes,{strokeDashoffset:0,duration:.9,ease:'power2.inOut',stagger:.12,
      scrollTrigger:{trigger:sv,start:'top 92%',once:true},
      onComplete:function(){gsap.set(shapes,{clearProps:'strokeDasharray,strokeDashoffset'});sv.classList.add('on')}});
  });

  /* ===== la linea de tiempo se traza de izquierda a derecha ===== */
  document.querySelectorAll('.tlwrap').forEach(function(w){
    var fill=w.querySelector('.tlfill'),marks=w.querySelectorAll('.tlm'),bars=w.querySelectorAll('.tlbar');
    var tl=gsap.timeline({scrollTrigger:{trigger:w,start:'top 80%',once:true}});
    if(fill)tl.fromTo(fill,{scaleX:0},{scaleX:1,duration:1.6,ease:'power2.inOut'},0);
    marks.forEach(function(d){var p=parseFloat(d.style.left)/100;
      tl.fromTo(d,{opacity:0,y:8},{opacity:1,y:0,duration:.55,ease:'expo.out'},.15+p*1.35)});
    bars.forEach(function(b){var p=parseFloat(b.parentNode.style.left)/100;gsap.set(b,{transformOrigin:'0 50%'});
      tl.fromTo(b,{scaleX:0},{scaleX:1,duration:.8,ease:'power2.out'},.25+p*1.35)});
  });

  /* ===== las laminas derivan despacio bajo el texto ===== */
  document.querySelectorAll('.stmt .sph img').forEach(function(im){
    gsap.fromTo(im,{yPercent:-4,scale:1.1},{yPercent:4,scale:1.1,ease:'none',
      scrollTrigger:{trigger:im.closest('section'),start:'top bottom',end:'bottom top',scrub:.5}});
  });

  /* ===== scrub: la seccion se fija y el texto se enciende palabra a palabra ===== */
  document.querySelectorAll('.scrub').forEach(function(sec){
    var ps=Array.prototype.slice.call(sec.querySelectorAll('.scp'));if(!ps.length)return;
    var words=[],segs=[];
    ps.forEach(function(p){segs.push(words.length);
      (function walk(node){
        Array.prototype.slice.call(node.childNodes).forEach(function(n){
          if(n.nodeType===3){
            var parts=n.textContent.split(/(\s+)/).filter(function(t){return t!==''});
            var frag=document.createDocumentFragment();
            parts.forEach(function(t){
              if(/^\s+$/.test(t)){frag.appendChild(document.createTextNode(t));return}
              var w=document.createElement('span');w.className='sw';w.textContent=t;frag.appendChild(w);words.push(w);
            });
            node.replaceChild(frag,n);
          }else if(n.nodeType===1){walk(n)}
        });
      })(p);
    });
    if(!words.length)return;
    var fill=sec.querySelector('.scfill'),cur=sec.querySelector('[data-qcur]'),sign=sec.querySelector('.scsign');
    var factor=parseFloat(sec.getAttribute('data-pin'))||2.4,K=words.length*1.15;
    words.forEach(function(w){w.style.opacity=.16});
    if(sign)sign.style.opacity=0;
    function seg(n){var k=0;for(var j=0;j<segs.length;j++)if(segs[j]<=n)k=j;return k}
    var st=ScrollTrigger.create({trigger:sec,start:'top top',end:'+='+Math.round(factor*100)+'%',pin:true,scrub:.5,anticipatePin:1,
      onUpdate:function(self){var p=self.progress,n=p*K;
        for(var i=0;i<words.length;i++)words[i].style.opacity=Math.min(1,Math.max(.16,(n-i)*.6+.16));
        if(fill)fill.style.transform='scaleX('+p+')';
        if(cur)cur.textContent=('0'+(seg(n)+1)).slice(-2);
        if(sign)sign.style.opacity=Math.min(1,Math.max(0,(p-.82)*6));
      }});
    function goto(k){k=Math.max(0,Math.min(segs.length-1,k));
      var y=st.start+(segs[k]/K)*(st.end-st.start)+(k?4:0);
      if(lenis)lenis.scrollTo(y);else window.scrollTo({top:y,behavior:'smooth'})}
    var pv=sec.querySelector('[data-qprev]'),nx=sec.querySelector('[data-qnext]');
    if(pv)pv.addEventListener('click',function(){goto(seg(st.progress*K)-1)});
    if(nx)nx.addEventListener('click',function(){goto(seg(st.progress*K)+1)});
  });

  /* ===== carril de secciones: donde estoy, y a donde puedo ir ===== */
  (function(){
    if(window.innerWidth<1100)return;
    var secs=Array.prototype.filter.call(document.querySelectorAll('#site > section[id]'),function(s){return s.offsetHeight>160&&s.id!=='next'});
    if(secs.length<3)return;
    var nav=document.createElement('nav');nav.className='srail';nav.setAttribute('aria-label','Sections');
    secs.forEach(function(s){
      var e=s.querySelector('.slab,.scl,.ixhead .smallcap,.rlab .smallcap,.phead .smallcap,.nums .smallcap,.mlab .smallcap,.band .smallcap');
      var lab=s.classList.contains('hero')?'Overview':(e?e.textContent.trim():s.id);
      var a=document.createElement('a');a.href='#'+s.id;a.innerHTML='<i></i><span>'+esc(lab)+'</span>';
      a.addEventListener('click',function(ev){ev.preventDefault();
        if(lenis)lenis.scrollTo(s,{offset:-navOffset()});else s.scrollIntoView({behavior:'smooth'})});
      nav.appendChild(a);
      ScrollTrigger.create({trigger:s,start:'top 50%',end:'bottom 50%',
        onToggle:function(self){if(self.isActive){nav.querySelectorAll('a').forEach(function(x){x.classList.remove('on')});a.classList.add('on')}}});
    });
    var hero=document.querySelector('.hero');
    if(hero){nav.classList.add('away');
      ScrollTrigger.create({trigger:hero,start:'bottom 40%',onEnter:function(){nav.classList.remove('away')},onLeaveBack:function(){nav.classList.add('away')}})}
    document.body.appendChild(nav);
  })();

"""
base = sub1(r'(  /\* R5 libro de dias pinneado \(solo desktop\) \*/)', lambda m: PETJS + m.group(1), base, tag='petjs')

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
/* la balanza: pared clara, el texto necesita mas sombra */
@media(min-width:861px){#testimony-open .sph::after{background:
  linear-gradient(270deg,rgba(14,16,19,.78) 0%,rgba(14,16,19,.55) 40%,rgba(14,16,19,.08) 72%),
  linear-gradient(180deg,rgba(14,16,19,.1) 0%,rgba(14,16,19,0) 40%,rgba(14,16,19,.5) 100%)}}
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

/* ============ Iteracion 11: motion, iconos, lineas de tiempo, carril ============ */
/* ---------- hero: el nombre sube linea a linea desde una mascara ---------- */
.hwm{display:inline-block;overflow:hidden;vertical-align:bottom;padding:.04em .18em .34em;margin:-.04em -.18em -.34em}
.hw{display:inline-block;will-change:transform}
.hcue{position:absolute;right:clamp(20px,5vw,80px);bottom:clamp(72px,11vh,132px);z-index:3;display:flex;flex-direction:column;
  align-items:center;gap:12px;color:rgba(255,255,255,.72)}
.hcue span{font-size:9.5px;letter-spacing:.24em;text-transform:uppercase;writing-mode:vertical-rl}
.hcue i{display:block;width:1px;height:58px;background:rgba(255,255,255,.3);position:relative;overflow:hidden}
.hcue i::after{content:'';position:absolute;left:0;top:-100%;width:100%;height:100%;background:#fff}
@media(max-width:860px){.hcue{display:none}}

/* ---------- iconos de linea: laton, un trazo vivo ---------- */
.ico{display:block;width:100%;height:100%}
.picon{color:var(--brass)}
.pcard.lead .picon,.pcard.lead:hover .picon{color:var(--brass)}
.pcard:hover .picon{color:var(--brass)}
.lgico{display:block;width:26px;height:26px;color:var(--brass);margin-bottom:16px}
.mico{display:block;width:24px;height:24px;color:var(--brass);margin-top:4px}
.mrow.hasico{grid-template-columns:36px clamp(180px,22vw,320px) minmax(0,1fr)}
@media(max-width:860px){.mrow.hasico{grid-template-columns:36px minmax(0,1fr)}.mrow.hasico p{grid-column:2}}

/* ---------- scrub: la frase se enciende palabra a palabra, la seccion se fija ---------- */
.scrub{position:relative;min-height:100svh;display:flex;align-items:center;padding:clamp(96px,12vh,140px) 0 clamp(72px,9vh,110px);overflow:hidden}
.scrub.ink{background:var(--ink);color:#fff}
.sclay{display:grid;grid-template-columns:clamp(180px,18vw,260px) minmax(0,1fr);gap:clamp(32px,5vw,96px);align-items:start}
.scaside{position:sticky;top:0;padding-top:.5em}
.scrub.ink .scl{color:rgba(255,255,255,.5)}
.sctrack{position:relative;height:1px;background:rgba(255,255,255,.18);margin-top:26px}
.scfill{position:absolute;top:-.5px;left:0;height:2px;width:100%;background:currentColor;transform:scaleX(0);transform-origin:left}
html.no-motion .scfill{transform:none}
.scnav{display:flex;align-items:center;gap:16px;margin-top:18px}
.scarr{background:none;border:0;color:inherit;font:inherit;font-size:20px;line-height:1;cursor:pointer;opacity:.75;padding:4px 2px;transition:opacity .25s,transform .35s}
.scarr:hover{opacity:1}
.scarr[data-qprev]:hover{transform:translateX(-3px)}
.scarr[data-qnext]:hover{transform:translateX(3px)}
html.no-motion .scarr{display:none}
.sccnt{margin-left:auto;font-family:ui-monospace,'SF Mono',Menlo,monospace;font-size:11px;letter-spacing:.12em;opacity:.6;font-variant-numeric:tabular-nums}
.scp{font-family:var(--serif);font-weight:300;font-size:clamp(23px,1rem + 1.5vw,39px);line-height:1.18;letter-spacing:-.012em;max-width:32ch;text-wrap:pretty}
.scp+.scp{margin-top:.9em}
.scp .it{font-style:italic;color:var(--brass)}
.scp .sw{opacity:1}
.scsign{margin-top:clamp(28px,4vh,44px);display:flex;flex-wrap:wrap;align-items:center;gap:20px 28px}
.scsign .skeys{margin-top:0}
.scrub.ink .scsign .skeys .src{color:rgba(255,255,255,.72);font-size:11.5px;padding:7px 12px 6px}
.scrub.ink .scsign .smore{color:#fff;border-color:rgba(255,255,255,.45)}
@media(max-width:860px){.scrub{padding-top:calc(var(--barh) + 28px);min-height:100svh}
  .sclay{grid-template-columns:1fr;gap:28px}.scaside{position:static}
  .scp{font-size:clamp(21px,5.6vw,26px);max-width:none}}

/* ---------- timeline: la linea que se dibuja ---------- */
.tl{padding:var(--sec) 0}
.tl.tint{background:#E4DED2}
.tlwrap{position:relative;margin-top:clamp(40px,6vh,70px);padding:112px 0 72px}
.tltrack{position:relative;height:1px;background:var(--line)}
.tlfill{position:absolute;inset:0;background:var(--ink);transform-origin:left}
.tlend{position:absolute;top:14px;font-size:11px;color:var(--gray);font-variant-numeric:tabular-nums}
.tlend.l{left:0}.tlend.r{right:0}
.tlmarks{position:absolute;left:0;right:0;top:112px;height:0}
.tlm{position:absolute;top:0;width:0}
.tldot{position:absolute;left:-5px;top:-5px;width:10px;height:10px;border-radius:50%;background:var(--ink);display:block;
  box-shadow:0 0 0 4px var(--bg)}
.tl.tint .tldot{box-shadow:0 0 0 4px #E4DED2}
.tlm.brass .tldot{background:var(--brass)}
.tlyr{position:absolute;left:-40px;width:80px;text-align:center;font-weight:500;font-size:13px;font-variant-numeric:tabular-nums;color:var(--ink)}
.tlt{position:absolute;left:-80px;width:160px;text-align:center;font-size:11.5px;line-height:1.35;color:var(--gray)}
.tlt b{font-weight:500;color:var(--brass)}
.tlm.hi .tlyr{top:-38px}.tlm.hi .tlt{top:-68px}
.tlm.up .tlyr{top:-78px}.tlm.up .tlt{top:-108px}
.tlm.lo .tlyr{top:16px}.tlm.lo .tlt{top:38px}
.tlm.al .tlyr,.tlm.al .tlt{left:-5px;text-align:left}
.tlm.ar .tlyr,.tlm.ar .tlt{left:auto;right:-5px;text-align:right}
.tlm.lo.al .tlyr{left:0}
.tlrs{position:relative;margin-top:88px;padding-top:16px;border-top:1px solid var(--line)}
.tlrl{display:block;color:var(--ink);margin-bottom:8px}
.tlr{position:relative;height:22px;margin-top:6px}
.tlbar{position:absolute;left:0;right:0;top:8px;height:6px;background:var(--ink);border-radius:3px;display:block;transform-origin:left}
.tlr.brass .tlbar{background:var(--brass)}
.tlrt{position:absolute;left:calc(100% + 10px);top:3px;white-space:nowrap;font-size:11.5px;color:var(--ink)}
.tlrt em{font-style:normal;color:var(--gray);margin-left:6px;font-variant-numeric:tabular-nums}
.tlr.labl .tlrt{left:auto;right:calc(100% + 10px);text-align:right}
.tllist{list-style:none;margin-top:28px;border-top:1px solid var(--ink)}
.tllist li{display:grid;grid-template-columns:96px 1fr;gap:12px;padding:10px 0;border-bottom:1px solid var(--line);font-size:14px}
.tllist b{font-weight:500;font-variant-numeric:tabular-nums}
.tlsrc{margin-top:22px}
@media(min-width:861px){.tllist{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;margin:0;border:0}}
@media(max-width:860px){.tlwrap{display:none}}

/* ---------- carril de secciones (escritorio) ---------- */
.srail{position:fixed;right:22px;top:50%;transform:translateY(-50%);z-index:40;display:flex;flex-direction:column;gap:12px;
  mix-blend-mode:difference;color:#fff}
.srail a{display:flex;align-items:center;justify-content:flex-end;gap:10px;color:inherit;text-decoration:none;opacity:.5;transition:opacity .25s;padding:2px 0}
.srail a span{font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;opacity:0;transform:translateX(6px);transition:opacity .25s,transform .25s}
.srail a i{display:block;width:6px;height:6px;border-radius:50%;background:currentColor;transition:transform .25s;flex:0 0 6px}
.srail a:hover,.srail a.on{opacity:1}
.srail a.on i{transform:scale(1.7)}
.srail:hover a span{opacity:1;transform:none}
@media(max-width:1100px){.srail{display:none}}

/* ============ Iteracion 12: curaduria y navegacion ============ */
/* ---------- index: las cuatro rutas de la home ---------- */
.ix{padding:var(--sec) 0}
.ixhead{display:flex;flex-direction:column;gap:18px;margin-bottom:clamp(40px,6vh,64px)}
.ixgrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid var(--ink)}
.ixc{position:relative;display:flex;flex-direction:column;gap:12px;padding:clamp(26px,3.6vh,40px) clamp(16px,2vw,32px) clamp(30px,4vh,44px);
  border-right:1px solid var(--line);color:var(--ink);transition:background .35s}
.ixc:first-child{padding-left:0}
.ixc:last-child{border-right:0}
.ixc:hover{background:rgba(181,131,63,.07)}
.ixn{font-family:ui-monospace,'SF Mono',Menlo,monospace;font-size:10.5px;letter-spacing:.12em;color:var(--gray)}
.ixico{display:block;width:30px;height:30px;color:var(--brass);margin:6px 0 4px}
.ixt{font-family:var(--serif);font-weight:400;font-size:clamp(24px,2.2vw,34px);line-height:1.05;letter-spacing:-.01em}
.ixd{font-size:13.5px;line-height:1.6;color:#3c3f44;max-width:30ch}
.ixgo{margin-top:auto;padding-top:10px;font-size:20px;transition:transform .35s}
.ixc:hover .ixgo{transform:translateX(6px)}
@media(max-width:980px){.ixgrid{grid-template-columns:1fr 1fr}.ixc:nth-child(2){border-right:0}.ixc:nth-child(3){padding-left:0}
  .ixc:nth-child(n+3){border-top:1px solid var(--line)}}
@media(max-width:560px){.ixgrid{grid-template-columns:1fr}.ixc{border-right:0;padding-left:0!important;flex-direction:row;flex-wrap:wrap;align-items:center;gap:6px 14px}
  .ixc+.ixc{border-top:1px solid var(--line)}.ixn{display:none}.ixico{width:24px;height:24px;margin:0}
  .ixt{font-size:24px;flex:1}.ixd{flex-basis:100%;max-width:none}.ixgo{position:absolute;right:0;top:28px;padding:0}}

/* ---------- notes: notas de la firma ---------- */
.nts{padding:var(--sec) 0}
.nts.tint{background:#E4DED2}
.ntlist{list-style:none;border-top:1px solid var(--ink)}
.ntlist a{display:grid;grid-template-columns:minmax(0,1fr) clamp(180px,22vw,300px) 24px;gap:20px;align-items:baseline;
  padding:20px 0;border-bottom:1px solid var(--line);color:var(--ink)}
.ntt{font-family:var(--serif);font-weight:400;font-size:clamp(19px,1.7vw,26px);line-height:1.2;letter-spacing:-.005em}
.ntk{font-size:12px;letter-spacing:.06em;color:var(--gray)}
.ntgo{font-size:16px;color:var(--brass);transition:transform .3s}
.ntlist a:hover .ntgo{transform:translate(3px,-3px)}
.ntlist a:hover .ntt{text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1px}
@media(max-width:860px){.ntlist a{grid-template-columns:minmax(0,1fr) 20px;gap:6px 12px}.ntk{grid-column:1;grid-row:2}.ntgo{grid-row:1/3;grid-column:2}}

/* ---------- retain: contratar, sin aire de catalogo ---------- */
.rtn{padding:var(--sec) 0}
.rtlay{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(300px,.85fr);gap:clamp(40px,6vw,110px);align-items:start}
.rtsteps{list-style:none;border-top:1px solid var(--ink)}
.rtsteps li{display:grid;grid-template-columns:clamp(56px,6vw,90px) minmax(0,1fr);gap:16px;padding:clamp(26px,3.6vh,40px) 0;border-bottom:1px solid var(--line)}
.rtn-n{font-family:var(--serif);font-weight:300;font-style:italic;font-size:clamp(26px,2.4vw,36px);line-height:1;color:var(--brass)}
.rtsteps h3{font-family:var(--serif);font-weight:400;font-size:clamp(24px,2.3vw,36px);line-height:1.05;letter-spacing:-.01em}
.rtsteps p{margin-top:10px;font-size:14.5px;line-height:1.6;color:#3c3f44;max-width:46ch}
.rtlinks{display:flex;flex-wrap:wrap;gap:8px 22px;margin-top:14px}
.rtl{font-size:11px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;border-bottom:1px solid rgba(20,22,26,.4);padding-bottom:3px;color:var(--ink);transition:border-color .3s}
.rtl:hover{border-color:var(--ink)}
.rtcard{position:sticky;top:clamp(100px,14vh,140px);background:var(--ink);color:#fff;padding:clamp(28px,3vw,44px)}
.rtcard .smallcap{color:rgba(255,255,255,.55)}
.rtcard dl{margin-top:18px;border-top:1px solid rgba(255,255,255,.22)}
.rtcard dl div{padding:14px 0;border-bottom:1px solid rgba(255,255,255,.12)}
.rtcard dt{font-size:10.5px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.5)}
.rtcard dd{margin-top:6px;font-size:14px;line-height:1.5;color:rgba(255,255,255,.88)}
.rtcta{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:28px;padding:17px 20px;background:#fff;color:var(--ink);
  font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;transition:background .3s}
.rtcta:hover{background:#ece6da}
.rtcta span{font-size:15px;letter-spacing:0;color:var(--brass)}
.rtnote{margin-top:12px;font-size:12px;color:rgba(255,255,255,.5)}
.rtalt{display:inline-block;margin-top:20px;font-size:11px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:#fff;
  border-bottom:1px solid rgba(255,255,255,.4);padding-bottom:3px}
@media(max-width:980px){.rtlay{grid-template-columns:1fr}.rtcard{position:static}}

/* ---------- logo de la firma sobre su lamina ---------- */
.slogo{display:block;width:clamp(200px,18vw,270px);height:auto;margin-bottom:clamp(26px,4vh,40px)}

/* ---------- next: la siguiente pagina, siempre a la vista ---------- */
.nxt{padding:clamp(56px,9vh,104px) 0;border-top:1px solid var(--line)}
.nxa{display:flex;flex-direction:column;gap:14px;color:var(--ink)}
.nxt-t{font-family:var(--serif);font-weight:300;font-size:clamp(40px,6vw,92px);line-height:1;letter-spacing:-.02em;display:flex;align-items:baseline;gap:.3em}
.nxt-t .it{font-style:italic}
.nxt-t i{font-style:normal;font-size:.6em;color:var(--brass);transition:transform .4s}
.nxa:hover .nxt-t i{transform:translateX(12px)}
.nxd{font-size:14px;color:var(--gray);max-width:60ch}

/* ============ Iteracion 17: refinamiento editorial ============ */
/* ---------- primer impacto: sin precargador, hero mas limpio ---------- */
#pre{display:none!important}
.srail{transition:opacity .45s}
.srail.away{opacity:0;pointer-events:none}
.hero .hname{font-size:clamp(56px,8.4vw,150px)!important;line-height:.9!important;letter-spacing:-.028em;max-width:10ch!important}
.hero .hname .it{color:rgba(255,255,255,.62)}
.hero .hacts{margin-top:clamp(30px,4.4vh,46px)}
@media(max-width:860px){.hero .hname{font-size:clamp(48px,13vw,72px)!important}}
.hero::after{content:none}
.hero .hkick{opacity:.85}
.hero .hcred{font-size:11.5px;letter-spacing:.2em;color:rgba(255,255,255,.62);margin-top:clamp(44px,5.8vh,62px)}
@media(max-width:860px){.hero .hcred{margin-top:26px}.hero .hkick{font-size:11px;letter-spacing:.14em}}
.hero .hsub{font-family:var(--serif);font-weight:300;font-size:clamp(22px,2vw,31px);line-height:1.25;letter-spacing:-.005em;
  max-width:26ch;color:rgba(255,255,255,.94);margin-top:clamp(34px,5vh,56px)}
.hero .hsub .it{font-family:var(--serif);font-style:italic;font-weight:300;color:rgba(255,255,255,.62)}
@media(max-width:860px){.hero .hsub{font-size:clamp(21px,5.8vw,25px);max-width:22ch}}

/* ---------- in brief: tres ideas en composicion ---------- */
.brf{padding:var(--sec) 0;background:var(--bg)}
.brl{margin-bottom:clamp(28px,4vh,44px)}
.brgrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid var(--ink)}
.bri{padding:clamp(28px,4vh,44px) clamp(18px,2.6vw,44px) 8px 0;border-right:1px solid var(--line)}
.bri+.bri{padding-left:clamp(18px,2.6vw,44px)}
.bri:last-child{border-right:0}
.brn{display:block;font-family:ui-monospace,'SF Mono',Menlo,monospace;font-size:11.5px;letter-spacing:.12em;color:var(--brass)}
.bri h3{margin-top:18px;font-family:var(--serif);font-weight:300;font-size:clamp(30px,2.9vw,46px);line-height:1.02;letter-spacing:-.015em;max-width:12ch}
.brt{margin-top:20px;font-size:clamp(15.5px,1.15vw,17.5px);line-height:1.6;color:#2b2e33;max-width:34ch}
.brd{margin-top:16px;padding-top:14px;border-top:1px solid var(--line);font-size:14.5px;line-height:1.55;color:var(--gray);max-width:34ch}
@media(max-width:860px){.brgrid{grid-template-columns:1fr}.bri{border-right:0;padding-left:0!important;border-bottom:1px solid var(--line);padding-bottom:28px}
  .bri:last-child{border-bottom:0}.bri h3{font-size:clamp(30px,8.4vw,40px)}}

/* ---------- la cita: una pausa ---------- */
.qt{padding:clamp(96px,15vh,180px) 0;background:var(--bg);border-top:1px solid var(--line)}
@media(min-width:981px){.qt .wrap{padding-left:calc(34px + 20%)}}
.qlead{max-width:48ch;font-size:clamp(16px,1.3vw,19px);line-height:1.6;color:#3c3f44}
.qq{margin-top:clamp(18px,2.6vh,28px);font-family:var(--serif);font-style:italic;font-weight:300;font-size:clamp(50px,7.4vw,118px);
  line-height:.96;letter-spacing:-.02em;max-width:13ch;color:var(--ink)}
.qwho{margin-top:clamp(26px,4vh,40px);display:flex;align-items:center;gap:14px;font-size:12px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--gray)}
.qwho::before{content:'';width:40px;height:1px;background:var(--brass)}

/* ---------- for counsel: los recursos como protagonistas ---------- */
.csl{background:var(--ink);color:#fff;padding:var(--sec) 0}
.csl.light{background:var(--bg);color:var(--ink)}
.cshead{display:flex;flex-direction:column;gap:18px;margin-bottom:clamp(40px,6vh,64px)}
.csl .cshead .smallcap{color:rgba(255,255,255,.6)}
.csl.light .cshead .smallcap{color:var(--gray)}
.csgrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:clamp(12px,1.4vw,20px)}
.csgrid.c3{grid-template-columns:repeat(3,minmax(0,1fr))}
.csc{display:flex;flex-direction:column;gap:14px;min-height:clamp(280px,34vh,340px);padding:clamp(24px,2.2vw,34px);
  border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.025);color:inherit;transition:border-color .35s,transform .35s,background .35s}
.csc:hover{border-color:var(--brass);background:rgba(181,131,63,.07);transform:translateY(-3px)}
.csl.light .csc{border-color:var(--line);background:#F4F0E8}
.csl.light .csc:hover{border-color:var(--brass);background:#F7F3EC}
.cstop{display:flex;justify-content:space-between;align-items:flex-start;gap:12px}
.csico{display:block;width:30px;height:30px;color:var(--brass)}
.cstag{font-family:ui-monospace,'SF Mono',Menlo,monospace;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.6);text-align:right}
.csl.light .cstag{color:var(--gray)}
.cst{margin-top:clamp(36px,6vh,64px);font-family:var(--serif);font-weight:400;font-size:clamp(26px,2.2vw,36px);line-height:1.04;letter-spacing:-.01em}
.csd{font-size:15px;line-height:1.55;color:rgba(255,255,255,.76)}
.csl.light .csd{color:#3c3f44}
.csa{display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:14px;border-top:1px solid rgba(255,255,255,.16);
  font-size:11.5px;font-weight:500;letter-spacing:.18em;text-transform:uppercase}
.csl.light .csa{border-top-color:var(--line)}
.csa i{font-style:normal;font-size:15px;letter-spacing:0;color:var(--brass);transition:transform .35s}
.csc:hover .csa i{transform:translateX(4px)}
@media(max-width:1080px){.csgrid,.csgrid.c3{grid-template-columns:1fr 1fr}}
@media(max-width:600px){.csgrid,.csgrid.c3{grid-template-columns:1fr}.csc{min-height:0}.cst{margin-top:6px}}

/* ---------- research: tres lineas de trabajo ---------- */
.rcl{padding:var(--sec) 0;background:#E4DED2}
.rclgrid{display:grid;grid-template-columns:1.45fr 1fr 1fr;border-top:1px solid var(--ink)}
.rcg{padding:clamp(28px,4vh,44px) clamp(18px,2.4vw,40px) 10px 0;border-right:1px solid rgba(20,22,26,.16)}
.rcg+.rcg{padding-left:clamp(18px,2.4vw,40px)}
.rcg:last-child{border-right:0}
.rcghd{display:flex;align-items:baseline;gap:12px}
.rcn{font-family:var(--serif);font-weight:300;font-size:clamp(64px,7vw,112px);line-height:.8;letter-spacing:-.03em;color:var(--brass)}
.rcnk{font-size:12px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--gray)}
.rcg h3{margin-top:22px;font-family:var(--serif);font-weight:400;font-size:clamp(26px,2.3vw,36px);line-height:1.05;letter-spacing:-.01em}
.rcarea{display:inline-flex;align-items:baseline;gap:10px;margin-top:14px;font-size:15px;color:var(--ink);border-bottom:1px solid rgba(20,22,26,.35);padding-bottom:3px}
.rcarea .smallcap{font-size:11px}
.rcarea:hover{border-bottom-color:var(--ink)}
.rcg ul{list-style:none;margin-top:26px;border-top:1px solid rgba(20,22,26,.16)}
.rcg li a{display:grid;grid-template-columns:52px minmax(0,1fr);gap:10px;padding:14px 0;border-bottom:1px solid rgba(20,22,26,.12);color:var(--ink)}
.rcg li b{font-weight:500;font-size:14px;font-variant-numeric:tabular-nums;color:var(--gray)}
.rcg li span{font-family:var(--serif);font-size:clamp(17px,1.35vw,20px);line-height:1.25}
.rcg li a:hover span{text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1px}
@media(max-width:980px){.rclgrid{grid-template-columns:1fr}.rcg{border-right:0;padding-left:0!important;border-bottom:1px solid rgba(20,22,26,.16);padding-bottom:30px}}

/* ---------- pantallas con foto: compacta y apertura ---------- */
@media(min-width:861px){
  .stmt.withimg.compact{min-height:clamp(460px,66svh,700px)}
  .stmt.withimg.opener{min-height:clamp(560px,82svh,900px)}
}
.nxalt{display:inline-block;margin-top:24px;font-size:11.5px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;
  color:var(--ink);border-bottom:1px solid rgba(20,22,26,.4);padding-bottom:4px}
.nxalt:hover{border-bottom-color:var(--ink)}

/* ---------- legibilidad: textos pequenos y contraste ---------- */
:root{--gray:#565A60}
.smallcap{font-size:12px;letter-spacing:.14em}
.elede,.plede{font-size:clamp(15px,1.15vw,17px);line-height:1.65}
.pcard .pdesc{font-size:14.5px;line-height:1.6}
.pcard.lead .pdesc{font-size:15.5px}
.pcard li{font-size:14px}
.method .mintro{font-size:15.5px}
.mrow p{font-size:15px;line-height:1.6}
.lgrid.wide .lcell,.lcell{font-size:clamp(14.5px,1.1vw,16px);line-height:1.55}
.tst p{font-size:14px}.tlg{font-size:13px}.tgrid em{font-size:11.5px}.tcol .tyr{font-size:12px}
.pau{font-size:15px}.pve,.pwhy{font-size:14.5px}
.rtsteps p{font-size:15.5px}.rtcard dd{font-size:15px}.rtcard dt{font-size:11.5px}
.ssub{font-size:clamp(16px,1.3vw,19px)}
.tlt{font-size:12.5px}.tlrt{font-size:12.5px}
@media(max-width:860px){
  .smallcap{font-size:11.5px}
  .elede,.plede{font-size:16px}
  .stmt .ssub{font-size:16.5px}
  .pcard .pdesc,.mrow p,.lcell{font-size:15.5px}
  .tbot a{flex:1 1 auto;padding-left:5px;padding-right:5px;font-size:10.5px;letter-spacing:.05em}
}

/* ============ Iteracion 19: una sola escala tipografica ============ */
/* Niveles (a 1440px): nombre 121 · pantalla 64 · cita 60 · seccion 52 · subseccion 40 · tarjeta 26-32 · cuerpo 15-18.
   Las cifras siguen la misma escala: grandes, nunca por encima del nombre. */
#site .hero .hname{font-size:clamp(56px,8.4vw,150px)!important}
#site .sq{font-size:clamp(40px,4.5vw,76px);line-height:1;max-width:14ch}
#site .d80,#site .reserve .d97{font-size:clamp(32px,3.6vw,58px);line-height:1.04}
#site .d56{font-size:clamp(28px,2.8vw,44px);line-height:1.08}
#site .qq{font-size:clamp(38px,4.2vw,68px);line-height:1.02;max-width:16ch}
#site .qt{padding:clamp(80px,11vh,140px) 0}
#site .nn{font-size:clamp(56px,6vw,96px)}
#site .tn{font-size:clamp(42px,4.4vw,70px)}
#site .rcn{font-size:clamp(42px,4.4vw,70px)}
#site .nxt-t{font-size:clamp(34px,3.6vw,58px)}
#site .nxt-t i{font-size:.6em}
#site .fname{font-size:clamp(44px,4.6vw,76px)}
#site .pcard .pnum{font-size:clamp(28px,2.8vw,44px)}
#site .bri h3{font-size:clamp(26px,2.2vw,34px)}
#site .pcard h3,#site .rcg h3{font-size:clamp(22px,1.9vw,28px)}
#site .rtsteps h3{font-size:clamp(21px,1.7vw,26px)}
#site .rtn-n{font-size:clamp(22px,2vw,30px)}
#site .cst{font-size:clamp(22px,1.8vw,28px)}
#site .froles{font-size:clamp(19px,1.6vw,24px)}
@media(max-width:860px){
  #site .sq{font-size:clamp(36px,10vw,46px)}
  #site .d80,#site .reserve .d97{font-size:clamp(30px,8.4vw,40px)}
  #site .d56{font-size:clamp(26px,7.2vw,34px)}
  #site .qq{font-size:clamp(34px,9.4vw,44px)}
  #site .nn{font-size:clamp(56px,16vw,76px)}
  #site .fname{font-size:clamp(40px,11vw,52px)}
}
:root{--sec:clamp(96px,13vh,160px)}
@media(max-width:860px){:root{--sec:clamp(72px,10vh,104px)}}
/* carril de secciones: los puntos alineados en una columna */
.srail a{position:relative}
.srail a span{position:absolute;right:18px;top:50%;margin-top:-.6em}

/* ---------- reposo: lo que se mueve solo, despacio ---------- */
@media(prefers-reduced-motion:no-preference){
  .hcue i::after{animation:hcue 2.4s cubic-bezier(.7,0,.3,1) infinite}
  @keyframes hcue{0%{top:-100%}50%{top:0}100%{top:100%}}
  .ico.on .idraw{stroke-dasharray:1;animation:idraw 7s ease-in-out infinite}
  @keyframes idraw{0%{stroke-dashoffset:1;opacity:1}32%{stroke-dashoffset:0;opacity:1}76%{stroke-dashoffset:0;opacity:1}
    88%{stroke-dashoffset:0;opacity:0}89%{stroke-dashoffset:1;opacity:0}100%{stroke-dashoffset:1;opacity:1}}
  .ico.on .ifade{animation:ifade 4.6s ease-in-out infinite}
  @keyframes ifade{0%,100%{opacity:1}50%{opacity:.18}}
  .ico.on .ispin{transform-box:fill-box;transform-origin:center;animation:ispin 18s linear infinite}
  .ico.on .ihand{transform-box:fill-box;transform-origin:50% 100%;animation:ispin 12s linear infinite}
  @keyframes ispin{to{transform:rotate(360deg)}}
  .fgs-st .dot{animation:dotp 3.4s ease-out infinite}
  @keyframes dotp{0%{box-shadow:0 0 0 0 rgba(181,131,63,.55)}70%{box-shadow:0 0 0 9px rgba(181,131,63,0)}100%{box-shadow:0 0 0 0 rgba(181,131,63,0)}}
}
</style>"""

# ------------------------------------------------------------- 7. navegacion
NAV = [
    {"t": "Overview",      "h": "/pettingill"},
    {"t": "Practice",      "h": "/pettingill/practice"},
    {"t": "Testimony",     "h": "/pettingill/testimony"},
    {"t": "Publications",  "h": "/pettingill/research"},
    {"t": "CV",            "h": "/pettingill/record"},
    {"t": "Enquiry",       "h": "/pettingill#inquiry"},
]
NAVHTML = ('<nav class="menupanel" id="nitems" aria-label="Site">'
           + ''.join(f'<a href="{n["h"]}">{n["t"]}</a>' for n in NAV) + '</nav>')
TNAV = [("Practice",      "/pettingill/practice",  "practice"),
        ("Testimony",     "/pettingill/testimony", "testimony"),
        ("Publications",  "/pettingill/research",  "research"),
        ("CV",            "/pettingill/record",    "record")]
TABS = [("Overview",  "/pettingill",           "home"),
        ("Practice",  "/pettingill/practice",  "practice"),
        ("Testimony", "/pettingill/testimony", "testimony"),
        ("Publications", "/pettingill/research", "research"),
        ("CV",        "/pettingill/record",    "record")]

def topbar_html(active):
    ON = ' class="on"'
    links = ''.join(f'<a href="{h}"{ON if k == active else ""}>{t}</a>' for t, h, k in TNAV)
    akey = active or 'home'
    tabs = ''.join(f'<a href="{h}"{ON if k == akey else ""}>{t}</a>' for t, h, k in TABS)
    return ('<div class="topbar">'
            '<a class="u11 smallcap tname" href="/pettingill" style="color:#fff">Pettingill</a>'
            f'<nav class="tnav" aria-label="Primary">{links}</nav>'
            f'<a class="u11 smallcap ncta" id="ncta" href="{"#inquiry" if not active else "/pettingill#inquiry"}" style="color:#fff">Discuss a matter</a>'
            f'<nav class="tbot" aria-label="Primary">{tabs}</nav></div>')

# ---------------------------------------------------------- 8. reparto por pagina
def deep(k):
    return copy.deepcopy(S[k])

def renum(secs):
    n = 1
    for s in secs:
        if s['type'] in ('hero', 'band', 'nums', 'stmt', 'scrub', 'index', 'next', 'brief', 'quote', 'counsel'):
            continue
        s['no'] = f'{n:02d}'
        n += 1
    return secs

def homeward(o):
    if isinstance(o, dict):
        return {k: ('/pettingill#inquiry' if v == '#inquiry' else homeward(v)) for k, v in o.items()}
    if isinstance(o, list):
        return [homeward(x) for x in o]
    return o

def page(title, desc, secs, sub=False):
    nc = dict(full['navcta'])
    if sub:
        secs = homeward(secs); nc['h'] = '/pettingill#inquiry'
    return {"meta": {"title": title, "description": desc},
            "logo": full['logo'], "nav": NAV, "navcta": nc, "sections": renum(secs)}

inq = lambda: deep('inquiry')
def foot():
    s = deep('inquiry'); s['noform'] = True
    return s
ALT = {"t": "Discuss a matter", "h": "/pettingill#inquiry"}

NX = lambda k, title, d, h: {"type": "next", "k": k, "t": title, "d": d, "h": h}
T_PR = 'Practice — Bernard F. Pettingill, Jr., Ph.D.'
T_TE = 'Testimony — Bernard F. Pettingill, Jr., Ph.D.'
T_PU = 'Publications — Bernard F. Pettingill, Jr., Ph.D.'
T_CV = 'CV — Bernard F. Pettingill, Jr., Ph.D.'

PAGES = {
    'home': page(TITLE.replace('&amp;', '&'), DESC,
        [deep('hero'), deep('in-brief'), deep('numbers'), deep('quote'), deep('s-question'),
         deep('s-research'), deep('for-counsel'), deep('s-firm'), inq()]),
    'practice': page(T_PR,
        'Future care, lost earnings, wrongful death and household services, and how to start a case.',
        [deep('practice-open'), deep('routes'), deep('engage'), deep('disclosure'),
         dict(NX('Next', 'Testimony', 'Depositions and trials since 2017.', '/pettingill/testimony'), alt=ALT), foot()], sub=True),
    'testimony': page(T_TE,
        'More than 1,500 cases with deposition or trial testimony, in 29 states and the U.S. Virgin Islands.',
        [deep('testimony-open'), deep('listing'),
         dict(NX('Next', 'Publications', 'Papers from 1979 to 2025.', '/pettingill/research'), alt=ALT), foot()], sub=True),
    'research': page(T_PU,
        'Papers from 1979 to 2025 on the cost of future care, life expectancy, household services and hospital pricing.',
        [deep('research-open'), deep('research-lines'), deep('publications'), deep('research-cv'),
         dict(NX('Next', 'CV', 'Education, teaching and professional bodies since 1969.', '/pettingill/record'), alt=ALT), foot()], sub=True),
    'record': page(T_CV,
        'Education, academic appointments and professional bodies, and Pettingill Analytics.',
        [deep('record-open'), deep('record-years'), deep('record-education'), deep('record-academic'), deep('record-orgs'),
         dict(NX('Next', 'Start a <t>case</t>', 'Checklists for injury and death, the retainer and the terms.', '/pettingill/practice#engage'), alt=ALT), foot()], sub=True),
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
derive('/pettingill/practice.json', T_PR, URL + '/practice', DST + '/practice', 'practice')
derive('/pettingill/testimony.json', T_TE, URL + '/testimony', DST + '/testimony', 'testimony')
derive('/pettingill/research.json', T_PU, URL + '/research', DST + '/research', 'research')
derive('/pettingill/record.json', T_CV, URL + '/record', DST + '/record', 'record')
print('pettingill listo')
