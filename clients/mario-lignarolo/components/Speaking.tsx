import type { CSSProperties } from "react";
import { about, publicEmail, speaking } from "@/data/content";
import { Arrow, Eyebrow, Lines, SmartLink } from "./ui";

/**
 * 10b — Plataforma: invitar a Mario a charlas, podcasts y entrevistas.
 * Temas que salen de su propio contenido, formatos, bio corta y fotos.
 */
export default function Speaking() {
  return (
    <section id="invitar" aria-labelledby="speaking-title" className="gutter bg-cream py-[clamp(5rem,4rem+8vw,11rem)] text-charcoal">
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-6">
        <Eyebrow className="text-charcoal/70 lg:col-span-3">{speaking.eyebrow}</Eyebrow>
        <div className="lg:col-span-9">
          <Lines
            id="speaking-title"
            lines={speaking.title}
            italicLine={speaking.titleItalicLine}
            className="display text-[clamp(2.8rem,1rem+6.4vw,8rem)] leading-[0.9]"
          />
          <p data-reveal="up" className="mt-8 max-w-[34rem] text-[1.0625rem] leading-relaxed text-charcoal/80">
            {speaking.intro}
          </p>
        </div>
      </div>

      <div className="mt-[clamp(3rem,6vw,5.5rem)] grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-6">
        {/* Temas */}
        <div className="lg:col-span-7">
          <p data-reveal="up" className="caps text-charcoal/55">
            {speaking.topicsLabel}
          </p>
          <ol className="mt-5 border-b border-charcoal/20">
            {speaking.topics.map((t, i) => (
              <li
                key={t.title}
                data-reveal="up"
                style={{ "--delay": `${i * 0.06}s` } as CSSProperties}
                className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-5 border-t border-charcoal/20 py-5"
              >
                <span className="caps w-6 text-charcoal/55">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="display text-[clamp(1.6rem,1.2rem+1.3vw,2.4rem)] leading-tight">{t.title}</h3>
                  <p className="mt-2 max-w-[32rem] text-[0.975rem] leading-relaxed text-charcoal/65">{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <ul data-reveal="up" className="caps mt-6 flex flex-wrap gap-x-3 gap-y-2 text-charcoal/60">
            {speaking.formats.map((f, i) => (
              <li key={f}>
                {i > 0 && <span aria-hidden="true" className="mr-3">·</span>}
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Invitar + kit */}
        <aside data-reveal="up" className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9">
          <div>
            <p className="caps text-charcoal/55">{speaking.inviteLabel}</p>
            <p className="display mt-4 text-[clamp(1.5rem,1.2rem+1vw,2.1rem)] leading-[1.08]">{speaking.inviteText}</p>
            <div className="mt-6 flex flex-col items-start gap-4">
              <SmartLink
                href={speaking.inviteHref}
                className="caps inline-flex items-center gap-3 bg-charcoal px-6 py-4 text-cream transition-colors hover:bg-ink"
              >
                {speaking.inviteCta} <Arrow diagonal />
              </SmartLink>
              <SmartLink
                href={publicEmail ? `mailto:${publicEmail}` : ""}
                external={false}
                className="caps link-line inline-flex items-center gap-2 pb-0.5 text-charcoal/70"
              >
                {publicEmail || speaking.emailPending}
              </SmartLink>
            </div>
          </div>

          <div className="border-t border-charcoal/20 pt-8">
            <p className="caps text-charcoal/55">{speaking.bioLabel}</p>
            <p className="mt-4 text-[0.975rem] leading-relaxed text-charcoal/80">{about.bio}</p>
          </div>

          <div className="border-t border-charcoal/20 pt-8">
            <p className="caps text-charcoal/55">{speaking.photosLabel}</p>
            <ul className="mt-4 space-y-2 text-[0.975rem]">
              {speaking.photos.map((p) => (
                <li key={p.href}>
                  <a href={p.href} download className="link-line inline-flex items-center gap-2 pb-0.5">
                    {p.label} <Arrow />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
