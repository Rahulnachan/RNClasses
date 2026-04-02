import React from "react";
import { motion } from "framer-motion";
import {
  SparklesIcon,
  LightBulbIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const OurStory = () => {

  const milestones = [
    {
      year: "2020",
      title: "The Beginning",
      description:
        "Started with a simple idea: make quality education accessible to all.",
      icon: SparklesIcon,
    },
    {
      year: "2022",
      title: "Growth & Innovation",
      description:
        "Expanded to 200+ courses and introduced AI-powered learning paths.",
      icon: LightBulbIcon,
    },
    {
      year: "2024",
      title: "Global Impact",
      description:
        "Now serving 50,000+ students across 150+ countries worldwide.",
      icon: HeartIcon,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE - Story */}
          <div>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Story
            </h2>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                It all started in a small garage with three friends who shared
                a common dream: to make world-class education accessible to
                everyone, regardless of their location or background.
              </p>

              <p>
                What began as a few recorded lectures has now grown into a
                global platform with over 200 expert-led courses, serving more
                than 50,000 students across six continents.
              </p>

              <p>
                Today, we're proud to have helped thousands of learners advance
                their careers, switch industries, and achieve their dreams
                through the power of education.
              </p>
            </div>

            {/* Quote */}
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-l-4 border-purple-600">
              <p className="text-xl italic text-gray-700">
                "Education is the most powerful weapon which you can use to change the world."
              </p>
              <p className="mt-2 font-semibold text-gray-900">
                — Nelson Mandela
              </p>
            </div>

          </div>

          {/* RIGHT SIDE - Timeline */}
          <div className="relative">

            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-600"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;

                return (
                  <div key={index} className="relative flex items-start group">

                    {/* Timeline dot */}
                    <div className="absolute left-6 top-6 w-4 h-4 bg-white border-4 border-purple-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>

                    {/* Card */}
                    <div className="ml-20 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">

                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                          <Icon className="w-5 h-5 text-white" />
                        </div>

                        <span className="text-sm font-semibold text-purple-600">
                          {milestone.year}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {milestone.title}
                      </h3>

                      <p className="text-gray-600">
                        {milestone.description}
                      </p>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default OurStory;
