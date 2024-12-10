import "../App.css";
import { useEffect } from "react";
import Account from "../Components/Account/Account";
import AccountNavbar from "../Components/Account/AccountNavbar";

function AccountPage() {
  useEffect(() => {
    document.body.classList.add("bg-black", "text-light");
  }, []);
  
  return (
    <div className="App ">
        <AccountNavbar/>
        <Account/>
    </div>
  );
}

export default AccountPage;
