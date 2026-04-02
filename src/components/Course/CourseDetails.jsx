import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpenIcon, 
  UsersIcon, 
  ClockIcon, 
  StarIcon,
  AcademicCapIcon,
  CheckBadgeIcon,
  PlayCircleIcon,
  CurrencyRupeeIcon
} from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import { toast } from "react-hot-toast";
import PaymentModal from "../payment/PaymentModal";
import VideoPlayer from "../video/VideoPlayer";
import ShareButtons from "../common/ShareButtons";
import { formatPrice, convertToRupees } from "../../components/utils/helpers";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [showPayment, setShowPayment] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

  // Check if this is a demo view
  const isDemo = location.state?.isDemo || new URLSearchParams(location.search).get('demo') === 'true';

  // Hide any progress elements that might be in the layout
  useEffect(() => {
    if (isDemo) {
      // Add a style to hide progress elements
      const style = document.createElement('style');
      style.id = 'hide-progress-demo';
      style.textContent = `
        .progress-section, [class*="progress"], [class*="Progress"],
        [class*="progress-bar"], [class*="ProgressBar"],
        div:contains("Your progress"), span:contains("Your progress"),
        .flex.items-center.gap-2 span:contains("%"),
        [data-testid="progress"], #user-progress {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }
      `;
      document.head.appendChild(style);
      
      return () => {
        const existingStyle = document.getElementById('hide-progress-demo');
        if (existingStyle) existingStyle.remove();
      };
    }
  }, [isDemo]);

  // Mock course data with rupee prices
  useEffect(() => {
    setTimeout(() => {
      const coursesData = {
        1: {
          id: 1,
          title: "Complete Web Development Bootcamp",
          description: "Learn HTML, CSS, JavaScript, React, Node.js and more. This comprehensive bootcamp will take you from beginner to professional web developer.",
          longDescription: "This course covers everything you need to know to become a professional web developer. You'll learn front-end and back-end technologies, build real-world projects, and get hands-on experience with the latest tools and frameworks.",
          category: "Development",
          level: "Beginner",
          students: "15k+",
          duration: "12 weeks",
          rating: 4.8,
          reviews: 1245,
          image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
          demoVideo: "https://www.youtube.com/watch?v=demo1",
          instructor: {
            name: "Sarah Johnson",
            avatar: "https://images.unsplash.com/photo-1494790108777-2f9bdb7a7d9e",
            title: "Senior Web Developer",
            bio: "Sarah has over 10 years of experience in web development and has taught thousands of students worldwide.",
            students: "25k+",
            courses: 8,
            rating: 4.9
          },
          curriculum: [
            { week: 1, topic: "HTML & CSS Fundamentals", duration: "3 hours", video: true },
            { week: 2, topic: "JavaScript Basics", duration: "4 hours", video: true },
            { week: 3, topic: "Advanced JavaScript", duration: "5 hours", video: true },
            { week: 4, topic: "React Fundamentals", duration: "6 hours", video: true },
            { week: 5, topic: "Node.js & Express", duration: "5 hours", video: true },
            { week: 6, topic: "Database with MongoDB", duration: "4 hours", video: true },
          ],
          whatYouWillLearn: [
            "Build responsive websites using HTML5, CSS3, and JavaScript",
            "Create dynamic web applications with React",
            "Build backend APIs with Node.js and Express",
            "Work with databases using MongoDB",
            "Deploy applications to production",
            "Implement authentication and authorization"
          ],
          requirements: [
            "Basic computer skills",
            "No prior programming experience needed",
            "A computer with internet connection"
          ],
          price: 89.99,
          featured: true,
          includesCertificate: true,
          language: "English",
          subtitles: ["English", "Hindi"]
        },
        2: {
          id: 2,
          title: "Data Science Masterclass",
          description: "Python, pandas, scikit-learn, and TensorFlow. Master data science and machine learning from scratch.",
          longDescription: "This comprehensive data science course covers everything from Python basics to advanced machine learning algorithms. You'll work with real datasets and build practical projects.",
          category: "Data Science",
          level: "Intermediate",
          students: "12k+",
          duration: "16 weeks",
          rating: 4.9,
          reviews: 987,
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
          demoVideo: "https://www.youtube.com/watch?v=demo2",
          instructor: {
            name: "Michael Chen",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
            title: "Data Science Expert",
            bio: "Michael has worked as a data scientist at Google and Netflix. He's passionate about teaching data science to beginners.",
            students: "20k+",
            courses: 5,
            rating: 4.9
          },
          curriculum: [
            { week: 1, topic: "Python for Data Science", duration: "4 hours", video: true },
            { week: 2, topic: "NumPy & Pandas", duration: "5 hours", video: true },
            { week: 3, topic: "Data Visualization", duration: "4 hours", video: true },
            { week: 4, topic: "Machine Learning Basics", duration: "6 hours", video: true },
          ],
          whatYouWillLearn: [
            "Master Python for data analysis",
            "Work with NumPy and Pandas",
            "Create stunning visualizations",
            "Build machine learning models",
            "Deploy ML models to production"
          ],
          requirements: [
            "Basic Python knowledge",
            "Understanding of basic math",
            "A computer with 8GB RAM"
          ],
          price: 99.99,
          includesCertificate: true,
          language: "English",
          subtitles: ["English"]
        },
        3: {
          id: 3,
          title: "UI/UX Design Fundamentals",
          description: "Master the principles of user interface and user experience design. Learn Figma, prototyping, and user research.",
          longDescription: "This course teaches you the fundamentals of UI/UX design. You'll learn design thinking, wireframing, prototyping, and user testing.",
          category: "Design",
          level: "Beginner",
          students: "8k+",
          duration: "10 weeks",
          rating: 4.7,
          reviews: 654,
          image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
          demoVideo: "https://www.youtube.com/watch?v=demo3",
          instructor: {
            name: "Emily Rodriguez",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            title: "UX Design Lead",
            bio: "Emily has designed products for Fortune 500 companies and loves teaching design thinking.",
            students: "15k+",
            courses: 4,
            rating: 4.8
          },
          curriculum: [
            { week: 1, topic: "Design Thinking", duration: "3 hours", video: true },
            { week: 2, topic: "User Research", duration: "4 hours", video: true },
            { week: 3, topic: "Wireframing", duration: "3 hours", video: true },
            { week: 4, topic: "Prototyping with Figma", duration: "5 hours", video: true },
          ],
          whatYouWillLearn: [
            "Understand user-centered design",
            "Create wireframes and prototypes",
            "Conduct user research",
            "Use Figma professionally",
            "Build a design portfolio"
          ],
          requirements: [
            "No design experience needed",
            "A computer with internet",
            "Creativity and curiosity"
          ],
          price: 79.99,
          includesCertificate: true,
          language: "English",
          subtitles: ["English", "Hindi", "Spanish"]
        }
      };
      
      setCourse(coursesData[id] || coursesData[1]);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleEnroll = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      if (window.confirm("Please login to enroll. Go to login page?")) {
        navigate("/login");
      }
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = (paymentData) => {
    setIsEnrolled(true);
    setShowPayment(false);
    toast.success("🎉 Successfully enrolled in the course!");
  };

  const handleAddToWishlist = () => {
    setInWishlist(!inWishlist);
    toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleWatchDemo = () => {
    setShowDemo(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
          <Link to="/courses" className="text-purple-600 mt-4 inline-block">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const rupeePrice = convertToRupees(course.price);
  const formattedPrice = formatPrice(rupeePrice);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link
          to="/courses"
          className="inline-flex items-center text-gray-600 hover:text-purple-600 mb-8 group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Courses
        </Link>

        {/* Course Header */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="relative h-96">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
            
            {/* Course Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-purple-600 rounded-full text-sm font-semibold">
                  {course.category}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm">
                  {course.level}
                </span>
                {course.featured && (
                  <span className="px-3 py-1 bg-yellow-500 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-lg text-gray-200 max-w-3xl">{course.description}</p>
              
              {/* Stats Row */}
              <div className="flex flex-wrap gap-6 mt-6">
                <div className="flex items-center">
                  <StarIcon className="w-5 h-5 text-yellow-400 mr-2" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-gray-300 ml-1">({course.reviews} reviews)</span>
                </div>
                <div className="flex items-center">
                  <UsersIcon className="w-5 h-5 mr-2" />
                  <span>{course.students} students</span>
                </div>
                <div className="flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  <span>{course.duration}</span>
                </div>
              </div>
            </div>

            {/* Demo Button Overlay */}
            <button
              onClick={handleWatchDemo}
              className="absolute top-8 right-8 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all flex items-center gap-2"
            >
              <PlayIcon className="w-5 h-5" />
              Watch Free Demo
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Course Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
                {["overview", "curriculum", "instructor", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 font-medium text-sm transition-colors relative capitalize whitespace-nowrap ${
                      activeTab === tab
                        ? "text-purple-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="prose max-w-none">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">About This Course</h3>
                      <p className="text-gray-600 leading-relaxed">{course.longDescription}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="text-sm text-gray-500">Language</p>
                        <p className="font-semibold">{course.language}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Subtitles</p>
                        <p className="font-semibold">{course.subtitles.join(", ")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Certificate</p>
                        <p className="font-semibold">{course.includesCertificate ? "Yes" : "No"}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Access</p>
                        <p className="font-semibold">Lifetime</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {course.whatYouWillLearn.map((item, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <CheckBadgeIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
                      <ul className="list-disc pl-5 text-gray-600 space-y-2">
                        {course.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}

                {/* Curriculum Tab */}
                {activeTab === "curriculum" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Course Curriculum</h3>
                    <div className="space-y-3">
                      {course.curriculum.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                          onClick={() => item.video && handleWatchDemo()}
                        >
                          <div className="flex items-center space-x-4">
                            <span className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-semibold">
                              {item.week}
                            </span>
                            <div>
                              <h4 className="font-semibold text-gray-900">{item.topic}</h4>
                              <p className="text-sm text-gray-500">{item.duration}</p>
                            </div>
                          </div>
                          {item.video ? (
                            <PlayCircleIcon className="w-5 h-5 text-purple-600" />
                          ) : (
                            <BookOpenIcon className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Instructor Tab */}
                {activeTab === "instructor" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col md:flex-row items-start space-x-0 md:space-x-6 space-y-4 md:space-y-0">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{course.instructor.name}</h3>
                        <p className="text-purple-600 mb-2">{course.instructor.title}</p>
                        <p className="text-gray-600">{course.instructor.bio}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{course.instructor.students}</div>
                        <div className="text-sm text-gray-500">Students</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{course.instructor.courses}</div>
                        <div className="text-sm text-gray-500">Courses</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{course.instructor.rating}</div>
                        <div className="text-sm text-gray-500">Rating</div>
                      </div>
                    </div>

                    <Link
                      to={`/trainers?instructor=${course.instructor.name}`}
                      className="inline-block text-purple-600 hover:text-purple-700 font-medium"
                    >
                      View all courses by {course.instructor.name} →
                    </Link>
                  </motion.div>
                )}

                {/* Reviews Tab (Placeholder) */}
                {activeTab === "reviews" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <p className="text-gray-500">Reviews coming soon...</p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Enrollment Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              {/* Price */}
              <div className="text-center mb-6">
                <span className="text-3xl font-bold text-gray-900">{formattedPrice}</span>
                <span className="text-gray-500 ml-2">one-time</span>
                {course.price < 100 && (
                  <p className="text-sm text-green-600 mt-1">Save ₹{convertToRupees(200 - course.price)} with this course!</p>
                )}
              </div>

              {/* Features */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center text-sm text-gray-600">
                  <AcademicCapIcon className="w-5 h-5 mr-3 text-purple-600" />
                  <span>Full lifetime access</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <ClockIcon className="w-5 h-5 mr-3 text-purple-600" />
                  <span>{course.duration} of content</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckBadgeIcon className="w-5 h-5 mr-3 text-purple-600" />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <BookOpenIcon className="w-5 h-5 mr-3 text-purple-600" />
                  <span>{course.curriculum.length} downloadable resources</span>
                </div>
              </div>

              {/* Action Buttons */}
              {isEnrolled ? (
                <Link
                  to={`/my-courses/${course.id}`}
                  className="block w-full py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center mb-3"
                >
                  Go to Course
                </Link>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 mb-3"
                >
                  Enroll Now
                </button>
              )}

              <button
                onClick={handleAddToWishlist}
                className={`w-full py-3 border-2 rounded-xl font-semibold transition-all duration-300 mb-4 ${
                  inWishlist
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {inWishlist ? '✓ In Wishlist' : 'Add to Wishlist'}
              </button>

              {/* Money-back Guarantee */}
              <p className="text-xs text-gray-400 text-center flex items-center justify-center">
                <CheckBadgeIcon className="w-4 h-4 text-green-500 mr-1" />
                30-day money-back guarantee
              </p>

              {/* Share Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3 text-center">Share this course</p>
                <ShareButtons
                  url={window.location.href}
                  title={course.title}
                  description={course.description}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        course={{
          ...course,
          price: rupeePrice
        }}
        onSuccess={handlePaymentSuccess}
      />

      {/* Demo Video Modal */}
      <AnimatePresence>
        {showDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDemo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDemo(false)}
                className="absolute top-4 right-4 text-white hover:text-purple-400"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <VideoPlayer
                videoUrl={course.demoVideo}
                title={`${course.title} - Demo Preview`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseDetails;