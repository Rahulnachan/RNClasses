import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import CertificateService from '../Services/certificateservice';
import { CheckBadgeIcon, XCircleIcon } from '@heroicons/react/24/outline';

const VerifyCertificate = () => {
  const { id } = useParams();
  const [verifying, setVerifying] = useState(true);
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    verifyCertificate();
  }, [id]);

  const verifyCertificate = async () => {
    try {
      const response = await CertificateService.verifyCertificate(id);
      setCertificate(response.certificate);
    } catch (err) {
      setError('Invalid or expired certificate');
    } finally {
      setVerifying(false);
    }
  };

  if (verifying) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          {error ? (
            <>
              <XCircleIcon className="w-20 h-20 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Certificate</h1>
              <p className="text-gray-600">{error}</p>
            </>
          ) : (
            <>
              <CheckBadgeIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Valid Certificate ✓</h1>
              <p className="text-gray-600 mb-4">This certificate is authentic and verified</p>
              
              <div className="bg-purple-50 rounded-xl p-6 text-left">
                <p><span className="font-semibold">Certificate ID:</span> {certificate?.id}</p>
                <p><span className="font-semibold">Student:</span> {certificate?.studentName}</p>
                <p><span className="font-semibold">Course:</span> {certificate?.courseName}</p>
                <p><span className="font-semibold">Issue Date:</span> {new Date(certificate?.issueDate).toLocaleDateString()}</p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyCertificate;