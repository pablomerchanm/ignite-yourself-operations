"""Analitica y aviso de visitas de igniteyourself.co.

Inserta antes de </head> un bloque marcado <!-- igy:analytics --> con:
  - Vercel Web Analytics: visitas por pagina, pais, dispositivo y origen (en el panel de Vercel).
  - /igy-visit.js, solo en los previews: el correo a Pablo cuando alguien abre uno (api/visit.js).

Es idempotente: quita el bloque viejo y pone el actual. Los build-*.py lo llaman al final; para las
paginas hechas a mano basta con correr:  python3 tools/tracking.py
"""
import os
import re
import sys

SITE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'clients', 'jorge-arce')

# previews de prospectos: analitica y aviso. El nombre que sale en el correo vive en api/visit.js
PREVIEWS = ['pettingill', 'rodriguez', 'brant', 'mark-cooke', 'kappelman', 'kappelman-gareis',
            'kappelman-getty', 'freudenthal', 'habib', 'nilsson', 'vishwanathan', 'adriana',
            'adriana-gareis', 'arce', 'hart']
# el sitio de Ignite: solo analitica
PAGES = ['igy-mobius', 'insights']

START, END = '<!-- igy:analytics -->', '<!-- /igy:analytics -->'
VA = ("<script>window.va=window.va||function(){(window.vaq=window.vaq||[]).push(arguments)};"
      "window.va('beforeSend',function(e){try{if(localStorage.getItem('igy-me'))return null}catch(_){}return e})</script>"
      '<script defer src="/_vercel/insights/script.js"></script>')
VISIT = '<script defer src="/igy-visit.js"></script>'
OLD = re.compile(re.escape(START) + r'.*?' + re.escape(END), re.S)


def inject(html, visit=True):
    html = OLD.sub('', html)
    if '</head>' not in html:
        return html
    return html.replace('</head>', START + VA + (VISIT if visit else '') + END + '</head>', 1)


def inject_tree(root, visit=None):
    """Todas las paginas de una carpeta (menos assets). visit=None: segun la lista de previews."""
    if visit is None:
        visit = os.path.basename(os.path.normpath(root)) in PREVIEWS
    changed = 0
    for d, dirs, files in os.walk(root):
        dirs[:] = [x for x in dirs if x != 'assets']
        for f in files:
            if not f.endswith('.html'):
                continue
            p = os.path.join(d, f)
            h = open(p, encoding='utf-8').read()
            n = inject(h, visit)
            if n != h:
                open(p, 'w', encoding='utf-8').write(n)
                changed += 1
    return changed


if __name__ == '__main__':
    names = sys.argv[1:] or PREVIEWS + PAGES
    for name in names:
        c = inject_tree(os.path.join(SITE, name), visit=name in PREVIEWS)
        print(f'{name}: {c} paginas actualizadas')
