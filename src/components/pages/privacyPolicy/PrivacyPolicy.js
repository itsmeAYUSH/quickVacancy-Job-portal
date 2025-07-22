import React, { useState } from "react";
import styles from "./PrivacyPolicy.module.css";
import Header from "../../layout/header/Header";
import { Navbar } from "../../layout/navbar/Navbar";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const PrivacyPolicy = () => {
    const navigate = useNavigate();
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the given path
  };
  const handleBackClick = () => {
    handleNavigation("/");
  };
  const [page, setPage] = useState(1);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <motion.div
      className={styles.header}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      style={{
        backgroundImage: 'url("/images/Group 31.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <Header backgroundColor="#0D4470" />
      <Navbar color="#0D4470" />

      <div className={styles.content}>
      <button onClick={handleBackClick} className={styles.backButton}>
          <FaArrowLeft style={{ marginRight: "8px" }} />
          Back
        </button>
        {page === 1 && (
          <>
            <h3>Privacy & Policy</h3>

            <p>
              This page informs you of our policies regarding the Information
              collection, use, and disclosure of personal data when you use our
              Service and the choices you have associated with that data.
              <br></br> We use your data to provide and improve the Service. By
              using the Service, you agree to the collection and use of
              information in accordance with this policy. Unless otherwise
              defined in this Privacy Policy, terms used in this Privacy Policy
              have the same meanings as in our Terms and Conditions, accessible
              from www.Quick Vacancy.com.
              <br></br> Information Collection and Use:
              <br></br> We collect several different types of information for
              various purposes to provide and improve our Service to you.
              <br></br> While using our Service, we may ask you to provide us
              with certain personally identifiable information that can be used
              to contact or identify you (“Personal Data”). Personally
              identifiable information includes your email address, full name,
              phone number, work address, Pin code and city.
              <br></br> Use of Data:
              <br></br> Quick Vacancy uses the collected data for various
              purposes – <br></br>• To provide and maintain the Service{" "}
              <br></br>• To notify you about changes to our Service<br></br> •
              To provide customer care and support<br></br> • To provide
              analysis or valuable information so that we can improve the
              Service<br></br> • To monitor the usage of the Service <br></br>•
              To detect, prevent and address technical issues.
            </p>
          </>
        )}

        {page === 2 && (
          <p>
            Disclosure of Data:<br></br><br></br> Quick Vacancy may disclose your
            Personal Data in the good faith belief that such action is necessary
            to –<br></br> • To comply with a legal obligation <br></br>• To
            protect and defend the rights.<br></br> • To prevent or investigate
            possible wrong doing in connection with the Service
            <br></br> • To protect the personal safety of users of the Service
            or the public <br></br>• To protect against legal liability
            <br></br> Security of Data:<br></br> Quick Vacancy will take all
            steps reasonably necessary to ensure that your data is treated
            securely and in accordance with this Privacy Policy and no transfer
            of your Personal Data will take place to an organization or a
            country unless there are adequate controls in place including the
            security of your data and other personal information. The security
            of your data is important to us, but remember that no method of
            transmission over the Internet, or method of electronic storage is
            100% secure. While we strive to use commercially acceptable means to
            protect your Personal Data, we cannot guarantee its absolute
            security. <br></br>Changes to This Privacy Policy: <br></br>Quick
            Vacancy may update our Privacy Policy from time to time based on
            customer feedback. You are advised to review this Privacy Policy
            periodically for any changes. Changes to this Privacy Policy are
            effective when they are posted on this page. <br></br>Contact
            Information: <br></br>
            If you have any questions about this Privacy Policy, please contact
            us at  (Mail ID)
          </p>
        )}

        <Box display="flex" justifyContent="center" marginTop="20px">
          <Pagination
            count={2}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </div>
    </motion.div>
  );
};
