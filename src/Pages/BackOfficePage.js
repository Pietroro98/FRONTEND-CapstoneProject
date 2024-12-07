import React, {useEffect} from "react";
import "../App.css";
import BackofficeNavbar from "../Components/BackOfficeComponents/BackofficeNavbar";
import WorkoutPlan from "../Components/BackOfficeComponents/WorkoutPlan";
import AddExerciseToWorkoutPlan from "../Components/BackOfficeComponents/AddExerciseToWorkoutPlan";
import WorkoutPlanDetails from "../Components/BackOfficeComponents/WorkoutPlanDetails";


function BackOfficePage() {
    useEffect(() => {
      document.body.classList.add("bg-black", "text-light");
    }, []);
    
    return (
      <div className="App ">
        <BackofficeNavbar/>
        <WorkoutPlan/>
        <AddExerciseToWorkoutPlan/>
        <WorkoutPlanDetails/>
      </div>
    );
  }
  
  export default BackOfficePage;
  
