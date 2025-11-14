/**
 * Webhooks Service
 * Handles webhook subscription and management
 */

class WebhooksService {
  /**
   * @param {DreamApplyClient} client - DreamApply client instance
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Subscribe to events (create webhook)
   * @param {Object} webhookData - Webhook configuration
   * @param {string} webhookData.url - Webhook endpoint URL
   * @param {string[]} webhookData.events - Events to subscribe to
   * @param {Object} webhookData.options - Additional options
   * @returns {Promise<Object>} Created webhook subscription
   */
  async subscribe(webhookData) {
    return this.client.post('/api/webhooks', { data: webhookData });
  }

  /**
   * Retrieve webhook by ID
   * @param {string|number} webhookId - Webhook ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Webhook data
   */
  async getById(webhookId, options = {}) {
    return this.client.get(`/api/webhooks/${webhookId}`, { params: options });
  }

  /**
   * List all webhook subscriptions
   * @param {Object} options - Query options
   * @returns {Promise<Object>} List of webhooks
   */
  async list(options = {}) {
    return this.client.get('/api/webhooks', { params: options });
  }

  /**
   * Update webhook subscription
   * @param {string|number} webhookId - Webhook ID
   * @param {Object} webhookData - Updated webhook data
   * @returns {Promise<Object>} Updated webhook
   */
  async update(webhookId, webhookData) {
    return this.client.put(`/api/webhooks/${webhookId}`, { data: webhookData });
  }

  /**
   * Delete webhook subscription
   * @param {string|number} webhookId - Webhook ID
   * @returns {Promise<Object>} Deletion result
   */
  async unsubscribe(webhookId) {
    return this.client.delete(`/api/webhooks/${webhookId}`);
  }

  /**
   * Get available event types
   * @returns {Promise<Object>} List of available events
   */
  async getEventTypes() {
    return this.client.get('/api/webhooks/events');
  }

  /**
   * Test webhook (send test event)
   * @param {string|number} webhookId - Webhook ID
   * @returns {Promise<Object>} Test result
   */
  async test(webhookId) {
    return this.client.post(`/api/webhooks/${webhookId}/test`);
  }
}

module.exports = WebhooksService;

