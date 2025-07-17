// Test script to demonstrate email OTP functionality
const fetch = require('node-fetch');

async function testEmailOTP() {
  console.log('Testing Email OTP functionality...\n');
  
  try {
    // Test sending email OTP
    console.log('1. Sending Email OTP...');
    const sendResponse = await fetch('http://localhost:5000/api/send-email-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com'
      })
    });
    
    const sendResult = await sendResponse.json();
    console.log('Send Result:', sendResult);
    
    if (sendResult.success) {
      console.log('\n✅ Email OTP sent successfully!');
      console.log('📧 Check your server console for the simulated email content');
      console.log('🔢 The OTP code will be displayed in the console');
    } else {
      console.log('\n❌ Failed to send email OTP:', sendResult.error);
    }
    
  } catch (error) {
    console.log('\n❌ Error testing email OTP:', error.message);
  }
}

// Run the test
testEmailOTP(); 