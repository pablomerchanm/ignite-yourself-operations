import { pointOfView } from "@/data/content";

/** 06 — Sus ideas, en una franja que se mueve (sus palabras, en serif). */
export default function Marquee() {
  const ideas = pointOfView.ideas.filter((i) => pointOfView.show.includes(i.word));
  if (ideas.length === 0) return null;
  const Row = ({ hidden = false }: { hidden?: boolean }) => (
    <span className="marquee__item" aria-hidden={hidden}>
      {ideas.map((i) => (
        <span key={i.word} className="inline-flex items-center gap-12">
          <span className="display text-[clamp(1.5rem,1.2rem+1.2vw,2.3rem)] italic">«{i.quote}»</span>
          <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-accent" />
        </span>
      ))}
    </span>
  );
  return (
    <section aria-label={pointOfView.title} className="marquee border-y border-charcoal/10 py-6">
      <div className="marquee__track">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
