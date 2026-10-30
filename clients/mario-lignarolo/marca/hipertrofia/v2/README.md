# Hipertrofia del Ser · emblema (propuesta 2)

**Estado:** propuesta del estudio (30 oct 2026), pedida por Pablo. Pendiente de Pablo y de Mario. No sustituye todavía a los anillos de la propuesta 1 (`../`) ni está aplicada en la web. Hoja del sistema: `hds-sistema-v2.jpg`.

## Concepto: la talla

La idea viene de la frase que se atribuye a Miguel Ángel: la escultura ya está dentro del bloque, y el trabajo del escultor es quitar el mármol que sobra.

- **El emblema:** una figura se levanta de la piedra. La rodilla sigue hundida en el bloque, una mano se apoya en él y el otro brazo ya se estira hacia arriba.
- **La hipertrofia de Mario:** crecer quitando. Es su propia frase, «No se trata de hacer más. Se trata de SER más.» (carrusel fijado de Instagram, ver `data/v3.ts`).
- **La línea de Miguel Ángel:** él dejó a medias a los *Prigioni*, figuras que salen a medias del bloque. Uno de ellos es el *Atlante*.

> La frase de Miguel Ángel es una atribución popular, no una cita documentada. Si se usa en la web o en piezas, hay que escribir «se atribuye a…».

## Estilo

Una tinta, como un grabado en madera o linóleo. La figura es una silueta maciza y la anatomía se dibuja con cortes blancos, así que la figura también está «tallada». La referencia de Pablo fue un emblema de un Atlas arrodillado; se usó solo como referencia de estilo, sin copiar su figura.

El nombre, **HIPERTROFIA DEL SER**, va en Archivo ancha (wdth 125), la grotesca de la web:

- **horizontal:** en dos líneas, 800;
- **vertical:** en una línea espaciada, 700, +20 %.

El contraste entre la figura clásica y la grotesca ancha es lo que le da el aire de marca deportiva.

## Archivos

| Archivo | Uso |
| --- | --- |
| `hds-emblema-{negro,blanco}.svg` | Emblema solo (la figura que se levanta) |
| `hds-logo-horizontal-{negro,blanco}.svg` | Emblema y nombre en dos líneas. Logo principal. |
| `hds-logo-vertical-{negro,blanco}.svg` | Emblema encima y nombre espaciado |
| `*-alt-*` | Alternativa: la figura con los brazos arriba, saliendo del bloque |
| `fuente/` | Las imágenes originales, antes del calco |

- **Formato:** todo en contornos, sin depender de la fuente. Un solo relleno por SVG: negro `#0B0B0A` o hueso `#ECEBE6`.
- **Para regenerarlos:**
  1. Calcar la imagen a vector con potrace: umbral al 50 % y el doble de resolución.
  2. Pasar el nombre a contornos con fontkit desde `app/v3/fonts/`.

## Pendiente

- **Versión pequeña.** Por debajo de ~32 px se pierden los cortes de la anatomía. Hace falta una versión simplificada (solo silueta y bloque) para el favicon y el avatar.
- **Origen de la figura y derechos.** La figura se generó con IA (Higgsfield, GPT Image 2.5, calidad media, solo con un texto de entrada; ninguna foto de Mario) y luego se calcó a vector. En muchas jurisdicciones una imagen generada por IA no tiene derechos de autor propios. Si Mario quiere registrar la marca o defenderla, conviene que un ilustrador la redibuje sobre esta base antes de cerrarla. **[CONFIRMAR]** con Pablo.
- **Aprobación de Mario.**
