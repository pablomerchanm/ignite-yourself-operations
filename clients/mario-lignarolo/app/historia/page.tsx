import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import Footer from "@/components/Footer";
import Motion from "@/components/Motion";
import StoryBar from "@/components/StoryBar";
import VideoPlayer from "@/components/VideoPlayer";
import { Arrow, Eyebrow } from "@/components/ui";
import { origin, psico, site, testimonialsSection } from "@/data/content";
import { historia, type StorySection } from "@/data/historia";
import { testimonials } from "@/data/testimonials";

export const metadata: Metadata = {
  title: historia.meta.title,
  description: historia.meta.description,
  alternates: { canonical: "/historia" },
  openGraph: {
    type: "article",
    locale: "es_ES",
    url: "/historia",
    siteName: site.name,
    title: historia.meta.title,
    description: historia.meta.description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Mario Lignarolo" }],
  },
};

/** `**frase**` → negrita: lo que se lee aunque solo se escanee. */
function rich(text: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
}

const plain = (t: string) => t.replace(/\*\*/g, "");
const allText = [
  historia.dek,
  ...historia.sections.flatMap((s) => [s.title ?? "", s.pull ?? "", ...s.paras]),
  historia.built.intro,
  ...historia.built.items.map((it) => it.text),
  ...historia.close.paras,
].map(plain);
const minutes = Math.max(1, Math.round(allText.join(" ").split(/\s+/).length / 200));

const wrap = "gutter mx-auto w-full max-w-[80rem]";
const prose =
  "space-y-5 text-[1.0625rem] leading-[1.72] text-charcoal/80 lg:text-[1.125rem] [&_strong]:font-semibold [&_strong]:text-charcoal";

function Media({ media, sizes }: { media: NonNullable<StorySection["media"]>; sizes: string }) {
  if (media.kind === "video") {
    return (
      <VideoPlayer
        src={psico.video.src}
        poster={psico.video.poster}
        duration={psico.video.duration}
        label={psico.video.label}
        className="aspect-video w-full"
      />
    );
  }
  if (media.kind === "diptych") {
    const d = origin.diptych;
    return (
      <figure className="grid grid-cols-2 gap-3 sm:gap-6">
        {[d.before, d.after].map((ph) => (
          <div key={ph.label}>
            <div className="relative aspect-[4/5] overflow-hidden bg-charcoal/10">
              <Image src={ph.src} alt={ph.alt} fill sizes="(min-width: 1024px) 38vw, 50vw" className="object-cover" />
            </div>
            <span className="caps mt-3 block text-charcoal/60">{ph.label}</span>
          </div>
        ))}
        <figcaption className="display col-span-2 mt-1 text-[clamp(1.4rem,1.1rem+1.2vw,2.2rem)] leading-[1.08] italic">
          {d.caption}
        </figcaption>
      </figure>
    );
  }
  return (
    <div className="relative overflow-hidden bg-charcoal/10" style={{ aspectRatio: media.ratio }}>
      <Image src={media.src} alt={media.alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

function Section({ s, flip }: { s: StorySection; flip: boolean }) {
  const heading = s.title && (
    <h2 className="display mb-7 text-[clamp(2.2rem,1.5rem+2.4vw,3.6rem)] leading-[1] text-charcoal">{s.title}</h2>
  );
  const body = <div className={prose}>{s.paras.map((p, i) => <p key={i}>{rich(p)}</p>)}</div>;

  if (s.layout === "side" && s.media) {
    return (
      <section id={s.id} className={`${wrap} grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:items-start lg:gap-x-6`}>
        <div data-reveal="up" className={`lg:sticky lg:top-10 lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
          <Media media={s.media} sizes="(min-width: 1024px) 40vw, 100vw" />
        </div>
        <div data-reveal="up" className={`lg:col-span-6 ${flip ? "lg:order-1" : "lg:col-start-7"} lg:pt-2`}>
          {heading}
          {body}
        </div>
      </section>
    );
  }

  return (
    <section id={s.id} className={`${wrap} grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-6`}>
      <div data-reveal="up" className="lg:col-span-7">
        {heading}
        {body}
      </div>
      {s.pull && (
        <p
          data-reveal="up"
          className="display border-l border-charcoal/25 pl-6 text-[clamp(1.8rem,1.3rem+1.8vw,2.9rem)] leading-[1.04] italic lg:col-span-4 lg:col-start-9 lg:self-center"
        >
          {s.pull}
        </p>
      )}
      {s.media && (
        <div data-reveal="up" className="mt-2 lg:col-span-12">
          <Media media={s.media} sizes="(min-width: 1280px) 76rem, 100vw" />
        </div>
      )}
    </section>
  );
}

/**
 * /historia — La carta de Mario en primera persona: cómo se perdió, cómo
 * volvió y lo que construyó. Formato de «carta del fundador»: titular
 * personal, firma y tiempo de lectura, texto con negritas para escanear,
 * fotos que alternan de lado, lo que construyó y una barra fija con el
 * siguiente paso. Todo el texto vive en data/historia.ts.
 */
export default function Historia() {
  let side = 0;
  return (
    <>
      <header className="bg-ink text-bone">
        <div className="gutter flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link href="/" className="display text-[1.35rem] leading-none" aria-label={`${site.name} — inicio`}>
            Mario Lignarolo<span className="text-acid">.</span>
          </Link>
          <Link href="/" className="caps link-line text-bone/80 transition-colors hover:text-acid">
            Volver al inicio
          </Link>
        </div>
      </header>

      <main id="contenido" className="bg-paper pb-[clamp(4rem,8vw,7rem)] text-charcoal">
        <article>
          <header data-story-top className={`${wrap} pt-[clamp(3.5rem,8vw,7rem)] pb-[clamp(3rem,6vw,5rem)]`}>
            <Eyebrow className="mb-8 text-charcoal/70">{historia.eyebrow}</Eyebrow>
            <h1 className="display max-w-[64rem] text-[clamp(3rem,1.4rem+6.4vw,7.5rem)] leading-[0.9]">
              {historia.title.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
              <span className="mt-2 block text-[0.62em] leading-[1] italic text-charcoal/75">{historia.titleItalic}</span>
            </h1>
            <p className="mt-10 max-w-[46rem] text-[1.1875rem] leading-[1.6] text-charcoal/80 lg:text-[1.3125rem] [&_strong]:font-semibold [&_strong]:text-charcoal">
              {rich(historia.dek)}
            </p>
            <div className="caps mt-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-y border-charcoal/15 py-4 text-charcoal/60">
              <span>
                Por <span className="text-charcoal">{historia.byline}</span> · {historia.bylineRole}
              </span>
              <span>{minutes} min de lectura</span>
            </div>
          </header>

          <div className="space-y-[clamp(4.5rem,9vw,8rem)]">
            {historia.sections.map((s) => {
              const flip = s.layout === "side" && side++ % 2 === 1;
              return <Section key={s.id} s={s} flip={flip} />;
            })}
          </div>
        </article>

        {/* Lo que construyó: los cuatro caminos, del más directo al más amplio. */}
        <section
          id="construi"
          data-bar-hide
          className="mt-[clamp(5rem,10vw,9rem)] bg-ink py-[clamp(4.5rem,9vw,8rem)] text-bone"
        >
          <div className={wrap}>
            <h2 data-reveal="up" className="display text-[clamp(2.6rem,1.6rem+3.6vw,5rem)] leading-[0.95]">
              {historia.built.title}
            </h2>
            <p
              data-reveal="up"
              className="mt-6 max-w-[40rem] text-[1.125rem] leading-[1.65] text-bone/75 [&_strong]:font-semibold [&_strong]:text-bone"
            >
              {rich(historia.built.intro)}
            </p>
            <ul className="mt-[clamp(2.5rem,5vw,4rem)] grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
              {historia.built.items.map((it, i) => (
                <li
                  key={it.name}
                  data-reveal="up"
                  style={{ "--delay": `${(i % 2) * 0.08}s` } as CSSProperties}
                  className="flex flex-col border-t border-bone/15 pt-6"
                >
                  <span className="caps text-acid">{it.kicker}</span>
                  <h3 className="display mt-3 text-[clamp(2.2rem,1.7rem+1.6vw,3.2rem)] leading-none">{it.name}</h3>
                  <p className="mt-4 max-w-[30rem] flex-1 text-[1.0625rem] leading-relaxed text-bone/75">{it.text}</p>
                  <a
                    href={it.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="caps link-line mt-6 inline-flex w-fit items-center gap-2 text-bone transition-colors hover:text-acid"
                  >
                    {it.cta} <Arrow diagonal />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Prueba: solo testimonios reales (data/testimonials.ts). Vacío = no aparece. */}
        {testimonials.length > 0 && (
          <section className={`${wrap} mt-[clamp(4.5rem,9vw,8rem)]`}>
            <Eyebrow className="mb-8 text-charcoal/70">{testimonialsSection.eyebrow}</Eyebrow>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {testimonials.map((t) => (
                <figure key={t.quote} data-reveal="up" className="border-l-2 border-acid bg-cream px-6 py-5">
                  <blockquote className="display text-[clamp(1.4rem,1.2rem+0.8vw,1.9rem)] leading-[1.15]">«{t.quote}»</blockquote>
                  <figcaption className="caps mt-4 text-charcoal/60">
                    {t.name}
                    {t.context ? ` · ${t.context}` : ""}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* La firma. */}
        <section data-bar-hide className={`${wrap} mt-[clamp(4.5rem,9vw,8rem)] grid grid-cols-1 lg:grid-cols-12 lg:gap-x-6`}>
          <div data-reveal="up" className={`${prose} lg:col-span-7`}>
            {historia.close.paras.map((p, i) => (
              <p key={i}>{rich(p)}</p>
            ))}
            <p className="display mt-10 text-[clamp(2.4rem,1.8rem+2vw,3.6rem)] leading-none italic text-charcoal">
              {historia.close.signature}
            </p>
            <p className="caps mt-3 text-charcoal/60">{historia.bylineRole}</p>
          </div>
        </section>
      </main>

      <div data-bar-hide>
        <Footer />
      </div>
      <StoryBar />
      <Motion />
    </>
  );
}
