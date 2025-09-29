<template>
  <GlassCard class="ticket-card hover-lift relative overflow-hidden">

    <!-- Priority Corner Band -->
    <div :class="[
      'absolute top-0 left-0 w-12 h-12 transform -translate-x-6 -translate-y-6 rotate-45',
      priorityColors[ticket.priority]
    ]"></div>

    <!-- Header -->
    <div class="flex items-start justify-between mb-3">
      <div class="flex-1">
        <h3 class="text-lg font-semibold text-white mb-1 line-clamp-1">{{ ticket.title }}</h3>
        <p class="text-sm text-gray-300 mb-2">{{ ticket.customer }}</p>
      </div>

      <!-- Actions Dropdown -->
      <div class="relative" ref="dropdownRef">
        <button
          @click.stop="showMenu = !showMenu"
          class="p-1 rounded-lg hover:bg-glass-bg-light transition-colors"
        >
          <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01"/>
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <div v-if="showMenu" class="absolute right-0 top-8 w-48 z-10" @click.stop>
          <div class="bg-glass-bg-light backdrop-blur-sm border border-border-primary rounded-lg py-2 shadow-lg">
            <button
              @click="$emit('edit', ticket.id); showMenu = false"
              class="w-full text-left px-4 py-2 text-sm text-white hover:bg-glass-bg transition-colors flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              Modifier
            </button>
            <button
              @click="$emit('delete', ticket.id); showMenu = false"
              class="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-glass-bg transition-colors flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Description -->
    <p class="text-sm text-gray-300 mb-4 line-clamp-2">{{ ticket.description }}</p>

    <!-- Ticket Type Badge -->
    <div class="mb-3">
      <span :class="[
        'inline-flex items-center px-2 py-1 text-xs font-medium rounded-full',
        typeColors[ticket.type]
      ]">
        <svg v-if="ticket.type === 'callback'" class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
        <svg v-else class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h2m0-13h10a2 2 0 012 2v11a2 2 0 01-2 2H9m0-13v13"/>
        </svg>
        {{ typeLabels[ticket.type] }}
      </span>
    </div>

    <!-- Dates Info -->
    <div class="flex justify-between text-xs text-gray-400 mb-4">
      <span>Créé le {{ formatDate(ticket.createdAt) }}</span>
      <span v-if="ticket.dueDate" :class="{ 'text-red-400 font-medium bg-red-400/10 px-2 py-1 rounded': isOverdue }">
        {{ isOverdue ? 'En retard' : 'Échéance' }}: {{ formatDate(ticket.dueDate) }}
      </span>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-between pt-3 border-t border-border-primary">

      <!-- Status -->
      <div class="flex items-center gap-2">
        <div :class="['w-2 h-2 rounded-full', statusColors[ticket.status]]"></div>
        <span class="text-sm text-gray-300">{{ statusLabels[ticket.status] }}</span>
      </div>

      <!-- Quick Actions -->
      <div class="flex items-center justify-between gap-2">
        <!-- Status Actions -->
        <div class="flex items-center gap-1">
          <button
            v-if="ticket.status === 'todo'"
            @click="$emit('status-change', ticket.id, 'in-progress')"
            class="p-1 rounded text-gray-400 hover:text-electric-blue hover:bg-glass-bg-light transition-colors"
            title="Commencer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5H9m3.5-5.5v3m0 0h-3"/>
            </svg>
          </button>

          <button
            v-if="ticket.status === 'in-progress'"
            @click="$emit('status-change', ticket.id, 'waiting')"
            class="p-1 rounded text-gray-400 hover:text-yellow-400 hover:bg-glass-bg-light transition-colors"
            title="Mettre en attente"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </button>

          <button
            v-if="ticket.status === 'waiting'"
            @click="$emit('status-change', ticket.id, 'in-progress')"
            class="p-1 rounded text-gray-400 hover:text-electric-blue hover:bg-glass-bg-light transition-colors"
            title="Reprendre"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.5a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5H9m3.5-5.5v3m0 0h-3"/>
            </svg>
          </button>

          <button
            v-if="ticket.status !== 'completed'"
            @click="$emit('status-change', ticket.id, 'completed')"
            class="p-1 rounded text-gray-400 hover:text-green-400 hover:bg-glass-bg-light transition-colors"
            title="Marquer comme terminé"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </button>

          <button
            v-if="ticket.status === 'completed'"
            @click="$emit('status-change', ticket.id, 'todo')"
            class="p-1 rounded text-gray-400 hover:text-gray-300 hover:bg-glass-bg-light transition-colors"
            title="Rouvrir"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </button>
        </div>

        <!-- Priority Badge -->
        <span :class="[
          'inline-flex items-center px-2 py-1 text-xs font-medium rounded',
          priorityBadgeColors[ticket.priority]
        ]">
          {{ priorityLabels[ticket.priority] }}
        </span>
      </div>
    </div>

  </GlassCard>
</template>

<script setup>
import { ref, computed } from 'vue'
import GlassCard from '@/components/ui/GlassCard.vue'

// Props
const props = defineProps({
  ticket: {
    type: Object,
    required: true
  }
})

// Events
defineEmits(['edit', 'delete', 'status-change'])

// Local state
const showMenu = ref(false)

// Color mappings using existing color scheme
const priorityColors = {
  low: 'bg-gray-500',
  medium: 'bg-yellow-500',
  high: 'bg-orange-500',
  urgent: 'bg-red-500'
}

const priorityBadgeColors = {
  low: 'bg-gray-600/30 text-gray-300',
  medium: 'bg-yellow-600/30 text-yellow-300',
  high: 'bg-orange-600/30 text-orange-300',
  urgent: 'bg-red-600/30 text-red-300'
}

const priorityLabels = {
  low: 'Faible',
  medium: 'Moyen',
  high: 'Élevé',
  urgent: 'Urgent'
}

const statusColors = {
  todo: 'bg-gray-400',
  'in-progress': 'bg-electric-blue',
  waiting: 'bg-yellow-500',
  completed: 'bg-green-500'
}

const statusLabels = {
  todo: 'À faire',
  'in-progress': 'En cours',
  waiting: 'En attente',
  completed: 'Terminé'
}

const typeColors = {
  callback: 'bg-blue-600/30 text-blue-300',
  task: 'bg-gray-600/30 text-gray-300'
}

const typeLabels = {
  callback: 'Rappel client',
  task: 'Tâche'
}

// Computed
const isOverdue = computed(() => {
  if (!props.ticket.dueDate || props.ticket.status === 'completed') return false

  const today = new Date()
  today.setHours(0, 0, 0, 0) // Set to start of today

  const dueDate = new Date(props.ticket.dueDate)
  dueDate.setHours(0, 0, 0, 0) // Set to start of due date

  return dueDate < today
})

// Methods
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  })
}

// Add click outside listener
import { onMounted, onUnmounted } from 'vue'

const dropdownRef = ref(null)

// Close menu when clicking outside
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.ticket-card {
  position: relative;
  transition: all 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Animation for card entrance */
.ticket-card {
  animation: slideInUp 0.4s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>