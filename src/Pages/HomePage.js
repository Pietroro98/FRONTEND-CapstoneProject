import "./App.css";
import HeroSection from "./Components/Hero/HeroSection";
import AboutSection from "./Components/Main/AboutSection";
import ServiceSection from "./Components/Main/ServiceSection";
import MyNavBar from "./Components/Mynav/MyNavBar";
import FooterSection from "./Components/Main/FooterSection";
function App() {
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

export default App;
