import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../components/context/AuthContext";
import { 
  BookOpenIcon, 
  ChartBarIcon, 
  ClockIcon,
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  UserCircleIcon,
  TrophyIcon,
  FireIcon,
  ArrowPathIcon,
  DocumentArrowDownIcon,
  AcademicCapIcon as CertificateIcon,
  PlayCircleIcon,
  CheckBadgeIcon,
  ChatBubbleLeftIcon,
  PlusCircleIcon,
  HeartIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  StarIcon,
  CalendarIcon,
  BellIcon,
  BookmarkIcon,
  ShareIcon,
  SparklesIcon,
  LightBulbIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
  PresentationChartLineIcon,
  CpuChipIcon,
  BeakerIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid, StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { 
  fetchUserEnrollments, 
  fetchEnrollmentStats,
  updateProgress,
  cancelEnrollment
} from "../api/api";
import CertificateService from "../components/Services/certificateservice";
import Certificate from "../components/certificate/Certificate";
import { toast } from "react-hot-toast";

// Mock forum posts data
const mockForumPosts = [
  {
    id: 1,
    title: "Best resources for learning React?",
    content: "I just started learning React and I'm looking for recommendations on the best tutorials, books, or courses. Any suggestions?",
    author: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      role: "Student"
    },
    category: "Web Development",
    tags: ["React", "JavaScript", "Beginner"],
    likes: 24,
    views: 156,
    replies: 12,
    createdAt: "2024-01-15T10:30:00Z",
    isLiked: false
  },
  {
    id: 2,
    title: "Data Science Career Path - Need Advice",
    content: "I'm considering switching to data science. What skills should I learn first? Is Python enough to start?",
    author: {
      name: "Sarah Smith",
      avatar: "https://images.unsplash.com/photo-1494790108777-2f9bdb7a7d9e",
      role: "Professional"
    },
    category: "Data Science",
    tags: ["Python", "Career", "Machine Learning"],
    likes: 18,
    views: 98,
    replies: 8,
    createdAt: "2024-01-14T15:45:00Z",
    isLiked: true
  },
  {
    id: 3,
    title: "UI/UX Design Portfolio Review",
    content: "I've just finished my first portfolio and would love some feedback from experienced designers. Happy to exchange reviews!",
    author: {
      name: "Emily Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      role: "Student"
    },
    category: "Design",
    tags: ["UI/UX", "Portfolio", "Feedback"],
    likes: 32,
    views: 203,
    replies: 15,
    createdAt: "2024-01-13T09:15:00Z",
    isLiked: false
  },
  {
    id: 4,
    title: "JavaScript Promises vs Async/Await",
    content: "Can someone explain the difference between promises and async/await? When should I use each?",
    author: {
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      role: "Student"
    },
    category: "Web Development",
    tags: ["JavaScript", "Async", "Beginner"],
    likes: 45,
    views: 312,
    replies: 23,
    createdAt: "2024-01-12T14:20:00Z",
    isLiked: false
  }
];

// Mock achievements data - USING ACTUAL ICON COMPONENTS
const mockAchievements = [
  { id: 1, title: "Quick Learner", description: "Completed first course", icon: RocketLaunchIcon, progress: 100, unlocked: true },
  { id: 2, title: "Knowledge Seeker", description: "Enrolled in 5 courses", icon: BookOpenIcon, progress: 60, unlocked: false },
  { id: 3, title: "Perfect Score", description: "Scored 100% in a quiz", icon: StarIcon, progress: 0, unlocked: false },
  { id: 4, title: "Study Streak", description: "7 days consecutive learning", icon: FireIcon, progress: 43, unlocked: false }
];

// Mock recommended courses
const mockRecommendedCourses = [
  { id: 5, title: "Advanced React Patterns", instructor: "Sarah Johnson", rating: 4.9, students: 1234, image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee" },
  { id: 6, title: "Python for Data Science", instructor: "Michael Chen", rating: 4.8, students: 2345, image: "https://images.unsplash.com/photo-1526379095098-400a3a001af0" },
  { id: 7, title: "UI/UX Advanced Workshop", instructor: "Emily Rodriguez", rating: 4.9, students: 987, image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c" }
];

// Mock API functions (to replace missing ones)
const fetchRecommendedCourses = async () => {
  return { data: mockRecommendedCourses };
};

const fetchAchievements = async () => {
  return { data: mockAchievements };
};

const fetchStudyGroups = async () => {
  return { data: [] };
};

const getLearningPath = async () => {
  return { data: null };
};

const saveBookmark = async (courseId) => {
  return { success: true };
};

const StudentDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [certificateData, setCertificateData] = useState(null);
  
  // Forum state
  const [forumPosts, setForumPosts] = useState(mockForumPosts);
  const [forumSearch, setForumSearch] = useState('');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'General Discussion',
    tags: ''
  });

  // New state for enhanced features
  const [recommendedCourses, setRecommendedCourses] = useState(mockRecommendedCourses);
  const [achievements, setAchievements] = useState(mockAchievements);
  const [bookmarkedCourses, setBookmarkedCourses] = useState([]);
  const [studyGroups, setStudyGroups] = useState([]);
  const [learningPath, setLearningPath] = useState(null);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [weeklyActivity, setWeeklyActivity] = useState([2, 4, 3, 5, 6, 4, 3]); // Hours per day
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
    loadEnhancedData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      const enrollmentsResponse = await fetchUserEnrollments();
      console.log("Enrollments response:", enrollmentsResponse);
      
      const enrollmentsData = enrollmentsResponse.data || enrollmentsResponse || [];
      setEnrollments(enrollmentsData);
      
      try {
        const statsResponse = await fetchEnrollmentStats();
        setStats(statsResponse.data || statsResponse);
      } catch (statsErr) {
        console.error("Error fetching stats:", statsErr);
      }
      
      setError(null);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
      setError(err.response?.data?.error || "Failed to load your courses");
    } finally {
      setLoading(false);
    }
  };

  const loadEnhancedData = async () => {
    try {
      // Load recommended courses - using mock data
      const recommendedRes = await fetchRecommendedCourses();
      setRecommendedCourses(recommendedRes.data || mockRecommendedCourses);
      
      // Load achievements - using mock data
      const achievementsRes = await fetchAchievements();
      setAchievements(achievementsRes.data || mockAchievements);
      
      // Load study groups - using mock data
      const groupsRes = await fetchStudyGroups();
      setStudyGroups(groupsRes.data || []);
      
      // Load learning path - using mock data
      const pathRes = await getLearningPath();
      setLearningPath(pathRes.data || null);
      
    } catch (error) {
      console.error("Error loading enhanced data:", error);
      // Fallback to mock data
      setRecommendedCourses(mockRecommendedCourses);
      setAchievements(mockAchievements);
    }
  };

  const handleUpdateProgress = async (courseId, newProgress) => {
    try {
      setUpdatingId(courseId);
      const response = await updateProgress(courseId, newProgress);
      
      if (response.success) {
        setEnrollments(prev => 
          prev.map(item => {
            if (item.id === courseId || item.courseId === courseId) {
              return { ...item, progress: newProgress };
            }
            return item;
          })
        );
        toast.success("Progress updated!");
      }
    } catch (err) {
      console.error("Error updating progress:", err);
      toast.error("Failed to update progress");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCancelEnrollment = async (courseId) => {
    if (window.confirm("Are you sure you want to cancel this enrollment?")) {
      try {
        const response = await cancelEnrollment(courseId);
        if (response.success) {
          toast.success("✅ Enrollment cancelled");
          loadDashboardData();
        }
      } catch (err) {
        console.error("Error cancelling enrollment:", err);
        toast.error("Failed to cancel enrollment");
      }
    }
  };

  const handleGenerateCertificate = async (course) => {
    try {
      const enrollment = enrollments.find(e => 
        e.id === course.id || e.courseId === course.id
      );
      
      const progress = enrollment?.progress || 0;
      const isCompleted = progress === 100 || enrollment?.status === 'COMPLETED';
      
      if (!isCompleted) {
        toast.error('❌ Please complete the course first to get certificate!', {
          duration: 4000,
          icon: '⚠️'
        });
        return;
      }

      const loadingToast = toast.loading('Generating your certificate...');

      setSelectedCourse(course);
      const response = await CertificateService.generateCertificate(course.id, user?.id);
      setCertificateData(response.data);
      
      toast.dismiss(loadingToast);
      setShowCertificate(true);
      toast.success('✅ Certificate generated successfully!');
      
    } catch (err) {
      console.error("Error generating certificate:", err);
      toast.error("Failed to generate certificate. Please try again.");
    }
  };

  const handleBookmarkCourse = async (courseId) => {
    try {
      await saveBookmark(courseId);
      setBookmarkedCourses(prev => 
        prev.includes(courseId) 
          ? prev.filter(id => id !== courseId)
          : [...prev, courseId]
      );
      toast.success(bookmarkedCourses.includes(courseId) ? 'Bookmark removed' : 'Course bookmarked!');
    } catch (error) {
      toast.error('Failed to bookmark course');
    }
  };

  const handleShareCourse = (course) => {
    const shareUrl = `${window.location.origin}/courses/${course.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success('Course link copied to clipboard!');
  };

  // Forum Functions
  const handleForumLike = (postId) => {
    setForumPosts(forumPosts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    const post = {
      id: forumPosts.length + 1,
      ...newPost,
      tags: newPost.tags.split(',').map(tag => tag.trim()),
      author: {
        name: user?.name || 'Current User',
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        role: "Student"
      },
      likes: 0,
      views: 0,
      replies: 0,
      createdAt: new Date().toISOString(),
      isLiked: false
    };
    
    setForumPosts([post, ...forumPosts]);
    setShowNewPostModal(false);
    setNewPost({ title: '', content: '', category: 'General Discussion', tags: '' });
    toast.success('Post created successfully!');
  };

  const filteredForumPosts = forumPosts.filter(post => 
    post.title.toLowerCase().includes(forumSearch.toLowerCase()) ||
    post.content.toLowerCase().includes(forumSearch.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(forumSearch.toLowerCase()))
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const calculatedStats = stats || {
    totalCourses: enrollments.length,
    completedCourses: enrollments.filter(e => e.status === 'COMPLETED' || e.progress === 100).length,
    activeCourses: enrollments.filter(e => e.status === 'ACTIVE' && e.progress < 100).length,
    averageProgress: enrollments.length > 0 
      ? Math.round(enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) / enrollments.length) 
      : 0
  };

  const filteredEnrollments = enrollments.filter(enrollment => {
    const progress = enrollment.progress || 0;
    const status = enrollment.status || (progress === 100 ? 'COMPLETED' : 'ACTIVE');
    
    if (activeTab === "active") return status === 'ACTIVE' && progress < 100;
    if (activeTab === "completed") return status === 'COMPLETED' || progress === 100;
    return true;
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const nextMilestone = () => {
    const completed = calculatedStats.completedCourses;
    if (completed === 0) return 1;
    if (completed < 3) return 3;
    if (completed < 5) return 5;
    if (completed < 10) return 10;
    return completed + 5;
  };

  const completionPercentage = (calculatedStats.completedCourses / nextMilestone()) * 100;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <motion.div 
            className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mx-auto"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section 
        className="relative py-16 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row justify-between items-center"
          >
            <div className="text-center md:text-left mb-6 md:mb-0">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4"
              >
                <motion.span 
                  className="w-2 h-2 bg-green-400 rounded-full mr-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-sm font-medium text-white">Student Dashboard</span>
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {getGreeting()}, <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {user?.name?.split(' ')[0] || 'Student'}
                </span>!
              </h1>
              
              <p className="text-lg text-gray-200">
                Track your progress and continue learning
              </p>

              {/* Daily Quote */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-4 text-sm text-purple-200 italic"
              >
                "The expert in anything was once a beginner."
              </motion.div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/profile')}
                className="flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                <UserCircleIcon className="w-5 h-5 mr-2" />
                Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors shadow-lg"
              >
                Logout
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6"
          >
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <p className="text-red-700">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                <BookOpenIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Courses</p>
                <p className="text-3xl font-bold text-gray-900">{calculatedStats.totalCourses}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                <AcademicCapIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{calculatedStats.completedCourses}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <FireIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">In Progress</p>
                <p className="text-3xl font-bold text-gray-900">{calculatedStats.activeCourses}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20"
          >
            <div className="flex items-center">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
                <ChartBarIcon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Avg Progress</p>
                <p className="text-3xl font-bold text-gray-900">{calculatedStats.averageProgress}%</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FireIcon className="w-5 h-5 text-orange-500 mr-1" />
                <span className="font-semibold">3 day streak</span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="flex items-center">
                <StarIcon className="w-5 h-5 text-yellow-500 mr-1" />
                <span className="font-semibold">120 points</span>
              </div>
              <div className="h-4 w-px bg-gray-300"></div>
              <div className="flex items-center">
                <TrophyIcon className="w-5 h-5 text-purple-500 mr-1" />
                <span className="font-semibold">Level 3</span>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Next milestone: {nextMilestone()} courses</span>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/courses"
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all text-center group block"
            >
              <BookOpenIcon className="w-8 h-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">Browse Courses</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/forum"
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all text-center group block"
            >
              <ChatBubbleLeftIcon className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">Discussion Forum</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/certificates"
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all text-center group block"
            >
              <CertificateIcon className="w-8 h-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">My Certificates</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/study-groups"
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all text-center group block"
            >
              <UserCircleIcon className="w-8 h-8 text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">Study Groups</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/profile"
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all text-center group block"
            >
              <UserCircleIcon className="w-8 h-8 text-indigo-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium text-gray-700">Profile Settings</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - My Courses */}
          <div className="lg:col-span-2">
            {/* My Courses Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
                  <p className="text-gray-500 mt-1">Continue learning where you left off</p>
                </div>

                {/* Tab Filters */}
                <div className="flex gap-2 mt-4 sm:mt-0 bg-gray-100 p-1 rounded-lg">
                  {[
                    { id: "all", label: "All", icon: BookOpenIcon },
                    { id: "active", label: "In Progress", icon: FireIcon },
                    { id: "completed", label: "Completed", icon: CheckBadgeIcon }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          activeTab === tab.id
                            ? "bg-white text-purple-600 shadow-md"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        <Icon className="w-4 h-4 mr-2" />
                        {tab.label}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
              
              {filteredEnrollments.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpenIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {activeTab === "all" 
                      ? "No courses yet" 
                      : activeTab === "active" 
                      ? "No active courses" 
                      : "No completed courses"}
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {activeTab === "all" 
                      ? "Start your learning journey by enrolling in a course" 
                      : activeTab === "active" 
                      ? "Enroll in courses to start learning" 
                      : "Complete courses to see them here"}
                  </p>
                  <Link
                    to="/courses"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    Browse Courses
                    <ArrowTrendingUpIcon className="w-5 h-5 ml-2" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEnrollments.slice(0, 3).map((enrollment, index) => {
                    const course = enrollment.course || enrollment;
                    const courseId = course.id || enrollment.courseId;
                    const progress = enrollment.progress || 0;
                    const status = enrollment.status || (progress === 100 ? 'COMPLETED' : 'ACTIVE');
                    const isCompleted = status === 'COMPLETED' || progress === 100;
                    
                    return (
                      <motion.div
                        key={enrollment.id || enrollment.enrollmentId || index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"}
                            alt={course.title}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{course.title}</h3>
                            <p className="text-sm text-gray-600">{course.instructor || 'Expert Instructor'}</p>
                            <div className="flex items-center mt-2">
                              <div className="flex-1 max-w-xs">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      isCompleted ? 'bg-green-500' : 'bg-purple-600'
                                    }`}
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                              </div>
                              <span className="ml-3 text-sm font-medium text-gray-700">{progress}%</span>
                            </div>
                          </div>
                          <Link
                            to={`/courses/${courseId}`}
                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                          >
                            {isCompleted ? 'Review' : 'Continue'}
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                  {filteredEnrollments.length > 3 && (
                    <button
                      onClick={() => setActiveTab('all')}
                      className="w-full text-center text-purple-600 hover:text-purple-700 font-medium text-sm"
                    >
                      View all {filteredEnrollments.length} courses →
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Recommended Courses */}
            {showRecommendations && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
                    <p className="text-gray-500 mt-1">Based on your learning history</p>
                  </div>
                  <SparklesIcon className="w-6 h-6 text-purple-600" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedCourses.map((course) => (
                    <motion.div
                      key={course.id}
                      whileHover={{ y: -5 }}
                      className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{course.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{course.instructor}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <StarIconSolid className="w-4 h-4 text-yellow-500 mr-1" />
                            <span className="text-sm font-medium">{course.rating}</span>
                          </div>
                          <span className="text-sm text-gray-500">{course.students} students</span>
                        </div>
                        <div className="mt-3 flex space-x-2">
                          <Link
                            to={`/courses/${course.id}`}
                            className="flex-1 text-center px-3 py-1.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
                          >
                            View
                          </Link>
                          <button
                            onClick={() => handleBookmarkCourse(course.id)}
                            className="p-1.5 border border-gray-300 rounded-lg hover:bg-gray-100"
                          >
                            <BookmarkIcon className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Achievements & Activity */}
          <div className="lg:col-span-1 space-y-6">
            {/* Achievements Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Achievements</h3>
                <button
                  onClick={() => setShowAchievements(!showAchievements)}
                  className="text-purple-600 hover:text-purple-700 text-sm"
                >
                  {showAchievements ? 'Show less' : 'View all'}
                </button>
              </div>

              <div className="space-y-3">
                {achievements.slice(0, showAchievements ? undefined : 3).map((achievement) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={achievement.id} className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        achievement.unlocked ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          achievement.unlocked ? 'text-green-600' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-medium text-gray-900">{achievement.title}</p>
                          <span className="text-xs text-gray-500">{achievement.progress}%</span>
                        </div>
                        <p className="text-xs text-gray-500">{achievement.description}</p>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div 
                            className={`h-1.5 rounded-full ${
                              achievement.unlocked ? 'bg-green-500' : 'bg-purple-600'
                            }`}
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Weekly Activity */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Activity</h3>
              <div className="flex items-end justify-between h-32">
                {weeklyActivity.map((hours, i) => (
                  <div key={i} className="flex flex-col items-center w-8">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${hours * 8}px` }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="w-6 bg-purple-600 rounded-t-lg"
                    />
                    <span className="text-xs text-gray-500 mt-2">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-gray-600 mt-4">
                {weeklyActivity.reduce((a, b) => a + b, 0)} hours this week
              </p>
            </div>

            {/* Study Tips */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-6">
              <LightBulbIcon className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Study Tip</h3>
              <p className="text-gray-600 text-sm">
                Take breaks every 25 minutes to maintain focus and retention. Try the Pomodoro technique!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Discussion Forum Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8">
          {/* Forum Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <ChatBubbleLeftIcon className="w-8 h-8 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-900">Discussion Forum</h2>
              </div>
              <p className="text-gray-600">Join the conversation with fellow students</p>
            </div>
            
            <div className="flex gap-3 mt-4 md:mt-0">
              {/* Search Bar */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={forumSearch}
                  onChange={(e) => setForumSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full md:w-64"
                />
              </div>
              
              {/* New Post Button */}
              <button
                onClick={() => setShowNewPostModal(true)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all whitespace-nowrap"
              >
                <PlusCircleIcon className="w-5 h-5 mr-2" />
                New Post
              </button>
            </div>
          </div>

          {/* Forum Posts List */}
          <div className="space-y-4">
            {filteredForumPosts.slice(0, 3).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6"
              >
                <div className="flex items-start space-x-4">
                  {/* Author Avatar */}
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  
                  <div className="flex-1">
                    {/* Post Title */}
                    <Link to={`/forum/post/${post.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    
                    {/* Post Content Preview */}
                    <p className="text-gray-600 mt-1 line-clamp-2">{post.content}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {post.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Post Meta Info */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="font-medium text-gray-900">{post.author.name}</span>
                        <span>•</span>
                        <span>{post.author.role}</span>
                        <span>•</span>
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                      
                      {/* Post Stats */}
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleForumLike(post.id)}
                          className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                        >
                          {post.isLiked ? (
                            <HeartIconSolid className="w-5 h-5 text-red-500" />
                          ) : (
                            <HeartIcon className="w-5 h-5" />
                          )}
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        
                        <div className="flex items-center space-x-1 text-gray-500">
                          <EyeIcon className="w-5 h-5" />
                          <span className="text-sm">{post.views}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1 text-gray-500">
                          <ChatBubbleLeftIcon className="w-5 h-5" />
                          <span className="text-sm">{post.replies}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Discussions Link */}
          <div className="text-center mt-8">
            <Link
              to="/forum"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
            >
              View All Discussions
              <ArrowTrendingUpIcon className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {showNewPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewPostModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Create New Discussion</h2>
                  <button
                    onClick={() => setShowNewPostModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <XCircleIcon className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter post title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category
                    </label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option>General Discussion</option>
                      <option>Web Development</option>
                      <option>Data Science</option>
                      <option>Design</option>
                      <option>Mobile Development</option>
                      <option>Career Advice</option>
                      <option>Study Groups</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      rows="6"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Write your post content..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={newPost.tags}
                      onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="react, javascript, help"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={() => setShowNewPostModal(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreatePost}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
                    >
                      Create Post
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Certificate Modal */}
      <AnimatePresence>
        {showCertificate && selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto"
            onClick={() => setShowCertificate(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-5xl my-8"
              onClick={(e) => e.stopPropagation()}
            >
              <Certificate
                user={user}
                course={selectedCourse}
                certificateData={certificateData}
                onDownload={() => {
                  console.log('Certificate downloaded');
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentDashboard;