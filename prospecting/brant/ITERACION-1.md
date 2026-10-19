# Patrick Brant — iteraciones

## Iteración 1: el preview (18 de octubre de 2026)

Tercer preview de la serie: narrativa de Vishwanathan, piel de Pettingill con acento ámbar de resina (#B8792F) en lugar del rojo de sala de Nilsson; la cinta de públicos vuelve a la serif ligera y los botones al hueso. Cuatro páginas: Overview, Work, Career, Record.

- **Hero:** "Turning polyolefin science *into products that ship*", kicker "Polyolefins · Catalysis · Materials Design", pellets a sangre, coordenadas de Houston.
- **Portada:** marcas tipográficas (ExxonMobil Chemical, Naval Research Laboratory, Arizona, Purdue, Houston & Baylor, Molecular Joinery) → The work, con un hueco visible para su párrafo personal → cifras en tinta (37 · 150+ · 75+ · 44) → cinta de públicos → "Where it begins" → tres caminos (Expert witness & technical counsel · R&D advisory · Ventures & research) → capítulo de los metalocenos (1995 · 2008 · 150+) → distinciones (ICIS 2008, *Science* 2000, la cara pública de ExxonMobil 2006–2010) → su frase de Purdue → seis piezas del registro → contacto.
- **Career:** ExxonMobil en dos sillas, el trabajo por áreas, lo público; línea de tiempo 1972–2026; cargos actuales (práctica, investigación, sociedades); formación.
- **Record:** catorce entradas entre papers, patentes y charlas, con citas de Google Scholar.
- **Work:** los tres caminos como tarjetas, Molecular Joinery.

Las capturas de Experience y Education de Pablo resolvieron el PhD (**University of Arizona**, Química Inorgánica, 1972–1977; Purdue es el posdoctorado de 1977) y las fechas exactas de los cargos (Chief Scientist abr 2000–jun 2011; Chief Polymer Science Advisor jun 2011–dic 2018; consultor y emprendedor desde ene 2019). Su propio LinkedIn dice "over 120 granted US patents" y "over 60 publications" (texto antiguo); la página usa las cifras de sus bios de 2025–2026 (150+, 75+).

Pendiente con él: la cifra de patentes que quiere publicar; qué puede decir de ExxonMobil; a quién quiere llegar; su párrafo personal; un retrato real.

## Iteración 2: sin fotografía, como un expediente académico (18 de octubre de 2026)

Pablo: "con todas esas fotos se ve más como la página de un laboratorio que de un científico; no se siente serio ni académico, sino como un juego". Se retira toda la fotografía generada.

- **Hero:** campo de tinta con una regla fina y un leve ámbar en la esquina, el nombre a la izquierda en Editors Note Light, la frase debajo; sin imagen.
- **The work** y **el capítulo de los metalocenos** pasan a una sola columna de lectura (62–68 caracteres), sin figura.
- **Portadas de Career, Record y Work:** tinta, la frase y una regla; sin imagen.
- **Lenguaje:** "Where it begins" → "Engagements · Where an engagement usually begins"; "Three ways in" → "Practice · Three areas of practice"; la portada de Work se llama "The practice". Sustantivos, no lenguaje de landing.
- `og.jpg` rehecha en tinta, sin fotografía.

Pendiente con él: un retrato real; la cifra de patentes; qué puede decir de ExxonMobil; Conscience VC.

## Iteración 3: los criterios de Nilsson, aplicados a Brant (19 de octubre de 2026)

Mismo pase que Johan Nilsson (iteraciones 6 y 7 de `prospecting/nilsson/ITERACION-1.md`), adaptado a Brant.

- **Nota provisional fuera:** "[A personal note in Dr. Brant's own words to follow…]".
- **Franja de marcas estratégica:** se llama "Industry & research". **ExxonMobil Chemical** va al frente, tipográfica y grande (el logotipo solo con permiso), con "Chief Scientist · Chief Polymer Science Advisor · 1981 – 2018". Debajo, lo que hace hoy: Molecular Joinery (fundador), Houston & Baylor (investigación) y TechConnect World (Symposium Chair, 2025). Arizona, Purdue y el Naval Research Laboratory (1977–1978) salen de la franja; siguen en Career.
- **Sin narrar la fuente:** fuera "Dates from his public profile…", "From his public profile", "Four of the most cited papers…" y la etiqueta "In short". Lo que importa queda como crédito corto: "Google Patents · ICIS, 2008", "Purdue University, 2017 · seminar title", "Citations: Google Scholar, October 2026".
- **Dato corregido:** "1995 — ExxonMobil pioneers metallocene catalysts…" (ExxonMobil no existía en 1995: la fusión es de 1999) pasa a "US 5,475,075: one of the early metallocene copolymer patents", con fuente propia.
- **Cinta de públicos fuera** ("Patent counsel · R&D leaders · …"): "Where an engagement usually begins" ya dice para quién es.
- **Contacto:** sin formulario. Vista previa de cómo funcionaría ("Preview · Not yet active", tres pasos, "This preview sends nothing and stores nothing", su LinkedIn). "Start a conversation" pasa a "Contact"; las tarjetas de la práctica pierden los botones "Discuss a matter / product / venture".
- **Nota del pie:** ya no habla de fotografía (la página no tiene). "Concept preview · Not indexed".
- **Capítulo:** las tres cifras (1995 · 2008 · 150+) se tocaban; el bloque es más ancho y las cifras, algo menores.
- **Menos espacio entre letras** (preferencia de Pablo): rótulos, barra, botones y titulares.

QA: cuatro páginas en 390, 768, 1440 y 1920 px; sin desbordamiento, sin errores de consola, sin imágenes rotas; auditoría de texto sin notas internas ni frases que narren la fuente.

Pendiente con él (sin cambios): la cifra de patentes (125, 150 o 175 según la fuente), qué puede decir de ExxonMobil, a quién quiere llegar, un retrato real y Conscience VC.

## Iteración 4: el registro de Nagy Habib (19 de octubre de 2026)

Pablo: "el tono tiene que ser un poco más como la de Nagy, más elegante, menos vendedor, es más de autoridad". La página deja de ser una landing de servicios y pasa a ser un expediente, con el mismo sistema que `/habib` (`tools/build-habib.py`, iteración 4 de `prospecting/habib/ITERACION-1.md`).

- **Una sola página.** `/brant/practice`, `/brant/track` y `/brant/voice` redirigen a anclas (`#work`, `#chronology`, `#research`). Se retiran `home/practice/track/voice.json` y `tools/prerender-brant.mjs`: el generador nuevo escribe HTML estático, sin plantilla ni prerender.
- **Registro:** tercera persona, entradas fechadas, rótulos de currículum (Biographical note, Appointments, Chronology, Scientific work, Research, Patents, Honours and service, Lectures, Education and training, Sources), una fuente al pie de cada sección y una lista numerada de ocho fuentes. Un solo párrafo, la nota biográfica.
- **Fuera:** "Where an engagement usually begins", las tres áreas de práctica, "Begin a conversation" y la vista previa del contacto, las cifras como argumento de venta y la frase "Turning polyolefin science into products that ship". El pie solo enlaza LinkedIn, Google Scholar y sus patentes.
- **Retratos** (los dos que envió Pablo, ver `FOTOS.md`): el perfil 3/4 es el hero, con el rostro a la derecha y el nombre a la izquierda, como Habib; la escena del escritorio es una lámina a sangre entre "Scientific work" y "Research", con el título de su seminario de Purdue de 2017. Ambos llevan "provisional art direction" y la nota del pie lo dice. `og.jpg` rehecha con el retrato.
- **Instituciones:** ExxonMobil Chemical, University of Houston, Baylor, TechConnect World, Molecular Joinery, University of Arizona; nombres en la serif, sin logotipos (solo con permiso).
- **Acento ámbar** en dos tonos: `#8C5A1C` sobre papel (contraste 4,75:1 en los números pequeños; el `#B8792F` original daba 2,9:1) y `#D4974A` sobre tinta.

**Datos verificados en esta pasada:**

| Dato | Fuente |
|---|---|
| Los seis artículos de "Research", con revista, volumen, páginas, coautores y DOI | Crossref |
| US 5,475,075 (1995, con Jo Ann M. Canich), 7,354,979 (2008), 7,700,707 (2010), 8,372,930 (2013), 10,882,925 (2021) | Google Patents |
| La membrana de baterías: "pioneered by a team of ExxonMobil scientists led by Dr. Pat Brant"; premio ICIS Chemical Business a Best Product Innovation 2008 | Anuncio de ExxonMobil Chemical, 13 oct 2008 (Chemical Online) |

US 5,712,352 y US 7,589,145 no se pudieron comprobar (Google Patents devolvía 503) y no entran. El título del artículo de 2015 es "…with short side chains" (Crossref), no "very short". La colaboración con el grupo de Karim en Houston queda como "Research collaborator, University of Houston" porque no se encontró la URL exacta de la noticia de 2021.

Pendiente con él (sin cambios): la cifra de patentes (125, 150 o 175 según la fuente), qué puede decir de ExxonMobil, retratos reales, Conscience VC y el año del Outstanding Scientist Award.
