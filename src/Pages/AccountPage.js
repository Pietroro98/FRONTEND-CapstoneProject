import "../App.css";
import { useEffect } from "react";
import Account from "../Components/Account/Account";
import ExerciseNavbar from "../Components/ExerciseComponent/ExerciseNavbar";


function AccountPage() {
  useEffect(() => {
    document.body.classList.add("bg-black", "text-light");
  }, []);
  
  return (
    <div className="App ">
        <ExerciseNavbar/>
        <Account/>
    </div>
  );
}

export default AccountPage;
