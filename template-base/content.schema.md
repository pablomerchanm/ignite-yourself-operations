# content.schema.md — contrato de `content.json`

Este documento define **cada campo** que el template entiende, con sus
restricciones (largos máximos, aspect ratios). Está escrito para que **otro
agente pueda poblar el template desde un brief de cliente** sin leer el código.

Reglas globales:

- **Todo** el texto y **toda** ruta de imagen viven aquí. El HTML no contiene
  contenido.
- Las secciones se renderizan **en el orden del array `sections`**. Para quitar
  una sección (p. ej. el cliente no tiene testimonios), **elimina su objeto**:
  el ritmo vertical no se rompe porque cada sección es autónoma.
- Cualquier tipo de sección puede repetirse (p. ej. dos `splash`).
- Los largos indicados son **máximos prácticos**, calibrados a la maqueta; si te
  pasas, el diseño no explota pero pierde ritmo. El copy placeholder de ejemplo
  en `content.json` ya refleja el largo real esperado — úsalo de vara de medir.

---

## Objetos comunes

### `image` (slot de foto)

```json
{ "src": "", "alt": "", "label": "retrato vertical 3:4, ambiente clínico", "ratio": "3:4", "tone": 1 }
```

| Campo | Tipo | Restricciones |
|---|---|---|
| `src` | string | Ruta relativa o URL. **Vacío = placeholder**: bloque de color sólido con el `label` impreso. |
| `alt` | string | Obligatorio cuando hay `src`. ≤ 125 caracteres. |
| `label` | string | Descripción del tipo de foto requerida (orientación + ratio + ambiente). Solo se muestra en modo placeholder. ≤ 90 caracteres. |
| `ratio` | string | `"3:4"`, `"4:5"`, `"1:1"`, `"16:9"`. Debe coincidir con el ratio real de la foto entregada (se recorta con `object-fit: cover`). |
| `tone` | number | `1`–`3`: tono del bloque placeholder (variedad visual). Irrelevante cuando hay `src`. |

**Ratios por rol (del sistema):** retratos `3:4` o `4:5` · covers/arte `1:1` ·
bandas narrativas `16:9` (se estira a 74vh) · thumbnails de artículos `1:1`.

### `cta` (botón)

```json
{ "text": "Agendar valoración", "href": "#footer" }
```

`text` ≤ 24 caracteres (uppercase pill; más largo se rompe en mobile).
`href`: ancla interna (`#id`), URL o `tel:`/`mailto:`.

### `surface` (fondo de sección)

Uno de: `"paper"` · `"a"` · `"b"` · `"c"` · `"dark"`.
Sistema de la auditoría: el color separa capítulos — **rota** las superficies;
nunca dos secciones de venta con la misma superficie seguidas. El CTA de cada
superficie usa automáticamente el tono "vecino" (no elijas color de botón).

---

## Raíz

| Campo | Restricciones |
|---|---|
| `meta.title` | ≤ 60 caracteres. Va al `<title>`. |
| `meta.description` | ≤ 155 caracteres. |
| `meta.lang` | Código ISO (`"es"`, `"en"`). |
| `brand.name` | Nombre completo. ≤ 30 caracteres (alimenta el wordmark del footer). |
| `brand.shortName` | Iniciales o marca corta. ≤ 6 caracteres. |
| `brand.wordmarkLines` | Array de **2 strings** (línea trasera / línea delantera del hero). Cada una ≤ 12 caracteres para sostener el tamaño XL. |
| `nav.label` | ≤ 8 caracteres. |
| `nav.links[]` | 3–6 items `{text ≤ 16, href}`. |
| `nav.meta[]` | 0–3 strings ≤ 30 (teléfono, ciudad). |

---

## Secciones (array `sections`)

Cada objeto lleva `"type"` + opcionales `"id"` (ancla) y `"surface"`.

### `announcement` — bar de anuncio (respiro)
| Campo | Restricciones |
|---|---|
| `text` | 1 línea, ≤ 110 caracteres. |
| `cta` | Opcional. |

### `hero` — identidad (wordmark entrelazado con retrato)
| Campo | Restricciones |
|---|---|
| `eyebrow` | ≤ 40 caracteres. |
| `portrait` | `image`, ratio `3:4` obligatorio. Fondo despejado: el nombre pasa por detrás Y por delante. |
| `sub` | 20–30 palabras (≤ 220 caracteres). |
| `cta` | Opcional. |

El wordmark sale de `brand.wordmarkLines` — no se declara aquí.

### `paths` — segmentación del visitante
| Campo | Restricciones |
|---|---|
| `eyebrow` / `title` | ≤ 40 / ≤ 60 caracteres. |
| `cards[]` | **2–4** items `{title ≤ 45, text ≤ 180, link{text ≤ 20, href}}`. |

### `featured` — galería densa (pico de densidad)
Resérvala para el **objetivo #1 de negocio** del brief (regla de ritmo).
| Campo | Restricciones |
|---|---|
| `eyebrow` / `title` / `lede` | ≤ 40 / ≤ 70 / ≤ 200 caracteres. |
| `items[]` | **3 o 6** items (grid de 3): `{image ratio 4:5, title ≤ 45, text ≤ 120, link}`. |
| `cta` | Opcional (botón ghost al final). |

### `splash` — banda narrativa full-bleed (respiro emocional)
| Campo | Restricciones |
|---|---|
| `eyebrow` | Opcional, ≤ 30. |
| `statement` | 8–12 palabras (≤ 90 caracteres). |
| `image` | `image`, ratio `16:9` (se estira a 74vh desktop / 58vh mobile). |

### `media` — autoridad por medio propio (straddle de dos fondos)
| Campo | Restricciones |
|---|---|
| `surfaceTop` / `surfaceBottom` | Superficies del split interno (la imagen cruza el límite). Usa `surfaceTop` = superficie de la sección anterior para el efecto straddle. |
| `eyebrow` / `title` | ≤ 40 / ≤ 70 caracteres. |
| `text` | ≤ 260 caracteres. |
| `image` | `image`, ratio `1:1`. |
| `stats[]` | 0–3 items `{num ≤ 8, label ≤ 16}`. |
| `cta` | Opcional. |

### `articles` — grid de contenido
| Campo | Restricciones |
|---|---|
| `items[]` | **3** items: `{image ratio 1:1, category ≤ 16, date ≤ 12, title ≤ 90, href}`. |
| `cta` | Opcional. |

### `credentials` — sellos de autoridad
Solo afirmaciones **verificables** (junta médica, años, sociedades). Nada inventado.
| Campo | Restricciones |
|---|---|
| `title` | 10–14 palabras (≤ 110 caracteres). |
| `badges[]` | **3–6** strings ≤ 40 caracteres (círculos de 132px). |

### `offers` — escalera de tratamientos/servicios
| Campo | Restricciones |
|---|---|
| `items[]` | **2–6** items. Cadencia uniforme automática (mismo alto de ritmo, split alternado). |
| `items[].num` | `"01"`, `"02"`… (2 dígitos). |
| `items[].title` | ≤ 40 caracteres. |
| `items[].tagline` | ≤ 80 caracteres. |
| `items[].text` | ≤ 300 caracteres (2–3 frases sin tecnicismos). |
| `items[].image` | `image`, ratio `4:5`. |
| `items[].cta` | Opcional. |

### `about` — la persona detrás
| Campo | Restricciones |
|---|---|
| `title` | ≤ 70 caracteres, primera persona. |
| `text` | 2 párrafos separados por **doble salto de línea** (`\n\n`), ≤ 550 caracteres total. |
| `images[]` | **2** items `image`, ratio `3:4` (collage con offset). |
| `cta` | Opcional. |

### `testimonials` — prueba social
Con consentimiento del paciente; concepto aprobado si es placeholder.
| Campo | Restricciones |
|---|---|
| `lead` | Opcional: `{quote ≤ 180, who ≤ 40}` (cita grande en serif itálica). |
| `items[]` | 0–3 items `{quote ≤ 220, who ≤ 40}`. |

### `newsletter` — captura relacional
| Campo | Restricciones |
|---|---|
| `title` | 6–10 palabras (≤ 70 caracteres), tono íntimo, jamás "suscríbete a mi newsletter". |
| `text` | ≤ 180 caracteres. |
| `placeholder` / `cta` | ≤ 24 / ≤ 16 caracteres. |
| `privacy` | ≤ 70 caracteres. |

### `footer` — cierre
| Campo | Restricciones |
|---|---|
| `about` | ≤ 180 caracteres. |
| `columns[]` | **2–3** items `{label ≤ 16, links[]{text ≤ 30, href}}` (más la columna de marca automática). |
| `legal[]` | 1–2 strings ≤ 70. |

El wordmark gigante recortado sale de `brand.name`.

---

## Receta de orden (ritmo de la auditoría)

Máximo 2 bloques densos seguidos; respiro (`splash` o `announcement`) antes de
re-vender; cerrar desacelerando (`about` → `newsletter` → `footer`). El orden
del `content.json` de ejemplo ya cumple la partitura — al quitar secciones,
verifica que no queden 3 densas consecutivas (`featured`, `media`, `articles`,
`offers` cuentan como densas).
