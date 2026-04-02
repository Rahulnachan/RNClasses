import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChatBubbleLeftIcon,
  HeartIcon,
  EyeIcon,
  ArrowLeftIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { toast } from 'react-hot-toast';

const ForumPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching post data
    setTimeout(() => {
      setPost({
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
        createdAt: "2024-01-15T10:30:00Z",
        isLiked: false
      });
      
      setComments([
        {
          id: 1,
          content: "I highly recommend the official React documentation and the 'React - The Complete Guide' course on Udemy!",
          author: {
            name: "Sarah Johnson",
            avatar: "https://images.unsplash.com/photo-1494790108777-2f9bdb7a7d9e",
            role: "Developer"
          },
          likes: 12,
          createdAt: "2024-01-15T11:30:00Z"
        },
        {
          id: 2,
          content: "FreeCodeCamp's React section is also really good for beginners. It's hands-on and practical.",
          author: {
            name: "Mike Wilson",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
            role: "Student"
          },
          likes: 8,
          createdAt: "2024-01-15T12:45:00Z"
        }
      ]);
      
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleLike = () => {
    setPost({
      ...post,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1,
      isLiked: !post.isLiked
    });
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    const comment = {
      id: comments.length + 1,
      content: newComment,
      author: {
        name: "Current User",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
        role: "Student"
      },
      likes: 0,
      createdAt: new Date().toISOString()
    };

    setComments([comment, ...comments]);
    setNewComment('');
    toast.success('Comment added!');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/forum"
          className="inline-flex items-center text-gray-600 hover:text-purple-600 mb-6"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Forum
        </Link>

        {/* Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-6"
        >
          <div className="flex items-start space-x-4 mb-6">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span className="font-medium text-gray-900">{post.author.name}</span>
                <span>•</span>
                <span>{post.author.role}</span>
                <span>•</span>
                <span>{formatDate(post.createdAt)}</span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">{post.content}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-6">
              <button
                onClick={handleLike}
                className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
              >
                {post.isLiked ? (
                  <HeartIconSolid className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
                <span>{post.likes} likes</span>
              </button>
              <div className="flex items-center space-x-2 text-gray-500">
                <EyeIcon className="w-5 h-5" />
                <span>{post.views} views</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Comments Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Comments ({comments.length})
          </h2>

          {/* Add Comment */}
          <div className="flex space-x-4 mb-8">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              alt="Current User"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleAddComment}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <PaperAirplaneIcon className="w-4 h-4 mr-2" />
                  Post Comment
                </button>
              </div>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map(comment => (
              <div key={comment.id} className="flex space-x-4">
                <img
                  src={comment.author.avatar}
                  alt={comment.author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">{comment.author.name}</span>
                        <span className="text-xs text-gray-500">{comment.author.role}</span>
                      </div>
                      <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForumPost;