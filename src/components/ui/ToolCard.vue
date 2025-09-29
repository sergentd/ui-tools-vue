<template>
  <div class="relative">
    <router-link
      v-if="useVueRouting"
      :to="vueRoute"
      class="tool-card glass-card-white hover-lift hover-glow block p-6 rounded-2xl group relative overflow-hidden border-2 border-transparent hover:border-electric-blue/30 transition-all duration-300"
      :data-category="category"
    >
      <!-- Gradient overlay -->
      <div class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-electric-blue/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div class="flex flex-col h-full relative z-10">
        <div class="flex items-center justify-between mb-4 relative">
          <div class="tool-icon group-hover:scale-110 transition-transform duration-300 relative">
            <IconSystem :name="tool.icon" size="xl" variant="electric" />
            <div class="absolute -inset-2 bg-electric-blue/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div class="text-xs text-gray-500 font-medium uppercase tracking-wide absolute left-1/2 -translate-x-1/2 bg-glass-bg-light px-2 py-1 rounded-full">
            {{ category }}
          </div>
          <button @click.prevent="toggleFavorite" class="text-gray-400 hover:text-electric-blue transition-colors z-10 p-1 rounded-full hover:bg-electric-blue/10">
            <svg :class="{ 'text-electric-blue': isFavorite }" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
          </button>
        </div>

        <h3 class="text-xl font-bold text-white mb-3 leading-tight" v-html="highlightTitle(tool.titre)">
        </h3>

        <p class="text-gray-300 flex-grow text-sm leading-relaxed mb-4">
          {{ tool.description }}
        </p>

        <div class="flex items-center justify-between pt-4 border-t border-border-primary group-hover:border-electric-blue/20 transition-colors">
          <span class="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
            {{ tool.migrated ? 'Application Vue' : 'Cliquer pour naviguer' }}
          </span>
          <div class="flex items-center space-x-1">
            <svg
              class="w-4 h-4 text-gray-400 group-hover:text-electric-blue transition-colors"
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
          <div class="w-1 h-1 bg-electric-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        </div>
      </div>
    </router-link>

    <a
      v-else
      :href="tool.url"
      class="tool-card glass-card-white hover-lift hover-glow block p-6 rounded-2xl group relative overflow-hidden border-2 border-transparent hover:border-electric-blue/30 transition-all duration-300"
      :data-category="category"
      target="_blank"
      rel="noopener noreferrer"
    >
      <!-- Gradient overlay -->
      <div class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-electric-blue/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div class="flex flex-col h-full relative z-10">
        <div class="flex items-center justify-between mb-4 relative">
          <div class="tool-icon group-hover:scale-110 transition-transform duration-300 relative">
            <IconSystem :name="tool.icon" size="xl" variant="electric" />
            <div class="absolute -inset-2 bg-electric-blue/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div class="text-xs text-gray-500 font-medium uppercase tracking-wide absolute left-1/2 -translate-x-1/2 bg-glass-bg-light px-2 py-1 rounded-full">
            {{ category }}
          </div>
          <button @click.prevent="toggleFavorite" class="text-gray-400 hover:text-electric-blue transition-colors z-10 p-1 rounded-full hover:bg-electric-blue/10">
            <svg :class="{ 'text-electric-blue': isFavorite }" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
            </svg>
          </button>
        </div>

        <h3 class="text-xl font-bold text-white mb-3 leading-tight" v-html="highlightTitle(tool.titre)">
        </h3>

        <p class="text-gray-300 flex-grow text-sm leading-relaxed mb-4">
          {{ tool.description }}
        </p>

        <div class="flex items-center justify-between pt-4 border-t border-border-primary group-hover:border-electric-blue/20 transition-colors">
          <span class="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
            {{ tool.migrated ? 'Application Vue' : 'Cliquer pour ouvrir' }}
          </span>
          <div class="flex items-center space-x-1">
            <svg
              class="w-4 h-4 text-gray-400 group-hover:text-electric-blue transition-colors"
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
            <div class="w-1 h-1 bg-electric-blue rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>
      </div>
    </a>
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