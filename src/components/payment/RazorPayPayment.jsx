import React from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const RazorpayPayment = ({ isOpen, onClose, course, onSuccess }) => {
  if (!isOpen) return null;

  // SAFELY access course properties
  const courseTitle = course?.title || 'Course';
  const coursePrice = course?.price || 0;
  const instructorName = course?.instructor?.name || 'Instructor';

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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* ✅ FIXED: Access object properties correctly */}
        <div className="bg-purple-50 rounded-xl p-4 mb-6">
          <p className="text-gray-600">
            <span className="font-medium">Course:</span> {courseTitle}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Instructor:</span> {instructorName}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Amount:</span> ₹{coursePrice}
          </p>
        </div>

        <button
          onClick={() => {
            alert('✅ Demo payment successful!');
            onSuccess({ success: true });
          }}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
        >
          Complete Payment (Demo)
        </button>
      </motion.div>
    </motion.div>
  );
};

export default RazorpayPayment;