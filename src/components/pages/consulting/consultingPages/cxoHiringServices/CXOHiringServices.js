import React from "react";
import { Navbar } from "../../../../layout/navbar/Navbar";
import Header from "../../../../layout/header/Header";
import styles from "./CXOHiringServices.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { motion } from "framer-motion";


export const CXOHiringServices = () => {
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
          backgroundImage: 'url("/images/Group 23.jpg")',
          backgroundSize: "cover",
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
          <h4>CXO hiring Services:</h4>
          <p>
            CXO stands for "Chief Experienced Officer", also adding Chief
            Executive Officer (CEO), Chief Financial Officer (CFO), Chief
            Marketing Officer (CMO), Chief Operating Officer (COO), and Chief
            Technology Officer (CTO) are some of the key CXO positions that Quick
            Vacancy assists in filling quickly. Quick Vacancy is the top
            Recruitment Agency and HR Consultancy firm with a core of expertise
            including CXO Hiring Services for multinational companies be it a CEO,
            CFO, CMO, COO, or CTO. Are you looking for someone who possesses all
            the traits of intelligence, efficiency, enthusiasm, and commitment?
            The hunt for a new head or CEO hiring ends here.
          </p>
        </div>
      </div>
    </motion.div>
  );
};
