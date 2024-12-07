import React, {useEffect} from "react";
import "../App.css";
import ExerciseNavbar from "../Components/ExerciseComponent/ExerciseNavbar";
import WorkoutPlanDetails from "../Components/ExerciseComponent/WorkoutPlanDetails";
import WorkoutPlan from "../Components/ExerciseComponent/WorkoutPlan";
import AddExerciseToWorkoutPlan from "../Components/ExerciseComponent/AddExerciseToWorkoutPlan";


function BackOfficePage() {
    useEffect(() => {
      document.body.classList.add("bg-black", "text-light");
    }, []);
    
    return (
      <div className="App ">
        {/* <ExerciseNavbar /> */}
        <WorkoutPlan/>
        <AddExerciseToWorkoutPlan/>
        <WorkoutPlanDetails/>
      </div>
    );
  }
  
  export default BackOfficePage;
  
