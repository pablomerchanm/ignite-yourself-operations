# Template base — Personal Brand Website

Template original y reutilizable para marcas personales de profesionales
(inicialmente médicos). Implementa los **principios** medidos en
`SYSTEM-AUDIT.md` (referencia: jennakutcher.com) con identidad propia.
Un cliente nuevo se puebla **en minutos** inyectando un solo archivo de
contenido.

## Stack

- HTML + CSS + JS vanilla. **Sin frameworks, sin build step**: se sirve tal cual.
- GSAP 3.12 + ScrollTrigger + Lenis 1.1 (vendorizados en `js/vendor/`, sin CDN).
- `css/tokens.css` — todos los tokens de marca (tipo, espaciado, color, motion, radios).
- `content.json` — todo el contenido (texto + imágenes). Cero contenido en el HTML.
- Cada sección es un **partial opcional**; el orden lo define `content.json`.

## Dirección tipográfica (justificación)

**Newsreader** (serif editorial de opsz variable) + **Archivo** (grotesca) +
**IBM Plex Mono** (micro-labels): Newsreader nació para lectura editorial larga
— da la autoridad de revista médica sin el coqueteo de una display caligráfica;
Archivo aporta la precisión "clínica" en UI y botones; y reducir las 4 voces de
la referencia a 3 es la decisión de sobriedad: menos personalidad tipográfica,
más peso institucional.

## Estructura

```
template-base/
├── index.html          ← shell vacío: nav + <main id="site"> + scripts
├── content.json        ← TODO el contenido del cliente (único archivo a poblar)
├── content.schema.md   ← contrato de cada campo: largos máximos, ratios
├── css/
│   ├── tokens.css      ← ÚNICA superficie de branding (cambiar marca = solo esto)
│   └── template.css    ← estructura; no se toca por cliente
├── js/
│   ├── main.js         ← renderiza content.json + capa de motion
│   └── vendor/         ← gsap, ScrollTrigger, lenis (locales)
└── SYSTEM-AUDIT.md     ← auditoría del sistema de referencia (Fase 1)
```

> **Demo en vivo:** una copia desplegable vive en `clients/jorge-arce/base/`
> (https://ignite-yourself-operations.vercel.app/base/) con el contenido
> placeholder — útil para ver el sistema completo antes de poblar.
> La fuente de verdad es esta carpeta (`template-base/`); si editas el
> template, re-copia `index.html`, `content.json`, `css/` y `js/` a esa ruta.
> Nota: la copia desplegada usa paths absolutos `/base/...` en `index.html`
> (Vercel canonicaliza `/base/` → `/base` y los paths relativos romperían);
> `main.js` ya resuelve `content.json` desde su propia URL, sin cambios.

## Flujo de poblado en 5 pasos

1. **Copia la carpeta** `template-base/` con el nombre del cliente y sirve por
   HTTP (`python3 -m http.server 8080`) — `fetch()` no funciona desde `file://`.
2. **Puebla `content.json`** desde el brief siguiendo `content.schema.md`:
   respeta los largos máximos (el placeholder ya mide el largo esperado),
   elimina las secciones que el cliente no tiene, y ordena el array `sections`
   según la receta de ritmo (máx. 2 densas seguidas; el pico de densidad va al
   objetivo #1 de negocio del cliente).
3. **Ajusta la marca en `css/tokens.css`**: 5 roles de color
   (`--surface-a/b/c`, `--dark`, `--paper` + tinta), 3 fuentes y, si cambian,
   la línea de Google Fonts en `index.html` (única excepción fuera de tokens).
   No inventes un color de acento: el sistema es rotación de superficies y el
   CTA usa el tono vecino automáticamente.
4. **Sustituye las fotos**: cada slot placeholder imprime su label
   ("retrato vertical 3:4, ambiente clínico") — entrégalo como shot-list al
   fotógrafo; luego rellena `src` + `alt` con el ratio correcto.
5. **Verifica**: desktop 1440 y mobile 390 (breakpoint único: 768px, cada
   sección se recompone — el comportamiento por sección está documentado en el
   bloque `@media` de `template.css`); prueba `prefers-reduced-motion`
   (todo visible, sin animación) y que ninguna sección eliminada deje hueco.

## Sistema de tratamientos (rediseño — ver PRINCIPLES-JENNA.md)

Cinco tratamientos de sección que se alternan (dos consecutivas jamás repiten,
y solo `splash` y `newsletter` son centradas — nunca adyacentes):

- **T1 RAIL** — cabecera asimétrica 7/5 con hairline: paths, featured, offers, about.
- **T2 ROWS** — índice editorial numerado sin cajas: articles.
- **T3 BAND** — banda compacta (padding ×0.7): credentials.
- **T4 MONUMENT** — statement a escala 10:1 vs body, recorte deliberado: splash,
  cita líder de testimonials, wordmark del footer.
- **T5 CENTERED** — statement centrado: newsletter (única).

El ritmo vertical no es uniforme: cada sección multiplica `--space-section`
(×0.7 banda · ×1 normal · ×1.15–1.4 aire) — varianza ±30% como el referente.

## Sistema de motion (del audit, no imitación)

- **Una sola entrada**: fade + rise de 8px, 0.56s, por **grupo de sección** —
  nunca elemento a elemento.
- **Stagger solo en el hero** (0.12s), como excepción jerárquica.
- **Hairlines** se dibujan al entrar (scaleX 0→1, 0.6s): motion que refuerza
  la estructura editorial.
- **Una sola animación lenta por página**: la imagen del splash asienta de
  1.05→1 en 1.4s (espejo del crossfade de 1.5s medido en el referente).
- **Hover**: solo color/opacidad a 240ms; cero layout shift, cero zoom.
- **Lenis** da la suavidad de scroll premium; sin parallax ni scroll-jacking.
- `prefers-reduced-motion: reduce` → sin Lenis, sin reveals, contenido visible
  al instante (clase `no-motion` en `<html>`).
