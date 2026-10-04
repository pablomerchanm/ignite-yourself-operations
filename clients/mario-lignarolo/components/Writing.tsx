import type { CSSProperties } from "react";
import { articles } from "@/data/articles";
import { channels, writing } from "@/data/content";
import { Arrow, Eyebrow, Lines, SampleTag, SmartLink } from "./ui";
import { formatDate } from "./format";

/** 07 — Escritos: lista editorial fuerte (sin rejilla de tarjetas). */
export default function Writing() {
  // El más reciente ya se destaca en «Hipertrofia del Ser».
  const list = (articles.length > 1 ? articles.slice(1) : articles).slice(0, 5);
  return (
    <section id="escritos" aria-labelledby="writing-title" className="gutter bg-cream py-[clamp(5rem,4rem+8vw,11rem)] text-charcoal">
      <div className="grid grid-cols-1 items-end gap-y-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-8">
          <Eyebrow className="mb-8 text-charcoal/70">{writing.eyebrow}</Eyebrow>
          <Lines
            id="writing-title"
            lines={writing.title}
            italicLine={1}
            className="display text-[clamp(3.2rem,1rem+8vw,10rem)] leading-[0.86] uppercase"
          />
        </div>
        <div data-reveal="up" className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          <SmartLink
            href={channels.substack.href}
            className="caps inline-flex items-center gap-3 bg-charcoal px-6 py-4 text-cream transition-colors hover:bg-ink"
          >
            {writing.ctaRead} <Arrow diagonal />
          </SmartLink>
          <SmartLink
            href={channels.substack.href}
            className="caps inline-flex items-center gap-3 border border-charcoal px-6 py-4 transition-colors hover:bg-charcoal hover:text-cream"
          >
            {writing.ctaSubscribe}
          </SmartLink>
        </div>
      </div>

      <ol className="mt-[clamp(3rem,7vw,6rem)] border-b border-charcoal/20">
        {list.map((a, i) => (
          <li key={a.title} data-reveal="up" style={{ "--delay": `${i * 0.05}s` } as CSSProperties} className="border-t border-charcoal/20">
            <SmartLink
              href={a.url}
              className="group grid grid-cols-1 gap-y-3 py-[clamp(1.5rem,3vw,2.5rem)] lg:grid-cols-12 lg:items-baseline lg:gap-x-6"
            >
              <span className="caps flex flex-wrap items-center gap-2 text-charcoal/55 lg:col-span-2">
                {a.date ? <time dateTime={a.date}>{formatDate(a.date)}</time> : null}
                <span>{a.topic}</span>
                <SampleTag show={a.sample} />
              </span>
              <span className="display text-[clamp(2rem,1.4rem+2.2vw,3.6rem)] leading-[0.98] transition-transform duration-700 group-hover:translate-x-2 lg:col-span-6">
                {a.title}
              </span>
              <span className="max-w-[28rem] text-[0.975rem] leading-relaxed text-charcoal/70 lg:col-span-3">
                {a.excerpt}
              </span>
              <span className="caps hidden items-center justify-end gap-2 lg:col-span-1 lg:flex">
                {writing.read} <Arrow />
              </span>
            </SmartLink>
          </li>
        ))}
      </ol>
    </section>
  );
}
