import React from "react";
import styles from "./ExecutiveSearch.module.css";
import Header from "../../../../layout/header/Header";
import { Navbar } from "../../../../layout/navbar/Navbar";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { motion } from "framer-motion";


export const ExecutiveSearch = () => {
   const navigate = useNavigate();
  
    const handleNavigation = (path) => {
      navigate(path); // Navigate to the given path
    };
    const handleBackClick = () => {
      handleNavigation("/");
    };
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div
        className={styles.header}
        style={{
          backgroundImage: 'url("/images/Group 20.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
        }}
      >
          <Header backgroundColor="#04310E"></Header>
          <Navbar color="#04310E"></Navbar>
        <div className={styles.content}>
        <button onClick={handleBackClick} className={styles.backButton}>
            <FaArrowLeft style={{ marginRight: "8px" }} />
            Back
          </button>
          <h4>Executive Search:</h4>
          <p>
            Quick Vacancy is the best Recruitment Agency in Mumbai (India) whose
            Executive Search is highly exclusive which focuses on medium to
            high-level executive recruiting. Quick Vacancy Executive Search
            consultants enables each client to grow their business by recruiting
            top industry-ready talents and helping develop adaptable,
            diversified organizations capable of achieving strategic
            business objective.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
