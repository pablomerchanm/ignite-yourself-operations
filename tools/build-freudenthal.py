# Dr Robert Freudenthal — Credential Authority, calibrado sin fotografia.
# Parte de la plantilla de Mark Cooke y le quita todo lo que aqui no puede ir:
# imagenes de personas, metaforas de recuperacion, cualquier cosa aspiracional.
# La tipografia y la retícula cargan solas.
import json, re, os, copy

TPL = '/home/user/ignite-yourself-operations/clients/jorge-arce/mark-cooke/index.html'
DST = '/home/user/ignite-yourself-operations/clients/jorge-arce/freudenthal'

base = open(TPL, encoding='utf-8').read()
full = json.load(open(DST + '/content.json', encoding='utf-8'))
S = {(s.get('id') or s['type']): s for s in full['sections']}

def sub1(p, r, s, flags=0, tag=''):
    out, n = re.subn(p, r, s, count=1, flags=flags)
    assert n == 1, 'no encontrado: ' + tag
    return out

# ---------------------------------------------------------------- 1. rutas
base = base.replace('/mark-cooke/', '/freudenthal/')

# ------------------------------------------- 2. sin foto: hero y method
# El partial pintaba un marcador "FOTO" cuando no habia imagen. Aqui no hay
# imagen nunca, asi que el marcador sobra.
base = sub1(r"'<section class=\"hero\" id=\"top\">'\+bigimg\(s\.img,'ph'\)\+",
            "'<section class=\"hero\" id=\"top\">'+(s.img?bigimg(s.img,'ph'):'')+",
            base, tag='hero-bigimg')
base = sub1(r"bigimg\(s\.img,'ph wr','data-r1'\)\+",
            "(s.img?bigimg(s.img,'ph wr','data-r1'):'')+",
            base, tag='method-bigimg')

# Los comentarios del CSS heredado hablaban de la fotografia de Mark, que aqui
# no existe. Se reescriben para que el archivo no mienta sobre si mismo.
base = base.replace('/* ---------- hero: calibrado a la fotografia de Mark ---------- */',
                    '/* ---------- hero: reglas heredadas de fotografia (inertes aqui) ---------- */')
base = base.replace('/* en vertical el recorte es horizontal: Mark se corre al centro y la rampa',
                    '/* (heredado del concepto con fotografia; sin imagen no aplica)')

# ------------------------------------------------------- 3. cabeza del documento
TITLE = 'Dr Robert Freudenthal — Consultant Psychiatrist &amp; Expert Witness'
DESC = ('A private authority-platform concept exploring the clinical, academic and '
        'expert-witness work of Dr Robert Freudenthal, Consultant Psychiatrist.')

base = sub1(r'<title>[^<]*</title>', f'<title>{TITLE}</title>', base, tag='title')
base = sub1(r'(<meta name="description" content=")[^"]*(">)',
            lambda m: m.group(1) + DESC + m.group(2), base, tag='desc')
base = sub1(r'(<meta property="og:site_name" content=")[^"]*(">)',
            lambda m: m.group(1) + 'Dr Robert Freudenthal' + m.group(2), base, tag='og-site')
base = sub1(r'(<meta property="og:title" content=")[^"]*(">)',
            lambda m: m.group(1) + TITLE + m.group(2), base, tag='og-title')
base = sub1(r'(<meta property="og:description" content=")[^"]*(">)',
            lambda m: m.group(1) + DESC + m.group(2), base, tag='og-desc')
base = sub1(r'(<meta property="og:url" content=")[^"]*(">)',
            lambda m: m.group(1) + 'https://igniteyourself.co/freudenthal' + m.group(2),
            base, tag='og-url')

# La tarjeta social heredada era la de Mark. Fuera hasta que haya una propia:
# es preferible que no salga imagen a que salga la equivocada.
for pat, tag in [(r'\s*<meta property="og:image"[^>]*>', 'og-image'),
                 (r'\s*<meta property="og:image:width"[^>]*>', 'og-w'),
                 (r'\s*<meta property="og:image:height"[^>]*>', 'og-h'),
                 (r'\s*<meta name="twitter:card"[^>]*>', 'tw'),
                 (r'\s*<link rel="icon"[^>]*>', 'icon'),
                 (r'\s*<link rel="apple-touch-icon"[^>]*>', 'touch')]:
    base = re.sub(pat, '', base, count=1)

# Icono propio: un monograma neutro, no una identidad inventada.
base = sub1(r'(<meta name="robots"[^>]*>)',
            lambda m: m.group(1) + '\n<link rel="icon" href="/freudenthal/assets/icon.svg" type="image/svg+xml">',
            base, tag='icon-new')

# --------------------------------------------------------- 4. capa de sobriedad
# Psiquiatria de trastornos alimentarios y Court of Protection tocan a pacientes
# gravemente enfermos y expedientes anonimizados por orden judicial. Nada de
# fotografia, nada de rojo de alarma: acento en tinta fria.
SOBRIA = """<style>
/* ============ Calibrado Freudenthal: sin fotografia, acento en tinta ============ */
:root{
  --red:#2E3A47;              /* el acento baja de rojo a pizarra */
  --sec:clamp(118px,17vh,206px);
}

/* ---------- barra superior permanente ---------- */
.topbar{pointer-events:auto}
.topbar .tname{pointer-events:auto}
.tnav{display:flex;gap:clamp(18px,2.8vw,42px)}
.tnav a{font-size:11px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;
  opacity:.62;padding-bottom:3px;border-bottom:1px solid transparent;
  transition:opacity .2s,border-color .2s}
.tnav a:hover{opacity:1}
.tnav a.on{opacity:1;border-bottom-color:rgba(255,255,255,.6)}
.menuchip,.menupanel{display:none}
.tbot{display:none}

/* ---------- hero sin fotografia ----------
   La foto sostenia el hero de Mark. Aqui la carga la retícula: un campo de
   tinta, una regla fina y la escala tipografica. */
.hero{background:var(--ink);min-height:clamp(620px,92svh,940px);
  justify-content:flex-end;padding-bottom:clamp(72px,11vh,132px)}
.hero::before{content:'';position:absolute;inset:0;
  background:
    radial-gradient(120% 90% at 12% 108%,rgba(46,58,71,.55),rgba(46,58,71,0) 62%),
    linear-gradient(180deg,rgba(255,255,255,.045) 0%,rgba(255,255,255,0) 30%)}
/* la regla que reemplaza al horizonte de la fotografia */
.hero::after{content:'';position:absolute;left:clamp(20px,5vw,80px);right:clamp(20px,5vw,80px);
  top:clamp(96px,13vh,150px);height:1px;background:rgba(255,255,255,.13)}
.hero .inr{padding-top:clamp(120px,16vh,190px)}
.hero .hname{white-space:normal;font-size:clamp(46px,9.4vw,138px);max-width:11ch}
.hero .hsub{max-width:24ch}
/* la nota era flex, asi que el tramo en cursiva se iba a una segunda columna.
   Vuelve a ser un parrafo normal y el punto se cuelga del margen. */
.hero .hnote{display:block;position:relative;padding-left:22px;
  max-width:52ch;font-size:clamp(14px,1.18vw,18px);line-height:1.66;
  color:rgba(255,255,255,.82)}
.hero .hnote::before{position:absolute;left:0;top:.72em;margin-top:0}
.hero .hnote .it{color:rgba(255,255,255,.58)}

/* ---------- band sin fotografia: campo de tinta ---------- */
.band .bph{display:none}
.band{background:var(--ink);color:#fff;min-height:auto;
  padding:clamp(96px,15vh,180px) 0}
.band .bin{position:relative;background:none}
.band .bin::before{content:none}
.band .bq{max-width:20ch}

/* ---------- method sin fotografia ----------
   Sin la columna de imagen, el texto se quedaba en un tercio del ancho con
   dos tercios de vacio al lado. Las filas pasan a dos columnas: titulo a la
   izquierda, descripcion a la derecha, como el resto de la pagina. */
.method .lay{grid-template-columns:1fr}
.method .ph{display:none}
.method .mintro{max-width:64ch}
.mrow{display:grid;grid-template-columns:clamp(180px,22vw,320px) minmax(0,1fr);
  gap:clamp(20px,3.5vw,56px);align-items:start}
.mrow p{max-width:62ch}
.method .mstd{margin-top:clamp(40px,5.5vh,64px)}
@media(max-width:860px){.mrow{grid-template-columns:1fr;gap:10px}}

/* ---------- escala y silencio ---------- */
.d80{font-size:clamp(36px,5.5vw,82px);letter-spacing:-.046em;line-height:.98}
.shead.rail,.shead.lft{margin-bottom:clamp(54px,8vh,90px)}
.pit .pn{font-size:clamp(22px,2.4vw,36px)}
.plede,.elede{font-size:clamp(13.5px,1.1vw,16px)}
.pathgrid{margin-top:clamp(52px,7.5vh,84px)}
.ink .phead{margin-bottom:16px}
.ptitle{color:#fff;max-width:16ch;margin-bottom:clamp(44px,6.5vh,76px)}

/* el ledger carga citas completas, no nombres sueltos: necesita respirar */
.lgrid.wide .lcell{font-size:clamp(13.5px,1.05vw,15.5px);line-height:1.6;
  letter-spacing:0;text-transform:none}

/* ---------- salidas progresivas ---------- */
.pmore{margin-top:clamp(30px,4.2vh,46px);display:flex;justify-content:flex-end}
.pmore a,.bmore{display:inline-block;font-size:11px;font-weight:500;letter-spacing:.2em;
  text-transform:uppercase;border-bottom:1px solid;padding-bottom:4px;transition:border-color .3s}
.pmore a,.bmore{color:#fff;border-color:rgba(255,255,255,.45)}
.pmore a:hover,.bmore:hover{border-color:#fff}

/* ---------- movil: botonera fija de pestanas ---------- */
@media(max-width:860px){
  .tnav{display:none}
  .topbar{mix-blend-mode:normal;background:rgba(20,22,26,.9);
    -webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);
    pointer-events:auto;flex-wrap:wrap;align-items:center;
    padding:13px 18px 0;row-gap:0}
  .topbar .u11{font-size:9.5px;letter-spacing:.12em}
  .topbar .ncta{border-bottom-color:rgba(255,255,255,.4)}
  .tbot{order:3;flex:1 1 100%;display:flex;margin-top:11px;
    border-top:1px solid rgba(255,255,255,.14)}
  .tbot a{flex:1 1 0;text-align:center;padding:11px 2px 12px;white-space:nowrap;
    font-size:9.5px;font-weight:500;letter-spacing:.13em;text-transform:uppercase;
    color:rgba(255,255,255,.6);border-bottom:2px solid transparent;
    transition:color .2s,border-color .2s}
  .tbot a.on{color:#fff;border-bottom-color:rgba(255,255,255,.75)}
  /* --phh era la altura de la franja de foto; sin foto vale cero, y hay que
     declararlo o el calc() heredado invalida el padding entero del hero */
  :root{--barh:86px;--phh:0px}
  section{scroll-margin-top:calc(var(--barh) + 12px)}
  /* sin foto, el hero solo tiene que despejar la barra */
  .hero{min-height:100svh;padding:0 0 clamp(96px,12vh,124px)}
  .hero .inr{padding-top:calc(var(--barh) + clamp(54px,9vh,86px))}
  .hero::after{top:calc(var(--barh) + clamp(26px,4vh,40px))}
  .hero .hname{font-size:clamp(42px,12.4vw,72px);max-width:none}
  .hero .hsub{max-width:20ch}
  .hero .hnote{max-width:none}
}
</style>"""

# ------------------------------------------------------------- 5. navegacion
NAV = [
    {"t": "Overview",     "h": "/freudenthal"},
    {"t": "The Practice", "h": "/freudenthal/practice"},
    {"t": "The Thinking", "h": "/freudenthal/thinking"},
    {"t": "The Record",   "h": "/freudenthal/record"},
    {"t": "Enquiry",      "h": "#inquiry"},
]
NAVHTML = ('<nav class="menupanel" id="nitems" aria-label="Site">'
           + ''.join(f'<a href="{n["h"]}">{n["t"]}</a>' for n in NAV) + '</nav>')

TNAV = [("The Practice", "/freudenthal/practice", "practice"),
        ("The Thinking", "/freudenthal/thinking", "thinking"),
        ("The Record",   "/freudenthal/record",   "record")]
TABS = [("Overview", "/freudenthal",           "home"),
        ("Practice", "/freudenthal/practice",  "practice"),
        ("Thinking", "/freudenthal/thinking",  "thinking"),
        ("Record",   "/freudenthal/record",    "record")]

def topbar_html(active):
    ON = ' class="on"'
    links = ''.join(f'<a href="{h}"{ON if k == active else ""}>{t}</a>' for t, h, k in TNAV)
    akey = active or 'home'
    tabs = ''.join(f'<a href="{h}"{ON if k == akey else ""}>{t}</a>' for t, h, k in TABS)
    return ('<div class="topbar">'
            '<a class="u11 smallcap tname" href="/freudenthal" style="color:#fff">Dr Robert Freudenthal</a>'
            f'<nav class="tnav" aria-label="Primary">{links}</nav>'
            '<a class="u11 smallcap ncta" id="ncta" href="#inquiry" style="color:#fff">Discuss a matter</a>'
            f'<nav class="tbot" aria-label="Primary">{tabs}</nav></div>')

# ---------------------------------------------------------- 6. reparto por pagina
def deep(k):
    return copy.deepcopy(S[k])

def renum(secs):
    n = 1
    for s in secs:
        if s['type'] in ('hero',):
            continue
        s['no'] = f'{n:02d}'
        n += 1
    return secs

def page(title, desc, secs):
    return {"meta": {"title": title, "description": desc},
            "logo": full['logo'], "nav": NAV, "navcta": full['navcta'],
            "sections": renum(secs)}

inq = lambda: deep('inquiry')

PAGES = {
    'home': page(
        'Dr Robert Freudenthal — Consultant Psychiatrist & Expert Witness', DESC,
        [deep('hero'), deep('proof'), deep('band-thesis'), deep('routes'), inq()]),
    'practice': page(
        'The Practice — Dr Robert Freudenthal',
        'Areas of instruction by subject matter: eating disorder psychiatry, general adult and older adult psychiatry, and medical emergencies in eating disorders.',
        [deep('practice-lede'), deep('practice-areas'), inq()]),
    'thinking': page(
        'The Thinking — Dr Robert Freudenthal',
        'Twenty years studying how psychiatric evidence is made, accepted and abandoned — and four of sixteen publications.',
        [deep('thinking-lede'), deep('thinking-work'), inq()]),
    'record': page(
        'The Record — Dr Robert Freudenthal',
        'Education, training, colleges, appointments, leadership and teaching, with the dates as stated on his own curriculum vitae.',
        [deep('record-training'), deep('record-roles'), inq()]),
}

os.makedirs(DST, exist_ok=True)
for name, data in PAGES.items():
    with open(f'{DST}/{name}.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')

# ------------------------------------------------------------- 7. derivar HTML
def derive(json_path, title, ogurl, out_dir, active):
    h = base
    h = sub1(r'<title>[^<]*</title>', f'<title>{title}</title>', h, tag='t-' + (active or 'home'))
    h = sub1(r'(<meta property="og:title" content=")[^"]*(">)',
             lambda m: m.group(1) + title + m.group(2), h, tag='ogt')
    h = sub1(r'(<meta property="og:url" content=")[^"]*(">)',
             lambda m: m.group(1) + ogurl + m.group(2), h, tag='ogu')
    h = sub1(r"fetch\('/freudenthal/[a-z-]+\.json'\)", f"fetch('{json_path}')", h, tag='fetch')
    h = sub1(r'<div class="topbar">.*?</div>', lambda m: topbar_html(active), h,
             flags=re.S, tag='topbar')
    h = sub1(r'<nav class="menupanel"[^>]*>.*?</nav>', NAVHTML, h, flags=re.S, tag='nav')
    h = sub1(r'<main id="site">.*?</main>', '<main id="site"></main>', h, flags=re.S, tag='main')
    h = sub1(r'(<meta name="robots"[^>]*>)',
             lambda m: m.group(1) + '\n<meta name="theme-color" content="#14161A">', h, tag='theme')
    h = sub1(r'</head>', SOBRIA + '\n</head>', h, tag='css')
    os.makedirs(out_dir, exist_ok=True)
    open(out_dir + '/index.html', 'w', encoding='utf-8').write(h)
    print('  ', out_dir.replace(DST, 'freudenthal') or 'freudenthal', 'ok')

derive('/freudenthal/home.json', TITLE,
       'https://igniteyourself.co/freudenthal', DST, None)
derive('/freudenthal/practice.json', 'The Practice — Dr Robert Freudenthal',
       'https://igniteyourself.co/freudenthal/practice', DST + '/practice', 'practice')
derive('/freudenthal/thinking.json', 'The Thinking — Dr Robert Freudenthal',
       'https://igniteyourself.co/freudenthal/thinking', DST + '/thinking', 'thinking')
derive('/freudenthal/record.json', 'The Record — Dr Robert Freudenthal',
       'https://igniteyourself.co/freudenthal/record', DST + '/record', 'record')
print('freudenthal listo')
