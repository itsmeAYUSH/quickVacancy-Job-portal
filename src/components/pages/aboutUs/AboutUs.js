import React from "react";
import Header from "../../layout/header/Header";
import { Navbar } from "../../layout/navbar/Navbar";
import styles from "./AboutUs.module.css";
import { useNavigate } from "react-router-dom";

export const AboutUs = () => {
  const navigate = useNavigate();

  const missionVisionClickHandler = () => {
    navigate("/about-us/vision&Mission");
  };
  return (
    <div
      className={styles.header}
      style={{
        backgroundImage: 'url("/images/Group 69.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <Header backgroundColor="#0F7A27"></Header>
      <Navbar color="#0F7A27"></Navbar>
      <div className={styles.content}>
        <h3>Quick Vacancy Consultancy</h3>
        <h4>About Us</h4>

        <p>
          Quick Vacancy is a multi-functional, multi-faculty, Global Leading
          Executive Search firm, Based in Mumbai (India). Quick Vacancy is an
          leading recruitment consultancy, specializing in placement consultancy
          services such as Executive Search, CXO Hiring, Turnkey Recruitment,
          Interim Management, Accounts and HR Consulting. We are aligned in a
          range of industry-specific practices and provide quality recruitment
          and leading manpower services in India. We are Having a Pan-India
          presence, Quick Vacancy is the best recruitment agency in Mumbai as
          well as in all the major metropolitan cities for all IT and Non-IT
          recruitment Sector needs. As the best HR Consultancy and Recruitment
          Agency, our Recruitment Specialist team consists of professionals from
          diverse backgrounds who are experienced in the field of recruitment &
          manpower consulting. Quick Vacancy is a top recruitment agency
          offering selective and high-quality hiring solutions for Freshers as
          well as Experienced Candidates to our clients including many MNCs.
          Being the best recruitment agency and having a top-notch recruitment
          team, we successfully meet the requirements of the organization's
          manpower demands thanks to our database, fastest turnaround, past
          expertise and innovative ideas. Quick Vacancy brings in the right
          blend of expertise from having experience as a top recruitment agency
          in both IT and Non-IT sectors, facilitating the organization in
          acquiring permanent staff, enhancing productivity and reducing
          employment costs. We are the top Executive Search firm in India
          operating under a highly experienced leadership that guides and
          mentors the placement process. We have gained this reputation by
          offering the best recruitment services to clients in various sectors
          across all leading industries.
        </p>
      </div>

      <div
        className={styles.moreOptions}
        onClick={missionVisionClickHandler} 
      >
        {/* Browse more options regarding consultancy */}
        View Our Vision & Our Mission
        <br></br>
        <button className={styles.optionButton}>
          <img
            onClick={missionVisionClickHandler}
            src="./images/arrow-downOrange.png"
            alt="background-image"
          ></img>
        </button>
      </div>

      {/* <div className={styles.moreOptions}>
        Browse more options regarding consultancy
        <br></br>
        <button className={styles.optionButton}>
          <img src="./images/arrow-down.png" alt="icon"></img>
        </button>
      </div> */}
    </div>
  );
};
