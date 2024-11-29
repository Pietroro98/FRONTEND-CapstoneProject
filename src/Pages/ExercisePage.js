import "../App.css";
import ExerciseNavbar from "../Components/ExerciseComponent/ExerciseNavbar";
import SearchExercise from "../Components/ExerciseComponent/SearchExercise";
import { useEffect } from "react";

function ExercisePage() {
  useEffect(() => {
    document.body.classList.add("bg-black", "text-light");
  }, []);
  
  return (
    <div className="App ">
      <ExerciseNavbar />
      <SearchExercise />
    </div>
  );
}

export default ExercisePage;
