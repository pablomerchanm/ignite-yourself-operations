/**
 * MI HISTORIA — /historia: la carta de Mario en primera persona (formato
 * «founder story»), de lo que lo perdió a lo que construyó.
 *
 * Fuentes por párrafo (comentario encima de cada uno):
 *   [MARIO]       textual de su carrusel de Instagram del 17 oct 2025.
 *   [ENTREVISTA]  sus palabras en la entrevista (ENTREVISTA-2026-10-06.md),
 *                 transcritas y editadas solo para leerse.
 *   [ESTUDIO]     tejido del estudio en su voz.
 * TODO es [CONFIRMAR]: Mario aprueba la carta completa antes de lanzar.
 * Fuera, por privado (ver «No publicar» en ENTREVISTA): ceremonias y
 * sustancias, la ruptura, el dinero prestado, el producto del dropshipping,
 * cifras, nombres de mentores sin confirmar y casos de clientes.
 *
 * `**así**` marca las frases que se leen en negrita (como en una carta
 * subrayada a mano: lo que se lee aunque solo se escanee).
 */
import { channels, connect, lignarolo, psico, psicoUrl } from "./content";

export type StoryMedia =
  | { kind: "image"; src: string; alt: string; ratio: "1/1" | "4/5" | "4/3" | "16/9" }
  | { kind: "video" }
  | { kind: "diptych" };

export type StorySection = {
  id: string;
  title?: string;
  paras: string[];
  pull?: string;
  media?: StoryMedia;
  /** side: texto y foto lado a lado en escritorio · wide: la foto, a lo ancho, después del texto. */
  layout?: "side" | "wide";
};

export const historia = {
  meta: {
    title: "Mi historia — Mario Lignarolo",
    description:
      "Cómo me perdí, cómo volví y todo lo que construí desde entonces: la historia detrás de Psico-Cibernética e Hipertrofia del Ser.",
  },
  eyebrow: "Mi historia",
  // [ESTUDIO]
  title: ["Cómo me perdí,", "cómo volví"],
  titleItalic: "y todo lo que construí desde entonces.",
  // [ESTUDIO] en su voz, con su idea de «llenar por fuera lo que faltaba por dentro».
  dek: "Durante años **busqué afuera lo que me faltaba por dentro**: reconocimiento, validación, resultados. Lograba cosas y **volvía a los mismos patrones**. Esta es la historia completa, y lo que nació de ella.",
  byline: "Mario Lignarolo",
  bylineRole: "Psico-Cibernética · Hipertrofia del Ser",

  sections: [
    {
      id: "empieza",
      layout: "side",
      media: { kind: "image", src: "/mario/hero.jpg", alt: "Mario Lignarolo, retrato sobre fondo verde oscuro.", ratio: "1/1" },
      paras: [
        // [ENTREVISTA] «Mi historia empieza cuando empecé a compararme con las personas… unos 16 años».
        "Mi historia empieza cuando **empecé a compararme con las personas**. Tenía unos 16 años y miraba a la gente que se movía en redes. Quería algo, quería ser alguien, **sin entender para qué**.",
        // [MARIO]
        "Siempre me encantó **crear desde mi esencia**. Emprender, construir, explorar mi creatividad… eso me hacía sentir vivo. Pero tenía una creencia que me limitaba: «Eso no aporta. Eso no tiene valor».",
        // [MARIO]
        "Ser el menor de cinco hermanos me hizo creer que tenía que **seguir el camino tradicional**. Empecé mis estudios no porque me gustaran, sino porque sentía que debía seguir la tradición familiar. Y ahí empezó todo: **la búsqueda de validación y aprobación externa**, porque no sabía lo que quería.",
      ],
    },
    {
      id: "perdido",
      title: "Hacer todo «bien» y estar perdido",
      // [MARIO]
      pull: "Es difícil encontrarte cuando no sabes que estás perdido.",
      paras: [
        // [MARIO]
        "**Me gradué de algo que no era lo mío.** Dejé muchas cosas que me apasionaban por perseguir sueños que nunca fueron míos.",
        // [ENTREVISTA] [CONFIRMAR] que se cuente Coca-Cola.
        "Después de graduarme trabajé en Coca-Cola. No me gustó: **yo quería emprender, ser mi propio jefe.** En Medellín empecé en el mundo del dropshipping, del marketing.",
        // [ENTREVISTA]
        "Aprendí muchísimo. Pero estaba vendiendo algo que ni siquiera me gustaba, que no me conectaba. **La desconexión de eso es brutal.**",
      ],
    },
    {
      id: "fondo",
      title: "Toqué fondo",
      layout: "wide",
      media: { kind: "diptych" },
      paras: [
        // [ENTREVISTA]
        "Estaba desconectado, fuera de forma. **Todos los aspectos de mi vida estaban mal.**",
        // [MARIO] [CONFIRMAR] que se publique.
        "Intenté llenar el vacío con alcohol y comida chatarra. Buscaba llenar por fuera lo que faltaba por dentro. Pero solo me hundía más.",
        // [MARIO] + [ENTREVISTA]
        "Toqué fondo varias veces. **Toda mi identidad se cayó.** Cerré el negocio y me tocó empezar de cero. El Mario de ese momento estaba **demasiado, demasiado perdido**.",
      ],
    },
    {
      id: "invertir",
      title: "Empecé a invertir en mí",
      paras: [
        // [MARIO]
        "Hasta que decidí que algo tenía que cambiar. **Empecé a invertir en mi crecimiento.** Mejoré mi entorno. Dejé ir lo que no servía.",
        // [ENTREVISTA] «Yo me desaparecía, no me conectaba a las clases… todo es interno».
        "Aun así había días en que me desaparecía, en que no me conectaba a las clases. Ahí lo entendí: **todo es interno. Todo es dentro de mí.**",
      ],
    },
    {
      id: "crear",
      title: "Volver a crear",
      layout: "side",
      media: { kind: "image", src: lignarolo.image.src, alt: lignarolo.image.alt, ratio: "4/3" },
      paras: [
        // [MARIO]
        "Empecé en Lignarolo. Y sentí nuevamente algo que pensé que se había ido: **el placer de crear.** De explorar mi creatividad. De construir sin miedo al juicio. Era como volver a casa después de tanto tiempo.",
        // [ENTREVISTA] + Pablo (22 oct): Giorgio es su hermano. [CONFIRMAR] que se nombre
        // y su rol; sin la cifra de los primeros meses.
        "Lignarolo era la marca de mi hermano Giorgio, y me invitó a llevar el marketing. Ahí aprendí cómo funciona una empresa: **crear producto, venderlo, construir una marca.**",
      ],
    },
    {
      id: "respirar",
      title: "Lo que nunca había sentido",
      layout: "side",
      media: { kind: "image", src: psico.image.src, alt: psico.image.alt, ratio: "1/1" },
      paras: [
        // [ENTREVISTA] el anuncio de respiración consciente (programa de unos 11 días).
        "Un día vi un anuncio de respiración consciente y me sentí identificado: lo que yo estaba viviendo, ese hombre ya lo había vivido. Compré el programa y empecé a respirar. **Nunca lo había sentido en mi vida.**",
        // [ENTREVISTA]
        "El cambio no llegó de golpe. Pero empecé a juntar todo lo que había aprendido: marketing, marca personal, respiración, desarrollo personal. Y dije: **aquí hay algo.**",
        // [ENTREVISTA, segundo audio] editado.
        "Después me certifiqué en respiración consciente. Hoy es lo primero que hago al despertar. ¿Cómo manejar la ansiedad? **Respirando.** La ansiedad es tu mente en el futuro; la respiración te trae al presente, porque es lo único que puedes controlar.",
      ],
    },
    {
      id: "psico",
      title: "Por qué creé Psico-Cibernética",
      layout: "wide",
      media: { kind: "video" },
      paras: [
        // [ENTREVISTA] «vamos a empaquetar toda esta vuelta y volverla un producto».
        "Dije: **vamos a empaquetar todo esto y volverlo un producto.** Así llegó mi primer cliente.",
        // [ENTREVISTA, segundo audio]
        "Yo sé que este proceso a las personas les va a cambiar la vida. ¿Por qué? **Porque a mí me cambió la vida.** Por eso me siento coherente ofreciéndolo.",
        // [CONFIRMADO] encuadre público del programa.
        "Son 40 días de **breathwork y reprogramación del subconsciente**: respirar, visualizar y trabajar el autoconcepto, todos los días.",
      ],
    },
    {
      id: "ser",
      title: "El ser también es un músculo",
      layout: "side",
      media: { kind: "image", src: "/mario/entreno-banco.jpg", alt: "Mario entrenando en el gimnasio, de espaldas.", ratio: "1/1" },
      paras: [
        // [ENTREVISTA, segundo audio]
        "La gente se pone un objetivo porque llega el verano: me voy al gimnasio porque quiero estar bien para la playa. ¿Y qué pasa después de la playa? **Vuelven a sus viejos patrones**, porque se enfocaron en un resultado y no en sostener una identidad.",
        // [ESTUDIO] la idea central del método.
        "Por eso lograrlo no basta: **hay que convertirse en alguien capaz de sostenerlo.** Trabajo el ser en tres planos: espiritual, mental y físico.",
        // [ENTREVISTA, segundo audio]
        "¿En qué tanto caos puedes mantener la calma? **Esa es la verdadera hipertrofia del ser.**",
      ],
    },
  ] satisfies StorySection[],

  built: {
    title: { before: "Y esto es lo que", strong: "construí." },
    // [ESTUDIO]
    intro: "Lo que empezó como mi propio proceso hoy es un camino para emprendedores que ya lograron cosas y quieren el siguiente nivel, **sin volver a sus viejos patrones**.",
    items: [
      {
        kicker: "Empieza aquí",
        name: "Psico-Cibernética",
        text: "40 días de breathwork y reprogramación del subconsciente. El proceso que a mí me cambió la vida.",
        cta: "Conocer Psico-Cibernética",
        href: psicoUrl,
      },
      {
        kicker: "Gratis",
        name: "Hipertrofia del Ser",
        text: "Lo que escribo sobre identidad, cuerpo y expansión, en Substack.",
        cta: "Leer en Substack",
        href: channels.substack.href,
      },
      {
        kicker: "Uno a uno",
        name: "«SER»",
        text: "Si eres emprendedor y quieres volver a conectar con tu esencia, escríbeme «SER» por mensaje directo.",
        cta: "Escribir «SER»",
        href: connect.ser.href,
      },
      {
        kicker: "Emprender",
        name: "Lignarolo",
        text: lignarolo.description,
        cta: "Visitar lignarolo.com",
        href: lignarolo.href,
      },
    ],
  },

  close: {
    paras: [
      // [ENTREVISTA] cierre del primer audio.
      "Tenía que ser como tenía que ser. Para darme el permiso de encontrar las cosas que me gustan y, como consecuencia, **poder aportar valor a las personas, porque lo viví.**",
      // [MARIO] remate de su carrusel + [ESTUDIO].
      "Aprendí que **el poder nunca estuvo afuera. Siempre estuvo dentro.** Si llegaste hasta aquí, empieza por donde te llame: los 40 días, lo que escribo o una conversación conmigo.",
    ],
    signature: "Mario Lignarolo",
  },

  // Barra fija abajo (como la del formato de referencia): el siguiente paso.
  bar: {
    name: psico.name,
    line: psico.promise,
    // en móvil la línea larga no cabe junto al botón
    short: "40 días · breathwork",
    cta: "Empezar",
    href: psicoUrl,
  },
};
