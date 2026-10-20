#!/usr/bin/env python3
# Servidor local que imita a Vercel para clients/jorge-arce (igniteyourself.co):
#   · rewrite de / → /igy-mobius (vercel.json)
#   · cleanUrls: /insights/x sirve insights/x/index.html o insights/x.html
#   · trailingSlash: false → /insights/ redirige (308) a /insights
#
#   python3 tools/serve-site.py            → http://127.0.0.1:4173
#   python3 tools/serve-site.py 8080
import http.server
import json
import os
import sys

ROOT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'clients', 'jorge-arce')
CONF = json.load(open(os.path.join(ROOT, 'vercel.json'), encoding='utf-8'))
REWRITES = {r['source']: r['destination'] for r in CONF.get('rewrites', []) if '(' not in r['source']}


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=ROOT, **kw)

    def do_GET(self):
        path, _, query = self.path.partition('?')
        if path != '/' and path.endswith('/'):
            self.send_response(308)
            self.send_header('Location', path.rstrip('/') + ('?' + query if query else ''))
            self.end_headers()
            return
        path = REWRITES.get(path, path)
        disk = os.path.join(ROOT, path.lstrip('/'))
        if os.path.isdir(disk) and os.path.exists(os.path.join(disk, 'index.html')):
            self.path = path.rstrip('/') + '/index.html'
        elif not os.path.exists(disk) and os.path.exists(disk + '.html'):
            self.path = path + '.html'
        else:
            self.path = path
        return super().do_GET()

    def log_message(self, fmt, *args):
        if '404' in (args[1] if len(args) > 1 else ''):
            super().log_message(fmt, *args)


if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 4173
    print(f'http://127.0.0.1:{port}  (raíz: {ROOT})')
    http.server.ThreadingHTTPServer(('127.0.0.1', port), Handler).serve_forever()
