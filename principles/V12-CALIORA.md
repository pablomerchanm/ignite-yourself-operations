# PRINCIPLES — v12 "Caliora" (rework)

## Diagnóstico (Paso 1)
- La más lista para clínicas y por eso exige más: estructura correcta
  (herocard, tcards con fichas k/v, navy stats, book card) pero el 10%
  de acabado falta: `.reveal` IO genérico, dos easings sin tokens,
  cero scrollytelling, copy en HTML.
- HONESTIDAD: los vcards llevaban ★★★★★ — ratings inventados. Fuera:
  se sustituyen por etiqueta mono del rol (Patient story / Referring
  doctor), que es verificable.
- Ratio justo: h1 86 / body 15.5 = 5.5:1 (aceptable para clínica).

## Identidad
La clínica boutique moca/navy: tarjetas con radios grandes, fichas
técnicas monoespaciadas, calma cara. EL momento: **la baraja de
tratamientos** — en desktop los 4 tratamientos se apilan sticky y cada
tarjeta nueva cubre a la anterior mientras la de atrás cede escala y
luz (scrub continuo) — el catálogo clínico como mazo de fichas.

## Grid y espacio
- Contenido 1280px aprox (wrap); herocard/statement/blog con margen 14px
  y radios --r-lg (cards de página completa).
- Escala 8px. Alturas: `--sec clamp(96px,13vh,152px)` · statement/blog
  card ×0.85 interior. Nunca uniforme.
- Ruptura: la baraja — el grid 2×2 se convierte en pila sticky de
  fichas horizontales a pantalla (solo desktop+motion).

## Tipografía
- Geist + Geist Mono. Escala: 10.5 / 11 / 13.5 / 15.5 (base) / 16.5 /
  24 / 34-36 / statement 65 / h1 `clamp(52px,6vw,86px)` (**5.5:1**).
- Mono para toda etiqueta técnica (k/v, roles, cats).

## Motion — catálogo CERRADO (5, 2 easings)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | hero-stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out (rows del blog) |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, stagger decreciente 90/70/55 |
| R5 | baraja sticky | scale+brightness de la ficha cubierta | — | scrub 1.2 | lineal |

- Easings: expo.out + quick(.33,1,.68,1) 200ms hovers. Un ticker.
- Hovers: pills translateY(-2px)/active .97; tcard img scale 1.04
  700ms; vcard translateY(-4px); np fondo 200ms.

## Scrollytelling (R5)
- Desktop+motion: `.tgrid` pasa a columna; cada `.tcard` es ficha
  horizontal sticky (`top: 96+i·26px`, z-index creciente). Por cada
  ficha i, un ScrollTrigger sobre la ficha i+1 (`top bottom → top
  (96+i·26)px`) mapea k: la ficha i hace `scale(1−.045k)` +
  `filter:brightness(1−.1k)` — cubierta continua, nunca binaria.
- Mobile y reduced: grid 2×2 / columna normal (CSS original).

## Micro-interacciones
- np/pills/circ: rest → hover → active → focus-visible completos.
- Formulario: focus borde espresso + focus-visible.
- prefers-reduced-motion implementado.

## Robustez (contrato)
- treatments EXACTO 3-5 fichas (la baraja reparte offsets) · meta k/v
  EXACTO 3 por ficha · voices 3-9 (roles patient/doctor/family para la
  etiqueta honesta) · blog.rows 2-5 · scards EXACTO 2-3 · fgrid cols
  2-3. h1 ≤ 24 chars ×2 probado. Fotos vacías → `.phx`.
- Fetch absoluto `/v12-caliora/content.json`.
