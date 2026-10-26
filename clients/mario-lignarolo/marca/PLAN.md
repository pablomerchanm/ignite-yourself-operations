# Mario Lignarolo — Plan de marca

Pablo y Claude co-dirigen el pulido de la marca de Mario: narrativa, storytelling, voz y tono, y línea gráfica. Arranca el **22 oct 2026**.

**Regla:** la web no se toca hasta cerrar la fase 4. Cada fase termina en una decisión escrita en el registro de abajo, y lo que queda ahí no se reabre.

## Por qué

1. **No hay una idea central.** La portada junta siete conceptos: 4 territorios, 3 planos, termostato, Hipertrofia del Ser, Psico-Cibernética, «SER» y Lignarolo. Y se contradicen: el anillo de marca dibuja 4 territorios, pero Mario habla de 3 planos.
2. **Suena al estudio, no a Mario.** Además mezcla tercera persona (home) con primera (`/historia`, `/links`).
3. **La historia se cuenta tres veces** con el arco de todo el nicho («me perdí → toqué fondo → me encontré»), y lo único de Mario queda enterrado.
4. **La marca personal se volvió la de Psico-Cibernética:** azul, duotono y estética de startup, contra lo que Mario pidió (moda, clásico, sobrio).
5. **Decoramos antes de decidir:** unas 30 rondas de cambios sin cimientos cerrados.

## Fases

| # | Fase | Se decide | Entregable | Con Mario |
| --- | --- | --- | --- | --- |
| 1 | **Posicionamiento** | Para quién, la transformación, la idea grande, un solo marco, la escalera de productos, el ángulo | `01-PUBLICO.md` + «Mario en una frase» | Al cerrar: ¿se reconoce? |
| 2 | **Voz y tono** | Persona gramatical, registro, palabras sí/no, frases firma | Guía de voz con «así sí / así no» y 5 titulares | — |
| 3 | **Narrativa** | Historia maestra en 3 largos y el papel de cada página | Historia maestra + mapa de mensajes | Qué se cuenta |
| 4 | **Identidad visual** | Una de tres rutas, separar a Mario de Psico, dirección de foto | Sistema visual (tokens) + lista de tomas | Visual |
| 5 | **Aplicación** | — | Home, `/historia` y `/links` rehechas; lanzamiento | Revisión final |

## Registro de decisiones

| Fecha | Decisión | Quién |
| --- | --- | --- |
| 22 oct 2026 | **Escalera de productos aprobada:** Mario es la marca madre → Hipertrofia del Ser (gratis) → Psico-Cibernética (programa) → uno a uno. Lignarolo es la prueba de que emprende, no un producto. | Pablo |
| 22 oct 2026 | **«SER» no es un producto.** Es la palabra clave para escribirle por DM de su carrusel fijado del 17 oct 2025. El escalón de uno a uno lleva el nombre que Mario le dé, si existe hoy. | Pablo + Claude |
| 22 oct 2026 | **Sin estadísticas de Mario por ahora.** La marca se construye desde el criterio del estudio de lo que es una marca personal, con lo público (`01-PUBLICO.md`). | Pablo |
| 22 oct 2026 | **Modelo de referencia: tomilappi.com** (hecho por Pablo). Ver `02-MODELO.md`. | Pablo |
| 22 oct 2026 | **Orden de trabajo: primero narrativa, storytelling y secciones; lo visual al final.** Propuesta en `03-NARRATIVA.md`. | Pablo |
| 22 oct 2026 | **De Tomi, principios y no forma.** Nada de coordenadas, índice numerado ni sus fórmulas: la estructura sale de lo que Mario necesita (`03-NARRATIVA.md` v2). | Pablo |
| 22 oct 2026 | **Se descarta la v2 (frases suyas en primera persona como títulos). Base: la v1, en tercera persona**, sin lo propio de Tomi (`03-NARRATIVA.md` v3). Quedan decididas la voz (tercera persona, él solo en citas) y el orden (la obra antes que la historia). | Pablo |
| 24 oct 2026 | **`marca/BRIEF-MASTER-v1.md` es la fuente de verdad** (brief de Pablo): posicionamiento, narrativa, voz, arquitectura y dirección visual. Donde `03-NARRATIVA.md` o `02-MODELO.md` lo contradigan (roles, actos, serif en todo), manda el brief. | Pablo |
| 24 oct 2026 | **Iteración en `/v3`, sin tocar la web actual**, construida según el brief. La primera versión de `/v3` (inventada por el estudio) quedó descartada. Ruta oculta y no indexada; contenido en `data/v3.ts`. | Pablo |
| 22 oct 2026 | **Ángulo de la web: Mario como founder.** La página vende a Mario a título personal, desde la autoridad, y él abarca todas sus marcas y plataformas. No es una landing de Psico-Cibernética. | Pablo |
| 25 oct 2026 | **`marca/HOMEPAGE-SPEC-v1.md` manda sobre la home** (copy + estructura + diseño, de Pablo). Sustituye la arquitectura de secciones del brief: Hero → Origen → Psicocibernética → Hipertrofia del Ser → Emprendimiento / Lignarolo → Perspectivas (reels + conversaciones) → Contacto. Voz en primera persona. **El copy va tal cual, sin reescribir.** La versión anterior de `/v3` (portada tipo Nike + tesis + historia por percepción) quedó descartada; `/v3` se reconstruye con una sección por componente en `app/v3/sections/`. | Pablo |
| 26 oct 2026 | **Estructura aprobada; se entra en la capa visual.** Referencia visual principal: **Nike About** (about.nike.com: Mission y home). Sistema: grotesk condensada extra-negra para los statements (Archivo variable, OFL, solo en `/v3`), títulos de sección en caja baja y peso regular, serif regular para titulares editoriales, sin filetes ni rótulos diminutos, alternancia blanco cálido / casi negro, fotografía con tono de película. | Pablo + Claude |
| 26 oct 2026 | **Blanco y negro, sin azul; el negro manda** (hero, Psicocibernética, Hipertrofia del Ser, Conversaciones, pie). Escala tipográfica cerrada (tokens `--t-*`) y tres distancias (`--s-*`) en `v3.module.css`: nada se dimensiona fuera de ellas. **Hipertrofia del Ser** como el bloque «Exclusive Athlete Interviews» de Nike About: retícula de tres columnas con las entradas reales de Substack y sus portadas (`public/mario/substack/`), la central más alta. | Pablo |
| 26 oct 2026 | **Sistema tipográfico y de retícula rehecho** (Pablo: jerarquía y proporciones desajustadas, tipografías que no convencen). Tipos: Archivo condensada (statements), **Geist** (sans: títulos, interfaz, cuerpo) y **Newsreader** (serif con tamaño óptico: la voz de Mario). Escala de ocho pasos con un uso fijo cada uno; columna de lectura constante (7–11); ritmo título → titular → contenido igual en todas las secciones; simetría solo en los silencios. **Scrollytelling** (skill del estudio) en el manifiesto de Origen, los conceptos de Psicocibernética (escena fija) y el titular de Hipertrofia. Suscripción a Substack reducida. Las portadas de Substack, todas al mismo tamaño. | Pablo + Claude |
| 26 oct 2026 | **Emprendimiento rehecho** (Pablo: «se ve feo, estructurado, la foto se ve rara»). La sección toma el gris de estudio de su propia foto: el retrato de campaña de Lignarolo a sangre por la derecha, fundido con un degradado medido sobre su fondo, y la frase «Hay ideas que me gusta pensar…» en el vacío junto a Mario pensando. Después, los cinco territorios centrados que se encienden con el scroll, y Lignarolo como firma de casa de moda con tres detalles (producto, diseño, marca) tomados de la tienda pública. Fuera los marcadores de «foto pendiente». **Confirmar con Mario y Giorgio** el uso de esas tres fotos. | Pablo + Claude |
| 26 oct 2026 | **Se trabaja sección por sección, con «alta carpintería».** Primera: **la portada**. Entra el **logo de Mario** (PNG de Pablo, vectorizado a SVG; original en `marca/referencias/`) como cabecera de revista, en blanco. Una sola medida manda: el cuerpo del statement se calcula desde el alto de pantalla. Primero el logo medía lo mismo que la línea más larga; a Pablo le pareció enorme, así que pasa a ser φ² veces menor (firma, no titular), en la línea del menú, con el statement apoyado abajo y aire entre ambos. Foto etalonada en el archivo (negros profundos, piel natural, verde contenido) y servida sin recomprimir; fuera la desaturación por CSS. Coreografía de entrada (barrido del logo, líneas que suben desde su máscara, foto desde negro) y paralaje al bajar. | Pablo + Claude |

## Pendiente con Mario

Ver `01-PUBLICO.md` § 7 y las preguntas abiertas de `../ENTREVISTA-2026-10-06.md`.
