/**
 * Interviews Service
 * Handles all interview-related API operations
 */

class InterviewsService {
  /**
   * @param {DreamApplyClient} client - DreamApply client instance
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Schedule a new interview
   * @param {Object} interviewData - Interview data
   * @returns {Promise<Object>} Created interview
   */
  async create(interviewData) {
    return this.client.post('/api/interviews', { data: interviewData });
  }

  /**
   * Retrieve interview by ID
   * @param {string|number} interviewId - Interview ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Interview data
   */
  async getById(interviewId, options = {}) {
    return this.client.get(`/api/interviews/${interviewId}`, { params: options });
  }

  /**
   * List all interviews
   * @param {Object} options - Query options (filters, pagination, sorting)
   * @returns {Promise<Object>} List of interviews
   */
  async list(options = {}) {
    return this.client.get('/api/interviews', { params: options });
  }

  /**
   * Update interview details
   * @param {string|number} interviewId - Interview ID
   * @param {Object} interviewData - Updated interview data
   * @returns {Promise<Object>} Updated interview
   */
  async update(interviewId, interviewData) {
    return this.client.put(`/api/interviews/${interviewId}`, { data: interviewData });
  }

  /**
   * Partially update interview
   * @param {string|number} interviewId - Interview ID
   * @param {Object} interviewData - Partial interview data
   * @returns {Promise<Object>} Updated interview
   */
  async patch(interviewId, interviewData) {
    return this.client.patch(`/api/interviews/${interviewId}`, { data: interviewData });
  }

  /**
   * Reschedule interview
   * @param {string|number} interviewId - Interview ID
   * @param {Object} scheduleData - New schedule data
   * @returns {Promise<Object>} Updated interview
   */
  async reschedule(interviewId, scheduleData) {
    return this.client.patch(`/api/interviews/${interviewId}`, {
      data: scheduleData
    });
  }

  /**
   * Record interview outcome
   * @param {string|number} interviewId - Interview ID
   * @param {Object} outcomeData - Outcome data
   * @returns {Promise<Object>} Updated interview
   */
  async recordOutcome(interviewId, outcomeData) {
    return this.client.post(`/api/interviews/${interviewId}/outcome`, {
      data: outcomeData
    });
  }

  /**
   * Send interview invitation
   * @param {string|number} interviewId - Interview ID
   * @returns {Promise<Object>} Invitation result
   */
  async sendInvitation(interviewId) {
    return this.client.post(`/api/interviews/${interviewId}/invite`);
  }

  /**
   * Get interviews for an applicant
   * @param {string|number} applicantId - Applicant ID
   * @returns {Promise<Object>} List of interviews
   */
  async getByApplicant(applicantId) {
    return this.client.get(`/api/applicants/${applicantId}/interviews`);
  }

  /**
   * Get interviews for an application
   * @param {string|number} applicationId - Application ID
   * @returns {Promise<Object>} List of interviews
   */
  async getByApplication(applicationId) {
    return this.client.get(`/api/applications/${applicationId}/interviews`);
  }
}

module.exports = InterviewsService;

