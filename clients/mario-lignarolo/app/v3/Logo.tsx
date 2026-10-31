import { LOGO_PATH, LOGO_VIEWBOX } from "./logo-path";

/** Logo de Mario Lignarolo en vector; toma el color del texto (currentColor). */
export default function Logo({ className, title = "Mario Lignarolo" }: { className?: string; title?: string }) {
  return (
    <svg className={className} viewBox={LOGO_VIEWBOX} role="img" aria-label={title} focusable="false">
      <path d={LOGO_PATH} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}
