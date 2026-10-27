# Nagy Habib: la propuesta, encendida

Fecha: 27 de octubre de 2026. Es la misma fórmula que con Priya, Brant y Pettingill: una página de propuesta con la identidad de Ignite Yourself dentro del link de su preview, más un PDF.

**Por qué ahora:** respondió al seguimiento de Pablo del 26 de octubre con un *"How much it will cost?"*, el 27 de octubre a las 05:32.

## El ángulo

Su trayectoria tiene muchas primeras veces y está repartida en lugares escritos para lectores distintos:
- **El perfil de Imperial**, para académicos.
- **El directorio del NHS**, para pacientes.
- **Las páginas de las empresas**, para inversores.
- **PubMed**, para los papers.

Además, algunas fechas no coinciden entre fuentes (ChM, MiNA). La propuesta no le vende pacientes ni casos. Le ofrece un único registro bajo su nombre para quien lo busca: organizadores de congresos, socios y licenciatarios, prensa y colaboradores. También una biografía aprobada por él para mandar cuando se la pidan.

Como en Pettingill, queda claro que **nada está fijo**:
- **Fotos, textos y ángulo:** se ajustan con él.
- **El retrato del preview:** es provisional, y se puede trabajar desde fotos suyas.
- **El precio:** incluye todo el diseño, la creación de las imágenes y la web completa en su dominio.

## Qué dice

1. **Portada:** "Four decades of surgery, research and invention, brought together in one record under your own name."
2. **01 Why now:** carta a "Professor Habib" con las primeras veces, sin afirmar eficacia clínica:
   - el trasplante de 1993;
   - la resección por radiofrecuencia de 2002;
   - el Habib 4X y el EndoHPB, de AngioDynamics y Boston Scientific;
   - el trabajo del adenovirus al saRNA;
   - los 430 artículos de ORCID;
   - las empresas, de EMcision a MiNA.
3. **02 What it opens:**
   - invitaciones de congresos y universidades;
   - nuevas empresas con cofundadores, licenciatarios e inversores;
   - cobertura precisa en la prensa;
   - colaboraciones de investigación.
4. **03 What's included:** investigación, narrativa y ángulo, contenido, imágenes (con el retrato provisional), diseño y desarrollo, y la web en su dominio.
5. **04 Investment:**
   - USD 3,000 en dos pagos de USD 1,500, igual que los demás.
   - Dominio y primer año de hosting incluidos; sin suscripción mensual.
   - Firma **Pablo Merchán**.

Va en inglés británico (*organiser*, *honours*), porque él está en Londres.

## Dónde está

- **Página:** `prospecting/habib/propuesta/web/index.html`. El build la copia a `clients/jorge-arce/habib/proposal/`, que queda en igniteyourself.co/habib/proposal.
- **PDF:** `propuesta/web/Ignite-Yourself-Proposal-Nagy-Habib.pdf`, cinco páginas A4. Se regenera con `node prospecting/habib/propuesta/render-pdf.mjs`.
- **Interruptor:** `"proposal": {"active": true, …}` en `clients/jorge-arce/habib/content.json`. `tools/build-habib.py` añade el botón fijo "Your proposal" y "View your proposal →" en la nota de Ignite.
  - Su preview es estático: no hay prerender.
  - Con `false`, el build quita la carpeta y los accesos.
- **Aviso de visitas:** la propuesta lleva el mismo aviso que el resto del preview. Si la abre, llega el correo "★ Nagy Habib abrió la propuesta".

## Abierto

- **Moneda:** si Pablo prefiere libras para él, hay que cambiar el importe en la web y en el PDF.
