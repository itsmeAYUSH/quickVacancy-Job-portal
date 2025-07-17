import React from "react";
import styles from "./Profile.module.css";

export const Profile = () => {
  return (
    <div className={styles.companyProfileContainer}>
      <div className={styles.formContainer}>
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
        <button className={styles.saveButton}>Save Changes</button>
      </div>
    </div>
  );
};
