<template>
  <div class="css-grid-generator min-h-screen">
    <!-- Main content with container -->
    <div class="container mx-auto px-6 max-w-7xl py-8">
      <!-- Header inside container -->
      <ToolHeader
        title="Générateur de Grille CSS"
        description="Créez visuellement vos layouts CSS Grid et exportez le code"
        icon="css-grid-generator"
        category="theming"
        status="Migré vers Vue"
        :show-badges="true"
      />
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Controls Panel -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Main Controls -->
          <ControlPanel
            title="Paramètres"
            :sections="controlSections"
            @update="handleControlUpdate"
          />

          <!-- Presets -->
          <PresetSelector
            title="Modèles"
            :presets="gridPresets"
            :active-preset="activePreset"
            :columns="2"
            @preset-selected="applyPreset"
            @custom-selected="setCustomPreset"
          />
        </div>

        <!-- Preview and Code Output -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Visual Preview -->
          <PreviewPanel
            title="Aperçu"
            :grid-config="gridState"
            :show-dimensions="true"
            :show-info="true"
            :info-text="previewInfo"
            @item-click="handleGridItemClick"
          />

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
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'

// Components
import ToolHeader from '@/components/ui/ToolHeader.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import ControlPanel from '@/components/ui/ControlPanel.vue'
import PresetSelector from '@/components/ui/PresetSelector.vue'
import PreviewPanel from '@/components/ui/PreviewPanel.vue'
import CodeOutput from '@/components/ui/CodeOutput.vue'

// State management
const gridState = reactive({
  columns: 3,
  rows: 3,
  gap: '10px',
  padding: '20px',
  templateCols: 'repeat(3, 1fr)',
  templateRows: 'repeat(3, 1fr)'
})

const activePreset = ref('custom')
const copied = ref(false)

// Control configuration
const controlSections = computed(() => [
  {
    title: 'Structure',
    controls: [
      {
        id: 'columns',
        label: 'Colonnes',
        type: 'number',
        value: gridState.columns,
        min: 1,
        max: 12
      },
      {
        id: 'rows',
        label: 'Lignes',
        type: 'number',
        value: gridState.rows,
        min: 1,
        max: 12
      }
    ]
  },
  {
    title: 'Espacement',
    controls: [
      {
        id: 'gap',
        label: 'Gap',
        type: 'text',
        value: gridState.gap,
        placeholder: '10px'
      },
      {
        id: 'padding',
        label: 'Padding',
        type: 'text',
        value: gridState.padding,
        placeholder: '20px'
      }
    ]
  },
  {
    title: 'Tailles',
    controls: [
      {
        id: 'templateCols',
        label: 'Template Cols',
        type: 'text',
        value: gridState.templateCols,
        placeholder: 'repeat(3, 1fr)'
      },
      {
        id: 'templateRows',
        label: 'Template Rows',
        type: 'text',
        value: gridState.templateRows,
        placeholder: 'repeat(3, 1fr)'
      }
    ]
  }
])

// Presets configuration
const gridPresets = [
  {
    id: 'sidebar',
    name: 'Sidebar',
    icon: '📄',
    description: 'Layout avec sidebar fixe',
    example: '250px 1fr',
    config: {
      templateCols: '250px 1fr',
      templateRows: '1fr',
      columns: 2,
      rows: 1,
      gap: '20px',
      padding: '20px'
    }
  },
  {
    id: 'header',
    name: 'Header',
    icon: '🎯',
    description: 'Layout header/content/footer',
    example: 'auto 1fr auto',
    config: {
      templateCols: '1fr',
      templateRows: 'auto 1fr auto',
      columns: 1,
      rows: 3,
      gap: '10px',
      padding: '20px'
    }
  },
  {
    id: 'cards',
    name: 'Cards',
    icon: '🃏',
    description: 'Grille responsive de cartes',
    example: 'repeat(auto-fit, minmax(300px, 1fr))',
    config: {
      templateCols: 'repeat(auto-fit, minmax(300px, 1fr))',
      templateRows: 'auto',
      columns: 4,
      rows: 2,
      gap: '20px',
      padding: '20px'
    }
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: '📊',
    description: 'Layout tableau de bord',
    example: 'repeat(4, 1fr) / 60px 1fr 1fr',
    config: {
      templateCols: 'repeat(4, 1fr)',
      templateRows: '60px 1fr 1fr',
      columns: 4,
      rows: 3,
      gap: '15px',
      padding: '20px'
    }
  }
]

// Computed properties
const generatedCSS = computed(() => {
  return `.grid-container {
    display: grid;
    grid-template-columns: ${gridState.templateCols};
    grid-template-rows: ${gridState.templateRows};
    gap: ${gridState.gap};
    padding: ${gridState.padding};
}

.grid-item {
    /* Styles pour les éléments de la grille */
    background: #f3f4f6;
    border-radius: 8px;
    padding: 16px;
}`
})

const previewInfo = computed(() => {
  const totalItems = gridState.columns * gridState.rows
  return `${gridState.columns}×${gridState.rows} grille • ${totalItems} éléments`
})

// Methods
const handleControlUpdate = ({ id, value }) => {
  if (id === 'columns' || id === 'rows') {
    gridState[id] = parseInt(value) || 1
  } else {
    gridState[id] = value
  }

  // Update template values when column/row numbers change
  if (id === 'columns') {
    gridState.templateCols = `repeat(${value}, 1fr)`
  }
  if (id === 'rows') {
    gridState.templateRows = `repeat(${value}, 1fr)`
  }

  // Mark as custom when user makes manual changes
  if (activePreset.value !== 'custom') {
    activePreset.value = 'custom'
  }
}

const applyPreset = (preset) => {
  activePreset.value = preset.id
  Object.assign(gridState, preset.config)
}

const setCustomPreset = () => {
  activePreset.value = 'custom'
}

const handleGridItemClick = (item) => {
  // Could be extended for item-specific controls
  console.log('Grid item clicked:', item)
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

// Watch for changes to update preview
watch(gridState, () => {
  // Additional logic for real-time updates can go here
}, { deep: true })
</script>

<style scoped>
.css-grid-generator {
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

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.btn-success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}
</style>