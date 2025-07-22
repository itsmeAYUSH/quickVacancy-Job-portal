import React, { useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = ({ backgroundColor }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerStyle = {
    backgroundColor: backgroundColor,
  };

  const handleHamburgerClick = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className={styles.header} style={headerStyle}>
      <img
        className={styles.logo_image}
        src="/images/Quick_Vacany_Consultancy_logo.png"
        alt="Quick Vacancy Logo"
      />
      <button
        className={styles.hamburger}
        onClick={handleHamburgerClick}
        aria-label="Toggle navigation menu"
      >
        <span className={styles.hamburgerBar}></span>
        <span className={styles.hamburgerBar}></span>
        <span className={styles.hamburgerBar}></span>
      </button>
      <div
        className={`${styles.menu} ${menuOpen ? styles.menuOpen : ""}`}
        onClick={() => setMenuOpen(false)}
      >
        <div className={styles.socials}>
          <img
            className={styles.socialsIcon}
            src="/images/facebook_icon.png"
            alt="Facebook"
          />
          <img
            className={styles.socialsIcon}
            src="/images/instagram_icon.png"
            alt="Instagram"
          />
          <img
            className={styles.socialsIcon}
            src="/images/linkedin_icon.png"
            alt="LinkedIn"
          />
          <img
            className={styles.socialsIcon}
            src="/images/twitter_icon.png"
            alt="Twitter"
          />
        </div>
        <div className={styles.socialButtons}>
          <Link to="/login/employee">
            <button className={styles.login}>Employee Login</button>
          </Link>
          <Link to="/login/employer">
            <button className={styles.login}>Employer Login</button>
          </Link>
          <button className={styles.enquire}>Enquire Now</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
