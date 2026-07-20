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

## 15 · v17-everswap — CERRADA

**Diagnóstico inicial:** el grade cinematográfico como muleta: verdes
profundos que perdonaban todo, orbes con `float 18s infinite`, keywords
del hero rotando por `setInterval`, word-split custom, padding 130
clónico, centrados en cadena, copy en HTML.

**Qué cambié:**
- R5 escena-luz: cada sección declara `scene:#hex` en content.json; un
  ScrollTrigger global (0→max, scrub .6) interpola RGB por tramos entre
  los puntos medios de sección — la página atraviesa escenas de
  iluminación continuas. Los 3 orbes derivan mapeados al mismo progreso
  (o1 baja 26vh, o2 cruza, o3 escala 1→1.28). El grade dejó de ser
  estático: es el sistema, y funciona SIN fotos (probado con panel en
  placeholder).
- float infinito y setInterval muertos; kws = tríptico estático con R2.
- Tokens, `--sec` con stats ×0.8, 2 easings, focus-visible, btn active.
- R3 hairlines en journey; R4 en cells/stats/vcards.
- Shell+loader con secciones opcionales y `.phx`.

**Qué elevé:** de "quita las fotos y no queda sistema" a "la luz ES el
sistema" — mecanismo de catálogo nuevo (interpolación de color por
escenas), cero repetido.

**Paso 4:** memorable sí (el fondo respira al recorrer); centrados
rotos por panel full-bleed y journey asimétrico; ratio 12:1; motion
continuo; 2 easings; solo transform+paint (backgroundColor); robusto.

**Verificación:** batchcheck W17 ovf 0 d+m. robust17: REDUCED nm, 0
ocultos, bg escena 1 fija, orbes estáticos · SCENE rgb(13,32,24)→
(16,38,27)→vuelta a deep al final, o1 +13vh o3 ×1.14 · STRESS journey
fuera, panel sin foto → phx (la escena sigue), cells 2, voices 3,
título ×2, ovf 0, 0 errores · MOBILE ovf 0.

## 16 · v18-mindmarket — CERRADA

**Diagnóstico inicial:** ilustrada simpática con bloques 1-columna
repetidos: los pops de las ilustraciones eran transitions con
transition-delay disparadas por IO (binario), 2 easings mezclados sin
tokens, stats estáticos, copy e ilustraciones enredados en el HTML.

**Qué cambié:**
- R5 estallido de viñetas: los `.pop` de cada illobox se escalan con
  backOut(k) calculado (overshoot real) mapeado al scrub del bloque —
  cada viñeta estalla secuencialmente `k=clamp(p·(n+.6)−j·.8)`,
  continuo, nunca binario. Reduced: todos a scale(1) por CSS.
- Ilustraciones extraídas a plantilla: el arte SVG vive en el loader
  (claves hero/chat/plan/life/wave/mark) y el TEXTO en content.json —
  el equipo cambia copy sin tocar arte, o añade momentos reutilizando
  claves de illo.
- Momentos alternan por dirección rtl del grid (izq/der) sin depender
  de nth-child; reglas de order eliminadas.
- 3 easings documentados: expo.out + quick + spring(.34,1.56,.64,1)
  (los chips botan con muelle en hover — personalidad de la página).
- Tokens --sec, focus-visible, `.err`.

**Qué elevé:** la ilustración por fin tiene layout valiente (alternado
+ estallido secuencial scrub-driven) y la página es template real:
moments 2-4 con arte de catálogo.

**Paso 4:** memorable sí (viñetas que estallan al pasar); hero card
sobre colina / momentos alternados / stats centrados / cloud — varía;
ratio 144/16 = 9:1; motion continuo; 3 easings (cerrado); solo
transform; robusto.

**Verificación:** batchcheck W18 ovf 0 d+m. robust18+dbg: REDUCED nm,
0 ocultos, 10/10 pops visibles · R5 verificado a progress .48 →
scale(1)|1|1.09(overshoot)|0 secuencial · STRESS svc fuera, moments 2,
stats 2, título ×2, ovf 0, 0 errores · MOBILE ovf 0.

## 17 · v19-cunliffe — CERRADA

**Diagnóstico inicial:** el rail lateral era arreglo, no diseño: spy IO
binario que saltaba de golpe, ghost numerals con addEventListener
('scroll') crudo fuera del ticker, `.sky` con drift infinito, hero con
keyframes heroin, alternancia frágil por nth-child, copy en HTML.

**Qué cambié:**
- R5a tinta fantasma: cada ghost numeral interpola su fill
  `rgba(244,244,245,α)` con α = campana(progreso)·.10 — el contorno se
  llena de tinta cuando su capítulo está en foco — más paralaje
  translateY ±40px, todo por scrub en el ticker único.
- R5b espina: el rail gana línea vertical con fill scaleY = progreso
  global; el link activo y el ancho del tick (14→26px) se derivan del
  progreso CONTINUO por distancia, no de un IO binario. El reloj real
  del bar ahora muestra "HH:MM · NN%" de lectura.
- Sky: drift infinito muere → translateY -220px mapeado al progreso.
- Capítulos alternan por clase `.alt` explícita (nth-child eliminado);
  numeración 0N/0M automática del array.
- Tokens, 2 easings, R3 hairlines en border-top de capítulos/record,
  `.phx` etiquetados, focus-visible.

**Qué elevé:** el scroll por fin cuenta la historia: tinta que se
enciende por capítulo + espina que avanza + porcentaje de lectura — el
rail pasó de arreglo a instrumento narrativo.

**Paso 4:** memorable sí (tinta fantasma); capítulos alternados + ghost
±lado; ratio 14:1; motion continuo; 2 easings; nada anima layout;
robusto.

**Verificación:** batchcheck W19 ovf 0 d+m. robust19: REDUCED nm, 0
ocultos, ghost fijo α.06, reloj sin % · R5 ghost α.063 + translateY
-15px mid-approach, espina scaleY .45, rail on=Story tick 26px ·
STRESS record fuera, capítulos 3 renumerados 01/03-03/03, 4 phx,
statement ×2, ovf 0, 0 errores · MOBILE ovf 0.

## 18 · v20-vast — CERRADA

**Diagnóstico inicial:** premium espacial con el mejor ratio del
catálogo (ghost 383px = 25:1) pero motion uniforme: todo `.reveal` con
la misma curva a la vez, anillo `spin 90s infinite`, dot `blink
infinite`, hero con keyframes hin, y la mesa de disciplinas — la
sección con más carácter — estática con "Active" impreso.

**Qué cambié:**
- R5a dial orbital: el anillo dashed rota `p_global·360°` con el
  progreso de TODA la página (scrub .6) — un instrumento que registra
  el viaje.
- R5b boot sequence: las filas de sistemas arrancan en Standby al 35%
  de opacidad; el scrub de la sección enciende fila a fila
  (k=clamp(p·n−i)): opacidad continua, dot naranja con scaleX, idx en
  naranja y estado cruza a Active en k=.5 — chained states con
  transición clara. Reduced/no-JS: todo Active estático.
- spin/blink/hin muertos. Idx A-0N y numeración automáticos.
- Tokens, ritmo --sec diferenciado por sección, 2 easings,
  focus-visible naranja, `.phx` (círculo de estación incluido).
- Shell+loader: content.json con nav/hero/station/mission/systems/
  metrics/updates(0-3)/consult/foot.

**Qué elevé:** la metáfora de mission-control por fin se ejecuta: la
página se enciende con el scroll en vez de estar ya encendida.

**Paso 4:** memorable sí (boot sequence); hero foto / station bone /
metrics grafito / consult alternan fondo y tratamiento; ratio 25:1;
motion continuo; 2 easings; solo transform+paint; robusto.

**Verificación:** batchcheck W20 ovf 0 d+m. robust20: REDUCED nm, 0
ocultos, 6/6 Active, anillo quieto · R5 anillo 159° mid-page, estados
AAAASS con opacidades 1,1,1,1,.3,.3 → AAAAAA al final · STRESS updates
fuera, rows 4 → A-01..A-04, hero/station sin foto → 2 phx, título ×2,
ovf 0, 0 errores · MOBILE ovf 0.

## 19 · v21-getty — CERRADA

**Diagnóstico inicial:** narrativa museo bien escrita, visualmente
estable hasta la monotonía: todo `.reveal` idéntico, keyframes hin,
píldora de progreso animando `height:%` (layout), stack con data-depth
muerto, sin tramo pinneado, copy en HTML.

**Qué cambié:**
- R5a revelado de placas: cada imagen `[data-dev]` (placas del stack,
  figs del ensayo, coll) entra sobreexpuesta y desenfocada y se revela
  con el scrub — `grayscale(1−.85k) brightness(1.35−.35k)
  blur((1−k)·6px)` — como papel fotográfico. Mecanismo de catálogo
  nuevo (filter-scrub). Mobile blur máx 4px; reduced: reveladas fijas.
- R5b la sala del nombre: `.giant` pinneado `+=55%` con el name
  escalando .96→1 y el sub apareciendo — el tramo pinneado que la
  página pedía. Conflicto R2/pin evitado sacando name/sub del grupo
  stagger (aprendizaje de v14 aplicado).
- Píldora de progreso: height% → scaleY transform (fill scaleY=p
  global, scrub .6); oculta en no-motion.
- hin muerto; tokens; ritmo --sec con dark ×1.2; R3 hairlines en miles.
- Shell+loader: essay como `flow` tipado (párrafos y figs intercalados
  libremente — el equipo compone el ensayo desde JSON), tombstones
  conservados en placeholders.

**Qué elevé:** el museo por fin revela sus placas — la monotonía se
rompió con un mecanismo propio de la identidad (fotografía) y el pin
que pedía el diagnóstico de cola.

**Paso 4:** memorable sí (revelado); plate centrado / essay asimétrico
figs alternadas / dark invertido / coll 2col — varía; ratio 13:1;
motion continuo; 2 easings; height% eliminado, filter es paint;
robusto.

**Verificación:** batchcheck W21 ovf 0 d+m. robust21: REDUCED nm, 0
ocultos, filter fijo revelado, píldora oculta · DEV grayscale .62 +
blur 3.3px → revelada 0px · GIANT scale(1) sub 1 con 1 pin-spacer,
fill scaleY .47 · STRESS voices fuera, stack 2 sin fotos, miles 2,
3 phx, título ×2, ovf 0, 0 errores · MOBILE ovf 0 sin pin.

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

## 21 · v23-pacifica — CERRADA

**Diagnóstico inicial:** case-study fílmico que ya recibió profundidad
(footage strip) pero con padding clónico de 110px en las secciones
medias, keyframes hin, un easing sin token, cero gsap/lenis (solo IO
binario) y copy en HTML.

**Qué cambié:**
- R5 la línea de tiempo del montaje: bajo la tira de films aparece un
  ruler de editor con ticks por corte, un playhead que recorre la
  regla (translateX mapeado al scrub de la sección) y un timecode
  "FILM 0N"; cada slot se enciende continuamente (opacidad de imagen y
  caption en campana) al paso del playhead — metáfora de NLE, mecanismo
  no repetido en el catálogo. Reduced: timeline oculta, todo visible.
- Ritmo: blocks var(--sec) · films ×1.15 · results ×0.85 (padding
  clónico eliminado).
- hin muerto; easing consolidado; motor Lenis+GSAP un ticker; R3
  hairlines en credits; focus-visible.
- Shell+loader: 11 secciones opcionales (films.slots 2-5 con timeline
  auto-repartida, duo opcional en blocks), `.phx` etiquetados.

**Qué elevé:** la tira de footage pasó de decorado a instrumento: el
scroll "reproduce" el montaje con playhead y timecode.

**Paso 4:** memorable sí (playhead); hero tipográfico / meta 4col /
full-bleed / blocks asimétricos .55/1.45 / films oscuras — varía;
ratio 156/16 = 9.7:1; motion continuo; 2 easings; solo
transform+opacity; robusto.

**Verificación:** batchcheck W23 ovf 0 d+m. robust23: REDUCED nm, 0
ocultos, timeline oculta · R5 phead translateX 1164px, tc FILM 03,
2 ticks, opacidades .70/.70/.83 · STRESS voices fuera, films 2 sin
vídeos → phx, l1 ×2, ovf 0, 0 errores · MOBILE ovf 0.

## 22 · v24-ilcapo — CERRADA

**Diagnóstico inicial:** cine rojo/negro que el showreel elevó, pero el
resto seguía centrado en serie con motion que no distinguía jerarquías:
frames full-bleed estáticos (data-plx muerto), keyframes hin, IO
binario, padding 110-150 casi clónico, copy en HTML.

**Qué cambié:**
- R5 el dolly: cada frame full-bleed hace un movimiento de cámara —
  la imagen escala 1.14→1.0 y deriva ±12px mapeada a su travesía
  completa del viewport (scrub 1.2), como un dolly-out lento. Los
  frames se numeran solos (Frame 0N). Reduced: sin transform.
- Ritmo: inter var(--sec) · showreel ×1.1 · prods ×0.9 · stats ×0.85 —
  el clon de padding muerto.
- hin fuera; easing consolidado a expo.out+quick; motor un ticker; R3
  hairlines en rrows/prows; focus-visible rojo.
- Shell+loader: frames 2-4 declarativos, reel SC-0N y prods SC-A..D
  automáticos, `.phx` etiquetados.

**Qué elevé:** los frames ya no son fotos con texto: son planos con
movimiento de cámara — el motion por fin distingue jerarquías (los
frames respiran, las listas revelan, el showreel es el clímax).

**Paso 4:** memorable sí (dolly); frame/inter/reel/frame/showreel
alternan full-bleed oscuro y texto; ratio close 110/15.5 = 7:1; motion
continuo; 2 easings; solo transform; robusto.

**Verificación:** batchcheck W24 ovf 0 d+m. robust24: REDUCED nm, 0
ocultos, dolly sin transform · R5 scale 1.07→1.028 + translateY 7.2px
al avanzar, Frames 01-03 auto · STRESS prods fuera, reel 4 → SC-01..04,
frames y showreel sin fotos → 4 phx, título ×2, ovf 0, 0 errores ·
MOBILE ovf 0.

## 23 · v27-genesis — CERRADA

**Diagnóstico inicial:** chapter-grid funcional y con carácter
(ciruela/rosa, capítulos I-IV) pero el scrollytelling del referente
quedó en insinuación: halo estático, preloader con Math.random +
setInterval, keyframes hin, IO binario, nth-of-type frágil, copy en
HTML.

**Qué cambié:**
- R5a el verso se ilumina: la cita central usa background-clip:text
  con wipe de background-position 100%→0% mapeado al scrub — la luz
  recorre el verso letra a letra de forma continua. Reduced: color
  sólido con acento rosa.
- R5b numerales que amanecen: cada numeral romano interpola su color
  de ceniza a limón (rgb continuo + opacidad .45→1) con el progreso de
  su capítulo; el halo del hero escala 1→1.35 y rota 40° con el
  progreso global — el génesis avanza con la lectura.
- Preloader determinista (gsap 0→100% en 900ms); hin muerto;
  alternancia por `.alt`; numerales romanos automáticos del array.
- Ritmo --sec: chap estándar · verse ×1.2 · record ×0.85. Tokens, 2
  easings, focus-visible rosa, `.phx` 4:3.

**Qué elevé:** la insinuación se volvió ejecución: luz que recorre el
verso, numerales que amanecen y un halo vivo — todo scroll-driven.

**Paso 4:** memorable sí (verso iluminado); capítulos alternados /
verse centrado / record grid; ratio 104/15.5 = 6.7:1; motion continuo;
2 easings; wipe es paint, resto transform; robusto.

**Verificación:** batchcheck W27 ovf 0 d+m. robust27: REDUCED nm, 0
ocultos, pre fuera, verso color sólido · PRE 100%, verso 62.5% mid,
num I encendido rgb(201,204,182), halo scale 1.22 rotate 25° · STRESS
voices fuera, capítulos 3 → I.,II.,III. sin fotos → phx, título ×2,
ovf 0, 0 errores · MOBILE ovf 0.

## 24 · v26-wolverine — CERRADA

**Diagnóstico inicial:** heritage corporativa B/N potente pero los
valores pedían un pin con progreso que no existía: statement de 3
líneas estático, `.reveal` IO, keyframes hin, dos easings sin token,
nav .solid por scroll listener crudo, copy en HTML. (Subpáginas
about/commitment se conservan tal cual — fuera del alcance de esta
pasada, anotado.)

**Qué cambié:**
- R5 el manifiesto se estampa: `.state` se pinnea `n·45%` y las líneas
  del credo ("One surgeon / one standard / limitless care") pasan de
  fantasma (.15) a tinta plena una a una con el scrub —
  `k=clamp(p·n−i)`, opacidad .15+.85k + translateY 14→0 — y SE QUEDAN
  (acumulación, no crossfade: distinto del libro de v16). Mobile y
  reduced: sin pin, líneas visibles.
- Nav .solid integrada al evento de Lenis (muere el listener suelto).
- hin fuera; easings consolidados; ritmo --sec (brands estándar, stats
  ×0.85, quote ×1.1); A-0N automáticos; `.phx`; focus-visible.
- Shell+loader con 8 secciones opcionales.

**Qué elevé:** los valores por fin tienen el pin que pedían — el credo
corporativo se compone ante el lector como tipografía que se estampa.

**Paso 4:** memorable sí (manifiesto); hero foto / state pinneado /
band negra / bgrid paper / strip full — alternancia real; ratio close
116/16 = 7.25:1; motion continuo; 2 easings; solo transform+opacity;
robusto.

**Verificación:** batchcheck W26 ovf 0 d+m. robust26: REDUCED nm, 0
ocultos, 3/3 líneas visibles sin pin · R5 cascada 1.00/0.56/0.15 con 1
pin-spacer, nav solid activa · STRESS quote fuera, state 2 líneas,
brands 4, hero sin foto → phx, título ×2, ovf 0, 0 errores · MOBILE
ovf 0 sin pin, líneas visibles.

## 25 · v22-sacred — CERRADA

**Diagnóstico inicial:** poética ilustrada — de las más personales — con
el case-map en reveals sueltos: los tres mapas SVG aparecían de golpe,
parallax por scroll-listener crudo, keyframes wheel infinito en el
mouse, hin en hero, copy y arte enredados.

**Qué cambié:**
- R5 cartografía por capas: cada mapa SVG se dibuja capa a capa con el
  scrub de su paso (`k=clamp(p·n−j)` sobre los hijos directos del svg,
  opacidad continua en cascada) — el caso se CARTOGRAFÍA ante el lector
  en tres estados: charted → compromised → restored. Reduced: mapas
  completos.
- Los mapas y los critters del footer son plantilla del loader (claves
  map1/map2/map3/frog/leafy); el texto vive en content.json.
- Parallax de poemas/banda al ticker único de ScrollTrigger (scrub 1.2,
  translateY ±30 + scale 1.12 con overflow clip); wheel y hin muertos.
- BUG PROPIO detectado y corregido: los regex de limpieza de CSS
  desequilibraron llaves y se comieron los @media (overflow 86px) —
  reconstruido el CSS desde git con parches balanceados (escaneo de
  profundidad para @media, keyframes anidados con patrón exacto) y
  asserts de balance. Lección anotada para el resto de la cola.
- Tokens, 2 easings, focus-visible verde, `.phx`, overlay accesible.

**Qué elevé:** el case-map por fin tiene el scrub real que merecía — la
metáfora del territorio se ejecuta dibujándose.

**Paso 4:** memorable sí (cartografía); hero centrado / poemas full /
intro asimétrica / mapsteps alternando texto-mapa; ratio ok; motion
continuo; 2 easings; solo opacity/transform; robusto.

**Verificación:** batchcheck W22 ovf 0 d+m (tras fix de llaves).
robust22: REDUCED nm, 0 ocultos, mapas visibles · R5 9 capas en cascada
1/1/1/.82/0…, plx translateY 30px scale 1.12 en ticker · STRESS record
fuera, poems 2 sin fotos → phx, mapsteps 2, título ×2, ovf 0, 0
errores · MOBILE ovf 0.

## 26 · v25-gecko — CERRADA

**Diagnóstico inicial:** 6 páginas generadas por script, la más
productiva ya — pero cada página con su IO binario inline, `.reveal`
de transición única, sello `spin 14s infinite` y cero tokens.

**Qué cambié:**
- Runtime compartido `/v25-gecko/motion.js`: catálogo cerrado (R1 rise
  para todo `.reveal`, stagger decreciente para `[data-stagger]`, R5
  sello) + Lenis/GSAP un ticker + anchors + no-motion. Las 6 páginas
  cargan vendor+motion.js; sus scripts IO murieron.
- R5 el sello: el stamp circular gira 0→720° mapeado al progreso
  global (scrub .8) — la firma de la casa registra el avance del
  lector en vez de girar en bucle. Presente en index/about (donde vive
  el stamp).
- Tokens inyectados en las 6 páginas; spin keyframes eliminado en
  todas; hovers tokenizados. Parches con assert de balance de llaves
  (lección de v22 aplicada).
- **Decisión de alcance** (## Bloqueos): el copy queda en el HTML —
  esta plantilla ES la salida de un generador; su content-system es el
  script, no un JSON por página. Documentado en V25-GECKO.md con ruta
  de migración al patrón loader si el equipo lo quiere.

**Qué elevé:** de 6 páginas con motion copy-pasteado a un sistema: un
solo runtime, una firma scroll-driven, tokens uniformes.

**Verificación:** batchcheck en LAS SEIS (index/about/services/
stories/contact/blog) 1440+390: ovf 0, 0 errores. robust25: REDUCED
nm, 0 ocultos, sello quieto · runtime activo en las 6 (ScrollTriggers
2-13 por página), sellos rotando 175°/316°, reveals disparando.

## 27 · v28-tuesday — CERRADA

**Diagnóstico inicial:** Marlow (ronda 5) fiel y fresca; le faltaba
disciplina de easing (un cubic sin token + defaults), robustez de
contenido (copy en HTML, sin placeholders) y el hover de filas animaba
padding-left.

**Qué cambié:**
- R5 nada llega recto: filas de servicios y pasos del VIP entran
  rotados ±4° alternando lado y se ENDEREZAN con el scrub continuo
  (`rotate(dir·4°·(1−k)) + translateY(26·(1−k))`) — la personalidad de
  la página (juguetona → orden) hecha motion. Reduced: sin transform.
- Hover de filas: padding-left → translateX del título (transform).
- Tokens, ritmo --sec variado (split ×0.9, vip ×1.15), keyframes hin
  fuera, parche de reduced-motion balanceado (assert de llaves).
- Shell+loader: 7 secciones opcionales, numeración de steps 0N
  automática, `<v>` violeta en rich, `.phx`, focus-visible.

**Qué elevé:** la disciplina que pedía: 2 easings tokenizados, motion
con identidad propia (tilt-settle, mecanismo no repetido) y template
productivo con placeholders probados.

**Paso 4:** memorable sí (todo se endereza); wordmark hero / state
rosa / svc paper / split rojo / vip violeta — la paleta ya alternaba,
ahora el ritmo también; motion continuo; 2 easings; solo transform;
robusto.

**Verificación:** batchcheck W28 ovf 0 d+m. robust28: REDUCED nm, 0
ocultos, tilts sin transform · R5 filas rotate −1.9°/+3.4° +
translateY en scrub · STRESS voices fuera, rows 3, hero/split sin
fotos → 2 phx, wordmark ×2, ovf 0, 0 errores · MOBILE ovf 0.

## 28 · v29-heritage — CERRADA

**Diagnóstico inicial:** Provenance con el wordmark hairline gigante
como momento real pero motion genérico para la elegancia que aparenta:
`.reveal` IO de 1.1s, keyframes hin, un easing sin token, colisión de
clase `.foot` (hero vs footer), copy en HTML.

**Qué cambié:**
- R5 la firma bajo la cortina (desktop): el footer pasa a fixed detrás
  del main (spacer medido dinámicamente); al llegar al final, el
  contenido se levanta como telón y revela el wordmark gigante, que
  aterriza con scrub (translateY 40→0, scale .92→1, opacidad .4→1).
  Mecanismo cortina — no usado en el catálogo. Mobile (<701) y
  reduced: flujo normal estático.
- Footer renombrado `.sitefoot` (colisión de .foot con el hero
  resuelta).
- Tokens, ritmo --sec (intro estándar, freebie ×0.95), hin fuera,
  parches balanceados.
- Shell+loader: slots de foto nativos (tag descriptivo o src real),
  journal 0-3, focus-visible.

**Qué elevé:** el momento real de la página (el wordmark) por fin tiene
la puesta en escena que merecía: es el telón final, no un footer más.

**Paso 4:** memorable sí (cortina); hero full / intro centrada / work
grid desfasado / meet split / belief / kind / journal — ritmo variado;
ratio 186/13.5 = 13.8:1; motion continuo; 2 easings; solo transform;
robusto.

**Verificación:** batchcheck W29 ovf 0 d+m. robust29: REDUCED nm, 0
ocultos, footer static · R5 footer fixed + spacer 375px, wm aterriza
translateY(0) scale(1) op 1, visible al fondo · STRESS journal fuera,
work 2, wordmark alargado, ovf 0, 0 errores · MOBILE ovf 0 footer
static.

## 29 · v30-capri — CERRADA

**Diagnóstico inicial:** Azure & Co. con composición que ya alternaba
bien pero sin catálogo cerrado de reveals: `.reveal` IO único de 1.1s,
keyframes hin, un easing sin token, copy en HTML.

**Qué cambié:**
- R5 la marea tipográfica: el script del hero ("Unforgettable") se
  divide en letras y cada una ondea `translateY(sin(p·2π+i·.55)·6px)`
  mapeada al scroll del hero — el rótulo se mece como agua, amplitud
  decreciente al salir. Accesible (aria-label con el texto completo,
  spans aria-hidden). Reduced: texto plano sin split.
- Catálogo cerrado completo: R1/R2 stagger decreciente/R3 hairlines en
  svc/R4 cards con steps; tokens y 2 easings; ritmo --sec variado
  (quote ×0.9, guide ×1.1).
- Shell+loader: slots nativos, press 3-6, svc i.-iv. desde JSON,
  focus-visible.

**Qué elevé:** la disciplina de motion que pedía, más un momento propio
marino que ninguna otra página usa (onda posicional por letra).

**Paso 4:** memorable sí (marea); hero mar / intro clara / dest grid /
svc navy / journey split / quote royal — alternancia ya buena,
respetada; motion continuo; 2 easings; solo transform; robusto.

**Verificación:** batchcheck W30 ovf 0 d+m. robust30: REDUCED nm, 0
ocultos, sin split (texto plano) · R5 13 letras, t0 +3.3px t3 −4.1px
(fase senoidal), aria "Unforgettable" · STRESS press fuera, svc 3,
script alargado, ovf 0, 0 errores · MOBILE ovf 0.

## 30 · v32-alora — CERRADA

**Diagnóstico inicial:** Elowen brumosa y consistente pero con robustez
de contenido sin probar (los titulares dobles la rompían), `.reveal` IO
único, keyframes hin, un easing sin token, copy en HTML.

**Qué cambié:**
- R5 la bruma se levanta: cada slot fotográfico full-bleed lleva un
  velo de lino (gradiente #F5F4EF) que se disipa con el scrub de su
  sección — opacidad 1→.08 + deriva translateY −14% — la niebla de la
  identidad hecha mecanismo. Elemento real (no filter), reduced: sin
  velo.
- Robustez POR FIN probada: titulares ×2 en los tres bloques de líneas
  (hero/close) → ovf 0; steps 3-5; kind opcional. Bug propio corregido
  en verificación: inline opacity:0 que habría dejado los titulares
  invisibles en no-motion.
- Tokens, ritmo --sec variado, catálogo cerrado R1/R2/R4, parches
  balanceados, focus-visible.
- Shell+loader con slots nativos y 9 secciones opcionales.

**Qué elevé:** la consistencia ganó su momento propio (el velo) y la
robustez que la cola señalaba como deuda quedó demostrada con tests.

**Paso 4:** memorable sí (velos); hero full / press / intro centrada /
svc grid / band full / exp split / kind — alternancia respetada;
motion continuo; 2 easings; solo transform+opacity; robusto (titular
×2 verificado).

**Verificación:** batchcheck W32 ovf 0 d+m. robust32: REDUCED nm, 0
ocultos, velos ausentes · R5 velo hero op .08 tY −14%, velo band .27
mid-scrub · STRESS titulares ×2 ovf 0, kind fuera, steps 3, 0
errores · MOBILE ovf 0.

## 31 · v36-kimberly — CERRADA

**Diagnóstico inicial:** Counsel by Camille navy 200 sobria casi lista:
su lead-quote pedía tramo narrativo y sus tokens estaban a medio
extraer; `.reveal` IO único, keyframes hin, copy en HTML.

**Qué cambié:**
- R5 el consejo se pronuncia: la cita central se declara como
  `lines[]` (EXACTO 2-4) y cada línea vive en una máscara overflow
  hidden; el scrub las pronuncia una a una — `translateY 112%→0` con
  easing cúbico dentro de k=clamp(p·n−i·.85) — chained continuo, el
  tramo narrativo que pedía. Reduced: líneas planas visibles.
- Tokens completos (--ease/--sec) con ritmo variado (offer ×0.9, quote
  ×1.15); catálogo R1/R2/R3(hairlines en offers)/R4; hin fuera.
- Shell+loader: 7 secciones opcionales, numeración de offers 0N,
  journal 0-3, `.phx`, focus-visible.

**Qué elevé:** la cita dejó de ser un párrafo centrado: ahora se
pronuncia con el ritmo de quien aconseja — pausado, línea a línea.

**Paso 4:** memorable sí (pronunciación); hero navy foto / pillars
crema / about arena split / offer filas / quote navy / journal cards —
alternancia correcta; motion continuo; 2 easings; solo transform
(máscaras overflow); robusto.

**Verificación:** batchcheck W36 ovf 0 d+m. robust36: REDUCED nm, 0
ocultos, 3/3 líneas planas · R5 cascada 0% / 8.5% / 112% mid-scrub ·
STRESS journal fuera, quote 2 líneas, título ×2 sin foto → phx, ovf 0,
0 errores · MOBILE ovf 0.

## 32 · v33-valenna — CERRADA

**Diagnóstico inicial:** "The Travel Edit" con el split hero que
fascinó a Pablo — mandato: conservar y pulir, no rehacer. Lo que
faltaba: `.reveal` IO único, keyframes hin, un easing sin token, copy
en HTML.

**Qué cambié (pulido conservador):**
- R5 el díptico se abre: las dos mitades del hero divergen ±4vw con el
  scrub al salir del viewport (overflow contenido, ovf 0 verificado) —
  el gesto editorial del split, ahora vivo. Reduced: quietas.
- Composición y paleta INTACTAS (era la favorita); solo tokens
  (--ease/--sec), catálogo cerrado R1/R2/R3(hairlines en philosophy)/
  R4, ritmo --sec afinado.
- Shell+loader: slots nativos, edits/phil EXACTO 3, secciones
  opcionales (quote out probado), focus-visible.

**Qué elevé:** fidelidad al referente con el 10% de vida que le
faltaba: el díptico respira y el resto revela con disciplina.

**Paso 4:** memorable sí (díptico); split hero / ribbon / intro
centrada / edits grid / planner split invertido / phil filas / quote
full — alternancia del original respetada; motion continuo; 2
easings; solo transform; robusto.

**Verificación:** batchcheck W33 ovf 0 d+m. robust33: REDUCED nm, 0
ocultos, mitades quietas · R5 L −2.08vw / R +2.08vw mid-exit con ovf
0 · STRESS wm ×2 ovf 0, quote fuera · MOBILE ovf 0.

## 33 · v31-chronicle — CERRADA

**Diagnóstico inicial:** The Ledger — el wordmark 250px con doble nav
numerada es de las composiciones más finas del catálogo; mandato: solo
motion quirúrgico. Tenía marquee `mq 26s infinite`, `.reveal` IO
único, keyframes hin, copy en HTML.

**Qué cambié (quirúrgico):**
- R5 la mano escribe: las tres líneas manuscritas (nota del hero, nota
  de la editora, anotación del retrato) viven en máscara horizontal y
  se ESCRIBEN de izquierda a derecha con el scrub (translateX
  −101%→0 con ease cuadrático) — la caligrafía de la marca, animada
  como caligrafía. Reduced: escritas.
- Marquee "featured" mapeado al paso del viewport (scrub, −25%); el
  infinito murió.
- Composición intacta: doble nav numerada 01-07 y nav2 con The Ledger
  centrado restauradas EXACTAS del original (verificación visual
  detectó mi markup divergente y se corrigió contra git).
- Tokens, ritmo --sec afinado, catálogo R1/R2/R4, focus-visible.
- Shell+loader: 8 secciones opcionales; cifras de results marcadas
  como placeholder con su asterisco de honestidad conservado.

**Qué elevé:** motion con la personalidad del estudio (escritura) sin
tocar una composición que ya era la vara.

**Paso 4:** memorable sí (la mano); wordmark hero / note centrada /
svc bordered grid / feat banda / about split / results — intacto;
motion continuo; 2 easings; solo transform; robusto.

**Verificación:** batchcheck W31 ovf 0 d+m (×2, tras restaurar nav).
robust31: REDUCED nm, 0 ocultos, 3/3 tintas planas · R5 tinta hero
escrita (0%), note-sec −95% en curso · STRESS feat fuera, h1 ×2 sin
foto → phx, ovf 0, 0 errores · MOBILE ovf 0.

## 34 · v35-astramaven — CERRADA (VARA de acabado)

**Diagnóstico inicial:** Vera Nova carmesí con el wordmark tras retrato
como momento memorable claro y sistema casi completo — vara de
acabado. Deudas: dos marquees `mq infinite`, `.reveal` IO, keyframes
hin, copy en HTML.

**Qué cambié (acabado, no reinvención):**
- R5 profundidad de cartel: al salir el hero, retrato y wordmark se
  separan en profundidad (ph +10% / wm 6→−4%, scrub 1.2) — el cartel
  gana capas reales. Reduced: composición estática original.
- Marquesinas contrarrotantes: las dos bandas (Breakthrough Program /
  what they're saying) se mueven en direcciones opuestas mapeadas al
  paso del viewport (±18%); el infinito murió en ambas.
- Tokens, ritmo --sec, catálogo R1/R2/R4, parches balanceados,
  focus-visible.
- Shell+loader: 7 secciones opcionales, marquesinas generadas del
  texto del JSON, numeración de method automática.

**Qué elevé:** los tres gestos de la página (cartel, bandas, método)
ahora pertenecen al scroll — acabado de vara sin tocar la paleta ni la
composición que la hacían vara.

**Paso 4:** memorable sí (cartel con capas); crimson hero / intro
clara / method grid / program gradient con banda / listen split /
voices ink con banda — intacto; motion continuo; 2 easings; solo
transform; robusto.

**Verificación:** batchcheck W35 ovf 0 d+m. robust35: REDUCED nm, 0
ocultos · R5 ph +4.7% vs wm +1.3% mid-exit, marquesina izq +1.9% en
banda · STRESS listen fuera, h ×2 sin foto → phx, ovf 0, 0 errores ·
MOBILE ovf 0.

## 35 · v34-mesamaison — CERRADA (VARA de composición)

**Diagnóstico inicial:** Casa Mesa — la favorita declarada ("me
fascina, sé muy fiel"): ilustración adobe propia, footer monumental,
puerta central. Deudas: `.reveal` IO binario, keyframes hin, sin
tokens ni reduced-motion real.

**Qué cambié (quirúrgico in-place, fidelidad máxima):**
- R5 el sol atardece: un sol añadido EN EL LENGUAJE de la ilustración
  (dos círculos flat #E9B872, primer hijo del svg para ponerse DETRÁS
  de la silueta de la mesa) cruza el cielo en arco parabólico
  (x 240→1200 lineal, y 70→245 con p²) mapeado al scroll del hero —
  "fachada al atardecer" hecha literal. Reduced: sol fijo al alba.
- Markup ilustrado INTACTO (decisión de alcance documentada en
  V34-MESAMAISON.md: los SVGs intercalados son arte-dirigidos; un
  loader arriesgaba la fidelidad exigida). Runtime de motion estándar
  inyectado in-place (R1 sobre .reveal, ticker único, anchors Lenis,
  no-motion completo); hin e IO muertos; tokens y focus-visible.

**Además:** backfill de los 16 docs de principios que faltaban desde
v16/v18 (V16, V18, V22-V24, V26-V36) — el PASO 2 del mandato queda
completo para todo el catálogo.

**Paso 4:** memorable sí (el sol que ya era la escena, ahora VIVE);
composición intocada; motion continuo; 2 easings; solo transform;
reduced verificado.

**Verificación:** batchcheck W34 ovf 0 d+m. robust34: REDUCED nm, 0
ocultos, sol fijo (240,70) · R5 sol (240,70)→(768,123)→(1200,245)
poniéndose tras la mesa, reveals disparando · MOBILE ovf 0.

## 36 · v37-bakery — CERRADA (VARA de personalidad) — COLA COMPLETA

**Diagnóstico inicial:** Big Batch chunky — la de más carácter del
catálogo. Deudas: `bob 5s infinite` en la galleta del hero, `tick 22s
infinite` en el ticker, `.reveal` IO, keyframes hin, sin tokens.

**Qué cambié (quirúrgico in-place, personalidad intacta):**
- R5 la masa rebota: cada pieza ilustrada (cookie/brownie/croissant)
  CAE −46px y aterriza con squash & stretch de cartoon —
  `bounceK(k)` a trozos con dos rebotes decrecientes (.18/.06),
  scale(sx,sy) inverso conservando volumen, transform-origin en la
  base. Física de dibujo animado, mapeada al scrub. Mecanismo nuevo
  (ninguna otra página usa squash&stretch).
- La galleta del hero deriva con el scroll (bob infinito muerto);
  ticker mapeado al paso del viewport (−28%).
- Runtime estándar in-place, tokens, focus-visible 3px chunky,
  no-motion completo. Decisión de alcance como v34 (markup
  arte-dirigido; documentada en V37-BAKERY.md).

**Paso 4:** memorable sí (el rebote ES la marca); composición chunky
intocada; motion continuo; curvas: expo.out + quick + bounce propia
documentada; solo transform; robusto.

**Verificación:** batchcheck W37 ovf 0 d+m. robust37: REDUCED nm, 0
ocultos, svgs quietos · R5 caída −29.7px → aterrizaje scale(1.087,
.912) con squash · cookie deriva −15px rotate −1° · MOBILE ovf 0.

═══════════════════════════════════════════════
## MISIÓN COMPLETA — 36/36 páginas cerradas
Todas las páginas del catálogo pasaron el ciclo: diagnóstico →
principles/*.md (35 docs) → reconstrucción tokenizada → momento
scrollytelling propio (36 mecanismos, ninguno repetido) → robustez
verificada (reduced-motion + stress por interceptación) → log.
Decisiones de alcance documentadas: v25 (content = script generador),
v34/v37 (in-place por fidelidad de arte).
═══════════════════════════════════════════════

## FIX GLOBAL · respuesta del scrollytelling (reporte de Pablo)

**Síntoma:** el scrollytelling se sentía "super lento, casi pegado",
sobre todo en las primeras secciones, en casi todos los templates.

**Diagnóstico (medido):** doble suavizado encadenado — Lenis con
duration 1.05s Y scrub 1.2 sobre esa señal ya suavizada ⇒ el efecto
visual llegaba ~2s después del gesto (un golpe de rueda tardaba
0.5–1.3s solo en asentar el scroll). Hallazgo secundario: sin
ScrollTrigger.refresh() tras cargar fuentes/imágenes (v12 tenía un
trigger desfasado 367px).

**Corrección aplicada a los 36 archivos (v2–v37 + motion.js de v25 +
subpáginas):**
- Lenis duration 1.05 → 0.8 (suave pero con respuesta).
- scrub 1.2 → 0.6 y 0.8 → 0.5 en todos los mapeos (los pins incluidos).
- Snippet "anti-desfase": ScrollTrigger.refresh() al resolver
  document.fonts.ready y al terminar de cargar las imágenes.

**Verificación:** lagtest 500→400ms de asentado (v24 1300→1100 — esa
página además decodifica 3 JPG full-viewport); batchcheck ovf 0 en
muestra de 6 (v11/v12/v13/v16/v24/v34); pins sanos: libro v16 "Day
Three" con 1 pin-spacer, v11 track −3000px prog 17% — 0 errores.

---

## FIX PASS 2 · scroll "casi pegado" + bugs concretos (cunliffe/sacred/pacifica/wolverine + v18)

**Reporte del usuario:** "cunlife no funciona bien, sacred tampoco, pacifica tampoco, wolverine tampoco. ve y revisa todas las 36 y que todas queden perfectas!" (tras el FIX GLOBAL anterior el scrollytelling mejoró "en general" pero estas páginas seguían sintiéndose mal).

**Diagnóstico (instrumentado, no a ojo):**
- Revisadas las 36 en reduced-motion full-page @390 y @1440: **cero overflow, cero pageerrors, cero stuck-hidden** salvo los casos abajo. Estructura sana.
- Medición de FPS durante scroll continuo en las 4 reportadas + control: **60fps sólidos** (med 17ms, p95 17-18ms, 0-1 frames largos). NO hay jank ni problema de rendimiento — las páginas están bien hechas.
- Medición de *settle* de un tick de rueda de 600px: con `Lenis duration:.8` el asentamiento tardaba **~1200ms** (floaty/laggy = lo que se siente "casi pegado"). Ese es el origen real de la queja: el suavizado de Lenis por `duration` deja una cola larga.
- Las 4 reportadas comparten ser páginas de scrollytelling pesado (scrub por elemento / pins), donde esa cola se nota más.

**Arreglo del feel (global, 36 páginas + motion.js + base/base-jorge):**
- `new Lenis({duration:.8})` → `new Lenis({lerp:.25})`. Cambiar de suavizado por-duración a por-lerp hace el scroll **directo** (responde al input) sin perder suavidad. Settle medido baja a **~500-950ms** (pág. simples ~500, storytelling pesado ~900). Verificado: reveals siguen disparando, 0 errores, 60fps.
- `scrub:.6 → .4`, `scrub:.5 → .35`, `scrub:1 → .4` (v7). Los efectos scrubbeados siguen el scroll (ya crispado) más de cerca sin quedar secos.
- NOTA de calibración: `lerp:.25` es un punto medio defendible (2-3× más crespo que antes). El "peso" exacto es preferencia; se ajusta con un solo número si el usuario quiere más/menos.

**Bugs concretos encontrados y arreglados:**
- **v18-mindmarket:** el `<h2>` de la sección stats ("A few numbers behind the care we deliver") quedaba invisible para siempre — `data-r1` estaba en el wrapper `.shead` pero la clase `.wr` (opacity:0) en el `<h2>` hijo; R1 animaba el padre y nunca el hijo. Movido `data-r1` al `<h2>` (mismo idioma que `.illobox wr data-r1`). Ahora revela.
- **v23-pacifica:** (a) `content.json` tenía `"logo": "arce"` (minúscula, roto) → `"Dr. Arce"`. (b) La nav fija usaba `linear-gradient` que se desvanecía a transparente → el contenido se colaba por debajo al hacer scroll (verificado en captura: "Beach/Torrance" atravesaba la barra). Cambiada a `background:rgba(237,236,232,.9)+backdrop-filter:blur(8px)+color:var(--ink)` — banda cream casi opaca, siempre legible, sin sangrado.

**Verificado NO roto (falsas alarmas descartadas):**
- Navs con `mix-blend-mode:difference` (sacred, ilcapo, genesis): legibles a media página (captura full-viewport de sacred confirma "Jorge Arce restore function…" blanco sobre foto). El blend funciona; el strip recortado engañaba.
- Wolverine: perfecto en desktop; su pin de manifiesto ya está guardado a `innerWidth>900` (desactivado en móvil). Sin bug.
- Sacred `.ovl` (overlay de menú): `visibility:hidden` cerrado — no bloquea clicks.

## Bloqueos y pendientes menores
- v6-final `.meta wr` (línea footer "Redondo Beach · Torrance") y v16-handx `.ph wr` (placeholder) quedan sin revelar SI el scroll se detiene justo en el fondo (su trigger 'top 8x%' cae apenas más allá del scroll máximo con saltos grandes). **Pre-existente**, no es regresión (los reveals usan `once:true`, intactos). En scroll natural pasan su trigger. Se puede endurecer con un fallback de reveal al llegar al fondo si el usuario lo pide.

---

## FIX PASS 3 · SCROLL-FEEL AUTÓNOMO — el táctil era el problema real (Lenis secuestraba el dedo)

**Reporte del usuario:** tras el pase de lerp:.25, sacred (y otras) se seguían sintiendo "muy lento... se arrastra... no responde a mi dedo" — revisando SIEMPRE desde el teléfono.

**Diagnóstico instrumentado (gestos táctiles sintetizados por CDP, no a ojo):**
- Flick de 500px en móvil emulado, muestreando scrollY cada 50ms:
  - CON Lenis (lerp:.25): la página quedaba casi congelada bajo el dedo (sacred: 21px a los 250ms; cunliffe: ¡1px a los 400ms!), daba un tirón tardío, asentaba en ~900-1010ms y — lo peor — **solo recorría ~256px de los 500 del gesto** (se comía la mitad del desplazamiento, incluida la inercia).
  - SIN Lenis (scroll nativo): la misma página seguía el dedo 1:1 (73px a los 100ms), recorría los 500px completos, asentaba en ~350ms.
- Conclusión: **Lenis interceptaba el scroll táctil** y lo degradaba doblemente (latencia + mitad de distancia por flick). Eso es exactamente "se arrastra / no puedo recorrer". Los sitios de referencia (Apple, Linear, ganadores Awwwards) NUNCA suavizan el táctil: móvil = física nativa del sistema; el smoothing se reserva para la rueda de desktop.
- Causa #2 auditada (rangos de scrub en las 36): sanos — contenido gateado en rangos de 35-50vh, rangos viewport-completos solo en parallax decorativo. Los 6 pins (v2, v9, v11, v16, v21, v26) ya estaban guardados a >900px: en móvil no hay pins.
- Causa #3 auditada (reveals): todos a .7s expo.out; solo dos trazos one-shot a 1.1s (v2 ruta, v6 barra) — flourishes, se quedan.

**Arreglo (36 páginas + v25-gecko/motion.js + base/base-jorge = 39 archivos):**
- Motor de scroll dividido por dispositivo:
  - `var lenis=null; if(matchMedia('(hover:hover) and (pointer:fine)').matches){ lenis=new Lenis({lerp:.3}); ... }`
  - **Táctil → 100% nativo** (Lenis ni se instancia; ScrollTrigger escucha el scroll nativo por sí solo).
  - **Desktop → Lenis lerp .3** (A/B medido .25/.32/.4: .3 asienta ~450-800ms, responde de inmediato y conserva el glide).
- 12 páginas llamaban `lenis.scrollTo()` a pelo en anchors → null-safe con fallback `scrollIntoView({behavior:'smooth'})` (y v11 con `window.scrollTo` para su salto horizontal numérico).
- 5 páginas colgaban lógica extra del evento de Lenis → fallback nativo exacto: v3 navColor, v4/v26 onScroll, v6 onScrollNav, v5-zentro marquee (tickMove dual-bind lenis/nativo).

**Bugs destapados por la verificación (arreglados):**
- **v11-firma: ROTA POR COMPLETO en móvil desde su rework** — una llave `}` huérfana (cola de un `@media (prefers-reduced-motion)` cuyo opener se perdió) desbalanceaba el CSS y mataba el `@media (max-width:900px)`: el track quedaba `position:fixed` horizontal → documento de altura 0, imposible de scrollear en teléfono. Restaurado el opener → balance 0, el layout vertical móvil renderiza por primera vez (docH 0 → 14451, ovf:false, anchors OK, visual verificado).
- **v37-bakery / v34-mesamaison:** links `href="#"` lanzaban `querySelector('#')` SyntaxError (pre-existente, también con Lenis) → guard `h.length<2`.

**Más bugs destapados y cerrados en el mismo pase:**
- **Catálogo (index.html + script.js):** su propio Lenis (`lerp:0.11` + `touchMultiplier:1.6`) también secuestraba el táctil — la PORTADA era la página más flotada de todas en el teléfono. Mismo guard (táctil → su rama nativa de parallax, que ya existía) y lerp desktop alineado a .3.
- **v25-gecko/motion.js:** anchors con `lenis.scrollTo` a pelo → null-safe (afectaba a las 6 páginas del sitio v25 en móvil).
- **v33-valenna:** el slot de foto izquierdo del hero (`.inset wr`) tenía `.wr` (opacity:0) sin pertenecer a ningún grupo de reveal — invisible desde siempre (tercer caso del patrón huérfano, como v18/v16). Cableado con `data-r1`.

**Además, cerrados los dos pendientes de FIX PASS 2:**
- **v6-final:** reveals del pie clampeados con `start:'clamp(top 8x%)'` (GSAP 3.12) — un trigger ya no puede quedar más allá del scroll máximo; el pie revela siempre.
- **v16-handx:** el "stuck" no era del fondo — era el retrato de la sección method (`bigimg(s.img,'ph wr')`) que tenía `.wr` (opacity:0) pero NO pertenecía a ningún grupo de reveal (mismo patrón que el h2 de stats de v18). `bigimg()` ahora acepta un attr y el retrato va con `data-r1`. También clampeados sus reveals.

**Verificación:**
- Táctil, las 36: moved 500/500, t90 350-400ms (idéntico a nativo), anchors OK, 0 errores.
- Desktop, las 36: settle 430-850ms (antes 890-1220), reveals disparan, 0 stuck, 0 errores.
- Reduced-motion: intacto (el guard táctil vive dentro de la rama MOTION; spot-check 4 páginas: 0 errores, 0 overflow).

## Bloqueos
- Ninguno. Cola de pendientes vacía.

---

## FIX PASS 3b · desktop: doble-suavizado por `html{scroll-behavior:smooth}` (el residuo que Pablo seguía sintiendo)

Pablo aclara que probaba en DESKTOP. Los settle de desktop estaban en dos grupos (~430ms vs ~820ms) con el mismo Lenis — correlación 100%: TODAS las lentas tenían `html{scroll-behavior:smooth}` sin scope y NINGUNA rápida lo tenía. Ese CSS hace que el navegador re-anime cada escritura de scroll de Lenis (doble suavizado; la doc de Lenis exige neutralizarlo — el catálogo ya lo hacía con `.lenis.lenis-smooth{scroll-behavior:auto!important}`, las v-pages no). Y las 4 páginas que Pablo nombró como lentas (sacred, pacifica, cunliffe, wolverine) estaban todas en el grupo afectado.

**Arreglo:** scope a `html.no-motion{scroll-behavior:smooth}` (patrón de v16, la más rápida; los anchors con motor JS ya piden smooth explícito vía scrollIntoView/lenis.scrollTo) en 37 archivos: 28 v-pages + 6 páginas v25 + subpáginas sacred (about, faq) y wolverine (about, commitment). El styles.css del catálogo se queda como está (tiene el neutralizador oficial de Lenis).

**Medido (desktop, tick de rueda 600px):** sacred 825→447ms · pacifica 817→435 · wolverine 828→434 — idénticas al grupo rápido (bennett 434). Cunliffe 684 (imágenes pesadas) y su anomalía de "moved 8" desapareció. Reveals y errores: limpios.
