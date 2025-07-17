import React, { useState, useRef } from "react";
import { Navbar } from "../../layout/navbar/Navbar";
import Header from "../../layout/header/Header";
import styles from "./SignUp.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";
import { auth, app } from "../../fireBaseConfig/FireBaseConfig";
import { db } from "../../fireBaseConfig/FireBaseConfig";
import { doc, setDoc } from "firebase/firestore";

// Twilio configuration (you'll need to set these up)
const TWILIO_ACCOUNT_SID = 'your_twilio_account_sid';
const TWILIO_AUTH_TOKEN = 'your_twilio_auth_token';
const TWILIO_PHONE_NUMBER = 'your_twilio_phone_number';

// Backend API endpoints
const SMS_API_ENDPOINT = 'http://localhost:5000/api/send-sms';
const EMAIL_OTP_API_ENDPOINT = 'http://localhost:5000/api/send-email-otp';
const VERIFY_EMAIL_OTP_API_ENDPOINT = 'http://localhost:5000/api/verify-email-otp';

export const SignUpEmployee = () => {
  return <SignUpForm userType="employee" />;
};

export const SignUpEmployer = () => {
  return <SignUpForm userType="employer" />;
};

const SignUpForm = ({ userType }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailVerificationSent, setEmailVerificationSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [userCredential, setUserCredential] = useState(null);
  
  // Email OTP states
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);

  const sendSMS = async (phoneNumber, otp) => {
    try {
      const response = await fetch(SMS_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: phoneNumber,
          message: `Your QuickVacancy verification code is: ${otp}. Valid for 5 minutes.`
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send SMS');
      }

      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw error;
    }
  };

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

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      setErrorMessage("Please enter a valid phone number");
      return;
    }
    
    setErrorMessage("");
    setLoading(true);
    
    try {
      // Generate a random 6-digit OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Send real SMS via Twilio
      const smsSent = await sendSMS(phone, generatedOtp);
      
      if (smsSent) {
        // Store OTP in sessionStorage for verification
        sessionStorage.setItem('phoneOtp', generatedOtp);
        sessionStorage.setItem('phoneNumber', phone);
        sessionStorage.setItem('otpTimestamp', Date.now().toString());
        
        setOtpSent(true);
        alert(`OTP sent to ${phone}. Please check your SMS.`);
      } else {
        throw new Error('Failed to send SMS');
      }
      
    } catch (error) {
      console.error('Error sending OTP:', error);
      setErrorMessage(`Failed to send OTP: ${error.message}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      setErrorMessage("Please enter a 6-digit OTP");
      return;
    }
    
    setErrorMessage("");
    setLoading(true);
    
    try {
      // Get stored OTP data
      const storedOtp = sessionStorage.getItem('phoneOtp');
      const storedPhone = sessionStorage.getItem('phoneNumber');
      const otpTimestamp = parseInt(sessionStorage.getItem('otpTimestamp') || '0');
      
      // Check if phone number matches
      if (storedPhone !== phone) {
        setErrorMessage('Phone number changed. Please send OTP again.');
        return;
      }
      
      // Check if OTP is expired (5 minutes)
      const now = Date.now();
      if (now - otpTimestamp > 5 * 60 * 1000) {
        setErrorMessage('OTP expired. Please send a new OTP.');
        sessionStorage.removeItem('phoneOtp');
        sessionStorage.removeItem('phoneNumber');
        sessionStorage.removeItem('otpTimestamp');
        setOtpSent(false);
        return;
      }
      
      // Verify OTP
      if (otp === storedOtp) {
        setPhoneVerified(true);
        // Clear stored data
        sessionStorage.removeItem('phoneOtp');
        sessionStorage.removeItem('phoneNumber');
        sessionStorage.removeItem('otpTimestamp');
        alert("Phone number verified successfully!");
      } else {
        setErrorMessage('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setErrorMessage(`Verification failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSendEmailOtp = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    
    setErrorMessage("");
    setLoading(true);
    
    try {
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

  const handleVerifyEmailOtp = async (e) => {
    e.preventDefault();
    if (!emailOtp || emailOtp.length !== 6) {
      setErrorMessage("Please enter a 6-digit email OTP");
      return;
    }
    
    setErrorMessage("");
    setLoading(true);
    
    try {
      const verified = await verifyEmailOtp(email, emailOtp);
      
      if (verified) {
        setEmailOtpVerified(true);
        alert("Email verified successfully!");
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
    if (!userCredential) {
      setErrorMessage("No user account found. Please complete signup first.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    try {
      await sendEmailVerification(userCredential.user);
      setEmailVerificationSent(true);
      alert("Email verification sent again! Please check your inbox.");
    } catch (error) {
      console.error("Error resending email verification:", error);
      setErrorMessage("Failed to resend email verification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const checkEmailVerification = async () => {
    if (!userCredential) return false;

    try {
      // Reload user to get latest verification status
      await userCredential.user.reload();
      const isVerified = userCredential.user.emailVerified;
      setEmailVerified(isVerified);
      return isVerified;
    } catch (error) {
      console.error("Error checking email verification:", error);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    // Validate all required fields
    if (!name.trim()) {
      setErrorMessage("Name is required");
      setLoading(false);
      return;
    }

    if (!email.trim()) {
      setErrorMessage("Email is required");
      setLoading(false);
      return;
    }

    if (!phone.trim()) {
      setErrorMessage("Phone number is required");
      setLoading(false);
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    if (userType === "employer" && !companyName.trim()) {
      setErrorMessage("Company name is required for employers");
      setLoading(false);
      return;
    }

    if (!phoneVerified) {
      setErrorMessage("Please verify your phone number first");
      setLoading(false);
      return;
    }

    if (!emailOtpVerified) {
      setErrorMessage("Please verify your email address first");
      setLoading(false);
      return;
    }

    try {
      console.log("Creating user with email:", email);
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      
      const user = credential.user;
      setUserCredential(credential);
      console.log("User created successfully:", user.uid);
      
      // Store user info in the correct collection
      const collectionName = userType === "employer" ? "employerDB" : "employeeDB";
      await setDoc(doc(db, collectionName, user.uid), {
        uid: user.uid,
        name: name.trim(),
        companyName: userType === "employer" ? companyName.trim() : "",
        email: email.trim(),
        phone: phone.trim(),
        emailVerified: true,
        createdAt: new Date()
      });
      
      console.log("User data stored in Firestore");
      
      // Send email verification (Firebase's built-in verification)
      await sendEmailVerification(user);
      console.log("Email verification sent");
      
      setEmailVerificationSent(true);
      // Don't set isLoggedIn to true yet - wait for email verification
    } catch (error) {
      console.error("Signup error:", error);
      
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage("An account with this email already exists. Please use a different email or try logging in.");
      } else if (error.code === 'auth/weak-password') {
        setErrorMessage("Password is too weak. Please choose a stronger password.");
      } else if (error.code === 'auth/invalid-email') {
        setErrorMessage("Invalid email address. Please enter a valid email.");
      } else if (error.code === 'auth/operation-not-allowed') {
        setErrorMessage("Email/password accounts are not enabled. Please contact support.");
      } else {
        setErrorMessage(`Signup failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteSignup = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const isVerified = await checkEmailVerification();
      
      if (isVerified) {
        // Update Firestore with verified status
        const collectionName = userType === "employer" ? "employerDB" : "employeeDB";
        await setDoc(doc(db, collectionName, userCredential.user.uid), {
          uid: userCredential.user.uid,
          name: name.trim(),
          companyName: userType === "employer" ? companyName.trim() : "",
          email: email.trim(),
          phone: phone.trim(),
          emailVerified: true,
          createdAt: new Date()
        }, { merge: true });

        // Set user as logged in
        localStorage.setItem("userId", userCredential.user.uid);
        setIsLoggedIn(true);
      } else {
        setErrorMessage("Email not verified yet. Please check your inbox and click the verification link.");
      }
    } catch (error) {
      console.error("Error completing signup:", error);
      setErrorMessage("Failed to complete signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleToggleUserType = () => {
    if (userType === "employee") {
      navigate("/sign-up/employer");
    } else {
      navigate("/sign-up/employee");
    }
  };

  return (
    <div>
      <Header backgroundColor="#0D4470" />
      <Navbar color="#0D4470" />
      <div className={styles.signupContainer}>
        <h2 className={styles.signupTitle}>Sign up ({userType})</h2>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        
        {!emailVerificationSent ? (
          <form className={styles.signupForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>
            {userType === "employer" && (
              <div className={styles.formGroup}>
                <label htmlFor="companyName">Your company name</label>
                <input
                  type="text"
                  id="companyName"
                  placeholder="Your company name"
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                  required
                />
              </div>
            )}
            <div className={styles.formGroup}>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="Email address"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                disabled={emailOtpVerified}
              />
              {!emailOtpVerified && (
                <button onClick={handleSendEmailOtp} disabled={loading} type="button" style={{ marginTop: '10px', padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  {loading ? "Sending Email OTP..." : "Send Email OTP"}
                </button>
              )}
              {emailOtpSent && !emailOtpVerified && (
                <div style={{ marginTop: '10px' }}>
                  <input
                    type="text"
                    placeholder="Enter 6-digit Email OTP"
                    value={emailOtp}
                    onChange={(e) => setEmailOtp(e.target.value)}
                    maxLength={6}
                    style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
                  <button onClick={handleVerifyEmailOtp} disabled={loading} type="button" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {loading ? "Verifying..." : "Verify Email OTP"}
                  </button>
                </div>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone">Phone number</label>
              <input
                type="tel"
                id="phone"
                placeholder="Phone number (e.g., +918879520748)"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
                disabled={phoneVerified}
              />
              {!phoneVerified && (
                <button onClick={handleSendOtp} disabled={loading} type="button" style={{ marginTop: '10px', padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                  {loading ? "Sending SMS..." : "Send OTP"}
                </button>
              )}
              {otpSent && !phoneVerified && (
                <div style={{ marginTop: '10px' }}>
                  <input
                    type="text"
                    placeholder="Enter 6-digit OTP from SMS"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    style={{ padding: '8px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                  />
                  <button onClick={handleVerifyOtp} disabled={loading} type="button" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              )}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <button
              className={styles.postJobButton}
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>
        ) : (
          <div className={styles.verificationContainer}>
            <h3>Email Verification Required</h3>
            <p>We've sent a verification email to <strong>{email}</strong></p>
            <p>Please check your inbox and click the verification link to complete your registration.</p>
            
            <div className={styles.verificationButtons}>
              <button
                onClick={handleCompleteSignup}
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
            
            <div className={styles.verificationInfo}>
              <p>Didn't receive the email? Check your spam folder or try resending.</p>
            </div>
          </div>
        )}
        
        <button onClick={handleToggleUserType} className={styles.toggleButton}>
          Switch to {userType === "employee" ? "Employer" : "Employee"} Sign Up
        </button>
      </div>
    </div>
  );
};