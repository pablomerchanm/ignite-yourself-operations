# PRINCIPLES — v31 "Chronicle" (rework)

## Identidad
The Ledger: wordmark 250px + doble nav numerada 01-07 (composición
vara — INTOCABLE). EL momento: **la mano escribe** — las líneas
manuscritas se escriben de izquierda a derecha (máscara horizontal).

## Grid/Tipo
- Wrap 1240; `--sec clamp(104px,14vh,168px)` afinado.
- wm `clamp(80,17vw,250)` / body ~15 (**16:1**).

## Motion — catálogo CERRADO (2 easings: expo.out + quick(.33,1,.68,1) 200ms hovers; un ticker Lenis→GSAP)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, steps 90/70/55/45/40 |
| R5 | escritura | translateX −101%→0 en máscara | — | scrub 1.2 | ease cuadrático |

## Scrollytelling
Por [data-write] `top 90% / top 55%`. Marquee featured mapeado al
viewport (−25%). Reduced: tintas escritas. Cifras de results marcadas
placeholder con asterisco de honestidad.

## Robustez
svc EXACTO 3 · results EXACTO 3 · feat 3-6. Nav restaurada EXACTA del
original tras verificación visual. Fetch absoluto /v31-chronicle/content.json.
