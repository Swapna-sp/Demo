'use client'

import { useState } from 'react';

interface OTPVerificationProps {
  confirmationResult: any;
}

export default function OTPVerification({ confirmationResult }: OTPVerificationProps) {
  const [otp, setOtp] = useState('');

  const verifyOTP = async () => {
    try {
      if (!confirmationResult) {
        alert('No confirmation result found.');
        return;
      }
      await confirmationResult.confirm(otp);
      alert('Phone number verified!');
    } catch (error: any) {
      alert(error.message || 'Invalid OTP');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto items-center bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
      <h1 className="text-2xl font-semibold mb-4">Verify OTP</h1>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full px-3 py-2 border rounded mb-2"
      />
      <button
        onClick={verifyOTP}
        className="bg-green-600 text-white px-4 py-2 rounded w-full"
      >
        Verify OTP
      </button>
    </div>
  );
}
