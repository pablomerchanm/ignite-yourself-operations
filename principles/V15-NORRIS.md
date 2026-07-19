# PRINCIPLES — v15 "Norris" (rework)

## Diagnóstico (Paso 1)
- Momento: la paleta volt sobre olive — energía en color, no en
  composición ni movimiento. Marquee `@keyframes 22s infinite`
  desacoplado; stats estáticos que piden ser el golpe y no lo son.
- `career .row:hover{padding-left:16px}` ANIMA LAYOUT; preloader con
  setTimeout; `.reveal` IO genérico; dcard/vcard hovers sin easing
  declarado (default `ease`).
- Ratio ok: statement 106 / body 16 = 6.6:1; stats 120 → 7.5:1.
- Escala tipográfica correcta para el género (slab + grotesk); el
  problema es que nada se mueve con intención racing.
- Portabilidad cero.

## Identidad
La ficha de piloto: volt eléctrico, slab de dorsal, datos como
telemetría. EL momento: **los stats son un odómetro** — cada dígito es
un carrete vertical que rueda hasta su valor mapeado al scrub, como
cuentakilómetros analógico. La página "acelera" hacia sus números.

## Grid y espacio
- Contenido 1400px; margen 36/20; breakpoint 860/1080.
- Escala 8px. Tres alturas: `--sec clamp(104px,14vh,168px)` estándar ·
  stats ×0.85 (banda compacta volt) · qband min-height 88vh (foto
  full). Nunca uniforme.
- Ruptura: el statement del hero a 14ch rompe contra la foto
  luminosity; los dcard numbers en Alfa Slab con stroke al hover.

## Tipografía
- Hanken Grotesk + Alfa Slab One (display mixto vía `<s>` en rich()).
- Escala: 11.5 / 13 / 14.5 / 16 (base) / sub32 / mix h2 74 / mix h1 98 /
  statement `clamp(42px,7.3vw,106px)` (**6.6:1**) / stat
  `clamp(64px,8vw,120px)`.
- lh: statement 1.06 · mix .94 · stat .95 · body 1.5.

## Motion — catálogo CERRADO (5, 2 easings)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | hero-stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out (filas career) |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, stagger decreciente 90/70/55 |
| R5 | odómetro | translateY carretes de dígitos | — | scrub 1.2 | lineal |

- Easings: expo.out + quick(.33,1,.68,1) 200ms hovers. Un ticker.
- Marquee: keyframes muere → translateX mapeado al paso del viewport
  (scrub 1.2, −30% del track) — deriva mientras cruza pantalla.
- Preloader volt: panel sube a los 900ms (transform, expo.out);
  no-motion → fuera.
- Career hover: translateX(16px) en `.rin` (transform). Botón form:
  translateY(-2px) hover / scale .97 active. Hero img settle 1.03→1.

## Scrollytelling (R5)
- Cada stat renderiza sus dígitos como carretes `0-9+0` (11 celdas) en
  overflow hidden; scrub de `.stats` (`top 80% / top 35%`, scrub 1.2)
  mapea `v = valor·p` y cada carrete `translateY = −(v/10^k mod 10)·
  (100/11)%` — rodado continuo tipo cuentakilómetros, las unidades
  giran rápido, las decenas lentas.
- Mobile: activo (es transform puro y barato). Reduced/no-motion:
  dígitos planos estáticos en su valor final (sin carretes).

## Micro-interacciones
- dcard: rest → hover translateY(-6px)+sombra+num volt stroke (todas
  con --ease-quick 200-400ms) → focus-within igual que hover.
- vcard: borde volt + translateY(-4px). Nav mix-blend. Inputs focus
  borde volt + focus-visible outline.
- prefers-reduced-motion: implementado (no-motion completo).

## Robustez (contrato)
- career 3–6 filas · disc EXACTO 3–6 cards · voices 3–9 · stats
  EXACTO 2–3 (valores 0–999) · marq 4–10 términos · fmeta 2–4.
  Statement ≤ 40 chars ×2 probado. Fotos vacías → `.phx` etiquetado
  (hero y qband con ratio full-bleed).
- Fetch absoluto `/v15-norris/content.json`.
