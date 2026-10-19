import type { CSSProperties } from "react";
import { pointOfView } from "@/data/content";
import { Eyebrow, Lines } from "./ui";

/** 07 — Ideas a las que vuelve: cuatro citas suyas, en rejilla. */
export default function PointOfView() {
  const ideas = pointOfView.ideas.filter((i) => pointOfView.show.includes(i.word));
  return (
    <section id="ideas" aria-labelledby="pov-title" className="gutter grain overflow-hidden bg-ink py-[clamp(4.5rem,3rem+7vw,9.5rem)] text-bone">
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-6">
        <Eyebrow className="text-fog lg:col-span-3">{pointOfView.eyebrow}</Eyebrow>
        <Lines
          id="pov-title"
          lines={[pointOfView.title]}
          className="display text-[clamp(2.2rem,1.4rem+3vw,4.6rem)] leading-[0.98] lg:col-span-8 lg:col-start-4"
        />
      </div>

      <ul className="mt-[clamp(2.5rem,5vw,4.5rem)] grid grid-cols-1 border-t border-bone/15 sm:grid-cols-2">
        {ideas.map((idea, i) => (
          <li
            key={idea.word}
            data-reveal="up"
            style={{ "--delay": `${(i % 2) * 0.08}s` } as CSSProperties}
            className={`border-b border-bone/15 py-[clamp(1.75rem,3vw,2.75rem)] sm:pr-8 ${i % 2 === 1 ? "sm:border-l sm:pl-8" : ""}`}
          >
            <p className={`display text-[clamp(2.4rem,1.4rem+3.6vw,5rem)] leading-[0.9] ${i === 0 ? "text-acid" : ""}`}>{idea.word}.</p>
            <blockquote className="display mt-5 max-w-[30rem] text-[clamp(1.25rem,1.05rem+0.8vw,1.75rem)] leading-[1.15] text-bone/85">
              <p>«{idea.quote}»</p>
            </blockquote>
          </li>
        ))}
      </ul>
    </section>
  );
}
