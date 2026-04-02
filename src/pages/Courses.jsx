import React, { useState, useEffect } from "react";
import CoursesHero from "../components/Course/HeroCourse";
import CourseFilter from "../components/Course/FilterSection";
import CourseGrid from "../components/Course/CourseGrid";
import WhyCourses from "../components/Course/WhyTake";
import CoursesCTA from "../components/Course/CTA";
import { fetchCourses, enrollCourse } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Courses() {
  const [coursesData, setCoursesData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrollingId, setEnrollingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const response = await fetchCourses();
        
        // Extract courses from response
        const courses = response.data || [];
        setCoursesData(courses);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError(err.response?.data?.error || "Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  // Get unique categories for filter
  const categories = ["All", ...new Set(coursesData.map(c => c.category).filter(Boolean))];

  // Filter courses
  const filteredCourses = coursesData.filter((course) => {
    const matchSearch = course.title?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = selectedCategory === "All" || course.category === selectedCategory;
    return matchSearch && matchFilter;
  });

  const handleEnroll = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
      if (window.confirm("Please login to enroll. Go to login page?")) {
        navigate("/login");
      }
      return;
    }

    try {
      setEnrollingId(id);
      const response = await enrollCourse(id);
      
      if (response.success) {
        alert("✅ Successfully enrolled!");
      } else {
        alert(response.message || "Enrollment failed");
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        alert(err.response?.data?.error || "Enrollment failed");
      }
    } finally {
      setEnrollingId(null);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen">
      <CoursesHero />
      
      <CourseFilter
        search={search}
        setSearch={setSearch}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        totalCourses={filteredCourses.length}
      />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-600">{error}</p>
        </div>
      ) : (
        <CourseGrid 
          courses={filteredCourses}
          onEnroll={handleEnroll}
          enrollingId={enrollingId}
        />
      )}

      <WhyCourses />
      <CoursesCTA />
    </main>
  );
}