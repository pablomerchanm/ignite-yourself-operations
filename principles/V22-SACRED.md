# PRINCIPLES — v22 "Sacred" (rework)

## Identidad
Poética ilustrada de verdes profundos con mapa del caso. EL momento:
**cartografía por capas** — cada mapa SVG se dibuja capa a capa
(charted → compromised → restored).

## Grid/Tipo
- Figtree + serif + Space Mono. `--sec clamp(104px,14vh,168px)`.
- Poemas full 100vh; intro big 46; mapstep h3 40.

## Motion — catálogo CERRADO (2 easings: expo.out + quick(.33,1,.68,1) 200ms hovers; un ticker Lenis→GSAP)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, steps 90/70/55/45/40 |
| R5 | cartografía | opacity por capa svg (hijos directos) | — | scrub 1.2 | cascada k=clamp(p·n−j) |

## Scrollytelling
Scrub por mapstep `top 75% / center 40%`. Parallax de poemas/banda al
ticker (translateY ±30 + scale 1.12, overflow clip). Reduced: mapas
completos, sin parallax.

## Robustez
poems 2-4 · mapsteps EXACTO 2-3 · record EXACTO 2-3 · voices 2-4.
Parches CSS con assert de balance de llaves (lección de esta página).
Fetch absoluto /v22-sacred/content.json.
