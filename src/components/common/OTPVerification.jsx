import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';
import OTPService from '../../components/Services/OtpService';
import { toast } from 'react-hot-toast';

const OTPVerification = ({ type = 'email', identifier, onVerify, onClose }) => {
  const [step, setStep] = useState(1);
  const [value, setValue] = useState(identifier || '');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSendOTP = async () => {
    if (!value) {
      toast.error(`Please enter your ${type}`);
      return;
    }

    setLoading(true);
    try {
      if (type === 'email') {
        await OTPService.sendEmailOTP(value);
      } else {
        await OTPService.sendMobileOTP(value);
      }
      setStep(2);
      setTimer(30);
    } catch (error) {
      console.error('OTP send error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await OTPService.verifyOTP(value, otpValue, type);
      if (response.success) {
        toast.success('Verification successful!');
        onVerify?.(value);
        onClose?.();
      }
    } catch (error) {
      console.error('OTP verify error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index, val) => {
    if (val.length > 1) val = val[0];
    if (!/^\d*$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {type === 'email' ? (
            <EnvelopeIcon className="w-8 h-8 text-purple-600" />
          ) : (
            <PhoneIcon className="w-8 h-8 text-purple-600" />
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          {step === 1 ? `Verify Your ${type === 'email' ? 'Email' : 'Mobile'}` : 'Enter OTP'}
        </h2>
        <p className="text-gray-600 mt-2">
          {step === 1
            ? `We'll send a verification code to your ${type}`
            : `Enter the 6-digit code sent to ${value}`}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.div
            key="input"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            {type === 'email' ? (
              <input
                type="email"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            ) : (
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  +91
                </span>
                <input
                  type="tel"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="9876543210"
                  maxLength="10"
                  className="flex-1 px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}

            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="otp"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-12 h-12 text-center text-xl border rounded-lg focus:ring-2 focus:ring-purple-500"
                  maxLength="1"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOTP}
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default OTPVerification;