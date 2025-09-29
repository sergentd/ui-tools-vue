<template>
  <div class="control-card rounded-2xl p-6">
    <h3 class="text-lg font-bold text-white mb-4">Informations WCAG</h3>
    <div class="info-grid">
      <div class="info-item">
        <div class="info-item-title">Ratio de Contraste</div>
        <div class="info-item-value">{{ ratio.toFixed(2) }}:1</div>
      </div>
      <div class="info-item">
        <div class="info-item-title">Niveau AA Normal</div>
        <div class="info-item-value">{{ ratio >= 4.5 ? '✅ Conforme' : '❌ Non conforme' }}</div>
      </div>
      <div class="info-item">
        <div class="info-item-title">Niveau AA Large</div>
        <div class="info-item-value">{{ ratio >= 3 ? '✅ Conforme' : '❌ Non conforme' }}</div>
      </div>
      <div class="info-item">
        <div class="info-item-title">Niveau AAA</div>
        <div class="info-item-value">{{ ratio >= 7 ? '✅ Conforme' : '❌ Non conforme' }}</div>
      </div>
    </div>
    <div class="wcag-info">
      <p class="text-sm text-white/80">
        <strong>WCAG 2.1 :</strong><br>
        • AA Normal : ≥ 4.5:1 (texte standard)<br>
        • AA Large : ≥ 3:1 (texte ≥ 18pt ou gras ≥ 14pt)<br>
        • AAA : ≥ 7:1 (niveau d'excellence)
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  ratio: Number,
});
</script>

<style scoped>
.control-card {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

.wcag-info {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    padding: 16px;
    margin-top: 16px;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
}

.info-item {
    background: rgba(255, 255, 255, 0.1);
    padding: 12px;
    border-radius: 8px;
    text-align: center;
}

.info-item-title {
    font-size: 12px;
    opacity: 0.8;
    margin-bottom: 4px;
}

.info-item-value {
    font-weight: 600;
}
</style>