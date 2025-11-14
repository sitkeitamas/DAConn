/**
 * DreamApply API Client
 * Base client class for handling authentication and HTTP requests
 */

class DreamApplyClient {
  /**
   * @param {Object} config - Configuration object
   * @param {string} config.apiKey - API key for authentication
   * @param {string} config.baseUrl - Base URL of DreamApply instance (e.g., 'https://yourinstance.dreamapply.com')
   * @param {Object} config.options - Additional options
   * @param {number} config.options.timeout - Request timeout in milliseconds (default: 30000)
   * @param {Object} config.options.headers - Additional headers to include in requests
   */
  constructor(config) {
    if (!config.apiKey) {
      throw new Error('API key is required');
    }
    if (!config.baseUrl) {
      throw new Error('Base URL is required');
    }

    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.timeout = config.options?.timeout || 30000;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
      ...config.options?.headers
    };
  }

  /**
   * Make HTTP request to DreamApply API
   * @private
   * @param {string} method - HTTP method (GET, POST, PUT, PATCH, DELETE)
   * @param {string} endpoint - API endpoint (e.g., '/api/applicants')
   * @param {Object} options - Request options
   * @param {Object} options.data - Request body data
   * @param {Object} options.params - Query parameters
   * @param {Object} options.headers - Additional headers
   * @returns {Promise<Object>} Response data
   */
  async request(method, endpoint, options = {}) {
    let url = `${this.baseUrl}${endpoint}`;
    const config = {
      method: method.toUpperCase(),
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      },
      signal: AbortSignal.timeout(this.timeout)
    };

    // Add query parameters
    if (options.params) {
      const searchParams = new URLSearchParams();
      Object.entries(options.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => searchParams.append(key, v));
          } else {
            searchParams.append(key, value);
          }
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    // Add request body for POST, PUT, PATCH
    if (['POST', 'PUT', 'PATCH'].includes(config.method) && options.data) {
      // Check if it's FormData (works in both browser and Node.js 18+)
      const FormDataClass = globalThis.FormData || (typeof FormData !== 'undefined' ? FormData : null);
      const isFormData = FormDataClass && (options.data instanceof FormDataClass);
      
      if (isFormData) {
        // Remove Content-Type header for FormData (fetch will set it with boundary)
        delete config.headers['Content-Type'];
        config.body = options.data;
      } else {
        config.body = JSON.stringify(options.data);
      }
    }

    try {
      const response = await fetch(url, config);
      
      // Handle different response types
      let responseData;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else if (contentType && contentType.includes('application/pdf')) {
        responseData = await response.blob();
      } else {
        responseData = await response.text();
      }

      if (!response.ok) {
        throw new DreamApplyError(
          responseData.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          responseData
        );
      }

      return responseData;
    } catch (error) {
      if (error instanceof DreamApplyError) {
        throw error;
      }
      if (error.name === 'AbortError') {
        throw new DreamApplyError('Request timeout', 408, error);
      }
      throw new DreamApplyError(
        `Network error: ${error.message}`,
        0,
        error
      );
    }
  }

  /**
   * GET request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response data
   */
  async get(endpoint, options = {}) {
    return this.request('GET', endpoint, options);
  }

  /**
   * POST request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response data
   */
  async post(endpoint, options = {}) {
    return this.request('POST', endpoint, options);
  }

  /**
   * PUT request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response data
   */
  async put(endpoint, options = {}) {
    return this.request('PUT', endpoint, options);
  }

  /**
   * PATCH request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response data
   */
  async patch(endpoint, options = {}) {
    return this.request('PATCH', endpoint, options);
  }

  /**
   * DELETE request
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   * @returns {Promise<Object>} Response data
   */
  async delete(endpoint, options = {}) {
    return this.request('DELETE', endpoint, options);
  }
}

/**
 * Custom error class for DreamApply API errors
 */
class DreamApplyError extends Error {
  /**
   * @param {string} message - Error message
   * @param {number} status - HTTP status code
   * @param {Object} data - Additional error data
   */
  constructor(message, status, data = {}) {
    super(message);
    this.name = 'DreamApplyError';
    this.status = status;
    this.data = data;
  }
}

module.exports = { DreamApplyClient, DreamApplyError };

