import React, { useRef } from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import CertificateService from '../../services/certificateService';
import { toast } from 'react-hot-toast';

const CertificateDownload = ({ certificateRef, fileName, children }) => {
  const handleDownload = async () => {
    if (certificateRef?.current) {
      const success = await CertificateService.downloadCertificate(
        certificateRef.current,
        fileName || 'certificate'
      );
      
      if (success) {
        toast.success('Certificate downloaded successfully!');
      }
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
    >
      <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
      {children || 'Download Certificate'}
    </button>
  );
};

export default CertificateDownload;