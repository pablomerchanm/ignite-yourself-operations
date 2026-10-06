"use client";

import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/data/content";

/**
 * Navegación mínima: transparente sobre la portada (la portada ya es la
 * marca), sólida después. En móvil, menú a pantalla completa.
 */
export default function Header() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const hero = document.getElementById("top");
    let raf = 0;
    const update = () => {
      raf = 0;
      const limit = hero ? hero.getBoundingClientRect().bottom : window.innerHeight;
      setSolid(limit <= 72);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      buttonRef.current?.focus();
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid && !open ? "bg-ink/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <div className="gutter flex h-[var(--nav-h)] items-center justify-between gap-6">
        <a
          href="#top"
          aria-label={`${site.name} — inicio`}
          className={`display text-[1.35rem] leading-none text-bone transition-opacity duration-500 ${
            solid || open ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          tabIndex={solid || open ? 0 : -1}
        >
          Mario Lignarolo<span className="text-acid">.</span>
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="caps link-line text-bone/80 transition-colors hover:text-acid">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="caps relative z-10 text-bone lg:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Cerrar" : "Menú"}
        </button>
      </div>

      <div
        id="menu-movil"
        className={`grain fixed inset-0 bg-ink transition-opacity duration-500 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <nav aria-label="Menú móvil" className="gutter flex h-full flex-col justify-center">
          <ul className="space-y-2">
            {nav.map((item, i) => (
              <li key={item.href}>
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="display block py-1 text-[clamp(2.6rem,9vw,4.5rem)] text-bone transition-colors hover:text-acid"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
