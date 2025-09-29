<template>
  <div class="skills-evaluator-tool">
    <ToolHeader
      title="Évaluateur de Compétences"
      description="Visualisez et exportez vos compétences de développeur sous forme de rapport PDF professionnel."
      icon="📊"
      category="evaluation"
      status="Migré vers Vue"
      :show-badges="true"
    />

    <div class="container mx-auto px-4 py-8">
      <header class="text-center mb-12 animate-fade-in">
        <div class="relative mb-6">
          <h1 class="text-4xl md:text-5xl font-bold text-[#3D3B30] mb-4 relative">
            Mes Compétences
            <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#A59469] to-[#8C7A4B] rounded-full"></div>
          </h1>
        </div>
        <p class="text-lg text-[#3D3B30]/70 mb-8 max-w-2xl mx-auto">
          Une évaluation dynamique et interactive de mes compétences techniques,
          avec export PDF professionnel pour portfolios et CV.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            @click="exportToPDF"
            :disabled="isExporting"
            class="bg-gradient-to-r from-[#A59469] to-[#8C7A4B] hover:from-[#8C7A4B] hover:to-[#73643C] disabled:from-[#D9CDB8] disabled:to-[#D9CDB8] disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 disabled:transform-none disabled:hover:scale-100 group"
          >
            <span v-if="isExporting" class="flex items-center gap-2">
              <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              Génération du PDF...
            </span>
            <span v-else class="flex items-center gap-2">
              <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H4zm0 12V5h12v10H4z"/>
              </svg>
              Exporter en PDF
            </span>
          </button>
          <div class="text-sm text-[#3D3B30]/50 flex items-center gap-2">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
            Cliquez sur les compétences pour plus de détails
          </div>
        </div>
      </header>

      <!-- Section de la Légende des Niveaux -->
      <section id="skills-legend" class="max-w-4xl mx-auto mb-12 p-6 bg-white rounded-xl shadow-md border border-[#EFEBE4]">
        <h3 class="text-xl font-bold text-[#3D3B30] mb-5 text-center md:text-left">Légende des Niveaux</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-y-4 gap-x-6 text-sm">
          <div class="flex items-center space-x-3">
            <span class="flex-shrink-0 w-5 h-5 rounded-full bg-red-800"></span>
            <div><p class="font-semibold text-[#3D3B30]">0: Inconnu</p></div>
          </div>
          <div class="flex items-center space-x-3">
            <span class="flex-shrink-0 w-5 h-5 rounded-full bg-red-500"></span>
            <div><p class="font-semibold text-[#3D3B30]">1-3: Novice</p></div>
          </div>
          <div class="flex items-center space-x-3">
            <span class="flex-shrink-0 w-5 h-5 rounded-full bg-[#A59469]"></span>
            <div><p class="font-semibold text-[#3D3B30]">4-6: Compétent</p></div>
          </div>
          <div class="flex items-center space-x-3">
            <span class="flex-shrink-0 w-5 h-5 rounded-full bg-green-500"></span>
            <div><p class="font-semibold text-[#3D3B30]">7-8: Avancé</p></div>
          </div>
          <div class="flex items-center space-x-3">
            <span class="flex-shrink-0 w-5 h-5 rounded-full bg-green-700"></span>
            <div><p class="font-semibold text-[#3D3B30]">9-10: Expert</p></div>
          </div>
        </div>
      </section>

      <!-- Conteneur des compétences -->
      <main id="skills-container" class="max-w-4xl mx-auto space-y-8">
        <div
          v-for="(category, categoryIndex) in skillsData"
          :key="category.category"
          class="skill-category-box bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden p-6 md:p-8 border border-[#EFEBE4] transition-all duration-500 hover:border-[#A59469] hover:transform hover:scale-[1.02] hover:-translate-y-2 group"
          :style="{ animationDelay: `${categoryIndex * 100}ms` }"
        >
          <h2 class="text-2xl font-bold text-[#3D3B30] border-b border-[#EFEBE4] pb-4 mb-6 flex items-center">
            <span class="w-1 h-6 bg-[#A59469] rounded-full mr-3"></span>
            {{ category.category }}
          </h2>
          <div class="space-y-5">
            <div
              v-for="(skill, skillIndex) in category.skills"
              :key="skill.name"
              class="skill-row grid grid-cols-12 items-center gap-4 py-3 px-3 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-[#F8F7F4] hover:to-[#F8F7F4]/30 hover:shadow-md cursor-pointer group"
              :style="{ animationDelay: `${(categoryIndex * 100) + (skillIndex * 50)}ms` }"
            >
              <span class="skill-name col-span-4 md:col-span-3 font-medium text-[#3D3B30] transition-all duration-200 group-hover:text-[#A59469] group-hover:font-semibold">
                {{ skill.name }}
              </span>
              <div class="col-span-7 md:col-span-8 h-4 relative skill-bar-container">
                <div class="w-full h-full bg-[#EFEBE4] rounded-full absolute top-0 left-0"></div>
                <div
                  class="skill-bar-level h-4 rounded-full absolute top-0 left-0 transition-all duration-800 shadow-sm overflow-hidden"
                  :class="getSkillColorClass(skill.level)"
                  :style="{ width: `${skill.level * 10}%` }"
                >
                  <div class="skill-bar-stripes absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <span class="skill-level-text col-span-1 text-right text-sm font-bold text-[#3D3B30]/70 transition-all duration-200 group-hover:text-[#A59469] group-hover:scale-110">
                {{ skill.level }}/10
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ToolHeader from '@/components/ui/ToolHeader.vue'

// State for PDF export
const isExporting = ref(false)

// Skills data
const skillsData = [
  {
    category: "Développement Frontend",
    skills: [
      { name: "HTML5", level: 8 },
      { name: "CSS & Pré-processeurs (Sass)", level: 8 },
      { name: "JavaScript (ES6+)", level: 8 },
      { name: "TypeScript", level: 5 },
      { name: "Vue.js (Composition API)", level: 7 },
      { name: "React", level: 0 },
      { name: "Svelte / SvelteKit", level: 3 },
      { name: "Pinia (Vue)", level: 3 },
      { name: "Tailwind CSS", level: 8 },
      { name: "Bibliothèques de Composants (ex: Vuetify)", level: 1 },
      { name: "Tests Unitaires (Jest / Vitest)", level: 1 },
      { name: "REST APIs & Fetch/Axios", level: 10 },
      { name: "Accessibilité (WCAG)", level: 5 },
      { name: "Performance Web (Core Web Vitals)", level: 5 },
      { name: "WEBDEV 2025", level: 2 },
    ]
  },
  {
    category: "Développement Backend",
    skills: [
      { name: "Node.js", level: 7 },
      { name: "Python", level: 9 },
      { name: "Django (Python)", level: 3 },
      { name: "Flask (Python)", level: 7 },
      { name: "SQL (PostgreSQL, MySQL)", level: 6 },
      { name: "Redis", level: 5 },
      { name: "Conception d'API REST", level: 7 },
      { name: "JWT / OAuth", level: 1 },
      { name: "Docker & Docker Compose", level: 6 },
      { name: "SQLAlchemy", level: 5 },
      { name: "Entity Framework", level: 4 },
      { name: "WINDEV 2025", level: 2 },
    ]
  },
  {
    category: "Outils & DevOps",
    skills: [
      { name: "Git & GitHub/GitLab", level: 9 },
      { name: "PCSOFT GDS", level: 3 },
      { name: "CI/CD (GitHub Actions / GitLab CI)", level: 1 },
      { name: "Outils de Build (Vite)", level: 5 },
      { name: "Méthodologies Agile / Scrum", level: 7 },
      { name: "Jira / Trello", level: 5 },
    ]
  }
]

// Get skill color class based on level
const getSkillColorClass = (level) => {
  if (level === 0) return 'bg-red-800'
  if (level >= 1 && level <= 3) return 'bg-red-500'
  if (level >= 4 && level <= 6) return 'bg-[#A59469]'
  if (level >= 7 && level <= 8) return 'bg-green-500'
  if (level >= 9 && level <= 10) return 'bg-green-700'
  return 'bg-slate-400'
}


// PDF Export functionality
const exportToPDF = async () => {
  try {
    isExporting.value = true

    // Dynamically import the required libraries
    const [html2canvas, { jsPDF }] = await Promise.all([
      import('html2canvas'),
      import('jspdf')
    ])

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

    const legendBox = document.getElementById('skills-legend')
    const categoryBoxes = document.querySelectorAll('.skill-category-box')
    const originalBg = document.body.style.backgroundColor
    document.body.style.backgroundColor = 'white'

    // Utility function to capture an element using clone strategy
    const captureElement = async (element) => {
      const clone = element.cloneNode(true)
      clone.style.position = 'absolute'
      clone.style.left = '-9999px'
      clone.style.width = element.offsetWidth + 'px'
      clone.classList.remove('shadow-md')
      document.body.appendChild(clone)

      const canvas = await html2canvas.default(clone, {
        scale: 1,
        useCORS: true,
        windowWidth: clone.scrollWidth,
        windowHeight: clone.scrollHeight
      })

      document.body.removeChild(clone)
      return canvas
    }

    // Utility function to add image to PDF centered
    const addImageToPdf = (canvas, pdfInstance) => {
      const imgData = canvas.toDataURL('image/jpeg', 0.9)
      const pdfWidth = pdfInstance.internal.pageSize.getWidth()
      const pdfHeight = pdfInstance.internal.pageSize.getHeight()
      const canvasRatio = canvas.width / canvas.height

      let imgWidth = pdfWidth - 20 // 10mm margin on each side
      let imgHeight = imgWidth / canvasRatio

      if (imgHeight > pdfHeight - 20) { // 10mm margin top/bottom
        imgHeight = pdfHeight - 20
        imgWidth = imgHeight * canvasRatio
      }

      const x = (pdfWidth - imgWidth) / 2
      const y = 10

      pdfInstance.addImage(imgData, 'JPEG', x, y, imgWidth, imgHeight)
    }

    // 1. Capture and add legend to first page
    if (legendBox) {
      const legendCanvas = await captureElement(legendBox)
      addImageToPdf(legendCanvas, pdf)
    }

    // 2. Loop through categories, adding each to a new page
    for (const box of categoryBoxes) {
      pdf.addPage()
      const categoryCanvas = await captureElement(box)
      addImageToPdf(categoryCanvas, pdf)
    }

    document.body.style.backgroundColor = originalBg
    pdf.save('mes-competences-par-categorie.pdf')

  } catch (error) {
    console.error('Erreur lors de l\'export PDF:', error)
    alert('Une erreur est survenue lors de l\'export PDF. Veuillez réessayer.')
  } finally {
    isExporting.value = false
  }
}
</script>

<style scoped>
.skills-evaluator-tool {
  font-family: 'Inter', sans-serif;
  background-color: #F8F7F4;
  color: #3D3B30;
  min-height: 100vh;
}

/* Keyframe animations */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(165, 148, 105, 0.4);
  }
  50% {
    box-shadow: 0 0 0 8px rgba(165, 148, 105, 0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.skill-category-box {
  background-color: #FFFFFF;
  border: 1px solid #EFEBE4;
  animation: slide-in-left 0.6s ease-out forwards;
  opacity: 0;
}

.skill-category-box:nth-child(1) { animation-delay: 0.1s; }
.skill-category-box:nth-child(2) { animation-delay: 0.2s; }
.skill-category-box:nth-child(3) { animation-delay: 0.3s; }

/* Bootstrap-style animated stripes for skill bars */
@keyframes progress-bar-stripes {
  0% {
    background-position-x: 1rem;
  }
}

.skill-bar-level {
  transition: width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.skill-bar-stripes {
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
  animation: progress-bar-stripes 1s linear infinite;
}

/* Simple skill row styling */
.skill-row {
  position: relative;
}

/* Legend improvements with enhanced glass effect */
#skills-legend {
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.95);
  position: relative;
  overflow: hidden;
}

#skills-legend::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(165, 148, 105, 0.05) 0%, transparent 70%);
  animation: pulse-glow 3s infinite;
}

/* Category header enhancements */
.skill-category-box h2 {
  position: relative;
  overflow: hidden;
}

.skill-category-box h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #A59469, #8C7A4B);
  transition: width 0.3s ease;
}

.skill-category-box:hover h2::after {
  width: 100%;
}

/* Button hover states with enhanced effects */
button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  filter: grayscale(100%);
}

/* Floating animation for high-level skills */
.skill-level-text {
  transition: all 0.2s ease;
}

.skill-row:hover .skill-level-text {
  animation: pulse-glow 1s infinite;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .skill-name {
    font-size: 0.875rem;
  }

  .skill-level-text {
    font-size: 0.75rem;
  }

  .skill-category-box {
    padding: 1rem 1.25rem;
  }

  h1 {
    font-size: 2rem;
  }
}

/* Print styles for PDF export */
@media print {
  .skills-evaluator-tool {
    background-color: white !important;
  }

  .skill-category-box {
    box-shadow: none !important;
    border: 1px solid #EFEBE4 !important;
    page-break-inside: avoid;
    margin-bottom: 1rem;
  }
}
</style>