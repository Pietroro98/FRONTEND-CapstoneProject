import './App.css';
import HeroSection from './Components/Hero/HeroSection';
import AboutSection from './Components/Main/AboutSection';
import MyNavBar from './Components/Mynav/MyNavBar';

function App() {
  return (
    <div className="App">
      <MyNavBar/>
      <HeroSection/>
      <AboutSection/>
    </div>
  );
}

export default App;
