import { pointOfView, site } from "@/data/content";
import { Eyebrow, Lines } from "./ui";

/** 05 — Un cuerpo de ideas, no solo un producto. Grandes enunciados alternados. */
export default function PointOfView() {
  return (
    <section aria-labelledby="pov-title" className="gutter grain overflow-hidden bg-ink py-[clamp(5rem,4rem+8vw,11rem)] text-bone">
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-6">
        <Eyebrow className="text-fog lg:col-span-3">{pointOfView.eyebrow}</Eyebrow>
        <div className="lg:col-span-8 lg:col-start-4">
          <h2 id="pov-title" className="display text-[clamp(2.2rem,1.4rem+3vw,4.6rem)] leading-[0.98]">
            {pointOfView.title}
          </h2>
          <p className="caps mt-4 text-fog/80">{pointOfView.sourceNote}</p>
        </div>
      </div>

      <ul className="mt-[clamp(3.5rem,8vw,7rem)] space-y-[clamp(2.5rem,5vw,4.5rem)]">
        {pointOfView.ideas.map((idea, i) => {
          const right = i % 2 === 1;
          return (
            <li key={idea.word} className={`flex flex-col ${right ? "items-end text-right" : "items-start"}`}>
              <Lines
                as="p"
                lines={[idea.word + "."]}
                className={`display text-[clamp(3rem,0.8rem+8.6vw,10rem)] leading-[0.9] ${i === 0 ? "text-acid" : ""}`}
              />
              <blockquote
                data-reveal="up"
                className={`display mt-5 max-w-[32rem] text-[clamp(1.35rem,1.05rem+1.1vw,2.1rem)] leading-[1.15] text-bone/85 ${
                  right ? "border-r border-bone/20 pr-5" : "border-l border-bone/20 pl-5"
                }`}
              >
                <p>«{idea.quote}»</p>
              </blockquote>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
