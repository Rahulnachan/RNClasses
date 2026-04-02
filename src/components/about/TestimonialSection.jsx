import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from '@heroicons/react/24/solid';

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Software Engineer',
      company: 'Tech Corp',
      image: 'https://images.unsplash.com/photo-1494790108777-2f9bdb7a7d9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      content: 'This platform transformed my career. The courses are well-structured and the instructors are incredibly knowledgeable. I went from beginner to professional in just 6 months.',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Data Scientist',
      company: 'Analytics Pro',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      content: 'The hands-on projects and real-world examples made learning data science practical and enjoyable. The community support is amazing!',
      rating: 5
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Product Manager',
      company: 'Innovate Inc',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
      content: 'Ive taken multiple courses here and each one exceeded my expectations. The platform is intuitive and the learning paths are well-designed.',
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Thousands of learners have transformed their careers with our platform. 
            Here's what some of them have to say.
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl"
            >
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <StarIcon key={i} className="w-6 h-6 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-xl text-gray-700 text-center mb-8 leading-relaxed">
                "{testimonials[currentIndex].content}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div className="text-left">
                  <h4 className="text-lg font-bold text-gray-900">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-600">
                    {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ChevronRightIcon className="w-6 h-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-purple-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;