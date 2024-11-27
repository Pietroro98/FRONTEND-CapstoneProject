import React from "react";
import "./FooterSection.css"; import Container from "react-bootstrap/Container";
 import { motion } from "framer-motion";

function FooterSection() {
  return (
    <div className="footer-section py-5 position-relative text-light">
        <motion.div
        className="bg-shape position-absolute"
        initial={{ opacity: 0, x: -300 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        
        >
        </motion.div>
        <Container>
            <div className="row">
                <div className="col-md-4 z-2">
                    <h2 className="text-start text-capitalize fw-bold">
                        Alleniamoci Insieme: </h2>
                        <p className="text-start">&copy; Romano Pietro</p>
                        <p>- Profilo Instagram :<br/> instagram.com</p>
                        <p>- Profilo LinkedIn :<br/> linkein.com</p>

                        <div className="d-flex">
                            <h5 className="text-capitalize fw-semibold text-nowrap">call us: </h5>
                            <a href="./" className="mx-2 text-decoration-none h5">090909090</a>
                        </div>

                </div>
            </div>
        </Container>
    </div>
  )
}

export default FooterSection;
