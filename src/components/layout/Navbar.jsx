import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/Logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const { user, isAuthenticated, logout, hasRole } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  const desktopDropdownRef = useRef(null);
  const mobileDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (desktopDropdownRef.current && !desktopDropdownRef.current.contains(event.target)) {
        setDesktopDropdownOpen(false);
      }
      if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(event.target)) {
        setMobileDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setDesktopDropdownOpen(false);
    setMobileDropdownOpen(false);
    setUserDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const courseCategories = [
    { name: "All Courses", path: "/courses" },
    { name: "Web Development", path: "/courses?category=development" },
    { name: "Data Science", path: "/courses?category=data-science" },
    { name: "Mobile Development", path: "/courses?category=mobile" },
  ];

  const isActiveLink = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path.split('?')[0]);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img 
              src={logo} 
              alt="RN Classes Logo" 
              className="w-28 h-28 object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActiveLink("/") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Home
            </Link>
            
            <Link 
              to="/about" 
              className={`font-medium transition-colors ${
                isActiveLink("/about") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              About
            </Link>

            {/* COURSES DROPDOWN */}
            <div className="relative" ref={desktopDropdownRef}>
              <button
                onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
                className={`flex items-center gap-1 font-medium transition-colors ${
                  isActiveLink("/courses") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Courses
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${desktopDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {desktopDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-10 left-0 w-56 bg-white rounded-lg shadow-xl py-2 border border-gray-100"
                  >
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                      Course Categories
                    </div>
                    {courseCategories.map((category, index) => (
                      <Link
                        key={index}
                        to={category.path}
                        onClick={() => setDesktopDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              to="/trainers" 
              className={`font-medium transition-colors ${
                isActiveLink("/trainers") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Trainers
            </Link>

            <Link 
              to="/blog" 
              className={`font-medium transition-colors ${
                isActiveLink("/blog") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Blog
            </Link>

            <Link 
              to="/faq" 
              className={`font-medium transition-colors ${
                isActiveLink("/faq") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              FAQ
            </Link>

            <Link 
              to="/contact" 
              className={`font-medium transition-colors ${
                isActiveLink("/contact") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Contact
            </Link>

            {/* Free Demo Link */}
            <Link 
              to="/demo" 
              className={`font-medium transition-colors ${
                isActiveLink("/demo") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Free Demo
            </Link>

            {/* AUTHENTICATED USER MENU */}
            {isAuthenticated() ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none group"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold group-hover:scale-110 transition-transform">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <span className="text-gray-700 font-medium">{user?.name?.split(' ')[0]}</span>
                  <svg 
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${userDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-xl py-2 border border-gray-100"
                    >
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-xs text-gray-500">Signed in as</p>
                        <p className="text-sm font-semibold text-gray-900">{user?.email}</p>
                        <p className="text-xs text-gray-500 mt-1 capitalize">Role: {user?.role?.toLowerCase()}</p>
                      </div>

                      {/* 🔥 NEW: Wishlist Link - For all authenticated users */}
                      <Link
                        to="/wishlist"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        ❤️ My Wishlist
                      </Link>

                      {hasRole("STUDENT") && (
                        <Link
                          to="/student-dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          🎓 Student Dashboard
                        </Link>
                      )}

                      {hasRole("TRAINER") && (
                        <Link
                          to="/trainer-dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          👨‍🏫 Trainer Dashboard
                        </Link>
                      )}

                      {hasRole("ADMIN") && (
                        <Link
                          to="/admin-dashboard"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          ⚙️ Admin Dashboard
                        </Link>
                      )}

                      <Link
                        to="/my-courses"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        📚 My Courses
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        👤 Profile Settings
                      </Link>

                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors font-medium"
                        >
                          🚪 Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Login
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-2xl text-gray-700 hover:text-blue-600 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-gray-100 py-4 overflow-hidden"
            >
              <div className="flex flex-col space-y-3 px-4">
                <Link 
                  to="/" 
                  onClick={() => setIsOpen(false)}
                  className={`py-2 font-medium ${
                    isActiveLink("/") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Home
                </Link>
                
                <Link 
                  to="/about" 
                  onClick={() => setIsOpen(false)}
                  className={`py-2 font-medium ${
                    isActiveLink("/about") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  About
                </Link>

                {/* MOBILE COURSES DROPDOWN */}
                <div ref={mobileDropdownRef}>
                  <button
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    className={`flex items-center justify-between w-full py-2 font-medium ${
                      isActiveLink("/courses") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    <span>Courses</span>
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${mobileDropdownOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <AnimatePresence>
                    {mobileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pl-4 mt-2 space-y-2"
                      >
                        {courseCategories.map((category, index) => (
                          <Link
                            key={index}
                            to={category.path}
                            onClick={() => {
                              setMobileDropdownOpen(false);
                              setIsOpen(false);
                            }}
                            className="block text-gray-600 hover:text-blue-600 py-1"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link 
                  to="/trainers" 
                  onClick={() => setIsOpen(false)}
                  className={`py-2 font-medium ${
                    isActiveLink("/trainers") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Trainers
                </Link>

                <Link 
                  to="/blog" 
                  onClick={() => setIsOpen(false)}
                  className={`py-2 font-medium ${
                    isActiveLink("/blog") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Blog
                </Link>

                <Link 
                  to="/faq" 
                  onClick={() => setIsOpen(false)}
                  className={`py-2 font-medium ${
                    isActiveLink("/faq") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  FAQ
                </Link>

                <Link 
                  to="/contact" 
                  onClick={() => setIsOpen(false)}
                  className={`py-2 font-medium ${
                    isActiveLink("/contact") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Contact
                </Link>

                {/* Free Demo Link - Mobile */}
                <Link 
                  to="/demo" 
                  onClick={() => setIsOpen(false)}
                  className={`py-2 font-medium ${
                    isActiveLink("/demo") ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  🎯 Free Demo
                </Link>

                {isAuthenticated() ? (
                  <>
                    <div className="border-t border-gray-100 pt-3">
                      <div className="flex items-center space-x-3 pb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                          <p className="text-xs text-gray-400 capitalize">Role: {user?.role?.toLowerCase()}</p>
                        </div>
                      </div>

                      {/* 🔥 NEW: Wishlist Link for Mobile */}
                      <Link
                        to="/wishlist"
                        onClick={() => setIsOpen(false)}
                        className="block text-gray-700 hover:text-blue-600 py-2"
                      >
                        ❤️ My Wishlist
                      </Link>

                      {hasRole("STUDENT") && (
                        <Link
                          to="/student-dashboard"
                          onClick={() => setIsOpen(false)}
                          className="block text-gray-700 hover:text-blue-600 py-2"
                        >
                          🎓 Student Dashboard
                        </Link>
                      )}

                      {hasRole("TRAINER") && (
                        <Link
                          to="/trainer-dashboard"
                          onClick={() => setIsOpen(false)}
                          className="block text-gray-700 hover:text-blue-600 py-2"
                        >
                          👨‍🏫 Trainer Dashboard
                        </Link>
                      )}

                      {hasRole("ADMIN") && (
                        <Link
                          to="/admin-dashboard"
                          onClick={() => setIsOpen(false)}
                          className="block text-gray-700 hover:text-blue-600 py-2"
                        >
                          ⚙️ Admin Dashboard
                        </Link>
                      )}

                      <Link
                        to="/my-courses"
                        onClick={() => setIsOpen(false)}
                        className="block text-gray-700 hover:text-blue-600 py-2"
                      >
                        📚 My Courses
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="block text-gray-700 hover:text-blue-600 py-2"
                      >
                        👤 Profile Settings
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left text-red-600 hover:bg-red-50 py-2 px-4 rounded-lg mt-2 font-medium"
                      >
                        🚪 Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="border-t border-gray-100 pt-3">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-center font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                    >
                      Login
                    </Link>
                    
                    <Link
                      to="/forgot-password"
                      onClick={() => setIsOpen(false)}
                      className="block text-center text-sm text-gray-500 hover:text-purple-600 py-2 mt-2"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;