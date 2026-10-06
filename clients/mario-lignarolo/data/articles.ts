/**
 * Escritos (Substack «Hipertrofia del Ser», mariolignarolo.substack.com).
 * Datos reales tomados del archivo público (título, fecha, subtítulo, URL).
 * El primero se destaca en «Hipertrofia del Ser»; el resto va en «Escritos».
 * Para actualizar: copiar título, fecha ISO, subtítulo y URL del post.
 */
export type Article = {
  title: string;
  date: string | null; // ISO
  topic: string;
  excerpt: string;
  url: string;
  sample?: boolean;
};

export const articles: Article[] = [
  {
    title: "Vive de tus intereses",
    date: "2026-10-01",
    topic: "Creación",
    excerpt: "Empieza por lo que no puedes dejar de aprender.",
    url: "https://mariolignarolo.substack.com/p/vive-de-tus-intereses",
  },
  {
    title: "No puedes fallar",
    date: "2026-09-29",
    topic: "Disciplina",
    excerpt: "Cómo ser asquerosamente disciplinado.",
    url: "https://mariolignarolo.substack.com/p/no-puedes-fallar",
  },
  {
    title: "Emprender es aprender. No vender.",
    date: "2026-09-26",
    topic: "Emprendimiento",
    excerpt: "Agencia, flow y los cinco motivadores que lo activan.",
    url: "https://mariolignarolo.substack.com/p/emprender-es-aprender-no-vender",
  },
  {
    title: "Sana tus heridas y te pagarán por existir",
    date: "2026-09-22",
    topic: "Identidad",
    excerpt: "Vuélvete tan tú, que sea inevitable que te paguen.",
    url: "https://mariolignarolo.substack.com/p/sana-tus-heridas-y-te-pagaran-por",
  },
  {
    title: "Lo que estás llamado a construir no va a competir con lo que estás llamado a ser",
    date: "2026-09-12",
    topic: "Expansión",
    excerpt: "La marca personal es tu vehículo para cumplir esa visión.",
    url: "https://mariolignarolo.substack.com/p/lo-que-estas-llamado-a-construir",
  },
  {
    title: "La simplicidad de asumir tu estado",
    date: "2026-09-10",
    topic: "Mente",
    excerpt: "No puedes cambiar el mundo externo hasta que entiendas tu mundo interno.",
    url: "https://mariolignarolo.substack.com/p/la-simplicidad-de-asumir-tu-estado",
  },
];
