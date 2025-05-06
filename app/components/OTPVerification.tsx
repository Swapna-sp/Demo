// 'use client';

// import { useEffect, useState } from 'react';
// import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
// import { auth } from '@/firebase/config';

// interface OTPVerificationProps {
//   confirmationResult: any;
//   phone: string;
//   onOTPRequest: (confirmationResult: any, phone: string) => void;
// }

// export default function OTPVerification({
//   confirmationResult,
//   phone,
//   onOTPRequest,
// }: OTPVerificationProps) {
//   const [otp, setOtp] = useState(Array(6).fill(''));
//   const [timer, setTimer] = useState(60);
//   const [isResendDisabled, setIsResendDisabled] = useState(true);

//   useEffect(() => {
//     if (timer > 0) {
//       const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
//       return () => clearInterval(interval);
//     } else {
//       setIsResendDisabled(false);
//     }
//   }, [timer]);

//   const handleChange = (index: number, value: string) => {
//     if (/^\d?$/.test(value)) {
//       const updatedOtp = [...otp];
//       updatedOtp[index] = value;
//       setOtp(updatedOtp);

//       if (value && index < 5) {
//         const nextInput = document.getElementById(`otp-${index + 1}`);
//         nextInput?.focus();
//       }
//     }
//   };

//   const verifyOTP = async () => {
//     const code = otp.join('');
//     if (code.length !== 6 || otp.includes('')) {
//       alert('Please enter the complete OTP.');
//       return;
//     }
//     try {
//       await confirmationResult.confirm(code);
//       alert('Phone number verified!');
//     } catch (error: any) {
//       alert(error.message || 'Invalid OTP');
//     }
//   };

//   const resendOTP = async () => {
//     try {
//       setIsResendDisabled(true);
//       setTimer(60);

//       const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
//         size: 'invisible',
//       });

//       const result = await signInWithPhoneNumber(auth, phone, verifier);
//       onOTPRequest(result, phone);
//       alert('OTP resent successfully!');
//     } catch (error: any) {
//       alert(error.message || 'Failed to resend OTP');
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full mx-auto font-sans text-center">
//       <h2 className="text-lg font-semibold mb-2">Enter your OTP code to verify</h2>
//       <p className="text-sm text-gray-600 mb-4">
//         A verification code has been sent to <strong>******{phone.slice(-4)}</strong>
//       </p>

//       <div className="flex justify-center gap-2 mb-4">
//         {otp.map((digit, idx) => (
//           <input
//             key={idx}
//             id={`otp-${idx}`}
//             type="text"
//             maxLength={1}
//             value={digit}
//             onChange={(e) => handleChange(idx, e.target.value)}
//             className="w-10 h-12 text-xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         ))}
//       </div>

//       <p className="text-sm text-gray-500 mb-2">Didn't receive any code?</p>

//       <button
//         onClick={resendOTP}
//         disabled={isResendDisabled}
//         className={`font-semibold mb-4 ${
//           isResendDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-green-600 underline'
//         }`}
//       >
//         RESEND OTP {isResendDisabled && `in 00:${timer < 10 ? `0${timer}` : timer}`}
//       </button>

//       <button
//         onClick={verifyOTP}
//         className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 rounded mt-2"
//       >
//         VERIFY OTP
//       </button>

//       <div id="recaptcha-container"></div>
//     </div>
//   );
// }






'use client';

import { useEffect, useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '@/firebase/config';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';  

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
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const router = useRouter();  

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendDisabled(false);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const verifyOTP = async () => {
    const code = otp.join('');
    if (code.length !== 6 || otp.includes('')) {
      toast.error(
        <div id="toast-simple" className="flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
          <svg className="w-5 h-5 text-red-600 dark:text-red-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
          </svg>
          <div className="ps-4 text-sm font-normal">Please enter the complete OTP.</div>
        </div>
      );
      return;
    }
    try {
      await confirmationResult.confirm(code);
      toast.success(
        <div id="toast-simple" className="flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
          {/* <svg className="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
          </svg> */}
          <div className="ps-4 text-sm font-normal">Phone number verified successfully!</div>
        </div>
      );

     
      router.push('/package');  
    } catch (error: any) {
      toast.error(
        <div id="toast-simple" className="flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
          <svg className="w-5 h-5 text-red-600 dark:text-red-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
          </svg>
          <div className="ps-4 text-sm font-normal">{error.message || 'Invalid OTP'}</div>
        </div>
      );
    }
  };

  const resendOTP = async () => {
    try {
      setIsResendDisabled(true);
      setTimer(60);
      setOtp(Array(6).fill('')); 

      const verifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });

      const result = await signInWithPhoneNumber(auth, phone, verifier);
      onOTPRequest(result, phone);
      toast.success(
        <div id="toast-simple" className="flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
          </svg>
          <div className="ps-4 text-sm font-normal">OTP resent successfully!</div>
        </div>
      );
    } catch (error: any) {
      toast.error(
        <div id="toast-simple" className="flex items-center w-full max-w-xs p-4 space-x-4 rtl:space-x-reverse text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800" role="alert">
          <svg className="w-5 h-5 text-red-600 dark:text-red-500 rotate-45" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"/>
          </svg>
          <div className="ps-4 text-sm font-normal">{error.message || 'Failed to resend OTP'}</div>
        </div>
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full mx-auto font-sans text-center">
      <h2 className="text-lg font-semibold mb-2">Enter your OTP code to verify</h2>
      <p className="text-sm text-gray-600 mb-4">
        A verification code has been sent to <strong>******{phone.slice(-4)}</strong>
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
            className="w-10 h-12 text-xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-2">Didn't receive any code?</p>

      <button
        onClick={resendOTP}
        disabled={isResendDisabled}
        className={`font-semibold mb-4 ${
          isResendDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-green-600 underline'
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
