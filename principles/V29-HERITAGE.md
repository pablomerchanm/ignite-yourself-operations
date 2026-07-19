# PRINCIPLES — v29 "Heritage" (rework)

## Identidad
Provenance, estudio sereno de neutros cálidos. EL momento: **la firma
bajo la cortina** — footer fixed tras el main; al final el contenido
se levanta como telón y el wordmark hairline aterriza.

## Grid/Tipo
- 5vw; `--sec clamp(110px,15vh,170px)` (freebie ×0.95).
- hero h1 `clamp(64,12.6vw,186)` / body 13.5 (**13.8:1**); foot wm 110.

## Motion — catálogo CERRADO (2 easings: expo.out + quick(.33,1,.68,1) 200ms hovers; un ticker Lenis→GSAP)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, steps 90/70/55/45/40 |
| R5 | cortina | reveal fixed + wm y40→0 scale .92→1 op .4→1 | — | scrub 1.2 | lineal |

## Scrollytelling
Spacer medido = altura del footer (re-medido en refresh/resize);
scrub sobre el spacer. Mobile (<701)/reduced: flujo normal estático.
Footer renombrado .sitefoot (colisión con .foot del hero resuelta).

## Robustez
work.cards 2-4 · journal 0-3 · slots nativos con tag. Fetch absoluto
/v29-heritage/content.json.
