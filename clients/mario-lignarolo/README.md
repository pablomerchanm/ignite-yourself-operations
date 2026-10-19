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
| «Mi historia» (`/historia`, carta en primera persona) | `data/historia.ts` |
| Paleta, tipografías, geometría del hero, motion | `app/globals.css` |
| Fotos | `public/mario/` |

Cada bloque de `content.ts` lleva su estado: **CONFIRMADO**, **HIPÓTESIS** o **CONFIRMAR** (no se publica como hecho sin aprobación de Mario).
Un enlace con `href: ""` se muestra como pendiente y no navega.

`site.draft = true` → cinta «Borrador», marcas de «Muestra» y `noindex`. Pasar a `false` al lanzar.

La marca Ignite no aparece en el sitio: es 100 % de Mario.

## Línea gráfica (19 oct 2026: joven, limpia y navegable)

Referencia de Pablo: usecadence.com. La home es una portada que lleva a cada cosa, no una página donde está todo (~8 pantallas).

- Fondo claro (`paper`), tarjetas suaves (`mist`), navegación en píldora flotante con «Empezar», chips, carruseles y el nombre gigante en el pie.
- Verde-negro `#0a1615` solo en portada, recorrido y pie; verde ácido `#2ee25e` como firma (el punto del nombre, la curva). El color sigue abierto con Mario (prefiere algo más sobrio; ver ENTREVISTA § 13).
- Azul reservado para Psico-Cibernética: el módulo `sky` y el **aura que respira** (`.aura`, inhala 4 s · exhala 4 s) con «[respira]» en el centro; al pulsar, ahí mismo se reproduce su video.
- **Inter Tight** fina + negrita para titulares (`.title`, con `<b>` para la palabra fuerte) y para el texto. **Instrument Serif** para su nombre y sus palabras (citas, la franja de ideas). Ambas OFL, en `app/fonts/`.
- Motion sin librerías: entrada por `fade-up`, revelado con IntersectionObserver, el recorrido fijado al scroll y efectos con `animation-timeline` como mejora progresiva. Respeta `prefers-reduced-motion`.

## Assets

- `public/mario/hero.jpg`: retrato original sin texto (1672×941), mismo encuadre que el header aprobado.
- `public/og.jpg`: header aprobado recortado a 1200×630 para redes.
- No se generan imágenes falsas de Mario: el aura de Psico-Cibernética es un degradado CSS, no una foto.

## Despliegue

Proyecto propio en Vercel (como cada cliente de `operations`), con dominio `mariolignarolo.com`:

- vercel.com/new → Import `ignite-yourself-operations` → **Root Directory = `clients/mario-lignarolo`** → Deploy.
- Production Branch: `main` (la regla del repo: todo lo terminado vive en `main`).
- Cada push a `main` que toque esta carpeta redespliega solo.
- Dominio conectado (19 oct 2026): principal **`www.mariolignarolo.com`**; `mariolignarolo.com` redirige a www (308). `site.url` y `public/links` usan www.
- DNS en Namecheap (*Advanced DNS*): `A @ → 76.76.21.21` y `CNAME www → cname.vercel-dns.com`. No cambiar los nameservers: el reenvío de correo de Namecheap (MX `eforward*`) sigue activo.

Por CLI, con `VERCEL_TOKEN` en el entorno: `cd clients/mario-lignarolo && npx vercel deploy --prod --yes`.
