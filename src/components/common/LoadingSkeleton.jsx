import React from "react";
import { motion } from "framer-motion";

// ===============================
// Course Card Skeleton
// ===============================
export const CourseCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse"
  >
    <div className="h-48 bg-linear-to-r from-gray-200 to-gray-300"></div>

    <div className="p-6">
      <div className="h-6 bg-linear-to-r from-gray-200 to-gray-300 rounded w-3/4 mb-4"></div>

      <div className="space-y-2 mb-4">
        <div className="h-4 bg-linear-to-r from-gray-200 to-gray-300 rounded w-full"></div>
        <div className="h-4 bg-linear-to-r from-gray-200 to-gray-300 rounded w-2/3"></div>
      </div>

      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-linear-to-r from-gray-200 to-gray-300 rounded-full mr-3"></div>
        <div className="h-4 bg-linear-to-r from-gray-200 to-gray-300 rounded w-24"></div>
      </div>

      <div className="h-10 bg-linear-to-r from-gray-200 to-gray-300 rounded w-full"></div>
    </div>
  </motion.div>
);

// ===============================
// Profile Skeleton
// ===============================
export const ProfileSkeleton = () => (
  <div className="bg-white rounded-2xl p-8 shadow-lg animate-pulse">
    <div className="flex items-center space-x-4 mb-6">
      <div className="w-20 h-20 bg-linear-to-r from-gray-200 to-gray-300 rounded-full"></div>

      <div className="flex-1">
        <div className="h-6 bg-linear-to-r from-gray-200 to-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-linear-to-r from-gray-200 to-gray-300 rounded w-1/4"></div>
      </div>
    </div>

    <div className="space-y-3">
      <div className="h-4 bg-linear-to-r from-gray-200 to-gray-300 rounded w-full"></div>
      <div className="h-4 bg-linear-to-r from-gray-200 to-gray-300 rounded w-5/6"></div>
      <div className="h-4 bg-linear-to-r from-gray-200 to-gray-300 rounded w-4/6"></div>
    </div>
  </div>
);

// ===============================
// Dashboard Stats Skeleton
// ===============================
export const StatsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="bg-white rounded-xl p-6 shadow-lg animate-pulse">
        <div className="w-12 h-12 bg-linear-to-r from-gray-200 to-gray-300 rounded-lg mb-4"></div>
        <div className="h-4 bg-linear-to-r from-gray-200 to-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-8 bg-linear-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
      </div>
    ))}
  </div>
);

// ===============================
// List Skeleton
// ===============================
export const ListSkeleton = ({ count = 5 }) => (
  <div className="space-y-3">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4 animate-pulse">
        <div className="w-12 h-12 bg-linear-to-r from-gray-200 to-gray-300 rounded-lg"></div>

        <div className="flex-1">
          <div className="h-4 bg-linear-to-r from-gray-200 to-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-linear-to-r from-gray-200 to-gray-300 rounded w-1/2"></div>
        </div>
      </div>
    ))}
  </div>
);
