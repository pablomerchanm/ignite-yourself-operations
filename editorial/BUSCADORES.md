# igniteyourself.co en buscadores y en IA

Cómo está configurado el sitio para que Google, Bing y los asistentes de IA
(ChatGPT, Claude, Perplexity, Gemini, Copilot) encuentren lo público y no lo privado.

## Qué es público

Tres cosas: la **home** (`/`, que sirve `igy-mobius/`), **Insights** (`/insights`) y la
página de **The Authority Hub** (`/hub`, solo la página: los hubs de propuesta que viven
debajo, `/hub/<slug>`, son privados y llevan `noindex`).
Todo lo demás vive en el mismo dominio pero es privado o interno: previews de
clientes, conceptos de plantilla (`/v2`…`/v37-…`), versiones viejas de la home
(`/igy`, `/igy-v3`, `/igy2`…), documentos y PDF.

## Las tres capas

| Capa | Archivo | Qué hace |
|---|---|---|
| Rastreo | `clients/jorge-arce/robots.txt` | Buscadores y bots de IA: **lista blanca**, solo ven la home, Insights y los recursos que las pintan. El resto de bots (`*`) puede abrir los previews de clientes para que la tarjeta del enlace se vea bien en WhatsApp, LinkedIn o Slack. |
| Indexación | `clients/jorge-arce/vercel.json` → `headers` | Manda `X-Robots-Tag: noindex, nofollow` en todas las carpetas privadas y en cualquier `.md`, `.pdf` o `.json`, aunque la página no tenga su propia etiqueta. |
| Publicación | `clients/jorge-arce/.vercelignore` | Los `.md` (briefs, playbooks, direcciones de marca) no se suben a la web. |

### Al crear una carpeta nueva en `clients/jorge-arce/`

- **Preview de cliente o concepto (lo normal):** no hay que tocar `robots.txt`; la
  lista blanca ya lo deja fuera de buscadores e IA. Añade su nombre a la lista de
  `noindex` de `vercel.json` y pon `<meta name="robots" content="noindex, nofollow">`
  en su HTML.
- **Página pública nueva de Ignite** (p. ej. un `/about`): añade su `Allow:` en el
  primer grupo de `robots.txt`, inclúyela en `sitemap.xml` y en `llms.txt`, y dale
  título, descripción, canonical y datos estructurados como la home.

## Qué lee la IA

- `llms.txt`: resumen del estudio, la oferta vigente y la lista de Insights. El
  bloque de Insights lo actualiza `tools/build-insights.py`; el resto se edita a mano
  **solo** si cambia la oferta de la home.
- Los datos estructurados (JSON-LD) de la home: `Organization`, `Person` (fundador),
  `WebSite`, `Service` con precio y `FAQPage`. Los de Insights enlazan con la misma
  organización (`https://igniteyourself.co/#organization`).

## Después de publicar algo

1. **IndexNow** (Bing, Yandex, Seznam, Naver; Bing alimenta ChatGPT y Copilot):
   ```
   python3 tools/indexnow.py                         # todas las URLs del sitemap
   python3 tools/indexnow.py /insights/mi-articulo   # solo una
   ```
   Hazlo cuando Vercel ya haya publicado. La clave es el archivo `<32 hex>.txt` de la
   raíz del sitio; no lo borres ni lo renombres.
2. **Google Search Console** (Google no usa IndexNow): «Inspeccionar URL» →
   «Solicitar indexación».

## Configuración única (la hace Pablo)

1. **Google Search Console:** añadir la propiedad de dominio `igniteyourself.co`,
   verificarla con el registro TXT que da Google en el DNS (el DNS está en
   **Hostinger**, no en Vercel), y enviar `https://igniteyourself.co/sitemap.xml`.
   La home lleva además la etiqueta `google-site-verification` para la propiedad
   «Prefijo de la URL»: **no la borres**, o Google retira el acceso. Tampoco borres
   los TXT que ya hay en Hostinger (otra verificación de Google y el SPF del correo).
2. **Bing Webmaster Tools:** entrar con la cuenta de Google e importar el sitio desde
   Search Console (un clic). Ahí se ve también lo que llega por IndexNow.
3. **Perfiles oficiales:** cuando existan la página de empresa de Ignite Yourself
   en LinkedIn y el perfil de Pablo, añadir sus URL reales como `sameAs` en el
   `Organization` y en el `Person` de la home. Es lo que más ayuda a Google y a la IA
   a no confundir a Ignite Yourself con otros «Ignite Your…».

## Comprobar

```
curl -sI https://igniteyourself.co/v25-gecko | grep -i x-robots   # debe decir noindex
curl -s https://igniteyourself.co/robots.txt
```

Nada de esto garantiza posiciones ni menciones en ChatGPT: solo asegura que lo
público se pueda leer y entender, y que lo privado no aparezca.
