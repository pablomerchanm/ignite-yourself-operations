# PRINCIPLES — v6 "Bluewire" (rework de v6-final)

## Diagnóstico que motiva estos números (Paso 1, resumen)
- Momento memorable: el ARCE gigante — **prestado de v8/Zentro y duplicado**
  (hero + finale). No hay momento propio. 
- 5 secciones seguidas con `padding:clamp(80px,12vh,150px)` idéntico y
  composición kick→display→contenido en serie.
- Display de sección 70px / body de lectura 13.5px ≈ 5:1 nominal, pero el
  hero no tiene display tipográfico (statement 24px): jerarquía invertida.
- Motion: UN reveal (.rv fade-up 16px 950ms) para todo, delays inline a mano.
- Easings: 3+ (bezier propio, .45s hover, .25s ease implícito) sin sistema.
- Hover de rows anima `padding-left` → **layout thrashing**.
- Robustez: cero — todo texto en HTML, fotos a altura fija px, statement
  en columna de 400px que rompe con titular ×2.

## Identidad propia
"Expediente quirúrgico suizo": azul eléctrico + papel técnico, reglas
hairline, numeración de plano, duotono. El momento propio: **el expediente
del proceso pinneado** (scrollytelling) + wordmark gigante UNA sola vez,
cruzando el límite hero→papel (straddle).

## Grid y espacio
- Contenido máx **1360px**; margen lateral 40px desktop / 24px tablet /
  20px mobile. Breakpoints: 1000 / 760.
- Escala de espaciado base **8px**: 8·16·24·32·48·64·96·128·**176** (=s-9).
- Padding vertical sección: denso **s-8 (128)** desktop · 96 tablet · 72
  mobile. Respiro (chapter full-bleed, banda CTA): **s-9×1.4 ≈ 248** de alto
  visual vía min-height, no padding. Relación denso:respiro ≥ 1:2 en alto
  percibido.
- Ruptura óptica: el wordmark del hero invade **-72px** (s-7 negativo) sobre
  la sección siguiente. Única ruptura de retícula de la página.

## Tipografía
- Escala **ratio 1.333** desde base 1.0625rem (17px):
  `0.60 / 0.80 / 1.0625 / 1.4165 / 1.889 / 2.518rem` + display fluido
  `clamp(2.75rem, 6.4vw, 5.5rem)` (88px → **5.2:1 vs body**) + wordmark SVG
  full-width (efectivo ~245px, 14:1).
- Line-height: display **1.0**, head 1.1, sub 1.35, body **1.6**, mono 1.5.
- Letter-spacing: display **-0.025em**, head -0.015em, body 0, eyebrow/mono
  **+0.12em**, micro +0.14em.
- Línea de lectura: 60–68ch en bio; 46–52ch en descripciones de card.

## Motion — catálogo CERRADO (5 reveals, 2 easings)
| # | Nombre | Propiedad | Distancia | Dur | Curva | Delay/Stagger |
|---|--------|-----------|-----------|-----|-------|----------------|
| R1 | rise | opacity + translateY | 20px→0 | 700ms | `cubic-bezier(0.16,1,0.3,1)` | 0, por GRUPO de sección |
| R2 | hero-stagger | opacity + translateY | 20px→0 | 700ms | idem | stagger decreciente 110→70→50ms, SOLO hero |
| R3 | rule-draw | scaleX | 0→1 | 800ms | idem | 0, hairlines de cabecera |
| R4 | img-settle | opacity + scale | 1.04→1 | 900ms | idem | 0, solo imágenes enmarcadas |
| R5 | file-scrub | progreso continuo (línea scaleY + estado de pasos + contador) | — | scrub 1.2 | mapeo lineal del progreso | pin de la sección proceso |

- **Easings totales: 2** — `--ease-out: cubic-bezier(0.16,1,0.3,1)` (reveals)
  y `--ease-quick: cubic-bezier(0.33,1,0.68,1)` (hovers 200ms). Nada más.
- Duraciones: reveals 700–900ms · hovers 200ms · nada <120ms ni >1200ms.
- Solo `transform` y `opacity`. El hover de rows pasa de `padding-left` a
  `transform: translateX(12px)` (200ms). `will-change` puntual en el pin.
- Lenis + GSAP en un solo ticker; ScrollTrigger.update en lenis scroll.
- Nunca se anima: nav, barra legal, folio del hero.

## Scrollytelling (R5)
- Sección proceso pinneada **+160% de viewport** con `scrub: 1.2`.
- Progreso →: (a) línea vertical central `scaleY 0→1`; (b) contador `01→05`;
  (c) cada paso pasa de `opacity .25 / x 12px` a `opacity 1 / x 0` en su
  quinto del progreso (mapeo continuo con `gsap.utils.mapRange`, no toggles).
- Mobile (<760): sin pin — la línea se dibuja con un trigger normal y los
  pasos entran con R1; el contador se congela en "05". Simplificado, no roto.

## Micro-interacciones
- Link/row: rest → hover `translateX(12px)` + color azul (200ms) → active
  opacity .7 → focus-visible `outline: 2px solid var(--c-blue); offset 3px`.
- Botón CTA: flecha `translateX(4px)` + fondo `--c-blue-deep` (200ms).
- Imagen: contenedor `overflow:hidden`, `scale(1.03)` 400ms ease-quick.
- Nav: transparente sobre hero → fondo `rgba(paper,.9)` + blur al pasar 90vh
  (350ms); sin hide-on-scroll (página corta).
- `prefers-reduced-motion`: clase `no-motion` — reveals visibles, pin
  desactivado con estado final (línea completa, 5 pasos activos, contador 05).

## Robustez de contenido (contrato)
- Titular hero ≤ 90 caracteres (se probó ×2: envuelve a 3 líneas y empuja,
  no rompe). Fotos: slots con `aspect-ratio` + label mono si `src` vacío.
- Expertise 3–8 filas · proceso EXACTO 5 pasos (la narrativa lo pide; el
  schema lo declara) · testimonios 2–6 · artículos 0–4 (0 = fila desaparece).
- Todo el contenido en `/v6-final/content.json` (fetch absoluto). Cambiar
  identidad = editar solo el bloque `:root` de tokens.
