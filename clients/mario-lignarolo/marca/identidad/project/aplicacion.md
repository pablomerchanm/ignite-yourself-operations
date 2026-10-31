# Aplicación a la home

Cómo entra esta identidad en `/v3`, sección por sección. Es la propuesta para el paso siguiente; el copy no cambia.

## En toda la página

- **Paleta:** el negro pasa a `negro` (#0b0b0a) y el blanco cálido a `hueso` (#ecebe6). Emprendimiento toma `arena`.
- **Etiqueta de sección:** «● Nombre» en `seccion`, en la columna índice. Sustituye al título de sección actual.
- **Dato:** Geist Mono entra para fechas, contadores y duraciones.
- **Botones:** el botón con caja de flecha sustituye a los enlaces sueltos donde la sección pide un paso.
- **Cabecera:** logo a la izquierda, menú centrado y «Contacto» como botón a la derecha.
- **Pie:** menú grande, columnas `(Redes)` y `(Mundos)` y la firma a todo el ancho.
- **Márgenes:** 40 px en escritorio (20 px en móvil).

## Sección por sección

| Sección | Tema | Qué cambia |
| --- | --- | --- |
| Portada | oscuro | Se mantienen el statement en `poster` y el retrato. La cabecera pasa a la nueva. |
| Origen | claro | El titular, en `voz`. El manifiesto, en `statement` (Geist 600) con progreso en la columna índice. La pregunta, en `voz-italica`, centrada. |
| Banner «Todo es interno.» | foto | Sin cambios. |
| Psicocibernética | oscuro | El titular, en `display` (Geist negrita, caja de frase). Los cuatro conceptos, en `poster-s` en la escena fija, con el contador en mono. «Explorar Psicocibernética», como botón principal. |
| Banner «El músculo…» | foto | Sin cambios. |
| Hipertrofia del Ser | oscuro | Su cabecera en la columna índice. El titular, en `display`; opción: «El cuerpo [foto] se entrena.» como póster cruzado. Las entradas, con el dato en mono. La suscripción, con el botón nuevo. |
| Emprendimiento | arena | Titular en `voz`. Los territorios, en `statement`. Lignarolo, como hoy. |
| Perspectivas | oscuro | El título en `poster`. Los reels, como hoy. Las conversaciones, como filas con filetes bajo el vídeo destacado. |
| Banner «No se trata…» | foto | Sin cambios. |
| Contacto | claro | El titular en `display`. Campos con borde `linea-fuerte` y radio `fino`. «Enviar», como botón principal. |
| Pie | oscuro | El nuevo pie. |

## Aplicado en `/v4` (26 oct 2026)

La identidad está aplicada en `/v4`, una iteración paralela que deja `/v3` intacta. El contenido es el mismo y viene de `data/v3.ts`.

Al aplicarla, la página real obligó a cuatro ajustes. Ya están llevados a esta guía:

- **`voz`:** pasa de 62 a 72 px (móvil 40), porque Cormorant mide menos de ojo que la grotesca.
- **`poster-s`:** pasa de 56 a 80 px (móvil 44). Los conceptos de la escena fija son protagonistas.
- **La pregunta que cierra Origen:** va en `voz` itálica, no en `voz-italica`. Pequeña se perdía.
- **Cabecera de Hipertrofia del Ser:** se queda a tamaño de título en su propia fila, en lugar de encogerse a la columna índice. Debajo, el titular desde la columna 4.

Y tres cosas que se mantienen de `/v3` a propósito:

- **Origen:** conserva la foto fija a la derecha y el progreso bajo la foto. Funciona y no compite con la columna índice.
- **Emprendimiento:** conserva su gris de estudio medido sobre la foto, que hace de «arena». Cambiarlo rompería el fundido.
- **Cabecera:** no se fija al bajar. Fijarla obliga a cambiar de tema sobre secciones claras y oscuras, y queda pendiente de decidir.

Cambio visible: el retrato de Psicocibernética vuelve a color (regla de la guía). Es una foto con fondo azul verdoso; si se prefiere en blanco y negro, se decide aquí.

## Orden de trabajo

Se aplica en este orden, revisando cada paso con Pablo antes del siguiente:

1. Tokens globales: color, tipos y márgenes.
2. Cabecera y pie.
3. Sección por sección, de arriba abajo.
