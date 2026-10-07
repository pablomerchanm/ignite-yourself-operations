import Image from "next/image";
import { lignarolo } from "@/data/content";
import { Arrow, Eyebrow, Lines, SmartLink } from "./ui";

/**
 * 06b — Lignarolo: la capa de emprendimiento. Mario como constructor de
 * una marca real, en sus palabras y con lo que la marca dice de sí misma.
 */
export default function Lignarolo() {
  return (
    <section id="lignarolo" aria-labelledby="lignarolo-title" className="gutter bg-paper py-[clamp(5rem,4rem+8vw,11rem)] text-charcoal">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-charcoal/20 pb-5">
        <Eyebrow className="text-charcoal/70">{lignarolo.eyebrow}</Eyebrow>
        <SmartLink href={lignarolo.href} className="caps link-line hidden items-center gap-2 pb-0.5 text-charcoal/70 sm:inline-flex">
          lignarolo.com <Arrow diagonal />
        </SmartLink>
      </div>

      <div className="grid grid-cols-1 gap-y-10 pt-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-12 lg:gap-x-6">
        <div className="flex flex-col justify-between gap-10 lg:col-span-5">
          <div>
            <Lines
              id="lignarolo-title"
              lines={[lignarolo.name]}
              className="display text-[clamp(3.6rem,1rem+9vw,10rem)] leading-[0.86]"
            />
            <p data-reveal="up" className="display mt-3 text-[clamp(1.4rem,1.1rem+1.1vw,2.1rem)] italic text-charcoal/70">
              {lignarolo.tagline}
            </p>
          </div>

          <div>
            <p data-reveal="up" className="display max-w-[22rem] text-[clamp(1.7rem,1.3rem+1.5vw,2.6rem)] leading-[1.06]">
              {lignarolo.quote}
            </p>
            <p data-reveal="up" className="mt-7 max-w-[30rem] text-[1.0625rem] leading-relaxed text-charcoal/80">
              {lignarolo.description}
            </p>
            <ul data-reveal="up" className="caps mt-7 flex flex-wrap gap-x-3 gap-y-2 text-charcoal/60">
              {lignarolo.facts.map((f, i) => (
                <li key={f}>
                  {i > 0 && <span aria-hidden="true" className="mr-3">·</span>}
                  {f}
                </li>
              ))}
            </ul>
            <div data-reveal="up" className="mt-10">
              <SmartLink
                href={lignarolo.href}
                className="caps inline-flex items-center gap-3 border border-charcoal px-6 py-4 transition-colors hover:bg-charcoal hover:text-paper"
              >
                {lignarolo.cta} <Arrow diagonal />
              </SmartLink>
            </div>
          </div>
        </div>

        <div data-reveal="up" className="lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden bg-[#e9e9e7]">
            <div className="sd-zoom absolute inset-0">
              <Image
                src={lignarolo.image.src}
                alt={lignarolo.image.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover object-right"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Su tesis sobre emprender, en sus palabras. */}
      <div className="mt-[clamp(3.5rem,7vw,6rem)] grid grid-cols-1 gap-y-6 border-t border-charcoal/20 pt-[clamp(2rem,4vw,3rem)] lg:grid-cols-12 lg:gap-x-6">
        <Lines
          lines={[lignarolo.thesis.title]}
          className="display text-[clamp(2.6rem,1.2rem+4.6vw,6rem)] leading-[0.92] lg:col-span-6"
        />
        <div className="lg:col-span-5 lg:col-start-8">
          <p data-reveal="up" className="text-[1.0625rem] leading-relaxed text-charcoal/80">{lignarolo.thesis.text}</p>
          <p data-reveal="up" className="display mt-6 text-[clamp(1.4rem,1.1rem+0.9vw,1.9rem)] leading-[1.1] italic">
            {lignarolo.thesis.close}
          </p>
        </div>
      </div>
    </section>
  );
}
