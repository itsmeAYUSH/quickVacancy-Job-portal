import React from "react";
import styles from "./WhyQuickVacancy.module.css";

export const WhyQuickVacancy = () => {
  return (
    <div
      className={styles.header}
      style={{
        backgroundImage: 'url("/images/WhyQuickVacancyConsultancy.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <div className={styles.content}>
        <img
          className={styles.image}
          src="images/WhyQuickVacancyConsultancy2.jpg"
          alt="GroupImage"
        />
        <div className={styles.aboutUsText}>
          <h3 className={styles.aboutUsTitle}>Why Quick Vacancy Consulting</h3>
          <p>
            As its excelled as the Best Recruitment Agency, we have helped
            Clients find the right talent while recruiting for various roles
            i.e. Right from Entry, Mid, Senior to CXO level. <br />
            And if You Looking to get talent onboard within the shortest
            timeline? Quick Vacancy is your answer. Post receiving the job
            descriptions, CVs are shared with the Company Clients.<br />
            With the most cost-effective pricing in the recruitment industry, we
            help our Clients to grow their businesses.<br />
            We invest in accessing the best candidates' portal databases. With
            our pre-screened quality talent pool, firms can onboard the right
            talent right away as per the company and its requirements.
          </p>
        </div>
      </div>
    </div>
  );
};