import React from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const PaymentModal = ({ isOpen, onClose, course, onSuccess }) => {
  if (!isOpen) return null;

  // SAFELY access course properties with fallbacks
  const courseTitle = course?.title || 'Course';
  const coursePrice = course?.price || 0;
  
  // IMPORTANT: Safely access instructor object
  const instructorName = course?.instructor?.name || 'Instructor';
  const instructorTitle = course?.instructor?.title || '';

  const handlePayment = () => {
    // Mock payment success for now
    setTimeout(() => {
      onSuccess({ success: true });
      onClose();
      alert('✅ Enrollment successful! (Demo payment)');
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Complete Enrollment</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Course Info - FIXED: Access properties correctly */}
        <div className="bg-purple-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Course Details:</h3>
          
          {/* ✅ CORRECT: Accessing specific properties, not the whole object */}
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium">Course:</span> {courseTitle}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Instructor:</span> {instructorName}
              {instructorTitle && ` (${instructorTitle})`}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Amount:</span> ₹{coursePrice}
            </p>
          </div>
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Pay ₹{coursePrice}
        </button>

        {/* Note */}
        <p className="text-xs text-gray-400 text-center mt-4">
          🔒 This is a demo. No actual payment will be processed.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default PaymentModal;