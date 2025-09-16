import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section id="presentacionPrincipal">
      <article id="presentacion">
        <div id="soldadoPresentacion">
          <h1>Media Park un mundo apocalíptico</h1>
          <img src="/assets/soldier.png" id="soldado" />
        </div>
        <div id="video">
          <video src="/assets/falloutVideo.mp4" autoPlay loop muted id="videoFondo"></video>
        </div>
      </article>
    </section>
  );
};

export default HeroSection;
