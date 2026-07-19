# REWORK-QUEUE — rework autónomo del catálogo completo

> Orden: de peor a mejor según mi juicio (construí y verifiqué todas).
> Las tres mejores van de últimas — son la vara de acabado.
> Doble objetivo por página: (A) nivel estudio, (B) template productivo
> (tokens + content.json + secciones opcionales + robustez de contenido).
> Ciclo por página: diagnóstico → principles/[NOMBRE].md → reconstrucción →
> team-ready → autocrítica → REWORK-LOG.md → siguiente.
>
> Infra compartida: `/vendor/` (gsap, ScrollTrigger, lenis) servido absoluto;
> fetch de content.json SIEMPRE con ruta absoluta `/vNN-slug/content.json`
> (cleanUrls de Vercel rompe rutas relativas en /vNN).

| # | Página | Estado | Por qué está aquí |
|---|--------|--------|-------------------|
| 1 | `v6-final` | ✅ | La única sin referente propio: fusión Hanza×Zentro que hereda decisiones ajenas — cero momento memorable propio, la más plantilla de todas. |
| 2 | `v2` | ✅ | La primera construida: editorial de capítulos correcta pero con el motion más primitivo del catálogo y ritmo de padding uniforme. |
| 3 | `v4-clearpath` | ✅ | Salvia tranquila que confunde calma con vacío: secciones centradas en cadena y jerarquía tipográfica corta. |
| 4 | `v7-noon` | ✅ | El anti-marketing se pasó de frenada: honesta pero sin un solo golpe visual; el minimalismo aquí es ausencia, no intención. |
| 5 | `v3-hanza` | ✅ | Paleta coral potente pero one-note: todas las secciones cantan igual de fuerte y el grano es el único recurso. |
| 6 | `v5-zentro` | ✅ | Póster tipográfico con marquee de gimmick: el display es el momento y lo repite hasta gastarlo; espaciado tosco. |
| 7 | `v8-luke` | ✅ | El nombre a 245px es su único momento; después es una lista con hover — la página más corta de ideas. |
| 8 | `v9-holistic` | ✅ | Réplica framer decente pero nunca recibió pase de motion; reveals genéricos y cero scrollytelling pese a referente animado. |
| 9 | `v10-mobius` | ✅ | Proporciones ya corregidas una vez, pero el ritmo vertical sigue plano y las cards son cajas iguales. |
| 10 | `v11-firma` | ✅ | El scroll horizontal es novedad frágil: degrada mal en mobile y el resto de la página vive a la sombra del truco. |
| 11 | `v13-bennett` | ✅ | Sólida de estructura, muerta de motion: composición correcta que nunca sorprende ni una vez. |
| 12 | `v14-gareis` | ✅ | Portfolio oscuro competente con secciones intercambiables entre sí — le falta un solo lugar donde el grid se rompa. |
| 13 | `v15-norris` | ✅ | Deportiva con energía en paleta pero no en composición; typography scale corta para lo que pide el género. |
| 14 | `v16-handx` | ✅ | Artesanal con buenos detalles pero ritmo constante; el momento del referente (proceso) quedó decorativo. |
| 15 | `v17-everswap` | ✅ | El grade cinematográfico perdona mucho, y esta página lo usa como muleta: quita las fotos y no queda sistema. |
| 16 | `v18-mindmarket` | ✅ | Ilustrada simpática; composición de bloques 1-columna repetidos, la ilustración merece layout más valiente. |
| 17 | `v19-cunliffe` | ✅ | El rail lateral fue arreglo, no diseño: convive incómodo con el contenido y el scroll no cuenta nada. |
| 18 | `v20-vast` | ✅ | Premium espacial con buen aire pero motion uniforme: todo hace fade-up al mismo tiempo con la misma curva. |
| 19 | `v21-getty` | ✅ | Narrativa museo bien escrita; visualmente estable hasta el punto de monotonía — pide un tramo pinneado. |
| 20 | `v12-caliora` | ✅ | La más lista para clínicas y por eso exige más: buena base, le falta el 10% de acabado que separa plantilla de estudio. |
| 21 | `v23-pacifica` | ✅ | Ya recibió profundidad (footage strip); aún hay padding clónico entre secciones medias y easing mezclado. |
| 22 | `v24-ilcapo` | ✅ | El showreel la elevó; el resto de secciones siguen centradas en serie y el motion no distingue jerarquías. |
| 23 | `v27-genesis` | ✅ | Chapter-grid arreglado tras el bug: funcional y con carácter, pero el scrollytelling del referente quedó en insinuación. |
| 24 | `v26-wolverine` | ✅ | Heritage timeline potente; los valores B/N piden un pin con progreso que hoy no existe. |
| 25 | `v22-sacred` | ✅ | Poética con mapa ilustrado — de las más personales; el case-map merece scrub real en vez de reveals sueltos. |
| 26 | `v25-gecko` | ✅ | 6 páginas generadas por script: la más productiva ya; el rework es sistematizar su motion y tokenizarla de verdad. |
| 27 | `v28-tuesday` | ✅ | Ronda 5 fiel y fresca; le falta solo disciplina de easing y robustez de contenido para ser productiva. |
| 28 | `v29-heritage` | ✅ | El wordmark hairline gigante es momento real; motion aún genérico para la elegancia que aparenta. |
| 29 | `v30-capri` | ✅ | Azul marino con script permite mucho; composición ya alterna bien, pide catálogo cerrado de reveals. |
| 30 | `v32-alora` | ✅ | Brumosa y consistente; robustez de contenido sin probar (titulares dobles la rompen hoy). |
| 31 | `v36-kimberly` | ✅ | Navy 200 sobria casi lista; su lead-quote pide tramo narrativo y sus tokens están a medio extraer. |
| 32 | `v33-valenna` | ✅ | "The Travel Edit" con split potente — a Pablo le fascinó el referente; conservar y pulir, no rehacer. |
| 33 | `v31-chronicle` | ✅ | El wordmark 250px con doble nav numerada es de las composiciones más finas del catálogo; solo motion quirúrgico. |
| 34 | `v35-astramaven` | ✅ VARA | Carmesí degradado con wordmark tras retrato: momento memorable claro, sistema casi completo — vara de acabado. |
| 35 | `v34-mesamaison` | ✅ VARA | La favorita declarada ("me fascina, sé muy fiel"): fonts exactas, ilustración adobe, footer monumental — vara de composición. |
| 36 | `v37-bakery` | ✅ VARA | "AMO EL ESTILO CHUNKY": ilustración SVG propia, ticker, menú punteado — la de más carácter; vara de personalidad. |

## Nota de alcance
`/base` y `/base-jorge` NO están en la cola: acaban de pasar por el ciclo
completo de rediseño (PR #39) y son la referencia interna de token-system.
El catálogo `/templates` tampoco: es el índice, no una plantilla.
