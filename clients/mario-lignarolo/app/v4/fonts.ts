import localFont from "next/font/local";

/**
 * Tipografías de /v4: las cuatro voces de la identidad (marca/identidad/).
 * Todas SIL Open Font License, subconjunto latin con acentos y ¿¡. Ni la web
 * actual ni /v3 las cargan.
 *
 *  poster  Archivo Condensed: Archivo variable fijada a anchura 66. Los
 *          statements en versal (la voz alta, al modo de Nike).
 *  sans    Geist: titulares en negrita, lectura e interfaz (la voz clara, al
 *          modo de Monolog).
 *  mono    Geist Mono: el dato (fechas, duraciones, contadores).
 *  serif   Cormorant Garamond, con su itálica: la voz de Mario.
 */
export const poster = localFont({
  src: "./fonts/ArchivoCondensed-Variable.woff2",
  weight: "100 900",
  variable: "--font-v4-poster",
  display: "swap",
});

export const geist = localFont({
  src: "./fonts/Geist-Variable-latin.woff2",
  weight: "100 900",
  variable: "--font-v4-sans",
  display: "swap",
});

export const geistMono = localFont({
  src: "./fonts/GeistMono-Variable.woff2",
  weight: "100 900",
  variable: "--font-v4-mono",
  display: "swap",
});

export const cormorant = localFont({
  src: [
    { path: "./fonts/CormorantGaramond-Variable.woff2", weight: "300 700", style: "normal" },
    { path: "./fonts/CormorantGaramond-Italic-Variable.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--font-v4-serif",
  display: "swap",
});
