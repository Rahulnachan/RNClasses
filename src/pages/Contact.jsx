import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaPaperPlane,
  FaWhatsapp,
  FaYoutube
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.message.trim()) {
      toast.error("Please enter your message");
      return false;
    }
    if (formData.message.length < 10) {
      toast.error("Message must be at least 10 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // Replace with actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Message sent successfully! We'll get back to you soon.", {
        duration: 5000,
        icon: "✅"
      });
      
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.", {
        duration: 5000,
        icon: "❌"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ UPDATED: Added your WhatsApp number 9022799695
  const handleQuickContact = (type) => {
    if (type === 'whatsapp') {
      window.open('https://wa.me/919022799695?text=Hello%20RN%20Classes%2C%20I%20have%20a%20question.', '_blank');
    } else if (type === 'call') {
      window.location.href = 'tel:+919022799695';
    }
  };

  // Updated contact info with Bhosari, Pune location and your phone number
  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      details: ["Office No. 123, First Floor", "Bhosari, Pune - 411039", "Maharashtra, India"],
      color: "from-blue-500 to-blue-600",
      action: () => window.open('https://maps.google.com/?q=Bhosari+Pune', '_blank')
    },
    {
      icon: FaPhone,
      title: "Call Us",
      // ✅ UPDATED: Added your phone number
      details: ["+91 9022799695", "+91 9022799695", "Mon-Fri 9am-6pm"],
      color: "from-purple-500 to-purple-600",
      action: () => handleQuickContact('call')
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      details: ["support@rnclasses.com", "admissions@rnclasses.com", "careers@rnclasses.com"],
      color: "from-green-500 to-green-600",
      action: () => window.location.href = 'mailto:support@rnclasses.com'
    },
    {
      icon: FaClock,
      title: "Office Hours",
      details: ["Monday - Friday: 9am - 6pm", "Saturday: 10am - 4pm", "Sunday: Closed"],
      color: "from-orange-500 to-orange-600"
    }
  ];

  // ✅ UPDATED: Added your WhatsApp number in social links
  const socialLinks = [
    { icon: FaFacebook, url: "https://facebook.com/rnclasses", color: "hover:bg-[#1877F2]", label: "Facebook" },
    { icon: FaTwitter, url: "https://twitter.com/rnclasses", color: "hover:bg-[#1DA1F2]", label: "Twitter" },
    { icon: FaLinkedin, url: "https://linkedin.com/company/rnclasses", color: "hover:bg-[#0A66C2]", label: "LinkedIn" },
    { icon: FaInstagram, url: "https://instagram.com/rnclasses", color: "hover:bg-[#E4405F]", label: "Instagram" },
    // ✅ UPDATED: WhatsApp link with your number
    { icon: FaWhatsapp, url: "https://wa.me/919022799695", color: "hover:bg-[#25D366]", label: "WhatsApp" },
    { icon: FaYoutube, url: "https://youtube.com/@rnclasses", color: "hover:bg-[#FF0000]", label: "YouTube" }
  ];

  const faqs = [
    {
      question: "How can I enroll in a course?",
      answer: "You can enroll directly through our website by visiting the Courses page and clicking on 'Enroll Now' for your desired course. You'll need to create an account or log in to complete the enrollment process."
    },
    {
      question: "What is your refund policy?",
      answer: "We offer a 7-day money-back guarantee if you're not satisfied with the course. To request a refund, please contact our support team with your course details and reason for refund within 7 days of enrollment."
    },
    {
      question: "Do you offer career counseling?",
      answer: "Yes, we provide free career counseling sessions for all enrolled students. You can schedule an appointment through email or by calling our career services team at +91 9022799695."
    },
    {
      question: "Can I access courses on mobile?",
      answer: "Yes, our platform is fully responsive and works perfectly on smartphones and tablets. You can learn on the go using any mobile device with internet access."
    },
    {
      question: "Do you offer certificates?",
      answer: "Yes, upon successfully completing a course, you'll receive a verified certificate that you can share on LinkedIn or add to your resume."
    }
  ];

  // Updated Google Maps embed for Bhosari, Pune
  const bhosariMapEmbed = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15131.289447852877!2d73.833722!3d18.623544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c06c1c6f1b1b%3A0x8c9e5e5e5e5e5e5e!2sBhosari%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin";

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Hero Section */}
      <section 
        className="relative min-h-[50vh] flex items-center bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
              <span className="text-sm font-medium">We're Here to Help</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Get in Touch
              </span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond within 24 hours.
            </p>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#f9fafb" fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,170.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* Quick Actions - UPDATED with your WhatsApp number */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleQuickContact('whatsapp')}
            className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-lg"
          >
            <FaWhatsapp className="w-5 h-5 mr-2" />
            WhatsApp Us
          </button>
          <button
            onClick={() => handleQuickContact('call')}
            className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
          >
            <FaPhone className="w-5 h-5 mr-2" />
            Call Now
          </button>
        </div>
      </section>

      {/* Contact Info Cards - UPDATED with your phone number */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={info.action}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-${info.color.split('-')[1]}-500 ${info.action ? 'cursor-pointer' : ''}`}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-600 text-sm">{detail}</p>
                ))}
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
            <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you within 24 hours.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="+91 9022799695"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    placeholder="Course Inquiry"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>

            {/* Social Links - UPDATED with your WhatsApp number */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-3">Connect with us on social media</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 ${social.color} group`}
                      aria-label={social.label}
                    >
                      <Icon className="text-gray-600 group-hover:text-white text-lg" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Map & FAQs */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Map - Bhosari, Pune */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Our Location - Bhosari, Pune</h3>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  title="Google Map - Bhosari Pune"
                  src={bhosariMapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="w-full h-full"
                ></iframe>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                <FaMapMarkerAlt className="inline mr-1 text-purple-600" />
                Office No. 123, First Floor, Bhosari, Pune - 411039, Maharashtra, India
              </p>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-gray-100 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                          expandedFaq === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {expandedFaq === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-4 pb-3 text-sm text-gray-600"
                        >
                          {faq.answer}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Contact;