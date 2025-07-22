import React from 'react';
import styles from './Settings.module.css';
import { motion } from "framer-motion";

export const Settings = () => {
  return (
    <motion.div
      className={styles.settingsContainer}
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
        <h2 className={styles.title}>Settings</h2>
        
        <div className={styles.accountInfo}>
          <p><span>Email:</span> user@example.com</p>
        </div>
        
        <div className={styles.accountInfo}>
          <p><span>Password:</span> ************</p>
          <span className={styles.changePassword}>Change password</span>
        </div>
        
        <div className={styles.divider}></div>
        
        <div className={styles.notificationPrefs}>
          <p><span>Notification Preferences:</span></p>
          <p>• Job Application Alerts:</p>
          <p>• Job Posting Expiration Alerts:</p>
        </div>
        
        <motion.button
          className={styles.saveButton}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
        >
          Save Settings
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

 
