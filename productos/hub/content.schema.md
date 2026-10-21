# content.schema.md — contrato de `content.json` del Hub

Todo el contenido de un hub vive en `content.json`; la marca, en `tokens.css`.
`node tools/build-hub.mjs <carpeta>` valida el contenido y escribe `index.html`.
Si algo no cuadra, el build **para** y dice qué (✗); si solo conviene revisarlo,
avisa (!) y sigue.

Reglas globales:

- **Las tarjetas salen en el orden de `cards`.** En el tablero, el navegador
  rellena huecos (`grid-auto-flow: dense`), así que una tarjeta chica puede
  subir junto a una alta.
- **Un enlace con `"href": ""` es un enlace pendiente**: la tarjeta sale
  atenuada, no navega y en borrador lleva la etiqueta «Enlace pendiente».
  Si la tarjeta no lleva la clave `href`, no es un enlace.
- **Una foto con `"src": ""` es un hueco**: un bloque rayado que imprime su
  `label` («Retrato vertical 4:5, fondo liso…»). La lista de huecos es la
  lista de fotos que hay que pedir.
- **Con `meta.draft: false` el build se niega** a publicar si queda algún
  hueco de foto o algún enlace pendiente.
- Las rutas locales (`img/foto.jpg`) son relativas a la carpeta y tienen que
  existir. Las que empiezan por `http`, `/` o `#` se dejan como están.

---

## Objetos comunes

### `image`

```json
{ "src": "img/retrato.jpg", "srcWide": "img/retrato-wide.jpg", "alt": "…", "label": "Retrato vertical 4:5…", "focus": "70% 100%" }
```

| Campo | Qué es |
|---|---|
| `src` | La foto. Vacío = hueco. |
| `srcWide` | Opcional. Recorte horizontal para pantallas ≥ 42rem (la tarjeta grande en escritorio va 16:10; en el celular, 4:5). |
| `alt` | Texto alternativo. Vacío si la foto es decorativa y el texto de la tarjeta ya dice lo que es. |
| `label` | Qué foto hace falta. Solo se ve mientras `src` está vacío. |
| `focus` | `object-position` del recorte (`"50% 20%"`: la cara arriba). |
| `fade` | Solo en `feature`: `false` quita el fundido de la foto hacia el cuerpo de la tarjeta. |

### Tallas (`size`)

| Talla | Móvil (2 columnas) | Tablero en escritorio (4 columnas) |
|---|---|---|
| `half` | 1 columna | 1 columna |
| `tall` | 1 columna × 2 filas | 1 columna × 2 filas |
| `wide` | 2 columnas | 2 columnas |
| `full` | 2 columnas | 4 columnas |
| `big` | 2 columnas | 2 columnas × 2 filas |
| `xl` | 2 columnas | 3 columnas × 2 filas |

En el feed (`layout: "feed"`) todo vive en dos columnas de 44rem como máximo,
también en escritorio.

### Tonos (`tone`)

`0` a `6`. El `0` va sobre el fondo de la página, sin caja. Del `1` al `6`
son los seis tonos de `tokens.css` (fondo, texto, remate y, si se define,
filete). El botón de cada tarjeta toma el remate como fondo: no se elige
color de botón.

### El título a dos tonos

Casi todas las tarjetas llevan `title` + `accent`. El `accent` es el remate en
color (o en itálica, en el registro editorial):

- si el remate es solo un signo (`"."`, `"?"`), va pegado: «Respira 21**.**»;
- si es texto, va en su propia línea: «Respira antes / **de decidir.**»;
- `\n` dentro de `title` parte la línea donde uno quiere.

---

## Raíz

| Campo | Qué es |
|---|---|
| `meta.title` | **Obligatorio.** `<title>`. ≤ 60. Patrón: «Nombre — Categoría». |
| `meta.description` | **Obligatorio.** ≤ 160. |
| `meta.lang`, `meta.locale` | `"es"`, `"es_CO"`. Con `"en"` los textos de la interfaz (pendiente, reproducir, etiquetas para lectores de pantalla) salen en inglés. |
| `meta.siteName` | Nombre para compartir (Open Graph). |
| `meta.canonical`, `meta.image`, `meta.imageAlt` | URL pública del hub y la imagen para compartir (1200×630). |
| `meta.icon` | Favicon (ruta local o URL). |
| `meta.themeColor` | Color de la barra del navegador en el celular. |
| `meta.fonts` | URL de Google Fonts. Vacío si las fuentes van con `@font-face` en `tokens.css`. |
| `meta.base` | Prefijo de las rutas. `""` si el hub se sirve en su carpeta con barra final; `"/links/"` si se sirve en `/links` sin barra (Vercel con `cleanUrls`). |
| `meta.draft` | `true` (por defecto): `noindex` y una cinta arriba. `false` para publicar. |
| `meta.ribbon` | Texto de la cinta en borrador («Borrador», «Demo»). `false` la quita. |
| `meta.utm` | UTM por defecto de los enlaces con `utm: true`. Por defecto `utm_source=instagram&utm_medium=bio`. |
| `meta.page` | Valor de `page` en el evento `page_view`. Por defecto `links`. |
| `meta.headHtml` | HTML crudo al final del `<head>`: el snippet de analítica (GTM, GA4, Plausible). |
| `layout` | `"feed"` (una columna, como Perdón Práctico) o `"board"` (tablero, como Mario y Adriana). |
| `decor[]` | Glifos grandes de fondo: `{ "glyph": "ast", "at": "tr", "spin": true }`. `at`: `tr`, `tl`, `bl`, `br`. |
| `top` | Barra superior: `{ "wordmark", "href", "links": [{label, href}] }`. ≤ 2 enlaces. Opcional. |
| `bar` | Barra inferior del móvil: `{ "items": [{label, href, icon}], "cta": {text, href, utm} }`. ≤ 3 atajos; `cta.text` ≤ 18. Es **la acción principal**. |
| `footer` | `{ "name", "mark", "links": [{label, href}], "note" }`. `mark` es un monograma grande de línea (registro editorial). |

**Tokens que cambian el registro** (en `tokens.css`): `--title-case: uppercase` (titula en mayúscula),
`--btn-font` / `--btn-weight` (la letra de botones y píldoras; en registros serif, la sans),
`--acc-style: italic` (el remate en itálica), `--scale` (tamaño de los títulos grandes).

**Glifos** (`decor`, `tile.glyph`, `pills.items[].glyph`, `ticker.glyph`, `bar.items[].icon`):
`star`, `ast`, `diana`, `ojo`, `arco`, `circulo`, y los íconos `up`, `ne`, `e`, `chat`, `bag`, `play`.

---

## Tarjetas (`cards[]`)

Todas aceptan `type`, `id` (ancla y nombre en la medición; por defecto
`tipo-n`), `size`, `tone` y `track` (evento propio; si no, sale del destino:
`contact_click` para ig.me / wa.me / mailto, `social_click` para redes,
`nav_click` para anclas, `link_click` para lo demás).

### `intro` — quién es y la frase en grande
Talla `full` (o `wide`/`xl` en el tablero). Tono `0`.

| Campo | Qué es |
|---|---|
| `name`, `role`, `avatar.src`, `href` | La píldora de identidad (sin avatar, salen las iniciales). |
| `claim` + `accent` | La frase. Es el **h1** si es la primera intro/portrait. ≤ 60. |
| `sub` | Subtítulo en serif itálica. |
| `lines[]` | Líneas con filete debajo (cargos, credenciales) — registro editorial. |

Variante editorial: `claim` = el nombre, sin `name` (ver `demo-autoridad`).

### `portrait` — la foto manda
Talla `full`, `xl`, `big`, `tall`, `half`. `image`, y opcionales `kicker`,
`title` + `accent` (el nombre sobre la foto, con degradado), `sub`, `href`.
Sin `title` es solo la foto (el nombre va en la `intro` de al lado).
`ratio` (`"512:269"`) fija la proporción en todos los anchos: para una foto apaisada
con el nombre ya dentro, que en 4:5 se cortaría.

### `feature` — la oferta principal
Talla `full`, `xl`, `wide` o `big`. Con `"image": false` es solo texto y botón
(dos puertas lado a lado, como en Martín Mendoza). Una por hub, dos como mucho (la oferta y el 1:1).

| Campo | Qué es |
|---|---|
| `image` | Foto con la persona a un lado y aire al otro: **el título va al lado de la persona, nunca encima**. |
| `kicker`, `title` + `accent` | Título sobre la foto (≤ 28) o en el cuerpo con `"titleOn": "body"` (≤ 70). |
| `chips[]` | `{ "text": "En vivo", "live": true }` (con punto que late). |
| `sub`, `text`, `meta` | Subtítulo, una línea de texto, la línea de fechas. |
| `cta` | El botón: `{ text, href, utm, track }`. Sin flecha en el texto, la pone el build. |
| `alt` | Enlace secundario debajo: `{ text, href, utm }`. Con `utm: true` se mide como `checkout_click`. |
| `by` | Fuente al pie: `{ "text": "Revista…", "logo": { "src", "alt" } }`. |
| `href` | Destino de la foto (por defecto, el del botón). |

Compone según su ancho: angosta, foto 4:5 con el título arriba; desde
30rem, foto 16:10; desde 38rem, título en la mitad libre; desde 56rem (todo
el ancho del tablero), foto y texto lado a lado.

### `tile` — tarjeta chica de color
Talla `half` (o `wide`, `full`, `tall`). `kicker`, `title` + `accent` (≤ 40),
`text`, `href` (vacío = pendiente) y **uno** de:
`sticker` (`{ src, alt, label }`: foto de producto colgando, girada) o
`glyph` (forma grande que se sale por la esquina).
Opcional `art` (`"art/x.svg"` o `{ src, fit: "bottom" | "cover" | "right" }`): arte propio de la
marca detrás del texto (también en `story`). En una tarjeta chica, las palabras largas en
mayúscula no caben a 360 px: el control de calidad lo avisa.

### `photo` — foto a sangre
`image`, `kicker`, `title` + `accent`, `sub`, `href`, `play` (`true`: marca de video al
centro, para un reel que vive en Instagram). Talla `half`, `tall`
(la foto vertical junto a dos chicas), `wide`, `full`, `big`.

### `video` — reproductor propio
Talla `full`, `xl`, `wide`, `half`, `tall` o `big`.
`src` (mp4 local) **o** `youtube` (el id), `poster` (`{ src, label }`;
con YouTube sin póster se usa la miniatura), `ratio` (`"16:9"`, `"9:16"`,
`"4:5"`, `"1:1"`), `kicker` («Video · 2:26»), `title` + `accent`.
Sin `src` ni `youtube` sale como pendiente.

### `story` — la única tarjeta que se lee
`kicker`, `title` + `accent`, `lines[]` (frases en serif), `close` +
`closeAccent` (el cierre, con el final en color), `link` (`{ text, href }`).
Frases **textuales** de la persona: no se escriben por ella.

### `list` — índice, prensa o afiliaciones
`kicker`, `count` (`true`: el número de ítems a la derecha del encabezado),
`title` + `accent`, `variant` y `items[]`:

| `variant` | Ítem | Uso |
|---|---|---|
| `index` | `{ label, note, meta, href, n }` | Episodios, capítulos, encuentros. |
| `press` | `{ source, logo: {src, alt}, meta (año), label (titular), note, href }` | Prensa: medio y año arriba, titular, bajada. 2 columnas desde 40rem. |
| `people` | `{ thumb: {src}, label, note (rol), href }` | Afiliaciones, empresas, aliados. 3 columnas desde 44rem. |

Con tono `0` la lista va sobre la página, con filetes y sin caja (registro editorial).

### `rail` — carrusel horizontal
Series, episodios, guías, productos. Se sale por la derecha a propósito («hay más, desliza»).
`kicker`, `count`, `title` + `accent`, `ratio` de las miniaturas (`"4:5"` por defecto,
`"3:4"`, `"1:1"`, `"16:9"`), `wide` (`true`: miniaturas más anchas, para 16:9) e
`items[]` `{ image, title, sub, href, play }`. Tono `0` por defecto (va sobre la página).

### `pills` — botones sueltos
`label` (nombre del grupo para lectores de pantalla), `cols` (1–3; en
pantallas angostas siempre 1) e `items[]` `{ label, href, glyph, track }`.
El tono pinta las píldoras.

### `ticker` — cinta en movimiento
`items[]`, `glyph`, `speed` (segundos por vuelta). Es decorativa
(`aria-hidden`): no pongas ahí nada que no esté en otra tarjeta.
