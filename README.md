# Ignite Yourself — Operaciones Web

Monorepo de operaciones web de **Ignite Yourself**, estudio de arquitectura de autoridad digital. Aquí viven los sitios y ecosistemas digitales de cada cliente, la web propia de Ignite, y los componentes reutilizables que hacen el modelo replicable.

**Privado.** Contiene trabajo de clientes y propiedad intelectual de Ignite. No se hace público.

---

## Estructura

```
ignite-yourself-operations/
├── README.md
├── clients/                  # un sitio/ecosistema por cliente, aislado
│   └── jorge-arce/           # cliente piloto — cirujano oral y maxilofacial
│       ├── index.html        # landing (Website — The Home)
│       ├── styles.css
│       ├── script.js
│       └── img/              # imágenes (extraídas de base64)
├── ignite/                   # la web propia de Ignite Yourself
└── _shared/                  # tokens, fuentes y componentes reutilizables
    ├── tokens.css            # sistema de color + tipografía
    └── motion/               # utilidades de animación/scroll reutilizables
```

**Regla:** cada cliente en su carpeta. Lo que se repite (color, tipografía, motion) vive en `_shared/` y se reutiliza. Cuando llega el cliente #3, se copia el patrón, no se reinventa. Esa es la replicabilidad del modelo, hecha infraestructura.

---

## Sistema visual (base compartida)

- **Color:** `--bg:#FBFAF8` (off-white) · `--ink:#10243A` (navy) · `--blue:#1C6FE8` (acento) · `--ink-soft:#5E6B79` · `--card:#FFFFFF` · `--line:#E9EBEE` · `--panel:#EFF2F5` · `--mist:#DCE6EF`.
- **Tipografía:** Archivo (sans, 400–900) + Fraunces (serif itálica, 300–400) — Google Fonts.
- **Lenguaje:** editorial / Swiss / international typographic. Anclado a la izquierda, anti-simétrico, mucho espacio negativo. Titulares grandes con tracking negativo; Fraunces itálica solo para acentos.
- **Motion:** reveals al entrar en viewport, transiciones cinematográficas, hover sutil. Referencia de ambición: scrollytelling elegante (sacredforests.earth) en clave sobria.

---

## Reglas de marca

- Ignite = arquitectura de autoridad digital. No agencia de redes, no "manejo de marca personal", no production house.
- La marca Ignite **no aparece dentro de los assets del cliente** — cada sitio es 100% del cliente. Ignite vive solo en la capa de pitch/presentación.
- Nomenclatura del sistema: Authority Build (12 semanas, USD 9,000) · Authority Playbook · Authority OS · Authority Operations · CTA "Book an Authority Mapping Call".

---

## Credibilidad (no negociable)

- No inventar credenciales, board certification, publicaciones, resultados ni especialidades específicas de un cliente.
- Claims a nivel verdadero-general; validar datos duros con el cliente antes de publicar.
- Lenguaje de pathways/positioning, no de resultados garantizados.

---

## Deploy

Vercel / Netlify. Un proyecto por sitio, apuntando a la carpeta del cliente correspondiente. Al conectar el repo a Vercel, cada push redespliega automáticamente.
