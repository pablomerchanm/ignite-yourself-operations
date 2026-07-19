# PRINCIPLES — v34 "Mesa Maison" (rework)

## Identidad
Casa Mesa — favorita declarada ("sé muy fiel"): ilustración adobe,
footer monumental. Tratamiento QUIRÚRGICO IN-PLACE (markup ilustrado
intacto; decisión de fidelidad documentada). EL momento: **el sol
atardece** — un sol añadido en el lenguaje flat de la ilustración
cruza el cielo y se pone tras la mesa con el scroll del hero.

## Grid/Tipo
- Original intacto. Open Sans + display + gothic; wm hero
  `clamp(64,12.4vw,178)`.

## Motion — catálogo CERRADO (2 easings: expo.out + quick(.33,1,.68,1) 200ms hovers; un ticker Lenis→GSAP)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, steps 90/70/55/45/40 |
| R5 | el sol | translate del <g data-sun> en arco parabólico | x 240→1200, y 70→245 | scrub 1.2 | x lineal, y p² |

## Scrollytelling
Sol como PRIMER hijo del svg (se pone DETRÁS de la silueta). Scrub
`.hero top top / bottom top`. Reduced: sol fijo al alba.

## Decisión de alcance
Copy queda en HTML: el markup ES arte-dirigido (SVGs intercalados);
un loader arriesgaba la fidelidad exigida. Tokens+motion runtime
inyectados in-place; content.json aplicable con el patrón de las otras
si el equipo lo pide.

## Robustez
Batchcheck d+m ovf 0; reduced verificado; anchors por Lenis.
