/**
 * Applicants Service
 * Handles all applicant-related API operations
 */

class ApplicantsService {
  /**
   * @param {DreamApplyClient} client - DreamApply client instance
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Create a new applicant
   * @param {Object} applicantData - Applicant data
   * @returns {Promise<Object>} Created applicant
   */
  async create(applicantData) {
    return this.client.post('/api/applicants', { data: applicantData });
  }

  /**
   * Retrieve applicant by ID
   * @param {string|number} applicantId - Applicant ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Applicant data
   */
  async getById(applicantId, options = {}) {
    return this.client.get(`/api/applicants/${applicantId}`, { params: options });
  }

  /**
   * List all applicants
   * @param {Object} options - Query options (filters, pagination, sorting)
   * @param {number} options.page - Page number
   * @param {number} options.limit - Items per page
   * @param {string} options.sort - Sort field
   * @param {string} options.order - Sort order (asc/desc)
   * @returns {Promise<Object>} List of applicants
   */
  async list(options = {}) {
    return this.client.get('/api/applicants', { params: options });
  }

  /**
   * Update applicant information
   * @param {string|number} applicantId - Applicant ID
   * @param {Object} applicantData - Updated applicant data
   * @returns {Promise<Object>} Updated applicant
   */
  async update(applicantId, applicantData) {
    return this.client.put(`/api/applicants/${applicantId}`, { data: applicantData });
  }

  /**
   * Partially update applicant information
   * @param {string|number} applicantId - Applicant ID
   * @param {Object} applicantData - Partial applicant data
   * @returns {Promise<Object>} Updated applicant
   */
  async patch(applicantId, applicantData) {
    return this.client.patch(`/api/applicants/${applicantId}`, { data: applicantData });
  }

  /**
   * Delete applicant
   * @param {string|number} applicantId - Applicant ID
   * @returns {Promise<Object>} Deletion result
   */
  async delete(applicantId) {
    return this.client.delete(`/api/applicants/${applicantId}`);
  }

  /**
   * Get applicant's application history
   * @param {string|number} applicantId - Applicant ID
   * @returns {Promise<Object>} Application history
   */
  async getApplicationHistory(applicantId) {
    return this.client.get(`/api/applicants/${applicantId}/applications`);
  }

  /**
   * Get applicant's documents
   * @param {string|number} applicantId - Applicant ID
   * @returns {Promise<Object>} List of documents
   */
  async getDocuments(applicantId) {
    return this.client.get(`/api/applicants/${applicantId}/documents`);
  }
}

module.exports = ApplicantsService;

