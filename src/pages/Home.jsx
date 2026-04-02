import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/home/Hero";
import FeatureBlock from "../components/home/FeatureBlock";
import Courses from "../components/home/CoursesHome";
import Dashboard from "../components/home/Dashbord";
import WhyChooseUs from "../components/home/WhyChoose"; // Fixed import name
import HighlightSection from "../components/home/HighlightSection";
import AnimationWrapper from "../components/AnimationWrapper";
import TestimonialSection from "../components/about/TestimonialSection"; 
import CourseList from "../components/home/CourseList"; // Fixed import path
import SEO from "../components/common/SEO"; // Fixed import path
import EmailSubscribe from "../components/common/EmailSubscribe"; // NEW - Newsletter

const Home = () => {
  const featuredCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      description: "Learn HTML, CSS, JavaScript, React, Node.js and more",
      instructor: "Sarah Johnson",
      category: "Development",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
    },
    {
      id: 2,
      title: "Advanced React & Next.js",
      description: "Master modern React with hooks, context, and Next.js",
      instructor: "Michael Chen",
      category: "Development",
      price: 99.99,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee"
    },
    {
      id: 3,
      title: "Data Science & Machine Learning",
      description: "Python, pandas, scikit-learn, and TensorFlow",
      instructor: "Emily Rodriguez",
      category: "Data Science",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
    }
  ];

  const handleEnroll = (id) => {
    console.log("Enroll in course:", id);
    // Add your enrollment logic here
  };

  // Format price to Indian Rupees
  const formatPrice = (price) => {
    if (typeof price === 'number') {
      const inrPrice = Math.round(price * 83);
      return `₹${inrPrice.toLocaleString('en-IN')}`;
    }
    return price;
  };

  // Add formatted price to courses
  const coursesWithRupees = featuredCourses.map(course => ({
    ...course,
    displayPrice: formatPrice(course.price)
  }));

  return (
    <>
      <SEO 
        title="RN Classes - Learn Today, Lead Tomorrow"
        description="Join thousands of learners gaining real-world skills through expert-led courses and structured learning paths."
        keywords="online courses, e-learning, programming, web development, data science"
      />

      <div className="overflow-hidden">
        {/* Hero Section */}
        <AnimationWrapper direction="up">
          <section className="relative">
            <Hero />
          </section>
        </AnimationWrapper>

        {/* Features Section */}
        <AnimationWrapper direction="left">
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <FeatureBlock />
            </div>
          </section>
        </AnimationWrapper>

        {/* 🔥 NEW: Free Demo Banner */}
        <AnimationWrapper direction="right">
          <section className="py-12 bg-gradient-to-r from-purple-600 to-blue-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-between text-white">
                <div className="mb-4 md:mb-0 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    🎯 Try Before You Buy!
                  </h3>
                  <p className="text-purple-100">
                    Get a 10-minute free demo of any course. Experience our teaching style before enrolling.
                  </p>
                </div>
                <Link
                  to="/demo"
                  className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 whitespace-nowrap"
                >
                  Watch Free Demo
                </Link>
              </div>
            </div>
          </section>
        </AnimationWrapper>

        {/* Featured Courses Section */}
        <AnimationWrapper direction="right">
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                  Start Learning Today
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
                  Featured Courses
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Hand-picked courses by our experts to help you start your learning journey
                </p>
              </div>
              
              <CourseList 
                courses={coursesWithRupees}
                onEnroll={handleEnroll}
              />

              <div className="text-center mt-12">
                <Link
                  to="/courses"
                  className="inline-flex items-center px-6 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300 group"
                >
                  View All Courses
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
          </section>
        </AnimationWrapper>

        {/* Dashboard Section */}
        <AnimationWrapper direction="up">
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Dashboard />
            </div>
          </section>
        </AnimationWrapper>

        {/* Highlight Section */}
        <AnimationWrapper direction="left">
          <section className="py-20">
            <HighlightSection />
          </section>
        </AnimationWrapper>

        {/* Why Choose Us Section */}
        <AnimationWrapper direction="right">
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <WhyChooseUs />
            </div>
          </section>
        </AnimationWrapper>

        {/* Testimonials Section */}
        <AnimationWrapper direction="up">
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <TestimonialSection />
            </div>
          </section>
        </AnimationWrapper>

        {/* 🔥 NEW: Newsletter Section */}
        <AnimationWrapper direction="up">
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <EmailSubscribe />
            </div>
          </section>
        </AnimationWrapper>

        {/* CTA Section - Fixed gradient syntax */}
        <AnimationWrapper direction="up">
          <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to Start Your Learning Journey?
                </h2>
                <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                  Join thousands of students already learning on our platform. Get started today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/signup"
                    className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Get Started Free
                  </Link>
                  <Link
                    to="/courses"
                    className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition-all duration-300"
                  >
                    Browse Courses
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </AnimationWrapper>

        {/* 🔥 NEW: Trust Badges */}
        <AnimationWrapper direction="up">
          <section className="py-12 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-gray-500 mb-6">Trusted by students from</p>
              <div className="flex flex-wrap justify-center items-center gap-8">
                {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple'].map((company) => (
                  <span key={company} className="text-gray-400 font-semibold text-lg">
                    {company}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </AnimationWrapper>
      </div>
    </>
  );
};

export default Home;