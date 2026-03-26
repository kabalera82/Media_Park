# Guía de Técnicas CSS — Media Park

> Esta guía documenta cada técnica CSS usada en el proyecto Media Park con explicación en profundidad y ejemplos reutilizables. El objetivo es que puedas llevarte cada patrón a cualquier otro proyecto.

---

## 1. Variables CSS (Custom Properties)

### Qué son

Las Custom Properties (o variables CSS) son valores reutilizables que defines una vez y consumes en cualquier parte de tu CSS. A diferencia de los preprocesadores como Sass, son nativas del navegador y pueden modificarse en tiempo de ejecución con JavaScript.

### Cómo se declaran

Se declaran dentro de un selector. La convención es declararlas en `:root` para que sean globales (accesibles desde cualquier elemento del documento):

```css
:root {
    --nombre-variable: valor;
}
```

### Cómo se usan

Se consumen con la función `var()`:

```css
color: var(--nombre-variable);
/* Con valor de fallback si la variable no existe: */
color: var(--nombre-variable, red);
```

### En este proyecto

```css
:root {
    --color-primario:    rgba(247, 68,  1, 1);   /* Naranja — texto y acentos */
    --color-secundario:  rgba(246, 160, 23, 1);   /* Naranja claro */
    --color-terciario:   rgba(253, 199, 39, 1);   /* Amarillo — barra búsqueda */
    --color-cuaternario: rgb(0, 0, 0);             /* Negro — fondos */
    --color-quintenario: rgb(27, 12, 5);           /* Negro cálido */
}
```

Las 5 variables controlan toda la paleta. Para cambiar el tema a verde oscuro solo hay que tocar `:root`, sin buscar colores hardcodeados por todo el archivo.

### Ventajas sobre valores hardcodeados

- **Mantenibilidad**: un cambio en un sitio se propaga a todo el CSS
- **Legibilidad**: `var(--color-primario)` comunica intención, `rgba(247,68,1,1)` no dice nada
- **Temas dinámicos**: puedes cambiar variables con JS (`element.style.setProperty('--color-primario', 'blue')`) para dark/light mode

### Patrón reutilizable

```css
/* Definición del sistema de diseño */
:root {
    /* Colores */
    --color-brand:       #3b82f6;
    --color-bg:          #0f172a;
    --color-text:        #f1f5f9;
    --color-accent:      #22d3ee;

    /* Espaciado */
    --spacing-sm:  0.5rem;
    --spacing-md:  1rem;
    --spacing-lg:  2rem;

    /* Tipografía */
    --font-size-base: 1rem;
    --font-size-lg:   1.5rem;
    --font-size-xl:   2.5rem;

    /* Bordes */
    --radius-sm:  4px;
    --radius-md:  8px;
    --radius-full: 9999px;
}
```

---

## 2. CSS Grid — Layout de navegación

### Qué es CSS Grid

Grid es el sistema de layout bidimensional de CSS. Permite controlar filas Y columnas simultáneamente, posicionar elementos en celdas específicas, y crear estructuras que serían imposibles o muy frágiles con Flexbox.

### El navbar de Media Park

El navbar usa un grid de 9 columnas y 2 filas para organizar todos los elementos de la cabecera:

```css
body > header > nav > ul {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(9, 1fr);  /* 9 columnas de igual ancho */
    align-items: center;
    height: 8vw;
    width: 100vw;
}
```

Cada elemento se posiciona manualmente indicando en qué fila y columna vive:

```css
/* Fila 1: enlaces de texto (tablet_nav1 al tablet_nav9) */
#tablet_nav1 { grid-row: 1; grid-column: 3; }
#tablet_nav2 { grid-row: 1; grid-column: 7; }
#tablet_nav3 { grid-row: 1; grid-column: 1; }
/* ...etc */

/* Fila 2: controles interactivos */
#Logo   { grid-row: 2; grid-column: 1/4; }  /* Ocupa columnas 1, 2 y 3 */
#Search { grid-row: 2; grid-column: 4/8; }  /* Ocupa columnas 4, 5, 6 y 7 */
#Shop   { grid-row: 2; grid-column: 8;   }
#User   { grid-row: 2; grid-column: 9;   }
```

### Notación de span con `/`

`grid-column: 1/4` significa "empieza en la línea 1 y termina en la línea 4" — es decir, ocupa 3 columnas. También puedes escribirlo como `grid-column: 1 / span 3`.

### Patrón reutilizable para cualquier header complejo

```css
.header {
    display: grid;
    grid-template-columns: auto 1fr auto auto;
    /* Columna 1: logo (tamaño natural)
       Columna 2: buscador (ocupa el espacio disponible)
       Columna 3: icono usuario
       Columna 4: icono carrito */
    align-items: center;
    padding: 0 1rem;
    height: 64px;
}

.header-logo    { grid-column: 1; }
.header-search  { grid-column: 2; }
.header-user    { grid-column: 3; }
.header-cart    { grid-column: 4; }
```

---

## 3. Flexbox — Layouts de contenido

### Cuándo usar Flex vs Grid

La regla de oro:

- **Flexbox** para layouts **unidimensionales**: una fila O una columna. Cuando el contenido dicta el tamaño.
- **Grid** para layouts **bidimensionales**: filas Y columnas. Cuando el layout dicta el tamaño.

### Usos de Flexbox en este proyecto

**Fila de anuncios** — Distribuye los ítems horizontalmente con espacio entre ellos:

```css
#anuncios_ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;  /* Espacio equitativo entre ítems */
    align-items: center;
}
```

**Sección presentación** — Centra el contenido en columna:

```css
#presentacion {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
```

**Footer con iconos** — Los iconos del footer van en fila inversa (el logo queda a la izquierda aunque esté al final en el HTML):

```css
#footer1 {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-evenly;
    align-items: center;
}
```

**Tarjeta de videojuego** — Centra el contenido (imagen o vídeo) dentro de la tarjeta:

```css
.videojuego {
    width: 30vw;
    height: 30vw;
    display: flex;
    justify-content: center;
    align-items: center;
}
```

### Cheatsheet de propiedades clave

```css
/* Dirección del eje principal */
flex-direction: row | row-reverse | column | column-reverse;

/* Alineación en eje principal (horizontal si row, vertical si column) */
justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly;

/* Alineación en eje cruzado */
align-items: stretch | flex-start | flex-end | center | baseline;

/* Permite que los ítems salten de línea */
flex-wrap: nowrap | wrap | wrap-reverse;

/* En el ítem: cuánto puede crecer para ocupar espacio disponible */
flex-grow: 0 | 1 | N;

/* En el ítem: tamaño base antes de distribuir el espacio */
flex-basis: auto | 200px | 30%;
```

---

## 4. Posicionamiento con z-index

### El problema que resuelve

Cuando tienes elementos superpuestos en pantalla, necesitas controlar cuál queda por encima. Aquí entra `z-index`.

**Regla fundamental**: `z-index` solo funciona en elementos con `position` distinto de `static` (es decir: `relative`, `absolute`, `fixed` o `sticky`).

### El patrón de fondo decorativo semitransparente

Media Park usa este patrón en dos secciones (héroes y videojuegos):

```css
/* Capa 0: imagen de fondo decorativa */
#designer {
    width: 99vw;
    height: 50vw;
    position: absolute;   /* Se saca del flujo normal */
    z-index: 0;           /* Queda detrás */
    opacity: 0.2;         /* Casi transparente — efecto textura */
}

/* Capa 1: contenido real encima */
#heroes_ul {
    z-index: 1;           /* Queda delante */
    position: relative;   /* Necesario para que z-index funcione */
}
```

### Patrón reutilizable para hero sections

```css
.section-with-bg {
    position: relative;   /* Crea contexto de apilamiento */
}

.section-bg-image {
    position: absolute;
    inset: 0;             /* Equivale a top:0; right:0; bottom:0; left:0 */
    z-index: 0;
    opacity: 0.15;
    object-fit: cover;
    pointer-events: none; /* El fondo no intercepta clics */
}

.section-content {
    position: relative;
    z-index: 1;
}
```

---

## 5. Transiciones y hover effects

### Cómo funciona `transition`

```css
transition: propiedad duración función-de-tiempo retardo;
```

Cuando una propiedad cambia de valor (por ejemplo al hacer hover), en lugar de cambiar de golpe, CSS interpola entre el valor inicial y el final durante la duración especificada.

### En este proyecto

```css
.soldier {
    width: 10vw;
    height: 14vw;
    opacity: 0.5;
    transition: transform .5s;   /* Anima la propiedad transform durante 0.5s */
}

.soldier:hover {
    transform: scale(1.5);                        /* Escala al 150% */
    box-shadow: 0 0 100px var(--color-terciario); /* Glow de 100px en amarillo */
    border-radius: 5vw;
}
```

En móvil (600px) el efecto se intensifica: `scale(2)`, glow en naranja (`--color-primario`) y `opacity: 1`.

### Propiedades más eficientes para animar

El navegador puede animar cualquier propiedad CSS, pero solo dos se ejecutan en el hilo del compositor (GPU) sin repintar la página:

- `transform` (translate, scale, rotate, skew)
- `opacity`

Animar `width`, `height`, `top`, `left`, `margin` o `padding` obliga al navegador a recalcular el layout en cada frame — mucho más costoso. **Siempre prefiere `transform` y `opacity` para animaciones fluidas.**

### Patrón de tarjeta interactiva reutilizable

```css
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 8px;
}

.card:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}
```

---

## 6. Swap imagen ↔ vídeo con CSS + JS

### El patrón

En HTML tienes los dos elementos uno al lado del otro:

```html
<div id="fallout">
    <img src="./assets/fallout.jpeg" class="videojuegos" id="falloutImg">
    <video src="./assets/falloutVideo.mp4" preload="none" autoplay loop muted id="falloutVideo"></video>
</div>
```

En CSS, el vídeo está oculto por defecto. Al hacer hover en el contenedor, se intercambian:

```css
/* Estado inicial: vídeo oculto */
#fallout video {
    display: none;
    width: 30vw;
    height: 30vw;
}

/* En hover: imagen desaparece, vídeo aparece */
#fallout:hover img   { display: none; }
#fallout:hover video { display: block; }
```

### Por qué necesita JS

`preload="none"` indica al navegador que no descargue el vídeo hasta que sea necesario. Esto ahorra ancho de banda, pero tiene una consecuencia: aunque `autoplay` esté en el HTML, el vídeo no empieza solo cuando aparece vía CSS. Necesitas JS para llamar a `.play()` explícitamente:

```js
document.querySelector('#fallout').addEventListener('mouseover', function() {
    this.querySelector('video').play();  // "this" es #fallout
});

document.querySelector('#fallout').addEventListener('mouseout', function() {
    this.querySelector('video').pause();
});
```

El uso de `this.querySelector('video')` limita la búsqueda al interior del elemento que recibió el evento. Esto es scope local — si hubiera 10 vídeos en la página, solo afecta al del elemento correcto.

### Consideración sobre `display: none`

`display: none` elimina el elemento del flujo de documento — no solo lo oculta visualmente, lo quita completamente. Esto es diferente de `visibility: hidden` (que lo oculta pero mantiene su espacio) o `opacity: 0` (que lo hace invisible pero sigue siendo interactuable). Para este patrón de swap, `display: none/block` es la elección correcta.

---

## 7. @keyframes — Animación ticker

### Qué es `@keyframes`

Mientras `transition` anima entre dos estados definidos por el usuario (reposo y hover), `@keyframes` define una secuencia de estados que el navegador ejecuta automáticamente, independientemente de la interacción.

### En este proyecto

En móvil (≤600px), la barra de anuncios se convierte en un ticker que desplaza el texto de derecha a izquierda en bucle:

```css
@keyframes desplazar {
    0%   { transform: translateX(98%);   /* Empieza fuera del lado derecho */ }
    100% { transform: translateX(-156%); /* Termina fuera del lado izquierdo */ }
}

#anuncios_ul {
    animation: desplazar 10s linear infinite;
}

#anuncios {
    width: 100vw;
    overflow: hidden;  /* Oculta el contenido fuera del viewport */
}
```

### Los valores del translateX explicados

- `98%`: el `ul` empieza desplazado casi un ancho completo hacia la derecha — el primer ítem entra desde el borde derecho de la pantalla
- `-156%`: el `ul` termina desplazado 1.56 anchos hacia la izquierda — el último ítem sale por el borde izquierdo. Este valor depende del número de ítems y sus márgenes

### Propiedades de `animation`

```css
animation: nombre duración función-timing retardo iteraciones dirección;

/* Equivalente expandido: */
animation-name:            desplazar;
animation-duration:        10s;
animation-timing-function: linear;   /* Velocidad constante */
animation-delay:           0s;
animation-iteration-count: infinite;
animation-direction:       normal;
animation-fill-mode:       none;
```

### Patrón reutilizable para ticker de texto

```css
@keyframes ticker {
    from { transform: translateX(100%); }
    to   { transform: translateX(-100%); }
}

.ticker-wrapper {
    overflow: hidden;
    white-space: nowrap;  /* Impide que el texto se rompa en varias líneas */
}

.ticker-content {
    display: inline-block;
    animation: ticker 15s linear infinite;
}
```

---

## 8. @font-face — Fuentes locales

### Cuándo usar fuentes locales vs CDN

| Fuente local | CDN (Google Fonts, etc.) |
|---|---|
| No depende de terceros | Puede estar cacheada en el navegador del usuario |
| Funciona sin internet | Más fácil de mantener |
| Carga más rápida si está en el mismo servidor | Variedad enorme sin descargar nada |
| Control total sobre la fuente | Actualizaciones automáticas |
| Necesaria para fuentes propietarias o personalizadas | No sirve para fuentes únicas o personalizadas |

Media Park usa Mrs Monster, una fuente display de temática de terror/gaming no disponible en CDNs públicos, por eso se carga localmente.

### La estructura de @font-face

```css
@font-face {
    font-family: 'Monster';              /* Nombre que usarás en font-family */
    src: url('./assets/font/mrsmonster.ttf');
}
```

### Versión completa con múltiples formatos (para máxima compatibilidad)

```css
@font-face {
    font-family: 'MiFuente';
    src: url('./fonts/mifuente.woff2') format('woff2'),  /* Navegadores modernos */
         url('./fonts/mifuente.woff')  format('woff'),   /* Compatibilidad amplia */
         url('./fonts/mifuente.ttf')   format('truetype'); /* Fallback */
    font-weight: normal;
    font-style: normal;
    font-display: swap;  /* Muestra el texto con fuente del sistema mientras carga */
}
```

### Formatos de fuente

- **woff2**: Mejor compresión, solo navegadores modernos — usa esto primero
- **woff**: Buena compresión, compatible con prácticamente todo
- **ttf**: Sin compresión, legacy — solo como fallback
- **eot**: Solo Internet Explorer — ya no es necesario

### `font-display: swap`

Sin esta propiedad, el texto puede quedar invisible mientras la fuente se descarga (FOIT — Flash of Invisible Text). Con `swap`, el navegador muestra el texto con una fuente del sistema inmediatamente y luego hace el cambio cuando la fuente custom está lista (FOUT — Flash of Unstyled Text). Para proyectos de producción, siempre añade `font-display: swap`.

---

## 9. Responsive Design — Media Queries

### Qué son las media queries

Las media queries permiten aplicar bloques de CSS condicionalmente según características del dispositivo: ancho de pantalla, altura, orientación, resolución, etc.

```css
@media screen and (max-width: 800px) {
    /* Estas reglas solo se aplican si el viewport tiene 800px o menos */
}
```

### Estrategia Desktop-First vs Mobile-First

Media Park usa **desktop-first**: los estilos base están pensados para pantallas grandes, y las media queries con `max-width` van "corrigiendo" hacia pantallas más pequeñas.

La estrategia alternativa (**mobile-first**) define los estilos base para móvil y usa `min-width` para ir añadiendo complejidad hacia arriba. Mobile-first es generalmente preferible en proyectos nuevos porque obliga a priorizar el contenido esencial.

### Los dos breakpoints del proyecto

#### Breakpoint 800px — Tablet

```css
@media screen and (max-width: 800px) {
    /* Los enlaces de texto del navbar desaparecen */
    .tabletnav { display: none; }

    /* El grid de 9 columnas se convierte en Flexbox lineal */
    body > header > nav > ul {
        display: flex;
        flex-wrap: nowrap;
        flex-direction: row;
        gap: 8vw;
    }

    /* Los héroes pasan a Grid 4×2 */
    #heroes_ul {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: 1fr 1fr;
    }
}
```

#### Breakpoint 600px — Móvil

```css
@media screen and (max-width: 600px) {
    /* El ticker de anuncios se activa */
    @keyframes desplazar { ... }
    #anuncios_ul { animation: desplazar 10s linear infinite; }

    /* El navbar vuelve a Grid pero con 5 columnas y 2 filas */
    #ul_nav {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: 1fr 1fr;
    }

    /* El buscador ocupa toda la segunda fila */
    #Search {
        grid-row: 2;
        grid-column: 1 / -1;  /* De la primera a la última línea */
    }

    /* Los héroes pasan a Grid 2×4 con fondo de imagen en cada celda */
    #heroes_ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(4, 1fr);
    }
    .heroes_li {
        background-image: url('./assets/Wall(2).jpeg');
        background-size: cover;
        width: 50vw;
        height: 50vw;
    }
}
```

### Cómo adaptar el grid de 9 columnas a otras pantallas

El reto principal del navbar es que 9 columnas no caben en pantallas pequeñas. La solución usada en Media Park:

1. **Desktop**: Grid 9×2 con posicionamiento manual de cada ítem
2. **Tablet**: Flexbox — ocultar los elementos de texto, los iconos se distribuyen en fila automáticamente
3. **Móvil**: Grid 5×2 — el buscador baja a la segunda fila ocupando todo el ancho

### Patrón de breakpoints recomendados para proyectos nuevos

```css
/* Mobile first */
/* Base: móvil (<600px) */

@media screen and (min-width: 600px) {
    /* Tablet vertical */
}

@media screen and (min-width: 900px) {
    /* Tablet horizontal / laptop pequeño */
}

@media screen and (min-width: 1200px) {
    /* Desktop */
}

@media screen and (min-width: 1600px) {
    /* Desktop grande */
}
```

---

## Resumen — Qué técnica usar para qué

| Situación | Técnica |
|---|---|
| Layout con filas y columnas | CSS Grid |
| Layout en una sola dirección | Flexbox |
| Colores y valores reutilizables | Variables CSS |
| Animar interacciones del usuario | `transition` |
| Animar de forma automática y continua | `@keyframes` + `animation` |
| Superponer elementos | `position` + `z-index` |
| Fuentes no disponibles en CDN | `@font-face` |
| Adaptar layout a distintos dispositivos | Media Queries |
| Intercambiar elementos al hover | `display: none/block` en `:hover` |
| Controlar reproducción de media | `addEventListener` + `.play()/.pause()` |
