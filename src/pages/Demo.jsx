import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  PlayIcon, 
  ClockIcon, 
  AcademicCapIcon, 
  XMarkIcon, 
  ArrowLeftIcon,
  StarIcon,
  UserGroupIcon,
  ChatBubbleLeftIcon,
  BookOpenIcon,
  CheckCircleIcon,
  HeartIcon,
  ShareIcon,
  BookmarkIcon,
  SparklesIcon,
  FireIcon,
  TrophyIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import VideoPlayer from '../components/video/VideoPlayer';
import OTPVerification from '../components/common/OTPVerification';
import { toast } from 'react-hot-toast';

const Demo = () => {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showVerification, setShowVerification] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [verified, setVerified] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [likedCourses, setLikedCourses] = useState([]);
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
  const [recentlyWatched, setRecentlyWatched] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [showFAQ, setShowFAQ] = useState(false);
  const [activeFAQ, setActiveFAQ] = useState(null);

  // Load liked and bookmarked from localStorage
  useEffect(() => {
    const savedLikes = localStorage.getItem('demoLikedCourses');
    const savedBookmarks = localStorage.getItem('demoBookmarkedCourses');
    const savedWatched = localStorage.getItem('recentlyWatchedDemos');
    
    if (savedLikes) setLikedCourses(JSON.parse(savedLikes));
    if (savedBookmarks) setBookmarkedCourses(JSON.parse(savedBookmarks));
    if (savedWatched) setRecentlyWatched(JSON.parse(savedWatched));
  }, []);

  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Demos', icon: SparklesIcon },
    { id: 'web', name: 'Web Development', icon: BookOpenIcon },
    { id: 'data', name: 'Data Science', icon: AcademicCapIcon },
    { id: 'design', name: 'UI/UX Design', icon: StarIcon },
    { id: 'mobile', name: 'Mobile Development', icon: PlayIcon },
  ];

  // Demo courses with enhanced data
  const demoCourses = [
    {
      id: 1,
      title: "Web Development Bootcamp - Demo",
      description: "Get started with HTML, CSS, and JavaScript in just 10 minutes",
      duration: "10 min",
      videoUrl: "https://www.youtube-nocookie.com/embed/3JluqTojuME",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      instructor: "Sarah Johnson",
      instructorBio: "Senior Web Developer with 8+ years experience",
      instructorAvatar: "https://images.unsplash.com/photo-1494790108777-2f9bdb7a7d9e",
      topics: ["HTML Basics", "CSS Fundamentals", "JavaScript Introduction"],
      fullCourseId: 1,
      category: 'web',
      level: 'Beginner',
      students: 15420,
      rating: 4.8,
      reviews: 2345,
      language: 'English',
      subtitles: ['English', 'Spanish'],
      requirements: ['Basic computer skills', 'No coding experience needed'],
      whatYouLearn: ['Build responsive websites', 'Style with CSS', 'Add interactivity with JavaScript'],
      isNew: true,
      isPopular: true
    },
    {
      id: 2,
      title: "Data Science Preview",
      description: "Explore Python and data analysis in this quick demo",
      duration: "10 min",
      videoUrl: "https://www.youtube-nocookie.com/embed/r-uOLxNrNk8",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
      instructor: "Michael Chen",
      instructorBio: "Data Scientist at Google, PhD in Machine Learning",
      instructorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      topics: ["Python Basics", "Data Analysis", "Visualization"],
      fullCourseId: 2,
      category: 'data',
      level: 'Beginner',
      students: 12340,
      rating: 4.9,
      reviews: 1890,
      language: 'English',
      subtitles: ['English', 'French', 'German'],
      requirements: ['Basic math knowledge', 'Interest in data'],
      whatYouLearn: ['Write Python code', 'Analyze datasets', 'Create visualizations'],
      isPopular: true
    },
    {
      id: 3,
      title: "UI/UX Design Preview",
      description: "Learn design principles and Figma basics",
      duration: "10 min",
      videoUrl: "https://www.youtube-nocookie.com/embed/c9Wg6Cb_YlU",
      thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
      instructor: "Emily Rodriguez",
      instructorBio: "Product Designer at Adobe, 6+ years in UX",
      instructorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      topics: ["Design Thinking", "Figma Tools", "Prototyping"],
      fullCourseId: 3,
      category: 'design',
      level: 'Beginner',
      students: 9870,
      rating: 4.7,
      reviews: 1234,
      language: 'English',
      subtitles: ['English', 'Japanese'],
      requirements: ['No design experience needed'],
      whatYouLearn: ['Create wireframes', 'Build prototypes', 'User research basics'],
      isNew: true
    },
    {
      id: 4,
      title: "React Native Mobile App Demo",
      description: "Build your first mobile app with React Native",
      duration: "12 min",
      videoUrl: "https://www.youtube-nocookie.com/embed/0-S5a0eXPoc",
      thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
      instructor: "Alex Kumar",
      instructorBio: "Mobile Developer at Uber",
      instructorAvatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
      topics: ["React Native Basics", "Components", "Navigation"],
      fullCourseId: 4,
      category: 'mobile',
      level: 'Intermediate',
      students: 5670,
      rating: 4.8,
      reviews: 892,
      language: 'English',
      subtitles: ['English'],
      requirements: ['Basic React knowledge'],
      whatYouLearn: ['Build mobile apps', 'Use native components', 'Navigation setup'],
      isNew: true
    },
    {
      id: 5,
      title: "Advanced JavaScript Concepts",
      description: "Master closures, promises, and async/await",
      duration: "15 min",
      videoUrl: "https://www.youtube-nocookie.com/embed/PFmuCDHHpwk",
      thumbnail: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a",
      instructor: "Sarah Johnson",
      instructorBio: "Senior Web Developer",
      instructorAvatar: "https://images.unsplash.com/photo-1494790108777-2f9bdb7a7d9e",
      topics: ["Closures", "Promises", "Async/Await"],
      fullCourseId: 5,
      category: 'web',
      level: 'Advanced',
      students: 8900,
      rating: 4.9,
      reviews: 1567,
      language: 'English',
      subtitles: ['English', 'Spanish'],
      requirements: ['JavaScript basics'],
      whatYouLearn: ['Master advanced JS', 'Handle async operations', 'Write clean code'],
      isPopular: true
    }
  ];

  // FAQ data
  const faqs = [
    {
      id: 1,
      question: "How do free demos work?",
      answer: "Simply select any course, verify your email, and you'll get instant access to a 10-minute preview. No payment required!"
    },
    {
      id: 2,
      question: "Do I need to create an account?",
      answer: "Just verify your email with OTP - no password needed. You can watch demos without creating a full account."
    },
    {
      id: 3,
      question: "Can I watch multiple demos?",
      answer: "Yes! You can watch as many demos as you want. Each course has its own 10-minute preview."
    },
    {
      id: 4,
      question: "How long do demos last?",
      answer: "Each demo is approximately 10-15 minutes long, giving you a comprehensive preview of the course content."
    },
    {
      id: 5,
      question: "Will I be charged after the demo?",
      answer: "Never! Demos are completely free. You only pay if you decide to enroll in the full course."
    }
  ];

  // Filter courses based on category and search
  const filteredCourses = demoCourses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get unique categories for filter
  const getCategoryCount = (categoryId) => {
    if (categoryId === 'all') return demoCourses.length;
    return demoCourses.filter(c => c.category === categoryId).length;
  };

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
    setShowVerification(true);
  };

  const handleVerify = () => {
    setVerified(true);
    setShowVerification(false);
    setShowVideo(true);
    
    // Add to recently watched
    const updatedWatched = [selectedCourse, ...recentlyWatched.filter(c => c.id !== selectedCourse.id)].slice(0, 5);
    setRecentlyWatched(updatedWatched);
    localStorage.setItem('recentlyWatchedDemos', JSON.stringify(updatedWatched));
    
    toast.success('✅ Access granted! Your 10-minute demo is starting...');
  };

  const handleLikeCourse = (courseId, e) => {
    e.stopPropagation();
    let updatedLikes;
    if (likedCourses.includes(courseId)) {
      updatedLikes = likedCourses.filter(id => id !== courseId);
      toast.success('❤️ Removed from favorites');
    } else {
      updatedLikes = [...likedCourses, courseId];
      toast.success('❤️ Added to favorites');
    }
    setLikedCourses(updatedLikes);
    localStorage.setItem('demoLikedCourses', JSON.stringify(updatedLikes));
  };

  const handleBookmarkCourse = (courseId, e) => {
    e.stopPropagation();
    let updatedBookmarks;
    if (bookmarkedCourses.includes(courseId)) {
      updatedBookmarks = bookmarkedCourses.filter(id => id !== courseId);
      toast.success('🔖 Bookmark removed');
    } else {
      updatedBookmarks = [...bookmarkedCourses, courseId];
      toast.success('🔖 Course bookmarked');
    }
    setBookmarkedCourses(updatedBookmarks);
    localStorage.setItem('demoBookmarkedCourses', JSON.stringify(updatedBookmarks));
  };

  const handleShareCourse = (course, e) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}/courses/${course.fullCourseId}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('📋 Course link copied!');
  };

  const handleWatchFullCourse = () => {
    if (selectedCourse) {
      navigate(`/courses/${selectedCourse.fullCourseId}`);
      setShowVideo(false);
    }
  };

  const handleBrowseMoreDemos = () => {
    setShowVideo(false);
    setSelectedCourse(null);
  };

  const handleSubmitFeedback = () => {
    if (feedbackRating === 0) {
      toast.error('Please select a rating');
      return;
    }
    toast.success('Thank you for your feedback!');
    setShowFeedback(false);
    setFeedbackRating(0);
    setFeedbackComment('');
  };

  const handleToggleFAQ = (faqId) => {
    setActiveFAQ(activeFAQ === faqId ? null : faqId);
  };

  const getLevelBadgeColor = (level) => {
    switch(level) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button and Stats */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 transition-colors">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            
            {/* User Stats */}
            <div className="flex items-center gap-4 text-sm">
              {likedCourses.length > 0 && (
                <div className="flex items-center text-gray-600">
                  <HeartIconSolid className="w-4 h-4 text-red-500 mr-1" />
                  <span>{likedCourses.length} favorites</span>
                </div>
              )}
              {recentlyWatched.length > 0 && (
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="w-4 h-4 text-blue-500 mr-1" />
                  <span>{recentlyWatched.length} recent</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section with Search */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Try Before You Buy! 🎯
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Get 10-minute free demos. Experience our teaching style before enrolling!
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search courses or instructors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-300"
                />
                <button className="absolute right-2 top-2 px-4 py-1.5 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? 'bg-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                <span>{category.name}</span>
                <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {getCategoryCount(category.id)}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Recently Watched Section */}
      {recentlyWatched.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <ClockIcon className="w-6 h-6 text-purple-600 mr-2" />
            Recently Watched
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {recentlyWatched.map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-xl overflow-hidden shadow-md cursor-pointer"
                onClick={() => handleSelectCourse(course)}
              >
                <img src={course.thumbnail} alt={course.title} className="w-full h-24 object-cover" />
                <div className="p-3">
                  <h3 className="font-semibold text-sm line-clamp-1">{course.title}</h3>
                  <p className="text-xs text-gray-500">{course.duration}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Demo Courses Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group relative"
              >
                {/* Badges */}
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  {course.isNew && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      NEW
                    </span>
                  )}
                  {course.isPopular && (
                    <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
                      <FireIcon className="w-3 h-3 mr-1" />
                      Popular
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 z-10 flex gap-2">
                  <button
                    onClick={(e) => handleLikeCourse(course.id, e)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    {likedCourses.includes(course.id) ? (
                      <HeartIconSolid className="w-4 h-4 text-red-500" />
                    ) : (
                      <HeartIcon className="w-4 h-4 text-gray-600" />
                    )}
                  </button>
                  <button
                    onClick={(e) => handleBookmarkCourse(course.id, e)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <BookmarkIcon className={`w-4 h-4 ${bookmarkedCourses.includes(course.id) ? 'text-purple-600 fill-current' : 'text-gray-600'}`} />
                  </button>
                  <button
                    onClick={(e) => handleShareCourse(course, e)}
                    className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <ShareIcon className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-purple-600 rounded-full p-4">
                      <PlayIcon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <span className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm flex items-center">
                    <ClockIcon className="w-3 h-3 mr-1" />
                    {course.duration}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getLevelBadgeColor(course.level)}`}>
                      {course.level}
                    </span>
                    <span className="text-xs text-gray-500">{course.language}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                  
                  {/* Instructor */}
                  <div className="flex items-center mb-3">
                    <img
                      src={course.instructorAvatar}
                      alt={course.instructor}
                      className="w-6 h-6 rounded-full object-cover mr-2"
                    />
                    <span className="text-sm text-gray-600">{course.instructor}</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(course.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">{course.rating}</span>
                    <span className="ml-1 text-sm text-gray-500">({course.reviews})</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <UserGroupIcon className="w-4 h-4 mr-1" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <AcademicCapIcon className="w-4 h-4 mr-1" />
                      <span>{course.topics.length} topics</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectCourse(course)}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Watch Free Demo
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <button
            onClick={() => setShowFAQ(!showFAQ)}
            className="text-purple-600 hover:text-purple-700"
          >
            {showFAQ ? 'Show Less' : 'View All'}
          </button>
        </div>
        
        <div className="space-y-4">
          {(showFAQ ? faqs : faqs.slice(0, 3)).map((faq) => (
            <motion.div
              key={faq.id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => handleToggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-purple-600 transform transition-transform ${
                    activeFAQ === faq.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeFAQ === faq.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 pb-4 text-gray-600"
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Take a Demo Section */}
      <section className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Take a Free Demo?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AcademicCapIcon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Experience Teaching Style</h3>
              <p className="text-gray-600">See how our instructors teach and if their style matches your learning preferences.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlayIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Preview Course Content</h3>
              <p className="text-gray-600">Get a sneak peek at the course material before you commit to enrolling.</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Risk, No Cost</h3>
              <p className="text-gray-600">It's completely free! No credit card required, just pure learning.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Verification Modal */}
      <AnimatePresence>
        {showVerification && selectedCourse && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Verify to Watch Demo</h3>
                  <button
                    onClick={() => setShowVerification(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                <div className="mb-6">
                  <p className="text-gray-600 mb-2">You're about to watch:</p>
                  <p className="font-semibold text-purple-600 bg-purple-50 p-3 rounded-lg">
                    {selectedCourse.title}
                  </p>
                  <div className="flex items-center gap-2 mt-3 text-sm text-gray-500">
                    <UserGroupIcon className="w-4 h-4" />
                    <span>{selectedCourse.students.toLocaleString()} students</span>
                    <span>•</span>
                    <StarIcon className="w-4 h-4 text-yellow-500" />
                    <span>{selectedCourse.rating}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-3">
                    Please verify your email to access the free {selectedCourse.duration} demo.
                  </p>
                </div>
                <OTPVerification
                  type="email"
                  onVerify={handleVerify}
                  onClose={() => setShowVerification(false)}
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && selectedCourse && (
          <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowVideo(false)}
                className="absolute -top-12 right-0 text-white hover:text-purple-400 flex items-center gap-2 transition-colors"
              >
                <span>Close</span>
                <XMarkIcon className="w-6 h-6" />
              </button>
              
              {/* Video Player */}
              <div className="bg-black rounded-t-2xl overflow-hidden">
                <VideoPlayer
                  videoUrl={selectedCourse.videoUrl}
                  title={selectedCourse.title}
                  courseId={selectedCourse.id}
                  isDemo={true}
                  autoplay={true}
                />
              </div>
              
              {/* Video Info Bar */}
              <div className="bg-white rounded-b-2xl p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{selectedCourse.title}</h3>
                      <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold">
                        {selectedCourse.duration} Demo
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <img
                          src={selectedCourse.instructorAvatar}
                          alt={selectedCourse.instructor}
                          className="w-6 h-6 rounded-full object-cover mr-2"
                        />
                        <span className="text-gray-600">{selectedCourse.instructor}</span>
                      </div>
                      <div className="flex items-center text-gray-500">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        <span>Free preview</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 w-full md:w-auto">
                    <button
                      onClick={handleWatchFullCourse}
                      className="flex-1 md:flex-none px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    >
                      View Full Course
                    </button>
                    <button
                      onClick={handleBrowseMoreDemos}
                      className="flex-1 md:flex-none px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                    >
                      More Demos
                    </button>
                  </div>
                </div>

                {/* Topics Preview */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">In this demo:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourse.topics.map((topic, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* What You'll Learn */}
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">What you'll learn:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedCourse.whatYouLearn.map((item, i) => (
                      <div key={i} className="flex items-start text-sm text-gray-600">
                        <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Feedback Section */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-700">Was this demo helpful?</h4>
                    <button
                      onClick={() => setShowFeedback(true)}
                      className="text-purple-600 hover:text-purple-700 text-sm"
                    >
                      Leave Feedback
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Feedback Modal */}
      <AnimatePresence>
        {showFeedback && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">Rate This Demo</h3>
                <button
                  onClick={() => setShowFeedback(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-3">How would you rate this demo?</p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => setFeedbackRating(rating)}
                      className={`p-2 rounded-lg transition-all ${
                        feedbackRating >= rating
                          ? 'text-yellow-500 scale-110'
                          : 'text-gray-300 hover:text-yellow-400'
                      }`}
                    >
                      <StarIcon className="w-8 h-8 fill-current" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Comments (Optional)
                </label>
                <textarea
                  value={feedbackComment}
                  onChange={(e) => setFeedbackComment(e.target.value)}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Tell us what you think..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSubmitFeedback}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Submit Feedback
                </button>
                <button
                  onClick={() => setShowFeedback(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Demo;