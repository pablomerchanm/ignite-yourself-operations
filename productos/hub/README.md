# Hub — cómo se produce

El «linktree sofisticado» de Ignite: la mini web del enlace de la bio. Qué es
como producto, para quién y a qué precio está en **[FICHA.md](FICHA.md)**.
Este archivo es el manual para hacer uno.

## Qué hay aquí

```
productos/hub/
├── FICHA.md             ← el producto: oferta, nicho, planes, proceso, pendientes
├── README.md            ← este manual
├── content.schema.md    ← el contrato de content.json (cada campo y sus límites)
├── plantilla/
│   ├── hub.css          ← estructura (no se toca por cliente)
│   ├── hub.js           ← medición, UTM, DM de Instagram, video, entrada en cascada
│   └── tokens.css       ← tokens de partida (la marca de cada cliente parte de aquí)
├── demo-programa/       ← creador con programa · registro bold · tablero
└── demo-autoridad/      ← autoridad · registro editorial · tablero

tools/build-hub.mjs      ← content.json → index.html (valida; sin dependencias)
tools/check-hub.mjs      ← control de calidad en Chromium (+ capturas)
```

Los hubs de propuesta para prospectos reales (Eugenia Robledo, Martín Mendoza, Cormac Hayden,
Greg LaVecchia, Iman Gadzhi) viven en `clients/jorge-arce/hub/<slug>/` y su estrategia en
**[casos/](casos/README.md)**.

Las dos demos son **personas ficticias** con fotos en hueco y enlaces a
`example.com`. Sirven para ver el sistema completo y para enseñarlo; no se
publican como caso.

## De dónde sale

De los cuatro hubs que ya hicimos a mano, y de lo que Pablo fue aprobando en ellos:

| Hub | Dónde | Qué aportó |
|---|---|---|
| Perdón Práctico `/links` | repo `ignite-yourself`, `perdonpractico/links.html` (doc: `docs/pp/DIOS-SIN-IGLESIA-WEB.md` §8.6–8.7) | Lógica de app: barra inferior con la acción principal, tarjetas con el título a dos tonos, DM que funciona dentro de Instagram, UTM hasta el checkout, la raíz del dominio abre el hub en el celular. La curaduría: «el hub no explica, dirige». |
| Mario Lignarolo `/links` | `clients/mario-lignarolo/public/links/` | El tablero (bento) en escritorio, el video con reproductor propio, la historia en una sola tarjeta con frases suyas. |
| Dr. Jorge Arce `/enlaces/arce` | `clients/jorge-arce/enlaces/arce/` («Private Index», jul 2026) | Las rutas agrupadas **por audiencia** como capítulos («For patients», «For referring colleagues», «The record»): el hub enruta según quién llega. |
| Adriana Mejía Cuartas `/links` | adrianamejiacuartas.com/links (publicado; su código no vive en este repo) | El registro editorial: retrato + cargos, la tarjeta «Nuevo», prensa con medio y año, afiliaciones con miniatura, monograma al pie. |

## Hacer un hub nuevo

1. **Brief (30 min).** Destinos (qué existe y a dónde lleva), **la acción
   principal** (una sola), las fotos que hay, la paleta y las fuentes, el
   registro (bold o editorial) y el dominio. Todo texto sale de lo que la
   persona ya dijo o aprobó.
2. **Copia la demo más cercana** a la carpeta donde se va a publicar (la del
   cliente, en este repo o en el suyo): `content.json`, `tokens.css`, `icon.svg`.
3. **Llena `content.json`** siguiendo `content.schema.md`. Máximo 12 tarjetas.
   Lo que falta, se deja como hueco (`"src": ""`) o pendiente (`"href": ""`):
   el build lo lista.
4. **Ajusta `tokens.css`**: la página, los seis tonos, la barra, las fuentes y
   el registro. Nada de diseño se toca fuera de ahí (si un cliente pide algo
   puntual, va en un `custom.css` en su carpeta; el build lo enlaza solo).
5. **Fotos** en `img/` de su carpeta: retrato 4:5 para el celular y recorte
   16:10 (`srcWide`) para la tarjeta grande en escritorio; persona a un lado y
   aire al otro.
6. **Build y control:**
   ```bash
   node tools/build-hub.mjs clients/<cliente>/links
   node tools/check-hub.mjs clients/<cliente>/links --shots /tmp/capturas
   ```
   El control revisa desbordes de 360 a 1440 px, textos que se salen de su
   tarjeta, errores de JS, un solo h1, alt, `rel=noopener`, la barra inferior,
   reduced-motion, la UTM hasta el checkout y el DM dentro de Instagram.
7. **Revisión con el cliente** en borrador (`noindex` + cinta), una ronda.
8. **Publicar:** `meta.draft: false` (el build se niega si quedan huecos o
   pendientes), build otra vez y despliegue.

## Reglas de curaduría (las de Perdón Práctico, 13–14 oct)

- **El hub no explica, dirige.** El detalle vive adentro (landing, checkout, web).
- **Una sola acción principal**, siempre a mano: la barra inferior en el
  celular y la tarjeta grande arriba. Dos acciones principales = ninguna.
- **Cada dato sale una sola vez** por página.
- **Cada tarjeta dice una cosa y lleva a un solo lugar.**
- **En las fotos, el texto va al lado de la persona, nunca encima.**
- **Los textos aprobados no se reescriben**; solo se recortan.
- **No se inventa nada:** ni credenciales, ni medios, ni cifras, ni testimonios.

## Medición

Cada clic lleva `data-track` (evento) y `data-loc` (qué tarjeta). `hub.js`
empuja `page_view` y cada clic a `window.dataLayer` (GTM/GA4 lo toman de ahí)
y, si el cliente conecta otra analítica, a `window.HUB.send(payload)`. El
snippet de analítica va en `meta.headHtml`. En `localhost` y `*.vercel.app`
los eventos salen también en la consola.

Los enlaces con `utm: true` (el checkout) se llevan la UTM de la visita; si
la visita no trae, la de `meta.utm`. Así la venta queda atribuida al hub.

## Publicar en el dominio del cliente

Lo normal es servir el hub en `/links` de su dominio y poner en la bio el
dominio a secas. Para que **la raíz abra el hub en el celular sin cambiar la
URL** (como perdonpractico.co), en el `vercel.json` del sitio:

```json
{
  "src": "^/$",
  "has": [
    { "type": "host", "value": { "inc": ["dominio.com", "www.dominio.com"] } },
    { "type": "header", "key": "user-agent", "value": ".*(Mobile|Android|iPhone|iPod|Instagram|FBAN|FBAV|FB_IAB).*" }
  ],
  "missing": [{ "type": "query", "key": "web" }],
  "dest": "/links/index.html"
}
```

Desde el computador la raíz sigue siendo la web; los enlaces del hub hacia la
web llevan `?web` para salir del hub en el celular. Si el hub se sirve en
`/links` sin barra final, pon `meta.base: "/links/"`.

## Cambiar la plantilla

`plantilla/` es la fuente de verdad. El build copia `hub.css` y `hub.js` a la
carpeta de cada hub en cada build, así que un arreglo aquí llega a todos los
clientes la próxima vez que se reconstruyen. `tokens.css` no se sobreescribe
nunca. Después de tocar la plantilla, reconstruye y revisa las dos demos.
