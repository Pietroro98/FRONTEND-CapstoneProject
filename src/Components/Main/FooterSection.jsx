import React from "react";
import "./FooterSection.css";
import Container from "react-bootstrap/Container";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faArrowUp } from "@fortawesome/free-solid-svg-icons";

function FooterSection() {
  return (
    <div
      className="footer-section py-5 position-relative text-light"
      id="contatti"
    >
      <motion.div
        className="bg-shape position-absolute"
        initial={{ opacity: 0, x: -300 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      ></motion.div>
     <Container>
      <div className="row">
        <div className="col-md-4 z-2">
          <h2 className="text-start text-capitalize fw-bold">
            Alleniamoci Insieme:
          </h2>
          <p className="text-start">&copy; Romano Pietro</p>
          <a
            className="text-decoration-none text-light Footer-color"
            href="https://www.instagram.com/pietroro_/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} className="me-2" />
            Profilo Instagram
          </a>
          <br />
          <a
            className="text-decoration-none text-light Footer-color"
            href="https://www.linkedin.com/in/pietro-romano-a3a4b8247/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} className="me-2" />
            Profilo LinkedIn
          </a>
          <div className="d-flex flex-wrap align-items-center mt-3">
            <p className="fw-semibold text-nowrap m-0">
              <FontAwesomeIcon icon={faEnvelope} className="me-2" />
              pietroro98@gmail.com
            </p>
            <a href="/#" className="Footer-color mx-2 text-decoration-none h5">
              <FontAwesomeIcon  icon={faArrowUp} className="me-2" />
              Torna su 
            </a>
          </div>
        </div>
      </div>
    </Container>
    </div>
  );
}

export default FooterSection;
