/**
 * ITERACIÓN v3 — /v3 (oculta, no indexada; la home no cambia).
 *
 * Narrativa: marca/03-NARRATIVA.md (v3): tercera persona; Mario solo en
 * citas atribuidas; la obra antes que la historia; los tres roles como eje.
 * Diseño de prueba: «el perfil de revista» (B/N, serif clásica, un azul tinta).
 *
 * `tbc: true` = [CONFIRMAR] con Mario: en borrador se marca «por confirmar».
 * Decisiones aún abiertas, con la recomendación del estudio puesta para verla:
 * la frase de la portada (opción a), los roles, la acción principal
 * (suscribirse a Hipertrofia del Ser) y el nombre de la mentoría.
 */
import { channels, connect, lignarolo, psico, psicoUrl } from "./content";

export type Line = { text: string; tbc?: boolean };
export type Aside = { label: string; text: string; cta: string; href: string; tbcNote?: string };

export const v3 = {
  meta: {
    title: "Mario Lignarolo — Perfil (iteración v3)",
    description: "Emprendedor, escritor y guía. Psico-Cibernética, Hipertrofia del Ser y Lignarolo.",
  },
  notice: "Iteración v3 · borrador para revisión · no indexada · la web actual no cambia",

  nav: [
    { label: "Obra", href: "#obra" },
    { label: "Método", href: "#metodo" },
    { label: "Historia", href: "#historia" },
    { label: "Escritos", href: "#escritos" },
  ],
  navCta: { label: "Suscribirse", href: "#suscribirse" },

  /* 1 · Portada */
  hero: {
    roles: "Emprendedor · Escritor · Guía",
    name: ["Mario", "Lignarolo"],
    // Decisión abierta: frase a (recomendada). b) «Entrenar quién eres como
    // entrenas el cuerpo.» c) «Para construir más afuera, hay que ser más adentro.»
    deck: "El trabajo interno detrás de lo que construyes.",
    standfirst: "Creó Psico-Cibernética, escribe Hipertrofia del Ser y llevó el marketing de Lignarolo, la marca de calzado de su familia.",
    primary: { label: "Recibir Hipertrofia del Ser", href: "#suscribirse" },
    secondary: { label: "Ver su obra", href: "#obra" },
    image: { src: "/mario/hero.jpg", alt: "Mario Lignarolo, retrato en blanco y negro." },
  },

  /* 2 · Quién es */
  profile: {
    kicker: "Perfil",
    lead: "Mario Lignarolo es emprendedor, escritor y guía. Construye marcas y ayuda a otros a convertirse en alguien capaz de sostener lo que construyen.",
    paras: [
      { text: "Hizo todo lo que se suponía: la universidad, un puesto en una multinacional, su propia empresa. Y aun así estaba perdido. De ahí nace todo lo que construye hoy.", tbc: true },
      { text: "Hoy guía Psico-Cibernética, escribe Hipertrofia del Ser y habla cada día con una comunidad de más de 260 mil personas en Instagram y TikTok.", tbc: true },
    ] as Line[],
    question: "¿Quién tienes que ser para sostener lo que quieres construir?",
  },

  /* 3 · En sus palabras ([MARIO] carrusel fijado del 17 oct 2025, recortado) */
  words: {
    kicker: "En sus palabras",
    quote: "Por mucho tiempo permití que las circunstancias decidieran por mí. No tenía claridad. No tenía dirección. Y el que no sabe para dónde va… ningún bus le sirve.",
    by: "Mario Lignarolo",
  },

  /* 4 · Obra */
  work: {
    kicker: "Obra",
    title: "Lo que construye",
    intro: "Marcas distintas, una misma idea: lograr algo no basta; hay que poder sostenerlo.",
    items: [
      {
        name: "Psico-Cibernética",
        role: "La creó",
        text: "Un proceso guiado de respiración consciente y trabajo con el autoconcepto, con su comunidad en Skool.",
        tbcNote: "40 días u 8 semanas",
        cta: "Conocer el programa",
        href: psicoUrl,
        image: { src: psico.image.src, alt: "Mario, retrato en doble exposición, en blanco y negro." },
      },
      {
        name: "Hipertrofia del Ser",
        role: "La escribe",
        text: "Su diario de ideas sobre identidad, cuerpo y expansión. Dos o tres textos por semana, para más de 2.900 lectores.",
        tbcNote: "cifra",
        cta: "Leer en Substack",
        href: channels.substack.href,
      },
      {
        name: "Lignarolo",
        role: "La hizo crecer",
        text: "Calzado artesanal en cuero italiano, hecho a mano en Bogotá. Es la marca de su hermano Giorgio: Mario llevó su marketing y ahí aprendió a construir una empresa.",
        tbcNote: "su rol",
        cta: "Visitar lignarolo.com",
        href: lignarolo.href,
        image: { src: lignarolo.image.src, alt: "Mario sentado, de perfil, con mocasines Lignarolo. Blanco y negro." },
      },
      {
        name: "La comunidad",
        role: "La construyó",
        text: "Más de 260 mil personas lo siguen en Instagram y TikTok, donde publica cada día sobre identidad, respiración y fe.",
        tbcNote: "cifra",
        cta: "Seguir en Instagram",
        href: channels.instagram.href,
      },
    ],
    invite: {
      label: "Para invitarlo",
      text: "Conferencias · Podcasts · Talleres de respiración · Colaboraciones con marcas",
      cta: "Escribirle",
      href: connect.ser.href,
    } as Aside,
    mentoring: {
      label: "Uno a uno",
      // Decisión abierta: el nombre («SER», «Maestría del Ser» u otro).
      text: "Mentoría privada para emprendedores que ya lograron cosas y quieren el siguiente nivel.",
      tbcNote: "nombre por decidir",
      cta: "Escribirle",
      href: connect.ser.href,
    } as Aside,
  },

  /* 5 · Método */
  method: {
    kicker: "Método",
    title: "Hipertrofia del Ser",
    deck: "El ser también es un músculo.",
    text: "Se puede crecer el bíceps en un verano. Lo difícil es no volver, después, a los viejos patrones. Para Mario, lograr algo no basta: hay que convertirse en alguien capaz de sostenerlo. Por eso el trabajo pasa por tres planos a la vez.",
    planes: [
      { name: "Espiritual", text: "Meditación, observación, reflexión y gratitud." },
      { name: "Mental", text: "Leer, escribir, crear ideas nuevas y desarrollar las habilidades que faltan." },
      { name: "Físico", text: "Lo que se presenta al mundo: cómo se actúa, cómo se habla, cómo se viste. Ahí se genera la evidencia." },
    ],
    quote: "¿En qué tanto caos puedes mantener la calma? Esa es la verdadera hipertrofia del ser.",
    image: { src: "/mario/entreno-curl.jpg", alt: "Mario entrenando, de espaldas, en blanco y negro." },
  },

  /* 6 · Historia (cima → quiebre → giro → hoy) */
  story: {
    kicker: "Historia",
    title: "Cómo llegó hasta aquí",
    moments: [
      {
        n: "I",
        title: "Hacerlo todo bien",
        text: "El menor de cinco hermanos siguió el camino que se esperaba de él: la universidad, una multinacional y, después, su propia empresa en Medellín.",
        tbc: true,
        quote: "Me gradué de algo que no era lo mío.",
      },
      {
        n: "II",
        title: "El quiebre",
        text: "Por fuera, todo avanzaba. Por dentro, no. Cerró el negocio y volvió a empezar desde cero.",
        quote: "Todos los aspectos de mi vida estaban mal.",
      },
      {
        n: "III",
        title: "El giro",
        text: "Invirtió en sí mismo, volvió a crear junto a su hermano en Lignarolo y encontró la respiración consciente. El gimnasio había sido su primer laboratorio: de ahí salió la idea de que el ser también se entrena.",
        quote: "Nunca lo había sentido en mi vida.",
      },
      {
        n: "IV",
        title: "Hoy",
        text: "Juntó lo que había aprendido de marketing, marca personal, respiración y desarrollo personal, y lo convirtió en un camino para otros.",
        quote: "Yo sé que este proceso a las personas les va a cambiar la vida. ¿Por qué? Porque a mí me cambió la vida.",
      },
    ],
    more: { label: "Leer la historia completa", href: "/historia" },
  },

  /* 7 · Escritos (datos reales del archivo de Substack) */
  writing: {
    kicker: "Escritos",
    title: "Lo que escribe",
    items: [
      { title: "Emprender es aprender. No vender.", dek: "Agencia, flow y los cinco motivadores que lo activan.", href: "https://mariolignarolo.substack.com/p/emprender-es-aprender-no-vender" },
      { title: "Vive de tus intereses", dek: "Empieza por lo que no puedes dejar de aprender.", href: "https://mariolignarolo.substack.com/p/vive-de-tus-intereses" },
      { title: "No puedes fallar", dek: "Cómo ser asquerosamente disciplinado.", href: "https://mariolignarolo.substack.com/p/no-puedes-fallar" },
      { title: "Lo que estás llamado a construir no va a competir con lo que estás llamado a ser", dek: "La marca personal es tu vehículo para cumplir esa visión.", href: "https://mariolignarolo.substack.com/p/lo-que-estas-llamado-a-construir" },
      { title: "Cómo ser tan atractivo que la realidad te persiga", dek: "Donde la espiritualidad y la ciencia convergen.", href: "https://mariolignarolo.substack.com/p/como-ser-tan-atractivo-que-la-realidad", note: "Su texto más leído" },
    ] as { title: string; dek: string; href: string; note?: string }[],
    all: { label: "Todo en Substack", href: channels.substack.href },
  },

  /* 8 · Puerta: una acción principal */
  door: {
    mantra: ["No se trata de hacer más.", "Se trata de SER más."],
    by: "Mario Lignarolo",
    label: "Recibe Hipertrofia del Ser",
    note: "Gratis. Llega a tu correo y se gestiona en Substack.",
    placeholder: "tu@correo.com",
    cta: "Suscribirme",
    secondary: { label: "¿Listo para el proceso? Conoce Psico-Cibernética", href: psicoUrl },
  },

  /* 9 · Pie */
  footer: {
    links: [channels.instagram, channels.tiktok, channels.youtube, channels.substack],
  },
};
