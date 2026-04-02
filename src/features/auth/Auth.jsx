import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../components/context/AuthContext";
import { registerUser, loginUser, handleGoogleCallback } from "../../api/api";
import { motion, AnimatePresence } from "framer-motion";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
  EyeIcon,
  EyeSlashIcon,
  AcademicCapIcon,
  BriefcaseIcon
} from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

function Auth() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  /* -------------------- STATES -------------------- */
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState("STUDENT"); // STUDENT or TRAINER only
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    expertise: "" // For trainers only
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Check for OAuth callback on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const userDataParam = params.get('user');

    if (token && userDataParam) {
      handleOAuthCallback(token, userDataParam);
    }
  }, [location]);

  /* -------------------- OAUTH CALLBACK HANDLER -------------------- */
  const handleOAuthCallback = async (token, userDataParam) => {
    setIsLoading(true);
    try {
      // Parse user data from URL
      const userData = JSON.parse(decodeURIComponent(userDataParam));
      
      console.log("OAuth callback - User data:", userData);
      
      // Store token and user data
      login(token, userData);

      // Redirect based on role
      if (userData.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else if (userData.role === "TRAINER") {
        navigate("/trainer-dashboard");
      } else {
        navigate("/student-dashboard");
      }
      
      toast.success(`Welcome ${userData.name}!`);
    } catch (error) {
      console.error("OAuth callback error:", error);
      toast.error("Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------- GOOGLE LOGIN (FIXED PORT) -------------------- */
  const handleGoogleLogin = () => {
    setIsLoading(true);
    
    // 🔥 FIXED: Changed from 8083 to 8085
    window.location.href = "http://localhost:8085/oauth2/authorization/google";
    
    // Note: The user will be redirected back to this page with token and user data
    // The useEffect above will handle the callback
  };

  /* -------------------- INPUT CHANGE -------------------- */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear specific field error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
    // Clear general form error when any field changes
    if (errors.form) {
      setErrors({ ...errors, form: "" });
    }
  };

  /* -------------------- VALIDATION -------------------- */
  const validateForm = () => {
    let newErrors = {};

    // Email validation
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";

    // Password validation
    if (!formData.password)
      newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    // Signup specific validations
    if (!isLogin) {
      if (!formData.name) newErrors.name = "Name is required";

      // Phone validation
      if (!formData.phone) newErrors.phone = "Phone number is required";
      else if (!/^\d{10}$/.test(formData.phone))
        newErrors.phone = "Phone number must be 10 digits";

      // Confirm password validation
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";

      // Trainer-specific validations
      if (userType === "TRAINER") {
        if (!formData.expertise) newErrors.expertise = "Expertise area is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({}); // Clear previous errors

    try {
      if (isLogin) {
        // ========== LOGIN ==========
        const response = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        console.log("Login response:", response);

        // Check if login was successful and token exists
        if (response && response.token) {
          // Construct user data object from response
          const userData = {
            id: response.id,
            email: response.email,
            name: response.name || formData.email.split('@')[0],
            role: response.role || "STUDENT",
            phone: response.phone,
            expertise: response.expertise
          };

          // Call the login function from AuthContext to set user state and token
          login(response.token, userData);

          // Redirect based on role
          if (response.role === "ADMIN") {
            console.log("👉 Redirecting to Admin Dashboard");
            navigate("/admin-dashboard");
          } else if (response.role === "TRAINER") {
            console.log("👉 Redirecting to Trainer Dashboard");
            navigate("/trainer-dashboard");
          } else {
            console.log("👉 Redirecting to Student Dashboard");
            navigate("/student-dashboard");
          }
        } else {
          // Handle case where response doesn't have expected token
          setErrors({ form: "Invalid response from server. Please try again." });
        }
      } else {
        // ========== SIGNUP ==========
        // Prepare registration data based on user type
        const registrationData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phone,
          role: userType,
          ...(userType === "TRAINER" && { expertise: formData.expertise })
        };

        const response = await registerUser(registrationData);
        console.log("Signup response:", response);

        // Check for successful registration
        if (response === "Registered Successfully" ||
            response?.success === true ||
            response?.message === "Registered Successfully") {

          // Show success message and start countdown to switch to login
          setSignupSuccess(true);
          setCountdown(3);

          // Clear form fields but keep email for convenience
          setFormData({
            name: "",
            email: formData.email, // Keep email
            password: "",
            confirmPassword: "",
            phone: "",
            expertise: ""
          });

          // Countdown timer to switch to login mode
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                setIsLogin(true); // Switch to login mode
                setSignupSuccess(false); // Hide success message
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } else {
          // Handle registration failure
          setErrors({
            form: response?.error || response?.message || "Registration failed. Please try again.",
          });
        }
      }
    } catch (err) {
      // ========== ERROR HANDLING ==========
      console.error("Auth error:", err);

      // Extract error details from the response if available
      const errorMsg = err.response?.data?.error || err.response?.data?.message;
      const status = err.response?.status;

      // Handle specific error cases
      if (errorMsg === "Email already exists" || status === 403) {
        setErrors({
          form: "Email already registered. Please login.",
          email: "This email is already registered"
        });
      } else if (status === 401) {
        setErrors({ form: "Invalid email or password" });
      } else if (status === 404) {
        setErrors({ form: "User not found. Please sign up first." });
      } else {
        // Generic error message
        setErrors({
          form: errorMsg || "An error occurred. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  /* -------------------- TOGGLE LOGIN/SIGNUP -------------------- */
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setSignupSuccess(false);
    setCountdown(0);
    // Reset form data when switching modes
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      expertise: ""
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  /* -------------------- USER TYPE SELECTOR -------------------- */
  const UserTypeSelector = () => (
    <div className="grid grid-cols-2 gap-2 mb-6">
      <button
        type="button"
        onClick={() => setUserType("STUDENT")}
        className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
          userType === "STUDENT"
            ? "border-purple-600 bg-purple-50 text-purple-600"
            : "border-gray-200 hover:border-purple-300 text-gray-600"
        }`}
      >
        <AcademicCapIcon className="w-6 h-6 mb-1" />
        <span className="text-xs font-medium">Student</span>
      </button>
      <button
        type="button"
        onClick={() => setUserType("TRAINER")}
        className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all ${
          userType === "TRAINER"
            ? "border-purple-600 bg-purple-50 text-purple-600"
            : "border-gray-200 hover:border-purple-300 text-gray-600"
        }`}
      >
        <BriefcaseIcon className="w-6 h-6 mb-1" />
        <span className="text-xs font-medium">Trainer</span>
      </button>
    </div>
  );

  /* -------------------- UI RENDER -------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 flex items-center justify-center p-4">
      {/* Animated Background Elements - FIXED SVG ISSUE */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1, rotate: 0 }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-40 -right-40 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{
            width: '20rem',
            height: '20rem',
            backgroundColor: '#8b5cf6' // purple-500
          }}
        />
        <motion.div
          initial={{ scale: 1, rotate: 0 }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -45, 0],
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-40 -left-40 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{
            width: '20rem',
            height: '20rem',
            backgroundColor: '#3b82f6' // blue-500
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6 text-white text-center">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="text-3xl font-bold"
          >
            {isLogin ? "Welcome Back! 👋" : "Join Our Community! 🚀"}
          </motion.h1>
          <p className="text-purple-100 mt-2 text-sm">
            {isLogin
              ? "Sign in to continue your journey"
              : `Create an account as a ${userType.toLowerCase()}`}
          </p>
        </div>

        {/* Form Container */}
        <div className="p-8">
          {/* Loading Overlay for OAuth */}
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Processing Google login...</p>
              </div>
            </div>
          )}

          {/* User Type Selector - Only show in signup mode */}
          {!isLogin && <UserTypeSelector />}

          {/* Success Message */}
          <AnimatePresence>
            {signupSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-center"
              >
                <p>✅ Registration successful!</p>
                {countdown > 0 && (
                  <p className="text-sm mt-1">Redirecting to login in {countdown} seconds...</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message */}
          <AnimatePresence>
            {errors.form && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg"
              >
                {errors.form}
                {/* Quick action links based on error message */}
                {errors.form.includes("registered") && (
                  <button
                    onClick={() => setIsLogin(true)}
                    className="block text-sm font-medium text-red-800 underline mt-1"
                  >
                    Go to Login →
                  </button>
                )}
                {errors.form.includes("not found") && (
                  <button
                    onClick={() => setIsLogin(false)}
                    className="block text-sm font-medium text-red-800 underline mt-1"
                  >
                    Create an account →
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name (Signup Only) */}
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone (Signup Only) */}
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter 10-digit phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-3 pr-3 py-2 border ${errors.phone ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Trainer Specific Fields */}
            <AnimatePresence>
              {!isLogin && userType === "TRAINER" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Area of Expertise
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="expertise"
                      placeholder="e.g., Web Development, Data Science"
                      value={formData.expertise}
                      onChange={handleChange}
                      className={`w-full pl-3 pr-3 py-2 border ${errors.expertise ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                  </div>
                  {errors.expertise && (
                    <p className="text-xs text-red-500 mt-1">{errors.expertise}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder={isLogin ? "Enter your password" : "Create a password (min. 6 characters)"}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password (Signup Only) */}
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <LockClosedIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-10 py-2 border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Forgot Password Link (Login Only) */}
            {isLogin && (
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-purple-600 hover:text-purple-800">
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || countdown > 0}
              className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-all ${isLoading || countdown > 0
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-[1.02]"
                }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-white mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </div>
              ) : countdown > 0 ? (
                `Redirecting in ${countdown}s...`
              ) : (
                isLogin ? `${userType} Login` : `Sign Up as ${userType}`
              )}
            </button>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 mt-4"
            >
              <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>

            {/* Toggle Link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              {isLogin ? "New to RN Classes? " : "Already have an account? "}
              <button
                type="button"
                onClick={toggleMode}
                disabled={countdown > 0}
                className="text-purple-600 font-semibold hover:text-purple-800 hover:underline disabled:opacity-50"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>

            {/* Terms and Privacy */}
            <p className="text-center text-xs text-gray-500 mt-4">
              By continuing, you agree to our{" "}
              <Link to="/terms" className="text-purple-600 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-purple-600 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Auth;