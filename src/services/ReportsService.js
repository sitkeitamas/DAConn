/**
 * Reports Service
 * Handles data export and reporting operations
 */

class ReportsService {
  /**
   * @param {DreamApplyClient} client - DreamApply client instance
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Generate and retrieve a report
   * @param {Object} reportData - Report configuration
   * @param {string} reportData.type - Report type
   * @param {Object} reportData.filters - Report filters
   * @param {string} reportData.format - Report format (json, csv, pdf)
   * @returns {Promise<Object|Blob>} Report data
   */
  async generate(reportData) {
    return this.client.post('/api/reports', { data: reportData });
  }

  /**
   * Get application statistics
   * @param {Object} options - Query options (filters, date range)
   * @returns {Promise<Object>} Statistics data
   */
  async getApplicationStatistics(options = {}) {
    return this.client.get('/api/reports/statistics/applications', {
      params: options
    });
  }

  /**
   * Get applicant demographics
   * @param {Object} options - Query options (filters, date range)
   * @returns {Promise<Object>} Demographics data
   */
  async getApplicantDemographics(options = {}) {
    return this.client.get('/api/reports/statistics/demographics', {
      params: options
    });
  }

  /**
   * Get admission metrics
   * @param {Object} options - Query options (filters, date range)
   * @returns {Promise<Object>} Metrics data
   */
  async getAdmissionMetrics(options = {}) {
    return this.client.get('/api/reports/statistics/admissions', {
      params: options
    });
  }

  /**
   * Get performance analytics
   * @param {Object} options - Query options (filters, date range)
   * @returns {Promise<Object>} Analytics data
   */
  async getPerformanceAnalytics(options = {}) {
    return this.client.get('/api/reports/analytics/performance', {
      params: options
    });
  }

  /**
   * Export applicant data
   * @param {Object} options - Export options (filters, format)
   * @returns {Promise<Blob|Object>} Exported data
   */
  async exportApplicants(options = {}) {
    return this.client.get('/api/export/applicants', { params: options });
  }

  /**
   * Export application data
   * @param {Object} options - Export options (filters, format)
   * @returns {Promise<Blob|Object>} Exported data
   */
  async exportApplications(options = {}) {
    return this.client.get('/api/export/applications', { params: options });
  }

  /**
   * Get report by ID (for async report generation)
   * @param {string|number} reportId - Report ID
   * @returns {Promise<Object>} Report data
   */
  async getReport(reportId) {
    return this.client.get(`/api/reports/${reportId}`);
  }
}

module.exports = ReportsService;

