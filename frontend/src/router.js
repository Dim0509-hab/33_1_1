import { createRouter, createWebHistory } from 'vue-router'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import ChatWindow from './pages/ChatWindow.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/chat', component: ChatWindow }, // 👈 чат
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
