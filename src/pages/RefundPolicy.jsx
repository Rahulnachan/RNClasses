import { motion } from "framer-motion";
import SEO from "../components/common/SEO";

const RefundPolicy = () => {
  const lastUpdated = "February 23, 2024";

  return (
    <>
      <SEO 
        title="Refund Policy - RN Classes"
        description="Learn about our refund policy and how we handle course refunds and cancellations."
        keywords="refund policy, money back guarantee, cancellation"
      />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Refund Policy</h1>
            <p className="text-gray-500 mb-8">Last Updated: {lastUpdated}</p>

            <div className="prose prose-blue max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. 7-Day Money-Back Guarantee</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We offer a 7-day money-back guarantee for most of our courses. If you're not satisfied with your purchase, you can request a full refund within 7 days of enrollment.
                </p>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                  <p className="text-blue-700 font-medium">Important:</p>
                  <p className="text-blue-600 text-sm">Refunds are processed within 5-7 business days and credited to your original payment method.</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Eligibility for Refund</h2>
                <p className="text-gray-600 leading-relaxed mb-4">You are eligible for a refund if:</p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                  <li>You request the refund within 7 days of enrollment</li>
                  <li>You have completed less than 30% of the course content</li>
                  <li>The course is not marked as "non-refundable" on its page</li>
                  <li>You have not violated our terms of service</li>
                </ul>
                <p className="text-gray-600 leading-relaxed">
                  Note: Some courses may have different refund policies, which will be clearly stated on the course page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How to Request a Refund</h2>
                <p className="text-gray-600 leading-relaxed mb-4">To request a refund, please follow these steps:</p>
                <ol className="list-decimal pl-6 text-gray-600 space-y-2">
                  <li>Log in to your RN Classes account</li>
                  <li>Go to "My Courses" in your dashboard</li>
                  <li>Find the course you want to refund</li>
                  <li>Click on "Request Refund" button</li>
                  <li>Fill out the refund request form</li>
                  <li>Submit your request</li>
                </ol>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Alternatively, you can email us at <a href="mailto:refunds@rnclasses.com" className="text-blue-600 hover:underline">refunds@rnclasses.com</a> with your course details and reason for refund.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Refund Processing Time</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Once your refund request is approved, please allow:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>5-7 business days for credit card refunds</li>
                  <li>3-5 business days for PayPal refunds</li>
                  <li>7-10 business days for bank transfers</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Non-Refundable Items</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The following are not eligible for refund:
                </p>
                <ul className="list-disc pl-6 text-gray-600 space-y-2">
                  <li>Courses marked as "non-refundable" or "special offer"</li>
                  <li>Courses purchased more than 7 days ago</li>
                  <li>Courses where more than 30% of content has been accessed</li>
                  <li>Subscription fees for past months</li>
                  <li>Certificate issuance fees</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Course Cancellations</h2>
                <p className="text-gray-600 leading-relaxed">
                  We reserve the right to cancel or reschedule courses. In such cases, you will be notified in advance and offered either a full refund or enrollment in an alternative course.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact for Refund Issues</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you have any issues with your refund, please contact our support team:
                </p>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-700">Email: refunds@rnclasses.com</p>
                  <p className="text-gray-700">Phone: +91 98765 43210</p>
                  <p className="text-gray-700">Support Hours: Mon-Fri, 9am-6pm IST</p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default RefundPolicy;