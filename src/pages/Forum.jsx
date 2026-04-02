import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ChatBubbleLeftIcon, 
  HeartIcon,
  EyeIcon,
  ArrowPathIcon,
  PlusCircleIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { toast } from 'react-hot-toast';

// Mock data for forum posts
const mockPosts = [
  {
    id: 1,
    title: "Best resources for learning React?",
    content: "I just started learning React and I'm looking for recommendations on the best tutorials, books, or courses. Any suggestions?",
    author: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      role: "Student"
    },
    category: "Web Development",
    tags: ["React", "JavaScript", "Beginner"],
    likes: 24,
    views: 156,
    replies: 12,
    createdAt: "2024-01-15T10:30:00Z",
    isLiked: false,
    isPinned: true
  },
  {
    id: 2,
    title: "Data Science Career Path - Need Advice",
    content: "I'm considering switching to data science. What skills should I learn first? Is Python enough to start?",
    author: {
      name: "Sarah Smith",
      avatar: "https://images.unsplash.com/photo-1494790108777-2f9bdb7a7d9e",
      role: "Professional"
    },
    category: "Data Science",
    tags: ["Python", "Career", "Machine Learning"],
    likes: 18,
    views: 98,
    replies: 8,
    createdAt: "2024-01-14T15:45:00Z",
    isLiked: true,
    isPinned: false
  },
  {
    id: 3,
    title: "UI/UX Design Portfolio Review",
    content: "I've just finished my first portfolio and would love some feedback from experienced designers. Happy to exchange reviews!",
    author: {
      name: "Emily Chen",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
      role: "Student"
    },
    category: "Design",
    tags: ["UI/UX", "Portfolio", "Feedback"],
    likes: 32,
    views: 203,
    replies: 15,
    createdAt: "2024-01-13T09:15:00Z",
    isLiked: false,
    isPinned: false
  },
  {
    id: 4,
    title: "JavaScript Promises vs Async/Await",
    content: "Can someone explain the difference between promises and async/await? When should I use each?",
    author: {
      name: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      role: "Student"
    },
    category: "Web Development",
    tags: ["JavaScript", "Async", "Beginner"],
    likes: 45,
    views: 312,
    replies: 23,
    createdAt: "2024-01-12T14:20:00Z",
    isLiked: false,
    isPinned: false
  }
];

const categories = [
  "All Categories",
  "Web Development",
  "Data Science",
  "Design",
  "Mobile Development",
  "Career Advice",
  "Study Groups",
  "General Discussion"
];

const Forum = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'General Discussion',
    tags: ''
  });
  const [loading, setLoading] = useState(false);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const post = {
        id: posts.length + 1,
        ...newPost,
        tags: newPost.tags.split(',').map(tag => tag.trim()),
        author: {
          name: "Current User",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
          role: "Student"
        },
        likes: 0,
        views: 0,
        replies: 0,
        createdAt: new Date().toISOString(),
        isLiked: false,
        isPinned: false
      };
      
      setPosts([post, ...posts]);
      setShowNewPostModal(false);
      setNewPost({ title: '', content: '', category: 'General Discussion', tags: '' });
      setLoading(false);
      toast.success('Post created successfully!');
    }, 1000);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All Categories' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-purple-600">
                <ArrowLeftIcon className="w-5 h-5" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Discussion Forum</h1>
            </div>
            <button
              onClick={() => setShowNewPostModal(true)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <PlusCircleIcon className="w-5 h-5 mr-2" />
              New Post
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <FunnelIcon className="w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Posts List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-6"
            >
              {post.isPinned && (
                <div className="flex items-center mb-3 text-yellow-600">
                  <span className="text-xs font-semibold bg-yellow-100 px-2 py-1 rounded">📌 PINNED</span>
                </div>
              )}
              
              <div className="flex items-start space-x-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                
                <div className="flex-1">
                  <Link to={`/forum/post/${post.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                      {post.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 mt-1 line-clamp-2">{post.content}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="font-medium text-gray-900">{post.author.name}</span>
                      <span>•</span>
                      <span>{post.author.role}</span>
                      <span>•</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                      >
                        {post.isLiked ? (
                          <HeartIconSolid className="w-5 h-5 text-red-500" />
                        ) : (
                          <HeartIcon className="w-5 h-5" />
                        )}
                        <span className="text-sm">{post.likes}</span>
                      </button>
                      
                      <div className="flex items-center space-x-1 text-gray-500">
                        <EyeIcon className="w-5 h-5" />
                        <span className="text-sm">{post.views}</span>
                      </div>
                      
                      <div className="flex items-center space-x-1 text-gray-500">
                        <ChatBubbleLeftIcon className="w-5 h-5" />
                        <span className="text-sm">{post.replies}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 bg-white rounded-xl"
            >
              <ChatBubbleLeftIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-500">Try adjusting your search or filter</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {showNewPostModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
            onClick={() => setShowNewPostModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Create New Post</h2>
                  <button
                    onClick={() => setShowNewPostModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter post title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {categories.filter(c => c !== 'All Categories').map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      rows="6"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Write your post content..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={newPost.tags}
                      onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="react, javascript, help"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      onClick={() => setShowNewPostModal(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreatePost}
                      disabled={loading}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center"
                    >
                      {loading ? (
                        <>
                          <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        'Create Post'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Forum;