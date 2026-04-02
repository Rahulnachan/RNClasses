import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../components/context/AuthContext";
import { 
  BookOpenIcon, 
  ChartBarIcon, 
  ClockIcon,
  AcademicCapIcon,
  UserGroupIcon,
  StarIcon,
  PencilIcon,
  TrashIcon,
  PlusCircleIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  ChatBubbleLeftIcon,
  BellIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowPathIcon,
  CalendarIcon,
  CurrencyRupeeIcon,
  TrophyIcon,
  FireIcon,
  EnvelopeIcon,
  PhoneIcon,
  DocumentDuplicateIcon,
  ShareIcon,
  QrCodeIcon,
  ChartPieIcon,
  // 🔥 NEW ICONS FOR APPROVAL
  ShieldCheckIcon,
  ShieldExclamationIcon,
  ArrowPathRoundedSquareIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";
import { 
  fetchTrainerCourses, 
  fetchTrainerStats,
  fetchStudentEnrollments,
  updateCourse,
  deleteCourse,
  createCourse,
  resubmitCourse, // 🔥 NEW API CALL
  getRejectionReason // 🔥 NEW API CALL
} from "../api/trainerApi";
import { toast } from "react-hot-toast";

const TrainerDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [students, setStudents] = useState([]);
  const [reviews, setReviews] = useState([]);
  
  // 🔥 NEW STATE FOR APPROVAL
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [showRejectionReason, setShowRejectionReason] = useState(false);
  const [rejectionDetails, setRejectionDetails] = useState(null);
  
  // New state for enhanced features
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showCoursePreview, setShowCoursePreview] = useState(false);
  const [previewCourse, setPreviewCourse] = useState(null);
  const [dateRange, setDateRange] = useState('week');
  const [performanceData, setPerformanceData] = useState(null);
  
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadTrainerData();
  }, []);

  const loadTrainerData = async () => {
    try {
      setLoading(true);
      
      // Fetch trainer's courses with approval status
      const coursesResponse = await fetchTrainerCourses();
      setCourses(coursesResponse.data || []);
      
      // 🔥 NEW: Set approval counts
      setPendingCount(coursesResponse.pendingCount || 0);
      setApprovedCount(coursesResponse.approvedCount || 0);
      setRejectedCount(coursesResponse.rejectedCount || 0);
      
      // Fetch stats
      const statsResponse = await fetchTrainerStats();
      setStats(statsResponse.data || {});
      
      // Fetch enrolled students
      const studentsResponse = await fetchStudentEnrollments();
      setStudents(studentsResponse.data || []);
      
      // Calculate performance metrics
      calculatePerformanceMetrics(coursesResponse.data || [], studentsResponse.data || []);
      
      setError(null);
    } catch (err) {
      console.error("Failed to load trainer data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const calculatePerformanceMetrics = (courses, students) => {
    const totalStudents = students.length;
    const totalRevenue = courses.reduce((sum, course) => sum + (course.enrollments || 0) * (course.price || 0), 0);
    const avgRating = courses.reduce((sum, course) => sum + (course.rating || 0), 0) / (courses.length || 1);
    const completionRate = students.filter(s => s.progress === 100).length / (totalStudents || 1) * 100;
    
    setPerformanceData({
      totalStudents,
      totalRevenue,
      avgRating,
      completionRate,
      popularCourse: courses.length > 0 ? courses.reduce((max, course) => 
        (course.enrollments || 0) > (max.enrollments || 0) ? course : max, courses[0]) : null
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditCourse = (course) => {
    // 🔥 NEW: Check if course can be edited
    if (course.approvalStatus === 'APPROVED') {
      toast.error("Approved courses cannot be edited. Please contact admin.");
      return;
    }
    setSelectedCourse(course);
    setShowAddCourse(true);
  };

  const handleDeleteCourse = async (courseId) => {
    // 🔥 NEW: Check if course can be deleted
    const course = courses.find(c => c.id === courseId);
    if (course?.approvalStatus === 'APPROVED' && course?.enrollments > 0) {
      toast.error("Cannot delete approved course with enrolled students");
      return;
    }
    
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(courseId);
        setCourses(courses.filter(c => c.id !== courseId));
        toast.success("Course deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete course");
      }
    }
  };

  // 🔥 NEW: Handle resubmit rejected course
  const handleResubmitCourse = async (course) => {
    if (!window.confirm("Are you sure you want to resubmit this course for approval?")) {
      return;
    }
    
    try {
      const response = await resubmitCourse(course.id, course);
      toast.success("Course resubmitted for approval successfully!");
      loadTrainerData(); // Refresh data
    } catch (err) {
      toast.error("Failed to resubmit course");
    }
  };

  // 🔥 NEW: View rejection reason
  const handleViewRejectionReason = async (courseId) => {
    try {
      const response = await getRejectionReason(courseId);
      setRejectionDetails(response);
      setShowRejectionReason(true);
    } catch (err) {
      toast.error("Failed to fetch rejection reason");
    }
  };

  const handleCourseSubmit = async (courseData) => {
    try {
      if (selectedCourse) {
        // Update existing course
        await updateCourse(selectedCourse.id, courseData);
        toast.success("Course updated successfully!");
      } else {
        // Create new course
        await createCourse(courseData);
        toast.success("Course submitted for approval successfully!");
      }
      setShowAddCourse(false);
      setSelectedCourse(null);
      loadTrainerData(); // Refresh data
    } catch (err) {
      toast.error("Failed to save course");
    }
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const handlePreviewCourse = (course) => {
    setPreviewCourse(course);
    setShowCoursePreview(true);
  };

  const handleDuplicateCourse = async (course) => {
    // 🔥 NEW: Only allow duplicating approved courses
    if (course.approvalStatus !== 'APPROVED') {
      toast.error("Only approved courses can be duplicated");
      return;
    }
    
    const duplicateData = {
      title: `${course.title} (Copy)`,
      description: course.description,
      price: course.price,
      category: course.category,
      level: course.level,
      duration: course.duration,
      image: course.image
    };
    
    try {
      await createCourse(duplicateData);
      toast.success("Course duplicated and submitted for approval!");
      loadTrainerData();
    } catch (err) {
      toast.error("Failed to duplicate course");
    }
  };

  const handleShareCourse = (course) => {
    // 🔥 NEW: Only allow sharing approved courses
    if (course.approvalStatus !== 'APPROVED') {
      toast.error("Only approved courses can be shared");
      return;
    }
    const shareUrl = `${window.location.origin}/courses/${course.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast.success("Course link copied to clipboard!");
  };

  const filterCourses = () => {
    let filtered = [...courses];
    
    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter (including approval status)
    if (filterStatus !== 'all') {
      filtered = filtered.filter(course => {
        if (filterStatus === 'published') return course.isPublished;
        if (filterStatus === 'draft') return !course.isPublished;
        if (filterStatus === 'pending') return course.approvalStatus === 'PENDING';
        if (filterStatus === 'approved') return course.approvalStatus === 'APPROVED';
        if (filterStatus === 'rejected') return course.approvalStatus === 'REJECTED';
        if (filterStatus === 'popular') return (course.enrollments || 0) > 10;
        return true;
      });
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'popular':
        filtered.sort((a, b) => (b.enrollments || 0) - (a.enrollments || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'price-low':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      default:
        break;
    }
    
    return filtered;
  };

  const filterStudents = () => {
    let filtered = [...students];
    
    if (searchTerm) {
      filtered = filtered.filter(student => 
        student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const totalStudents = students.length;
  const totalRevenue = courses.reduce((sum, course) => sum + (course.enrollments || 0) * (course.price || 0), 0);
  const averageRating = courses.reduce((sum, course) => sum + (course.rating || 0), 0) / (courses.length || 1);

  const filteredCourses = filterCourses();
  const filteredStudents = filterStudents();

  // 🔥 NEW: Approval Status Badge Component
  const ApprovalStatusBadge = ({ status, rejectionReason, courseId }) => {
    const getStatusConfig = () => {
      switch (status) {
        case 'PENDING':
          return {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800',
            icon: ClockIcon,
            label: 'Pending Approval'
          };
        case 'APPROVED':
          return {
            bg: 'bg-green-100',
            text: 'text-green-800',
            icon: CheckCircleIcon,
            label: 'Approved'
          };
        case 'REJECTED':
          return {
            bg: 'bg-red-100',
            text: 'text-red-800',
            icon: XCircleIcon,
            label: 'Rejected'
          };
        default:
          return {
            bg: 'bg-gray-100',
            text: 'text-gray-800',
            icon: InformationCircleIcon,
            label: status
          };
      }
    };

    const config = getStatusConfig();
    const Icon = config.icon;

    return (
      <div className="flex items-center space-x-2">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
          <Icon className="w-3 h-3 mr-1" />
          {config.label}
        </span>
        {status === 'REJECTED' && rejectionReason && (
          <button
            onClick={() => handleViewRejectionReason(courseId)}
            className="text-red-600 hover:text-red-800"
            title="View rejection reason"
          >
            <InformationCircleIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trainer dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Trainer Dashboard</h1>
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                {user?.name || 'Trainer'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/profile')}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-purple-600"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-2">
            {getGreeting()}, {user?.name?.split(' ')[0]}! 👋
          </h2>
          <p className="text-purple-100">
            Manage your courses, track student progress, and grow your teaching impact.
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Stats Cards with Icons - Updated to include approval stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BookOpenIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Courses</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <UsersIcon className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold">{totalStudents}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <StarIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Avg Rating</p>
                <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <CurrencyRupeeIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</p>
              </div>
            </div>
          </motion.div>

          {/* 🔥 NEW: Pending Approval Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            onClick={() => {
              setFilterStatus('pending');
              setActiveTab('courses');
            }}
          >
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <ClockIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Pending Approval</p>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </div>
            </div>
          </motion.div>

          {/* 🔥 NEW: Rejected Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            onClick={() => {
              setFilterStatus('rejected');
              setActiveTab('courses');
            }}
          >
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <XCircleIcon className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Rejected</p>
                <p className="text-2xl font-bold">{rejectedCount}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter Bar - Updated with approval filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses or students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Courses</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
                <option value="pending">Pending Approval</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="popular">Popular (10+ students)</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <button
                onClick={loadTrainerData}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                title="Refresh"
              >
                <ArrowPathIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs with Counts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: ChartBarIcon, count: null },
              { id: "courses", label: "My Courses", icon: BookOpenIcon, count: courses.length },
              { id: "students", label: "Students", icon: UsersIcon, count: filteredStudents.length },
              { id: "reviews", label: "Reviews", icon: StarIcon, count: reviews.length },
              { id: "analytics", label: "Analytics", icon: ChartPieIcon, count: null }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.label}
                  {tab.count !== null && tab.count > 0 && (
                    <span className="ml-2 bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2" />
                    <span>{students.length} new enrollments</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <StarIcon className="w-4 h-4 text-yellow-500 mr-2" />
                    <span>{reviews.length} new reviews</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <ChatBubbleLeftIcon className="w-4 h-4 text-blue-500 mr-2" />
                    <span>{Math.floor(students.length * 0.3)} questions pending</span>
                  </div>
                  {/* 🔥 NEW: Approval Activity */}
                  <div className="flex items-center text-sm">
                    <ClockIcon className="w-4 h-4 text-yellow-500 mr-2" />
                    <span>{pendingCount} courses pending approval</span>
                  </div>
                </div>
              </div>

              {/* Top Performing Course */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <TrophyIcon className="w-5 h-5 text-yellow-500 mr-2" />
                  Top Performing Course
                </h3>
                {courses.filter(c => c.approvalStatus === 'APPROVED').length > 0 ? (
                  <div>
                    <p className="font-medium text-lg">{courses[0]?.title}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <UsersIcon className="w-4 h-4 mr-1" />
                      <span>{courses[0]?.enrollments || 0} students</span>
                    </div>
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
                      <span>{courses[0]?.rating || 0} rating</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">No approved courses yet</p>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setShowAddCourse(true)}
                    className="w-full flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    <PlusCircleIcon className="w-4 h-4 mr-2" />
                    Add New Course
                  </button>
                  <button 
                    onClick={() => {
                      setFilterStatus('pending');
                      setActiveTab('courses');
                    }}
                    className="w-full flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    <ClockIcon className="w-4 h-4 mr-2" />
                    View Pending ({pendingCount})
                  </button>
                  <button 
                    onClick={() => setActiveTab("analytics")}
                    className="w-full flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <ChartBarIcon className="w-4 h-4 mr-2" />
                    View Analytics
                  </button>
                  <button 
                    onClick={() => setActiveTab("students")}
                    className="w-full flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <UsersIcon className="w-4 h-4 mr-2" />
                    View Students
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Courses Tab - Updated with Approval Status */}
        {activeTab === "courses" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">My Courses ({filteredCourses.length})</h2>
              <button
                onClick={() => setShowAddCourse(true)}
                className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <PlusCircleIcon className="w-5 h-5 mr-2" />
                Add New Course
              </button>
            </div>

            {filteredCourses.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl">
                <BookOpenIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                <p className="text-gray-500">Start by creating your first course</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all group ${
                      course.approvalStatus === 'REJECTED' ? 'border-2 border-red-200' : ''
                    }`}
                  >
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={course.image || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      {/* 🔥 NEW: Approval Status Badge */}
                      <div className="absolute top-2 left-2">
                        <ApprovalStatusBadge 
                          status={course.approvalStatus} 
                          rejectionReason={course.rejectionReason}
                          courseId={course.id}
                        />
                      </div>
                      
                      {/* Action Buttons - Conditional based on approval status */}
                      <div className="absolute top-2 right-2 flex space-x-2">
                        <button
                          onClick={() => handlePreviewCourse(course)}
                          className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                          title="Preview"
                        >
                          <EyeIcon className="w-4 h-4 text-purple-600" />
                        </button>
                        
                        {course.approvalStatus !== 'APPROVED' && (
                          <button
                            onClick={() => handleEditCourse(course)}
                            className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                            title="Edit"
                          >
                            <PencilIcon className="w-4 h-4 text-blue-600" />
                          </button>
                        )}
                        
                        {course.approvalStatus === 'REJECTED' && (
                          <button
                            onClick={() => handleResubmitCourse(course)}
                            className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                            title="Resubmit for Approval"
                          >
                            <ArrowPathRoundedSquareIcon className="w-4 h-4 text-green-600" />
                          </button>
                        )}
                        
                        {course.approvalStatus === 'APPROVED' && (
                          <button
                            onClick={() => handleDuplicateCourse(course)}
                            className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                            title="Duplicate"
                          >
                            <DocumentDuplicateIcon className="w-4 h-4 text-green-600" />
                          </button>
                        )}
                        
                        {course.approvalStatus === 'APPROVED' && (
                          <button
                            onClick={() => handleShareCourse(course)}
                            className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                            title="Share"
                          >
                            <ShareIcon className="w-4 h-4 text-blue-600" />
                          </button>
                        )}
                        
                        {(course.approvalStatus === 'PENDING' || course.approvalStatus === 'REJECTED') && (
                          <button
                            onClick={() => handleDeleteCourse(course.id)}
                            className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-100 transition-colors"
                            title="Delete"
                          >
                            <TrashIcon className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                      
                      <div className="flex items-center justify-between text-sm mb-2">
                        <div className="flex items-center text-gray-500">
                          <UsersIcon className="w-4 h-4 mr-1" />
                          {course.enrollments || 0} students
                        </div>
                        <div className="flex items-center text-yellow-500">
                          <StarIcon className="w-4 h-4 mr-1" />
                          {course.rating?.toFixed(1) || '0.0'}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {course.duration || 'Self-paced'}
                        </span>
                        <span className="font-bold text-purple-600">
                          ₹{course.price?.toLocaleString() || 0}
                        </span>
                      </div>
                      
                      <div className="mt-3 flex space-x-2">
                        <Link
                          to={`/courses/${course.id}`}
                          className={`flex-1 text-center py-2 text-white rounded-lg hover:opacity-90 transition-colors text-sm ${
                            course.approvalStatus === 'APPROVED' 
                              ? 'bg-purple-600 hover:bg-purple-700' 
                              : 'bg-gray-400 cursor-not-allowed'
                          }`}
                          onClick={(e) => {
                            if (course.approvalStatus !== 'APPROVED') {
                              e.preventDefault();
                              toast.error('Course is not yet approved for public viewing');
                            }
                          }}
                        >
                          {course.approvalStatus === 'APPROVED' ? 'View Details' : 'Not Available'}
                        </Link>
                        
                        {course.approvalStatus === 'PENDING' && (
                          <button
                            className="px-3 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm flex items-center"
                            disabled
                          >
                            <ClockIcon className="w-4 h-4 mr-1" />
                            Pending
                          </button>
                        )}
                      </div>
                      
                      {/* 🔥 NEW: Show rejection reason summary if rejected */}
                      {course.approvalStatus === 'REJECTED' && course.rejectionReason && (
                        <div className="mt-2 p-2 bg-red-50 rounded-lg">
                          <p className="text-xs text-red-700 line-clamp-2">
                            <span className="font-medium">Reason: </span>
                            {course.rejectionReason}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Students Tab - Unchanged */}
        {activeTab === "students" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Enrolled Students ({filteredStudents.length})
            </h2>
            
            {filteredStudents.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl">
                <UsersIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No students yet</h3>
                <p className="text-gray-500">Students will appear here once they enroll in your courses</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Active</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => handleViewStudent(student)}>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              src={student.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"}
                              alt={student.name}
                              className="w-10 h-10 rounded-full mr-3 object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{student.name}</p>
                              <p className="text-sm text-gray-500">{student.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-gray-900">{student.course}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  student.progress === 100 ? 'bg-green-500' : 'bg-purple-600'
                                }`}
                                style={{ width: `${student.progress || 0}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">{student.progress || 0}%</span>
                          </div>
                          {student.progress === 100 && (
                            <span className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                              Completed
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(student.joinedDate || Date.now()).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {student.lastActive ? new Date(student.lastActive).toLocaleDateString() : 'Today'}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewStudent(student);
                            }}
                            className="text-purple-600 hover:text-purple-800 transition-colors"
                            title="View Details"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        )}

        {/* Reviews Tab - Unchanged */}
        {activeTab === "reviews" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Course Reviews</h2>
            <div className="space-y-4">
              {reviews.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl">
                  <StarIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
                  <p className="text-gray-500">Reviews from students will appear here</p>
                </div>
              ) : (
                reviews.map((review, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                    {/* Review content */}
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}

        {/* Analytics Tab - Unchanged */}
        {activeTab === "analytics" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Analytics</h2>
            
            {/* Date Range Selector */}
            <div className="mb-6 flex space-x-2">
              {['week', 'month', 'year'].map((range) => (
                <button
                  key={range}
                  onClick={() => setDateRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm ${
                    dateRange === range
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Enrollment Trends */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-semibold text-gray-900 mb-4">Enrollment Trends</h3>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                  <div className="text-center">
                    <ChartBarIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-400">Chart will appear here</p>
                    <p className="text-xs text-gray-300 mt-1">Total: {totalStudents} students</p>
                  </div>
                </div>
              </div>

              {/* Revenue Overview */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-semibold text-gray-900 mb-4">Revenue Overview</h3>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                  <div className="text-center">
                    <CurrencyRupeeIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-400">Chart will appear here</p>
                    <p className="text-xs text-gray-300 mt-1">Total: ₹{totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Popular Courses */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-semibold text-gray-900 mb-4">Popular Courses</h3>
                <div className="space-y-3">
                  {courses.filter(c => c.approvalStatus === 'APPROVED').slice(0, 5).map((course, index) => (
                    <div key={course.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                          {index + 1}
                        </span>
                        <span className="text-sm font-medium text-gray-700 truncate max-w-[150px]">
                          {course.title}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600">{course.enrollments || 0} students</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="bg-white rounded-xl p-6 shadow-md">
                <h3 className="font-semibold text-gray-900 mb-4">Rating Distribution</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <span className="text-sm text-gray-600 w-12">{rating} stars</span>
                      <div className="flex-1 mx-2">
                        <div className="h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-2 bg-yellow-400 rounded-full"
                            style={{ width: `${Math.random() * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 w-12">
                        {Math.floor(Math.random() * 50)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Add/Edit Course Modal - Update to show approval info */}
      <AnimatePresence>
        {showAddCourse && (
          <AddCourseModal
            course={selectedCourse}
            onClose={() => {
              setShowAddCourse(false);
              setSelectedCourse(null);
            }}
            onSubmit={handleCourseSubmit}
            isEditing={!!selectedCourse}
            approvalStatus={selectedCourse?.approvalStatus}
          />
        )}
      </AnimatePresence>

      {/* Course Preview Modal */}
      <AnimatePresence>
        {showCoursePreview && previewCourse && (
          <CoursePreviewModal
            course={previewCourse}
            onClose={() => {
              setShowCoursePreview(false);
              setPreviewCourse(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Student Details Modal */}
      <AnimatePresence>
        {showStudentModal && selectedStudent && (
          <StudentDetailsModal
            student={selectedStudent}
            onClose={() => {
              setShowStudentModal(false);
              setSelectedStudent(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* 🔥 NEW: Rejection Reason Modal */}
      <AnimatePresence>
        {showRejectionReason && rejectionDetails && (
          <RejectionReasonModal
            rejectionDetails={rejectionDetails}
            onClose={() => {
              setShowRejectionReason(false);
              setRejectionDetails(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Add Course Modal Component - Updated with approval info
const AddCourseModal = ({ course, onClose, onSubmit, isEditing, approvalStatus }) => {
  const [formData, setFormData] = useState({
    title: course?.title || '',
    description: course?.description || '',
    longDescription: course?.longDescription || '',
    price: course?.price || '',
    category: course?.category || '',
    level: course?.level || 'Beginner',
    duration: course?.duration || '',
    image: course?.image || '',
    whatYouWillLearn: course?.whatYouWillLearn || ['', '', '', ''],
    requirements: course?.requirements || ['', '']
  });
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // 🔥 NEW: Show warning for editing approved courses
  if (isEditing && approvalStatus === 'APPROVED') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-md w-full p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <ShieldExclamationIcon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Cannot Edit Approved Course</h2>
            <p className="text-gray-600 mb-6">
              Approved courses cannot be edited directly. If you need to make changes, please contact an administrator.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit(formData);
    setSubmitting(false);
  };

  const steps = [
    { number: 1, name: 'Basic Info' },
    { number: 2, name: 'Details' },
    { number: 3, name: 'Learning' },
    { number: 4, name: 'Requirements' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {course ? 'Edit Course' : 'Add New Course'}
            </h2>
            {isEditing && approvalStatus === 'REJECTED' && (
              <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                Resubmitting Rejected Course
              </span>
            )}
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep === step.number
                      ? 'bg-purple-600 text-white'
                      : currentStep > step.number
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step.number ? '✓' : step.number}
                  </div>
                  <span className={`ml-2 text-sm ${
                    currentStep === step.number ? 'text-purple-600 font-medium' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                  {step.number < steps.length && (
                    <div className={`w-12 h-1 mx-2 ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Complete Web Development Bootcamp"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Brief description of your course"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., Web Development, Data Science"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Details */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="999"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>All Levels</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g., 10 weeks, 20 hours"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            )}

            {/* Step 3: What You'll Learn */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">What Students Will Learn</label>
                {formData.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleArrayChange('whatYouWillLearn', index, e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder={`Learning point ${index + 1}`}
                    />
                    {formData.whatYouWillLearn.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('whatYouWillLearn', index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('whatYouWillLearn')}
                  className="flex items-center text-purple-600 hover:text-purple-700"
                >
                  <PlusCircleIcon className="w-5 h-5 mr-1" />
                  Add Learning Point
                </button>
              </div>
            )}

            {/* Step 4: Requirements */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
                {formData.requirements.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleArrayChange('requirements', index, e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder={`Requirement ${index + 1}`}
                    />
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem('requirements', index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addArrayItem('requirements')}
                  className="flex items-center text-purple-600 hover:text-purple-700"
                >
                  <PlusCircleIcon className="w-5 h-5 mr-1" />
                  Add Requirement
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <div>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Previous
                  </button>
                )}
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
                  >
                    {submitting ? 'Saving...' : isEditing ? 'Update Course' : 'Submit for Approval'}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Course Preview Modal - Update to show approval status
const CoursePreviewModal = ({ course, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64">
          <img
            src={course.image || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-purple-300"
          >
            <XCircleIcon className="w-8 h-8" />
          </button>
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl font-bold mb-2">{course.title}</h2>
            <p className="text-gray-200">{course.description}</p>
          </div>
          
          {/* 🔥 NEW: Approval Status Badge in Preview */}
          <div className="absolute top-4 left-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              course.approvalStatus === 'APPROVED' ? 'bg-green-500 text-white' :
              course.approvalStatus === 'PENDING' ? 'bg-yellow-500 text-white' :
              course.approvalStatus === 'REJECTED' ? 'bg-red-500 text-white' :
              'bg-gray-500 text-white'
            }`}>
              {course.approvalStatus === 'APPROVED' && <CheckCircleIcon className="w-4 h-4 mr-1" />}
              {course.approvalStatus === 'PENDING' && <ClockIcon className="w-4 h-4 mr-1" />}
              {course.approvalStatus === 'REJECTED' && <XCircleIcon className="w-4 h-4 mr-1" />}
              {course.approvalStatus || 'Draft'}
            </span>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-purple-50 p-4 rounded-lg text-center">
              <ClockIcon className="w-6 h-6 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-semibold">{course.duration || 'Self-paced'}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg text-center">
              <UsersIcon className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Students</p>
              <p className="font-semibold">{course.enrollments || 0}</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg text-center">
              <StarIcon className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Rating</p>
              <p className="font-semibold">{course.rating?.toFixed(1) || '0.0'}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">About This Course</h3>
              <p className="text-gray-600">{course.longDescription || course.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What You'll Learn</h3>
              <ul className="grid grid-cols-2 gap-3">
                {(course.whatYouWillLearn || ['Sample learning point 1', 'Sample learning point 2']).map((item, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Requirements</h3>
              <ul className="list-disc pl-5 text-gray-600 space-y-1">
                {(course.requirements || ['No prior knowledge required', 'Basic computer skills']).map((req, i) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div>
                <span className="text-3xl font-bold text-purple-600">₹{course.price?.toLocaleString() || 0}</span>
                <span className="text-gray-500 ml-2">one-time</span>
              </div>
              <Link
                to={`/courses/${course.id}`}
                className={`px-6 py-3 text-white rounded-lg ${
                  course.approvalStatus === 'APPROVED' 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'bg-gray-400 cursor-not-allowed pointer-events-none'
                }`}
                onClick={(e) => {
                  if (course.approvalStatus !== 'APPROVED') {
                    e.preventDefault();
                  }
                }}
              >
                {course.approvalStatus === 'APPROVED' ? 'View Full Course' : 'Not Available'}
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Student Details Modal (unchanged)
const StudentDetailsModal = ({ student, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Student Details</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XCircleIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <img
              src={student.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"}
              alt={student.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h4 className="text-lg font-semibold">{student.name}</h4>
              <p className="text-gray-600">{student.email}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-700">Course Progress</span>
                <span className="text-purple-600 font-semibold">{student.progress || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: `${student.progress || 0}%` }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Enrolled Course</p>
                <p className="font-medium truncate">{student.course}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Joined Date</p>
                <p className="font-medium">{new Date(student.joinedDate || Date.now()).toLocaleDateString()}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Last Active</p>
                <p className="font-medium">{student.lastActive ? new Date(student.lastActive).toLocaleDateString() : 'Today'}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500">Status</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  student.progress === 100 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {student.progress === 100 ? 'Completed' : 'Active'}
                </span>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <Link
                to={`/courses/${student.courseId}`}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                onClick={onClose}
              >
                View Course
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// 🔥 NEW: Rejection Reason Modal
const RejectionReasonModal = ({ rejectionDetails, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Rejection Reason</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XCircleIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <XCircleIcon className="w-5 h-5 text-red-600 mr-2" />
                <span className="font-medium text-red-800">Course Rejected</span>
              </div>
              <p className="text-gray-700">{rejectionDetails.rejectionReason || 'No reason provided'}</p>
            </div>

            {rejectionDetails.rejectedAt && (
              <div className="text-sm text-gray-500">
                Rejected on: {new Date(rejectionDetails.rejectedAt).toLocaleString()}
              </div>
            )}

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-2">Next Steps:</h4>
              <ul className="list-disc pl-5 text-sm text-yellow-700 space-y-1">
                <li>Review the rejection reason above</li>
                <li>Make necessary improvements to your course</li>
                <li>Click the resubmit button to send for approval again</li>
              </ul>
            </div>

            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TrainerDashboard;