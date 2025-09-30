<template>
  <div class="webdev-glossary min-h-screen">
    <!-- Main content with container -->
    <div class="container mx-auto px-6 max-w-6xl py-8">
      <!-- Header inside container -->
      <ToolHeader
        title="Glossaire WEBDEV"
        description="Référence complète du vocabulaire des styles et feuilles de style PC SOFT"
        icon="glossaire-webdev"
        category="reference"
        status="Migré vers Vue"
        :show-badges="true"
      />

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <!-- Table of Contents -->
        <div class="lg:col-span-1">
          <GlassCard variant="glass" class="sticky top-8">
            <template #header>
              <h3 class="text-lg font-bold text-white">Sommaire</h3>
            </template>

            <div class="space-y-2">
              <button
                v-for="section in sections"
                :key="section.id"
                @click="scrollToSection(section.id)"
                class="toc-link"
              >
                <span class="icon">{{ section.icon }}</span>
                {{ section.title }}
              </button>
            </div>

            <!-- Search Box -->
            <div class="mt-6 pt-4 border-t border-white/20">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher un terme..."
                class="search-input"
              >
            </div>

            <div v-if="searchQuery && filteredTerms.length > 0" class="mt-4">
              <h4 class="text-sm font-semibold text-white mb-2">Résultats ({{ filteredTerms.length }})</h4>
              <div class="space-y-1">
                <button
                  v-for="term in filteredTerms.slice(0, 5)"
                  :key="term.id"
                  @click="scrollToTerm(term.id)"
                  class="search-result"
                >
                  {{ term.title }}
                </button>
                <p v-if="filteredTerms.length > 5" class="text-xs text-gray-300">
                  +{{ filteredTerms.length - 5 }} autres résultats
                </p>
              </div>
            </div>
          </GlassCard>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <!-- Section: Les Fondamentaux -->
          <section id="fondamentaux" class="section-content">
            <GlassCard variant="glass" class="mb-8">
              <template #header>
                <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                  🏗️ Les Fondamentaux
                </h2>
              </template>

              <div class="space-y-6">
                <div
                  v-for="term in fundamentalsTerms"
                  :key="term.id"
                  :id="term.id"
                  class="glossary-entry"
                >
                  <dt class="term-title">{{ term.title }}</dt>
                  <dd class="term-definition" v-html="term.definition"></dd>
                </div>
              </div>
            </GlassCard>
          </section>

          <!-- Section: Les Différents Types de Styles -->
          <section id="types-styles" class="section-content">
            <GlassCard variant="glass" class="mb-8">
              <template #header>
                <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                  🎨 Les Différents Types de Styles
                </h2>
              </template>

              <div class="space-y-6">
                <div
                  v-for="term in styleTypesTerms"
                  :key="term.id"
                  :id="term.id"
                  class="glossary-entry"
                >
                  <dt class="term-title">{{ term.title }}</dt>
                  <dd class="term-definition" v-html="term.definition"></dd>
                </div>
              </div>
            </GlassCard>
          </section>

          <!-- Section: Mécanismes et Priorité -->
          <section id="mecanismes" class="section-content">
            <GlassCard variant="glass" class="mb-8">
              <template #header>
                <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                  ⚙️ Mécanismes et Priorité
                </h2>
              </template>

              <div class="space-y-6">
                <div
                  v-for="term in mechanismsTerms"
                  :key="term.id"
                  :id="term.id"
                  class="glossary-entry"
                >
                  <dt class="term-title">{{ term.title }}</dt>
                  <dd class="term-definition" v-html="term.definition"></dd>
                </div>
              </div>
            </GlassCard>
          </section>

          <!-- Section: Outils et Concepts Avancés -->
          <section id="outils-avances" class="section-content">
            <GlassCard variant="glass" class="mb-8">
              <template #header>
                <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                  🛠️ Outils et Concepts Avancés
                </h2>
              </template>

              <div class="space-y-6">
                <div
                  v-for="term in advancedTerms"
                  :key="term.id"
                  :id="term.id"
                  class="glossary-entry"
                >
                  <dt class="term-title">{{ term.title }}</dt>
                  <dd class="term-definition" v-html="term.definition"></dd>
                </div>
              </div>
            </GlassCard>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ToolHeader from '@/components/ui/ToolHeader.vue'
import GlassCard from '@/components/ui/GlassCard.vue'

const searchQuery = ref('')

const sections = [
  { id: 'fondamentaux', title: 'Les Fondamentaux', icon: '🏗️' },
  { id: 'types-styles', title: 'Types de Styles', icon: '🎨' },
  { id: 'mecanismes', title: 'Mécanismes', icon: '⚙️' },
  { id: 'outils-avances', title: 'Outils Avancés', icon: '🛠️' }
]

const fundamentalsTerms = [
  {
    id: 'wdy-sheet',
    title: 'Feuille de style de projet WEBDEV (.WDY)',
    definition: 'Fichier propriétaire contenant l\'ensemble des styles spécifiques à <strong>un seul projet WEBDEV</strong>. Elle est gérée via l\'éditeur de styles visuel et est compilée en CSS standard.'
  },
  {
    id: 'sty-sheet',
    title: 'Feuille de style de projet WINDEV (.STY)',
    definition: 'Équivalent du <code>.WDY</code> pour les projets d\'applications lourdes (Windows, Linux). Elle définit l\'apparence des fenêtres et des champs natifs.'
  },
  {
    id: 'wws-sheet',
    title: 'Feuille de style partagée (.WWS)',
    definition: 'Acronyme de <strong>W</strong>indev <strong>W</strong>ebdev <strong>S</strong>tyle sheet. Feuille de style conçue pour être <strong>partagée</strong> entre plusieurs projets (WINDEV, WEBDEV, WINDEV Mobile) afin de garantir une charte graphique cohérente.'
  },
  {
    id: 'webdev-style',
    title: 'Style WEBDEV',
    definition: 'Ensemble de propriétés graphiques nommé et réutilisable. C\'est l\'équivalent direct d\'une <strong>classe CSS</strong>.'
  },
  {
    id: 'ambiance',
    title: 'Ambiance',
    definition: 'Collection de styles formant un thème graphique complet. Elle définit notamment les <strong>styles par défaut</strong> pour chaque type de champ du projet.'
  }
]

const styleTypesTerms = [
  {
    id: 'style-champ',
    title: 'Style de Champ',
    definition: 'Le type de style le plus courant, appliqué aux champs (boutons, saisies, libellés...). Il définit leur apparence visuelle de base.'
  },
  {
    id: 'style-page',
    title: 'Style de Page',
    definition: 'Appliqué à une page entière, il permet de définir des propriétés globales comme la couleur ou l\'image de fond et les marges par défaut.'
  },
  {
    id: 'style-cellule',
    title: 'Style de Cellule',
    definition: 'Spécifique aux champs Tableau et aux cellules de mise en page. Il contrôle l\'apparence d\'une cellule : fond, bordures, alignement.'
  },
  {
    id: 'style-repetiteur',
    title: 'Style de Répétiteur',
    definition: 'Définit l\'apparence des différentes zones d\'un champ Répétiteur (fond de la zone répétée, fond de la zone sélectionnée ou survolée).'
  }
]

const mechanismsTerms = [
  {
    id: 'heritage-styles',
    title: 'Héritage des styles',
    definition: 'Un style peut être basé sur un autre. Le style "enfant" hérite de toutes les propriétés du style "parent". Toute modification du parent est répercutée sur ses enfants.'
  },
  {
    id: 'surcharge-style',
    title: 'Surcharge de style',
    definition: 'Modification locale des propriétés d\'un élément sans altérer le style de base. Dans l\'éditeur, une propriété surchargée apparaît en <strong>gras</strong>. C\'est le niveau le plus prioritaire.'
  },
  {
    id: 'priorite-styles',
    title: 'Règle de priorité des styles',
    definition: 'L\'apparence finale d\'un champ est déterminée par une cascade. La règle (du plus fort au plus faible) est : <br><strong>1. Surcharge de style</strong> > <strong>2. Style du champ</strong> > <strong>3. Style par défaut de l\'ambiance</strong>.'
  }
]

const advancedTerms = [
  {
    id: 'catalogue-styles',
    title: 'Catalogue de styles',
    definition: 'Bibliothèque de styles prêts à l\'emploi fournis par PC SOFT. Ils peuvent être importés dans la feuille de style du projet pour être utilisés ou personnalisés.'
  },
  {
    id: 'gabarit-page',
    title: 'Gabarit de page',
    definition: 'Modèle de page réutilisable contenant une mise en page et des styles prédéfinis. Il permet de créer rapidement des pages cohérentes avec un design uniforme.'
  },
  {
    id: 'plan',
    title: 'Plan',
    definition: 'Mécanisme permettant de superposer plusieurs couches d\'interface dans une même page. Chaque plan peut avoir ses propres styles et être affiché ou masqué dynamiquement.'
  },
  {
    id: 'ancrage',
    title: 'Ancrage',
    definition: 'Propriété définissant le comportement d\'un champ (position et taille) lors du redimensionnement du navigateur. C\'est le mécanisme de base du design responsive dans WEBDEV.'
  },
  {
    id: 'classe-css',
    title: 'Classe CSS',
    definition: 'WEBDEV permet d\'associer des classes CSS standards à n\'importe quel champ. C\'est essentiel pour intégrer des frameworks externes ou utiliser des animations CSS complexes.'
  }
]

// Computed property for all terms combined
const allTerms = computed(() => [
  ...fundamentalsTerms,
  ...styleTypesTerms,
  ...mechanismsTerms,
  ...advancedTerms
])

// Filtered terms based on search query
const filteredTerms = computed(() => {
  if (!searchQuery.value) return []

  const query = searchQuery.value.toLowerCase()
  return allTerms.value.filter(term =>
    term.title.toLowerCase().includes(query) ||
    term.definition.toLowerCase().includes(query)
  )
})

// Navigation methods
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const scrollToTerm = (termId) => {
  const element = document.getElementById(termId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' })

    // Highlight the term briefly
    element.classList.add('highlight')
    setTimeout(() => {
      element.classList.remove('highlight')
    }, 2000)
  }
  searchQuery.value = '' // Clear search after navigation
}
</script>

<style scoped>
.webdev-glossary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.toc-link {
  width: 100%;
  text-left: left;
  padding: 10px 12px;
  color: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  border: none;
  background: none;
  cursor: pointer;
}

.toc-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateX(4px);
}

.icon {
  font-size: 16px;
}

.search-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.15);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-result {
  display: block;
  width: 100%;
  text-left: left;
  padding: 6px 8px;
  background: rgba(255, 255, 255, 0.05);
  border: none;
  color: rgba(255, 255, 255, 0.9);
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.search-result:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.section-content {
  scroll-margin-top: 2rem;
}

.glossary-entry {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  transition: all 0.3s ease;
  scroll-margin-top: 6rem;
}

.glossary-entry:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.glossary-entry.highlight {
  background: rgba(255, 215, 0, 0.1);
  border-color: rgba(255, 215, 0, 0.3);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.2);
}

.term-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
  margin-bottom: 12px;
  display: block;
}

.term-definition {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  font-size: 15px;
}

/* Style for HTML content in definitions */
.term-definition :deep(strong) {
  color: #ffd700;
  font-weight: 600;
}

.term-definition :deep(code) {
  background: rgba(0, 0, 0, 0.3);
  color: #64ffda;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
}

.term-definition :deep(br) {
  margin-bottom: 8px;
}

/* Mobile responsiveness */
@media (max-width: 1024px) {
  .toc-link {
    padding: 8px 10px;
    font-size: 14px;
  }

  .term-title {
    font-size: 16px;
  }

  .term-definition {
    font-size: 14px;
  }
}
</style>