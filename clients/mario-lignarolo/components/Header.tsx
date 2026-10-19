"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { nav, navCta, site } from "@/data/content";
import { Arrow } from "./ui";

/**
 * Navegación en píldora, flotante: el nombre, cinco destinos y «Empezar».
 * En móvil, menú a pantalla completa (claro).
 */
export default function Header() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

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
    <header>
      <div className="nav">
        <div className="nav__row">
          <Link href="/" aria-label={`${site.name} — inicio`} className="display text-[1.3rem] leading-none">
            Mario Lignarolo<span className="text-accent">.</span>
          </Link>

          <nav aria-label="Principal" className="nav__links hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <a href={navCta.href} target="_blank" rel="noopener noreferrer" className="btn btn--blue btn--sm">
              {navCta.label} <Arrow />
            </a>
            <button
              ref={buttonRef}
              type="button"
              className="flex size-10 items-center justify-center rounded-full lg:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 top-0 block h-px w-full bg-current transition-transform duration-300 ${open ? "translate-y-[5.5px] rotate-45" : ""}`}
                />
                <span
                  className={`absolute left-0 bottom-0 block h-px w-full bg-current transition-transform duration-300 ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div id="menu-movil" className="menu lg:hidden" data-open={open} aria-hidden={!open}>
        <nav aria-label="Menú móvil">
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href}>
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="title block py-1.5 text-[clamp(2.4rem,9vw,4rem)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={navCta.href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={open ? 0 : -1}
          className="btn btn--blue mt-10 w-fit"
        >
          {navCta.label} Psico-Cibernética <Arrow />
        </a>
      </div>
    </header>
  );
}
