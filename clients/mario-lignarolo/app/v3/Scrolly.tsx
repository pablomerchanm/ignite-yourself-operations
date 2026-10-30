"use client";

import { useEffect } from "react";

/**
 * Motor de scrollytelling de /v3 (método del estudio: skill «scrollytelling»).
 * Vanilla, sin dependencias, un solo bucle rAF. Tres piezas:
 *
 *  1. [data-scrub="0.7"]  Las palabras (.sw) se encienden cuando cruzan la
 *     línea de lectura (fracción del alto de pantalla). Sin pin: el texto
 *     avanza con el scroll natural.
 *
 *  2. [data-pin="3"]  La escena se fija (solo en escritorio) durante N
 *     pantallas; los pasos [data-step] se encienden de uno en uno y, al final,
 *     aparece [data-after]. Si la escena fija contiene un [data-scrub]
 *     (Origen), no hay pasos: el avance del pin enciende sus palabras, línea
 *     a línea, sin que el texto se mueva.
 *
 *  3. [data-parallax], [data-zoom] y [data-progress]: desplazamiento de
 *     fotos y una variable --p (0 → 1) para lo que el CSS quiera animar.
 *
 * Con prefers-reduced-motion, o sin JavaScript, todo queda visible y quieto:
 * los estados apagados solo existen bajo html.v3-motion.
 */
type Word = { el: HTMLElement; key: number; rel: number; o: number };
type Pin = { el: HTMLElement; factor: number; steps: HTMLElement[]; after: HTMLElement | null };
/* key: posición en la página (lectura con el scroll); rel, firstRel y
   lastRel: posiciones dentro del grupo (escena fija). */
type Group = { el: HTMLElement; line: number; words: Word[]; firstRel: number; lastRel: number; pin: Pin | null };

const DIM = 0.16;
const RAMP = 110; // px de scroll que tarda una palabra en encenderse
const PHASE = 0.8; // parte del pin dedicada a los pasos; el resto, al cierre
const SCRUB_END = 0.92; // parte del pin que enciende un texto fijo; el resto, quieto y encendido
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export default function Scrolly() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const html = document.documentElement;
    html.classList.add("v3-motion");
    const desktop = window.matchMedia("(min-width: 881px)");
    let vh = window.innerHeight;
    let raf = 0;
    let dirty = true;

    const pins: Pin[] = Array.from(document.querySelectorAll<HTMLElement>("[data-pin]")).map((el) => ({
      el,
      factor: parseFloat(el.dataset.pin || "3") || 3,
      steps: Array.from(el.querySelectorAll<HTMLElement>("[data-step]")),
      after: el.querySelector("[data-after]"),
    }));

    const groups: Group[] = Array.from(document.querySelectorAll<HTMLElement>("[data-scrub]")).map((el) => ({
      el,
      line: parseFloat(el.dataset.scrub || "0.7") || 0.7,
      words: Array.from(el.querySelectorAll<HTMLElement>(".sw")).map((w) => ({ el: w, key: 0, rel: 0, o: -1 })),
      firstRel: 0,
      lastRel: 1,
      pin: pins.find((p) => p.el.contains(el)) || null,
    }));
    /* Paralaje (solo escritorio): [data-parallax="0.2"] se desplaza esa
       fracción del scroll mientras su sección está en pantalla. */
    const plx = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]")).map((el) => ({
      el,
      f: parseFloat(el.dataset.parallax || "0") || 0,
      // [data-zoom="0.07"]: se acerca de 1,07 a 1 mientras cruza la pantalla
      z: parseFloat(el.dataset.zoom || "0") || 0,
      root: (el.closest("header, section") as HTMLElement) || el,
    }));
    /* Progreso (todas las pantallas): [data-progress="0.7"] recibe --p, de 0
       cuando su borde superior asoma por abajo a 1 tras recorrer esa fracción
       de pantalla. Qué hacer con --p lo decide el CSS (el emblema de
       Hipertrofia del Ser, que sale del bloque). */
    const prog = Array.from(document.querySelectorAll<HTMLElement | SVGElement>("[data-progress]")).map((el) => ({
      el,
      span: parseFloat(el.dataset.progress || "0.7") || 0.7,
      p: -1,
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
        const top = g.el.getBoundingClientRect().top;
        for (const w of g.words) {
          const r = w.el.getBoundingClientRect();
          const box = (w.el.parentElement as HTMLElement).getBoundingClientRect();
          const frac = box.width ? (r.left - box.left) / box.width : 0;
          w.rel = r.top - top + frac * r.height;
          w.key = w.rel + top + sy;
        }
        g.firstRel = g.words.length ? g.words[0].rel : 0;
        g.lastRel = g.words.length ? g.words[g.words.length - 1].rel : 1;
      }
      dirty = true;
    };

    const pinProgress = (p: Pin) => {
      const r = p.el.getBoundingClientRect();
      const total = r.height - vh;
      return total > 0 ? clamp(-r.top / total, 0, 1) : 1;
    };
    const pinnedScrub = (g: Group) => !!g.pin?.el.dataset.pinned;
    /* Línea de lectura de un grupo: en la página si el texto corre con el
       scroll; dentro del grupo si la escena está fija, donde el avance del
       pin la lleva de la primera palabra a la última. */
    const readingLine = (g: Group) => {
      if (!pinnedScrub(g)) return window.scrollY + vh * g.line;
      const t = clamp(pinProgress(g.pin as Pin) / SCRUB_END, 0, 1);
      return g.firstRel + t * (g.lastRel - g.firstRel + RAMP);
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!dirty) return;
      dirty = false;

      for (const p of plx) {
        if (!desktop.matches) {
          if (p.el.style.transform) p.el.style.transform = "";
          continue;
        }
        const r = p.root.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) continue;
        const pass = clamp((vh - r.top) / (vh + r.height), 0, 1);
        const zoom = p.z ? ` scale(${(1 + p.z * (1 - pass)).toFixed(4)})` : "";
        p.el.style.transform = `translate3d(0, ${(-r.top * p.f).toFixed(1)}px, 0)${zoom}`;
      }

      for (const g of prog) {
        const r = g.el.getBoundingClientRect();
        const p = Math.round(clamp((vh - r.top) / (vh * g.span), 0, 1) * 1000) / 1000;
        if (p !== g.p) {
          g.p = p;
          g.el.style.setProperty("--p", String(p));
        }
      }

      for (const g of groups) {
        const rel = pinnedScrub(g);
        const y = readingLine(g);
        for (const w of g.words) {
          const o = Math.round(clamp(DIM + ((y - (rel ? w.rel : w.key)) / RAMP) * (1 - DIM), DIM, 1) * 100) / 100;
          if (o !== w.o) {
            w.o = o;
            w.el.style.opacity = String(o);
          }
        }
      }

      for (const p of pins) {
        // una escena fija sin pasos solo sostiene su texto (ver readingLine)
        if (!p.el.dataset.pinned || !p.steps.length) continue;
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
      }
    };

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
      html.classList.remove("v3-motion");
    };
  }, []);

  return null;
}
