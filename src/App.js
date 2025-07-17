import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/layout/header/Header";
// import Navbar from './components/layout/navbar/Navbar'
import { AboutUs } from "./components/pages/aboutUs/AboutUs";
// import { CareerCounselling } from "./components/pages/careerCounselling/CareerCounselling";
import { Consulting } from "./components/pages/consulting/Consulting";
import { Footer } from "./components/pages/footer/Footer";
import { Homepage } from "./components/pages/homepage/Homepage";
import { WhyQuickVacancy } from "./components/pages/whyQuickVacancy/WhyQuickVacancy";
import { ResumeWriting } from "./components/pages/consulting/consultingPages/resumeWriting/ResumeWriting";
import { ExecutiveSearch } from "./components/pages/consulting/consultingPages/executiveSearch/ExecutiveSearch";
import { HrConsulting } from "./components/pages/consulting/consultingPages/hrConsulting/HrConsulting";
import { TurnkeyRecruiment } from "./components/pages/consulting/consultingPages/turnkeyRecruitment/TurnkeyRecruiment";
import { CXOHiringServices } from "./components/pages/consulting/consultingPages/cxoHiringServices/CXOHiringServices";
import { OurVision } from "./components/pages/aboutUs/OurVision";
import { PrivacyPolicy } from "./components/pages/privacyPolicy/PrivacyPolicy";
import { ResumeUpload } from "./components/pages/resumeUpload/ResumeUpload";
import { Dashboard } from "./components/dashboard/Dashboard";
import { LoginEmployee, LoginEmployer } from "./components/pages/login/Login";
// import { SignUp } from "./components/pages/signUp/SignUp";
import {
  SignUpEmployer,
  SignUpEmployee,
} from "./components/pages/signUp/SignUp";
import PostJob from "./components/dashboard/pages/postJob/PostJob";
import { Jobs } from "./components/dashboard/pages/jobs/Jobs";
import { TermsAndConditions } from "./components/pages/termsAndConditions/TermsAndConditions";

function HomeLayout() {
  return (
    <>
      <Header />
      <Homepage />
      <Consulting />
      {/* <CareerCounselling /> */}
      <WhyQuickVacancy />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login/employee" element={<LoginEmployee />} />
        <Route path="/login/employer" element={<LoginEmployer />} />
        {/* <Route path="/SignUp" element={<SignUp />} /> */}
        {/* <Route path="/career-counselling" element={<CareerCounselling />} /> */}
        <Route path="/sign-up/employer" element={<SignUpEmployer />} />
        <Route path="/sign-up/employee" element={<SignUpEmployee />} />
        <Route path="/why-quick-vacancy" element={<WhyQuickVacancy />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/Consulting/resume-writing" element={<ResumeWriting />} />
        <Route
          path="/Consulting/executive-search"
          element={<ExecutiveSearch />}
        />
        <Route path="/Consulting/HR-Consulting" element={<HrConsulting />} />
        <Route
          path="/Consulting/turnkey-Recruitment"
          element={<TurnkeyRecruiment />}
        />
        <Route
          path="/Consulting/CXO-hiring-services"
          element={<CXOHiringServices />}
        />{" "}
        <Route path="/about-us/vision&Mission" element={<OurVision />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/termsAndConditions" element={<TermsAndConditions />} />
        <Route path="/resume-upload" element={<ResumeUpload />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/post-job/:jobId?" element={<PostJob />} />{" "}
        <Route path="/" element={<HomeLayout />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;

// import React, { useState } from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useInView } from "react-intersection-observer";
// import Header from "./components/layout/header/Header";
// import {Homepage} from "./components/pages/homepage/Homepage";
// import {Consulting} from "./components/pages/consulting/Consulting";
// import {CareerCounselling} from "./components/pages/careerCounselling/CareerCounselling";
// import {WhyQuickVacancy} from "./components/pages/whyQuickVacancy/WhyQuickVacancy";
// import {Footer} from "./components/pages/footer/Footer";

// function App() {
//   const [visibleSection, setVisibleSection] = useState("header");

//   // Intersection observers for all components
//   const { ref: headerRef, inView: headerInView } = useInView({ threshold: 0.5 });
//   const { ref: homepageRef, inView: homepageInView } = useInView({ threshold: 0.5 });
//   const { ref: consultingRef, inView: consultingInView } = useInView({ threshold: 0.5 });
//   const { ref: careerRef, inView: careerInView } = useInView({ threshold: 0.5 });
//   const { ref: whyRef, inView: whyInView } = useInView({ threshold: 0.5 });
//   const { ref: footerRef, inView: footerInView } = useInView({ threshold: 0.5 });

//   // Update visible section based on scrolling
//   React.useEffect(() => {
//     if (headerInView) setVisibleSection("header");
//     else if (homepageInView) setVisibleSection("homepage");
//     else if (consultingInView) setVisibleSection("consulting");
//     else if (careerInView) setVisibleSection("careerCounselling");
//     else if (whyInView) setVisibleSection("whyQuickVacancy");
//     else if (footerInView) setVisibleSection("footer");
//   }, [headerInView, homepageInView, consultingInView, careerInView, whyInView, footerInView]);

//   return (
//     <Router>
//       <div>
//         {/* Conditionally render components based on which section is visible */}
//         {visibleSection === "header" && <Header />}
//         {visibleSection === "homepage" && <Homepage />}
//         {visibleSection === "consulting" && <Consulting />}
//         {visibleSection === "careerCounselling" && <CareerCounselling />}
//         {visibleSection === "whyQuickVacancy" && <WhyQuickVacancy />}
//         {visibleSection === "footer" && <Footer />}

//         {/* Use divs with ref to track visibility of each section */}
//         <div ref={headerRef} style={{ height: "100vh" }}></div>
//         <div ref={homepageRef} style={{ height: "100vh" }}></div>
//         <div ref={consultingRef} style={{ height: "100vh" }}></div>
//         <div ref={careerRef} style={{ height: "100vh" }}></div>
//         <div ref={whyRef} style={{ height: "100vh" }}></div>
//         <div ref={footerRef} style={{ height: "100vh" }}></div>
//       </div>
//     </Router>
//   );
// }

// export default App;
