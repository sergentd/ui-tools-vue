/**
 * Authentication Service
 * Handles user registration, login, logout, and auth state
 */
import pb from './pocketbase';

export const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @param {string} userData.email - User email
   * @param {string} userData.password - User password
   * @param {string} userData.passwordConfirm - Password confirmation
   * @param {string} [userData.name] - Optional display name
   * @returns {Promise<Object>} Created user record
   */
  async register({ email, password, passwordConfirm, name }) {
    try {
      const data = {
        email,
        password,
        passwordConfirm,
        emailVisibility: true,
      };

      if (name) {
        data.name = name;
      }

      const user = await pb.collection('users').create(data);

      // Auto-login after registration
      await this.login({ email, password });

      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw this.handleAuthError(error);
    }
  },

  /**
   * Login with email and password
   * @param {Object} credentials - Login credentials
   * @param {string} credentials.email - User email
   * @param {string} credentials.password - User password
   * @returns {Promise<Object>} Auth data with token and user
   */
  async login({ email, password }) {
    try {
      const authData = await pb.collection('users').authWithPassword(email, password);
      return authData;
    } catch (error) {
      console.error('Login error:', error);
      throw this.handleAuthError(error);
    }
  },

  /**
   * Logout current user
   */
  logout() {
    pb.authStore.clear();
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if authenticated
   */
  isAuthenticated() {
    return pb.authStore.isValid;
  },

  /**
   * Get current authenticated user
   * @returns {Object|null} Current user or null
   */
  getCurrentUser() {
    return pb.authStore.model;
  },

  /**
   * Get current user ID
   * @returns {string|null} Current user ID or null
   */
  getCurrentUserId() {
    return pb.authStore.model?.id || null;
  },

  /**
   * Refresh authentication token
   * @returns {Promise<Object>} Refreshed auth data
   */
  async refresh() {
    try {
      return await pb.collection('users').authRefresh();
    } catch (error) {
      console.error('Token refresh error:', error);
      this.logout();
      throw error;
    }
  },

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise<boolean>} Success status
   */
  async requestPasswordReset(email) {
    try {
      await pb.collection('users').requestPasswordReset(email);
      return true;
    } catch (error) {
      console.error('Password reset request error:', error);
      throw this.handleAuthError(error);
    }
  },

  /**
   * Confirm password reset
   * @param {string} token - Reset token from email
   * @param {string} password - New password
   * @param {string} passwordConfirm - Password confirmation
   * @returns {Promise<boolean>} Success status
   */
  async confirmPasswordReset(token, password, passwordConfirm) {
    try {
      await pb.collection('users').confirmPasswordReset(token, password, passwordConfirm);
      return true;
    } catch (error) {
      console.error('Password reset confirmation error:', error);
      throw this.handleAuthError(error);
    }
  },

  /**
   * Update user profile
   * @param {Object} data - Updated user data
   * @returns {Promise<Object>} Updated user record
   */
  async updateProfile(data) {
    try {
      const userId = this.getCurrentUserId();
      if (!userId) {
        throw new Error('Not authenticated');
      }

      const updatedUser = await pb.collection('users').update(userId, data);
      return updatedUser;
    } catch (error) {
      console.error('Profile update error:', error);
      throw this.handleAuthError(error);
    }
  },

  /**
   * Subscribe to auth state changes
   * @param {Function} callback - Callback function
   * @returns {Function} Unsubscribe function
   */
  onAuthChange(callback) {
    return pb.authStore.onChange(() => {
      callback({
        isAuthenticated: this.isAuthenticated(),
        user: this.getCurrentUser(),
      });
    });
  },

  /**
   * Handle and format auth errors
   * @private
   */
  handleAuthError(error) {
    if (error.response?.data) {
      const { data } = error.response;

      // Extract first error message
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

export default authService;