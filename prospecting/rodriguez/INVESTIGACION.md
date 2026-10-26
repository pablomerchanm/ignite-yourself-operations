# Enrique "Rick" Rodriguez, Jr.: Authority Platform, iteración 1

**Estado:** preview privado construido, **sin enviar**. Rick respondió el 26 de octubre de 2026 al seguimiento de Pablo ("Rick, a thought after reading your testimonials"): *"Last time you wrote I thought I replied, letting you know I would like to see it."*
**Ruta:** `/rodriguez`, con `/practice`, `/testimony` y `/record`. Tiene `noindex` por cabecera en `clients/jorge-arce/vercel.json`.
**Motor:** el mismo de Pettingill. `tools/build-rodriguez.py` se copió de `build-pettingill.py` y después se corre `tools/prerender-rodriguez.mjs`. Todo el texto vive en `clients/jorge-arce/rodriguez/content.json`.
**Fuentes revisadas:** el 26 de octubre de 2026, página por página y PDF por PDF, en rodriguezadvisory.com.

## La tesis

Es el experto que **tomó las decisiones dentro del banco y después las explica en un tribunal**. Pasó veinte años en banca, trece de ellos en Security Pacific. Ahí trabajó en revisión de crédito, crédito inmobiliario y activos especiales, hasta llegar a Senior Vice President. Desde 1992 tiene su propia firma.

Los abogados no lo elogian solo por lo que sabe. Lo elogian porque hace que un jurado entienda la banca. Por eso el hero dice *"Banking standards, from inside the bank to the witness stand."*

## Fuentes

**Primera parte (autodeclarado):** todas las páginas de rodriguezadvisory.com:
- home, con 13 cartas;
- bio del fundador, background, mission;
- Law Firms, Expert Witness Civil, Bankruptcy, Prior Testimony, Litigation Support;
- Financial Institutions, Real Estate, Government;
- Emily Rodriguez.

**PDF de la firma:**
- CV de diciembre de 2016, 18 páginas;
- CV de octubre de 2015, casi idéntico;
- listado de testimonios 2008–2015, 3 páginas;
- CV de Emily Rodriguez.

**Conteo propio (Ignite):**
- **108 bufetes** en el CV de 2016: 94 en litigio civil y 14 en quiebras.
- **36 testimonios** en el listado 2008–2015:
  - 19 solo deposición;
  - 9 en sala o en audiencia (juicio, sala o audiencia arbitral);
  - 8 informes o declaraciones;
  - 10 en tribunal federal: 6 en Bankruptcy Court y 4 en District Court;
  - fuera de California: Arizona, Montana y Nevada.

## Cifras usadas

| Cifra | Fuente | Cómo se presenta |
|---|---|---|
| 21 años en banca, "from branch manager to bank president" | Página Law Firms y CV 2016 | Tal cual |
| 108 bufetes | Conteo propio del CV 2016 | "Law firms named on his CV" |
| USD 6.000 millones | CV 2016: política de crédito de la cartera inmobiliaria, Security Pacific 1986–87, con aprobación personal de USD 15 millones | Con cargo y años |
| 36 testimonios 2008–2015 | Conteo propio del listado | Con el PDF enlazado |

## Discrepancias (temas para la conversación, no para la página)

- **El nombre:** el menú de su web dice "Rick Rodriguez **II**". La bio y el CV dicen "Enrique 'Rick' Rodriguez, **Jr.**" Usamos Jr.
  - **Decisión de Pablo (26 de octubre):** en la página va solo **"Rick Rodriguez"**, sin Enrique, II ni Jr.
- **El total de la firma:** la web dice "in excess of **$4.5 billion** for over 300 clients". El CV de 2016 dice "in excess of **$9 billion** to hundreds of clients". **No lo usamos como cifra.** En el CV de la página se explica que queda fuera hasta que él la confirme.
- **Fechas viejas:** la bio dice "for the past 17 years" y la home "over 20 years". Las dos cifras son anteriores a 2016.
- **Documentos:** el listado público se queda en 2015 y el CV en diciembre de 2016. Para un abogado que hace due diligence, esa es la primera impresión.
- **El cargo de 1990–1992:** el CV dice "SVP, Division Administrator, Real Estate Special Assets". La bio dice "Senior Vice President in charge of the Restructuring Group". Usamos el del CV, con la nota.

## Pendiente de verificar o autorizar

- **Laudo arbitral de 2023**, *Epicenter Loss Recovery v. Burford Capital and Ganymede Investments*, del 24 de abril de 2023. Lo cita la investigación previa en Jus Mundi, pero desde aquí la fuente dio 403 y la búsqueda no lo encontró. **No está en el preview.**
- **Licencia de broker inmobiliario en California:** sale de la bio. En la página se marca "status to be confirmed".
- **Afirmación de quiebras:** "en todos los casos donde testificó, el plan se confirmó o el asunto se resolvió a favor de su cliente". La dice la firma y en la página se marca como tal.
- **Cartas:** son seis de las trece de su web, citadas literalmente o recortadas con elipsis. Falta su permiso para publicarlas.
- **Formación:** el CV dice "Attended University of Mexico City, School of Business". Va tal cual, sin título.

## Fotos

- **Hero:** el retrato de Pablo, con corbatín verde, mirando a la izquierda y con luz cenital. Va a sangre.
  - `assets/hero.jpg`: 1672×941.
  - `assets/hero-mobile.jpg`: recorte 3:4 sobre el rostro.
- **Pantalla de Security Pacific** (`s-bank`, en la home): Rick escribiendo en el escritorio con lámpara (`assets/desk.jpg`). El texto va a la derecha.
- **Pantalla "Four areas"** (`s-question`, en la home): reunión con abogados al atardecer (`assets/counsel.jpg`).
- **Apertura de Testimony:** la balanza de latón sobre libros (`assets/balance.jpg`). Es la misma imagen del preview de Pettingill, y el texto va a la derecha.
- **Las aperturas de Practice y CV** siguen sobre tinta.
- **Tarjeta social** (`assets/og.jpg`): regenerada con el hero nuevo.
- **Retrato de la web de la firma:** ya no se usa y se retiró.
- **Son imágenes construidas:** requieren su autorización antes de cualquier publicación real. Así lo dice la nota de Ignite al pie.

## Lo que no se hizo a propósito

- No hay cifras de la firma como titular.
- No hay nombres de clientes de las cartas fuera de la sección de cartas.
- No se usan fotos encontradas buscando "Rick Rodriguez": hay muchas personas con ese nombre.
- No hay propuesta todavía. `proposal.active` está en false, con la misma mecánica de Brant y Pettingill para cuando la pida.
