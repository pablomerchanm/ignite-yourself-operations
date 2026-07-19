# PRINCIPLES — v32 "Alora" (rework)

## Identidad
Elowen weddings, bruma de neutros. EL momento: **la bruma se levanta**
— velo de lino (gradiente #F5F4EF) sobre cada slot full-bleed que se
disipa con el scrub (op 1→.08 + translateY −14%).

## Grid/Tipo
- 4-8vw; `--sec clamp(110px,15vh,170px)` (kind ×0.95).
- hero lines caps `.22em`; close lg; caps 17-44 sobre body 12-13.

## Motion — catálogo CERRADO (2 easings: expo.out + quick(.33,1,.68,1) 200ms hovers; un ticker Lenis→GSAP)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, steps 90/70/55/45/40 |
| R5 | velo | opacity + translateY del velo (elemento real) | — | scrub 1.2 | lineal |

## Scrollytelling
Por [data-veil] `top 92% / top 25%`. Reduced: sin velo. ROBUSTEZ
PROBADA (deuda de cola): titulares ×2 en hero/close → ovf 0.

## Robustez
svc EXACTO 3 · exp.steps 3-5 · press 3-5 · journal-kind opcionales.
Fetch absoluto /v32-alora/content.json.
