import type { CSSProperties } from "react";
import { channels, connect, psicoUrl, publicEmail } from "@/data/content";
import { Arrow, Eyebrow, Lines, SmartLink } from "./ui";

/** 11 — Conecta: canales, Substack y (si Mario lo aprueba) correo. */
export default function Connect() {
  const rows = [
    ...Object.values(channels),
    { label: "Psico-Cibernética", href: psicoUrl },
    ...(publicEmail ? [{ label: publicEmail, href: `mailto:${publicEmail}` }] : []),
  ];
  const substack = channels.substack.href.replace(/\/$/, "");

  return (
    <section id="conecta" aria-labelledby="connect-title" className="gutter grain bg-ink pt-[clamp(5rem,4rem+8vw,11rem)] pb-[clamp(3rem,6vw,5rem)] text-bone">
      <Eyebrow className="mb-8 text-fog">{connect.eyebrow}</Eyebrow>
      <Lines
        id="connect-title"
        lines={connect.title}
        italicLine={1}
        className="display text-[clamp(3.2rem,0.8rem+9vw,11.5rem)] leading-[0.86]"
      />

      <div data-reveal="up" className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-1 items-end gap-8 border-y border-bone/15 py-[clamp(2rem,4vw,3rem)] lg:grid-cols-12 lg:gap-x-6">
        <p className="display text-[clamp(5rem,3rem+8vw,11rem)] leading-[0.8] text-acid lg:col-span-4">
          «{connect.ser.keyword}»
        </p>
        <div className="lg:col-span-7 lg:col-start-6">
          <p className="max-w-[36rem] text-[clamp(1.05rem,0.95rem+0.4vw,1.25rem)] leading-relaxed text-bone/85">
            {connect.ser.text}
          </p>
          <SmartLink
            href={connect.ser.href}
            className="caps mt-6 inline-flex items-center gap-3 bg-acid px-7 py-[1.1rem] font-medium text-ink transition-colors hover:bg-bone"
          >
            {connect.ser.cta} <Arrow diagonal />
          </SmartLink>
        </div>
      </div>

      <div className="mt-[clamp(3.5rem,7vw,6rem)] grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:gap-x-6">
        <ul className="border-b border-bone/15 lg:col-span-7">
          {rows.map((r, i) => (
            <li key={r.label} data-reveal="up" style={{ "--delay": `${i * 0.05}s` } as CSSProperties} className="border-t border-bone/15">
              <SmartLink
                href={r.href}
                external={!r.href.startsWith("mailto:")}
                className="group flex items-center justify-between gap-6 py-5"
              >
                <span className="display text-[clamp(1.9rem,1.4rem+1.6vw,3rem)] leading-none transition-colors duration-500 group-hover:text-acid">
                  {r.label}
                </span>
                <Arrow diagonal className="text-[1.5rem] text-fog transition-colors duration-500 group-hover:text-acid" />
              </SmartLink>
            </li>
          ))}
        </ul>

        <form
          data-reveal="up"
          action={substack ? `${substack}/subscribe` : undefined}
          method="get"
          target="_blank"
          className="self-start lg:col-span-4 lg:col-start-9"
        >
          <label htmlFor="newsletter-email" className="display block text-[clamp(1.6rem,1.3rem+1vw,2.2rem)] leading-tight">
            {connect.newsletterLabel}
          </label>
          <div className="mt-6 flex border-b border-bone/40 focus-within:border-acid">
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              disabled={!substack}
              placeholder={connect.newsletterPlaceholder}
              className="min-w-0 flex-1 bg-transparent py-3 text-[1.0625rem] text-bone placeholder:text-bone/35 focus:outline-none disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!substack}
              className="caps flex items-center gap-2 py-3 pl-4 text-acid disabled:cursor-not-allowed disabled:opacity-50"
            >
              {connect.newsletterCta} <Arrow />
            </button>
          </div>
          <p className="mt-3 text-[0.8125rem] text-fog">{connect.newsletterNote}</p>
        </form>
      </div>
    </section>
  );
}
