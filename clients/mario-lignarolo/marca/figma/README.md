# Figma · Home v3

**Archivo:** [Mario Lignarolo · Home v3](https://www.figma.com/design/uXvSCqE6kLmBgPoc2KlIWb), en el equipo de Pablo. Creado el 31 oct 2026, a petición de Pablo, para ajustar el diseño a mano y trabajarlo juntos.

## Qué hay

Todo son capas editables, no capturas. La página **Home v3** tiene:

- **Escritorio · 1440:** un marco por sección, a 1440 × 900 (el alto de una pantalla), con la retícula de 12 columnas de la web (margen 54, medianil 30) como layout grid.
- **Móvil · 390:** un marco por sección, al alto que mide en la web (390 × 844 la portada), con una retícula de 4 columnas y margen 24.
- **Componentes:** el logo de Mario y el emblema de Hipertrofia del Ser como componentes, y unas notas.

El archivo usa además:

- **Variables «Marca · color»:** los colores de `v3.module.css` (papel, tinta, negro, sobre-negro, piedra…). Los rellenos y textos que coinciden están enlazados a ellas.
- **Estilos de texto `Escritorio/…` y `Móvil/…`:** Portada, Golpe, Pregunta, Lectura, Manifiesto, Etiqueta, Entrada, etc., con los tamaños, interlineados y espaciados medidos en la web.
- **Las fotos reales:** con el recorte (`object-position`) y el tono de la web.

## Cómo trabajamos

El código es lo que se publica (`/v3`). Figma es la mesa de diseño compartida.

1. **Pablo ajusta en Figma** y le pasa a Claude el enlace del marco que cambió.
2. **Claude lee el cambio** (`get_design_context` / `get_screenshot`), lo lleva al código y lo sube a la vista previa.
3. **Si el cambio nace en el código,** Claude actualiza el marco correspondiente en Figma.

**Lo que no pasa a Figma:**

- **El movimiento:** la lectura guiada, las escenas fijas, el emblema que sale del bloque y las entradas animadas. En Figma cada sección es un cuadro estático.
- **La condensada:** la API de Figma no permite fijar el eje de anchura de Archivo (`wdth 66` en la web). Los estilos Portada, Golpe y Pregunta usan **Archivo Narrow Bold**. Los titulares conservan los cortes de línea de la web; para verlos idénticos, basta editar esos estilos en Figma (Archivo ExtraBold, anchura 66).

## Regenerarlo desde el código (`sync/`)

1. `extract.mjs` mide `/v3` renderizada (con movimiento reducido) a 1440 × 900 y 390 × 844. De cada sección saca:
   - los textos, con su estilo, sus tramos y sus líneas reales;
   - las fotos, con su recorte;
   - los vectores, rellenos, filetes y degradados.
2. `gen.mjs` convierte esas medidas en scripts de `use_figma`:
   - `setup` crea variables, estilos y marcos;
   - `logos` crea los dos componentes;
   - `sections` crea el contenido de cada sección y la lista de fotos.
3. **Las fotos** se suben con `upload_assets` a sus huecos. Después se les aplica el recorte (`CROP`) y el filtro de color.

**Rutas y dependencias:** los scripts usan las rutas del contenedor de trabajo y el Playwright preinstalado. Están pensados para que Claude los use, no como herramienta de uso general.
