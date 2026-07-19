# PRINCIPLES — v16 "HandX" (rework)

## Identidad
La Experiencia Arce: retiro serif oscuro (Cormorant + grain). EL
momento: **el libro de días** — el journey se pinnea `n·80%` y los días
crossfadean por cuartos con rail de progreso y contador "Day One…Four".

## Grid/Tipo
- Wrap 1280 / margen 40/22 / bp 900. `--sec clamp(100px,13vh,160px)`.
- Cormorant 200-400 + Inter. d97 `clamp(48,6.7vw,97)` / body 18
  (**5.4:1**); d80; interlude 68.

## Motion — catálogo CERRADO (2 easings: expo.out + quick(.33,1,.68,1) 200ms hovers; un ticker Lenis→GSAP)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, steps 90/70/55/45/40 |
| R5 | libro de días | crossfade panels + rail scaleX | — | pin+scrub 1.2 | lineal |

## Scrollytelling
Pin del journey; `f=clamp(p·n−.5)`, opacidad campana `1−d/.55`, deriva
±18px; rail fill scaleX=p, contador por round(f). Mobile/reduced: lista
apilada sin pin. FAQ: display-swap + fade (max-height prohibido).

## Robustez
days EXACTO 3-5 · method.rows 3-5 · voices 3-9 · access EXACTO 2-3 ·
faq 2-6. Fetch absoluto /v16-handx/content.json. Probado: sin faq, 3
días, titular ×2, fotos vacías → .phx.
