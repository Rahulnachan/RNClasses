import API from "./axiosInstance";

export const createOrder = async (amount, courseId, currency = "INR") => {
  try {
    const response = await API.post("/payment/create-order", {
      amount,
      courseId,
      currency
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const response = await API.post("/payment/verify", paymentData);
    return response.data;
  } catch (error) {
    console.error("Error verifying payment:", error);
    throw error;
  }
};

export const getPaymentHistory = async () => {
  try {
    const response = await API.get("/payment/history");
    return response.data;
  } catch (error) {
    console.error("Error fetching payment history:", error);
    throw error;
  }
};

export const applyCoupon = async (code, amount) => {
  try {
    const response = await API.post("/payment/apply-coupon", { code, amount });
    return response.data;
  } catch (error) {
    console.error("Error applying coupon:", error);
    throw error;
  }
};