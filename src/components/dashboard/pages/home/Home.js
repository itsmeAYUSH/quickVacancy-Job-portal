import React from "react";
import styles from "./Home.module.css"; // Create and use this CSS file for styling.

export const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.statsCard}>
        <div className={styles.statsText}>
          <h2>Quick Stats:</h2>
          <ul>
            <li>Total Jobs posted:</li>
            <li>Active Posts:</li>
            <li>Applications received:</li>
          </ul>

          <h3>Recent Activity:</h3>
          <ul>
            <li>[Job title] - [Date posted]</li>
            <li>[Job title] - [Date posted]</li>
          </ul>
        </div>
        <div className={styles.imageContainer}>
          <img src="/images/dashBoardBackground.png" alt="Stats illustration" />
        </div>
      </div>
    </div>
  );
};

