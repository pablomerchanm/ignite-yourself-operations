# Priya Vishwanathan — iteración 1 del preview

Fecha: 15 de octubre de 2026. Preview privado en igniteyourself.co/vishwanathan (también /priya y /priya-vishwanathan). No indexado.

## Qué se montó

Mismo sistema que el de Pettingill (`tools/build-vishwanathan.py`, derivado de `build-pettingill.py`; contenido en `clients/jorge-arce/vishwanathan/content.json`). Cinco páginas:

| Página | Contenido |
|---|---|
| **Home** | Hero (nombre, "Hotels, homestays and the guest experience. Since 1990.", un botón). In brief en tres ideas. Tres cifras: 35 años, 100+ hoteles, 370+ bungalows de amã hoy. La cita "Complaint is a gift." Práctica (cuatro líneas). Track record. Recursos para propietarios. Hoy. Contacto. |
| **Practice** | Cuatro áreas, tomadas de su propio titular de LinkedIn: greenfield y planeación, experiencia del huésped, excelencia operativa, consejo asesor. Cómo empieza un proyecto, en tres pasos. Su perfil en un lugar. |
| **Track record** | Línea de tiempo 1987–2026. Cargos en IHCL por bloque: operaciones, Business Excellence, liderazgo. Los hitos públicos de amã Stays & Trails, marcados como cifras de IHCL. |
| **Voice** | El podcast de agosto de 2026, el cierre del conclave del G100 (2023) y la reseña de PIHMAA (2021). Foros, consejos y voluntariado. |
| **CV** | Cargos de hoy (HOSPI Sigma, jurado BW 2026, WICCI, All Ladies League). IHM Pusa. |

## Decisiones

- **"Voice" en lugar de "Publications"**: ella habla, no publica papers.
- **Sin tarifas ni términos**: no hay ninguno público. "A project starts in three steps" describe un proceso propuesto, no sus condiciones.
- **Cifras**: solo las que tienen fuente. El 370+ es de la marca (IHCL) y así se dice en la página.
- **Áreas de práctica**: son las cinco líneas de su titular de LinkedIn, reagrupadas en cuatro. Las descripciones son propuesta nuestra y hay que validarlas con ella.
- **Fotos**: seis imágenes generadas como dirección de arte; el pie de página lo declara. Ninguna es de ella.
- **Contacto**: solo LinkedIn y Bengaluru. No tenemos correo ni teléfono.

## Pendiente de confirmar con ella (no está en la página)

- Premios que solo aparecen en LinkedIn: finalista Tata Innovista 2021 y Quality Innovation Award de la ISQ.
- Fechas exactas de cada cargo y de su salida de IHCL (la línea usa 1990–2025 por los "35 años").
- Qué hizo en el Reino Unido.
- Qué ofrece hoy exactamente como consultora y si tiene clientes propios.
- Título vigente en HOSPI Sigma y en WICCI (difieren entre fuentes).
- Permiso para citar el podcast, y la redacción exacta de la cita.
- Una sesión de fotos, o fotos suyas con permiso.

## Verificación

Las cinco páginas a 1440 y 390 px: sin desbordes ni errores de consola. Gradientes reforzados en las fotos claras (Track record, Hoy, CV, Voice) para que el texto se lea.

## Iteración 2: amã en el centro (15 de octubre de 2026)

Pablo marcó como clave su frase del post de los 35 años: *"helping build and scale ama Stays & Trails into a distinctive hospitality brand"*.

- **Hero:** "She helped build and scale amã Stays & Trails. *Thirty-five years with IHCL.*"
- **In brief:** amã pasa al primer lugar, citando la frase del post. Londres 1995 entra en la trayectoria. Business Excellence, quince años (dato de la entrevista de HospeTalk).
- **Cifras:** 370+ (bungalows de amã, figura de IHCL) pasa al primer lugar.
- **Track record (portada de inicio):** el texto cuenta amã como "el capítulo más gratificante", en sus palabras.
- **Página Track record:** amã sube al primer bloque ("A brand, built and scaled."), con su cita. Se suman 1995 Londres, 1997 Club Floors, 1999 y 2001 Quality.
- **Línea de tiempo:** se suma 1995. Se corrige el rótulo "IHCL (Taj Group)", que se salía por la izquierda; ahora va sobre la barra.
- **Sin cambios:** el retrato sigue siendo ilustrativo. Antes de enviarle el preview, hay que quitarlo o reemplazarlo por una foto suya con permiso.

## Iteración 3: plataforma de autoridad (15 de octubre de 2026)

Pablo pidió reestructurar toda la web para posicionarla como autoridad del sector, con enlaces a los videos, hablándole directo al público y con su trayectoria al frente. Las fotos las hace él; la página queda con espacios marcados (ver `FOTOS.md`).

**Páginas:**
- **Overview:** hero (amã), en breve, cifras (370+, 35, 15), su frase de cierre de Inspire Someone Today, los dos videos, Career, tres convicciones, Advisory, Today y el formulario.
- **Career** (`/track`): amã con hitos y sus palabras, Business Excellence ("from isolated hotels to one organisation"), la línea de tiempo, cargos, cargos actuales y formación. Absorbe la antigua página CV; `/vishwanathan/cv` redirige aquí.
- **Perspectives** (`/ideas`, página nueva): ocho convicciones con sus citas y la fuente de cada una, las tres preguntas de líder y el huésped indio de hoy.
- **Conversations** (`/voice`): los dos episodios se reproducen en la misma página (youtube-nocookie), además de charlas y menciones, jurados, foros y consejos.
- **Advisory** (`/practice`): cuatro líneas de trabajo según el cliente (propietarios; hoteles y grupos; consejos y fundadores; masterclasses, paneles y jurados), su método en cuatro pasos y el bloque de HOSPI Sigma.
- **Formulario:** cinco rutas (propiedad, estándares, consejo, invitación, otro). El botón principal dice "Start a conversation".

**Piezas nuevas de plantilla:** `media` (video que se reproduce en la página, con miniatura, programa, cita y enlaces) e `ideas` (convicción, cita y fuente).

**Imágenes:** se quitó el retrato generado con IA (no se parecía a ella) y las imágenes ilustrativas. La tarjeta para compartir ahora es tipográfica.

**Para confirmar con ella:** las citas salen de transcripciones automáticas y pueden variar en alguna palabra; conviene que las revise. El NPS de 90+ sigue fuera de la página.
