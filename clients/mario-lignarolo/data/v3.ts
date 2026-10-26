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
export type Piece = { title: string; dek: string; date: string; minutes: number; href: string };
export type Talk = { title: string; youtubeId: string; duration?: string };

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
    image: { src: "/mario/hero.jpg", alt: "Mario Lignarolo, retrato." },
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
    headline: ["El cuerpo se entrena.", "El ser también."],
    paragraphs: [
      "Hipertrofia del Ser es el espacio donde desarrollo ideas sobre autoimagen, consciencia, cuerpo, propósito, emprendimiento y expansión personal.",
      "Un lugar para pensar cómo crece una persona, no solo por fuera, sino también por dentro.",
    ],
    cta: "Leer Hipertrofia del Ser",
    href: substack,
    cover: { src: "/links/img/hipertrofia.jpg", alt: "Mario, de espaldas, cargando un disco.", position: "50% 20%" },
    // Portada: la pieza que mejor abre el territorio. Título, subtítulo y fecha reales.
    lead: {
      title: "Lo que estás llamado a construir no va a competir con lo que estás llamado a ser",
      dek: "La marca personal es tu vehículo para cumplir esa visión",
      date: "12 sep 2026",
      minutes: minutes(1530),
      href: post("lo-que-estas-llamado-a-construir"),
    } as Piece,
    // Secundarios, a escalas distintas: el primero grande, el resto en listado.
    pieces: [
      { title: "Cómo ser tan atractivo que la realidad te persiga", dek: "Donde la espiritualidad y la ciencia convergen", date: "16 sep 2026", minutes: minutes(2963), href: post("como-ser-tan-atractivo-que-la-realidad") },
      { title: "Emprender es aprender. No vender.", dek: "Agencia, Flow y los 5 motivadores que lo activan", date: "26 sep 2026", minutes: minutes(2287), href: post("emprender-es-aprender-no-vender") },
      { title: "No puedes fallar", dek: "Cómo ser asquerosamente disciplinado", date: "29 sep 2026", minutes: minutes(1800), href: post("no-puedes-fallar") },
      { title: "Vive de tus intereses.", dek: "Empieza por lo que no puedes dejar de aprender.", date: "1 oct 2026", minutes: minutes(1668), href: post("vive-de-tus-intereses") },
      { title: "Trabaja tu suficiencia", dek: "Lo que miras hacia arriba, te tiene que mirar hacia abajo", date: "18 sep 2026", minutes: minutes(1082), href: post("trabaja-tu-suficiencia") },
    ] as Piece[],
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
    lignarolo: {
      name: "Lignarolo",
      text: "Con LIGNAROLO, esa curiosidad tomó forma en producto, diseño y marca, junto a mi hermano Giorgio.",
      cta: "LIGNAROLO",
      href: lignaroloUrl,
      image: { src: "/mario/lignarolo.jpg", alt: "Mario sentado, de perfil, con mocasines Lignarolo.", position: "70% 50%" },
      // [PENDIENTE] fotografía de producto, Mario y Giorgio, fabricación, campañas.
      pending: ["Producto · detalle", "Mario y Giorgio", "Fabricación", "Campaña"],
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
