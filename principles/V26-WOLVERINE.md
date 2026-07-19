# PRINCIPLES — v26 "Wolverine" (rework)

## Identidad
Heritage corporativa B/N. EL momento: **el manifiesto se estampa** —
pin del credo con líneas que pasan de fantasma (.15) a tinta plena una
a una y SE QUEDAN (acumulación, no crossfade).

## Grid/Tipo
- Wrap 1330; `--sec clamp(104px,14vh,168px)`. close h2
  `clamp(48,8vw,116)` / body 16 (**7.25:1**).

## Motion — catálogo CERRADO (2 easings: expo.out + quick(.33,1,.68,1) 200ms hovers; un ticker Lenis→GSAP)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, steps 90/70/55/45/40 |
| R5 | manifiesto | opacity .15→1 + y 14→0 por línea, pin n·45% | — | pin+scrub 1.2 | k=clamp(p·n−i) |

## Scrollytelling
Pin `.state top 22%`; nav .solid integrada al evento Lenis. Mobile
(<901)/reduced: sin pin, líneas visibles.

## Robustez
state.lines EXACTO 2-4 · bgrid 4-8 (A-0N auto) · stats EXACTO 2-3.
Subpáginas about/commitment conservadas (decisión documentada).
Fetch absoluto /v26-wolverine/content.json.
