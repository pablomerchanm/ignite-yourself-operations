import localFont from "next/font/local";

/**
 * Tipografías de /v3 (todas SIL Open Font License, subconjunto latin con
 * acentos y ¿¡). La web actual no las carga.
 *
 *  display  Archivo (Omnibus-Type), variable en peso y anchura: la grotesk
 *           condensada de los statements, al modo de Nike About.
 *  sans     Geist (Vercel / Basement Studio): títulos de sección, interfaz,
 *           cuerpo y metadatos. Neutra, precisa, contemporánea.
 *  serif    Newsreader (Production Type), con tamaño óptico: la voz de Mario
 *           en titulares y en itálica. Culta y legible a cualquier escala.
 */
export const archivo = localFont({
  src: "./fonts/Archivo-Variable-latin.woff2",
  weight: "100 900",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  variable: "--font-archivo",
  display: "swap",
});

export const geist = localFont({
  src: "./fonts/Geist-Variable-latin.woff2",
  weight: "100 900",
  variable: "--font-v3-sans",
  display: "swap",
});

export const newsreader = localFont({
  src: [
    { path: "./fonts/Newsreader-Variable-latin.woff2", weight: "200 800", style: "normal" },
    { path: "./fonts/Newsreader-Italic-Variable-latin.woff2", weight: "200 800", style: "italic" },
  ],
  variable: "--font-v3-serif",
  display: "swap",
});
