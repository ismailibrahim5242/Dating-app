import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Otp = () => {
  const [otp, setOtp] = useState('');  
  const navigate = useNavigate();
  const email = localStorage.getItem('emailForOtp');  

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
     
      const response = await axios.post('http://localhost:5000/api/verify-otp', {
        email,
        otp,
      });

      if (response.data.success) {
        alert('Email verified successfully!');
        localStorage.removeItem('emailForOtp'); 
        navigate('/dashboard');  
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('OTP verification failed', error);
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="otp-verification-container">
        <h2 className="text-center">Verify OTP</h2>
        <form onSubmit={handleOtpSubmit} className="otp-form">
          <div className="form-group mb-3">
            <label htmlFor="otp">Enter the OTP sent to your email:</label>
            <input
              type="text"
              className="form-control"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Verify OTP</button>
        </form>
      </div>
    </div>
  );
};

export default Otp;
