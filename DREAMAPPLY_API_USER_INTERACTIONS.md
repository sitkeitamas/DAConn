# DreamApply API - Main User Interactions

This document outlines the primary user interactions and operations available through the DreamApply REST API for external tool integration.

## Authentication

### API Key Management
- **Generate API Keys**: Administrators can generate API keys via `System → API` in the administration menu
- **API Key Usage**: Use API keys for authenticating all API requests
- **Support**: If API option is not visible, contact DreamApply support to enable it

---

## 1. Applicant Management

### Create Operations
- **Create Applicant**: Register new applicants by providing personal information
  - Personal details (name, contact information, etc.)
  - Initial application data

### Read Operations
- **Retrieve Applicant Data**: Access detailed applicant profiles
  - Personal information and contact details
  - Application history
  - Associated documents
  - Current application statuses

### Update Operations
- **Update Applicant Information**: Modify existing applicant records
  - Update personal details
  - Update contact information
  - Update application-related data

### Delete Operations
- **Delete Applicant**: Remove applicant records from the system

---

## 2. Application Handling

### Create Operations
- **Submit Application**: Programmatically submit applications for programs
  - Create new applications on behalf of applicants
  - Associate applications with programs
  - Set application priorities

### Read Operations
- **Retrieve Application Details**: Access comprehensive application information
  - Application status and progress
  - Associated programs and choices
  - Application priorities
  - Supporting documents
  - Submission dates and deadlines

### Update Operations
- **Update Application Status**: Modify application status through admission process
  - Change status (submitted, under review, accepted, rejected, etc.)
  - Update application details
  - Modify program choices
  - Update priorities

### Delete Operations
- **Delete Application**: Remove application records
- **Withdraw Application**: Cancel applications when necessary

---

## 3. Offer Management

### Create Operations
- **Create Offer**: Generate admission offers for applicants
  - Issue offers based on applications and qualifications
  - Set offer terms and conditions

### Read Operations
- **Retrieve Offer Details**: Access information about offers
  - Offer status
  - Associated programs
  - Terms and conditions
  - Expiration dates

### Update Operations
- **Update Offer Status**: Modify offer details
  - Change status (pending, accepted, rejected, expired)
  - Update terms and conditions
  - Modify offer expiration

### Delete Operations
- **Delete Offer**: Remove offer records when necessary

---

## 4. Task Management

### Create Operations
- **Assign Tasks to Applicants**: Create and assign tasks
  - Document submission tasks
  - Interview scheduling tasks
  - Form completion tasks
  - Custom task templates
  - Set task deadlines

### Read Operations
- **Retrieve Task Details**: Access task information
  - Task status and completion state
  - Task descriptions and requirements
  - Deadlines and due dates
  - Associated applicants

### Update Operations
- **Update Task Status**: Modify task details
  - Mark tasks as complete
  - Update task descriptions
  - Modify deadlines
  - Change task status

### Delete Operations
- **Delete Task**: Remove tasks that are no longer relevant

### Special Features
- **External Task Integration**: Create tasks that redirect applicants to external systems
  - Document signing workflows
  - Payment processing
  - External form submissions
  - JWT-based secure token mechanism for verification

---

## 5. Document Management

### Create Operations
- **Upload Documents**: Attach documents to applicant profiles or applications
  - Transcripts and academic records
  - Identification documents
  - Certificates and diplomas
  - Letters of recommendation
  - Personal statements

### Read Operations
- **Retrieve Documents**: Access and download documents
  - Download documents associated with applicants
  - Download documents associated with applications
  - View document metadata

### Delete Operations
- **Delete Documents**: Remove documents
  - Remove outdated documents
  - Clean up unnecessary files

---

## 6. Invoice Management

### Create Operations
- **Create Invoices**: Generate invoices associated with applications
  - Issue new invoices
  - Set invoice amounts and details

### Read Operations
- **Retrieve Invoice Information**: Access invoice details
  - Invoice status
  - Payment information
  - Associated applications

### Update Operations
- **Update Invoice Status**: Modify invoice details
  - Update payment status
  - Modify invoice amounts
  - Record payments

---

## 7. Interview Management

### Create Operations
- **Schedule Interviews**: Create interview appointments
  - Set interview dates and times
  - Assign interviewers
  - Send interview invitations

### Read Operations
- **Retrieve Interview Details**: Access interview information
  - Interview schedules
  - Interview status
  - Interview outcomes

### Update Operations
- **Update Interview Information**: Modify interview details
  - Reschedule interviews
  - Record interview outcomes
  - Update interview status

---

## 8. Program Management

### Read Operations
- **List Programs**: Retrieve catalog of available programs
  - Program descriptions
  - Program requirements
  - Application deadlines
  - Program availability

### Update Operations
- **Update Program Information**: Modify program details
  - Update descriptions
  - Modify requirements
  - Change deadlines

---

## 9. Communication Management

### Create Operations
- **Send Messages to Applicants**: Facilitate communication
  - Send emails to applicants
  - Send notifications about application status
  - Send reminders about required actions
  - Send task notifications

### Read Operations
- **Retrieve Communication History**: Access communication logs
  - View sent messages
  - Track communication history
  - Review notification logs

---

## 10. Webhooks & Event Subscriptions

### Setup Operations
- **Subscribe to Events**: Set up webhooks for real-time notifications
  - Subscribe to journal events
  - Configure webhook endpoints
  - Select events to monitor

### Event Types (via Webhooks)
- **New Application Events**: Notifications when applications are submitted
- **Status Change Events**: Notifications when application statuses change
- **Task Completion Events**: Notifications when tasks are completed
- **Offer Events**: Notifications when offers are created or updated
- **Document Upload Events**: Notifications when documents are uploaded
- **Payment Events**: Notifications for invoice/payment updates

### Processing Operations
- **Process Event Data**: Handle incoming webhook payloads
  - Receive HTTP POST requests with event data
  - Parse and process event information
  - Trigger actions in external systems

---

## 11. Data Export & Reporting

### Read Operations
- **Extract Reports**: Generate and retrieve reports
  - Application statistics
  - Applicant demographics
  - Admission metrics
  - Performance analytics

### Export Operations
- **Export Data**: Extract data for external use
  - Export applicant data
  - Export application data
  - Export for record-keeping
  - Export for external system integration

---

## 12. User Role Management

### Read Operations
- **Retrieve User Roles**: Access user role information
  - View assigned roles
  - View permissions

### Update Operations
- **Assign Roles**: Manage user roles and permissions
  - Assign roles to users
  - Update permissions
  - Modify access levels

---

## 13. Integration with External Systems

### Import Operations
- **Import Leads**: Import data from external platforms
  - Import from Salesforce
  - Import from SmartHub
  - Import from Microsoft Dynamics 365
  - Import from marketing platforms

### Export Operations
- **Export to CRM Systems**: Synchronize data with external systems
  - Export to Salesforce
  - Export to Microsoft Dynamics 365
  - Export to marketing tools (Mailchimp, HubSpot)

### Automation Operations
- **Workflow Automation**: Automate tasks via platforms like Zapier
  - Connect DreamApply with other applications
  - Automate data synchronization
  - Trigger workflows based on events

---

## API Interaction Patterns

### Standard CRUD Operations
All major entities support:
- **CREATE**: POST requests to create new resources
- **READ**: GET requests to retrieve resource data
- **UPDATE**: PUT/PATCH requests to modify existing resources
- **DELETE**: DELETE requests to remove resources

### Query & Filtering
- Filter results by various criteria
- Pagination for large datasets
- Sorting and ordering options

### Batch Operations
- Process multiple records in single requests
- Bulk updates and imports

---

## Authentication & Security

### API Authentication
- **API Key Authentication**: Required for all API requests
- **Secure Token Mechanism**: JWT tokens for task integrations
- **HTTPS**: All API communications over secure connections

### Access Control
- Role-based permissions
- API key scoping
- User permission management

---

## Resources & Support

- **Developer Documentation**: https://docs.dreamapply.com/
- **PHP SDK**: Available for easier integration development
- **Developer Support**: developers@dreamapply.com
- **Webhooks Guide**: https://help.dreamapply.com/kb/integrations/webhooks/
- **Task Integration**: https://help.dreamapply.com/kb/admission-workflow/tasks/integrate-tasks/

---

## Summary

The DreamApply API provides comprehensive access to:

✅ **13 Main Interaction Categories**
- Applicant Management
- Application Handling
- Offer Management
- Task Management
- Document Management
- Invoice Management
- Interview Management
- Program Management
- Communication Management
- Webhooks & Events
- Data Export & Reporting
- User Role Management
- External System Integration

✅ **Full CRUD Operations** for most entities
✅ **Real-time Event Notifications** via webhooks
✅ **Secure Integration** with JWT tokens
✅ **Extensive Integration Options** with third-party systems

This comprehensive API enables building a robust integration platform that can interact with all major aspects of the DreamApply system.

