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
       const token = await grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action: 'submit'});
       const captchaResponse = await fetch('/api/verify-recaptcha', {
       method: 'POST',
       headers: {'Content-type': 'application/json'},
       body: JSON.stringify({ token }),

       });

       const captchaResult = await captchaResponse.json();
       if (!captchaResult.success) {
         throw new Error('reCAPTCHA verification failed');
       }
   
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
    <div className="max-w-sm w-full mx-auto bg-white p-6 rounded-xl shadow-md text-center relative">
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
        <div
          role="status"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 
                 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 
                 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 
                 100 50.5908ZM9.08144 50.5908C9.08144 
                 73.1895 27.4013 91.5094 50 91.5094C72.5987 
                 91.5094 90.9186 73.1895 90.9186 
                 50.5908C90.9186 27.9921 72.5987 
                 9.67226 50 9.67226C27.4013 9.67226 9.08144 
                 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 
                 38.4038 97.8624 35.9116 97.0079 
                 33.5539C95.2932 28.8227 92.871 
                 24.3692 89.8167 20.348C85.8452 
                 15.1192 80.8826 10.7238 75.2124 
                 7.41289C69.5422 4.10194 63.2754 
                 1.94025 56.7698 1.05124C51.7666 
                 0.367541 46.6976 0.446843 41.7345 
                 1.27873C39.2613 1.69328 37.813 
                 4.19778 38.4501 6.62326C39.0873 
                 9.04874 41.5694 10.4717 44.0505 
                 10.1071C47.8511 9.54855 51.7191 
                 9.52689 55.5402 10.0491C60.8642 
                 10.7766 65.9928 12.5457 70.6331 
                 15.2552C75.2735 17.9648 79.3347 
                 21.5619 82.5849 25.841C84.9175 
                 28.9121 86.7997 32.2913 88.1811 
                 35.8758C89.083 38.2158 91.5421 
                 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
}
