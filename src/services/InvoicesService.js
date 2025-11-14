/**
 * Invoices Service
 * Handles all invoice-related API operations
 */

class InvoicesService {
  /**
   * @param {DreamApplyClient} client - DreamApply client instance
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Create a new invoice
   * @param {Object} invoiceData - Invoice data
   * @returns {Promise<Object>} Created invoice
   */
  async create(invoiceData) {
    return this.client.post('/api/invoices', { data: invoiceData });
  }

  /**
   * Retrieve invoice by ID
   * @param {string|number} invoiceId - Invoice ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Invoice data
   */
  async getById(invoiceId, options = {}) {
    return this.client.get(`/api/invoices/${invoiceId}`, { params: options });
  }

  /**
   * List all invoices
   * @param {Object} options - Query options (filters, pagination, sorting)
   * @returns {Promise<Object>} List of invoices
   */
  async list(options = {}) {
    return this.client.get('/api/invoices', { params: options });
  }

  /**
   * Update invoice details
   * @param {string|number} invoiceId - Invoice ID
   * @param {Object} invoiceData - Updated invoice data
   * @returns {Promise<Object>} Updated invoice
   */
  async update(invoiceId, invoiceData) {
    return this.client.put(`/api/invoices/${invoiceId}`, { data: invoiceData });
  }

  /**
   * Partially update invoice
   * @param {string|number} invoiceId - Invoice ID
   * @param {Object} invoiceData - Partial invoice data
   * @returns {Promise<Object>} Updated invoice
   */
  async patch(invoiceId, invoiceData) {
    return this.client.patch(`/api/invoices/${invoiceId}`, { data: invoiceData });
  }

  /**
   * Update invoice payment status
   * @param {string|number} invoiceId - Invoice ID
   * @param {string} paymentStatus - Payment status
   * @returns {Promise<Object>} Updated invoice
   */
  async updatePaymentStatus(invoiceId, paymentStatus) {
    return this.client.patch(`/api/invoices/${invoiceId}`, {
      data: { paymentStatus }
    });
  }

  /**
   * Record payment for invoice
   * @param {string|number} invoiceId - Invoice ID
   * @param {Object} paymentData - Payment data
   * @returns {Promise<Object>} Updated invoice
   */
  async recordPayment(invoiceId, paymentData) {
    return this.client.post(`/api/invoices/${invoiceId}/payments`, {
      data: paymentData
    });
  }

  /**
   * Get invoices for an application
   * @param {string|number} applicationId - Application ID
   * @returns {Promise<Object>} List of invoices
   */
  async getByApplication(applicationId) {
    return this.client.get(`/api/applications/${applicationId}/invoices`);
  }
}

module.exports = InvoicesService;

