import React from "react";
import Header from "../../../../layout/header/Header";
import { Navbar } from "../../../../layout/navbar/Navbar";
import styles from "./TurnkeyRecruiment.module.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

export const TurnkeyRecruiment = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path); // Navigate to the given path
  };
  const handleBackClick = () => {
    handleNavigation("/");
  };
  return (
    <div
      className={styles.header}
      style={{
        backgroundImage: 'url("/images/Group 22.jpg")',
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
        <h4>Turnkey Recruiting:</h4>
        <p>
          Quick Vacancy is considered as the best HR Consultancy and top
          placement agency for Turnkey Recruitment Services for businesses
          seeking bulk or Mass recruitment across multiple verticals in a short
          period of time. Typically, such a hiring need in contexts of
          start-ups, expansion projects, organization looking to inject crisp
          ability into the group, taking non-performance in recognition or
          topographical expansion into new areas, new product launch in
          business, as well as positions. Quick Vacancy has unparalleled
          experience in being the top recruitment agency for bulk-hiring and
          staffing. Turnkey Recruitment saves our clients a substantial amount
          of time and, more importantly, money. Quick Vcancy ensures that
          employees hired at every tier of the organization are enrolled within
          the given deadlines and monetary frameworks. While doing so, Quick
          Vacancy ensures that the quality of recruitment and administration
          does not deteriorate at all.
        </p>
      </div>
    </div>
  );
};
