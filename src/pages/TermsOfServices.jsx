import { motion } from "framer-motion";
import SEO from "../components/common/SEO";

const TermsOfService = () => {
  const lastUpdated = "February 23, 2024";

  return (
    <>
      <SEO 
        title="Terms of Service - RN Classes"
        description="Read our terms of service to understand the rules and guidelines for using our platform."
        keywords="terms of service, terms and conditions, legal"
      />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
            <p className="text-gray-500 mb-8">Last Updated: {lastUpdated}</p>

            <div className="prose prose-blue max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  By accessing or using RN Classes ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  RN Classes provides an online learning platform that offers courses, tutorials, and educational content in various fields including web development, data science, design, and more.
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Access to course materials and content</li>
                  <li>Interaction with instructors and other students</li>
                  <li>Certificates of completion for eligible courses</li>
                  <li>Progress tracking and learning analytics</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Accounts</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  To access certain features of the Platform, you may be required to create an account. You are responsible for:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>Providing accurate and complete information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Payment Terms</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Some courses and features may require payment. By making a purchase, you agree to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Pay all fees and applicable taxes</li>
                  <li>Provide accurate payment information</li>
                  <li>Authorize us to charge your selected payment method</li>
                  <li>Accept our refund policy as described separately</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Intellectual Property</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  All content on the Platform, including courses, videos, text, graphics, and logos, is the property of RN Classes or its content providers and is protected by copyright and other intellectual property laws.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  You may not reproduce, distribute, modify, or create derivative works of any content without our express written permission.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. User Conduct</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Upload or transmit harmful code or materials</li>
                  <li>Attempt to gain unauthorized access to the Platform</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Share account credentials with others</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Termination</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to terminate or suspend your account and access to the Platform at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users or the Platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Disclaimer of Warranties</h2>
                <p className="text-gray-600 leading-relaxed">
                  The Platform is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee that the Platform will be uninterrupted, secure, or error-free.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
                <p className="text-gray-600 leading-relaxed">
                  To the maximum extent permitted by law, RN Classes shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to Terms</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may modify these Terms at any time. We will notify you of any material changes by posting the new Terms on this page and updating the "Last Updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Information</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">Email: legal@rnclasses.com</p>
                  <p className="text-gray-700">Phone: +91 98765 43210</p>
                  <p className="text-gray-700">Address: 123 Education Street, Mumbai, India</p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;