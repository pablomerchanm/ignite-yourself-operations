# PRINCIPLES — v23 "Pacifica" (rework)

## Identidad
Case-study fílmico Kumbh Sans. EL momento: **la línea de tiempo del
montaje** — ruler de editor con playhead, ticks por corte y timecode
"FILM 0N" bajo la tira de films.

## Grid/Tipo
- Wrap 1100-1240; `--sec clamp(96px,13vh,152px)` (films ×1.15,
  results ×0.85). Hero l1/l3 `clamp(64,10.8vw,156)` / body 16 (**9.7:1**).

## Motion — catálogo CERRADO (2 easings: expo.out + quick(.33,1,.68,1) 200ms hovers; un ticker Lenis→GSAP)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, steps 90/70/55/45/40 |
| R5 | playhead | translateX px + opacidades campana por slot | — | scrub 1.2 | lineal |

## Scrollytelling
Scrub `.films top 60% / bottom 40%`; slot j se enciende con
`a=1−|p−(j+.5)/n|/(seg·.9)` (img .7+.3a, cap .55+.45a); timecode
FILM 0N. Reduced: timeline oculta.

## Robustez
films.slots 2-5 · meta 3-5 · results EXACTO 2-3 · voices 2-4 ·
credits 3-6. Fetch absoluto /v23-pacifica/content.json.
