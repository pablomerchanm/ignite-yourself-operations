/**
 * Escritos (Substack). V1 sin API: array editable a mano.
 * `sample: true` = contenido de muestra para diseñar el ritmo; se reemplaza
 * por artículos reales (título, fecha ISO, tema, extracto y URL).
 * El primero de la lista se destaca en «Hipertrofia del Ser»; el resto
 * aparece en «Escritos».
 */
export type Article = {
  title: string;
  date: string | null; // ISO, p. ej. "2026-09-14"
  topic: string;
  excerpt: string;
  url: string;
  sample?: boolean;
};

const SAMPLE_EXCERPT =
  "Texto de muestra. Aquí irá el extracto real del artículo publicado en Substack.";

export const articles: Article[] = [
  { title: "El cuerpo como primer laboratorio", date: null, topic: "Cuerpo", excerpt: SAMPLE_EXCERPT, url: "", sample: true },
  { title: "La persona desde la que decides", date: null, topic: "Identidad", excerpt: SAMPLE_EXCERPT, url: "", sample: true },
  { title: "Output antes que input", date: null, topic: "Ejecución", excerpt: SAMPLE_EXCERPT, url: "", sample: true },
  { title: "Lo que no se negocia", date: null, topic: "Disciplina", excerpt: SAMPLE_EXCERPT, url: "", sample: true },
  { title: "Respirar antes de responder", date: null, topic: "Trabajo interior", excerpt: SAMPLE_EXCERPT, url: "", sample: true },
];
