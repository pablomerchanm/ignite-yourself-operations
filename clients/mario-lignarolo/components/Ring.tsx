import { hero } from "@/data/content";

/**
 * El anillo: los cuatro territorios de su marca (Cuerpo · Mente · Identidad ·
 * Expansión) sobre un círculo, con un punto que lo recorre despacio. Gráfico
 * de marca, sin datos: los mismos cuatro términos del header aprobado.
 * (La clase es `territories`: `ring` es una utilidad de Tailwind.)
 */
export default function Ring({ className = "" }: { className?: string }) {
  const r = 140;
  const cx = 260;
  const cy = 200;
  // arriba-derecha, abajo-derecha, abajo-izquierda, arriba-izquierda
  const angles = [-45, 45, 135, 225];
  const pts = angles.map((a) => {
    const rad = (a * Math.PI) / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad), a };
  });
  return (
    <svg
      viewBox="0 0 520 400"
      className={`territories ${className}`}
      role="img"
      aria-label={hero.territories.map((t) => t.word).join(" · ")}
    >
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={r - 22} fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="2 6" />
      <g className="territories__orbit">
        <circle cx={cx + r} cy={cy} r="4" fill="var(--color-accent)" />
      </g>
      {pts.map((p, i) => {
        const t = hero.territories[i];
        const right = p.a === -45 || p.a === 45;
        return (
          <g key={t.word}>
            <circle cx={p.x} cy={p.y} r="6" fill="var(--color-accent)" />
            <text
              x={p.x + (right ? 16 : -16)}
              y={p.y + 4}
              textAnchor={right ? "start" : "end"}
              fontSize="13"
              letterSpacing="2.2"
              fontWeight="500"
              fill="currentColor"
              fontStyle={t.italic ? "italic" : undefined}
            >
              {t.word.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
