# PRINCIPLES — v11 "Firma" (rework)

## Diagnóstico (Paso 1)
- Momento: el scroll horizontal entero — pero implementado con lerp custom
  (body-height hack + requestAnimationFrame propio), rotador con
  `setInterval` infinito y reveals por IntersectionObserver: TRES sistemas
  de motion desincronizados.
- Degradación mobile: el hack de altura fallaba con teclado/resize; la
  versión vertical era un dump sin reveals.
- Ratio display:body ok (hero 120/16 = 7.5:1) pero paneles interiores
  clónicos: mismo ancho, mismo padding, mismo centrado vertical.
- Easings: 4 distintos (ease, ease-out, cubic custom del lerp, linear del
  interval). Portabilidad cero: todo el copy en HTML.

## Identidad
La firma del cirujano: editorial horizontal tipo "una sola línea de vida".
EL momento: **todo el sitio ES el scrollytelling** — un pin GSAP de página
completa donde el scroll vertical se convierte en travelling horizontal,
con rotador de palabras y barra de progreso mapeados al mismo progreso.

## Grid y espacio
- Track horizontal: paneles `min-width` variable (48vw–92vw) — el ritmo
  respira por ANCHO de panel, no por padding vertical.
- Padding interno panel 64px D; gap entre paneles 8vw hero / 4vw resto.
- Breakpoint 900: bajo él, columna vertical clásica (paneles apilados,
  `--sec clamp(88px,12vh,140px)`).
- Ruptura: pstate — un panel de solo texto a 92vw con display cruzando
  el gap hacia el siguiente panel.

## Tipografía
- Ratio 1.333 base 16: 12 / 16 / 21.3 / 28.4 / 37.9 / display
  `clamp(56px,8.4vw,120px)` (**7.5:1**) · script acento italic serif.
- lh: display .96 · body 1.65. ls: display -.035em · eyebrow +.12em mono.
- Rotador: 4 palabras EXACTO 3–5; la última es el estado final
  (reduced-motion muestra esa).

## Motion — catálogo CERRADO (5, 2 easings)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | hero-stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | panel-reveal | opacity+y | 16px | 650ms | expo.out, `containerAnimation` start 'left 88%' |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, stagger decreciente 90/70/55 |
| R5 | pin-horizontal | translateX del track + progress + rotador | — | scrub 1.2 | lineal |

- Easings: expo.out + quick(.33,1,.68,1) 200ms hovers. UN ticker: Lenis →
  ScrollTrigger.update, gsap.ticker → lenis.raf, lagSmoothing(0).
- `will-change:transform` SOLO en `.track` y solo ≥901px.
- Nada anima layout: el travelling es transform puro.

## Scrollytelling (R5)
- `gsap.to(track,{x:-max})` con `pin:'#hwrap'`, `end:'+='+max`,
  `scrub:1.2`, `invalidateOnRefresh` — la distancia de scroll vertical ES
  el ancho del track.
- `onUpdate`: progress bar width = progreso; rotador
  `setWord(floor(clamp(progress*4)*n))` — mapeo continuo, no interval.
- Reveals de paneles vía `containerAnimation:hTween` (el trigger vive
  dentro del track en movimiento).
- Rail nav: click → `lenis.scrollTo(st.start + offsetLeft/maxX * (st.end-st.start))`.
- Mobile (<901px) y reduced: columna vertical con R1/R3 normales, rotador
  fijo en la última palabra, progress oculto. Degradación con gracia, no
  con hack.

## Micro-interacciones
- Rail items: rest dot → hover expande label (opacity+translateX 200ms) →
  active dot lleno → focus-visible outline 2px.
- Cards hover: translateY(-4px) 200ms quick. Imagen scale 1.03 en
  overflow hidden.
- prefers-reduced-motion: implementado — sin pin, sin rotación, todo
  visible (verificado con contexto reducedMotion).

## Robustez (contrato)
- Paneles 6–12 (array `sections`, cada uno opcional; probado sin
  pjournal). Rotador EXACTO 3–5 palabras. Stories cards 3–9 (probado 3 y
  9). Hero titlePre ≤ 70 chars probado ×2. Fotos vacías → `.phx` con
  label (4 slots probados). Track recalcula ancho (`invalidateOnRefresh`).
- Fetch absoluto `/v11-firma/content.json`.
