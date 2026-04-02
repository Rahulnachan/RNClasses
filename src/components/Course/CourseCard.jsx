import React, { useState } from "react";
import { FaStar, FaUserGraduate, FaClock, FaBookOpen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PaymentModal from "../payment/PaymentModal"; // Import payment modal
import { formatPrice } from "../../components/utils/helpers"; // Helper function for price formatting

export default function CourseCard({ course, onEnroll, isEnrolling }) {
  const [showPayment, setShowPayment] = useState(false);
  const [imageError, setImageError] = useState(false);

  // If course data not provided → show nothing
  if (!course) return null;

  // Extract data from course object with more defaults
  const {
    id,
    title,
    description,
    image,
    rating = "4.5",
    students = 0,
    price = "Free",
    instructor = "Expert Instructor",
    duration = "Self-paced",
    level = "All Levels",
    category = "Development"
  } = course;

  // Format price to Indian Rupees
  const displayPrice = formatPrice(price);
  
  // Format student count
  const displayStudents = typeof students === 'number' 
    ? students.toLocaleString('en-IN') 
    : students;

  // Fallback image
  const fallbackImage = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80";

  // Handle successful payment
  const handlePaymentSuccess = (paymentData) => {
    console.log("Payment successful:", paymentData);
    onEnroll?.(id); // Call enroll after successful payment
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
      >
        {/* Image Container */}
        <Link to={`/courses/${id}`} className="block relative overflow-hidden">
          <div className="relative h-48 overflow-hidden">
            <img
              src={!imageError ? (image || fallbackImage) : fallbackImage}
              alt={title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Overlay with category */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Category Badge */}
            <span className="absolute top-3 left-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
              {category}
            </span>
            
            {/* Level Badge */}
            <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full text-gray-700 shadow-lg">
              {level}
            </span>
          </div>
        </Link>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <Link to={`/courses/${id}`}>
            <h3 className="text-lg font-semibold mb-2 hover:text-purple-600 transition-colors line-clamp-2 min-h-[3.5rem]">
              {title}
            </h3>
          </Link>

          {/* Instructor */}
          <p className="text-sm text-gray-500 mb-3">
            by <span className="font-medium text-gray-700">{instructor}</span>
          </p>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-4 min-h-[2.5rem]">
            {description || "No description available"}
          </p>

          {/* Rating and Students */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(parseFloat(rating))
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700 ml-1">
                {rating}
              </span>
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <FaUserGraduate className="w-4 h-4 mr-1 text-gray-400" />
              <span>{displayStudents}</span>
            </div>
          </div>

          {/* Course Features */}
          <div className="flex items-center gap-3 mb-4 text-xs text-gray-500">
            <span className="flex items-center">
              <FaClock className="w-3 h-3 mr-1 text-purple-400" />
              {duration}
            </span>
            <span className="flex items-center">
              <FaBookOpen className="w-3 h-3 mr-1 text-blue-400" />
              Certificate
            </span>
          </div>

          {/* Price and Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            {/* Price */}
            <div>
              <span className="text-2xl font-bold text-purple-600">
                {displayPrice}
              </span>
              {typeof price === 'number' && price > 0 && (
                <span className="text-xs text-gray-400 ml-2 line-through">
                  ₹{Math.round(price * 100).toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Link
                to={`/courses/${id}`}
                className="px-3 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
              >
                Details
              </Link>
              <button
                onClick={() => setShowPayment(true)}
                disabled={isEnrolling}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isEnrolling
                    ? "bg-purple-300 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 text-white hover:shadow-md hover:scale-105"
                }`}
              >
                {isEnrolling ? (
                  <span className="flex items-center">
                    <svg className="animate-spin h-4 w-4 mr-1" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing
                  </span>
                ) : (
                  "Enroll Now"
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        course={course}
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
}