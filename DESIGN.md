---
version: alpha
name: Mimarse Reformer
description: Sistema visual de Mimarse Estudio. La página se arma como un reformer, con rieles finos, un carro de maple y resortes de colores.
colors:
  primary: "#1B2945"
  primary-deep: "#131E35"
  on-primary: "#FFFFFF"
  on-primary-soft: "#C3CCDE"
  neutral: "#EEF1F5"
  surface: "#FFFFFF"
  ink: "#172139"
  ink-soft: "#4A5572"
  rail: "#BCC4D2"
  maple: "#D6B283"
  maple-deep: "#B8915C"
  spring-red: "#D2463C"
  spring-yellow: "#E3AA2B"
  spring-green: "#3A9566"
  spring-blue: "#4079CF"
  whatsapp: "#12803D"
typography:
  display:
    fontFamily: Jost
    fontSize: 96px
    fontWeight: 300
    lineHeight: 0.95
    letterSpacing: -0.03em
  headline:
    fontFamily: Jost
    fontSize: 54px
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: -0.02em
  title:
    fontFamily: Jost
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.1
  lead:
    fontFamily: Jost
    fontSize: 27px
    fontWeight: 400
    lineHeight: 1.3
  label-name:
    fontFamily: Jost
    fontSize: 19px
    fontWeight: 500
    lineHeight: 1.25
  wordmark-caps:
    fontFamily: Jost
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: 0.5em
  body:
    fontFamily: Figtree
    fontSize: 17px
    fontWeight: 400
    lineHeight: 1.6
  body-strong:
    fontFamily: Figtree
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.2
  caption:
    fontFamily: Figtree
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: 10px
  md: 14px
  full: 999px
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 96px
  gutter: 40px
  max-width: 1180px
components:
  button-primary-on-dark:
    backgroundColor: "{colors.on-primary}"
    textColor: "{colors.primary}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.sm}"
    height: 48px
    padding: 22px
  button-primary-on-light:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.sm}"
    height: 48px
    padding: 22px
  button-ghost-on-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.sm}"
    height: 48px
    padding: 22px
  sede-switch-carriage:
    backgroundColor: "{colors.maple}"
    textColor: "{colors.primary}"
    typography: "{typography.title}"
    rounded: "{rounded.sm}"
    height: 64px
  secondary-text:
    textColor: "{colors.ink-soft}"
    typography: "{typography.caption}"
  page:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  rail-divider:
    backgroundColor: "{colors.rail}"
    height: 1px
  today-marker:
    backgroundColor: "{colors.maple-deep}"
    height: 3px
    rounded: "{rounded.sm}"
  spring-reformer-funcional-gap:
    backgroundColor: "{colors.spring-red}"
    size: 22px
  spring-jump-dance:
    backgroundColor: "{colors.spring-yellow}"
    size: 22px
  spring-stretching-silla:
    backgroundColor: "{colors.spring-green}"
    size: 22px
  spring-yoga:
    backgroundColor: "{colors.spring-blue}"
    size: 22px
  schedule-panel:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
  navy-field:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body}"
  footer:
    backgroundColor: "{colors.primary-deep}"
    textColor: "{colors.on-primary-soft}"
    typography: "{typography.caption}"
  whatsapp-float:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.surface}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.full}"
    size: 56px
---

# Mimarse Reformer

## Overview

Mimarse Estudio es un estudio de barrio en Villa del Parque con dos sedes, Pilates y Fit. El sitio toma su forma de la máquina que define al estudio: el reformer. Hay rieles largos de trazo fino, del mismo grosor que la M del logo. Hay un carro de madera que se desliza y resortes de colores que ordenan la información.

El azul marino de marca (remeras, vidriera, logo) cubre campos enteros: el inicio, las reseñas y el contacto. Entre esos campos, el suelo claro de aluminio lleva las clases, los horarios y el equipo. El tono es cálido y directo, sin lujo impostado. Las fotos reales del equipo son la prueba principal.

La página responde a una pregunta del vecino: qué clase hay, a qué hora, dónde. Después lo lleva a WhatsApp.

## Colors

- **Azul marino (`primary`, #1B2945):** el color de la marca. Cubre los campos del inicio, las reseñas y el contacto, y también sirve de fondo para los botones sobre claro.
- **Marino profundo (`primary-deep`, #131E35):** el pie de página y el hover de los botones marinos.
- **Blanco y blanco suave (`on-primary`, `on-primary-soft`):** el texto sobre marino. El suave (#C3CCDE) queda para textos secundarios y tiene contraste mayor a 8:1.
- **Aluminio (`neutral`, #EEF1F5):** el suelo de las secciones claras. Es un gris frío a propósito, para no caer en el crema de siempre.
- **Tinta (`ink`, `ink-soft`):** el texto sobre claro. El secundario (#4A5572) supera 7:1 sobre aluminio.
- **Riel (`rail`, #BCC4D2):** las líneas de 1px que separan filas y marcan los rieles.
- **Maple (`maple`, `maple-deep`):** la madera del carro. Solo marca lo que está activo: la sede elegida y la base de la foto del inicio.
- **Resortes (`spring-*`):** cuatro colores para identificar clases en la lista de clases de la sede Pilates, siempre como un resorte chico dibujado al lado del nombre y nunca como fondo ni como texto. La grilla de horarios no los usa. Rojo: Reformer, Funcional y GAP. Amarillo: Jump y Fit Dance. Verde: Stretching y Gym en Silla. Azul: todas las variantes de Yoga.
- **WhatsApp (`whatsapp`, #12803D):** solo el botón flotante, para que se reconozca de inmediato. Es un verde WhatsApp oscurecido para que el blanco llegue a 5:1.

## Typography

Jost es la voz de marca. Es una geométrica de trazo fino que conversa con la M de líneas del logo y con el wordmark de la vidriera. Se usa en peso 300 para el "Mimarse" gigante y el "Escribinos" del cierre, en 400 para los títulos y en 500 para los nombres de clases y personas. "ESTUDIO" va en mayúsculas muy espaciadas, como en el logo.

Figtree lleva todo el texto de lectura, los botones y los datos. El cuerpo va a 17px en escritorio y 16px en celular. Las horas usan cifras tabulares para que la columna quede alineada.

## Layout

El ancho máximo es de 1180px, con márgenes laterales fluidos de 16 a 40px. Las secciones alternan campo marino y suelo claro con mucho aire vertical (entre 64 y 112px).

- El inicio va en dos columnas: el nombre y las acciones a la izquierda, la foto del equipo apoyada sobre el carro a la derecha. Abajo, dos rieles cruzan todo el ancho con un tope circular en cada punta.
- Las clases son filas sobre rieles, no tarjetas: resorte, nombre y descripción.
- La grilla semanal conserva el estilo original que eligió la dueña: celdas gris claro (#F8F9FA) redondeadas y separadas 5px, la columna de horas en azul marino con texto blanco, días en mayúscula y nombres de clase en negrita azul, dentro de un panel blanco con sombra. En celular la grilla se muestra entera, sin scroll lateral: los días van abreviados (LUN, MAR…), los nombres de clase van completos ("Pilates Reformer" en dos renglones) y las palabras nunca se cortan con guion: `script.js` mide la palabra más larga y achica la letra de esa grilla lo justo para que entre (hasta 12px como máximo).
- El equipo va en 4 columnas en escritorio, 3 en tablet y 2 en celular, con retratos 4:5 sobre fondo blanco.

## Elevation & Depth

Casi todo es plano. Hay tres elevaciones, todas con desplazamiento vertical y difuminado neutro:

- El panel de horarios, con una sombra suave hacia abajo.
- El carro del selector de sede, con una sombra cálida corta que lo despega del riel.
- El header fijo y el botón flotante, con sombra neutra al hacer scroll.

No hay brillos, cristales ni sombras de color sobre marino.

## Shapes

- Radio de 10px para los controles: botones, pestañas y el carro.
- Radio de 14px para las superficies: la tabla, la lista por día, las fotos.
- Pastilla completa solo para el botón flotante de WhatsApp.
- Líneas de 1px para rieles y separadores. Los topes de los rieles son círculos de 14 a 16px con borde de 1px.
- El resorte es una espiral con rulos visibles: grande en el selector de sede y chica (24×10px) como marca de cada clase.

## Components

- **Selector de sede:** un riel con un tope a la izquierda. El resorte rojo es una espiral vista de costado (vuelta de atrás más tenue, gancho en la punta) que corre por el riel de abajo desde el tope hasta el pie del carro de maple, que se para sobre la sede activa. `script.js` lo dibuja siguiendo al carro: al estirarse suma vueltas y las separa, sin cambiar el diámetro. Al cambiar de sede, el carro se desliza con un leve rebote y el resorte se estira o se encoge. Son pestañas accesibles (`role="tab"`) y se manejan con las flechas.
- **Grilla en celular:** la misma tabla, comprimida para entrar en 320px de ancho y casi a todo el ancho de la pantalla. La letra se calcula sola (unos 9 a 10px en un celular de 375px), las celdas tienen 2px de separación y radio de 6px.
- **Botones:** blanco sobre marino o marino sobre claro como primario, y contorno fino como secundario. Todos miden 48px o más de alto, con ícono SVG.
- **Reseñas:** una cita grande destacada y el resto en columnas, con el autor precedido por una rayita.
- **Botón flotante de WhatsApp:** verde, se esconde mientras se ven el inicio o el contacto, que ya tienen su propio botón.

## Do's and Don'ts

- Usá fotos reales del estudio y del equipo, nunca de stock.
- Reservá el maple para lo activo. Si todo es maple, nada se destaca.
- Cuando agregues una clase nueva, sumá su palabra clave a `springFor()` en `script.js` si necesita un color distinto del rojo.
- Mantené los horarios en la tabla del HTML: la lista para celular sale de ahí.
- No uses emojis como íconos de interfaz: los íconos son símbolos SVG del sprite de `index.html`. La única excepción, pedida por la dueña, son los emojis de cada actividad en la lista de clases de Fit (🏋️ Funcional, 🦵 GAP, 🤸 Stretching, 🦘 Jump, 🪑 Gym en Silla, 💃 Fit Dance, 🧘 Yoga).
- No publiques precios, promociones ni clases de prueba que el estudio no haya confirmado.
- No agregues etiquetas chicas encima de los títulos ni tarjetas iguales en fila.
- No animes lo que no sea el carro, el resorte o el salto de día. Con `prefers-reduced-motion` todo queda quieto.
