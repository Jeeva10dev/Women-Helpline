import React, { useState } from 'react';
import './stylesheets/OtpVerificationForm.css'
import axios from 'axios';

const OtpVerificationForm = ({ onOtpSubmit }) => {
  const [otp, setOtp] = useState(0);
  // const [verificationMessage, setVerificationMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onOtpSubmit(otp);
  
  };

  return (
    <div className="form-container">
    <form onSubmit={handleSubmit} className="phone-form"><b className='otp'>OTP Verification</b><br/>
      <input
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="Enter OTP"
        required
      />
      <button type="submit" className="submit-button">Verify OTP</button>
    </form>
    </div>
  );
};

export default OtpVerificationForm;