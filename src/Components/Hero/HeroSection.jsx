import React from "react";
import "./HeroSection.css";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/login');
  };
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
                Be <span className="text-purple"> Fit</span> & <span className="text-purple">strong</span>
            </h1>
            {/* <p className="text-center text-sm-start text-light">Essere in forma e forti non è solo una questione di apparenza, ma di potere personale. Ogni passo, ogni scelta sana, ogni momento dedicato al tuo benessere ti avvicina alla versione migliore di te stesso.
            </p> */}
            <div>
                <button className="get-started btn btn-light btn-lg rounded-5 text-capitalize"
                 onClick={handleGetStarted}>
                    get started
                </button>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}

export default HeroSection;
