import React from "react";
import "./ServiziSection.css";
import { motion } from "framer-motion";
import ServiziItems from "../../Assets/ServiziItems";
import ServiziCard from "./ServiziCard";

function ServiceSection() {
  return (
    <div className="bg-black text-light py-4 py-sm-5" id="servizi">
      <div className="container">
        <motion.h2
          className="section-title text-center text-capitalize fw-bold mb-4 mb-sm-5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          i tuoi <span className="text-purple"> servizi</span>
        </motion.h2>
        <div className="row g-4">
          {ServiziItems.map((item) => (
            <ServiziCard
              key={item.id}
              itemIcon={item.itemIcon}
              itemTitle={item.itemTitle}
              itemDescription={item.itemDescription}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceSection;
