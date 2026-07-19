# PRINCIPLES — v9 "Holistic" (rework)

## Diagnóstico (Paso 1)
- Réplica framer sin pase de motion: reveals genéricos y cero scrollytelling
  pese a referente animado. 8 paddings distintos sin sistema declarado.
  2 easings casi idénticos conviviendo. Portabilidad cero.
- Las 5 señales (signs) — el corazón emocional — eran cards estáticas
  flotadas con data-float sin uso.

## Cambios clave
- R5 REPARTO: la sección signs pinneada (+130vh, scrub 1.2) — las 5 cartas
  salen barajadas desde el centro del campo a su posición natural (deltas
  medidos en runtime), cada una en su quinto del progreso con ease cúbico
  manual sobre el mapeo. Mobile/reduced: estáticas.
- Catálogo cerrado: R1 rise 750 · R2 hero-stagger 120/80/60 · R3 rule-draw ·
  R4 settle decreciente + img-settle · R5 reparto. 2 easings reales.
- Tokens en :root, content.json íntegro (rich a1/as/em), placeholders .phx,
  html overflow-x:clip.

## Robustez (contrato)
- Hero title ≤ 70 (×2 probado) · signs EXACTO 5 · expertise 3–6 · stories
  3–9 · journal 0–3 · speak rows 2–5.
- Fetch absoluto /v9-holistic/content.json.
