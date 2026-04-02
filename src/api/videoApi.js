import API from "./axiosInstance";

// ✅ STEP 1: Update getVideoProgress to handle demos
export const getVideoProgress = async (courseId, isDemo = false) => {
  // If it's a demo, return mock data (no API call)
  if (isDemo) {
    console.log("📢 Demo mode: No progress tracking");
    return {
      success: true,
      data: {
        progress: 0,
        isDemo: true
      }
    };
  }

  try {
    const response = await API.get(`/video/progress/${courseId}`);
    return response.data;
  } catch (error) {
    // If 404, treat as demo
    if (error.response?.status === 404) {
      return {
        success: true,
        data: {
          progress: 0,
          isDemo: true
        }
      };
    }
    console.error("Error fetching video progress:", error);
    throw error;
  }
};

// ✅ STEP 2: Update updateVideoProgress to skip demo tracking
export const updateVideoProgress = async (courseId, progress, timestamp, isDemo = false) => {
  // Don't track progress for demo videos
  if (isDemo) {
    return {
      success: true,
      message: "Demo mode - progress not saved",
      isDemo: true
    };
  }

  try {
    const response = await API.post(`/video/progress/${courseId}`, {
      progress,
      timestamp
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return {
        success: true,
        message: "Demo mode - progress not saved",
        isDemo: true
      };
    }
    console.error("Error updating video progress:", error);
    throw error;
  }
};

// ✅ STEP 3: Create new function specifically for demo videos
export const getDemoVideo = async (courseId) => {
  // Mock demo video data (no API call)
  const demoVideos = {
    1: {
      id: 1,
      title: "Web Development Bootcamp - Free Demo",
      duration: "10:00",
      videoUrl: "https://www.youtube.com/embed/demo1",
      description: "Get started with HTML, CSS, and JavaScript",
      isDemo: true
    },
    2: {
      id: 2,
      title: "Data Science Masterclass - Free Demo",
      duration: "10:00",
      videoUrl: "https://www.youtube.com/embed/demo2",
      description: "Explore Python and data analysis",
      isDemo: true
    },
    3: {
      id: 3,
      title: "UI/UX Design Fundamentals - Free Demo",
      duration: "10:00",
      videoUrl: "https://www.youtube.com/embed/demo3",
      description: "Learn design principles and Figma basics",
      isDemo: true
    }
  };

  return {
    success: true,
    data: demoVideos[courseId] || {
      id: courseId,
      title: "Free Course Demo",
      duration: "10:00",
      videoUrl: "https://www.youtube.com/embed/demo",
      description: "Free 10-minute preview",
      isDemo: true
    }
  };
};

// ✅ STEP 4: Helper function to identify demo courses
export const isDemoCourse = (courseId) => {
  const demoCourseIds = [1, 2, 3]; // Add your demo course IDs
  return demoCourseIds.includes(Number(courseId));
};