# PRINCIPLES — v33 "Valenna" (rework)

## Identidad
Voyenne, The Travel Edit — split hero favorito de Pablo (conservar y
pulir). EL momento: **el díptico se abre** — las dos mitades divergen
±4vw con el scrub al salir (overflow contenido).

## Grid/Tipo
- Wrap 1080-1240; `--sec clamp(110px,15vh,170px)` (phil ×1.1).
- wm `The Travel Edit.` serif grande; composición original intacta.

## Motion — catálogo CERRADO (2 easings: expo.out + quick(.33,1,.68,1) 200ms hovers; un ticker Lenis→GSAP)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, steps 90/70/55/45/40 |
| R5 | díptico | translateX ∓4vw por mitad | — | scrub 1.2 | lineal |

## Scrollytelling
Scrub `.hero top top / bottom 20%`. Reduced: mitades quietas.

## Robustez
edits EXACTO 3 · phil EXACTO 3 · quote opcional · slots nativos.
Fetch absoluto /v33-valenna/content.json.
