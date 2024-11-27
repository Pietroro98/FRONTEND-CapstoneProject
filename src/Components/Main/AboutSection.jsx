import React from "react";
import { motion } from "framer-motion";
import img1 from "../../Assets/Imgs/img1.jpg"
import NavbarButton from "../Buttons/NavbarButton";

function AboutSection() {
  return(
    <div className="bg-black text-light py-4 py-sm-5" id="about">
        <div className="container">
            <div className="flex-column-reverse flex-lg-row row">
                <motion.div 
                className="col-lg-6 d-flex justify-content-center"
                initial={{ opacity: 0, x: -300 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                >
                    <img className="img-fluid w-75 mt-4 mt-lg-0" src={img1} alt="about img"/>
                </motion.div>
                <motion.div 
                    className="col-lg-6 d-flex flex-column justify-contenmt-center align-items-start"
                    initial={{ opacity: 0, x: -350 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                >
                        <h2 className="section-title text-capitalize"> about <span className="text-purple"> Us </span></h2>
                        <p>
                        Essere in forma e forti non è solo una questione di apparenza, ma di potere personale. Ogni passo, ogni scelta sana, ogni momento dedicato al tuo benessere ti avvicina alla versione migliore di te stesso. La forza non è solo fisica, ma anche mentale: è la capacità di superare sfide, perseverare e crescere. Ogni giorno è un’opportunità per migliorare, per rafforzare il corpo e nutrire la mente. Non si tratta di perfezione, ma di progresso. Alzati, muoviti e dimostra a te stesso che puoi essere in forma e forte. Sempre. 💪✨
                        </p>
                        <NavbarButton btnTitle="Inizia subito"/>
                </motion.div>
            </div>
        </div>

    </div>
  );
}

export default AboutSection;
