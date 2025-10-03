<template>
  <div class="ticketing-system min-h-screen">
    <!-- Main content with container -->
    <div class="container mx-auto px-6 max-w-7xl pt-0 pb-8">

      <!-- Header -->
      <div class="tool-header-wrapper">
        <ToolHeader
          title="Système de Tickets"
          description="Gérez vos rappels clients et tâches personnelles de manière simple et efficace"
          icon="tag"
          category="organization"
          status="Nouveau"
          :show-badges="true"
        />
      </div>

      <!-- Quick Stats -->
      <div class="mb-6">
        <div class="flex flex-wrap justify-center gap-6">
          <div class="flex items-center gap-2 px-4 py-2 bg-glass-bg/50 rounded-lg border border-border-primary">
            <span class="text-electric-blue text-lg font-bold">{{ tickets.length }}</span>
            <span class="text-gray-400 text-sm">Total tickets</span>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 bg-glass-bg/50 rounded-lg border border-border-primary">
            <span class="text-yellow-500 text-lg font-bold">{{ todoTickets }}</span>
            <span class="text-gray-400 text-sm">À faire</span>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 bg-glass-bg/50 rounded-lg border border-border-primary">
            <span class="text-orange-500 text-lg font-bold">{{ inProgressTickets }}</span>
            <span class="text-gray-400 text-sm">En cours</span>
          </div>
          <div class="flex items-center gap-2 px-4 py-2 bg-glass-bg/50 rounded-lg border border-border-primary">
            <span class="text-red-500 text-lg font-bold">{{ urgentTickets }}</span>
            <span class="text-gray-400 text-sm">Urgents</span>
          </div>
        </div>
      </div>

      <!-- Global Search Bar -->
      <div class="mb-8">
        <div class="relative max-w-2xl mx-auto">
          <input
            id="main-search-input"
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher dans tous les tickets..."
            class="w-full px-4 py-3 pl-10 bg-glass-bg-light backdrop-blur-sm border border-border-primary
                   rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2
                   focus:ring-electric-blue focus:border-electric-blue transition-all duration-200"
          >
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="mb-8">
        <div class="border-b border-border-primary">
          <nav class="flex space-x-8" aria-label="Tabs">
            <button
              @click="activeTab = 'active'"
              :class="[
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === 'active'
                  ? 'border-electric-blue text-electric-blue'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              ]"
            >
              Tickets Actifs
              <span :class="[
                'ml-2 py-0.5 px-2 rounded-full text-xs',
                activeTab === 'active'
                  ? 'bg-electric-blue/20 text-electric-blue'
                  : 'bg-gray-600/20 text-gray-400 border border-gray-500/30'
              ]"
              :style="activeTab === 'active' ? { border: '1px solid var(--electric-blue)' } : {}">
                {{ activeTicketsCount }}
              </span>
            </button>
            <button
              @click="activeTab = 'create'"
              :class="[
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === 'create'
                  ? 'border-electric-blue text-electric-blue'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              ]"
            >
              Créer
              <svg class="w-4 h-4 ml-1 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
            </button>
            <button
              @click="activeTab = 'completed'"
              :class="[
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === 'completed'
                  ? 'border-electric-blue text-electric-blue'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              ]"
            >
              Terminés
              <span :class="[
                'ml-2 py-0.5 px-2 rounded-full text-xs',
                activeTab === 'completed'
                  ? 'bg-electric-blue/20 text-electric-blue'
                  : 'bg-gray-600/20 text-gray-400 border border-gray-500/30'
              ]"
              :style="activeTab === 'completed' ? { border: '1px solid var(--electric-blue)' } : {}">
                {{ completedTickets.length }}
              </span>
            </button>
            <button
              @click="activeTab = 'advanced'"
              :class="[
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === 'advanced'
                  ? 'border-electric-blue text-electric-blue'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
              ]"
            >
              Avancé
            </button>
          </nav>
        </div>
      </div>

      <!-- Active Tickets Tab -->
      <div v-if="activeTab === 'active'" class="space-y-6">
        <!-- Quick Actions Bar -->
        <div class="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
          <div class="flex gap-3">
            <button
              @click="activeTab = 'create'"
              class="px-4 py-2 bg-electric-blue hover:bg-electric-blue-dark text-black rounded-lg
                     transition-colors font-medium flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Nouveau ticket
            </button>
            <button
              @click="showKeyboardShortcuts"
              class="px-4 py-2 bg-glass-bg-light border border-border-primary rounded-lg
                     text-gray-300 hover:text-white hover:bg-glass-bg transition-colors flex items-center gap-2 text-sm"
              title="Raccourcis clavier"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Aide
            </button>
          </div>

          <!-- Simple actions for active tab -->
          <div class="flex gap-2 text-sm text-gray-400">
            <span>{{ filteredTickets.length }} tickets actifs</span>
          </div>
        </div>

        <!-- Callback Reminders -->
        <CallbackReminder
          :tickets="tickets"
          @update-ticket="handleTicketUpdate"
          @snooze-callback="handleSnoozeCallback"
        />

        <!-- Bulk Actions -->
        <BulkActions
          :tickets="filteredTickets"
          :selected-tickets="selectedTickets"
          :total-tickets="filteredTickets.length"
          @update-selection="selectedTickets = $event"
          @bulk-status-change="handleBulkStatusChange"
          @bulk-priority-change="handleBulkPriorityChange"
          @bulk-delete="handleBulkDelete"
          @export-tickets="exportTickets"
          @toggle-selection-mode="selectionMode = $event"
        />

        <!-- Active Tickets Grid -->
        <div v-if="filteredTickets.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            class="relative"
          >
            <!-- Selection Checkbox -->
            <div
              v-if="selectionMode"
              class="absolute top-2 left-2 z-10"
            >
              <input
                type="checkbox"
                :checked="selectedTickets.includes(ticket.id)"
                @change="toggleTicketSelection(ticket.id)"
                class="w-4 h-4 text-electric-blue bg-glass-bg border-border-primary rounded
                       focus:ring-electric-blue focus:ring-2"
              >
            </div>

            <TicketCard
              :ticket="ticket"
              @edit="editTicket"
              @delete="deleteTicket"
              @status-change="handleStatusChange"
            />
          </div>
        </div>

        <!-- Empty State for Active Tickets -->
        <div v-if="filteredTickets.length === 0" class="text-center py-12">
          <GlassCard variant="glass" class="max-w-md mx-auto">
            <div class="mb-4 flex justify-center">
              <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Aucun ticket actif trouvé</h3>
            <p class="text-gray-300 mb-4">
              {{ searchQuery ? 'Essayez avec d\'autres mots-clés' : 'Créez votre premier ticket pour commencer' }}
            </p>
            <button
              @click="activeTab = 'create'"
              class="px-6 py-2 bg-electric-blue hover:bg-electric-blue-dark text-black rounded-full
                     transition-all duration-200 font-medium hover-lift"
            >
              Créer un ticket
            </button>
          </GlassCard>
        </div>
      </div>

      <!-- Create Ticket Tab -->
      <div v-if="activeTab === 'create'" class="space-y-6">
        <div class="max-w-4xl mx-auto">

          <!-- Tab Header -->
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-white mb-2">Créer un Nouveau Ticket</h2>
            <p class="text-gray-400">Utilisez les modèles rapides ou créez un ticket personnalisé</p>
          </div>

          <!-- Quick Add Presets -->
          <QuickAdd
            :tickets="tickets"
            @create-ticket="(ticket) => { createTicket(ticket); activeTab = 'active'; }"
          />

          <!-- Divider -->
          <div class="relative my-8">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-border-primary"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-dark-bg px-4 text-gray-400">ou</span>
            </div>
          </div>

          <!-- Advanced Creation -->
          <GlassCard>
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-semibold text-white">Création Avancée</h3>
              <div class="text-sm text-gray-400">Contrôle total sur les détails</div>
            </div>

            <button
              @click="showNewTicketModal = true"
              class="w-full px-6 py-4 bg-glass-bg-light hover:bg-glass-bg border border-border-primary
                     rounded-lg text-white transition-all duration-200 flex items-center justify-center gap-3
                     hover:border-electric-blue group"
            >
              <svg class="w-5 h-5 text-gray-400 group-hover:text-electric-blue transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              <div class="text-left">
                <div class="font-medium">Créer un ticket complet</div>
                <div class="text-sm text-gray-400">Tous les champs, pièces jointes, échéances...</div>
              </div>
            </button>
          </GlassCard>

          <!-- Quick Actions -->
          <div class="mt-8 text-center">
            <button
              @click="activeTab = 'active'"
              class="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm"
            >
              ← Retour aux tickets actifs
            </button>
          </div>

        </div>
      </div>

      <!-- Completed Tickets Tab -->
      <div v-if="activeTab === 'completed'" class="space-y-6">
        <!-- Completed tickets actions -->
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold text-white flex items-center gap-2">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Tâches Terminées
          </h3>
          <button
            v-if="completedTickets.length > 0"
            @click="clearCompletedTasks"
            class="px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg
                   hover:bg-red-600/30 transition-colors text-sm"
          >
            Supprimer tout
          </button>
        </div>

        <!-- Completed Tickets Grid -->
        <div v-if="completedTickets.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <TicketCard
            v-for="ticket in completedTickets"
            :key="ticket.id"
            :ticket="ticket"
            @edit="editTicket"
            @delete="deleteTicket"
            @status-change="handleStatusChange"
          />
        </div>

        <!-- Empty State for Completed Tickets -->
        <div v-if="completedTickets.length === 0" class="text-center py-12">
          <GlassCard variant="glass" class="max-w-md mx-auto">
            <div class="mb-4 flex justify-center">
              <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Aucune tâche terminée</h3>
            <p class="text-gray-300">Terminez des tickets pour les voir apparaître ici.</p>
          </GlassCard>
        </div>
      </div>

      <!-- Advanced Tab (complex features and filtering) -->
      <div v-if="activeTab === 'advanced'" class="space-y-6">

        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

          <!-- Left Sidebar: Advanced Controls -->
          <div class="lg:col-span-1 space-y-6">

          <!-- Quick Add -->
          <QuickAdd
            :tickets="tickets"
            @create-ticket="createTicket"
          />

          <!-- Traditional Add -->
          <GlassCard>
            <h3 class="section-title mb-4">Création Avancée</h3>
            <button
              @click="showNewTicketModal = true"
              class="w-full px-4 py-3 bg-glass-bg hover:bg-glass-bg-light text-white border border-border-primary rounded-lg
                     transition-all duration-200 font-medium hover-lift flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Formulaire complet
            </button>
          </GlassCard>

          <!-- Filters -->
          <GlassCard>
            <h3 class="section-title mb-4">Filtres</h3>
            <div class="space-y-3">

              <!-- Status Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Statut</label>
                <select
                  v-model="filters.status"
                  class="w-full px-3 py-2 bg-glass-bg-light border border-border-primary rounded-lg
                         text-white focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="todo">À faire</option>
                  <option value="in-progress">En cours</option>
                  <option value="waiting">En attente</option>
                </select>
              </div>

              <!-- Priority Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Priorité</label>
                <select
                  v-model="filters.priority"
                  class="w-full px-3 py-2 bg-glass-bg-light border border-border-primary rounded-lg
                         text-white focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
                >
                  <option value="all">Toutes priorités</option>
                  <option value="low">Faible</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Élevée</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>

              <!-- Customer Filter -->
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Client</label>
                <input
                  v-model="filters.customer"
                  type="text"
                  placeholder="Filtrer par client..."
                  class="w-full px-3 py-2 bg-glass-bg-light border border-border-primary rounded-lg
                         text-white placeholder-gray-400 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
                >
              </div>

              <!-- Clear Filters -->
              <button
                @click="clearFilters"
                class="w-full px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg
                       transition-all duration-200 text-sm"
              >
                Réinitialiser
              </button>

            </div>
          </GlassCard>

        </div>

        <!-- Main Content: Tickets List -->
        <div class="lg:col-span-3">

          <!-- Callback Reminders -->
          <CallbackReminder
            :tickets="tickets"
            @update-ticket="handleTicketUpdate"
            @snooze-callback="handleSnoozeCallback"
          />

          <!-- Search Bar -->
          <div class="mb-6">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher un ticket..."
                class="w-full px-4 py-3 pl-10 bg-glass-bg-light backdrop-blur-sm border border-border-primary
                       rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2
                       focus:ring-electric-blue focus:border-electric-blue transition-all duration-200"
              >
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                   fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>

          <!-- Sorting Controls -->
          <div class="flex flex-col sm:flex-row gap-4 mb-6">
            <div class="flex-1">
              <select
                v-model="sortBy"
                class="w-full px-4 py-2 bg-glass-bg-light border border-border-primary rounded-lg
                       text-white text-sm focus:ring-2 focus:ring-electric-blue focus:border-electric-blue"
              >
                <option value="dueDate">Trier par échéance</option>
                <option value="priority">Trier par priorité</option>
                <option value="createdAt">Trier par date de création</option>
                <option value="title">Trier par titre</option>
                <option value="status">Trier par statut</option>
              </select>
            </div>
            <button
              @click="toggleSortOrder"
              class="px-4 py-2 bg-glass-bg-light border border-border-primary rounded-lg
                     text-white hover:bg-glass-bg transition-colors flex items-center gap-2 text-sm"
            >
              <svg class="w-4 h-4" :class="{ 'rotate-180': sortOrder === 'desc' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
              </svg>
              {{ sortOrder === 'asc' ? 'Croissant' : 'Décroissant' }}
            </button>
            <button
              @click="showKeyboardShortcuts"
              class="px-4 py-2 bg-glass-bg-light border border-border-primary rounded-lg
                     text-gray-300 hover:text-white hover:bg-glass-bg transition-colors flex items-center gap-2 text-sm"
              title="Raccourcis clavier"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Aide
            </button>
          </div>

          <!-- Bulk Actions -->
          <BulkActions
            :tickets="filteredTickets"
            :selected-tickets="selectedTickets"
            :total-tickets="filteredTickets.length"
            @update-selection="selectedTickets = $event"
            @bulk-status-change="handleBulkStatusChange"
            @bulk-priority-change="handleBulkPriorityChange"
            @bulk-delete="handleBulkDelete"
            @export-tickets="exportTickets"
            @toggle-selection-mode="selectionMode = $event"
          />

          <!-- Tickets Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <div
              v-for="ticket in filteredTickets"
              :key="ticket.id"
              class="relative"
            >
              <!-- Selection Checkbox -->
              <div
                v-if="selectionMode"
                class="absolute -top-2 -left-2 z-10"
              >
                <label class="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    :value="ticket.id"
                    :checked="selectedTickets.includes(ticket.id)"
                    @change="toggleTicketSelection(ticket.id)"
                    class="w-5 h-5 text-electric-blue bg-glass-bg border-border-primary rounded
                           focus:ring-electric-blue focus:ring-2"
                  >
                </label>
              </div>

              <TicketCard
                :ticket="ticket"
                @edit="editTicket"
                @delete="deleteTicket"
                @status-change="updateTicketStatus"
              />
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredTickets.length === 0" class="text-center py-12">
            <GlassCard variant="glass" class="max-w-md mx-auto">
              <div class="mb-4 flex justify-center">
                <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-white mb-2">Aucun ticket trouvé</h3>
              <p class="text-gray-300 mb-4">
                {{ searchQuery ? 'Essayez avec d\'autres mots-clés' : 'Créez votre premier ticket pour commencer' }}
              </p>
              <button
                @click="showNewTicketModal = true"
                class="px-6 py-2 bg-electric-blue hover:bg-electric-blue-dark text-black rounded-full
                       transition-all duration-200 font-medium hover-lift"
              >
                Créer un ticket
              </button>
            </GlassCard>
          </div>

          <!-- Completed Tasks Section -->
          <div v-if="completedTickets.length > 0" class="mt-12">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-semibold text-white flex items-center gap-2">
                <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Tâches Terminées
                <span class="text-sm text-gray-400">({{ completedTickets.length }})</span>
              </h3>
              <button
                @click="showCompletedTasks = !showCompletedTasks"
                class="px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors"
              >
                {{ showCompletedTasks ? 'Masquer' : 'Afficher' }}
              </button>
            </div>

            <div v-if="showCompletedTasks" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TicketCard
                  v-for="ticket in completedTickets"
                  :key="ticket.id"
                  :ticket="ticket"
                  @edit="editTicket"
                  @delete="deleteTicket"
                  @status-change="handleStatusChange"
                />
              </div>

              <!-- Completed Tasks Actions -->
              <div class="mt-6 text-center">
                <button
                  @click="clearCompletedTasks"
                  class="px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg
                         hover:bg-red-600/30 transition-colors text-sm"
                >
                  Supprimer toutes les tâches terminées
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>

      </div>

      <!-- Keyboard Shortcuts Hint -->
      <div class="mt-8 text-center">
        <p class="text-xs text-gray-500">
          Astuce : Appuyez sur
          <kbd class="px-1.5 py-0.5 text-xs font-mono bg-gray-700 text-gray-300 rounded">?</kbd>
          pour voir tous les raccourcis clavier disponibles
        </p>
      </div>

    </div>

    <!-- New Ticket Modal -->
    <NewTicketModal
      :show="showNewTicketModal"
      @close="showNewTicketModal = false"
      @create="createTicket"
    />

    <!-- Edit Ticket Modal -->
    <EditTicketModal
      :show="showEditTicketModal"
      :ticket="editingTicket"
      @close="closeEditModal"
      @save="saveTicketEdit"
    />

    <!-- Keyboard Shortcuts -->
    <KeyboardShortcuts
      ref="keyboardShortcutsRef"
      @new-ticket="activeTab = 'create'"
      @toggle-search="focusSearch"
      @export-data="() => exportTickets()"
      @toggle-selection="toggleSelectionMode"
    />

    <!-- Feedback Notification -->
    <div
      v-if="showFeedback"
      class="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg
             flex items-center gap-2 animate-slide-in"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
      {{ feedbackMessage }}
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Components
import GlassCard from '@/components/ui/GlassCard.vue'
import ToolHeader from '@/components/ui/ToolHeader.vue'
import TicketCard from './TicketingSystem/TicketCard.vue'
import NewTicketModal from './TicketingSystem/NewTicketModal.vue'
import EditTicketModal from './TicketingSystem/EditTicketModal.vue'
import CallbackReminder from './TicketingSystem/CallbackReminder.vue'
import BulkActions from './TicketingSystem/BulkActions.vue'
import QuickAdd from './TicketingSystem/QuickAdd.vue'
import KeyboardShortcuts from './TicketingSystem/KeyboardShortcuts.vue'

// Reactive data
const tickets = ref([])
const searchQuery = ref('')
const showNewTicketModal = ref(false)
const showEditTicketModal = ref(false)
const editingTicket = ref(null)
const sortBy = ref('dueDate') // dueDate, priority, createdAt, title
const sortOrder = ref('asc') // asc, desc
const selectedTickets = ref([])
const selectionMode = ref(false)
const keyboardShortcutsRef = ref(null)
const showCompletedTasks = ref(false)
const activeTab = ref('active') // 'active', 'create', 'completed', 'advanced'
const feedbackMessage = ref('')
const showFeedback = ref(false)

// Filters
const filters = ref({
  status: 'all',
  priority: 'all',
  customer: ''
})

// Demo data
const sampleTickets = [
  {
    id: 1,
    title: 'Rappeler M. Dupont pour devis',
    description: 'Client intéressé par refonte de site web. À rappeler avant 17h.',
    customer: 'M. Dupont',
    priority: 'high',
    status: 'todo',
    dueDate: '2025-09-26',
    createdAt: '2025-09-25',
    type: 'callback'
  },
  {
    id: 2,
    title: 'Finir maquette Projet XYZ',
    description: 'Terminer les maquettes desktop et mobile pour validation client.',
    customer: 'Entreprise ABC',
    priority: 'medium',
    status: 'in-progress',
    dueDate: '2025-09-27',
    createdAt: '2025-09-24',
    type: 'task'
  }
]

// Computed properties
const filteredTickets = computed(() => {
  // Exclude completed tickets from main list
  let filtered = tickets.value.filter(ticket => ticket.status !== 'completed')

  // Search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(ticket =>
      ticket.title.toLowerCase().includes(query) ||
      ticket.description.toLowerCase().includes(query) ||
      ticket.customer.toLowerCase().includes(query)
    )
  }

  // Status filter
  if (filters.value.status !== 'all') {
    filtered = filtered.filter(ticket => ticket.status === filters.value.status)
  }

  // Priority filter
  if (filters.value.priority !== 'all') {
    filtered = filtered.filter(ticket => ticket.priority === filters.value.priority)
  }

  // Customer filter
  if (filters.value.customer.trim()) {
    const customerQuery = filters.value.customer.toLowerCase()
    filtered = filtered.filter(ticket =>
      ticket.customer.toLowerCase().includes(customerQuery)
    )
  }

  // Sort tickets
  filtered.sort((a, b) => {
    let aVal, bVal

    switch (sortBy.value) {
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
        aVal = priorityOrder[a.priority] || 0
        bVal = priorityOrder[b.priority] || 0
        break
      case 'dueDate':
        // Handle null due dates (put them at end)
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return sortOrder.value === 'asc' ? 1 : -1
        if (!b.dueDate) return sortOrder.value === 'asc' ? -1 : 1
        aVal = new Date(a.dueDate).getTime()
        bVal = new Date(b.dueDate).getTime()
        break
      case 'createdAt':
        aVal = new Date(a.createdAt).getTime()
        bVal = new Date(b.createdAt).getTime()
        break
      case 'title':
        aVal = a.title.toLowerCase()
        bVal = b.title.toLowerCase()
        break
      case 'status':
        const statusOrder = { todo: 1, 'in-progress': 2, waiting: 3, completed: 4 }
        aVal = statusOrder[a.status] || 0
        bVal = statusOrder[b.status] || 0
        break
      default:
        return 0
    }

    if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1
    if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })

  return filtered
})

const completedTickets = computed(() => {
  return tickets.value
    .filter(ticket => ticket.status === 'completed')
    .sort((a, b) => new Date(b.completedAt || b.createdAt) - new Date(a.completedAt || a.createdAt))
})

// Stats computed
const activeTicketsCount = computed(() =>
  tickets.value.filter(t => t.status !== 'completed').length
)
const todoTickets = computed(() =>
  tickets.value.filter(t => t.status === 'todo').length
)
const inProgressTickets = computed(() =>
  tickets.value.filter(t => t.status === 'in-progress').length
)
const urgentTickets = computed(() =>
  tickets.value.filter(t => t.priority === 'urgent').length
)

// Methods
const clearFilters = () => {
  filters.value.status = 'all'
  filters.value.priority = 'all'
  filters.value.customer = ''
  searchQuery.value = ''
}

const createTicket = (ticketData) => {
  const newTicket = {
    id: Date.now(),
    ...ticketData,
    createdAt: new Date().toISOString().split('T')[0],
    status: 'todo'
  }
  tickets.value.unshift(newTicket)
  saveTickets()
}

const editTicket = (ticketId) => {
  const ticket = tickets.value.find(t => t.id === ticketId)
  if (ticket) {
    editingTicket.value = ticket
    showEditTicketModal.value = true
  }
}

const closeEditModal = () => {
  showEditTicketModal.value = false
  editingTicket.value = null
}

const saveTicketEdit = (updatedTicket) => {
  const index = tickets.value.findIndex(t => t.id === updatedTicket.id)
  if (index !== -1) {
    tickets.value[index] = updatedTicket
    saveTickets()
  }
}

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
}

const showKeyboardShortcuts = () => {
  if (keyboardShortcutsRef.value) {
    keyboardShortcutsRef.value.showHelp()
  }
}

// Bulk actions
const toggleTicketSelection = (ticketId) => {
  const index = selectedTickets.value.indexOf(ticketId)
  if (index > -1) {
    selectedTickets.value.splice(index, 1)
  } else {
    selectedTickets.value.push(ticketId)
  }
}

const handleBulkStatusChange = (ticketIds, newStatus) => {
  ticketIds.forEach(ticketId => {
    const ticket = tickets.value.find(t => t.id === ticketId)
    if (ticket) {
      ticket.status = newStatus
      ticket.updatedAt = new Date().toISOString().split('T')[0]
    }
  })
  saveTickets()
  selectedTickets.value = []
}

const handleBulkPriorityChange = (ticketIds, newPriority) => {
  ticketIds.forEach(ticketId => {
    const ticket = tickets.value.find(t => t.id === ticketId)
    if (ticket) {
      ticket.priority = newPriority
      ticket.updatedAt = new Date().toISOString().split('T')[0]
    }
  })
  saveTickets()
  selectedTickets.value = []
}

const handleBulkDelete = (ticketIds) => {
  tickets.value = tickets.value.filter(t => !ticketIds.includes(t.id))
  saveTickets()
  selectedTickets.value = []
}

const clearCompletedTasks = () => {
  const completedCount = completedTickets.value.length
  if (completedCount === 0) return

  const message = `Êtes-vous sûr de vouloir supprimer définitivement ${completedCount} tâche${completedCount > 1 ? 's' : ''} terminée${completedCount > 1 ? 's' : ''} ?`

  if (confirm(message)) {
    tickets.value = tickets.value.filter(ticket => ticket.status !== 'completed')
    saveTickets()
  }
}

// Export functionality
const exportTickets = (ticketData = null) => {
  const dataToExport = ticketData || tickets.value
  const jsonData = JSON.stringify(dataToExport, null, 2)

  const blob = new Blob([jsonData], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = `tickets-export-${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Callback reminders
const handleTicketUpdate = (updatedTicket) => {
  const index = tickets.value.findIndex(t => t.id === updatedTicket.id)
  if (index !== -1) {
    tickets.value[index] = updatedTicket
    saveTickets()
  }
}

const handleStatusChange = (ticketId, newStatus) => {
  const ticket = tickets.value.find(t => t.id === ticketId)
  if (ticket) {
    ticket.status = newStatus
    ticket.updatedAt = new Date().toISOString().split('T')[0]

    // Add completion timestamp for completed tickets
    if (newStatus === 'completed') {
      ticket.completedAt = new Date().toISOString()
    }

    saveTickets()
  }
}

const handleSnoozeCallback = (ticketId) => {
  const ticket = tickets.value.find(t => t.id === ticketId)
  if (ticket) {
    showFeedback.value = true
    feedbackMessage.value = `Rappel "${ticket.title}" reporté à demain`

    // Hide feedback after 3 seconds
    setTimeout(() => {
      showFeedback.value = false
    }, 3000)
  }
}

// Keyboard shortcuts handlers
const focusSearch = () => {
  const searchInput = document.getElementById('main-search-input')
  if (searchInput) {
    searchInput.focus()
    searchInput.select()
  }
}

const toggleSelectionMode = () => {
  selectionMode.value = !selectionMode.value
  if (!selectionMode.value) {
    selectedTickets.value = []
  }
}

const deleteTicket = (ticketId) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce ticket ?')) {
    tickets.value = tickets.value.filter(t => t.id !== ticketId)
    saveTickets()
  }
}

const updateTicketStatus = (ticketId, newStatus) => {
  const ticket = tickets.value.find(t => t.id === ticketId)
  if (ticket) {
    ticket.status = newStatus
    saveTickets()
  }
}

// Local storage
const saveTickets = () => {
  localStorage.setItem('ui-tools-tickets', JSON.stringify(tickets.value))
}

const loadTickets = () => {
  const saved = localStorage.getItem('ui-tools-tickets')
  if (saved) {
    tickets.value = JSON.parse(saved)
  } else {
    tickets.value = [...sampleTickets]
    saveTickets()
  }
}

// Lifecycle
onMounted(() => {
  loadTickets()
})
</script>

<style scoped>
/* Use same patterns as catalog and palette generator */
.container {
  max-width: 1400px;
}

/* Feedback notification animation */
.animate-slide-in {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.tool-header-wrapper {
  margin-bottom: 2rem;
}

.section-title {
  @apply text-lg font-semibold text-white;
}

.stat-card {
  @apply p-4 rounded-lg border border-border-primary bg-glass-bg-light backdrop-blur-sm;
}

.hover-lift {
  transition: transform 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-2px);
}

/* Animations */
.ticketing-system {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>