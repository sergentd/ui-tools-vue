<template>
  <div class="relative">
    <!-- Click handler -->
    <component
      :is="useVueRouting && vueRoute ? 'router-link' : 'a'"
      :to="useVueRouting && vueRoute ? vueRoute : undefined"
      :href="!useVueRouting || !vueRoute ? (tool.url || '#') : undefined"
      :target="!useVueRouting ? '_blank' : undefined"
      :rel="!useVueRouting ? 'noopener noreferrer' : undefined"
      class="tool-card glass-card-white hover-lift hover-glow card-interactive block group relative overflow-hidden"
      :data-category="category"
      @click="handleClick"
    >
      <!-- Gradient overlay -->
      <div class="gradient-overlay"></div>

      <!-- Card Content -->
      <div class="flex flex-col h-full relative z-10">
        <!-- Header with icon, category, and favorite button -->
        <div class="card-header">
          <div class="tool-icon hover-scale-lg transition-default relative">
            <IconSystem :name="tool.icon" size="xl" variant="electric" />
            <div class="icon-glow"></div>
          </div>
          <div class="category-label">
            {{ category }}
          </div>
          <button @click.prevent="toggleFavorite" class="favorite-button">
            <svg :class="{ 'text-electric-blue': isFavorite }" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
          </button>
        </div>

        <h3 class="card-title" v-html="highlightTitle(tool.titre)">
        </h3>

        <p class="card-description">
          {{ tool.description }}
        </p>

        <div class="card-footer">
          <span class="footer-label">Ouvrir l'outil</span>
          <div class="footer-actions">
            <svg
              v-if="useVueRouting"
              class="action-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <svg
              v-else
              class="action-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            <div class="action-dot"></div>
          </div>
        </div>
      </div>
    </component>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCatalogStore } from '@/stores/catalog'
import IconSystem from '@/components/ui/IconSystem.vue'

const props = defineProps({
  tool: {
    type: Object,
    required: true,
    validator: (tool) => {
      return tool && tool.id && tool.titre && tool.description && tool.icon
    }
  },
  category: {
    type: String,
    required: true
  },
  useRouter: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])
const catalog = useCatalogStore()

const isFavorite = computed(() => catalog.isFavorite(props.tool.id))

const toggleFavorite = () => {
  catalog.toggleFavorite(props.tool.id)
}

// Automatically use Vue routing for migrated tools
const useVueRouting = computed(() => {
  return props.tool.migrated || props.useRouter
})

// Route for Vue migrated tools
const vueRoute = computed(() => {
  if (props.tool.migrated && props.tool.vueRoute) {
    return props.tool.vueRoute
  }
  if (props.useRouter) {
    return {
      name: 'Tool',
      params: {
        category: props.category,
        id: props.tool.id
      }
    }
  }
  return null
})

const handleClick = () => {
  emit('click', props.tool)
}

// Highlight the unique/differentiating word in the title with electric blue
const highlightTitle = (title) => {
  const words = title.split(' ')
  if (words.length === 1) return title

  // Highlight the word that makes each tool unique (the main subject/object)
  const highlights = {
    'Palette': true,      // Générateur de Palette
    'Grille': true,       // Générateur de Grille CSS
    'Contraste': true,    // Vérificateur de Contraste
    'Ombres': true,       // Générateur d'Ombres
    'Flexbox': true,      // Terrain de Jeu Flexbox
    'Dégradés': true,     // Générateur de Dégradés
    'WEBDEV': true,       // Glossaire WEBDEV
    'Multi-Clients': true, // WEBDEV Multi-Clients
    'Spécificité': true,  // Spécificité CSS
    'WebUI': true,        // Principes WebUI
    'Compétences': true,  // Évaluateur de Compétences
    'Mind': true,         // Mind Map Avancée
    'Map': true          // Mind Map Avancée (fallback)
  }

  let highlightIndex = -1
  words.forEach((word, index) => {
    if (highlights[word]) {
      highlightIndex = index
    }
  })

  // If no specific word found, highlight the last meaningful word
  if (highlightIndex === -1) {
    // Skip common words and highlight the most meaningful one
    const skipWords = ['de', 'du', 'des', 'le', 'la', 'les', 'et', 'Générateur', 'Vérificateur', 'Terrain', 'Jeu', 'Évaluateur', 'Principes']
    for (let i = words.length - 1; i >= 0; i--) {
      if (!skipWords.includes(words[i])) {
        highlightIndex = i
        break
      }
    }
  }

  const highlightedWords = words.map((word, index) => {
    if (index === highlightIndex) {
      return `<span class="text-electric-blue">${word}</span>`
    }
    return word
  })

  return highlightedWords.join(' ')
}
</script>

<style scoped>
.tool-card {
  padding: var(--card-padding);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-primary);
  transition: all var(--duration-normal) var(--easing-smooth);
}

.tool-card:hover {
  border-color: var(--electric-blue-alpha-30);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
  position: relative;
}

.icon-glow {
  position: absolute;
  inset: calc(-1 * var(--space-2));
  background: rgba(var(--electric-blue-rgb), 0.05);
  border-radius: var(--radius-full);
  opacity: 0;
  transition: opacity var(--duration-normal) var(--easing-ease);
}

.tool-card:hover .icon-glow {
  opacity: 1;
}

.category-label {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--glass-light);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-full);
}

.favorite-button {
  color: var(--text-muted);
  transition: color var(--duration-normal) var(--easing-ease);
  z-index: 10;
  padding: var(--space-1);
  border-radius: var(--radius-full);
}

.favorite-button:hover {
  color: var(--electric-blue);
  background: var(--electric-blue-alpha);
}

.card-title {
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--text-primary);
  margin-bottom: var(--space-3);
  line-height: var(--leading-tight);
}

.card-description {
  color: var(--text-secondary);
  flex-grow: 1;
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-primary);
  transition: border-color var(--duration-normal) var(--easing-ease);
}

.tool-card:hover .card-footer {
  border-top-color: var(--electric-blue-alpha-20);
}

.footer-label {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  transition: color var(--duration-normal) var(--easing-ease);
}

.tool-card:hover .footer-label {
  color: var(--electric-blue);
}

.footer-actions {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.action-icon {
  width: var(--space-4);
  height: var(--space-4);
  color: var(--text-muted);
  transition: color var(--duration-normal) var(--easing-ease);
}

.tool-card:hover .action-icon {
  color: var(--electric-blue);
}

.action-dot {
  width: var(--space-1);
  height: var(--space-1);
  background: var(--electric-blue);
  border-radius: var(--radius-full);
  opacity: 0;
  transition: opacity var(--duration-normal) var(--easing-ease);
}

.tool-card:hover .action-dot {
  opacity: 1;
}
</style>