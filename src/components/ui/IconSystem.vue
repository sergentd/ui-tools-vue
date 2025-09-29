<template>
  <svg
    :class="[
      'icon-svg',
      size,
      colorClass
    ]"
    :width="iconSize"
    :height="iconSize"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Palette Generator - Simple circle with inner colored circles -->
    <g v-if="name === 'palette-generator'">
      <!-- Main circle -->
      <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
      <!-- Inner colored circles -->
      <circle cx="9" cy="9" r="1.5" :fill="primaryColor"/>
      <circle cx="15" cy="9" r="1.5" :fill="secondaryColor"/>
      <circle cx="9" cy="15" r="1.5" :fill="accentColor"/>
      <circle cx="15" cy="15" r="1.5" :fill="tertiaryColor"/>
      <circle cx="12" cy="12" r="1.5" fill="#FF6B6B"/>
    </g>

    <!-- CSS Grid Generator - Clear grid layout -->
    <g v-else-if="name === 'css-grid-generator'">
      <!-- Grid container -->
      <rect x="3" y="5" width="18" height="14" stroke="currentColor" stroke-width="2" fill="none" rx="2"/>
      <!-- Grid lines -->
      <path d="M9 5v14M15 5v14M3 11h18M3 15h18" stroke="#FF6B6B" stroke-width="1" opacity="0.4"/>
      <!-- Grid items -->
      <rect x="4" y="6" width="4" height="4" :fill="primaryColor" rx="1"/>
      <rect x="10" y="6" width="4" height="4" :fill="secondaryColor" rx="1"/>
      <rect x="16" y="6" width="4" height="4" :fill="accentColor" rx="1"/>
      <rect x="4" y="12" width="10" height="6" :fill="tertiaryColor" rx="1" opacity="0.7"/>
      <rect x="16" y="12" width="4" height="6" fill="#FF6B6B" rx="1" opacity="0.7"/>
    </g>

    <!-- Color Contrast Checker - Simple circle half black half blue with dot -->
    <g v-else-if="name === 'color-contrast-checker'">
      <!-- Main circle -->
      <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
      <!-- Half black -->
      <path d="M12 4 A8 8 0 0 1 12 20 Z" fill="#000000"/>
      <!-- Half blue -->
      <path d="M12 4 A8 8 0 0 0 12 20 Z" :fill="primaryColor"/>
      <!-- Dividing line -->
      <path d="M12 4v16" stroke="currentColor" stroke-width="1"/>
      <!-- Opposed color dot -->
      <circle cx="16" cy="12" r="1.5" fill="#FF6B6B"/>
    </g>

    <!-- Shadow Generator - Blue circle with offset black circle -->
    <g v-else-if="name === 'shadow-generator'">
      <!-- Shadow circle (offset black) -->
      <circle cx="14" cy="14" r="9" fill="#FF6B6B" opacity="0.5"/>
      <!-- Main blue circle -->
      <circle cx="12" cy="12" r="6" :fill="primaryColor" stroke="currentColor" stroke-width="2"/>
    </g>

    <!-- Flexbox Playground - Simple container with flexible rectangles -->
    <g v-else-if="name === 'flexbox-playground'">
      <!-- Container -->
      <rect x="3" y="8" width="18" height="8" stroke="currentColor" stroke-width="2" fill="none" rx="1"/>
      <!-- Simple flexible items -->
      <rect x="5" y="10" width="2" height="4" fill="#FF6B6B"/>
      <rect x="8" y="10" width="3" height="4" :fill="secondaryColor"/>
      <rect x="12" y="10" width="4" height="4" :fill="accentColor"/>
      <rect x="17" y="10" width="2" height="4" :fill="tertiaryColor"/>
    </g>

    <!-- Gradient Generator - Simple rectangle with gradient -->
    <g v-else-if="name === 'gradient-generator'">
      <defs>
        <linearGradient id="simple-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#FF6B6B"/>
          <stop offset="50%" :stop-color="accentColor"/>
          <stop offset="100%" :stop-color="primaryColor"/>
        </linearGradient>
      </defs>
      <!-- Simple gradient rectangle -->
      <rect x="4" y="8" width="16" height="8" fill="url(#simple-gradient)" stroke="currentColor" stroke-width="2" rx="2"/>
    </g>

    <!-- Glossary/Book - Simple book -->
    <g v-else-if="name === 'glossaire-webdev'">
      <rect x="6" y="4" width="12" height="16" :fill="primaryColor" stroke="currentColor" stroke-width="2" rx="1"/>
      <path d="M8 8h8M8 11h6M8 17h5" :stroke="accentColor" stroke-width="1"/>
      <path d="M8 14h7" stroke="#FF6B6B" stroke-width="1"/>
      <path d="M6 4v16" stroke="currentColor" stroke-width="2"/>
    </g>

    <!-- Theming Multi-client - Three rectangles with different colors -->
    <g v-else-if="name === 'theming-multiclient'">
      <rect x="3" y="6" width="5" height="12" :fill="primaryColor" stroke="currentColor" stroke-width="1.5" rx="1"/>
      <rect x="9.5" y="6" width="5" height="12" fill="#FF6B6B" stroke="currentColor" stroke-width="1.5" rx="1"/>
      <rect x="16" y="6" width="5" height="12" :fill="accentColor" stroke="currentColor" stroke-width="1.5" rx="1"/>
    </g>

    <!-- CSS Specificity - Concentric circles -->
    <g v-else-if="name === 'css-specificity'">
      <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
      <circle cx="12" cy="12" r="5" :fill="primaryColor" opacity="0.6"/>
      <circle cx="12" cy="12" r="2" fill="#FF6B6B"/>
    </g>

    <!-- WebUI Principles - Simple document with lines -->
    <g v-else-if="name === 'webui-principles'">
      <rect x="5" y="4" width="14" height="16" stroke="currentColor" stroke-width="2" fill="none" rx="2"/>
      <path d="M8 8h8M8 12h6M8 16h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M8 8h8" stroke="#FF6B6B" stroke-width="1.5" stroke-linecap="round"/>
    </g>

    <!-- Skills Evaluator - Simple bar chart -->
    <g v-else-if="name === 'skills-evaluator'">
      <rect x="4" y="14" width="2" height="6" :fill="primaryColor"/>
      <rect x="8" y="12" width="2" height="8" fill="#FF6B6B"/>
      <rect x="12" y="8" width="2" height="12" :fill="accentColor"/>
      <rect x="16" y="10" width="2" height="10" :fill="tertiaryColor"/>
      <rect x="20" y="6" width="2" height="14" :fill="primaryColor"/>
    </g>

    <!-- Mind Map - Central circle with connected smaller circles -->
    <g v-else-if="name === 'mindmap'">
      <circle cx="12" cy="12" r="3" :fill="primaryColor" stroke="currentColor" stroke-width="2"/>
      <circle cx="6" cy="6" r="1.5" :fill="secondaryColor"/>
      <circle cx="18" cy="6" r="1.5" :fill="accentColor"/>
      <circle cx="6" cy="18" r="1.5" fill="#FF6B6B"/>
      <circle cx="18" cy="18" r="1.5" :fill="primaryColor"/>
      <path d="M9.5 10.5L7.5 7.5M14.5 10.5L16.5 7.5M9.5 13.5L7.5 16.5M14.5 13.5L16.5 16.5" stroke="currentColor" stroke-width="1"/>
    </g>

    <!-- Category: Theming -->
    <g v-else-if="name === 'category-theming'">
      <circle cx="7" cy="7" r="4" :fill="primaryColor"/>
      <circle cx="17" cy="7" r="4" :fill="secondaryColor"/>
      <circle cx="7" cy="17" r="4" :fill="accentColor"/>
      <circle cx="17" cy="17" r="4" :fill="tertiaryColor"/>
      <path d="M11 7h2M7 11v2M13 17h2M17 13v2" stroke="currentColor" stroke-width="1.5"/>
    </g>

    <!-- Category: Reference -->
    <g v-else-if="name === 'category-reference'">
      <rect x="5" y="2" width="14" height="20" :fill="primaryColor" stroke="currentColor" stroke-width="2" rx="2"/>
      <path d="M8 6h8M8 9h8M8 12h6M8 15h7M8 18h5" stroke="currentColor" stroke-width="1"/>
      <path d="M5 2v20" stroke="currentColor" stroke-width="2"/>
    </g>

    <!-- Category: Dashboard -->
    <g v-else-if="name === 'category-dashboard'">
      <rect x="2" y="2" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" rx="2"/>
      <rect x="4" y="16" width="2" height="4" :fill="primaryColor"/>
      <rect x="7" y="14" width="2" height="6" :fill="secondaryColor"/>
      <rect x="10" y="12" width="2" height="8" :fill="accentColor"/>
      <rect x="13" y="10" width="2" height="10" :fill="tertiaryColor"/>
      <rect x="16" y="8" width="2" height="12" :fill="primaryColor"/>
      <circle cx="19" cy="5" r="1.5" :fill="accentColor"/>
    </g>

    <!-- Category: Evaluation -->
    <g v-else-if="name === 'category-evaluation'">
      <path d="M12 2l3 6h6l-5 4 2 6-6-4-6 4 2-6-5-4h6z" :fill="primaryColor" stroke="currentColor" stroke-width="1"/>
      <circle cx="12" cy="12" r="2" :fill="accentColor"/>
      <path d="M8 16h8M9 18h6M10 20h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </g>

    <!-- Category: Visualization -->
    <g v-else-if="name === 'category-visualization'">
      <circle cx="12" cy="8" r="3" :fill="primaryColor" stroke="currentColor" stroke-width="2"/>
      <circle cx="6" cy="16" r="2" :fill="secondaryColor"/>
      <circle cx="18" cy="16" r="2" :fill="accentColor"/>
      <circle cx="12" cy="20" r="2" :fill="tertiaryColor"/>
      <path d="M12 11v3M9.5 14.5L7.5 15.5M14.5 14.5L16.5 15.5M12 17v1"
            stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
    </g>

    <!-- State Icons -->
    <!-- Construction -->
    <g v-else-if="name === 'construction'">
      <rect x="4" y="4" width="16" height="16" :fill="primaryColor" stroke="currentColor" stroke-width="2" rx="2"/>
      <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" stroke-width="2"/>
      <circle cx="12" cy="12" r="2" :fill="accentColor"/>
    </g>

    <!-- Error/Not Found -->
    <g v-else-if="name === 'error'">
      <circle cx="12" cy="12" r="9" :fill="primaryColor" stroke="currentColor" stroke-width="2"/>
      <path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" stroke-width="2"/>
    </g>

    <!-- Search -->
    <g v-else-if="name === 'search'">
      <circle cx="10" cy="10" r="6" stroke="currentColor" stroke-width="2" fill="none"/>
      <path d="M14.5 14.5L20 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <circle cx="10" cy="10" r="3" :fill="primaryColor" opacity="0.3"/>
    </g>

    <!-- All/Everything -->
    <g v-else-if="name === 'all'">
      <circle cx="6" cy="6" r="2" :fill="primaryColor"/>
      <circle cx="18" cy="6" r="2" :fill="secondaryColor"/>
      <circle cx="6" cy="18" r="2" :fill="accentColor"/>
      <circle cx="18" cy="18" r="2" :fill="tertiaryColor"/>
      <circle cx="12" cy="12" r="2" :fill="accentColor"/>
      <path d="M8 6h2M14 6h2M6 8v2M6 14v2M18 8v2M18 14v2M8 18h2M14 18h2"
            stroke="currentColor" stroke-width="1" opacity="0.6"/>
    </g>

    <!-- Favorites -->
    <g v-else-if="name === 'favorites'">
      <path d="M12 2l3 6h6l-5 4 2 6-6-4-6 4 2-6-5-4h6z" :fill="accentColor" stroke="currentColor" stroke-width="1"/>
      <circle cx="12" cy="12" r="2" :fill="primaryColor"/>
    </g>

    <!-- Component Library - Nested squares representing components -->
    <g v-else-if="name === 'component-library'">
      <rect x="2" y="2" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" rx="2"/>
      <rect x="5" y="5" width="6" height="4" :fill="primaryColor" rx="1"/>
      <rect x="13" y="5" width="6" height="4" :fill="secondaryColor" rx="1"/>
      <rect x="5" y="11" width="14" height="3" :fill="accentColor" rx="1"/>
      <rect x="5" y="16" width="6" height="4" :fill="tertiaryColor" rx="1"/>
      <rect x="13" y="16" width="6" height="4" fill="#FF6B6B" rx="1"/>
      <circle cx="8" cy="7" r="0.5" fill="white"/>
      <circle cx="16" cy="7" r="0.5" fill="white"/>
      <circle cx="12" cy="12.5" r="0.5" fill="white"/>
    </g>

    <!-- Play Icon -->
    <g v-else-if="name === 'play'">
      <path d="M8 5V19L19 12L8 5Z" :fill="primaryColor" stroke="currentColor" stroke-width="1"/>
    </g>

    <!-- Eye/View Icon -->
    <g v-else-if="name === 'eye' || name === 'view'">
      <path d="M12 5C7 5 2.73 8.11 1 12C2.73 15.89 7 19 12 19C17 19 21.27 15.89 23 12C21.27 8.11 17 5 12 5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z" :fill="primaryColor" stroke="currentColor" stroke-width="1"/>
      <circle cx="12" cy="12" r="3" fill="#FF6B6B"/>
    </g>

    <!-- Headset Icon -->
    <g v-else-if="name === 'tag' || name === 'tickets' || name === 'headset'">
      <!-- Headband -->
      <path d="M7 6C7 3.79 8.79 2 11 2h2C15.21 2 17 3.79 17 6v2" stroke="currentColor" stroke-width="2" fill="none"/>
      <!-- Left earpad -->
      <ellipse cx="7" cy="10" rx="2" ry="3" :fill="primaryColor" stroke="currentColor" stroke-width="1.5"/>
      <!-- Right earpad -->
      <ellipse cx="17" cy="10" rx="2" ry="3" :fill="primaryColor" stroke="currentColor" stroke-width="1.5"/>
      <!-- Microphone arm - longer and more curved -->
      <path d="M5 11Q3 12 2 14Q1 16 2 18" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/>
      <!-- Microphone - more centered -->
      <circle cx="2" cy="18" r="1.5" fill="#FF6B6B"/>
      <!-- Connection to headband -->
      <path d="M7 8v2M17 8v2" stroke="currentColor" stroke-width="1.5"/>
    </g>

    <!-- Lifebuoy Icon -->
    <g v-else-if="name === 'lifebuoy'">
      <!-- Define mask for center hole -->
      <defs>
        <mask id="lifebuoy-mask">
          <rect x="0" y="0" width="24" height="24" fill="white"/>
          <circle cx="12" cy="12" r="4" fill="black"/>
        </mask>
      </defs>
      <!-- Four quarter segments with alternating colors -->
      <!-- Top quarter (red) -->
      <path d="M12 4A8 8 0 0 1 20 12L12 12Z" fill="#FF6B6B" mask="url(#lifebuoy-mask)"/>
      <!-- Right quarter (white) -->
      <path d="M20 12A8 8 0 0 1 12 20L12 12Z" fill="white" mask="url(#lifebuoy-mask)"/>
      <!-- Bottom quarter (red) -->
      <path d="M12 20A8 8 0 0 1 4 12L12 12Z" fill="#FF6B6B" mask="url(#lifebuoy-mask)"/>
      <!-- Left quarter (white) -->
      <path d="M4 12A8 8 0 0 1 12 4L12 12Z" fill="white" mask="url(#lifebuoy-mask)"/>
      <!-- Outer ring stroke -->
      <circle cx="12" cy="12" r="8" fill="none" :stroke="accentColor" stroke-width="2"/>
    </g>
    <!-- Chevron Right -->
    <g v-else-if="name === 'chevron-right'">
      <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <!-- Chevron Down -->
    <g v-else-if="name === 'chevron-down'">
      <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <!-- Plus Icon -->
    <g v-else-if="name === 'plus'">
      <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <!-- X/Close Icon -->
    <g v-else-if="name === 'x'">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <!-- Shuffle Icon -->
    <g v-else-if="name === 'shuffle'">
      <polyline points="16,3 21,3 21,8" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4 20L21 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <polyline points="21,16 21,21 16,21" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M15 15l6 6M4 4l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <!-- Check Icon -->
    <g v-else-if="name === 'check'">
      <polyline points="20,6 9,17 4,12" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    </g>

    <!-- Clipboard Icon -->
    <g v-else-if="name === 'clipboard'">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="currentColor" stroke-width="2" fill="none"/>
    </g>

    <!-- Default fallback -->
    <g v-else>
      <rect x="3" y="3" width="18" height="18" :fill="primaryColor" stroke="currentColor" stroke-width="2" rx="3"/>
      <circle cx="12" cy="12" r="4" :fill="accentColor"/>
    </g>


  </svg>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['xs', 'sm', 'md', 'lg', 'xl', '2xl'].includes(value)
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'electric', 'mono', 'custom'].includes(value)
  },
  customColors: {
    type: Object,
    default: () => ({})
  }
})

// Size mappings
const iconSize = computed(() => {
  const sizes = {
    xs: '16',
    sm: '20',
    md: '24',
    lg: '32',
    xl: '48',
    '2xl': '64'
  }
  return sizes[props.size] || '24'
})

// Color schemes
const colorScheme = computed(() => {
  if (props.variant === 'custom' && Object.keys(props.customColors).length > 0) {
    return props.customColors
  }

  const schemes = {
    default: {
      primary: 'var(--electric-blue)',
      secondary: 'var(--electric-blue-light)',
      accent: 'var(--electric-blue-dark)',
      tertiary: 'rgba(var(--electric-blue-rgb), 0.6)'
    },
    electric: {
      primary: '#00D4FF',
      secondary: '#33DDFF',
      accent: '#0099CC',
      tertiary: 'rgba(0, 212, 255, 0.4)'
    },
    mono: {
      primary: 'currentColor',
      secondary: 'currentColor',
      accent: 'currentColor',
      tertiary: 'currentColor'
    }
  }

  return schemes[props.variant] || schemes.default
})

// Individual color accessors
const primaryColor = computed(() => colorScheme.value.primary)
const secondaryColor = computed(() => colorScheme.value.secondary)
const accentColor = computed(() => colorScheme.value.accent)
const tertiaryColor = computed(() => colorScheme.value.tertiary)

// CSS classes
const colorClass = computed(() => {
  if (props.variant === 'mono') return 'text-current'
  return 'text-electric-blue'
})
</script>

<style scoped>
.icon-svg {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}

.xs { @apply w-4 h-4; }
.sm { @apply w-5 h-5; }
.md { @apply w-6 h-6; }
.lg { @apply w-8 h-8; }
.xl { @apply w-12 h-12; }
.\32xl { @apply w-16 h-16; }
</style>