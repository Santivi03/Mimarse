# Mimarse Estudio

Sitio de Mimarse Estudio, con las sedes de Pilates y Fit en Villa del Parque. Es HTML, CSS y JS sin dependencias ni build.

## Ver en local

```bash
python -m http.server 8765
```

Después abrí `http://localhost:8765`.

## Archivos

- `index.html`: todo el contenido (clases, horarios, reseñas, equipo, contacto).
- `styles.css`: estilos. Los colores y tipografías están como variables en `:root`.
- `script.js`: selector de sede, versión compacta de la grilla para celular, colores de cada clase y menú.
- `img/`: imágenes optimizadas que usa el sitio.
- `_originales/`: fotos y logo originales, sin tocar. El sitio no las usa.
- `DESIGN.md`: sistema de diseño (colores, tipografía, componentes y reglas).
- `PRODUCT.md`: de qué se trata el estudio y qué no hay que inventar.

## Cambiar horarios

Editá la tabla de la sede en `index.html` (`<table class="schedule-table">`). Cada fila es una hora y cada celda es un día:

```html
<td><span class="class-name">Pilates Reformer</span></td>
```

Para dejar un hueco, poné `<td></td>`. En celular la tabla se achica sola para verse entera: la letra se ajusta a la palabra más larga, así que un nombre de clase muy largo hace que toda la grilla se vea más chica.

Si agregás una clase con un nombre nuevo, va a salir con el resorte rojo. Para darle otro color, sumá su palabra clave en `springFor()` dentro de `script.js`.

Después de publicar cambios en CSS o JS, subí el número de `?v=` en los links de `index.html` para que los navegadores no usen la versión vieja.

## Antes de publicar

`og:image` apunta a `img/og.jpg` con ruta relativa. Para que WhatsApp e Instagram muestren la vista previa del link, cambiala por la URL completa del dominio donde se publique el sitio (por ejemplo, `https://tudominio.com/img/og.jpg`).
