import "./App.css";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register";
import ExercisePage from "./Pages/ExercisePage";
import WorkoutPlanPage from "./Pages/WorkoutPlanPage";
import BackOfficePage from "./Pages/BackOfficePage";
// import CalcolatorePage from "./Pages/CalcolatorePgae";
import AccountPage from "./Pages/AccountPage";


function App() {
  return (
    <Router>
    <div className="App">
    <Routes>  
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/esercizi" element={<ExercisePage />} />
          <Route path="/scheda-allenamento" element={<WorkoutPlanPage />} />
          <Route path="/backoffice" element={<BackOfficePage />}/>
          {/* <Route path="/calcolatore" element={<CalcolatorePage />}/> */}
          <Route path="/account" element={<AccountPage />}/>
        </Routes>
    </div>
    </Router>
  );
}

export default App;
