# Analítica y avisos de visita de los previews

**Desde:** 26 de octubre de 2026. Las visitas anteriores no quedaron registradas en ningún lado.

## Qué hay

1. **Vercel Web Analytics:** visitas por página, país, dispositivo y de dónde llegan. Son datos agregados, sin nombres.
   - Va en los 14 previews y en el sitio de Ignite (home e insights).
   - Se ve en Vercel → proyecto → **Analytics**.
2. **Aviso por correo:** cuando alguien abre un preview y lo deja a la vista al menos 3 segundos, le llega un correo a Pablo con:
   - la página;
   - la hora en Madrid y en la zona del visitante;
   - la ciudad aproximada, sacada de la IP;
   - el dispositivo;
   - de dónde llegó;
   - cuántas veces ha entrado desde ese dispositivo.

   Llega uno por pestaña y otro aparte si abre la propuesta (★).

## Cuándo no avisa

- **Escáneres de enlaces y robots:** no esperan los 3 segundos o se identifican como bots. Esto filtra los que revisan correos y las vistas previas de LinkedIn, WhatsApp o Slack.
- **Navegadores automatizados:** por ejemplo, el prerender.
- **Los navegadores de Pablo y del equipo:** basta abrir cualquier preview con `?soyyo` al final una vez en cada navegador. Por ejemplo, `https://igniteyourself.co/pettingill?soyyo`. Eso también los saca de Vercel Analytics. `?nosoyyo` lo deshace.
- **El PDF:** no se puede rastrear cuando se abre como adjunto del correo.

## Las piezas

| Pieza | Qué hace |
|---|---|
| `clients/jorge-arce/igy-visit.js` | El script del navegador. Espera los 3 segundos y avisa una vez por pestaña. |
| `clients/jorge-arce/api/visit.js` | La función de Vercel. Filtra bots y orígenes ajenos, y manda el correo con Resend. **Aquí está la lista de previews con el nombre de cada persona.** |
| `tools/tracking.py` | Inserta el bloque `<!-- igy:analytics -->` antes de `</head>`. Es idempotente. Los `build-*.py` lo llaman al final. Para las páginas hechas a mano: `python3 tools/tracking.py`. |

## Un preview nuevo

1. Añadir el slug a `PREVIEWS` en `tools/tracking.py`.
2. Añadir el slug y el nombre a `PEOPLE` en `clients/jorge-arce/api/visit.js`.
3. Si tiene build, terminarlo con `tracking.inject_tree(DST)`. Si no, correr `python3 tools/tracking.py <slug>`.

## Configuración en Vercel (una sola vez)

1. **Analytics:** activar **Web Analytics** en la pestaña Analytics del proyecto.
2. **Correo:**
   - Crear una cuenta en resend.com con el correo donde deben llegar los avisos.
   - En Resend, ir a API Keys → Create API Key.
   - En Vercel, ir a Settings → Environment Variables y agregar:
     - `RESEND_API_KEY` = la clave;
     - `ALERT_TO` = ese mismo correo.
   - Hacer Redeploy.
3. **Opcional:** verificar igniteyourself.co en Resend y poner `ALERT_FROM` = `Ignite Yourself <avisos@igniteyourself.co>`. Así los avisos pueden ir a cualquier correo, no solo al de la cuenta de Resend.

Sin `RESEND_API_KEY` no se manda nada. Cada visita queda como una línea `[igy-visit]` en los logs de Vercel.
