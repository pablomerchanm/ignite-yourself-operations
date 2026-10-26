import Image from "next/image";
import type { CSSProperties } from "react";
import { v3 } from "@/data/v3";
import s from "../v3.module.css";

const SIZE = { poster: s.bannerPoster, display: s.bannerDisplay, serif: s.bannerSerif };

/**
 * BANNER — a sangre, foto de actitud atlética y una frase de Mario, al modo
 * de los banners de Nike («Outwork Everyone»): serif grande y nada más.
 *
 *  split   la frase, partida a ambos lados de la figura, a la altura de los
 *          ojos o del paso.
 *  corner  la frase en un bloque, en el claro de la foto.
 *
 * La geometría (at) se mide sobre la foto de escritorio: la foto se muestra
 * siempre a todo el ancho, así que esas posiciones caen sobre la figura en
 * cualquier pantalla apaisada. En móvil, foto vertical (4:5) y la frase
 * debajo, sobre el fundido. Movimiento: la foto se desplaza y se asienta al
 * pasar ([data-parallax] + [data-zoom]); cada parte sube desde su máscara.
 */
export default function Banner({ id }: { id: keyof typeof v3.banners }) {
  const b = v3.banners[id];
  const at = { "--x": `${b.at.x}%`, "--w": `${b.at.w}%`, "--y": `${b.at.y}%` } as CSSProperties;
  return (
    <section
      className={[s.banner, b.layout === "split" ? s.bannerSplit : s.bannerCorner, b.tone === "dark" ? s.bannerInk : ""].join(" ")}
    >
      <div className={s.bannerMedia} data-parallax="0.05" data-zoom="0.06">
        <Image className={s.bannerDesk} src={b.image.desktop} alt={b.image.alt} fill unoptimized sizes="100vw" />
        <Image className={s.bannerMob} src={b.image.mobile} alt={b.image.alt} fill unoptimized sizes="100vw" />
      </div>
      <p className={`${s.bannerPhrase} ${SIZE[b.size]}`} style={at} data-reveal="lines">
        {b.phrase.map((part, i) => (
          <span key={part} className="line">
            <span style={{ "--i": i * 3 } as CSSProperties}>{part} </span>
          </span>
        ))}
      </p>
    </section>
  );
}
