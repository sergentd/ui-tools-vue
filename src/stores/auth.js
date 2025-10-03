/**
 * Authentication Store
 * Manages user authentication state with Pocketbase
 */
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import authService from '../services/auth.service';

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(authService.getCurrentUser());
  const isAuthenticated = ref(authService.isAuthenticated());
  const isLoading = ref(false);
  const error = ref(null);

  // Computed
  const userId = computed(() => user.value?.id || null);
  const userEmail = computed(() => user.value?.email || null);
  const userName = computed(() => user.value?.name || user.value?.email || 'User');

  // Actions
  async function register(userData) {
    isLoading.value = true;
    error.value = null;

    try {
      const newUser = await authService.register(userData);
      user.value = newUser;
      isAuthenticated.value = true;
      return newUser;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function login(credentials) {
    isLoading.value = true;
    error.value = null;

    try {
      const authData = await authService.login(credentials);
      user.value = authData.record;
      isAuthenticated.value = true;
      return authData;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    authService.logout();
    user.value = null;
    isAuthenticated.value = false;
    error.value = null;
  }

  async function refresh() {
    isLoading.value = true;
    error.value = null;

    try {
      const authData = await authService.refresh();
      user.value = authData.record;
      isAuthenticated.value = true;
      return authData;
    } catch (err) {
      error.value = err.message;
      logout();
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function updateProfile(data) {
    isLoading.value = true;
    error.value = null;

    try {
      const updatedUser = await authService.updateProfile(data);
      user.value = updatedUser;
      return updatedUser;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function requestPasswordReset(email) {
    isLoading.value = true;
    error.value = null;

    try {
      await authService.requestPasswordReset(email);
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  async function confirmPasswordReset(token, password, passwordConfirm) {
    isLoading.value = true;
    error.value = null;

    try {
      await authService.confirmPasswordReset(token, password, passwordConfirm);
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  }

  function clearError() {
    error.value = null;
  }

  // Initialize auth state listener
  authService.onAuthChange(({ isAuthenticated: authStatus, user: authUser }) => {
    isAuthenticated.value = authStatus;
    user.value = authUser;
  });

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,

    // Computed
    userId,
    userEmail,
    userName,

    // Actions
    register,
    login,
    logout,
    refresh,
    updateProfile,
    requestPasswordReset,
    confirmPasswordReset,
    clearError,
  };
});