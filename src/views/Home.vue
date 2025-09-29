<template>
  <div class="min-h-screen py-8">
    <div class="container mx-auto px-4 max-w-7xl">

      <!-- Header Section -->
      <div class="text-center mb-12">
        <GlassCard variant="glass" class="max-w-4xl mx-auto hover-glow">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            <span class="text-electric-blue">UI</span> Tools
          </h1>
          <p class="text-xl text-gray-300 mb-6">
            Collection d'outils interactifs pour le développement web
          </p>
          <div class="flex items-center justify-center space-x-4">
            <span class="category-badge hover-lift">
              {{ toolCount }} outil{{ toolCount > 1 ? 's' : '' }} disponible{{ toolCount > 1 ? 's' : '' }}
            </span>
          </div>
        </GlassCard>
      </div>

      <!-- Filter Menu -->
      <FilterMenu
        :categories="categories"
        :active-filter="activeFilter"
        :available-categories="availableCategories"
        @filter-change="handleFilterChange"
        :favorites-count="favoritesCount"
      />

      <!-- Search Bar -->
      <div class="max-w-md mx-auto mb-8">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher un outil..."
            class="w-full px-4 py-3 pl-10 bg-glass-bg-light backdrop-blur-sm border border-border-primary
                   rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2
                   focus:ring-electric-blue focus:border-electric-blue transition-all duration-200"
          >
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>

      <!-- Tools Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        <ToolCard
          v-for="tool in filteredTools"
          :key="`${getCategoryForTool(tool)}-${tool.id}`"
          :tool="tool"
          :category="getCategoryForTool(tool)"
          :use-router="false"
          class="w-full"
        />
      </div>

      <!-- Empty State -->
      <div v-if="filteredTools.length === 0" class="text-center py-12">
        <GlassCard variant="glass" class="max-w-md mx-auto">
          <div class="mb-4 flex justify-center">
            <IconSystem name="search" size="2xl" variant="electric" />
          </div>
          <h3 class="text-xl font-semibold text-white mb-2">Aucun outil trouvé</h3>
          <p class="text-gray-300">
            {{ searchQuery ? 'Essayez avec d\'autres mots-clés' : 'Sélectionnez une catégorie différente' }}
          </p>
          <button
            v-if="activeFilter !== 'all' || searchQuery"
            @click="clearFilters"
            class="mt-4 px-6 py-2 bg-electric-blue hover:bg-electric-blue-dark text-black rounded-full
                   transition-all duration-200 font-medium hover-lift"
          >
            Réinitialiser les filtres
          </button>
        </GlassCard>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useCatalogStore } from '@/stores/catalog'

// Components
import GlassCard from '@/components/ui/GlassCard.vue'
import ToolCard from '@/components/ui/ToolCard.vue'
import FilterMenu from '@/components/ui/FilterMenu.vue'
import IconSystem from '@/components/ui/IconSystem.vue'

// Store
const catalogStore = useCatalogStore()

// Computed properties
const filteredTools = computed(() => catalogStore.filteredTools)
const toolCount = computed(() => catalogStore.toolCount)
const categories = computed(() => catalogStore.categories)
const availableCategories = computed(() => catalogStore.availableCategories)
const activeFilter = computed(() => catalogStore.activeFilter)
const favoritesCount = computed(() => catalogStore.favorites.length)
const searchQuery = computed({
  get: () => catalogStore.searchQuery,
  set: (value) => catalogStore.searchTools(value)
})

// Methods
const handleFilterChange = (filter) => {
  catalogStore.setFilter(filter)
}

const clearFilters = () => {
  catalogStore.setFilter('all')
  catalogStore.searchTools('')
}

// Helper to get category for a tool (needed for display)
const getCategoryForTool = (tool) => {
  for (const [categoryKey, tools] of Object.entries(catalogStore.tools)) {
    if (tools.some(t => t.id === tool.id)) {
      return categoryKey
    }
  }
  return 'unknown'
}

// Watch for search changes to provide better UX
watch(searchQuery, (newQuery) => {
  // Could add debouncing here if needed for performance
}, { immediate: false })
</script>

<style scoped>
/* Additional styles for the home page */
.container {
  max-width: 1400px;
}

/* Ensure proper grid responsiveness */
@media (min-width: 1536px) {
  .grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

/* Smooth transitions for filter changes */
.tool-card {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
