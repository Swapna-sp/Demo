'use client';

import { useEffect, useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/firebase/config';

interface OTPVerificationProps {
  confirmationResult: any;
  phone: string;
  onOTPRequest: (confirmationResult: any, phone: string) => void;
}

export default function OTPVerification({
  confirmationResult,
  phone,
  onOTPRequest,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  // Handle OTP input field changes
  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      // Focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const verifyOTP = async () => {
    const code = otp.join('');
    if (code.length !== 4) {
      alert('Please enter the 4-digit OTP.');
      return;
    }
    try {
      await confirmationResult.confirm(code);
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
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full mx-auto font-sans text-center">
      <h2 className="text-lg font-semibold mb-2">Enter your OTP code to verify</h2>
      <p className="text-sm text-gray-600 mb-4">
        A 4 digit verification code has been sent to <strong>******{phone.slice(-4)}</strong>
      </p>

      <div className="flex justify-center gap-2 mb-4">
        {otp.map((digit, idx) => (
          <input
            key={idx}
            id={`otp-${idx}`}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value)}
            className="w-12 h-12 text-xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-2">
        Didn't receive any code?
      </p>

      <button
        onClick={resendOTP}
        disabled={isResendDisabled}
        className={`font-semibold mb-4 ${
          isResendDisabled
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-green-600 underline'
        }`}
      >
        RESEND OTP {isResendDisabled && `in 00:${timer < 10 ? `0${timer}` : timer}`}
      </button>

      <button
        onClick={verifyOTP}
        className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded mt-2"
      >
        VERIFY OTP
      </button>

      <div id="recaptcha-container"></div>
    </div>
  );
}
