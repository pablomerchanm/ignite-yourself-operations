# PRINCIPLES — v19 "Cunliffe" (rework)

## Diagnóstico (Paso 1)
- El rail lateral fue arreglo, no diseño: spy por IntersectionObserver
  binario (rootMargin mágico), ticks que saltan de golpe — el scroll no
  cuenta nada. Ghost numerals con parallax por `addEventListener
  ('scroll')` crudo (fuera del ticker); `.sky` con `drift` keyframes
  infinito; hero con `heroin` keyframes.
- 5 capítulos bien escritos con ghost 380px — el material narrativo ya
  existe, le falta el sistema que lo cuente.
- Ratio brutal ok: giant 216 / body 15 = 14:1.
- Un solo easing declarado pero animaciones repartidas en 3 sistemas.
  Copy en HTML. nth-child(even) frágil para alternar capítulos.

## Identidad
La novela nocturna: negro editorial, capítulos numerados, serif para
las líneas que respiran. EL momento: **la tinta fantasma** — cada ghost
numeral pasa de contorno hueco a tinta encendida según el progreso de
su capítulo (fill continuo), mientras la espina del rail se llena con
la historia. El scroll ES el narrador.

## Grid y espacio
- Contenido 1400px; margen 40/22; breakpoint 920.
- Escala 8px. Alturas: `--sec clamp(110px,15vh,170px)` capítulos ·
  interlude ×1.15 · about ×0.6 top (pegado al interlude) · contact
  ×1.25. Nunca uniforme.
- Ruptura: ghosts 380px sangrando ±10px fuera del viewport lateral,
  alternando lado por capítulo (clase `.alt` explícita, no nth-child).

## Tipografía
- Inter + serif var (--serif ya definida). Escala: 10.5 / 12 / 13 / 15
  (base) / statement 31 / interlude 68 / chapter h3 66 / contact 104 /
  giant `clamp(88px,15.4vw,216px)` (**14:1**) / ghost 380.
- lh: giant .82 · interlude 1.18 · body 1.6.

## Motion — catálogo CERRADO (5, 2 easings)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | hero-stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out (border-top de capítulos/record) |
| R4 | frame-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out (fotos + cells) |
| R5 | tinta fantasma + espina | color fill ghost, translateY ghost, scaleY espina | — | scrub 1.2 | lineal |

- Easings: expo.out + quick(.33,1,.68,1) 200ms hovers. Un ticker (el
  scroll listener crudo muere; todo pasa por ScrollTrigger).
- drift/heroin keyframes MUEREN. Sky: translateY mapeado al progreso
  global (deriva estelar scroll-driven, sutil).
- Reloj del bar: se conserva (es un reloj real, no motion) y gana el
  porcentaje de lectura: "HH:MM · NN%" — progreso continuo.

## Scrollytelling (R5)
- **Tinta**: por capítulo, scrub (`top 80% / bottom 45%`): el ghost
  interpola `color: rgba(244,244,245, α)` con α = campana(p)·.10 (el
  contorno se llena de tinta al estar en foco) + translateY paralaje
  −40px→40px continuo.
- **Espina**: el rail gana una línea vertical con fill scaleY = progreso
  global; el link activo se deriva del progreso continuo (no IO): el
  tick crece de 14→26px con la cercanía de su sección (mapeo continuo
  por distancia).
- Mobile: rail oculto (ya); tinta activa (barata). Reduced: ghosts a
  α .06 fijo, espina llena, reloj sin %.

## Micro-interacciones
- Rail: rest tick 14px → cercanía crece continuo → hover color →
  focus-visible outline. Burger decorativo fuera o funcional a rail.
- CTA capítulo 5 y teléfono: hover translateX(4px) flecha 200ms.
- prefers-reduced-motion implementado.

## Robustez (contrato)
- chapters EXACTO 3-6 (ghost numera 0N automático, `.alt` alterna) ·
  record cells EXACTO 2-3 · tags 3-6 · contact meta 2-4 · rail se
  genera de las secciones presentes. Titular capítulo ≤ 60 chars ×2
  probado. Fotos vacías → `.phx` etiquetado con cap.
- Fetch absoluto `/v19-cunliffe/content.json`.
