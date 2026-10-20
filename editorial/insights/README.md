# Insights — cómo publicar un artículo

`igniteyourself.co/insights` es la biblioteca editorial de Ignite: guías que responden
preguntas que nuestros compradores se hacen **antes** de contratar una plataforma
(irse a consultoría independiente, LinkedIn o web propia, qué necesita un perito…).
El objetivo es atraer lectores pertinentes y que, cuando descubran que necesitan una
presencia profesional propia, Ignite aparezca como una opción natural. El indicador
que importa son las **conversaciones comerciales cualificadas**, no las visitas.

## Dónde vive cada cosa

| Qué | Dónde |
|---|---|
| El texto de cada artículo (Markdown) | `editorial/insights/<slug>.md` |
| La portada de /insights (titular, categorías, bandas) | `editorial/insights/_index.md` |
| El generador | `tools/build-insights.py` (solo Python 3, sin instalar nada) |
| Las tarjetas para compartir (1200×630) | `tools/og-insights.mjs` (opcional, necesita Playwright) |
| Servidor local que imita a Vercel | `tools/serve-site.py` |
| Diseño (CSS) y comportamiento (JS) | `clients/jorge-arce/insights/assets/` |
| Lo que se publica (generado, no editar a mano) | `clients/jorge-arce/insights/` |

`editorial/` y `tools/` quedan fuera de lo que Vercel publica (la raíz del proyecto es
`clients/jorge-arce/`), así que los `.md` y sus notas no son públicos.

El generador, además de las páginas, mantiene al día **solo** lo que depende de la
lista de artículos, siempre entre marcadores `insights:…` y sin tocar lo demás:

- el bloque «Not ready to talk yet?» al final de la home (`igy-mobius/index.html`);
- `sitemap.xml`;
- `llms.txt` (el resumen para buscadores de IA).

## Publicar un artículo nuevo (5 pasos)

1. **Copia un artículo existente** en `editorial/insights/` y renómbralo con el slug
   nuevo: `mi-articulo-nuevo.md` (minúsculas, números y guiones). El slug es la URL
   permanente: `igniteyourself.co/insights/mi-articulo-nuevo`. **No lo cambies después
   de publicar.**
2. **Rellena la cabecera** (ver tabla abajo) y escribe el cuerpo en Markdown.
   Empieza con `draft: true` mientras lo revisas.
3. **Genera:** `python3 tools/build-insights.py`. Si algo falta o un enlace interno está
   roto, el script no escribe nada y te dice qué corregir.
4. **Revísalo en local:** `python3 tools/serve-site.py` → abre
   `http://127.0.0.1:4173/insights/mi-articulo-nuevo`. Un borrador se ve, pero no
   aparece en la portada, ni en el sitemap, ni en la home, y lleva `noindex`.
5. **Publica:** cambia a `draft: false`, pon la **fecha real de publicación** en `date`,
   genera otra vez, y (si tienes Playwright) crea su tarjeta con
   `node tools/og-insights.mjs` y vuelve a generar. Commit + PR. Al fusionar a `main`,
   Vercel lo publica.

Sin tarjeta propia, el artículo usa la tarjeta general de Insights al compartirse.

## La cabecera

```yaml
---
title: El titular visible (H1)
seo_title: El título para Google, con « | Ignite Yourself» al final (≤ 70 caracteres ideal)
description: La meta description: 140–160 caracteres, que refleje lo que de verdad dice el artículo
dek: (opcional) La entradilla bajo el titular; si no está, se usa description
slug: igual-que-el-nombre-del-archivo
category: Independent Consulting        # una de las de _index.md
author: Ignite Yourself                 # o el nombre de una persona real
author_type: Organization               # Person si firma una persona
author_role: Founder, Ignite Yourself   # (opcional, solo con Person)
date: 2026-10-20                        # AAAA-MM-DD, fecha REAL de publicación
updated: 2026-11-02                     # (opcional) si se corrige algo sustancial
featured: false                         # true = artículo destacado en la portada (solo uno)
draft: true                             # true = borrador (noindex, fuera de listados)
note: (opcional) Aviso bajo la firma, p. ej. «General information, not legal advice.»
cover_line: (opcional) Una frase del artículo para la tarjeta destacada
related:                                # 2 slugs de artículos relacionados
  - linkedin-vs-personal-website
  - expert-witness-website
references:                             # (opcional) fuentes citadas: «Título | URL»
  - Federal Rule of Evidence 702 (Cornell LII) | https://www.law.cornell.edu/rules/fre/rule_702
cta_lead: (opcional) Párrafo de Ignite antes de la invitación
cta_text: La invitación final, en una o dos frases, ligada al tema del artículo
---
```

El cierre de cada artículo es **contextual y discreto**: un recuadro con la invitación
de `cta_text`, un botón a la explicación de la oferta (`/#platform`) y un enlace al
contacto (`/#contact`). No se manda a todos los lectores a un formulario.

## Markdown que entiende el generador

```markdown
Párrafo normal con **negrita**, *cursiva* y [un enlace](/insights/otro-articulo).

## Un subtítulo (H2: aparece en el índice «In this article»)
### Un sub-subtítulo (H3)

- lista con viñetas
1. lista numerada
- [ ] lista de comprobación (casillas)

| Columna A | Columna B |
|---|---|
| celda | celda |

> Una cita destacada.

::: panel Etiqueta
## Un recuadro (ejercicio, checklist, autoevaluación)
Todo lo que va entre ::: y ::: queda dentro del recuadro.
:::
```

No pongas `# Título` en el cuerpo: el H1 sale de `title`. Los enlaces a otros artículos
van sin barra final (`/insights/slug`), igual que las URL reales del sitio.

## Antes de publicar (checklist)

- [ ] Un humano leyó el artículo entero: exactitud, voz y que no prometa resultados
      (ni clientes, ni posiciones en Google, ni menciones en ChatGPT/Claude/Perplexity).
- [ ] Nada inventado: ni datos, ni casos, ni testimonios. Ejemplos ilustrativos
      marcados como tales; nada que identifique a un prospecto sin su permiso.
- [ ] Fuentes verificadas y enlazadas cuando una afirmación depende de ellas
      (el generador lista los enlaces externos al terminar).
- [ ] Autor y fecha reales.
- [ ] `description` única y fiel al contenido; `seo_title` único.
- [ ] Dos `related` y al menos un enlace interno dentro del texto.
- [ ] La oferta que se menciona coincide con la home (Authority Platform).
- [ ] Revisado en el móvil.

## Después de publicar

1. **Avisar a los buscadores:** `python3 tools/indexnow.py /insights/<slug>` (Bing y
   compañía, que alimentan ChatGPT y Copilot) y, en **Search Console**, «Inspeccionar
   URL» → «Solicitar indexación». La configuración única (verificar el dominio, enviar
   el sitemap, Bing Webmaster Tools) está en `editorial/BUSCADORES.md`. Google no
   garantiza indexar ni posicionar nada; no lo prometas.
2. **Compartir** con UTM, p. ej.
   `…/insights/<slug>?utm_source=linkedin&utm_medium=organic&utm_campaign=authority_gap`.
3. **Medir** lo que importa: conversaciones cualificadas, propuestas y ventas, y
   preguntar a cada lead nuevo «¿cómo llegaste a Ignite?». Plantilla de registro en
   `growth/authority-content-sprint/MEASUREMENT_AND_QA.md` (PR #226).

## Lo que no hay que hacer

- Editar a mano los HTML de `clients/jorge-arce/insights/`: se sobrescriben al generar.
- Cambiar el slug de un artículo publicado (rompe enlaces y lo que Google ya indexó).
  Si fuera imprescindible, añade una redirección permanente en `vercel.json`.
- Publicar en tanda para «hacer volumen»: un artículo útil por semana es el ritmo previsto.
