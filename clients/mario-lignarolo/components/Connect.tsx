import type { CSSProperties } from "react";
import { channels, connect, psicoUrl, publicEmail } from "@/data/content";
import { Arrow, Eyebrow, Lines, SmartLink } from "./ui";

/** 10 — Conecta: canales, Substack, (si Mario lo aprueba) correo y la línea para invitarlo. */
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

      <div className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-1 gap-y-16 lg:grid-cols-12 lg:gap-x-6">
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

        <div data-reveal="up" className="self-start lg:col-span-4 lg:col-start-9">
          <form action={substack ? `${substack}/subscribe` : undefined} method="get" target="_blank">
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

          <div className="mt-12 border-t border-bone/15 pt-8">
            <p className="caps text-fog">{connect.invite.label}</p>
            <p className="mt-3 text-[0.975rem] leading-relaxed text-bone/80">{connect.invite.text}</p>
            <SmartLink href={connect.invite.href} className="caps link-line mt-4 inline-flex items-center gap-2 pb-0.5 text-acid">
              {connect.invite.cta} <Arrow diagonal />
            </SmartLink>
          </div>
        </div>
      </div>
    </section>
  );
}
