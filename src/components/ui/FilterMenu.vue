<template>
  <div class="filter-menu">
    <!-- All button -->
    <button
      :class="['filter-btn', activeFilter === 'all' ? 'active' : '']"
      @click="handleFilterChange('all')"
    >
      <IconSystem name="all" size="sm" variant="mono" />
      <span>Tous</span>
    </button>

    <!-- Favorites Button (always visible) -->
    <button
      :class="['filter-btn', activeFilter === 'favorites' ? 'active' : '']"
      @click="handleFilterChange('favorites')"
    >
      <IconSystem name="favorites" size="sm" variant="mono" />
      <span>Favoris ({{ favoritesCount }})</span>
    </button>

    <!-- Category buttons -->
    <button
      v-for="[key, category] in availableCategories"
      :key="key"
      :class="['filter-btn', activeFilter === key ? 'active' : '']"
      @click="handleFilterChange(key)"
    >
      <IconSystem :name="category.icon" size="sm" variant="mono" />
      <span>{{ category.name }}</span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import IconSystem from '@/components/ui/IconSystem.vue'

const props = defineProps({
  categories: {
    type: Object,
    required: true
  },
  activeFilter: {
    type: String,
    default: 'all'
  },
  availableCategories: {
    type: Array,
    required: true
  },
  favoritesCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['filter-change'])

const handleFilterChange = (filter) => {
  emit('filter-change', filter)
}
</script>

<style scoped>
.filter-menu {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
  margin-bottom: var(--space-8);
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: max-content;
  white-space: nowrap;
}
</style>