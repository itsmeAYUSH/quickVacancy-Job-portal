import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <div
      className={styles.header}
      style={{
        backgroundImage: 'url("/images/handshake.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <div className={styles.buttonGroup}>
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
      </div>
    </div>
  );
};
