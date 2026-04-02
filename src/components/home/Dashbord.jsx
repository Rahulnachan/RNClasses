import React from "react";
import { motion } from "framer-motion";
import {
  ChartBarIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {

  // ===== Dashboard Statistics Data =====
  const stats = [
    {
      label: "Courses Completed",
      value: "12",
      icon: AcademicCapIcon,
      color: "blue",
    },
    {
      label: "Hours Learned",
      value: "247",
      icon: ChartBarIcon,
      color: "purple",
    },
    {
      label: "Certificates",
      value: "8",
      icon: CheckCircleIcon,
      color: "green",
    },
    {
      label: "Skills Gained",
      value: "24",
      icon: ArrowTrendingUpIcon,
      color: "orange",
    },
  ];

  // ===== Icon Background Colors =====
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* ===== Title Section ===== */}
      <div className="text-center mb-16">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Your Learning Dashboard
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Track your progress, achievements, and learning journey all in one place
        </motion.p>

      </div>

      {/* ===== Stats Cards Grid ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

        {stats.map((stat, index) => {

          const Icon = stat.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >

              {/* Icon Box */}
              <div
                className={`w-12 h-12 ${
                  colorClasses[stat.color]
                } rounded-xl flex items-center justify-center mb-4`}
              >
                <Icon className="w-6 h-6" />
              </div>

              {/* Value */}
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </h3>

              {/* Label */}
              <p className="text-gray-600">
                {stat.label}
              </p>

            </motion.div>
          );
        })}

      </div>

      {/* ===== Call To Action Section ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white"
      >

        <div className="flex flex-col md:flex-row items-center justify-between">

          <div className="mb-6 md:mb-0">

            <h3 className="text-2xl font-bold mb-2">
              Ready to start learning?
            </h3>

            <p className="text-blue-100">
              Join thousands of students already learning on our platform
            </p>

          </div>

          {/* Button */}
          <button className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            Get Started Today
          </button>

        </div>

      </motion.div>

    </div>
  );
};

export default Dashboard;
