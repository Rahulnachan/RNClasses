import API from "../../api/axiosInstance";
import { toast } from "react-hot-toast";

class EmailService {
  static async sendWelcomeEmail(userEmail, userName) {
    try {
      const response = await API.post("/email/welcome", {
        email: userEmail,
        name: userName
      });
      return response.data;
    } catch (error) {
      console.error("Error sending welcome email:", error);
      throw error;
    }
  }

  static async sendEnrollmentEmail(userEmail, courseName) {
    try {
      const response = await API.post("/email/enrollment", {
        email: userEmail,
        course: courseName
      });
      return response.data;
    } catch (error) {
      console.error("Error sending enrollment email:", error);
      throw error;
    }
  }

  static async sendPaymentReceipt(userEmail, paymentDetails) {
    try {
      const response = await API.post("/email/receipt", {
        email: userEmail,
        ...paymentDetails
      });
      return response.data;
    } catch (error) {
      console.error("Error sending receipt:", error);
      throw error;
    }
  }

  static async subscribeToNewsletter(email) {
    try {
      const response = await API.post("/newsletter/subscribe", { email });
      toast.success("Successfully subscribed to newsletter!");
      return response.data;
    } catch (error) {
      toast.error("Subscription failed");
      throw error;
    }
  }
}

export default EmailService;