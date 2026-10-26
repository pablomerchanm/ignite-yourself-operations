import { v3 } from "@/data/v3";
import Logo from "../Logo";
import { Arrow, ArrowUp, ext } from "./ui";
import s from "../v4.module.css";

/**
 * Pie, al modo de Monolog: el menú grande con filetes; las redes y los
 * mundos de Mario en dos columnas con su etiqueta en mono; la firma de
 * Mario a todo el ancho (el único momento en que el logo es grande) y una
 * barra final con el año y «Volver arriba». Los enlaces son los del spec.
 */
export default function Footer() {
  const { nav, footer } = v3;
  // footer.links: primero las tres redes, después los tres mundos (data/v3.ts)
  const cols = [
    { label: "(Redes)", links: footer.links.slice(0, 3) },
    { label: "(Mundos)", links: footer.links.slice(3) },
  ];
  return (
    <footer className={`${s.wrap} ${s.dark} ${s.footer}`}>
      <nav aria-label="Pie" className={s.footMenu}>
        <ul>
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href}>{n.label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={s.footCols}>
        {cols.map((c) => (
          <div key={c.label} className={s.footCol}>
            <p className={s.dato}>{c.label}</p>
            <ul>
              {c.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} {...ext}>
                    {l.label} <Arrow />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Logo className={s.footerLogo} />
      <div className={s.footBar}>
        <p className={s.dato}>© {new Date().getFullYear()} Mario Lignarolo</p>
        <a href="#mario" className={s.dato}>
          Volver arriba <ArrowUp />
        </a>
      </div>
    </footer>
  );
}
