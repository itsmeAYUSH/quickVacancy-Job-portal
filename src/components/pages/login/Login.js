import React, { useState } from "react";
import styles from "./Login.module.css";
import Header from "../../layout/header/Header";
import { Navbar } from "../../layout/navbar/Navbar";
import { Link, Navigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendEmailVerification } from "firebase/auth";
import { auth, db } from "../../fireBaseConfig/FireBaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Backend API endpoints
const EMAIL_OTP_API_ENDPOINT = 'http://localhost:5000/api/send-email-otp';
const VERIFY_EMAIL_OTP_API_ENDPOINT = 'http://localhost:5000/api/verify-email-otp';

// Export two login components
export const LoginEmployee = () => <LoginForm userType="employee" />;
export const LoginEmployer = () => <LoginForm userType="employer" />;

const LoginForm = ({ userType }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Email OTP states
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");

  const sendEmailOtp = async (emailAddress) => {
    try {
      const response = await fetch(EMAIL_OTP_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailAddress
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send email OTP');
      }

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Error sending email OTP:', error);
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
      
      // Check if email is verified
      if (!user.emailVerified) {
        setCurrentUser(user);
        setShowEmailVerification(true);
        setLoading(false);
        return;
      }

      const collectionName = userType === "employer" ? "employerDB" : "employeeDB";
      const userDoc = await getDoc(doc(db, collectionName, user.uid));
      if (!userDoc.exists()) {
        setErrorMessage("User data not found. Please contact support.");
        setLoading(false);
        return;
      }
      
      // Check if user data has emailVerified field and it's true
      const userData = userDoc.data();
      if (userData.emailVerified === false) {
        setCurrentUser(user);
        setShowEmailVerification(true);
        setLoading(false);
        return;
      }
      
      // Set the user as logged in
      localStorage.setItem("userId", user.uid);
      setIsLoggedIn(true);
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
    if (!currentUser?.email) {
      setErrorMessage("No email found. Please try logging in again.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      const emailOtpSent = await sendEmailOtp(currentUser.email);
      
      if (emailOtpSent) {
        setEmailOtpSent(true);
        alert(`Email OTP sent to ${currentUser.email}. Please check your inbox.`);
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
    
    if (!currentUser?.email) {
      setErrorMessage("No email found. Please try logging in again.");
      return;
    }
    
    setLoading(true);
    setErrorMessage("");
    
    try {
      const verified = await verifyEmailOtp(currentUser.email, emailOtp);
      
      if (verified) {
        // Update Firestore with verified status
        const collectionName = userType === "employer" ? "employerDB" : "employeeDB";
        await setDoc(doc(db, collectionName, currentUser.uid), {
          emailVerified: true
        }, { merge: true });

        // Set the user as logged in
        localStorage.setItem("userId", currentUser.uid);
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
    if (!currentUser) {
      setErrorMessage("No user found. Please try logging in again.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      await sendEmailVerification(currentUser);
      alert("Email verification sent! Please check your inbox.");
    } catch (error) {
      console.error("Error resending email verification:", error);
      setErrorMessage("Failed to resend email verification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckEmailVerification = async () => {
    if (!currentUser) {
      setErrorMessage("No user found. Please try logging in again.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      // Reload user to get latest verification status
      await currentUser.reload();
      
      if (currentUser.emailVerified) {
        // Update Firestore with verified status
        const collectionName = userType === "employer" ? "employerDB" : "employeeDB";
        await setDoc(doc(db, collectionName, currentUser.uid), {
          emailVerified: true
        }, { merge: true });

        // Set the user as logged in
        localStorage.setItem("userId", currentUser.uid);
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
              src="./images/creative-people-working-office 1.png"
              alt="Office team"
              className={styles.image}
            />
            <div className={styles.logoOverlay}>
              <img
                src="./images/Quick-Vacancy-Consultancy-logo 3.png"
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
                <p>Your email address <strong>{currentUser?.email}</strong> needs to be verified before you can log in.</p>
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
