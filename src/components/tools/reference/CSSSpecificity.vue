<template>
  <div class="css-specificity-tool min-h-screen">
    <ToolHeader
      title="Analyse Interactive de la Spécificité CSS"
      description="Comprenez la cascade CSS et la spécificité avec un calculateur et des exemples pratiques."
      icon="🔍"
      category="reference"
      status="Migré vers Vue"
      :show-badges="true"
    />

    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

      <!-- Section 1: Le Problème -->
      <section id="probleme" class="mb-16 scroll-mt-20">
        <h2 class="text-3xl font-bold mb-2">1. Le Problème : Mon bouton ne change pas de couleur</h2>
        <p class="text-slate-600 mb-6 max-w-3xl">Vous utilisez du code WLangage pour injecter une variable CSS (`--couleur-primaire`) afin de personnaliser un bouton `BTN_Defaut`. Vous vérifiez avec F12 : la variable est bien présente, mais le bouton conserve sa couleur grise par défaut. Mettons cela en scène.</p>
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <div class="flex flex-col md:flex-row items-center gap-6">
            <div>
              <label for="colorPickerProblem" class="block text-sm font-medium text-slate-700 mb-2">Choisissez une couleur pour la variable `--couleur-primaire` :</label>
              <input type="color" id="colorPickerProblem" v-model="colorPickerProblemValue" class="p-1 h-10 w-14 block bg-white border border-gray-300 rounded-md cursor-pointer">
            </div>
            <div class="text-center md:text-left">
              <p class="mb-2 font-medium">Résultat attendu :</p>
              <button class="px-4 py-2 rounded-md font-semibold text-white" :style="{ backgroundColor: colorPickerProblemValue }">Bouton stylé</button>
            </div>
            <div class="text-center md:text-left">
              <p class="mb-2 font-medium text-red-600">Résultat réel (le problème) :</p>
              <button class="btn-defaut-style">BTN_Defaut</button>
            </div>
          </div>
          <div class="mt-6 p-4 bg-slate-50 rounded-md text-sm">
            <p><strong class="text-[var(--couleur-accent)]">Constat :</strong> Malgré la mise à jour de la variable `--couleur-primaire` (vous pouvez le voir sur le bouton "attendu"), le `BTN_Defaut` reste gris. Ce n'est pas un bug. C'est le fonctionnement normal de la **cascade CSS**. Explorons pourquoi.</p>
          </div>
        </div>
      </section>

      <!-- Section 2: La Théorie -->
      <section id="theorie" class="mb-16 scroll-mt-20">
        <h2 class="text-3xl font-bold mb-2">2. La Théorie : La Cascade et la Spécificité</h2>
        <p class="text-slate-600 mb-6 max-w-3xl">Le navigateur décide quel style appliquer en suivant un ordre strict : 1. Origine et Importance, 2. **Spécificité**, 3. Ordre d'apparition. Votre problème se situe au niveau de la spécificité. Une règle plus "spécifique" l'emporte toujours, peu importe son ordre.</p>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-bold mb-4">La Hiérarchie de la Cascade</h3>
            <ol class="list-decimal list-inside space-y-3 text-slate-700">
              <li><strong class="text-slate-800">Origine & Importance :</strong> D'où vient le style (navigateur, utilisateur, développeur). Dans notre cas, tous les styles sont du développeur, donc on passe à l'étape suivante.</li>
              <li class="bg-amber-100 p-2 rounded-md"><strong class="text-amber-800">Spécificité (Le point crucial) :</strong> Un score est calculé pour chaque sélecteur. Le sélecteur avec le score le plus élevé gagne.</li>
              <li><strong class="text-slate-800">Ordre d'Apparition :</strong> Uniquement si les spécificités sont **identiques**, la dernière règle déclarée dans le code est appliquée.</li>
            </ol>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-bold mb-4">Calculateur de Spécificité Interactif</h3>
            <p class="text-sm text-slate-600 mb-4">Entrez un sélecteur CSS pour voir son score (ID, Classe, Type).</p>
            <input type="text" id="selectorInput" v-model="selectorInput" placeholder=".BTN_Defaut" class="w-full p-2 border border-gray-300 rounded-md mb-4">
            <div id="specificityResult" class="text-center font-mono text-lg p-4 bg-slate-100 rounded-md">
              {{ calculatedSpecificity }}
            </div>
            <div class="mt-4 text-xs text-slate-500">
              <p><strong class="font-semibold">Exemples à tester :</strong></p>
              <ul class="list-disc list-inside">
                <li>`button` (faible spécificité)</li>
                <li>`.BTN_Defaut` (spécificité de classe)</li>
                <li>`#monBouton` (haute spécificité)</li>
                <li>`:root` (spécificité de classe)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: Le Diagnostic -->
      <section id="diagnostic" class="mb-16 scroll-mt-20">
        <h2 class="text-3xl font-bold mb-2">3. Le Diagnostic : Simuler l'inspection (F12)</h2>
        <p class="text-slate-600 mb-6 max-w-3xl">Utilisons les outils de développement pour voir quelles règles s'appliquent à notre `BTN_Defaut`. Ci-dessous, une simulation de l'onglet "Styles" pour notre bouton.</p>
        <div class="bg-gray-800 rounded-lg shadow-lg font-mono text-sm p-6 text-white overflow-x-auto">
          <div class="mb-4"><span class="text-gray-400">Styles pour </span><span class="text-pink-400">&lt;button</span> <span class="text-cyan-400">class</span>=<span class="text-yellow-300">"BTN_Defaut"</span><span class="text-pink-400">&gt;</span></div>
          <div class="border-t border-gray-700 pt-4">
            <div class="p-3 rounded-md mb-3 highlight-winning-rule">
              <p><span class="text-purple-400">.BTN_Defaut</span> {</p>
              <p class="ml-4"><span class="text-cyan-400">background-color</span>: <span class="text-green-300">#E0E0E0</span>; <span class="text-gray-500">/* Spécificité (0,1,0) - Règle de l'Ambiance */</span></p>
              <p class="ml-4"><span class="text-cyan-400">border</span>: <span class="text-green-300">1px solid #CCC</span>;</p>
              <p>}</p>
              <p class="text-xs text-gray-400 mt-1">Source: WDSTYLE_Project.css</p>
            </div>
            <div class="p-3 rounded-md bg-gray-900/50">
              <p><span class="text-purple-400">:root</span> {</p>
              <p class="ml-4"><span class="text-cyan-400">--couleur-primaire</span>: <span class="text-green-300">{{ colorPickerProblemValue }}</span>; <span class="text-gray-500">/* Spécificité (0,1,0) - Section Problème */</span></p>
              <p class="ml-4"><span class="text-cyan-400">--couleur-solution</span>: <span class="text-green-300">{{ colorPickerSolutionValue }}</span>; <span class="text-gray-500">/* Spécificité (0,1,0) - Section Solution */</span></p>
              <p>}</p>
              <p class="text-xs text-gray-400 mt-1">Source: &lt;style&gt; (injecté)</p>
            </div>
          </div>
          <div class="mt-6 p-4 bg-slate-700 rounded-md text-sm text-slate-200">
            <p><strong class="text-yellow-300">Analyse :</strong> La règle de `.BTN_Defaut` de l'Ambiance WebDev applique directement la couleur de fond. Votre code définit une variable sur `:root` (l'élément `&lt;html&gt;`), mais **définir une variable n'est pas l'appliquer**. La règle de l'Ambiance gagne car c'est la seule qui cible directement la propriété `background-color` du bouton.</p>
          </div>
        </div>
      </section>

      <!-- Section 4: La Solution -->
      <section id="solution" class="mb-16 scroll-mt-20">
        <h2 class="text-3xl font-bold mb-2">4. La Solution : Créer une règle concurrente</h2>
        <p class="text-slate-600 mb-6 max-w-3xl">La solution consiste à ajouter, dans votre CSS personnalisée, une règle qui cible le même sélecteur (`.BTN_Defaut`) et qui **utilise** votre variable. Cette nouvelle règle entrera en compétition avec celle de l'Ambiance.</p>
        <div class="grid lg:grid-cols-2 gap-8">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-bold mb-4">Le Code Correctif</h3>
            <p class="text-sm text-slate-600 mb-4">Vous devez ajouter ce bloc à votre feuille de style externe (ex: `custom.css`).</p>
            <div class="bg-gray-800 rounded-lg text-sm p-4 text-white">
<pre><code><span class="text-gray-500">/* Dans votre fichier CSS personnalisé */</span>
<span class="text-purple-400">.BTN_Defaut</span> {
  <span class="text-cyan-400">background-color</span>: <span class="text-yellow-300">var(</span><span class="text-green-300">--couleur-primaire</span><span class="text-yellow-300">)</span>;
  <span class="text-cyan-400">border-color</span>: <span class="text-yellow-300">var(</span><span class="text-green-300">--couleur-primaire</span><span class="text-yellow-300">)</span>;
  <span class="text-cyan-400">color</span>: <span class="text-green-300">white</span>; <span class="text-gray-500">/* Pour le contraste */</span>
}</code></pre>
            </div>
            <p class="mt-4 text-sm text-slate-600">Puisque cette règle a la même spécificité (0,1,0) que celle de l'Ambiance, assurez-vous que votre feuille de style est chargée **après** celle de WebDev pour qu'elle l'emporte (grâce à l'ordre d'apparition).</p>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <h3 class="text-xl font-bold mb-4">Démonstration de la Solution</h3>
             <div>
                <label for="colorPickerSolution" class="block text-sm font-medium text-slate-700 mb-2">Choisissez une couleur :</label>
                <input type="color" id="colorPickerSolution" v-model="colorPickerSolutionValue" class="p-1 h-10 w-14 block bg-white border border-gray-300 rounded-md cursor-pointer">
            </div>
            <div class="mt-4 text-center">
              <p class="mb-2 font-medium">Résultat avec la règle corrective :</p>
              <button id="fixedButton" class="btn-defaut-style btn-defaut-style-fixed" :style="{ backgroundColor: colorPickerSolutionValue, borderColor: colorPickerSolutionValue }">BTN_Defaut</button>
            </div>
            <div class="mt-6 p-4 bg-green-50 rounded-md text-sm">
              <p><strong class="text-green-700">Succès !</strong> En appliquant la variable via un sélecteur de spécificité égale (et chargé après), nous avons surchargé avec succès le style par défaut.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 5: Bonnes Pratiques -->
      <section id="pratiques" class="scroll-mt-20">
        <h2 class="text-3xl font-bold mb-2">5. Aller plus loin : Bonnes Pratiques</h2>
        <p class="text-slate-600 mb-6 max-w-3xl">Pour un système de thèmes robuste et maintenable, considérez ces stratégies avancées.</p>
        <div class="space-y-4">
          <div class="bg-white rounded-lg shadow-md" v-for="(item, index) in accordionItems" :key="index">
            <button class="accordion-header w-full flex justify-between items-center text-left p-4 font-semibold text-lg" @click="toggleAccordion(index)">
              <span>{{ item.title }}</span>
              <span class="accordion-icon transform transition-transform duration-300" :class="{ 'rotate-180': item.isOpen }">▼</span>
            </button>
            <div class="accordion-content overflow-hidden transition-all duration-500 ease-in-out" :style="{ maxHeight: item.isOpen ? item.contentHeight + 'px' : '0px' }">
              <div class="p-4 border-t" ref="accordionContentRef">
                <p class="text-slate-600" v-html="item.content"></p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>

    <footer class="bg-white mt-16 border-t">
        <div class="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-slate-500">
            <p>&copy; 2025 - Application de diagnostic CSS interactive. Conçue pour clarifier les concepts de la cascade CSS.</p>
        </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import ToolHeader from '@/components/ui/ToolHeader.vue'

const colorPickerProblemValue = ref('#E57373')
const colorPickerSolutionValue = ref('#E57373')
const selectorInput = ref('.BTN_Defaut')

// Reactive CSS variables for the root element
const root = document.documentElement

// Watchers to update CSS variables
// This is a direct manipulation of the DOM, which is generally discouraged in Vue
// for reactive data. However, since the original implementation directly manipulated
// document.documentElement.style, we are replicating that behavior for direct migration.
// In a pure Vue approach, these would ideally be managed via CSS variables within Vue's
// own reactivity system or by passing them as props/styles to components.
// For now, we replicate the original behavior.
const updateCssVariables = () => {
  root.style.setProperty('--couleur-primaire', colorPickerProblemValue.value)
  root.style.setProperty('--couleur-solution', colorPickerSolutionValue.value)
}

onMounted(() => {
  updateCssVariables()
})

// Update CSS variables whenever color pickers change
// Using watchEffect for simplicity, could also use individual watchers
import { watchEffect } from 'vue'
watchEffect(() => {
  updateCssVariables()
})

const calculateSpecificity = (selector) => {
  try {
    let idCount = (selector.match(/#/g) || []).length
    let classCount = (selector.match(/\./g) || []).length + (selector.match(/\[/g) || []).length

    // Count pseudo-classes and pseudo-elements (simplified)
    const pseudoMatches = selector.match(/:[\w-]+/g) || []
    classCount += pseudoMatches.length

    // Count type selectors
    let typeCount = 0
    const cleanedSelector = selector.replace(/#[\w-]+/g, '').replace(/\.[\w-]+/g, '').replace(/\[.*?\]/g, '').replace(/:[\w-]+/g, '')
    const typeMatches = cleanedSelector.match(/[a-zA-Z]+/g) || []
    typeCount = typeMatches.length

    return `(${idCount}, ${classCount}, ${typeCount})`
  } catch (e) {
    console.error('Error calculating specificity:', e)
    return '(0, 0, 0)'
  }
}

const calculatedSpecificity = computed(() => {
  return selectorInput.value ? calculateSpecificity(selectorInput.value) : calculateSpecificity('.BTN_Defaut')
})

// Accordion logic
const accordionItems = ref([
  {
    title: 'Architecture Recommandée : Page AWP pour le CSS',
    content: `Au lieu d\'injecter une balise &lt;style&gt; en WLangage, créez une page AWP dédiée (\`PAGE_ThemeCSS\`) qui ne génère que du CSS. Cette page récupère l\'ID client, interroge la base de données et renvoie les variables CSS avec le MimeType \`text/css\`. Vous la liez dans votre projet avec \`&lt;link rel="stylesheet" href="/theme.css.awp?id=1"&gt;\`.<br><br><strong>Avantages :</strong> meilleure séparation des préoccupations (logique vs présentation), mise en cache optimisée et maintenance facilitée.`,
    isOpen: false,
    contentHeight: 0
  },
  {
    title: 'Évitez `!important` à tout prix',
    content: `Il est tentant d\'utiliser \`!important\` pour forcer un style. C\'est une mauvaise pratique qui brise la cascade et rend le débogage très difficile. C\'est le symptôme d\'une CSS mal structurée. La solution propre est toujours de maîtriser la spécificité et l\'ordre de chargement.`,
    isOpen: false,
    contentHeight: 0
  }
])

const accordionContentRef = ref(null) // Ref to get the actual height of the content

const toggleAccordion = async (index) => {
  accordionItems.value[index].isOpen = !accordionItems.value[index].isOpen
  await nextTick()
  if (accordionItems.value[index].isOpen) {
    // Use a temporary div to measure content height if direct ref is not reliable
    const contentElement = accordionContentRef.value[index] // Assuming accordionContentRef is an array of refs
    if (contentElement) {
      accordionItems.value[index].contentHeight = contentElement.scrollHeight
    } else {
      // Fallback if ref is not available, might need to estimate or set a max-height
      accordionItems.value[index].contentHeight = 500 // Example fallback
    }
  } else {
    accordionItems.value[index].contentHeight = 0
  }
}

// Smooth scrolling for nav links
const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  // Attach scroll event listeners to navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      scrollToSection(this.getAttribute('href').substring(1))
    })
  })
})

onUnmounted(() => {
  // Clean up event listeners if necessary
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.removeEventListener('click', function (e) {
      e.preventDefault()
      scrollToSection(this.getAttribute('href').substring(1))
    })
  })
})
</script>

<style scoped>
:root {
  --couleur-primaire: #E57373; /* Rouge doux par défaut */
  --couleur-solution: #E57373; /* Couleur pour le bouton de la section solution */
  --couleur-fond: #F5F5DC; /* Beige */
  --couleur-texte: #334155; /* Slate Gray */
  --couleur-accent: #E57373; /* Soft Terracotta */
  --couleur-bordures-defaut: #CCCCCC;
}

.css-specificity-tool {
  font-family: 'Inter', sans-serif;
  background-color: var(--couleur-fond);
  color: var(--couleur-texte);
}

.btn-defaut-style {
  background-color: #E0E0E0; /* Style par défaut de "l'Ambiance" WebDev */
  border: 1px solid var(--couleur-bordures-defaut);
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}

.btn-defaut-style-fixed {
  background-color: var(--couleur-solution);
  border: 1px solid var(--couleur-solution);
  color: white;
}

.highlight-winning-rule {
  animation: pulse-bg 2s infinite;
}

@keyframes pulse-bg {
  0%, 100% { background-color: rgba(229, 115, 115, 0.2); }
  50% { background-color: rgba(229, 115, 115, 0.4); }
}

.smooth-scroll {
  scroll-behavior: smooth;
}

/* Header Navigation */
.header-nav a {
  transition: color 0.3s ease;
}

.header-nav a:hover {
  color: var(--couleur-accent);
}

/* Accordion styles */
.accordion-header {
  background-color: #f8f8f8;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 4px;
}

.accordion-header:hover {
  background-color: #f0f0f0;
}

.accordion-content {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-top: none;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.accordion-icon {
  transition: transform 0.3s ease;
}

.accordion-icon.rotate-180 {
  transform: rotate(180deg);
}

/* Specificity Calculator */
#selectorInput {
  font-family: 'Inter', sans-serif;
}

#specificityResult {
  font-family: 'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

/* General text styles */
strong {
  font-weight: 700;
}

/* Custom styles for code blocks in definitions */
.text-slate-600 :deep(code) {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 2px 4px;
  border-radius: 4px;
  font-family: 'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875em;
}

.text-slate-600 :deep(strong) {
  color: var(--couleur-accent);
}
</style>