'use client';

import { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';
import { auth } from '@/firebase/config';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  // Send OTP
  const sendOTP = async () => {
    try {
      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });

      const result = await signInWithPhoneNumber(auth, phone, verifier);
      setConfirmationResult(result);
      alert('OTP sent successfully!');
    } catch (error) {
      // Better error handling
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Failed to send OTP');
      }
    }
  };

  // Verify OTP
  const verifyOTP = async () => {
    try {
      if (!confirmationResult) {
        alert('No confirmation result found.');
        return;
      }
      await confirmationResult.confirm(otp);
      alert('Phone number verified!');
    } catch (error) {
      // Better error handling
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Invalid OTP');
      }
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Login with Phone</h1>
      <PhoneInput
        defaultCountry="us"
        value={phone}
        onChange={setPhone}
        className="mb-4"
      />
      <button
        onClick={sendOTP}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-4"
      >
        Send OTP
      </button>

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

      <div id="recaptcha-container"></div>
    </div>
  );
}
