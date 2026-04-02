import { motion } from "framer-motion";
import SEO from "../components/common/SEO";

const PrivacyPolicy = () => {
  const lastUpdated = "February 23, 2024";

  return (
    <>
      <SEO 
        title="Privacy Policy - RN Classes"
        description="Read our privacy policy to understand how we collect, use, and protect your personal information."
        keywords="privacy policy, data protection, GDPR, privacy"
      />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
            <p className="text-gray-500 mb-8">Last Updated: {lastUpdated}</p>

            <div className="prose prose-blue max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  RN Classes ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
                <h3 className="text-xl font-medium text-gray-900 mb-2">Personal Data</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  While using our services, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Phone number</li>
                  <li>Address, State, Province, ZIP/Postal code</li>
                  <li>Payment information</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-900 mb-2">Usage Data</h3>
                <p className="text-gray-600 leading-relaxed">
                  We may also collect information on how our services are accessed and used. This Usage Data may include information such as your computer's Internet Protocol address, browser type, browser version, the pages of our service that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We use the collected data for various purposes:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>To provide and maintain our services</li>
                  <li>To notify you about changes to our services</li>
                  <li>To allow you to participate in interactive features</li>
                  <li>To provide customer support</li>
                  <li>To gather analysis or valuable information to improve our services</li>
                  <li>To monitor the usage of our services</li>
                  <li>To detect, prevent and address technical issues</li>
                  <li>To provide you with news and offers</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
                <p className="text-gray-600 leading-relaxed">
                  The security of your data is important to us. We implement appropriate technical and organizational security measures to protect your personal information. However, remember that no method of transmission over the Internet or method of electronic storage is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Your Rights</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Rectify inaccurate personal data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing your personal data</li>
                  <li>Data portability</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
                <p className="text-gray-600 leading-relaxed">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">Email: privacy@rnclasses.com</p>
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

export default PrivacyPolicy;