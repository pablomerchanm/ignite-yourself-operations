# PRINCIPLES — v17 "Everswap" (rework)

## Diagnóstico (Paso 1)
- El grade cinematográfico (verdes profundos + Cormorant thin) perdona
  todo: quita las fotos y no queda sistema. Los orbes flotan con
  `@keyframes float 18s infinite` (ambiente desacoplado); los keywords
  del hero rotan con `setInterval 2200ms` infinito; word-split custom
  con transition-delays.
- Padding 130px clónico; stats estáticos; centrados en cadena
  (hero/uni/stats/close todos centrados).
- Ratio ok: d-big 189 / body 15.5 = 12:1.
- Portabilidad cero.

## Identidad
El quirófano en penumbra verde: luz escénica, no decorado. EL momento:
**la iluminación es el sistema** — cada sección declara su `scene`
(color de fondo) en content.json y el scroll interpola continuamente
entre escenas mientras los tres orbes derivan mapeados al progreso
global. El grade deja de ser muleta estática: la página se "ilumina"
al recorrerla, con o sin fotos.

## Grid y espacio
- Contenido 1280px; margen 40/20; breakpoint 900/1080.
- Escala 8px. Tres alturas: `--sec clamp(100px,13vh,160px)` · stats
  ×0.8 · panel full-bleed 80vh con padding 0 24px. Nunca uniforme.
- Ruptura: el panel foto redondeado 24px sangra fuera del wrap (padding
  24px del viewport, no 40+wrap).

## Tipografía
- Cormorant 300 (thin display) + Instrument Sans. Escala: 12 / 13 /
  14.5 / 15.5 (base) / 16.5 / kws 28 / cell 44 / d-mid
  `clamp(52px,7.2vw,104px)` / d-big `clamp(72px,13vw,189px)` (**12:1**)
  / stat 120.
- lh: d-big 1 · body 1.6. Contraste peso: thin 300 vs sans 600.

## Motion — catálogo CERRADO (5, 2 easings)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | hero-stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out (filas journey) |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, stagger decreciente 90/70/55 |
| R5 | escena-luz | backgroundColor body + translate/scale orbes | — | scroll continuo | lerp lineal |

- Easings: expo.out + quick(.33,1,.68,1) 200ms hovers. Un ticker.
- El float infinito y el setInterval de keywords MUEREN: kws quedan
  estáticos (tríptico revelado con R2, los tres encendidos).
- Hovers: btn translateY(-2px)/active .97; vcard translateY(-5px)+
  borde; cell fondo pine 400ms quick.

## Scrollytelling (R5)
- Cada sección puede declarar `"scene":"#hex"`; al construir, se mapea
  el punto medio de cada sección al rango de scroll y un ScrollTrigger
  global (`start 0 / end max`, scrub directo) interpola RGB por tramos
  — la página atraviesa escenas de luz continuas, nunca saltos.
- Orbes: deriva global mapeada al mismo progreso — o1 baja 26vh, o2
  sube 18vh y cruza 8vw, o3 escala 1→1.28 (transform puro, blur
  estático).
- Mobile: activo (barato). Reduced/no-motion: primera escena fija,
  orbes estáticos en su posición inicial.

## Micro-interacciones
- btn rest/hover/active/focus-visible completos; ghost con fondo 6%.
- vcard hover borde+lift; cells fondo. Nav links opacity 200ms.
- prefers-reduced-motion implementado.

## Robustez (contrato)
- uni.cells EXACTO 2-3 · stats EXACTO 2-3 · voices 3-9 · journey 3-6
  filas · kws EXACTO 2-4 · ctas 1-2. Título hero ≤ 32 chars ×2
  probado. Panel sin foto → `.phx` full-bleed etiquetado (la escena
  sigue funcionando sin fotos — ese es el punto).
- Fetch absoluto `/v17-everswap/content.json`.
