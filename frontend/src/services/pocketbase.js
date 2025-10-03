/**
 * Pocketbase client singleton
 * Centralized Pocketbase instance for the entire application
 */
import PocketBase from 'pocketbase';

// Initialize Pocketbase client
const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL || 'http://localhost:8090');

// Enable auto cancellation for duplicate requests
pb.autoCancellation(false);

// Optional: persist auth state in localStorage (enabled by default)
pb.authStore.onChange(() => {
  console.log('Auth state changed:', pb.authStore.isValid ? 'Logged in' : 'Logged out');
});

export default pb;