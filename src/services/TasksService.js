/**
 * Tasks Service
 * Handles all task-related API operations
 */

class TasksService {
  /**
   * @param {DreamApplyClient} client - DreamApply client instance
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * Assign a task to an applicant
   * @param {Object} taskData - Task data
   * @returns {Promise<Object>} Created task
   */
  async create(taskData) {
    return this.client.post('/api/tasks', { data: taskData });
  }

  /**
   * Retrieve task by ID
   * @param {string|number} taskId - Task ID
   * @param {Object} options - Query options
   * @returns {Promise<Object>} Task data
   */
  async getById(taskId, options = {}) {
    return this.client.get(`/api/tasks/${taskId}`, { params: options });
  }

  /**
   * List all tasks
   * @param {Object} options - Query options (filters, pagination, sorting)
   * @returns {Promise<Object>} List of tasks
   */
  async list(options = {}) {
    return this.client.get('/api/tasks', { params: options });
  }

  /**
   * Update task details
   * @param {string|number} taskId - Task ID
   * @param {Object} taskData - Updated task data
   * @returns {Promise<Object>} Updated task
   */
  async update(taskId, taskData) {
    return this.client.put(`/api/tasks/${taskId}`, { data: taskData });
  }

  /**
   * Partially update task
   * @param {string|number} taskId - Task ID
   * @param {Object} taskData - Partial task data
   * @returns {Promise<Object>} Updated task
   */
  async patch(taskId, taskData) {
    return this.client.patch(`/api/tasks/${taskId}`, { data: taskData });
  }

  /**
   * Update task status
   * @param {string|number} taskId - Task ID
   * @param {string} status - New status
   * @returns {Promise<Object>} Updated task
   */
  async updateStatus(taskId, status) {
    return this.client.patch(`/api/tasks/${taskId}`, {
      data: { status }
    });
  }

  /**
   * Mark task as complete
   * @param {string|number} taskId - Task ID
   * @returns {Promise<Object>} Updated task
   */
  async complete(taskId) {
    return this.updateStatus(taskId, 'completed');
  }

  /**
   * Delete task
   * @param {string|number} taskId - Task ID
   * @returns {Promise<Object>} Deletion result
   */
  async delete(taskId) {
    return this.client.delete(`/api/tasks/${taskId}`);
  }

  /**
   * Get tasks for an applicant
   * @param {string|number} applicantId - Applicant ID
   * @returns {Promise<Object>} List of tasks
   */
  async getByApplicant(applicantId) {
    return this.client.get(`/api/applicants/${applicantId}/tasks`);
  }

  /**
   * Get tasks for an application
   * @param {string|number} applicationId - Application ID
   * @returns {Promise<Object>} List of tasks
   */
  async getByApplication(applicationId) {
    return this.client.get(`/api/applications/${applicationId}/tasks`);
  }

  /**
   * Create external task integration (JWT-based)
   * @param {Object} taskData - Task data with external integration config
   * @returns {Promise<Object>} Created task with JWT token
   */
  async createExternalTask(taskData) {
    return this.client.post('/api/tasks/external', { data: taskData });
  }
}

module.exports = TasksService;

