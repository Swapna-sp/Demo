'use client'

import { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { auth } from '@/firebase/config';

interface PhoneNumberInputProps {
  onOTPRequest: (confirmationResult: any) => void;
}

export default function PhoneNumberInput({ onOTPRequest }: PhoneNumberInputProps) {
  const [phone, setPhone] = useState('');

  const sendOTP = async () => {
    try {
      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible'
      });

      const result = await signInWithPhoneNumber(auth, phone, verifier);
      onOTPRequest(result);
      alert('OTP sent successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to send OTP');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto items-center bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
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
      <div id="recaptcha-container"></div>
    </div>
  );
}
