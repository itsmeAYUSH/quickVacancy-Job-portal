import React, { useState } from "react";
import styles from "./TermsAndConditions.module.css";
import Header from "../../layout/header/Header";
import { Navbar } from "../../layout/navbar/Navbar";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const TermsAndConditions = () => {
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
        height: "100%",
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
            <h3>TERMS AND CONDITIONS</h3>

            <p>
              <div className={styles.title}>1. INTRODUCTION</div>
              Welcome to Job Wing, a job search platform provided by Our Job
              Wing Company. These Terms and Conditions govern your use of the
              Platform, including the website [www.Jobwing.com] and mobile
              application [Job Wing].
              <br />
              <br />
              <div className={styles.title}>2. ACCEPTANCE</div>
              By accessing or using the Platform, you agree to be bound by these
              Terms. By registering, you accept that you are entering into a
              contract with us based on these Terms and Conditions. If you do
              not agree to these Terms, please do not use the Platform. Visitors
              to Jobwing.com who do not register to become a Member (Employer or
              Employee) similarly affirm that they are bound by these Terms and
              Conditions each time they access the Jobwing.com website.
              {/* <br /> */}
              <br />
              If you do not accept the Terms and Conditions stated, please
              refrain from using Jobwing.com.
              {/* <br /> */}
              <br />
              The use of the Website/Application of Job Wing by an Employer or
              Employee shall be deemed acceptance of and agreement to these
              terms only.
              {/* <br /> */}
              <br />
              1. The Website has been established to allow Employers to Post
              Jobs as per their Requirements & Employees to Apply and Upload
              your CV for the Job. We do not issue any experience certificate to
              our registered members.
              {/* <br /> */}
              <br />
              2. Any profile created showing political or illegal material would
              not be accepted under any circumstances.
              {/* <br /> */}
              <br />
              3. Jobwing.com will take all reasonable precautions to keep the
              details of Employers and Employees secure but will not be liable
              for unauthorized access to the information provided by any party
              whatsoever.
              {/* <br /> */}
              <br />
              4. The Members warrant that their e-mail and other contact
              addresses are valid and up to date when using the Website.
              {/* <br /> */}
              <br />
              5. Members agree not to impersonate any other person or entity or
              to use a false name or a name that they have no authority to use.
              {/* <br /> */}
              <br />
              6. Members acknowledge that Jobwing.com is not liable for any form
              of loss or damage that may be suffered by a Member through the use
              of the Website including loss of data or information or any kind
              of financial or physical loss or damage.
              {/* <br /> */}
              <br />
              7. Jobwing.com privacy policy forms part of these Terms and
              Conditions, and by agreeing to these Terms and Conditions, you
              also give your consent to the manner in which we may handle your
              personal data as detailed in that policy.
              {/* <br /> */}
              <br />
              8. The management reserves the right to modify the Terms and
              Conditions at any time without any prior notification.
              {/* <br /> */}
              <br />
              9. These Terms will be subject to Indian Law and the jurisdiction
              of Indian Courts.
              {/* <br /> */}
              <br />
              10. We do not cater Placement Agencies and consultancies. Any
              payments made by Placement Agencies/Consultancies will not be
              refunded under any situation.
              {/* <br /> */}
              <br />
              11. Job Wing is not responsible if any candidate has committed a
              crime/illegal activity at the employer's premises. Background
              verification of candidates who are/will be hired is a
              responsibility of the respective recruiter/recruiter's company.
              {/* <br /> */}
              <br />
              12. Job Wing accepts no liability, whether jointly or severally,
              for any errors or omissions, whether on behalf of itself or third
              parties in relation to the data/information collated and published
              on the Job Wing Platform.
            </p>
          </>
        )}

        {page === 2 && (
          <p>
            <div className={styles.title}>3. DEFINITIONS</div>
            - "User " means any individual or entity using the Platform. <br />
            - "Job Seeker" means a User searching for job opportunities. <br />
            - "Employer" means a User posting job openings. <br />
            - "Content" means any data, text, images, or other materials
            uploaded or posted on the Platform. <br />
            <div className={styles.title}>4. USE OF THE PLATFORM</div>
            The Platform is intended for individuals seeking employment and
            employers seeking candidates.
            <br /> You must be at least 18 years old to use the Platform.
            <br /> You agree to provide accurate and complete information during
            registration and when using the Platform.
            <br /> You are responsible for maintaining the confidentiality of
            your account login credentials. <br />
            <div className={styles.title}>5. JOB SEEKER TERMS</div>
            Job Seekers may search and Upload Resume (CV) for job openings on
            the Platform. <br />
            Job Seekers agree to provide accurate and truthful information in
            their profiles, Resumes, and applications.
            <br /> Job Seekers acknowledge that Employers may contact them
            directly through the Resume (CV) shared. <br />
            <div className={styles.title}>6. EMPLOYER TERMS</div>
            Employers may post job openings on the Platform. <br />
            Employers agree to provide accurate and truthful information in
            their job postings. Employers acknowledge that Job Seekers may apply
            for job openings through the Platform. <br />
            <div className={styles.title}>7. CONTENT</div>
            You agree not to upload or post any Content that is:
            <br /> - Inaccurate, false, or misleading <br />- Defamatory,
            libelous, or threatening <br />- Obscene, indecent, or pornographic{" "}
            <br />- Infringing on intellectual property rights
            <br /> - Spam or unsolicited commercial messages <br /> We reserve
            the right to remove or edit any Content that violates these Terms.
          </p>
        )}

        {page === 3 && (
          <p>
            <div className={styles.title}>8. INTELLECTUAL PROPERTY</div>
            The Platform and its content are protected by intellectual property
            laws.
            <br /> You agree not to reproduce, distribute, or display any
            content from the Platform without our prior written consent.
            <br /> All names, logos, marks, labels, trademarks, copyrights or
            intellectual and proprietary rights on the Job Wing Platform
            belonging to any person (including a User), entity or third party
            are recognized as proprietary to the respective owners and any
            claims, controversy or issues against these names, logos, marks,
            labels, trademarks, copyrights or intellectual and proprietary
            rights must be directly addressed to the respective parties under
            notice to Job Wing.
            <br />
            <div className={styles.title}>9. DISCLAIMERS AND LIMITATIONS</div>
            We are not liable for any damages, including indirect, incidental,
            or consequential damages. To the extent permitted under law, neither
            Job Wing nor its parent/holding company, subsidiaries, affiliates,
            directors, officers, professional advisors, employees shall be
            responsible for the deletion, the failure to store, the
            mis-delivery, or the untimely delivery of any information or
            material. To the extent permitted under law, Job Wing shall not be
            responsible for any harm resulting from downloading or accessing any
            information or material, the quality of servers, products, Job Wing
            Services or sites. In the event any User breaches, or Job Wing
            reasonably believes that such User has breached these Terms of
            Service, or has illegally or improperly used the Job Wing Platform
            or Job Wing Services, Job Wing may, at its sole and absolute
            discretion, and without any notice to the User, restrict, suspend or
            terminate such User's access to all or any part of the Job Wing
            Platform, deactivate or delete the User's account and all related
            information on the account, delete any content posted by the User on
            Job Wing and further, take technical and legal steps as it deems
            necessary. We Don’t Have Any Other website/ Company Name /
            Application Name Except with Same Name. This Logo and Name are only
            Authorised. And Do Coordinate through this “www. Jobwing.com”
            Website Only. If Some One Found doing any Misuse under this Company
            Name immediate Legal action will be taken. <br />
            <div className={styles.title}>10. TERMINATION</div>
            We may terminate or suspend your account and access to the Platform
            at any time, without notice. If found any kind of Misuse or Damage
            of Any Data Or Content Done. Upon termination, you agree to cease
            using the Platform and remove any Content you uploaded.
            <br />
            <div className={styles.title}>11. CHANGES TO TERMS</div>
            We reserve the right to modify these Terms at any time. <br />
            Changes will be effective upon posting on the Platform.
          </p>
        )}

        {page === 4 && (
          <p>
            <div className={styles.title}>12. PARTICIPATION</div>
            The job applications by the Users on the Job Wing Platform shall
            remain active only for a period of 30 (thirty) days from the date of
            application to the job posts and upon the expiry of the said period
            of 30 (thirty) days, such job applications shall be archived
            ("Archived Job Applications"). The potential employers shall not
            have access to the list of such Users or to the Archived Job
            Applications upon the expiry of 30 (thirty) days. The Users,
            however, may re-apply to a job post (if still active) after the
            expiry of 30 (thirty) days from the date such User made their first
            application to the same job post by Making New fresh Payment. Users
            agree that they shall at all times be bound by and adhere to the
            Code of Conduct while accessing the Job Wing Platform and while
            using the Job Wing Services.
            <div className={styles.title}>12. CONTACT US</div>
            If you have any questions or concerns about these Terms, please
            contact us at jobwing9@gmail.com or Support Phone Number - +91
            8691001515. By using the Platform, you acknowledge that you have
            read, understood, and agree to be bound by these Terms.
          </p>
        )}

        <Box display="flex" justifyContent="center" marginTop="20px">
          <Pagination
            count={4}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </div>
    </motion.div>
  );
};