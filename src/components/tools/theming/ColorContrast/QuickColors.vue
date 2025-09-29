<template>
  <div class="quick-colors">
    <div
      v-for="color in colors"
      :key="color"
      class="quick-color"
      :style="{ background: color }"
      @click="$emit('select-color', color)"
    ></div>
  </div>
</template>

<script setup>
defineProps({
  colors: Array,
});

defineEmits(['select-color']);
</script>

<style scoped>
.quick-colors {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
    gap: 8px;
    margin-top: 12px;
}

.quick-color {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    cursor: pointer;
    border: 2px solid rgba(255, 255, 255, 0.3);
    transition: all 0.2s ease;
}

.quick-color:hover {
    transform: scale(1.1);
    border-color: rgba(255, 255, 255, 0.6);
}
</style>