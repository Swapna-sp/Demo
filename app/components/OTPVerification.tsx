// 'use client'

// import { useState } from 'react';

// interface OTPVerificationProps {
//   confirmationResult: any;
// }

// export default function OTPVerification({ confirmationResult }: OTPVerificationProps) {
//   const [otp, setOtp] = useState('');

//   const verifyOTP = async () => {
//     try {
//       if (!confirmationResult) {
//         alert('No confirmation result found.');
//         return;
//       }
//       await confirmationResult.confirm(otp);
//       alert('Phone number verified!');
//     } catch (error: any) {
//       alert(error.message || 'Invalid OTP');
//     }
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto items-center bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
//       <h1 className="text-2xl font-semibold mb-4">Verify OTP</h1>
//       <input
//         type="text"
//         placeholder="Enter OTP"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         className="w-full px-3 py-2 border rounded mb-2"
//       />
//       <button
//         onClick={verifyOTP}
//         className="bg-blue-600 text-white px-4 py-2 rounded w-full"
//       >
//         Verify OTP
//       </button>
//     </div>
//   );
// }


'use client'

import { useState, useEffect } from 'react';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { auth } from '@/firebase/config';

interface OTPVerificationProps {
  confirmationResult: any;
  phone: string;
  onOTPRequest: (confirmationResult: any, phone: string) => void;
}

export default function OTPVerification({ confirmationResult, phone, onOTPRequest }: OTPVerificationProps) {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const verifyOTP = async () => {
    try {
      await confirmationResult.confirm(otp);
      alert('Phone number verified!');
    } catch (error: any) {
      alert(error.message || 'Invalid OTP');
    }
  };

  const resendOTP = async () => {
    try {
      setIsResendDisabled(true);
      setTimer(60);

      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
      const result = await signInWithPhoneNumber(auth, phone, verifier);
      onOTPRequest(result, phone);
      alert('OTP resent successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to resend OTP');
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
        className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-2"
      >
        Verify OTP
      </button>
      <button
        onClick={resendOTP}
        disabled={isResendDisabled}
        className={`px-4 py-2 rounded w-full ${
          isResendDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 text-white'
        }`}
      >
        {isResendDisabled ? `Resend OTP in ${timer}s` : 'Resend OTP'}
      </button>
      <div id="recaptcha-container"></div>
    </div>
  );
}
