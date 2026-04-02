import React from "react";
import { motion } from "framer-motion";
import {
  UsersIcon,
  AcademicCapIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const AboutHero = () => {
  const stats = [
    {
      icon: UsersIcon,
      value: "50K+",
      label: "Happy Students",
      from: "from-blue-400",
      to: "to-purple-400",
    },
    {
      icon: AcademicCapIcon,
      value: "200+",
      label: "Expert Instructors",
      from: "from-purple-400",
      to: "to-pink-400",
    },
    {
      icon: GlobeAltIcon,
      value: "150+",
      label: "Countries Reached",
      from: "from-pink-400",
      to: "to-red-400",
    },
  ];

  return (
    <section
      className="relative min-h-[80vh] flex items-center bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-32 text-white w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
            <span className="text-sm font-medium">
              Empowering Learners Since 2020
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 max-w-4xl">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              We're on a Mission
            </span>
            <br />
            <span>to Transform Education</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl leading-relaxed">
            We believe that quality education should be accessible to everyone.
            Our platform brings together expert instructors and passionate
            learners from around the globe to create a transformative learning
            experience.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
                >
                  <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <p
                    className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.from} ${stat.to} bg-clip-text text-transparent`}
                  >
                    {stat.value}
                  </p>

                  <p className="text-sm text-gray-300 mt-2">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-12">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:scale-105 transition-all duration-300">
              Our Story
            </button>

            <button className="px-8 py-4 border-2 border-white/30 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300">
              Meet the Team
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutHero;
