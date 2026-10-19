"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { timeline } from "@/data/content";
import { Arrow, Eyebrow } from "./ui";

type Point = [number, number];

/** Curva suave (Catmull-Rom → Bézier) que pasa por todos los puntos. */
function smoothPath(p: Point[]) {
  const r = (v: number) => Math.round(v * 10) / 10;
  let d = `M${r(p[0][0])},${r(p[0][1])}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1: Point = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Point = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${r(c1[0])},${r(c1[1])} ${r(c2[0])},${r(c2[1])} ${r(p2[0])},${r(p2[1])}`;
  }
  return d;
}

/**
 * 06a — El recorrido: su historia como una curva que baja hasta el fondo y
 * sube hasta hoy. En escritorio la sección se fija y la curva se dibuja con
 * el scroll; en móvil (o con movimiento reducido) se recorre deslizando.
 * Sin JS, la curva y los textos se ven completos.
 */
export default function Timeline() {
  const outer = useRef<HTMLElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const clip = useRef<SVGRectElement>(null);

  const steps = timeline.steps;
  const n = steps.length;
  // viewBox 1000 × 100: x en el centro de cada estación, y según lo hondo que estaba.
  const pts: Point[] = steps.map((s, i) => [((i + 0.5) / n) * 1000, 10 + s.depth * 80]);
  const d = smoothPath(pts);

  useEffect(() => {
    const o = outer.current;
    const sc = scroller.current;
    const t = track.current;
    const inn = inner.current;
    const rect = clip.current;
    if (!o || !sc || !t || !inn || !rect) return;
    const items = Array.from(inn.querySelectorAll<HTMLElement>("[data-step]"));
    const pin = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let raf = 0;

    // f: hasta dónde llega la curva (0–1), medido en el ancho de las estaciones.
    const draw = (f: number) => {
      const k = Math.max(0, Math.min(1, f));
      rect.setAttribute("width", String(k * 1000));
      items.forEach((el, i) => el.toggleAttribute("data-off", (i + 0.5) / n > k + 0.02));
    };
    const update = () => {
      raf = 0;
      if (pin.matches) {
        const dist = t.scrollWidth - window.innerWidth;
        const run = o.offsetHeight - window.innerHeight;
        const p = run > 0 ? Math.min(1, Math.max(0, -o.getBoundingClientRect().top / run)) : 0;
        // el punto de lectura avanza del centro hacia la derecha, para que al final se encienda «Hoy»
        const look = window.innerWidth * (0.5 + 0.42 * p);
        t.style.transform = `translate3d(${-p * dist}px,0,0)`;
        draw((p * dist + look - inn.offsetLeft) / inn.offsetWidth);
      } else {
        t.style.transform = "";
        draw((sc.scrollLeft + sc.clientWidth * 0.62 - inn.offsetLeft) / inn.offsetWidth);
      }
    };
    const size = () => {
      // La pista avanza más rápido que el scroll (0.55): unas dos pantallas en total.
      o.style.height = pin.matches ? `${window.innerHeight + (t.scrollWidth - window.innerWidth) * 0.55}px` : "";
      update();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    size();
    window.addEventListener("scroll", onScroll, { passive: true });
    sc.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", size);
    pin.addEventListener("change", size);
    return () => {
      window.removeEventListener("scroll", onScroll);
      sc.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", size);
      pin.removeEventListener("change", size);
      cancelAnimationFrame(raf);
    };
  }, [n]);

  return (
    <section id="recorrido" ref={outer} className="tl glow glow--dark grain" style={{ "--n": n } as CSSProperties} aria-labelledby="recorrido-title">
      <div className="tl__sticky">
        <div className="gutter flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div>
            <Eyebrow className="text-fog">{timeline.label}</Eyebrow>
            <h2 id="recorrido-title" className="title mt-3 text-[clamp(2.2rem,1.4rem+2.8vw,4rem)]">
              {timeline.title.before} <b>{timeline.title.strong}</b>
            </h2>
          </div>
          <p className="tl__hint caps text-fog" aria-hidden="true">
            {timeline.hint} →
          </p>
          <Link href={timeline.cta.href} className="btn btn--glass hidden lg:inline-flex">
            {timeline.cta.label} <Arrow />
          </Link>
        </div>

        <div ref={scroller} className="tl__scroller">
          <div ref={track} className="tl__track">
            <div ref={inner} className="tl__inner">
              <svg className="tl__svg" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <clipPath id="tl-drawn">
                    <rect ref={clip} x="0" y="-20" width="1000" height="140" />
                  </clipPath>
                </defs>
                <path d={d} className="tl__base" />
                <path d={d} className="tl__line" clipPath="url(#tl-drawn)" />
              </svg>

              <ol className="tl__steps">
                {steps.map((s, i) => (
                  <li
                    key={s.title}
                    data-step
                    className={`tl__step${i === n - 1 ? " is-now" : ""}${s.depth === 1 ? " is-low" : ""}`}
                    style={{ "--y": 0.1 + s.depth * 0.8 } as CSSProperties}
                  >
                    <span className="tl__dot" aria-hidden="true" />
                    <div className="tl__text">
                      <p className="caps tl__when">{s.when}</p>
                      <h3 className="display tl__title">{s.title}</h3>
                      <p className="display tl__quote">«{s.quote}»</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <div className="gutter mt-6 lg:hidden">
          <Link href={timeline.cta.href} className="btn btn--glass">
            {timeline.cta.label} <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
