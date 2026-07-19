# PRINCIPLES — v5 "Zentro" (rework)

## Diagnóstico (Paso 1)
- Momento: el display azul 120px se repite hasta gastarse; el ticker era un
  marquee en loop infinito (motion decorativo, no ligado a nada); el strip
  de 4 fotos del hero, desaprovechado.
- Paddings 130/95 (2 alturas, ok). 1 easing (ok) pero FAQ animaba max-height
  y el tick corría en linear infinito.
- Portabilidad cero.

## Cambios clave
- R5 ABANICO: el strip del hero se abre en abanico (translateX/Y + rotate
  por ficha, mapeado al progreso del hero con scrub 1.2). Mobile: estático.
- Ticker scroll-driven: se mueve al ritmo y dirección del scroll (velocity
  ×.45, wrap modular) — el gimmick pasó a interacción ligada a la lectura.
  Reduced: estático.
- Bandas full-bleed (cases): la imagen asienta 1.12→1 mapeada al progreso
  de la banda (scrub, ease none = mapeo directo).
- Catálogo cerrado: R1 rise 750 · R2 hero-stagger 120/80/60 · R3 rule-draw ·
  R4 settle decreciente 90→40 · R5 abanico. 2 easings. FAQ display-swap.
- Tokens en :root, content.json íntegro, placeholders .phx + adaptadores
  CSS por contenedor (bgw/ph2/thumbx), html overflow-x:clip.

## Robustez (contrato)
- Hero title ≤ 60 (×2 probado) · strip EXACTO 4 · cases EXACTO 2 · stats 3 ·
  services cards 2 · voices 3–9 · journal 0–3 · faq 2–6.
- Fetch absoluto /v5-zentro/content.json.
