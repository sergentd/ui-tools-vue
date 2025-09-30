import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'
import { initializeSearchIndexer } from './boot/search-indexer'

// Create app
const app = createApp(App)

// Use plugins
const pinia = createPinia()
app.use(pinia)
app.use(router)

// Mount app
app.mount('#app')

// Initialize search indexer
initializeSearchIndexer()