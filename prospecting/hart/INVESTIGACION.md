# James C. "Jamie" Hart, C.M.M.: Authority Platform, iteración 1

**Estado:** preview privado construido, **sin enviar**.

Pablo le escribió el 9 de octubre de 2026 ("Jamie, a thought about Hart Marine") y le hizo seguimiento el 26. Jamie respondió el 27 de octubre: *"Are you referring to a meta link?"*. Pablo le aclaró que es una página web privada y que le mandaría el link.

**Ruta:** `/hart`, con `/practice`, `/cases` y `/record`. Tiene `noindex` por cabecera en `clients/jorge-arce/vercel.json`.

**Motor:** el mismo de Rodriguez. `tools/build-hart.py` se copió de `build-rodriguez.py` y después se corre `tools/prerender-hart.mjs`. Todo el texto vive en `clients/jorge-arce/hart/content.json`.

## La tesis

Es el perito que **dirigió marinas municipales durante décadas y hoy explica en un juicio cómo debía llevarse una**.

Fue 25 años Supervisor of Marine Facilities de Fort Lauderdale, con una marina de megayates de 190 amarres. Después dirigió la marina de Lake Park y asesora a ciudades.

Desde 2016 trabaja como perito en casos de lesiones, muertes y defectos de diseño en marinas, para las dos partes.

El hero dice *"Marina operations and safety, from the dock office to the witness stand."*

## Fuentes

- **hartmarineconsulting.com:** una página de WordPress con bio, servicios, casos representativos y galería, revisada el 27 de octubre de 2026.
- **CV en PDF** (`Jamie-Hart-Curriculum-Vitae-1.pdf`, subido en abril de 2026, 5 páginas). Hay una copia en `clients/jorge-arce/hart/assets/Jamie-Hart-CV-2026.pdf`.
- **Association of Marina Industries:** aparece en el listado de Certified Marina Managers.
- **Su firma de correo:** 32751 Lakeshore Drive, Tavares, FL; móvil (561) 445-0509; jchart80@gmail.com.

## Cifras usadas (todas de su CV o de su web)

| Cifra | Fuente | Cómo se presenta |
|---|---|---|
| 40+ años en la industria de marinas | Web | Tal cual |
| 25 años, Fort Lauderdale, 1985–2010 | CV | Con el cargo |
| 190 amarres, 10 boyas, 3 rampas públicas | CV | Tal cual |
| Más de 11,25 millones de dólares en subvenciones | CV ("$11.25 Million Dollars +") | "per his CV" |
| Ingresos de ~150 mil a ~1,4 millones al año | CV | Solo en la página CV |
| Lake Park: 112 amarres; ingresos de ~450 mil a ~700 mil | CV | Solo en la página CV |
| Dania Beach: ~3,6 millones en subvenciones | CV | Solo en la página CV |
| CMM n.º 33, 1995 | CV | Tal cual |

## Casos representativos (los tres no confidenciales del CV)

1. **2025, Miami-Dade County, FL:** una caída en una marina de condominio, por una obstrucción. Para la defensa.
2. **2023, Cleveland, OH:** muerte en una marina. Lo contrató un bufete nacional para evaluar la construcción de muelles flotantes y el diseño de la marina.
3. **2025, San Francisco, CA:** un tablón de muelle deteriorado cedió y la persona cayó a través de él, con una lesión grave en la pierna. Para el demandante. Hizo la reconstrucción con fotos y video y la *witness disclosure* ante la Superior Court of California, County of Sacramento.

**Bufetes con los que ha trabajado (CV):** Fowler White Burnett; Wilson Elser Moskowitz Edelman & Dicker LLP; Berschler Associates, PC.

**Redes de peritos (CV):** Round Table Group (United Expert Holdings) y ForensesGroup, las dos desde 2025.

## Discrepancias (temas para la conversación, no para la página)

- **Año de la firma:** el logo dice "Est. 2008"; el CV pone Hart Marine Consulting, Inc. "2016 – Present" para el trabajo de perito y "Marine Consultant 2010 – Present" para los municipios. **No usamos año de fundación.**
- **Código postal:** su firma de correo dice "FL 3277"; el CV, 32778. Usamos el del CV.
- **AMI:** el CV dice "Member, Association of Marine Industries (2018 to present)". Lo más probable es que sea la Association of Marina Industries, donde figura como CMM. **Usamos "Association of Marina Industries"; hay que confirmarlo con él.**
- **Premio de 2010:** el CV lo cita como "Award of Excellence: Marine Industry Association of South Florida · Annual Leadership Award (2010)" y la web como "Award of Excellence, Marine Industries Association of South Florida". Usamos el de la web.
- **La cita:** "One of the Most Qualified Professionals in the Industry" es del fallecido Robert O. Cox, ex comisionado y alcalde de Fort Lauderdale, según la propia web de Jamie. Se atribuye así, sin fuente independiente.
- **Sin testimonios publicados:** no hay listado de testimonios con fechas y tribunales. La página de casos lo dice y propone completarlo.

## Fotos (provisionales, de su propia web)

- **Hero:** placa 3:4 en blanco y negro con su retrato en el muelle, de brazos cruzados (`assets/hero.jpg`).
- **Pantalla "The practice":** la marina de Las Olas al atardecer (`assets/las-olas-dusk.jpg`).
- **Pantalla "Fort Lauderdale":** vista aérea de la marina y el fondeadero de Las Olas (`assets/las-olas-aerial.jpg`).
- **Aperturas:**
  - Practice: los muelles flotantes del proyecto de Dania Beach (`assets/dania-docks.jpg`).
  - Cases: Las Olas al atardecer.
  - CV: la vista aérea de Dania Beach (`assets/dania-aerial.jpg`).
- **Logo:** Hart Marine Consulting, Inc. (`assets/hmc-logo.png`). También están sus iniciales en banderas de señales J-C-H (`assets/jch-flags.png`), de momento sin uso.
- **Resolución:** las fotos son de 1024 px, justas para pantalla completa. Cuando Pablo mande las suyas, se reemplazan. Para el retrato a sangre basta quitar `"plate"` del hero.

## Pendiente con él

- Confirmar el año de la firma (2008, 2010 o 2016).
- Confirmar la membresía de AMI.
- Conseguir un listado de testimonios con fechas y tribunales.
- Pedir permiso para la cita de Robert O. Cox y las fotos.
