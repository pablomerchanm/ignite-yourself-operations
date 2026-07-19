# PRINCIPLES — v21 "Getty" (rework)

## Diagnóstico (Paso 1)
- Narrativa museo bien escrita, visualmente estable hasta la monotonía:
  todo `.reveal` IO idéntico, keyframes hin en hero, la píldora de
  progreso anima `height:%` (layout), stack del plate con data-depth
  sin usar. Pide un tramo pinneado que nunca llega.
- Ratio ok: name 207 / body 16 = 13:1. Fraunces + Inter correctos.
- Copy en HTML; sin placeholders; sin reduced-motion real (solo media
  query que apaga todo).

## Identidad
El ensayo de procedencia: museo B/N, placas fotográficas, pies de foto
como fichas de catálogo. EL momento: **las placas se revelan** — cada
fotografía del ensayo entra sobreexpuesta y desenfocada y se "revela"
(grayscale/brightness/blur→nítida) mapeada al scrub de su figura, como
papel fotográfico en el líquido. Y el nombre gigante se pinnea un tramo
corto mientras asienta su escala — la sala principal del museo.

## Grid y espacio
- Contenido 1180px; margen 40/22; breakpoint ~900.
- Escala 8px. Alturas: `--sec clamp(110px,15vh,170px)` essay/coll ·
  dark ×1.2 · voices top corto (20px, cuelga del coll). Nunca uniforme.
- Ruptura: stack del plate — tres placas rotadas ±2° solapadas; figs
  alternando left/right con tombstones a contra-lado.

## Tipografía
- Fraunces (serif display) + Inter. Escala: 13 / 14 / 16 (base) / lede
  42 / mile p 29 / plate t 138 / mile yr 104 / name
  `clamp(90px,15.8vw,207px)` (**13:1**).
- lh: name .92 · lede 1.34 · body 1.6.

## Motion — catálogo CERRADO (5, 2 easings)
| # | | Prop | Dist | Dur | Curva |
|---|---|---|---|---|---|
| R1 | rise | opacity+y | 18px | 700ms | expo.out |
| R2 | hero-stagger | opacity+y | 18px | 700ms | expo.out, 120/80/60ms decreciente |
| R3 | hairline-draw | scaleX 0→1 | — | 800ms | expo.out (miles/list/giant border) |
| R4 | fig-settle | opacity+y+scale(.988→1) | 14px | 700ms | expo.out |
| R5 | revelado | filter (grayscale/brightness/blur) + pin del name | — | scrub 1.2 | lineal |

- Easings: expo.out + quick(.33,1,.68,1) 200ms hovers. Un ticker.
- hin muere. Píldora de progreso: height% → scaleY transform.
- CTA hover: subrayado + translateX flecha 200ms.

## Scrollytelling (R5)
- **Revelado**: cada `[data-dev]` (figs del ensayo + placas del stack +
  foto del coll) mapea su progreso (`top 92% / top 40%`, scrub 1.2):
  `filter: grayscale(1−.85k) brightness(1.35−.35k) blur((1−k)·6px)` —
  la imagen emerge del papel. Reduced: reveladas fijas.
- **La sala del nombre**: `.giant` se pinnea `+=55%`; el name escala
  .96→1 y el sub aparece con el progreso — pin+progreso corto, el
  visitante se detiene ante la placa principal.
- Píldora: fill scaleY = progreso global (scrub .6).
- Mobile: revelado activo (blur máx 4px); pin del name desactivado
  <900 (fluye normal).

## Micro-interacciones
- CTA: rest subrayado hairline → hover offset+flecha → active .97 →
  focus-visible. Menu decorativo estático.
- prefers-reduced-motion implementado (no-motion completo).

## Robustez (contrato)
- essay: paras/figs libres intercalados (array tipado) · stack EXACTO
  2-3 placas · miles EXACTO 2-4 · list 4-8 items · voices 2-4 quotes.
  Titular hero ≤ 140 chars ×2 probado. Fotos vacías → `.phx` con
  tombstone conservado.
- Fetch absoluto `/v21-getty/content.json`.
