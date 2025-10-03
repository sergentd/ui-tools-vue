<template>
  <div class="glass-card rounded-2xl p-6">
    <h3 class="text-lg font-bold text-white mb-4">Exemples de Texte</h3>
    <div class="space-y-4">
      <div
        v-for="(example, index) in examples"
        :key="index"
        :style="{
          color: textColor,
          background: backgroundColor,
          fontSize: example.size,
          fontWeight: example.weight,
        }"
        class="p-3 rounded-lg border border-white/20"
      >
        {{ example.text }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  textColor: String,
  backgroundColor: String,
});

const examples = ref([
  { text: 'Titre principal de la page', size: '24px', weight: 'bold' },
  { text: 'Sous-titre ou texte important', size: '18px', weight: '600' },
  { text: 'Texte de contenu standard pour la lecture', size: '16px', weight: 'normal' },
  { text: 'Texte plus petit pour les détails', size: '14px', weight: 'normal' },
  { text: 'Texte de lien ou d\'action', size: '16px', weight: '500' },
]);
</script>

<style scoped>
.glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}
</style>