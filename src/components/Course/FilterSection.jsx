import React from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';


// =======================================
// COURSE FILTER COMPONENT
// =======================================
const CourseFilter = ({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  categories,
  totalCourses
}) => {

  return (
    <section className="py-12 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
        >

          {/* =======================
              Main Grid Layout
          ======================= */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* =======================
                SEARCH INPUT
            ======================= */}
            <div className="md:col-span-5">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Courses
              </label>

              <div className="relative">
                <MagnifyingGlassIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search by course title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                />
              </div>

            </div>


            {/* =======================
                CATEGORY DROPDOWN
            ======================= */}
            <div className="md:col-span-4">

              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FunnelIcon className="w-4 h-4 inline mr-1" />
                Filter by Category
              </label>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

            </div>


            {/* =======================
                RESULTS COUNT
            ======================= */}
            <div className="md:col-span-3 flex items-end justify-end">

              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">
                  Results:
                </p>

                <p className="text-2xl font-bold text-purple-600">
                  {totalCourses}
                </p>

                <p className="text-xs text-gray-500">
                  courses found
                </p>
              </div>

            </div>

          </div>


          {/* =======================
              ACTIVE FILTERS SECTION
          ======================= */}
          {(search || selectedCategory !== 'All') && (

            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-gray-100"
            >

              <div className="flex flex-wrap items-center gap-2">

                <span className="text-sm text-gray-600">
                  Active filters:
                </span>


                {/* Search Tag */}
                {search && (
                  <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    Search: "{search}"

                    <button
                      onClick={() => setSearch('')}
                      className="ml-2 hover:text-purple-900 font-bold"
                    >
                      ×
                    </button>
                  </span>
                )}


                {/* Category Tag */}
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    Category: {selectedCategory}

                    <button
                      onClick={() => setSelectedCategory('All')}
                      className="ml-2 hover:text-blue-900 font-bold"
                    >
                      ×
                    </button>
                  </span>
                )}


                {/* Clear All Button */}
                {(search || selectedCategory !== 'All') && (
                  <button
                    onClick={() => {
                      setSearch('');
                      setSelectedCategory('All');
                    }}
                    className="text-sm text-gray-500 hover:text-gray-700 underline ml-2"
                  >
                    Clear all
                  </button>
                )}

              </div>

            </motion.div>

          )}

        </motion.div>

      </div>
    </section>
  );
};

export default CourseFilter;
