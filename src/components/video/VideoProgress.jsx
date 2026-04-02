import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const VideoProgress = ({ courseId, isDemo = false }) => {
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  
  // Check if this is a demo view from route state or query param
  const isDemoView = isDemo || 
    location.state?.isDemo || 
    new URLSearchParams(location.search).get('demo') === 'true';
  
  useEffect(() => {
    // Only fetch progress if not a demo and user is enrolled
    if (!isDemoView) {
      // Fetch real progress from API
      const fetchProgress = async () => {
        try {
          // const response = await fetch(`/api/courses/${courseId}/progress`);
          // const data = await response.json();
          // setProgress(data.progress);
          
          // For now, just use mock data
          setProgress(45);
        } catch (error) {
          console.error('Error fetching progress:', error);
        }
      };
      
      fetchProgress();
    }
  }, [courseId, isDemoView]);

  // Don't show progress for demo views
  if (isDemoView) {
    return (
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-purple-700">
            Free Demo Preview
          </span>
          <span className="text-xs bg-purple-200 text-purple-700 px-2 py-1 rounded-full">
            10-min preview
          </span>
        </div>
        <p className="text-xs text-purple-600 mt-1">
          Watch this demo to get a taste of the full course
        </p>
      </div>
    );
  }

  // Show progress for enrolled courses
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Your progress</span>
        <span className="text-sm font-semibold text-purple-600">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-purple-600 to-blue-600 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {progress === 100 ? (
        <p className="text-xs text-green-600 mt-2 flex items-center">
          <span className="mr-1">✓</span> Completed! Get your certificate
        </p>
      ) : (
        <p className="text-xs text-gray-500 mt-2">
          Continue where you left off
        </p>
      )}
    </div>
  );
};

export default VideoProgress;