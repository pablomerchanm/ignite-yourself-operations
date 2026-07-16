# PROMPT — Iteración "Jorge Arce × Hanza" (pégalo completo en la nueva sesión)

---

## Tu misión

Construye una **nueva versión de la landing del Dr. Jorge Arce** aplicando el estilo gráfico del template de Framer **"Hanza"** (referencia: https://hanza-template.framer.website/ — si no puedes navegarlo, no importa: abajo tienes su ADN completo decodificado). Es un experimento A/B de dirección de arte: **misma información, mismas fotos, otro lente visual.**

- **NO toques** nada existente del repo (`clients/jorge-arce/index.html`, `v2/`, `lab/`). Crea la nueva versión en **`clients/jorge-arce/v3-hanza/index.html`**.
- Archivo autocontenido salvo las fotos (referéncialas como `../img/*.jpg`) y Google Fonts.
- Al terminar: verifica con navegador headless (desktop 1440 + móvil 390, capturas por sección), luego genera también una copia standalone con las fotos en base64 para revisión local del usuario.

## Las fotos (en `clients/jorge-arce/img/`)

| Archivo | Qué es | Luz |
|---|---|---|
| `quote.jpg` | Retrato frontal dramático, fondo oscuro, media cara iluminada | Oscura |
| `hero.jpg` | Retrato de perfil en estudio, fondo gris claro, elegante | Clara |
| `portrait.jpg` | (duplicado de hero.jpg) | Clara |
| `clinic.jpg` | Jorge sonriendo en su clínica, scrubs azules, A COLOR, vertical | Clara |
| `surgery.jpg` | Jorge operando con lupas quirúrgicas, cinematográfica | Oscura |
| `operating.jpg` | Jorge en cirugía, plano medio; el crop 82%/88% + zoom da un detalle de manos/instrumental | Oscura |
| `speaking.jpg` | Jorge dando conferencia ante público, vertical | Oscura |
| `footer.jpg` | (duplicado de quote.jpg — úsalo con otro crop/tratamiento) | Oscura |

Multiplica las fotos con **crops distintos** (object-position + scale) — un detalle recortado lee como foto nueva. Si necesitas más, usa láminas placeholder elegantes marcadas `[ PLATE — TO REPLACE ]`.

## ADN del template Hanza (decodificado en visita real — replícalo con fidelidad)

**Lienzo y color**
- Alterna bloques **greige claro** (~`#D6D4D0`) y **negro cálido** (~`#161412`). Secciones enteras de un tono, cortes duros entre ellas.
- **Acento: usa el azul de Jorge `#3B82F0`** en el rol que Hanza le da a su naranja (`#FF4C24`): cuadraditos ■ junto a labels, barra superior fina de las tarjetas, bloque-flecha de los botones, cuadraditos de progreso/rating. *(Si el usuario pide literalidad total, cambia a naranja — pregúntale solo si lo menciona.)*

**Tipografía (las tres están en Google Fonts)**
- **Zalando Sans** — display: titulares ENORMES, TODO EN MAYÚSCULAS, tracking apretado, con **punto final**: "CASE STUDIES." / "5 STEPS TO LAUNCH." Dos tonos por titular: primera línea gris media, resto en tinta plena.
- **Geist Mono** — todos los labels, botones, specs, formularios, timestamps: `■ 03 SERVICES`, `GET IN TOUCH /ARCE`, `PROFESSION`, `LOCAL TIME`.
- **Geist** — cuerpo de texto.

**Patrones de layout (los gestos que hacen "Hanza" a Hanza)**
1. **Hairlines verticales** dividiendo el viewport en columnas visibles, todo con **esquinas 0px** (nada redondeado; pills solo en 1-2 botones).
2. **Secciones numeradas en mono**: `■ 01 ABOUT`, `■ 02 EXPERTISE`… con el cuadradito de acento.
3. **Nombre gigante sangrado por el borde** del viewport (su "HANZA" se corta a la derecha → haz lo mismo con "ARCE").
4. **Tarjeta-perfil**: foto + barra CTA negra con texto mono y bloque-flecha de acento pegado + filas de especificación (`PROFESSION / ORAL & MAXILLOFACIAL SURGEON`, `LOCATION / SOUTH BAY, CA`).
5. **Stats gigantes**: `27+` años, `2007` fundación — número enorme + descripción pequeña, en celdas con hairline.
6. **Tarjetas de proceso numeradas** (01→05) con barra de acento arriba y cuadraditos de progreso.
7. **Trust bar**: cluster de avatares + rating `4.92/5` en cuadraditos + `TRUSTED BY…` en mono. *(Adáptalo honesto: sin cifras inventadas — p.ej. avatares + "REFERRED BY THE SURGEONS OTHER SURGEONS TRUST".)*
8. **Reloj/hora local** en el nav (`LOCAL TIME`), scarcity-line en contacto (adapta: `BY APPOINTMENT — SOUTH BAY, CA`, nada de "slots" inventados).
9. **Formulario oscuro** con labels mono + cuadraditos de acento y filas hairline.
10. **Footer negro** con display gigante "CREATE YOUR NEXT ~~WEBSITE~~ → adapta al CTA de Jorge".
11. Motion: reveals suaves al hacer scroll (fade + lift), nada de rebotes. `prefers-reduced-motion` → estático visible.

## Mapeo de secciones Hanza → Jorge

| Hanza | Jorge |
|---|---|
| Hero (nombre gigante cortado + servicios /01 /02 /03) | JORGE ARCE + `/01 DENTAL IMPLANTS /02 RECONSTRUCTION /03 COMPLEX CASES` |
| Tarjeta-perfil del designer | Tarjeta-perfil del cirujano (clinic.jpg o hero.jpg) |
| Stats (84+, 48+) | `27+ YEARS` · `EST. 2007` · `2 COUNTRIES` (Colombia→California) |
| Case studies | **The Path** (Colombia→California) + galería de láminas quirúrgicas |
| 5 Steps to Launch | **The patient journey** (5 pasos honestos: Consultation → Diagnosis & plan → Surgery → Recovery → Long-term maintenance) |
| Testimonials | Appreciation (los 8 de abajo) |
| Pricing | ❌ NO (es medicina, no paquetes) → reemplaza por **Free Patient Guide** con formulario |
| FAQ/Blog | For Patients (los 3 artículos) |
| Contact "CREATE YOUR NEXT WEBSITE WITH ME." | "FOR THE PATIENTS WHO WERE TOLD IT COULDN'T BE DONE." + form/CTA |

## El contenido (cópialo tal cual — está validado)

**Posicionamiento/tesis:** Jorge es *el cirujano al que otros cirujanos refieren* — autoridad de pares, no volumen. Colombia→California = criterio probado en dos sistemas médicos. Frase ancla: *the cases others step away from*.

**Identidad:** DR. JORGE ARCE — Oral & Maxillofacial Surgery. Oral surgeon · Implant specialist. South Bay, California (Redondo Beach · Torrance). Est. 2007. Tel (310) 327-4166, by appointment. Founder — Dental Implants Center of South Bay (2007). Board-certified in dental implantology. 27 years of practice, trained in Colombia, built in California.

**Manifiesto:** "A surgeon known for *the cases others step away from* — and the quiet, unhurried precision it takes to *give them back their lives.*"

**The Path (3 bloques):** ① Dr. Arce trained in Colombia, then devoted his career entirely to oral & maxillofacial surgery and dental implantology. ② He built his life's work in California — the procedures most surgeons refer out: complex extractions, reconstruction, full-arch cases. ③ One conviction: difficult work, done with care, gives people their lives back. In 2007 he founded the Dental Implants Center of South Bay on it.

**Expertise (6):** 01 Dental Implants — From single implants to full-arch All-On-X reconstruction, planned and placed with precision. · 02 Reconstruction — Rebuilding function and structure where bone and tissue have been lost. · 03 Complex Cases — The difficult extractions and surgeries other clinicians prefer to refer elsewhere. · 04 Implant Maintenance — Long-term care that protects the work of a restored smile. · 05 Pathology — Identifying and addressing conditions affecting teeth, gums, and bone. · 06 Second Opinions — Clarity and direction for patients facing complex decisions.

**About:** Jorge grew up in Colombia, the son of a family that valued precision and patience long before he ever held a scalpel. Medicine was not a career choice so much as a calling — a way to use his hands to give something back. / He moved to California to specialize, and never left. Over twenty-seven years he built a practice on a single, unglamorous principle: take the time the case actually needs. / Outside the operating room he is a father, a mentor to younger surgeons, and a quiet student of his craft — still reading, still refining, still treating every patient as the person they are before the procedure they need. — Jorge Arce, D.D.S.

**Testimonios (8; los marcados ★ son de médicos que refieren — dales protagonismo):**
1. Maria R. (Full-arch): "I had been told by two surgeons it was impossible. Dr. Arce took the time no one else did. I can eat, smile, and speak again."
2. ★ Dr. David Kim, D.D.S. (Referring): "When a case is beyond what I can handle, Jorge is the first call I make. My patients always come back grateful — and so do I."
3. Anabella C. (Family): "The most thorough and honest surgeon I have ever met. He treated my father like family."
4. Robert T. (Implants): "Calm, precise, and genuinely kind. He explained every step until I understood. The result speaks for itself."
5. ★ Dr. Lina Soto (Periodontist): "I refer my most complex cases to Dr. Arce without hesitation. Twenty-seven years shows."
6. Carlos S. (Bone graft): "I was terrified of the procedure. He never rushed me. Best decision I have made for my health."
7. ★ Dr. Jeff Malone (Referring): "Reliable, communicative, and surgically excellent. He sends my patients back with a full report every time."
8. Elena P. (TMJ): "Years of pain, gone. I only wish I had found him sooner. I recommend Dr. Arce to everyone I know."

**For Patients (3 artículos):** 01 All-On-X, explained simply (Implants) · 02 How to know if you need an implant (Before surgery) · 03 Five myths about oral surgery (Myths).

**Free Patient Guide:** "What to expect from your first implant consultation." — A plain-language walkthrough of the process / The questions worth asking any surgeon / How to know if you're a candidate. Form: Full name + Email + botón "Send me the guide". Fineprint: "By submitting, you agree to be contacted by Dental Implants Center of South Bay. Your information is never shared."

**Speaking:** "Sharing the craft with the profession." — Beyond the operating room, Dr. Arce lectures and mentors — training the next generation of surgeons and speaking on implantology and complex reconstruction. Topics: 01 Full-Arch Reconstruction · 02 Complex Extractions · 03 Judgment in Oral Surgery. "Available for conferences, study clubs & resident training → Request as speaker".

**Cierre:** "For the patients who were told it couldn't be done." + Request a consultation + Redondo Beach · Torrance, California · (310) 327-4166 — by appointment. Footer: © 2026 — Dr. Jorge Arce, D.D.S.

## Lo único innegociable

Claims médicos a nivel **verdadero-general**. PROHIBIDO inventar: credenciales, cifras de pacientes, tasas de éxito, instituciones/congresos con nombre, ratings numéricos, "slots disponibles". Los testimonios y artículos son contenido concepto ya aprobado — úsalo tal cual, no agregues más datos duros. Presentar como concept/prototype hasta validación con el cliente.

## Definición de "terminado"

1. `clients/jorge-arce/v3-hanza/index.html` funcionando (fotos vía `../img/`).
2. Verificado headless: capturas de CADA sección en desktop 1440 y móvil 390, cero errores de consola, `prefers-reduced-motion` OK.
3. Copia standalone (fotos base64) entregada al usuario para abrir con doble clic.
4. Commit + push + PR (sin tocar `index.html` raíz, `v2/` ni `lab/`).
