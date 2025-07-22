import React from "react";
import { Navbar } from "../../layout/navbar/Navbar";
import Header from "../../layout/header/Header";
import styles from "./Homepage.module.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const Homepage = () => {
  const navigate = useNavigate();

  const handleResumeUploadClick = () => {
    navigate("/resume-upload");
  };
  const dashboardClicker = () => {
    navigate("/dashboard");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={styles.header}
      style={{
        backgroundImage: 'url("/images/interview.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        borderBottomWidth: "0px",
      }}
    >
      <Header />
      <Navbar />
      <motion.div
        className={styles.title}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
      >
        <h2>
          Recruit high performing candidates using Quick vacancy Consultancy
        </h2>
        {/* Search Bar */}
        <div className={styles.searchBarContainer}>
          <input
            type="text"
            placeholder="Search by job, community and skills"
            className={styles.searchInput}
          />
          <input
            type="text"
            placeholder="Location"
            className={styles.locationInput}
          />
          <select className={styles.experienceDropdown}>
            <option>Experience</option>
            <option>Fresher</option>
            <option>1-3 years</option>
            <option>3-5 years</option>
            <option>5+ years</option>
          </select>
          <motion.button
            className={styles.searchButton}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Search
          </motion.button>
        </div>
        <div className={styles.titleButtons}>
          <motion.button
            className={styles.but1}
            onClick={handleResumeUploadClick}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Candidate Resume Upload
          </motion.button>
          <motion.button
            className={styles.but2}
            onClick={dashboardClicker}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            Company openings
          </motion.button>
        </div>
      </motion.div>
      <div className={styles.moreOptions}>
        Browse more options regarding consultancy
        <br />
        <motion.button
          className={styles.optionButton}
          whileHover={{ scale: 1.1, rotate: 8 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="./images/arrow-down.png" alt="icon" />
        </motion.button>
      </div>
    </motion.div>
  );
};
