import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  HomeIcon, 
  ArrowLeftIcon,
  BookOpenIcon,
  EnvelopeIcon 
} from "@heroicons/react/24/outline";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -45, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-16 max-w-3xl w-full text-center border border-white/20"
      >
        {/* 404 Number with Gradient */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            404
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 mb-8 max-w-md mx-auto"
        >
          Oops! The page you're looking for seems to have wandered off. 
          Let's get you back on track.
        </motion.p>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <svg
            className="w-64 h-64 mx-auto"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.circle
              animate={{ r: [40, 45, 40] }}
              transition={{ duration: 3, repeat: Infinity }}
              cx="100"
              cy="100"
              r="40"
              fill="url(#gradient)"
              opacity="0.6"
            />
            <circle cx="70" cy="80" r="8" fill="#4B5563" />
            <circle cx="130" cy="80" r="8" fill="#4B5563" />
            <path
              d="M70 120 Q100 140, 130 120"
              stroke="#4B5563"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Go to Homepage
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-300"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 pt-8 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-4">Popular destinations:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/courses"
              className="text-sm text-purple-600 hover:text-purple-800 hover:underline flex items-center"
            >
              <BookOpenIcon className="w-4 h-4 mr-1" />
              Browse Courses
            </Link>
            <Link
              to="/about"
              className="text-sm text-purple-600 hover:text-purple-800 hover:underline"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-sm text-purple-600 hover:text-purple-800 hover:underline flex items-center"
            >
              <EnvelopeIcon className="w-4 h-4 mr-1" />
              Contact Support
            </Link>
          </div>
        </motion.div>

        {/* Fun Fact */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-xs text-gray-400"
        >
          ⚡ Fun fact: This page has been visited 404 times
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFound;