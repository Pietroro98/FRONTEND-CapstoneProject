import { useEffect } from "react";
import ExerciseNavbar from "../Components/ExerciseComponent/ExerciseNavbar";
import "../App.css";
import MyWorkoutPlan from "../Components/ExerciseComponent/MyWorkoutPlan";

function WorkoutPlanPage() {
    useEffect(() => {
      document.body.classList.add("bg-black", "text-light");
    }, []);
    
    return (
      <div className="App ">
        <ExerciseNavbar />
        {/* <WorkoutPlan/>
        <AddExerciseToWorkoutPlan/>
        <WorkoutPlanDetails/> */}
        <MyWorkoutPlan/>
      </div>
    );
  }
  
  export default WorkoutPlanPage;