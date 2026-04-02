import CourseCard from "..//Course/CourseCard";
import { motion } from "framer-motion";

export default function CourseList({
  courses = [],
  onEnroll,
  loading = false,
  title,
  subtitle,
}) {

  // ===== Loading State =====
  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gray-300"></div>

                {/* Text Placeholder */}
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ===== No Courses Available =====
  if (!courses || courses.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            {/* Empty Icon */}
            <svg
              className="w-20 h-20 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>

            <p className="text-gray-500 text-lg mb-4">No courses available</p>
            <p className="text-gray-400">Check back later for new courses</p>
          </div>
        </div>
      </section>
    );
  }

  // ===== Normal Course List =====
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Title and Subtitle */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="text-lg text-gray-600">{subtitle}</p>
            )}
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CourseCard course={course} onEnroll={onEnroll} />
            </motion.div>
          ))}
        </div> 
      </div>
    </section>
  );
}