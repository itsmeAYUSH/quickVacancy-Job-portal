import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import Header from "../layout/header/Header";
import SideNavbar from "./sideNavbar/SideNavbar";
import { Navbar } from "../layout/navbar/Navbar";
import { Home } from "./pages/home/Home";
import { Jobs } from "./pages/jobs/Jobs";
import { Profile } from "./pages/profile/Profile";
import { Settings } from "./pages/settings/Settings";
import PostJob from "./pages/postJob/PostJob";

export const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("Home");

  const renderComponent = () => {
    switch (activeComponent) {
      case "Home":
        return <Home />;
      case "PostJob":
        return <PostJob />;
      case "Jobs":
        return <Jobs />;
      case "Profile":
        return <Profile />;
      case "Settings":
        return <Settings />;
      default:
        return <Home />;
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <Header backgroundColor="#0D4470" />
      <Navbar color="#0D4470" />
      <div className={styles.mainContent}>
        <SideNavbar setActiveComponent={setActiveComponent} />
        <div className={styles.contentArea}>
          <Navbar />
          <div className={styles.centeredComponent}>{renderComponent()}</div>
        </div>
      </div>
    </div>
  );
};