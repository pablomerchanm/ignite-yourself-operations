import { HDS_EMBLEM_PATH, HDS_EMBLEM_VIEWBOX } from "./hds-emblem-path";

/**
 * Emblema de Hipertrofia del Ser (propuesta 2, 30 oct 2026): una figura se
 * levanta del bloque que todavía la sujeta; la talla de Miguel Ángel,
 * crecer quitando. Una tinta (currentColor), con la anatomía en cortes.
 * Originales en marca/hipertrofia/v2/.
 *
 * `emerge`: con el scroll, la figura aparece de abajo arriba, del bloque a
 * la mano ([data-progress], Scrolly.tsx). Sin JS o con movimiento
 * reducido, el emblema entero.
 */
export default function HdsEmblem({ emerge = false, className }: { emerge?: boolean; className?: string }) {
  return (
    <svg className={className} viewBox={HDS_EMBLEM_VIEWBOX} aria-hidden="true" focusable="false" data-progress={emerge ? "0.72" : undefined}>
      <path fillRule="evenodd" fill="currentColor" d={HDS_EMBLEM_PATH} />
    </svg>
  );
}
