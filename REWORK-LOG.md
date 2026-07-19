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
