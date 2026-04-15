import API from "../../api/axiosInstance";

class OTPService {
  // Send OTP via Email
  static async sendEmailOTP(email) {
    try {
      const response = await API.post("/otp/send-email", { email });
      return response.data;
    } catch (error) {
      console.error("Error sending email OTP:", error);
      throw error;
    }
  }

  // Send OTP via Mobile
  static async sendMobileOTP(phone) {
    try {
      const response = await API.post("/otp/send-mobile", { phone });
      return response.data;
    } catch (error) {
      console.error("Error sending mobile OTP:", error);
      throw error;
    }
  }

  // Verify OTP
  static async verifyOTP(identifier, otp, type = 'email') {
    try {
      const uppercaseType = type.toUpperCase();
      const response = await API.post("/otp/verify", { 
        identifier, 
        otp, 
        type: uppercaseType
      });
      return response.data;
    } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
    }
  }
}

export default OTPService;