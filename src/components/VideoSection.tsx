import React from "react";

const VideoGamesSection: React.FC = () => {
  return (
    <section>
      <article id="articleVideojuegos">
        <img src="/assets/(1).jpeg" alt="fondos" id="fondoVideojuegos" />
        <h2>Escoge tu Mundo</h2>
        <ul id="Videojuegos">
          <li className="videojuego" id="fallout">
            <h3>Fallout</h3>
            <div>
              <img src="/assets/fallout.jpeg" alt="Fallout" className="videojuegos" />
              <video src="/assets/falloutVideo.mp4" preload="none" autoPlay loop muted></video>
            </div>
          </li>
          <li className="videojuego" id="diablo">
            <h3>Diablo</h3>
            <div>
              <img src="/assets/diablo.jpeg" alt="Diablo" className="videojuegos" />
              <video src="/assets/falloutVideo.mp4" preload="none" autoPlay loop muted></video>
            </div>
          </li>
        </ul>
      </article>
    </section>
  );
};

export default VideoGamesSection;
