# Casos — hubs de propuesta para prospectos

Cinco hubs hechos sobre la plantilla para personas reales, como pieza de
venta: «esto es lo que su enlace de la bio podría ser». Cada uno parte de su
**cliente ideal (ICP)**, no de una lista de enlaces: qué tiene que encontrar
quien llega desde Instagram, en qué orden y con qué acción.

**Estado:** propuestas, no aprobadas por nadie. `noindex` (meta + cabecera en
`vercel.json` + `robots.txt`) y una franja «Propuesta · Ignite Yourself»
arriba. No se publican como su página oficial ni se mandan sin revisar los
**[VERIFICAR]** de cada estrategia.

| Hub | Dónde | Registro | Acción principal | El hueco que cierra |
|---|---|---|---|---|
| [Eugenia Robledo](eugenia-robledo.md) | `/hub/eugenia-robledo` | editorial cálido · feed | **Trabajemos juntos** (DM) | Su bio lleva a una galería de VSCO: muestra el ojo, pero no convierte ni lleva a sus dos negocios. |
| [Martín Mendoza](martin-mendoza.md) | `/hub/martin-mendoza` | editorial oscuro · tablero | **Empezar un proyecto** (su formulario) | Su bio manda a un formulario de monday.com sin contexto; las marcas solo tienen un correo en texto. |
| [Cormac Hayden](cormac-hayden.md) | `/hub/cormac-hayden` | bold oscuro, mayúsculas · tablero | **Get Oasis — free** (App Store) | 142 mil seguidores y la bio lleva a cormac.so, que no vende Oasis ni dice qué es. |
| [Greg LaVecchia](greg-lavecchia.md) | `/hub/greg-lavecchia` | bold condensado, oro · tablero | **Subscribe** (YouTube) | Canal nuevo (ene 2026) y no encontramos cómo se queda con su audiencia: ni lista de correo ni oferta propia. |
| [Iman Gadzhi](iman-gadzhi.md) | `/hub/iman-gadzhi` | negro editorial · feed | **Save my free spot** (AI Income Challenge) | 3,1 millones en Instagram y **ningún enlace en la bio** (copia del 24 sep): su embudo vive solo en YouTube. |

Rutas publicadas tras fusionar a `main`: `igniteyourself.co/hub/<slug>`.
Antes, en el preview de Vercel de la rama.

## Cómo se pensó cada uno (el método)

1. **Quién llega y a qué** (ICP en orden): el que compra, el que contrata,
   la marca que paga, el que solo mira.
2. **El hueco:** qué pasa hoy con su enlace de la bio y qué se pierde.
3. **Una sola acción principal** (la barra del celular) y, como mucho, una
   puerta por cada ICP secundario.
4. **Prueba antes que promesa:** prensa, calificaciones, reconocimientos
   reales con su fuente; nada inventado.
5. **Sus palabras:** títulos y frases textuales de sus publicaciones, su web o
   su canal. Lo que es copy propuesto por nosotros está marcado en cada caso.
6. **Su línea gráfica**, no la nuestra: paleta y letra salen de su feed.

## Fotos

Salen de lo público de cada uno: miniaturas de su grid de Instagram (de las
capturas que pasó Pablo, con el ícono de reel/carrusel tapado), su web, sus
miniaturas de YouTube y fotos de producto de su marca. Son de baja
resolución: **para una versión real se piden los originales.**

Reconstruir uno: `node tools/build-hub.mjs clients/jorge-arce/hub/<slug>` y
`node tools/check-hub.mjs clients/jorge-arce/hub/<slug> --shots /tmp/capturas`.
