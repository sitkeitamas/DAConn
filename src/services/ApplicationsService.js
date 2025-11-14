/**
 * Applications Service
 * Handles all application-related API operations
 */

class ApplicationsService {
  /**
   * @param {DreamApplyClient} client - DreamApply client instance
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Submit a new application
   * @param {Object} applicationData - Application data
   * @returns {Promise<Object>} Created application
   */
  async create(applicationData) {
    return this.client.post('/api/applications', { data: applicationData });
  }

  /**
   * Retrieve application by ID
   * @param {string|number} applicationId - Application ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Application data
   */
  async getById(applicationId, options = {}) {
    return this.client.get(`/api/applications/${applicationId}`, { params: options });
  }

  /**
   * List all applications
   * @param {Object} options - Query options (filters, pagination, sorting)
   * @returns {Promise<Object>} List of applications
   */
  async list(options = {}) {
    return this.client.get('/api/applications', { params: options });
  }

  /**
   * Update application details
   * @param {string|number} applicationId - Application ID
   * @param {Object} applicationData - Updated application data
   * @returns {Promise<Object>} Updated application
   */
  async update(applicationId, applicationData) {
    return this.client.put(`/api/applications/${applicationId}`, { data: applicationData });
  }

  /**
   * Partially update application
   * @param {string|number} applicationId - Application ID
   * @param {Object} applicationData - Partial application data
   * @returns {Promise<Object>} Updated application
   */
  async patch(applicationId, applicationData) {
    return this.client.patch(`/api/applications/${applicationId}`, { data: applicationData });
  }

  /**
   * Update application status
   * @param {string|number} applicationId - Application ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated application
   */
  async updateStatus(applicationId, status) {
    return this.client.patch(`/api/applications/${applicationId}`, {
      data: { status }
    });
  }

  /**
   * Delete application
   * @param {string|number} applicationId - Application ID
   * @returns {Promise<Object>} Deletion result
   */
  async delete(applicationId) {
    return this.client.delete(`/api/applications/${applicationId}`);
  }

  /**
   * Withdraw application
   * @param {string|number} applicationId - Application ID
   * @returns {Promise<Object>} Withdrawal result
   */
  async withdraw(applicationId) {
    return this.client.post(`/api/applications/${applicationId}/withdraw`);
  }

  /**
   * Get application documents
   * @param {string|number} applicationId - Application ID
   * @returns {Promise<Object>} List of documents
   */
  async getDocuments(applicationId) {
    return this.client.get(`/api/applications/${applicationId}/documents`);
  }

  /**
   * Get application programs
   * @param {string|number} applicationId - Application ID
   * @returns {Promise<Object>} List of programs
   */
  async getPrograms(applicationId) {
    return this.client.get(`/api/applications/${applicationId}/programs`);
  }
}

module.exports = ApplicationsService;

