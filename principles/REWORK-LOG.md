
## 35 · v34-mesamaison — CERRADA (VARA de composición)

**Diagnóstico inicial:** Casa Mesa — la favorita declarada ("me
fascina, sé muy fiel"): ilustración adobe propia, footer monumental,
puerta central. Deudas: `.reveal` IO binario, keyframes hin, sin
tokens ni reduced-motion real.

**Qué cambié (quirúrgico in-place, fidelidad máxima):**
- R5 el sol atardece: un sol añadido EN EL LENGUAJE de la ilustración
  (dos círculos flat #E9B872, primer hijo del svg para ponerse DETRÁS
  de la silueta de la mesa) cruza el cielo en arco parabólico
  (x 240→1200 lineal, y 70→245 con p²) mapeado al scroll del hero —
  "fachada al atardecer" hecha literal. Reduced: sol fijo al alba.
- Markup ilustrado INTACTO (decisión de alcance documentada en
  V34-MESAMAISON.md: los SVGs intercalados son arte-dirigidos; un
  loader arriesgaba la fidelidad exigida). Runtime de motion estándar
  inyectado in-place (R1 sobre .reveal, ticker único, anchors Lenis,
  no-motion completo); hin e IO muertos; tokens y focus-visible.

**Además:** backfill de los 16 docs de principios que faltaban desde
v16/v18 (V16, V18, V22-V24, V26-V36) — el PASO 2 del mandato queda
completo para todo el catálogo.

**Paso 4:** memorable sí (el sol que ya era la escena, ahora VIVE);
composición intocada; motion continuo; 2 easings; solo transform;
reduced verificado.

**Verificación:** batchcheck W34 ovf 0 d+m. robust34: REDUCED nm, 0
ocultos, sol fijo (240,70) · R5 sol (240,70)→(768,123)→(1200,245)
poniéndose tras la mesa, reveals disparando · MOBILE ovf 0.
