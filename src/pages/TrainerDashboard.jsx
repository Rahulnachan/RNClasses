import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../components/context/AuthContext";
import { 
  BookOpenIcon, 
  ChartBarIcon, 
  ClockIcon,
  UserGroupIcon,
  StarIcon,
  PencilIcon,
  TrashIcon,
  PlusCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
  EyeIcon,
  UsersIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  CurrencyRupeeIcon,
  TrophyIcon,
  DocumentDuplicateIcon,
  ShareIcon,
  ChartPieIcon,
  ShieldExclamationIcon,
  ArrowPathRoundedSquareIcon,
  InformationCircleIcon,
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import { 
  fetchTrainerCourses, 
  fetchTrainerStats,
  fetchStudentEnrollments,
  updateCourse,
  deleteCourse,
  createCourse,
  resubmitCourse,
  getRejectionReason
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
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [showRejectionReason, setShowRejectionReason] = useState(false);
  const [rejectionDetails, setRejectionDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showCoursePreview, setShowCoursePreview] = useState(false);
  const [previewCourse, setPreviewCourse] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadTrainerData();
  }, []);

  const loadTrainerData = async () => {
    try {
      setLoading(true);
      const coursesResponse = await fetchTrainerCourses();
      setCourses(coursesResponse.data || []);
      setPendingCount(coursesResponse.pendingCount || 0);
      setApprovedCount(coursesResponse.approvedCount || 0);
      setRejectedCount(coursesResponse.rejectedCount || 0);
      const statsResponse = await fetchTrainerStats();
      setStats(statsResponse.data || {});
      const studentsResponse = await fetchStudentEnrollments();
      setStudents(studentsResponse.data || []);
      setError(null);
    } catch (err) {
      console.error("Failed to load trainer data:", err);
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleEditCourse = (course) => {
    if (course.approvalStatus === 'APPROVED') {
      toast.error("Approved courses cannot be edited. Please contact admin.");
      return;
    }
    setSelectedCourse(course);
    setShowAddCourse(true);
  };

  const handleDeleteCourse = async (courseId) => {
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

  const handleResubmitCourse = async (course) => {
    if (!window.confirm("Are you sure you want to resubmit this course for approval?")) {
      return;
    }
    try {
      await resubmitCourse(course.id, course);
      toast.success("Course resubmitted for approval successfully!");
      loadTrainerData();
    } catch (err) {
      toast.error("Failed to resubmit course");
    }
  };

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
        await updateCourse(selectedCourse.id, courseData);
        toast.success("Course updated successfully!");
      } else {
        await createCourse(courseData);
        toast.success("Course submitted for approval successfully!");
      }
      setShowAddCourse(false);
      setSelectedCourse(null);
      loadTrainerData();
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
    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterStatus !== 'all') {
      filtered = filtered.filter(course => {
        if (filterStatus === 'pending') return course.approvalStatus === 'PENDING';
        if (filterStatus === 'approved') return course.approvalStatus === 'APPROVED';
        if (filterStatus === 'rejected') return course.approvalStatus === 'REJECTED';
        if (filterStatus === 'popular') return (course.enrollments || 0) > 10;
        return true;
      });
    }
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

  const tabs = [
    { id: "overview", label: "Overview", icon: ChartBarIcon, count: null },
    { id: "courses", label: "Courses", icon: BookOpenIcon, count: courses.length },
    { id: "students", label: "Students", icon: UsersIcon, count: filteredStudents.length },
    { id: "analytics", label: "Analytics", icon: ChartPieIcon, count: null }
  ];

  const ApprovalStatusBadge = ({ status, rejectionReason, courseId }) => {
    const configs = {
      PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: ClockIcon, label: 'Pending' },
      APPROVED: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircleIcon, label: 'Approved' },
      REJECTED: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircleIcon, label: 'Rejected' }
    };
    const config = configs[status] || { bg: 'bg-gray-100', text: 'text-gray-800', icon: InformationCircleIcon, label: status };
    const Icon = config.icon;
    return (
      <div className="flex items-center space-x-2">
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
          <Icon className="w-3 h-3 mr-1" />
          {config.label}
        </span>
        {status === 'REJECTED' && rejectionReason && (
          <button onClick={() => handleViewRejectionReason(courseId)} className="text-red-600 hover:text-red-800">
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
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm sticky top-0 z-20">
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-gray-900">Trainer Dashboard</h1>
            <span className="px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full text-xs">
              {user?.name?.split(' ')[0] || 'Trainer'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/profile')} className="p-2 text-gray-600">
              <EyeIcon className="w-5 h-5" />
            </button>
            <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded-lg">
              <XCircleIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-6 px-4">
        <h2 className="text-xl font-bold mb-1">{getGreeting()}, {user?.name?.split(' ')[0]}! 👋</h2>
        <p className="text-purple-100 text-sm">Manage your courses and track student progress.</p>
      </div>

      {/* Stats Cards - Responsive Grid */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="bg-white rounded-xl p-3 shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg"><BookOpenIcon className="w-4 h-4 text-purple-600" /></div>
              <div className="ml-2"><p className="text-xs text-gray-500">Courses</p><p className="text-lg font-bold">{courses.length}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg"><UsersIcon className="w-4 h-4 text-green-600" /></div>
              <div className="ml-2"><p className="text-xs text-gray-500">Students</p><p className="text-lg font-bold">{totalStudents}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg"><StarIcon className="w-4 h-4 text-yellow-600" /></div>
              <div className="ml-2"><p className="text-xs text-gray-500">Rating</p><p className="text-lg font-bold">{averageRating.toFixed(1)}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-md">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg"><CurrencyRupeeIcon className="w-4 h-4 text-blue-600" /></div>
              <div className="ml-2"><p className="text-xs text-gray-500">Revenue</p><p className="text-lg font-bold">₹{totalRevenue.toLocaleString()}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-md cursor-pointer" onClick={() => { setFilterStatus('pending'); setActiveTab('courses'); }}>
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg"><ClockIcon className="w-4 h-4 text-yellow-600" /></div>
              <div className="ml-2"><p className="text-xs text-gray-500">Pending</p><p className="text-lg font-bold">{pendingCount}</p></div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-md cursor-pointer" onClick={() => { setFilterStatus('rejected'); setActiveTab('courses'); }}>
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg"><XCircleIcon className="w-4 h-4 text-red-600" /></div>
              <div className="ml-2"><p className="text-xs text-gray-500">Rejected</p><p className="text-lg font-bold">{rejectedCount}</p></div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mb-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses or students..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Tabs - Horizontal Scroll on Mobile */}
      <div className="border-b border-gray-200 px-4">
        <div className="flex overflow-x-auto whitespace-nowrap scrollbar-hide -mb-px">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center py-3 px-3 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4 mr-1" />
                {tab.label}
                {tab.count !== null && tab.count > 0 && (
                  <span className="ml-1 bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded-full text-xs">{tab.count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Sort Row */}
      <div className="px-4 py-3 flex gap-2">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="popular">Popular (10+)</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
        >
          <option value="recent">Most Recent</option>
          <option value="popular">Most Popular</option>
          <option value="rating">Highest Rated</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
        <button onClick={loadTrainerData} className="p-2 border border-gray-300 rounded-lg">
          <ArrowPathIcon className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Tab Content */}
      <div className="px-4 py-4">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Recent Activity</h3>
              <div className="space-y-2">
                <div className="flex items-center text-xs"><CheckCircleIcon className="w-3 h-3 text-green-500 mr-2" /><span>{students.length} new enrollments</span></div>
                <div className="flex items-center text-xs"><StarIcon className="w-3 h-3 text-yellow-500 mr-2" /><span>{reviews.length} new reviews</span></div>
                <div className="flex items-center text-xs"><ClockIcon className="w-3 h-3 text-yellow-500 mr-2" /><span>{pendingCount} courses pending approval</span></div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm flex items-center"><TrophyIcon className="w-4 h-4 text-yellow-500 mr-2" />Top Course</h3>
              {courses.filter(c => c.approvalStatus === 'APPROVED').length > 0 ? (
                <div><p className="font-medium text-sm">{courses[0]?.title}</p><p className="text-xs text-gray-500 mt-1">{courses[0]?.enrollments || 0} students</p></div>
              ) : (<p className="text-xs text-gray-500">No approved courses yet</p>)}
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">Quick Actions</h3>
              <div className="space-y-2">
                <button onClick={() => setShowAddCourse(true)} className="w-full flex items-center justify-center px-3 py-2 bg-purple-600 text-white rounded-lg text-sm"><PlusCircleIcon className="w-4 h-4 mr-2" />Add Course</button>
                <button onClick={() => { setFilterStatus('pending'); setActiveTab('courses'); }} className="w-full flex items-center justify-center px-3 py-2 bg-yellow-500 text-white rounded-lg text-sm"><ClockIcon className="w-4 h-4 mr-2" />View Pending ({pendingCount})</button>
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">My Courses ({filteredCourses.length})</h2>
              <button onClick={() => setShowAddCourse(true)} className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg text-sm"><PlusCircleIcon className="w-4 h-4 mr-1" />Add</button>
            </div>
            {filteredCourses.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-xl"><BookOpenIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" /><p className="text-gray-500 text-sm">No courses found</p></div>
            ) : (
              <div className="space-y-4">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="relative h-32">
                      <img src={course.image || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"} alt={course.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-2 left-2"><ApprovalStatusBadge status={course.approvalStatus} rejectionReason={course.rejectionReason} courseId={course.id} /></div>
                      <div className="absolute bottom-2 left-2 right-2">
                        <h3 className="text-white font-semibold text-sm line-clamp-2">{course.title}</h3>
                      </div>
                      <div className="absolute top-2 right-2 flex space-x-1">
                        <button onClick={() => handlePreviewCourse(course)} className="p-1.5 bg-white rounded-lg shadow-md"><EyeIcon className="w-3 h-3 text-purple-600" /></button>
                        {course.approvalStatus !== 'APPROVED' && <button onClick={() => handleEditCourse(course)} className="p-1.5 bg-white rounded-lg shadow-md"><PencilIcon className="w-3 h-3 text-blue-600" /></button>}
                        {course.approvalStatus === 'REJECTED' && <button onClick={() => handleResubmitCourse(course)} className="p-1.5 bg-white rounded-lg shadow-md"><ArrowPathRoundedSquareIcon className="w-3 h-3 text-green-600" /></button>}
                        {course.approvalStatus === 'APPROVED' && <button onClick={() => handleShareCourse(course)} className="p-1.5 bg-white rounded-lg shadow-md"><ShareIcon className="w-3 h-3 text-blue-600" /></button>}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center text-xs text-gray-500"><UsersIcon className="w-3 h-3 mr-1" />{course.enrollments || 0}</div>
                        <div className="flex items-center text-xs text-yellow-500"><StarIcon className="w-3 h-3 mr-1" />{course.rating?.toFixed(1) || '0.0'}</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{course.duration || 'Self-paced'}</span>
                        <span className="font-bold text-purple-600">₹{course.price?.toLocaleString() || 0}</span>
                      </div>
                      {course.approvalStatus === 'REJECTED' && course.rejectionReason && (
                        <div className="mt-2 p-2 bg-red-50 rounded-lg"><p className="text-xs text-red-700 line-clamp-2">{course.rejectionReason}</p></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Students Tab - Responsive Table */}
        {activeTab === "students" && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-3">Students ({filteredStudents.length})</h2>
            {filteredStudents.length === 0 ? (
              <div className="text-center py-8 bg-white rounded-xl"><UsersIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" /><p className="text-gray-500 text-sm">No students yet</p></div>
            ) : (
              <div className="space-y-3">
                {filteredStudents.map((student, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-3 shadow-md flex items-center justify-between" onClick={() => handleViewStudent(student)}>
                    <div className="flex items-center flex-1">
                      <img src={student.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"} alt={student.name} className="w-10 h-10 rounded-full object-cover mr-3" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{student.name}</p>
                        <p className="text-xs text-gray-500 truncate">{student.email}</p>
                        <div className="flex items-center mt-1">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                            <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${student.progress || 0}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-600">{student.progress || 0}%</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-purple-600"><EyeIcon className="w-5 h-5" /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Enrollment Trends</h3>
              <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <div className="text-center"><ChartBarIcon className="w-8 h-8 text-gray-300 mx-auto mb-1" /><p className="text-xs text-gray-400">Total: {totalStudents} students</p></div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Revenue Overview</h3>
              <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <div className="text-center"><CurrencyRupeeIcon className="w-8 h-8 text-gray-300 mx-auto mb-1" /><p className="text-xs text-gray-400">Total: ₹{totalRevenue.toLocaleString()}</p></div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-md">
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">Popular Courses</h3>
              <div className="space-y-2">
                {courses.filter(c => c.approvalStatus === 'APPROVED').slice(0, 3).map((course, idx) => (
                  <div key={course.id} className="flex justify-between items-center">
                    <span className="text-sm truncate flex-1">{idx + 1}. {course.title}</span>
                    <span className="text-xs text-gray-500">{course.enrollments || 0} students</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Course Modal */}
      <AnimatePresence>
        {showAddCourse && (
          <AddCourseModal
            course={selectedCourse}
            onClose={() => { setShowAddCourse(false); setSelectedCourse(null); }}
            onSubmit={handleCourseSubmit}
            isEditing={!!selectedCourse}
            approvalStatus={selectedCourse?.approvalStatus}
          />
        )}
      </AnimatePresence>

      {/* Course Preview Modal */}
      <AnimatePresence>
        {showCoursePreview && previewCourse && (
          <CoursePreviewModal course={previewCourse} onClose={() => { setShowCoursePreview(false); setPreviewCourse(null); }} />
        )}
      </AnimatePresence>

      {/* Student Details Modal */}
      <AnimatePresence>
        {showStudentModal && selectedStudent && (
          <StudentDetailsModal student={selectedStudent} onClose={() => { setShowStudentModal(false); setSelectedStudent(null); }} />
        )}
      </AnimatePresence>

      {/* Rejection Reason Modal */}
      <AnimatePresence>
        {showRejectionReason && rejectionDetails && (
          <RejectionReasonModal rejectionDetails={rejectionDetails} onClose={() => { setShowRejectionReason(false); setRejectionDetails(null); }} />
        )}
      </AnimatePresence>
    </div>
  );
};

// Add Course Modal Component (Keep existing implementation)
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

  if (isEditing && approvalStatus === 'APPROVED') {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
          <div className="text-center">
            <ShieldExclamationIcon className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Cannot Edit Approved Course</h2>
            <p className="text-gray-600 mb-6">Approved courses cannot be edited directly. Please contact an administrator.</p>
            <button onClick={onClose} className="px-6 py-2 bg-purple-600 text-white rounded-lg">Close</button>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };
  const handleArrayChange = (field, index, value) => { const newArray = [...formData[field]]; newArray[index] = value; setFormData({ ...formData, [field]: newArray }); };
  const addArrayItem = (field) => { setFormData({ ...formData, [field]: [...formData[field], ''] }); };
  const removeArrayItem = (field, index) => { const newArray = formData[field].filter((_, i) => i !== index); setFormData({ ...formData, [field]: newArray }); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const submitData = { ...formData, price: Number(formData.price) };
    await onSubmit(submitData);
    setSubmitting(false);
  };

  const steps = [{ number: 1, name: 'Basic' }, { number: 2, name: 'Details' }, { number: 3, name: 'Learning' }, { number: 4, name: 'Requirements' }];

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{course ? 'Edit Course' : 'Add Course'}</h2>
            <button onClick={onClose} className="text-gray-400"><XCircleIcon className="w-6 h-6" /></button>
          </div>

          {/* Step indicators */}
          <div className="flex justify-between mb-6">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${currentStep === step.number ? 'bg-purple-600 text-white' : currentStep > step.number ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {currentStep > step.number ? '✓' : step.number}
                </div>
                <span className="text-xs mt-1 text-gray-500">{step.name}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {currentStep === 1 && (
              <div className="space-y-3">
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Course Title" className="w-full p-2 border rounded-lg" required />
                <textarea name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Description" className="w-full p-2 border rounded-lg" required />
                <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded-lg" required />
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-3">
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded-lg" required />
                <select name="level" value={formData.level} onChange={handleChange} className="w-full p-2 border rounded-lg">
                  <option>Beginner</option><option>Intermediate</option><option>Advanced</option><option>All Levels</option>
                </select>
                <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration" className="w-full p-2 border rounded-lg" required />
                <input type="url" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded-lg" />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-3">
                <label className="font-medium">What You'll Learn</label>
                {formData.whatYouWillLearn.map((item, idx) => (
                  <div key={idx} className="flex gap-2"><input type="text" value={item} onChange={(e) => handleArrayChange('whatYouWillLearn', idx, e.target.value)} className="flex-1 p-2 border rounded-lg" /><button type="button" onClick={() => removeArrayItem('whatYouWillLearn', idx)} className="p-2 text-red-500">✕</button></div>
                ))}
                <button type="button" onClick={() => addArrayItem('whatYouWillLearn')} className="text-purple-600 text-sm">+ Add Learning Point</button>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-3">
                <label className="font-medium">Requirements</label>
                {formData.requirements.map((item, idx) => (
                  <div key={idx} className="flex gap-2"><input type="text" value={item} onChange={(e) => handleArrayChange('requirements', idx, e.target.value)} className="flex-1 p-2 border rounded-lg" /><button type="button" onClick={() => removeArrayItem('requirements', idx)} className="p-2 text-red-500">✕</button></div>
                ))}
                <button type="button" onClick={() => addArrayItem('requirements')} className="text-purple-600 text-sm">+ Add Requirement</button>
              </div>
            )}

            <div className="flex justify-between mt-6 pt-4 border-t">
              {currentStep > 1 && <button type="button" onClick={() => setCurrentStep(currentStep - 1)} className="px-4 py-2 border rounded-lg">Back</button>}
              <div className="flex gap-2 ml-auto">
                <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">Cancel</button>
                {currentStep < 4 ? (
                  <button type="button" onClick={() => setCurrentStep(currentStep + 1)} className="px-4 py-2 bg-purple-600 text-white rounded-lg">Next</button>
                ) : (
                  <button type="submit" disabled={submitting} className="px-4 py-2 bg-purple-600 text-white rounded-lg">{submitting ? 'Saving...' : 'Submit'}</button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Course Preview Modal (Mobile Optimized)
const CoursePreviewModal = ({ course, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-48">
          <img src={course.image || "https://images.unsplash.com/photo-1461749280684-dccba630e2f6"} alt={course.title} className="w-full h-full object-cover" />
          <button onClick={onClose} className="absolute top-2 right-2 text-white"><XCircleIcon className="w-8 h-8" /></button>
          <div className="absolute bottom-3 left-3 text-white"><h2 className="text-lg font-bold">{course.title}</h2></div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="text-center p-2 bg-purple-50 rounded-lg"><ClockIcon className="w-4 h-4 text-purple-600 mx-auto mb-1" /><p className="text-xs">{course.duration || 'Self-paced'}</p></div>
            <div className="text-center p-2 bg-green-50 rounded-lg"><UsersIcon className="w-4 h-4 text-green-600 mx-auto mb-1" /><p className="text-xs">{course.enrollments || 0}</p></div>
            <div className="text-center p-2 bg-yellow-50 rounded-lg"><StarIcon className="w-4 h-4 text-yellow-600 mx-auto mb-1" /><p className="text-xs">{course.rating?.toFixed(1) || '0.0'}</p></div>
          </div>
          <div className="mb-4"><h3 className="font-semibold text-sm mb-1">About</h3><p className="text-xs text-gray-600">{course.description}</p></div>
          <div className="flex justify-between items-center pt-3 border-t"><span className="text-xl font-bold text-purple-600">₹{course.price?.toLocaleString() || 0}</span><button onClick={onClose} className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm">Close</button></div>
        </div>
      </div>
    </div>
  );
};

// Student Details Modal (Mobile Optimized)
const StudentDetailsModal = ({ student, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="p-5">
          <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">Student Details</h3><button onClick={onClose}><XCircleIcon className="w-6 h-6 text-gray-400" /></button></div>
          <div className="flex items-center mb-4"><img src={student.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"} alt={student.name} className="w-12 h-12 rounded-full mr-3" /><div><h4 className="font-semibold">{student.name}</h4><p className="text-xs text-gray-600">{student.email}</p></div></div>
          <div className="bg-purple-50 p-3 rounded-lg mb-3"><div className="flex justify-between mb-1"><span className="text-sm">Progress</span><span className="text-purple-600 font-semibold">{student.progress || 0}%</span></div><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-purple-600 h-2 rounded-full" style={{ width: `${student.progress || 0}%` }}></div></div></div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="bg-gray-50 p-2 rounded"><p className="text-xs text-gray-500">Course</p><p className="text-sm font-medium truncate">{student.course}</p></div>
            <div className="bg-gray-50 p-2 rounded"><p className="text-xs text-gray-500">Joined</p><p className="text-sm">{new Date(student.joinedDate || Date.now()).toLocaleDateString()}</p></div>
          </div>
          <button onClick={onClose} className="w-full py-2 bg-purple-600 text-white rounded-lg">Close</button>
        </div>
      </div>
    </div>
  );
};

// Rejection Reason Modal (Mobile Optimized)
const RejectionReasonModal = ({ rejectionDetails, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="p-5">
          <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-bold">Rejection Reason</h3><button onClick={onClose}><XCircleIcon className="w-6 h-6 text-gray-400" /></button></div>
          <div className="bg-red-50 p-3 rounded-lg mb-3"><p className="text-red-800 text-sm">{rejectionDetails.rejectionReason || 'No reason provided'}</p></div>
          <div className="bg-yellow-50 p-3 rounded-lg mb-4"><p className="text-yellow-800 text-sm font-medium mb-2">Next Steps:</p><ul className="list-disc pl-4 text-xs text-yellow-700"><li>Review the rejection reason above</li><li>Make necessary improvements</li><li>Click resubmit for approval</li></ul></div>
          <button onClick={onClose} className="w-full py-2 bg-purple-600 text-white rounded-lg">Close</button>
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;