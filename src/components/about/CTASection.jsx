import React from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const CTASection = () => {
  const companies = ["Google", "Microsoft", "Amazon", "Meta"];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Gradient Card */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl overflow-hidden">

          {/* Background circles */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative px-6 py-16 md:py-24 md:px-12 text-center">

            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Learning Journey?
            </h2>

            {/* Description */}
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Join thousands of learners who are already transforming their
              careers with our expert-led courses.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <button className="group px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                Get Started Now
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition-all duration-300">
                Contact Sales
              </button>

            </div>

            {/* Trusted Companies */}
            <div className="mt-12 flex flex-wrap justify-center gap-8 items-center">
              <div className="text-white/60 text-sm">
                Trusted by companies like
              </div>

              {companies.map((company, index) => (
                <span key={index} className="text-white/80 font-semibold">
                  {company}
                </span>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
