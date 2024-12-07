import React, { useState, useEffect } from "react";
import "../App.css";
import BackofficeNavbar from "../Components/BackOfficeComponents/BackofficeNavbar";
import WorkoutPlan from "../Components/BackOfficeComponents/WorkoutPlan";
import AddExerciseToWorkoutPlan from "../Components/BackOfficeComponents/AddExerciseToWorkoutPlan";
import WorkoutPlanDetails from "../Components/BackOfficeComponents/WorkoutPlanDetails";
import CreateExercise from "../Components/BackOfficeComponents/CreateExercise";

function BackOfficePage() {
  const [currentPage, setCurrentPage] = useState("Crea Scheda");

  useEffect(() => {
    document.body.classList.add("bg-black", "text-light");
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "Crea Scheda":
        return <WorkoutPlan />;
      case "Aggiungi Esercizio alla scheda":
        return <AddExerciseToWorkoutPlan />;
      case "Schede utenti":
        return <WorkoutPlanDetails />;
      case "Crea esercizio":
        return <CreateExercise />;
      default:
        return <WorkoutPlan />;
    }
  };

  return (
    <div className="App">
      <BackofficeNavbar onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export default BackOfficePage;
