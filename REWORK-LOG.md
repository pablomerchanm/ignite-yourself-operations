# REWORK-LOG — registro por página

> Otra sesión debe poder retomar leyendo SOLO la queue y este log.
> Formato por página: diagnóstico inicial → qué cambié → qué elevé →
> respuestas del Paso 4 → estado.

## Infraestructura común (hecha antes de la página 1)

- `/vendor/` en `clients/jorge-arce/`: gsap.min.js + ScrollTrigger.min.js +
  lenis.min.js (copiados de template-base). Referencia SIEMPRE absoluta:
  `<script src="/vendor/gsap.min.js">` — cleanUrls de Vercel canonicaliza
  `/vNN-slug/` → `/vNN-slug` y rompe rutas relativas.
- `content.json` por página, fetch SIEMPRE absoluto: `/vNN-slug/content.json`.
- Imágenes en JSON con ruta absoluta `/img/...`.
- Patrón de página productiva (heredado de template-base, PR #36–39):
  index.html = tokens (:root) + CSS estructural + `<main id="site">` vacío +
  loader inline que renderiza secciones desde el array `sections` del JSON.
  Secciones opcionales: quitar del array = desaparece sin romper ritmo.
- Motion estándar: Lenis + GSAP en UN ticker
  (`lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add`),
  `prefers-reduced-motion` → clase `no-motion` (todo visible, sin Lenis).
- Verificación por página: batchcheck (desktop 1440×5 frames + mobile 390×2,
  overflow + pageerror) y prueba de robustez (titular ×2, lista min/max, sin
  foto) vía route-interception del JSON.

## Bloqueos

(ninguno aún)

---

## 1 · v6-final — "Bluewire" — CERRADA

**Diagnóstico inicial:** momento memorable prestado (ARCE gigante de v8/Zentro)
y DUPLICADO hero+finale; 5 secciones con padding idéntico; hero sin display
tipográfico (statement 24px); un solo reveal fade-up 950ms con delays inline a
mano; hover de filas animando padding-left (layout); cero portabilidad (texto
en HTML, fotos px fijos).

**Qué cambié:**
- Identidad "expediente quirúrgico suizo". Wordmark UNA vez, en straddle
  hero→papel (-96px) = la ruptura de retícula. Finale ya no lo repite.
- Scrollytelling real (R5): proceso pinneado con scrub 1.2 — línea central
  scaleY continua + contador 01→05 + 5 pasos alternados izq/der que se
  encienden por quintos con mapeo continuo. Mobile: línea con trigger normal
  + pasos R1, contador fijo 05. Reduced-motion: estado final.
- Catálogo cerrado de motion: R1 rise 700ms grupo · R2 hero-stagger
  decreciente 110/70/50 · R3 rule-draw (hairline real inyectada, scaleX) ·
  R4 img-settle 900ms · R5 scrub. 2 easings: expo.out y cubic-bezier(.33,1,.68,1).
- Hover de filas: padding-left → translateX (transform only). Lenis+GSAP un ticker.
- Nav con estado .scrolled (fondo papel + blur a los 90vh, 350ms).
- Team-ready: tokens :root completos (color/tipo ratio 1.333/espacio base 8/
  motion/radios) · content.json con TODO el contenido (rich text seguro con
  whitelist i/o/b/br) · secciones opcionales por array · placeholders con
  aspect-ratio + label mono · fetch absoluto /v6-final/content.json.

**Qué elevé concretamente:** display de sección 54→88px (5.2:1); jerarquía de
hero restaurada por el wordmark en straddle; ritmo denso/respiro con chapter
92vh y process aireado; 9 tratamientos → 5 familias distintas alternadas,
centradas solo chapter y finale (no adyacentes).

**Paso 4:** momento = expediente pinneado + straddle ARCE (propio, no
prestado) ✓ · paddings: sec-pad denso + chapter min-height + profile
compensado (3 valores) ✓ · display/body 5.2:1 (+SVG 14:1) ✓ · respira en
chapter/process, densifica en profile/testimonials ✓ · motion por rol (5
reveals con jerarquía, no fade-up global) ✓ · easings: 2 ✓ · robustez:
titular ×2, sin fotos (4 placeholders con label), listas al mínimo, 0
artículos — ovf 0, errores 0 ✓ · reduced-motion: todo visible + scrolly en
estado final ✓ · solo transform/opacity ✓.

**Verificación:** batchcheck W6 desktop+mobile ovf 0 err 0; stress ovf 0
err 0; reduced ok. Schema de contenido documentado en principles/V6-BLUEWIRE.md
(§Robustez = contrato de largos y ratios).

---

## 2 · v2 — "Monograph" — CERRADA

**Diagnóstico inicial:** hero name 15rem bueno pero la RUTA Colombia→South Bay
(el corazón narrativo) estática; 6 secciones con la misma familia de padding y
cabecera; reveal único de 1100ms + retrato 1600ms con curva `ease` (fuera de
rango y de sistema); 4+ easings; hover de filas con padding-left; portabilidad
cero.

**Qué cambié:**
- EL momento: la ruta ahora es scrollytelling pinneado (+120vh, scrub 1.2) —
  el path SVG se dibuja en continuo (strokeDashoffset), los años cuentan
  00→27 (tabular-nums), origen entra en p<.15 y destino en p>.8. Mobile: sin
  pin, ruta dibujada 1.1s + contador directo a 27. Reduced: estado final.
- Catálogo cerrado: R1 rise 750ms grupo · R2 hero-stagger decreciente
  120/80/60 · R3 rule-draw · R4 img-settle (plates) · R5 route-scrub.
  2 easings (expo.out / quick). Retrato: solo opacity 900ms.
- Hover filas: translateX(14px). Plates: scale 1.03 en contenedor overflow
  hidden. Focus-visible azure.
- Ritmo: sec estándar 128 / manifesto respiro ×1.5 (192) / stamps banda
  ×0.5 (64) — tres alturas declaradas.
- Team-ready: tokens completos, /v2/content.json (todo el contenido, rich
  i/d/b/br + &nbsp;), secciones opcionales, acto claro AUTOCONTENIDO por
  sección (quitar about/press/patients no rompe), placeholders por slot.

**Qué elevé:** el único germen narrativo de la página ahora ES la página;
consistencia de easing total; aspect-ratios en vez de alturas px (robustez).

**Paso 4:** momento = ruta que se dibuja ✓ · 3 alturas de padding + variedad
compositiva real (mapa/índice/masonry/splits) ✓ · display 64/15=4.3:1, hero
16:1 ✓ · respira en manifesto, densifica en press-wall ✓ · motion por rol ✓ ·
easings 2 ✓ · robustez: statement ×2, sin fotos (8 labels), rows 3, cards 3,
articles 0 — ovf 0 err 0 ✓ · reduced ok (años=27, ruta dibujada) ✓ ·
solo transform/opacity (dashoffset es paint SVG, no layout) ✓.

**Verificación:** batchcheck W2 d+m ovf 0 err 0 · stress ovf 0 err 0 ·
reduced ok. Bug cazado en autocrítica: &nbsp; escapado por rich() — corregido
(whitelist de entidad).

---

## 3 · v4-clearpath — "ClearPath" — CERRADA

**Diagnóstico inicial:** 12 usos de centerhead (5 secciones centradas
seguidas); `padding:140px 0` uniforme en todo; displays de sección 3:1;
CERO curvas de easing declaradas (todo `ease` default, .35–.8s mezclados);
FAQ animando max-height (layout); bignums 227px estáticos ×4; curvas SVG
decorativas; portabilidad cero.

**Qué cambié:**
- EL momento: el journey ahora es "el sendero" — path SVG vertical que
  serpentea entre los 4 pasos y se dibuja con el scroll (scrub 1.2, sin pin),
  con cada bignum encendiéndose (op .18→1) en su cuarto del progreso.
  La metáfora del nombre hecha scrollytelling. Mobile: sendero oculto,
  pasos con R1. Reduced: dibujado completo + bignums encendidos.
- Composición desclonada: services/stories/journal pasan a cabecera
  IZQUIERDA asimétrica (lhead/shead 1.2fr/.8fr con lede a la derecha);
  centrados quedan solo about, begin y finale (no adyacentes). Tres alturas
  de sección: --sec / banda ×0.85 / about ×1.3-top.
- Catálogo cerrado: R1 rise 750 · R2 hero-stagger 110/75/55 · R3
  ellipse-draw (las elipses anotadas ahora GSAP dashoffset 900ms) · R4
  card-settle con stagger DECRECIENTE 90/70/55/45/40 máx 6 · R5 sendero.
  2 easings. FAQ sin max-height: display swap + fade transform 300ms.
- Displays de sección subidos a clamp(40,4.2vw,64) → 4:1.
- Team-ready: tokens completos, content.json íntegro (rich s/em/e/br donde
  <e> = elipse anotada dibujable), secciones opcionales (journal quitado en
  test sin romper), guide con foto slot, footer estructurado.

**Qué elevé:** un solo lenguaje de easing; el ornamento (curvas) pasó de
decoración a narrativa; jerarquía tipográfica real en secciones.

**Paso 4:** momento = sendero ✓ · centradas no adyacentes ✓ · 4:1 ✓ ·
respira en about/journey, densifica en begin/stories ✓ · motion por rol
con stagger decreciente ✓ · easings 2 ✓ · robustez: titular ×2, sin fotos
(3 labels), services 3, stories 3, journal REMOVIDO — ovf 0 err 0 ✓ ·
reduced ok ✓ · cero layout animado (FAQ arreglado) ✓.

**Verificación:** batchcheck W4 d+m ovf 0 err 0 · stress ovf 0 err 0 ·
reduced ok.

---

## 4 · v7-noon — "Noon" — CERRADA

**Diagnóstico inicial:** sin momento (markline recortado no cuenta);
padding 120px uniforme; hover filas con padding-left; easings `ease`
default mezclados; cero portabilidad.

**Qué cambié:** identidad anti-marketing elevada — retrato del hero
sangrado al borde derecho (ruptura única); "la cuenta honesta" como
scrollytelling (contadores con scrub y el 0 de shortcuts inmóvil con
subrayado rust al 85% — el chiste visual honesto de la marca); cabecera
de cases a la DERECHA (variación compositiva); cards con settle
decreciente; catálogo cerrado 5 reveals / 2 easings; tokens completos +
content.json íntegro + secciones opcionales + placeholders.

**Paso 4:** momento = cuenta honesta ✓ · composición: hero split sangrado /
services izq / cases der / stats banda / about-speak splits / journal grid /
finale centrado único ✓ · d1 140/17 = 8.2:1 ✓ · banda stats ×0.7 respira
distinto ✓ · easings 2 ✓ · robustez: titular ×2, sin fotos (4 labels),
services 3, cases 2, journal REMOVIDO — ovf 0 err 0 ✓ · reduced: todo
visible, 0 en 0, subrayado completo ✓ · solo transform/opacity ✓.

**Verificación:** batchcheck W7 d+m ovf 0 err 0 · stress ovf 0 err 0 ·
reduced ok.

---

## 5 · v3-hanza — "Hanza" — CERRADA

**Diagnóstico inicial:** one-note (todo al mismo volumen), cita del case
study plana siendo el candidato natural a momento, stagger nth-child
creciente lineal, hovers .3s ease default, portabilidad cero, y un BUG real:
caseband sin responsive → 326px de overflow mobile tapado por
overflow-x:hidden.

**Qué cambié:** quote-scrub palabra a palabra como momento narrativo (scrub
1.2); mark del hero cruzando a la sección siguiente como ruptura única;
catálogo cerrado 5 reveals / 2 easings con staggers DECRECIENTES; tokens en
:root; content.json íntegro con placeholders; bug de overflow arreglado de
raíz (html clip + regla responsive del caseband y contact).

**Paso 4:** momento = cita que se enciende ✓ · composición ya variada
(intro split / grid celdas / band full-bleed / masonry voices / contact
form) con volumen ahora modulado por el scrub oscuro al centro ✓ ·
mark 280px vs body 16 = 17:1, displays 80px = 5:1 ✓ · easings 2 ✓ ·
robustez: lede ×2, sin fotos (labels), celdas 3, voices 3 — ovf 0 err 0 ✓ ·
reduced ok ✓ · transform/opacity only ✓.

**Verificación:** batchcheck W3 d+m ovf 0 err 0 (tras fix) · stress ovf 0
err 0 · reduced ok.

---

## 6 · v5-zentro — "Zentro" — CERRADA

**Diagnóstico inicial:** display gastado por repetición; ticker en loop
infinito (decorativo); strip del hero desaprovechado; FAQ con max-height;
portabilidad cero.

**Qué cambié:** abanico del strip como momento (scroll-driven, sin pin);
ticker convertido a scroll-driven (velocity del scroll, wrap modular) —
de gimmick a interacción; bandas full-bleed con settle 1.12→1 scrubbed;
catálogo cerrado 5/2; FAQ display-swap; tokens + content.json + phx +
adaptadores de contenedor.

**Paso 4:** momento = abanico + ticker reactivo ✓ · composición variada
(hero póster / ticker / bandas / stats split / services sticky / voices
grid / journal cards / faq split / contact form) ✓ · mark ~19vw vs body 16
≈ 17:1 ✓ · easings 2 ✓ · robustez: title ×2, sin fotos (11 labels), voices
3, journal REMOVIDO — ovf 0 err 0 ✓ · reduced ok ✓ · transform/opacity ✓.

**Verificación:** batchcheck W5 d+m ovf 0 err 0 · stress ovf 0 err 0 ·
reduced ok.

---

## 7 · v8-luke — "Luke" — CERRADA

**Diagnóstico inicial:** un solo momento (nombre 245px); lista con hover
estática; aurora en loop 16s; 7 paddings sin sistema; portabilidad cero.

**Qué cambié:** tour guiado por scroll de la lista de trabajo (progreso →
fila activa + crossfade de preview, hover con prioridad manual 2.5s);
aurora ligada al scroll del hero; catálogo cerrado 5/2; tokens +
content.json + placeholders.

**Paso 4:** momento = tour guiado ✓ · aurora con propósito ✓ · nombre
245px/16 ≈ 15:1 ✓ · easings 2 ✓ · robustez: intro ×2, sin fotos, voices 3,
journal REMOVIDO, tour avanza (fila 5 al final del scroll) — ovf 0 err 0 ✓ ·
reduced ok ✓ · transform/opacity ✓.

**Verificación:** batchcheck W8 d+m ovf 0 err 0 · stress ovf 0 err 0 ·
reduced ok · tour verificado programáticamente.

---

## 8 · v9-holistic — "Holistic" — CERRADA

**Diagnóstico inicial:** referente animado replicado sin motion; signs
estáticas con data-float muerto; 8 paddings sin sistema; portabilidad cero.

**Qué cambié:** reparto de cartas como momento (pin +130vh, deltas medidos
en runtime, cada señal en su quinto del progreso); catálogo cerrado 5/2;
tokens + content.json + placeholders.

**Paso 4:** momento = reparto ✓ · composición cálida ya variada (herocard /
deck / split about / grid expertise / qband / masonry stories / journal /
guide split / closing) ✓ · giant display vs body 16 > 4:1 ✓ · easings 2 ✓ ·
robustez: título ×2, sin fotos (16 labels), stories 3, journal REMOVIDO,
deal=5 — ovf 0 err 0 ✓ · reduced ok ✓ · transform/opacity ✓.

**Verificación:** batchcheck W9 d+m ovf 0 err 0 · stress ovf 0 err 0 ·
reduced ok.

---

## 9 · v10-mobius — "Möbius" — CERRADA

**Diagnóstico inicial:** ritmo plano con 8 paddings sin sistema; banda foto
estática; cards clónicas; portabilidad cero.

**Qué cambié:** banda-expand con clip-path scrubbed como momento único;
catálogo cerrado 5/2 con staggers decrecientes; tokens + content.json +
placeholders + overflow clip.

**Paso 4:** momento = banda que se abre ✓ · composición ya variada (stack
hero / split expertise / bignums / band / record split2 / timeline / quote /
voices grid / faq split / guide lay / talk) ✓ · mark hero enorme + display
mega > 4:1 ✓ · easings 2 ✓ · robustez: intro ×2, sin fotos (labels), voices
3, journal REMOVIDO — ovf 0 err 0 ✓ · reduced: clip inset(0) ✓ ·
transform/paint only ✓.

**Verificación:** batchcheck W10 d+m ovf 0 err 0 · stress ovf 0 err 0 ·
reduced ok.

---

## 10 · v11-firma — CERRADA

**Diagnóstico inicial:** el scroll horizontal era novedad frágil: lerp
custom con body-height hack, rotador por `setInterval` infinito, reveals
por IntersectionObserver — tres sistemas de motion desincronizados y una
degradación mobile que dependía de un hack de altura. Copy 100% en HTML.

**Qué cambié:**
- Reescritura del mecanismo: pin GSAP de página completa
  (`gsap.to(track,{x:-max})` + `pin:'#hwrap'` + `scrub:1.2` +
  `invalidateOnRefresh`) — el travelling ES el R5 y corre en el ticker
  único Lenis→GSAP.
- Rotador scroll-driven: `setWord(floor(clamp(progress*4)*n))` en el
  `onUpdate` del pin — mapeo continuo, murió el interval.
- Reveals de panel vía `containerAnimation:hTween` con start 'left 88%'.
- Rail nav mapea `offsetLeft/maxX` al rango del ScrollTrigger vía
  `lenis.scrollTo`.
- Mobile (<901px) y reduced-motion: columna vertical con reveals
  normales, rotador fijo en última palabra — degradación diseñada.
- content.json con 10 paneles (phero/pcase×2/pstate/pexp/pstats/
  pstories/pjournal/pspeak/pfin), todos opcionales; tokens en `:root`;
  `.phx` placeholders; `will-change:transform` solo en `.track` ≥901px.

**Qué elevé:** el truco pasó de frágil a firme: un solo sistema de motion
con progreso compartido (track+progress+rotador), y la página vertical
mobile dejó de ser un dump.

**Paso 4:** momento memorable sí (todo el sitio es el pin); paneles con
anchos 48–92vw rompen el ritmo clónico; ratio 7.5:1; motion continuo en
R5, 2 easings, nada anima layout; robusto con titular ×2 y sin fotos.

**Verificación:** batchcheck W11 ovf 0 desktop+mobile. robust11:
REDUCED no-motion ok, 0 `.wr` ocultos, rotador en 3/3, track sin
transform · PIN track -3982px + progress 23% tras wheel · STRESS journal
fuera → 0 nodos, stories→3, 4 `.phx`, track 14861px, 0 errores ·
MOBILE ovf 0.

## 11 · v13-bennett — CERRADA

**Diagnóstico inicial:** brutalista B/N sólida de estructura, muerta de
motion: rollzones con `@keyframes rollup 14s infinite` desacoplados del
scroll, hover que animaba `padding-left` (layout), `transition:
font-weight` que saltaba entre instancias estáticas, un solo `.reveal`
IO, todas las secciones a 130px, copy 100% en HTML.

**Qué cambié:**
- R5a contra-rotación del ledger: los dos stacks del hero mapeados al
  progreso del hero en direcciones opuestas (izq sube, der baja, scrub
  1.2) — el infinito murió, el scroll ES el que gira los diales.
- R5b onda de peso: Inter Tight cargada como variable (wght 100..900);
  scrub del workroll recorre las filas con `wght = 400+320·campana(d)`
  vía `--w` por fila — la negrita viaja como cursor contable.
- Hover de filas: `translateX(22px)` en `.rin` interno (transform) +
  wght 700 con interpolación real de la variable.
- R3 hairline-draw: bordes de filas workroll/record dibujados con scaleX
  (`.ruled` + `.rline` inyectada); no-motion conserva el borde estático.
- Alturas tokenizadas: `--sec clamp(104,14vh,168)` · voices ×1.25 ·
  lets ×0.9 · inter 0. Mega de contacto sangra -3vw en desktop.
- Shell+loader: content.json con 7 secciones opcionales, label del
  workroll con contador automático "(0N)", `.phx` etiquetados,
  focus-visible en filas/botón/inputs.

**Qué elevé:** el momento del hero ahora pertenece al scroll y la lista
de disciplinas tiene el único efecto del catálogo basado en fuente
variable — identidad de libro mayor: diales + cursor de peso.

**Paso 4:** memorable sí (dial + onda); dark/light alternando con 3
alturas de sección; ratio 13.7:1; motion continuo en ambos R5; 2
easings; nada anima layout (translateX + font-variation); robusto.

**Verificación:** batchcheck W13 ovf 0 d+m. robust13: REDUCED nm ok,
0 ocultos, bordes estáticos intactos (6) · R5 stacks L -38.6% / R
-11.4% (opuestos), onda --w 400→674 · STRESS record fuera, rows 4 →
label "(04)", 3 phx, 2 cols, titular ×2, ovf 0, 0 errores · MOBILE ovf 0.

## 12 · v14-gareis — CERRADA

**Diagnóstico inicial:** portfolio gris competente pero intercambiable:
masonry ESTÁTICO (los push eran márgenes fijos), preloader con
setInterval como único gesto, `menuchip:hover` animando padding
(layout), dot de disponibilidad con blink infinito, 4 easings, copy en
HTML.

**Qué cambié:**
- R5 parallax a dos tiempos: cada pieza declara `par` (−1/0/+1) en
  content.json; scrub de la galería mapea `translateY = par·36px·(p−.5)·2`
  sobre el `.ph` interno (no pisa el settle del figure) — centrado en 0
  a mitad de galería. Los qrow van a par 0: citas estables entre fotos
  que derivan. Mobile y reduced: apagado (verificado).
- Preloader determinista: gsap 0→100 en 900ms expo.out + fade 400ms;
  no-motion → display:none.
- Blink infinito eliminado (dot estático); menuchip hover →
  translateY(-2px)+fondo (transform+paint); panel ya era transform.
- R3 hairline-draw en facts/record (bottom, + top de la primera fila).
- Alturas tokenizadas `--sec clamp(96,13vh,152)` · gal top ×0.4 · fin
  ×1.15. 2 easings.
- Shell+loader: galería declarativa {src,label,size,span,push,par} con
  numeración (0N) automática, qrows intercalables, `.phx` etiquetados,
  focus-visible, aria-expanded en el menú.

**Qué elevé:** el masonry dejó de ser maquetación y ganó profundidad —
las fotos derivan a contravelocidad mientras texto y captions quedan
estables; primer parallax del catálogo (mecanismo no repetido).

**Paso 4:** memorable sí (deriva diferencial); centrado solo en
hero/fin, galería y about asimétricos; ratio 12.6:1; motion continuo;
2 easings; nada anima layout; robusto.

**Verificación:** batchcheck W14 ovf 0 d+m. robust14: REDUCED nm, 0
ocultos, preloader ausente · PRE done n=100 · R5 ±0.17px en centro →
±19.9 → ±36px full en bordes (signos opuestos) · STRESS record fuera,
galería 4 sin fotos → 4 phx numerados (01)-(04), facts 3, lead ×2,
ovf 0, 0 errores · MOBILE ovf 0 + parallax off.

## 13 · v15-norris — CERRADA

**Diagnóstico inicial:** deportiva con energía en paleta (volt/olive +
Alfa Slab) pero no en movimiento: marquee `@keyframes 22s infinite`,
stats estáticos que pedían ser el golpe, `career .row:hover` animando
padding-left, preloader por setTimeout, hovers sin easing declarado,
copy en HTML.

**Qué cambié:**
- R5 odómetro: los stats renderizan cada dígito como carrete vertical
  `0-9+0` (11 celdas) en overflow hidden; scrub de la banda volt mapea
  el valor continuo — unidades giran rápido, decenas ceden solo cuando
  las unidades cruzan el 9 (matemática de cuentakilómetros real).
  Reduced/no-motion: dígitos planos en valor final.
- Marquee: keyframes muere → translateX −30% mapeado al paso del
  viewport (scrub 1.2).
- Career hover → translateX(16px) en `.rin`; R3 hairline-draw en filas
  (top + bottom de la última).
- Preloader volt determinista (gsap.delayedCall 900ms, expo.out);
  no-motion fuera.
- Tokens + 2 easings; alturas `--sec` estándar · stats ×0.85 · qband
  88vh. dcard focus-within = hover; botón active scale .97.
- Shell+loader: content.json con `<s>` para slab mixto, numeración de
  dcards automática, stats {val,pad,label}, `.phx` en hero/qband.

**Qué elevé:** los números por fin son el momento — la página acelera
hacia su telemetría con un mecanismo que ningún otro template usa.

**Paso 4:** memorable sí (odómetro); hero foto / banda volt / dark ink /
paper alternan; ratio 7.5:1; motion continuo; 2 easings; nada anima
layout; robusto.

**Verificación:** batchcheck W15 ovf 0 d+m. robust15: REDUCED nm, 0
ocultos, pre fuera, stat plano "27" · ODO aterriza exacto 27/06/02
(reels -2/-7, 0/-6, 0/-2 × STEP) · MQ -30% · STRESS qband fuera, hero
sin foto → phx, statement ×2, career 3, disc 3, stats 2, ovf 0, 0
errores · MOBILE ovf 0.

## 14 · v16-handx — CERRADA

**Diagnóstico inicial:** "La Experiencia Arce" con buenos detalles serif
(Cormorant + grain) pero ritmo constante: el momento del referente — el
journey de 4 días — era una lista estática con bordes; FAQ animaba
max-height (layout); un solo `.reveal` IO; sheads centrados en cadena;
copy en HTML.

**Qué cambié:**
- R5 libro de días pinneado (desktop): la sección se pinnea `n·80%` y
  los 4 días se convierten en paneles absolutos que crossfadean por
  cuartos — `f=clamp(p·n−.5)`, opacidad campana `1−d/.55`, deriva
  translateY ±18px, rail con fill scaleX continuo y contador "Day One…
  Four" (Cormorant Infant). Mobile (<901) y reduced: lista apilada
  original con reveals — degradación diseñada (verificado sin
  pin-spacer en mobile).
- FAQ: max-height muere → display-swap + fade 300ms transform;
  accesible (tabindex, role=button, aria-expanded, Enter/Espacio).
- Tokens (--sec, 2 easings), `html{overflow-x:clip}`, focus-visible
  global, `.phx` en hero/method, R3 hairline en method rows.
- Shell+loader: content.json con `<t>` = itálica tenue; journey.days
  EXACTO 3-5; access/voices/faq/method opcionales.
- Bug propio detectado en verificación visual: el parche de tokens
  rompió el selector `:root{` (página quedó clara) — reparado y
  re-verificado.

**Qué elevé:** el proceso dejó de ser decorativo: el journey es ahora
el tramo narrativo central con pin+progreso, un panel a la vez, como
pasar las páginas de un itinerario.

**Paso 4:** memorable sí (libro de días); mission centrada / journey
pinneado asimétrico / method split — no hay dos centrados seguidos con
el mismo tratamiento; ratio 97/18 = 5.4:1; motion continuo; 2 easings;
nada anima layout; robusto.

**Verificación:** batchcheck W16 ovf 0 d+m (×2, tras fix :root).
robust16: REDUCED nm, 0 ocultos, 4 días apilados visibles, rail fuera ·
BOOK Day One→Day Four crossfade (ops campana), fill scaleX .80 · FAQ
display-swap ok · STRESS faq fuera, days 3, hero/method sin foto → 2
phx, titular ×2, ovf 0, 0 errores · MOBILE ovf 0 sin pin.
