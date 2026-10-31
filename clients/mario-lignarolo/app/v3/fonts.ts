import localFont from "next/font/local";

/**
 * Tipografías de /v3 (todas SIL Open Font License, subconjunto latin con
 * acentos y ¿¡). La web actual no las carga.
 *
 *  display  Archivo (Omnibus-Type), variable en peso y anchura: la grotesk
 *           condensada de los statements, al modo de Nike About.
 *  sans     Geist (Vercel / Basement Studio): títulos de sección, interfaz,
 *           cuerpo y metadatos. Neutra, precisa, contemporánea.
 *  serif    Cormorant Garamond (Christian Thalmann), con su itálica: la voz
 *           de Mario. La misma serif de la identidad (marca/identidad/).
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

export const cormorant = localFont({
  src: [
    { path: "./fonts/CormorantGaramond-Variable.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/CormorantGaramond-Italic-Variable.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-v3-serif",
  display: "swap",
});
