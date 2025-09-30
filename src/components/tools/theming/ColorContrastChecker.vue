<template>
  <div class="color-contrast-checker min-h-screen">
    <!-- Main content with container -->
    <div class="container mx-auto px-6 max-w-6xl py-8">
      <!-- Header inside container -->
      <ToolHeader
        title="Vérificateur de Contraste"
        description="Vérifiez la conformité WCAG de vos combinaisons de couleurs pour l'accessibilité"
        icon="color-contrast-checker"
        category="theming"
        status="Migré vers Vue"
        :show-badges="true"
      />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Controls Panel -->
        <div class="lg:col-span-1 space-y-6">
          <ControlPanel
            :text-color="colors.text"
            :background-color="colors.background"
            @update:textColor="updateTextColor"
            @update:backgroundColor="updateBackgroundColor"
            @swap-colors="swapColors"
            @random-colors="randomColors"
          />
          <WCAGInfo :ratio="contrastRatio" />
        </div>

        <!-- Preview Panel -->
        <div class="lg:col-span-1 space-y-6">
          <PreviewPanel :text-color="colors.text" :background-color="colors.background" :ratio="contrastRatio" />
          <TextExamples :text-color="colors.text" :background-color="colors.background" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';

// Components
import ToolHeader from '@/components/ui/ToolHeader.vue';
import ControlPanel from './ColorContrast/ControlPanel.vue';
import PreviewPanel from './ColorContrast/PreviewPanel.vue';
import WCAGInfo from './ColorContrast/WCAGInfo.vue';
import TextExamples from './ColorContrast/TextExamples.vue';

const colors = reactive({
  text: '#000000',
  background: '#FFFFFF',
});

const contrastRatio = computed(() => {
  return getContrastRatio(colors.text, colors.background);
});

function updateTextColor(newColor) {
  colors.text = newColor;
}

function updateBackgroundColor(newColor) {
  colors.background = newColor;
}

function swapColors() {
  const temp = colors.text;
  colors.text = colors.background;
  colors.background = temp;
}

function randomColors() {
  colors.text = randomColor();
  colors.background = randomColor();
}

function getLuminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function getContrastRatio(color1, color2) {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function randomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}
</script>

<style scoped>
.color-contrast-checker {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
}

.glass-card {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}
</style>