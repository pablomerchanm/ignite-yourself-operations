# Bernard Pettingill: la propuesta, encendida

Fecha: 26 de octubre de 2026. Misma fórmula que Priya y Brant: una página de propuesta con la identidad de Ignite Yourself dentro del link de su preview, más un PDF.

**Por qué ahora:** respondió al seguimiento de Pablo: "Pablo, that is really impressive, my friend. I am literally blown away." Pidió cambiar las cifras, poner su celular y "How do we proceed from here". Minutos después: "Please send pricing right away."

## Lo que pidió en la página

- **Cifras:** ahora dice que ha revisado **6,750 casos y 637 juicios en 39 estados, incluidas las Islas Vírgenes**. Antes la página mostraba 1,500+ / 550+ / 29 estados más USVI.
  - Home: 6,750 *Cases reviewed* · 637 *Trials* · 39 *States and territories, including the U.S. Virgin Islands*.
  - Testimony: "6,750 cases. *637 trials.*" y la descripción de la página.
  - El conteo propio del listado público (329 testimonios desde 2017) no cambia: mide otra cosa.
- **Celular:** (561) 346-7828, como "Cell", con enlace, antes del teléfono de oficina en la consulta de la home y en el pie de todas las páginas. El correo (biffpett@gmail.com) ya estaba.

## El ángulo

Su trayectoria es la que buscan los abogados, pero hoy está repartida en dos webs, un listado de 33 páginas, un CV en PDF y checklists que apuntan a un correo viejo, y las cifras no coinciden entre fuentes. Pedido de Pablo: dejar claro que **nada está fijo**. Fotos, textos y ángulo narrativo se ajustan con él hasta donde se sienta más cómodo y sea más estratégico. El precio incluye **todo el diseño, la creación de todas las imágenes y la web completa funcionando en su propio dominio**.

## Qué dice

1. **Portada:** "Four decades as a forensic economist, 6,750 cases and 637 trials, brought together in one record counsel can trust."
2. **01 Why now:** carta a Bernard (él firma así y le dice "my friend" a Pablo) con el registro disperso y la captura de su preview.
3. **02 What it opens:** retenciones de abogados, intake sin fricción para paralegales, un registro consistente cuando se examinan sus credenciales y encargos para Pettingill Analytics.
4. **03 What's included:** investigación, narrativa y ángulo, contenido, imágenes, diseño y desarrollo, y la web en su dominio.
5. **04 Investment:**
   - USD 3,000 en dos pagos de USD 1,500, igual que Priya y Brant.
   - Dominio y primer año de hosting incluidos; sin suscripción mensual.
   - Tres pasos.
   - Firma **Pablo Merchán**, porque el hilo de correo es suyo.

## Dónde está

- **Página:** `prospecting/pettingill/propuesta/web/index.html`. El build la copia a `clients/jorge-arce/pettingill/proposal/`, que queda en igniteyourself.co/pettingill/proposal.
- **PDF:** `propuesta/web/Ignite-Yourself-Proposal-Bernard-Pettingill.pdf`, de cinco páginas A4. Se regenera con `node prospecting/pettingill/propuesta/render-pdf.mjs` a partir de `propuesta/proposal-pdf.html`.
- **Interruptor:** `"proposal": {"active": true, …}` en `clients/jorge-arce/pettingill/content.json`. `tools/build-pettingill.py` añade el botón fijo "Your proposal" en las cinco páginas y "View your proposal →" en la nota de Ignite. Después hay que correr `tools/prerender-pettingill.mjs`, siempre después del build. Con `false`, el build quita la carpeta y los accesos.
