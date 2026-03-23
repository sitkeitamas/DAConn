# DreamApply JavaScript SDK

A comprehensive JavaScript library for integrating external tools with DreamApply's REST API. This SDK provides easy-to-use methods for all major DreamApply operations including applicant management, applications, offers, tasks, documents, and more.

## Installation

```bash
npm install
```

Or if you want to use it directly:

```javascript
const DreamApply = require('./src/index.js');
```

## Quick Start

```javascript
const DreamApply = require('./src/index.js');

// Initialize the SDK
const client = new DreamApply({
  apiKey: 'your-api-key-here',
  baseUrl: 'https://yourinstance.dreamapply.com',
  options: {
    timeout: 30000 // Optional: request timeout in milliseconds
  }
});

// Use the services
async function example() {
  try {
    // Create an applicant
    const applicant = await client.applicants.create({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com'
    });

    // Submit an application
    const application = await client.applications.create({
      applicantId: applicant.id,
      programId: '123',
      priority: 1
    });

    // Get applicant details
    const applicantDetails = await client.applicants.getById(applicant.id);

    console.log('Applicant created:', applicantDetails);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
```

## Features

✅ **13 Service Modules** covering all DreamApply API operations:
- Applicants Management
- Applications Handling
- Offers Management
- Tasks Management
- Documents Management
- Invoices Management
- Interviews Management
- Programs Management
- Communications Management
- Webhooks & Event Subscriptions
- Reports & Data Export
- User Role Management
- External System Integrations

✅ **Full CRUD Operations** for all entities
✅ **Error Handling** with custom error classes
✅ **Type Safety** with JSDoc comments
✅ **File Upload Support** for documents
✅ **Query Parameters** and filtering support
✅ **Pagination** support for list operations

## API Reference

### Authentication

All requests require an API key. Generate your API key in DreamApply admin panel: `System → API`

### Service Methods

#### Applicants Service (`client.applicants`)

```javascript
// Create applicant
await client.applicants.create(applicantData);

// Get applicant by ID
await client.applicants.getById(applicantId);

// List applicants
await client.applicants.list({ page: 1, limit: 10 });

// Update applicant
await client.applicants.update(applicantId, applicantData);

// Delete applicant
await client.applicants.delete(applicantId);

// Get application history
await client.applicants.getApplicationHistory(applicantId);

// Get documents
await client.applicants.getDocuments(applicantId);
```

#### Applications Service (`client.applications`)

```javascript
// Submit application
await client.applications.create(applicationData);

// Get application by ID
await client.applications.getById(applicationId);

// List applications
await client.applications.list({ status: 'submitted' });

// Update application
await client.applications.update(applicationId, applicationData);

// Update status
await client.applications.updateStatus(applicationId, 'accepted');

// Withdraw application
await client.applications.withdraw(applicationId);

// Delete application
await client.applications.delete(applicationId);
```

#### Offers Service (`client.offers`)

```javascript
// Create offer
await client.offers.create(offerData);

// Get offer by ID
await client.offers.getById(offerId);

// List offers
await client.offers.list();

// Update offer
await client.offers.update(offerId, offerData);

// Update status
await client.offers.updateStatus(offerId, 'accepted');

// Get offers for application
await client.offers.getByApplication(applicationId);
```

#### Tasks Service (`client.tasks`)

```javascript
// Assign task
await client.tasks.create(taskData);

// Get task by ID
await client.tasks.getById(taskId);

// List tasks
await client.tasks.list();

// Update task
await client.tasks.update(taskId, taskData);

// Mark as complete
await client.tasks.complete(taskId);

// Get tasks for applicant
await client.tasks.getByApplicant(applicantId);

// Create external task (JWT-based)
await client.tasks.createExternalTask(taskData);
```

#### Documents Service (`client.documents`)

```javascript
// Upload document
const file = new File(['content'], 'document.pdf', { type: 'application/pdf' });
await client.documents.upload({
  applicantId: '123',
  type: 'transcript',
  name: 'Transcript'
}, file);

// Get document
await client.documents.getById(documentId);

// Download document
const blob = await client.documents.download(documentId);

// List documents
await client.documents.list();

// Delete document
await client.documents.delete(documentId);
```

#### Invoices Service (`client.invoices`)

```javascript
// Create invoice
await client.invoices.create(invoiceData);

// Get invoice
await client.invoices.getById(invoiceId);

// Update payment status
await client.invoices.updatePaymentStatus(invoiceId, 'paid');

// Record payment
await client.invoices.recordPayment(invoiceId, paymentData);
```

#### Interviews Service (`client.interviews`)

```javascript
// Schedule interview
await client.interviews.create(interviewData);

// Get interview
await client.interviews.getById(interviewId);

// Reschedule
await client.interviews.reschedule(interviewId, scheduleData);

// Record outcome
await client.interviews.recordOutcome(interviewId, outcomeData);

// Send invitation
await client.interviews.sendInvitation(interviewId);
```

#### Programs Service (`client.programs`)

```javascript
// List programs
await client.programs.list();

// Get program by ID
await client.programs.getById(programId);

// Update program
await client.programs.update(programId, programData);

// Get requirements
await client.programs.getRequirements(programId);

// Get deadlines
await client.programs.getDeadlines(programId);
```

#### Communications Service (`client.communications`)

```javascript
// Send message
await client.communications.sendMessage({
  applicantId: '123',
  subject: 'Application Update',
  body: 'Your application has been reviewed.',
  type: 'email'
});

// Send email
await client.communications.sendEmail(applicantId, emailData);

// Send notification
await client.communications.sendNotification(applicantId, notificationData);

// Get communication history
await client.communications.getHistory(applicantId);
```

#### Webhooks Service (`client.webhooks`)

```javascript
// Subscribe to events
await client.webhooks.subscribe({
  url: 'https://your-endpoint.com/webhook',
  events: ['application.created', 'application.status_changed']
});

// List webhooks
await client.webhooks.list();

// Update webhook
await client.webhooks.update(webhookId, webhookData);

// Unsubscribe
await client.webhooks.unsubscribe(webhookId);

// Get event types
await client.webhooks.getEventTypes();

// Test webhook
await client.webhooks.test(webhookId);
```

#### Reports Service (`client.reports`)

```javascript
// Generate report
await client.reports.generate({
  type: 'applications',
  format: 'json',
  filters: { dateRange: '2024-01-01,2024-12-31' }
});

// Get statistics
await client.reports.getApplicationStatistics();
await client.reports.getApplicantDemographics();
await client.reports.getAdmissionMetrics();
await client.reports.getPerformanceAnalytics();

// Export data
await client.reports.exportApplicants({ format: 'csv' });
await client.reports.exportApplications({ format: 'csv' });
```

#### Users Service (`client.users`)

```javascript
// Get user
await client.users.getById(userId);

// List users
await client.users.list();

// Get roles
await client.users.getRoles(userId);

// Get permissions
await client.users.getPermissions(userId);

// Assign role
await client.users.assignRole(userId, roleId);

// Update permissions
await client.users.updatePermissions(userId, permissions);
```

#### Integrations Service (`client.integrations`)

```javascript
// Import leads
await client.integrations.importLeads({
  source: 'salesforce',
  data: leadData
});

// Import from specific platforms
await client.integrations.importFromSalesforce(leadData);
await client.integrations.importFromSmartHub(leadData);
await client.integrations.importFromDynamics365(leadData);

// Export data
await client.integrations.exportData({
  target: 'salesforce',
  type: 'applicants',
  filters: {}
});

// Export to specific platforms
await client.integrations.exportToSalesforce(data);
await client.integrations.exportToDynamics365(data);
await client.integrations.exportToMailchimp(data);
await client.integrations.exportToHubSpot(data);
```

## Error Handling

The SDK uses custom error classes for better error handling:

```javascript
const { DreamApplyError } = require('./src/index.js');

try {
  await client.applicants.getById('invalid-id');
} catch (error) {
  if (error instanceof DreamApplyError) {
    console.error('API Error:', error.message);
    console.error('Status Code:', error.status);
    console.error('Error Data:', error.data);
  } else {
    console.error('Network Error:', error.message);
  }
}
```

## Query Parameters

Most list methods support query parameters for filtering, pagination, and sorting:

```javascript
// Pagination
await client.applicants.list({ page: 1, limit: 20 });

// Filtering
await client.applications.list({ status: 'submitted', programId: '123' });

// Sorting
await client.applicants.list({ sort: 'createdAt', order: 'desc' });
```

## Advanced Usage

### Access the underlying HTTP client

```javascript
const client = new DreamApply(config);
const httpClient = client.getClient();

// Make custom requests
await httpClient.get('/api/custom-endpoint');
await httpClient.post('/api/custom-endpoint', { data: customData });
```

### Use individual services directly

```javascript
const { DreamApplyClient, ApplicantsService } = require('./src/index.js');

const client = new DreamApplyClient(config);
const applicantsService = new ApplicantsService(client);
```

## Examples

See the `examples/` directory for more usage examples.

### Python mapping example

The repository also contains a Python mapping module for DA export normalization:

- Module: `python_da/da_mapper.py`
- Example script: `examples/da_to_internal_csv.py`
- Web UI integration reference: `python_da/WEBUI_INTEGRATION_EXAMPLE.md`

Run:

```bash
DREAMAPPLY_API_KEY="your-api-key" \
DREAMAPPLY_BASE_URL="https://yourinstance.dreamapply.com" \
python3 examples/da_to_internal_csv.py --status accepted --output da_input.csv
```

## Requirements

- Node.js >= 14.0.0
- Valid DreamApply API key
- DreamApply instance with API enabled

## Support

- **DreamApply Developer Documentation**: https://docs.dreamapply.com/
- **Developer Support**: developers@dreamapply.com
- **Webhooks Guide**: https://help.dreamapply.com/kb/integrations/webhooks/
- **Task Integration**: https://help.dreamapply.com/kb/admission-workflow/tasks/integrate-tasks/

## License

MIT

