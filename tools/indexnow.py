#!/usr/bin/env python3
# Avisa a los buscadores (Bing, Yandex, Seznam, Naver…) de que hay URLs nuevas o
# cambiadas en igniteyourself.co, mediante IndexNow. Bing alimenta también la
# búsqueda de ChatGPT y Copilot. Google no usa IndexNow: para Google está
# Search Console (ver editorial/BUSCADORES.md).
#
#   python3 tools/indexnow.py                 → envía todas las URLs del sitemap
#   python3 tools/indexnow.py /insights/slug  → envía solo esas rutas
#
# Úsalo DESPUÉS de que Vercel haya publicado (el buscador visita las URLs).
# La clave es el archivo <clave>.txt de clients/jorge-arce/ (su contenido es la clave).
import glob
import json
import os
import re
import sys
import urllib.error
import urllib.request

HOST = 'igniteyourself.co'
ORIGIN = f'https://{HOST}'
ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'clients', 'jorge-arce')


def key():
    for f in glob.glob(os.path.join(ROOT, '*.txt')):
        name = os.path.basename(f)[:-4]
        if re.fullmatch(r'[0-9a-f]{32}', name) and open(f, encoding='utf-8').read().strip() == name:
            return name
    sys.exit('No encuentro el archivo de clave IndexNow (<32 hex>.txt) en clients/jorge-arce/.')


def urls(args):
    if args:
        return [a if a.startswith('http') else ORIGIN + '/' + a.lstrip('/') for a in args]
    xml = open(os.path.join(ROOT, 'sitemap.xml'), encoding='utf-8').read()
    return re.findall(r'<loc>([^<]+)</loc>', xml)


def main():
    k, todo = key(), urls(sys.argv[1:])
    body = json.dumps({'host': HOST, 'key': k, 'keyLocation': f'{ORIGIN}/{k}.txt', 'urlList': todo}).encode()
    req = urllib.request.Request('https://api.indexnow.org/indexnow', data=body,
                                 headers={'Content-Type': 'application/json; charset=utf-8'})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            code = r.status
    except urllib.error.HTTPError as e:
        code = e.code
    meaning = {200: 'aceptado', 202: 'recibido; la clave se valida después',
               400: 'petición mal formada', 403: 'clave no válida o no publicada todavía',
               422: 'alguna URL no es de este dominio', 429: 'demasiadas peticiones, prueba más tarde'}
    print(f'IndexNow {code}: {meaning.get(code, "respuesta inesperada")}')
    for u in todo:
        print('  ·', u)
    sys.exit(0 if code in (200, 202) else 1)


if __name__ == '__main__':
    main()
