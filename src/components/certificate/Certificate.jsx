import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { DocumentArrowDownIcon, ShareIcon } from '@heroicons/react/24/outline';
import CertificateService from '../../components/Services/certificateservice';
import { toast } from 'react-hot-toast';

// Helper function to format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const Certificate = ({ user, course, certificateData, onDownload }) => {
  const certificateRef = useRef(null);
  const currentDate = formatDate(new Date());

  const handleDownload = async () => {
    try {
      if (certificateRef.current) {
        const loadingToast = toast.loading('Generating certificate...');
        
        const success = await CertificateService.downloadCertificate(
          certificateRef.current,
          `${user?.name || 'Student'}-${course?.title || 'Course'}-certificate`
        );
        
        toast.dismiss(loadingToast);
        
        if (success) {
          toast.success('✅ Certificate downloaded successfully!');
          onDownload?.();
        }
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download certificate');
    }
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/verify/${certificateData?.id || 'certificate'}`;
    
    if (navigator.share) {
      navigator.share({
        title: `My ${course?.title} Certificate`,
        text: `I just completed ${course?.title} at RN Classes!`,
        url: shareUrl
      }).catch(() => {
        navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      toast.success('Verification link copied to clipboard!');
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-3xl">
      {/* Certificate Preview */}
      <div
        ref={certificateRef}
        className="bg-white rounded-2xl shadow-2xl p-12 border-8 border-double border-purple-200 relative overflow-hidden"
        style={{ minWidth: '800px' }}
      >
        {/* FIXED: Background decoration with explicit motion props */}
        <div className="absolute inset-0 opacity-5">
          <motion.div 
            className="absolute top-0 left-0 w-64 h-64 bg-purple-600 rounded-full -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0 }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-64 h-64 bg-blue-600 rounded-full translate-x-1/2 translate-y-1/2"
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0 }}
          />
        </div>

        <div className="relative text-center">
          {/* Logo */}
          <div className="mb-6">
            <motion.div 
              className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto"
              initial={{ scale: 1 }}
              animate={{ scale: 1 }}
            >
              <span className="text-white text-2xl font-bold">RN</span>
            </motion.div>
          </div>

          {/* Title */}
          <h1 className="text-5xl font-bold text-gray-900 mb-2">Certificate of Completion</h1>
          <p className="text-gray-500 mb-8">This is to certify that</p>

          {/* Student Name */}
          <h2 className="text-4xl font-bold text-purple-600 mb-4">
            {user?.name || 'Student Name'}
          </h2>

          {/* Course Info */}
          <p className="text-xl text-gray-600 mb-2">has successfully completed the course</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            {course?.title || 'Course Title'}
          </h3>

          {/* Details */}
          <div className="flex justify-center items-center gap-8 mb-8">
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-semibold">{currentDate}</p>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-semibold">{course?.duration || '10 weeks'}</p>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div>
              <p className="text-sm text-gray-500">Grade</p>
              <p className="font-semibold">A+</p>
            </div>
          </div>

          {/* Signatures and QR Code */}
          <div className="flex justify-between items-end mt-12">
            <div className="text-center">
              <div className="w-40 h-px bg-gray-300 mb-2"></div>
              <p className="text-sm text-gray-500">Instructor</p>
              <p className="font-semibold">{course?.instructor?.name || 'Instructor'}</p>
            </div>

            <div className="flex flex-col items-center">
              <QRCodeSVG
                value={`${window.location.origin}/verify/${certificateData?.id || 'certificate'}`}
                size={80}
                level="H"
              />
              <p className="text-xs text-gray-500 mt-2">Scan to verify</p>
            </div>

            <div className="text-center">
              <div className="w-40 h-px bg-gray-300 mb-2"></div>
              <p className="text-sm text-gray-500">Director</p>
              <p className="font-semibold">RN Classes</p>
            </div>
          </div>

          {/* Certificate ID */}
          <p className="text-xs text-gray-400 mt-8">
            Certificate ID: {certificateData?.id || 'CERT-' + Date.now()}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDownload}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all flex items-center"
        >
          <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
          Download Certificate
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center"
        >
          <ShareIcon className="w-5 h-5 mr-2" />
          Share
        </motion.button>
      </div>
    </div>
  );
};

export default Certificate;