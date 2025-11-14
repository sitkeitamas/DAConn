# DreamApply Integration Platform - Data Access Options

This document outlines the available methods for integrating external tools with DreamApply (DA) to read and write entities.

## Overview

DreamApply provides multiple integration mechanisms that enable external tools to access and manipulate data within the system. The main integration options are:

1. **REST API** - Primary method for programmatic data access
2. **Webhooks** - Real-time event notifications
3. **Task Integration** - JWT-based secure task interactions
4. **Pre-built Integrations** - Native connectors (Salesforce, Dynamics 365, Zapier, etc.)

---

## 1. REST API

### Overview
DreamApply provides a comprehensive RESTful API that supports reading and writing various entities within the system.

### Authentication
- **API Keys**: Generated through the administration interface
- **Location**: System → API in the DreamApply admin menu
- **Note**: If the API option isn't visible, contact DreamApply support to enable it

### Capabilities
- ✅ **Read Operations**: Retrieve entities (applicants, applications, documents, etc.)
- ✅ **Write Operations**: Create, update, and modify entities
- ✅ **Programmatic Access**: Full CRUD operations via HTTP requests

### Resources
- **PHP SDK**: Available to facilitate integration development
- **Documentation**: Available at docs.dreamapply.com
- **Support**: developers@dreamapply.com

### Getting Started
1. Navigate to System → API in DreamApply admin
2. Generate API keys
3. Use the API keys for authentication in API requests
4. Refer to API documentation for endpoint details

---

## 2. Webhooks

### Overview
Webhooks enable real-time data synchronization by subscribing to specific events within DreamApply.

### Capabilities
- ✅ **Event Subscriptions**: Subscribe to journal events and other system events
- ✅ **Real-time Notifications**: Receive immediate notifications when events occur
- ✅ **POST Requests**: External systems receive HTTP POST requests with event data
- ✅ **No Polling Required**: Eliminates the need for continuous polling

### Use Cases
- Trigger workflows in external systems
- Update external databases in real-time
- Synchronize data across platforms
- Automate processes based on DreamApply events

### Implementation
1. Set up an HTTP endpoint capable of handling POST requests
2. Configure the webhook URL in DreamApply
3. Subscribe to desired events
4. Handle incoming webhook payloads

### Documentation
- Available at help.dreamapply.com/kb/integrations/webhooks/

---

## 3. Task Integration with External Systems

### Overview
Task templates can be configured to interact with external systems, enabling applicants to perform actions outside of DreamApply.

### Capabilities
- ✅ **External Redirects**: Redirect applicants to specified URLs
- ✅ **Secure Token Mechanism**: Uses JSON Web Tokens (JWT) for verification
- ✅ **Data Protection**: Protects sensitive data during external interactions
- ✅ **Document Signing**: Enable external document signing workflows
- ✅ **Financial Transactions**: Facilitate payment processing

### Security
- JWT-based token mechanism for request verification
- Secure data transmission
- Token validation for external requests

### Use Cases
- Document signing services
- Payment processing
- External form submissions
- Third-party service integrations

---

## 4. Pre-built Integrations

DreamApply offers native integrations with several third-party systems:

### Available Integrations
- **Salesforce**: Import/export contacts between DreamApply and Salesforce
- **Microsoft Dynamics 365**: Synchronize applicant data
- **Smarthub**: Import lead data from Smarthub
- **Zapier**: Connect with numerous applications without coding

### Zapier Integration
- No-code integration platform
- Automate workflows between DreamApply and other tools
- Use cases: lead management, marketing campaigns, data synchronization

---

## Integration Architecture Recommendations

### For Your Integration Platform

Based on these capabilities, your integration platform could support:

1. **REST API Client**
   - Implement API client for DreamApply REST API
   - Support authentication via API keys
   - Handle read/write operations for various entities
   - Implement rate limiting and error handling

2. **Webhook Receiver**
   - Set up webhook endpoint to receive DreamApply events
   - Process and route events to appropriate handlers
   - Support event filtering and transformation

3. **Task Integration Handler**
   - Manage JWT token generation/validation
   - Handle external task redirects
   - Secure data transmission

4. **Entity Mapping**
   - Map DreamApply entities to your platform's data model
   - Support bidirectional synchronization
   - Handle data transformation and validation

---

## Next Steps

1. **Access DreamApply Instance**
   - Verify API access is enabled (System → API)
   - Generate API keys for authentication
   - Review available endpoints in API documentation

2. **Review API Documentation**
   - Visit docs.dreamapply.com for detailed API reference
   - Identify specific entities and endpoints needed
   - Understand request/response formats

3. **Contact DreamApply Support**
   - Email: developers@dreamapply.com
   - Request API documentation if not available
   - Clarify specific integration requirements

4. **Design Integration Architecture**
   - Choose integration methods (REST API, Webhooks, or both)
   - Design data flow and entity mapping
   - Plan authentication and security mechanisms

---

## Resources

- **Developer Documentation**: https://docs.dreamapply.com/
- **Webhooks Guide**: https://help.dreamapply.com/kb/integrations/webhooks/
- **Task Integration**: https://help.dreamapply.com/kb/admission-workflow/tasks/integrate-tasks/
- **Developer Support**: developers@dreamapply.com

---

## Notes

- Most DreamApply installations have the API enabled by default
- If API option is not visible, contact DreamApply support
- PHP SDK is available for easier integration development
- Webhooks require an HTTP endpoint capable of receiving POST requests
- JWT tokens are used for secure task integrations

