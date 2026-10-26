/**
 * ITERACIÓN /v3 — la home según `marca/HOMEPAGE-SPEC-v1.md` (Pablo, 25 oct 2026).
 * Ruta oculta y no indexada; la home actual no cambia.
 *
 * Reglas del spec que gobiernan este archivo:
 *  - El copy va tal cual: no se reescribe ni se añade copy de marketing.
 *  - Sin etiquetas (founder, creator, coach, writer…): se demuestra, no se explica.
 *  - Nada inventado: lo que falta va como placeholder marcado.
 *
 * [SPEC] = copy del documento de Pablo, literal.
 * [REAL] = dato público de Mario (Substack, Instagram, YouTube), sin retocar.
 * [PENDIENTE] = falta confirmar o producir; se muestra como placeholder en borrador.
 */
import { channels } from "./content";
import { videos } from "./videos";

const substack = channels.substack.href.replace(/\/$/, "");
// [BRIEF] la página actual de Psicocibernética (pendiente decidir: lovable vs Skool).
const psicoUrl = "https://psicocibernetica.lovable.app/";
const lignaroloUrl = "https://www.lignarolo.com";

export type Reel = { code: string; title: string; duration: string; date: string; src: string };
export type Piece = { title: string; dek: string; date: string; minutes: number; href: string; image: { src: string; alt: string } };
export type Talk = { title: string; youtubeId: string; duration?: string };
export type LegalPart = string | { label: string; href: string };
export type Banner = {
  phrase: string[];
  layout: "split" | "corner";
  tone: "light" | "dark";
  size: "poster" | "display" | "serif";
  at: { x: number; w: number; y: number };
  image: { desktop: string; mobile: string; alt: string };
};

/** [REAL] minutos de lectura a partir del conteo de palabras del archivo público (~220 ppm). */
const minutes = (words: number) => Math.max(1, Math.round(words / 220));
const post = (slug: string) => `${substack}/p/${slug}`;

export const v3 = {
  meta: {
    title: "Mario Lignarolo — Transformación de identidad",
    description: "Explorando cómo cambiar quién eres transforma lo que eres capaz de construir.",
  },
  notice: "Borrador · iteración /v3 · no indexada",

  nav: [
    { label: "Psicocibernética", href: "#psicocibernetica" },
    { label: "Hipertrofia del Ser", href: "#hipertrofia" },
    { label: "Perspectivas", href: "#perspectivas" },
    { label: "Contacto", href: "#contacto" },
  ],

  /* 01 · HERO — [SPEC] nombre, territorio y statement en siete líneas. */
  hero: {
    name: ["Mario", "Lignarolo"],
    territory: "Transformación de identidad",
    statement: ["Explorando", "cómo cambiar", "quién eres", "transforma", "lo que eres", "capaz de", "construir"],
    // Etalonado sobre el original (hero.jpg): negros profundos, piel natural,
    // el verde del fondo contenido. Se sirve tal cual (sin recomprimir).
    image: { src: "/mario/hero-v3.jpg", alt: "Mario Lignarolo, retrato." },
  },

  /* 02 · TERRITORIO / ORIGEN — [SPEC] */
  origen: {
    label: "Metafísica · Espiritualidad · Consciencia · Autoimagen",
    headline: "Estoy obsesionado con entender ideas profundas y expresarlas a través de mí.",
    paragraphs: [
      "Durante mucho tiempo busqué respuestas afuera.",
      "Seguí caminos que creía que debía seguir. Perseguí resultados. Emprendí. Transformé mi cuerpo. Intenté encontrar claridad haciendo más, aprendiendo más, construyendo más.",
      "Hasta que empecé a entender que muchas de las cosas que quería cambiar afuera tenían una raíz mucho más profunda.",
      "Desde entonces exploro la relación entre quién eres, la imagen que sostienes de ti, cómo actúas y la realidad que terminas construyendo.",
      "Por eso me interesan la consciencia, la espiritualidad, el cuerpo, el emprendimiento y la acción. No como mundos separados, sino como distintas formas de investigar la misma pregunta:",
    ],
    question: "¿En quién necesitas convertirte para vivir de una manera diferente?",
    image: { src: "/mario/entreno-curl.jpg", alt: "Mario entrenando, de espaldas, en penumbra.", position: "50% 20%" },
  },

  /* 03 · PSICOCIBERNÉTICA — [SPEC] puerta a un mundo; no landing. */
  psico: {
    label: "Psicocibernética",
    headline: "Trabajar sobre la imagen que tienes de ti.",
    paragraphs: [
      "Psicocibernética es una de las formas en las que exploro el cambio de identidad desde la práctica.",
      "Combina autoconcepto, respiración consciente, hipnomeditación e imaginación para trabajar sobre la relación entre lo que crees de ti, cómo te sientes y la forma en que actúas en el mundo.",
      "Es un espacio donde se cruzan psicocibernética, principios herméticos, Ley de Asunción, sombra, propósito y acción.",
    ],
    statement: "Lo que se instaló sin tu permiso puede empezar a cambiar con tu participación consciente.",
    cta: "Explorar Psicocibernética",
    href: psicoUrl,
    concepts: ["Autoconcepto", "Respiración", "Hipnomeditación", "Imaginación"],
    secondary: ["Hermetismo", "Ley de Asunción", "Sombra", "Propósito"],
    image: { src: "/mario/psico.jpg", alt: "Mario, retrato en doble exposición.", position: "50% 30%" },
  },

  /* 04 · HIPERTROFIA DEL SER — [SPEC] copy; [REAL] piezas del archivo público. */
  hipertrofia: {
    label: "Hipertrofia del Ser",
    // [PROPUESTA] cabecera de la publicación (pedida por Pablo, 26 oct): el nombre
    // en dos voces —HIPERTROFIA en versal espaciada, «del Ser» en itálica— bajo
    // su símbolo (app/v3/HdsSymbol.tsx; originales en marca/hipertrofia/).
    masthead: ["Hipertrofia", "del Ser"],
    headline: ["El cuerpo se entrena.", "El ser también."],
    paragraphs: [
      "Hipertrofia del Ser es el espacio donde desarrollo ideas sobre autoimagen, consciencia, cuerpo, propósito, emprendimiento y expansión personal.",
      "Un lugar para pensar cómo crece una persona, no solo por fuera, sino también por dentro.",
    ],
    cta: "Leer Hipertrofia del Ser",
    href: substack,
    // Seis entradas reales con la portada que Mario les puso en Substack
    // (título, subtítulo, fecha y portada tal cual; minutos a partir del conteo de palabras).
    pieces: [
      { title: "Cómo dominar la Ley de Asunción para doblegar la realidad", dek: "el paso a paso definitivo sin misticismo", date: "8 oct 2026", minutes: minutes(1894), href: post("como-dominar-la-ley-de-asuncion-para"), image: { src: "/mario/substack/como-dominar-la-ley-de-asuncion-para.jpg", alt: "" } },
      { title: "No puedes fallar", dek: "Cómo ser asquerosamente disciplinado", date: "29 sep 2026", minutes: minutes(1800), href: post("no-puedes-fallar"), image: { src: "/mario/substack/no-puedes-fallar.jpg", alt: "" } },
      { title: "Emprender es aprender. No vender.", dek: "Agencia, Flow y los 5 motivadores que lo activan", date: "26 sep 2026", minutes: minutes(2287), href: post("emprender-es-aprender-no-vender"), image: { src: "/mario/substack/emprender-es-aprender-no-vender.jpg", alt: "" } },
      { title: "Ya eres", dek: "El músculo más atractivo que puedes desarrollar no está en tu cuerpo.", date: "6 sep 2026", minutes: minutes(2207), href: post("ya-eres"), image: { src: "/mario/substack/ya-eres.jpg", alt: "" } },
      { title: "La simplicidad de asumir tu estado", dek: "No puedes cambiar el mundo externo hasta que entiendas tu mundo interno.", date: "10 sep 2026", minutes: minutes(1427), href: post("la-simplicidad-de-asumir-tu-estado"), image: { src: "/mario/substack/la-simplicidad-de-asumir-tu-estado.jpg", alt: "" } },
      { title: "Vive de tus intereses.", dek: "Empieza por lo que no puedes dejar de aprender.", date: "1 oct 2026", minutes: minutes(1668), href: post("vive-de-tus-intereses"), image: { src: "/mario/substack/vive-de-tus-intereses.jpg", alt: "" } },
    ] as Piece[],
    // Módulo de suscripción (referencia: el widget de Substack), construido en el sistema.
    // El formulario envía al flujo sin JavaScript de Substack; la confirmación llega por correo.
    subscribe: {
      label: "Suscríbete en Substack",
      // [PROPUESTA] la única línea nueva de este módulo; pendiente de Pablo.
      headline: "Cada entrada, en tu correo.",
      // [REAL] nombre y autor de la publicación en Substack. En lugar de su logo
      // (public/mario/substack/logo.png), el símbolo propuesto: [PROPUESTA] si Mario
      // lo aprueba, cambiarlo también en Substack.
      name: "Hipertrofia del Ser",
      by: "Por Mario Lignarolo",
      action: `${substack}/api/v1/free?nojs=true`,
      // [REAL] textos del propio widget de Substack en español.
      placeholder: "Escribe tu correo electrónico...",
      button: "Suscribirse",
      legal: [
        "Al suscribirte aceptas los ",
        { label: "Términos de uso", href: "https://substack.com/tos" },
        " de Substack, su ",
        { label: "Política de privacidad", href: "https://substack.com/privacy" },
        " y su ",
        { label: "Aviso de recopilación de información", href: "https://substack.com/ccpa#personal-data-collected" },
        ".",
      ] as LegalPart[],
      // [PENDIENTE] Substack muestra en su widget «Over 3,000 subscribers»; no se publica sin el OK de Mario.
    },
  },

  /* 05 · EMPRENDIMIENTO / LIGNAROLO — [SPEC] aprobada temporalmente. Menor peso. */
  emprendimiento: {
    label: "Emprendimiento",
    headline: "Hay ideas que me gusta pensar. Otras necesito construirlas.",
    paragraphs: [
      "Para mí, emprender empieza ahí.",
      "Seguir una curiosidad lo suficiente como para llevarla a la realidad. Ver qué pasa. Equivocarme. Ajustar. Aprender.",
    ],
    fields: "Moda. Fitness. Respiración. Escritura. Desarrollo personal.",
    close: "No siempre sé qué forma van a tomar. Me interesa descubrirlo construyendo.",
    // [REAL] retrato de campaña de Lignarolo: Mario, pensando, con mocasines de la marca.
    image: { src: "/mario/lignarolo.jpg", alt: "Mario sentado de perfil, la mano en el mentón, con mocasines Lignarolo." },
    lignarolo: {
      name: "Lignarolo",
      text: "Con LIGNAROLO, esa curiosidad tomó forma en producto, diseño y marca, junto a mi hermano Giorgio.",
      cta: "LIGNAROLO",
      href: lignaroloUrl,
      // [REAL] detalles de la tienda pública (lignarolo.com), en el orden de la frase:
      // producto, diseño y marca. [CONFIRMAR] con Mario y Giorgio el uso de estas fotos.
      details: [
        { src: "/mario/lignarolo/producto.jpg", alt: "Detalle de una bota Lignarolo en cuero, con picado brogue." },
        { src: "/mario/lignarolo/diseno.jpg", alt: "Detalle de un mocasín Lignarolo en cuero burdeos." },
        { src: "/mario/lignarolo/marca.jpg", alt: "Etiqueta Lignarolo cosida en un forro de cuadros." },
      ],
      // [PENDIENTE] Mario y Giorgio juntos, fabricación y campaña.
    },
  },

  /* 06 · PERSPECTIVAS — [SPEC] casi sin copy. [REAL] piezas públicas recientes. */
  perspectivas: {
    title: "Perspectivas",
    reels: {
      label: "Reels",
      // Portadas y textos tal como los publicó Mario en Instagram (octubre 2026).
      items: [
        { code: "DemZQIDMYzY", title: "El poder de meditar en movimiento", duration: "1:08", date: "17 oct 2026" },
        { code: "DeejjK5AmLJ", title: "La manifestación es una decisión.", duration: "2:21", date: "14 oct 2026" },
        { code: "DewmVL-MbVO", title: "El cielo nunca ha tenido un problema de provisión", duration: "1:44", date: "21 oct 2026" },
        { code: "DesRYxzP3Cr", title: "Toda rosa viene con espinas", duration: "2:38", date: "19 oct 2026" },
        { code: "DepFK0jslPj", title: "Cualquiera que te diga que mates a tu ego no ha entendido el juego.", duration: "2:04", date: "18 oct 2026" },
        { code: "DecAQdqMctR", title: "Tu no necesitas tus deseos, tus deseos te necesitan a ti", duration: "2:16", date: "13 oct 2026" },
        { code: "Deko3fmsHi1", title: "No reces por algo que no estás dispuesto a desarrollar", duration: "1:57", date: "16 oct 2026" },
        { code: "DefZfaqvJJE", title: "No todos pueden ver lo que tú ves cuando cierras los ojos.", duration: "1:37", date: "14 oct 2026" },
      ].map((r) => ({ ...r, src: `/mario/reels/${r.code}.jpg` })) as Reel[],
      all: { label: "Ver más en Instagram", href: channels.instagram.href },
    },
    conversaciones: {
      label: "Conversaciones",
      // [REAL] videos del canal (título e id). Duración [PENDIENTE] hasta tenerla confirmada.
      items: videos
        .filter((v): v is typeof v & { youtubeId: string } => Boolean(v.youtubeId))
        .map((v) => ({ title: v.title, youtubeId: v.youtubeId, duration: v.duration })) as Talk[],
      all: { label: "Todas las conversaciones", href: channels.youtube.href },
    },
  },

  /* BANNERS — pedidos por Pablo (26 oct): a sangre, foto de actitud atlética y
     una frase de Mario, al modo de los banners de Nike. Solo frases suyas,
     literales, con su fuente. Fotos de sus carruseles de Instagram (2160 px),
     recortadas por encima del texto de diseño y retocadas donde lo tapaba.
     layout «split»: la frase partida a ambos lados de la figura (at.x = centro
     de la figura, at.w = hueco que deja, at.y = altura de la frase).
     layout «corner»: un bloque en el claro de la foto (at.x = borde izquierdo,
     at.w = ancho, at.y = arriba). Todo en % de la foto de escritorio.
     phrase: en split, una parte a cada lado; en corner, una parte por línea.
     tone: color de la frase. size: poster / display / serif. */
  banners: {
    interno: {
      // [MARIO] entrevista del 6 oct 2026 (ENTREVISTA-2026-10-06.md, § marca personal).
      phrase: ["Todo es", "interno."],
      layout: "split",
      tone: "light",
      size: "poster",
      at: { x: 50.5, w: 41, y: 40 },
      image: { desktop: "/mario/banners/interno-escritorio.jpg", mobile: "/mario/banners/interno-movil.jpg", alt: "Mario con los ojos cerrados, bajo una luz roja." },
    },
    musculo: {
      // [MARIO] subtítulo de «Ya eres», Hipertrofia del Ser (Substack, 6 sep 2026).
      phrase: ["El músculo más atractivo", "que puedes desarrollar", "no está en tu cuerpo."],
      layout: "corner",
      tone: "dark",
      size: "serif",
      at: { x: 58, w: 39, y: 29 },
      image: { desktop: "/mario/banners/musculo-escritorio.jpg", mobile: "/mario/banners/musculo-movil.jpg", alt: "Mario sin camiseta, con gorra, mirando a un lado." },
    },
    ser: {
      // [MARIO] su carrusel fijado de Instagram (DP49jAVCZcW): «…no se trata de hacer más. Se trata de SER más.»
      phrase: ["No se trata de hacer más.", "Se trata de SER más."],
      layout: "split",
      tone: "light",
      size: "display",
      at: { x: 52, w: 28, y: 50 },
      image: { desktop: "/mario/banners/ser-escritorio.jpg", mobile: "/mario/banners/ser-movil.jpg", alt: "Mario cruzando una calle al atardecer." },
    },
  } satisfies Record<string, Banner>,

  /* 07 · CONTACTO — [SPEC] placeholder utilitario. Sin frases emocionales. */
  contacto: {
    label: "Contacto",
    lead: "Para:",
    paths: ["Prensa", "Podcasts", "Charlas", "Colaboraciones"],
    form: {
      name: "Nombre",
      email: "Email",
      reason: "Motivo",
      reasons: ["Prensa", "Podcast", "Charla / Evento", "Colaboración", "Trabajo privado", "Otro"],
      message: "Mensaje",
      submit: "Enviar",
    },
    // [PENDIENTE] destino del formulario (correo o servicio) por definir.
    pending: "Formulario de muestra · destino pendiente",
  },

  footer: {
    links: [
      channels.instagram,
      channels.youtube,
      channels.tiktok,
      { label: "Hipertrofia del Ser", href: substack },
      { label: "Psicocibernética", href: psicoUrl },
      { label: "LIGNAROLO", href: lignaroloUrl },
    ],
  },
};
