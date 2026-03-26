/*
    ==========================================
    PATRÓN PRINCIPAL: Control de vídeo con eventos del ratón
    ==========================================

    ¿Por qué mouseover/mouseout y no :hover en CSS?

    CSS :hover es perfecto para cambios visuales puros (colores, sombras, escalado).
    Pero aquí necesitamos llamar a métodos de la API HTMLVideoElement:
        - video.play()  → arranca la reproducción
        - video.pause() → la detiene

    Estos métodos NO existen en CSS. CSS no puede ejecutar lógica —
    solo puede cambiar propiedades de estilo. Para llamar a un método de un
    elemento del DOM necesitamos JavaScript imperativamente.

    Por eso el patrón es:
        1. CSS controla qué se VE (imagen vs vídeo, visibilidad, transiciones).
        2. JS controla qué se EJECUTA (play/pause del vídeo).
    Cada herramienta hace lo que le corresponde — separación de responsabilidades.

    ==========================================
    PATRÓN: querySelector + this + querySelector anidado
    ==========================================

    document.querySelector('#fallout') selecciona el <li id="fallout">,
    que es el CONTENEDOR de toda la tarjeta (título + imagen + vídeo).

    ¿Por qué seleccionar el contenedor y no el vídeo directamente?
    - El área de interacción es MÁS GRANDE: el usuario activa el hover
      al pasar por cualquier parte de la tarjeta, no solo por encima del vídeo.
    - Es más tolerante: el ratón puede moverse entre la imagen y el vídeo
      sin que se interrumpa la reproducción (no hay "zona muerta").

    Dentro del listener, this.querySelector('video') busca el <video>
    SOLO dentro del contenedor que recibió el evento.
    Si usáramos document.querySelector('video'), seleccionaría el PRIMER
    vídeo del documento entero — que podría ser el vídeo de fondo del hero,
    no el de Fallout. El scope local (this) es la clave de la precisión.
*/

// ==========================================
// TARJETA: Fallout
// ==========================================

/*
    [TÉCNICA] addEventListener('mouseover', ...) vs onmouseover = ...
    addEventListener es la forma moderna y correcta porque:
    - Permite múltiples listeners en el mismo elemento y evento.
    - No sobreescribe listeners anteriores (onmouseover sí lo haría).
    - Es más fácil de eliminar con removeEventListener cuando ya no se necesita.

    El segundo argumento es una función anónima (function() {}).
    Dentro de ella, "this" referencia al elemento que disparó el evento:
    el <li id="fallout">. Es la forma clásica de acceder al elemento emisor.
    (Con arrow functions, this NO funcionaría igual — capturaría el contexto
    exterior. Por eso aquí se usa function() y no () => {}.)
*/
document.querySelector('#fallout').addEventListener('mouseover', function() {
    /*
        [TÉCNICA] this.querySelector('video') busca el primer <video>
        DESCENDIENTE de este <li>. Scope local, no global.
        El resultado es el elemento <video id="falloutVideo">.
        .play() es un método de la API HTMLVideoElement que arranca la reproducción
        y devuelve una Promise (aunque aquí no se gestiona — para producción,
        debería manejarse con .catch() por si el navegador bloquea el autoplay).
    */
    this.querySelector('video').play();
});

/*
    [TÉCNICA] mouseout se dispara cuando el ratón SALE del elemento.
    Complementa a mouseover: cuando el usuario deja de hacer hover sobre
    la tarjeta, el vídeo se pausa.

    Nota sobre mouseout vs mouseleave:
    - mouseout se dispara también al entrar en elementos HIJOS del contenedor
      (burbujeo de eventos). Puede causar parpadeos si el ratón pasa del <li>
      al <h3> o al <img> dentro de él.
    - mouseleave NO burbujea — solo se dispara al salir del elemento real,
      ignorando los hijos. Es más estable para este patrón.
    En este proyecto se usa mouseout, que es más simple aunque menos preciso.
*/
document.querySelector('#fallout').addEventListener('mouseout', function() {
    /*
        .pause() detiene la reproducción sin resetear la posición del vídeo.
        El vídeo queda "pausado" en el frame actual.
        Si quisieramos que volviera al inicio al salir, usaríamos:
            const v = this.querySelector('video');
            v.pause();
            v.currentTime = 0;
    */
    this.querySelector('video').pause();
});

// ==========================================
// TARJETA: Diablo
// ==========================================

/*
    [TÉCNICA] Patrón idéntico al de Fallout, pero para el <li id="diablo">.
    Esto muestra un patrón repetitivo que en una aplicación más grande
    se refactorizaría en una función reutilizable:

        function bindVideoHover(selector) {
            const el = document.querySelector(selector);
            el.addEventListener('mouseover', function() { this.querySelector('video').play(); });
            el.addEventListener('mouseout',  function() { this.querySelector('video').pause(); });
        }

        bindVideoHover('#fallout');
        bindVideoHover('#diablo');

    O aún mejor, con querySelectorAll para seleccionar TODOS los contenedores
    de vídeo a la vez, sin repetir código:

        document.querySelectorAll('.videojuego[id]').forEach(function(card) {
            card.addEventListener('mouseover', function() { this.querySelector('video').play(); });
            card.addEventListener('mouseout',  function() { this.querySelector('video').pause(); });
        });

    La versión actual con ids individuales es más explícita y más fácil de
    entender cuando se está aprendiendo — cada juego queda claro y separado.
*/
document.querySelector('#diablo').addEventListener('mouseover', function() {
    this.querySelector('video').play();
});

document.querySelector('#diablo').addEventListener('mouseout', function() {
    this.querySelector('video').pause();
});
