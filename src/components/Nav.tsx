import React from "react";

const Nav: React.FC = () => {
  return (
    <nav>
      <ul id="ul_nav">
        <li id="Menu">
          <a href="#" id="menu">
            <img src="/assets/menu.svg" alt="Media Park menu" id="imgmenu" />
          </a>
        </li>
        <li id="Logo">
          <a href="#" id="logo">
            <img src="/assets/Media Park.jpg" alt="Media Park Logo" id="imglogo" />
          </a>
        </li>
        {/* Resto de li ... */}
      </ul>
    </nav>
  );
};

export default Nav;
