import React, { useState } from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';

const VideoPlayer = ({ videoUrl, title, isDemo = false, autoplay = false }) => {
  const [isPlaying, setIsPlaying] = useState(autoplay);

  // Clean YouTube URL to remove ads and tracking
  const getCleanYouTubeUrl = (url) => {
    if (!url) return '';
    
    // Extract video ID
    let videoId = '';
    if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0];
    } else if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    }
    
    if (!videoId) return url;
    
    // Use nocookie domain and disable ads/related videos
    return `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1&showinfo=0`;
  };

  // For YouTube videos
  if (videoUrl?.includes('youtube') || videoUrl?.includes('youtu.be')) {
    const cleanUrl = getCleanYouTubeUrl(videoUrl);
    
    return (
      <div className="relative bg-black rounded-lg overflow-hidden">
        <iframe
          src={cleanUrl}
          title={title}
          className="w-full aspect-video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        ></iframe>
        
        {/* Demo Badge */}
        {isDemo && (
          <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg z-10">
            <span className="mr-1">🔥</span> 10-min Demo
          </div>
        )}
      </div>
    );
  }

  // For regular video files (MP4, etc.)
  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      <video
        src={videoUrl}
        className="w-full aspect-video"
        controls
        autoPlay={autoplay}
      />
      
      {/* Demo Badge */}
      {isDemo && (
        <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center shadow-lg">
          <span className="mr-1">🔥</span> 10-min Demo
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;