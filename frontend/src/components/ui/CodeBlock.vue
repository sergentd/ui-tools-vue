<template>
  <div class="code-block-container">
    <div class="code-header">
      <span class="language-label">{{ language }}</span>
      <button
        @click="copyCode"
        class="copy-button"
        :class="{ copied: isCopied }"
        :title="isCopied ? 'Copié!' : 'Copier le code'"
      >
        <svg v-if="!isCopied" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"/>
        </svg>
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
        </svg>
      </button>
    </div>
    <pre class="code-content"><code :class="`language-${language}`" v-html="highlightedCode"></code></pre>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'javascript'
  }
})

const isCopied = ref(false)

// Escape HTML to prevent parsing errors
const escapeHtml = (text) => {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// Basic syntax highlighting for common languages
const highlightedCode = computed(() => {
  // First escape HTML characters
  let code = escapeHtml(props.code)

  if (props.language === 'javascript' || props.language === 'vue') {
    // Strings first
    code = code.replace(/(["'`])((?:\\.|(?!\1)[^\\\r\n])*?)\1/g, '<span class="string">$1$2$1</span>')

    // HTML tags
    code = code.replace(/(&lt;\/?)([a-zA-Z][a-zA-Z0-9-]*)/g, '$1<span class="tag">$2</span>')

    // Vue directives - only match at word boundaries
    code = code.replace(/\b(v-[a-zA-Z-]+)\b/g, '<span class="directive">$1</span>')
    code = code.replace(/\s(:)([a-zA-Z-]+)/g, ' <span class="directive">$1</span>$2')
    code = code.replace(/\s(@)([a-zA-Z-]+)/g, ' <span class="directive">$1</span>$2')

    // Comments
    code = code.replace(/(\/\/.*$|\/\*[\s\S]*?\*\/)/gm, '<span class="comment">$1</span>')

    // Numbers
    code = code.replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>')

    // Only highlight actual JavaScript keywords when they appear as standalone words
    code = code.replace(/\b(const|let|var|function|return|import|export|from|default|async|await)\b/g, '<span class="keyword">$1</span>')
  } else if (props.language === 'css') {
    // Properties
    code = code.replace(/([a-zA-Z-]+)(\s*:)/g, '<span class="property">$1</span>$2')
    // Values
    code = code.replace(/:\s*([^;{}]+)/g, ': <span class="value">$1</span>')
    // Selectors
    code = code.replace(/^([^{]+)(\s*{)/gm, '<span class="selector">$1</span>$2')
    // Comments
    code = code.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="comment">$1</span>')
  } else if (props.language === 'wlanguage') {
    // WEBDEV/WLanguage keywords
    code = code.replace(/\b(PROCEDURE|VAR|SI|ALORS|SINON|FIN|POUR|TANT|QUE|FAIRE|RENVOYER|string|entier|booléen)\b/g, '<span class="keyword">$1</span>')
    // Strings
    code = code.replace(/(["'])((?:\\.|(?!\1)[^\\\r\n])*?)\1/g, '<span class="string">$1$2$1</span>')
    // Comments
    code = code.replace(/(\/\/.*$)/gm, '<span class="comment">$1</span>')
  }

  return code
})

const copyCode = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy code:', error)
  }
}
</script>

<style scoped>
.code-block-container {
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  overflow: hidden;
  border: 1px solid var(--border-primary);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-2) var(--space-3);
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-primary);
}

.language-label {
  font-size: var(--text-xs);
  color: var(--text-muted);
  font-weight: var(--font-medium);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.copy-button {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-1) var(--space-2);
  background: var(--border-primary);
  border: none;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--duration-fast) var(--easing-ease);
  font-size: var(--text-xs);
}

.copy-button:hover {
  background: var(--border-secondary);
  color: var(--text-primary);
}

.copy-button.copied {
  background: var(--color-success-alpha);
  color: var(--color-success);
}

.code-content {
  padding: var(--space-4);
  margin: 0;
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  line-height: var(--leading-relaxed);
  color: var(--text-primary);
  overflow-x: hidden;
  white-space: pre-wrap;
}

/* Syntax highlighting styles */
:deep(.keyword) {
  color: #c792ea;
  font-weight: var(--font-medium);
}

:deep(.string) {
  color: #c3e88d;
}

:deep(.comment) {
  color: #546e7a;
  font-style: italic;
}

:deep(.number) {
  color: #f78c6c;
}

:deep(.property) {
  color: #82aaff;
}

:deep(.value) {
  color: #c3e88d;
}

:deep(.selector) {
  color: #ffcb6b;
}

:deep(.directive) {
  color: #f78c6c;
  font-weight: var(--font-medium);
}

:deep(.tag) {
  color: #ff5370;
}

/* Scrollbar styling */
.code-content::-webkit-scrollbar {
  height: var(--space-2);
}

.code-content::-webkit-scrollbar-track {
  background: var(--border-secondary);
}

.code-content::-webkit-scrollbar-thumb {
  background: var(--border-primary);
  border-radius: var(--radius-sm);
}

.code-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>