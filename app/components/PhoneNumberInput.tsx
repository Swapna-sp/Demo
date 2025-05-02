'use client'

import { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { auth } from '@/firebase/config';

interface PhoneNumberInputProps {
  onOTPRequest: (confirmationResult: any, phone: string) => void;
}

export default function PhoneNumberInput({ onOTPRequest }: PhoneNumberInputProps) {
  const [phone, setPhone] = useState('');

  const sendOTP = async () => {
    if (!phone || phone.trim() === '') {
      alert('Please enter the phone number');
      return;
    }
  
    try {
      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible'
      });
  
      const result = await signInWithPhoneNumber(auth, phone, verifier);
      onOTPRequest(result, phone);
      alert('OTP sent successfully!');
    } catch (error: any) {
      alert(error.message || 'Failed to send OTP');
    }
  };
  
  return (
    <div className="max-w-sm w-full mx-auto bg-white p-6 rounded-xl shadow-md text-center">
      <p className="text-gray-500 text-md mb-8">
        Sign in or sign up now to unlock personalised deals and sync across all your devices
      </p>

      <PhoneInput
        defaultCountry="us"
        value={phone}
        onChange={setPhone}
        className="mb-8 w-full"
        inputClassName="w-full border rounded-md px-4 py-2"
      />

      <p className="text-md text-gray-500 mb-8">
        By continuing, you are indicating that you accept our{' '}
        <span className="text-blue-600 cursor-pointer">Terms of Service</span> and{' '}
        <span className="text-blue-600 cursor-pointer">Privacy Policy</span>.
      </p>

      <button
        onClick={sendOTP}
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 rounded w-full"
      >
        SEND OTP
      </button>

      <div id="recaptcha-container"></div>
    </div>
  );
}
