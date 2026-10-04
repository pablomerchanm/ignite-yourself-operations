import { channels, site } from "@/data/content";
import { SmartLink } from "./ui";

/** Pie mínimo. */
export default function Footer() {
  return (
    <footer className="gutter bg-ink pb-10 text-bone">
      <div className="flex flex-col gap-6 border-t border-bone/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="caps text-fog">
          {site.name} <span className="text-acid">·</span> © {new Date().getFullYear()}
        </p>
        <ul className="caps flex flex-wrap gap-x-6 gap-y-2 text-bone/75">
          {Object.values(channels).map((c) => (
            <li key={c.label}>
              <SmartLink href={c.href} className="link-line transition-colors hover:text-acid">
                {c.label}
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
