import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import styles from "./Consulting.module.css"; // Import the CSS Module

export const Consulting = () => {
  const [isVisible, setIsVisible] = useState(false); // State to control visibility
  const [hoveredText, setHoveredText] = useState(null); // State to track hovered text
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger the animation when the component mounts
    setIsVisible(true);
  }, []);

  // Function to handle mouse enter
  const handleMouseEnter = (text) => {
    setHoveredText(text); // Set the hovered text
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setHoveredText(null); // Reset hovered text
  };
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the given path
  };

  return (
    <div
      className={styles.header}
      style={{
        backgroundImage: 'url("/images/consulting.svg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <div className={styles.container}>
        {/* Top Vertical Line */}
        <svg width="600" height="150">
          <line
            x1="300"
            y1="80"
            x2="300"
            y2="150"
            stroke="white"
            strokeWidth="2"
          />
          <motion.text
            x="300"
            y="70"
            textAnchor="middle"
            fill="white"
            fontSize="30" // Increased font size for visibility
            initial={{ opacity: 0, y: 50 }} // Start from bottom
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} // Animate to original position
            transition={{ duration: 0.5 }} // Duration of the animation
            onMouseEnter={() => handleMouseEnter("Consulting")} // Set hover state
            onMouseLeave={handleMouseLeave} // Reset hover state
            fontWeight={"bold"}
          >
            CONSULTING
          </motion.text>
        </svg>

        {/* Horizontal Line */}
        <svg width="900" height="2">
          <line x1="50" y1="1" x2="850" y2="1" stroke="white" strokeWidth="2" />
        </svg>

        {/* Vertical Lines with Text */}
        <svg width="1000" height="300">
          {/* First Vertical Line */}
          <line
            x1="100"
            y1="0"
            x2="100"
            y2="50"
            stroke="white"
            strokeWidth="2"
          />
          <foreignObject x="50" y="50" width="100" height="80">
            <div
              onClick={() => handleNavigation("/Consulting/resume-writing")} // Add navigation on click
              onMouseEnter={() => handleMouseEnter("Resume Writing")}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundColor:
                  hoveredText === "Resume Writing" ? "white" : "transparent",
                color: hoveredText === "Resume Writing" ? "darkgreen" : "white",
                padding: "10px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                transition: "background-color 0.3s, color 0.3s",
                height: "50px !important",
                cursor: "pointer",
              }}
            >
              <motion.text
                fill="currentColor"
                fontSize="24" // Increased font size for better visibility
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.5 }}
              >
                Resume Writing
              </motion.text>
            </div>
          </foreignObject>

          {/* Second Vertical Line */}
          <line
            x1="300"
            y1="0"
            x2=" 300"
            y2="150"
            stroke="white"
            strokeWidth="2"
          />
          <foreignObject x="250" y="150" width="100" height="80">
            <div
              onClick={() =>
                handleNavigation("/Consulting/turnkey-Recruitment")
              } // Add navigation on click
              onMouseEnter={() => handleMouseEnter("Turnkey Recruitment")}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundColor:
                  hoveredText === "Turnkey Recruitment"
                    ? "white"
                    : "transparent",
                color:
                  hoveredText === "Turnkey Recruitment" ? "darkgreen" : "white",
                padding: "10px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                transition: "background-color 0.3s, color 0.3s",
                height: "50px !important",
                cursor: "pointer",
              }}
            >
              <motion.text
                fill="currentColor"
                fontSize="24" // Increased font size for better visibility
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.5 }}
              >
                Turnkey Recruitment
              </motion.text>
            </div>
          </foreignObject>

          {/* Third Vertical Line */}
          <line
            x1="500"
            y1="0"
            x2="500"
            y2="50"
            stroke="white"
            strokeWidth="2"
          />
          <foreignObject x="450" y="50" width="100" height="80">
            <div
              onClick={() => handleNavigation("/Consulting/executive-search")} // Add navigation on click
              onMouseEnter={() => handleMouseEnter("Executive Search")}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundColor:
                  hoveredText === "Executive Search" ? "white" : "transparent",
                color:
                  hoveredText === "Executive Search" ? "darkgreen" : "white",
                padding: "10px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                transition: "background-color 0.3s, color 0.3s",
                height: "50px !important",
                cursor: "pointer",
              }}
            >
              <motion.text
                fill="currentColor"
                fontSize="24" // Increased font size for better visibility
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.5 }}
              >
                Executive Search
              </motion.text>
            </div>
          </foreignObject>

          {/* Fourth Vertical Line */}
          <line
            x1="700"
            y1="0"
            x2="700"
            y2="150"
            stroke="white"
            strokeWidth="2"
          />
          <foreignObject x="650" y="150" width="100" height="80">
            <div
              onClick={() =>
                handleNavigation("/Consulting/CXO-hiring-services")
              } // Add navigation on click
              onMouseEnter={() => handleMouseEnter("CXO Hiring")}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundColor:
                  hoveredText === "CXO Hiring" ? "white" : "transparent",
                color: hoveredText === "CXO Hiring" ? "darkgreen" : "white",
                padding: "10px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                transition: "background-color 0.3s, color 0.3s",
                height: "50px !important",
                cursor: "pointer",
              }}
            >
              <motion.text
                fill="currentColor"
                fontSize="24" // Increased font size for better visibility
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.5 }}
              >
                <div x="580" dy="0">
                  CXO Hiring
                </div>
                <div x="580" dy="20">
                  Services
                </div>
              </motion.text>
            </div>
          </foreignObject>

          {/* Fifth Vertical Line */}
          <line
            x1="900"
            y1="0"
            x2="900"
            y2="50"
            stroke="white"
            strokeWidth="2"
          />
          <foreignObject x="825" y="50" width="150" height="80">
            <div
              onClick={() => handleNavigation("/Consulting/HR-Consulting")} // Add navigation on click
              onMouseEnter={() => handleMouseEnter("Human Resource")}
              onMouseLeave={handleMouseLeave}
              style={{
                backgroundColor:
                  hoveredText === "Human Resource" ? "white" : "transparent",
                color: hoveredText === "Human Resource" ? "darkgreen" : "white",
                padding: "10px",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                transition: "background-color 0.3s, color 0.3s",
                height: "50px !important",
                cursor: "pointer",
              }}
            >
              <motion.text
                fill="currentColor"
                fontSize="24"
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{ duration: 0.5 }}
              >
                <div x="820" dy="0">
                  Human Resource
                </div>
                <div x="820" dy="20">
                  Consulting
                </div>
              </motion.text>
            </div>
          </foreignObject>
        </svg>
      </div>
    </div>
  );
};
