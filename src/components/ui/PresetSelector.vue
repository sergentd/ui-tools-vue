<template>
  <div class="preset-selector">
    <h3 v-if="title" class="font-semibold text-white mb-3">{{ title }}</h3>

    <div :class="['preset-grid', gridClass]">
      <button
        v-for="preset in presets"
        :key="preset.id"
        :class="['preset-btn', { 'active': activePreset === preset.id }]"
        @click="selectPreset(preset)"
        :title="preset.description"
      >
        <div v-if="preset.icon" class="preset-icon">{{ preset.icon }}</div>
        <span class="preset-name">{{ preset.name }}</span>
      </button>
    </div>

    <!-- Custom preset option -->
    <div v-if="allowCustom" class="mt-3">
      <button
        :class="['preset-btn preset-custom', { 'active': activePreset === 'custom' }]"
        @click="selectCustom"
        title="Configuration personnalisée"
      >
        <div class="preset-icon">⚙️</div>
        <span class="preset-name">Personnalisé</span>
      </button>
    </div>

    <!-- Preset details -->
    <div v-if="showDetails && selectedPresetDetails" class="preset-details mt-3">
      <div class="text-white/70 text-xs">
        {{ selectedPresetDetails.description }}
      </div>
      <div v-if="selectedPresetDetails.example" class="text-white/50 text-xs mt-1 font-mono">
        {{ selectedPresetDetails.example }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Modèles'
  },
  presets: {
    type: Array,
    required: true,
    validator: (presets) => {
      return presets.every(preset =>
        preset.id && preset.name && preset.config
      )
    }
  },
  activePreset: {
    type: String,
    default: null
  },
  allowCustom: {
    type: Boolean,
    default: true
  },
  showDetails: {
    type: Boolean,
    default: true
  },
  columns: {
    type: Number,
    default: 2
  }
})

const emit = defineEmits(['preset-selected', 'custom-selected'])

const gridClass = computed(() => {
  return `grid-cols-${props.columns}`
})

const selectedPresetDetails = computed(() => {
  if (props.activePreset === 'custom') return null
  return props.presets.find(p => p.id === props.activePreset) || null
})

const selectPreset = (preset) => {
  emit('preset-selected', {
    id: preset.id,
    name: preset.name,
    config: preset.config,
    description: preset.description
  })
}

const selectCustom = () => {
  emit('custom-selected')
}
</script>

<style scoped>
.preset-grid {
  display: grid;
  gap: 8px;
}

.preset-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  border-radius: 8px;
  padding: 12px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  min-height: 70px;
}

.preset-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
}

.preset-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.preset-custom {
  width: 100%;
  margin-top: 8px;
}

.preset-icon {
  font-size: 18px;
  line-height: 1;
}

.preset-name {
  font-size: 12px;
  text-align: center;
  line-height: 1.2;
}

.preset-details {
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Grid column utilities */
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
</style>