import API from "./axiosInstance";

// ========== COURSE MANAGEMENT ==========

/**
 * Fetch all courses for the logged-in trainer
 * Returns courses with approval status
 */
export const fetchTrainerCourses = async () => {
  try {
    const response = await API.get('/trainer/courses');
    return response.data; // Contains: data, count, pendingCount, approvedCount, rejectedCount
  } catch (error) {
    console.error("Error fetching trainer courses:", error);
    return { 
      data: [], 
      count: 0, 
      pendingCount: 0, 
      approvedCount: 0, 
      rejectedCount: 0 
    };
  }
};

/**
 * Fetch a single course by ID
 */
export const fetchCourseById = async (courseId) => {
  try {
    const response = await API.get(`/trainer/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course:", error);
    throw error;
  }
};

/**
 * Create a new course (submits for approval)
 * Course will be in PENDING status
 */
export const createCourse = async (courseData) => {
  try {
    const response = await API.post('/trainer/courses', courseData);
    return response.data; // Contains: success, message, course with approvalStatus
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

/**
 * Update an existing course
 * Only allowed for PENDING or REJECTED courses
 */
export const updateCourse = async (courseId, courseData) => {
  try {
    const response = await API.put(`/trainer/courses/${courseId}`, courseData);
    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

/**
 * Delete a course
 * Only allowed if no enrollments and course is not APPROVED
 */
export const deleteCourse = async (courseId) => {
  try {
    const response = await API.delete(`/trainer/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

// ========== 🔥 NEW: APPROVAL WORKFLOW METHODS ==========

/**
 * Resubmit a rejected course for approval
 * @param {number} courseId - ID of the rejected course
 * @param {object} courseData - Updated course data
 */
export const resubmitCourse = async (courseId, courseData) => {
  try {
    const response = await API.put(`/trainer/courses/${courseId}/resubmit`, courseData);
    return response.data; // Contains: success, message, approvalStatus
  } catch (error) {
    console.error("Error resubmitting course:", error);
    throw error;
  }
};

/**
 * Get rejection reason for a rejected course
 * @param {number} courseId - ID of the rejected course
 */
export const getRejectionReason = async (courseId) => {
  try {
    const response = await API.get(`/trainer/courses/${courseId}/rejection-reason`);
    return response.data; // Contains: isRejected, rejectionReason, rejectedAt
  } catch (error) {
    console.error("Error fetching rejection reason:", error);
    return { 
      isRejected: false, 
      rejectionReason: null, 
      rejectedAt: null 
    };
  }
};

/**
 * Get approval statistics for all courses
 */
export const getApprovalStats = async () => {
  try {
    const response = await API.get('/trainer/approval-stats');
    return response.data;
  } catch (error) {
    console.error("Error fetching approval stats:", error);
    return { 
      pending: 0, 
      approved: 0, 
      rejected: 0 
    };
  }
};

// ========== STATISTICS ==========

/**
 * Fetch trainer statistics
 * Now includes approval counts
 */
export const fetchTrainerStats = async () => {
  try {
    const response = await API.get('/trainer/stats');
    return response.data; // Contains: totalCourses, publishedCourses, draftCourses, pendingCourses, approvedCourses, rejectedCourses, etc.
  } catch (error) {
    console.error("Error fetching trainer stats:", error);
    return { 
      data: {
        totalCourses: 0,
        publishedCourses: 0,
        draftCourses: 0,
        pendingCourses: 0,
        approvedCourses: 0,
        rejectedCourses: 0,
        totalStudents: 0,
        avgRating: 0,
        totalRevenue: 0
      }
    };
  }
};

// ========== STUDENT MANAGEMENT ==========

/**
 * Fetch students enrolled in trainer's courses
 * Only includes enrollments from approved courses
 */
export const fetchStudentEnrollments = async () => {
  try {
    const response = await API.get('/trainer/students');
    return response.data; // Contains: data, count
  } catch (error) {
    console.error("Error fetching student enrollments:", error);
    return { data: [], count: 0 };
  }
};

/**
 * Get detailed student progress for a specific course
 * @param {number} courseId - ID of the course
 */
export const fetchCourseStudents = async (courseId) => {
  try {
    const response = await API.get(`/trainer/courses/${courseId}/students`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course students:", error);
    return { data: [], count: 0 };
  }
};

// ========== ADDITIONAL UTILITY METHODS ==========

/**
 * Get all trainers (public endpoint)
 * Used for displaying trainer profiles
 */
export const fetchAllTrainers = async () => {
  try {
    const response = await API.get('/trainer/all');
    return response.data; // Contains: data, count
  } catch (error) {
    console.error("Error fetching all trainers:", error);
    return { data: [], count: 0 };
  }
};

/**
 * Get course analytics for a specific course
 * @param {number} courseId - ID of the course
 */
export const fetchCourseAnalytics = async (courseId) => {
  try {
    const response = await API.get(`/trainer/courses/${courseId}/analytics`);
    return response.data;
  } catch (error) {
    console.error("Error fetching course analytics:", error);
    return { data: {} };
  }
};

/**
 * Get recent student activity
 * Shows recent enrollments, completions, etc.
 */
export const fetchRecentActivity = async () => {
  try {
    const response = await API.get('/trainer/activity/recent');
    return response.data;
  } catch (error) {
    console.error("Error fetching recent activity:", error);
    return { data: [] };
  }
};

/**
 * Get course completion rates
 */
export const fetchCompletionRates = async () => {
  try {
    const response = await API.get('/trainer/completion-rates');
    return response.data;
  } catch (error) {
    console.error("Error fetching completion rates:", error);
    return { data: {} };
  }
};

/**
 * Get revenue reports
 * @param {string} period - 'week', 'month', 'year'
 */
export const fetchRevenueReport = async (period = 'month') => {
  try {
    const response = await API.get(`/trainer/revenue?period=${period}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching revenue report:", error);
    return { data: {} };
  }
};

// ========== EXPORT ALL METHODS ==========

export default {
  // Course Management
  fetchTrainerCourses,
  fetchCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  
  // Approval Workflow
  resubmitCourse,
  getRejectionReason,
  getApprovalStats,
  
  // Statistics
  fetchTrainerStats,
  
  // Student Management
  fetchStudentEnrollments,
  fetchCourseStudents,
  
  // Additional Utilities
  fetchAllTrainers,
  fetchCourseAnalytics,
  fetchRecentActivity,
  fetchCompletionRates,
  fetchRevenueReport
};