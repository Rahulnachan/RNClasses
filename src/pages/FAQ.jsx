import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDownIcon,
  MagnifyingGlassIcon,
  ChatBubbleLeftRightIcon,
  PhoneIcon,
  EnvelopeIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import SEO from "../components/common/SEO";

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  const faqCategories = [
    { id: "all", name: "All Questions", icon: "📋", count: 10 },
    { id: "general", name: "General", icon: "ℹ️", count: 2 },
    { id: "courses", name: "Courses", icon: "📚", count: 2 },
    { id: "payment", name: "Payment", icon: "💰", count: 2 },
    { id: "technical", name: "Technical", icon: "⚙️", count: 2 },
    { id: "account", name: "Account", icon: "👤", count: 2 }
  ];

  const faqs = [
    {
      id: 1,
      category: "general",
      question: "What is RN Classes?",
      answer: "RN Classes is an online learning platform that offers expert-led courses in various fields including web development, data science, design, and more. We provide high-quality education to help learners advance their careers."
    },
    {
      id: 2,
      category: "general",
      question: "How do I get started?",
      answer: "Getting started is easy! Simply create a free account, browse our course catalog, and enroll in any course that interests you. You can start learning immediately after enrollment."
    },
    {
      id: 3,
      category: "courses",
      question: "Are the courses self-paced?",
      answer: "Yes, all our courses are self-paced. You can learn at your own speed and access the course materials anytime, anywhere. There are no deadlines or schedules to follow."
    },
    {
      id: 4,
      category: "courses",
      question: "Do I get a certificate after completion?",
      answer: "Yes, upon successfully completing a course, you'll receive a verified certificate that you can share on LinkedIn or add to your resume. All certificates are recognized by industry leaders."
    },
    {
      id: 5,
      category: "payment",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. For enterprise clients, we also offer invoice-based payments."
    },
    {
      id: 6,
      category: "payment",
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 7-day money-back guarantee. If you're not satisfied with a course, you can request a full refund within 7 days of purchase."
    },
    {
      id: 7,
      category: "technical",
      question: "What are the system requirements?",
      answer: "Our platform works on any modern web browser (Chrome, Firefox, Safari, Edge). For the best experience, we recommend a stable internet connection and the latest version of your preferred browser."
    },
    {
      id: 8,
      category: "technical",
      question: "Can I access courses on mobile?",
      answer: "Yes, our platform is fully responsive and works perfectly on smartphones and tablets. You can learn on the go using any mobile device."
    },
    {
      id: 9,
      category: "account",
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' on the login page. We'll send you an email with instructions to reset your password. The link expires in 24 hours for security."
    },
    {
      id: 10,
      category: "account",
      question: "Can I change my email address?",
      answer: "Yes, you can update your email address in your profile settings. We'll send a verification link to your new email address to confirm the change."
    }
  ];

  const toggleItem = (id) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory("all");
  };

  return (
    <>
      <SEO 
        title="FAQ - RN Classes | Frequently Asked Questions"
        description="Find answers to commonly asked questions about our courses, payments, technical requirements, and more."
        keywords="faq, help center, support, frequently asked questions"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section - Updated to match home hero */}
        <section 
          className="relative min-h-[40vh] flex items-center bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
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
                <span className="text-sm font-medium">Help Center</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </span>
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                Find answers to commonly asked questions about our platform
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-2"
          >
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search your question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              )}
            </div>
          </motion.div>
        </section>

        {/* Categories */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-wrap justify-center gap-3">
            {faqCategories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </motion.button>
            ))}
          </div>

          {/* Active Filters */}
          {(searchTerm || activeCategory !== "all") && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex justify-center"
            >
              <div className="bg-white rounded-lg shadow-md p-3 inline-flex items-center gap-3">
                <span className="text-sm text-gray-600">Active filters:</span>
                {activeCategory !== "all" && (
                  <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    Category: {faqCategories.find(c => c.id === activeCategory)?.name}
                    <button
                      onClick={() => setActiveCategory("all")}
                      className="ml-2 hover:text-purple-900"
                    >
                      ×
                    </button>
                  </span>
                )}
                {searchTerm && (
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    Search: "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm("")}
                      className="ml-2 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 underline ml-2"
                >
                  Clear all
                </button>
              </div>
            </motion.div>
          )}
        </section>

        {/* FAQ List */}
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors group"
                    >
                      <span className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
                        {faq.question}
                      </span>
                      <ChevronDownIcon 
                        className={`w-5 h-5 text-gray-500 transition-all duration-300 ${
                          openItems.includes(faq.id) ? 'rotate-180 text-purple-600' : 'group-hover:text-purple-600'
                        }`}
                      />
                    </button>
                    
                    <AnimatePresence>
                      {openItems.includes(faq.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-6 pb-4"
                        >
                          <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                          
                          {/* Related Links */}
                          {faq.category === "payment" && (
                            <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                              <p className="text-sm text-purple-800">
                                💡 For payment-related issues, you can also contact our billing team at 
                                <a href="mailto:billing@rnclasses.com" className="font-medium underline ml-1 hover:text-purple-900">
                                  billing@rnclasses.com
                                </a>
                              </p>
                            </div>
                          )}

                          {faq.category === "technical" && (
                            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                              <p className="text-sm text-blue-800">
                                🔧 Need technical support? Visit our 
                                <a href="/contact" className="font-medium underline ml-1 hover:text-blue-900">
                                  Contact Page
                                </a>
                              </p>
                            </div>
                          )}

                          {faq.category === "account" && (
                            <div className="mt-4 p-4 bg-green-50 rounded-lg">
                              <p className="text-sm text-green-800">
                                👤 Account issues? Check your 
                                <a href="/profile" className="font-medium underline ml-1 hover:text-green-900">
                                  Profile Settings
                                </a>
                              </p>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
                    <MagnifyingGlassIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No questions found</h3>
                    <p className="text-gray-600 mb-6">
                      We couldn't find any questions matching your search criteria.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Clear filters
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Popular Questions Preview */}
        {filteredFaqs.length > 0 && (
          <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <div className="bg-purple-50 rounded-2xl p-8 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quick Help</h3>
              <p className="text-gray-600 mb-4">
                Can't find what you're looking for? Try these popular topics:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {faqs.slice(0, 4).map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => {
                      setSearchTerm(faq.question.split(' ')[0]);
                      setActiveCategory(faq.category);
                    }}
                    className="px-3 py-1 bg-white text-gray-600 rounded-full text-sm hover:bg-purple-600 hover:text-white transition-colors"
                  >
                    {faq.category}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Still Have Questions */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ChatBubbleLeftRightIcon className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:support@rnclasses.com"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <EnvelopeIcon className="w-5 h-5 mr-2" />
                  Email Support
                </a>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition-all duration-300"
                >
                  <PhoneIcon className="w-5 h-5 mr-2" />
                  Call Us
                </a>
              </div>
              <p className="text-sm text-blue-200 mt-4">
                Response time: Within 24 hours
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FAQ;