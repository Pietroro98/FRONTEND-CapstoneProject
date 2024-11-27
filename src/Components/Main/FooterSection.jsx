import React from "react";
import "./FooterSection.css";
// import Container from "react-bootstrap/Container";
 import { motion } from "framer-motion";

function FooterSection() {
  return (
    <div className="py-5 ">
        <motion.div
        initial={{ opacity: 0, x: -300 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        
        >

        </motion.div>
    </div>
  )
}

export default FooterSection;
