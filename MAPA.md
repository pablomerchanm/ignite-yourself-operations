# Mapa de Ignite Yourself — dónde está cada cosa

> Este archivo existe por una razón: que nunca haya que preguntarse "¿dónde quedó
> aquello?". Si creas algo nuevo, añádelo aquí.
>
> Última revisión: 4 de agosto de 2026.

---

## Lo primero que hay que entender

Hay **dos repositorios** en GitHub. Son dos cajas fuertes distintas:

| Repositorio | Qué guarda |
|---|---|
| `pablomerchanm/ignite-yourself-operations` | El trabajo con clientes: plantillas, previews, prospección |
| `pablomerchanm/ignite-yourself` | La marca propia: la web de Ignite, Ignited, Perdón Práctico |

**Nada de lo que esté en GitHub se pierde jamás.** Git guarda cada versión de cada
archivo desde el día que se creó. Aunque borres algo hoy, sigue recuperable.

El único riesgo real no es perder archivos: es *no saber dónde están*. Por eso este
mapa, y por eso la regla de abajo.

### La regla que evita el desorden

Todo trabajo terminado va a la rama **`main`**. Las ramas `claude/...` son mesas de
trabajo temporales: sirven mientras algo se construye, y cuando está listo se fusiona
a `main`. Si algo se queda solo en una rama, existe pero es invisible — que es
exactamente lo que había pasado con los previews de Wilshire.

---

## Repositorio 1 — `ignite-yourself-operations`

Se publica en **igniteyourself.co**. Todo vive dentro de `clients/jorge-arce/`
(el nombre es histórico: ahí empezó todo con el caso piloto).

### El catálogo de plantillas — 36 sitios completos

| | |
|---|---|
| **Dónde** | `clients/jorge-arce/v2/` … `v37-bakery/` |
| **Cómo verlas** | igniteyourself.co/templates |
| **El manual** | `clients/jorge-arce/TEMPLATES.md` |

Cada carpeta es un sitio entero y funcional, con el contenido real aprobado del
Dr. Jorge Arce como relleno. Algunas ya se usaron en producción:

- `v10-mobius` → la web actual de Ignite Yourself (igniteyourself.co)
- `v14-gareis` → la piel de Kappelman y de Mark Cooke

`TEMPLATES.md` es el playbook del negocio: el intake que se le pide a cada médico,
y el modelo (outreach → intake → elegir plantilla → verter contenido → deploy).
Cada sitio nuevo es un fork con find-replace, no un rediseño.

### Clientes y prospectos

| Cliente | Dónde | Estado |
|---|---|---|
| **Mark Cooke** | `clients/jorge-arce/mark-cooke/` | Preview enviado. 4 páginas: home, story, practice, record |
| **Leon Kappelman** | `clients/jorge-arce/kappelman/` | Preview enviado. Variantes: `kappelman-gareis`, `kappelman-getty` |
| **Wilshire Oral Surgery** | `clients/wilshire-oral-surgery/` | Dos previews sin enviar: Dr. Vahedi y Dr. Shadi |
| **Prospección abogados** | `prospecting/round-1/` | 4 briefs + CSV de prospectos y exclusiones |

### Configuración

- `clients/jorge-arce/vercel.json` — rutas, redirects y alias del dominio
- `clients/jorge-arce/robots.txt` — qué pueden indexar los buscadores
  (los previews de clientes están bloqueados a propósito)

---

## Repositorio 2 — `ignite-yourself`

La marca propia. Clonado en la sesión de trabajo en `/workspace/ignite-yourself`.

| Qué | Dónde |
|---|---|
| **La web de Ignite (v2)** | `v2/` — "Personal Brand Systems", con el programa Ignited de 12 semanas |
| **Estrategia y docs** | `docs/pp/` — marca, contenido, método, roadmap, testimonios, lanzamiento |
| **Perdón Práctico** | `perdonpractico/` |
| **Material de clientes** | `work/` — José Manuel (videos), plantilla de abogado |

**Ojo con este repo:** durante un tiempo el trabajo bueno estuvo solo en la rama
`claude/hola-5kysx9`, mientras `main` se quedó con una versión vieja llena de
marcadores "TODO". Si algo se ve incompleto, verifica en qué rama estás parado.

---

## Si algo parece perdido

No entres en pánico: en Git nada desaparece. Pregunta por ello y se busca así —

1. **En todas las ramas del repo**, no solo en `main`.
2. **En el historial**, incluso si el archivo fue borrado (`git log --diff-filter=D`).
3. **En el otro repositorio** — es el error más común, porque son dos.

Los previews de Wilshire estuvieron "perdidos" cinco días exactamente por el
motivo 1: existían, estaban a salvo, pero vivían en una rama que nadie miraba.
