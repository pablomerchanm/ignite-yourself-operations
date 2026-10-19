import { channels, connect, nav, site } from "@/data/content";
import { Arrow, SmartLink } from "./ui";

/** 10 — Pie: newsletter, destinos, canales y su nombre a todo el ancho. */
export default function Footer() {
  const substack = channels.substack.href.replace(/\/$/, "");
  return (
    <footer id="conecta" className="dark glow glow--dark gutter grain bg-ink pt-[clamp(4rem,3rem+6vw,7rem)] pb-8 text-bone">
      <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-5">
          <p className="title text-[clamp(1.9rem,1.5rem+1.4vw,2.8rem)]">
            Recibe los escritos de <b>Hipertrofia del Ser</b>
          </p>
          <form action={`${substack}/subscribe`} method="get" target="_blank" className="mt-6 flex max-w-[28rem] gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              {connect.newsletterLabel}
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={connect.newsletterPlaceholder}
              className="min-w-0 flex-1 rounded-full border border-bone/20 bg-transparent px-5 py-3 text-[0.95rem] text-bone placeholder:text-bone/40 focus:border-bone/60 focus:outline-none"
            />
            <button type="submit" className="btn btn--blue">
              {connect.newsletterCta} <Arrow />
            </button>
          </form>
          <p className="mt-3 text-[0.8125rem] text-fog">{connect.newsletterNote}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:col-span-6 lg:col-start-7 lg:grid-cols-3">
          <div>
            <p className="caps text-fog">Explora</p>
            <ul className="mt-4 space-y-2 text-[0.95rem]">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="link-line text-bone/85 hover:text-bone">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="caps text-fog">Canales</p>
            <ul className="mt-4 space-y-2 text-[0.95rem]">
              {Object.values(channels).map((c) => (
                <li key={c.label}>
                  <SmartLink href={c.href} className="link-line text-bone/85 hover:text-bone">
                    {c.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <p className="caps text-fog">{connect.invite.label}</p>
            <p className="mt-4 text-[0.9rem] leading-[1.5] text-bone/70">{connect.invite.text}</p>
            <SmartLink href={connect.invite.href} className="link-line mt-3 inline-flex items-center gap-2 text-[0.9rem] text-bone/85">
              {connect.invite.cta} <Arrow diagonal />
            </SmartLink>
          </div>
        </div>
      </div>

      <p className="giant mt-[clamp(3rem,6vw,5rem)] text-bone" aria-hidden="true">
        Mario Lignarolo<span className="text-accent">.</span>
      </p>

      <div className="caps mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-bone/15 pt-5 text-fog">
        <span>
          {site.name} · © {new Date().getFullYear()}
        </span>
        <span>Cuerpo · Mente · Identidad · Expansión</span>
      </div>
    </footer>
  );
}
