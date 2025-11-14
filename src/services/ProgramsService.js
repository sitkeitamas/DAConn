/**
 * Programs Service
 * Handles all program-related API operations
 */

class ProgramsService {
  /**
   * @param {DreamApplyClient} client - DreamApply client instance
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Retrieve program by ID
   * @param {string|number} programId - Program ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Program data
   */
  async getById(programId, options = {}) {
    return this.client.get(`/api/programs/${programId}`, { params: options });
  }

  /**
   * List all programs
   * @param {Object} options - Query options (filters, pagination, sorting)
   * @returns {Promise<Object>} List of programs
   */
  async list(options = {}) {
    return this.client.get('/api/programs', { params: options });
  }

  /**
   * Update program information
   * @param {string|number} programId - Program ID
   * @param {Object} programData - Updated program data
   * @returns {Promise<Object>} Updated program
   */
  async update(programId, programData) {
    return this.client.put(`/api/programs/${programId}`, { data: programData });
  }

  /**
   * Partially update program
   * @param {string|number} programId - Program ID
   * @param {Object} programData - Partial program data
   * @returns {Promise<Object>} Updated program
   */
  async patch(programId, programData) {
    return this.client.patch(`/api/programs/${programId}`, { data: programData });
  }

  /**
   * Get program requirements
   * @param {string|number} programId - Program ID
   * @returns {Promise<Object>} Program requirements
   */
  async getRequirements(programId) {
    return this.client.get(`/api/programs/${programId}/requirements`);
  }

  /**
   * Get program deadlines
   * @param {string|number} programId - Program ID
   * @returns {Promise<Object>} Program deadlines
   */
  async getDeadlines(programId) {
    return this.client.get(`/api/programs/${programId}/deadlines`);
  }
}

module.exports = ProgramsService;

