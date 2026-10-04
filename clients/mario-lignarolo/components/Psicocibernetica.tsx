import type { CSSProperties } from "react";
import { psico, psicoUrl } from "@/data/content";
import { Arrow, Eyebrow, Lines, SmartLink } from "./ui";

/**
 * 06 — El producto actual, como consecuencia de la visión (no como página
 * de ventas). Módulo propio: el verde de la pared del retrato.
 */
export default function Psicocibernetica() {
  return (
    <section
      id="psicocibernetica"
      aria-labelledby="psico-title"
      className="gutter grain overflow-hidden bg-ink-2 py-[clamp(5rem,4rem+8vw,11rem)] text-bone"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-bone/15 pb-5">
        <Eyebrow className="text-fog">{psico.eyebrow}</Eyebrow>
        <p className="caps text-acid">{psico.positioning}</p>
      </div>

      <div className="relative grid grid-cols-1 items-end gap-y-6 pt-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-12 lg:gap-x-6">
        <Lines
          id="psico-title"
          lines={["Psico-", "Cibernética"]}
          className="display text-[clamp(3.2rem,0.4rem+10.2vw,12.5rem)] leading-[0.84] uppercase lg:col-span-8"
        />
        <p
          data-reveal="up"
          className="flex items-baseline gap-3 lg:col-span-4 lg:justify-end"
          aria-label={`${psico.days} días`}
        >
          <span
            aria-hidden="true"
            className="display text-[clamp(7rem,3rem+14vw,17rem)] leading-[0.8] text-transparent [-webkit-text-stroke:1px_var(--color-acid)]"
          >
            {psico.days}
          </span>
          <span aria-hidden="true" className="display text-[clamp(1.8rem,1.2rem+1.8vw,3rem)] italic">
            días
          </span>
        </p>
      </div>

      <div className="mt-[clamp(3rem,6vw,5.5rem)] grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5">
          <p data-reveal="up" className="display text-[clamp(2rem,1.4rem+2vw,3.3rem)] leading-[1.02]">
            {psico.promise}
          </p>
          <div data-reveal="up" className="mt-10 flex flex-col items-start gap-5">
            <SmartLink
              href={psicoUrl}
              className="caps inline-flex items-center gap-3 bg-acid px-7 py-[1.1rem] font-medium text-ink transition-colors hover:bg-bone"
            >
              {psico.cta} <Arrow diagonal />
            </SmartLink>
            <p className="max-w-[24rem] text-[0.8125rem] leading-relaxed text-fog">{psico.note}</p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <p data-reveal="up" className="caps text-fog">
            {psico.intro}
          </p>
          <ol className="mt-6 border-b border-bone/15">
            {psico.explores.map((item, i) => (
              <li
                key={item}
                data-reveal="up"
                style={{ "--delay": `${i * 0.06}s` } as CSSProperties}
                className="flex items-baseline gap-6 border-t border-bone/15 py-4"
              >
                <span className="caps w-6 text-acid">{String(i + 1).padStart(2, "0")}</span>
                <span className="display text-[clamp(1.6rem,1.2rem+1.2vw,2.3rem)] leading-tight">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
