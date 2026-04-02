import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Courses from "../pages/Courses";
import CourseDetails from "../components/Course/CourseDetails";
import Contact from "../pages/Contact";
import Trainers from "../pages/Trainers";
import Blog from "../pages/Blog";
import FAQ from "../pages/FAQ";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsOfService from "../pages/TermsOfServices";
import RefundPolicy from "../pages/RefundPolicy";
import Login from "../features/auth/Auth";
import Auth from "../features/auth/Auth";
import ForgotPassword from "../features/auth/ForgetPassword";
import AdminDashboard from "../pages/AdminDashboard";
import StudentDashboard from "../pages/StudentDashBoard";
import TrainerDashboard from "../pages/TrainerDashboard";
import NotFound from "../pages/NotFound";
import MyCourses from "../components/Course/MyCourses";
import ProtectedRoute from "./ProtectedRoute"; 
import Profile from "../pages/Profile";
import Demo from "../pages/Demo"; 
import DemoVideo from "../components/video/DemoVideo";
import VerifyCertificate from "../components/certificate/CertificateVerify";
import Forum from "../pages/Forum";
import ForumPost from "../pages/ForumPost";
// 🔥 NEW: Import Wishlist page
import Wishlist from "../pages/Wishlist";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="courses" element={<Courses />} />
      <Route path="courses/:id" element={<CourseDetails />} />
      <Route path="trainers" element={<Trainers />} />
      <Route path="blog" element={<Blog />} />
      <Route path="faq" element={<FAQ />} />
      <Route path="privacy" element={<PrivacyPolicy />} />
      <Route path="terms" element={<TermsOfService />} />
      <Route path="refund" element={<RefundPolicy />} />
      <Route path="contact" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Auth />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="profile" element={<Profile />} />
      <Route path="forum" element={<Forum />} />
      <Route path="forum/post/:id" element={<ForumPost />} />
      
      {/* Demo Routes */}
      <Route path="demo" element={<Demo />} />
      <Route path="demo/:id" element={<DemoVideo />} />

      {/* 🔥 NEW: Wishlist Route */}
      <Route path="wishlist" element={<Wishlist />} />

      {/* Certificate Verification Route */}
      <Route path="verify/:certificateId" element={<VerifyCertificate />} />

      {/* Student Protected Routes */}
      <Route
        path="student-dashboard"
        element={
          <ProtectedRoute role="STUDENT">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="my-courses"
        element={
          <ProtectedRoute role="STUDENT">
            <MyCourses />
          </ProtectedRoute>
        }
      />

      {/* Trainer Protected Routes */}
      <Route
        path="trainer-dashboard"
        element={
          <ProtectedRoute role="TRAINER">
            <TrainerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Protected Routes */}
      <Route
        path="admin-dashboard"
        element={
          <ProtectedRoute role="ADMIN">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;