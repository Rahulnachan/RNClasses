import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

class CertificateService {
  /**
   * Generate certificate data (mock API call)
   */
  static async generateCertificate(courseId, userId) {
    // Simulate API call
    return {
      data: {
        id: `CERT-${Date.now()}-${courseId}`,
        courseId,
        userId,
        issuedAt: new Date().toISOString()
      }
    };
  }

  /**
   * Download certificate as PDF
   * @param {HTMLElement} element - The certificate element to capture
   * @param {string} filename - Name of the file
   */
  static async downloadCertificate(element, filename) {
    try {
      if (!element) {
        throw new Error('Certificate element not found');
      }

      // Wait for fonts to load
      await document.fonts.ready;

      // Capture the certificate as canvas with high quality
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better quality
        backgroundColor: '#ffffff',
        logging: false,
        allowTaint: false,
        useCORS: true,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height]
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      
      // Download PDF
      pdf.save(`${filename || 'certificate'}.pdf`);

      return true;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }

  /**
   * Verify certificate by ID
   */
  static async verifyCertificate(certificateId) {
    // This would be an API call in production
    return {
      valid: true,
      certificate: {
        id: certificateId,
        studentName: 'John Doe',
        courseName: 'Sample Course',
        issueDate: new Date().toISOString()
      }
    };
  }
}

export default CertificateService;