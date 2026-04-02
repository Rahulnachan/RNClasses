import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex items-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60"></div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-32 text-white w-full">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
            <span className="text-sm font-medium">
              Trusted by 10,000+ learners
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-4xl"
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Learn Today,
            </span>
            <br />
            Lead Tomorrow
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed"
          >
            Join thousands of learners gaining real-world skills through
            expert-led courses and structured learning paths. Transform your
            career with industry-recognized certifications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Explore Courses</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button className="group relative px-8 py-4 border-2 border-white/30 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 overflow-hidden backdrop-blur-sm">
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap gap-10 md:gap-16"
          >
            
            <motion.div whileHover={{ scale: 1.05 }} className="text-center md:text-left">
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                10K+
              </p>
              <p className="text-sm text-gray-300 mt-1">Active Students</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="text-center md:text-left">
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                50+
              </p>
              <p className="text-sm text-gray-300 mt-1">Expert-Led Courses</p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} className="text-center md:text-left">
              <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
                95%
              </p>
              <p className="text-sm text-gray-300 mt-1">Completion Rate</p>
            </motion.div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-white rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
