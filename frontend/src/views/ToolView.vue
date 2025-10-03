<template>
  <div class="min-h-screen py-8">
    <div class="container mx-auto px-4 max-w-7xl">

      <!-- Navigation Header -->
      <div class="mb-8">
        <GlassCard variant="glass" class="max-w-4xl mx-auto hover-glow">
          <div class="flex items-center justify-between">
            <router-link
              to="/"
              class="flex items-center space-x-2 text-gray-300 hover:text-electric-blue
                     transition-colors duration-200 hover-lift"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              <span>Retour au catalogue</span>
            </router-link>

            <div v-if="tool" class="text-center">
              <div class="mb-2">
                <IconSystem :name="tool.icon" size="lg" variant="electric" />
              </div>
              <h1 class="text-xl font-semibold text-white">{{ tool.titre }}</h1>
              <p class="text-gray-400 text-sm">{{ categoryName }}</p>
            </div>

            <div class="w-32"></div> <!-- Spacer for centering -->
          </div>
        </GlassCard>
      </div>

      <!-- Tool Content -->
      <div v-if="tool" class="max-w-6xl mx-auto">
        <GlassCard variant="white" class="hover-glow">

          <!-- Tool Description -->
          <div class="mb-6 pb-6 border-b border-border-primary">
            <p class="text-gray-300 leading-relaxed">{{ tool.description }}</p>
          </div>

          <!-- Dynamic Tool Component -->
          <div class="tool-content">
            <!-- For now, we'll embed the original tools via iframe or redirect -->
            <!-- This will be replaced with Vue components as tools get migrated -->

            <div class="text-center py-12">
              <div class="mb-6">
                <div class="mb-4 flex justify-center">
                  <IconSystem name="construction" size="2xl" variant="electric" />
                </div>
                <h3 class="text-2xl font-bold text-white mb-2">Migration en cours</h3>
                <p class="text-gray-300 mb-6">
                  Cet outil est en cours de migration vers Vue 3. En attendant, vous pouvez accéder à la version originale.
                </p>
              </div>

              <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  :href="tool.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center space-x-2 px-6 py-3 bg-electric-blue hover:bg-electric-blue-dark
                         text-black font-medium rounded-lg transition-all duration-200 hover-lift"
                >
                  <span>Ouvrir la version originale</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>

                <button
                  @click="showEmbedded = !showEmbedded"
                  class="inline-flex items-center space-x-2 px-6 py-3 bg-glass-bg-light hover:bg-gray-700
                         text-gray-300 hover:text-white border border-border-primary rounded-lg transition-all duration-200 hover-lift"
                >
                  <span>{{ showEmbedded ? 'Masquer' : 'Afficher' }} l'aperçu intégré</span>
                </button>
              </div>

              <!-- Embedded iframe (optional) -->
              <div v-if="showEmbedded" class="mt-8">
                <div class="border border-border-primary rounded-lg overflow-hidden bg-bg-tertiary">
                  <iframe
                    :src="tool.url"
                    class="w-full h-96 border-0"
                    title="Aperçu de l'outil"
                  ></iframe>
                </div>
                <p class="text-sm text-gray-400 mt-2">
                  Aperçu intégré - Pour une meilleure expérience, ouvrez l'outil dans un nouvel onglet.
                </p>
              </div>
            </div>

          </div>

        </GlassCard>
      </div>

      <!-- Tool Not Found -->
      <div v-else class="max-w-2xl mx-auto text-center">
        <GlassCard variant="glass" class="hover-glow">
          <div class="mb-4 flex justify-center">
            <IconSystem name="error" size="2xl" variant="electric" />
          </div>
          <h2 class="text-2xl font-bold text-white mb-2">Outil non trouvé</h2>
          <p class="text-gray-300 mb-6">
            L'outil demandé n'existe pas ou a été déplacé.
          </p>
          <router-link
            to="/"
            class="inline-flex items-center space-x-2 px-6 py-3 bg-electric-blue hover:bg-electric-blue-dark
                   text-black font-medium rounded-lg transition-all duration-200 hover-lift"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span>Retour au catalogue</span>
          </router-link>
        </GlassCard>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCatalogStore } from '@/stores/catalog'

// Components
import GlassCard from '@/components/ui/GlassCard.vue'
import IconSystem from '@/components/ui/IconSystem.vue'

// Props from router
const props = defineProps({
  category: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  }
})

// State
const showEmbedded = ref(false)

// Store and router
const catalogStore = useCatalogStore()
const route = useRoute()

// Computed
const tool = computed(() => {
  return catalogStore.getToolById(props.category, props.id)
})

const categoryName = computed(() => {
  return catalogStore.categories[props.category]?.name || props.category
})

// Watch for route changes (in case user navigates between tools)
watch(() => [props.category, props.id], () => {
  showEmbedded.value = false // Reset embedded view when switching tools
}, { immediate: false })

// Meta for document title
onMounted(() => {
  if (tool.value) {
    document.title = `${tool.value.titre} - WEBDEV UI Atelier`
  }
})
</script>

<style scoped>
.tool-content {
  min-height: 400px;
}

/* Responsive iframe */
iframe {
  aspect-ratio: 16 / 9;
  min-height: 400px;
}

@media (max-width: 768px) {
  iframe {
    height: 300px;
  }
}
</style>