# PRINCIPLES — v37 "Bakery" (rework)

## Identidad
Big Batch — "AMO EL ESTILO CHUNKY": Gasoek One, ilustración SVG
propia, ticker, menú punteado — vara de personalidad. Tratamiento
QUIRÚRGICO IN-PLACE (ilustraciones intercaladas = arte dirigido). EL
momento: **la masa rebota** — cada pieza horneada cae y aterriza con
squash & stretch de cartoon mapeado al scrub.

## Grid/Tipo
- Original intacto (chunky es la gracia). Ghost "What we bake" doble.

## Motion — catálogo CERRADO (2 easings + curva bounce propia)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R5 | masa | translateY −46→0 + scale(sx,sy) inverso | — | scrub 1.2 | bounceK a trozos (rebotes .18/.06) |

- bob y tick infinitos MUERTOS: la galleta del hero deriva con el
  scroll (translateY −46px + rotate −4→5°) y el ticker se mueve −28%
  mapeado al paso del viewport.
- transform-origin 50% 100% (aterrizan sobre su base).

## Scrollytelling
Por pieza `top 96% / top 52%`: caída y=(1−k/.6)·−46; rebote
bk=bounceK(k) con squash sy=2−bk, sx=bk (volumen conservado ~).
Reduced: piezas quietas, sin transform.

## Decisión de alcance
Copy en HTML (como v34): markup arte-dirigido. Runtime estándar
inyectado; tokens; focus-visible chunky 3px.

## Robustez
Batchcheck d+m ovf 0; reduced verificado; mobile ovf 0.
