/**
 * Documents Service
 * Handles all document-related API operations
 */

class DocumentsService {
  /**
   * @param {DreamApplyClient} client - DreamApply client instance
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Upload a document
   * @param {Object} documentData - Document data
   * @param {File|Blob|Buffer} file - File to upload
   * @param {string} documentData.applicantId - Applicant ID (optional)
   * @param {string} documentData.applicationId - Application ID (optional)
   * @param {string} documentData.type - Document type
   * @param {string} documentData.name - Document name
   * @returns {Promise<Object>} Uploaded document
   */
  async upload(documentData, file) {
    // Use FormData (available in Node.js 18+ and browsers)
    const FormDataClass = globalThis.FormData || (typeof FormData !== 'undefined' ? FormData : null);
    if (!FormDataClass) {
      throw new Error('FormData is not available. Please use Node.js 18+ or a browser environment.');
    }
    
    const formData = new FormDataClass();
    
    // Add file - handle different file types
    if (Buffer && file instanceof Buffer) {
      // For Node.js Buffer, create a Blob-like object
      const blob = new Blob([file], { type: 'application/octet-stream' });
      blob.name = documentData.name || 'document';
      formData.append('file', blob, documentData.name);
    } else {
      // For File or Blob objects
      const fileName = documentData.name || (file.name || 'document');
      formData.append('file', file, fileName);
    }
    
    // Add metadata
    Object.entries(documentData).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== 'name') {
        formData.append(key, String(value));
      }
    });

    return this.client.post('/api/documents', {
      data: formData,
      headers: {} // Let fetch set Content-Type with boundary automatically
    });
  }

  /**
   * Retrieve document by ID
   * @param {string|number} documentId - Document ID
   * @param {Object} options - Query options
   * @returns {Promise<Blob|Object>} Document data or metadata
   */
  async getById(documentId, options = {}) {
    const download = options.download || false;
    if (download) {
      return this.client.get(`/api/documents/${documentId}/download`, { params: options });
    }
    return this.client.get(`/api/documents/${documentId}`, { params: options });
  }

  /**
   * Download document
   * @param {string|number} documentId - Document ID
   * @returns {Promise<Blob>} Document file
   */
  async download(documentId) {
    return this.getById(documentId, { download: true });
  }

  /**
   * List all documents
   * @param {Object} options - Query options (filters, pagination, sorting)
   * @returns {Promise<Object>} List of documents
   */
  async list(options = {}) {
    return this.client.get('/api/documents', { params: options });
  }

  /**
   * Update document metadata
   * @param {string|number} documentId - Document ID
   * @param {Object} documentData - Updated document data
   * @returns {Promise<Object>} Updated document
   */
  async update(documentId, documentData) {
    return this.client.put(`/api/documents/${documentId}`, { data: documentData });
  }

  /**
   * Delete document
   * @param {string|number} documentId - Document ID
   * @returns {Promise<Object>} Deletion result
   */
  async delete(documentId) {
    return this.client.delete(`/api/documents/${documentId}`);
  }

  /**
   * Get documents for an applicant
   * @param {string|number} applicantId - Applicant ID
   * @returns {Promise<Object>} List of documents
   */
  async getByApplicant(applicantId) {
    return this.client.get(`/api/applicants/${applicantId}/documents`);
  }

  /**
   * Get documents for an application
   * @param {string|number} applicationId - Application ID
   * @returns {Promise<Object>} List of documents
   */
  async getByApplication(applicationId) {
    return this.client.get(`/api/applications/${applicationId}/documents`);
  }
}

module.exports = DocumentsService;

