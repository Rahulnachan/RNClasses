import React from "react";
import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  ChartBarIcon,
  UserGroupIcon,
  ClockIcon,
  BriefcaseIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const WhyCourses = () => {

  // ===== Reasons Data =====
  const reasons = [
    {
      icon: AcademicCapIcon,
      title: "Expert Instructors",
      description:
        "Learn from industry professionals with years of real-world experience.",
      color: "blue",
    },
    {
      icon: ChartBarIcon,
      title: "Career Growth",
      description:
        "82% of our students report career advancement within 6 months.",
      color: "green",
    },
    {
      icon: UserGroupIcon,
      title: "Community Support",
      description:
        "Join a network of 50,000+ learners and industry experts.",
      color: "purple",
    },
    {
      icon: ClockIcon,
      title: "Flexible Learning",
      description:
        "Learn at your own pace with lifetime access to all materials.",
      color: "orange",
    },
    {
      icon: BriefcaseIcon,
      title: "Job Ready Skills",
      description:
        "Practical, hands-on projects that build your portfolio.",
      color: "red",
    },
    {
      icon: GlobeAltIcon,
      title: "Global Recognition",
      description:
        "Certificates recognized by top companies worldwide.",
      color: "indigo",
    },
  ];

  // ===== Color Gradient Classes =====
  const colorClasses = {
    blue: "from-blue-600 to-blue-400",
    green: "from-green-600 to-green-400",
    purple: "from-purple-600 to-purple-400",
    orange: "from-orange-600 to-orange-400",
    red: "from-red-600 to-red-400",
    indigo: "from-indigo-600 to-indigo-400",
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ===== Heading Section ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Take Our Courses?
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of successful students who have transformed their careers
            through our comprehensive learning programs.
          </p>
        </motion.div>

        {/* ===== Reasons Grid ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {reasons.map((reason, index) => {

            const Icon = reason.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >

                {/* Icon Box */}
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${
                    colorClasses[reason.color]
                  } rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>

                {/* Bottom Hover Line */}
                <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

              </motion.div>
            );
          })}

        </div>

        {/* ===== Stats Section ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl"
        >
          {[
            { value: "50K+", label: "Students" },
            { value: "200+", label: "Courses" },
            { value: "95%", label: "Satisfaction" },
            { value: "82%", label: "Career Growth" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default WhyCourses;
