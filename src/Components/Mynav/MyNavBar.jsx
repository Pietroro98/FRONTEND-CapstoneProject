import React from "react";
import "./MyNavBar.css";
import { motion } from "framer-motion";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import NavbarButton from "../Buttons/NavbarButton";

function MyNavBar() {
  return (
    <Navbar expand="lg" className="position-absolute w-100 z-2">
      <Container>
        <motion.a
          className="navbar-brand text-light"
          href="./"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <FontAwesomeIcon
            className="me-2"
            icon={faDumbbell}
            size="xl"
            style={{ color: "#763abb" }}
          />
          Ghysa <span className="text-uppercase fw-bold text-purple">Gym</span>
        </motion.a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="p-3 p-lg-0 mt-2 mt-lg-0">
          <motion.ul
          className="navbar-nav me-auto justify-content-end w-100"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          >
            <Nav.Link href="#"
            className="text-light text-uppercase">Home</Nav.Link>
            <Nav.Link href="#info"
            className="text-light text-uppercase">Info</Nav.Link>
            <Nav.Link href="#Servizi"
            className="text-light text-uppercase">Servizi</Nav.Link>
            <Nav.Link href="#Contatti"
            className="text-light text-uppercase">Contatti</Nav.Link>
          </motion.ul>
          <motion.div
          className="ms-0 ms-lg-2 mt-3 mt-lg-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          >
            <NavbarButton btnTitle="Inizia subito"></NavbarButton>
          </motion.div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavBar;
