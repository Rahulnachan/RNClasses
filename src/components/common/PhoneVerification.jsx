import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import OTPService from '../../services/otpService';
import { toast } from 'react-hot-toast';

const PhoneVerification = ({ onVerify, onSkip }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  const startTimer = () => {
    setTimer(30);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOTP = async () => {
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      toast.error("Please enter a valid 10-digit Indian mobile number");
      return;
    }

    setLoading(true);
    try {
      await OTPService.sendMobileOTP(phone);
      setStep(2);
      startTimer();
    } catch (error) {
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await OTPService.verifyOTP(phone, otp, 'mobile');
      if (response.success) {
        toast.success("Phone number verified successfully!");
        onVerify(phone);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-8 shadow-xl max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <PhoneIcon className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold">Verify Your Phone</h2>
        <p className="text-gray-600 mt-2">
          {step === 1 
            ? "Add your mobile number for secure account recovery"
            : "Enter the 6-digit OTP sent to your phone"}
        </p>
      </div>

      {step === 1 ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                +91
              </span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                maxLength="10"
                className="flex-1 px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <button
            onClick={handleSendOTP}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>

          {onSkip && (
            <button
              onClick={onSkip}
              className="w-full py-2 text-gray-500 hover:text-gray-700 text-sm"
            >
              Skip for now
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit OTP"
              maxLength="6"
              className="w-full px-4 py-3 border rounded-lg text-center text-2xl tracking-widest focus:ring-2 focus:ring-purple-500"
            />
            <p className="text-xs text-gray-500 mt-2">
              OTP sent to +91 {phone}
            </p>
          </div>

          <button
            onClick={handleVerifyOTP}
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <div className="text-center">
            {timer > 0 ? (
              <p className="text-sm text-gray-500">
                Resend OTP in {timer} seconds
              </p>
            ) : (
              <button
                onClick={handleSendOTP}
                className="text-sm text-purple-600 hover:text-purple-800"
              >
                Resend OTP
              </button>
            )}
          </div>

          <button
            onClick={() => setStep(1)}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Change phone number
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default PhoneVerification;