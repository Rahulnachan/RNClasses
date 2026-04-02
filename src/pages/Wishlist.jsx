import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartIcon, ArrowLeftIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { fetchCourses } from '../api/api';

const Wishlist = () => {
  const [wishlistIds, setWishlistIds] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load wishlist from localStorage
    const saved = localStorage.getItem('courseWishlist');
    if (saved) {
      setWishlistIds(JSON.parse(saved));
    }
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const response = await fetchCourses();
      setCourses(response.data || []);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = (courseId) => {
    const newWishlist = wishlistIds.filter(id => id !== courseId);
    setWishlistIds(newWishlist);
    localStorage.setItem('courseWishlist', JSON.stringify(newWishlist));
  };

  const wishlistCourses = courses.filter(course => 
    wishlistIds.includes(course.id) || wishlistIds.includes(course._id)
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <Link to="/courses" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-4">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Courses
          </Link>
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <HeartIconSolid className="w-8 h-8 text-red-500 mr-3" />
              My Wishlist ({wishlistCourses.length})
            </h1>
            
            {wishlistCourses.length > 0 && (
              <button
                onClick={() => {
                  setWishlistIds([]);
                  localStorage.removeItem('courseWishlist');
                }}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Wishlist Grid */}
        {wishlistCourses.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-lg">
            <HeartIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Save courses you're interested in and they'll appear here.</p>
            <Link
              to="/courses"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <ShoppingBagIcon className="w-5 h-5 mr-2" />
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="relative h-40">
                  <img
                    src={course.image || course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => removeFromWishlist(course.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                  >
                    <HeartIconSolid className="w-4 h-4 text-red-500" />
                  </button>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-3">{course.instructor || 'Expert Instructor'}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-purple-600 font-bold">
                      {course.price ? `₹${course.price}` : 'Free'}
                    </span>
                    <Link
                      to={`/courses/${course.id}`}
                      className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700"
                    >
                      View Course
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;