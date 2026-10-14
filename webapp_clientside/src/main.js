import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { restoreSession } from './services/auth'

restoreSession()
createApp(App).use(router).mount('#app')