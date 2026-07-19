# PRINCIPLES — v20 "Vast" (rework)

## Diagnóstico (Paso 1)
- Premium espacial con buen aire pero motion uniforme: todo `.reveal`
  con la misma curva a la vez; anillo de la estación con `spin 90s
  infinite`; dot del foot con `blink infinite`; hero con keyframes hin.
- La mesa de disciplinas (systems, la sección con más carácter) es una
  tabla estática con "Active" impreso — la metáfora de mission-control
  no se ejecuta.
- Ratio ok: ghost 383 / body 15 = 25:1 (el mejor del catálogo).
- Un easing declarado pero 3 sistemas de animación. Copy en HTML.

## Identidad
Mission control quirúrgico: telemetría, monoespaciada, naranja de
alerta. EL momento: **la estación se enciende con el scroll** — el
anillo orbital gira como instrumento mapeado al progreso global, y la
mesa de sistemas arranca en Standby y va pasando a Active fila a fila
con el scrub, como un boot sequence.

## Grid y espacio
- Contenido 1400px (wrap); margen 40/22; breakpoint 960.
- Escala 8px. Alturas: `--sec clamp(104px,14vh,168px)` · station ×1.15
  top · metrics grafito compacto ×0.85. Nunca uniforme.
- Ruptura: ghost "Arce" 383px centrado tras la figura circular; el
  megamark 352px del foot corta con translateY(.12em).

## Tipografía
- Archivo + mono (var --mono). Escala: 11 / 12.5 / 14.5 / 15 (base) /
  19 / caption 32 / mission 68 / consult 58 / metrics 84 / hero 80 /
  ghost `clamp(160px,26vw,383px)` (**25:1**).
- lh: megamark .78 · body 1.55.

## Motion — catálogo CERRADO (5, 2 easings)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | hero-stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out (filas systems) |
| R4 | card-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out, stagger decreciente 90/70/55 |
| R5 | boot-sequence | rotate anillo + estados Standby→Active | — | scrub 1.2 | lineal |

- Easings: expo.out + quick(.33,1,.68,1) 200ms hovers. Un ticker.
- spin/blink/hin MUEREN. Dot del foot estático naranja.
- Hovers: trow fondo blanco .25s quick; card img scale 1.05 600ms
  --ease-out; nav cta fondo bone.

## Scrollytelling (R5)
- **Dial orbital**: el anillo dashed de la estación rota
  `rotate(p_global·360deg)` con el progreso de TODA la página (scrub
  .6) — un instrumento que registra el viaje completo.
- **Boot sequence**: scrub de `.systems` (`top 75% / bottom 60%`): cada
  fila k=clamp(p·n−i); opacity .35+.65k, idx se enciende naranja
  (color), y el estado cruza Standby→Active en k=.5 con su dot
  llenándose (scaleX continuo). Chained states con transición clara.
- Mobile: activo (barato). Reduced: anillo quieto, todo Active,
  opacity 1.

## Micro-interacciones
- trow: rest → hover fondo blanco 50% → focus-within igual. Cards de
  guías: img scale + meta naranja. Botones rest/hover/active/focus.
- prefers-reduced-motion implementado.

## Robustez (contrato)
- systems.rows EXACTO 4-8 (idx A-0N automático) · metrics EXACTO 2-3 ·
  updates.cards 0-3 (0 = fuera) · readout 3-6 pares · specs 3-6 ·
  foot.cols 2-3. Titular hero ≤ 48 chars ×2 probado. Fotos vacías →
  `.phx` etiquetado (círculo de estación incluido).
- Fetch absoluto `/v20-vast/content.json`.
