# PRINCIPLES — v36 "Kimberly" (rework)

## Identidad
Counsel by Camille, navy sobria. EL momento: **el consejo se
pronuncia** — la cita en `lines[]` con máscaras overflow: cada línea
sube 112%→0 con ease cúbico, encadenada k=clamp(p·n−i·.85).

## Grid/Tipo
- 8vw; `--sec clamp(104px,14vh,168px)` (offer ×0.9, quote ×1.15).
- close h2 `clamp(30,4.4vw,58)`; serif 200 en displays.

## Motion — catálogo CERRADO (2 easings: expo.out + quick(.33,1,.68,1) 200ms hovers; un ticker Lenis→GSAP)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, steps 90/70/55/45/40 |
| R5 | pronunciación | translateY 112%→0 por línea enmascarada | — | scrub 1.2 | cúbico dentro de k |

## Scrollytelling
Scrub `.quote top 78% / center 48%`. Reduced: líneas planas.

## Robustez
quote.lines EXACTO 2-4 · pillars EXACTO 3 · offers 2-4 · journal 0-3.
Fetch absoluto /v36-kimberly/content.json.
