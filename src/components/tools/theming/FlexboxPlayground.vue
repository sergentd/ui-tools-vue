<template>
  <div class="flexbox-playground min-h-screen">
    <!-- Main content with container -->
    <div class="container mx-auto px-6 max-w-7xl py-8">
      <!-- Header inside container -->
      <ToolHeader
        title="Terrain de Jeu Flexbox"
        description="Explorez CSS Flexbox avec des contrôles interactifs et des exemples de mise en page"
        icon="flexbox-playground"
        category="theming"
        status="Migré vers Vue"
        :show-badges="true"
      />

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Container Controls -->
        <div class="lg:col-span-1">
          <GlassCard variant="glass" class="mb-6">
            <template #header>
              <h2 class="text-xl font-bold text-white">Conteneur Flex</h2>
            </template>

            <ContainerControls
              :container="flexState.container"
              @update="updateContainerProperty"
              @preset="applyPreset"
            />
          </GlassCard>

          <!-- Theory Section -->
          <GlassCard variant="glass">
            <template #header>
              <h3 class="text-lg font-bold text-white">💡 Théorie Flexbox</h3>
            </template>

            <FlexboxTheory />
          </GlassCard>
        </div>

        <!-- Flex Container Preview -->
        <div class="lg:col-span-2">
          <GlassCard variant="glass" class="mb-6">
            <template #header>
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold text-white">Conteneur Flexbox</h2>
                <div class="flex gap-2">
                  <button
                    @click="addFlexItem"
                    class="btn btn-small bg-green-500 hover:bg-green-600"
                  >
                    + Ajouter
                  </button>
                  <button
                    @click="removeFlexItem"
                    class="btn btn-small bg-red-500 hover:bg-red-600"
                    :disabled="flexState.items.length <= 1"
                  >
                    - Supprimer
                  </button>
                </div>
              </div>
            </template>

            <FlexContainer
              :container="flexState.container"
              :items="flexState.items"
              :selected-item-id="flexState.selectedItemId"
              @item-click="selectItem"
            />
          </GlassCard>

          <!-- CSS Output -->
          <GlassCard variant="glass">
            <template #header>
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold text-white">Code CSS</h2>
                <button
                  @click="copyCSS"
                  class="btn flex items-center gap-2"
                  :class="{ 'btn-success': copied }"
                >
                  {{ copied ? '✅' : '📋' }} {{ copied ? 'Copié!' : 'Copier' }}
                </button>
              </div>
            </template>

            <CodeOutput
              :code="generatedCSS"
              language="css"
            />
          </GlassCard>
        </div>

        <!-- Item Controls -->
        <div class="lg:col-span-1">
          <GlassCard variant="glass">
            <template #header>
              <h2 class="text-xl font-bold text-white">Propriétés de l'Élément</h2>
            </template>

            <div v-if="selectedItem">
              <div class="mb-4 p-3 bg-white/10 rounded-lg">
                <p class="text-white font-medium">Élément {{ selectedItem.id }} sélectionné</p>
              </div>

              <ItemControls
                :item="selectedItem"
                @update="updateItemProperty"
              />
            </div>
            <div v-else class="text-white/60 text-center py-8">
              Cliquez sur un élément pour voir ses propriétés
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// Components
import ToolHeader from '@/components/ui/ToolHeader.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import CodeOutput from '@/components/ui/CodeOutput.vue'
import ContainerControls from './FlexboxPlayground/ContainerControls.vue'
import FlexContainer from './FlexboxPlayground/FlexContainer.vue'
import ItemControls from './FlexboxPlayground/ItemControls.vue'
import FlexboxTheory from './FlexboxPlayground/FlexboxTheory.vue'

// State management
const flexState = reactive({
  container: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    alignContent: 'stretch'
  },
  items: [
    { id: 1, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' },
    { id: 2, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' },
    { id: 3, flexGrow: 0, flexShrink: 1, flexBasis: 'auto', alignSelf: 'auto' }
  ],
  selectedItemId: null
})

const nextItemId = ref(4)
const copied = ref(false)

// Computed properties
const selectedItem = computed(() => {
  return flexState.items.find(item => item.id === flexState.selectedItemId)
})

const generatedCSS = computed(() => {
  const containerCSS = Object.keys(flexState.container).map(prop => {
    const cssProperty = prop.replace(/([A-Z])/g, '-$1').toLowerCase()
    return `    ${cssProperty}: ${flexState.container[prop]};`
  }).join('\n')

  let itemsCSS = ''
  const itemsWithCustomProps = flexState.items.filter(item =>
    item.flexGrow !== 0 || item.flexShrink !== 1 || item.flexBasis !== 'auto' || item.alignSelf !== 'auto'
  )

  if (itemsWithCustomProps.length > 0) {
    itemsCSS = '\n\n/* Éléments avec propriétés personnalisées */\n' +
      itemsWithCustomProps.map(item => {
        const props = []
        if (item.flexGrow !== 0) props.push(`    flex-grow: ${item.flexGrow};`)
        if (item.flexShrink !== 1) props.push(`    flex-shrink: ${item.flexShrink};`)
        if (item.flexBasis !== 'auto') props.push(`    flex-basis: ${item.flexBasis};`)
        if (item.alignSelf !== 'auto') props.push(`    align-self: ${item.alignSelf};`)
        return `.flex-item:nth-child(${flexState.items.indexOf(item) + 1}) {\n${props.join('\n')}\n}`
      }).join('\n\n')
  }

  return `.flex-container {\n    display: flex;\n${containerCSS}\n}${itemsCSS}`
})

// Methods
const updateContainerProperty = ({ property, value }) => {
  flexState.container[property] = value
}

const updateItemProperty = ({ property, value }) => {
  if (selectedItem.value) {
    selectedItem.value[property] = value
  }
}

const selectItem = (itemId) => {
  flexState.selectedItemId = itemId
}

const addFlexItem = () => {
  flexState.items.push({
    id: nextItemId.value++,
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
    alignSelf: 'auto'
  })
}

const removeFlexItem = () => {
  if (flexState.items.length > 1) {
    if (flexState.selectedItemId) {
      flexState.items = flexState.items.filter(item => item.id !== flexState.selectedItemId)
      flexState.selectedItemId = null
    } else {
      flexState.items.pop()
    }
  }
}

const applyPreset = (preset) => {
  switch (preset) {
    case 'center':
      flexState.container = {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'stretch'
      }
      break
    case 'space-between':
      flexState.container = {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'stretch'
      }
      break
    case 'sidebar':
      flexState.container = {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        alignContent: 'stretch'
      }
      if (flexState.items[0]) flexState.items[0].flexBasis = '200px'
      if (flexState.items[1]) flexState.items[1].flexGrow = 1
      break
    case 'navbar':
      flexState.container = {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'stretch'
      }
      break
    case 'card-grid':
      flexState.container = {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        alignContent: 'flex-start'
      }
      flexState.items.forEach(item => {
        item.flexBasis = '150px'
        item.flexGrow = 0
      })
      break
    case 'column-center':
      flexState.container = {
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'stretch'
      }
      break
  }
}

const copyCSS = async () => {
  try {
    await navigator.clipboard.writeText(generatedCSS.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy CSS:', error)
  }
}
</script>

<style scoped>
.flexbox-playground {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.container {
  max-width: 1400px;
}

.btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.btn-small {
  padding: 6px 12px;
  font-size: 14px;
}
</style>