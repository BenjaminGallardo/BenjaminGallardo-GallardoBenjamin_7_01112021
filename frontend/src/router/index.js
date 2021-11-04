import { createRouter, createWebHistory } from 'vue-router'

import Connexion from "../views/Connexion.vue"
import Subscribe from "../views/Subscribe.vue"
import Home from "../views/Home.vue"
import Profile from "../views/Profile.vue"

const routes = [
  {
    path: '/connexion',
    name: 'connexion',
    component: Connexion
  },
  {
    path: '/subscribe',
    name: 'subscribe',
    component: Subscribe
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
