'use client'
import { useState } from 'react';
import PhoneNumberInput from '../components/PhoneNumberInput';
import OTPVerification from '../components/OTPVerification';
import { ConfirmationResult } from 'firebase/auth';


export default function LoginPage() {
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [phone, setPhone] = useState<string>('');

  const handleOTPRequest = (result: ConfirmationResult, phone: string) => {
    setConfirmationResult(result);
    setPhone(phone);
  };

  return (
    <div className="mt-50">
      {confirmationResult ? (
        <OTPVerification
          confirmationResult={confirmationResult}
          phone={phone}
          onOTPRequest={handleOTPRequest}
        />
      ) : (
        <PhoneNumberInput onOTPRequest={handleOTPRequest} />
      )}
    </div>
  );
}
