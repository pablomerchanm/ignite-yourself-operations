import s from "../v3.module.css";

/** Enlaces externos: pestaña nueva sin filtrar el opener. */
export const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const pad = (n: number) => String(n).padStart(2, "0");

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

/** Barra de lectura: línea de progreso, flechas y contador (01 / 05). */
export function Progress({ total }: { total: number }) {
  return (
    <div className={s.progress}>
      <span className={s.track}>
        <span className={s.trackFill} data-fill />
      </span>
      <div className={s.progressNav}>
        <button type="button" className={s.arrowBtn} data-prev aria-label="Anterior">
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M15 8H2M7 3 2 8l5 5" />
          </svg>
        </button>
        <button type="button" className={s.arrowBtn} data-next aria-label="Siguiente">
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
            <path d="M1 8h13M9 3l5 5-5 5" />
          </svg>
        </button>
        <span className={s.counter}>
          <span data-cur>01</span> / {pad(total)}
        </span>
      </div>
    </div>
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
