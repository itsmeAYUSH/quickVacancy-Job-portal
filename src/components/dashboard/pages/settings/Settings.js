import React from 'react';
import styles from './Settings.module.css';

export const Settings = () => {
  return (
    <div className={styles.settingsContainer}>
      <div className={styles.formContainer}>
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
        
        <button className={styles.saveButton}>Save Settings</button>
      </div>
    </div>
  );
};

 
