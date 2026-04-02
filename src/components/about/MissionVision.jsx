import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Link } from 'react-router-dom';
import { 
  RocketLaunchIcon, 
  EyeIcon, 
  HeartIcon, 
  GlobeAltIcon,
  UserGroupIcon,
  SparklesIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';

const Mission = () => {
  // Animation controls for stats
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Stats data (like your StatsSection)
  const stats = [
    { value: 50000, label: 'Active Students', suffix: '+', icon: '👥' },
    { value: 200, label: 'Expert Instructors', suffix: '+', icon: '👨‍🏫' },
    { value: 150, label: 'Countries', suffix: '+', icon: '🌍' },
    { value: 95, label: 'Satisfaction Rate', suffix: '%', icon: '⭐' },
    { value: 1000, label: 'Courses', suffix: '+', icon: '📚' },
    { value: 24, label: 'Support Hours', suffix: '/7', icon: '🕐' }
  ];

  // Mission data
  const missionData = {
    title: "Our Mission",
    description: "To democratize education by providing high-quality, accessible, and affordable learning experiences that empower individuals to achieve their full potential.",
    icon: RocketLaunchIcon,
    color: "from-blue-600 to-purple-600",
    points: [
      "Quality education for everyone, everywhere",
      "Practical, industry-relevant skills",
      "Supportive learning community",
      "Continuous innovation in education"
    ]
  };

  // Vision data
  const visionData = {
    title: "Our Vision",
    description: "To create a world where everyone has the opportunity to learn, grow, and succeed, regardless of their geographical location or financial situation.",
    icon: EyeIcon,
    color: "from-purple-600 to-pink-600",
    points: [
      "Global access to education",
      "Lifelong learning for all",
      "Bridge the skills gap worldwide",
      "Transform lives through knowledge"
    ]
  };

  // Values data
  const values = [
    {
      icon: HeartIcon,
      title: "Passion for Learning",
      description: "We believe that curiosity and continuous learning drive personal and professional growth.",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      hoverBg: "group-hover:bg-red-600"
    },
    {
      icon: UserGroupIcon,
      title: "Community First",
      description: "We foster a supportive environment where learners and instructors thrive together.",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      hoverBg: "group-hover:bg-blue-600"
    },
    {
      icon: SparklesIcon,
      title: "Excellence",
      description: "We strive for the highest quality in our content, platform, and support.",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      hoverBg: "group-hover:bg-purple-600"
    },
    {
      icon: GlobeAltIcon,
      title: "Accessibility",
      description: "We are committed to making education accessible to learners worldwide.",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      hoverBg: "group-hover:bg-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* ===== MISSION & VISION CARDS SECTION ===== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-blue-600 font-semibold text-sm uppercase tracking-wider"
          >
            Our Purpose
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4"
          >
            Mission & Vision
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover what drives us and the future we're building for learners worldwide
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className={`w-16 h-16 bg-gradient-to-r ${missionData.color} rounded-2xl flex items-center justify-center mb-6`}>
              <missionData.icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{missionData.title}</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {missionData.description}
            </p>
            <ul className="space-y-3">
              {missionData.points.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center text-gray-700"
                >
                  <CheckBadgeIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className={`w-16 h-16 bg-gradient-to-r ${visionData.color} rounded-2xl flex items-center justify-center mb-6`}>
              <visionData.icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{visionData.title}</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {visionData.description}
            </p>
            <ul className="space-y-3">
              {visionData.points.map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center text-gray-700"
                >
                  <CheckBadgeIcon className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                  {point}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* ===== CORE VALUES SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-blue-600 font-semibold text-sm uppercase tracking-wider"
            >
              What Guides Us
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold text-gray-900 mt-2 mb-4"
            >
              Our Core Values
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              These principles guide everything we do, from how we build our platform to how we support our community.
            </motion.p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`w-16 h-16 ${value.iconBg} ${value.iconColor} rounded-xl flex items-center justify-center mb-6 group-hover:bg-opacity-100 group-hover:text-white transition-all duration-300 ${value.hoverBg}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION (like your StatsSection) ===== */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">

        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
          >

            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-center text-white"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>

                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {inView && (
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      suffix={stat.suffix}
                    />
                  )}
                </div>

                <div className="text-sm text-blue-100">{stat.label}</div>
              </motion.div>
            ))}

          </motion.div>
        </div>
      </section>

      {/* ===== CALL TO ACTION SECTION ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Be Part of Our Mission
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already transforming their lives through education.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Explore Courses
              </Link>
              <Link
                to="/contact"
                className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-purple-600 hover:text-purple-600 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Mission;