import React, { useState } from "react";
import styles from "./Login.module.css";
import Header from "../../layout/header/Header";
import { Navbar } from "../../layout/navbar/Navbar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../../fireBaseConfig/FireBaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Backend API endpoints
const getApiBaseUrl = () => {
  // Check if we're in development
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }
  // Production - use Render backend
  return 'https://quickvacancy-job-portal-1.onrender.com';
};

const EMAIL_OTP_API_ENDPOINT = `${getApiBaseUrl()}/api/send-email-otp`;
const VERIFY_EMAIL_OTP_API_ENDPOINT = `${getApiBaseUrl()}/api/verify-email-otp`;

// Export two login components
export const LoginEmployee = () => <LoginForm userType="employee" />;
export const LoginEmployer = () => <LoginForm userType="employer" />;

const LoginForm = ({ userType }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  
  // Email OTP states
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");

  const sendEmailOtp = async (emailAddress) => {
    try {
      console.log('Sending OTP to:', EMAIL_OTP_API_ENDPOINT);
      const response = await fetch(EMAIL_OTP_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailAddress
        })
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`Failed to send email OTP: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('OTP response:', result);
      return result.success;
    } catch (error) {
      console.error('Error sending email OTP:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error: Unable to connect to server. Please check your internet connection.');
      }
      throw error;
    }
  };

  const verifyEmailOtp = async (emailAddress, otpCode) => {
    try {
      const response = await fetch(VERIFY_EMAIL_OTP_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailAddress,
          otp: otpCode
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to verify email OTP');
      }

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Error verifying email OTP:', error);
      throw error;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // Remove email verification checks and always log in
      const collectionName = userType === "employer" ? "employerDB" : "employeeDB";
      const userDoc = await getDoc(doc(db, collectionName, user.uid));
      if (!userDoc.exists()) {
        setErrorMessage("User data not found. Please contact support.");
        setLoading(false);
        return;
      }
      // Set the user as logged in
      localStorage.setItem("userId", user.uid);
      setIsLoggedIn(true);
      navigate("/");
    } catch (error) {
      setErrorMessage(
        error.message.includes("user-not-found")
          ? "User not registered."
          : "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmailOtp = async () => {
    if (!email) {
      setErrorMessage("No email found. Please try logging in again.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      // First check if backend is accessible
      const healthCheckUrl = `${getApiBaseUrl()}/api/health`;
      console.log('Checking backend health at:', healthCheckUrl);
      
      try {
        const healthResponse = await fetch(healthCheckUrl);
        console.log('Health check status:', healthResponse.status);
        if (!healthResponse.ok) {
          throw new Error(`Backend health check failed: ${healthResponse.status}`);
        }
        const healthData = await healthResponse.json();
        console.log('Backend health:', healthData);
      } catch (healthError) {
        console.error('Health check failed:', healthError);
        setErrorMessage('Backend server is not accessible. Please try again later.');
        return;
      }

      const emailOtpSent = await sendEmailOtp(email);
      
      if (emailOtpSent) {
        setEmailOtpSent(true);
        alert(`Email OTP sent to ${email}. Please check your inbox.`);
      } else {
        throw new Error('Failed to send email OTP');
      }
      
    } catch (error) {
      console.error('Error sending email OTP:', error);
      setErrorMessage(`Failed to send email OTP: ${error.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    if (!emailOtp || emailOtp.length !== 6) {
      setErrorMessage("Please enter a 6-digit email OTP");
      return;
    }
    
    if (!email) {
      setErrorMessage("No email found. Please try logging in again.");
      return;
    }
    
    setLoading(true);
    setErrorMessage("");
    
    try {
      const verified = await verifyEmailOtp(email, emailOtp);
      
      if (verified) {
        // Update Firestore with verified status
        const collectionName = userType === "employer" ? "employerDB" : "employeeDB";
        await setDoc(doc(db, collectionName, email), {
          emailVerified: true
        }, { merge: true });

        // Set the user as logged in
        localStorage.setItem("userId", email);
        setIsLoggedIn(true);
      } else {
        setErrorMessage('Invalid email OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying email OTP:', error);
      setErrorMessage(`Email verification failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmailVerification = async () => {
    if (!email) {
      setErrorMessage("No user found. Please try logging in again.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      await sendEmailVerification(email);
      alert("Email verification sent! Please check your inbox.");
    } catch (error) {
      console.error("Error resending email verification:", error);
      setErrorMessage("Failed to resend email verification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckEmailVerification = async () => {
    if (!email) {
      setErrorMessage("No user found. Please try logging in again.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      // Reload user to get latest verification status
      await email.reload();
      
      if (email.emailVerified) {
        // Update Firestore with verified status
        const collectionName = userType === "employer" ? "employerDB" : "employeeDB";
        await setDoc(doc(db, collectionName, email.uid), {
          emailVerified: true
        }, { merge: true });

        // Set the user as logged in
        localStorage.setItem("userId", email.uid);
        setIsLoggedIn(true);
      } else {
        setErrorMessage("Email not verified yet. Please check your inbox and click the verification link.");
      }
    } catch (error) {
      console.error("Error checking email verification:", error);
      setErrorMessage("Failed to check email verification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const collectionName = userType === "employer" ? "employerDB" : "employeeDB";
      const userDocRef = doc(db, collectionName, user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        localStorage.setItem("userId", user.uid);
        setIsLoggedIn(true);
        navigate("/");
      } else {
        // New Google user, prompt to confirm registration as this type
        if (!window.confirm(`No account found. Do you want to register as a ${userType}?`)) {
          setLoading(false);
          return;
        }
        await setDoc(userDocRef, {
          uid: user.uid,
          name: user.displayName || "",
          email: user.email,
          phone: user.phoneNumber || "",
          emailVerified: true, // Google accounts are pre-verified
          createdAt: new Date()
        });
        localStorage.setItem("userId", user.uid);
        setIsLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      setErrorMessage("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    // Redirect to dashboard based on userType
    return <Navigate to={userType === "employee" ? "/employee-dashboard" : "/employer-dashboard"} replace />;
  }

  return (
    <div className={styles.dashboardContainer}>
      <Header backgroundColor="#0D4470" />
      <Navbar color="#0D4470" />
      <div className={styles.mainContentContainer}>
        <div className={styles.mainContent}>
          <div className={styles.imageContainer}>
            <img
              src="/images/creative-people-working-office 1.png"
              alt="Office team"
              className={styles.image}
            />
            <div className={styles.logoOverlay}>
              <img
                src="/images/Quick-Vacancy-Consultancy-logo 3.png"
                alt="Logo"
                className={styles.logo}
              />
            </div>
          </div>

          <div className={styles.loginContainer}>
            <h2 className={styles.loginTitle}>Welcome Back</h2>
            <h3>{userType === "employee" ? "Employee Login" : "Employer Login"}</h3>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            
            {!showEmailVerification ? (
              <form onSubmit={handleLogin}>
                <div className={styles.formGroup}>
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Password</label>
                  <div className={styles.passwordContainer}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className={styles.passwordInput}
                    />
                    <div
                      type="button"
                      className={styles.eyeButton}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <img
                        src={showPassword ? "/images/eye.svg" : "/images/hide.svg"}
                        alt={showPassword ? "Show" : "Hide"}
                      />
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className={styles.loginButton}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                <button
                  type="button"
                  className={styles.loginButton}
                  style={{ marginTop: 10, background: '#4285F4', color: 'white' }}
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  {loading ? "Signing in with Google..." : "Login with Google"}
                </button>
              </form>
            ) : (
              <div className={styles.verificationContainer}>
                <h3>Email Verification Required</h3>
                <p>Your email address <strong>{email}</strong> needs to be verified before you can log in.</p>
                <p>Please check your inbox and click the verification link, or use the OTP option below.</p>
                
                <div className={styles.verificationButtons}>
                  <button
                    onClick={handleCheckEmailVerification}
                    disabled={loading}
                    className={styles.verifyButton}
                  >
                    {loading ? (
                      <>
                        <span className={styles.loadingSpinner}></span>
                        Checking...
                      </>
                    ) : (
                      "I've Verified My Email"
                    )}
                  </button>
                  
                  <button
                    onClick={handleResendEmailVerification}
                    disabled={loading}
                    className={styles.resendButton}
                  >
                    {loading ? (
                      <>
                        <span className={styles.loadingSpinner}></span>
                        Sending...
                      </>
                    ) : (
                      "Resend Verification Email"
                    )}
                  </button>
                </div>

                {/* Email OTP Section */}
                <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(255, 255, 255, 0.5)', borderRadius: '10px', border: '1px solid #dee2e6' }}>
                  <h4 style={{ color: '#0d4470', marginBottom: '10px', fontSize: '1rem' }}>Or verify with Email OTP:</h4>
                  
                  {!emailOtpSent ? (
                    <button
                      onClick={handleSendEmailOtp}
                      disabled={loading}
                      style={{ 
                        padding: '8px 16px', 
                        backgroundColor: '#17a2b8', 
                        color: 'white', 
                        border: 'none', 
                        borderRadius: '20px', 
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      {loading ? "Sending..." : "Send Email OTP"}
                    </button>
                  ) : (
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={emailOtp}
                        onChange={(e) => setEmailOtp(e.target.value)}
                        maxLength={6}
                        style={{ 
                          padding: '8px', 
                          borderRadius: '4px', 
                          border: '1px solid #ccc',
                          width: '120px',
                          textAlign: 'center',
                          fontSize: '0.9rem'
                        }}
                      />
                      <button
                        onClick={handleVerifyEmailOtp}
                        disabled={loading}
                        style={{ 
                          padding: '8px 16px', 
                          backgroundColor: '#28a745', 
                          color: 'white', 
                          border: 'none', 
                          borderRadius: '20px', 
                          cursor: 'pointer',
                          fontSize: '0.85rem'
                        }}
                      >
                        {loading ? "Verifying..." : "Verify OTP"}
                      </button>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => setShowEmailVerification(false)}
                  className={styles.backButton}
                >
                  Back to Login
                </button>
                
                <div className={styles.verificationInfo}>
                  <p>Didn't receive the email? Check your spam folder or try resending.</p>
                </div>
              </div>
            )}
            
            <p style={{ marginTop: "30px" }}>
              No account? <Link to={userType === "employee" ? "/sign-up/employee" : "/sign-up/employer"}>Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
