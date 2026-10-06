import Image from "next/image";
import { about, channels } from "@/data/content";
import { Arrow, Eyebrow, SmartLink } from "./ui";

/** 10 — Mario, hoy: después de las ideas, volver a la persona. */
export default function AboutMario() {
  const links = Object.values(channels);
  return (
    <section aria-labelledby="about-title" className="gutter bg-paper py-[clamp(5rem,4rem+8vw,11rem)] text-charcoal">
      <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-6">
        <div data-reveal="up" className="lg:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-ink">
            <div className="sd-zoom absolute inset-0">
              <Image
                src={about.image.src}
                alt={about.image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="origin-[48%_44%] scale-[1.45] object-cover object-[48%_40%] contrast-[1.08] grayscale"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-12 lg:col-span-6 lg:col-start-7">
          <div>
            <Eyebrow className="text-charcoal/70">{about.eyebrow}</Eyebrow>
            <h2 id="about-title" data-reveal="up" className="display mt-8 text-[clamp(2rem,1.4rem+2.2vw,3.6rem)] leading-[1.02]">
              {about.quote}
            </h2>
            <p data-reveal="up" className="display mt-6 max-w-[30rem] text-[clamp(1.4rem,1.1rem+1.1vw,2.1rem)] leading-[1.1] italic text-charcoal/80">
              {about.quoteEnd}
            </p>
            <p data-reveal="up" className="mt-8 max-w-[34rem] text-[1.0625rem] leading-relaxed text-charcoal/80">
              {about.bio}
            </p>
          </div>

          <div data-reveal="up" className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <p className="caps text-charcoal/55">{about.focusLabel}</p>
              <ul className="mt-4 space-y-2 text-[1.0625rem]">
                {about.focus.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="caps text-charcoal/55">{about.location || "En línea"}</p>
              <ul className="mt-4 space-y-2 text-[1.0625rem]">
                {links.map((c) => (
                  <li key={c.label}>
                    <SmartLink href={c.href} className="link-line inline-flex items-center gap-2">
                      {c.label} <Arrow diagonal />
                    </SmartLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
