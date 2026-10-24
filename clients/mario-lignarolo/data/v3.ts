/**
 * ITERACIÓN /v3 — la home según `marca/BRIEF-MASTER-v1.md` (Pablo, oct 2026).
 * Ruta oculta y no indexada; la home actual no cambia.
 *
 * Reglas del brief que gobiernan este archivo:
 *  - No decir lo que se puede demostrar: nada de «founder», rótulos ni adjetivos.
 *  - Los titulares construyen la percepción; el cuerpo solo profundiza.
 *  - La página presenta a Mario (3.ª persona); Mario presenta sus ideas (citas).
 *  - Nada inventado: lo que falta va como placeholder marcado, no se rellena.
 *
 * [BRIEF] = texto o dato que el brief da como dirección o como confirmado.
 * [MARIO] = palabras suyas (entrevista o publicaciones).
 * [PENDIENTE] = falta confirmar o producir; se muestra como placeholder en borrador.
 */
import { channels } from "./content";

const substack = channels.substack.href.replace(/\/$/, "");
const dm = "https://ig.me/m/mariolignarolo";
// [BRIEF] la página actual de Psicocibernética.
const psicoUrl = "https://psicocibernetica.lovable.app/";

export const v3 = {
  meta: {
    title: "Mario Lignarolo — Transformación de identidad",
    description: "Explorando cómo transformar quién eres para expandir lo que eres capaz de construir.",
  },
  notice: "Iteración · borrador · no indexada · la web actual no cambia",

  nav: [
    { label: "Lignarolo", href: "#lignarolo" },
    { label: "Hipertrofia del Ser", href: "#hipertrofia" },
    { label: "Psicocibernética", href: "#psicocibernetica" },
    { label: "Contacto", href: "#contacto" },
  ],

  /* 01 · MARIO — portada editorial: persona, territorio, curiosidad. Sin CTA. */
  hero: {
    name: ["Mario", "Lignarolo"],
    territory: "Transformación de identidad",
    // [BRIEF] línea de trabajo preferida, sin reescribir.
    line: "Explorando cómo transformar quién eres para expandir lo que eres capaz de construir.",
    // [BRIEF] señales sutiles: partes de su mundo, no botones.
    signals: [
      { label: "Psicocibernética", href: "#psicocibernetica" },
      { label: "Hipertrofia del Ser", href: "#hipertrofia" },
    ],
    image: { src: "/mario/hero.jpg", alt: "Mario Lignarolo, retrato." },
  },

  /* 02 · LA TESIS — tipografía monumental y el modelo como secuencia. */
  thesis: {
    // [BRIEF]
    line1: "Conseguirlo es una cosa.",
    line2: { before: "Ser capaz de", accent: "sostenerlo", after: "es otra." },
    // [BRIEF] la lógica, en una nota breve (3.ª persona).
    note: "Una meta financiera, física o profesional se puede alcanzar. Si la identidad que hay debajo no ha cambiado, los patrones anteriores vuelven.",
    // [BRIEF] TRABAJO INTERNO + CAPACIDADES + ACCIÓN + EVIDENCIA; la escala crece hacia la evidencia.
    model: [
      { n: "01", name: "Trabajo interno", text: "Percepción, autoconcepto, observación, práctica espiritual.", k: 1 },
      { n: "02", name: "Capacidades", text: "Aprender: ventas, marketing, liderazgo, comunicación, ejecución.", k: 1.15 },
      { n: "03", name: "Acción", text: "Exponerse, practicar, hacer lo incómodo, actuar distinto en el mundo real.", k: 1.35 },
      { n: "04", name: "Evidencia", text: "Demostrar, viviéndolo, que se puede operar de otra manera.", k: 1.6 },
    ],
  },

  /* 03 · LA HISTORIA POR PERCEPCIÓN — titulares, fotos y pies; sin biografía. */
  story: {
    // [BRIEF] fragmentos de trabajo.
    headline: "Aprender a construir afuera lo obligó a mirar adentro.",
    beats: [
      {
        kind: "image",
        word: "El cuerpo.",
        caption: "Entrenamiento, disciplina, exposición. El primer lugar donde el cambio se hizo visible.",
        image: { src: "/links/img/hipertrofia.jpg", alt: "Mario entrenando, de espaldas, con un disco.", position: "50% 20%" },
      },
      {
        kind: "image",
        word: "Emprender es aprender.",
        // [MARIO]
        quote: "Para mí emprender es aprender.",
        caption: "Marketing, ventas, producto, marca: habilidades que se aprenden construyendo.",
        image: { src: "/mario/lignarolo.jpg", alt: "Mocasines Lignarolo.", position: "40% 100%" },
      },
      {
        kind: "text",
        word: "Pero saber qué hacer no siempre significa sentirte capaz de hacerlo.",
        // [MARIO] entrevista: «Todo es interno».
        quote: "Todo es interno.",
        caption: "Insuficiencia, miedo a exponerse, dificultad para cobrar: lo que el conocimiento no resolvía.",
      },
      {
        kind: "image",
        word: "Identidad.",
        caption: "Autoconcepto, respiración consciente, trabajo interno.",
        image: { src: "/mario/psico.jpg", alt: "Mario, retrato en doble exposición.", position: "50% 30%" },
      },
    ] as Beat[],
    // [BRIEF] la narrativa útil, en una línea.
    close: "Aprendió a construir afuera y descubrió que su capacidad de construir también dependía de en quién era capaz de convertirse por dentro.",
  },

  /* 04 · EL TRABAJO — tres mundos, tres composiciones. Sin título paraguas. */
  work: {
    label: "Trabajo",
    lignarolo: {
      name: "Lignarolo",
      meta: ["Calzado", "Bogotá"],
      // [BRIEF] confirmado: socio junto a su hermano Giorgio. Sin cargo, sin cifras.
      text: "Calzado artesanal en cuero italiano, hecho a mano en Bogotá. Mario es socio de la marca junto a su hermano Giorgio.",
      cta: "lignarolo.com",
      href: "https://www.lignarolo.com",
      image: { src: "/mario/lignarolo.jpg", alt: "Mario sentado, de perfil, con mocasines Lignarolo." },
      // [PENDIENTE] fotos de producto, taller y proceso.
      pending: ["Producto", "Taller · proceso"],
    },
    hipertrofia: {
      label: "Publicación",
      name: "Hipertrofia del Ser",
      line: "Escritos sobre identidad, cuerpo, emprendimiento y trabajo interno.",
      // [BRIEF] la metáfora central.
      metaphor: "La hipertrofia es el crecimiento de un músculo por el trabajo que se le exige. Aquí, aplicada a la persona.",
      // Curados del archivo real de Substack (título, subtítulo y fecha reales).
      lead: {
        category: "Identidad",
        title: "Lo que estás llamado a construir no va a competir con lo que estás llamado a ser",
        dek: "La marca personal es tu vehículo para cumplir esa visión.",
        date: "12 sep 2026",
        href: `${substack}/p/lo-que-estas-llamado-a-construir`,
      },
      more: [
        {
          category: "Emprendimiento",
          title: "Emprender es aprender. No vender.",
          dek: "Agencia, flow y los cinco motivadores que lo activan.",
          date: "26 sep 2026",
          href: `${substack}/p/emprender-es-aprender-no-vender`,
        },
        {
          category: "Trabajo interno",
          title: "La simplicidad de asumir tu estado",
          dek: "No puedes cambiar el mundo externo hasta que entiendas tu mundo interno.",
          date: "10 sep 2026",
          href: `${substack}/p/la-simplicidad-de-asumir-tu-estado`,
        },
        {
          category: "Cuerpo",
          title: "No puedes fallar",
          dek: "Cómo ser asquerosamente disciplinado.",
          date: "29 sep 2026",
          href: `${substack}/p/no-puedes-fallar`,
        },
      ],
      cta: "Leer en Substack",
      href: substack,
      subscribe: { label: "Suscribirse", href: `${substack}/subscribe` },
    },
    psico: {
      label: "Método · Programa",
      name: "Psicocibernética",
      line: "Un proceso guiado de respiración consciente, visualización y trabajo con el autoconcepto.",
      // [BRIEF] el concepto es de Maltz; esto es la aplicación de Mario. Sin claims científicos.
      origin: "El término viene de Maxwell Maltz (1960): un sistema que corrige su rumbo a partir de la retroalimentación. Psicocibernética es la aplicación que Mario hace de esa idea, con respiración consciente y práctica diaria.",
      // [MARIO]
      quote: "Cualquier cosa que uno asuma como un fracaso, al final termina siendo nada más información.",
      cta: "Conocer Psicocibernética",
      href: psicoUrl,
      note: "Una práctica personal. No sustituye la atención médica ni psicológica.",
      video: { src: "/mario/psico.mp4", poster: "/mario/psico-poster.jpg", duration: "2:26", label: "Mario presenta Psicocibernética" },
    },
  },

  /* 05 · PARA SEGUIR — caminos sin menú de enlaces, y un cierre breve. */
  deeper: {
    label: "Para seguir",
    paths: [
      { verb: "Leer", what: "Hipertrofia del Ser", links: [{ label: "Substack", href: substack }] },
      {
        verb: "Ver",
        what: "Lo que publica",
        links: [
          { label: "YouTube", href: channels.youtube.href },
          { label: "Instagram", href: channels.instagram.href },
          { label: "TikTok", href: channels.tiktok.href },
        ],
      },
      { verb: "Practicar", what: "Psicocibernética", links: [{ label: "Conocer el programa", href: psicoUrl }] },
      {
        verb: "Conversar",
        what: "Podcasts, charlas, eventos, colaboraciones",
        links: [{ label: "Escribir a Mario", href: dm }],
      },
    ],
    // 3.ª persona, solo lo confirmado.
    bio: "Mario Lignarolo trabaja alrededor de la transformación de identidad. Es socio de Lignarolo junto a su hermano Giorgio, escribe Hipertrofia del Ser y guía Psicocibernética.",
    contact: { cta: "Escribir a Mario", href: dm, pending: "Correo de contacto pendiente" },
    // [MARIO] su frase, como la escribe él.
    closing: { quote: "No se trata de hacer más. Se trata de SER más.", by: "Mario Lignarolo" },
  },

  footer: {
    links: [channels.instagram, channels.youtube, channels.tiktok, channels.substack, { label: "Lignarolo", href: "https://www.lignarolo.com" }],
  },
};

export type Beat =
  | { kind: "image"; word: string; caption: string; quote?: string; image: { src: string; alt: string; position?: string } }
  | { kind: "text"; word: string; caption: string; quote?: string };
