import React from "react";
import { motion } from "framer-motion";
import { PlayCircleIcon } from "@heroicons/react/24/solid";

const HighlightSection = () => {
  return (
    // Main Section Wrapper
    <div className="relative overflow-hidden">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600">
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black opacity-10"></div>

        {/* Top Right Circle */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full opacity-10"></div>

        {/* Bottom Left Circle */}
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white rounded-full opacity-10"></div>
      </div>

      {/* Content Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* 2 Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Transform Your Career with Our Platform
            </h2>

            {/* Description */}
            <p className="text-xl text-blue-100 mb-8">
              Join over 50,000+ students who have already advanced their careers through our comprehensive learning programs.
            </p>

            {/* Bullet Points */}
            <div className="space-y-4 mb-8">
              {[
                "Industry-recognized certificates",
                "Lifetime access to course materials",
                "Personalized learning paths",
                "24/7 mentor support"
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  {/* Small Dot */}
                  <div className="w-2 h-2 bg-white rounded-full"></div>

                  {/* Text */}
                  <span className="text-white">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">

              {/* Start Learning Button */}
              <button className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Start Learning Now
              </button>

              {/* Watch Stories Button */}
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center justify-center gap-2">
                <PlayCircleIcon className="w-5 h-5" />
                Watch Success Stories
              </button>
            </div>
          </motion.div>

          {/* RIGHT SIDE STATS BOX */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Glass Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8">

              {/* 2x2 Grid */}
              <div className="grid grid-cols-2 gap-4">

                {/* Stat 1 */}
                <div className="text-center p-6 bg-white/20 rounded-2xl">
                  <div className="text-4xl font-bold text-white mb-2">
                    50K+
                  </div>
                  <div className="text-blue-100">
                    Active Students
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="text-center p-6 bg-white/20 rounded-2xl">
                  <div className="text-4xl font-bold text-white mb-2">
                    200+
                  </div>
                  <div className="text-blue-100">
                    Expert Instructors
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="text-center p-6 bg-white/20 rounded-2xl">
                  <div className="text-4xl font-bold text-white mb-2">
                    1000+
                  </div>
                  <div className="text-blue-100">
                    Courses
                  </div>
                </div>

                {/* Stat 4 */}
                <div className="text-center p-6 bg-white/20 rounded-2xl">
                  <div className="text-4xl font-bold text-white mb-2">
                    95%
                  </div>
                  <div className="text-blue-100">
                    Success Rate
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default HighlightSection;
