import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import EmailService from '../..//components/Services/email';
import { toast } from 'react-hot-toast';

const EmailSubscribe = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email');
      return;
    }

    setLoading(true);
    try {
      await EmailService.subscribeToNewsletter(email);
      setSubscribed(true);
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
    } catch (error) {
      toast.error('Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
      {subscribed ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <CheckCircleIcon className="w-16 h-16 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
          <p className="text-purple-100">
            You've been successfully subscribed to our newsletter.
          </p>
        </motion.div>
      ) : (
        <>
          <div className="text-center mb-6">
            <EnvelopeIcon className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-purple-100">
              Get the latest courses, offers, and learning resources delivered to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          <p className="text-xs text-purple-200 text-center mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </>
      )}
    </div>
  );
};

export default EmailSubscribe;