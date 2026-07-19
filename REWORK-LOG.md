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
