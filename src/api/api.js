import API from "./axiosInstance";

// =======================
// AUTH ENDPOINTS
// =======================

// Register - POST /api/auth/register
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

// Login - POST /api/auth/login
export const loginUser = async (credentials) => {
  try {
    const response = await API.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// 🔥 NEW: Google OAuth Callback Handler
export const handleGoogleCallback = async (code) => {
  try {
    const response = await API.get(`/auth/oauth2/callback?code=${code}`);
    return response.data;
  } catch (error) {
    console.error("Google OAuth callback error:", error);
    throw error;
  }
};

// Forgot Password - POST /api/auth/forgot-password
export const forgotPassword = async (identifier, method) => {
  try {
    const response = await API.post("/auth/forgot-password", { identifier, method });
    return response.data;
  } catch (error) {
    console.error("Forgot password error:", error);
    throw error;
  }
};

// Reset Password - POST /api/auth/reset-password
export const resetPassword = async (identifier, otp, newPassword) => {
  try {
    const response = await API.post("/auth/reset-password", { identifier, otp, newPassword });
    return response.data;
  } catch (error) {
    console.error("Reset password error:", error);
    throw error;
  }
};

// =======================
// PUBLIC COURSES ENDPOINTS (No Auth Required)
// =======================

// Get all courses - GET /api/courses (public - anyone can view)
export const fetchCourses = async () => {
  try {
    const response = await API.get("/courses");
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

// Get course by ID - GET /api/courses/{id} (public)
export const fetchCourseById = async (id) => {
  try {
    const response = await API.get(`/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
};

// =======================
// ADMIN COURSES ENDPOINTS (Admin Only - Requires Auth)
// =======================

// Add new course - POST /api/admin/courses (Admin only)
export const addCourse = async (courseData) => {
  try {
    const response = await API.post("/admin/courses", courseData);
    return response.data;
  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
};

// Update course - PUT /api/admin/courses/{id} (Admin only)
export const updateCourse = async (id, courseData) => {
  try {
    const response = await API.put(`/admin/courses/${id}`, courseData);
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

// Delete course - DELETE /api/admin/courses/{id} (Admin only)
export const deleteCourse = async (id) => {
  try {
    const response = await API.delete(`/admin/courses/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

// Get all courses for admin view - GET /api/admin/courses (Admin only)
export const fetchAdminCourses = async () => {
  try {
    const response = await API.get("/admin/courses");
    return response.data;
  } catch (error) {
    console.error("Error fetching admin courses:", error);
    throw error;
  }
};

// =======================
// COURSE APPROVAL ENDPOINTS
// =======================

// Get pending courses for approval - GET /api/admin/courses/pending
export const fetchPendingCourses = async () => {
  try {
    const response = await API.get("/admin/courses/pending");
    return response.data;
  } catch (error) {
    console.error("Error fetching pending courses:", error);
    return { data: [] };
  }
};

// Approve a course - PUT /api/admin/courses/{courseId}/approve
export const approveCourse = async (courseId) => {
  try {
    const response = await API.put(`/admin/courses/${courseId}/approve`);
    return response.data;
  } catch (error) {
    console.error("Error approving course:", error);
    throw error;
  }
};

// Reject a course with reason - PUT /api/admin/courses/{courseId}/reject
export const rejectCourse = async (courseId, { reason }) => {
  try {
    const response = await API.put(`/admin/courses/${courseId}/reject`, { reason });
    return response.data;
  } catch (error) {
    console.error("Error rejecting course:", error);
    throw error;
  }
};

// Get course approval statistics - GET /api/admin/courses/approval-stats
export const fetchCourseApprovalStats = async () => {
  try {
    const response = await API.get("/admin/courses/approval-stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching approval stats:", error);
    return { data: { pending: 0, approved: 0, rejected: 0 } };
  }
};

// Get single pending course details - GET /api/admin/courses/pending/{courseId}
export const fetchPendingCourseDetails = async (courseId) => {
  try {
    const response = await API.get(`/admin/courses/pending/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching pending course details:", error);
    throw error;
  }
};

// Bulk approve multiple courses - PUT /api/admin/courses/bulk-approve
export const bulkApproveCourses = async (courseIds) => {
  try {
    const response = await API.put("/admin/courses/bulk-approve", courseIds);
    return response.data;
  } catch (error) {
    console.error("Error bulk approving courses:", error);
    throw error;
  }
};

// =======================
// ADMIN USER MANAGEMENT
// =======================

// Get all users (Admin only)
export const fetchAllUsers = async () => {
  try {
    const response = await API.get("/admin/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Get admin dashboard stats
export const fetchAdminStats = async () => {
  try {
    const response = await API.get("/admin/stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    throw error;
  }
};

// Update user role (Admin only)
export const updateUserRole = async (userId, role) => {
  try {
    const response = await API.put(`/admin/users/${userId}/role`, { role });
    return response.data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};

// Delete user (Admin only)
export const deleteUser = async (userId) => {
  try {
    const response = await API.delete(`/admin/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// =======================
// TRAINER ENDPOINTS
// =======================

// Get trainer's courses
export const fetchTrainerCourses = async () => {
  try {
    const response = await API.get("/trainer/courses");
    return response.data;
  } catch (error) {
    console.error("Error fetching trainer courses:", error);
    return { data: [], pendingCount: 0, approvedCount: 0, rejectedCount: 0 };
  }
};

// Get trainer stats
export const fetchTrainerStats = async () => {
  try {
    const response = await API.get("/trainer/stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching trainer stats:", error);
    return { data: {} };
  }
};

// Get students enrolled in trainer's courses
export const fetchStudentEnrollments = async () => {
  try {
    const response = await API.get("/trainer/students");
    return response.data;
  } catch (error) {
    console.error("Error fetching student enrollments:", error);
    return { data: [] };
  }
};

// Create a new course (Trainer)
export const createCourse = async (courseData) => {
  try {
    const response = await API.post("/trainer/courses", courseData);
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

// Update a course (Trainer)
export const updateTrainerCourse = async (courseId, courseData) => {
  try {
    const response = await API.put(`/trainer/courses/${courseId}`, courseData);
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

// Delete a course (Trainer)
export const deleteTrainerCourse = async (courseId) => {
  try {
    const response = await API.delete(`/trainer/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

// Resubmit rejected course
export const resubmitCourse = async (courseId, courseData) => {
  try {
    const response = await API.put(`/trainer/courses/${courseId}/resubmit`, courseData);
    return response.data;
  } catch (error) {
    console.error("Error resubmitting course:", error);
    throw error;
  }
};

// Get rejection reason
export const getRejectionReason = async (courseId) => {
  try {
    const response = await API.get(`/trainer/courses/${courseId}/rejection-reason`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rejection reason:", error);
    return { isRejected: false, rejectionReason: null, rejectedAt: null };
  }
};

// =======================
// ENROLLMENT ENDPOINTS
// =======================

// Enroll in course - POST /api/enrollments/{courseId}
export const enrollCourse = async (courseId) => {
  try {
    const response = await API.post(`/enrollments/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error enrolling in course:", error);
    throw error;
  }
};

// Get my courses with details - GET /api/enrollments/my-courses
export const fetchMyCourses = async () => {
  try {
    const response = await API.get("/enrollments/my-courses");
    return response.data;
  } catch (error) {
    console.error("Error fetching my courses:", error);
    throw error;
  }
};

// Alias for fetchMyCourses
export const fetchUserEnrollments = fetchMyCourses;

// Get enrollment progress - GET /api/enrollments/progress/{courseId}
export const fetchProgress = async (courseId) => {
  try {
    const response = await API.get(`/enrollments/progress/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching progress:", error);
    throw error;
  }
};

// Update progress - PUT /api/enrollments/progress/{courseId}
export const updateProgress = async (courseId, progress) => {
  try {
    const response = await API.put(`/enrollments/progress/${courseId}`, { progress });
    return response.data;
  } catch (error) {
    console.error("Error updating progress:", error);
    throw error;
  }
};

// Get enrollment stats - GET /api/enrollments/stats
export const fetchEnrollmentStats = async () => {
  try {
    const response = await API.get("/enrollments/stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching stats:", error);
    throw error;
  }
};

// Cancel enrollment - DELETE /api/enrollments/{courseId}
export const cancelEnrollment = async (courseId) => {
  try {
    const response = await API.delete(`/enrollments/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error canceling enrollment:", error);
    throw error;
  }
};

// =======================
// USER PROFILE ENDPOINTS
// =======================

// Get user profile - GET /api/user/profile
export const fetchUserProfile = async () => {
  try {
    const response = await API.get("/user/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

// Update user profile - PUT /api/user/profile
export const updateUserProfile = async (profileData) => {
  try {
    const response = await API.put("/user/profile", profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

// =======================
// ENHANCED STUDENT DASHBOARD ENDPOINTS
// =======================

// Fetch recommended courses
export const fetchRecommendedCourses = async () => {
  try {
    const response = await API.get("/courses/recommended");
    return response.data;
  } catch (error) {
    console.error("Error fetching recommended courses:", error);
    // Return mock data for development
    return { 
      data: [
        { id: 5, title: "Advanced React Patterns", instructor: "Sarah Johnson", rating: 4.9, students: 1234, image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee" },
        { id: 6, title: "Python for Data Science", instructor: "Michael Chen", rating: 4.8, students: 2345, image: "https://images.unsplash.com/photo-1526379095098-400a3a001af0" },
        { id: 7, title: "UI/UX Advanced Workshop", instructor: "Emily Rodriguez", rating: 4.9, students: 987, image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c" }
      ] 
    };
  }
};

// Fetch achievements
export const fetchAchievements = async () => {
  try {
    const response = await API.get("/user/achievements");
    return response.data;
  } catch (error) {
    console.error("Error fetching achievements:", error);
    // Return mock data for development
    return {
      data: [
        { id: 1, title: "Quick Learner", description: "Completed first course", icon: "RocketLaunchIcon", progress: 100, unlocked: true },
        { id: 2, title: "Knowledge Seeker", description: "Enrolled in 5 courses", icon: "BookOpenIcon", progress: 60, unlocked: false },
        { id: 3, title: "Perfect Score", description: "Scored 100% in a quiz", icon: "StarIcon", progress: 0, unlocked: false },
        { id: 4, title: "Study Streak", description: "7 days consecutive learning", icon: "FireIcon", progress: 43, unlocked: false }
      ]
    };
  }
};

// Fetch study groups
export const fetchStudyGroups = async () => {
  try {
    const response = await API.get("/study-groups");
    return response.data;
  } catch (error) {
    console.error("Error fetching study groups:", error);
    return { data: [] };
  }
};

// Get learning path
export const getLearningPath = async () => {
  try {
    const response = await API.get("/user/learning-path");
    return response.data;
  } catch (error) {
    console.error("Error fetching learning path:", error);
    return { data: null };
  }
};

// Save bookmark
export const saveBookmark = async (courseId) => {
  try {
    const response = await API.post(`/user/bookmarks/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error saving bookmark:", error);
    throw error;
  }
};

// Get bookmarks
export const fetchBookmarks = async () => {
  try {
    const response = await API.get("/user/bookmarks");
    return response.data;
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return { data: [] };
  }
};

// Track study time
export const trackStudyTime = async (courseId, minutes) => {
  try {
    const response = await API.post("/user/study-time", { courseId, minutes });
    return response.data;
  } catch (error) {
    console.error("Error tracking study time:", error);
    throw error;
  }
};

// Get weekly activity
export const fetchWeeklyActivity = async () => {
  try {
    const response = await API.get("/user/weekly-activity");
    return response.data;
  } catch (error) {
    console.error("Error fetching weekly activity:", error);
    return { data: [2, 4, 3, 5, 6, 4, 3] }; // Mock data
  }
};

// =======================
// ENHANCED TRAINER DASHBOARD ENDPOINTS
// =======================

// Get trainer analytics
export const fetchTrainerAnalytics = async () => {
  try {
    const response = await API.get("/trainer/analytics");
    return response.data;
  } catch (error) {
    console.error("Error fetching trainer analytics:", error);
    return { data: {} };
  }
};

// Get course performance
export const fetchCoursePerformance = async (courseId) => {
  try {
    const response = await API.get(`/trainer/courses/${courseId}/performance`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course performance:", error);
    return { data: {} };
  }
};

// Duplicate course
export const duplicateCourse = async (courseId) => {
  try {
    const response = await API.post(`/trainer/courses/${courseId}/duplicate`);
    return response.data;
  } catch (error) {
    console.error("Error duplicating course:", error);
    throw error;
  }
};

// Get student details
export const fetchStudentDetails = async (studentId) => {
  try {
    const response = await API.get(`/trainer/students/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching student details:", error);
    throw error;
  }
};

// Send message to student
export const sendStudentMessage = async (studentId, message) => {
  try {
    const response = await API.post(`/trainer/students/${studentId}/message`, { message });
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

// =======================
// OTP VERIFICATION ENDPOINTS
// =======================

// Send OTP to email - POST /api/otp/send-email
export const sendEmailOTP = async (email) => {
  try {
    const response = await API.post("/otp/send-email", { email });
    return response.data;
  } catch (error) {
    console.error("Error sending email OTP:", error);
    throw error;
  }
};

// Send OTP to mobile - POST /api/otp/send-mobile
export const sendMobileOTP = async (phone) => {
  try {
    const response = await API.post("/otp/send-mobile", { phone });
    return response.data;
  } catch (error) {
    console.error("Error sending mobile OTP:", error);
    throw error;
  }
};

// Verify OTP - POST /api/otp/verify
export const verifyOTP = async (identifier, otp, type) => {
  try {
    const response = await API.post("/otp/verify", { identifier, otp, type });
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

// =======================
// PAYMENT ENDPOINTS
// =======================

// Create Razorpay order - POST /api/payment/create-order
export const createPaymentOrder = async (amount, courseId, currency = "INR") => {
  try {
    const response = await API.post("/payment/create-order", {
      amount,
      courseId,
      currency
    });
    return response.data;
  } catch (error) {
    console.error("Error creating payment order:", error);
    throw error;
  }
};

// Verify payment - POST /api/payment/verify
export const verifyPayment = async (paymentData) => {
  try {
    const response = await API.post("/payment/verify", paymentData);
    return response.data;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};

// Get payment history - GET /api/payment/history
export const fetchPaymentHistory = async () => {
  try {
    const response = await API.get("/payment/history");
    return response.data;
  } catch (error) {
    console.error("Error fetching payment history:", error);
    throw error;
  }
};

// Apply coupon - POST /api/payment/apply-coupon
export const applyCoupon = async (code, amount) => {
  try {
    const response = await API.post("/payment/apply-coupon", { code, amount });
    return response.data;
  } catch (error) {
    console.error("Error applying coupon:", error);
    throw error;
  }
};

// =======================
// VIDEO & PROGRESS ENDPOINTS
// =======================

// Get video progress - GET /api/video/progress/{courseId}
export const fetchVideoProgress = async (courseId) => {
  try {
    const response = await API.get(`/video/progress/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching video progress:", error);
    throw error;
  }
};

// Update video progress - POST /api/video/progress/{courseId}
export const updateVideoProgress = async (courseId, progress, timestamp) => {
  try {
    const response = await API.post(`/video/progress/${courseId}`, {
      progress,
      timestamp
    });
    return response.data;
  } catch (error) {
    console.error("Error updating video progress:", error);
    throw error;
  }
};

// Mark video as completed - POST /api/video/complete/{courseId}
export const markVideoCompleted = async (courseId) => {
  try {
    const response = await API.post(`/video/complete/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error marking video completed:", error);
    throw error;
  }
};

// Get video details - GET /api/video/{courseId}
export const fetchVideoDetails = async (courseId) => {
  try {
    const response = await API.get(`/video/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching video details:", error);
    throw error;
  }
};

// =======================
// CERTIFICATE ENDPOINTS
// =======================

// Generate certificate - POST /api/certificate/generate
export const generateCertificate = async (courseId, userId) => {
  try {
    const response = await API.post("/certificate/generate", { courseId, userId });
    return response.data;
  } catch (error) {
    console.error("Error generating certificate:", error);
    throw error;
  }
};

// Verify certificate - GET /api/certificate/verify/{certificateId}
export const verifyCertificate = async (certificateId) => {
  try {
    const response = await API.get(`/certificate/verify/${certificateId}`);
    return response.data;
  } catch (error) {
    console.error("Error verifying certificate:", error);
    throw error;
  }
};

// Get user certificates - GET /api/certificate/user/{userId}
export const fetchUserCertificates = async (userId) => {
  try {
    const response = await API.get(`/certificate/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user certificates:", error);
    throw error;
  }
};

// =======================
// FORUM/DISCUSSION ENDPOINTS
// =======================

// Get all questions - GET /api/forum/questions
export const fetchForumQuestions = async () => {
  try {
    const response = await API.get("/forum/questions");
    return response.data;
  } catch (error) {
    console.error("Error fetching forum questions:", error);
    throw error;
  }
};

// Get question by ID - GET /api/forum/questions/{id}
export const fetchQuestionById = async (id) => {
  try {
    const response = await API.get(`/forum/questions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error;
  }
};

// Post a question - POST /api/forum/questions
export const postQuestion = async (questionData) => {
  try {
    const response = await API.post("/forum/questions", questionData);
    return response.data;
  } catch (error) {
    console.error("Error posting question:", error);
    throw error;
  }
};

// Post a comment - POST /api/forum/questions/{id}/comments
export const postComment = async (questionId, commentData) => {
  try {
    const response = await API.post(`/forum/questions/${questionId}/comments`, commentData);
    return response.data;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
};

// Like a question - POST /api/forum/questions/{id}/like
export const likeQuestion = async (questionId) => {
  try {
    const response = await API.post(`/forum/questions/${questionId}/like`);
    return response.data;
  } catch (error) {
    console.error("Error liking question:", error);
    throw error;
  }
};

// =======================
// QUIZ ENDPOINTS
// =======================

// Get quiz for course - GET /api/quiz/course/{courseId}
export const fetchCourseQuiz = async (courseId) => {
  try {
    const response = await API.get(`/quiz/course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error;
  }
};

// Submit quiz answers - POST /api/quiz/submit
export const submitQuiz = async (courseId, answers) => {
  try {
    const response = await API.post("/quiz/submit", { courseId, answers });
    return response.data;
  } catch (error) {
    console.error("Error submitting quiz:", error);
    throw error;
  }
};

// Get quiz results - GET /api/quiz/results/{attemptId}
export const fetchQuizResults = async (attemptId) => {
  try {
    const response = await API.get(`/quiz/results/${attemptId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz results:", error);
    throw error;
  }
};