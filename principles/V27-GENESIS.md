# PRINCIPLES — v27 "Genesis" (rework)

## Identidad
Génesis ciruela/rosa serif. EL momento: **el verso se ilumina** —
wipe de background-clip:text 100%→0 en la cita + numerales romanos que
amanecen (rgb ceniza→limón) + halo escalando/rotando con p global.

## Grid/Tipo
- Wrap 8vw; `--sec clamp(104px,14vh,168px)` (verse ×1.2, record ×0.85).
- hero h1 `clamp(44,7.4vw,104)` / body 15.5 (**6.7:1**); num 104.

## Motion — catálogo CERRADO (2 easings: expo.out + quick(.33,1,.68,1) 200ms hovers; un ticker Lenis→GSAP)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, steps 90/70/55/45/40 |
| R5 | iluminación | background-position wipe + color rgb + halo transform | — | scrub 1.2 / .6 | lineal |

## Scrollytelling
Verse `top 78% / center 45%`; num por capítulo `top 80% / center 45%`
(k → rgb interpolado + opacidad .45→1); halo global scale 1→1.35 +
rotate 40°. Preloader determinista gsap 0→100% 900ms. Reduced: color
sólido + acento rosa, halo quieto.

## Robustez
chapters 3-6 (romanos y alternancia auto) · record EXACTO 2-3 ·
voices 2-4. Fetch absoluto /v27-genesis/content.json.
