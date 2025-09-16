import React from "react";
import Header from "./components/Footer.tsx";
import HeroSection from "./components/HeroSection.tsx";
import VideoGamesSection from "./components/VideoSection.tsx";
import Footer from "./components/Footer.tsx";
import Nav from "./components/Nav.tsx";
import "./style.css";

const App: React.FC = () => {
  return (
    <>
      <Nav />
      <Header />
      <main id="Main">
        <HeroSection />
        <VideoGamesSection />
      </main>
      <Footer />
    </>
  );
};

export default App;