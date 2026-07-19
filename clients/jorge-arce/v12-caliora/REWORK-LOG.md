
## 20 · v12-caliora — CERRADA

**Diagnóstico inicial:** la más lista para clínicas y por eso la más
exigente: estructura correcta (herocard, fichas k/v, navy stats, book
card) pero `.reveal` genérico, dos easings sin tokens, cero
scrollytelling y — problema de honestidad — vcards con ★★★★★
inventadas. Copy en HTML.

**Qué cambié:**
- HONESTIDAD: estrellas fuera; cada testimonio lleva etiqueta mono del
  rol verificable (Patient story / Referring doctor / Family of
  patient) derivada de `role` en el JSON.
- R5 baraja de tratamientos (desktop): el grid 2×2 pasa a pila sticky
  de fichas horizontales (`top 96+i·26px`, z creciente); cada ficha
  nueva cubre a la anterior mientras la cubierta cede escala
  (1−.045k) y luz (brightness 1−.1k) por scrub continuo. Los tcards
  revelan con fade sin transform (la baraja es dueña del transform —
  patrón anti-conflicto de v14/v21). Mobile/reduced: grid original.
- Tokens; easings consolidados a expo.out+quick; pills con active .97
  y focus-visible; `.phx`; R3 hairlines en rows del blog.
- Shell+loader completo (9 secciones opcionales, brand SVG plantilla).

**Qué elevé:** el 10% que faltaba: un momento propio (la baraja),
tokens de verdad, y honestidad médica en los testimonios.

**Paso 4:** memorable sí (baraja); herocard foto / baraja blanca /
statement taupe / stats navy / book blanca — alternancia real; ratio
5.5:1 (género clínica, aceptable); motion continuo; 2 easings; solo
transform+paint; robusto.

**Verificación:** batchcheck W12 ovf 0 d+m. robust12: REDUCED nm, 0
ocultos, tgrid grid, sin ★, 9 etiquetas de rol · STACK sticky tops
96/122/148/174, cubiertas scale .955/.976 + brightness · STRESS blog
fuera, fichas 3 sin fotos → phx, h1 ×2, ovf 0, 0 errores · MOBILE ovf
0 cards static.
