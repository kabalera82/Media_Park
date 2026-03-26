# Media Park

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20%7C%20Tablet%20%7C%20Desktop-brightgreen)
![Status](https://img.shields.io/badge/Status-En%20desarrollo-orange)

Web de entretenimiento gaming con selección de héroes, catálogo de videojuegos con preview en vídeo al hacer hover, y diseño responsive completo. Temática oscura con paleta naranja/amarillo sobre fondo negro.

---

## Vista previa

La web está estructurada en cuatro grandes bloques visuales:

**Navbar** — Cabecera en dos filas con CSS Grid de 9 columnas. Fila superior con los enlaces de navegación (Héroes, Videojuegos, Bandas Sonoras, Merchandising, Noticias, Mundo, Foros, Comunidad, Aplicaciones). Fila inferior con el icono de menú hamburguesa, el logo central de Media Park, una barra de búsqueda con fondo amarillo, y los iconos de usuario y carrito. En móvil el grid se simplifica y el buscador baja a una segunda fila.

**Barra de anuncios** — Banda horizontal en negro con ítems en naranja y mayúsculas: Novedades, Actualizaciones, Ofertas Especiales, Season Pass, Cuestionarios. En móvil se convierte en un ticker animado que desplaza el contenido de derecha a izquierda.

**Sección Héroes** — Fondo decorativo semitransparente (`Designer.jpg` con `opacity: 0.2`). Ocho personajes (Skeleton, Counter, Alexa, Pumpkin, Scull, Firedeath, Vegas, Orkus) dispuestos en grid flexible. Al hacer hover la imagen escala 1.5x con glow naranja/amarillo.

**Sección Videojuegos** — Fondo decorativo propio con `opacity: 0.1`. Dos tarjetas (Fallout y Diablo) de 30vw × 30vw. En reposo muestran la imagen del juego; al hacer hover la imagen desaparece y aparece el vídeo reproduciéndose automáticamente.

**Footer** — Barra inferior con el logo de Media Park y los iconos de redes sociales (X, Facebook, Instagram, Reddit, YouTube) distribuidos con Flexbox.

---

## Características

- **Navbar responsive** con CSS Grid de 9 columnas en desktop, Flexbox en tablet y Grid de 5 columnas en móvil
- **8 héroes seleccionables** con efecto hover de escala y box-shadow luminoso
- **2 videojuegos con swap imagen → vídeo** al hacer hover, controlado con CSS (`display: none/block`) y JavaScript (`.play()` / `.pause()`)
- **Barra de anuncios con ticker animado** en móvil mediante `@keyframes` y `translateX`
- **Fuente personalizada Mrs Monster** cargada localmente con `@font-face` (17 variantes incluidas)
- **Paleta de color configurable** con 5 variables CSS en `:root`
- **Diseño responsive en 3 breakpoints**: desktop (>800px), tablet (≤800px) y móvil (≤600px)
- **Vídeo de fondo** en la sección de presentación principal (autoplay, loop, muted)
- **Fondos decorativos semitransparentes** con `position: absolute` y `z-index` para capas de profundidad

---

## Estructura del proyecto

```
Media_Park/
├── index.html          # Estructura HTML de la web
├── style.css           # Todos los estilos — Grid, Flexbox, animaciones, responsive
├── index.js            # Lógica de interacción — play/pause de vídeos en hover
├── docs/
│   └── guia-css-tecnicas.md   # Guía de técnicas CSS del proyecto
└── assets/
    ├── font/
    │   ├── mrsmonster.ttf      # Fuente principal usada en el proyecto
    │   └── ...                 # 16 variantes adicionales de Mrs Monster
    ├── Media Park.jpg          # Logo principal
    ├── menu.svg                # Icono hamburguesa navbar
    ├── persona.svg             # Icono usuario navbar
    ├── carrito.svg             # Icono carrito navbar
    ├── search.svg              # Icono lupa navbar
    ├── soldier.png             # Soldado decorativo sección presentación
    ├── Soldier1.png            # Héroe: Skeleton
    ├── Soldier2.png            # Héroe: Counter
    ├── Soldier3.png            # Héroe: Alexa
    ├── Soldier4.png            # Héroe: Pumpkin
    ├── Soldier5.png            # Héroe: Scull
    ├── Soldier6.png            # Héroe: Firedeath
    ├── soldier7.png            # Héroe: Vegas
    ├── Soldier8.png            # Héroe: Orkus
    ├── Designer.jpg            # Fondo decorativo sección héroes
    ├── fallout.jpeg            # Portada del videojuego Fallout
    ├── diablo.jpeg             # Portada del videojuego Diablo
    ├── falloutVideo.mp4        # Vídeo preview (usado en Fallout y Diablo)
    ├── (1).jpeg                # Fondo decorativo sección videojuegos
    ├── Wall(2).jpeg            # Fondo de tarjeta héroe en móvil
    ├── x.png                   # Icono red social X (Twitter)
    ├── f.png                   # Icono Facebook
    ├── i.png                   # Icono Instagram
    ├── r.png                   # Icono Reddit
    ├── y.png                   # Icono YouTube
    └── Untitled.jpg            # Favicon
```

---

## Técnicas CSS utilizadas

Este proyecto es una guía práctica de CSS moderno. Cada sección de la web aplica una técnica diferente de forma intencionada.

### CSS Grid

**Navbar en desktop** — Grid de 9 columnas con dos filas. Cada ítem del menú se posiciona manualmente con `grid-row` y `grid-column`. El logo ocupa las columnas 1 a 4 con `grid-column: 1/4`. La barra de búsqueda ocupa las columnas 4 a 8 con `grid-column: 4/8`.

```css
body > header > nav > ul {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(9, 1fr);
}
#Logo { grid-row: 2; grid-column: 1/4; }
#Search { grid-row: 2; grid-column: 4/8; }
```

**Grid de héroes en tablet** — En el breakpoint de 800px, la lista de héroes pasa de Flexbox a un Grid de 4 columnas × 2 filas para organizar los 8 personajes de forma perfectamente alineada.

```css
@media screen and (max-width: 800px) {
    #heroes_ul {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: 1fr 1fr;
    }
}
```

**Grid de héroes en móvil** — En 600px se reduce a 2 columnas × 4 filas.

### Flexbox

Flexbox se usa donde el flujo es unidimensional:

- `#anuncios_ul` — Fila horizontal de anuncios con `justify-content: space-between`
- `#articleHeroes` — Columna vertical que agrupa fondo + título + lista de héroes
- `#Videojuegos` — Fila de tarjetas de videojuegos con `gap: 5vw`
- `#footer` y `#footer1` — Footer en columna, iconos en fila inversa con `flex-direction: row-reverse`
- `#presentacion` — Sección de presentación centrada en columna

### Variables CSS (Custom Properties)

Toda la paleta de color está centralizada en `:root`. Para cambiar el tema completo de la web basta con modificar estos 5 valores:

```css
:root {
    --color-primario:    rgba(247, 68,  1, 1);   /* Naranja — texto principal */
    --color-secundario:  rgba(246, 160, 23, 1);   /* Naranja claro */
    --color-terciario:   rgba(253, 199, 39, 1);   /* Amarillo — barra de búsqueda */
    --color-cuaternario: rgb(0, 0, 0);             /* Negro — fondos */
    --color-quintenario: rgb(27, 12, 5);           /* Negro cálido — alternativo */
}
```

### Animaciones y transiciones

**Hover de héroes** — `transition: transform .5s` en la imagen del soldado. El hover aplica `scale(1.5)` y un `box-shadow` de 100px con color amarillo para simular un aura luminosa.

**Ticker de anuncios en móvil** — `@keyframes desplazar` mueve el `ul` de `translateX(98%)` a `translateX(-156%)` en 10 segundos en bucle infinito. El contenedor tiene `overflow: hidden` para que el texto entre y salga del marco limpiamente.

```css
@keyframes desplazar {
    0%   { transform: translateX(98%); }
    100% { transform: translateX(-156%); }
}
```

### Swap imagen ↔ vídeo con CSS + JS

En reposo, el vídeo está oculto con `display: none`. Al hacer hover con CSS, la imagen se oculta y el vídeo aparece. JavaScript controla `.play()` y `.pause()` porque el atributo `preload="none"` impide la reproducción automática hasta que el usuario interactúa.

```css
#fallout:hover img   { display: none; }
#fallout:hover video { display: block; }
```

```js
document.querySelector('#fallout').addEventListener('mouseover', function() {
    this.querySelector('video').play();
});
```

### Posicionamiento con z-index

Patrón recurrente en el proyecto: imagen de fondo decorativa con `position: absolute`, `opacity: 0.1–0.2` y `z-index: 0`, sobre la que flota el contenido real con `z-index: 1`.

### @font-face

Fuente Mrs Monster cargada desde archivos locales en `assets/font/`. La carpeta incluye 17 variantes (regular, italic, bold, condensed, expanded, 3D, rotated...).

```css
@font-face {
    font-family: 'Monster';
    src: url('./assets/font/mrsmonster.ttf');
}
```

### Responsive Design

Estrategia **desktop-first** con dos breakpoints:

| Breakpoint | Dispositivo | Cambios principales |
|---|---|---|
| `max-width: 800px` | Tablet | Menú de texto oculto, navbar en Flexbox, héroes en Grid 4×2 |
| `max-width: 600px` | Móvil | Navbar en Grid 5×2, buscador en segunda fila, ticker animado, héroes en Grid 2×4 con fondo de imagen |

---

## Técnicas JavaScript utilizadas

El archivo `index.js` es deliberadamente minimalista — solo 16 líneas — y demuestra tres conceptos clave:

- **`addEventListener`** con los eventos `mouseover` y `mouseout` para detectar cuando el cursor entra y sale de cada tarjeta de videojuego
- **`querySelector` dentro de `this`** para hacer scope local y seleccionar el `<video>` que está DENTRO del elemento que recibió el evento, sin afectar a otros vídeos de la página
- **Control de `HTMLVideoElement`** con los métodos nativos `.play()` (devuelve una Promise) y `.pause()`

---

## Cómo usar

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/Media_Park.git
   ```
2. Abrir `index.html` directamente en el navegador — no necesita servidor ni dependencias
3. O usar la extensión **Live Server** en VS Code para recarga en caliente

---

## Personalización

### Cambiar la paleta de color

Abre `style.css` y modifica las 5 variables en `:root`. El cambio se propaga automáticamente a toda la web:

```css
:root {
    --color-primario:    rgba(0, 200, 100, 1);   /* Verde en lugar de naranja */
    --color-cuaternario: rgb(10, 10, 20);          /* Azul muy oscuro en lugar de negro */
}
```

### Añadir un héroe nuevo

Copia un `<li>` existente dentro de `#heroes_ul` en `index.html` y cambia el nombre, el id y la imagen:

```html
<li class="heroes_li" id="heroe9">NuevoHeroe
    <img src="./assets/SoldierNuevo.png" alt="NuevoHeroe" class="soldier" id="soldier9">
</li>
```

### Añadir un videojuego nuevo

Copia el bloque de `fallout` en `index.html`, cambia los ids y las rutas de imagen y vídeo, y añade los dos `addEventListener` correspondientes en `index.js`:

```html
<li class="videojuego" id="nuevojuego">
    <h3>Nuevo Juego</h3>
    <div class="videojuego" id="nuevojuego">
        <img src="./assets/nuevojuego.jpeg" alt="Nuevo Juego" class="videojuegos">
        <video src="./assets/nuevojuegoVideo.mp4" preload="none" autoplay loop muted></video>
    </div>
</li>
```

```js
document.querySelector('#nuevojuego').addEventListener('mouseover', function() {
    this.querySelector('video').play();
});
document.querySelector('#nuevojuego').addEventListener('mouseout', function() {
    this.querySelector('video').pause();
});
```

Y en `style.css`, añade las reglas de swap:

```css
#nuevojuego video       { display: none; width: 30vw; height: 30vw; }
#nuevojuego:hover img   { display: none; }
#nuevojuego:hover video { display: block; }
```

---

## Roadmap

- [ ] Menú hamburguesa funcional en móvil (actualmente el icono existe pero no tiene funcionalidad)
- [ ] Más videojuegos en el catálogo
- [ ] Página de detalle individual por héroe
- [ ] Animaciones de entrada con scroll reveal
- [ ] Accesibilidad: `aria-label` en iconos del navbar
- [ ] Corrección de ids duplicados en el HTML (`#heroe5` × 4, `#fallout` duplicado)

---

## Sobre el proyecto

Media Park es mi primer proyecto frontend completo. Nació con un objetivo claro: entender CSS de verdad, sin atajos. Cada sección de la web fue diseñada para practicar una técnica concreta — Grid en el navbar, Flexbox en los layouts de contenido, variables para el tema, animaciones en los héroes, responsive manual sin frameworks. El resultado es una web de temática gaming apocalíptica que también funciona como cuaderno de aprendizaje. Está en desarrollo, y cada nueva funcionalidad que añada vendrá con una técnica nueva que aprender.

---

## Licencia

MIT — libre para usar, modificar y aprender de él.
