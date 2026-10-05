import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { site } from "@/data/content";

/** Flecha propia (las fuentes no traen →/↗). */
export function Arrow({ diagonal = false, className = "" }: { diagonal?: boolean; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className={`inline-block h-[0.8em] w-[0.8em] shrink-0 ${className}`}
      style={diagonal ? { transform: "rotate(-45deg)" } : undefined}
    >
      <path d="M1 8h13M9 3l5 5-5 5" />
    </svg>
  );
}

/** Enlace que, sin URL confirmada, se muestra como pendiente y no navega. */
export function SmartLink({
  href,
  children,
  className = "",
  external = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  if (!href) {
    return (
      <span className={`${className} is-pending`} aria-disabled="true" title="Enlace pendiente de confirmar">
        {children}
      </span>
    );
  }
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/** Etiqueta editorial en micro-caps con el punto verde como firma. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`caps flex items-center gap-3 ${className}`}>
      <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-acid" />
      {children}
    </p>
  );
}

/** Titular que entra línea a línea desde una máscara. */
export function Lines({
  lines,
  italicLine,
  className = "",
  as: Tag = "h2",
  delay,
  id,
}: {
  lines: ReactNode[];
  italicLine?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      data-reveal="lines"
      className={className}
      style={delay ? ({ "--delay": `${delay}s` } as CSSProperties) : undefined}
    >
      {lines.map((line, i) => (
        <span className="line" key={i}>
          <span style={{ "--i": i } as CSSProperties} className={i === italicLine ? "italic" : undefined}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Marca de contenido de muestra: solo visible en borrador. */
export function SampleTag({ show, className = "" }: { show?: boolean; className?: string }) {
  if (!site.draft || !show) return null;
  return (
    <span className={`caps rounded-full border border-current px-2 py-0.5 text-[0.6rem] opacity-60 ${className}`}>
      Muestra
    </span>
  );
}

/**
 * Hueco de imagen. Con `src`, imagen real; sin ella, un marco neutro que
 * dice qué foto falta (solo en borrador: publicado, el hueco desaparece).
 */
export function ImageSlot({
  src,
  alt,
  pendingLabel,
  sizes,
  className = "",
  imgClassName = "object-cover",
  tone = "light",
  showPending = false,
}: {
  src: string;
  alt: string;
  pendingLabel: string;
  sizes: string;
  className?: string;
  imgClassName?: string;
  tone?: "light" | "dark";
  showPending?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="sd-zoom absolute inset-0">
          <Image src={src} alt={alt} fill sizes={sizes} className={imgClassName} />
        </div>
      </div>
    );
  }
  // Sin foto, sin hueco: la composición se cierra sola. (El marco de
  // «fotografía pendiente» queda disponible con `showPending`.)
  if (!site.draft || !showPending) return null;
  const toneCls =
    tone === "light"
      ? "bg-[#e4ddcf] text-charcoal/60 border-charcoal/15"
      : "bg-[#0f1e1b] text-bone/50 border-bone/10 grain";
  return (
    <div className={`relative flex flex-col justify-between border p-5 ${toneCls} ${className}`} aria-hidden="true">
      <span className="caps">Fotografía pendiente</span>
      <span className="display text-[clamp(1.5rem,1rem+2vw,2.5rem)] italic opacity-70">{pendingLabel}</span>
    </div>
  );
}
