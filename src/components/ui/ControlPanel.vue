<template>
  <div class="control-card rounded-2xl p-6 space-y-6">
    <h2 class="text-xl font-bold text-white mb-4">{{ title }}</h2>

    <div v-for="section in sections" :key="section.title" class="control-group">
      <h3 class="font-semibold text-white mb-3">{{ section.title }}</h3>

      <div v-for="control in section.controls" :key="control.id" class="control-row">
        <label class="label">{{ control.label }}:</label>

        <!-- Number input -->
        <input
          v-if="control.type === 'number'"
          :id="control.id"
          :value="control.value"
          @input="handleInput(control.id, $event.target.value)"
          type="number"
          :min="control.min"
          :max="control.max"
          class="control-input"
        />

        <!-- Text input -->
        <input
          v-else-if="control.type === 'text'"
          :id="control.id"
          :value="control.value"
          @input="handleInput(control.id, $event.target.value)"
          type="text"
          :placeholder="control.placeholder"
          class="control-input"
        />

        <!-- Select dropdown -->
        <select
          v-else-if="control.type === 'select'"
          :id="control.id"
          :value="control.value"
          @change="handleInput(control.id, $event.target.value)"
          class="control-input"
        >
          <option v-for="option in control.options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>

        <!-- Range slider -->
        <div v-else-if="control.type === 'range'" class="flex items-center gap-2 flex-1">
          <input
            :id="control.id"
            :value="control.value"
            @input="handleInput(control.id, $event.target.value)"
            type="range"
            :min="control.min"
            :max="control.max"
            :step="control.step"
            class="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
          />
          <span class="text-white/80 text-sm min-w-[40px]">{{ control.value }}{{ control.unit || '' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Paramètres'
  },
  sections: {
    type: Array,
    required: true,
    validator: (sections) => {
      return sections.every(section =>
        section.title &&
        Array.isArray(section.controls) &&
        section.controls.every(control => control.id && control.label && control.type)
      )
    }
  }
})

const emit = defineEmits(['update'])

const handleInput = (controlId, value) => {
  emit('update', { id: controlId, value })
}
</script>

<style scoped>
.control-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.control-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.control-input {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  min-width: 80px;
  flex: 1;
  max-width: 200px;
}

.control-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.control-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
}

.label {
  font-size: 14px;
  font-weight: 500;
  min-width: 120px;
  color: rgba(255, 255, 255, 0.9);
}

/* Custom slider styling */
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.slider::-moz-range-thumb {
  height: 18px;
  width: 18px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
</style>