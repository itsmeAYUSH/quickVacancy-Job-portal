import React from "react";
import { Navbar } from "../../layout/navbar/Navbar";
import Header from "../../layout/header/Header";
import styles from "./Homepage.module.css";
import { useNavigate } from "react-router-dom";

export const Homepage = () => {
  const navigate = useNavigate();

  const handleResumeUploadClick = () => {
    navigate("/resume-upload");
  };
  const dashboardClicker = () => {
    navigate("/dashboard");
  };

  return (
    <div
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

      <div className={styles.title}>
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
          <button className={styles.searchButton}>Search</button>
        </div>

        <div className={styles.titleButtons}>
          <button className={styles.but1} onClick={handleResumeUploadClick}>
            Candidate Resume Upload
          </button>
          <button className={styles.but2} onClick={dashboardClicker}>
            Company openings
          </button>
        </div>
      </div>

      <div className={styles.moreOptions}>
        Browse more options regarding consultancy
        <br />
        <button className={styles.optionButton}>
          <img src="./images/arrow-down.png" alt="icon" />
        </button>
      </div>
    </div>
  );
};
