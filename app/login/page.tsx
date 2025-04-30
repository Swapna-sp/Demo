'use client';

import { useEffect, useRef, useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { auth } from '@/firebase/config';
import { signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { RecaptchaVerifier } from 'firebase/auth';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

 useEffect(() => {
  if (!recaptchaVerifierRef.current && typeof window !== 'undefined') {
    recaptchaVerifierRef.current = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response: string) => {
          console.log('reCAPTCHA solved:', response);
        },
      }
    );

    recaptchaVerifierRef.current.render().then((widgetId) => {
      console.log('reCAPTCHA widget rendered:', widgetId);
    });
  }
}, []);


  const handleSendOtp = async () => {
    if (!recaptchaVerifierRef.current) {
      alert('reCAPTCHA verifier is not initialized yet.');
      return;
    }

    try {
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptchaVerifierRef.current);
      setConfirmationResult(confirmation);
      alert('OTP sent!');
    } catch (error: any) {
      console.error('Error sending OTP:', error);
      alert(error.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    if (!confirmationResult) return;
    try {
      await confirmationResult.confirm(otp);
      alert('Phone number verified!');
    } catch (error: any) {
      console.error('Error verifying OTP:', error);
      alert('Invalid OTP');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow">
      <h1 className="text-xl font-bold mb-6 text-center">Phone Login with OTP</h1>

      <PhoneInput
        defaultCountry="us"
        value={phone}
        onChange={setPhone}
        className="mb-4"
        inputClassName="border p-2 w-full rounded"
      />

      <button
        onClick={handleSendOtp}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Send OTP
      </button>

      {confirmationResult && (
        <div className="mt-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="border p-2 w-full rounded mb-2"
          />
          <button
            onClick={handleVerifyOtp}
            className="bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Verify OTP
          </button>
        </div>
      )}

      {/* reCAPTCHA container (invisible) */}
      <div id="recaptcha-container"></div>
    </div>
  );
}
