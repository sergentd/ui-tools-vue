<template>
  <header class="app-header glass-dark border-b border-electric-blue/20">
    <UIContainer size="default" class="header-container">
      <!-- Logo/Brand (Left) -->
      <div class="header-logo">
        <router-link to="/" class="flex items-center space-x-3">
          <div class="relative">
            <svg class="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Background circle -->
              <circle cx="20" cy="20" r="20" fill="#1e293b"/>

              <!-- Concentric circles target -->
              <circle cx="20" cy="20" r="15" fill="none" stroke="#ff5370" stroke-width="2"/>
              <circle cx="20" cy="20" r="10" fill="none" stroke="#0EA5E9" stroke-width="2"/>

              <!-- UI Text -->
              <text x="20" y="26" text-anchor="middle" class="fill-white font-bold" style="font-size: 14px; font-family: system-ui, -apple-system, sans-serif;">UI</text>
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-primary">UI Tools</h1>
            <p class="text-xs text-tertiary">Atelier de développement</p>
          </div>
        </router-link>
      </div>

      <!-- Search (Center) -->
      <div class="header-search">
        <button
          @click="$emit('open-search')"
          class="search-trigger"
          title="Rechercher (Ctrl+K / Cmd+K)"
        >
          <IconSystem name="search" size="sm" variant="electric" class="search-icon" />
          <span class="search-text">Rechercher...</span>
        </button>
      </div>

      <!-- Navigation Menu (Right) -->
      <div class="header-nav">
        <nav class="nav-items">
          <router-link
            to="/"
            class="nav-link"
            :class="{ 'active': $route.path === '/' }"
          >
            Catalogue
          </router-link>
          <router-link
            to="/tools/organization/ticketing-system"
            class="nav-link"
            :class="{ 'active': $route.path === '/tools/organization/ticketing-system' }"
          >
            Tickets
          </router-link>
          <router-link
            to="/components"
            class="nav-link"
            :class="{ 'active': $route.path === '/components' || $route.path === '/tools/reference/component-library' }"
          >
            Composants
          </router-link>
        </nav>
      </div>

      <!-- Mobile Menu Button -->
      <UIButton
        variant="ghost"
        size="sm"
        :icon="mobileMenuOpen ? 'x' : 'menu'"
        @click="toggleMobileMenu"
        class="mobile-menu-btn"
        aria-label="Toggle mobile menu"
      />
    </UIContainer>

    <!-- Mobile Menu -->
    <UIContainer v-if="mobileMenuOpen" size="default" class="md:hidden py-4 border-t border-electric-blue/20">
      <nav class="flex-col-start space-y-3">
        <router-link
          to="/"
          class="nav-link-mobile"
          @click="closeMobileMenu"
        >
          Catalogue
        </router-link>
        <router-link
          to="/tools/organization/ticketing-system"
          class="nav-link-mobile"
          @click="closeMobileMenu"
        >
          Tickets
        </router-link>
        <router-link
          to="/components"
          class="nav-link-mobile"
          @click="closeMobileMenu"
        >
          Composants
        </router-link>
      </nav>
    </UIContainer>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { UIContainer, UIButton } from '@/components/ui'
import IconSystem from '@/components/ui/IconSystem.vue'

// Mobile menu state
const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.app-header {
  background: var(--glass-dark);
  backdrop-filter: blur(var(--blur-md));
  border-bottom: 1px solid var(--border-primary);
}

.header-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: var(--space-4);
  height: 4rem;
}

.header-logo {
  justify-self: start;
}

.header-search {
  justify-self: center;
  width: 100%;
  max-width: 32rem;
  min-width: 20rem;
}

.header-nav {
  justify-self: end;
}

/* Search Trigger */
.search-trigger {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-2) var(--space-4);
  background: var(--glass-light);
  border: 1px solid var(--border-primary);
  border-radius: var(--radius-lg);
  color: var(--text-tertiary);
  transition: all var(--duration-normal) var(--easing-ease);
  cursor: pointer;
}

.search-trigger:hover {
  background: var(--glass-lighter);
  border-color: var(--electric-blue-alpha);
  color: var(--text-secondary);
}

.search-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.search-text {
  flex: 1;
  text-align: left;
  font-size: var(--text-sm);
}

.shortcut-key {
  padding: var(--space-xs) var(--space-sm);
  font-size: var(--text-xs);
  border-radius: var(--radius-xs);
  background: var(--glass-dark);
  border: 1px solid var(--border-secondary);
  font-family: var(--font-mono);
  color: var(--text-tertiary);
  flex-shrink: 0;
}

/* Navigation */
.nav-items {
  display: flex;
  align-items: center;
  gap: var(--space-6);
}

.nav-link {
  color: var(--text-secondary);
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
  position: relative;
  transition: color var(--duration-normal) var(--easing-ease);
  white-space: nowrap;
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link.active {
  color: var(--electric-blue);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -1.25rem;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--electric-blue);
  border-radius: var(--radius-xs);
}

/* Mobile Styles */
.nav-link-mobile {
  color: var(--text-secondary);
  font-weight: var(--font-medium);
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-md);
  transition: all var(--duration-normal) var(--easing-ease);
}

.nav-link-mobile:hover {
  color: var(--electric-blue);
  background: var(--glass-light);
}

.mobile-menu-btn {
  display: block;
  position: absolute;
  right: var(--space-4);
}

/* Responsive */
@media (min-width: 768px) {
  .mobile-menu-btn {
    display: none;
  }

  .header-nav {
    display: block;
  }

  .header-search {
    display: block;
  }
}

@media (max-width: 767px) {
  .header-container {
    grid-template-columns: 1fr;
    justify-items: start;
  }

  .header-nav {
    display: none;
  }

  .header-search {
    display: none;
  }
}
</style>