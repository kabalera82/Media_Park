import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      <section id="footer">
        <h2>Siguenos en Redes</h2>
        <article id="footer1">
          <img src="/assets/x.png" alt="X" className="footImg" id="x" />
          <img src="/assets/f.png" alt="Facebook" className="footImg" id="Facebook" />
          <img src="/assets/i.png" alt="insta" className="footImg" id="instagram" />
          <img src="/assets/r.png" alt="redit" className="footImg" id="reddit" />
          <img src="/assets/y.png" alt="videos" className="footImg" id="youtube" />
          <img src="/assets/Media Park.jpg" alt="media" className="footImg" id="logoFooter" />
        </article>
      </section>
    </footer>
  );
};

export default Footer;
