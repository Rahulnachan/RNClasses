import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpenIcon,
  AcademicCapIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

const CoursesHero = () => {
  return (
    <section
      className="relative min-h-[70vh] flex items-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60"></div>

      {/* Background Blobs - FIXED: Added explicit dimensions */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 text-white w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
            <span className="text-sm font-medium">
              200+ Expert-Led Courses
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-4xl"
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Expand Your Skills,
            </span>
            <br />
            <span>Advance Your Career</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl leading-relaxed"
          >
            Choose from hundreds of courses taught by industry experts.
            Learn at your own pace with lifetime access to course materials.
          </motion.p>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              {
                icon: BookOpenIcon,
                value: '200+',
                label: 'Courses',
                from: 'from-blue-400',
                to: 'to-purple-400'
              },
              {
                icon: AcademicCapIcon,
                value: '50+',
                label: 'Expert Instructors',
                from: 'from-purple-400',
                to: 'to-pink-400'
              },
              {
                icon: ClockIcon,
                value: '24/7',
                label: 'Lifetime Access',
                from: 'from-pink-400',
                to: 'to-red-400'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <p className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${item.from} ${item.to} bg-clip-text text-transparent`}>
                    {item.value}
                  </p>
                  <p className="text-sm text-gray-300 mt-2">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="relative z-10">
                Browse All Courses
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="group relative px-8 py-4 border-2 border-white/30 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 backdrop-blur-sm">
              <span className="relative z-10">
                View Categories
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </motion.div>

          {/* Floating Decoration - FIXED: Added explicit width/height in style */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -bottom-10 -right-10 rounded-full blur-2xl"
            style={{
              width: '10rem',
              height: '10rem',
              backgroundColor: 'rgba(255,255,255,0.05)'
            }}
          />
        </motion.div>
      </div>

      {/* Scroll Indicator - FIXED: Removed nested motion.div to prevent SVG issues */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="relative w-6 h-10 border-2 border-white/30 rounded-full overflow-hidden">
          <motion.div
            animate={{ y: [2, 18, 2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute w-1 h-2 bg-white rounded-full left-1/2 transform -translate-x-1/2"
            style={{ top: 0 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default CoursesHero;