# Enrique "Rick" Rodriguez, Jr.: Authority Platform, iteración 1

**Estado:** preview **enviado el 27 de octubre de 2026** (seguimiento el 4 de noviembre). Rick respondió el 26 de octubre de 2026 al seguimiento de Pablo ("Rick, a thought after reading your testimonials"): *"Last time you wrote I thought I replied, letting you know I would like to see it."*
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

## La firma, al frente (pedido de Pablo, 26 de octubre)

- **Logo real de Rodriguez & Associates:** el sello azul marino con la "r" crema. Es el icono de su web, tomado de static.wixstatic.com: `assets/ra-mark.jpg`.
- **Lockup horizontal** (`assets/ra-lockup-white.png`): el sello más "RODRIGUEZ & ASSOCIATES / ADVISORY GROUP" en Editors Note. Es una composición nuestra para el preview, porque la web de la firma escribe el nombre en texto.
- **Hero:** "Founder and Principal" con el lockup bajo el botón. Lleva a `#firm`.
- **Ficha de la firma** (`#firm`), la segunda sección de la home, en lugar de la pantalla de una frase que había más abajo. Tiene:
  - el logo con aire, la descripción, la dirección de Grand Avenue, teléfono y correo;
  - los 12 servicios de su web y a quién sirve;
  - "Discuss a firm engagement", que abre el formulario en la vía de la firma, y "Visit rodriguezadvisory.com".
- **Navegación:** "The firm" en la barra y en las pestañas de móvil.
- **Pie:** el mismo lockup.

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
- **Apertura de CV:** la foto que mandó Pablo el 27 de octubre (`assets/cv-open.jpg`): manos con pluma sobre papeles en una mesa de reuniones, con luz de atardecer. El texto va a la izquierda, sobre la zona oscura.
- **La apertura de Practice** sigue sobre tinta.
- **En computador**, las aperturas con foto llevan una sombra arriba para que el menú se lea sobre la luz de la ventana.
- **Tarjeta social** (`assets/og.jpg`): regenerada con el hero nuevo.
- **Retrato de la web de la firma:** ya no se usa y se retiró.
- **Son imágenes construidas:** requieren su autorización antes de cualquier publicación real. Así lo dice la nota de Ignite al pie.

## Lo que no se hizo a propósito

- No hay cifras de la firma como titular.
- No hay nombres de clientes de las cartas fuera de la sección de cartas.
- No se usan fotos encontradas buscando "Rick Rodriguez": hay muchas personas con ese nombre.
- No hay propuesta todavía. `proposal.active` está en false, con la misma mecánica de Brant y Pettingill para cuando la pida.

## La firma con eco de Rodriguez & Associates, y el CV a la vista (27 de octubre)

Pedido de Pablo: que la sección de la firma tenga elementos de la propia firma (fotos y gráfica), sin perder las tipografías ni el look de la página de Rick.

**Lo que define la web de la firma** (revisada el 27 de octubre):
- fotos de Los Ángeles en blanco y negro, con un panel azul translúcido sobre la mitad izquierda del hero;
- azul profundo #00305B en "A message from our founder";
- el azul del sello, #074870;
- Futura Light en mayúsculas;
- una columna celeste en "Our services";
- mármol detrás de los testimonios.

**Lo que se trajo a la página** (con nuestras tipografías, la paleta hueso y tinta, y el riel "01 The firm"):
- **Banda del skyline:** downtown LA en blanco y negro con el velo azul sobre el 40 % izquierdo, como su hero. Encima va su logo, "Founded in 1992 · Downtown Los Angeles" y la dirección abajo a la derecha. En móvil, la foto arriba y el panel azul debajo.
- **Azul de la firma** en la raya y los números de "What the firm does".
- **Cierre:** el Walt Disney Concert Hall en blanco y negro, otra foto de su web.
- **Fotos** (`assets/ra-skyline.jpg`, `assets/ra-hall.jpg`): salen de rodriguezadvisory.com, son imágenes de stock que la firma usa en su web, y hay que confirmar la licencia antes de una publicación real.
- **Descartado tras probarlo:** una versión con Futura (Jost), el mármol y la banda azul "Led by its founder". Se veía como su web y no como la nuestra.

**CV para descargar:** es la copia del CV de diciembre de 2016 que publica la firma (`assets/Rick-Rodriguez-CV-2016.pdf`, 18 páginas). Se aloja en el preview porque la web de la firma a veces pide verificación anti-bots. Aparece en tres sitios:
- en el hero, junto a "Discuss a matter" (en móvil, como enlace discreto);
- en la apertura de la página CV ("Download the full CV · PDF, December 2016");
- en el pie, junto al contacto.

Las referencias como fuente siguen apuntando al PDF original en su web.

## Página propia de la firma: /rodriguez/firm (27 de octubre)

Pablo vio que la home y "The firm" eran lo mismo: el menú llevaba a un ancla de la home. Ahora:
- **La home** sigue siendo el resumen general de Rick, con sus fotos y la sección de la firma. Esa sección enlaza a la página nueva ("More about the firm").
- **/rodriguez/firm** habla solo de la firma y de la relación de Rick con ella. No tiene fotos de Rick.

**Contenido de /rodriguez/firm** (fuentes: rodriguezadvisory.com y el CV de 2016):
1. **Apertura:** el skyline con el velo azul de la firma sobre el 46 % izquierdo (en móvil, sobre toda la foto) y su logo. "The firm Rick founded in 1992, and still leads." y el enlace a rodriguezadvisory.com.
2. **Rick and the firm:**
   - *Founded by him*: en 1992, tras Security Pacific, donde los dos últimos años supervisó como SVP una cartera clasificada de unos 1.600 millones de dólares.
   - *Led by him*: la web de la firma le atribuye el trabajo por su nombre.
   - *His testimony runs through it*: con Emily Rodriguez, Partner.
3. **Four lines of work, one principal:** los 12 servicios agrupados en cuatro tarjetas (prestamistas y deudores, abogados, desarrolladores e inversores, bancos).
4. **Who the firm serves:** clientes representativos que publica la firma, los 108 bufetes del conteo propio, LAUSD y el trabajo pro bono.
5. **The people:** Rick (Founder and Principal) y Emily Rodriguez (Partner), según la página de Emily en la web de la firma.
6. **Cierre:** el Disney Hall y "Discuss a firm engagement".

**Navegación:**
- "The firm" en la barra, en las pestañas móviles y en el logo de la firma del hero llevan a /rodriguez/firm.
- El "Next" de la página CV lleva a la firma.

## La firma en la home, en segundo plano (27 de octubre)

Pedido de Pablo: con la página completa de la firma, la home no debe darle tanto protagonismo.
- **Fuera de la home:** la banda del skyline, la lista de 12 servicios, "Who the firm serves" y el Disney Hall. Todo eso vive en /rodriguez/firm.
- **Lo que queda:** una ficha breve. Tiene el logo sobre el azul de la firma (#00305B), "Founder and Principal · since 1992", la descripción, el contacto y tres enlaces: "More about the firm", "Discuss a firm engagement" y rodriguezadvisory.com.
- **Posición:** la ficha baja al final de la home, antes del contacto. La firma sigue arriba en la firma del hero ("Founder and Principal" con su logo).

## Envío (27 de octubre)

**Correo de Pablo:** respuesta en el mismo hilo, con el enlace a igniteyourself.co/rodriguez.

**GIF en el cuerpo:** como muchos prospectos no abren enlaces, el correo lleva un GIF de unos 17 segundos, a 800 px y 1,8 MB, enlazado al preview. Muestra:
- una pestaña nueva en la que se escribe el dominio;
- el Enter y la carga;
- la home con el dominio en la barra;
- el recorrido de la página.

**Dos versiones del GIF:**
- `rickrodriguez.com`: ese dominio está registrado desde 2003, con web activa y dueño sin identificar.
- `rickrodriguezexpert.com`: libre al 27 de octubre, igual que rickrodriguez.co y rickrodriguezbanking.com.

**Pendiente:**
- confirmar con Rick si rickrodriguez.com es suyo;
- seguimiento el 4 de noviembre si no responde (6 días hábiles).
