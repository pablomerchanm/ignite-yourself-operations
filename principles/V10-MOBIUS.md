# PRINCIPLES — v10 "Möbius" (rework)

## Diagnóstico (Paso 1)
- Ritmo plano: 8 paddings sin sistema; cards de voices/journal idénticas;
  photo band estática siendo la única full-bleed; 2 easings casi iguales.
  Portabilidad cero.

## Cambios clave
- R5 BANDA-EXPAND: la photo band pasa de inset 7% + radio 24px a full-bleed
  con clip-path mapeado al scroll (paint, no layout) — el gesto Apple-style
  como único momento. Reduced: full-bleed directa.
- Catálogo cerrado: R1 rise 750 · R2 hero-stagger 120/80/60 · R3 rule-draw
  (record) · R4 settle decreciente · R5 banda. 2 easings.
- Tokens en :root, content.json íntegro, placeholders .phx, overflow clip.

## Robustez (contrato)
- Hero intro ≤ 280 (×2 probado) · expertise EXACTO 3 grupos · bignums 3 ·
  record 3–5 · process EXACTO 5 · voices 3–9 · journal 0–3 · faq 3–5.
- Fetch absoluto /v10-mobius/content.json.
