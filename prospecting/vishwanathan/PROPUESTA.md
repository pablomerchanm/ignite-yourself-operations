# Priya Vishwanathan: la propuesta dentro del preview

Fecha: 19 de octubre de 2026. La oferta que Juanita le envió (Authority Platform, USD 3,000 en dos pagos de USD 1,500, con dominio, hosting del primer año y el *personal branding asset kit* sin costo adicional) vive ahora en el mismo link del preview, sin tocar su página.

## Dónde está

- **Página de la propuesta:** https://igniteyourself.co/vishwanathan/proposal (`clients/jorge-arce/vishwanathan/proposal/index.html`). Identidad de Ignite Yourself (naranja, logos IGY, Arimo e IBM Plex Mono), no la de Priya: es la capa de Ignite sobre su preview. `noindex, nofollow`.
- **PDF:** `proposal/Ignite-Yourself-Proposal-Priya-Vishwanathan.pdf`, descargable desde la página. Se regenera con `node prospecting/vishwanathan/propuesta/render-pdf.mjs` a partir de `propuesta/proposal-pdf.html`.
- **Entradas desde el preview:** un botón fijo "Your proposal" abajo a la derecha en las cinco páginas (`PROP_HTML` y `PROP_CSS` en `tools/build-vishwanathan.py`) y el enlace "View your proposal" en la franja "A concept by Ignite Yourself" del pie (`inquiry.igy.proposal` en `content.json`).

## Qué dice

Carta de Juanita, lo que incluye (investigación, narrativa y posicionamiento, contenido, identidad visual, diseño y desarrollo, publicación en su dominio), el kit de marca de regalo, la inversión y los dos pagos, sin suscripción mensual. Los tres pasos del proceso salen del mensaje que Juanita le envió el 16 de octubre; no se promete plazo. Para empezar: "simply reply to our message".

## Para quitarla

Borrar la carpeta `proposal/`, quitar `PROP_HTML` del `derive` y `inquiry.igy.proposal` del `content.json`, y volver a construir.
