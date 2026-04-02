import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BookOpenIcon,
  UsersIcon,
  ChartBarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const HomeFeaturesCourses = () => {
  // ===== Features Data =====
  const features = [
    {
      icon: BookOpenIcon,
      title: "Expert-Led Courses",
      description:
        "Learn from industry professionals with years of real-world experience.",
      color: "blue",
    },
    {
      icon: UsersIcon,
      title: "Community Support",
      description: "Join a vibrant community of learners and grow together.",
      color: "purple",
    },
    {
      icon: ChartBarIcon,
      title: "Track Progress",
      description: "Monitor your learning journey with detailed analytics.",
      color: "green",
    },
    {
      icon: ClockIcon,
      title: "Learn at Your Pace",
      description: "Access content 24/7 and learn according to your schedule.",
      color: "orange",
    },
  ];

  // ===== Courses Data =====
  const courses = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      category: "Development",
      students: "15k+",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    },
    {
      id: 2,
      title: "Data Science Masterclass",
      category: "Data Science",
      students: "12k+",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      category: "Design",
      students: "8k+",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
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
      {/* ===== FEATURES SECTION ===== */}
      <div className="mb-20">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Why Choose Our Platform
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Discover the features that make us the preferred choice for
            thousands of learners
          </motion.p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 ${colorClasses[feature.color]} rounded-xl flex items-center justify-center mb-6`}
                >
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ===== COURSES SECTION ===== */}
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Courses
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start your learning journey with our most popular courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="text-sm text-blue-600 font-semibold">
                  {course.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">
                  {course.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    {course.students} students
                  </span>
                  <Link
                    to={`/courses/${course.id}`}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Learn More →
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/courses"
            className="inline-flex items-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            View All Courses
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeFeaturesCourses;
