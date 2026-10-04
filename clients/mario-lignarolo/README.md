# mariolignarolo.com — V1

Plataforma personal de Mario Lignarolo. Next.js (App Router) + TypeScript + Tailwind CSS 4, lista para Vercel.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
npm run export     # out/ estático (vista previa sin servidor Node; imágenes sin optimizar)
npm run typecheck
```

## Dónde se edita

| Qué | Dónde |
| --- | --- |
| Todo el texto, enlaces y estado de borrador | `data/content.ts` |
| Artículos de Substack (mock editable) | `data/articles.ts` |
| Videos de YouTube | `data/videos.ts` |
| Testimonios (solo reales; vacío = sección oculta) | `data/testimonials.ts` |
| Paleta, tipografías, geometría del hero, motion | `app/globals.css` |
| Fotos | `public/mario/` |

Cada bloque de `content.ts` lleva su estado: **CONFIRMADO**, **HIPÓTESIS** o **CONFIRMAR** (no se publica como hecho sin aprobación de Mario).
Un enlace con `href: ""` se muestra como pendiente y no navega.

`site.draft = true` → cinta «Borrador», marcas de «Muestra» y `noindex`. Pasar a `false` al lanzar.

La marca Ignite no aparece en el sitio: es 100 % de Mario.

## Línea gráfica (del header aprobado)

- Verde-negro `#0a1615` · verde ácido `#2ee25e` (firma, con moderación) · crema `#efe9dd` · neutro `#f6f4ef` · carbón `#1b1e1c`.
- **Instrument Serif** (nombre, titulares, itálica selectiva) + **Inter Tight** (texto, navegación, etiquetas). Ambas OFL, alojadas en `app/fonts/`.
- Hero en escritorio: registrado sobre el header original de 1920×1080 (el nombre se ancla a la foto, no al viewport). En móvil se recompone: nombre → retrato → territorios → frase.
- Motion sin librerías: entrada por máscara (CSS), revelado con IntersectionObserver y efectos ligados al scroll con `animation-timeline` como mejora progresiva. Respeta `prefers-reduced-motion`.

## Assets

- `public/mario/hero.jpg`: retrato original sin texto (1672×941), mismo encuadre que el header aprobado.
- `public/og.jpg`: header aprobado recortado a 1200×630 para redes.
- Origen e imágenes de mundo: huecos marcados «Fotografía pendiente» (no se generan imágenes falsas de Mario).

## Despliegue

Proyecto propio en Vercel (como cada cliente de `operations`), con dominio `mariolignarolo.com`:

- vercel.com/new → Import `ignite-yourself-operations` → **Root Directory = `clients/mario-lignarolo`** → Deploy.
- Production Branch: `main` (la regla del repo: todo lo terminado vive en `main`).
- Cada push a `main` que toque esta carpeta redespliega solo.

Por CLI, con `VERCEL_TOKEN` en el entorno: `cd clients/mario-lignarolo && npx vercel deploy --prod --yes`.
