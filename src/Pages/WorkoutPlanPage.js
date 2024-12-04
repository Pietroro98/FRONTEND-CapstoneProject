import { useEffect } from "react";
import ExerciseNavbar from "../Components/ExerciseComponent/ExerciseNavbar";
import "../App.css";
import WorkoutPlan from "../Components/ExerciseComponent/WorkoutPlan";
import AddExerciseToWorkoutPlan from "../Components/ExerciseComponent/AddExerciseToWorkoutPlan";
function WorkoutPlanPage() {
    useEffect(() => {
      document.body.classList.add("bg-black", "text-light");
    }, []);
    
    return (
      <div className="App ">
        <ExerciseNavbar />
        <WorkoutPlan/>
        <AddExerciseToWorkoutPlan/>
      </div>
    );
  }
  
  export default WorkoutPlanPage;