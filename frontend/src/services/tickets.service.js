/**
 * Tickets Service
 * Handles all ticket-related operations with Pocketbase
 */
import pb from './pocketbase';
import authService from './auth.service';

export const ticketsService = {
  COLLECTION: 'tickets',

  /**
   * Create a new ticket
   * @param {Object} ticketData - Ticket data
   * @returns {Promise<Object>} Created ticket
   */
  async create(ticketData) {
    try {
      const userId = authService.getCurrentUserId();
      if (!userId) {
        throw new Error('Not authenticated');
      }

      const data = {
        ...ticketData,
        user_id: userId,
      };

      const ticket = await pb.collection(this.COLLECTION).create(data);
      return ticket;
    } catch (error) {
      console.error('Create ticket error:', error);
      throw this.handleError(error);
    }
  },

  /**
   * Get all tickets for current user
   * @param {Object} options - Query options
   * @param {string} [options.filter] - Additional filter
   * @param {string} [options.sort] - Sort order
   * @param {number} [options.page] - Page number
   * @param {number} [options.perPage] - Items per page
   * @returns {Promise<Object>} Paginated tickets
   */
  async list({ filter = '', sort = '-created', page = 1, perPage = 50 } = {}) {
    try {
      const result = await pb.collection(this.COLLECTION).getList(page, perPage, {
        filter,
        sort,
        expand: 'user_id',
      });

      return {
        items: result.items,
        page: result.page,
        perPage: result.perPage,
        totalItems: result.totalItems,
        totalPages: result.totalPages,
      };
    } catch (error) {
      console.error('List tickets error:', error);
      throw this.handleError(error);
    }
  },

  /**
   * Get all tickets (no pagination)
   * @param {Object} options - Query options
   * @returns {Promise<Array>} All tickets
   */
  async getAll({ filter = '', sort = '-created' } = {}) {
    try {
      const tickets = await pb.collection(this.COLLECTION).getFullList({
        filter,
        sort,
        expand: 'user_id',
      });

      return tickets;
    } catch (error) {
      console.error('Get all tickets error:', error);
      throw this.handleError(error);
    }
  },

  /**
   * Get a single ticket by ID
   * @param {string} id - Ticket ID
   * @returns {Promise<Object>} Ticket
   */
  async get(id) {
    try {
      const ticket = await pb.collection(this.COLLECTION).getOne(id, {
        expand: 'user_id',
      });
      return ticket;
    } catch (error) {
      console.error('Get ticket error:', error);
      throw this.handleError(error);
    }
  },

  /**
   * Update a ticket
   * @param {string} id - Ticket ID
   * @param {Object} data - Updated data
   * @returns {Promise<Object>} Updated ticket
   */
  async update(id, data) {
    try {
      const ticket = await pb.collection(this.COLLECTION).update(id, data);
      return ticket;
    } catch (error) {
      console.error('Update ticket error:', error);
      throw this.handleError(error);
    }
  },

  /**
   * Delete a ticket
   * @param {string} id - Ticket ID
   * @returns {Promise<boolean>} Success status
   */
  async delete(id) {
    try {
      await pb.collection(this.COLLECTION).delete(id);
      return true;
    } catch (error) {
      console.error('Delete ticket error:', error);
      throw this.handleError(error);
    }
  },

  /**
   * Search tickets
   * @param {string} query - Search query
   * @param {Object} options - Additional options
   * @returns {Promise<Array>} Matching tickets
   */
  async search(query, { status, priority, customer } = {}) {
    try {
      let filter = '';
      const filters = [];

      // Text search
      if (query) {
        filters.push(`(title ~ "${query}" || description ~ "${query}" || customer ~ "${query}")`);
      }

      // Status filter
      if (status && status !== 'all') {
        filters.push(`status = "${status}"`);
      }

      // Priority filter
      if (priority && priority !== 'all') {
        filters.push(`priority = "${priority}"`);
      }

      // Customer filter
      if (customer) {
        filters.push(`customer ~ "${customer}"`);
      }

      filter = filters.join(' && ');

      return await this.getAll({ filter, sort: '-created' });
    } catch (error) {
      console.error('Search tickets error:', error);
      throw this.handleError(error);
    }
  },

  /**
   * Get tickets by status
   * @param {string} status - Status filter
   * @returns {Promise<Array>} Tickets with status
   */
  async getByStatus(status) {
    try {
      const filter = `status = "${status}"`;
      return await this.getAll({ filter, sort: '-created' });
    } catch (error) {
      console.error('Get tickets by status error:', error);
      throw this.handleError(error);
    }
  },

  /**
   * Get tickets by priority
   * @param {string} priority - Priority filter
   * @returns {Promise<Array>} Tickets with priority
   */
  async getByPriority(priority) {
    try {
      const filter = `priority = "${priority}"`;
      return await this.getAll({ filter, sort: '-created' });
    } catch (error) {
      console.error('Get tickets by priority error:', error);
      throw this.handleError(error);
    }
  },

  /**
   * Get overdue tickets
   * @returns {Promise<Array>} Overdue tickets
   */
  async getOverdue() {
    try {
      const today = new Date().toISOString().split('T')[0];
      const filter = `due_date < "${today}" && status != "completed"`;
      return await this.getAll({ filter, sort: 'due_date' });
    } catch (error) {
      console.error('Get overdue tickets error:', error);
      throw this.handleError(error);
    }
  },

  /**
   * Get upcoming callbacks
   * @param {number} hours - Hours ahead to check
   * @returns {Promise<Array>} Upcoming callbacks
   */
  async getUpcomingCallbacks(hours = 24) {
    try {
      const now = new Date();
      const future = new Date(now.getTime() + hours * 60 * 60 * 1000);

      const filter = `type = "callback" && callback_time >= "${now.toISOString()}" && callback_time <= "${future.toISOString()}" && status != "completed"`;
      return await this.getAll({ filter, sort: 'callback_time' });
    } catch (error) {
      console.error('Get upcoming callbacks error:', error);
      throw this.handleError(error);
    }
  },

  /**
   * Bulk update tickets
   * @param {Array<string>} ids - Ticket IDs
   * @param {Object} data - Data to update
   * @returns {Promise<Array>} Updated tickets
   */
  async bulkUpdate(ids, data) {
    try {
      const promises = ids.map(id => this.update(id, data));
      return await Promise.all(promises);
    } catch (error) {
      console.error('Bulk update tickets error:', error);
      throw this.handleError(error);
    }
  },

  /**
   * Bulk delete tickets
   * @param {Array<string>} ids - Ticket IDs
   * @returns {Promise<boolean>} Success status
   */
  async bulkDelete(ids) {
    try {
      const promises = ids.map(id => this.delete(id));
      await Promise.all(promises);
      return true;
    } catch (error) {
      console.error('Bulk delete tickets error:', error);
      throw this.handleError(error);
    }
  },

  /**
   * Subscribe to ticket changes (real-time)
   * @param {Function} callback - Callback for changes
   * @param {string} [recordId] - Specific record ID or '*' for all
   * @returns {Promise<Function>} Unsubscribe function
   */
  async subscribe(callback, recordId = '*') {
    try {
      return await pb.collection(this.COLLECTION).subscribe(recordId, (e) => {
        callback({
          action: e.action, // create, update, delete
          record: e.record,
        });
      });
    } catch (error) {
      console.error('Subscribe error:', error);
      throw this.handleError(error);
    }
  },

  /**
   * Unsubscribe from ticket changes
   * @param {string} [recordId] - Specific record ID or omit for all
   */
  async unsubscribe(recordId) {
    try {
      await pb.collection(this.COLLECTION).unsubscribe(recordId);
    } catch (error) {
      console.error('Unsubscribe error:', error);
      throw this.handleError(error);
    }
  },

  /**
   * Get ticket statistics
   * @returns {Promise<Object>} Statistics
   */
  async getStats() {
    try {
      const tickets = await this.getAll();

      const stats = {
        total: tickets.length,
        byStatus: {
          todo: 0,
          'in-progress': 0,
          waiting: 0,
          completed: 0,
        },
        byPriority: {
          low: 0,
          medium: 0,
          high: 0,
          urgent: 0,
        },
        byType: {
          callback: 0,
          task: 0,
        },
        overdue: 0,
      };

      const today = new Date().toISOString().split('T')[0];

      tickets.forEach(ticket => {
        stats.byStatus[ticket.status]++;
        stats.byPriority[ticket.priority]++;
        stats.byType[ticket.type]++;

        if (ticket.due_date && ticket.due_date < today && ticket.status !== 'completed') {
          stats.overdue++;
        }
      });

      return stats;
    } catch (error) {
      console.error('Get stats error:', error);
      throw this.handleError(error);
    }
  },

  /**
   * Export tickets to JSON
   * @param {Object} options - Export options
   * @returns {Promise<string>} JSON string
   */
  async exportToJSON({ filter = '', sort = '-created' } = {}) {
    try {
      const tickets = await this.getAll({ filter, sort });
      return JSON.stringify(tickets, null, 2);
    } catch (error) {
      console.error('Export tickets error:', error);
      throw this.handleError(error);
    }
  },

  /**
   * Handle and format errors
   * @private
   */
  handleError(error) {
    if (error.response?.data) {
      const { data } = error.response;

      if (data.data) {
        const firstKey = Object.keys(data.data)[0];
        if (firstKey && data.data[firstKey]?.message) {
          return new Error(data.data[firstKey].message);
        }
      }

      if (data.message) {
        return new Error(data.message);
      }
    }

    return error;
  },
};

export default ticketsService;
