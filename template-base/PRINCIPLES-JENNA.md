# PRINCIPLES-JENNA — reglas numéricas reextraídas del referente

> Reextracción cuantitativa (Paso 2 del rediseño). Fuente: dump completo del
> home + JSON de configuración Showit parseado + 231KB de CSS embebido.
> Son **proporciones y timing genéricos** — nada de copy, assets ni paleta ajena.
> Complementa a SYSTEM-AUDIT.md (cualitativo); esto es la tabla de valores.

## 1 · Ritmo vertical (lienzo desktop 1200px · mobile 320px · breakpoint 768)

- Alturas de sección desktop (px): `286 · 967 · 1022 · 943 · 1714 · 304 · 875 ·
  989 · 1313 · 766 · 800 · 870 · 870 · 870 · 972 · 536 · 708 · 764 · 544 · 618`
- Mediana **870** ≈ 0.73× el ancho del lienzo ≈ 0.97× un viewport de 900.
- **La varianza es la regla**: el delta entre secciones consecutivas promedia
  ±30%; nunca hay tres alturas iguales seguidas salvo la escalera de ofertas
  (870×3, cadencia deliberada).
- Respiros = 30–55% del bloque denso vecino (304 tras 1714 → 0.18; 536 tras
  972 → 0.55). **Un respiro corto después del pico más denso, siempre.**
- Mobile NO es proporcional: recomposición a mano (536→935, 989→1209).
  Mediana mobile 630 ≈ 2× el ancho del lienzo 320.

## 2 · Ancho y márgenes

- Lienzo 1200. Offset lateral más común de elementos: **90px = 7.5% por lado**
  (moda clara; percentil 10 = 94px). Segundo cluster en 150–180px (12.5–15%)
  para bloques de lectura.
- Texto de lectura raramente supera **700px ≈ 58% del lienzo**.
- Full-bleed SOLO en bandas narrativas (splash) — 2 de 20 secciones.

## 3 · Escala tipográfica completa (px medidos, con lh y ls)

| Rol | Tamaños | line-height | letter-spacing | Caja |
|---|---|---|---|---|
| Micro-label | 9–11 | 1.2–2.0 | 0.1–0.2em | UPPER |
| Eyebrow | 12–13 | 1.3–1.8 | 0.15em | UPPER |
| Body | 14–16 | **1.8** | 0–0.05em | — |
| Sub | 18–23 | 1.2–1.4 | 0–0.03em | — |
| Head | 24–33 | 1.2 | 0 | — |
| Display | 45–66 | 1.0–1.2 | 0.05em si UPPER | mixto |
| Display XL | 76–94 | **1.0** | 0.05em | UPPER |
| Monumental | **150–165** | **0.9–1.2** | 0.02–0.05em | UPPER |

- Escalera de ratios: 16 → 21 (×1.3) → 29 (×1.4) → 45 (×1.55) → 94 (×2.1) →
  151 (×1.6). **Body → monumental ≈ 9.4 : 1.** La jerarquía real vive en ese
  salto, no en los pasos intermedios.
- Regla de tracking inverso: cuanto más pequeño el uppercase, más tracking
  (10px→0.2em · 13px→0.15em · 16px→0.05em · 45px+→0.02–0.05em).
- **lh < 1.0 en lo monumental** (0.9 a 151px): el display grande se compacta,
  el body respira (1.8). Los extremos se exageran en direcciones opuestas.

## 4 · Proporción de superficie por color (área = alto × sección, total 17.465px)

| Superficie | % del área |
|---|---|
| Tono de marca A | 24.4% |
| Tono de marca B (+variantes) | 23.0% |
| Oscuros (negro + carbón) | 24.2% |
| Blanco / papel | 17.5% |
| Tono de marca C | 7.4% |
| Acentos raros | <2% |

- **≈60% del área de página es superficie saturada.** El color no acentúa:
  ES el fondo. Ningún tramo neutro dura más de 2 secciones.
- No existe color de acento: el "acento" de una sección es otro tono del set.

## 5 · Imagen

- Retratos **3:4 y 4:5** con marco claro (aire polaroid). Thumbnails 1:1.
- Full-bleed solo en splash; ahí el fondo es **slideshow con crossfade 1.5s**
  (medido: `fadeIn/fadeOut d:1.5`), no imagen estática — la única "animación
  larga" de todo el sitio, reservada a las bandas narrativas.

## 6 · Motion (valores exactos del engine)

| Qué | Valor medido |
|---|---|
| Entradas por scroll | `fadeIn` **500ms**, solo opacidad — **147 de 147** elementos |
| Delay de entrada | **0** en 141/147; stagger solo en 6 elementos del hero: 0.2 · 0.2 · 0.4 · 0.4 · 0.5 · 1.0s |
| Crossfade de fondos splash | **1.5s** fadeIn/fadeOut |
| Hover | `all 300ms ease-in-out` ×4 · `border-color 300ms` ×4 · `all 200ms ease-in-out` ×2 — **nada >300ms**, solo color/opacidad |
| Transform en hover | **cero** (ni zoom ni lift) |
| Parallax / scrolljack / cursor custom | **cero** |

- Traducción genérica: presupuesto de entrada único ≤600ms por GRUPO de
  sección; stagger = privilegio del hero; una sola animación "lenta" (≈1.5s)
  permitida en toda la página, reservada al momento narrativo.

## 7 · Tratamientos de composición (contados en los 12 frames)

1. **Entrelazado** wordmark/retrato (texto detrás Y delante) — 1 vez, hero.
2. **Straddle**: cards cruzando el límite entre dos fondos — 2 veces.
3. Statement centrado — ~5 veces, **nunca dos seguidas**: siempre alterna con
   split 50/50 o grid de 3–4.
4. Split asimétrico con imagen dominante — ~4 veces.
5. Grid denso 3–4 columnas — 3 veces (magnets, blog, IG).
6. Objetos flotantes permanentes (pill nav, badge) — capa fija.

**Regla dura derivada: dos secciones consecutivas jamás repiten tratamiento,
y el momento de ruptura de retícula (entrelazado / straddle) aparece una sola
vez por pantalla de atención (~3 viewports).**
