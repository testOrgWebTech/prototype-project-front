import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard'
import Message from "../views/Message";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/message',
    name: 'Message Check',
    component: Message
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import('../views/auth/SignUp.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
