/**
 * Communications Service
 * Handles all communication-related API operations
 */

class CommunicationsService {
  /**
   * @param {DreamApplyClient} client - DreamApply client instance
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Send a message to an applicant
   * @param {Object} messageData - Message data
   * @param {string|number} messageData.applicantId - Applicant ID
   * @param {string} messageData.subject - Message subject
   * @param {string} messageData.body - Message body
   * @param {string} messageData.type - Message type (email, notification, etc.)
   * @returns {Promise<Object>} Sent message
   */
  async sendMessage(messageData) {
    return this.client.post('/api/communications', { data: messageData });
  }

  /**
   * Send email to applicant
   * @param {string|number} applicantId - Applicant ID
   * @param {Object} emailData - Email data
   * @returns {Promise<Object>} Sent email
   */
  async sendEmail(applicantId, emailData) {
    return this.client.post('/api/communications/email', {
      data: {
        applicantId,
        ...emailData,
        type: 'email'
      }
    });
  }

  /**
   * Send notification to applicant
   * @param {string|number} applicantId - Applicant ID
   * @param {Object} notificationData - Notification data
   * @returns {Promise<Object>} Sent notification
   */
  async sendNotification(applicantId, notificationData) {
    return this.client.post('/api/communications/notifications', {
      data: {
        applicantId,
        ...notificationData,
        type: 'notification'
      }
    });
  }

  /**
   * Retrieve communication by ID
   * @param {string|number} communicationId - Communication ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Communication data
   */
  async getById(communicationId, options = {}) {
    return this.client.get(`/api/communications/${communicationId}`, { params: options });
  }

  /**
   * Get communication history for an applicant
   * @param {string|number} applicantId - Applicant ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Communication history
   */
  async getHistory(applicantId, options = {}) {
    return this.client.get(`/api/applicants/${applicantId}/communications`, {
      params: options
    });
  }

  /**
   * List all communications
   * @param {Object} options - Query options (filters, pagination, sorting)
   * @returns {Promise<Object>} List of communications
   */
  async list(options = {}) {
    return this.client.get('/api/communications', { params: options });
  }
}

module.exports = CommunicationsService;

