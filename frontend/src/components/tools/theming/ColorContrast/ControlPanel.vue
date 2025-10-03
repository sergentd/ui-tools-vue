<template>
  <div class="control-card rounded-2xl p-6">
    <h2 class="text-xl font-bold text-white mb-6">Couleurs</h2>

    <!-- Text Color -->
    <div class="mb-6">
      <label class="block text-white font-medium mb-3">Couleur du Texte</label>
      <div class="color-input-group">
        <input type="color" :value="textColor" @input="$emit('update:textColor', $event.target.value)" class="color-picker">
        <input type="text" :value="textColor" @input="$emit('update:textColor', $event.target.value)" class="color-text-input" placeholder="#000000">
      </div>
      <QuickColors :colors="['#000000', '#333333', '#666666', '#999999', '#FFFFFF']" @select-color="$emit('update:textColor', $event)" />
    </div>

    <!-- Background Color -->
    <div class="mb-6">
      <label class="block text-white font-medium mb-3">Couleur de Fond</label>
      <div class="color-input-group">
        <input type="color" :value="backgroundColor" @input="$emit('update:backgroundColor', $event.target.value)" class="color-picker">
        <input type="text" :value="backgroundColor" @input="$emit('update:backgroundColor', $event.target.value)" class="color-text-input" placeholder="#FFFFFF">
      </div>
      <QuickColors :colors="['#FFFFFF', '#F8F9FA', '#E9ECEF', '#DEE2E6', '#000000']" @select-color="$emit('update:backgroundColor', $event)" />
    </div>

    <!-- Actions -->
    <div class="flex gap-3">
      <button class="btn flex-1" @click="$emit('swap-colors')">🔄 Inverser</button>
      <button class="btn flex-1" @click="$emit('random-colors')">🎲 Aléatoire</button>
    </div>
  </div>
</template>

<script setup>
import QuickColors from './QuickColors.vue';

defineProps({
  textColor: String,
  backgroundColor: String,
});

defineEmits(['update:textColor', 'update:backgroundColor', 'swap-colors', 'random-colors']);
</script>

<style scoped>
.control-card {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.color-input-group {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 255, 255, 0.1);
    padding: 12px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.color-picker {
    width: 60px;
    height: 40px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    cursor: pointer;
    appearance: none;
    background: none;
}

.color-picker::-webkit-color-swatch-wrapper {
    padding: 0;
}

.color-picker::-webkit-color-swatch {
    border: none;
    border-radius: 6px;
}

.color-text-input {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    font-family: 'Courier New', monospace;
    min-width: 120px;
}

.color-text-input::placeholder {
    color: rgba(255, 255, 255, 0.6);
}

.color-text-input:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
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
</style>
