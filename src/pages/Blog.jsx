import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  CalendarIcon, 
  UserIcon, 
  ChatBubbleLeftIcon,
  MagnifyingGlassIcon,
  TagIcon,
  ClockIcon,
  ArrowRightIcon
} from "@heroicons/react/24/outline";
import SEO from "../components/common/SEO";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState(null);

  useEffect(() => {
    // Simulate fetching blog posts
    setTimeout(() => {
      setBlogPosts([
        {
          id: 1,
          title: "10 Tips to Master Web Development in 2024",
          excerpt: "Learn the essential skills and tools needed to become a professional web developer...",
          content: "Full content here...",
          author: "Sarah Johnson",
          authorImage: "https://images.unsplash.com/photo-1494790108777-2f9bdb7a7d9e",
          category: "Development",
          date: "2024-02-15",
          readTime: "5 min read",
          comments: 12,
          image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
          tags: ["Web Development", "JavaScript", "Career"]
        },
        {
          id: 2,
          title: "The Future of Data Science: Trends to Watch",
          excerpt: "Explore the latest trends and technologies shaping the future of data science...",
          author: "Michael Chen",
          authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          category: "Data Science",
          date: "2024-02-10",
          readTime: "7 min read",
          comments: 8,
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
          tags: ["Data Science", "AI", "Machine Learning"]
        },
        {
          id: 3,
          title: "UI/UX Design Principles Every Designer Should Know",
          excerpt: "Master the fundamental principles of user interface and user experience design...",
          author: "Emily Rodriguez",
          authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
          category: "Design",
          date: "2024-02-05",
          readTime: "6 min read",
          comments: 15,
          image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
          tags: ["UI/UX", "Design", "Figma"]
        },
        {
          id: 4,
          title: "Digital Marketing Strategies That Work in 2024",
          excerpt: "Discover the most effective digital marketing strategies to grow your business...",
          author: "Lisa Thompson",
          authorImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
          category: "Marketing",
          date: "2024-02-01",
          readTime: "6 min read",
          comments: 7,
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
          tags: ["Marketing", "SEO", "Social Media"]
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const categories = [
    { id: "all", name: "All Posts", count: blogPosts.length },
    { id: "development", name: "Development", count: blogPosts.filter(p => p.category === "Development").length },
    { id: "data science", name: "Data Science", count: blogPosts.filter(p => p.category === "Data Science").length },
    { id: "design", name: "Design", count: blogPosts.filter(p => p.category === "Design").length },
    { id: "marketing", name: "Marketing", count: blogPosts.filter(p => p.category === "Marketing").length }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || 
                           post.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    
    // Simulate newsletter signup
    setNewsletterStatus("success");
    setNewsletterEmail("");
    
    // Reset status after 3 seconds
    setTimeout(() => setNewsletterStatus(null), 3000);
  };

  const popularTags = [...new Set(blogPosts.flatMap(post => post.tags))].slice(0, 8);

  return (
    <>
      <SEO 
        title="Blog - RN Classes | Learn Today, Lead Tomorrow"
        description="Stay updated with the latest trends in technology, programming, and education through our expert-written blog posts."
        keywords="tech blog, programming tips, learning resources, career advice"
      />

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section - Updated to match home hero style */}
        <section 
          className="relative min-h-[40vh] flex items-center bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
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
                <span className="text-sm font-medium">Latest Insights & Tutorials</span>
              </motion.div>

              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Our Blog
                </span>
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                Insights, tutorials, and news from our expert instructors
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filter */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <div className="bg-white rounded-xl shadow-xl p-6">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles by title, content, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                    <span className="ml-2 text-xs opacity-75">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters */}
            {(searchTerm || selectedCategory !== "all") && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>Active filters:</span>
                  {selectedCategory !== "all" && (
                    <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
                      Category: {selectedCategory}
                      <button
                        onClick={() => setSelectedCategory("all")}
                        className="ml-2 hover:text-purple-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {searchTerm && (
                    <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                      Search: "{searchTerm}"
                      <button
                        onClick={() => setSearchTerm("")}
                        className="ml-2 hover:text-blue-900"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                    <div className="h-48 bg-gray-300"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -10 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <Link to={`/blog/${post.id}`} className="block">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <span className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {new Date(post.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </span>
                          <span className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1" />
                            {post.readTime}
                          </span>
                        </div>

                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                          {post.title}
                        </h2>

                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img 
                              src={post.authorImage} 
                              alt={post.author}
                              className="w-8 h-8 rounded-full object-cover mr-2"
                            />
                            <span className="text-sm text-gray-700">{post.author}</span>
                          </div>
                          <span className="text-sm text-gray-500 flex items-center">
                            {post.comments} comments
                          </span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                          {post.tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              <TagIcon className="w-3 h-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                          {post.tags.length > 3 && (
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              +{post.tags.length - 3}
                            </span>
                          )}
                        </div>

                        {/* Read More Link */}
                        <div className="mt-4 flex items-center text-purple-600 font-medium text-sm group-hover:text-purple-700">
                          Read Article
                          <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {!loading && filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
                <MagnifyingGlassIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any articles matching your search criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                  Clear filters
                </button>
              </div>
            </motion.div>
          )}
        </section>

        {/* Popular Tags */}
        {popularTags.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Topics</h2>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag, index) => (
                <button
                  key={index}
                  onClick={() => setSearchTerm(tag)}
                  className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-full text-sm hover:bg-purple-50 hover:border-purple-300 hover:text-purple-600 transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter Section */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
                Get the latest articles, tutorials, and resources delivered straight to your inbox.
              </p>
              
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button 
                  type="submit"
                  className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Subscribe
                </button>
              </form>

              {newsletterStatus === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-green-300"
                >
                  ✅ Thanks for subscribing! Check your email for confirmation.
                </motion.p>
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;