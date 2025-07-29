import React from "react";
import styles from "./WhyQuickVacancy.module.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const WhyQuickVacancy = () => {
  // Use intersection observer to detect when the component is in view
  const { ref: whyRef, inView: isVisible } = useInView({
    threshold: 0.3, // Trigger when 30% of the component is visible
    triggerOnce: true, // Only trigger once when it comes into view
  });

  return (
    <motion.div
      ref={whyRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
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
        <motion.img
          className={styles.image}
          src="images/WhyQuickVacancyConsultancy2.jpg"
          alt="GroupImage"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          whileHover={{ scale: 1.05, rotate: 2 }}
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
    </motion.div>
  );
};