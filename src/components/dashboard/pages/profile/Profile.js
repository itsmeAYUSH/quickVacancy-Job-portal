import React from "react";
import styles from "./Profile.module.css";
import { motion } from "framer-motion";

export const Profile = () => {
  return (
    <motion.div
      className={styles.companyProfileContainer}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.div
        className={styles.formContainer}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        <h2 className={styles.title}>Company Profile</h2>
        <div className={styles.formGroup}>
          <input type="text" placeholder="Company name" />
          <input type="text" placeholder="Company Description" />
        </div>
        <div className={styles.formGroup}>
          <input type="text" placeholder="Industry" />
          <input type="text" placeholder="Location" />
        </div>
        <div className={styles.formGroup}>
          <input type="text" placeholder="Website" />
        </div>
        <motion.button
          className={styles.saveButton}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          Save Changes
        </motion.button>
      </motion.div>
    </motion.div>
  );
};
