# Habib — iteración 1

Preview privado en **igniteyourself.co/habib** (noindex). Construido el 19 oct 2026 sobre la base de Brant.

## Decisiones

- **Base:** dossier académico de Brant, piel Pettingill (tinta, hueso, Editors Note). Sin fotografía: solo entraría un retrato real con permiso.
- **Acento:** verde de quirófano, `#2F776D` sobre claro y `#5FAE9F` sobre oscuro. Distinto del rojo de Nilsson y del ámbar de Brant.
- **Hero:** "Bringing new treatments for the liver from the laboratory to the operating theatre." Coordenadas de Hammersmith Hospital.
- **Páginas:** Overview, Work (las tres líneas: cirugía, dispositivos y empresas, investigación), Career, Record.
- **Capítulo:** la resección casi sin sangrado por radiofrecuencia, de la técnica de 2002 a la compra de EMcision por Boston Scientific en 2018.
- **Cita:** la del yoga, de su entrevista con la Oligonucleotide Therapeutics Society. Es la única en primera persona y tiene fuente.
- **Publicaciones:** 6 en la home y 15 en Record, cada una enlazada a PubMed o a su fuente.

## Lo que la página no dice, a propósito

- Que AngioDynamics "adquirió" el Habib 4X: solo hay fuente independiente de licencia y distribución.
- El Edison Gold Award 2020: solo aparece en su perfil de Imperial.
- "Top five global HPB surgeons": autodescripción y adjetivo de rango.
- Eficacia clínica de cualquier terapia. La fase II con adenovirus no mostró eficacia, y MTL-CEBPA no tiene resultados de fases avanzadas publicados.
- Práctica privada: no sabemos si atiende pacientes privados. La ruta de "referral" queda genérica.

## Pendiente con él

1. Nota personal en sus palabras (marcador en la introducción).
2. Royal College of Surgeons of Edinburgh o Royal Society of Edinburgh: la página usa la del perfil de Imperial.
3. Las 7 empresas: une su lista (EMcision, OmniCyte, MiNA, Apterna, Medeva, Bioenvision) con Dawn Therapeutics, que menciona Imperial. Confirmar.
4. Año de fundación de MiNA: la página usa 2013, cuando Robert Habib entró como CEO fundador.
5. Fecha del ChM de Bristol (el perfil de Imperial trae fechas imposibles).
6. Retrato y permiso.
7. Si quiere un canal para pacientes internacionales.

## Iteración 2 — expediente sin venta (19 oct 2026)

Pedido de Pablo: la página debe ser 0 venta y 0 llamadas a la acción, un expediente de autoridad.

- **Fuera:** botón "Begin a conversation" de la barra y del pie, formulario de contacto, cinta de audiencias, sección "Where a conversation usually begins", tarjetas con botones ("A clinical referral", "A device or venture", "Research or a lecture") y enlaces "Details".
- **Nuevo:** "A record of firsts", seis primeros con año y revista (1993, 2001, 2002, 2006, 2008, 2020), en la home y en Work.
- **Reescrito:** "Three lines, one body of work" sin audiencias ni enlaces; cada tarjeta lleva su periodo y su fuente.
- **Work:** pasa a ser un expediente en detalle: cirugía, instrumentos, empresas e investigación, cada línea con su fuente.
- **Navegación:** Overview, Work, Career, Record. Los "Next" al final de cada página llevan a la siguiente sección del expediente, nunca a contacto.
- **Pie:** nombre, Londres, enlace a su perfil de Imperial como fuente, y la nota de preview privado.
- **Pendiente:** la foto del hero no llegó adjunta. Cuando llegue, se integra con el tratamiento de Johan: cara a la derecha, nombre a la izquierda.

## Iteración 3 — retrato en el hero (19 oct 2026)

- **Foto:** retrato generado por Pablo en ChatGPT a partir de sus fotos públicas. Traje oscuro, fondo negro, luz lateral, sin logos ni escena inventada.
- **Hero:** la cara a la derecha y el nombre a la izquierda, con un velo lateral, como en Johan. En móvil, un recorte vertical con la cara arriba y el nombre sobre el traje.
- **Tarjeta social:** el retrato con su nombre.
- **Pie:** la nota dice ahora que la fotografía y el texto son dirección de arte provisional, como en Priya.
- **Riesgo a vigilar:** es una imagen generada de una persona real. En el correo conviene decir que la fotografía es provisional y pedirle una suya o su permiso.

## Iteración 4 — expediente editorial (19 oct 2026)

Pedido de Pablo: menos narrativa y menos tono comercial; un expediente académico de su trayectoria. Se queda el retrato.

**Ángulo: el registro, no la historia.** Referencias: la ficha de la Académie, las memorias biográficas de la Royal Society, un currículum académico editado. La autoridad se documenta, no se argumenta. Este formato es para perfiles consolidados; el de llamadas a la acción queda para perfiles jóvenes.

**Reglas de escritura**
- Tercera persona, registro de enciclopedia.
- Entradas fechadas con fuente; un solo párrafo en toda la página (la nota biográfica).
- Títulos como rótulos de currículum: Appointments, Chronology, Clinical work, Research, Instruments and companies, Honours, Publications, Education and training, Sources.
- Sin metáforas ni verbos de transformación; sin cifras comerciales (fuera "70,000 devices sold").
- Fuente al pie de cada sección y lista de fuentes numerada al final.
- Fuera: la frase del hero, "A cut that barely bleeds", "Switching a gene back on", la cita del yoga, "Worldwide".

**Diseño**
- Una sola página. Ya no usa la plantilla de Mark Cooke: `tools/build-habib.py` compone HTML estático desde `habib/content.json`, sin JavaScript de render ni prerender.
- Hero: el retrato a sangre; encabezado como su firma: Professor, Nagy Habib, MD · FRCS · ChM, el cargo; tres datos al pie (nacimiento, cátedra, Académie). En móvil la foto arriba y el texto debajo.
- Cabecera del expediente con índice numerado de diez secciones.
- Cada sección: carril lateral fijo con "§ 01" y rótulo; cuerpo en nueve columnas; título grande en Editors Note con cursiva atenuada.
- Componentes: nota con capitular y ficha lateral; tablas de cargos; cronología a dos columnas; primeros con el año en grande; dos láminas oscuras para los instrumentos; cifras de ORCID; publicaciones con enlace a PubMed.
- Barra fina que aparece al dejar el retrato, con anclas a las secciones.
- Las rutas antiguas /habib/practice, /track y /voice redirigen a su sección.

## Iteración 5 — logos reales y aire en el hero (19 oct 2026)

- **Franja "Institutions and affiliations"** justo después del retrato: seis logos oficiales a una sola tinta, cada uno con su relación con él.
- **Procedencia de los logos:** Imperial (SVG de imperial.ac.uk), Académie Nationale de Chirurgie (logo de academie-chirurgie.fr), Royal College of Surgeons of Edinburgh (rcsed.ac.uk), MiNA Therapeutics (minatx.com), Boston Scientific (SVG de bostonscientific.com), AngioDynamics (angiodynamics.com). Pasados a tinta #14161A, sin alterar la forma. Nota: "Marks shown for reference only; each belongs to its respective owner."
- **Hero:** más margen entre el cargo y los datos, y entre los datos y el borde inferior.

## Iteración 6 — conferencias, entrevistas y prensa (19 oct 2026)

- **Nueva sección § 09 "Lectures, interviews and press"**, después de Publications.
- **Conferencias grabadas:** cuatro tarjetas con miniatura y enlace a YouTube: WORLD 2023 (saRNA para enfermedades monogénicas raras), Cancer Virtual 2020 (United Research Forum), 4th International Conference on Tissue Science and Regenerative Medicine, Roma 2015, y la película de laureado de Takreem 2012. Las miniaturas se descargaron y se atenuaron de color; los títulos y canales vienen del servicio oEmbed de YouTube.
- **Cita:** "I know my patients but I know little molecular biology.", del reportaje "Next-generation medicines" de Imperial. Sustituye en espíritu a la cita del yoga: es profesional y tiene fuente.
- **Cobertura con enlace directo:** LarissaPress (doctorado honoris causa, 21 sep 2023, con vídeo), Healio (Boston Scientific compra EMcision, 8 mar 2018), blog de Imperial (marzo 2018), "Next-generation medicines" (Imperial), entrevista de la Oligonucleotide Therapeutics Society, entrevista de Drug Target Review, HSTalks.
- **Nuevo honor verificado:** doctorado honoris causa, Departamento de Medicina, Universidad de Tesalia, septiembre de 2023. Añadido a Honours y Chronology.
- **Descartados como tarjeta:** los vídeos griegos de la ceremonia y de LarissaPress, porque su miniatura muestra a otras personas.
- **Pendiente:** fecha de la entrevista de Drug Target Review (la web pide verificación humana).
