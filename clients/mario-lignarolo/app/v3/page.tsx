import type { Metadata } from "next";
import Image from "next/image";
import { channels, site } from "@/data/content";
import { v3 } from "@/data/v3";
import s from "./v3.module.css";

/**
 * /v3 — iteración de narrativa y diseño («el perfil de revista»).
 * Oculta: no se enlaza desde la web, no entra al sitemap y no se indexa.
 * Contenido en data/v3.ts; estilos aislados en v3.module.css.
 */
export const metadata: Metadata = {
  title: v3.meta.title,
  description: v3.meta.description,
  robots: { index: false, follow: false },
};

const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className={s.arrow}>
      <path d="M1 8h13M9 3l5 5-5 5" />
    </svg>
  );
}

/** [CONFIRMAR] con Mario: visible solo mientras el sitio está en borrador. */
function Tbc({ note }: { note?: string }) {
  if (!site.draft) return null;
  return (
    <span className={s.tbc} title="Pendiente de confirmar con Mario">
      por confirmar{note ? ` · ${note}` : ""}
    </span>
  );
}

export default function V3() {
  const { hero, profile, words, work, method, story, writing, door, footer } = v3;
  const substack = channels.substack.href.replace(/\/$/, "");

  return (
    <div className={s.page}>
      {site.draft && <p className={s.notice}>{v3.notice}</p>}

      <header className={`${s.wrap} ${s.masthead}`}>
        <a href="#portada" className={s.brand}>
          Mario Lignarolo
        </a>
        <nav aria-label="Secciones">
          <ul className={s.nav}>
            {v3.nav.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <a href={v3.navCta.href} className={`${s.btn} ${s.btnLine} ${s.mastCta}`}>
          {v3.navCta.label}
        </a>
      </header>

      <main>
        {/* 1 · Portada */}
        <section id="portada" className={`${s.wrap} ${s.hero}`}>
          <div className={s.heroText}>
            <p className={s.kicker}>{hero.roles}</p>
            <h1 className={s.heroName}>
              {hero.name.map((w) => (
                <span key={w}>{w}</span>
              ))}
            </h1>
            <p className={s.heroDeck}>{hero.deck}</p>
            <p className={s.heroStand}>{hero.standfirst}</p>
            <div className={s.heroActions}>
              <a href={hero.primary.href} className={`${s.btn} ${s.btnSolid}`}>
                {hero.primary.label}
              </a>
              <a href={hero.secondary.href} className={`${s.btn} ${s.btnLine}`}>
                {hero.secondary.label}
              </a>
            </div>
          </div>
          <figure className={`${s.photo} ${s.heroPhoto}`} style={{ margin: 0 }}>
            <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="(min-width: 880px) 40vw, 100vw" />
          </figure>
        </section>

        {/* 2 · Perfil */}
        <section className={s.section} aria-labelledby="perfil">
          <div className={`${s.wrap} ${s.profile}`}>
            <p className={s.kicker} id="perfil">
              {profile.kicker}
            </p>
            <div className={s.profileBody}>
              <p className={s.lead}>{profile.lead}</p>
              {profile.paras.map((p) => (
                <p key={p.text} className={s.body}>
                  {p.text}
                  {p.tbc && <Tbc />}
                </p>
              ))}
              <p className={s.question}>{profile.question}</p>
            </div>
          </div>
        </section>

        {/* 3 · En sus palabras */}
        <section className={s.section} aria-label={words.kicker}>
          <figure className={`${s.wrap} ${s.words}`}>
            <p className={s.kicker}>{words.kicker}</p>
            <blockquote className={s.wordsQuote}>
              {words.quote}»
              <cite className={s.quoteBy}>— {words.by}</cite>
            </blockquote>
          </figure>
        </section>

        {/* 4 · Obra */}
        <section id="obra" className={s.section} aria-labelledby="obra-t">
          <div className={s.wrap}>
            <div className={s.headRow}>
              <div>
                <p className={s.kicker}>{work.kicker}</p>
                <h2 className={s.h2} id="obra-t">
                  {work.title}
                </h2>
              </div>
              <p className={s.headIntro}>{work.intro}</p>
            </div>

            <ul className={s.workList}>
              {work.items.map((it) => (
                <li key={it.name} className={s.workItem}>
                  <div className={s.workName}>
                    <p className={`${s.kicker} ${s.workRole}`}>{it.role}</p>
                    <h3 className={s.workTitle}>{it.name}</h3>
                  </div>
                  <div className={s.workText}>
                    <p>
                      {it.text}
                      {it.tbcNote && <Tbc note={it.tbcNote} />}
                    </p>
                    <a href={it.href} className={s.link} {...ext}>
                      {it.cta}
                      <Arrow />
                    </a>
                  </div>
                  {it.image && (
                    <figure
                      className={`${s.photo} ${s.workPhoto} ${it.name === "Lignarolo" ? s.workPhotoWide : ""}`}
                      style={{ margin: 0 }}
                    >
                      <Image src={it.image.src} alt={it.image.alt} fill sizes="(min-width: 880px) 22vw, 90vw" />
                    </figure>
                  )}
                </li>
              ))}
            </ul>

            <div className={s.asides}>
              {[work.mentoring, work.invite].map((a) => (
                <div key={a.label} className={s.aside}>
                  <p className={s.kicker}>{a.label}</p>
                  <p className={s.asideText}>
                    {a.text}
                    {a.tbcNote && <Tbc note={a.tbcNote} />}
                  </p>
                  <a href={a.href} className={s.link} {...ext}>
                    {a.cta}
                    <Arrow />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5 · Método */}
        <section id="metodo" className={`${s.section} ${s.method}`} aria-labelledby="metodo-t">
          <div className={`${s.wrap} ${s.methodGrid}`}>
            <figure className={`${s.photo} ${s.methodPhoto}`} style={{ margin: 0 }}>
              <Image src={method.image.src} alt={method.image.alt} fill sizes="(min-width: 880px) 30vw, 90vw" />
            </figure>
            <div className={s.methodBody}>
              <p className={s.kicker}>{method.kicker}</p>
              <h2 className={s.h2} id="metodo-t">
                {method.title}
              </h2>
              <p className={s.methodDeck}>{method.deck}</p>
              <p className={s.body}>{method.text}</p>
              <ul className={s.planes}>
                {method.planes.map((p) => (
                  <li key={p.name} className={s.plane}>
                    <h3 className={s.planeName}>{p.name}</h3>
                    <p>{p.text}</p>
                  </li>
                ))}
              </ul>
              <blockquote className={s.methodQuote}>
                «{method.quote}»<cite className={s.quoteBy}>— Mario Lignarolo</cite>
              </blockquote>
            </div>
          </div>
        </section>

        {/* 6 · Historia */}
        <section id="historia" className={s.section} aria-labelledby="historia-t">
          <div className={s.wrap}>
            <div className={s.headRow}>
              <div>
                <p className={s.kicker}>{story.kicker}</p>
                <h2 className={s.h2} id="historia-t">
                  {story.title}
                </h2>
              </div>
            </div>
            <ol className={s.moments}>
              {story.moments.map((m) => (
                <li key={m.n} className={s.moment}>
                  <span className={s.momentN} aria-hidden="true">
                    {m.n}
                  </span>
                  <div className={s.momentMain}>
                    <h3 className={s.momentTitle}>{m.title}</h3>
                    <p>
                      {m.text}
                      {m.tbc && <Tbc />}
                    </p>
                  </div>
                  <blockquote className={s.momentQuote}>{m.quote}</blockquote>
                </li>
              ))}
            </ol>
            <div className={s.more}>
              <a href={story.more.href} className={s.link}>
                {story.more.label}
                <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* 7 · Escritos */}
        <section id="escritos" className={s.section} aria-labelledby="escritos-t">
          <div className={s.wrap}>
            <div className={s.headRow}>
              <div>
                <p className={s.kicker}>{writing.kicker}</p>
                <h2 className={s.h2} id="escritos-t">
                  {writing.title}
                </h2>
              </div>
            </div>
            <ul className={s.posts}>
              {writing.items.map((p) => (
                <li key={p.href} className={s.post}>
                  <a href={p.href} {...ext}>
                    <div>
                      <h3 className={s.postTitle}>
                        {p.title}
                        {p.note && <span className={s.postNote}>{p.note}</span>}
                      </h3>
                      <p className={s.postDek}>{p.dek}</p>
                    </div>
                    <span className={s.postGo}>
                      Leer
                      <Arrow />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className={s.more}>
              <a href={writing.all.href} className={s.link} {...ext}>
                {writing.all.label}
                <Arrow />
              </a>
            </div>
          </div>
        </section>

        {/* 8 · Puerta */}
        <section id="suscribirse" className={`${s.dark} ${s.door}`} aria-label={door.label}>
          <div className={s.wrap}>
            <blockquote style={{ margin: 0 }}>
              <p className={s.mantra}>
                {door.mantra.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </p>
              <cite className={s.quoteBy}>— {door.by}</cite>
            </blockquote>

            <form action={`${substack}/subscribe`} method="get" target="_blank" className={s.form}>
              <label htmlFor="v3-email" className={s.formLabel}>
                {door.label}
              </label>
              <div className={s.formFields}>
                <div className={s.fieldRow}>
                  <input
                    id="v3-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={door.placeholder}
                    className={s.input}
                  />
                  <button type="submit" className={`${s.btn} ${s.submit}`}>
                    {door.cta}
                  </button>
                </div>
                <p className={s.formNote}>{door.note}</p>
                <a href={door.secondary.href} className={`${s.link} ${s.secondary}`} {...ext}>
                  {door.secondary.label}
                  <Arrow />
                </a>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* 9 · Pie */}
      <footer className={s.dark}>
        <div className={`${s.wrap} ${s.footer}`}>
          <div className={s.footerTop}>
            <span className={s.footerName}>Mario Lignarolo</span>
            <ul className={s.footerLinks}>
              {footer.links.map((c) => (
                <li key={c.href}>
                  <a href={c.href} {...ext}>
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className={s.legal}>© {new Date().getFullYear()} Mario Lignarolo</p>
        </div>
      </footer>
    </div>
  );
}
