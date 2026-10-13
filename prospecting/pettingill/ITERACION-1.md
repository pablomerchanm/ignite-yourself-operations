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
