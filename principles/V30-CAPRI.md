# PRINCIPLES — v30 "Capri" (rework)

## Identidad
Azure & Co., azul marino con script. EL momento: **la marea
tipográfica** — el script del hero ondea letra a letra
(sin(p·2π+i·.55)·6px, amplitud decreciente al salir).

## Grid/Tipo
- 4-6vw; `--sec clamp(110px,15vh,170px)` (quote ×0.9, guide ×1.1).
- hero h1 `clamp(56,10.4vw,150)` / body 15 (**10:1**); script 96.

## Motion — catálogo CERRADO (2 easings: expo.out + quick(.33,1,.68,1) 200ms hovers; un ticker Lenis→GSAP)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, steps 90/70/55/45/40 |
| R5 | marea | translateY senoidal por letra | ±6px | scrub .8 | sin() |

## Scrollytelling
Split accesible (aria-label completo, spans aria-hidden); scrub del
hero `top top / bottom top`. Reduced: texto plano sin split.

## Robustez
dest EXACTO 3 · svc 3-6 · journey.steps 3-5 · press 3-6. Fetch
absoluto /v30-capri/content.json.
