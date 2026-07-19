# PRINCIPLES — v4 "ClearPath" (rework)

## Diagnóstico (Paso 1)
- Momento: bignums 227px del journey — estáticos, repetidos ×4; curvas SVG
  decorativas. Nada narra.
- 12 usos de `centerhead`; 5 secciones seguidas centradas; `padding:140px 0`
  en TODAS las secciones.
- Displays de sección 48/16 = 3:1 (bajo umbral). Hero 136/16 = 8.5:1 ok.
- Motion: `.reveal` genérico; transitions .35/.4/.5/.8s con `ease` default —
  CERO curvas declaradas. FAQ anima `max-height` (layout).
- Portabilidad cero.

## Identidad
El sendero sage: salud calma, serif Crimson, curvas de camino. EL momento:
**el journey es un sendero SVG vertical que se dibuja con el scroll** — la
metáfora del nombre hecha scrollytelling (sin pin: scrub sobre el flujo).

## Grid y espacio
- Contenido 1312px; margen 64 D / 24 M; breakpoint 900.
- Escala 8px. Tres alturas de sección: `--sec clamp(96,13vh,160)` estándar ·
  services banda ×0.85 · about respiro top ×1.3 / bottom ×0.6. Nunca
  uniforme.
- Ruptura de retícula: los bignum del sendero cruzan el margen derecho
  (translateX +8%) — una sola familia de ruptura, en el momento.

## Tipografía
- Ratio 1.25 base 16: 12.8 / 16 / 20 / 25 / 31.25 / display sección
  `clamp(2.5rem,4.2vw,4rem)` (64 → **4:1**) · hero `clamp(64px,9.4vw,136px)`
  (8.5:1) · bignum `clamp(140px,15.8vw,227px)`.
- lh: hero .94 · display 1.1 · body 1.7. ls: display -.04em · lab +.11em.
- Línea: 44–52ch.

## Motion — catálogo CERRADO (5, 2 easings)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 750ms | expo.out |
| R2 | hero-stagger | opacity+y | 18px | 750ms | expo.out, 110/75/55ms decreciente |
| R3 | ellipse-draw | strokeDashoffset | — | 900ms | expo.out (las elipses anotadas) |
| R4 | card-settle | opacity+y+scale(.985→1) | 14px | 700ms | expo.out, stagger decreciente 90/70/55, máx 6 |
| R5 | path-scrub | sendero SVG dashoffset + bignums encendidos | — | scrub 1.2 | lineal |

- Easings: expo.out + quick(.33,1,.68,1) 200ms hovers. FAQ: SIN max-height —
  el contenido cambia display y hace fade+y 300ms (transform), el reflow es
  instantáneo, jamás animado.
- Hovers cards: translateY(-5px) + sombra (transform+filter). Nav .scrolled
  350ms. Nada <120ms ni >1200ms.

## Scrollytelling (R5)
- Sendero: path SVG absoluto detrás de los 4 pasos, serpentea entre
  columnas; `stroke-dashoffset` mapeado al progreso de la sección
  (`start top 65% / end bottom 70%`, scrub 1.2, sin pin).
- Cada bignum pasa de opacity .18 a 1 en su cuarto del progreso (continuo).
- Mobile: el sendero se oculta (<900px); pasos con R1. Reduced: dibujado
  completo, bignums encendidos.

## Micro-interacciones
- Pills: rest → hover translateY(-2px)+color (200ms) → active .96 scale →
  focus-visible outline sage 2px. Journal img scale 1.04 700ms.
- Nav: .onhero transparente/blanco → .scrolled fondo blanco blur (350ms).
- prefers-reduced-motion: todo visible, sendero completo.

## Robustez (contrato)
- Hero h1 ≤ 60 chars (probado ×2) · journey EXACTO 3–5 pasos · services
  3–6 · stats 2–4 · begin 2–3 cards · stories 3–9 · faq 2–6 · journal 0–3
  (0 = sección desaparece) · speak rows 2–5.
- Fotos por slot con ratio + label. Fetch absoluto `/v4-clearpath/content.json`.
