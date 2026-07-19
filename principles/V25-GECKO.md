# PRINCIPLES — v25 "Gecko" (rework)

## Diagnóstico (Paso 1)
- 6 páginas generadas por script — la más productiva del catálogo — pero
  cada una con su copia del CSS, su IO binario propio, `.reveal` de
  transición única y el sello circular con `spin 14s infinite`.
- El rework correcto aquí NO es rehacer el diseño (funciona) sino
  SISTEMATIZAR: un runtime de motion compartido, tokens de verdad y el
  sello como firma scroll-driven en todo el sitio.

## Identidad
La boutique crema/periwinkle multi-página: oval buttons rotados,
sello giratorio, filas numeradas. EL momento: **el sello del cirujano
gira con el scroll** en todas las páginas — la firma de la casa deja de
ser un GIF infinito y pasa a registrar el avance del lector (0→720°).

## Sistema (lo que cambia de verdad)
- `/v25-gecko/motion.js`: runtime compartido del catálogo cerrado —
  R1 rise (todo `.reveal`), R2/R4 stagger decreciente
  (`[data-stagger]`), R5 sello (`[data-seal]` rota p·720° scrub .8),
  anchors por Lenis, `html.no-motion` para reduced/no-JS. Las 6 páginas
  cargan vendor + motion.js; sus IO inline murieron.
- Tokens inyectados en las 6: --ease-out/--ease-quick/--dur-hover/--sec.
- `spin` keyframes eliminado en las 6; hovers con easing tokenizado.

## Motion — catálogo CERRADO (compartido, 2 easings)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2/R4 | stagger | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, 120/80/60ms |
| R5 | el sello | rotate 0→720° | — | scrub .8 | lineal |

## Decisión de alcance (documentada)
El copy permanece en el HTML de cada página: v25 nació de un script
generador y sus 6 páginas SON la salida de ese pipeline — el "content
system" de esta plantilla es el generador, no un content.json por
página. Tokenización y motion quedan centralizados; si el equipo
quiere JSON por página, el patrón de loader de las otras 24 reworks es
directamente aplicable.

## Robustez (contrato)
- Las 6 páginas comparten runtime: quitar motion.js ⇒ sitio estático
  legible (no-motion). Reduced: verificado (sello quieto, todo
  visible). Batchcheck 1440+390 en las 6: overflow 0, 0 errores.
