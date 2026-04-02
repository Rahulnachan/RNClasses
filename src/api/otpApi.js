import API from "./axiosInstance";

export const sendEmailOTP = async (email) => {
  try {
    const response = await API.post("/otp/send-email", { email });
    return response.data;
  } catch (error) {
    console.error("Error sending email OTP:", error);
    throw error;
  }
};

export const sendMobileOTP = async (phone) => {
  try {
    const response = await API.post("/otp/send-mobile", { phone });
    return response.data;
  } catch (error) {
    console.error("Error sending mobile OTP:", error);
    throw error;
  }
};

export const verifyOTP = async (identifier, otp, type) => {
  try {
    const response = await API.post("/otp/verify", { identifier, otp, type });
    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};