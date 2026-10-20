#!/usr/bin/env python3
# Insights — la biblioteca editorial de igniteyourself.co (/insights).
#
# El texto vive en editorial/insights/*.md (Markdown con cabecera de datos);
# este script lo compone en HTML estático dentro de clients/jorge-arce/insights/
# y mantiene al día lo que depende de la lista de artículos:
#   · la portada /insights (destacado, lista, filtros por categoría)
#   · una página por artículo (/insights/<slug>)
#   · el bloque «Insights» de la home (igy-mobius/index.html)
#   · sitemap.xml y llms.txt (entre marcadores, sin tocar lo demás)
#
# Solo biblioteca estándar de Python: `python3 tools/build-insights.py`.
# Guía de publicación: editorial/insights/README.md
import datetime as dt
import html
import json
import math
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'editorial', 'insights')
SITE = os.path.join(ROOT, 'clients', 'jorge-arce')
OUT = os.path.join(SITE, 'insights')
HOME = os.path.join(SITE, 'igy-mobius', 'index.html')
ORIGIN = 'https://igniteyourself.co'          # vercel.json: cleanUrls + sin barra final
EMAIL = 'pablo@igniteyourself.co'
FONTS = ('https://fonts.googleapis.com/css2?family=Inter+Tight:wght@500;600;700;800'
         '&family=Inter:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap')
ASSETS_V = '2'                                # súbelo si cambian insights.css/js (caché)

errors, warnings = [], []


def esc(s):
    return html.escape(s or '', quote=True)


# ─────────────────────────────────────────────── cabecera de datos (front matter)
def parse_front(text, path):
    if not text.startswith('---'):
        errors.append(f'{path}: falta la cabecera --- al principio')
        return {}, text
    end = text.find('\n---', 3)
    head, body = text[3:end], text[end + 4:]
    data, key = {}, None
    for raw in head.split('\n'):
        line = raw.rstrip()
        if not line.strip() or line.lstrip().startswith('#'):
            continue
        m = re.match(r'^\s+-\s+(.*)$', line)
        if m and key:
            data.setdefault(key, [])
            if not isinstance(data[key], list):
                data[key] = []
            data[key].append(unquote(m.group(1)))
            continue
        m = re.match(r'^([A-Za-z_][\w-]*):\s*(.*)$', line)
        if not m:
            errors.append(f'{path}: no entiendo esta línea de la cabecera: {line!r}')
            continue
        key, val = m.group(1), m.group(2).strip()
        data[key] = [] if val == '' else unquote(val)
    for k, v in list(data.items()):
        if v in ('true', 'false'):
            data[k] = v == 'true'
    return data, body.lstrip('\n')


def unquote(v):
    v = v.strip()
    if len(v) >= 2 and v[0] == v[-1] and v[0] in '"\'':
        return v[1:-1]
    return v


# ─────────────────────────────────────────────── Markdown (subconjunto acotado)
# Admite: ## / ### títulos, párrafos, **negrita**, *cursiva*, `código`, [enlaces](url),
# listas con - o 1., listas de comprobación - [ ], tablas con |, citas >, --- y
# bloques «::: panel Etiqueta … :::» (recuadros). Ver README para ejemplos.
def slugify(s):
    s = re.sub(r'<[^>]+>', '', s)
    s = html.unescape(s).lower()
    s = re.sub(r'[‘’“”"\'`*]', '', s)
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return s.strip('-')


def inline(s):
    s = esc(s)
    s = re.sub(r'`([^`]+)`', r'<code>\1</code>', s)

    def link(m):
        text, href = m.group(1), html.unescape(m.group(2)).strip()
        ext = href.startswith('http') and not href.startswith(ORIGIN)
        attrs = ' target="_blank" rel="noopener"' if ext else ''
        return f'<a href="{esc(href)}"{attrs}>{text}</a>'
    s = re.sub(r'\[([^\]]+)\]\(([^)\s]+)\)', link, s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', s)
    s = re.sub(r'(?<![\w*])\*(?!\s)(.+?)(?<!\s)\*(?![\w*])', r'<em>\1</em>', s)
    return s


BLOCK_START = re.compile(r'^(#{2,3} |:::|\||> |\s*[-*] |\s*\d+\. |-{3,}\s*$)')


def render(lines, toc):
    out, i = [], 0
    while i < len(lines):
        line = lines[i]
        if not line.strip():
            i += 1
            continue
        m = re.match(r'^:::\s*(\w+)\s*(.*)$', line)
        if m:                                           # recuadro
            j, buf = i + 1, []
            while j < len(lines) and lines[j].strip() != ':::':
                buf.append(lines[j])
                j += 1
            if j >= len(lines):
                errors.append('un bloque ::: no tiene su ::: de cierre')
            label = f'<p class="panel__label">{inline(m.group(2))}</p>' if m.group(2) else ''
            out.append(f'<aside class="panel panel--{esc(m.group(1))}">{label}{render(buf, toc)}</aside>')
            i = j + 1
            continue
        m = re.match(r'^(#{2,3}) (.+)$', line)
        if m:
            level, text = len(m.group(1)), m.group(2).strip()
            hid = slugify(text)
            if level == 2:
                toc.append((hid, re.sub(r'<[^>]+>', '', inline(text))))
            out.append(f'<h{level} id="{hid}">{inline(text)}</h{level}>')
            i += 1
            continue
        if re.match(r'^-{3,}\s*$', line):
            out.append('<hr>')
            i += 1
            continue
        if line.lstrip().startswith('|'):               # tabla
            rows = []
            while i < len(lines) and lines[i].lstrip().startswith('|'):
                rows.append([c.strip() for c in lines[i].strip().strip('|').split('|')])
                i += 1
            head = rows[0]
            body = [r for r in rows[1:] if not all(re.match(r'^:?-{2,}:?$', c) for c in r)]
            th = ''.join(f'<th scope="col">{inline(c)}</th>' for c in head)
            labels = [re.sub(r'<[^>]+>', '', inline(c)) for c in head]
            tb = ''.join('<tr>' + ''.join(f'<td data-label="{labels[k] if k < len(labels) else ""}">{inline(c)}</td>'
                                          for k, c in enumerate(r)) + '</tr>' for r in body)
            out.append(f'<div class="table" role="region" aria-label="{esc(" / ".join(head))}" tabindex="0">'
                       f'<table><thead><tr>{th}</tr></thead><tbody>{tb}</tbody></table></div>')
            continue
        if line.startswith('> '):
            buf = []
            while i < len(lines) and lines[i].startswith('> '):
                buf.append(lines[i][2:])
                i += 1
            out.append(f'<blockquote><p>{inline(" ".join(buf))}</p></blockquote>')
            continue
        if re.match(r'^\s*[-*] ', line):                # lista
            items = []
            while i < len(lines) and re.match(r'^\s*[-*] ', lines[i]):
                items.append(re.sub(r'^\s*[-*] ', '', lines[i]))
                i += 1
            if all(re.match(r'^\[[ xX]\] ', it) for it in items):
                lis = ''.join(f'<li><span class="box{" is-on" if it[1] in "xX" else ""}" aria-hidden="true"></span>'
                              f'{inline(it[4:])}</li>' for it in items)
                out.append(f'<ul class="checklist">{lis}</ul>')
            else:
                out.append('<ul>' + ''.join(f'<li>{inline(it)}</li>' for it in items) + '</ul>')
            continue
        if re.match(r'^\s*\d+\. ', line):
            items = []
            while i < len(lines) and re.match(r'^\s*\d+\. ', lines[i]):
                items.append(re.sub(r'^\s*\d+\. ', '', lines[i]))
                i += 1
            out.append('<ol>' + ''.join(f'<li>{inline(it)}</li>' for it in items) + '</ol>')
            continue
        buf = [line.strip()]                            # párrafo
        i += 1
        while i < len(lines) and lines[i].strip() and not BLOCK_START.match(lines[i]):
            buf.append(lines[i].strip())
            i += 1
        out.append(f'<p>{inline(" ".join(buf))}</p>')
    return '\n'.join(out)


# ─────────────────────────────────────────────── artículos
def load_posts():
    posts = []
    for name in sorted(os.listdir(SRC)):
        if not name.endswith('.md') or name.startswith('_') or name.upper() == 'README.MD':
            continue
        path = os.path.join(SRC, name)
        meta, body = parse_front(open(path, encoding='utf-8').read(), name)
        for k in ('title', 'seo_title', 'description', 'slug', 'category', 'author', 'date'):
            if not meta.get(k):
                errors.append(f'{name}: falta «{k}» en la cabecera')
        slug = meta.get('slug', '')
        if slug and slug + '.md' != name:
            errors.append(f'{name}: el slug «{slug}» debe coincidir con el nombre del archivo')
        if slug and not re.match(r'^[a-z0-9]+(-[a-z0-9]+)*$', slug):
            errors.append(f'{name}: el slug solo admite minúsculas, números y guiones')
        for k in ('date', 'updated'):
            if meta.get(k):
                try:
                    dt.date.fromisoformat(meta[k])
                except ValueError:
                    errors.append(f'{name}: «{k}» debe ser AAAA-MM-DD (lleva {meta[k]!r})')
        if len(meta.get('description', '')) > 165:
            warnings.append(f'{name}: la description pasa de 165 caracteres; Google la recortará')
        if len(meta.get('seo_title', '')) > 80:
            warnings.append(f'{name}: el seo_title pasa de 80 caracteres')
        meta['draft'] = bool(meta.get('draft'))
        meta['related'] = meta.get('related') or []
        meta['references'] = meta.get('references') or []
        toc = []
        meta['html'] = render(body.split('\n'), toc)
        meta['toc'] = toc
        words = len(re.sub(r'<[^>]+>', ' ', meta['html']).split())
        meta['minutes'] = max(1, math.ceil(words / 230))
        meta['url'] = f'{ORIGIN}/insights/{slug}'
        meta['path'] = f'/insights/{slug}'
        meta['file'] = name
        if body.lstrip().startswith('# '):
            errors.append(f'{name}: el cuerpo no lleva «# Título»: el H1 sale de «title»')
        posts.append(meta)
    slugs = [p['slug'] for p in posts]
    for s in set(slugs):
        if slugs.count(s) > 1:
            errors.append(f'slug repetido: {s}')
    # más reciente primero; a igual fecha, el destacado y luego por título
    posts.sort(key=lambda p: p.get('title', ''))
    posts.sort(key=lambda p: (p.get('date', ''), bool(p.get('featured'))), reverse=True)
    return posts


def human_date(iso):
    d = dt.date.fromisoformat(iso)
    return f'{d.strftime("%B")} {d.day}, {d.year}'


def og_image(slug=None):
    own = slug and os.path.exists(os.path.join(OUT, slug, 'og.jpg'))
    return f'{ORIGIN}/insights/{slug}/og.jpg' if own else f'{ORIGIN}/insights/og.jpg'


# ─────────────────────────────────────────────── piezas compartidas
NAV_LINKS = [('/#platform', 'The Platform'), ('/#how-it-works', 'How It Works'),
             ('/#investment', 'Investment'), ('/#about', 'About'), ('/insights', 'Insights')]


def nav(light=True):
    links = ''.join(f'<a class="nlink{" is-here" if h == "/insights" else ""}" href="{h}">{t}</a>' for h, t in NAV_LINKS)
    mob = ''.join(f'<a href="{h}">{t}</a>' for h, t in NAV_LINKS)
    return f'''<a class="skip" href="#content">Skip to content</a>
<nav id="nav" class="{"onlight" if light else ""}" aria-label="Main"><div class="navin">
  <a class="nbrand" href="/" aria-label="Ignite Yourself home"><img src="/igy/assets/logo-igy.png" alt="Ignite Yourself" width="24" height="18"></a>
  <div class="navr">
    {links}
    <a class="ncta" href="/#platform">The Authority Platform</a>
    <button class="nburger" id="nburger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="nmenu"><span></span><span></span><span></span></button>
  </div>
</div></nav>
<div class="nmenu-mobile" id="nmenu">{mob}<a class="ncta" href="/#platform">The Authority Platform</a></div>'''


FOOTER = f'''<footer class="footer"><div class="wrap">
  <div class="top">
    <div>
      <img class="flogo" src="/igy/assets/logo-igy.png" alt="Ignite Yourself" width="35" height="26">
      <p class="fstate">Turn the authority you have earned into an asset you can use.</p>
      <div class="fmeta">
        <div>The Authority Platform</div>
        <div>Built remotely · Working worldwide</div>
        <a href="mailto:{EMAIL}">{EMAIL}</a>
      </div>
    </div>
    <nav class="flinks" aria-label="Footer">
      <a href="/#platform">The Platform</a>
      <a href="/#who-its-for">Who It&rsquo;s For</a>
      <a href="/#how-it-works">How It Works</a>
      <a href="/#investment">Investment</a>
      <a href="/#about">About</a>
      <a href="/insights">Insights</a>
      <a href="/#contact">Contact</a>
    </nav>
  </div>
  <div class="bottom"><span>Ignite Yourself</span><span>The Authority Platform</span></div>
</div></footer>'''


def head(title, desc, canonical, og, og_type='website', extra='', robots='index, follow', ld=None):
    ld_tag = (f'<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False, indent=1)}</script>'
              if ld else '')
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="robots" content="{robots}">
<link rel="canonical" href="{canonical}">
<meta property="og:type" content="{og_type}">
<meta property="og:site_name" content="Ignite Yourself">
<meta property="og:url" content="{canonical}">
<meta property="og:title" content="{esc(title.replace(" | Ignite Yourself", ""))}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:image" content="{og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_US">
{extra}<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{esc(title.replace(" | Ignite Yourself", ""))}">
<meta name="twitter:description" content="{esc(desc)}">
<meta name="twitter:image" content="{og}">
<link rel="icon" href="/igy/assets/spark.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="{FONTS}" rel="stylesheet">
<link rel="stylesheet" href="/insights/assets/insights.css?v={ASSETS_V}">
{ld_tag}
</head>'''


ORG = {'@type': 'Organization', '@id': f'{ORIGIN}/#organization', 'name': 'Ignite Yourself',
       'url': f'{ORIGIN}/', 'logo': f'{ORIGIN}/igy/assets/logo-stacked.png', 'email': EMAIL}


def author_ld(p):
    if p.get('author_type') == 'Person':
        a = {'@type': 'Person', 'name': p['author']}
        if p.get('author_role'):
            a['jobTitle'] = p['author_role']
        if p.get('author_url'):
            a['url'] = p['author_url']
        return a
    return {'@id': f'{ORIGIN}/#organization'} if p['author'] == 'Ignite Yourself' else {'@type': 'Organization', 'name': p['author']}


def byline(p):
    who = esc(p['author']) + (f', {esc(p["author_role"])}' if p.get('author_role') else '')
    upd = (f' · Updated <time datetime="{p["updated"]}">{human_date(p["updated"])}</time>'
           if p.get('updated') and p['updated'] != p['date'] else '')
    return (f'<span>By {who}</span><span><time datetime="{p["date"]}">{human_date(p["date"])}</time>{upd}</span>'
            f'<span>{p["minutes"]} min read</span>')


def spark(cls='lspark'):
    return f'<img class="{cls}" src="/igy/assets/spark.png" alt="" width="15" height="15">'


# ─────────────────────────────────────────────── página de artículo
def article_page(p, by_slug):
    related = [by_slug[s] for s in p['related'] if s in by_slug and not by_slug[s]['draft']]
    for s in p['related']:
        if s not in by_slug:
            errors.append(f'{p["file"]}: «related» apunta a un artículo que no existe: {s}')
    toc = ''.join(f'<li><a href="#{h}">{t}</a></li>' for h, t in p['toc'])
    refs = ''
    if p['references']:
        items = []
        for r in p['references']:
            if '|' not in r:
                errors.append(f'{p["file"]}: cada referencia va como «Título | https://…»')
                continue
            t, u = [x.strip() for x in r.rsplit('|', 1)]
            items.append(f'<li><a href="{esc(u)}" target="_blank" rel="noopener">{esc(t)}</a></li>')
        refs = f'<section class="refs" aria-labelledby="refs-t"><h2 id="refs-t">Sources</h2><ol>{"".join(items)}</ol></section>'
    note = f'<p class="note">{inline(p["note"])}</p>' if p.get('note') else ''
    rel = ''.join(f'''<li><a href="{r["path"]}"><span class="cat">{esc(r["category"])}</span>
      <span class="t">{esc(r["title"])}</span><span class="m">{r["minutes"]} min read <span aria-hidden="true">→</span></span></a></li>'''
                  for r in related)
    cta_lead = f'<p>{inline(p["cta_lead"])}</p>' if p.get('cta_lead') else ''
    cta = f'''<aside class="cta" aria-label="About the Authority Platform">
      <p class="eyebrow">{spark()}The Authority Platform</p>
      {cta_lead}<p class="cta__ask">{inline(p.get("cta_text", ""))}</p>
      <div class="cta__acts">
        <a class="btn btn--dark" href="/#platform">How the Authority Platform works</a>
        <a class="tlink" href="/#contact">Contact Ignite Yourself <span aria-hidden="true">→</span></a>
      </div>
    </aside>'''
    draft_bar = '<p class="draftbar">Draft — not listed, not indexed</p>' if p['draft'] else ''
    ld = {'@context': 'https://schema.org', '@graph': [
        {'@type': 'Article', '@id': p['url'] + '#article', 'headline': p['title'],
         'description': p['description'], 'datePublished': p['date'],
         'dateModified': p.get('updated') or p['date'], 'author': author_ld(p),
         'publisher': {'@id': f'{ORIGIN}/#organization'}, 'mainEntityOfPage': p['url'],
         'image': og_image(p['slug']), 'articleSection': p['category'], 'inLanguage': 'en',
         'wordCount': len(re.sub(r'<[^>]+>', ' ', p['html']).split()),
         'isPartOf': {'@id': f'{ORIGIN}/insights#collection'}},
        {'@type': 'BreadcrumbList', 'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Ignite Yourself', 'item': f'{ORIGIN}/'},
            {'@type': 'ListItem', 'position': 2, 'name': 'Insights', 'item': f'{ORIGIN}/insights'},
            {'@type': 'ListItem', 'position': 3, 'name': p['title'], 'item': p['url']}]},
        ORG]}
    extra = (f'<meta property="article:published_time" content="{p["date"]}">\n'
             f'<meta property="article:modified_time" content="{p.get("updated") or p["date"]}">\n'
             f'<meta property="article:section" content="{esc(p["category"])}">\n')
    robots = 'noindex, nofollow' if p['draft'] else 'index, follow, max-image-preview:large'
    return head(p['seo_title'], p['description'], p['url'], og_image(p['slug']), 'article', extra, robots, ld) + f'''
<body class="is-article">
{nav(True)}
{draft_bar}
<main id="content">
  <article class="post">
    <header class="post__head wrapa">
      <nav class="crumbs" aria-label="Breadcrumb"><ol><li><a href="/insights">Insights</a></li><li><a href="/insights#c-{slugify(p["category"])}">{esc(p["category"])}</a></li></ol></nav>
      <h1>{esc(p["title"])}</h1>
      <p class="dek">{inline(p.get("dek") or p["description"])}</p>
      <p class="byline">{byline(p)}</p>
      {note}
      <details class="toc-m"><summary>In this article</summary><ol>{toc}</ol></details>
    </header>
    <div class="post__grid wrapa">
      <div class="prose">
{p["html"]}
        {refs}
        {cta}
      </div>
      <aside class="rail" aria-label="In this article">
        <div class="rail__in">
          <p class="rail__t">In this article</p>
          <ol class="toc">{toc}</ol>
          <a class="rail__back" href="/insights"><span aria-hidden="true">←</span> All Insights</a>
        </div>
      </aside>
    </div>
  </article>
  <section class="more wrapa" aria-labelledby="more-t">
    <div class="more__h"><h2 id="more-t">Keep reading</h2><a class="tlink" href="/insights">All Insights <span aria-hidden="true">→</span></a></div>
    <ul class="more__l">{rel}</ul>
  </section>
</main>
{FOOTER}
<script src="/insights/assets/insights.js?v={ASSETS_V}" defer></script>
</body>
</html>
'''


# ─────────────────────────────────────────────── portada /insights
def index_page(posts, cfg):
    live = [p for p in posts if not p['draft']]
    cats = cfg.get('categories') or []
    for p in live:
        if p['category'] not in cats:
            errors.append(f'{p["file"]}: la categoría «{p["category"]}» no está en editorial/insights/_index.md')
    featured = next((p for p in live if p.get('featured')), live[0] if live else None)
    count = {c: sum(1 for p in live if p['category'] == c) for c in cats}
    chips = (f'<button type="button" class="chip" data-filter="all" aria-pressed="true">All <span>{len(live)}</span></button>'
             + ''.join(f'<button type="button" class="chip" id="c-{slugify(c)}" data-filter="{slugify(c)}" aria-pressed="false">'
                       f'{esc(c)} <span>{count[c]}</span></button>' for c in cats if count[c]))
    feat = ''
    if featured:
        cover = esc(featured.get('cover_line') or featured['title'])
        feat = f'''<section class="feat wrap" aria-labelledby="feat-t" data-cat="{slugify(featured["category"])}">
    <p class="eyebrow">{spark()}Featured guide</p>
    <article class="feat__card">
      <div class="feat__txt">
        <p class="cat">{esc(featured["category"])}</p>
        <h2 id="feat-t"><a class="stretch" href="{featured["path"]}">{esc(featured["title"])}</a></h2>
        <p class="dek">{inline(featured.get("dek") or featured["description"])}</p>
        <p class="byline">{byline(featured)}</p>
        <span class="btn btn--dark" aria-hidden="true">Read the guide</span>
      </div>
      <div class="feat__cover" aria-hidden="true">
        <img class="feat__spark" src="/igy/assets/spark.png" alt="" width="56" height="57">
        <p class="feat__line">&ldquo;{cover}&rdquo;</p>
        <p class="feat__src">From the guide · {featured["minutes"]} min read</p>
      </div>
    </article>
  </section>'''
    rows = ''.join(f'''<li class="row" data-cat="{slugify(p["category"])}">
      <span class="n">{i:02d}</span>
      <div class="row__b">
        <p class="cat">{esc(p["category"])}</p>
        <h3><a class="stretch" href="{p["path"]}">{esc(p["title"])}</a></h3>
        <p class="dek">{inline(p.get("dek") or p["description"])}</p>
      </div>
      <p class="row__m"><time datetime="{p["date"]}">{human_date(p["date"])}</time><span>{p["minutes"]} min read</span><span class="arr" aria-hidden="true">→</span></p>
    </li>''' for i, p in enumerate(live, 1))
    url = f'{ORIGIN}/insights'
    ld = {'@context': 'https://schema.org', '@graph': [
        {'@type': 'CollectionPage', '@id': url + '#collection', 'url': url, 'name': f'{cfg["eyebrow"]}: {cfg["title"]}',
         'description': cfg['meta_description'], 'inLanguage': 'en', 'publisher': {'@id': f'{ORIGIN}/#organization'},
         'mainEntity': {'@type': 'ItemList', 'itemListElement': [
             {'@type': 'ListItem', 'position': i, 'url': p['url'], 'name': p['title']} for i, p in enumerate(live, 1)]}},
        {'@type': 'BreadcrumbList', 'itemListElement': [
            {'@type': 'ListItem', 'position': 1, 'name': 'Ignite Yourself', 'item': f'{ORIGIN}/'},
            {'@type': 'ListItem', 'position': 2, 'name': 'Insights', 'item': url}]},
        ORG]}
    title_html = esc(cfg['title']).rsplit(' ', 1)
    h1 = f'{title_html[0]} <span class="og">{title_html[1]}.</span>' if len(title_html) == 2 else esc(cfg['title'])
    return head(cfg['seo_title'], cfg['meta_description'], url, og_image(), 'website', '', 'index, follow, max-image-preview:large', ld) + f'''
<body class="is-index">
{nav(False)}
<main id="content">
  <header class="mast">
    <div class="wrap">
      <p class="eyebrow">{spark()}{esc(cfg["eyebrow"])}</p>
      <h1>{h1}</h1>
      <p class="mast__sub">{esc(cfg["subtitle"])}</p>
      <p class="mast__desc">{esc(cfg["description"])}</p>
    </div>
  </header>
  <div class="filters wrap" role="group" aria-label="Filter by topic" hidden>{chips}</div>
  {feat}
  <section class="list wrap" aria-labelledby="list-t">
    <div class="list__h"><h2 id="list-t">All articles</h2><p>{len(live)} {"guide" if len(live) == 1 else "guides"} · New articles weekly</p></div>
    <ol class="rows">{rows}</ol>
    <p class="empty" hidden>No articles in this topic yet.</p>
  </section>
  <section class="tool" aria-labelledby="tool-t">
    <div class="wrap tool__in">
      <p class="eyebrow">{spark()}Start here</p>
      <h2 id="tool-t">{esc(cfg["tool_title"])}</h2>
      <p>{esc(cfg["tool_text"])}</p>
      <a class="btn btn--dark" href="{esc(cfg["tool_link"])}">{esc(cfg["tool_cta"])}</a>
    </div>
  </section>
  <section class="about" aria-labelledby="about-t">
    <div class="wrap about__in">
      <p class="eyebrow">{spark()}About these articles</p>
      <h2 id="about-t">{esc(cfg["about_title"])}</h2>
      <p>{esc(cfg["about_text"])}</p>
      <div class="about__acts">
        <a class="btn btn--o" href="/#platform">How the Authority Platform works</a>
        <a class="tlink tlink--light" href="mailto:{EMAIL}">{EMAIL}</a>
      </div>
    </div>
  </section>
</main>
{FOOTER}
<script src="/insights/assets/insights.js?v={ASSETS_V}" defer></script>
</body>
</html>
'''


# ─────────────────────────────────────────────── bloques en archivos existentes
def splice(path, start, end, content):
    text = open(path, encoding='utf-8').read()
    a, b = text.find(start), text.find(end)
    if a < 0 or b < 0 or b < a:
        errors.append(f'{os.path.relpath(path, ROOT)}: faltan los marcadores {start} … {end}')
        return
    new = text[:a + len(start)] + content + text[b:]
    if new != text:
        open(path, 'w', encoding='utf-8').write(new)


def home_block(live):
    items = ''.join(f'''
      <li><a href="{p["path"]}"><span class="ik">{esc(p["category"])}</span><span class="it">{esc(p["title"])}</span><span class="im">{p["minutes"]} min read <span aria-hidden="true">→</span></span></a></li>'''
                    for p in live[:3])
    return f'''
  <section class="insights-strip" aria-labelledby="insights-strip-t"><div class="wrap">
    <div class="ish">
      <div class="eyebrow"><img class="lspark" src="/igy/assets/spark.png" alt="">Insights · The Authority Gap</div>
      <h2 id="insights-strip-t">Not ready to talk yet? <span class="og">Start with the thinking.</span></h2>
      <a class="islink" href="/insights">All Insights <span aria-hidden="true">→</span></a>
    </div>
    <ul class="isl">{items}
    </ul>
  </div></section>
  '''


def sitemap_block(live):
    newest = max([p.get('updated') or p['date'] for p in live] or [dt.date.today().isoformat()])
    entries = [(f'{ORIGIN}/insights', newest, 'weekly', '0.8')]
    entries += [(p['url'], p.get('updated') or p['date'], 'monthly', '0.7') for p in live]
    return '\n' + ''.join(f'''  <url>
    <loc>{u}</loc>
    <lastmod>{m}</lastmod>
    <changefreq>{c}</changefreq>
    <priority>{pr}</priority>
  </url>
''' for u, m, c, pr in entries) + '  '


def llms_block(live):
    lines = [f'- [Insights: The Authority Gap]({ORIGIN}/insights): practical guides for established professionals '
             'on independent consulting, professional credibility, and owned professional presence.']
    lines += [f'- [{p["title"]}]({p["url"]}): {p["description"]}' for p in live]
    return '\n' + '\n'.join(lines) + '\n'


def main():
    cfg, _ = parse_front(open(os.path.join(SRC, '_index.md'), encoding='utf-8').read(), '_index.md')
    posts = load_posts()
    by_slug = {p['slug']: p for p in posts}
    live = [p for p in posts if not p['draft']]
    pages = {os.path.join(OUT, 'index.html'): index_page(posts, cfg)}
    for p in posts:
        pages[os.path.join(OUT, p['slug'], 'index.html')] = article_page(p, by_slug)

    # enlaces internos: que todo /insights/… y /#ancla de la home exista
    home_ids = set(re.findall(r'id="([^"]+)"', open(HOME, encoding='utf-8').read()))
    known = {'/insights'} | {p['path'] for p in posts}
    for path, page in pages.items():
        own_ids = set(re.findall(r'id="([^"]+)"', page))
        for href in re.findall(r'href="(/[^"]*)"', page):
            base, _, frag = href.partition('#')
            if base.startswith('/insights/assets') or base.startswith('/igy/'):
                continue
            if base in ('', '/'):
                if frag and frag not in home_ids:
                    errors.append(f'{os.path.relpath(path, SITE)}: el ancla /#{frag} no existe en la home')
            elif base.startswith('/insights'):
                if base not in known:
                    errors.append(f'{os.path.relpath(path, SITE)}: enlace roto {href}')
                elif frag:
                    target_path = (os.path.join(OUT, 'index.html') if base == '/insights'
                                   else os.path.join(OUT, base[len('/insights/'):], 'index.html'))
                    if frag not in set(re.findall(r'id="([^"]+)"', pages.get(target_path, ''))):
                        errors.append(f'{os.path.relpath(path, SITE)}: el ancla {href} no existe')
        dupes = [i for i in own_ids if page.count(f'id="{i}"') > 1]
        if dupes:
            errors.append(f'{os.path.relpath(path, SITE)}: ids repetidos {dupes}')
        if page.count('<h1') != 1:
            errors.append(f'{os.path.relpath(path, SITE)}: debe haber exactamente un <h1>')

    if errors:
        print('No se publicó nada. Corrige esto primero:\n  · ' + '\n  · '.join(errors))
        sys.exit(1)

    keep = {os.path.join(OUT, p['slug']) for p in posts} | {os.path.join(OUT, 'assets')}
    for name in os.listdir(OUT) if os.path.isdir(OUT) else []:
        full = os.path.join(OUT, name)
        if os.path.isdir(full) and full not in keep:
            warnings.append(f'insights/{name}/ ya no tiene artículo fuente; bórrala a mano si sobra')
    for path, page in pages.items():
        os.makedirs(os.path.dirname(path), exist_ok=True)
        open(path, 'w', encoding='utf-8').write(page)
    splice(HOME, '<!-- insights:latest:start -->', '<!-- insights:latest:end -->', home_block(live))
    splice(os.path.join(SITE, 'sitemap.xml'), '<!-- insights:start -->', '<!-- insights:end -->', sitemap_block(live))
    splice(os.path.join(SITE, 'llms.txt'), '<!-- insights:start -->', '<!-- insights:end -->', llms_block(live))
    if errors:
        print('Errores:\n  · ' + '\n  · '.join(errors))
        sys.exit(1)

    print(f'Insights: {len(live)} publicados, {len(posts) - len(live)} en borrador')
    for p in posts:
        flag = 'BORRADOR' if p['draft'] else 'publicado'
        print(f'  {p["date"]}  {flag:9}  {p["path"]}  ({p["minutes"]} min)')
    if warnings:
        print('Avisos:\n  · ' + '\n  · '.join(warnings))
    ext = sorted({h for p in posts for h in re.findall(r'href="(https?://[^"]+)"', p['html'])}
                 | {r.rsplit('|', 1)[1].strip() for p in posts for r in p['references'] if '|' in r})
    if ext:
        print('Enlaces externos (compruébalos antes de publicar):\n  · ' + '\n  · '.join(ext))


if __name__ == '__main__':
    main()
