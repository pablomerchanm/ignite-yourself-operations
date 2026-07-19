# SYSTEM-AUDIT — Personal Brand Website (referencia: jennakutcher.com)

> **Metodología y confiabilidad.** No dependí de WebFetch. Descargué el HTML completo,
> lo rendericé offline con los assets reales del motor, y —hallazgo clave— el sitio es
> **Showit (engine 2.8.0)**: toda su configuración (geometría de secciones, estilos de
> texto, animaciones por elemento) vive en un JSON embebido de 80KB que parseé
> directamente. Los valores de tipografía, color, alturas de sección y animación son
> **medidos, no inferidos**. Lo único no verificable offline son interacciones en vivo
> (cursor, scroll suave); esos puntos van marcados **[inferido]**.
>
> Este documento describe la **lógica del sistema** en términos funcionales genéricos
> para construir un template original en Fase 2. No cataloga contenido.

---

## 1 · Arquitectura de secciones (arquetipos y trabajo persuasivo)

Secuencia real del home (24 bloques; alturas desktop medidas sobre lienzo de 1200px):

| # | Arquetipo funcional | Alto D | Trabajo persuasivo |
|---|---|---|---|
| 0 | **Announcement bar** (lead magnet urgente) | 286 | Captura de email antes de todo; tono "grito amistoso" con CTA pill. Descartable. |
| 1 | **Hero de identidad** | 967 | Nombre en display gigante ENTRELAZADO con el retrato (el texto pasa por detrás y por delante de la figura). Cero propuesta de valor: primero la persona, la marca ES el nombre. |
| 2 | **Segmentación** ("¿estás lista para…?") | 1022 | Autoidentificación del visitante por objetivo. Convierte tráfico frío en rutas. |
| 3 | **Quiz interactivo** (banda oscura) | 943 | Segunda segmentación gamificada. Fondo oscuro = cambio de energía. |
| 4 | **Galería de lead magnets** | **1714** ← la sección MÁS larga | El corazón comercial: el negocio es la lista de correo. Densidad máxima de cards. |
| 5 | **Quicklinks de magnets** | 304 | Respiro + índice rápido; refuerza el paso anterior. |
| 6 | **Splash narrativo** (banda de foto) | 875 | Pausa emocional; reconexión con la persona. |
| 7 | **Media property insignia** (podcast) | 989 | Autoridad por medio propio: cifras + suscripción. |
| 8 | **Grid de contenido** (blog/top posts) | 1313 | Autoridad por frescura; SEO; profundidad. |
| 9 | **Autoridad editorial** (libro + badges de prensa) | 766 | Prueba social institucional (sellos de bestseller) + CTA de compra. |
| 10–13 | **Escalera de ofertas** (4 cards de cursos, numeradas) | 800 + 870×3 | La cadencia se REPITE (mismo alto) → ritmo previsible tipo catálogo. Del problema barato al programa insignia. |
| 14–16 | **Lifestyle / favoritos / low-ticket** | 972, 536, 708 | Parasocial: la persona detrás; monetización ligera (presets, favoritos). |
| 17 | **Newsletter relacional** ("seamos pen pals") | 764 | Segunda captura de email con encuadre íntimo, no transaccional. |
| 18 | **Footer + grid social** | 544 + 618 | Sitemap + prueba social visual (Instagram). |

**Lógica persuasiva global:** identidad → segmentación → valor gratis (email) →
autoridad (medio, contenido, libro) → oferta → intimidad → email otra vez → social.
El email aparece **tres veces** (arriba, medio, abajo). Las secciones de venta nunca
van seguidas de otra venta: siempre hay un respiro narrativo entre bloques comerciales.

**Para el template:** cada arquetipo debe ser un partial opcional; la escalera de
ofertas debe soportar N cards con cadencia uniforme; el email-capture debe poder
inyectarse en 1–3 posiciones.

---

## 2 · Sistema de espaciado

Hallazgo estructural: Showit **no usa escala de padding** — es un sistema de lienzos
de alto fijo con elementos posicionados de forma absoluta. La "escala" real es la
distribución de alturas de sección:

- **Lienzo de diseño:** 1200px desktop · 320px mobile · breakpoint único en **768px**.
- **Alturas de sección desktop:** rango 286–1714; mediana ≈ **870**; el patrón dominante
  es ≈ 0.75–1.0 × viewport por sección.
- **Alturas mobile:** rango 275–1209; mediana ≈ 630. Mobile NO es proporcional:
  cada sección se recompone a mano (p. ej. 536→935 cuando una fila pasa a columna).
- **Respiros:** secciones cortas deliberadas (304, 536) intercaladas entre bloques densos.
- Márgenes laterales dentro del lienzo ≈ 40–80px según sección **[inferido de frames]**;
  contenido de texto raramente supera ~700px de ancho en bloques de lectura.

**Traducción a token-system para Fase 2:** base 8px; escala de sección
`--space-section: clamp(96px, 14vh, 160px)` + variante "breather" ≈ 40% de la normal;
max-width contenido 1200, max-width prosa 68ch; gutter 40/22 (D/M).

---

## 3 · Sistema tipográfico (estructura y proporciones)

Distribución medida de font-sizes en el CSS del sitio (px, desktop):

- **Micro/eyebrow:** 9–12 (uppercase, tracking alto) — 62 usos
- **Body:** 13–16 (cluster dominante: 13 y 16) — 90 usos
- **Sub-head:** 18–22 — 58 usos
- **Head:** 24–33 — 43 usos
- **Display:** 45 — 8 usos
- **Display XL (wordmark):** 94+ — 5 usos (el nombre en el hero escala aún más por transform del lienzo)

**Ratios de escala:** body(16) → subhead(21) → head(29) → display(45) → XL(94).
Factor entre niveles ≈ **1.35–1.55**, con un SALTO deliberado body→XL de ~6×:
la jerarquía no es una escala musical suave, es "conversacional + monumental".

**Line-height por rol (medido):** 1.2 en títulos (85 usos) · **1.8 en body** (80 usos)
· 1.4/1.6 intermedios. El body respira mucho más de lo habitual (1.8 ≈ voz relajada).

**Letter-spacing por rol (medido):** 0 en serif/display · escalera clara para
uppercase: **0.05em / 0.1em / 0.15em / 0.2em** según tamaño decreciente (más pequeño
= más tracking). Uppercase es un ROL (eyebrows, botones, labels: 157 usos), nunca
para títulos largos.

**Roles de fuente (estructura, 4 voces):**
1. **Serif editorial** (2 pesos: light/book) — display y títulos; la voz "elegante".
2. **Sans geométrica bold** — énfasis, botones, subrayados de énfasis; la voz "coach".
3. **Condensed uppercase** — headlines chunky puntuales; la voz "póster".
4. **Mono espaciada** — eyebrows y micro-labels; la voz "sistema".
La personalidad sale de MEZCLAR voces en una misma sección (serif + mono + sans),
no de una fuente estrella.

---

## 4 · Lógica de color

Paleta medida (roles, no receta):

- **Neutros:** tinta `#222/#2b2b2b` · blanco · papel cálido `#f2efe8`.
- **3 tonos de marca rotativos:** rosa empolvado `#eec3e5` · azul-periwinkle `#6579be`
  · naranja quemado `#eb6c2f`.
- **2 oscuros de contraste:** negro puro y gris-carbón `#222`.
- **Acentos raros (<2%):** amarillo `#f2dc53`, dorado `#e1bd5d`.

**El hallazgo importante:** no existe "color de acento" tradicional. El sistema es
**rotación seccional full-bleed** — cada sección toma UNO de los tonos de marca como
fondo completo, y el "acento" de esa sección es OTRO tono del mismo set (CTA rosa
sobre periwinkle, CTA amarillo sobre naranja). El texto es tinta o blanco por contraste.

**Proporción medida de secciones por fondo:** rosa ×4 · periwinkle ×4 · naranja ×3 ·
oscuro ×3 · blanco/papel ×3. Ningún tono domina: el color ES la separación de capítulos.

**Para el template:** roles semánticos `--surface-a/b/c` + `--dark` + `--paper`,
con regla de composición: el CTA de una superficie usa la superficie "vecina".

---

## 5 · Grid y composición

- **Base:** lienzo absoluto (no grid fluido). El template debe traducirlo a grid de 12
  con las MISMAS jugadas compositivas:
- **Alternancia:** secciones centradas simétricas (statements, escalera de ofertas) ↔
  splits 50/50 (narrativa) ↔ grids de 3–4 (magnets, blog, IG).
- **Rupturas de retícula medidas en frames:**
  - El wordmark del hero se ENTRELAZA con el retrato (texto detrás Y delante de la figura).
  - Cards que CRUZAN el límite entre dos fondos de sección (straddle) — p. ej. una card
    blanca a caballo entre banda naranja y banda blanca.
  - Elementos flotantes pequeños (badge/sello, hamburguesa pill) siempre visibles.
- **Imagen:** retratos 3:4 y 4:5 en cards con marco blanco (aire tipo polaroid);
  full-bleed solo en splashes narrativos; thumbnails cuadradas en grids.
  Esquinas mayormente rectas; los botones son pill.
- **Sellos/badges:** starbursts de prensa como objetos gráficos, en fila.

---

## 6 · Motion y micro-interacción (medido del engine)

**El hallazgo más importante de toda la auditoría:** el sitio se siente vivo por
COLOR y COMPOSICIÓN, no por motion. El presupuesto de animación es mínimo y uniforme:

**Entradas por scroll (147 elementos animados, configuración exacta del JSON):**
- Tipo: `fadeIn` — **solo opacidad**, sin translate. 147 de 147.
- Duración: **0.5s** — única en todo el sitio.
- Delay: **0** en 141 elementos; stagger escaso y manual en los 6 restantes
  (0.2 / 0.4 / 0.5 / 1.0s) reservado para composiciones del hero.
- Curva: la default del engine (animate.css 3.4 `fadeIn` con timing `ease`).
- Trigger: al entrar el bloque al viewport (engine revela por bloque, no por elemento).

**Hover (264 reglas medidas):**
- **Botón primario:** cambio de `background-color` al tono tinta `rgba(43,43,43,1)`,
  transición implícita del engine; **300ms ease-in-out** en las reglas custom.
- **Botón secundario (outline):** `border-color` y color del texto bajan a 70% de
  opacidad — `border-color ease-out 300ms`.
- **Links en texto:** `underline` + `opacity: 0.8`. Sin transformaciones.
- Transiciones globales medidas: `all 300ms ease-in-out` (×4), `border-color 300ms`,
  `all 200ms ease-in-out` (×2). **Nada supera 300ms.**
- Imágenes/cards: sin zoom ni lift en hover **[verificado: no hay reglas]** — la única
  affordance es el cursor pointer.

**Nav:** hamburguesa flotante (pill) fija, siempre visible; abre un overlay de menú a
pantalla completa (bloque propio del canvas). Announcement bar estática arriba.
Sin transición de nav al hacer scroll (no hay sticky que cambie de estado).

**Parallax / reveals complejos / cursor custom:** **ninguno detectado** en la
configuración del engine. Cursor nativo. Sin scroll-jacking; scroll nativo del browser.

**Principios a llevar a Fase 2 (no imitación):**
1. Un solo patrón de entrada, corto (≤ 600ms), aplicado con disciplina total.
2. Reveal por GRUPO de sección, no por elemento individual (excepto hero).
3. Stagger como excepción jerárquica (solo hero/composiciones), nunca como default.
4. Hover = cambio de color/opacidad a 200–300ms; jamás layout shift.
5. El motion nunca compite con el color: si la sección ya grita, la entrada susurra.
   (En Fase 2 usaremos GSAP+Lenis para dar una capa de suavidad premium — un fade+8px
   de rise máximo — manteniendo esta filosofía de contención.)

---

## 7 · Densidad y ritmo

Secuencia de alturas desktop leída como partitura (D = denso, R = respiro):

```
286 R → 967 D(hero) → 1022 D → 943 D → 1714 DD(pico: magnets) → 304 RR
→ 875 R(foto) → 989 D → 1313 D(grid) → 766 D → 800·870·870·870 (cadencia uniforme)
→ 972 D → 536 R → 708 D → 764 D → 544+618 (cierre)
```

- **Acelera** en el tramo comercial central (magnets → podcast → blog → libro):
  cuatro bloques densos casi seguidos, interrumpidos UNA vez por el quicklinks (304).
- **Pausa** siempre con foto full-bleed o sección corta antes de re-vender.
- **La cadencia repetida** (870×3 en la escalera de ofertas) baja la carga cognitiva
  justo donde se pide dinero: previsibilidad = confianza.
- **Cierra desacelerando:** lifestyle → newsletter íntima → footer. La última emoción
  no es "compra" sino "quedémonos en contacto".

**Regla de ritmo para el template:** máx. 2 bloques densos seguidos; todo bloque de
oferta hereda el alto del anterior; el pico de densidad se reserva para la sección
cuyo objetivo de negocio sea #1 en el brief del cliente.

---

## Anexo técnico
- Fuente de datos: HTML dump (425KB) + JSON de configuración Showit (80KB, parseado)
  + 7 bloques `<style>` embebidos (231KB CSS) + render offline con engine real
  (12 frames de scroll, desktop 1440×900).
- Página medida: home. Altura total renderizada: 16,062px.
- Puntos [inferido]: márgenes laterales internos del lienzo; comportamiento táctil
  del menú overlay en mobile.
