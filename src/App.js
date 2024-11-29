import "./App.css";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import ExercisePage from "./Pages/ExercisePage";

function App() {
  return (
    <Router>
    <div className="App">
    <Routes>  {/* Usa <Routes> per definire le rotte */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/exercise" element={<ExercisePage />} />

        </Routes>
     


    </div>
    </Router>
  );
}

export default App;
