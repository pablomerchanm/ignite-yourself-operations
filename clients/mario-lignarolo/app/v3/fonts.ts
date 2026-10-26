import localFont from "next/font/local";

/**
 * Archivo (Omnibus-Type, SIL Open Font License), variable en peso (100–900)
 * y anchura (62–125 %). Solo para la voz alta de /v3: la grotesk condensada
 * y extra-negra de los statements, al modo de Nike About. Subconjunto latin
 * (incluye acentos y ¿¡). La web actual no la carga.
 */
export const archivo = localFont({
  src: "./fonts/Archivo-Variable-latin.woff2",
  weight: "100 900",
  declarations: [{ prop: "font-stretch", value: "62% 125%" }],
  variable: "--font-archivo",
  display: "swap",
});
