# Hub — el «linktree sofisticado» de Ignite · ficha de producto

> **Estado: v0, para decidir.** Esto ordena lo que ya sabemos y propone; no
> está aprobado. Todo lo marcado **[DECIDIR]** es de Pablo. Los precios son
> propuesta. Última revisión: 21 de octubre de 2026.
>
> Cómo se produce uno: [README.md](README.md). La plantilla y las dos demos
> están en esta misma carpeta.

---

## 1. Qué es, en una línea

**La mini web del enlace de la bio**: una página con la marca de la persona,
una sola acción principal siempre a mano y cada tarjeta llevando a un solo
lugar. No es una lista de botones.

Es el **producto de entrada de Ignite**: barato, rápido de entregar, se paga
por suscripción y abre la conversación hacia lo grande.

## 2. El hueco que llena

| Hoy la persona tiene… | El problema |
|---|---|
| Linktree, Beacons, Komi… | Todos los perfiles se ven iguales; todo pesa lo mismo (no hay jerarquía); la marca de la plataforma al pie; nadie curó qué va y qué no. |
| Una web completa (Authority Platform desde USD 3.000; Authority Build USD 9.000) | Demasiado para empezar, y casi nunca es lo que se abre desde Instagram. |
| Nada (el enlace va directo a WhatsApp o a un checkout) | Se pierde todo lo que no es esa única cosa, y no se mide nada. |

En medio está lo que ya hicimos tres veces a mano, cada vez desde cero. Con la
plantilla, el próximo debería salir en horas, no en días.

## 3. Lo que ya está probado

| Hub | Estado | Qué dice de la demanda |
|---|---|---|
| **Perdón Práctico** (José Manuel Hernández) | En la bio de Instagram desde el 13 oct: `perdonpractico.co` abre el hub en el celular sin cambiar la URL. | Lleva a Dios sin Iglesia (la landing y el checkout de Whop, con UTM). Siete vueltas con Pablo: de ahí salen las reglas de curaduría. |
| **Mario Lignarolo** | Borrador (`noindex`), pendiente de su aprobación. | En la entrevista del 6 oct, al ver el borrador de la web y «el linktree de Ignite Yourself»: «todo me pareció muy bacano»; destacó la foto de los zapatos con los enlaces (`clients/mario-lignarolo/ENTREVISTA-2026-10-06.md` §13). |
| **Adriana Mejía Cuartas** | Publicado en adrianamejiacuartas.com/links. | El registro de autoridad: prensa con medio y año, afiliaciones, la noticia más reciente arriba. |

Rasgos que la plantilla ya trae de esos tres:

- **Acción principal siempre a mano:** barra inferior fija en el celular (PP).
- **Título a dos tonos con el remate en color** y el subtítulo en serif (PP, la línea bold de Whop).
- **Texto al lado de la persona, nunca encima** (PP).
- **DM que funciona dentro del navegador de Instagram:** `ig.me` cae en el login web; se cambia por el perfil (PP, bug del 13 oct).
- **UTM de la visita hasta el checkout:** la venta queda atribuida al hub (PP).
- **Medición de cada clic** (`page_view`, `cta_click`, `checkout_click`, `contact_click`, `social_click`, `video_play`) hacia GTM/GA4.
- **Dominio propio:** en el celular la raíz abre el hub; en el computador, la web (PP).
- **Tablero en escritorio y video con reproductor propio** (Mario).
- **Registro editorial:** prensa, afiliaciones, monograma (Adriana).

## 4. Contra quién compite y a qué precio

| | Modelo | Precio (verificado 21 oct 2026) |
|---|---|---|
| **Komi** (komi.io) | Plataforma para creadores: mini-site + brand deals + venta de productos digitales + captura de fans. | **Starter gratis** (mini-site, enlaces ilimitados, analítica). **Pro USD 20/mes o USD 16/mes anual**: 0 % de comisión en productos digitales, campañas de email, Meta Pixel, quitar la marca, dominio propio. |
| **Linktree** | Lista de enlaces self-serve. | Free, Starter, Pro y Premium. El precio depende de la región y no está publicado en su página de precios. Quitar su marca, solo en Premium. |

**Lo que ellos tienen y nosotros no (todavía):** editor self-serve, cobro
dentro de la página, captura de emails, tablero de analítica para el
cliente y, en Komi, el mercado de marcas.

**Lo que tenemos y ellos no:** diseño de estudio con la marca de la persona,
curaduría (qué va, qué no, cuál es la acción principal), copy cuidado con
sus palabras, y que el cliente no hace nada.

**Conclusión:** no competimos en precio con Linktree. Competimos con
«contratar a un diseñador y además pagar Linktree». Por eso el precio
puede ser 2–3× el de Komi Pro.

## 5. El modelo: suscripción gestionada

| Fase | Qué es | Qué hace falta |
|---|---|---|
| **1 · Hecho y mantenido por nosotros** (se puede vender ya) | Ignite diseña, publica y cambia. El cliente pide cambios por WhatsApp/DM y nosotros editamos `content.json` y publicamos. | Lo que hay en esta carpeta + cobro recurrente + un proyecto de hosting para todos los hubs. |
| **2 · Cambios sin nosotros** | Un formulario o un mensaje («cambia el botón a…») que edita `content.json`. | Un panel liviano o un flujo con Claude. |
| **3 · Self-serve** | Plataforma tipo Komi para el nicho. | Solo si el nicho lo justifica en volumen. |

### Planes — propuesta **[DECIDIR]**

| Plan | Qué incluye | Precio propuesto |
|---|---|---|
| **Hub** | Diseño a su marca sobre la plantilla, hasta 12 tarjetas, registro bold o editorial, dominio propio o `/links`, medición, DM e UTM, hosting, **2 cambios al mes** (respuesta en 48 h). | **USD 39/mes** o **USD 390/año** |
| **Hub Lanzamientos** | Todo lo anterior + **modo campaña** (inscripciones abiertas/cerradas, fechas, checkout con UTM), cambios ilimitados dentro del alcance, **informe mensual** de clics y ventas atribuidas. | **USD 99/mes** |
| **Puesta en marcha** | Brief, curaduría, tratamiento de fotos, dominio. Una vez. | **USD 290**; gratis con el plan anual |

- USD 390/año es el mismo precio que el Authority Profile: la escalera de
  Ignite queda coherente.
- **Puente hacia arriba:** lo pagado en los primeros 3 meses se acredita si
  pasan al Authority Platform o al Authority Build.

## 6. El nicho **[DECIDIR]**

| | A · Facilitadores con programa | B · Autoridad | C · Especialistas de salud en Instagram |
|---|---|---|---|
| **Quiénes** | Coaches, terapeutas, maestros espirituales, breathwork, yoga: venden cohortes y programas (Whop, Skool, Hotmart) desde Instagram. | Ejecutivos, juntas directivas, académicos, abogados. | Cirugía plástica, dermatología, odontología estética en LatAm. |
| **Por qué sí** | Viven en Instagram; su venta es DM + checkout; lanzan seguido (paga el plan Lanzamientos); conecta con el modelo de socio por revenue share. | Es la marca de Ignite (autoridad); pagan más y cambian poco; sube natural a Profiles, Platform y Build. | Viven en Instagram; la acción es clara (agendar por WhatsApp); el paciente vale mucho; Ignite ya trabaja con cirujanos. |
| **Por qué no** | Ticket bajo, más cambios por cliente. | Su «bio» suele ser LinkedIn: el enlace de Instagram pesa menos. | Publicidad médica regulada; antes/después delicado. |
| **Prueba que ya hay** | Perdón Práctico, Mario. | Adriana. | Jorge Arce (piloto, sin hub). |
| **Demo** | `demo-programa/` | `demo-autoridad/` | — |

**Recomendación:** **A para la primera ola.** Hay dos casos reales y la
plantilla ya trae lo que ese nicho usa: lanzamientos, DM, checkout y video.
**B como versión editorial para los clientes de Profiles, Platform y Build**,
no como nicho de captación. C, después de A, con un módulo de agenda y las
reglas de publicidad médica resueltas.

## 7. Qué recibe el cliente

**Incluye:** curaduría (máx. 12 piezas, una acción principal), diseño a su
marca (paleta, tipografía, glifos), fotos recortadas y tratadas con las que
ya tiene, sus textos (recortados, no reescritos), dominio o `/links`, DM
dentro de Instagram, UTM hasta el checkout, medición, borrador, una ronda de
ajustes y publicación.

**No incluye:** sesión de fotos, copy nuevo de producto, landing ni web
completa, cobro dentro del hub (enlaza al checkout que ya tenga) ni captura de
emails con base de datos (por ahora).

**Credibilidad (no negociable, como en todo Ignite):** no se inventan
credenciales, medios, cifras ni testimonios. Lo que no está confirmado, no sale.

## 8. Proceso: de cero a publicado en 5 días hábiles

| Día | Qué pasa |
|---|---|
| 0 | Brief de 30 min (formulario + llamada): destinos, la acción principal, fotos, paleta, dominio. |
| 1–2 | Primera versión: `content.json` + `tokens.css` → build → control de calidad. |
| 3 | Revisión con el cliente en borrador. Una ronda. |
| 4–5 | Dominio, `draft: false`, publicación y medición conectada. |
| Cada mes | Cambios por mensaje; en Lanzamientos, el informe. |

## 9. Por qué es puerta de entrada

El hub deja a la vista los huecos: la oferta sin landing, sin fotos propias, sin
una frase que la diga. Esa es la conversación siguiente:

```
Hub (USD 39/mes) → Authority Profile (USD 390/año) → Authority Platform (desde USD 3.000) → Authority Build (USD 9.000)
                 ↘ socio por revenue share (creadores con audiencia)
```

## 10. Lo que falta: diseño, producto y oferta

**Diseño**
- Más registros además del bold y el editorial, y una biblioteca de glifos por marca.
- Tarjetas nuevas: captura de email, testimonio, cuenta regresiva de lanzamiento, galería, producto con precio, agenda (Calendly/WhatsApp) y ubicación (salud).
- **Modo campaña** en la plantilla (estado abierto/cerrado y fechas desde un config), portado de `dios-sin-iglesia.config.js` de PP.
- Fotos reales en las demos, con permiso.

**Producto**
- Pasar los tres hubs existentes a la plantilla, para probar que cubre lo que ya funciona.
- Un solo proyecto de hosting con un dominio por cliente, en vez de un proyecto por hub.
- El informe mensual automático (eventos → resumen) y una vista para el cliente.
- Fase 2: cambios sin nosotros.

**Oferta**
- Nombre, nicho, planes y precio (abajo).
- Página de venta en igniteyourself.co, con las dos demos en vivo, como la de Profiles.
- Cobro recurrente (Whop, que ya se usa en PP, o Stripe) y términos de la suscripción.

## 11. Decisiones pendientes **[DECIDIR]**

1. **Nombre.** De trabajo: «Hub». Opciones: *Ignite Hub*, *Authority Hub*, *Bio by Ignite*.
2. **Nicho** de la primera ola (§6).
3. **Planes y precios** (§5).
4. **¿Crédito de Ignite al pie?** La regla del repo es que Ignite no aparece en los assets del cliente; el Ignite Profile gratis sí lleva la marca. Opción: un plan más barato con un crédito discreto.
5. **Casos públicos:** ¿se pueden mostrar PP, Mario y Adriana en la página de venta? Hace falta permiso de cada uno (lo de Mario sigue en borrador).
6. **Cobro:** Whop o Stripe.
