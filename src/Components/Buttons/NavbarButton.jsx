import React from "react";
import "./NavbarButton.css";

function NavbarButton(props) {
  return(
    <a href="./" className="nav-btn border-0 text-capitalize text-light text-nowrap text-decoration-none rounded-1">{props.btnTitle}</a>

  )
}

export default NavbarButton;
