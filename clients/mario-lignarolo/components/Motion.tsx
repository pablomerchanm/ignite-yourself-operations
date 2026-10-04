"use client";

import { useEffect } from "react";

/**
 * Revelado al hacer scroll, sin librerías: marca con `data-in` los
 * elementos `[data-reveal]` al entrar en pantalla. Sin JS (o con
 * movimiento reducido) todo el contenido queda visible.
 */
export default function Motion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    // Lo que ya está en pantalla se muestra sin parpadeo.
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) el.setAttribute("data-in", "");
    });
    document.documentElement.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    els.filter((el) => !el.hasAttribute("data-in")).forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
