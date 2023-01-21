import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ContactView from '@/views/ContactView.vue'
import HistoryView from '@/views/HistoryView.vue'
import AddContactView from '@/views/AddContactView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView
  },
  {
    path: '/history',
    name: 'history',
    component: HistoryView
  },
  {
    path: '/addContact',
    name: 'addContact',
    component: AddContactView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
