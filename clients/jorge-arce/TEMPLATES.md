# Ignite Yourself — Playbook del sistema de plantillas

**Catálogo visual:** https://ignite-yourself-operations.vercel.app/templates
**Caso piloto:** Dr. Jorge Arce (todas las demos usan su contenido real aprobado).

El modelo: Pablo hace outreach → consigue la información del médico → se elige plantilla
según perfil/fotos/tono → la información se vierte en los slots ya definidos → deploy.
Cada sitio nuevo es un fork de la plantilla elegida con find-replace de contenido, NO un
rediseño.

---

## 1 · Intake universal (pedir SIEMPRE, a todo médico)

### Identidad
- [ ] Nombre completo + título (D.D.S., M.D., Esp.)
- [ ] Especialidad exacta y subespecialidades
- [ ] Años de práctica (número verificable)
- [ ] Certificaciones reales (board, diplomados) — SOLO las que pueda demostrar
- [ ] Historia de origen: dónde se formó, por qué medicina, el "principio" que guía su práctica
- [ ] Nombre de la clínica + año de fundación
- [ ] Ubicación(es), teléfono, horario

### Contenido
- [ ] 4–9 testimonios reales (pacientes y/o colegas remitentes) con nombre e inicial
- [ ] 3–6 servicios/disciplinas con descripción de una frase cada uno
- [ ] 2–4 charlas, docencia o publicaciones (si tiene)
- [ ] 1 frase-filosofía en sus palabras (será la quote destacada)
- [ ] Tema del lead-magnet (guía gratuita) — default: "Qué esperar de tu primera consulta"

### Fotos (la parte crítica — ver §3)
- [ ] Mínimo absoluto: 3 fotos propias
- [ ] Ideal: 6–8 (retrato limpio, en acción/procedimiento, clínica, hablando/enseñando)

### Reglas de honestidad (NO negociables, heredadas del piloto)
- Cero credenciales, cifras de pacientes, ratings o instituciones inventadas.
- Stats solo verificables: años, año de fundación, certificación, ubicaciones, disciplinas.
- Testimonios: solo reales provistos por el cliente (en demos internas se marca contenido
  conceptual).

---

## 2 · Matriz de selección de plantilla

| Plantilla | URL | Perfil del médico | Fotos | Texto | Paleta |
|---|---|---|---|---|---|
| **Monograph v2** | `/v2` | Cirujano senior, autoridad silenciosa, historia larga | Alta (6–8) | Mucho | Navy + serif |
| **Hanza v3** | `/v3-hanza` | Moderno 35–50, marca personal fuerte | Alta (hero potente + 5) | Medio | Ink + coral #FF6044 |
| **ClearPath v4** | `/v4-clearpath` | Empático, pacientes nerviosos, general/ortodoncia | Media (tolera stock) | Medio | Sage + Crimson serif |
| **Zentro v5** | `/v5-zentro` | Ambicioso, clínica con color de marca | Media (duotono perdona) | Poco | Monocolor brand + b/n |
| **Definitiva v6** | `/v6-final` | Cliente indeciso — híbrido seguro | Alta | Completo | Navy/azul |
| **Noon v7** | `/v7-noon` | Independiente, anti-marketing, por remisión | Media (3–4 cálidas) | Poco | Ink/crema/óxido |
| **Luke v8** | `/v8-luke` | Estética dental, perfil creativo | Baja (previews chicos) | Mínimo | Negro + aurora roja |
| **Holistic v9** | `/v9-holistic` | Familiar, cercano, dolor/TMJ, pediatría | Media (grade unifica) | Medio | Crema + terracota |
| **Möbius v10** | `/v10-mobius` | Referencia académica, máxima autoridad | Baja (B/N sirve) | Estructurado | B/N + rojo |
| **Firma v11** | `/v11-firma` | Práctica premium, high-ticket | Alta (verticales) | Medio | Blanco + coral + script |

**Atajos de decisión:**
- Fotos malas o pocas → **Möbius v10** o **Luke v8** (viven de tipografía) o **Zentro v5** (duotono).
- Médico con miedo a "verse vendedor" → **Noon v7**.
- Quiere impresionar/cerrar caro → **Firma v11** o **Monograph v2**.
- Público = pacientes asustados → **ClearPath v4** o **Holistic v9**.
- Sin tiempo de decidir → **Hanza v3** (favorita del piloto) o **Definitiva v6**.

---

## 3 · Especificación de fotos por plantilla

> Lección del piloto: las fotos mal recortadas rompen cualquier plantilla. Pedir SIEMPRE
> los originales en máxima resolución, sin recortar, y anotar aquí el `object-position`
> correcto por foto al adaptarla.

Slots estándar (nombres de archivo en `img/`):
- `hero.jpg` — retrato protagonista. Vertical u horizontal amplio, aire sobre la cabeza,
  mirada hacia el lado con espacio. Es LA foto: si solo hay una buena, va aquí.
- `portrait.jpg` — retrato secundario limpio (about / tarjeta contacto).
- `surgery.jpg` / `operating.jpg` — en acción (procedimiento, instrumental).
- `clinic.jpg` — espacio físico.
- `speaking.jpg` — hablando/enseñando (si no hay: reunión con paciente).
- `quote.jpg` — retrato contemplativo para banda de quote.
- `footer.jpg` — ambiente para cierre (opcional).

Tratamientos por plantilla (ya implementados en CSS, clase → filtro):
- v9 Holistic: `.warm` sepia(.3) — unifica B/N con paleta cálida.
- v7 Noon: sepia(.4–.5) saturate(1.3+) — tinte óxido.
- v5 Zentro: grayscale + multiply sobre azul (duotono).
- v10 Möbius / v3 Hanza: grayscale con contraste alto.
- v4 ClearPath: tinte sage vía overlay gradiente.

---

## 4 · Slots de contenido (find-replace al adaptar)

Todo lo que se cambia entre cliente y cliente:

1. **Wordmark/nombre** — aparece en nav, hero gigante, footer gigante. Ojo: nombres largos
   necesitan ajustar el `clamp()` del wordmark (probado hasta 5 letras "ARCE"; para
   "GUTIÉRREZ" reducir el vw máximo).
2. **Tagline hero** + sub-statement.
3. **Historia** (3 párrafos: origen → formación → principio/clínica).
4. **N servicios** con descripciones.
5. **Stats verificables** (3–4).
6. **Testimonios** (los grids aceptan 6–9; con menos de 6, quitar filas completas, no dejar
   huecos).
7. **Journal** (3 artículos — se pueden reusar los genéricos del piloto adaptando la
   especialidad).
8. **Speaking** (0–4 filas; si no tiene, eliminar la sección entera — todas las plantillas
   lo toleran).
9. **Lead magnet** + formulario + fineprint con nombre de la clínica.
10. **Contacto**: teléfono, ubicaciones, horario.

Tiempo estimado de adaptación por sitio una vez está el intake completo: **una sesión**
(vierte contenido → render de verificación → ajuste de crops → deploy).

---

## 5 · Flujo de producción

1. Pablo cierra cliente y llena el intake (§1) — sin intake completo no se empieza.
2. Elegir plantilla con la matriz (§2) — enseñar el catálogo `/templates` al cliente y
   dejar que reaccione a 2–3 opciones preseleccionadas, no a las 10.
3. Crear carpeta `clients/<nombre-doctor>/` clonando la plantilla elegida.
4. Verter contenido en los slots (§4), subir fotos con crops anotados (§3).
5. Verificación headless (desktop + móvil) — cero overflow, fotos bien posicionadas.
   **Regla dura:** rutas de assets SIEMPRE absolutas (`/p/<slug>/img/foto.jpg`, nunca
   `img/foto.jpg`) — Vercel sirve sin barra final (`trailingSlash:false`) y las rutas
   relativas se rompen en producción aunque funcionen en local.
6. Deploy en Vercel + dominio del cliente.
7. Entregar standalone HTML de respaldo al cliente.

---

*Última actualización: ronda de fidelidad de referentes completada — las 10 plantillas
verificadas en producción con el contenido del piloto.*
