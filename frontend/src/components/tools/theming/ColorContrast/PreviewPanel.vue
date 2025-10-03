<template>
  <div class="glass-card rounded-2xl p-6">
    <h2 class="text-xl font-bold text-white mb-4">Aperçu</h2>
    <div class="preview-card" :style="{ color: textColor, background: backgroundColor }">
      <div class="ratio-display">{{ ratio.toFixed(2) }}:1</div>
      <div class="ratio-label">Ratio de Contraste</div>
      <div id="status-badges">
        <span v-if="ratio >= 4.5" class="status-badge status-aa">AA ✓</span>
        <span v-if="ratio >= 7" class="status-badge status-aaa">AAA ✓</span>
        <span v-if="ratio < 4.5" class="status-badge status-fail">Non conforme</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  textColor: String,
  backgroundColor: String,
  ratio: Number,
});
</script>

<style scoped>
.glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.preview-card {
    background: var(--bg-color, #ffffff);
    color: var(--text-color, #000000);
    border-radius: 12px;
    padding: 24px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: all 0.3s ease;
    border: 2px solid rgba(255, 255, 255, 0.2);
}

.ratio-display {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.ratio-label {
    font-size: 1.2rem;
    opacity: 0.8;
    margin-bottom: 1rem;
}

.status-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 14px;
    margin: 4px;
}

.status-pass {
    background: #10b981;
    color: white;
}

.status-fail {
    background: #ef4444;
    color: white;
}

.status-aa {
    background: #3b82f6;
    color: white;
}

.status-aaa {
    background: #8b5cf6;
    color: white;
}
</style>
