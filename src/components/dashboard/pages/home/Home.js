import React from "react";
import styles from "./Home.module.css"; // Create and use this CSS file for styling.
import { motion } from "framer-motion";

export const Home = () => {
  return (
    <motion.div
      className={styles.homeContainer}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <motion.div
        className={styles.statsCard}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className={styles.statsText}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        >
          <h2>Quick Stats:</h2>
          <ul>
            <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>Total Jobs posted:</motion.li>
            <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Active Posts:</motion.li>
            <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>Applications received:</motion.li>
          </ul>
          <h3>Recent Activity:</h3>
          <ul>
            <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>[Job title] - [Date posted]</motion.li>
            <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>[Job title] - [Date posted]</motion.li>
          </ul>
        </motion.div>
        <motion.div
          className={styles.imageContainer}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
        >
          <img src="/images/dashBoardBackground.png" alt="Stats illustration" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

