import { connect } from "@/data/content";
import { Arrow, Eyebrow, SmartLink } from "./ui";

/** 05 — La otra forma de empezar: escribirle «SER». Va justo después del programa. */
export default function Ser() {
  const { ser } = connect;
  return (
    <section aria-label={ser.eyebrow} className="gutter grain bg-ink py-[clamp(3.5rem,2.5rem+5vw,7rem)] text-bone">
      <div data-reveal="up" className="grid grid-cols-1 items-end gap-8 border-y border-bone/15 py-[clamp(2rem,4vw,3rem)] lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-4">
          <Eyebrow className="mb-6 text-fog">{ser.eyebrow}</Eyebrow>
          <p className="display text-[clamp(5rem,3rem+8vw,11rem)] leading-[0.8] text-acid">«{ser.keyword}»</p>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <p className="max-w-[36rem] text-[clamp(1.05rem,0.95rem+0.4vw,1.25rem)] leading-relaxed text-bone/85">{ser.text}</p>
          <SmartLink
            href={ser.href}
            className="caps mt-6 inline-flex items-center gap-3 bg-acid px-7 py-[1.1rem] font-medium text-ink transition-colors hover:bg-bone"
          >
            {ser.cta} <Arrow diagonal />
          </SmartLink>
        </div>
      </div>
    </section>
  );
}
