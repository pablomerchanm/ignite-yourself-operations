import type { ReactNode } from "react";
import s from "../v4.module.css";

/** Enlaces externos: pestaña nueva sin filtrar el opener. */
export const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

const pad = (n: number) => String(n).padStart(2, "0");

/** Etiqueta de sección: un punto y el nombre (Monolog, «● Success Stories»). */
export function SectionHead({ label, id }: { label: string; id?: string }) {
  return (
    <p className={s.title} id={id} data-reveal="up">
      {label}
    </p>
  );
}

/** Flecha ↗ (sale de la web): un trazo, sin relleno. */
export function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
    </svg>
  );
}

/** Flecha → (lleva a otra parte de la página o envía). */
export function ArrowRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

/** Flecha ↑ (volver arriba). */
export function ArrowUp() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M8 13V3M4 7l4-4 4 4" />
    </svg>
  );
}

/**
 * Botón de la marca: la etiqueta y, pegada, la caja con la flecha en el
 * color contrario (Monolog). Principal (relleno) o fantasma (filete). Con
 * `href`, un enlace; sin él, un botón (`type`).
 */
export function Btn({
  children,
  href,
  ghost = false,
  external = false,
  icon = "ne",
  type = "button",
  className = "",
}: {
  children: ReactNode;
  href?: string;
  ghost?: boolean;
  external?: boolean;
  icon?: "ne" | "right";
  type?: "button" | "submit";
  className?: string;
}) {
  const cls = `${s.btn} ${ghost ? s.btnGhost : ""} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span className={s.btnBox}>{icon === "ne" ? <Arrow /> : <ArrowRight />}</span>
    </>
  );
  return href ? (
    <a href={href} className={cls} {...(external ? ext : {})}>
      {inner}
    </a>
  ) : (
    <button type={type} className={cls}>
      {inner}
    </button>
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

/** Barra de lectura: línea de progreso, flechas y contador en mono, (01/05). */
export function Progress({ total }: { total: number }) {
  return (
    <div className={s.progress}>
      <span className={s.track}>
        <span className={s.trackFill} data-fill />
      </span>
      <div className={s.progressNav}>
        <button type="button" className={s.arrowBtn} data-prev aria-label="Anterior">
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M13 8H3M7 4 3 8l4 4" />
          </svg>
        </button>
        <button type="button" className={s.arrowBtn} data-next aria-label="Siguiente">
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 8h10M9 4l4 4-4 4" />
          </svg>
        </button>
        <span className={s.counter}>
          (<span data-cur>01</span>/{pad(total)})
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
