import React, { useState, useEffect } from 'react';
import PhoneNumberForm from './components/PhoneNumberForm';
import OtpVerificationForm from './components/OtpVerificationForm';
import ContactAdditionForm from './components/ContactAddition';
import SendLocation from './components/SendLocation';
import axios from 'axios';

const App = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Check local storage for authentication status
    const isUserAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isUserAuthenticated) {
      setIsVerified(true);
      setStep(3); // Skip to the contact addition step
    }
  }, []);

  const handlePhoneSubmit = (phone) => {
    setPhoneNumber(phone);
    setStep(2); // Move to the OTP step
  };

  const handleOtpSubmit = async (otp) => {
    try {
      const response = await axios.post('http://localhost:4000/api/verify', { otp });
      if (response.data.message === 'OTP verified successfully') {
        setIsVerified(true);
        setStep(3); // Move to the contact addition step

        // Save authentication status in local storage
        localStorage.setItem('isAuthenticated', 'true');
      } else {
        alert('Incorrect OTP. Please try again.');
      }
    } catch (error) {
      alert('Error verifying OTP. Please try again.');
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    // Clear authentication status from local storage
    localStorage.removeItem('isAuthenticated');
    setIsVerified(false);
    setStep(1); // Go back to the phone number form
  };

  return (
    <div>
      {step === 1 && <PhoneNumberForm onPhoneSubmit={handlePhoneSubmit} />}
      {step === 2 && <OtpVerificationForm onOtpSubmit={handleOtpSubmit} />}
      {step === 3 && isVerified && (
        <>
          <ContactAdditionForm />
          <SendLocation />
          
        </>
      )}
    </div>
  );
};

export default App;