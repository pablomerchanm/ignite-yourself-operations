# PRINCIPLES — v28 "Tuesday" (rework)

## Identidad
Marlow marketing co., pasteles coral/violeta. EL momento: **nada llega
recto** — filas y pasos entran rotados ±4° alternando y se enderezan
con el scrub.

## Grid/Tipo
- 5vw laterales; `--sec clamp(96px,13vh,152px)` (split ×0.9, vip ×1.15).
- state h2 `clamp(38,6vw,92)` / body 14.5 (**6.3:1**); wm hero 110%.

## Motion — catálogo CERRADO (2 easings: expo.out + quick(.33,1,.68,1) 200ms hovers; un ticker Lenis→GSAP)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, steps 90/70/55/45/40 |
| R5 | tilt-settle | rotate dir·4°·(1−k) + y 26·(1−k) | — | scrub 1.2 | lineal |

## Scrollytelling
Por elemento [data-tilt] `top 96% / top 55%`, opacidad min(1,k·1.6).
Hover de filas: translateX(12px) del título (padding-left prohibido).
Reduced: sin transform.

## Robustez
svc.rows 3-6 · vip.steps EXACTO 3 · nav 3-6. Fetch absoluto
/v28-tuesday/content.json.
