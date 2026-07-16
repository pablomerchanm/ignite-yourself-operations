# Design Brief — Jorge Arce (v2, dirección definitiva)

Construido con Pablo a partir de sus referencias (2026-07-16). Este documento es la
memoria del proyecto: toda decisión de diseño nueva se contrasta contra esto.

## La sensación (en una frase)

> El monográfico oscuro de una persona, maquetado como lo haría un estudio de
> diseño para un artista — retrato dramático + datos convertidos en índices,
> diagramas y anotaciones. "Un médico entra y siente que abrió una editorial
> de altísimo diseño, no una página web."

NO es: una "web page" (tarjetas redondeadas, sombras, grids de features,
secciones eyebrow→título→grid). NO es plantilla, no es dashboard, no es clínica.

## Referencias aportadas por Pablo

1. **Deontay Wilder** (boxeador) — persona-como-póster: foto a sangre total,
   tipografía gigante montada sobre la foto, un acento brutal (naranja) sobre B&N,
   capítulos fullscreen ("3 of 3"), el dato como objeto gráfico ("51 KO's" con la
   foto rompiendo el número). *Lo clave: la pantalla infográfica del 51.*
2. **Lámina "PersonalBrad_Web"** (`refs/PersonalBrad_Web.pdf`, ~13 sitios de marca
   personal): Артемий Lebedev, Алексей Качалин (consultor senior — el arquetipo
   para autoridad profesional), Katrine Pil, AROCK, "Meet the Designer",
   "who will listen?", speaker "Topics Covered", Mika Motset, Soane Capital…

## El ADN decodificado (las 6 leyes)

1. **Oscuro como lienzo, luz como evento.** Negro/carbón dominante; lo blanco es
   un momento de quiebre (tarjeta de prensa, póster de revista insertado).
2. **El retrato chiaroscuro ES la interfaz.** La persona emerge de la oscuridad.
   Estudio, pose dirigida, vestuario monocromo. B&N dramático.
3. **Sans + serif itálica mezcladas EN la misma frase.** "Katrine*Pil*",
   "*Topics* Covered". El swap de voz a mitad de línea es EL gesto tipográfico.
4. **Microtipografía de anotación técnica.** Monospace uppercase, paréntesis,
   `©`, `(06)`, flechas `↳` como viñetas. La página se siente *anotada por un
   diseñador*, no maquetada por un CMS.
5. **Infografía editorial.** Flujos numerados (01→02→03), diagramas de círculos,
   tablas-índice (Awards / Clients), muros de logos como credibilidad, manifiestos
   con palabras atenuadas/encendidas. El dato es la pieza de arte.
6. **Cero chrome.** Nav mínima uppercase pequeña, sellos de lugar/hora, folios.

## Decisiones cerradas con Pablo

- **Luz:** 50/50 por capítulos — abre oscuro (el ícono), se aclara hacia lo
  humano/pacientes (calidez), cierra oscuro (autoridad). El contraste entre
  mundos ES la narrativa.
- **Fotografía:** mixta con intención — B&N dramático en capítulos oscuros
  (autoridad), color contenido/film en capítulos claros (lo humano).
- **Color:** neutros editoriales (negro carbón / marfil / tinta). Acento: por
  definir con Pablo (las refs casi no usan; disciplina monocroma primero).
- **Tipografía (versiones libres):** grotesca tight para display (Inter Tight),
  serif editorial itálica para los swaps (Instrument Serif), mono técnico para
  anotaciones (IBM Plex Mono).

## Mapeo a Jorge (materia prima infografiable)

- "27" años → número-monumento.
- Colombia → California → ruta/mapa dibujado.
- Misión y experiencia → manifiesto tipográfico (patrón Качалин/Artemii).
- Expertise (6 disciplinas) → índice numerado 01→06 / láminas anotadas.
- Speaking topics → diagrama de círculos ("Topics Covered").
- Referidos (otros cirujanos) → muro de credibilidad + tablas-índice.
- Testimonios → tarjetas de prensa blancas sobre negro (patrón AROCK).
- Timeline: formación → 2007 funda DICSB → hoy.

## No negociable (de siempre)

Claims médicos a nivel verdadero-general. Nada de credenciales, cifras,
entidades o resultados inventados. Ver README del repo.

## Estado

- Cap. 01 (hero + manifiesto) construido en `v2/` para reacción de Pablo.
- La landing v1 sigue intacta en producción hasta que la v2 esté aprobada.
