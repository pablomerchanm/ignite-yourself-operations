# PRINCIPLES — v14 "Gareis" (rework)

## Diagnóstico (Paso 1)
- Momento: la galería masonry con offsets — pero es ESTÁTICA: los push
  son márgenes fijos, el scroll no los toca. El preloader-counter
  (setInterval 40ms) es el único gesto y muere al cargar.
- Secciones intercambiables entre sí: hero centrado → about → record →
  fin centrado; 110–120px clónicos.
- Ratio ok: bigname 164 / body 13 = 12.6:1.
- Motion roto: `.menuchip:hover{padding:16px 54px}` ANIMA PADDING; dot
  de disponibilidad con `blink infinite` (ambiente desacoplado); 4
  easings distintos; `.reveal` IO genérico 1s.
- Portabilidad cero.

## Identidad
Portfolio de fotógrafo en gris galería: la obra manda, la tipografía
susurra (11–13px + un solo estallido a 164px). EL momento: **la galería
respira a dos tiempos** — parallax diferencial por pieza mapeado al
scroll (las fotos con push viajan a contravelocidad), el masonry deja
de ser maquetación y se vuelve profundidad.

## Grid y espacio
- Contenido 1360px; margen 34/18; grid 12 col gap 30; breakpoint 860.
- Escala 8px. Tres alturas: `--sec clamp(96px,13vh,152px)` · gal top
  ×0.4 (la obra pega pronto) · fin ×1.15. Nunca uniforme.
- Ruptura: los push del masonry (70/130px) + parallax que los
  desplaza ±36px — la retícula se rompe EN movimiento.

## Tipografía
- Instrument Sans. Escala: 10.5 / 11 / 12.5 / 13 (base) / st20
  clamp(17,1.5vw,20) / preloader 110 / bigname
  `clamp(64px,11.4vw,164px)` (**12.6:1**).
- lh: bigname .9 · body 1.6. ls: u11 +.14em · name +.34em · big -.045em.

## Motion — catálogo CERRADO (5, 2 easings)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | hero-stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out (bordes about/record) |
| R4 | piece-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, stagger decreciente 90/70/55 |
| R5 | parallax-dos-tiempos | translateY por pieza | ±36px | scrub 1.2 | lineal |

- Easings: expo.out + quick(.33,1,.68,1) 200ms hovers. Un ticker.
- Preloader: contador 0→100 determinista con gsap (900ms, expo.out) +
  fade 400ms; no-motion → no existe (display:none).
- Dot disponibilidad: ESTÁTICO (el blink infinito muere — nada de
  ambiente desacoplado del scroll).
- menuchip hover: translateY(-2px) + fondo #333 (transform+paint, el
  padding queda quieto). Imagen hover scale 1.03 700ms.

## Scrollytelling (R5)
- Cada pieza declara `par` en content.json (−1 | 0 | +1); scrub de la
  galería completa (`top 80% / bottom 20%`, scrub 1.2) mapea
  `translateY = par · 36px · (p−.5)·2` — continuo, centrado en 0 a
  mitad de galería para que los caps queden alineados al salir.
- Los qrow (citas intercaladas) van a par 0: texto estable entre fotos
  que derivan.
- Mobile (1 columna) y reduced: parallax apagado, R4 normal.

## Micro-interacciones
- menuchip: rest → hover translateY+fondo (200ms quick) → active
  scale .97 → focus-visible outline. Panel abre 350ms
  (opacity+translateY, ya transform).
- Fotos: scale 1.03 en overflow hidden, 700ms expo.out.
- prefers-reduced-motion implementado (no-motion: preloader fuera,
  todo visible, parallax off).

## Robustez (contrato)
- Galería 4–9 piezas (cada una: src/label/cap/size/span/push/par),
  numeración (0N) automática · qrows 0–2 de EXACTO 3 citas · facts 3–6
  pares · record 2–6 filas · fin siempre. Hero lead ≤ 240 chars
  probado ×2. Fotos vacías → `.phx` etiquetado con ratio del slot.
- Fetch absoluto `/v14-gareis/content.json`.
