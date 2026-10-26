Mario Lignarolo explora cómo cambiar quién eres transforma lo que eres capaz de construir. La marca lo presenta como un atleta del ser: cuerpo, calma, disciplina e ideas, con la fuerza del deporte y la contención de un estudio editorial.

Tres palabras gobiernan cada decisión: **imponente, elevada, clara.**

- **Imponente:** tipo grande y negro protagonista.
- **Elevada:** neutros cálidos, serif, aire y nada que sobre.
- **Clara:** una jerarquía que se entiende de un vistazo, buen contraste y lectura cómoda.

## Las dos referencias

**De Nike About tomamos la fuerza:**

- el negro como fondo principal;
- el póster condensado en versal;
- la fotografía de actitud;
- una serif para la voz;
- la retícula de publicación de tres columnas.

**De Monolog tomamos la contención:**

- negros cálidos y hueso en lugar de blanco;
- titulares en grotesca negrita con tracking negativo;
- el dato en mono;
- la etiqueta de sección con punto;
- el botón con caja de flecha;
- la lectura guiada con el scroll;
- el grano de película;
- el pie grande.

**No tomamos:**

- **Color:** ni el azul ni ningún acento. El color lo ponen las fotos.
- **Cifras:** ni los chips de cifras, porque no se publican cifras de Mario.
- **Firma gigante en la portada:** ahí manda el statement; la firma grande va en el pie.
- **Adornos:** ni texto en contorno ni marquesinas.

## Voz y contenido

- **Persona:** primera persona, la de Mario. El copy del spec (`marca/HOMEPAGE-SPEC-v1.md`) va tal cual, sin reescribir.
- **Citas:** solo frases literales de Mario, con su fuente anotada (entrevista, Substack, Instagram). El estudio no escribe frases en su nombre.
- **Prohibido:**
  - etiquetas tipo «Founder», «Creator» o «Writer»;
  - el tono de landing de coaching;
  - la urgencia;
  - los superlativos;
  - los emoji;
  - las cifras sin el OK de Mario.
- **Caja:**
  - versal solo en el póster (`poster-*`) y en el dato (`label`);
  - titulares, botones y menú en caja de frase;
  - «LIGNAROLO» va en versal porque así se escribe la marca.
- **Puntuación:** los titulares que son frase llevan punto final («Trabajar sobre la imagen que tienes de ti.»). Las preguntas van en `voz-italica`, solas y con aire.

## Color

La página alterna secciones enteras en dos temas; nunca se mezclan fondos dentro de una sección.

- **Oscuro (`fondo` = `negro`, `tinta` = `hueso`):** el que manda. Portada, Psicocibernética, Hipertrofia del Ser, banners, Conversaciones y pie.
- **Claro (`fondo` = `hueso`, `tinta` = `negro`):** los respiros. Origen y Contacto.
- **Arena:** para una pausa de estudio entre dos claras. Es el gris de Emprendimiento.

Reglas de uso:

- **Tokens:** usa siempre los semánticos (`fondo`, `fondo-alto`, `tinta`, `tinta-suave`, `linea`, `linea-fuerte`, `relleno`, `sobre-relleno`, `foco`) y nunca los valores sueltos.
- **Texto secundario:** `tinta-suave`, nunca en titulares.
- **Filetes:** `linea` para separar filas; `linea-fuerte` para bordes de campos y del botón fantasma.
- **Puros:** no hay blanco puro, ni negro puro, ni degradados de color. El único velo es `velo`, sobre fotografía, para que lea una frase.
- **Contraste:**
  - `tinta` sobre `fondo`: 16,5:1 en los dos temas;
  - `tinta-suave` sobre `fondo` y `fondo-alto`: 5,6:1 o más;
  - `linea-fuerte` sobre `fondo`: 3,5:1 o más.

## Tipografía

Cuatro voces, cada una con un trabajo:

| Voz | Familia | Estilos | Para |
| --- | --- | --- | --- |
| Póster | Archivo Condensed 800 | `poster-xl`, `poster`, `poster-s` | Statements y carteles, siempre en versal |
| Titular y texto | Geist 400–700 | `display`, `statement`, `lead`, `title`, `seccion`, `body`, `body-s`, `ui` | Titulares de sección, manifiesto, lectura, interfaz |
| Voz | Newsreader (tamaño óptico) e itálica | `voz-xl`, `voz`, `voz-italica`, `voz-s` | Las palabras de Mario: banners, titulares íntimos, preguntas, entradas |
| Dato | Geist Mono 400–500 | `label`, `label-s` | Fechas, duraciones, contadores, índices |

- **Medidas:** los tamaños de los estilos son a 1440 px. Los grandes crecen con el ancho, y cada estilo indica en su nota su tamaño en móvil.
- **Familias por bloque:** como mucho tres. El póster no comparte bloque con un `display`: o grita la condensada, o habla la grotesca.
- **Tracking:** negativo en titulares (`display` −0,045em, `statement` −0,03em) y positivo solo en el dato (+0,06em).
- **Medida de lectura:** `body` en la columna de lectura, con un máximo de 36em. El manifiesto, 21em.
- **Licencias:** las fuentes son libres (SIL OFL). Archivo Condensed es la instancia de Archivo variable con anchura 66.

## Retícula y espacio

- **Retícula:** 12 columnas, `medianil` de 24 px (16 en móvil) y `margen` de 40 px (20 en móvil). La tipografía grande vive cerca del borde.
- **Zonas:**
  - columna **índice** (1–3): etiqueta de sección, progreso y datos;
  - **contenido** (4–12): titulares, manifiesto, galerías;
  - **lectura** (7–11): párrafos y botones.
- **Ritmo:**
  - entre secciones, `space-11` (móvil `space-9`);
  - entre bloques, `space-8` (móvil `space-7`);
  - de la etiqueta al titular, `space-6`;
  - entre párrafos, 18 px;
  - los silencios (una pregunta, un cierre), `space-10`.
- **Asimetría:** el titular pesa a la izquierda y la lectura se desplaza a la derecha. La simetría se reserva para los silencios: preguntas centradas y la suscripción.
- **Forma:** radio `recto` en fotos, tarjetas y secciones; `fino` (2 px) en botones y campos. Sin sombras y sin cajas con borde de color.

## Fotografía

Mario como atleta del ser: actitud, cuerpo, calma y calle. Con penumbra y contraluz, negros profundos y piel natural.

- **Tratamiento:** la foto se etalona en el archivo y se sirve sin recomprimir, en color y con el grano por encima. Nunca se pasa a blanco y negro.
- **Encuadre:** la figura centrada con aire a los lados (banner), o a sangre por un lado (portada, Emprendimiento).
- **Fuentes:** fotos reales de Mario. Ver el grupo de recursos **Fotografia** y la pieza `Fotografia`.

## Movimiento

Una sola curva (`curva`) y pocas duraciones (`rapido`, `revelado`, `linea-sube`). El movimiento acompaña la lectura; nunca la retrasa.

- **Lectura guiada:** las palabras del manifiesto se encienden al cruzar la línea de lectura (de `apagado` a 1).
- **Líneas que suben:** pósters y frases de banner suben desde su máscara al entrar, escalonadas 0,09 s.
- **Fotos:** paralaje leve y asentamiento de 1,06 a 1 al pasar.
- **Anillos:** los anillos de Hipertrofia del Ser crecen desde la base con el scroll.
- **Movimiento reducido:** todo visible y quieto. Sin JavaScript, igual.

## Textura

Un grano de película fijo sobre toda la página (`grano`, mezcla soft-light). Es la única textura.

## Marca y submarcas

- **Mario Lignarolo:** el logotipo firma; no titula. Va en el menú y, grande, en el pie. Ver la pieza `Logo`.
- **Hipertrofia del Ser:** su publicación, con símbolo y cabecera propios dentro del mismo sistema (pieza `Submarca`). Es una propuesta pendiente de Mario.
- **Psicocibernética:** un mundo propio dentro de la página, más inmersivo y oscuro. Su identidad está por definir: sin azul hasta que se decida.
- **LIGNAROLO:** la marca de moda de Mario y su hermano Giorgio. Se usa su logotipo oficial; mientras no lo tengamos, va como firma en serif espaciada.

## Iconografía

No hay librería de iconos. La marca usa solo:

- flechas de trazo de 1,5 px en una caja de 16 px: ↗ (sale de la web), → ← (navega) y ↑ (vuelve arriba);
- el punto de la etiqueta de sección.

Las redes se nombran con palabras, nunca con logos. Sin emoji.

## Accesibilidad

- **Foco:** anillo de 2 px en `foco`, separado 3 px del control.
- **Contraste:** cumple 4,5:1 en todo texto y 3:1 en bordes y flechas, en los dos temas.
- **Alternativos:** toda foto lleva su texto alternativo descriptivo. Las decorativas, vacío.
- **Movimiento reducido:** se respeta siempre.
