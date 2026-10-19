# Patrick Brant: la propuesta, lista y apagada

Fecha: 19 de octubre de 2026. Misma fórmula que la de Priya: una página de propuesta con la identidad de Ignite Yourself dentro del link de su preview, más un PDF. Va sin el *personal branding asset kit*.

**Decisión de Pablo:** que Brant vea primero su página. La propuesta queda lista pero **no se publica** hasta que él muestre interés.

## El ángulo

Su trayectoria es excepcional, pero hoy está dispersa y no es consistente entre fuentes. Según dónde se mire, tiene entre 120 y 175 patentes:

- LinkedIn dice "over 120";
- Purdue 2017, "over 125";
- TechConnect 2025–2026, "over 150";
- Marquis 2025, "175".

Marquis además pone su doctorado en Purdue, cuando es de Arizona.

Consolidarla en un solo registro, aprobado por él y con fuentes, le abre puertas concretas con cada audiencia:

- **Abogados de patentes:** encargos como perito.
- **Directores de I+D y transformadores:** asesoría.
- **Socios e inversores:** Molecular Joinery y el taponamiento de pozos.
- **Congresos, universidades y juntas:** invitaciones.

## Qué dice

1. **Portada:** "Thirty-seven years at ExxonMobil Chemical, more than 150 patents and a practice of your own, brought together in one authoritative record."
2. **01 Why now:** carta a Dr. Brant con el problema del registro disperso y la captura de su preview.
3. **02 What it opens:** las cuatro oportunidades, cerrando con "one version of the facts, approved by you".
4. **03 What's included:** investigación, narrativa y posicionamiento, contenido, identidad visual, diseño y desarrollo, y publicación en su dominio. Sin brand kit.
5. **04 Investment:**
   - USD 3,000 en dos pagos de USD 1,500, igual que Priya.
   - Dominio y primer año de hosting incluidos; sin suscripción mensual.
   - Tres pasos. El primero recoge lo que hay que preguntarle: qué cifras publicar, qué puede decir de ExxonMobil y a qué audiencias quiere llegar.
   - Firma Juanita, Ignite Yourself.

## Dónde está

- **Página:** `prospecting/brant/propuesta/web/index.html`, con sus `assets/` (fuentes, logos de IGY y `preview.jpg`). Fuera de `clients/`, así que Vercel no la publica.
- **PDF:** `prospecting/brant/propuesta/web/Ignite-Yourself-Proposal-Patrick-Brant.pdf`, de cinco páginas A4. Se regenera con `node prospecting/brant/propuesta/render-pdf.mjs` a partir de `propuesta/proposal-pdf.html`.

## Para activarla, cuando muestre interés

1. En `clients/jorge-arce/brant/content.json`, cambiar `"proposal": {"active": false, …}` a `true`.
2. Ejecutar `python3 tools/build-brant.py`. El generador:
   - copia la propuesta a `clients/jorge-arce/brant/proposal/`, que queda en igniteyourself.co/brant/proposal;
   - añade el botón fijo "Your proposal" abajo a la derecha;
   - añade el enlace "View your proposal →" en la nota de Ignite del pie;
   - deja en móvil espacio para que el botón no tape las cifras del header.
3. Commit, PR y merge: queda en vivo.

Para apagarla otra vez, volver a `false` y construir: el generador quita la carpeta y los accesos.

Antes de activarla, confirmar con Pablo el precio y la firma (se tomaron de la oferta de Priya).
