# Cuenta el listado testimonial publico de Bernard Pettingill para /pettingill/testimony.
#
#   curl -o cases.pdf https://bpettingill.com/wp-content/uploads/BFP-Current-Cases.pdf
#   pdftotext -layout cases.pdf cases.txt
#   python3 -I tools/count-pettingill-listing.py cases.txt
#
# Nota: bpettingill.com sirve una cadena TLS incompleta (hoja RapidSSL con
# intermedios de Sectigo). Si curl falla al verificar, descarga el intermedio
# de http://cacerts.rapidssl.com/RapidSSLTLSRSACAG1.crt, conviertelo a PEM y
# pasalo junto al bundle con --cacert. Nunca desactives la verificacion.
#
# Imprime las cifras que alimentan la seccion "tally" de pettingill/content.json.
# Cada fila empieza con una fecha tipo "Sept '17"; las lineas siguientes son
# continuacion de la misma fila. Las columnas se miden por pagina.
import sys, re, json, statistics
from collections import Counter

MON = re.compile(r"^\s{0,3}(Jan|Feb|Mar|Apr|April|May|June|Jun|July|Jul|Aug|Sept|Sep|Oct|Nov|Dec)[a-z]*\.?\s*[‘'’`]\s?(\d{2})\b")
FL = r"Florida|Flori\w*da|, FL\b|Floroida|Miami-Dade|Lee County|Palm Beach|Broward"
STATES = {'Florida': FL, 'Maryland': 'Maryland', 'Missouri': 'Missouri', 'Washington': r'Washington|Spokane',
          'Georgia': 'Georgia', 'Alabama': 'Alabama', 'Louisiana': r'Louisiana|Parish', 'Texas': 'Texas',
          'New Jersey': 'New Jersey', 'Massachusetts': 'Massachusetts', 'Arkansas': 'Arkansas',
          'Nebraska': 'Nebraska', 'California': r'California|Alameda', 'U.S. Virgin Islands': 'Virgin Islands'}
FED = r'United States District Court|U\.S\. District Court'

def groups(line):
    return [(m.start(), m.group().strip()) for m in re.finditer(r'\S+(?: {1,2}\S+)*', line)]

def parse(txt):
    rows, section, stamps = [], None, []
    for pi, pg in enumerate(txt.split('\f'), 1):
        lines = pg.split('\n')
        if 'Trial Testimony' in pg: section = 'trial'
        elif 'Deposition Testimony' in pg: section = 'deposition'
        starts = [[], [], []]
        for l in lines:
            if MON.match(l):
                g = groups(l)
                if len(g) == 4:
                    for i in range(3): starts[i].append(g[i + 1][0])
        if not starts[0]:
            continue
        cs = [statistics.median(s) for s in starts]
        col = lambda x: 'case' if x < cs[1] - 4 else 'num' if x < cs[2] - 4 else 'court'
        for l in lines:
            s = l.strip()
            if not s or 'Pettingill' in s or s.endswith('Testimony') or re.match(r'^Page \d+$', s) or s.startswith('Year'):
                continue
            if re.fullmatch(r'\d{8}', s):
                stamps.append(s); continue
            m, g = MON.match(l), groups(l)
            if m:
                r = {'section': section, 'mon': m.group(1)[:3], 'yy': int(m.group(2)), 'case': '', 'num': '', 'court': ''}
                first = g[0][1]; d = MON.match(first)
                rest = first[len(d.group(0).strip()):].strip() if d else ''
                if rest: r['case'] = rest
                for x, t in g[1:]:
                    r[col(x)] = (r[col(x)] + ' ' + t).strip()
                rows.append(r)
            elif rows:
                for x, t in g:
                    k = col(x)
                    rows[-1][k] = (rows[-1][k] + ' ' + t).strip()
    return rows, stamps

def state(r):
    blob = r['court'] + ' ' + r['num']
    hits = [k for k, p in STATES.items() if re.search(p, blob)]
    if 'U.S. Virgin Islands' in hits: return 'U.S. Virgin Islands'
    if len(hits) > 1 and 'Florida' in hits: hits.remove('Florida')
    return hits[0] if hits else None

rows, stamps = parse(open(sys.argv[1], encoding='utf-8').read())
out = {'stamps': stamps, 'entries': len(rows)}
for sec in ('deposition', 'trial'):
    rs = [r for r in rows if r['section'] == sec]
    out[sec] = {'n': len(rs), 'first': f"{rs[0]['mon']} 20{rs[0]['yy']}", 'last': f"{rs[-1]['mon']} 20{rs[-1]['yy']}",
                'years': dict(sorted(Counter(2000 + r['yy'] for r in rs).items()))}
st = Counter(state(r) for r in rows)
out['florida'] = st.pop('Florida', 0)
out['no_court'] = st.pop(None, 0)
out['outside_florida'] = sorted(st)
out['federal'] = sum(bool(re.search(FED, r['court'])) for r in rows)
print(json.dumps(out, indent=1))
