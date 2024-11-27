import './App.css';
import HeroSection from './Components/Hero/HeroSection';
import AboutSection from './Components/Main/AboutSection';
import ServiceSection from './Components/Main/ServiceSection';
import MyNavBar from './Components/Mynav/MyNavBar';

function App() {
  return (
    <div className="App">
      <MyNavBar/>
      <HeroSection/>
      <AboutSection/>
      <ServiceSection/>
    </div>
  );
}

export default App;
