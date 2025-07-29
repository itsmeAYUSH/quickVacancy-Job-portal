import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const Footer = () => {
  // Use intersection observer to detect when the component is in view
  const { ref: footerRef, inView: isVisible } = useInView({
    threshold: 0.3, // Trigger when 30% of the component is visible
    triggerOnce: true, // Only trigger once when it comes into view
  });

  return (
    <motion.div
      ref={footerRef}
      className={styles.header}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{
        backgroundImage: 'url("/images/handshake.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <motion.div
        className={styles.buttonGroup}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        <div className={styles.buttonRow}>
          <Link to="/privacy-policy">
            <button>Privacy Policy</button>
          </Link>
          <span className={styles.separator}>|</span>
          <button>FAQs</button>
          <span className={styles.separator}>|</span>
          <Link to="/termsAndConditions">
            <button>Terms and Conditions</button>
          </Link>
        </div>
        <div className={styles.buttonRow}>
          <button>Contact Details</button>
          <span className={styles.separator}>|</span>
          <button>Payment</button>
        </div>
      </motion.div>
    </motion.div>
  );
};
