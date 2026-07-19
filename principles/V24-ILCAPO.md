# PRINCIPLES — v24 "Il Capo" (rework)

## Identidad
Cine de producción rojo/negro. EL momento: **el dolly** — cada frame
full-bleed hace un movimiento de cámara (scale 1.14→1 + deriva ±12px)
mapeado a su travesía del viewport.

## Grid/Tipo
- In 1100; `--sec clamp(104px,14vh,168px)` variado por sección.
- close t `clamp(44,7.4vw,110)` / body 15.5 (**7:1**); ghosts SC-0N.

## Motion — catálogo CERRADO (2 easings: expo.out + quick(.33,1,.68,1) 200ms hovers; un ticker Lenis→GSAP)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, steps 90/70/55/45/40 |
| R5 | dolly | scale 1.14→1 + translateY ±12px del img | — | scrub 1.2 | lineal |

## Scrollytelling
Por frame: trigger sección `top bottom / bottom top`. Frames numerados
0N automático. Reduced: sin transform.

## Robustez
frames 2-4 · reel 4-8 (SC-0N auto) · prods 2-6 (SC-A.. auto) · stats
EXACTO 2-3. Fetch absoluto /v24-ilcapo/content.json.
