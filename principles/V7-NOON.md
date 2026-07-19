# PRINCIPLES — v7 "Noon" (rework)

## Diagnóstico (Paso 1)
- Momento: ninguno — el markline d1 del hero rozaba serlo pero cortado
  por overflow; secciones `padding:120px 0` uniforme; hover de filas con
  padding (layout); easings default `ease` .25–.8s sin sistema; texto y
  fotos hardcodeadas.

## Identidad
Anti-marketing: tinta/crema/óxido, mono DM, displays light tracking -.04em.
EL momento: **"la cuenta honesta"** — los contadores suben con el scroll
pero el 0 de "shortcuts" NO se mueve, y su label se subraya en rust al 85%.
La ruptura de retícula: el retrato del hero sangrado al borde derecho
full-bleed con degradado de tinta.

## Números
- Grid 1400px; gut clamp(20–40); breakpoints 900/800/700.
- Espacio base 8: --sec clamp(88,12vh,144) · banda stats ×0.7.
- Tipo ratio 1.333 base 17: mono .765 / body 1 / d3 2.5rem máx / d2 5.125 /
  d1 8.75rem (140px → 8.2:1 vs body). lh 1–1.28 displays, 1.5 body.
  ls -.04em displays, mono -.01em.
- Motion: R1 rise 700ms · R2 hero-stagger 110/75/55 · R3 rule-draw 800 ·
  R4 card-settle 700 stagger decreciente 90→40 · R5 cuenta honesta
  (scrub 1, sin pin; continuo; reduced = valores finales + subrayado).
  2 easings (expo.out / quick 200ms). Solo transform/opacity.
- Hover: cards translateY(-4px) + border; journal img scale 1.04 700ms;
  focus-visible rust.

## Robustez (contrato)
- Hero title ≤ 60 chars (probado ×2) · services 3–6 · cases 2–8 · stats
  EXACTO 4 (uno con zero:true) · speak rows 2–5 · journal 0–3 (0 = fuera).
- Fotos por slot ratio+label. Fetch absoluto /v7-noon/content.json.
