import "./App.css";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";

function App() {
  return (
    <Router>
    <div className="App">
    <Routes>  {/* Usa <Routes> per definire le rotte */}
          <Route path="/" element={<HomePage />} />  {/* La rotta per la HomePage */}
          <Route path="/login" element={<Login />} />  {/* La rotta per la Login */}
          <Route path="/register" element={<Register />} />
        </Routes>
     


    </div>
    </Router>
  );
}

export default App;
