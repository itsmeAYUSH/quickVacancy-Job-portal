import React, { useState } from "react";
import styles from "./SideNavbar.module.css";
import { FaHome, FaPlus, FaBriefcase, FaUser, FaCog } from "react-icons/fa";

const SideNavbar = ({ setActiveComponent }) => {
  const [hovered, setHovered] = useState(null);

  const navItems = [
    { name: "Home", icon: <FaHome />, component: 'Home' },
    { name: "Post Job", icon: <FaPlus />, component: 'PostJob' },
    { name: "Jobs", icon: <FaBriefcase />, component: 'Jobs' },
    { name: "Profile", icon: <FaUser />, component: 'Profile' },
    { name: "Settings", icon: <FaCog />, component: 'Settings' },
  ];

  return (
    <div className={styles.sidenav}>
      {navItems.map((item, index) => (
        <div
          key={index}
          className={styles.navItem}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => setActiveComponent(item.component)} // Update the active component on click
        >
          <div className={styles.icon}>{item.icon}</div>
          <div
            className={`${styles.text} ${
              hovered === index ? styles.showText : ""
            }`}
          >
            {item.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideNavbar;
