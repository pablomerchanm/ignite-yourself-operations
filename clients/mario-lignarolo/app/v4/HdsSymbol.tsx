import type { CSSProperties } from "react";

/**
 * Símbolo de Hipertrofia del Ser (propuesta del estudio, 26 oct 2026):
 * anillos de crecimiento. Un núcleo macizo —el ser— y anillos tangentes en
 * la base, cada uno φ veces el anterior: crecer desde dentro, con raíz.
 * Destila en blanco y negro el círculo que Mario ya usa en Substack.
 * Originales en marca/hipertrofia/.
 *
 *  display  cinco piezas, trazo fino que no escala (filete de 1,25 px a
 *           cualquier tamaño): para la cabecera de la sección.
 *  small    cuatro piezas, trazo grueso: legible a 16–48 px.
 *
 * `grow`: los anillos crecen desde la base con el scroll ([data-progress],
 * Scrolly.tsx). Sin JS o con movimiento reducido, el símbolo entero.
 */
const PHI = (1 + Math.sqrt(5)) / 2;
const BASE = 98;
const OUTER = 47.5;

export default function HdsSymbol({
  variant = "display",
  grow = false,
  className,
}: {
  variant?: "display" | "small";
  grow?: boolean;
  className?: string;
}) {
  const n = variant === "display" ? 5 : 4;
  const stroke = variant === "display" ? 1.25 : 3.4;
  const radii = Array.from({ length: n }, (_, i) => OUTER / PHI ** (n - 1 - i));
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      data-progress={grow ? "0.72" : undefined}
    >
      {radii.map((r, i) => {
        const style = { "--d": i * 0.15 } as CSSProperties;
        if (i === 0) return <circle key={i} cx={50} cy={BASE - r} r={r} fill="currentColor" style={style} />;
        // en «small» el trazo va por dentro del radio, para que el contorno exterior mida lo mismo
        const rr = variant === "display" ? r : r - stroke / 2;
        return (
          <circle
            key={i}
            cx={50}
            cy={BASE - r}
            r={rr}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            vectorEffect={variant === "display" ? "non-scaling-stroke" : undefined}
            style={style}
          />
        );
      })}
    </svg>
  );
}
