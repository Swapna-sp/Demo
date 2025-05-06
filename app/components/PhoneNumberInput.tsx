'use client';

import { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { auth } from '@/firebase/config';
import toast from 'react-hot-toast';

interface PhoneNumberInputProps {
  onOTPRequest: (confirmationResult: any, phone: string) => void;
}

export default function PhoneNumberInput({ onOTPRequest }: PhoneNumberInputProps) {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendOTP = async () => {
    if (!phone || phone.trim() === '') {
      toast.error('Please enter your phone number');
      return;
    }

    setIsLoading(true);

    try {
      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });

      const result = await signInWithPhoneNumber(auth, phone, verifier);
      onOTPRequest(result, phone);
      toast.success('OTP sent successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-sm w-full mx-auto bg-white p-6 rounded-xl shadow-md text-center">
      <p className="text-gray-500 text-md mb-8">
        Sign in or sign up now to unlock personalised deals and sync across all your devices
      </p>

      <PhoneInput
        defaultCountry="in"
        value={phone}
        onChange={setPhone}
        className="mb-8 w-full"
        inputClassName="w-full border rounded-md px-4 py-2"
        disabled={isLoading}
      />

      <p className="text-md text-gray-500 mb-8">
        By continuing, you are indicating that you accept our{' '}
        <span className="text-blue-600 cursor-pointer">Terms of Service</span> and{' '}
        <span className="text-blue-600 cursor-pointer">Privacy Policy</span>.
      </p>

      <button
        onClick={sendOTP}
        disabled={isLoading}
        className={`${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        } bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold py-3 rounded w-full`}
      >
        {isLoading ? 'SENDING OTP...' : 'SEND OTP'}
      </button>

      {isLoading && (
        <div className="w-full mt-4">
          <div className="h-1 bg-gray-200 rounded">
            <div className="h-full bg-blue-600 animate-pulse rounded" style={{ width: '100%' }} />
          </div>
        </div>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
}
