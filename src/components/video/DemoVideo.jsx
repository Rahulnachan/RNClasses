import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ClockIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import VideoPlayer from '../video/VideoPlayer';
import OTPVerification from '../common/OTPVerification';
import { toast } from 'react-hot-toast';

const DemoVideoPage = () => {
  const { id } = useParams();
  const [showVerification, setShowVerification] = useState(true);
  const [verified, setVerified] = useState(false);

  // This should match the courses in your Demo.jsx
  const demoCourse = {
    id: parseInt(id),
    title: "UI/UX Design Preview",
    description: "Learn design principles and Figma basics",
    duration: "10 min",
    videoUrl: "https://www.youtube.com/watch?v=your-demo-video-id-3",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
    instructor: "Emily Rodriguez",
    topics: ["Design Thinking", "Figma Tools", "Prototyping"]
  };

  const handleVerify = () => {
    setVerified(true);
    setShowVerification(false);
    toast.success('Access granted! Your demo is starting...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/demo" className="flex items-center text-purple-600 hover:text-purple-700">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Demos
          </Link>
        </div>
      </div>

      {showVerification ? (
        <div className="max-w-md mx-auto mt-20">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Verify to Watch Demo</h2>
            <p className="text-gray-600 mb-6">
              Please verify your email to access the free demo for:
              <br />
              <span className="font-semibold text-purple-600">{demoCourse.title}</span>
            </p>
            <OTPVerification
              type="email"
              onVerify={handleVerify}
              onClose={() => window.history.back()}
            />
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Course Info - NO PROGRESS BAR HERE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6"
          >
            <div className="relative h-64">
              <img
                src={demoCourse.thumbnail}
                alt={demoCourse.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-3xl font-bold mb-2">{demoCourse.title}</h1>
                <p className="text-lg text-gray-200">{demoCourse.description}</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-6 mb-4">
                <span className="flex items-center text-gray-600">
                  <ClockIcon className="w-5 h-5 mr-2 text-purple-600" />
                  {demoCourse.duration}
                </span>
                <span className="text-gray-600">Instructor: {demoCourse.instructor}</span>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">What you'll learn in this demo:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {demoCourse.topics.map((topic, i) => (
                    <div key={i} className="flex items-center text-gray-600">
                      <AcademicCapIcon className="w-5 h-5 text-purple-600 mr-2" />
                      {topic}
                    </div>
                  ))}
                </div>
              </div>

              {/* Video Player - NO PROGRESS DISPLAYED */}
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <VideoPlayer
                  videoUrl={demoCourse.videoUrl}
                  title={demoCourse.title}
                />
              </div>

              {/* Call to Action */}
              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">Enjoyed the demo? Enroll in the full course!</p>
                <Link
                  to={`/courses/${demoCourse.id}`}
                  className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Enroll in Full Course
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DemoVideoPage;