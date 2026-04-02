import React from "react";
import { motion } from "framer-motion";
import {
  BoltIcon,
  GlobeAltIcon,
  UserGroupIcon,
  RocketLaunchIcon
} from "@heroicons/react/24/outline";

/* ================================
   Data for Why Choose Us Section
================================ */
const reasons = [
  {
    icon: BoltIcon,
    title: "Cutting-edge Curriculum",
    description:
      "Our courses are constantly updated to reflect the latest industry trends and technologies.",
    color: "blue"
  },
  {
    icon: GlobeAltIcon,
    title: "Global Community",
    description:
      "Connect with learners from over 150 countries and expand your professional network.",
    color: "purple"
  },
  {
    icon: UserGroupIcon,
    title: "Expert Mentors",
    description:
      "Get personalized guidance from industry experts who are passionate about teaching.",
    color: "green"
  },
  {
    icon: RocketLaunchIcon,
    title: "Career Support",
    description:
      "Access career resources, job boards, and interview preparation materials.",
    color: "orange"
  }
];

/* ================================
   Main Component
================================ */
const WhyChooseUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Section Heading */}
      <div className="text-center mb-16">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Why Choose Us
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Discover what sets us apart from other learning platforms
        </motion.p>

      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {reasons.map((reason, index) => {

          // Get Icon from object
          const IconComponent = reason.icon;

          // Gradient colors
          const gradientClasses = {
            blue: "from-blue-600 to-blue-400",
            purple: "from-purple-600 to-purple-400",
            green: "from-green-600 to-green-400",
            orange: "from-orange-600 to-orange-400"
          };

          return (
            <motion.div
              key={index}

              // Animation from left or right
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}

              // Hover effect
              whileHover={{ scale: 1.02 }}

              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex items-start space-x-6"
            >

              {/* Icon Box */}
              <div
                className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${gradientClasses[reason.color]} rounded-xl flex items-center justify-center`}
              >
                <IconComponent className="w-8 h-8 text-white" />
              </div>

              {/* Text Content */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {reason.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>

            </motion.div>
          );
        })}

      </div>
    </div>
  );
};

export default WhyChooseUs;
