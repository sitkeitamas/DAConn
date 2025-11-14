/**
 * DreamApply JavaScript SDK
 * Main entry point for the library
 */

const { DreamApplyClient, DreamApplyError } = require('./DreamApplyClient');
const ApplicantsService = require('./services/ApplicantsService');
const ApplicationsService = require('./services/ApplicationsService');
const OffersService = require('./services/OffersService');
const TasksService = require('./services/TasksService');
const DocumentsService = require('./services/DocumentsService');
const InvoicesService = require('./services/InvoicesService');
const InterviewsService = require('./services/InterviewsService');
const ProgramsService = require('./services/ProgramsService');
const CommunicationsService = require('./services/CommunicationsService');
const WebhooksService = require('./services/WebhooksService');
const ReportsService = require('./services/ReportsService');
const UsersService = require('./services/UsersService');
const IntegrationsService = require('./services/IntegrationsService');

/**
 * DreamApply SDK Main Class
 * Provides access to all DreamApply API services
 */
class DreamApply {
  /**
   * @param {Object} config - Configuration object
   * @param {string} config.apiKey - API key for authentication
   * @param {string} config.baseUrl - Base URL of DreamApply instance
   * @param {Object} config.options - Additional options
   */
  constructor(config) {
    this.client = new DreamApplyClient(config);
    
    // Initialize all services
    this.applicants = new ApplicantsService(this.client);
    this.applications = new ApplicationsService(this.client);
    this.offers = new OffersService(this.client);
    this.tasks = new TasksService(this.client);
    this.documents = new DocumentsService(this.client);
    this.invoices = new InvoicesService(this.client);
    this.interviews = new InterviewsService(this.client);
    this.programs = new ProgramsService(this.client);
    this.communications = new CommunicationsService(this.client);
    this.webhooks = new WebhooksService(this.client);
    this.reports = new ReportsService(this.client);
    this.users = new UsersService(this.client);
    this.integrations = new IntegrationsService(this.client);
  }

  /**
   * Get the underlying HTTP client (for advanced usage)
   * @returns {DreamApplyClient} HTTP client instance
   */
  getClient() {
    return this.client;
  }
}

// Export main class and error class
module.exports = DreamApply;
module.exports.DreamApply = DreamApply;
module.exports.DreamApplyError = DreamApplyError;
module.exports.DreamApplyClient = DreamApplyClient;

// Export individual services for advanced usage
module.exports.ApplicantsService = ApplicantsService;
module.exports.ApplicationsService = ApplicationsService;
module.exports.OffersService = OffersService;
module.exports.TasksService = TasksService;
module.exports.DocumentsService = DocumentsService;
module.exports.InvoicesService = InvoicesService;
module.exports.InterviewsService = InterviewsService;
module.exports.ProgramsService = ProgramsService;
module.exports.CommunicationsService = CommunicationsService;
module.exports.WebhooksService = WebhooksService;
module.exports.ReportsService = ReportsService;
module.exports.UsersService = UsersService;
module.exports.IntegrationsService = IntegrationsService;

