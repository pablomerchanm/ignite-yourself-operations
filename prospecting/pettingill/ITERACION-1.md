# Bernard "Biff" Pettingill — Authority Platform · Iteración 1

**Estado:** preview privado construido. **No enviado, no contactado.** Biff solo aceptó *ver* un preview ("Yes", 12 oct 2026).
**Ruta:** `/pettingill` (+ `/testimony`, `/research`, `/record`) — `noindex`, fuera de buscadores en `robots.txt`.
**Fuente del contenido:** `clients/jorge-arce/pettingill/content.json` (todo el texto). Build: `tools/build-pettingill.py` → `tools/prerender-pettingill.mjs`.
**Fuentes revisadas:** 13 oct 2026, descargadas y leídas una por una (no se asumió nada del brief sin abrir la fuente).

---

## 1. Decisiones narrativas

- **El sitio responde una pregunta:** *¿por qué Biff es relevante y creíble para un abogado que evalúa un asunto de economía forense?* Todo sigue la cadena hecho → fuente → qué significa para el abogado.
- **La pieza que lo distingue de sus dos webs: la etiqueta de procedencia.** Cada afirmación lleva su clase de fuente: *Self-reported* (lo dice él), *Public document* (documento fechado que él publica), *Independent record* (editor, PubMed, Crossref), *Ignite count* (lo contamos nosotros, con método). La home lo explica en una sección propia ("How to read this record"). Es la promesa literal del email: "a clearer, sourced view".
- **Las tres cifras, de frente.** La página de testimonio muestra 1,500+ / 550+ / 1,900+ con lo que mide cada una y dónde aparece. Usamos 1,500+ con la redacción exacta ("cases with deposition or trial testimony"). La 1,900+ queda marcada como pendiente de confirmar, sin acusar ni esconder. Para Biff es una razón concreta para hablar.
- **El listado testimonial como activo, no como base de datos.** Contamos el PDF público (año, sección, estado, tribunal federal) y lo mostramos en agregados con gráfico y tabla accesible. **No republicamos nombres de casos** (hay menores y particulares). El buscador por jurisdicción queda como *propuesta*, sujeta a su revisión.
- **Las rutas de trabajo salen de su propia documentación:** su web (life care plans a valor presente) y sus checklists de intake (cinco años de ingresos, fringe benefits, servicios domésticos). Cada ruta se ata a un paper suyo sobre la misma pregunta.
- **Persona ≠ empresa.** Los ocho servicios de Pettingill Analytics aparecen en la página Record, atribuidos a la firma ("Services published by the firm"), con enlace. No se le atribuyen a Biff.
- **Sin fotografía.** No hay retrato autorizado. Se usa la calibración sin foto de Freudenthal (campo de tinta, retícula, escala tipográfica), con acento latón de archivo en lugar de rojo.
- **Recursos para el paralegal en la home:** CV fechado, listado fechado, checklists y términos publicados, todo enlazado a su web. No ponemos tarifas en el texto: enlazamos la página de tarifas y pedimos confirmar vigencia.
- **Formulario que no envía** y pide expresamente no incluir información confidencial. Contacto mostrado: el público de su web.

## 2. Correcciones al brief (lo que las fuentes dicen hoy)

| Brief | Fuente hoy | Qué hicimos |
|---|---|---|
| Listado testimonial fechado 03-01-2025, últimas filas ene 2025 | El PDF tiene **33 páginas**: deposiciones fechadas **20 feb 2026** (hasta ene 2026), juicios fechados **26 ago 2025** (hasta may 2025) | Usamos las fechas reales |
| Founder page: fundador "desde 1996" y FIT "1988–1996" | La founder page **no muestra** esas fechas. El CV dice FIT **1987–1988** y Palm Beach Atlantic **1988–1998** | Fechas del CV; "1996" no se usa |
| Earnings Analyst 2019: autor según CV | El editor lo lista como **James A. Mills y Bernard F. Pettingill** | Autores del editor |
| "Why Hospitals Resist…" sin revista/DOI claros | Crossref: *Journal of Clinical Medicine & Health Care*, dic 2024, DOI 10.61440/jcmhc.2024.v1.13. El CV dice MEGA Journal, sep 2024 | Crossref, con nota de la diferencia |
| — | Su web personal dice "**qualified in 29 states at the federal and state level**" | Redacción usada, aclarando que no es licencia |
| — | El CV lo lista como **Referee del Journal of Forensic Economics** (dos años) | Incluido, como "per CV" |
| — | UNO aparece como "1997-1978" en el CV (errata evidente) | Mostrado como 1977–1978 con la errata citada |

## 3. Fuentes usadas

**Primera parte (autodeclarado):** bpettingill.com (home, bio, forensic consulting, vita, prior testimony, billing rates, injury/death analysis, structured settlements, medical consulting) · CV PDF de 8 páginas fechado 7 jul 2025 · listado testimonial PDF · checklists de lesión y muerte · pettingillanalytics.com (home, founder, team, services, forensic consulting, contact).
**Independientes:** PubMed (PMID 523599) · Crossref (DOI 1979, DOI 2024 hospitales, búsqueda por autor) · Zenodo API (inflación hospitalaria 2025) · páginas de editor Longdom (2024 y 2025) · The Earnings Analyst (2019) · SciVision (Nursing & Primary Care) · crew page de *City of a Million Dreams*.
**Conteo propio:** `tools/count-pettingill-listing.py` reproduce todas las cifras del gráfico (329 entradas · 269 deposiciones · 60 juicios · 289 con tribunal de Florida · 15 sin tribunal · 26 en U.S. District Courts · 12 estados más USVI fuera de Florida).

## 4. Afirmaciones pendientes de verificación o autorización

- **1,900+** de la web corporativa: unidad y período sin confirmar. Marcado como pendiente en la página.
- **Current Opinion 2024** (life expectancy database): la página del editor devolvió error desde aquí y el DOI no está en Crossref. Marcado como pendiente. Páginas distintas entre CV y brief; no publicamos páginas.
- **Títulos y cargos académicos:** del CV, no verificados contra registros universitarios. Dicho en la página.
- **Membresías "present":** del CV de julio 2025; vigencia sin confirmar. Dicho en la página.
- **Contacto público** (biffpett@gmail.com, 561-622-0330): publicado por él, pero falta que apruebe el canal de consultas.
- **Licencia de seguros FL/LA:** del CV; no revisada en el registro estatal.
- **No incluido a propósito:** cartas de Acknowledgements (sin permiso), testimonios de la home corporativa, patentes y marcas (sin revisar registro oficial), JDSM, el documental (secundario, pendiente de su aprobación).

## 5. Hallazgos útiles para la conversación con Biff

- Las tres cifras de testimonio no coinciden entre sus dos webs (1,500+ / 550+ / 1,900+).
- Sus checklists de intake siguen indicando **biffpett@comcast.net**, mientras su web usa Gmail. Fricción real para un paralegal.
- Hay un artículo de mayo 2026 en Crossref firmado por "Bernard Pettingill" (*MindScreen AI*, Journal of Psychiatry Research Reviews & Reports, DOI 10.47363/jpsrr/2026(8)217). **No confirmado que sea él**; no está en el preview.
- El certificado TLS de bpettingill.com está mal servido (cadena incompleta). Algunos navegadores y herramientas lo marcan como no seguro. Es un detalle técnico que podríamos mencionarle, con cuidado.

## 6. Preguntas estratégicas abiertas (no resueltas inventando)

1. ¿Qué cifra de testimonio es la vigente, y qué mide cada una?
2. ¿Qué especialidades representa él hoy, frente a las de la firma?
3. ¿Cuál es el CV y el listado más reciente y autorizado?
4. ¿Qué asuntos quiere priorizar o dejar de aceptar?
5. ¿De dónde llegan hoy los encargos: referidos, abogados recurrentes, directorios, web?
6. ¿Por qué canal quiere recibir consultas: Gmail, oficina, equipo de la firma?
7. ¿Qué fotos, cartas o reconocimientos autoriza publicar?
8. ¿Quiere conservar bpettingill.com o prefiere otra solución?
9. ¿Qué valora más: más consultas, mejores referidos, menos fricción documental o preservar su registro?
10. El refresh de Pettingill Analytics **no se ha propuesto** y no aparece en el preview.

## 7. Siguiente paso previsto

Pablo revisa → crítica de narrativa, veracidad y oferta (ChatGPT) → iteración 2 aquí → solo entonces se decide si y cómo se le muestra a Biff.

---

# Iteración 2 — home más simple, subpáginas con la profundidad

**Pedido de Pablo:** la home se sentía pesada. Más simplicidad y claridad, mensaje afilado, jugar con texto y jerarquías; la profundidad queda para quien entre a las subpáginas. Y uso de imágenes, sobre todo de él (Pablo construirá más imágenes).

**Qué cambió**
- **Home nueva:** una frase por pantalla. Hero con retrato → tres cifras gigantes con su fuente → cinco pantallas de una frase (la pregunta de la práctica, la formación, la investigación, las cuatro etiquetas de procedencia, la firma) → consulta. Cada pantalla enlaza a su subpágina.
- **Página nueva `/pettingill/practice`:** recibe lo que antes cargaba la home (las cuatro rutas de trabajo, la clave de fuentes y los documentos para el paralegal).
- **Imagen:** el hero usa como **placeholder** el retrato público de su web (`Biff-01-1.jpg`, 216 px, reescalado ×3), en placa a tamaño medio, no a sangre completa, porque a esa resolución no aguanta más. Cuando lleguen las imágenes de Pablo basta cambiar la ruta en `content.json` y quitar `"plate": true` para pasar a sangre completa. **Pendiente de autorización** antes de cualquier publicación.
- Las pantallas de una frase (`stmt`) aceptan una imagen de fondo (`img`) para cuando existan fotos: texto blanco sobre foto en blanco y negro oscurecida.

**Nada cambió en los datos ni en las fuentes.** Las subpáginas Testimony, Research y Record siguen iguales.

---

# Iteración 3 — hero a sangre y tipografía de marca

**Pedido de Pablo:** usar su imagen de Biff como banner principal y aplicar la dirección de marca (`BRAND-DIRECTION.md`), sobre todo en tipografía.

**Qué cambió**
- **Hero a sangre** con la imagen aportada por Pablo (`assets/hero.jpg`, 1672 px; recorte 3:4 para móvil en `hero-mobile.jpg`). Texto a la izquierda, sobre la sombra; el rostro a la derecha. Frase en serif, "is worth." en itálica. El nombre pasa al kicker; el wordmark `PETTINGILL` en serif ocupa la barra.
- **Tipografía:** Editors Note (Light, Regular, itálicas) en frases, titulares, palabras clave, títulos de publicaciones y nombre del pie. Instrument Sans se queda en cuerpo, cifras y navegación. Mono en etiquetas de fuente. Fuentes servidas desde `assets/fonts/`.
- **Paleta:** el claro pasa de gris a hueso cálido (`#EDE7DC`) según la dirección de marca.
- **Tarjeta social** propia (`assets/og.jpg`, 1200×630) con la foto, el wordmark y la frase.
- Retirado el placeholder del retrato público.

**Pendiente**
- La imagen del hero es una construcción de Pablo a partir del retrato público de Biff. **Requiere autorización de Biff antes de cualquier publicación.** La dirección de marca fija que los retratos deben ser fotografía real; esta pieza se muestra como propuesta.
- Faltan las imágenes de objetos y lugar (familias B y C) para intercalar bandas en la home y abrir cada subpágina.

---

# Iteración 4 — el nombre manda y la firma entra con logo

**Pedido de Pablo:** "What a loss is worth" sonaba poético para el header; es una marca personal, así que el nombre completo debe ser el protagonista. Y falta acceso directo a su firma, con logo, porque la página también debe traerle oportunidades a Pettingill Analytics.

**Qué cambió**
- **Hero:** `Bernard F. Pettingill, Jr.` en Editors Note, "Jr." en itálica; debajo `Ph.D. Economics · MPH · MBA` y la promesa en grotesca. La frase desaparece del hero.
- **Pettingill Analytics, en tres lugares:** enlace externo en la barra de navegación; ficha propia en la home (logo, rol de fundador y presidente, descripción, contacto de la firma, ocho servicios, botón "Discuss a firm engagement"); y bloque en el pie de todas las páginas con el logo en placa blanca.
- **Formulario:** nueva vía "Business valuation, litigation support or analytics — Pettingill Analytics", preseleccionada desde el botón de la ficha. En el sitio real se enrutaría a la firma.
- Logo tomado de pettingillanalytics.com (`assets/pa-logo.png`). Tarjeta social regenerada con el nombre.
- `BRAND-DIRECTION.md` actualizado: el hero lleva nombre, no frase; la firma siempre a un clic.


---

# Iteración 5 — la voz del registro

**Pedido de Pablo:** el tono era descriptivo y biográfico ("he did, he thinks"). Elegido: una voz sin persona gramatical, elegante y estratégica, no ornamentada.

**Qué cambió**
- Reescritas las cinco páginas: el sujeto de cada frase es el trabajo, no el hombre. Cero "he/his" en el texto editorial; "Dr. Pettingill" solo en las notas legales del pie y en la clave de fuentes.
- Las fuentes salen de las frases y viven solo en las etiquetas mono.
- Las salvedades metodológicas (títulos no verificados, membresías "present", fechas del listado) se concentran en la clave de fuentes de la página Practice.
- Línea de marca fijada: *Every figure, sourced.* Regla de voz añadida a `BRAND-DIRECTION.md` (sección 8).
- Eliminadas dos secciones que ya no se usaban en ninguna página (`proof`, `band-thesis`).

**Datos y fuentes:** sin cambios.

---

# Iteración 6 — la mesa con los abogados

Imagen aportada por Pablo (`assets/counsel.jpg`): Biff escuchando a dos abogados, luz de atardecer. Colocada a sangre detrás de la primera pantalla después de las cifras, la de la práctica ("One question, in four forms: what is the loss worth?"). Es el primer momento en que un abogado se ve a sí mismo en la mesa. Texto en la columna izquierda, sobre la espalda en sombra, para dejar el rostro libre. Pendiente de autorización de Biff como el resto de retratos.

---

# Iteración 7 — dos imágenes más

- `assets/desk.jpg` (Biff escribiendo a la luz de una lámpara): detrás de "Published from 1979 to 2025" en la home, con el texto a la derecha, sobre la pared vacía. Escribir es publicar.
- `assets/room.jpg` (la sala vista desde la puerta): apertura de la página Practice, con "Four questions. One discipline." Sustituye al lede de texto.
- En móvil, todas las pantallas con foto pasan al patrón del hero: la imagen en la franja superior y el texto debajo sobre tinta, para no tapar rostros.
- La home alterna ya foto, cifras, foto, frase, foto, frase, firma. Pendientes de autorización de Biff como el resto.

---

# Iteración 8 — la balanza

`assets/balance.jpg` (balanza de latón sobre libros, luz de ventana): abre la página Testimony con "Three figures, two websites. Each measures something different." Es el único uso de la balanza en todo el sitio, como fija la dirección de marca: el instrumento con el que se pesa, no el icono de la justicia. Texto a la derecha, sobre la pared en sombra.

---

# Iteración 9 — las dos puertas que faltaban

- `assets/papers.jpg` (manos con la pluma sobre los papeles): abre la página Research con "What care costs, and how to project it." Sustituye al lede de texto.
- `assets/notes.jpg` (Biff tomando notas en la reunión): abre la página Record con "The record, in order." El subtítulo deja dicho que todo viene del CV del 7 de julio de 2025 y no se ha cotejado con universidades ni asociaciones. Encuadre anclado arriba, porque la imagen original ya corta a la altura de la boca.
- Con esto las cinco páginas abren con lámina. Revisión a 1440 y 390 px: sin desbordes ni errores de consola.
- Pendientes de autorización de Biff como el resto de retratos.

---

# Iteración 10 — la mesa de trabajo de la firma

`assets/team.jpg` (Biff marcando una gráfica con la pluma, el equipo alrededor): nueva pantalla en la home justo antes de la ficha de Pettingill Analytics, con la etiqueta "Pettingill Analytics" y la frase "One founder. A team at the table." Es la imagen que vende la firma: un equipo, no un solo perito. El lede que tenía la ficha pasa a esta pantalla para no repetirse. La afirmación del equipo se apoya en el equipo publicado en pettingillanalytics.com y lleva la etiqueta Public document. Pendiente de autorización de Biff como el resto.

---

# Iteración 11 — motion, iconos y gráficos

Lo que se mueve, y por qué. Todo respeta `prefers-reduced-motion`: sin motion, cada pieza se ve completa y quieta.

- **Scrollytelling en la home.** La pantalla "How to read this site" se fija y el texto se enciende palabra a palabra con el scroll (patrón MONOLOG del estudio, sobre el motor GSAP/ScrollTrigger que ya usa la plantilla). Lleva línea de progreso, contador 01/03 y flechas que saltan de párrafo. Sustituye a la frase estática "Claim, document, record." Las cuatro etiquetas aparecen al final.
- **El nombre del hero** sube palabra a palabra desde una máscara. Señal de "Scroll" a la derecha que se apaga al bajar.
- **Cifras que cuentan** hasta su valor al entrar en pantalla: las tres de la home, las tres de Testimony y las cuatro del listado. Los años ruedan desde 24 años antes.
- **Iconos de línea en latón** con un trazo en reposo: cuatro áreas de la práctica (documento con pulso, curva de ingresos, columnas de soporte, casa con reloj), cuatro etiquetas de fuente (comillas, documento con sello, eslabón, conteo de palotes) y cuatro documentos del paralegal (CV, listado, casilla con tilde, firma). Se dibujan al llegar y luego respiran despacio.
- **Dos líneas de tiempo** nuevas, con datos ya verificados en iteraciones anteriores:
  - Research: siete papers entre 1979 y 2025, uno por marca.
  - Record: cuatro grados (1969–1977), siete nombramientos docentes como barras (1974–1998) y la práctica desde 1985 en latón. En móvil se muestran como lista.
- **El gráfico del listado** crece columna a columna.
- **Las láminas** derivan despacio bajo el texto (parallax suave).
- **Carril de secciones** a la derecha en escritorio: un punto por sección, el activo más grande, etiqueta al pasar el ratón, clic para saltar.

Revisión a 1440 y 390 px con motion activo: sin desbordes ni errores de consola.

---

# Iteración 12 — curaduría y navegabilidad

Análisis completo de bpettingill.com y pettingillanalytics.com en `CURADURIA-WEBS-ACTUALES.md`. Cambios en el preview:

- **Home más corta y con mapa.** Hero → cifras → "In brief" (scrollytelling: desde 1985, formación, fuentes) → **índice de cuatro rutas** (Start a case, Prior testimony, CV and education, Publications) → práctica con foto → publicaciones con foto → firma → contacto. Sale la pantalla de formación, absorbida por "In brief".
- **Botón "Start a case"** en el hero, hacia Practice.
- **Etiquetas de fuente** explicadas una sola vez, en Testimony, junto a las cifras.
- **Practice**: "Start a case in four documents", en el orden de bpettingill.com (checklists, retainer y tarifas, CV, listado).
- **Testimony**: el 1,900+ ya tiene unidad según la página del equipo de la firma (casos con testimonio en deposición o juicio). Misma unidad que el 1,500+. Queda por confirmar cuál es la cifra vigente. Apertura reescrita: "Three published figures. What each one counts."
- **Publications**: seis notas para abogados del blog de la firma, listadas como contenido de la firma (los posts no muestran autor ni fecha).
- **Firma**: "Founded 1996, per the firm's founder page".
- **Navegación**: Practice, Testimony, Publications, CV. Bloque "Next" al final de cada subpágina.

Pendiente de permiso o confirmación: testimonios anónimos y cartas, fechas docentes cruzadas entre la página del fundador y el CV, cuál de los tres correos usar, y si el Bhatia coautor de 1982–1985 es el Dr. Sanjiv Bhatia del equipo.

Revisión a 1440 y 390 px con motion: sin desbordes ni errores.

---

# Iteración 13 — la narrativa de una marca personal

Decisión de Pablo: el sitio es su marca personal, no un expediente. Habla de él con orgullo y no se justifica. Lo corporativo vive en pettingillanalytics.com.

**Fuera de la página:**
- "Every figure, sourced." y toda la línea de etiquetas de fuente (Self-reported, Public document, Independent record, Ignite count), en cifras, publicaciones y líneas de tiempo.
- La clave "Every claim carries its source" y el párrafo "Claim, document, record. Kept apart."
- La banda "Proposed, subject to review" del registro buscable.
- Las salvedades en pantalla: "as stated in the CV", "not checked against university records", "memberships not confirmed", el conteo explicado del listado, "None of it current".
- La comparación de las tres cifras (1,500+ / 550+ / 1,900+). Queda el 1,500+ de su web personal.
- Lo corporativo: las fichas de servicios de la firma y las notas del blog. La firma queda en una sola pantalla con su logo, "Founder and President since 1996" y enlace a pettingillanalytics.com, más el pie de cada página.

**Nueva voz, en una línea por página:**
- Hero: "Economic damages in injury and death cases. Since 1985."
- In brief: las tres preguntas, la formación y el historial, en tres frases.
- Testimony: "More than 1,500 cases. Deposition and trial." · cifras 1,500+, 550+, 29 · "329 testimonies since 2017."
- Practice: "To start a case, begin here."
- CV: "More than two decades of teaching."

**Lo que no cambia:** no se inventa ningún dato. Cada cifra y cada fecha siguen siendo las de sus webs, su CV y los registros externos. Las verificaciones pendientes salen de la página pero siguen en estas notas y en `CURADURIA-WEBS-ACTUALES.md`. Hay que cerrarlas con Biff antes de publicar: cifra vigente (1,500+ o 1,900+), fechas docentes, correo, títulos y membresías, permisos de fotos y cartas.

`BRAND-DIRECTION.md` actualizado: sin línea de marca fija, y voz de marca personal sin etiquetas de fuente.

---

# Iteración 14 — solo lo que decide la contratación

Filtro aplicado a cada frase: ¿le sirve a un abogado que evalúa a un perito en daños económicos? Los cinco puntos que deciden (qué daño cuantifica, si resiste un Daubert, experiencia en el estrado, que sigue activo, cómo contratarlo y armar la divulgación) quedan escritos en `BRAND-DIRECTION.md`, sección 2b.

- **Hero:** "Life care plans, lost earnings and wrongful death damages. Since 1985."
- **Cifras de la home:** 1,500+ casos con testimonio, 550+ juicios, 29 estados. La experiencia en juicio sube a la home. El año 1985 ya está en el hero.
- **In brief:** fuera las preguntas retóricas. Tres hechos: la especialidad (life care plans a valor presente), la formación (Ph.D. Manchester, MPH Tulane, más de dos décadas de docencia) y la vigencia (publica sobre estos temas y sigue testificando en 2026, según el listado hasta enero).
- **Práctica:** "Four areas of economic damages" en lugar de "One question, in four forms". La apertura de Practice dice "Economic damages, to present value" en lugar de "Four questions. One discipline."
- **Contratación:** se nombra la divulgación del perito. CV, publicaciones y listado de testimonios previos son lo que pide.
- **Testimony:** fuera el bloque de cifras repetido. El listado dice "through January 2026".
- **Pie:** las afiliaciones ya no dicen "— CV".

Revisión a 1440 y 390 px: sin desbordes ni errores.
