import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard'
import ShowTeam from '@/views/team/ShowTeam'
import CreateTeam from '@/views/team/CreateTeam'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/signUp',
    name: 'SignUp',
    component: () => import('../views/auth/SignUp.vue')
  },
  {
    path: '/showTeam/:id',
    name: 'ShowTeam',
    component: ShowTeam
  },
  {
    path: '/createTeam',
    name: 'CreateTeam',
    component: CreateTeam
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
