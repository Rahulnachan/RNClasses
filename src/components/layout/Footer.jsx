import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaArrowUp,
  FaWhatsapp,
  FaTelegram
} from "react-icons/fa";

import logo from "../../assets/Logo.png"; // Logo import
import EmailService from "../../components/Services/email"; // Newsletter service

function Footer() {
  // Current year automatically
  const currentYear = new Date().getFullYear();
  
  // Newsletter state
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);

  /* ===============================
     DATA SECTION
  =============================== */

  // Quick Links
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Free Demo", path: "/demo" }, // Added Demo link
    { name: "Blog", path: "/blog" },
    { name: "Trainers", path: "/trainers" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" }
  ];

  // Popular Courses
  const popularCourses = [
    { name: "Web Development", path: "/courses?category=development" },
    { name: "Data Science", path: "/courses?category=data-science" },
    { name: "Mobile Development", path: "/courses?category=mobile" },
    { name: "Python Programming", path: "/courses?category=python" },
    { name: "React.js Mastery", path: "/courses?category=react" },
    { name: "UI/UX Design", path: "/courses?category=design" }
  ];

  // Resources
  const resources = [
    { name: "Blog", path: "/blog" },
    { name: "Free Demo", path: "/demo" },
    { name: "Discussion Forum", path: "/forum" },
    { name: "Help Center", path: "/faq" },
    { name: "Contact Support", path: "/contact" }
  ];

  // Contact Information
  const contactInfo = [
    { icon: FaMapMarkerAlt, text: "123 Education St, Pune, India 431001" },
    { icon: FaPhone, text: "+91 90227 96995" },
    { icon: FaEnvelope, text: "support@rnclasses.com" },
    { icon: FaClock, text: "Mon - Sat: 9:00 AM - 6:00 PM" }
  ];

  // Social Media Links (with real URLs)
  const socialLinks = [
    { icon: FaFacebook, url: "https://facebook.com/rnclasses", color: "hover:bg-[#1877F2]", label: "Facebook" },
    { icon: FaTwitter, url: "https://twitter.com/rnclasses", color: "hover:bg-[#1DA1F2]", label: "Twitter" },
    { icon: FaLinkedin, url: "https://linkedin.com/company/rnclasses", color: "hover:bg-[#0A66C2]", label: "LinkedIn" },
    { icon: FaInstagram, url: "https://instagram.com/rnclasses", color: "hover:bg-[#E4405F]", label: "Instagram" },
    { icon: FaYoutube, url: "https://youtube.com/@rnclasses", color: "hover:bg-[#FF0000]", label: "YouTube" },
    { icon: FaWhatsapp, url: "https://wa.me/919022799695", color: "hover:bg-[#25D366]", label: "WhatsApp" },
    { icon: FaTelegram, url: "https://t.me/rnclasses", color: "hover:bg-[#0088cc]", label: "Telegram" }
  ];

  // Newsletter handler
  const handleSubscribe = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    setSubscribing(true);
    try {
      await EmailService.subscribeToNewsletter(email);
      toast.success("Successfully subscribed to newsletter! 🎉");
      setEmail("");
    } catch (error) {
      toast.error("Subscription failed. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ===============================
     RETURN SECTION
  =============================== */

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white relative">

      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* ===== Company Info ===== */}
          <div className="space-y-4">

            {/* Logo + Name */}
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                src={logo}
                alt="RN Classes Logo"
                className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300"
              />
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  RN Classes
                </h2>
                <p className="text-xs text-gray-400">Learn Today, Lead Tomorrow</p>
              </div>
            </Link>

            {/* Description */}
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering students with quality education and expert-led courses.
              Join 50,000+ learners who have transformed their careers with us.
            </p>

            {/* Social Media Icons */}
            <div className="flex flex-wrap gap-3 pt-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;

                return (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 ${social.color}`}
                  >
                    <Icon className="text-white text-lg" />
                  </a>
                );
              })}
            </div>

          </div>

          {/* ===== Quick Links ===== */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
            </h3>

            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white hover:translate-x-2 inline-block transition-all duration-300"
                  >
                    › {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== Resources ===== */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Resources
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
            </h3>

            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <Link
                    to={resource.path}
                    className="text-gray-300 hover:text-white hover:translate-x-2 inline-block transition-all duration-300"
                  >
                    › {resource.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Trust Badge */}
            <div className="mt-6 p-3 bg-gray-700/50 rounded-lg">
              <p className="text-xs text-gray-300">
                ⭐ 4.8/5 rating from 10,000+ students
              </p>
            </div>
          </div>

          {/* ===== Contact Info ===== */}
          <div>
            <h3 className="text-lg font-semibold mb-4 relative inline-block">
              Get in Touch
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></span>
            </h3>

            <ul className="space-y-3">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;

                return (
                  <li key={index} className="flex items-start space-x-3 group">
                    <Icon className="text-blue-400 mt-1 group-hover:text-purple-400 transition-colors" />
                    <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                      {item.text}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* Newsletter */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 text-gray-200">
                Subscribe to Newsletter
              </h4>

              <form onSubmit={handleSubscribe} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:ring-1 focus:ring-purple-500"
                  disabled={subscribing}
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-r-lg hover:shadow-lg transition-all disabled:opacity-50"
                >
                  {subscribing ? "..." : "Subscribe"}
                </button>
              </form>

              <p className="text-xs text-gray-400 mt-2">
                Get latest courses & offers. No spam.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">

          <div className="text-sm text-gray-400">
            © {currentYear} RN Classes. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="hidden md:inline">•</span>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span className="hidden md:inline">•</span>
            <Link to="/refund" className="hover:text-white transition-colors">
              Refund Policy
            </Link>
            <span className="hidden md:inline">•</span>
            <Link to="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>

          <div className="text-sm text-gray-400">
            Made with ❤️ in India
          </div>

        </div>
      </div>

      {/* ================= BACK TO TOP BUTTON ================= */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50 group"
        aria-label="Back to top"
      >
        <FaArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
      </button>

    </footer>
  );
}

export default Footer;