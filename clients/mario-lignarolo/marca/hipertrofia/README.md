# Hipertrofia del Ser · universo gráfico

**Estado:** propuesta del estudio (26 oct 2026), pedida por Pablo. Pendiente de Mario. Hoja del sistema: `hds-sistema.jpg`.

## Símbolo: anillos de crecimiento

Un núcleo macizo (el ser) y cuatro anillos tangentes en la base. Cada anillo mide φ veces el anterior.

- **Idea:** crecer desde dentro y con raíz; la hipertrofia como expansión.
- **Origen:** destila en blanco y negro el círculo que Mario ya usa en Substack.
- **Grande** (`hds-simbolo-*`): cinco piezas, filete fino.
- **Pequeño** (`hds-simbolo-pequeno-*`): cuatro piezas, trazo grueso. Para 16–96 px y el avatar.

## Cabecera

El nombre se escribe en dos voces:

- **HIPERTROFIA:** Newsreader 400 en versal, espaciado +14 %. Es la estructura, el cuerpo.
- ***del Ser*:** Newsreader Itálica 300 al 62 % del cuerpo de la versal. Es lo que crece dentro.

Hay dos composiciones: `hds-logo-vertical-*` (símbolo encima, centrada) y `hds-logo-horizontal-*` (símbolo a la izquierda). El texto va en contornos, así que no necesitan la fuente.

## Color

Solo negro `#0E0F12` y blanco cálido `#F2F0EB`. Cada SVG tiene un único relleno.

## Archivos

| Archivo | Uso |
| --- | --- |
| `hds-simbolo-{negro,blanco}.svg` | Símbolo grande |
| `hds-simbolo-pequeno-{negro,blanco}.svg` | Símbolo pequeño |
| `hds-logo-vertical-{negro,blanco}.svg` | Cabecera vertical |
| `hds-logo-horizontal-{negro,blanco}.svg` | Cabecera horizontal |
| `hds-avatar-substack.png` | Avatar de 1024 px para Substack. Solo si Mario lo aprueba; hoy usa el círculo naranja. |

## En la web

Lo usa `/v3`:

- El componente está en `app/v3/HdsSymbol.tsx`.
- La cabecera es texto vivo.
- En la sección, los anillos crecen con el scroll.
