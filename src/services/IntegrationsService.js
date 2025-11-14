/**
 * Integrations Service
 * Handles external system integrations (CRM, marketing tools, etc.)
 */

class IntegrationsService {
  /**
   * @param {DreamApplyClient} client - DreamApply client instance
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Import leads from external platform
   * @param {Object} importData - Import configuration
   * @param {string} importData.source - Source platform (salesforce, smarthub, dynamics365)
   * @param {Object} importData.data - Lead data
   * @returns {Promise<Object>} Import result
   */
  async importLeads(importData) {
    return this.client.post('/api/integrations/import/leads', {
      data: importData
    });
  }

  /**
   * Import from Salesforce
   * @param {Object} leadData - Lead data from Salesforce
   * @returns {Promise<Object>} Import result
   */
  async importFromSalesforce(leadData) {
    return this.importLeads({
      source: 'salesforce',
      data: leadData
    });
  }

  /**
   * Import from SmartHub
   * @param {Object} leadData - Lead data from SmartHub
   * @returns {Promise<Object>} Import result
   */
  async importFromSmartHub(leadData) {
    return this.importLeads({
      source: 'smarthub',
      data: leadData
    });
  }

  /**
   * Import from Microsoft Dynamics 365
   * @param {Object} leadData - Lead data from Dynamics 365
   * @returns {Promise<Object>} Import result
   */
  async importFromDynamics365(leadData) {
    return this.importLeads({
      source: 'dynamics365',
      data: leadData
    });
  }

  /**
   * Export data to external system
   * @param {Object} exportData - Export configuration
   * @param {string} exportData.target - Target platform
   * @param {string} exportData.type - Data type (applicants, applications)
   * @param {Object} exportData.filters - Export filters
   * @returns {Promise<Object>} Export result
   */
  async exportData(exportData) {
    return this.client.post('/api/integrations/export', {
      data: exportData
    });
  }

  /**
   * Export to Salesforce
   * @param {Object} data - Data to export
   * @param {string} data.type - Data type
   * @returns {Promise<Object>} Export result
   */
  async exportToSalesforce(data) {
    return this.exportData({
      target: 'salesforce',
      ...data
    });
  }

  /**
   * Export to Microsoft Dynamics 365
   * @param {Object} data - Data to export
   * @param {string} data.type - Data type
   * @returns {Promise<Object>} Export result
   */
  async exportToDynamics365(data) {
    return this.exportData({
      target: 'dynamics365',
      ...data
    });
  }

  /**
   * Export to Mailchimp
   * @param {Object} data - Data to export
   * @returns {Promise<Object>} Export result
   */
  async exportToMailchimp(data) {
    return this.exportData({
      target: 'mailchimp',
      ...data
    });
  }

  /**
   * Export to HubSpot
   * @param {Object} data - Data to export
   * @returns {Promise<Object>} Export result
   */
  async exportToHubSpot(data) {
    return this.exportData({
      target: 'hubspot',
      ...data
    });
  }

  /**
   * Get integration status
   * @param {string} platform - Platform name
   * @returns {Promise<Object>} Integration status
   */
  async getIntegrationStatus(platform) {
    return this.client.get(`/api/integrations/${platform}/status`);
  }

  /**
   * List available integrations
   * @returns {Promise<Object>} List of integrations
   */
  async listIntegrations() {
    return this.client.get('/api/integrations');
  }
}

module.exports = IntegrationsService;

