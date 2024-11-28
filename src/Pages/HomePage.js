import MyNavBar from "../Components/Mynav/MyNavBar";
import HeroSection from "../Components/Hero/HeroSection";
import AboutSection from "../Components/Main/AboutSection";
import ServiceSection from "../Components/Main/ServiceSection";
import FooterSection from "../Components/Main/FooterSection";
import "../App.css";


function HomePage() {
  return (
    <div className="App">
      <MyNavBar />
      <HeroSection />
      <AboutSection />
      <ServiceSection />
      <FooterSection />
    </div>
  );
}

export default HomePage;
