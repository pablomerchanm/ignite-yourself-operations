/**
 * Testimonios — SOLO reales y aprobados (p. ej. del destacado «Testimonios»
 * de Instagram, con permiso de la persona). Nada se importa ni se inventa.
 * Mientras el array esté vacío, la sección no se renderiza.
 */
export type Testimonial = {
  quote: string;
  name: string; // nombre o iniciales, según permiso
  context?: string; // p. ej. «Psico-Cibernética, 2026»
};

export const testimonials: Testimonial[] = [];
