# PRINCIPLES — v3 "Hanza" (rework)

## Diagnóstico (Paso 1)
- Momento: el mark Arce® 280px del hero (bueno) pero sin refuerzo; la cita
  del case study era el candidato natural a narrativa y estaba plana.
- One-note: todas las secciones al mismo volumen coral/uppercase; padding
  130/90 (2 alturas, aceptable); stagger uniforme nth-child .04–.52s
  (creciente LINEAL — contra la regla de decrecimiento).
- Easing single (cubic-bezier(.2,.7,.2,1)) pero hovers con .3s default ease.
- Portabilidad cero. BUG heredado: caseband sin regla responsive (ovf 326px
  en mobile, tapado antes por overflow-x:hidden del body).

## Cambios clave
- R5 quote-scrub: la cita del case study se enciende palabra a palabra
  (dimw→blanco) con scrub 1.2 — leer al ritmo del scroll. Reduced: blanca.
- Ruptura única reforzada: el mark del hero cruza a la sección siguiente
  (margin-bottom -3vw, z-index 5).
- Catálogo cerrado: R1 rise 750 · R2 hero-stagger 120/80/60 decreciente ·
  R3 rule-draw (factrows/srows) · R4 img-settle + card-settle decreciente
  90→40 · R5 quote-scrub. 2 easings (expo.out / quick 200ms).
- Tokens de motion/espacio en :root; hovers a la curva quick; html
  overflow-x:clip + responsive del caseband (bug real arreglado).
- content.json completo (rich b/d/w/g/br), placeholders .phx por slot,
  secciones opcionales.

## Robustez (contrato)
- Hero lede ≤ 140 chars (×2 probado) · expertise 3–6 celdas · voices 3–9 ·
  journal 0–3 · speak rows 2–5 · case stats EXACTO 2.
- Fetch absoluto /v3-hanza/content.json.
