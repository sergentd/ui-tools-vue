<template>
  <div class="gradient-generator min-h-screen">
    <!-- Main content with container -->
    <div class="container mx-auto px-6 max-w-7xl py-8">
      <!-- Header inside container -->
      <ToolHeader
        title="Générateur de Dégradés"
        description="Créez des dégradés CSS magnifiques avec contrôles visuels pour tous types de gradients"
        icon="🌈"
        category="theming"
        status="Migré vers Vue"
        :show-badges="true"
      />

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Controls Panel -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Gradient Type -->
          <GlassCard variant="glass">
            <template #header>
              <h2 class="text-xl font-bold text-white">Type de Dégradé</h2>
            </template>

            <GradientTypeControls
              :gradient-state="gradientState"
              @update="updateGradientProperty"
            />
          </GlassCard>

          <!-- Color Stops -->
          <GlassCard variant="glass">
            <template #header>
              <div class="flex justify-between items-center">
                <h3 class="text-lg font-bold text-white">Couleurs</h3>
                <button
                  @click="addColorStop"
                  class="btn btn-small bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg font-medium"
                >
                  + Ajouter
                </button>
              </div>
            </template>

            <div class="space-y-3">
              <ColorStop
                v-for="stop in gradientState.colorStops"
                :key="stop.id"
                :stop="stop"
                :selected="gradientState.selectedStopId === stop.id"
                :can-remove="gradientState.colorStops.length > 2"
                @update="updateColorStop"
                @remove="removeColorStop"
                @select="selectColorStop"
              />
            </div>
          </GlassCard>

          <!-- Presets -->
          <PresetSelector
            title="Préréglages"
            :presets="gradientPresets"
            :active-preset="activePreset"
            :columns="2"
            @preset-selected="applyPreset"
            @custom-selected="setCustomPreset"
          />
        </div>

        <!-- Preview and Output -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Visual Preview -->
          <GlassCard variant="glass">
            <template #header>
              <h2 class="text-xl font-bold text-white">Aperçu</h2>
            </template>

            <GradientPreview
              :gradient="generatedGradient"
            />
          </GlassCard>

          <!-- CSS Output -->
          <GlassCard variant="glass">
            <template #header>
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-bold text-white">Code CSS</h2>
                <div class="flex gap-2">
                  <button
                    @click="randomGradient"
                    class="btn btn-secondary"
                  >
                    🎲 Aléatoire
                  </button>
                  <button
                    @click="copyCSS"
                    class="btn flex items-center gap-2"
                    :class="{ 'btn-success': copied }"
                  >
                    {{ copied ? '✅' : '📋' }} {{ copied ? 'Copié!' : 'Copier' }}
                  </button>
                </div>
              </div>
            </template>

            <!-- Format Tabs -->
            <div class="format-tabs mb-4">
              <button
                v-for="format in outputFormats"
                :key="format.id"
                class="format-tab"
                :class="{ 'active': currentFormat === format.id }"
                @click="currentFormat = format.id"
              >
                {{ format.name }}
              </button>
            </div>

            <CodeOutput
              :code="formattedCSS"
              language="css"
            />
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
import PresetSelector from '@/components/ui/PresetSelector.vue'
import CodeOutput from '@/components/ui/CodeOutput.vue'
import GradientTypeControls from './GradientGenerator/GradientTypeControls.vue'
import ColorStop from './GradientGenerator/ColorStop.vue'
import GradientPreview from './GradientGenerator/GradientPreview.vue'

// State management
const gradientState = reactive({
  type: 'linear',
  angle: 90,
  radialPosition: 'center',
  radialShape: 'ellipse',
  conicAngle: 0,
  colorStops: [
    { id: 1, color: '#667eea', position: 0 },
    { id: 2, color: '#764ba2', position: 100 }
  ],
  selectedStopId: null
})

const nextStopId = ref(3)
const activePreset = ref('custom')
const copied = ref(false)
const currentFormat = ref('css')

// Output formats
const outputFormats = [
  { id: 'css', name: 'CSS' },
  { id: 'background', name: 'Background' },
  { id: 'webkit', name: 'WebKit' }
]

// Gradient presets
const gradientPresets = [
  {
    id: 'sunset',
    name: 'Coucher de Soleil',
    icon: '🌅',
    description: 'Dégradé chaleureux',
    example: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 100%)',
    config: {
      type: 'linear',
      angle: 45,
      colorStops: [
        { id: 1, color: '#ff9a9e', position: 0 },
        { id: 2, color: '#fecfef', position: 100 }
      ]
    }
  },
  {
    id: 'ocean',
    name: 'Océan',
    icon: '🌊',
    description: 'Bleu profond',
    example: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    config: {
      type: 'linear',
      angle: 135,
      colorStops: [
        { id: 1, color: '#667eea', position: 0 },
        { id: 2, color: '#764ba2', position: 100 }
      ]
    }
  },
  {
    id: 'forest',
    name: 'Forêt',
    icon: '🌲',
    description: 'Vert naturel',
    example: 'linear-gradient(135deg, #5f7c8a 0%, #a8d8ea 100%)',
    config: {
      type: 'linear',
      angle: 135,
      colorStops: [
        { id: 1, color: '#5f7c8a', position: 0 },
        { id: 2, color: '#a8d8ea', position: 100 }
      ]
    }
  },
  {
    id: 'fire',
    name: 'Feu',
    icon: '🔥',
    description: 'Rouge ardent',
    example: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    config: {
      type: 'linear',
      angle: 135,
      colorStops: [
        { id: 1, color: '#f093fb', position: 0 },
        { id: 2, color: '#f5576c', position: 100 }
      ]
    }
  },
  {
    id: 'rainbow',
    name: 'Arc-en-ciel',
    icon: '🌈',
    description: 'Toutes les couleurs',
    example: 'linear-gradient(135deg, rainbow spectrum)',
    config: {
      type: 'linear',
      angle: 135,
      colorStops: [
        { id: 1, color: '#ff0000', position: 0 },
        { id: 2, color: '#ff8000', position: 16 },
        { id: 3, color: '#ffff00', position: 33 },
        { id: 4, color: '#00ff00', position: 50 },
        { id: 5, color: '#0000ff', position: 66 },
        { id: 6, color: '#8000ff', position: 83 },
        { id: 7, color: '#ff0000', position: 100 }
      ]
    }
  },
  {
    id: 'pastel',
    name: 'Pastel',
    icon: '🎨',
    description: 'Couleurs douces',
    example: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    config: {
      type: 'linear',
      angle: 135,
      colorStops: [
        { id: 1, color: '#ffecd2', position: 0 },
        { id: 2, color: '#fcb69f', position: 100 }
      ]
    }
  }
]

// Computed properties
const generatedGradient = computed(() => {
  const stops = gradientState.colorStops
    .sort((a, b) => a.position - b.position)
    .map(stop => `${stop.color} ${stop.position}%`)
    .join(', ')

  switch (gradientState.type) {
    case 'linear':
      return `linear-gradient(${gradientState.angle}deg, ${stops})`
    case 'radial':
      return `radial-gradient(${gradientState.radialShape} at ${gradientState.radialPosition}, ${stops})`
    case 'conic':
      return `conic-gradient(from ${gradientState.conicAngle}deg, ${stops})`
    default:
      return `linear-gradient(${gradientState.angle}deg, ${stops})`
  }
})

const formattedCSS = computed(() => {
  const gradient = generatedGradient.value

  switch (currentFormat.value) {
    case 'css':
      return `.gradient {\n    background: ${gradient};\n}`
    case 'background':
      return `background: ${gradient};`
    case 'webkit':
      return `background: -webkit-${gradient};\nbackground: -moz-${gradient};\nbackground: ${gradient};`
    default:
      return `.gradient {\n    background: ${gradient};\n}`
  }
})

// Methods
const updateGradientProperty = ({ property, value }) => {
  gradientState[property] = value
  // Mark as custom when user makes manual changes
  if (activePreset.value !== 'custom') {
    activePreset.value = 'custom'
  }
}

const addColorStop = () => {
  const newPosition = gradientState.colorStops.length > 0
    ? Math.max(...gradientState.colorStops.map(s => s.position)) + 10
    : 50

  gradientState.colorStops.push({
    id: nextStopId.value++,
    color: '#ff0000',
    position: Math.min(newPosition, 100)
  })

  // Mark as custom when user makes manual changes
  if (activePreset.value !== 'custom') {
    activePreset.value = 'custom'
  }
}

const removeColorStop = (id) => {
  if (gradientState.colorStops.length > 2) {
    gradientState.colorStops = gradientState.colorStops.filter(stop => stop.id !== id)
    if (gradientState.selectedStopId === id) {
      gradientState.selectedStopId = null
    }
    // Mark as custom when user makes manual changes
    if (activePreset.value !== 'custom') {
      activePreset.value = 'custom'
    }
  }
}

const selectColorStop = (id) => {
  gradientState.selectedStopId = id
}

const updateColorStop = ({ id, property, value }) => {
  const stop = gradientState.colorStops.find(s => s.id === id)
  if (stop) {
    stop[property] = value
    // Mark as custom when user makes manual changes
    if (activePreset.value !== 'custom') {
      activePreset.value = 'custom'
    }
  }
}

const applyPreset = (preset) => {
  activePreset.value = preset.id
  gradientState.type = preset.config.type
  gradientState.angle = preset.config.angle || 90
  gradientState.colorStops = preset.config.colorStops.map(stop => ({ ...stop }))
  nextStopId.value = Math.max(...gradientState.colorStops.map(s => s.id)) + 1
  gradientState.selectedStopId = null
}

const setCustomPreset = () => {
  activePreset.value = 'custom'
}

const randomGradient = () => {
  // Generate random colors and positions
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F']
  const numStops = Math.floor(Math.random() * 3) + 2 // 2-4 stops

  gradientState.colorStops = []
  for (let i = 0; i < numStops; i++) {
    gradientState.colorStops.push({
      id: i + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      position: (i / (numStops - 1)) * 100
    })
  }

  gradientState.angle = Math.floor(Math.random() * 360)
  gradientState.type = ['linear', 'radial', 'conic'][Math.floor(Math.random() * 3)]

  nextStopId.value = numStops + 1
  activePreset.value = 'custom'
  gradientState.selectedStopId = null
}

const copyCSS = async () => {
  try {
    await navigator.clipboard.writeText(formattedCSS.value)
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
.gradient-generator {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.container {
  max-width: 1400px;
}

.format-tabs {
  display: flex;
  gap: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 4px;
}

.format-tab {
  flex: 1;
  padding: 8px 16px;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.format-tab:hover {
  color: rgba(255, 255, 255, 0.9);
  background: rgba(255, 255, 255, 0.1);
}

.format-tab.active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
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

.btn-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
}

.btn-small {
  padding: 6px 12px;
  font-size: 14px;
}
</style>