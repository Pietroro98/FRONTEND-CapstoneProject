import { useEffect } from "react";
import ExerciseNavbar from "../Components/ExerciseComponent/ExerciseNavbar";
import "../App.css";
import WorkoutPlan from "../Components/ExerciseComponent/WorkoutPlan";
function WorkoutPlanPage() {
    useEffect(() => {
      document.body.classList.add("bg-black", "text-light");
    }, []);
    
    return (
      <div className="App ">
        <ExerciseNavbar />
        <WorkoutPlan/>
      </div>
    );
  }
  
  export default WorkoutPlanPage;