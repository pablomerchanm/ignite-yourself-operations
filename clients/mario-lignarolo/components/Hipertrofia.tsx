import { articles } from "@/data/articles";
import { channels, hipertrofia } from "@/data/content";
import { Arrow, Eyebrow, ImageSlot, Lines, SampleTag, SmartLink } from "./ui";
import { formatDate } from "./format";

/** 04 — Hipertrofia del Ser: el territorio intelectual, tratado como publicación. */
export default function Hipertrofia() {
  const latest = articles[0];
  return (
    <section aria-labelledby="hipertrofia-title" className="gutter bg-paper py-[clamp(4.5rem,3rem+7vw,10rem)] text-charcoal">
      <div className="flex items-center justify-between gap-6 border-b border-charcoal pb-4">
        <Eyebrow className="text-charcoal/70">{hipertrofia.eyebrow}</Eyebrow>
        <span className="caps hidden text-charcoal/60 sm:block">{channels.substack.label}</span>
      </div>

      <Lines
        id="hipertrofia-title"
        lines={[
          <>
            {hipertrofia.name.before} <em>{hipertrofia.name.italic}</em> {hipertrofia.name.after}
          </>,
        ]}
        className="display py-[clamp(1.5rem,3vw,3rem)] text-[clamp(3.4rem,0.6rem+10.4vw,13rem)] leading-[0.86]"
      />

      <div className="grid grid-cols-1 gap-y-14 border-t border-charcoal/20 pt-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-4">
          <p data-reveal="up" className="display text-[clamp(2rem,1.4rem+2.1vw,3.4rem)] leading-[1.02]">
            {hipertrofia.headline.before}
            <br />
            <em>{hipertrofia.headline.em}</em>
          </p>
          <p data-reveal="up" className="mt-8 max-w-[30rem] text-[1.0625rem] leading-relaxed text-charcoal/80">
            {hipertrofia.intro}
          </p>
          <ul data-reveal="up" className="caps mt-8 flex max-w-[30rem] flex-wrap gap-x-3 gap-y-2 text-charcoal/60">
            {hipertrofia.topics.map((t, i) => (
              <li key={t}>
                {i > 0 && <span aria-hidden="true" className="mr-3">·</span>}
                {t}
              </li>
            ))}
          </ul>
          <div data-reveal="up" className="mt-10">
            <SmartLink
              href={channels.substack.href}
              className="caps inline-flex items-center gap-3 border border-charcoal px-6 py-4 transition-colors hover:bg-charcoal hover:text-paper"
            >
              {hipertrofia.subscribe} <Arrow diagonal />
            </SmartLink>
          </div>
        </div>

        {latest && (
          <article data-reveal="up" className="lg:col-span-5">
            <div className="caps flex flex-wrap items-center gap-3 text-charcoal/60">
              <span>{hipertrofia.latestLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{latest.topic}</span>
              {latest.date && (
                <>
                  <span aria-hidden="true">·</span>
                  <time dateTime={latest.date}>{formatDate(latest.date)}</time>
                </>
              )}
              <SampleTag show={latest.sample} />
            </div>
            <h3 className="display mt-6 text-[clamp(2.4rem,1.5rem+3.2vw,4.75rem)] leading-[0.95]">{latest.title}</h3>
            <p className="mt-6 max-w-[30rem] text-[1.0625rem] leading-relaxed text-charcoal/75">{latest.excerpt}</p>
            <SmartLink
              href={latest.url}
              className="caps link-line mt-8 inline-flex items-center gap-3 pb-1"
            >
              Leer artículo <Arrow />
            </SmartLink>
          </article>
        )}

        <div data-reveal="up" className="lg:col-span-3">
          <ImageSlot
            src={hipertrofia.image.src}
            alt={hipertrofia.image.alt}
            pendingLabel="Entreno"
            sizes="(min-width: 1024px) 25vw, 100vw"
            className="aspect-[4/5] w-full max-w-[22rem] lg:max-w-none"
          />
        </div>
      </div>
    </section>
  );
}
