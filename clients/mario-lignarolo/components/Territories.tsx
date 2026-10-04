import type { CSSProperties } from "react";
import { territories } from "@/data/content";
import { Eyebrow, Lines } from "./ui";

/** 03 — Los cuatro territorios como capítulos editoriales (sin iconos ni tarjetas). */
export default function Territories() {
  return (
    <section id="ideas" className="gutter grain bg-ink py-[clamp(5rem,4rem+8vw,11rem)] text-bone">
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-6">
        <Eyebrow className="text-fog lg:col-span-3">{territories.eyebrow}</Eyebrow>
        <Lines
          lines={[territories.title]}
          className="display text-[clamp(2.2rem,1.4rem+3vw,4.6rem)] leading-[0.98] lg:col-span-8 lg:col-start-4"
        />
      </div>

      <ol className="mt-[clamp(3.5rem,8vw,7rem)] border-b border-bone/15">
        {territories.items.map((t, i) => (
          <li
            key={t.word}
            data-reveal="up"
            style={{ "--delay": `${i * 0.05}s` } as CSSProperties}
            className="group grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-5 border-t border-bone/15 py-[clamp(1.5rem,3vw,2.75rem)] lg:grid-cols-12 lg:gap-x-6"
          >
            <span className="caps text-acid lg:col-span-1">{t.n}</span>
            <h3
              className={`display text-[clamp(3.4rem,1.2rem+9.5vw,11.5rem)] leading-[0.82] uppercase transition-colors duration-700 group-hover:text-acid lg:col-span-7 ${
                t.italic ? "italic" : ""
              }`}
            >
              {t.word}
            </h3>
            <p className="col-start-2 mt-4 max-w-[22rem] text-[1.0625rem] leading-relaxed text-bone/75 lg:col-span-3 lg:col-start-10 lg:mt-0 lg:self-end">
              {t.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
