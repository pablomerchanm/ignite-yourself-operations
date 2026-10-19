/**
 * CONTENIDO EDITABLE — mariolignarolo.com (V1)
 *
 * Todo el texto del sitio vive aquí, fuera de los componentes.
 * Cada bloque lleva su estado:
 *   [CONFIRMADO]  dato o encuadre ya confirmado.
 *   [HIPÓTESIS]   arquitectura o copy de trabajo: se puede cambiar.
 *   [CONFIRMAR]   no se publica como hecho hasta que Mario lo apruebe.
 *
 * Reglas: no inventar credenciales, cifras, testimonios, prensa ni
 * afirmaciones científicas. Un enlace con `href: ""` se muestra como
 * pendiente (en borrador) y no se enlaza.
 */

export type Channel = { label: string; href: string; handle?: string };

export const site = {
  /** Mientras sea `true`: cinta «Borrador», marcas de contenido de muestra
   *  visibles y `noindex`. Pasar a `false` cuando Mario apruebe. */
  draft: true,
  url: "https://mariolignarolo.com",
  name: "Mario Lignarolo",
  // [HIPÓTESIS] metadatos provisionales
  title: "Mario Lignarolo — Cuerpo, mente, identidad y expansión",
  description:
    "Ideas, escritura, videos y proyectos de Mario Lignarolo sobre identidad, respiración, cuerpo, trabajo interior y expansión personal.",
};

/** URLs públicas. Solo las verificadas entran en schema.org `sameAs`. */
export const channels = {
  // [CONFIRMADO] cuenta verificada @mariolignarolo
  instagram: { label: "Instagram", href: "https://www.instagram.com/mariolignarolo/" },
  // [CONFIRMADO] canales verificados
  youtube: { label: "YouTube", href: "https://www.youtube.com/@mariolignarolo" },
  tiktok: { label: "TikTok", href: "https://www.tiktok.com/@mariolignarolo" },
  substack: { label: "Substack", href: "https://mariolignarolo.substack.com" },
} satisfies Record<string, Channel>;

/** [CONFIRMADO] la comunidad del programa vive en Skool. */
export const psicoUrl = "https://www.skool.com/psico-cibernetica-7760/about";

/** [CONFIRMAR] correo público: dejar vacío si Mario no quiere publicarlo. */
export const publicEmail = "";

// Cinco destinos, en el orden en que los necesita quien llega: el método,
// cómo empezar, quién es Mario, lo que escribe y cómo seguirlo.
export const nav = [
  { label: "Método", href: "#metodo" },
  { label: "Psico-Cibernética", href: "#psicocibernetica" },
  { label: "Mario", href: "#mario" },
  { label: "Escritos", href: "#escritos" },
  { label: "Conecta", href: "#conecta" },
];

/* ── 01 HERO ─────────────────────────────────────────────── */
export const hero = {
  // [CONFIRMADO] territorios del header aprobado; IDENTIDAD en itálica.
  territories: [
    { word: "Cuerpo", italic: false },
    { word: "Mente", italic: false },
    { word: "Identidad", italic: true },
    { word: "Expansión", italic: false },
  ],
  // [HIPÓTESIS] frase del header aprobado. Una entrada por línea en escritorio.
  statement: [
    "Explorando cómo cambiar",
    "quién eres transforma",
    "lo que eres capaz de",
    "construir.",
  ],
  image: {
    src: "/mario/hero.jpg",
    alt: "Retrato de Mario Lignarolo sobre fondo verde oscuro, mirando a cámara.",
  },
};

/* ── 02 SOSTENER: lo primero que ve quien llega ──────────── */
// Para el emprendedor que ya logró cosas y se siente estancado (cliente ideal
// de la entrevista del 6 oct). Copy del estudio [HIPÓTESIS] sobre la idea del
// termostato que Mario explicó en la parte 2 (traducida: idea, no cita). La
// pregunta es la del estudio; la frase final es de Mario [MARIO].
export const sostener = {
  eyebrow: "Si ya lograste cosas",
  headline: ["Lograrlo", "no era", "el problema."],
  headlineItalicLine: 2,
  lead: "Sostenerlo, sí.",
  text: "Te pusiste una meta, la alcanzaste y, con el tiempo, volviste a los mismos patrones. No es falta de disciplina: tu autoconcepto funciona como un termostato y te devuelve a la persona que crees ser.",
  question:
    "¿Qué tiene que cambiar dentro de una persona para que pueda sostener una realidad diferente afuera?",
  // [MARIO] su frase firma: el «Ser» de Hipertrofia del Ser.
  answer: { before: "No se trata de hacer más.", em: "Se trata de ser más." },
};

/* ── 02 ORIGEN ───────────────────────────────────────────── */
// Las frases marcadas [MARIO] son textuales de su publicación de Instagram
// del 17 oct 2025 («Antes / Ahora»). El resto es tejido conectivo del
// estudio [HIPÓTESIS], a confirmar en la entrevista.
export const origin = {
  eyebrow: "Quién es Mario",
  // [HIPÓTESIS] apoyada en su «Antes / Ahora»: el cuerpo fue donde el cambio se hizo visible.
  headline: ["El cuerpo fue", "el primer", "laboratorio."],
  headlineItalicLine: 2,
  // [MARIO]
  lead: "Es difícil encontrarte cuando no sabes que estás perdido.",
  // [MARIO] El arco, en el orden de su carrusel. Recortes a frase completa,
  // sin reescribir. Decisiones pendientes con Mario: si se publican las
  // líneas «Casi pierdo la vida en una ocasión» y «Conecté con Dios», y si
  // entra la confesión sobre los estudios («no fui coherente, engañé, copié»),
  // que por ahora queda fuera.
  // Capítulos: `title` es una etiqueta editorial del estudio [HIPÓTESIS];
  // `pull` y `text` son de Mario, textuales [MARIO]. `photo` describe la foto
  // original que falta (se pide a Mario); `src` vacío = hueco (solo visible
  // en borrador). `photo: null` = capítulo solo tipográfico.
  chapters: [
    {
      title: "Crear",
      text: "Siempre me encantó crear desde mi esencia. Emprender, construir, explorar mi creatividad… eso me hacía sentir vivo. Pero tenía una creencia que me limitaba: «Eso no aporta. Eso no tiene valor».",
      photo: { src: "", alt: "", pendingLabel: "Pintando zapatillas" },
    },
    {
      title: "El camino tradicional",
      text: "Tengo una familia increíble que siempre estuvo ahí para mí. Pero ser el menor de cinco hermanos me hizo creer que tenía que seguir el camino tradicional. Empecé mis estudios… no porque me gustaba, sino porque sentía que debía seguir la tradición familiar. Y ahí empezó todo: la búsqueda de validación y aprobación externa, porque no sabía lo que quería.",
      photo: { src: "", alt: "", pendingLabel: "Con sus hermanos" },
    },
    {
      title: "Perdido",
      pull: "Y en ese proceso… me perdí por completo.",
      text: "Me gradué de algo que no era lo mío. Dejé muchas cosas que me apasionaban por perseguir sueños que nunca fueron míos.",
      photo: null,
    },
    {
      // [ENTREVISTA, audio completo de la parte 1, ver ENTREVISTA-2026-10-06.md § 7b]
      // [MARIO] palabras suyas transcritas, con recortes mínimos. [CONFIRMAR] que
      // apruebe contarlo así (Coca-Cola y el dropshipping, sin el producto ni la ceremonia).
      title: "Desconectado",
      pull: "Todos los aspectos de mi vida estaban mal.",
      text: "Después de graduarme trabajé en Coca-Cola. No me gustó: yo quería emprender, ser mi propio jefe. Empecé en el mundo del dropshipping, del marketing. Aprendí, pero estaba vendiendo algo que ni siquiera me gustaba, que no me conectaba. La desconexión de eso es brutal.",
      photo: null,
    },
    {
      title: "El vacío",
      text: "Intenté llenar el vacío con alcohol y comida chatarra. Buscaba llenar por fuera lo que faltaba por dentro. Pero solo me hundía más.",
      photo: null,
    },
    {
      title: "El fondo",
      text: "Toqué fondo varias veces. Casi pierdo la vida en una ocasión. Hasta que decidí que algo tenía que cambiar. Empecé a invertir en mi crecimiento. Mejoré mi entorno. Dejé ir lo que no servía. Y ahí pasó la transformación: conecté con mi verdadera esencia. Conecté con Dios. Reconocí el poder que siempre estuvo dentro.",
      // La foto de hielo · fuego · respiración se pide a Mario; de momento el díptico cierra el capítulo.
      photo: null,
    },
    {
      title: "El niño interior",
      pull: "La única persona que necesitaba impresionar… era mi niño interior.",
      text: "Me había olvidado de disfrutar. Me había olvidado de jugar. Me había olvidado de crear desde la inocencia. Estaba viviendo para todos… menos para él.",
      photo: { src: "", alt: "", pendingLabel: "Mario de niño" },
    },
    {
      title: "Volver a casa",
      text: "Empecé en Lignarolo. Y sentí nuevamente algo que pensé que se había ido. Sentir el placer de crear. De explorar mi creatividad. De construir sin miedo al juicio. Era como volver a casa después de tanto tiempo.",
      // La foto de Lignarolo vive en su propia sección (#lignarolo); aquí, solo texto.
      // Pendiente a Mario: una foto del taller para este capítulo.
      photo: null,
    },
  ],
  // En la página la historia se cuenta como una curva (`timeline`, más abajo);
  // los capítulos completos quedan aquí como fuente de sus palabras.
  // [CONFIRMADO] Su propio «Antes / Ahora» (carrusel del 17 oct 2025), como
  // momento visual a todo el ancho tras el capítulo «El fondo».
  diptych: {
    afterTitle: "El fondo",
    before: { src: "/mario/antes.jpg", alt: "Mario, antes: de perfil, con una botella en la mano.", label: "Antes" },
    after: { src: "/mario/entreno-curl.jpg", alt: "Mario, ahora: entrenando bíceps con mancuerna.", label: "Ahora" },
    caption: "El cuerpo fue el primer lugar donde el cambio se hizo visible.",
  },
};

/* ── 06a EL RECORRIDO: su historia como una curva ────────── */
// Cada punto, en sus palabras (Instagram del 17 oct 2025 o la entrevista,
// ver ENTREVISTA-2026-10-06.md). `depth` es lo hondo que estaba: 0 arriba,
// 1 el fondo. Sin años inventados: solo los que él da. [CONFIRMAR] el recorrido completo.
export const timeline = {
  label: "El recorrido",
  hint: "Desliza",
  steps: [
    { when: "16 años", title: "Compararme", quote: "Mi historia empieza cuando empecé a compararme con las personas.", depth: 0.24 },
    { when: "La universidad", title: "El camino tradicional", quote: "Me gradué de algo que no era lo mío.", depth: 0.4 },
    { when: "Al graduarse", title: "Coca-Cola", quote: "No me gustó: yo quería emprender, ser mi propio jefe.", depth: 0.52 },
    { when: "Medellín", title: "Emprender desconectado", quote: "Estaba vendiendo algo que ni siquiera me gustaba.", depth: 0.72 },
    { when: "El quiebre", title: "Tocar fondo", quote: "Toqué fondo varias veces.", depth: 1 },
    { when: "De cero", title: "Invertir en mí", quote: "Empecé a invertir en mi crecimiento.", depth: 0.78 },
    { when: "Lignarolo", title: "Volver a crear", quote: "Sentir el placer de crear. Era como volver a casa.", depth: 0.56 },
    { when: "Respiración consciente", title: "Respirar", quote: "Nunca lo había sentido en mi vida.", depth: 0.36 },
    { when: "2026", title: "Psico-Cibernética", quote: "Les va a cambiar la vida. ¿Por qué? Porque a mí me cambió la vida.", depth: 0.16 },
    { when: "Hoy", title: "Hipertrofia del Ser", quote: "El poder nunca estuvo afuera. Siempre estuvo dentro.", depth: 0 },
  ],
};

/* ── 04 HIPERTROFIA DEL SER ──────────────────────────────── */
// [CONFIRMADO] «Hipertrofia del Ser» es el nombre real de su Substack.
export const hipertrofia = {
  eyebrow: "El método",
  name: { before: "Hipertrofia", italic: "del", after: "Ser" },
  // [ENTREVISTA 6 oct 2026, ver ENTREVISTA-2026-10-06.md] su método: hipertrofiar el ser en tres planos (parafraseado).
  planesLabel: "Los tres planos",
  planesTitle: "El ser también es un músculo.",
  planesIntro: "Lograr algo no basta: hay que convertirse en alguien capaz de sostenerlo. Por eso el trabajo pasa por tres planos a la vez.",
  planes: [
    { name: "Espiritual", text: "Meditación, observación, reflexión y gratitud." },
    { name: "Mental", text: "Leer, escribir, crear ideas nuevas y desarrollar las habilidades que te faltan." },
    { name: "Físico", text: "Lo que presentas al mundo: tus acciones, cómo hablas, cómo vistes. Ahí se genera la evidencia." },
  ],
  image: { src: "/mario/entreno-banco.jpg", alt: "Mario entrenando en el gimnasio, de espaldas." },
};

/* ── 05 PUNTO DE VISTA ───────────────────────────────────── */
// [MARIO] Citas textuales de su publicación de Instagram del 17 oct 2025.
// Las etiquetas (word) son editoriales; las citas (quote) no se reescriben.
// Pendiente: sumar citas suyas sobre autoconcepto, respiración, output vs
// input y no negociables cuando haya fuente.
export const pointOfView = {
  eyebrow: "Punto de vista",
  title: "Ideas a las que vuelvo.",
  // En la página, cuatro: las que más hablan a quien ya logró cosas y se estancó.
  show: ["Información", "Poder", "Responsabilidad", "Autenticidad"],
  sourceNote: "Palabras de Mario, de sus publicaciones y de una conversación con el estudio.",
  ideas: [
    {
      word: "Sacudidas",
      quote: "Todos los días doy gracias a la vida por las sacudidas. Por despertarme.",
    },
    {
      word: "Responsabilidad",
      quote:
        "Cuesta reconocer y hacerte responsable de absolutamente todo lo que te pasa. Porque ya no puedes culpar. Ya no puedes señalar. Ya no puedes poner excusas.",
    },
    {
      word: "Poder",
      quote: "Siempre que le permites al exterior determinar tu estado interno, pierdes poder.",
    },
    // [ENTREVISTA 6 oct 2026, ver ENTREVISTA-2026-10-06.md] [MARIO] textual.
    {
      word: "Información",
      quote: "Cualquier cosa que uno asuma como un fracaso, al final termina siendo nada más información.",
    },
    {
      word: "Autenticidad",
      quote:
        "Por mucho tiempo quise pertenecer. Hasta que por fin me di cuenta: entre más auténtico soy, más a gusto me siento conmigo mismo.",
    },
    // [ENTREVISTA 6 oct 2026, ver ENTREVISTA-2026-10-06.md] [MARIO] textual, con recorte mínimo.
    {
      word: "Intereses",
      quote: "Eso es lo que hace que tú seas único, irrepetible: la intersección de tus intereses.",
    },
    {
      word: "Creación",
      quote: "Tu poder para crear no está dado por la aprobación del otro. Está dentro de ti. Siempre estuvo.",
    },
  ],
};

/* ── 06 PSICO-CIBERNÉTICA ────────────────────────────────── */
export const psico = {
  eyebrow: "Para empezar",
  name: "Psico-Cibernética",
  // [CONFIRMADO] encuadre público actual (Instagram). Mario aprueba el claim final.
  positioning: "Breathwork + reprogramación del subconsciente.",
  promise: "Transforma tu autoconcepto en 40 días.",
  days: 40,
  // [CONFIRMAR] estructura exacta del método.
  intro: "Un proceso guiado de 40 días que explora:",
  explores: [
    "Breathwork / respiración consciente",
    "Visualización",
    "Autoconcepto",
    "Patrones internos",
    "Práctica diaria",
  ],
  cta: "Conocer Psico-Cibernética",
  // [ENTREVISTA 6 oct 2026, ver ENTREVISTA-2026-10-06.md] de dónde viene el concepto (Maxwell Maltz). [MARIO] la última frase es textual.
  // [ENTREVISTA § 7b] de dónde nace el programa: de su propio proceso
  // («vamos a empaquetar toda esta vuelta y volverla un producto»). [CONFIRMAR]
  born: "Nació de su propio proceso: juntó lo que había aprendido de marketing, marca personal, respiración consciente y desarrollo personal, y lo convirtió en un camino para otros.",
  originLabel: "De dónde viene",
  origin:
    "El término es de Maxwell Maltz: la cibernética estudia cómo un sistema se retroalimenta para llegar a un objetivo. Aplicado a la mente, la imaginación diseña el autoconcepto y cada intento corrige el rumbo.",
  originQuote: "Cualquier cosa que uno asuma como un fracaso, al final termina siendo nada más información.",
  // [CONFIRMADO] su video de presentación en Skool (2:26), alojado aquí.
  video: { src: "/mario/psico.mp4", poster: "/mario/psico-poster.jpg", duration: "2:26", label: "Mario presenta Psico-Cibernética" },
  image: { src: "/mario/psico.jpg", alt: "Mario, retrato en doble exposición sobre azul." },
  // [CONFIRMAR] nota de encuadre seguro (práctica personal, sin promesas clínicas).
  note: "Un proceso de práctica personal. No sustituye la atención médica ni psicológica.",
};

/* ── 06b LIGNAROLO (emprendimiento) ──────────────────────── */
// [CONFIRMADO] lo que la marca dice de sí misma en lignarolo.com (título,
// descripción y claims de portada). [CONFIRMAR] el rol exacto de Mario en
// Lignarolo: por eso la etiqueta no le atribuye cargo.
export const lignarolo = {
  eyebrow: "Emprender",
  name: "Lignarolo",
  tagline: "Ereditá di Famiglia",
  // [MARIO] textual (carrusel del 17 oct 2025).
  quote: "Empecé en Lignarolo. Y sentí nuevamente algo que pensé que se había ido: sentir el placer de crear.",
  // [ENTREVISTA § 7b] entró a llevar el marketing de la marca. [CONFIRMAR] su cargo;
  // la cifra de los primeros meses no se publica sin su aprobación.
  role: "Entró a Lignarolo para llevar su marketing. Ahí aprendió cómo funciona una empresa: crear producto, venderlo y construir una marca.",
  description: "Zapatos y botas artesanales en cuero italiano, hechos a mano en Bogotá.",
  cta: "Visitar lignarolo.com",
  href: "https://www.lignarolo.com",
  // [ENTREVISTA 6 oct 2026, ver ENTREVISTA-2026-10-06.md] [MARIO] textual (parte en español), con recortes mínimos.
  thesis: {
    title: "Emprender es aprender.",
    text: "Te lleva a convertirte en una versión tuya que necesita habilidades eternas: marketing, ventas, marca personal, liderazgo. Y cuando vendes algo que a ti te cambió la vida, vender, al final, termina siendo amor.",
    close: "Perseguir las cosas que te apasionan, resolver tus problemas, compartir las soluciones.",
  },
  image: { src: "/mario/lignarolo.jpg", alt: "Mario sentado, de perfil, con mocasines Lignarolo. Blanco y negro." },
};

/* ── 07 ESCRITOS ─────────────────────────────────────────── */
export const writing = {
  eyebrow: "Hipertrofia del Ser — Escritos",
  title: ["Escribo para", "entender."],
  read: "Leer",
  ctaRead: "Leer en Substack",
};

/* ── 08 VIDEOS ───────────────────────────────────────────── */
export const watch = {
  eyebrow: "Watch / Ver",
  title: "Pensar en voz alta.",
  cta: "Ver en YouTube",
};

/* ── 09 TESTIMONIOS ──────────────────────────────────────── */
export const testimonialsSection = {
  eyebrow: "Desde el proceso",
};

/* ── 10 MARIO, HOY ───────────────────────────────────────── */
export const about = {
  eyebrow: "Mario, hoy",
  // [MARIO] cierre de su carrusel del 17 oct 2025 (textual).
  // Alternativa del estudio [HIPÓTESIS], por si Mario prefiere una pregunta:
  // «Estoy interesado en una pregunta: ¿cuánto puede cambiar tu vida cuando
  // cambia la persona desde la que la construyes?»
  quote:
    "Hoy estoy conectado con mi esencia. Con esa versión de mí que no necesita validación externa. Que elige ser su mejor versión cada día. No por ego, sino por propósito. Que elige dar, compartir, servir.",
  // [MARIO] remate.
  quoteEnd: "Porque aprendí que el poder nunca estuvo afuera. Siempre estuvo dentro. Y que la vida solo es un reflejo de tu interior.",
  // Contexto para el posicionamiento (no se publica): en ese mismo carrusel
  // se dirige a «emprendedores» que quieren volver a conectar con su esencia
  // «para desde ahí impactar con autenticidad y escalar tus resultados».
  // También menciona que «empezó en Lignarolo» (calzado); su rol actual allí
  // está por confirmar.
  // [CONFIRMAR] bio corta: solo hechos confirmados (sin títulos ni cifras).
  // Nota: en su carrusel del 17 oct 2025 muestra un título de ingeniero de la
  // Universidad de La Sabana, pero lo narra como «algo que no era lo mío»:
  // no se usa como credencial.
  bio: "Mario Lignarolo explora la relación entre cuerpo, mente, identidad y acción. Escribe Hipertrofia del Ser y guía Psico-Cibernética, un proceso de 40 días de breathwork y trabajo con el autoconcepto.",
  // [CONFIRMAR] ciudad: solo si Mario aprueba publicarla.
  location: "",
  // Recorte cerrado del retrato del hero, en B/N (la foto sentada vive en #lignarolo).
  image: {
    src: "/mario/hero.jpg",
    alt: "Mario Lignarolo, retrato en primer plano.",
  },
};

/* ── 11 CONECTA ──────────────────────────────────────────── */
export const connect = {
  eyebrow: "Conecta",
  // [MARIO] su llamada a la acción real (carrusel del 17 oct 2025).
  ser: {
    eyebrow: "O habla primero con Mario",
    keyword: "SER",
    text: "Si eres emprendedor y quieres volver a conectar con tu esencia para, desde ahí, impactar con autenticidad y escalar tus resultados, escríbeme «SER» por mensaje directo y te cuento cómo te puedo ayudar.",
    cta: "Escribir «SER» por Instagram",
    // Abre el chat de Instagram con Mario.
    href: "https://ig.me/m/mariolignarolo",
  },
  title: ["Sigamos la", "conversación."],
  newsletterLabel: "Recibe los escritos de Hipertrofia del Ser",
  newsletterPlaceholder: "tu@correo.com",
  newsletterCta: "Suscribirme",
  newsletterNote: "La suscripción se gestiona en Substack.",
  // Lo que quedaba de «Invitar» (charlas · podcasts): una línea, sin kit de prensa
  // ni correo pendiente. [ENTREVISTA] no ha aceptado ninguna invitación todavía.
  invite: {
    label: "Charlas · podcasts · entrevistas",
    text: "Mario elige con cuidado sus conversaciones. Cuéntale de tu evento, podcast o medio por mensaje directo.",
    cta: "Escribir por Instagram",
    href: "https://ig.me/m/mariolignarolo",
  },
};
