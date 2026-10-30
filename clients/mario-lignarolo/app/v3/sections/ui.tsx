import s from "../v3.module.css";

/** Enlaces externos: pestaña nueva sin filtrar el opener. */
export const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Título de sección: caja baja, peso medio, tamaño humano (Nike About). */
export function SectionHead({ label, id }: { label: string; id?: string }) {
  return (
    <p className={s.title} id={id} data-reveal="up">
      {label}
    </p>
  );
}

/** Flecha ↗ de los CTA: un trazo, sin relleno. */
export function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 13 13 3M5 3h8v8" />
    </svg>
  );
}

/**
 * Texto partido en palabras (.sw) para el scrub de lectura. El copy no
 * cambia: solo se envuelve cada palabra; los espacios quedan como texto.
 */
export function Words({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\s+)/).map((w, i) =>
        /^\s+$/.test(w) ? w : w ? (
          <span key={i} className="sw">
            {w}
          </span>
        ) : null,
      )}
    </>
  );
}

/** Párrafos del copy, tal cual, sin reescribir. */
export function Paragraphs({ items, className }: { items: string[]; className?: string }) {
  return (
    <>
      {items.map((p) => (
        <p key={p} className={className}>
          {p}
        </p>
      ))}
    </>
  );
}
