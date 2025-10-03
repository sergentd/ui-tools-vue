<template>
  <div class="palette-generator min-h-screen">
    <!-- Main content with container -->
    <div class="container mx-auto px-6 max-w-7xl pt-0 pb-8">
      <!-- Header inside container -->
      <div class="tool-header-wrapper">
        <ToolHeader
          title="Générateur de Palette"
          description="Créez, ajustez et exportez vos palettes de couleurs avec l'accessibilité à l'esprit"
          icon="palette-generator"
          category="theming"
          status="Migré vers Vue"
          :show-badges="true"
        />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Generation Controls -->
        <div class="lg:col-span-1 space-y-6">
          <!-- Color Generation -->
          <div class="control-section">
            <h3 class="section-title">Génération par couleur</h3>
            <div class="section-content">
              <ColorGeneration
                :base-color="paletteState.baseColor"
                :generation-mode="paletteState.generationMode"
                @update:base-color="paletteState.baseColor = $event"
                @update:generation-mode="paletteState.generationMode = $event"
                @generate="generatePalette"
              />
            </div>
          </div>

          <!-- Image Extraction -->
          <div class="control-section">
            <h3 class="section-title">Extraction depuis une image</h3>
            <div class="section-content">
              <ImageExtraction
                @colors-extracted="handleImageExtraction"
              />
            </div>
          </div>

          <!-- Manual Addition -->
          <div class="control-section">
            <h3 class="section-title">Ajouter manuellement</h3>
            <div class="section-content">
              <ManualColorInput
                @colors-updated="handleManualColors"
              />
            </div>
          </div>
        </div>

        <!-- Main Palette Area -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Palette Header -->
          <div class="main-section">
            <div class="palette-header">
              <div class="flex justify-between items-center flex-wrap gap-4">
                <input
                  v-model="paletteState.paletteName"
                  type="text"
                  placeholder="Nom de la palette"
                  class="palette-name-input"
                >
                <div class="flex gap-2 flex-wrap">
                  <button
                    @click="savePalette"
                    class="btn btn-secondary"
                  >
                    Sauvegarder
                  </button>
                  <div class="relative">
                    <button
                      @click="showExportMenu = !showExportMenu"
                      class="btn btn-primary"
                    >
                      Exporter
                    </button>
                    <div
                      v-if="showExportMenu"
                      class="export-menu"
                      @click.stop
                    >
                      <button @click.stop="exportPalette('json')">en JSON</button>
                      <button @click.stop="exportPalette('css')">en CSS</button>
                      <button @click.stop="exportPalette('scss')">en SCSS</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Color Palette Display -->
            <div class="palette-content">
              <PaletteDisplay
                :colors="paletteState.colors"
                :palette-name="paletteState.paletteName"
                @palette-saved="handlePaletteSave"
                @colors-updated="paletteState.colors = $event"
                @palette-name-updated="paletteState.paletteName = $event"
              />
            </div>
          </div>
        </div>

        <!-- Saved Palettes -->
        <div class="lg:col-span-1">
          <div class="control-section">
            <h3 class="section-title">Palettes sauvegardées</h3>
            <div class="section-content">
              <SavedPalettes
                ref="savedPalettesRef"
                @palette-loaded="handlePaletteLoad"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Click outside to close export menu -->
    <div
      v-if="showExportMenu"
      class="fixed inset-0 z-10"
      @click="showExportMenu = false"
    ></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

// Components
import ToolHeader from '@/components/ui/ToolHeader.vue'
import GlassCard from '@/components/ui/GlassCard.vue'
import ColorGeneration from './PaletteGenerator/ColorGeneration.vue'
import ImageExtraction from './PaletteGenerator/ImageExtraction.vue'
import ManualColorInput from './PaletteGenerator/ManualColorInput.vue'
import PaletteDisplay from './PaletteGenerator/PaletteDisplay.vue'
import SavedPalettes from './PaletteGenerator/SavedPalettes.vue'

// State management
const paletteState = reactive({
  paletteName: '',
  baseColor: '#3D5A80',
  generationMode: 'monochromatic',
  colors: []
})

const showExportMenu = ref(false)
const savedPalettesRef = ref(null)
let nextColorId = 1

// Load saved palettes on mount
onMounted(() => {
  // Add some default colors
  if (paletteState.colors.length === 0) {
    paletteState.colors = ['#3D5A80']
  }
})

// Methods

const generatePalette = () => {
  const mode = paletteState.generationMode
  const baseHex = paletteState.baseColor
  let newColors = []

  if (mode === 'monochromatic') {
    newColors = [
      adjustBrightness(baseHex, -30),
      adjustBrightness(baseHex, -15),
      baseHex,
      adjustBrightness(baseHex, 15),
      adjustBrightness(baseHex, 30)
    ]
  } else if (mode === 'analogous') {
    newColors = [
      shiftHue(baseHex, -60),
      shiftHue(baseHex, -30),
      baseHex,
      shiftHue(baseHex, 30),
      shiftHue(baseHex, 60)
    ]
  } else if (mode === 'complementary') {
    const compHex = shiftHue(baseHex, 180)
    newColors = [
      adjustBrightness(baseHex, -20),
      baseHex,
      adjustBrightness(baseHex, 20),
      compHex,
      adjustBrightness(compHex, 20)
    ]
  } else if (mode === 'triadic') {
    const t1 = shiftHue(baseHex, 120)
    const t2 = shiftHue(baseHex, 240)
    newColors = [
      adjustBrightness(baseHex, -15),
      baseHex,
      t1,
      t2,
      adjustBrightness(baseHex, 15)
    ]
  }

  paletteState.colors = newColors
}

const handleManualColors = (colors) => {
  paletteState.colors = colors
}

const handlePaletteSave = (palette) => {
  if (savedPalettesRef.value) {
    savedPalettesRef.value.addPalette(palette)
  }
}

const handlePaletteLoad = (colors) => {
  paletteState.colors = colors
}


const handleImageExtraction = (colors) => {
  paletteState.colors = colors
  paletteState.paletteName = "Palette d'image"
}

const savePalette = () => {
  if (!paletteState.paletteName.trim() || paletteState.colors.length === 0) return

  const paletteData = {
    name: paletteState.paletteName,
    colors: paletteState.colors,
    timestamp: new Date().toISOString()
  }

  if (savedPalettesRef.value) {
    savedPalettesRef.value.addPalette(paletteData)
  }
}

const exportPalette = (format) => {
  const paletteData = {
    name: paletteState.paletteName || 'Palette sans nom',
    colors: paletteState.colors,
    timestamp: new Date().toISOString()
  }

  if (format === 'json') {
    const filename = sanitizeForFilename(paletteData.name) + '.json'
    downloadFile(filename, JSON.stringify(paletteData, null, 2), 'application/json')
  } else if (format === 'css') {
    let css = ':root {\n'
    paletteData.colors.forEach((color, index) => {
      css += `  --color-${index + 1}: ${color};\n`
    })
    css += '}'
    const filename = sanitizeForFilename(paletteData.name) + '.css'
    downloadFile(filename, css, 'text/css')
  } else if (format === 'scss') {
    let scss = paletteData.colors.map((color, index) =>
      `$color-${index + 1}: ${color};`
    ).join('\n')
    const filename = sanitizeForFilename(paletteData.name) + '.scss'
    downloadFile(filename, scss, 'text/scss')
  }

  showExportMenu.value = false
}

// Utility functions
const downloadFile = (filename, content, mimeType) => {
  const a = document.createElement('a')
  const blob = new Blob([content], { type: mimeType })
  a.href = URL.createObjectURL(blob)
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

const sanitizeForFilename = (name) => {
  if (!name) return 'palette'
  return name.trim().toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+\+\s*/g, '_plus_')
    .replace(/\s+-\s*/g, '_minus_')
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
    .replace(/__+/g, '_')
    .replace(/^_+|_+$/g, '')
}

const sanitizeForCss = (name) => {
  if (!name) return ''
  return name.trim().toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+\+\s*/g, '-plus-')
    .replace(/\s+-\s*/g, '-minus-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const hexToHsl = (hex) => {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }

  return [h * 360, s * 100, l * 100]
}

const hslToHex = (h, s, l) => {
  l /= 100
  const a = s * Math.min(l, 1 - l) / 100
  const f = n => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}

const adjustBrightness = (hex, percent) => {
  const [h, s, l] = hexToHsl(hex)
  const newL = Math.max(0, Math.min(100, l + percent))
  return hslToHex(h, s, newL)
}

const shiftHue = (hex, degrees) => {
  const [h, s, l] = hexToHsl(hex)
  const newH = (h + degrees + 360) % 360
  return hslToHex(newH, s, l)
}
</script>

<style scoped>
.palette-generator {
  min-height: 100vh;
}

.palette-generator::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 20% 20%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(0, 212, 255, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 40% 60%, rgba(0, 212, 255, 0.03) 0%, transparent 50%);
  z-index: -1;
  pointer-events: none;
}

.container {
  max-width: 1400px;
}

.control-section {
  background: var(--glass-bg-light);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-primary);
  border-radius: 16px;
  overflow: hidden;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  padding: 20px 24px 16px;
  margin: 0;
  border-bottom: 1px solid var(--border-primary);
}

.section-content {
  padding: 24px;
}

.main-section {
  background: var(--glass-bg-light);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-primary);
  border-radius: 16px;
  overflow: hidden;
}

.palette-header {
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-primary);
}

.palette-content {
  padding: 24px;
}

.palette-name-input {
  background: var(--glass-bg-light);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-primary);
  color: var(--text-primary);
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 500;
  flex: 1;
  min-width: 200px;
  transition: all 0.3s ease;
}

.palette-name-input::placeholder {
  color: var(--text-secondary);
}

.palette-name-input:focus {
  outline: none;
  border-color: var(--electric-blue);
  box-shadow: 0 0 0 2px rgba(var(--electric-blue-rgb), 0.3);
  background: var(--glass-bg-medium);
}

.btn {
  background: var(--glass-bg-light);
  backdrop-filter: blur(10px);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  position: relative;
  overflow: hidden;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
  border-color: var(--electric-blue);
  background: var(--glass-bg-medium);
}

.btn-primary {
  background: var(--electric-blue);
  color: #000000;
  border-color: var(--electric-blue);
}

.btn-primary:hover {
  background: var(--electric-blue-dark);
  color: #000000;
  border-color: var(--electric-blue-dark);
  box-shadow: 0 8px 25px rgba(var(--electric-blue-rgb), 0.4);
}

.btn-secondary {
  background: var(--glass-bg-medium);
  color: var(--text-primary);
  border-color: var(--border-secondary);
}

.btn-secondary:hover {
  background: var(--glass-bg-light);
  border-color: var(--electric-blue);
  box-shadow: 0 8px 25px rgba(var(--electric-blue-rgb), 0.2);
}

.export-menu {
  position: absolute;
  right: 0;
  top: 100%;
  margin-top: 8px;
  background: #1a1a1a;
  border: 2px solid var(--electric-blue);
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.8);
  z-index: 20;
  min-width: 140px;
  overflow: hidden;
}

.export-menu button {
  display: block;
  width: 100%;
  padding: 12px 16px;
  background: none;
  border: none;
  color: white;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
}

.export-menu button:hover {
  background: var(--electric-blue);
  color: #000000;
}

.tool-header-wrapper {
  margin-bottom: 0;
}

.tool-header-wrapper :deep(.tool-header) {
  margin-bottom: 0;
}
</style>