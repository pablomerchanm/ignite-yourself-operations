"use client";

import type { FormEvent } from "react";
import { site } from "@/data/content";
import { v3 } from "@/data/v3";
import { Arrow, Tag } from "./ui";
import s from "../v3.module.css";

/**
 * 07 · CONTACTO, en una pantalla. A la izquierda, la etiqueta y a quién va
 * dirigido (el golpe en condensada); a la derecha, el formulario con los
 * campos pedidos. Sin destino todavía: el envío no sale de la página y se
 * marca como pendiente en borrador.
 */
export default function Contacto() {
  const { contacto: c } = v3;

  // [PENDIENTE] destino del formulario: por ahora no envía nada.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <section className={`${s.wrap} ${s.grid} ${s.screen} ${s.contact}`} id="contacto" aria-labelledby="contact-h">
      <div className={s.contactFor}>
        <Tag as="h2" label={c.label} id="contact-h" />
        <div data-reveal="up">
          <p className={s.contactLead}>{c.lead}</p>
          <ul className={`${s.statement} ${s.golpe} ${s.contactPaths}`}>
            {c.paths.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>

      <form className={s.form} onSubmit={onSubmit} data-reveal="up" noValidate>
        <div className={s.formRow}>
          <div className={s.field}>
            <label className={s.small} htmlFor="c-name">
              {c.form.name}
            </label>
            <input id="c-name" name="name" type="text" autoComplete="name" />
          </div>
          <div className={s.field}>
            <label className={s.small} htmlFor="c-email">
              {c.form.email}
            </label>
            <input id="c-email" name="email" type="email" autoComplete="email" />
          </div>
        </div>
        <div className={s.field}>
          <label className={s.small} htmlFor="c-reason">
            {c.form.reason}
          </label>
          <select id="c-reason" name="reason" defaultValue="">
            <option value="" disabled>
              —
            </option>
            {c.form.reasons.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
        <div className={s.field}>
          <label className={s.small} htmlFor="c-message">
            {c.form.message}
          </label>
          <textarea id="c-message" name="message" rows={4} />
        </div>
        <div className={s.formFoot}>
          <button type="submit" className={`${s.link} ${s.submit}`}>
            {c.form.submit} <Arrow />
          </button>
          {site.draft && <span className={s.pendingNote}>{c.pending}</span>}
        </div>
      </form>
    </section>
  );
}
