# PRINCIPLES — v8 "Luke" (rework)

## Diagnóstico (Paso 1)
- Momento: el nombre a 245px — único; después la página es una lista con
  hover. Aurora en loop infinito de 16s (decorativa). 7 paddings distintos
  sin sistema. FAQ no hay; portabilidad cero.

## Cambios clave
- R5 TOUR GUIADO: el progreso de scroll de la sección work avanza la fila
  activa (0→5) con crossfade del preview (450ms). El hover sigue mandando
  (modo manual 2.5s). La lista-con-hover pasó de estática a narrada.
- Aurora scroll-mapped: los blobs derivan con el progreso del hero
  (scrub 1.2), ya no loop infinito. Reduced: estática.
- Catálogo cerrado: R1 rise 750 · R2 hero-stagger 120/80/60 · R3 rule-draw ·
  R4 settle decreciente · R5 tour. 2 easings.
- Tokens en :root, content.json íntegro, placeholders .phx, html clip.

## Robustez (contrato)
- Hero intro ≤ 120 (×2 probado) · work rows 3–8 · skills cols EXACTO 3 ·
  voices 3–9 · journal 0–3 · misc rows 2–5.
- Fetch absoluto /v8-luke/content.json.
