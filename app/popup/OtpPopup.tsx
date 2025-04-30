import { useState } from 'react';
import toast from 'react-hot-toast';
import { ConfirmationResult } from 'firebase/auth';

const OTPInput = ({
  confirmationResult,
  onClose,
  onResend,
  timer,
}: {
  confirmationResult: ConfirmationResult;
  onClose: () => void;
  onResend: () => void;
  timer: number;
}) => {
  const [otp, setOtp] = useState('');

  const verifyOTP = async () => {
    try {
      await confirmationResult.confirm(otp);
      toast.success('Phone verified successfully!');
      onClose();
    } catch (err: any) {
      toast.error('Invalid OTP');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-lg font-semibold text-center mb-2">Enter your OTP</h2>
        <p className="text-center text-sm text-gray-500 mb-4">A 6-digit OTP was sent to your number.</p>
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 text-center"
          placeholder="Enter OTP"
        />
        <button
          onClick={verifyOTP}
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
        >
          VERIFY OTP
        </button>
        <div className="mt-4 text-center text-sm">
          Didn't get the code?{' '}
          {timer === 0 ? (
            <button onClick={onResend} className="text-blue-600 underline">Resend</button>
          ) : (
            <span className="text-gray-500">Resend in {timer}s</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPInput;
