const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, 'server.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Twilio configuration
let twilioClient;

// Check if Twilio credentials are properly configured
if (process.env.TWILIO_ACCOUNT_SID && 
    process.env.TWILIO_ACCOUNT_SID.startsWith('AC') && 
    process.env.TWILIO_AUTH_TOKEN && 
    process.env.TWILIO_AUTH_TOKEN !== 'your_twilio_auth_token' &&
    process.env.TWILIO_ACCOUNT_SID !== 'simulation_mode') {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  console.log('Twilio configured successfully');
} else {
  console.log('Twilio credentials not configured. SMS will be simulated.');
  // Create a mock Twilio client for development
  twilioClient = {
    messages: {
      create: async (messageData) => {
        console.log('=== SMS SIMULATION ===');
        console.log('To:', messageData.to);
        console.log('From:', messageData.from);
        console.log('Body:', messageData.body);
        console.log('=== END SMS SIMULATION ===');
        return { sid: 'simulated-' + Date.now() };
      }
    }
  };
}

// Email configuration
let transporter;

// Check if email credentials are configured
if (process.env.EMAIL_USER && 
    process.env.EMAIL_PASS && 
    process.env.EMAIL_USER !== 'your_gmail_address@gmail.com' && 
    process.env.EMAIL_PASS !== 'your_gmail_app_password' &&
    process.env.EMAIL_USER !== 'simulation_mode') {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
} else {
  console.log('Email credentials not configured. Email OTP will be simulated.');
  // Create a mock transporter for development
  transporter = {
    sendMail: async (mailOptions) => {
      console.log('=== EMAIL OTP SIMULATION ===');
      console.log('To:', mailOptions.to);
      console.log('Subject:', mailOptions.subject);
      console.log('Content:', mailOptions.html);
      console.log('=== END EMAIL SIMULATION ===');
      return { messageId: 'simulated-' + Date.now() };
    }
  };
}

// Store OTP codes in memory (in production, use Redis or database)
const otpStore = new Map();

// SMS OTP endpoint
app.post('/api/send-sms', async (req, res) => {
  try {
    const { to, message } = req.body;
    
    if (!to || !message) {
      return res.status(400).json({ success: false, error: 'Phone number and message are required' });
    }

    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });

    console.log('SMS sent successfully:', result.sid);
    res.json({ success: true, messageId: result.sid });
  } catch (error) {
    console.error('Error sending SMS:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Email OTP endpoint
app.post('/api/send-email-otp', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP with timestamp (5 minutes expiry)
    otpStore.set(email, {
      otp: otp,
      timestamp: Date.now(),
      attempts: 0
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'QuickVacancy - Email Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0d4470, #3b8fd1); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">QuickVacancy</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Email Verification Code</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #dee2e6;">
            <h2 style="color: #0d4470; margin-bottom: 20px;">Your Verification Code</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; border: 2px solid #e9ecef;">
              <h1 style="color: #0d4470; font-size: 32px; letter-spacing: 8px; margin: 0; font-family: 'Courier New', monospace;">${otp}</h1>
            </div>
            
            <p style="color: #495057; line-height: 1.6; margin-bottom: 15px;">
              Please enter this 6-digit code in the verification form to complete your email verification.
            </p>
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="color: #856404; margin: 0; font-size: 14px;">
                <strong>Important:</strong> This code will expire in 5 minutes. If you didn't request this code, please ignore this email.
              </p>
            </div>
            
            <p style="color: #6c757d; font-size: 12px; margin-top: 30px; text-align: center;">
              This is an automated message from QuickVacancy. Please do not reply to this email.
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    
    console.log('Email OTP sent successfully to:', email);
    res.json({ success: true, message: 'Email OTP sent successfully' });
  } catch (error) {
    console.error('Error sending email OTP:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Verify Email OTP endpoint
app.post('/api/verify-email-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
      return res.status(400).json({ success: false, error: 'Email and OTP are required' });
    }

    const storedData = otpStore.get(email);
    
    if (!storedData) {
      return res.status(400).json({ success: false, error: 'No OTP found for this email' });
    }

    // Check if OTP is expired (5 minutes)
    const now = Date.now();
    if (now - storedData.timestamp > 5 * 60 * 1000) {
      otpStore.delete(email);
      return res.status(400).json({ success: false, error: 'OTP has expired' });
    }

    // Check if too many attempts
    if (storedData.attempts >= 3) {
      otpStore.delete(email);
      return res.status(400).json({ success: false, error: 'Too many failed attempts. Please request a new OTP.' });
    }

    // Verify OTP
    if (storedData.otp === otp) {
      otpStore.delete(email);
      res.json({ success: true, message: 'Email OTP verified successfully' });
    } else {
      // Increment attempts
      storedData.attempts += 1;
      otpStore.set(email, storedData);
      
      res.status(400).json({ 
        success: false, 
        error: 'Invalid OTP',
        attemptsLeft: 3 - storedData.attempts
      });
    }
  } catch (error) {
    console.error('Error verifying email OTP:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    emailConfigured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
    twilioConfigured: !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN)
  });
});

// Clean up expired OTPs (run every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [email, data] of otpStore.entries()) {
    if (now - data.timestamp > 5 * 60 * 1000) {
      otpStore.delete(email);
    }
  }
}, 5 * 60 * 1000);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`Email configured: ${!!(process.env.EMAIL_USER && process.env.EMAIL_PASS)}`);
  console.log(`Twilio configured: ${!!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN)}`);
}); 