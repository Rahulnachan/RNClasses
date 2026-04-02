import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../components/context/AuthContext";
import { 
  BookOpenIcon, 
  UsersIcon, 
  ChartBarIcon,
  PlusIcon,
  ExclamationTriangleIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  InformationCircleIcon
} from "@heroicons/react/24/outline";
import { 
  fetchAdminStats, 
  fetchAllUsers, 
  fetchAdminCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  fetchPendingCourses,
  approveCourse,
  rejectCourse,
  fetchCourseApprovalStats
} from "../api/api";
import { toast } from "react-hot-toast";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [viewingCourse, setViewingCourse] = useState(null);
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectingCourse, setRejectingCourse] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    longDescription: "",
    instructor: "",
    category: "",
    level: "Beginner",
    price: "",
    duration: "",
    image: "",
    imageUrl: "",
    requirements: []
  });

  // Course approval state
  const [pendingCourses, setPendingCourses] = useState([]);
  const [approvedCourses, setApprovedCourses] = useState([]);
  const [rejectedCourses, setRejectedCourses] = useState([]);
  const [approvalStats, setApprovalStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0
  });
  
  // Active tab state
  const [activeTab, setActiveTab] = useState('overview');
  const [courseFilter, setCourseFilter] = useState('all');

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Helper function to safely render values (prevents object rendering errors)
  const safeRender = (value, defaultValue = 'N/A') => {
    if (value === null || value === undefined) return defaultValue;
    if (typeof value === 'object') {
      console.warn('Attempted to render object:', value);
      return defaultValue;
    }
    return value;
  };

  // Helper function to safely get nested object properties
  const safeGet = (obj, path, defaultValue = 'N/A') => {
    if (!obj || typeof obj !== 'object') return defaultValue;
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
      if (result === null || result === undefined || typeof result !== 'object') {
        return defaultValue;
      }
      result = result[key];
    }
    return result !== null && result !== undefined ? result : defaultValue;
  };

  useEffect(() => {
    // Check if user is admin
    if (user?.role !== 'ADMIN') {
      setError("Access denied. Admin privileges required.");
      setTimeout(() => navigate("/"), 3000);
      return;
    }
    loadAdminData();
    
    // Load course approval data
    loadCourseApprovalData();
  }, [user]);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch courses using admin endpoint
      try {
        const coursesResponse = await fetchAdminCourses();
        console.log("Courses response:", coursesResponse);
        setCourses(coursesResponse.data || coursesResponse || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
      
      // Fetch admin stats and users
      try {
        const [statsData, usersData] = await Promise.all([
          fetchAdminStats().catch(err => {
            console.warn("Stats not available:", err);
            return null;
          }),
          fetchAllUsers().catch(err => {
            console.warn("Users not available:", err);
            return null;
          })
        ]);
        
        setStats(statsData?.data || statsData);
        setUsers(usersData?.data || usersData || []);
      } catch (adminErr) {
        console.warn("Admin endpoints not accessible:", adminErr);
      }
      
    } catch (err) {
      console.error("Error loading admin data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const loadCourseApprovalData = async () => {
    try {
      const [pendingRes, statsRes] = await Promise.all([
        fetchPendingCourses(),
        fetchCourseApprovalStats()
      ]);
      
      setPendingCourses(pendingRes.data || []);
      setApprovalStats(statsRes.data || { pending: 0, approved: 0, rejected: 0 });
      
      // Filter courses by status
      const allCourses = await fetchAdminCourses();
      const coursesData = allCourses.data || allCourses || [];
      setApprovedCourses(coursesData.filter(c => c.approvalStatus === 'APPROVED'));
      setRejectedCourses(coursesData.filter(c => c.approvalStatus === 'REJECTED'));
      
    } catch (error) {
      console.error("Error loading course approval data:", error);
    }
  };

  // ========== COURSE APPROVAL HANDLERS ==========

  const handleApproveCourse = async (courseId) => {
    try {
      await approveCourse(courseId);
      toast.success('✅ Course approved successfully!');
      loadCourseApprovalData();
      loadAdminData();
    } catch (error) {
      toast.error('Failed to approve course');
    }
  };

  const handleRejectCourse = async () => {
    if (!rejectionReason.trim()) {
      toast.error('Please provide a rejection reason');
      return;
    }
    
    try {
      await rejectCourse(rejectingCourse.id, { reason: rejectionReason });
      toast.success('Course rejected');
      setShowRejectModal(false);
      setRejectingCourse(null);
      setRejectionReason("");
      loadCourseApprovalData();
      loadAdminData();
    } catch (error) {
      toast.error('Failed to reject course');
    }
  };

  const openRejectModal = (course) => {
    setRejectingCourse(course);
    setShowRejectModal(true);
  };

  const viewCourseDetails = (course) => {
    setViewingCourse(course);
    setShowCourseDetails(true);
  };

  // ========== COURSE CRUD HANDLERS ==========

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({
      ...prev,
      [name]: value,
      // Also set imageUrl when image changes
      ...(name === 'image' ? { imageUrl: value } : {})
    }));
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      // Prepare course data for API
      const courseData = {
        title: newCourse.title,
        description: newCourse.description,
        longDescription: newCourse.longDescription || newCourse.description,
        category: newCourse.category,
        level: newCourse.level,
        price: parseFloat(newCourse.price) || 0,
        duration: newCourse.duration,
        image: newCourse.image || newCourse.imageUrl,
        imageUrl: newCourse.image || newCourse.imageUrl,
        instructor: newCourse.instructor,
        requirements: Array.isArray(newCourse.requirements) 
          ? newCourse.requirements.filter(r => r && r.trim() !== '') 
          : []
      };
      
      const response = await addCourse(courseData);
      if (response.success) {
        toast.success("✅ Course added successfully!");
        setShowAddCourse(false);
        resetForm();
        loadAdminData();
        loadCourseApprovalData();
      } else {
        toast.error(response.message || "Failed to add course");
      }
    } catch (error) {
      console.error("Add course error:", error);
      toast.error("Error adding course: " + (error.response?.data?.error || error.message));
    }
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setNewCourse({
      title: course.title || "",
      description: course.description || "",
      longDescription: course.longDescription || "",
      instructor: course.instructor || course.instructorName || "",
      category: course.category || "",
      level: course.level || "Beginner",
      price: course.price?.toString() || "",
      duration: course.duration || "",
      image: course.image || course.imageUrl || "",
      imageUrl: course.imageUrl || course.image || "",
      requirements: course.requirements || []
    });
    setShowAddCourse(true);
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      const courseData = {
        title: newCourse.title,
        description: newCourse.description,
        longDescription: newCourse.longDescription || newCourse.description,
        category: newCourse.category,
        level: newCourse.level,
        price: parseFloat(newCourse.price) || 0,
        duration: newCourse.duration,
        image: newCourse.image || newCourse.imageUrl,
        imageUrl: newCourse.image || newCourse.imageUrl,
        instructor: newCourse.instructor,
        requirements: Array.isArray(newCourse.requirements)
          ? newCourse.requirements.filter(r => r && r.trim() !== '')
          : []
      };
      
      const response = await updateCourse(editingCourse.id, courseData);
      if (response.success) {
        toast.success("✅ Course updated successfully!");
        setShowAddCourse(false);
        setEditingCourse(null);
        resetForm();
        loadAdminData();
        loadCourseApprovalData();
      } else {
        toast.error(response.message || "Failed to update course");
      }
    } catch (error) {
      console.error("Update course error:", error);
      toast.error("Error updating course: " + (error.response?.data?.error || error.message));
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        const response = await deleteCourse(courseId);
        if (response.success) {
          toast.success("✅ Course deleted successfully!");
          loadAdminData();
          loadCourseApprovalData();
        }
      } catch (error) {
        toast.error("Error deleting course: " + (error.response?.data?.error || error.message));
      }
    }
  };

  const resetForm = () => {
    setNewCourse({
      title: "",
      description: "",
      longDescription: "",
      instructor: "",
      category: "",
      level: "Beginner",
      price: "",
      duration: "",
      image: "",
      imageUrl: "",
      requirements: []
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const cancelForm = () => {
    setShowAddCourse(false);
    setEditingCourse(null);
    resetForm();
  };

  // Get filtered courses based on courseFilter
  const getFilteredCourses = () => {
    switch(courseFilter) {
      case 'pending':
        return pendingCourses;
      case 'approved':
        return approvedCourses;
      case 'rejected':
        return rejectedCourses;
      default:
        return courses;
    }
  };

  const filteredCourses = getFilteredCourses();

  // Approval Status Badge Component
  const ApprovalStatusBadge = ({ status, rejectionReason }) => {
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
            label: status || 'Draft'
          };
      }
    };

    const config = getStatusConfig();
    const Icon = config.icon;

    return (
      <div className="flex items-center">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
          <Icon className="w-3 h-3 mr-1" />
          {config.label}
        </span>
        {status === 'REJECTED' && rejectionReason && (
          <span className="ml-2 group relative">
            <InformationCircleIcon className="w-4 h-4 text-gray-400 cursor-help" />
            <span className="hidden group-hover:block absolute left-0 bottom-full mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-50">
              {safeRender(rejectionReason)}
            </span>
          </span>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <ExclamationTriangleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="mt-2 text-purple-100">Welcome, {user?.name || 'Admin'}!</p>
              {user?.email === 'nachanr99@gmail.com' && (
                <p className="text-xs bg-purple-800 inline-block px-2 py-1 rounded mt-2">
                  👑 Super Admin
                </p>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <BookOpenIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total Courses</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalCourses || courses.length || 0}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <UsersIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalUsers || users.length || 0}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <ChartBarIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total Enrollments</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalEnrollments || 0}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => {
                setActiveTab('course-approval');
                setCourseFilter('pending');
              }}
            >
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Pending Approval</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {approvalStats.pending || 0}
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <ChartBarIcon className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{stats.totalRevenue || 0}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'courses'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Course Management
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                activeTab === 'users'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              User Management
            </button>
            <button
              onClick={() => setActiveTab('course-approval')}
              className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex items-center ${
                activeTab === 'course-approval'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <ClockIcon className="w-4 h-4 mr-2" />
              Course Approval
              {approvalStats.pending > 0 && (
                <span className="ml-2 bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs">
                  {approvalStats.pending}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setActiveTab('course-approval');
                    setCourseFilter('pending');
                  }}
                  className="w-full flex items-center justify-between p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  <span className="flex items-center">
                    <ClockIcon className="w-5 h-5 text-yellow-600 mr-2" />
                    Review Pending Courses
                  </span>
                  <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full text-xs">
                    {approvalStats.pending}
                  </span>
                </button>
                
                <button
                  onClick={() => setShowAddCourse(true)}
                  className="w-full flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <PlusIcon className="w-5 h-5 text-purple-600 mr-2" />
                  Add New Course
                </button>
                
                <button
                  onClick={() => setActiveTab('users')}
                  className="w-full flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <UsersIcon className="w-5 h-5 text-blue-600 mr-2" />
                  Manage Users
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pending Course Approvals</span>
                  <span className="font-semibold">{approvalStats.pending}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">New Users This Week</span>
                  <span className="font-semibold">{Math.floor(users.length * 0.1)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">New Enrollments</span>
                  <span className="font-semibold">{stats?.totalEnrollments || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Management Tab */}
      {activeTab === 'courses' && (
        <>
          {/* Action Buttons */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => {
                setShowAddCourse(true);
                setEditingCourse(null);
                resetForm();
              }}
              className="mb-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Add New Course
            </button>
          </div>

          {/* Add/Edit Course Form */}
          <AnimatePresence>
            {(showAddCourse || editingCourse) && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
              >
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4">
                    {editingCourse ? "Edit Course" : "Add New Course"}
                  </h2>
                  <form onSubmit={editingCourse ? handleUpdateCourse : handleAddCourse}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Title *
                        </label>
                        <input
                          type="text"
                          name="title"
                          value={newCourse.title}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Course title"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Instructor *
                        </label>
                        <input
                          type="text"
                          name="instructor"
                          value={newCourse.instructor}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Instructor name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Category *
                        </label>
                        <select
                          name="category"
                          value={newCourse.category}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="">Select category</option>
                          <option value="Development">Development</option>
                          <option value="Data Science">Data Science</option>
                          <option value="Design">Design</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Business">Business</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Level
                        </label>
                        <select
                          name="level"
                          value={newCourse.level}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price (₹) *
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={newCourse.price}
                          onChange={handleInputChange}
                          required
                          min="0"
                          step="0.01"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Duration *
                        </label>
                        <input
                          type="text"
                          name="duration"
                          value={newCourse.duration}
                          onChange={handleInputChange}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="e.g., 12 weeks"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description *
                        </label>
                        <textarea
                          name="description"
                          value={newCourse.description}
                          onChange={handleInputChange}
                          required
                          rows="3"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Course description"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Image URL
                        </label>
                        <input
                          type="url"
                          name="image"
                          value={newCourse.image}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                    </div>
                    <div className="mt-6 flex space-x-3">
                      <button
                        type="submit"
                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center"
                      >
                        <CheckIcon className="w-5 h-5 mr-2" />
                        {editingCourse ? "Update Course" : "Save Course"}
                      </button>
                      <button
                        type="button"
                        onClick={cancelForm}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                      >
                        <XMarkIcon className="w-5 h-5 mr-2" />
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Courses List */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <h2 className="text-2xl font-bold mb-4">Manage Courses</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Instructor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Students
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCourses.map((course) => {
                    // Safely get instructor name
                    let instructorName = 'N/A';
                    if (course.instructor && typeof course.instructor === 'string') {
                      instructorName = course.instructor;
                    } else if (course.instructorName && typeof course.instructorName === 'string') {
                      instructorName = course.instructorName;
                    } else if (course.trainer && typeof course.trainer === 'object') {
                      instructorName = course.trainer.name || 'N/A';
                    }

                    return (
                      <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {safeRender(course.title)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {instructorName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                            {safeRender(course.category)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          ₹{course.price?.toLocaleString() || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {course.students || course.studentsCount || course.enrollments || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <ApprovalStatusBadge 
                            status={course.approvalStatus} 
                            rejectionReason={course.rejectionReason}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => viewCourseDetails(course)}
                              className="text-purple-600 hover:text-purple-800 transition-colors"
                              title="View Details"
                            >
                              <EyeIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleEditCourse(course)}
                              className="text-blue-600 hover:text-blue-800 transition-colors"
                              title="Edit"
                            >
                              <PencilIcon className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(course.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
                              title="Delete"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredCourses.length === 0 && (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                        No courses found. Click "Add New Course" to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* User Management Tab */}
      {activeTab === 'users' && users.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {safeRender(user.name)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                      {safeRender(user.email)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.role === 'ADMIN' 
                          ? 'bg-purple-100 text-purple-700' 
                          : user.role === 'TRAINER'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {safeRender(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Course Approval Tab */}
      {activeTab === 'course-approval' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {/* Filter Tabs */}
          <div className="mb-6 flex space-x-2">
            <button
              onClick={() => setCourseFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium text-sm ${
                courseFilter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Courses ({courses.length})
            </button>
            <button
              onClick={() => setCourseFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center ${
                courseFilter === 'pending'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ClockIcon className="w-4 h-4 mr-1" />
              Pending ({approvalStats.pending})
            </button>
            <button
              onClick={() => setCourseFilter('approved')}
              className={`px-4 py-2 rounded-lg font-medium text-sm ${
                courseFilter === 'approved'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Approved ({approvalStats.approved})
            </button>
            <button
              onClick={() => setCourseFilter('rejected')}
              className={`px-4 py-2 rounded-lg font-medium text-sm ${
                courseFilter === 'rejected'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Rejected ({approvalStats.rejected})
            </button>
          </div>

          {/* Pending Courses List */}
          {courseFilter === 'pending' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">Pending Course Approvals</h2>
              {pendingCourses.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center">
                  <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">All Caught Up!</h3>
                  <p className="text-gray-500">No courses pending approval.</p>
                </div>
              ) : (
                pendingCourses.map((course) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{safeRender(course.title)}</h3>
                          <span className="ml-3 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                            Pending Review
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-2">{safeRender(course.description)}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500">Category</p>
                            <p className="text-sm font-medium">{safeRender(course.category)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Level</p>
                            <p className="text-sm font-medium">{safeRender(course.level)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Duration</p>
                            <p className="text-sm font-medium">{safeRender(course.duration)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Price</p>
                            <p className="text-sm font-medium">₹{course.price}</p>
                          </div>
                        </div>

                        {/* Trainer Info - Safely render nested objects */}
                        {course.trainer && (
                          <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <UserGroupIcon className="w-4 h-4 text-purple-600" />
                            </div>
                            <div className="ml-3">
                              <p className="text-xs text-gray-500">Submitted by</p>
                              <p className="text-sm font-medium">
                                {safeGet(course, 'trainer.name')}
                              </p>
                              <p className="text-xs text-gray-500">
                                {safeGet(course, 'trainer.email')}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="ml-6 flex flex-col space-y-2">
                        <button
                          onClick={() => handleApproveCourse(course.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                        >
                          <CheckIcon className="w-4 h-4 mr-2" />
                          Approve
                        </button>
                        <button
                          onClick={() => openRejectModal(course)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center"
                        >
                          <XMarkIcon className="w-4 h-4 mr-2" />
                          Reject
                        </button>
                        <button
                          onClick={() => viewCourseDetails(course)}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                        >
                          <EyeIcon className="w-4 h-4 mr-2" />
                          Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* Approved Courses List */}
          {courseFilter === 'approved' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Approved Courses</h2>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Instructor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Students</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedCourses.map((course) => (
                      <tr key={course.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{safeRender(course.title)}</td>
                        <td className="px-6 py-4">
                          {safeRender(course.instructorName) || 
                           safeRender(course.instructor) || 
                           safeGet(course, 'trainer.name') || 'N/A'}
                        </td>
                        <td className="px-6 py-4">{safeRender(course.category)}</td>
                        <td className="px-6 py-4">{course.studentsCount || 0}</td>
                        <td className="px-6 py-4">
                          <ApprovalStatusBadge status="APPROVED" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Rejected Courses List */}
          {courseFilter === 'rejected' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Rejected Courses</h2>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Instructor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Rejection Reason</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rejectedCourses.map((course) => (
                      <tr key={course.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">{safeRender(course.title)}</td>
                        <td className="px-6 py-4">
                          {safeRender(course.instructorName) || 
                           safeRender(course.instructor) || 
                           safeGet(course, 'trainer.name') || 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                          {safeRender(course.rejectionReason) || 'No reason provided'}
                        </td>
                        <td className="px-6 py-4">
                          <ApprovalStatusBadge status="REJECTED" rejectionReason={course.rejectionReason} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Course Details Modal */}
      <AnimatePresence>
        {showCourseDetails && viewingCourse && (
          <CourseDetailsModal
            course={viewingCourse}
            onClose={() => {
              setShowCourseDetails(false);
              setViewingCourse(null);
            }}
            onApprove={handleApproveCourse}
            onReject={openRejectModal}
            safeGet={safeGet}
            safeRender={safeRender}
          />
        )}
      </AnimatePresence>

      {/* Reject Course Modal */}
      <AnimatePresence>
        {showRejectModal && rejectingCourse && (
          <RejectCourseModal
            course={rejectingCourse}
            reason={rejectionReason}
            setReason={setRejectionReason}
            onConfirm={handleRejectCourse}
            onClose={() => {
              setShowRejectModal(false);
              setRejectingCourse(null);
              setRejectionReason("");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Course Details Modal Component
const CourseDetailsModal = ({ course, onClose, onApprove, onReject, safeGet, safeRender }) => {
  if (!course) return null;
  
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
        <div className="relative">
          {/* Image */}
          <div className="h-48 overflow-hidden">
            <img
              src={course.image || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"}
              alt={safeRender(course.title)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-purple-300"
            >
              <XMarkIcon className="w-8 h-8" />
            </button>
            
            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                course.approvalStatus === 'PENDING' ? 'bg-yellow-500 text-white' :
                course.approvalStatus === 'APPROVED' ? 'bg-green-500 text-white' :
                course.approvalStatus === 'REJECTED' ? 'bg-red-500 text-white' :
                'bg-gray-500 text-white'
              }`}>
                {course.approvalStatus || 'Draft'}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{safeRender(course.title)}</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="font-medium">{safeRender(course.category)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Level</p>
                <p className="font-medium">{safeRender(course.level)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Duration</p>
                <p className="font-medium">{safeRender(course.duration)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Price</p>
                <p className="font-medium">₹{course.price}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{course.longDescription || course.description || 'No description'}</p>
            </div>

            {course.requirements && course.requirements.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Requirements</h3>
                <ul className="list-disc pl-5 text-gray-600">
                  {course.requirements.map((req, i) => (
                    <li key={i}>{safeRender(req)}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trainer Info - Safely render nested objects */}
            {course.trainer && (
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Submitted by</h3>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <UserGroupIcon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{safeGet(course, 'trainer.name')}</p>
                    <p className="text-sm text-gray-500">{safeGet(course, 'trainer.email')}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Rejection Reason */}
            {course.approvalStatus === 'REJECTED' && course.rejectionReason && (
              <div className="mb-6 p-4 bg-red-50 rounded-lg">
                <h3 className="font-semibold text-red-800 mb-2">Rejection Reason</h3>
                <p className="text-red-700">{safeRender(course.rejectionReason)}</p>
              </div>
            )}

            {/* Actions */}
            {course.approvalStatus === 'PENDING' && (
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    onApprove(course.id);
                    onClose();
                  }}
                  className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <CheckIcon className="w-5 h-5 mr-2" />
                  Approve Course
                </button>
                <button
                  onClick={() => {
                    onReject(course);
                    onClose();
                  }}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                >
                  <XMarkIcon className="w-5 h-5 mr-2" />
                  Reject Course
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Reject Course Modal
const RejectCourseModal = ({ course, reason, setReason, onConfirm, onClose }) => {
  if (!course) return null;
  
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
        <h2 className="text-xl font-bold text-gray-900 mb-4">Reject Course</h2>
        <p className="text-gray-600 mb-4">
          Are you sure you want to reject "{course.title}"? Please provide a reason for the trainer.
        </p>
        
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter rejection reason..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent mb-4"
          rows="4"
          autoFocus
        />
        
        <div className="flex space-x-3">
          <button
            onClick={onConfirm}
            disabled={!reason.trim()}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            Reject Course
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminDashboard;