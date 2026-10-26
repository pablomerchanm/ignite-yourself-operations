"use client";

import { useEffect } from "react";

/**
 * Motor de scrollytelling de /v3 (método del estudio: skill «scrollytelling»).
 * Vanilla, sin dependencias, un solo bucle rAF. Dos piezas:
 *
 *  1. [data-scrub="0.7"]  Las palabras (.sw) se encienden cuando cruzan la
 *     línea de lectura (fracción del alto de pantalla). Sin pin: el texto
 *     avanza con el scroll natural. Si el grupo tiene párrafos [data-seg] y
 *     una barra de progreso ([data-fill], [data-cur], [data-prev], [data-next]),
 *     la línea se llena, el contador marca el párrafo y las flechas saltan.
 *
 *  2. [data-pin="3"]  La escena se fija (solo en escritorio) durante N
 *     pantallas; los pasos [data-step] se encienden de uno en uno y, al final,
 *     aparece [data-after]. Misma barra de progreso.
 *
 * Con prefers-reduced-motion, o sin JavaScript, todo queda visible y quieto:
 * los estados apagados solo existen bajo html.v3-motion.
 */
type Word = { el: HTMLElement; key: number; o: number };
type Nav = { fill: HTMLElement | null; cur: HTMLElement | null; prev: HTMLElement | null; next: HTMLElement | null };
type Group = { el: HTMLElement; line: number; words: Word[]; segs: HTMLElement[]; segTops: number[]; first: number; last: number; nav: Nav };
type Pin = { el: HTMLElement; factor: number; steps: HTMLElement[]; after: HTMLElement | null; nav: Nav; idx: number };

const DIM = 0.16;
const RAMP = 110; // px de scroll que tarda una palabra en encenderse
const PHASE = 0.8; // parte del pin dedicada a los pasos; el resto, al cierre
const pad = (n: number) => String(n).padStart(2, "0");
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const navOf = (root: HTMLElement): Nav => ({
  fill: root.querySelector("[data-fill]"),
  cur: root.querySelector("[data-cur]"),
  prev: root.querySelector("[data-prev]"),
  next: root.querySelector("[data-next]"),
});

export default function Scrolly() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const html = document.documentElement;
    html.classList.add("v3-motion");
    const desktop = window.matchMedia("(min-width: 881px)");
    let vh = window.innerHeight;
    let raf = 0;
    let dirty = true;

    const groups: Group[] = Array.from(document.querySelectorAll<HTMLElement>("[data-scrub]")).map((el) => ({
      el,
      line: parseFloat(el.dataset.scrub || "0.7") || 0.7,
      words: Array.from(el.querySelectorAll<HTMLElement>(".sw")).map((w) => ({ el: w, key: 0, o: -1 })),
      segs: Array.from(el.querySelectorAll<HTMLElement>("[data-seg]")),
      segTops: [],
      first: 0,
      last: 1,
      nav: navOf(el),
    }));
    const pins: Pin[] = Array.from(document.querySelectorAll<HTMLElement>("[data-pin]")).map((el) => ({
      el,
      factor: parseFloat(el.dataset.pin || "3") || 3,
      steps: Array.from(el.querySelectorAll<HTMLElement>("[data-step]")),
      after: el.querySelector("[data-after]"),
      nav: navOf(el),
      idx: -1,
    }));

    /* Medidas: la clave de cada palabra es su altura en la página más su
       posición en la línea, así una línea se enciende de izquierda a derecha. */
    const measure = () => {
      vh = window.innerHeight;
      const sy = window.scrollY;
      for (const p of pins) {
        if (desktop.matches) {
          p.el.style.height = `${p.factor * vh}px`;
          p.el.dataset.pinned = "1";
        } else {
          p.el.style.height = "";
          delete p.el.dataset.pinned;
          p.steps.forEach((s) => (s.style.opacity = ""));
          if (p.after) p.after.style.opacity = "";
        }
      }
      for (const g of groups) {
        for (const w of g.words) {
          const r = w.el.getBoundingClientRect();
          const box = (w.el.parentElement as HTMLElement).getBoundingClientRect();
          const frac = box.width ? (r.left - box.left) / box.width : 0;
          w.key = r.top + sy + frac * r.height;
        }
        g.segTops = g.segs.map((s) => s.getBoundingClientRect().top + sy);
        g.first = g.words.length ? g.words[0].key : 0;
        g.last = g.words.length ? g.words[g.words.length - 1].key : 1;
      }
      dirty = true;
    };

    const pinProgress = (p: Pin) => {
      const r = p.el.getBoundingClientRect();
      const total = r.height - vh;
      return total > 0 ? clamp(-r.top / total, 0, 1) : 1;
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!dirty) return;
      dirty = false;
      const sy = window.scrollY;

      for (const g of groups) {
        const y = sy + vh * g.line;
        for (const w of g.words) {
          const o = Math.round(clamp(DIM + ((y - w.key) / RAMP) * (1 - DIM), DIM, 1) * 100) / 100;
          if (o !== w.o) {
            w.o = o;
            w.el.style.opacity = String(o);
          }
        }
        if (g.nav.fill) g.nav.fill.style.transform = `scaleX(${clamp((y - g.first) / (g.last - g.first || 1), 0, 1)})`;
        if (g.nav.cur) {
          let k = 0;
          g.segTops.forEach((t, i) => (y >= t ? (k = i) : 0));
          g.nav.cur.textContent = pad(k + 1);
        }
      }

      for (const p of pins) {
        if (!p.el.dataset.pinned) continue;
        const pr = pinProgress(p);
        const n = p.steps.length;
        const inSteps = pr < PHASE;
        const idx = inSteps ? Math.min(n - 1, Math.floor((pr / PHASE) * n)) : n - 1;
        p.steps.forEach((s, i) => (s.style.opacity = !inSteps || i === idx ? "1" : String(DIM)));
        if (p.after) {
          const a = clamp((pr - PHASE) / 0.12, 0, 1);
          p.after.style.opacity = String(a);
          p.after.style.transform = `translate3d(0, ${(1 - a) * 16}px, 0)`;
        }
        if (p.nav.fill) p.nav.fill.style.transform = `scaleX(${pr})`;
        if (p.nav.cur && idx !== p.idx) p.nav.cur.textContent = pad(idx + 1);
        p.idx = idx;
      }
    };

    /* Flechas: saltan al párrafo (o paso) anterior o siguiente. */
    const offs: Array<() => void> = [];
    const on = (el: HTMLElement | null, fn: () => void) => {
      if (!el) return;
      el.addEventListener("click", fn);
      offs.push(() => el.removeEventListener("click", fn));
    };
    for (const g of groups) {
      if (!g.segs.length) continue;
      const current = () => {
        const y = window.scrollY + vh * g.line;
        let k = 0;
        g.segTops.forEach((t, i) => (y >= t ? (k = i) : 0));
        return k;
      };
      const go = (k: number) => {
        const t = g.segTops[clamp(k, 0, g.segTops.length - 1)];
        window.scrollTo({ top: t - vh * g.line + 4, behavior: "smooth" });
      };
      on(g.nav.prev, () => go(current() - 1));
      on(g.nav.next, () => go(current() + 1));
    }
    for (const p of pins) {
      const go = (k: number) => {
        const n = p.steps.length;
        const target = ((clamp(k, 0, n - 1) + 0.5) / n) * PHASE;
        const top = p.el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top: top + target * (p.el.offsetHeight - vh), behavior: "smooth" });
      };
      on(p.nav.prev, () => go(Math.max(0, p.idx) - 1));
      on(p.nav.next, () => go(Math.max(0, p.idx) + 1));
    }

    const onScroll = () => (dirty = true);
    let t = 0;
    const onResize = () => {
      clearTimeout(t);
      t = window.setTimeout(measure, 120);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    desktop.addEventListener("change", measure);
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    measure();
    document.fonts?.ready.then(measure);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      desktop.removeEventListener("change", measure);
      ro.disconnect();
      offs.forEach((off) => off());
      html.classList.remove("v3-motion");
    };
  }, []);

  return null;
}
