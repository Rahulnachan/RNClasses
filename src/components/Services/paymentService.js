import API from "../..//api/axiosInstance";

class PaymentService {
  // Create Razorpay order
  static async createOrder(amount, courseId) {
    try {
      const response = await API.post("/payment/create-order", {
        amount,
        courseId,
        currency: "INR"
      });
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  }

  // Verify payment
  static async verifyPayment(paymentData) {
    try {
      const response = await API.post("/payment/verify", paymentData);
      return response.data;
    } catch (error) {
      console.error("Error verifying payment:", error);
      throw error;
    }
  }

  // Get payment history
  static async getPaymentHistory() {
    try {
      const response = await API.get("/payment/history");
      return response.data;
    } catch (error) {
      console.error("Error fetching payment history:", error);
      throw error;
    }
  }

  // Apply coupon
  static async applyCoupon(code, amount) {
    try {
      const response = await API.post("/payment/apply-coupon", { code, amount });
      return response.data;
    } catch (error) {
      console.error("Error applying coupon:", error);
      throw error;
    }
  }
}

export default PaymentService;