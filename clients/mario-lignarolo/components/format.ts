const fmt = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** "2026-09-14" → "14 sept 2026" */
export function formatDate(iso: string) {
  return fmt.format(new Date(`${iso}T00:00:00Z`)).replace(/\./g, "");
}
