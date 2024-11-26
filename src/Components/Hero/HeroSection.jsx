import React from "react";
import "./HeroSection.css";
import { motion } from "framer-motion";

function HeroSection() {
  return (
    <header className="h-100 min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row">
          <motion.div
            className="col-md-6 d-flex flex-column justify-content-start align-items-center align-items-sm-start"
            initial={{ opacity: 0, x: -300 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="hero-subtitle text-light text-center text-sm-start text-uppercase">Costruisci il tuo fisico</h2>
            <h1 className="hero-title text-light text-center text-sm-start fw-bold text-uppercase">
                Ciao <span className="text-purple">sono</span> & <span className="text-purple">Pietro</span>
            </h1>
            <p className="text-center text-sm-start text-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores repudiandae vel odio modi laboriosam aliquam nihil aut? Odit, deleniti maxime atque odio dicta nulla. Veniam ducimus officiis perferendis incidunt amet.
            </p>
            <div>
                <button className="btn btn-light btn-lg rounded-0 text-capitalize">
                    inizia 
                </button>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
