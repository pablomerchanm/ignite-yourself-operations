# PRINCIPLES — v35 "Astra Maven" (rework)

## Identidad
Vera Nova carmesí — vara de acabado. EL momento: **profundidad de
cartel** — retrato y wordmark tras él se separan en capas al salir el
hero; las dos marquesinas contrarrotan mapeadas al viewport.

## Grid/Tipo
- 6vw; `--sec clamp(110px,15vh,170px)` (voices ×0.95).
- wm `clamp(64,12.6vw,186)`; marquesinas serif 90/64.

## Motion — catálogo CERRADO (2 easings: expo.out + quick(.33,1,.68,1) 200ms hovers; un ticker Lenis→GSAP)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, steps 90/70/55/45/40 |
| R5 | cartel | ph y 0→10% vs wm 6→−4% + marquesinas ∓18% | — | scrub 1.2 | lineal |

## Scrollytelling
Hero `top top / bottom top`; marquesinas por sección `top bottom /
bottom top`, dirección por data-mq. Reduced: composición estática.

## Robustez
method EXACTO 3 · listen.eps 2-4 · marquesinas generadas del JSON.
Fetch absoluto /v35-astramaven/content.json.
