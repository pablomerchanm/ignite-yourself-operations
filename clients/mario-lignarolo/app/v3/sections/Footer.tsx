import { v3 } from "@/data/v3";
import { ext } from "./ui";
import s from "../v3.module.css";

/** Pie: el nombre, seis enlaces y el año. Nada más. */
export default function Footer() {
  return (
    <footer className={`${s.wrap} ${s.footer}`}>
      <span className={s.wordmark}>Mario Lignarolo</span>
      <ul className={s.footerLinks}>
        {v3.footer.links.map((l) => (
          <li key={l.href}>
            <a href={l.href} {...ext}>
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <p className={s.legal}>© {new Date().getFullYear()} Mario Lignarolo</p>
    </footer>
  );
}
