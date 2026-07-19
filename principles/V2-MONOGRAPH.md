# PRINCIPLES — v2 "Monograph" (rework)

## Diagnóstico (Paso 1)
- Momento: hero name 15rem sans→serif-italic (bueno, se conserva) — pero la
  RUTA Colombia→South Bay, el germen narrativo de la página, está estática.
- 6 secciones con la misma familia de padding clamp(90–110,14–16vh,170–220)
  y la misma cabecera kick+h2 izquierda: composición clónica.
- Motion: .rv fade-up **1100ms** (al borde) + portrait **1600ms `ease`**
  (fuera de rango y curva prohibida); delays inline a mano.
- Easings contados: 4+ (bezier propio, ease, .3s default, .4s color).
- Hover de filas anima `padding-left` (layout).
- Portabilidad: cero (texto en HTML, ../img relativas).

## Identidad
Monografía clínica navy/azure. Serif itálica como voz de énfasis. El momento
narrativo: **la ruta se dibuja** — pin del "Path" donde la línea punteada
viaja de Colombia a South Bay mientras los años cuentan 00→27.

## Grid y espacio
- Contenido 1180px; margen 32px D / 20px M; breakpoints 900/760.
- Escala 8px: 8·16·24·32·48·64·96·128·192.
- Sección estándar **s-8 (128)** D · 96 T · 72 M. Manifesto = respiro
  ×1.5 (192). Stamps = banda ×0.5 (64). Relación respiro:banda = 3:1.
- Ruptura de retícula: el nombre del hero (clamp 15rem) montado sobre el
  retrato full-bleed — única.

## Tipografía
- Escala ratio 1.333 base 16px: 12 / 16 / 21.3 / 28.4 / 37.9 / 50.5 /
  display 64 (`clamp(1.9rem,4.6vw,4rem)`) / hero `clamp(4.2rem,15.5vw,15rem)`.
- Display/body: 64/15 = **4.3:1**; hero 240/15 = 16:1.
- lh: hero .86 · display 1.1 · body 1.62–1.75. ls: hero -.045em ·
  display -.025em · mono +.14em.
- Línea: bio 54ch · descripciones 44ch.

## Motion — catálogo CERRADO (5, 2 easings)
| # | | Propiedad | Dist | Dur | Curva | Stagger |
|---|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 750ms | expo.out | 0 (grupo) |
| R2 | hero-stagger | opacity+y | 18px | 750ms | expo.out | 120/80/60ms decreciente, solo hero |
| R3 | rule-draw | scaleX | 0→1 | 800ms | expo.out | índices |
| R4 | img-settle | opacity+scale | 1.03→1 | 900ms | expo.out | plates |
| R5 | route-scrub | strokeDashoffset + contador 00→27 + nodos | — | scrub 1.2 | lineal (progreso) | pin del Path |

- Easings: `expo.out` (reveals) · `cubic-bezier(.33,1,.68,1)` (hovers 200ms).
- Hover filas: `translateX(14px)`. Portrait del hero: opacity 900ms (dentro
  de rango), sin `ease` genérico.
- Nunca animado: nav, folio, footer bar.

## Scrollytelling (R5)
- Pin `.path` +120vh, scrub 1.2. Progreso: (a) la ruta SVG se dibuja
  (dashoffset continuo); (b) años 00→27 (`Math.round(p*27)`); (c) nodo
  origen entra en p<.15, destino en p>.8 (opacity/y continuos).
- Mobile: sin pin — la ruta se dibuja con trigger normal (1.1s) y el
  contador salta a 27. Reduced-motion: estado final completo.

## Micro-interacciones
- Filas: hover translateX 14px + color azure 200ms; focus-visible outline
  azure. Botones: bg→azure 200ms. Imágenes: scale 1.03 en plate hover.
- Nav: mix-blend difference se conserva (marca de la página); sin cambios
  al scroll (una página oscura continua).
- prefers-reduced-motion: todo visible, ruta dibujada, contador 27.

## Robustez (contrato content.json)
- Hero: name 2 líneas ≤ 12 caracteres c/u · notes 0–3 · manifesto ≤ 220
  caracteres (probado ×2: envuelve, no rompe).
- Expertise 3–8 · press cards 3–9 (masonry columns absorbe) · articles 0–4
  (0 = índice desaparece) · stamps EXACTO 3 (banda) · rings 2–4.
- Fotos: todas con aspect-ratio fijo por slot + label; sin foto = bloque
  con label mono. Fetch absoluto `/v2/content.json`.
