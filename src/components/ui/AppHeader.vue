<template>
  <header class="app-header glass-dark border-b border-electric-blue/20">
    <UIContainer size="default" class="flex-between h-16">
      <!-- Logo/Brand -->
      <div class="flex items-center space-x-3">
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
      </div>

      <!-- Navigation -->
      <nav class="hidden md:flex items-center space-x-6">
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
          :class="{ 'active': $route.path === '/components' }"
        >
          Composants
        </router-link>
      </nav>

      <!-- Mobile Menu Button -->
      <UIButton
        variant="ghost"
        size="sm"
        :icon="mobileMenuOpen ? 'x' : 'menu'"
        @click="toggleMobileMenu"
        class="md:hidden"
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
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--electric-blue-alpha);
}

.nav-link {
  @apply text-gray-300 hover:text-white hover:text-electric-blue transition-colors duration-200 font-medium text-sm;
  position: relative;
}

.nav-link.active {
  @apply text-electric-blue;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -0.5rem;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--electric-blue);
  border-radius: 1px;
}

.nav-link-mobile {
  @apply text-gray-300 hover:text-electric-blue transition-colors duration-200 font-medium py-2 px-4 rounded-lg;
}

.nav-link-mobile:hover {
  background: rgba(var(--electric-blue-rgb), 0.1);
}
</style>