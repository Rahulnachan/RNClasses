import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';

// =====================================
// CALL TO ACTION SECTION
// =====================================
const CoursesCTA = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">

      {/* ===============================
          Animated Background Circles - FIXED
      =============================== */}
      <div className="absolute inset-0 opacity-10">

        {/* Top Right Circle - FIXED */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-40 -right-40 rounded-full bg-white"
          style={{
            width: '20rem',
            height: '20rem',
          }}
        />

        {/* Bottom Left Circle - FIXED */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 rounded-full bg-white"
          style={{
            width: '20rem',
            height: '20rem',
          }}
        />
      </div>

      {/* ===============================
          Main Content
      =============================== */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full mb-8"
          >
            <SparklesIcon className="w-4 h-4 text-yellow-300 mr-2" />
            <span className="text-white">Limited Time Offer</span>
          </motion.div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Start Learning?
          </h2>

          {/* Description */}
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of students already learning on our platform.
            Get started today and transform your career!
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">

            {/* Browse Courses Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
            >
              Browse All Courses
              <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* View Pricing Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition-all duration-300"
            >
              View Pricing
            </motion.button>

          </div>

          {/* Company Names */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center items-center gap-8"
          >
            <div className="text-white/60 text-sm">
              Trusted by students from
            </div>

            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.1 }}
                className="text-white/80 font-semibold"
              >
                {company}
              </motion.span>
            ))}
          </motion.div>

          {/* Guarantee */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 inline-flex items-center bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full"
          >
            <span className="text-yellow-300 mr-2">✓</span>
            <span className="text-white text-sm">
              30-day money-back guarantee
            </span>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default CoursesCTA;