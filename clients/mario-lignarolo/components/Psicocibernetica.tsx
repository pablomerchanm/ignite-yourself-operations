import { psico, psicoUrl } from "@/data/content";
import { Arrow } from "./ui";
import VideoPlayer from "./VideoPlayer";

/**
 * 03 — La oferta principal, como un bloque de producto. A la izquierda, el
 * aura que respira (el azul es del programa, no de la marca de Mario); al
 * pulsar, ahí mismo se reproduce el video con el que él lo presenta.
 */
export default function Psicocibernetica() {
  return (
    <section id="psicocibernetica" aria-labelledby="psico-title" className="gutter bg-sky py-[clamp(4rem,3rem+6vw,8rem)]">
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:items-center lg:gap-x-10">
        <div data-reveal="up" className="lg:col-span-6">
          <VideoPlayer
            src={psico.video.src}
            poster={psico.video.poster}
            duration={psico.video.duration}
            label={psico.video.label}
            className="frame aspect-square w-full data-[playing]:aspect-video lg:aspect-[4/5]"
            cover={
              <div className="aura pointer-events-none absolute inset-0" aria-hidden="true">
                <span className="aura__word display">[{psico.auraWord}]</span>
              </div>
            }
          />
        </div>

        <div className="lg:col-span-6 lg:pl-2">
          <p data-reveal="up" className="caps text-stone">
            {psico.eyebrow} · {psico.days} días
          </p>
          <h2 id="psico-title" data-reveal="up" className="title mt-4 text-[clamp(2.6rem,1.6rem+3.6vw,5rem)]">
            Psico-<b>Cibernética</b>
          </h2>
          <p data-reveal="up" className="mt-4 max-w-[30rem] text-[1.125rem] leading-[1.5] text-charcoal/80 lg:text-[1.25rem]">
            <b className="font-semibold text-charcoal">{psico.positioning}</b> {psico.promise}
          </p>

          <ul data-reveal="up" className="mt-6 flex flex-wrap gap-2" aria-label={psico.intro}>
            {psico.explores.map((item) => (
              <li key={item} className="chip bg-paper">
                {item}
              </li>
            ))}
          </ul>

          <div data-reveal="up" className="mt-8 flex flex-wrap items-center gap-4">
            <a href={psicoUrl} target="_blank" rel="noopener noreferrer" className="btn btn--ink">
              {psico.cta} <Arrow />
            </a>
            <p className="max-w-[18rem] text-[0.8125rem] leading-snug text-stone">{psico.note}</p>
          </div>

          <details data-reveal="up" className="acc mt-8 max-w-[32rem] border-t border-charcoal/15">
            <summary className="flex items-center justify-between gap-4 py-4 text-[0.95rem] font-medium">
              {psico.originLabel}
              <span className="acc__plus text-[1.4rem] leading-none font-light" aria-hidden="true">
                +
              </span>
            </summary>
            <div className="pb-5">
              <p className="text-[0.95rem] leading-relaxed text-charcoal/75">{psico.born}</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-charcoal/75">{psico.origin}</p>
              <p className="display mt-4 text-[1.35rem] leading-[1.12] italic">«{psico.originQuote}»</p>
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
