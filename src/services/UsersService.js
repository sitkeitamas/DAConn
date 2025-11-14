/**
 * Users Service
 * Handles user role and permission management
 */

class UsersService {
  /**
   * @param {DreamApplyClient} client - DreamApply client instance
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Retrieve user by ID
   * @param {string|number} userId - User ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} User data
   */
  async getById(userId, options = {}) {
    return this.client.get(`/api/users/${userId}`, { params: options });
  }

  /**
   * List all users
   * @param {Object} options - Query options (filters, pagination, sorting)
   * @returns {Promise<Object>} List of users
   */
  async list(options = {}) {
    return this.client.get('/api/users', { params: options });
  }

  /**
   * Get user roles
   * @param {string|number} userId - User ID
   * @returns {Promise<Object>} User roles
   */
  async getRoles(userId) {
    return this.client.get(`/api/users/${userId}/roles`);
  }

  /**
   * Get user permissions
   * @param {string|number} userId - User ID
   * @returns {Promise<Object>} User permissions
   */
  async getPermissions(userId) {
    return this.client.get(`/api/users/${userId}/permissions`);
  }

  /**
   * Assign role to user
   * @param {string|number} userId - User ID
   * @param {string|number} roleId - Role ID
   * @returns {Promise<Object>} Assignment result
   */
  async assignRole(userId, roleId) {
    return this.client.post(`/api/users/${userId}/roles`, {
      data: { roleId }
    });
  }

  /**
   * Update user permissions
   * @param {string|number} userId - User ID
   * @param {Object} permissions - Permissions data
   * @returns {Promise<Object>} Updated permissions
   */
  async updatePermissions(userId, permissions) {
    return this.client.put(`/api/users/${userId}/permissions`, {
      data: permissions
    });
  }

  /**
   * Remove role from user
   * @param {string|number} userId - User ID
   * @param {string|number} roleId - Role ID
   * @returns {Promise<Object>} Removal result
   */
  async removeRole(userId, roleId) {
    return this.client.delete(`/api/users/${userId}/roles/${roleId}`);
  }

  /**
   * List available roles
   * @returns {Promise<Object>} List of roles
   */
  async listRoles() {
    return this.client.get('/api/roles');
  }
}

module.exports = UsersService;

