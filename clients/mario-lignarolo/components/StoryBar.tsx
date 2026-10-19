"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { historia } from "@/data/historia";
import { Arrow } from "./ui";

/**
 * Barra fija abajo en /historia: el siguiente paso siempre a mano mientras se
 * lee. Aparece al dejar atrás la portada de la carta y se esconde donde la
 * página ya ofrece el paso (lo que construí, la firma, el pie).
 */
export default function StoryBar() {
  const [past, setPast] = useState(false);
  const [covered, setCovered] = useState(0);

  useEffect(() => {
    const top = document.querySelector("[data-story-top]");
    const hide = Array.from(document.querySelectorAll("[data-bar-hide]"));
    const seen = new Set<Element>();
    const ioTop = new IntersectionObserver(([e]) => setPast(!e.isIntersecting && e.boundingClientRect.top < 0));
    const ioHide = new IntersectionObserver((entries) => {
      for (const e of entries) (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target));
      setCovered(seen.size);
    });
    if (top) ioTop.observe(top);
    hide.forEach((el) => ioHide.observe(el));
    return () => {
      ioTop.disconnect();
      ioHide.disconnect();
    };
  }, []);

  const show = past && covered === 0;
  const { bar } = historia;

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-bone/10 bg-ink/95 text-bone backdrop-blur-sm transition-transform duration-500 ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="gutter flex items-center justify-between gap-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="flex min-w-0 items-center gap-3">
          <span className="relative hidden size-10 shrink-0 overflow-hidden rounded-full sm:block">
            <Image src="/mario/hero.jpg" alt="" fill sizes="40px" className="object-cover" />
          </span>
          <p className="min-w-0 leading-tight">
            <span className="display block text-[1.25rem]">{bar.name}</span>
            <span className="block truncate text-[0.8125rem] text-bone/65">
              <span className="sm:hidden">{bar.short}</span>
              <span className="hidden sm:inline">{bar.line}</span>
            </span>
          </p>
        </div>
        <a
          href={bar.href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={show ? 0 : -1}
          className="caps inline-flex shrink-0 items-center gap-2 bg-acid px-5 py-3 text-ink transition-opacity hover:opacity-85"
        >
          {bar.cta} <Arrow />
        </a>
      </div>
    </div>
  );
}
