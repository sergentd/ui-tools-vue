<template>
  <header class="tool-header full-width">
    <!-- Full-width dark header with background image support -->
    <div class="header-container relative w-full border-primary">
      <!-- Background overlay for future images -->
      <div class="header-background absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <!-- Future: background image will go here -->
        <div class="background-overlay absolute inset-0 bg-black/40"></div>
      </div>

      <!-- Header content -->
      <div class="header-content relative z-10 max-w-7xl mx-auto px-6 py-4">
        <!-- Top navigation bar -->
        <div class="nav-bar flex items-center mb-3">
          <!-- Left side: Return button -->
          <div class="flex-1">
            <router-link
              to="/"
              class="return-button flex items-center space-x-3 text-white/90 hover:text-white transition-all duration-300 group"
            >
              <div class="button-background bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl p-3 transition-all duration-300">
                <svg
                  class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
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
            <span class="category-badge bg-white/15 backdrop-blur-sm border border-white/25 text-white px-3 py-1 rounded-lg font-medium text-sm">
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
  animation: slideDown 0.6s ease-out;
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
  background: linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

.background-overlay {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%);
}

.header-content {
  position: relative;
  z-index: 10;
}

/* Navigation bar */
.nav-bar {
  align-items: center;
}

.return-button {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.return-button:hover {
  transform: translateX(-4px);
}

.button-background {
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.return-button:hover .button-background {
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
  transform: scale(1.05);
}

/* Title section */
.title-section {
  margin-top: 1rem;
}

.tool-icon {
  text-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  animation: float 6s ease-in-out infinite;
}

.tool-title {
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  font-weight: 800;
  letter-spacing: -0.025em;
  background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.tool-description {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  line-height: 1.8;
}

.status-badge {
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(34, 197, 94, 0.3);
}

.status-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(34, 197, 94, 0.4);
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
    padding: 1.5rem 1rem;
  }

  .nav-bar {
    margin-bottom: 1rem;
    flex-direction: column;
    gap: 1rem;
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
    font-size: 1rem;
  }

  .category-badge {
    padding: 0.5rem 1rem;
    font-size: 1rem;
  }

  .tool-title {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  .tool-description {
    font-size: 1.125rem;
    margin-bottom: 1.5rem;
  }

  .tool-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 480px) {
  .header-container {
    min-height: 120px;
  }

  .header-content {
    padding: 1rem 0.75rem;
  }

  .nav-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
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
    font-size: 2rem;
  }

  .tool-description {
    font-size: 1rem;
  }

  .tool-icon {
    font-size: 3rem;
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