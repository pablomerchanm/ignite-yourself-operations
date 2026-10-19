# Professor Nagy Habib — expediente de autoridad, preview privado.
# Una sola pagina estatica y editorial: el registro, no la historia.
# Tercera persona, entradas fechadas, fuentes visibles. Sin llamadas a la accion.
# Todo el texto vive en habib/content.json; este script solo compone el HTML.
import json, html, os, re

DST = '/home/user/ignite-yourself-operations/clients/jorge-arce/habib'
C = json.load(open(DST + '/content.json', encoding='utf-8'))

def esc(s):
    return html.escape(s or '', quote=True)

def rich(s):
    s = esc(s)
    s = s.replace('&lt;t&gt;', '<span class="it">').replace('&lt;/t&gt;', '</span>')
    s = s.replace('&lt;b&gt;', '<b>').replace('&lt;/b&gt;', '</b>')
    return s

SECTIONS = [C[k] for k in ('notice', 'appointments', 'chronology', 'clinical', 'research',
                           'instruments', 'honours', 'publications', 'education', 'sources')]
NO = {s['id']: f'{i + 1:02d}' for i, s in enumerate(SECTIONS)}

def ext(h, label='Record'):
    if not h:
        return ''
    return f'<a class="go" href="{esc(h)}" target="_blank" rel="noopener" aria-label="{esc(label)}">↗</a>'

def head(s, lede=True):
    return (f'<header class="rail rv"><span class="no">§&#8239;{NO[s["id"]]}</span>'
            f'<span class="lab">{esc(s["label"])}</span></header>'
            f'<div class="body"><h2 class="h2 rv">{rich(s["title"])}</h2>'
            + (f'<p class="lede rv">{rich(s["lede"])}</p>' if lede and s.get('lede') else ''))

def src(s):
    return f'<p class="src rv">{esc(s["src"])}</p>' if s.get('src') else ''

def section(s, inner, tint=False):
    return (f'<section class="sec{" tint" if tint else ""}" id="{s["id"]}"><div class="wrap grid">'
            + head(s) + inner + src(s) + '</div></div></section>')

# ------------------------------------------------------------------ secciones
def notice(s):
    glance = ''.join(f'<div><dt>{esc(k)}</dt><dd>{esc(v)}</dd></div>' for k, v in s['glance'])
    return section(s, f'<div class="notice"><p class="ntext rv">{rich(s["text"])}</p>'
                      f'<dl class="glance rv">{glance}</dl></div>')

def appointments(s):
    def rows(items):
        return ''.join(f'<li class="rv"><span class="ar">{rich(r)}</span><span class="ai">{esc(i)}</span>'
                       f'<span class="ay">{esc(y)}</span></li>' for r, i, y in items)
    return section(s, '<div class="table"><div class="thead"><span>Role</span><span>Institution</span><span>Years</span></div>'
                      f'<ol class="appt">{rows(s["current"])}</ol>'
                      f'<h3 class="sub rv">Past</h3><ol class="appt">{rows(s["past"])}</ol></div>', tint=True)

def chronology(s):
    rows = ''.join(f'<li class="rv"><span class="cy">{esc(y)}</span><span class="ct">{rich(t)}</span></li>'
                   for y, t in s['items'])
    return section(s, f'<ol class="chron">{rows}</ol>')

def clinical(s):
    rows = ''.join(f'<li class="rv"><span class="cn">{i + 1:02d}</span><h3>{esc(t)}</h3><p>{rich(d)}</p></li>'
                   for i, (t, d) in enumerate(s['items']))
    return section(s, f'<ol class="clin">{rows}</ol>', tint=True)

def research(s):
    rows = ''.join(
        f'<li class="rv"><span class="ry">{esc(x["y"])}</span><div class="rx">'
        f'<span class="rf">{esc(x["field"])}</span><h3>{esc(x["t"])}</h3>'
        f'<p class="cite"><span>{esc(x["c"])}</span><span>{esc(x["role"])}</span>{ext(x["h"], "PubMed record")}</p></div></li>'
        for x in s['items'])
    return section(s, f'<ol class="firsts">{rows}</ol>')

def instruments(s):
    dev = ''.join(
        f'<article class="plate rv"><span class="pk">Instrument</span><h3>{esc(d["name"])}</h3><dl>'
        + ''.join(f'<div><dt>{esc(k)}</dt><dd>{esc(v)}</dd></div>' for k, v in d['spec'])
        + '</dl></article>' for d in s['devices'])
    com = ''.join(f'<li class="rv"><span class="ar">{esc(n)}</span><span class="ai">{esc(f)}</span>'
                  f'<span class="an">{esc(t)}</span></li>' for n, f, t in s['companies'])
    return section(s, f'<div class="plates">{dev}</div>'
                      '<h3 class="sub rv">Companies founded or co-founded</h3>'
                      '<div class="table"><div class="thead three"><span>Company</span><span>Field</span><span>Note</span></div>'
                      f'<ol class="appt three">{com}</ol></div>'
                      f'<p class="also rv">{esc(s["also"])}</p>', tint=True)

def ledger(items):
    return ''.join(f'<li class="rv"><span class="ly">{esc(y)}</span><span class="lt">{rich(t)}</span>'
                   f'<span class="lb">{esc(b)}</span></li>' for y, t, b in items)

def honours(s):
    return section(s, f'<ol class="ledger">{ledger(s["items"])}</ol>')

def publications(s):
    figs = ''.join(f'<div class="rv"><span class="fn">{esc(n)}</span><span class="fk">{esc(k)}</span></div>'
                   for n, k in s['figures'])
    rows = ''.join(
        f'<li class="rv"><span class="py">{esc(x["y"])}</span><div class="px"><h3>{esc(x["t"])}</h3>'
        f'<p class="cite"><span>{esc(x["c"])}</span><span>{esc(x["role"])}</span></p></div>{ext(x["h"], "PubMed record")}</li>'
        for x in s['items'])
    lect = ledger(s['lectures'])
    return section(s, f'<div class="figs">{figs}</div><p class="figsrc rv">{esc(s["figsrc"])}</p>'
                      f'<ol class="pubs">{rows}</ol>'
                      f'<h3 class="sub rv">Invited lectures</h3><ol class="ledger">{lect}</ol>', tint=True)

def education(s):
    return section(s, f'<ol class="ledger">{ledger(s["items"])}</ol>')

def short(h):
    return re.sub(r'^https?://(www\.)?', '', h).rstrip('/')

def sources(s):
    rows = ''.join(f'<li class="rv"><span class="sn">{i + 1}</span><span class="st">{esc(t)}</span>'
                   f'<a class="su" href="{esc(h)}" target="_blank" rel="noopener">{esc(short(h))}</a></li>'
                   for i, (t, h) in enumerate(s['items']))
    return section(s, f'<ol class="srcs">{rows}</ol>', tint=True)

# ------------------------------------------------------------------ cabecera
H = C['hero']
facts = ''.join(f'<div><dt>{esc(k)}</dt><dd>{esc(v)}</dd></div>' for k, v in H['facts'])
hero = f'''<section class="hero" id="top">
  <picture class="hph"><source media="(max-width:760px)" srcset="{H["imgMobile"]}"><img src="{H["img"]}" alt="Professor Nagy Habib" fetchpriority="high"></picture>
  <div class="wrap hin">
    <p class="hk">{esc(H["kick"])}</p>
    <h1 class="hn">{rich(H["name"])}</h1>
    <p class="hp">{esc(H["post"])}</p>
    <p class="hr">{esc(H["role"])}</p>
  </div>
  <div class="wrap hfoot"><dl class="hfacts">{facts}</dl><p class="hcap">{esc(H["caption"])}</p></div>
</section>'''

M = C['masthead']
toc = ''.join(f'<li><a href="#{s["id"]}"><span class="tn">{NO[s["id"]]}</span><span class="tt">{esc(s["label"])}</span>'
              f'<span class="tl" aria-hidden="true"></span></a></li>' for s in SECTIONS)
masthead = f'''<section class="mast" id="contents"><div class="wrap grid">
  <div class="mleft rv"><span class="mlab">{esc(M["label"])}</span><h2 class="mt">{rich(M["title"])}</h2><p class="mnote">{esc(M["note"])}</p></div>
  <nav class="toc rv" aria-label="Contents"><span class="mlab">Contents</span><ol>{toc}</ol></nav>
</div></section>'''

F = C['footer']
links = ''.join(f'<li><a href="{esc(h)}" target="_blank" rel="noopener">{esc(t)} <i aria-hidden="true">↗</i></a></li>' for t, h in F['links'])
footer = f'''<footer class="foot"><div class="wrap">
  <div class="ftop"><div><p class="fl">{esc(F["line"])}</p><p class="fname">{rich(F["name"])}</p></div>
  <ul class="flinks">{links}</ul></div>
  <div class="fbase"><span>London</span><a href="#top">Back to top ↑</a><span>{esc(F["fine"])}</span></div>
</div></footer>
<aside class="igy"><div class="wrap igyin"><div><span class="mlab">A concept by</span>
  <a href="https://igniteyourself.co/" target="_blank" rel="noopener"><img src="/habib/assets/igy-logo.png" alt="Ignite Yourself" width="150"></a></div>
  <p>{esc(F["igy"])}</p></div></aside>'''

bar = ('<header class="bar" id="bar"><div class="wrap barin"><a class="bname" href="#top">Professor Nagy Habib</a>'
       '<nav class="blinks" aria-label="Sections">'
       + ''.join(f'<a href="#{k}">{t}</a>' for k, t in [('notice', 'Note'), ('chronology', 'Chronology'), ('research', 'Research'),
                                                          ('instruments', 'Instruments'), ('publications', 'Publications'), ('sources', 'Sources')])
       + '</nav></div></header>')

body = (hero + masthead + notice(C['notice']) + appointments(C['appointments']) + chronology(C['chronology'])
        + clinical(C['clinical']) + research(C['research']) + instruments(C['instruments'])
        + honours(C['honours']) + publications(C['publications']) + education(C['education'])
        + sources(C['sources']))

CSS = r'''
@font-face{font-family:'Editors Note';src:url(/habib/assets/fonts/EditorsNote-Light.otf) format('opentype');font-weight:300;font-style:normal;font-display:swap}
@font-face{font-family:'Editors Note';src:url(/habib/assets/fonts/EditorsNote-Regular.otf) format('opentype');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:'Editors Note';src:url(/habib/assets/fonts/EditorsNote-LightItalic.otf) format('opentype');font-weight:300;font-style:italic;font-display:swap}
@font-face{font-family:'Editors Note';src:url(/habib/assets/fonts/EditorsNote-Italic.otf) format('opentype');font-weight:400;font-style:italic;font-display:swap}
@font-face{font-family:'DM Mono';src:url(/habib/assets/fonts/DMMono-Regular.woff2) format('woff2');font-weight:400;font-display:swap}
@font-face{font-family:'DM Mono';src:url(/habib/assets/fonts/DMMono-Medium.woff2) format('woff2');font-weight:500;font-display:swap}
:root{
  --ink:#14161A;--ink2:#0E1013;--steel:#23262C;--bone:#EDE7DC;--paper:#F3EFE7;--smoke:#6B6660;--text:#24262A;
  --rule:rgba(20,22,26,.16);--rule2:rgba(20,22,26,.08);--teal:#2F776D;--teal2:#5FAE9F;
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
.mlab,.lab,.thead span,.rf,.pk,.sub,.hk,.fl,.bname,.blinks a,.hfacts dt,.glance dt,.plate dt,.fk,.hcap,.fbase{font-family:var(--sans);font-weight:500;font-size:11px;letter-spacing:.16em;text-transform:uppercase}

/* barra: aparece al dejar el retrato */
.bar{position:fixed;inset:0 0 auto;z-index:20;transform:translateY(-100%);transition:transform .45s cubic-bezier(.2,.7,.2,1);background:rgba(20,22,26,.95);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:var(--bone)}
.bar.on{transform:none}
.barin{display:flex;align-items:center;justify-content:space-between;height:56px}
.bname{font-family:var(--display);font-weight:400;font-size:14px;letter-spacing:.18em;text-decoration:none}
.blinks{display:flex;gap:clamp(16px,2.2vw,34px)}
.blinks a{text-decoration:none;color:rgba(237,231,220,.7);transition:color .2s}
.blinks a:hover{color:var(--bone)}

/* retrato */
.hero{position:relative;min-height:100svh;background:var(--ink);color:var(--bone);display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden}
.hph,.hph img{position:absolute;inset:0;width:100%;height:100%}
.hph img{object-fit:cover;object-position:70% 30%}
.hero::after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(14,16,19,.62) 0%,rgba(14,16,19,.25) 42%,rgba(14,16,19,0) 64%),linear-gradient(180deg,rgba(14,16,19,.3) 0%,rgba(14,16,19,0) 22%,rgba(14,16,19,0) 55%,rgba(14,16,19,.9) 100%)}
.hin,.hfoot{position:relative;z-index:2;width:100%}
.hin{padding-bottom:clamp(40px,7vh,84px)}
.hk{color:var(--teal2);margin-bottom:clamp(14px,2vh,22px)}
.hn{font:300 clamp(64px,11vw,184px)/.9 var(--display);letter-spacing:-.025em}
.hn .it{display:block;opacity:.94}
.hp{font:400 clamp(13px,1.1vw,16px)/1 var(--mono);letter-spacing:.24em;margin-top:clamp(22px,3vh,34px);color:rgba(237,231,220,.86)}
.hr{font:300 italic clamp(20px,1.9vw,30px)/1.25 var(--display);margin-top:12px;color:rgba(237,231,220,.78);max-width:24em}
.hfoot{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;padding-bottom:28px}
.hfacts{display:grid;grid-template-columns:repeat(3,minmax(0,auto));gap:0;border-top:1px solid rgba(237,231,220,.22);padding-top:16px}
.hfacts div{padding-right:clamp(24px,4vw,64px)}
.hfacts div+div{padding-left:clamp(16px,2vw,28px);border-left:1px solid rgba(237,231,220,.16)}
.hfacts dt{color:rgba(237,231,220,.5);margin-bottom:6px}
.hfacts dd{font:300 clamp(16px,1.3vw,20px)/1.3 var(--display)}
.hcap{color:rgba(237,231,220,.42);font-size:10px;white-space:nowrap}

/* cabecera del expediente e indice */
.grid{display:grid;grid-template-columns:repeat(12,minmax(0,1fr));column-gap:clamp(16px,2vw,32px)}
.mast{background:var(--bone);padding:clamp(80px,12vh,150px) 0 clamp(72px,10vh,120px);border-bottom:1px solid var(--rule)}
.mleft{grid-column:1/6}
.mlab{display:block;color:var(--smoke);margin-bottom:22px}
.mlab::before{content:'';display:inline-block;width:22px;height:1px;background:var(--teal);vertical-align:middle;margin-right:12px}
.mt{font:300 clamp(36px,3.8vw,60px)/1.04 var(--display);letter-spacing:-.015em;color:var(--ink)}
.mt .it{opacity:.62}
.mnote{margin-top:28px;color:var(--smoke);max-width:30em;font-size:15px}
.toc{grid-column:7/13}
.toc ol{border-top:1px solid var(--ink)}
.toc a{display:flex;align-items:baseline;gap:18px;padding:13px 0;border-bottom:1px solid var(--rule);text-decoration:none;transition:padding .25s,color .25s}
.toc a:hover{padding-left:8px;color:var(--teal)}
.tn{font:400 12px/1 var(--mono);color:var(--teal);width:24px}
.tt{font:300 clamp(20px,1.6vw,25px)/1.2 var(--display);color:var(--ink)}
.tl{flex:1;border-bottom:1px dotted rgba(20,22,26,.28);transform:translateY(-5px)}

/* sistema de seccion: carril lateral fijo, cuerpo en nueve columnas */
.sec{padding:clamp(80px,11vh,140px) 0;border-bottom:1px solid var(--rule)}
.sec.tint{background:var(--paper)}
.rail{grid-column:1/4;align-self:start;position:sticky;top:96px;display:flex;flex-direction:column;gap:10px}
.no{font:400 13px/1 var(--mono);color:var(--teal);letter-spacing:.06em}
.lab{color:var(--smoke)}
.body{grid-column:4/13;min-width:0}
.h2{font:300 clamp(42px,5vw,80px)/1 var(--display);letter-spacing:-.02em;color:var(--ink);max-width:14em}
.h2 .it{opacity:.6}
.lede{margin-top:22px;max-width:40em;font-size:17px;color:#55524D}
.src{margin-top:clamp(36px,5vh,56px);font:400 11.5px/1.5 var(--mono);letter-spacing:.06em;color:var(--smoke);padding-top:14px;border-top:1px solid var(--rule2)}
.sub{color:var(--smoke);margin:clamp(48px,7vh,72px) 0 18px}

/* nota biografica */
.notice{display:grid;grid-template-columns:minmax(0,1fr) minmax(220px,300px);gap:clamp(36px,5vw,88px);margin-top:clamp(40px,6vh,64px)}
.ntext{font:300 clamp(21px,1.75vw,28px)/1.42 var(--display);color:var(--ink);max-width:33em;letter-spacing:-.003em}
.ntext::first-letter{float:left;font-size:5.4em;line-height:.8;padding:.06em .1em 0 0;color:var(--ink)}
.glance{border-top:1px solid var(--ink);align-self:start}
.glance div{padding:14px 0;border-bottom:1px solid var(--rule)}
.glance dt{color:var(--smoke);margin-bottom:5px}
.glance dd{font-size:15px;line-height:1.45;color:var(--ink)}

/* tablas */
.table{margin-top:clamp(40px,6vh,60px)}
.thead{display:grid;grid-template-columns:1.25fr 1fr 110px;gap:24px;padding-bottom:12px;border-bottom:1px solid var(--ink);color:var(--smoke)}
.thead.three{grid-template-columns:.8fr .7fr 1.5fr}
.appt li{display:grid;grid-template-columns:1.25fr 1fr 110px;gap:24px;padding:18px 0;border-bottom:1px solid var(--rule);align-items:baseline}
.appt.three li{grid-template-columns:.8fr .7fr 1.5fr}
.ar{font:300 clamp(19px,1.5vw,23px)/1.25 var(--display);color:var(--ink)}
.ai{font-size:15px;color:#4A4743}
.ay{font:400 12.5px/1 var(--mono);color:var(--smoke);text-align:right}
.an{font-size:14.5px;color:#4A4743}
.also{margin-top:20px;font-size:14px;color:var(--smoke)}

/* cronologia: dos columnas de registro */
.chron{margin-top:clamp(40px,6vh,64px);columns:2;column-gap:clamp(40px,5vw,88px);border-top:1px solid var(--ink)}
.chron li{display:grid;grid-template-columns:76px minmax(0,1fr);gap:18px;padding:15px 0;border-bottom:1px solid var(--rule);break-inside:avoid}
.cy{font:300 24px/1.1 var(--display);color:var(--teal);font-variant-numeric:lining-nums tabular-nums}
.ct{font-size:15.5px;line-height:1.5;color:var(--ink)}
.ct .it{font-family:var(--display);font-size:1.1em}

/* trabajo clinico */
.clin{margin-top:clamp(40px,6vh,64px);display:grid;grid-template-columns:1fr 1fr;border-top:1px solid var(--ink)}
.clin li{padding:28px 0 32px;border-bottom:1px solid var(--rule)}
.clin li:nth-child(odd){padding-right:clamp(24px,3vw,48px);border-right:1px solid var(--rule)}
.clin li:nth-child(even){padding-left:clamp(24px,3vw,48px)}
.cn{font:400 12px/1 var(--mono);color:var(--teal)}
.clin h3{font:300 clamp(24px,2vw,32px)/1.12 var(--display);color:var(--ink);margin:14px 0 12px;letter-spacing:-.01em}
.clin p{font-size:15.5px;color:#4A4743;max-width:30em}
.clin p .it,.cite .it{font-family:var(--display);font-size:1.08em}

/* investigacion: primeros */
.firsts{margin-top:clamp(40px,6vh,64px);border-top:1px solid var(--ink)}
.firsts li{display:grid;grid-template-columns:clamp(110px,12vw,180px) minmax(0,1fr);gap:clamp(20px,3vw,48px);padding:clamp(28px,4vh,40px) 0;border-bottom:1px solid var(--rule)}
.ry{font:300 clamp(48px,5vw,80px)/.86 var(--display);color:var(--ink);letter-spacing:-.03em;font-variant-numeric:lining-nums}
.rf{color:var(--teal);display:block;margin-bottom:10px}
.rx h3{font:300 clamp(21px,1.7vw,27px)/1.25 var(--display);color:var(--ink);max-width:34em}
.cite{margin-top:12px;display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 18px;font:400 12px/1.5 var(--mono);color:var(--smoke);letter-spacing:.03em}
.cite span+span::before{content:'·';margin-right:18px;color:var(--rule)}
.go{font:400 15px/1 var(--mono);color:var(--teal);text-decoration:none;padding:4px 2px;transition:transform .2s}
.go:hover{transform:translate(2px,-2px)}

/* instrumentos */
.plates{margin-top:clamp(40px,6vh,64px);display:grid;grid-template-columns:1fr 1fr;gap:clamp(16px,2vw,28px)}
.plate{background:var(--ink);color:var(--bone);padding:clamp(28px,3vw,44px)}
.pk{color:var(--teal2)}
.plate h3{font:300 clamp(40px,4vw,64px)/1 var(--display);letter-spacing:-.02em;margin:16px 0 28px}
.plate dl div{display:grid;grid-template-columns:110px minmax(0,1fr);gap:16px;padding:12px 0;border-top:1px solid rgba(237,231,220,.14)}
.plate dt{color:rgba(237,231,220,.5)}
.plate dd{font-size:14.5px;line-height:1.5;color:rgba(237,231,220,.9)}

/* registros: honores, educacion, conferencias */
.ledger{margin-top:clamp(28px,4vh,44px);border-top:1px solid var(--ink)}
.ledger li{display:grid;grid-template-columns:120px minmax(0,1.3fr) minmax(0,1fr);gap:24px;padding:18px 0;border-bottom:1px solid var(--rule);align-items:baseline}
.ly{font:300 24px/1 var(--display);color:var(--teal);font-variant-numeric:lining-nums}
.ly:empty::before{content:'—';color:var(--rule)}
.lt{font:300 clamp(19px,1.5vw,23px)/1.3 var(--display);color:var(--ink)}
.lb{font-size:14.5px;color:#4A4743}
.sec .h2+.ledger{margin-top:clamp(40px,6vh,64px)}

/* publicaciones */
.figs{margin-top:clamp(40px,6vh,64px);display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid var(--ink)}
.figs div{padding:22px 0 0}
.figs div+div{padding-left:clamp(16px,2vw,28px);border-left:1px solid var(--rule)}
.fn{display:block;font:300 clamp(56px,6vw,104px)/.9 var(--display);color:var(--ink);letter-spacing:-.03em;font-variant-numeric:lining-nums}
.fk{display:block;color:var(--smoke);margin-top:12px}
.figsrc{margin-top:16px;font:400 11.5px/1.5 var(--mono);color:var(--smoke)}
.pubs{margin-top:clamp(48px,7vh,72px);border-top:1px solid var(--ink)}
.pubs li{display:grid;grid-template-columns:72px minmax(0,1fr) 28px;gap:clamp(16px,2.4vw,36px);padding:20px 0;border-bottom:1px solid var(--rule);align-items:baseline}
.py{font:400 13px/1 var(--mono);color:var(--teal)}
.px h3{font:300 clamp(18px,1.4vw,22px)/1.32 var(--display);color:var(--ink);max-width:40em}
.px .cite{margin-top:8px}

/* fuentes */
.srcs{margin-top:clamp(40px,6vh,64px);border-top:1px solid var(--ink);counter-reset:s}
.srcs li{display:grid;grid-template-columns:40px minmax(0,1fr) minmax(0,.9fr);gap:20px;padding:15px 0;border-bottom:1px solid var(--rule);align-items:baseline}
.sn{font:400 12px/1 var(--mono);color:var(--teal)}
.st{font-size:15px;color:var(--ink)}
.su{font:400 12px/1.4 var(--mono);color:var(--smoke);text-decoration:none;word-break:break-all}
.su:hover{color:var(--teal)}

/* pie */
.foot{background:var(--ink);color:var(--bone);padding:clamp(80px,12vh,140px) 0 28px}
.ftop{display:flex;justify-content:space-between;align-items:flex-end;gap:40px;flex-wrap:wrap;padding-bottom:clamp(48px,7vh,80px);border-bottom:1px solid rgba(237,231,220,.14)}
.fl{color:rgba(237,231,220,.5);margin-bottom:20px}
.fname{font:300 clamp(48px,7vw,120px)/.94 var(--display);letter-spacing:-.025em}
.fname .it{opacity:.72}
.flinks{display:flex;flex-direction:column;gap:12px;min-width:220px}
.flinks a{display:flex;justify-content:space-between;gap:24px;padding-bottom:10px;border-bottom:1px solid rgba(237,231,220,.2);text-decoration:none;font:300 20px/1.2 var(--display)}
.flinks a i{font-style:normal;color:var(--teal2);font-family:var(--mono);font-size:14px}
.fbase{display:flex;justify-content:space-between;gap:20px;padding-top:24px;color:rgba(237,231,220,.45)}
.fbase a{text-decoration:none}
.igy{background:var(--ink2);color:rgba(237,231,220,.6);padding:48px 0 56px}
.igyin{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:40px;align-items:start}
.igy .mlab{color:rgba(237,231,220,.45)}
.igy .mlab::before{background:var(--teal2)}
.igy p{font-size:13px;line-height:1.6;max-width:44em}

/* entrada suave, solo con JS y sin preferencia de movimiento reducido */
@media(prefers-reduced-motion:no-preference){
  .js .rv{opacity:0;transform:translateY(14px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1)}
  .js .rv.in{opacity:1;transform:none}}

/* tableta */
@media(max-width:1080px){
  .notice{grid-template-columns:1fr}
  .glance{display:grid;grid-template-columns:1fr 1fr;column-gap:32px}
  .chron{columns:1}}
/* movil */
@media(max-width:760px){
  html{scroll-padding-top:60px}
  .blinks{display:none}
  .hero{min-height:0;padding-top:58svh}
  .hph{height:70svh;bottom:auto}
  .hph img{object-position:50% 12%}
  .hero::after{height:70svh;bottom:auto;background:linear-gradient(180deg,rgba(14,16,19,.2) 0%,rgba(14,16,19,0) 18%,rgba(14,16,19,.15) 52%,rgba(20,22,26,.92) 84%,#14161A 100%)}
  .hin{padding-bottom:22px}
  .hfacts{display:none!important}
  .hn{font-size:clamp(58px,17vw,84px)}
  .hfoot{flex-direction:column;align-items:flex-start;gap:14px;padding-bottom:22px}
  .hfacts{grid-template-columns:1fr;width:100%}
  .hfacts div{padding:8px 0!important;border-left:0!important;border-bottom:1px solid rgba(237,231,220,.1);display:flex;justify-content:space-between;gap:16px}
  .hfacts dt{margin:0}
  .hfacts dd{text-align:right;font-size:15px}
  .mleft,.toc{grid-column:1/-1}
  .toc{margin-top:48px}
  .rail{grid-column:1/-1;position:static;flex-direction:row;align-items:baseline;gap:14px;margin-bottom:22px}
  .body{grid-column:1/-1}
  .h2{font-size:clamp(38px,11vw,52px)}
  .glance{grid-template-columns:1fr}
  .thead{display:none}
  .appt li,.appt.three li{grid-template-columns:1fr;gap:4px}
  .ay{text-align:left}
  .clin{grid-template-columns:1fr}
  .clin li:nth-child(odd){padding-right:0;border-right:0}
  .clin li:nth-child(even){padding-left:0}
  .firsts li{grid-template-columns:1fr;gap:12px}
  .ry{font-size:48px}
  .plates{grid-template-columns:1fr}
  .plate dl div{grid-template-columns:1fr;gap:4px}
  .ledger li{grid-template-columns:64px minmax(0,1fr);gap:6px 16px}
  .ledger .lb{grid-column:2}
  .ly{font-size:20px}
  .figs{grid-template-columns:1fr 1fr}
  .figs div:nth-child(3){padding-left:0;border-left:0}
  .figs div{padding-bottom:20px}
  .pubs li{grid-template-columns:52px minmax(0,1fr);gap:14px}
  .pubs .go{grid-column:2;justify-self:start}
  .srcs li{grid-template-columns:28px minmax(0,1fr);gap:4px 14px}
  .srcs .su{grid-column:2}
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
  var els=document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(e){io.observe(e)});
})();
'''

meta = C['meta']
page = f'''<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(meta["title"])}</title>
<meta name="description" content="{esc(meta["description"])}">
<meta name="robots" content="noindex, nofollow">
<meta name="theme-color" content="#14161A">
<link rel="icon" href="/habib/assets/icon.svg" type="image/svg+xml">
<meta property="og:type" content="profile">
<meta property="og:site_name" content="Professor Nagy Habib">
<meta property="og:title" content="{esc(meta["title"])}">
<meta property="og:description" content="{esc(meta["description"])}">
<meta property="og:url" content="{esc(meta["url"])}">
<meta property="og:image" content="https://igniteyourself.co/habib/assets/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="preload" href="/habib/assets/fonts/EditorsNote-Light.otf" as="font" type="font/otf" crossorigin>
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
for path, anchor in [('practice', 'research'), ('track', 'chronology'), ('voice', 'publications')]:
    os.makedirs(f'{DST}/{path}', exist_ok=True)
    open(f'{DST}/{path}/index.html', 'w', encoding='utf-8').write(
        f'<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="robots" content="noindex, nofollow">'
        f'<title>Professor Nagy Habib</title><meta http-equiv="refresh" content="0; url=/habib#{anchor}">'
        f'<link rel="canonical" href="/habib#{anchor}"></head><body><a href="/habib#{anchor}">Professor Nagy Habib</a></body></html>\n')
for old in ('home.json', 'track.json', 'voice.json', 'practice.json'):
    if os.path.exists(f'{DST}/{old}'):
        os.remove(f'{DST}/{old}')
print('habib listo')
