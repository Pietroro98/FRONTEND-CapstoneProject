import { useEffect } from "react";
import ExerciseNavbar from "../Components/ExerciseComponent/ExerciseNavbar";
import "../App.css";
import WorkoutPlan from "../Components/ExerciseComponent/WorkoutPlan";
import AddExerciseToWorkoutPlan from "../Components/ExerciseComponent/AddExerciseToWorkoutPlan";
import WorkoutPlanDetails from "../Components/ExerciseComponent/WorkoutPlanDetails";
function WorkoutPlanPage() {
    useEffect(() => {
      document.body.classList.add("bg-black", "text-light");
    }, []);
    
    return (
      <div className="App ">
        <ExerciseNavbar />
        <WorkoutPlan/>
        <AddExerciseToWorkoutPlan/>
        <WorkoutPlanDetails/>
      </div>
    );
  }
  
  export default WorkoutPlanPage;