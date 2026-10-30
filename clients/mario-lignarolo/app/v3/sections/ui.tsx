import s from "../v3.module.css";

/** Enlaces externos: pestaña nueva sin filtrar el opener. */
export const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/**
 * Etiqueta de sección: pequeña, en versal espaciada. Nombra la sección; no
 * titula (el titular es el golpe en condensada).
 */
export function Tag({ label, id, as: As = "p" }: { label: string; id?: string; as?: "p" | "h2" }) {
  return (
    <As className={s.tag} id={id} data-reveal="up">
      {label}
    </As>
  );
}

/**
 * Botón: el paso principal de una sección, cuando lleva a otro mundo (sale
 * de la web). Lleno, con la flecha ↗; uno por pantalla como mucho.
 */
export function Btn({ href, children }: { href: string; children: string }) {
  return (
    <a href={href} className={s.btn} {...ext}>
      <span>{children}</span>
      <Arrow />
    </a>
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
