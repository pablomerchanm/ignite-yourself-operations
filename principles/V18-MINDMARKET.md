# PRINCIPLES — v18 "MindMarket" (rework)

## Identidad
Ilustrada pastel Inter Tight. EL momento: **estallido de viñetas** —
los .pop de cada illobox escalan con backOut real mapeado al scrub.

## Grid/Tipo
- Cards radius --r; nav pill flotante. `--sec clamp(96px,13vh,152px)`.
- d81/d40; statnum `clamp(72,10vw,144)` / body 16 (**9:1**).

## Motion — catálogo CERRADO (2 easings: expo.out + quick(.33,1,.68,1) 200ms hovers; un ticker Lenis→GSAP)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, steps 90/70/55/45/40 |
| R5 | estallido | scale backOut(k) por pop | — | scrub 1.2 | backOut(1.70158) |

## Scrollytelling
Por illobox: `k=clamp(p·(n+.6)−j·.8)` → scale=backOut(k) secuencial.
3er easing documentado: spring(.34,1.56,.64,1) solo hovers de chips.
Arte SVG = plantilla del loader (claves hero/chat/plan/life/wave/mark).

## Robustez
moments EXACTO 2-4 · stats EXACTO 2-3 · voices 3-9 · chips 4-12 · pts
2-4. Reduced: pops a scale(1). Fetch absoluto /v18-mindmarket/content.json.
