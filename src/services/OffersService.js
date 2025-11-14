/**
 * Offers Service
 * Handles all offer-related API operations
 */

class OffersService {
  /**
   * @param {DreamApplyClient} client - DreamApply client instance
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Create a new offer
   * @param {Object} offerData - Offer data
   * @returns {Promise<Object>} Created offer
   */
  async create(offerData) {
    return this.client.post('/api/offers', { data: offerData });
  }

  /**
   * Retrieve offer by ID
   * @param {string|number} offerId - Offer ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Offer data
   */
  async getById(offerId, options = {}) {
    return this.client.get(`/api/offers/${offerId}`, { params: options });
  }

  /**
   * List all offers
   * @param {Object} options - Query options (filters, pagination, sorting)
   * @returns {Promise<Object>} List of offers
   */
  async list(options = {}) {
    return this.client.get('/api/offers', { params: options });
  }

  /**
   * Update offer details
   * @param {string|number} offerId - Offer ID
   * @param {Object} offerData - Updated offer data
   * @returns {Promise<Object>} Updated offer
   */
  async update(offerId, offerData) {
    return this.client.put(`/api/offers/${offerId}`, { data: offerData });
  }

  /**
   * Partially update offer
   * @param {string|number} offerId - Offer ID
   * @param {Object} offerData - Partial offer data
   * @returns {Promise<Object>} Updated offer
   */
  async patch(offerId, offerData) {
    return this.client.patch(`/api/offers/${offerId}`, { data: offerData });
  }

  /**
   * Update offer status
   * @param {string|number} offerId - Offer ID
   * @param {string} status - New status (pending, accepted, rejected, expired)
   * @returns {Promise<Object>} Updated offer
   */
  async updateStatus(offerId, status) {
    return this.client.patch(`/api/offers/${offerId}`, {
      data: { status }
    });
  }

  /**
   * Delete offer
   * @param {string|number} offerId - Offer ID
   * @returns {Promise<Object>} Deletion result
   */
  async delete(offerId) {
    return this.client.delete(`/api/offers/${offerId}`);
  }

  /**
   * Get offers for an application
   * @param {string|number} applicationId - Application ID
   * @returns {Promise<Object>} List of offers
   */
  async getByApplication(applicationId) {
    return this.client.get(`/api/applications/${applicationId}/offers`);
  }
}

module.exports = OffersService;

