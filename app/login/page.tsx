// 'use client';
// import Image from 'next/image'
// import { useState } from 'react';
// import { PhoneInput } from 'react-international-phone';
// import 'react-international-phone/style.css';


// import {
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
//   ConfirmationResult
// } from 'firebase/auth';
// import { auth } from '@/firebase/config';

// export default function LoginPage() {
//   const [phone, setPhone] = useState('');
//   const [otp, setOtp] = useState('');
//   const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);





  
//   const sendOTP = async () => {
//     try {
//       const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//         size: 'invisible'
//       });

//       const result = await signInWithPhoneNumber(auth, phone, verifier);
//       setConfirmationResult(result);
//       alert('OTP sent successfully!');
//     } catch (error: any) {
//       alert(error.message || 'Failed to send OTP');
//     }
//   };

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
//    <div className='mt-50'>
//     <div className="p-6 max-w-md mx-auto items-center bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
      
      
//       <h1 className="text-2xl font-semibold mb-4">Login with Phone</h1>
//       <PhoneInput
//         defaultCountry="us"
//         value={phone}
//         onChange={setPhone}
//         className="mb-4"
//       />
//       <button
//         onClick={sendOTP}
//         className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-4"
//       >
//         Send OTP
//       </button>

//       <input
//         type="text"
//         placeholder="Enter OTP"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//         className="w-full px-3 py-2 border rounded mb-2"
//       />
//       <button
//         onClick={verifyOTP}
//         className="bg-green-600 text-white px-4 py-2 rounded w-full"
//       >
//         Verify OTP
//       </button>

//       <div id="recaptcha-container"></div>
//     </div>
//     </div>
   
//   );
// }



// pages/login.tsx

// 'use client'
// import { useState } from 'react';
// import PhoneNumberInput from '../components/PhoneNumberInput';
// import OTPVerification from '../components/OTPVerification';
// import { ConfirmationResult } from 'firebase/auth';

// export default function LoginPage() {
//   const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

//   const handleOTPRequest = (result: ConfirmationResult) => {
//     setConfirmationResult(result);
//   };

//   return (
//     <div className="mt-50">
//       {confirmationResult ? (
//         <OTPVerification confirmationResult={confirmationResult} />
//       ) : (
//         <PhoneNumberInput onOTPRequest={handleOTPRequest} />
//       )}
//     </div>
//   );
// }




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
