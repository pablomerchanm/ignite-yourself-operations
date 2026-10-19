# Dr. Patrick Brant — expediente de autoridad, preview no indexado.
# Una sola pagina estatica y editorial; el sistema grafico de Habib, con su propia jerarquia.
# Tercera persona, entradas fechadas, fuentes visibles. Sin llamadas a la accion ni formulario.
# Todo el texto vive en brant/content.json; este script solo compone el HTML.
import json, html, os, re

DST = '/home/user/ignite-yourself-operations/clients/jorge-arce/brant'
C = json.load(open(DST + '/content.json', encoding='utf-8'))

def esc(s):
    return html.escape(s or '', quote=True)

def rich(s):
    s = esc(s)
    s = s.replace('&lt;t&gt;', '<span class="it">').replace('&lt;/t&gt;', '</span>')
    s = s.replace('&lt;b&gt;', '<b>').replace('&lt;/b&gt;', '</b>')
    return s

# La jerarquia responde a quien lee: abogados que buscan perito, directores de I+D, socios.
# Primero en que es autoridad (y la prueba), luego que hace hoy, luego donde lo gano.
def ext(h, label='Record'):
    if not h:
        return ''
    return f'<a class="go" href="{esc(h)}" target="_blank" rel="noopener" aria-label="{esc(label)}">↗</a>'

def head(s, lede=True):
    logos = ''.join(f'<img src="{esc(l["src"])}" alt="{esc(l["alt"])}" width="{l["w"]}" loading="lazy">'
                    for l in s.get('logos', []))
    return ((f'<aside class="rail rv">{logos}</aside>' if logos else '')
            + f'<div class="body"><h2 class="h2 rv">{rich(s["title"])}</h2>'
            + (f'<p class="lede rv">{rich(s["lede"])}</p>' if lede and s.get('lede') else ''))

def src(s):
    return f'<p class="src rv">{esc(s["src"])}</p>' if s.get('src') else ''

def section(s, inner, tint=False):
    return (f'<section class="sec{" tint" if tint else ""}" id="{s["id"]}"><div class="wrap grid">'
            + head(s) + inner + src(s) + '</div></div></section>')

def table(rows, cols=('Role', 'Institution', 'Years')):
    items = ''.join(f'<li class="rv"><span class="ar">{rich(r)}</span><span class="ai">{esc(i)}</span>'
                    f'<span class="ay">{esc(y)}</span></li>' for r, i, y in rows)
    return ('<div class="table"><div class="thead">' + ''.join(f'<span>{c}</span>' for c in cols)
            + f'</div><ol class="appt">{items}</ol></div>')

def ledger(items):
    return ''.join(f'<li class="rv"><span class="ly">{esc(y)}</span><span class="lt">{rich(t)}</span>'
                   f'<span class="lb">{rich(b)}</span></li>' for y, t, b in items)

# ------------------------------------------------------------------ secciones
def expertise(s):
    def ev(e):
        name, year, h = e
        inner = f'<span>{esc(name)}</span><span class="fy">{esc(year)}{" ↗" if h else ""}</span>'
        return (f'<li><a href="{esc(h)}" target="_blank" rel="noopener">{inner}</a></li>' if h
                else f'<li><span class="fe">{inner}</span></li>')
    rows = ''.join(f'<li class="rv"><h3>{esc(x["t"])}</h3>'
                   f'<p>{rich(x["d"])}</p><ul class="fev">{"".join(ev(e) for e in x["ev"])}</ul></li>'
                   for x in s['items'])
    return section(s, '<div class="fthead"><span>Field</span><span>Scope</span><span>On the record</span></div>'
                      f'<ol class="fields">{rows}</ol>', tint=True)

def present(s):
    return section(s, table(s['rows']))

def exxonmobil(s):
    return section(s, table(s['rows'], ('Position', 'Company', 'Years'))
                      + f'<h3 class="sub rv">Milestones</h3><ol class="ledger">{ledger(s["milestones"])}</ol>', tint=True)

def patents(s):
    figs = ''.join(f'<div class="rv"><span class="fn">{esc(n)}</span><span class="fk">{esc(k)}</span></div>'
                   for n, k in s['figures'])
    rows = ''.join(
        f'<li class="rv"><span class="py">{esc(x["y"])}</span><div class="px"><h3>{esc(x["t"])}</h3>'
        f'<p class="cite"><span>{esc(x["c"])}</span><span>{esc(x["role"])}</span></p></div>{ext(x["h"], "Patent record")}</li>'
        for x in s['items'])
    return section(s, f'<div class="figs">{figs}</div><p class="figsrc rv">{esc(s["figsrc"])}</p>'
                      f'<ol class="pubs">{rows}</ol>')

def publications(s):
    rows = ''.join(
        f'<li class="rv"><span class="ry">{esc(x["y"])}</span><div class="rx">'
        f'<span class="rf">{esc(x["field"])}</span><h3>{esc(x["t"])}</h3>'
        f'<p class="cite"><span>{esc(x["c"])}</span>{ext(x["h"], "Publisher record")}</p><p class="auth">{esc(x["role"])}</p></div></li>'
        for x in s['items'])
    return section(s, f'<ol class="firsts">{rows}</ol>', tint=True)

def distinctions(s):
    return section(s, f'<ol class="ledger">{ledger(s["items"])}</ol>'
                      f'<h3 class="sub rv">Lectures</h3><ol class="ledger">{ledger(s["lectures"])}</ol>')

def education(s):
    return section(s, f'<ol class="ledger">{ledger(s["items"])}</ol>', tint=True)

def notice(s):
    glance = ''.join(f'<div><dt>{esc(k)}</dt><dd>{esc(v)}</dd></div>' for k, v in s['glance'])
    return section(s, f'<div class="notice"><p class="ntext rv">{rich(s["text"])}</p>'
                      f'<dl class="glance rv">{glance}</dl></div>')

def short(h):
    return re.sub(r'^https?://(www\.)?', '', h).rstrip('/')

def sources(s):
    rows = ''.join(f'<li class="rv"><span class="st">{esc(t)}</span>'
                   f'<a class="su" href="{esc(h)}" target="_blank" rel="noopener">{esc(short(h))}</a></li>'
                   for t, h in s['items'])
    return section(s, f'<ol class="srcs">{rows}</ol>', tint=True)

# ------------------------------------------------------------------ cabecera
H = C['hero']
facts = ''.join(f'<div><dt>{esc(k)}</dt><dd>{esc(v)}</dd></div>' for k, v in H['facts'])
hero = f'''<section class="hero" id="top">
  <picture class="hph"><source media="(max-width:760px)" srcset="{H["imgMobile"]}"><img src="{H["img"]}" alt="Patrick Brant, portrait (provisional art direction)" fetchpriority="high"></picture>
  <div class="wrap htop"><p class="hk">{esc(H["kick"])}</p><p class="hplace">{esc(H["place"])}</p></div>
  <div class="wrap hin">
    <h1 class="hn">{rich(H["name"])}</h1>
    <p class="hp">{esc(H["post"])}</p>
    <p class="hr"><span class="rl">{esc(H["role"])}</span><span class="rs">{esc(H["roleShort"])}</span></p>
  </div>
  <div class="wrap hfoot"><dl class="hfacts">{facts}</dl><p class="hcap">{esc(H["caption"])}</p></div>
</section>'''

# lamina: la escena del escritorio, con el titulo de su seminario de Purdue
B = C['band']
band = f'''<figure class="band" aria-label="{esc(B["by"])}">
  <picture class="bph"><source media="(max-width:760px)" srcset="{B["imgMobile"]}"><img src="{B["img"]}" alt="" loading="lazy"></picture>
  <div class="wrap grid bin"><figcaption class="bq rv"><blockquote>“{esc(B["q"])}”</blockquote><p class="bby">{esc(B["by"])}</p></figcaption></div>
  <p class="bcap">{esc(B["caption"])}</p>
</figure>'''

F = C['footer']
links = ''.join(f'<li><a href="{esc(h)}" target="_blank" rel="noopener">{esc(t)} <i aria-hidden="true">↗</i></a></li>' for t, h in F['links'])
footer = f'''<footer class="foot"><div class="wrap">
  <div class="ftop"><div><p class="fl">{esc(F["line"])}</p><p class="fname">{rich(F["name"])}</p></div>
  <ul class="flinks">{links}</ul></div>
  <div class="fbase"><span>{esc(F["base"])}</span><a href="#top">Back to top ↑</a><span>{esc(F["fine"])}</span></div>
</div></footer>
<aside class="igy"><div class="wrap igyin"><div><span class="mlab">A concept by</span>
  <a href="https://igniteyourself.co/" target="_blank" rel="noopener"><img src="/brant/assets/igy-logo.png" alt="Ignite Yourself" width="150"></a></div>
  <p>{esc(F["igy"])}</p></div></aside>'''

bar = ('<header class="bar" id="bar"><div class="wrap barin"><a class="bname" href="#top">Dr. Patrick Brant</a>'
       '<button class="bmenu" type="button" aria-expanded="false" aria-controls="blinks">Contents</button>'
       '<nav class="blinks" id="blinks" aria-label="Sections">'
       + ''.join(f'<a href="#{k}">{t}</a>' for k, t in [('expertise', 'Expertise'), ('present', 'Present'), ('exxonmobil', 'ExxonMobil'),
                                                          ('patents', 'Patents'), ('publications', 'Papers'), ('notice', 'Note'), ('sources', 'Sources')])
       + '</nav></div></header>')

body = (hero + expertise(C['expertise']) + present(C['present']) + exxonmobil(C['exxonmobil']) + band
        + patents(C['patents']) + publications(C['publications']) + distinctions(C['distinctions'])
        + education(C['education']) + notice(C['notice']) + sources(C['sources']))

CSS = r'''
@font-face{font-family:'Editors Note';src:url(/brant/assets/fonts/EditorsNote-Light.otf) format('opentype');font-weight:300;font-style:normal;font-display:swap}
@font-face{font-family:'Editors Note';src:url(/brant/assets/fonts/EditorsNote-Regular.otf) format('opentype');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'Editors Note';src:url(/brant/assets/fonts/EditorsNote-LightItalic.otf) format('opentype');font-weight:300;font-style:italic;font-display:swap}
@font-face{font-family:'Editors Note';src:url(/brant/assets/fonts/EditorsNote-Italic.otf) format('opentype');font-weight:400;font-style:italic;font-display:swap}
@font-face{font-family:'DM Mono';src:url(/brant/assets/fonts/DMMono-Regular.woff2) format('woff2');font-weight:400;font-display:swap}
@font-face{font-family:'DM Mono';src:url(/brant/assets/fonts/DMMono-Medium.woff2) format('woff2');font-weight:500;font-display:swap}
:root{
  --ink:#14161A;--ink2:#0E1013;--bone:#EDE7DC;--paper:#F3EFE7;--smoke:#6B6660;--text:#24262A;
  --rule:rgba(20,22,26,.16);--rule2:rgba(20,22,26,.08);--amber:#8C5A1C;--amber2:#D4974A;
  --display:'Editors Note',Georgia,'Times New Roman',serif;--sans:'Instrument Sans',system-ui,sans-serif;--mono:'DM Mono',ui-monospace,monospace;
  --gut:clamp(20px,4.4vw,72px);--max:1360px}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;scroll-padding-top:72px;-webkit-text-size-adjust:100%}
body{background:var(--bone);color:var(--text);font:400 16px/1.6 var(--sans);-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
a{color:inherit}
ol,ul{list-style:none}
img{display:block;max-width:100%}
::selection{background:var(--ink);color:var(--bone)}
.wrap{max-width:var(--max);margin:0 auto;padding:0 var(--gut)}
.it{font-style:italic}
.mlab,.hplace,.bmenu,.thead span,.fthead span,.rf,.sub,.hk,.fl,.bname,.blinks a,.hfacts dt,.glance dt,.fk,.hcap,.bcap,.fbase{font-family:var(--sans);font-weight:500;font-size:11px;letter-spacing:.12em;text-transform:uppercase}

/* barra: aparece al dejar el retrato */
.bar{position:fixed;inset:0 0 auto;z-index:20;transform:translateY(-100%);transition:transform .45s cubic-bezier(.2,.7,.2,1);background:rgba(20,22,26,.95);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:var(--bone)}
.bar.on{transform:none}
.barin{display:flex;align-items:center;justify-content:space-between;height:56px}
.bname{font-family:var(--display);font-weight:400;font-size:14px;letter-spacing:.14em;text-decoration:none}
.blinks{display:flex;gap:clamp(16px,2.2vw,34px)}
.blinks a{text-decoration:none;color:rgba(237,231,220,.7);transition:color .2s}
.blinks a:hover,.blinks a.on{color:var(--bone)}
.blinks a.on{text-decoration:underline;text-decoration-color:var(--amber2);text-underline-offset:7px}
.bmenu{display:none;background:none;border:0;color:var(--bone);cursor:pointer;padding:10px 0}

/* retrato: el rostro a la derecha, el nombre a la izquierda */
.hero{position:relative;min-height:100svh;background:var(--ink);color:var(--bone);display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden}
.hph,.hph img{position:absolute;inset:0;width:100%;height:100%}
.hph img{object-fit:cover;object-position:72% 30%}
.hero::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(14,16,19,.72) 0%,rgba(14,16,19,.34) 42%,rgba(14,16,19,0) 62%),linear-gradient(180deg,rgba(14,16,19,.3) 0%,rgba(14,16,19,0) 22%,rgba(14,16,19,0) 55%,rgba(14,16,19,.9) 100%)}
.htop,.hin,.hfoot{position:relative;z-index:2;width:100%}
.hplace,.hr .rs{display:none}
.hin{padding-bottom:clamp(48px,8vh,96px)}
.hk{color:var(--amber2);margin-bottom:clamp(14px,2vh,22px)}
.hn{font:300 clamp(64px,11vw,184px)/.9 var(--display);letter-spacing:-.03em}
.hn .it{display:block;opacity:.94}
.hp{font:400 clamp(13px,1.1vw,16px)/1 var(--mono);letter-spacing:.16em;margin-top:clamp(22px,3vh,34px);color:rgba(237,231,220,.86);text-transform:uppercase}
.hr{font:300 italic clamp(20px,1.9vw,30px)/1.25 var(--display);margin-top:12px;color:rgba(237,231,220,.8);max-width:24em}
.hfoot{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;padding-bottom:clamp(48px,8vh,88px)}
.hfacts{display:grid;grid-template-columns:repeat(3,minmax(0,auto));gap:0;border-top:1px solid rgba(237,231,220,.22);padding-top:22px}
.hfacts div{padding-right:clamp(24px,4vw,64px)}
.hfacts div+div{padding-left:clamp(16px,2vw,28px);border-left:1px solid rgba(237,231,220,.16)}
.hfacts dt{color:rgba(237,231,220,.5);margin-bottom:6px}
.hfacts dd{font:300 clamp(16px,1.3vw,20px)/1.3 var(--display)}
.hcap{color:rgba(237,231,220,.42);font-size:10px;white-space:nowrap}

/* sistema de seccion: carril lateral fijo, cuerpo en nueve columnas */
.grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:clamp(16px,2vw,32px)}
.mlab{display:block;color:var(--smoke);margin-bottom:22px}
.mlab::before{content:'';display:inline-block;width:22px;height:1px;background:var(--amber);vertical-align:middle;margin-right:12px}
.sec{padding:clamp(80px,11vh,140px) 0;border-bottom:1px solid var(--rule)}
.sec.tint{background:var(--paper)}
.rail{grid-column:1/4;align-self:start;position:sticky;top:112px;display:flex;flex-direction:column;align-items:flex-start;gap:28px;padding-top:22px}
.rail img{height:auto;opacity:.88}
.body{grid-column:4/13;min-width:0}
.h2{font:300 clamp(42px,5vw,80px)/1 var(--display);letter-spacing:-.025em;color:var(--ink);max-width:14em}
.h2 .it{opacity:.6}
.lede{margin-top:22px;max-width:40em;font-size:17px;color:#55524D}
.src{margin-top:clamp(36px,5vh,56px);font:400 11.5px/1.5 var(--mono);letter-spacing:.04em;color:var(--smoke);padding-top:14px;border-top:1px solid var(--rule2)}
.sub{color:var(--smoke);margin:clamp(48px,7vh,72px) 0 18px}

/* campos de experticia: el campo, su alcance y la prueba */
.fthead,.fields>li{display:grid;grid-template-columns:minmax(0,.95fr) minmax(0,1.15fr) minmax(180px,.8fr);gap:clamp(16px,2vw,32px)}
.fthead{margin-top:clamp(40px,6vh,60px);padding-bottom:12px;border-bottom:1px solid var(--ink);color:var(--smoke)}
.fields>li{padding:clamp(22px,3vh,30px) 0;border-bottom:1px solid var(--rule);align-items:baseline}
.fields h3{font:300 clamp(22px,1.8vw,28px)/1.15 var(--display);color:var(--ink);letter-spacing:-.015em}
.fields p{font-size:15px;line-height:1.55;color:#4A4743;max-width:32em}
.fev{display:flex;flex-direction:column;gap:7px}
.fev a,.fev .fe{display:flex;justify-content:space-between;gap:14px;padding-bottom:7px;border-bottom:1px solid var(--rule2);font:400 12px/1.35 var(--mono);color:var(--ink);text-decoration:none}
.fev .fy{color:var(--smoke);white-space:nowrap}
.fev a .fy{color:var(--amber)}
.fev a:hover span:first-child{color:var(--amber)}

/* nota biografica */
.notice{display:grid;grid-template-columns:minmax(0,1fr) minmax(220px,300px);gap:clamp(36px,5vw,88px);margin-top:clamp(40px,6vh,64px)}
.ntext{font:300 clamp(21px,1.75vw,28px)/1.42 var(--display);color:var(--ink);max-width:33em;letter-spacing:-.006em}
.ntext::first-letter{float:left;font-size:5.4em;line-height:.8;padding:.06em .1em 0 0;color:var(--ink)}
.glance{border-top:1px solid var(--ink);align-self:start}
.glance div{padding:14px 0;border-bottom:1px solid var(--rule)}
.glance dt{color:var(--smoke);margin-bottom:5px}
.glance dd{font-size:15px;line-height:1.45;color:var(--ink)}

/* tablas */
.table{margin-top:clamp(40px,6vh,60px)}
.thead{display:grid;grid-template-columns:1.25fr 1fr 110px;gap:24px;padding-bottom:12px;border-bottom:1px solid var(--ink);color:var(--smoke)}
.appt li{display:grid;grid-template-columns:1.25fr 1fr 110px;gap:24px;padding:18px 0;border-bottom:1px solid var(--rule);align-items:baseline}
.ar{font:300 clamp(19px,1.5vw,23px)/1.25 var(--display);color:var(--ink)}
.ai{font-size:15px;color:#4A4743}
.ay{font:400 12.5px/1 var(--mono);color:var(--smoke);text-align:right}

/* lamina: escena del escritorio y el titulo del seminario */
.band{position:relative;background:var(--ink);color:var(--bone);min-height:clamp(520px,56.3vw,1000px);display:flex;align-items:center;overflow:hidden}
.bph,.bph img{position:absolute;inset:0;width:100%;height:100%}
.bph img{object-fit:cover;object-position:30% 50%}
.band::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(14,16,19,0) 38%,rgba(14,16,19,.5) 72%,rgba(14,16,19,.7) 100%)}
.bin{position:relative;z-index:2;width:100%}
.bq{grid-column:8/13}
.bq blockquote{font:300 italic clamp(30px,3.3vw,54px)/1.14 var(--display);letter-spacing:-.015em;color:var(--bone)}
.bby{margin-top:22px;font:400 11.5px/1.5 var(--mono);letter-spacing:.04em;color:rgba(237,231,220,.6);max-width:30em}
.bcap{position:absolute;z-index:2;right:var(--gut);bottom:26px;color:rgba(237,231,220,.42);font-size:10px}

/* investigacion: articulos seleccionados */
.firsts{margin-top:clamp(40px,6vh,64px);border-top:1px solid var(--ink)}
.firsts li{display:grid;grid-template-columns:clamp(110px,12vw,180px) minmax(0,1fr);gap:clamp(20px,3vw,48px);padding:clamp(28px,4vh,40px) 0;border-bottom:1px solid var(--rule)}
.ry{font:300 clamp(48px,5vw,80px)/.86 var(--display);color:var(--ink);letter-spacing:-.035em;font-variant-numeric:lining-nums}
.rf{color:var(--amber);display:block;margin-bottom:10px}
.rx h3{font:300 clamp(21px,1.7vw,27px)/1.25 var(--display);color:var(--ink);max-width:34em;letter-spacing:-.005em}
.cite{margin-top:12px;display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 18px;font:400 12px/1.5 var(--mono);color:var(--smoke);letter-spacing:.01em}
.cite span+span::before{content:'·';margin-right:18px;color:var(--rule)}
.auth{margin-top:4px;font-size:14px;line-height:1.45;color:#55524D}
.go{font:400 15px/1 var(--mono);color:var(--amber);text-decoration:none;padding:4px 2px;transition:transform .2s}
.go:hover{transform:translate(2px,-2px)}

/* registros: honores, conferencias, educacion */
.ledger{margin-top:clamp(28px,4vh,44px);border-top:1px solid var(--ink)}
.ledger li{display:grid;grid-template-columns:120px minmax(0,1.3fr) minmax(0,1fr);gap:24px;padding:18px 0;border-bottom:1px solid var(--rule);align-items:baseline}
.ly{font:300 24px/1 var(--display);color:var(--amber);font-variant-numeric:lining-nums}
.ly:empty::before{content:'—';color:var(--rule)}
.lt{font:300 clamp(19px,1.5vw,23px)/1.3 var(--display);color:var(--ink)}
.lb{font-size:14.5px;color:#4A4743}
.sec .h2+.ledger{margin-top:clamp(40px,6vh,64px)}

/* patentes: cifras y registro */
.figs{margin-top:clamp(40px,6vh,64px);display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid var(--ink)}
.figs div{padding:22px 0 0}
.figs div+div{padding-left:clamp(16px,2vw,28px);border-left:1px solid var(--rule)}
.fn{display:block;font:300 clamp(56px,6vw,104px)/.9 var(--display);color:var(--ink);letter-spacing:-.035em;font-variant-numeric:lining-nums}
.fk{display:block;color:var(--smoke);margin-top:12px}
.figsrc{margin-top:16px;font:400 11.5px/1.5 var(--mono);color:var(--smoke);max-width:60em}
.pubs{margin-top:clamp(48px,7vh,72px);border-top:1px solid var(--ink)}
.pubs li{display:grid;grid-template-columns:72px minmax(0,1fr) 28px;gap:clamp(16px,2.4vw,36px);padding:20px 0;border-bottom:1px solid var(--rule);align-items:baseline}
.py{font:400 13px/1 var(--mono);color:var(--amber)}
.px h3{font:300 clamp(18px,1.4vw,22px)/1.32 var(--display);color:var(--ink);max-width:40em}
.px .cite{margin-top:8px}

/* fuentes */
.srcs{margin-top:clamp(40px,6vh,64px);border-top:1px solid var(--ink)}
.srcs li{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.9fr);gap:20px;padding:15px 0;border-bottom:1px solid var(--rule);align-items:baseline}
.st{font-size:15px;color:var(--ink)}
.su{font:400 12px/1.4 var(--mono);color:var(--smoke);text-decoration:none;word-break:break-all}
.su:hover{color:var(--amber)}

/* pie */
.foot{background:var(--ink);color:var(--bone);padding:clamp(80px,12vh,140px) 0 28px}
.ftop{display:flex;justify-content:space-between;align-items:flex-end;gap:40px;flex-wrap:wrap;padding-bottom:clamp(48px,7vh,80px);border-bottom:1px solid rgba(237,231,220,.14)}
.fl{color:rgba(237,231,220,.5);margin-bottom:20px}
.fname{font:300 clamp(48px,7vw,120px)/.94 var(--display);letter-spacing:-.03em}
.fname .it{opacity:.72}
.flinks{display:flex;flex-direction:column;gap:12px;min-width:220px}
.flinks a{display:flex;justify-content:space-between;gap:24px;padding-bottom:10px;border-bottom:1px solid rgba(237,231,220,.2);text-decoration:none;font:300 20px/1.2 var(--display)}
.flinks a i{font-style:normal;color:var(--amber2);font-family:var(--mono);font-size:14px}
.fbase{display:flex;justify-content:space-between;gap:20px;padding-top:24px;color:rgba(237,231,220,.45)}
.fbase a{text-decoration:none}
.igy{background:var(--ink2);color:rgba(237,231,220,.6);padding:48px 0 56px}
.igyin{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:40px;align-items:start}
.igy .mlab{color:rgba(237,231,220,.45)}
.igy .mlab::before{background:var(--amber2)}
.igy p{font-size:13px;line-height:1.6;max-width:44em}

/* entrada suave, solo con JS y sin preferencia de movimiento reducido */
@media(prefers-reduced-motion:no-preference){
  .js .rv{opacity:0;transform:translateY(14px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1)}
  .js .rv.in{opacity:1;transform:none}}

/* tableta */
@media(max-width:1080px){
  .rail{grid-column:1/-1;position:static;flex-direction:row;flex-wrap:wrap;align-items:center;gap:20px 36px;padding-top:0;margin-bottom:32px}
  .body{grid-column:1/-1}
  .fthead{display:none}
  .fields{margin-top:clamp(40px,6vh,60px);border-top:1px solid var(--ink)}
  .fields>li{grid-template-columns:minmax(0,1fr);row-gap:10px}
  .fev{max-width:420px;margin-top:6px}
  .notice{grid-template-columns:1fr}
  .glance{display:grid;grid-template-columns:1fr 1fr;column-gap:32px}
  .bq{grid-column:7/13}}
/* movil */
@media(max-width:760px){
  html{scroll-padding-top:60px}
  .bmenu{display:block}
  .blinks{display:none}
  .bar.open .blinks{display:flex;flex-direction:column;gap:0;position:absolute;top:56px;left:0;right:0;padding:4px var(--gut) 18px;background:var(--ink);box-shadow:0 24px 40px rgba(14,16,19,.35)}
  .bar.open .blinks a{padding:13px 0;border-bottom:1px solid rgba(237,231,220,.1);font-size:12px}
  .hero{min-height:100svh;padding-top:calc(117.6vw - 150px);justify-content:flex-end}
  .hph{position:absolute;inset:0 0 auto 0;height:auto}
  .hph img{position:static;height:auto}
  .hph::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,16,19,.55) 0%,rgba(14,16,19,0) 18%,rgba(14,16,19,0) 48%,rgba(20,22,26,.86) 82%,#14161A 100%)}
  .hero::after{display:none}
  .htop{position:absolute;inset:0 0 auto 0;display:flex;justify-content:space-between;align-items:baseline;padding-top:calc(env(safe-area-inset-top,0px) + 22px)}
  .hk{margin:0}
  .hplace{display:block;color:rgba(237,231,220,.66)}
  .hin{padding-bottom:22px}
  .hn{font-size:clamp(48px,16.5vw,72px);line-height:.95}
  .hn .it{display:inline}
  .hp{font-size:10.5px;letter-spacing:.12em;margin-top:14px}
  .hr{font-size:19px;line-height:1.3;margin-top:10px}
  .hr .rl{display:none}
  .hr .rs{display:inline}
  .hfoot{display:block;position:static;padding-bottom:calc(env(safe-area-inset-bottom,0px) + 56px)}
  .hfacts{position:relative;z-index:2;grid-template-columns:repeat(3,minmax(0,1fr));padding-top:16px}
  .hfacts div{display:flex;flex-direction:column;padding:0 0 0 14px}
  .hfacts div:first-child{padding-left:0}
  .hfacts div+div{padding-left:14px}
  .hfacts dt{order:2;margin:7px 0 0;font-size:9.5px;letter-spacing:.1em;line-height:1.35}
  .hfacts dd{order:1;font-size:28px;line-height:1}
  .hcap{position:absolute;z-index:2;right:6px;top:calc(env(safe-area-inset-top,0px) + 64px);writing-mode:vertical-rl;font-size:9px;letter-spacing:.14em}
  .rail{gap:20px 28px;margin-bottom:30px}
  .rail img{max-width:44%}
  .h2{font-size:clamp(38px,11vw,52px)}
  .glance{grid-template-columns:1fr}
  .thead{display:none}
  .appt li{grid-template-columns:1fr;gap:4px}
  .ay{text-align:left}
  .band{display:block;min-height:0}
  .bph{position:relative;display:block;height:auto;aspect-ratio:1/1}
  .bph img{position:absolute}
  .band::after{inset:auto 0 auto 0;top:0;height:0;background:none}
  .bph::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(14,16,19,0) 60%,var(--ink) 100%)}
  .bin{padding-top:8px;padding-bottom:56px}
  .bq{grid-column:1/-1}
  .bcap{position:static;padding:0 var(--gut) 28px;margin-top:-28px}
  .firsts li{grid-template-columns:1fr;gap:12px}
  .ry{font-size:48px}
  .ledger li{grid-template-columns:64px minmax(0,1fr);gap:6px 16px}
  .ledger .lb{grid-column:2}
  .ly{font-size:20px}
  .figs{grid-template-columns:1fr 1fr}
  .figs div:nth-child(3){padding-left:0;border-left:0}
  .figs div{padding-bottom:20px}
  .pubs li{grid-template-columns:52px minmax(0,1fr);gap:14px}
  .pubs .go{grid-column:2;justify-self:start}
  .srcs li{grid-template-columns:minmax(0,1fr);gap:4px}
  .flinks{width:100%}
  .fbase{flex-direction:column;gap:8px}
  .igyin{grid-template-columns:1fr;gap:24px}}
'''

JS = r'''
document.documentElement.classList.add('js');
(function(){
  var bar=document.getElementById('bar'),hero=document.getElementById('top');
  function onScroll(){bar.classList.toggle('on',window.scrollY>hero.offsetHeight-80)}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  var menu=bar.querySelector('.bmenu');
  function close(){bar.classList.remove('open');menu.setAttribute('aria-expanded','false')}
  menu.addEventListener('click',function(){var o=bar.classList.toggle('open');menu.setAttribute('aria-expanded',o?'true':'false')});
  var links=bar.querySelectorAll('.blinks a');
  links.forEach(function(a){a.addEventListener('click',close)});
  if('IntersectionObserver' in window){
    var spy=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
    links.forEach(function(a){var t=document.querySelector(a.getAttribute('href'));if(t)spy.observe(t)});
  }
  var els=document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(e){io.observe(e)});
})();
'''

meta = C['meta']
page = f'''<!doctype html>
<html lang="en-US">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(meta["title"])}</title>
<meta name="description" content="{esc(meta["description"])}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#14161A">
<link rel="icon" href="/brant/assets/icon.svg" type="image/svg+xml">
<meta property="og:type" content="profile">
<meta property="og:site_name" content="Dr. Patrick Brant">
<meta property="og:title" content="{esc(meta["title"])}">
<meta property="og:description" content="{esc(meta["description"])}">
<meta property="og:url" content="{esc(meta["url"])}">
<meta property="og:image" content="https://igniteyourself.co/brant/assets/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="preload" href="/brant/assets/fonts/EditorsNote-Light.otf" as="font" type="font/otf" crossorigin>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>{CSS}</style>
</head>
<body>
{bar}
<main>
{body}
</main>
{footer}
<script>{JS}</script>
</body>
</html>
'''
open(DST + '/index.html', 'w', encoding='utf-8').write(page)

# Las paginas antiguas pasan a ser anclas del expediente.
for path, anchor in [('practice', 'expertise'), ('track', 'exxonmobil'), ('voice', 'publications')]:
    os.makedirs(f'{DST}/{path}', exist_ok=True)
    open(f'{DST}/{path}/index.html', 'w', encoding='utf-8').write(
        f'<!doctype html><html lang="en-US"><head><meta charset="utf-8"><meta name="robots" content="noindex, nofollow">'
        f'<title>Dr. Patrick Brant</title><meta http-equiv="refresh" content="0; url=/brant#{anchor}">'
        f'<link rel="canonical" href="/brant#{anchor}"></head><body><a href="/brant#{anchor}">Dr. Patrick Brant</a></body></html>\n')
for old in ('home.json', 'track.json', 'voice.json', 'practice.json'):
    if os.path.exists(f'{DST}/{old}'):
        os.remove(f'{DST}/{old}')
print('brant listo')
