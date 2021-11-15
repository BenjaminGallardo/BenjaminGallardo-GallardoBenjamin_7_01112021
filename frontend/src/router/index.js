import { createRouter, createWebHistory } from 'vue-router'

import Connexion from "../views/Connexion.vue"
import Subscribe from "../views/Subscribe.vue"
import Home from "../views/Home.vue"
import Profile from "../views/Profile.vue"
import Member from "../views/Member.vue"
import ModifyPublication from '../views/ModifyPublication.vue'

const routes = [
  {
    path:'/',
    component: Connexion
  },
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
    path: '/publication/:id',
    name: 'modifyPublication',
    component: ModifyPublication
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/member/:id',
    name: 'member',
    component: Member
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
