import React from "react";
import HeroSection from "../Components/Hero/HeroSection";
import AboutSection from "../Components/Main/AboutSection";
import ServiceSection from "../Components/Main/ServiceSection";
import MyNavBar from "../Components/Mynav/MyNavBar";
import FooterSection from "../Components/Main/FooterSection";

const HomePage = () => {
  return (
    <div className="App">
      <MyNavBar />
      <HeroSection />
      <AboutSection />
      <ServiceSection />
      <FooterSection />
    </div>
  );
};

export default HomePage;