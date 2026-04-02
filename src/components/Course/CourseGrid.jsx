import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  StarIcon,
  UserGroupIcon,
  ClockIcon,
  BookOpenIcon,
  HeartIcon as HeartOutline,
  ShareIcon,
  CheckBadgeIcon,
  FireIcon,
  AcademicCapIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

// ===============================
// MAIN COMPONENT
// ===============================
const CourseGrid = ({ courses, onEnroll, enrollingId }) => {
  const [wishlist, setWishlist] = useState([]);
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Load wishlist and enrolled courses from localStorage
  useEffect(() => {
    const savedWishlist = localStorage.getItem('courseWishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }

    // Load enrolled courses from user data (you can get this from API/context)
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.enrolledCourses) {
      setEnrolledCourses(user.enrolledCourses);
    }
  }, []);

  // Save wishlist to localStorage
  const toggleWishlist = (courseId, e) => {
    e.stopPropagation();
    let newWishlist;
    if (wishlist.includes(courseId)) {
      newWishlist = wishlist.filter(id => id !== courseId);
      toast.success('Removed from wishlist', { icon: '💔' });
    } else {
      newWishlist = [...wishlist, courseId];
      toast.success('Added to wishlist', { icon: '❤️' });
    }
    setWishlist(newWishlist);
    localStorage.setItem('courseWishlist', JSON.stringify(newWishlist));
  };

  // Sort courses based on selected option
  const getSortedCourses = () => {
    let sorted = [...courses];
    
    switch(sortBy) {
      case 'popular':
        sorted.sort((a, b) => (b.studentsCount || 0) - (a.studentsCount || 0));
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'price-low':
        sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'rating':
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }
    
    return sorted;
  };

  // Calculate trending courses (based on enrollment count)
  const getTrendingThreshold = () => {
    const enrollments = courses.map(c => c.studentsCount || 0);
    enrollments.sort((a, b) => b - a);
    return enrollments[Math.floor(enrollments.length * 0.2)] || 100; // Top 20% are trending
  };

  const trendingThreshold = getTrendingThreshold();
  const sortedCourses = getSortedCourses();

  // If no courses found
  if (!courses || courses.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-16 text-center shadow-xl"
          >
            <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpenIcon className="w-12 h-12 text-purple-600" />
            </div>

            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              No courses found
            </h3>

            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any courses matching your criteria. Try adjusting your filters or search term.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Reset Filters
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header with Enhanced Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Available Courses
            </h2>

            <p className="text-lg text-gray-600">
              Showing <span className="font-semibold text-purple-600">
                {courses.length}
              </span> course{courses.length !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Wishlist Count */}
            {wishlist.length > 0 && (
              <Link
                to="/wishlist"
                className="flex items-center text-sm text-gray-600 hover:text-purple-600 transition-colors"
              >
                <HeartSolid className="w-5 h-5 text-red-500 mr-1" />
                <span>{wishlist.length} saved</span>
              </Link>
            )}

            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-purple-600 text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Sort Dropdown */}
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent bg-white"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest First</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </motion.div>

        {/* Grid/List View */}
        <div className={`${
          viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' 
            : 'space-y-4'
        }`}>
          {sortedCourses.map((course, index) => {
            const id = course.id || course._id || index;
            const isTrending = (course.studentsCount || 0) >= trendingThreshold;

            return (
              <CourseCard
                key={id}
                course={course}
                index={index}
                onEnroll={onEnroll}
                isEnrolling={enrollingId === id}
                isWishlisted={wishlist.includes(id)}
                onWishlistToggle={toggleWishlist}
                viewMode={viewMode}
                isTrending={isTrending}
                isEnrolled={enrolledCourses.includes(id)}
              />
            );
          })}
        </div>

        {/* Load More */}
        {courses.length > 9 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <button className="px-8 py-3 border-2 border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition-colors">
              Load More Courses
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

// ===============================
// COURSE CARD COMPONENT
// ===============================
const CourseCard = ({ 
  course, 
  index, 
  onEnroll, 
  isEnrolling, 
  isWishlisted, 
  onWishlistToggle,
  viewMode,
  isTrending,
  isEnrolled
}) => {

  const id = course.id || course._id;

  // Helper function to safely get instructor name
  const getInstructorName = () => {
    if (course.trainer && course.trainer.name) {
      return course.trainer.name;
    }
    if (course.instructor && typeof course.instructor === 'string') {
      return course.instructor;
    }
    if (course.allInstructor && course.allInstructor.length > 0) {
      const firstInstructor = course.allInstructor[0];
      return firstInstructor.name || 'Instructor';
    }
    return 'To Be Assigned';
  };

  // Helper function to safely get instructor image
  const getInstructorImage = () => {
    if (course.trainer && course.trainer.profileImage) {
      return course.trainer.profileImage;
    }
    if (course.instructorImage) {
      return course.instructorImage;
    }
    if (course.allInstructorImage && course.allInstructorImage.length > 0) {
      return course.allInstructorImage[0];
    }
    if (course.allInstructor && course.allInstructor.length > 0) {
      const firstInstructor = course.allInstructor[0];
      if (firstInstructor.profileImage) {
        return firstInstructor.profileImage;
      }
    }
    return 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80';
  };

  // Helper function to check if instructor exists
  const hasInstructor = () => {
    return (
      (course.trainer && course.trainer.name) ||
      (course.instructor) ||
      (course.allInstructor && course.allInstructor.length > 0)
    );
  };

  // Helper function to format price in Indian Rupees
  const formatPriceInRupees = (price) => {
    if (price === null || price === undefined || price === 0) {
      return 'Free';
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Get certificate status
  const includesCertificate = course.includesCertificate || false;

  // Default values
  const title = course.title || 'Untitled Course';
  const description = course.description || 'No description available';
  const instructorName = getInstructorName();
  const instructorImage = getInstructorImage();
  const category = course.category || 'Development';
  const price = course.price;
  const rating = course.rating || 4.5;
  const students = course.studentsCount || 0;
  const duration = course.duration || 'Self-paced';
  const level = course.level || 'Beginner';
  const image = course.image || course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';

  // Share course function
  const handleShare = (e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/courses/${id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Course link copied to clipboard!', { icon: '📋' });
  };

  // Calculate progress if enrolled (mock data - replace with actual progress)
  const progress = isEnrolled ? Math.floor(Math.random() * 100) : 0;

  // List view rendering
  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="relative md:w-64 h-48 md:h-auto">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
              }}
            />
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {isTrending && (
                <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                  <FireIcon className="w-3 h-3 mr-1" />
                  Trending
                </span>
              )}
              {includesCertificate && (
                <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                  <CheckBadgeIcon className="w-3 h-3 mr-1" />
                  Cert
                </span>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 mb-3">{category}</p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={(e) => onWishlistToggle(id, e)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  {isWishlisted ? (
                    <HeartSolid className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartOutline className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ShareIcon className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

            {/* Instructor */}
            <div className="flex items-center mb-4">
              <img
                src={instructorImage}
                alt={instructorName}
                className="w-8 h-8 rounded-full object-cover mr-3"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80';
                }}
              />
              <div>
                <p className="text-xs text-gray-500">Instructor</p>
                <span className="text-sm text-gray-700 font-medium">{instructorName}</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <StarIcon className="w-4 h-4 text-yellow-400" />
                <span className="ml-1 text-sm text-gray-700">{rating}</span>
              </div>
              <div className="flex items-center">
                <UserGroupIcon className="w-4 h-4 text-gray-400" />
                <span className="ml-1 text-sm text-gray-600">{students.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <ClockIcon className="w-4 h-4 text-gray-400" />
                <span className="ml-1 text-sm text-gray-600">{duration}</span>
              </div>
              <span className="text-sm font-semibold text-purple-600">
                {formatPriceInRupees(price)}
              </span>
            </div>

            {/* Progress Bar for Enrolled */}
            {isEnrolled && (
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Your Progress</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Enroll Button */}
            <button
              onClick={() => onEnroll(id)}
              disabled={isEnrolling || isEnrolled}
              className={`px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg
                ${(isEnrolling || isEnrolled) ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg hover:scale-105'}
                transition-all duration-300`}
            >
              {isEnrolled ? 'Already Enrolled' : isEnrolling ? 'Enrolling...' : 'Enroll Now'}
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid view rendering (original)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group h-full flex flex-col relative"
    >
      {/* Trending Badge */}
      {isTrending && (
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center shadow-lg">
            <FireIcon className="w-3 h-3 mr-1" />
            Trending
          </span>
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={(e) => onWishlistToggle(id, e)}
        className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
      >
        {isWishlisted ? (
          <HeartSolid className="w-5 h-5 text-red-500" />
        ) : (
          <HeartOutline className="w-5 h-5 text-gray-600" />
        )}
      </button>

      {/* Share Button */}
      <button
        onClick={handleShare}
        className="absolute top-4 right-16 z-10 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
      >
        <ShareIcon className="w-5 h-5 text-gray-600" />
      </button>

      {/* Image */}
      <div className="relative h-48 overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Category & Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {category}
          </span>
          
          {includesCertificate && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
              <CheckBadgeIcon className="w-3 h-3 mr-1" />
              Cert
            </span>
          )}
        </div>

        {/* Price */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-purple-600">
          {formatPriceInRupees(price)}
        </div>

        {/* Enrolled Badge */}
        {isEnrolled && (
          <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
            <AcademicCapIcon className="w-3 h-3 mr-1" />
            Enrolled
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Instructor */}
        {hasInstructor() ? (
          <div className="flex items-center mb-4">
            <img
              src={instructorImage}
              alt={instructorName}
              className="w-8 h-8 rounded-full object-cover mr-3"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80';
              }}
            />
            <div>
              <p className="text-xs text-gray-500">Instructor</p>
              <span className="text-sm text-gray-700 font-medium">{instructorName}</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <UserGroupIcon className="w-4 h-4 text-gray-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Instructor</p>
              <span className="text-sm text-gray-500 italic">To be assigned</span>
            </div>
          </div>
        )}

        {/* Stats & Rating */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <span className="ml-1 text-gray-700 font-semibold">{rating}</span>
            <span className="mx-2 text-gray-300">•</span>
            <UserGroupIcon className="w-5 h-5 text-gray-400" />
            <span className="ml-1 text-gray-600">
              {students > 0 ? students.toLocaleString('en-IN') : '0'} students
            </span>
          </div>
        </div>

        {/* Progress Bar for Enrolled */}
        {isEnrolled && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div 
                className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
            {level}
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium flex items-center">
            <ClockIcon className="w-3 h-3 mr-1" />
            {duration}
          </span>
        </div>

        {/* Enroll Button */}
        <button
          onClick={() => onEnroll(id)}
          disabled={isEnrolling || isEnrolled}
          className={`w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg mt-auto
            ${(isEnrolling || isEnrolled) ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg transform hover:scale-105'}
            transition-all duration-300 flex items-center justify-center`}
        >
          {isEnrolled ? (
            <>
              <AcademicCapIcon className="w-5 h-5 mr-2" />
              Already Enrolled
            </>
          ) : isEnrolling ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Enrolling...
            </>
          ) : (
            'Enroll Now'
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default CourseGrid;