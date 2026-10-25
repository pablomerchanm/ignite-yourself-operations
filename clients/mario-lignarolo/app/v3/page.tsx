import type { Metadata } from "next";
import Image from "next/image";
import type { CSSProperties } from "react";
import Motion from "@/components/Motion";
import { site } from "@/data/content";
import { v3 } from "@/data/v3";
import Video from "./Video";
import s from "./v3.module.css";

/**
 * /v3 — iteración de la home según marca/BRIEF-MASTER-v1.md.
 * Oculta: sin enlaces desde la web, fuera del sitemap y `noindex`.
 * Secuencia: 01 Mario → 02 La tesis → 03 La historia por percepción
 * → 04 El trabajo (Lignarolo · Hipertrofia del Ser · Psicocibernética)
 * → 05 Para seguir. Contenido en data/v3.ts; estilos en v3.module.css.
 */
export const metadata: Metadata = {
  title: v3.meta.title,
  description: v3.meta.description,
  robots: { index: false, follow: false },
};

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M1 8h13M9 3l5 5-5 5" />
    </svg>
  );
}

/** Titular que entra línea a línea (usa el revelado global de <Motion/>). */
function Lines({ lines, className, as: Tag = "p" }: { lines: React.ReactNode[]; className: string; as?: "h1" | "h2" | "p" }) {
  return (
    <Tag className={className} data-reveal="lines">
      {lines.map((l, i) => (
        <span key={i} className="line" style={{ "--i": i } as CSSProperties}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

export default function V3() {
  const { hero, thesis, story, work, deeper, footer } = v3;
  const { lignarolo, hipertrofia, psico } = work;

  return (
    <div className={s.page}>
      {site.draft && <p className={s.notice}>{v3.notice}</p>}

      {/* 01 · MARIO */}
      <header className={s.hero} id="mario">
        <nav className={s.nav} aria-label="Principal">
          <a href="#mario" className={s.wordmark}>
            Mario Lignarolo
          </a>
          <ul className={s.navList}>
            {v3.nav.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={s.heroPhoto}>
          <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="100vw" />
        </div>
        <div className={`${s.wrap} ${s.heroBody}`}>
          {/* La cabecera: una línea en escritorio, dos en móvil. */}
          <h1 className={s.mark}>
            <span>{hero.name[0]}</span> <span>{hero.name[1]}</span>
          </h1>
          <p className={`${s.label} ${s.heroTerritory}`}>{hero.territory}</p>
          <p className={`${s.serif} ${s.heroLine}`}>{hero.line}</p>
        </div>
      </header>

      <main>
        {/* 02 · LA TESIS */}
        <section className={`${s.wrap} ${s.thesis}`} aria-labelledby="tesis">
          <Lines as="h2" className={`${s.statement} ${s.thesisLine1}`} lines={[thesis.line1]} />
          <p className={`${s.statement} ${s.thesisLine2}`} id="tesis" data-reveal="up">
            {thesis.line2.before} <span className={s.accent}>{thesis.line2.accent}</span> {thesis.line2.after}
          </p>
          <p className={`${s.body} ${s.thesisNote}`} data-reveal="up">
            {thesis.note}
          </p>
          <ol className={s.model}>
            {thesis.model.map((m, i) => (
              <li key={m.n} className={s.modelItem} style={{ "--k": m.k, "--delay": `${i * 0.08}s` } as CSSProperties} data-reveal="up">
                <p className={s.label}>{m.n}</p>
                <h3 className={s.modelName}>{m.name}</h3>
                <p className={s.modelText}>{m.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 03 · LA HISTORIA POR PERCEPCIÓN */}
        <section className={`${s.wrap} ${s.story}`} aria-labelledby="historia">
          <Lines as="h2" className={`${s.statement} ${s.storyHead}`} lines={[story.headline]} />
          <span id="historia" />
          <div className={s.beats}>
            {story.beats.map((b, i) => (
              <div key={b.word} className={`${s.grid} ${s.beat} ${s[`beat${i + 1}`]}`}>
                {b.kind === "image" && (
                  <figure
                    className={`${s.photo} ${s.beatPhoto} ${i === 1 ? s.beatPhotoWide : ""}`}
                    style={{ margin: 0 }}
                    data-reveal="up"
                  >
                    <Image
                      src={b.image.src}
                      alt={b.image.alt}
                      fill
                      sizes="(min-width: 880px) 50vw, 100vw"
                      style={{ objectPosition: b.image.position }}
                    />
                  </figure>
                )}
                <div className={s.beatCopy} data-reveal="up" style={{ "--delay": "0.12s" } as CSSProperties}>
                  <h3 className={`${s.statement} ${s.beatWord}`}>{b.word}</h3>
                  <div className={s.beatText}>
                    {b.quote && (
                      <blockquote className={s.quote}>
                        <span>«{b.quote}»</span>
                        <cite className={s.by}>Mario Lignarolo</cite>
                      </blockquote>
                    )}
                    <p className={s.caption}>{b.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className={`${s.serif} ${s.storyClose}`} data-reveal="up">
            {story.close}
          </p>
        </section>

        {/* 04 · EL TRABAJO */}
        <section className={s.work} aria-label={work.label}>
          <p className={`${s.wrap} ${s.label}`}>{work.label}</p>

          {/* Lignarolo: la foto y el producto mandan */}
          <article id="lignarolo" className={`${s.wrap} ${s.lg}`}>
            <figure className={`${s.photo} ${s.lgPhoto}`} style={{ margin: 0 }} data-reveal="up">
              <Image src={lignarolo.image.src} alt={lignarolo.image.alt} fill sizes="100vw" />
            </figure>
            <div className={`${s.grid} ${s.lgRow}`}>
              <h3 className={`${s.statement} ${s.lgName}`}>{lignarolo.name}</h3>
              <div className={s.lgMeta}>
                {lignarolo.meta.map((m) => (
                  <span key={m} className={s.label}>
                    {m}
                  </span>
                ))}
              </div>
              <div className={s.lgCopy} data-reveal="up">
                <p className={s.body}>{lignarolo.text}</p>
                <a href={lignarolo.href} className={s.link} {...ext}>
                  {lignarolo.cta} <Arrow />
                </a>
              </div>
              {site.draft && (
                <div className={s.lgPending} aria-label="Fotos pendientes">
                  {lignarolo.pending.map((p) => (
                    <div key={p} className={s.pending}>
                      Foto pendiente · {p}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </article>

          {/* Hipertrofia del Ser: una publicación */}
          <article id="hipertrofia" className={`${s.wrap} ${s.pub}`}>
            <div className={`${s.grid} ${s.pubHead}`}>
              <div data-reveal="up">
                <p className={s.label}>{hipertrofia.label}</p>
                <h3 className={s.pubName}>{hipertrofia.name}</h3>
              </div>
              <div className={s.pubIntro} data-reveal="up" style={{ "--delay": "0.1s" } as CSSProperties}>
                <p className={s.body}>{hipertrofia.line}</p>
                <p className={s.caption}>{hipertrofia.metaphor}</p>
              </div>
            </div>
            <div className={`${s.grid} ${s.pubGrid}`}>
              <a href={hipertrofia.lead.href} className={s.lead} {...ext} data-reveal="up">
                <p className={s.label}>{hipertrofia.lead.category}</p>
                <h4 className={s.leadTitle}>{hipertrofia.lead.title}</h4>
                <p className={`${s.caption} ${s.leadDek}`}>{hipertrofia.lead.dek}</p>
                <span className={s.date}>{hipertrofia.lead.date}</span>
              </a>
              <ul className={s.posts}>
                {hipertrofia.more.map((p, i) => (
                  <li key={p.href}>
                    <a href={p.href} className={s.postRow} {...ext} data-reveal="up" style={{ "--delay": `${0.1 + i * 0.08}s` } as CSSProperties}>
                      <p className={s.label}>{p.category}</p>
                      <h4 className={s.postTitle}>{p.title}</h4>
                      <p className={`${s.caption} ${s.postDek}`}>{p.dek}</p>
                      <span className={s.date}>{p.date}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.pubLinks}>
              <a href={hipertrofia.href} className={s.link} {...ext}>
                {hipertrofia.cta} <Arrow />
              </a>
              <a href={hipertrofia.subscribe.href} className={s.link} {...ext}>
                {hipertrofia.subscribe.label} <Arrow />
              </a>
            </div>
          </article>

          {/* Psicocibernética: atmósfera y video */}
          <article id="psicocibernetica" className={`${s.dark} ${s.psico}`}>
            <div className={`${s.wrap} ${s.grid} ${s.psicoGrid}`}>
              <Video
                src={psico.video.src}
                poster={psico.video.poster}
                duration={psico.video.duration}
                label={psico.video.label}
                className={`${s.photo} ${s.psicoVideo}`}
                buttonClassName={s.playBtn}
              />
              <div className={s.psicoCopy} data-reveal="up">
                <p className={s.label}>{psico.label}</p>
                <h3 className={`${s.statement} ${s.psicoName}`}>{psico.name}</h3>
                <p className={s.body}>{psico.line}</p>
                <p className={s.psicoOrigin}>{psico.origin}</p>
                <blockquote className={s.quote}>
                  <span>«{psico.quote}»</span>
                  <cite className={s.by}>Mario Lignarolo</cite>
                </blockquote>
                <a href={psico.href} className={s.link} {...ext}>
                  {psico.cta} <Arrow />
                </a>
                <p className={s.psicoNote}>{psico.note}</p>
              </div>
            </div>
          </article>
        </section>

        {/* 05 · PARA SEGUIR */}
        <section id="contacto" className={`${s.wrap} ${s.deeper}`} aria-labelledby="seguir">
          <p className={s.label} id="seguir">
            {deeper.label}
          </p>
          <ul className={s.paths}>
            {deeper.paths.map((p, i) => (
              <li key={p.verb} className={`${s.grid} ${s.path}`} data-reveal="up" style={{ "--delay": `${i * 0.06}s` } as CSSProperties}>
                <span className={`${s.statement} ${s.pathVerb}`}>{p.verb}</span>
                <span className={s.pathWhat}>{p.what}</span>
                <span className={s.pathLinks}>
                  {p.links.map((l) => (
                    <a key={l.href} href={l.href} className={s.link} {...ext}>
                      {l.label} <Arrow />
                    </a>
                  ))}
                </span>
              </li>
            ))}
          </ul>

          <div className={`${s.grid} ${s.bioRow}`} data-reveal="up">
            <p className={`${s.body} ${s.bio}`}>{deeper.bio}</p>
            <div className={s.contact}>
              <a href={deeper.contact.href} className={s.link} {...ext}>
                {deeper.contact.cta} <Arrow />
              </a>
              {site.draft && <span className={s.contactPending}>{deeper.contact.pending}</span>}
            </div>
          </div>

          <blockquote className={`${s.serif} ${s.closing}`} data-reveal="up" style={{ margin: undefined }}>
            «{deeper.closing.quote}»<cite className={s.by}>{deeper.closing.by}</cite>
          </blockquote>

          <footer className={s.footer}>
            <span className={s.wordmark}>Mario Lignarolo</span>
            <ul className={s.footerLinks}>
              {footer.links.map((c) => (
                <li key={c.href}>
                  <a href={c.href} {...ext}>
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className={s.legal}>© {new Date().getFullYear()} Mario Lignarolo</p>
          </footer>
        </section>
      </main>
      <Motion />
    </div>
  );
}
