# PRINCIPLES — v13 "Bennett" (rework)

## Diagnóstico (Paso 1)
- Momento: los rollzones del hero — pero son `@keyframes rollup 14s linear
  infinite`, motion desacoplado del scroll que nunca termina.
- Ritmo: TODAS las secciones `padding:130px 0`; la alternancia dark/light
  salva la monotonía a medias.
- Ratio ok (mega 220/16 = 13.7:1) — la tipografía nunca fue el problema.
- Motion roto: `.workroll .row:hover{padding-left:22px}` ANIMA LAYOUT;
  `transition:font-weight .2s` salta entre instancias estáticas (400→700
  sin interpolación real); un solo `.reveal` IO genérico.
- Portabilidad cero, sin placeholders, sin reduced-motion.

## Identidad
El libro mayor suizo: B/N absoluto, Inter Tight, filas contables con
hairlines. EL momento: **el ledger gira con el scroll** — los dos
rollzones del hero contra-rotan mapeados al progreso (izquierda sube,
derecha baja, como diales de una máquina registradora), y en el workroll
una onda de peso variable recorre las filas con el scrub.

## Grid y espacio
- Contenido 1400px; margen 28px; breakpoint 900.
- Escala 8px. Tres alturas: `--sec clamp(104px,14vh,168px)` estándar ·
  inter (fotos) 0 (full-bleed pegado) · voices ×1.25 (respiro) · lets
  top ×0.9. Nunca uniforme.
- Ruptura: el mega "Let's restore." a 250px sangra el margen izquierdo
  (-6px ya existente, se conserva y se lleva a -3vw en desktop).

## Tipografía
- Inter Tight **variable** (wght 100..900) — necesario para la onda de
  peso; escala existente conservada: 15 / 17 / u22 / u30 / h45 / h75 /
  roll-t 150 / mega `clamp(90px,15.2vw,220px)` (**13.7:1**) · lets 250.
- lh: mega .82 · roll .88 · body 1.5–1.65. ls: mega -.06em · roll -.07em.

## Motion — catálogo CERRADO (5, 2 easings)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | statement-stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out (bordes de filas workroll/record) |
| R4 | col-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, stagger decreciente 90/70/55 |
| R5 | ledger-scrub | translateY stacks + font-variation wght | — | scrub 1.2 | lineal |

- Easings: expo.out + quick(.33,1,.68,1) 200ms hovers. Un ticker
  Lenis→GSAP.
- Hover workroll: `translateX(22px)` en el contenido de la fila
  (transform, NO padding) + wght 700 vía font-variation (interpolación
  real de la variable). Imagen interlude: grayscale→color + scale 1.03
  700ms en overflow hidden.
- `will-change:transform` solo en los `.stack` del hero.

## Scrollytelling (R5 — dos aplicaciones, un lenguaje)
- **Contra-rotación hero**: stacks duplicados en markup; zona izquierda
  `translateY(-p·50%)`, derecha `translateY(-50%+p·50%)` — direcciones
  opuestas, mapeadas al progreso del hero (`start top top / end bottom
  top`, scrub 1.2). El keyframe infinito muere.
- **Onda de peso workroll**: scrub de la sección (`top 70% / bottom
  55%`); cada fila `wght = 400 + 320·campana(|p·n − i|)` — la negrita
  recorre la lista como un cursor contable, mapeo continuo por fila.
- Mobile: contra-rotación reducida (±25%); onda activa. Reduced: stacks
  estáticos en 0, filas a wght 400, hover sin animación.

## Micro-interacciones
- Filas: rest → hover translateX+wght (200ms quick) → focus-visible
  outline 2px offset 3px. Botón form: rest → hover opacity .85 →
  active scale .97 → focus-visible.
- Nav mix-blend difference conservada + focus-visible.
- prefers-reduced-motion implementado (clase no-motion, todo visible).

## Robustez (contrato)
- Stacks EXACTO 3–4 palabras por lado · workroll 4–8 filas · inter 0–3
  fotos (0 = sección fuera) · voices EXACTO 2–3 columnas, 2–4 quotes c/u
  · record 2–6 filas · meta contacto 3–5 pares. Titular statement ≤ 90
  chars probado ×2. Fotos vacías → `.phx` etiquetado.
- Fetch absoluto `/v13-bennett/content.json`.
