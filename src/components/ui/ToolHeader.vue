<template>
  <header class="tool-header full-width">
    <!-- Full-width dark header with background image support -->
    <div class="header-container relative w-full border-primary mb-6">
      <!-- Background overlay for future images -->
      <div class="header-background absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <!-- Future: background image will go here -->
        <div class="background-overlay absolute inset-0 bg-black/40"></div>
      </div>

      <!-- Header content -->
      <div class="header-content relative z-10">
        <!-- Top navigation bar -->
        <div class="nav-bar flex items-center mb-3">
          <!-- Left side: Return button -->
          <div class="flex-1">
            <router-link
              to="/"
              class="return-button flex items-center space-x-3 text-white group"
            >
              <div class="button-background">
                <svg
                  class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </div>
              <span class="font-semibold text-lg">{{ backButtonText }}</span>
            </router-link>
          </div>

          <!-- Center: Tool icon -->
          <div v-if="icon" class="flex-1 flex justify-center">
            <div class="tool-icon filter drop-shadow-lg">
              <IconSystem :name="icon" size="xl" variant="electric" />
            </div>
          </div>

          <!-- Right side: Category badge -->
          <div v-if="category" class="flex-1 flex justify-end">
            <span class="category-badge">
              {{ categoryDisplayName }}
            </span>
          </div>
        </div>

        <!-- Main title section -->
        <div class="title-section text-center">
          <!-- Title -->
          <h1 class="tool-title text-5xl font-bold text-white mb-4 tracking-tight">{{ title }}</h1>

          <!-- Description -->
          <p v-if="description" class="tool-description text-white/90 text-xl leading-relaxed mb-6 max-w-3xl mx-auto font-medium">
            {{ description }}
          </p>

          <!-- Additional content slot -->
          <div v-if="$slots.content" class="additional-content mt-6">
            <slot name="content" />
          </div>
        </div>

        <!-- Optional actions at bottom -->
        <div v-if="$slots.actions" class="actions-section mt-8 flex justify-center">
          <slot name="actions" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import IconSystem from '@/components/ui/IconSystem.vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: ''
  },
  backButtonText: {
    type: String,
    default: 'Retour aux outils'
  },
  showBadges: {
    type: Boolean,
    default: false
  }
})

// Category display names mapping
const categoryNames = {
  theming: 'Théming & Couleurs',
  reference: 'Références & Documentation',
  dashboard: 'Tableaux de Bord',
  evaluation: 'Évaluation & Profils',
  visualization: 'Visualisation'
}

const categoryDisplayName = computed(() => {
  return categoryNames[props.category] || props.category
})
</script>

<style scoped>
.tool-header {
  position: relative;
  animation: slideDown var(--duration-slow) var(--easing-ease);
}

.full-width {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

.header-container {
  min-height: 140px;
  position: relative;
  overflow: hidden;
}

.header-background {
  background: var(--bg-primary);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

.background-overlay {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%);
}

.header-content {
  position: relative;
  z-index: var(--z-modal-content);
  max-width: 1280px;
  margin: 0 auto;
  padding: var(--space-lg) var(--space-xl);
}

/* Navigation bar */
.nav-bar {
  align-items: center;
  margin-bottom: var(--space-md);
}

.return-button {
  transition: all var(--duration-normal) var(--easing-smooth);
}

.return-button:hover {
  transform: translateX(calc(-1 * var(--space-xs)));
}

.button-background {
  transition: all var(--duration-normal) var(--easing-ease);
  box-shadow: var(--shadow-sm);
  background: var(--glass-lighter);
  backdrop-filter: blur(var(--blur-sm));
  border: 1px solid var(--border-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-md);
}

.return-button:hover .button-background {
  background: var(--glass-light);
  box-shadow: var(--shadow-lg);
  transform: scale(1.05);
}

/* Title section */
.title-section {
  margin-top: var(--space-lg);
}

.tool-icon {
  text-shadow: var(--shadow-lg);
  filter: drop-shadow(var(--shadow-md));
  animation: float 6s ease-in-out infinite;
}

.tool-title {
  text-shadow: var(--shadow-lg);
  font-weight: var(--font-extrabold);
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tool-description {
  text-shadow: var(--shadow-md);
  line-height: var(--leading-relaxed);
}

.category-badge {
  background: var(--electric-blue);
  color: var(--bg-primary);
  padding: var(--space-xs) var(--space-md);
  border-radius: var(--radius-xl);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.status-badge {
  transition: all var(--duration-normal) var(--easing-ease);
  box-shadow: var(--shadow-glow-success);
}

.status-badge:hover {
  transform: translateY(calc(-1 * var(--space-xs)));
  box-shadow: var(--shadow-glow-success-strong);
}

/* Animations */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .header-content {
    padding: var(--space-xl) var(--space-lg);
  }

  .nav-bar {
    margin-bottom: var(--space-lg);
    flex-direction: column;
    gap: var(--space-lg);
  }

  .nav-bar > div {
    flex: none;
    width: 100%;
    justify-content: center;
  }

  .nav-bar .return-button {
    justify-content: center;
  }

  .return-button span {
    font-size: var(--text-base);
  }

  .category-badge {
    padding: var(--space-sm) var(--space-lg);
    font-size: var(--text-base);
  }

  .tool-title {
    font-size: var(--text-4xl);
    margin-bottom: var(--space-lg);
  }

  .tool-description {
    font-size: var(--text-lg);
    margin-bottom: var(--space-xl);
  }

  .tool-icon {
    font-size: var(--text-6xl);
    margin-bottom: var(--space-xl);
  }
}

@media (max-width: 480px) {
  .header-container {
    min-height: 120px;
  }

  .header-content {
    padding: var(--space-lg) var(--space-md);
  }

  .nav-bar {
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-lg);
  }

  .nav-bar > div {
    flex: none;
    width: 100%;
    justify-content: center;
  }

  .return-button {
    justify-content: center;
  }

  .tool-title {
    font-size: var(--text-3xl);
  }

  .tool-description {
    font-size: var(--text-base);
  }

  .tool-icon {
    font-size: var(--text-5xl);
  }
}

/* Future: Background image support */
.header-background.with-image {
  background-image: var(--header-bg-image);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.header-background.with-image .background-overlay {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%);
}
</style>