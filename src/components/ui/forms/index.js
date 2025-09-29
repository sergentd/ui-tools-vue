/**
 * Form UI Components
 *
 * Reusable form input components that provide consistent styling,
 * validation, and accessibility features across the application.
 */

// Form components
export { default as UIInput } from './UIInput.vue'
export { default as UISelect } from './UISelect.vue'

// Re-export everything as a single object for convenience
import UIInput from './UIInput.vue'
import UISelect from './UISelect.vue'

export const FormComponents = {
  UIInput,
  UISelect
}

export default FormComponents