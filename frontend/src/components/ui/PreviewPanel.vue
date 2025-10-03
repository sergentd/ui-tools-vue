<template>
  <div class="glass-card rounded-2xl p-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-white">{{ title }}</h2>
      <div v-if="showDimensions" class="text-white/70 text-sm">
        {{ dimensions.width }} × {{ dimensions.height }}
      </div>
    </div>

    <div
      ref="previewContainer"
      :class="['preview-container rounded-lg', containerClass]"
      :style="containerStyle"
    >
      <slot name="content">
        <!-- Default grid items if no slot content provided -->
        <div v-if="gridConfig" class="grid-preview" :style="gridStyle">
          <div
            v-for="item in gridItems"
            :key="item.id"
            :class="['grid-item', itemClass]"
            :style="itemStyle"
            @click="onItemClick(item)"
          >
            <slot name="item" :item="item" :index="item.id">
              {{ item.content || item.id }}
            </slot>
          </div>
        </div>

        <!-- Custom content -->
        <div v-else :style="customStyle">
          <slot />
        </div>
      </slot>
    </div>

    <!-- Info footer -->
    <div v-if="showInfo" class="mt-4 text-white/60 text-sm">
      <slot name="info">
        {{ infoText }}
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Aperçu'
  },
  // Grid-specific props
  gridConfig: {
    type: Object,
    default: null
  },
  // Custom styling
  containerClass: {
    type: String,
    default: ''
  },
  itemClass: {
    type: String,
    default: ''
  },
  containerStyle: {
    type: Object,
    default: () => ({})
  },
  itemStyle: {
    type: Object,
    default: () => ({})
  },
  customStyle: {
    type: Object,
    default: () => ({})
  },
  // Display options
  showDimensions: {
    type: Boolean,
    default: false
  },
  showInfo: {
    type: Boolean,
    default: false
  },
  infoText: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['item-click', 'resize'])

const previewContainer = ref(null)
const dimensions = ref({ width: '0px', height: '0px' })

// Computed grid style for CSS Grid
const gridStyle = computed(() => {
  if (!props.gridConfig) return {}

  return {
    display: 'grid',
    gridTemplateColumns: props.gridConfig.templateCols || 'repeat(3, 1fr)',
    gridTemplateRows: props.gridConfig.templateRows || 'repeat(3, 1fr)',
    gap: props.gridConfig.gap || '10px',
    padding: props.gridConfig.padding || '20px',
    minHeight: '300px',
    ...props.containerStyle
  }
})

// Generate grid items based on grid config
const gridItems = computed(() => {
  if (!props.gridConfig) return []

  const totalItems = (props.gridConfig.columns || 3) * (props.gridConfig.rows || 3)
  return Array.from({ length: totalItems }, (_, index) => ({
    id: index + 1,
    content: index + 1
  }))
})

const onItemClick = (item) => {
  emit('item-click', item)
}

// Update dimensions when container resizes
const updateDimensions = () => {
  if (previewContainer.value) {
    const rect = previewContainer.value.getBoundingClientRect()
    dimensions.value = {
      width: `${Math.round(rect.width)}px`,
      height: `${Math.round(rect.height)}px`
    }
    emit('resize', dimensions.value)
  }
}

onMounted(() => {
  nextTick(() => {
    updateDimensions()

    // Observe resize changes
    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(() => {
        updateDimensions()
      })
      resizeObserver.observe(previewContainer.value)
    }
  })
})
</script>

<style scoped>
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.preview-container {
  background: rgba(255, 255, 255, 0.9);
  border: 2px dashed rgba(102, 126, 234, 0.5);
  min-height: 300px;
  overflow: auto;
}

.grid-preview {
  width: 100%;
  height: 100%;
}

.grid-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 500;
  transition: all 0.3s ease;
  min-height: 60px;
  cursor: pointer;
}

.grid-item:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

/* Custom scrollbar for preview container */
.preview-container::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.preview-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.preview-container::-webkit-scrollbar-thumb {
  background: rgba(102, 126, 234, 0.5);
  border-radius: 3px;
}

.preview-container::-webkit-scrollbar-thumb:hover {
  background: rgba(102, 126, 234, 0.7);
}
</style>