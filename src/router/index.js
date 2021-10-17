import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard'
import ShowTeam from '@/views/team/ShowTeam'
import CreateTeam from '@/views/team/CreateTeam'
import EditTeam from '@/views/team/EditTeam'
import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
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
  {
    path: '/editTeam/:id',
    name: 'EditTeam',
    component: EditTeam
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/aboutUs',
    name: 'AboutUs',
    component: () => import('../views/AboutUs.vue')
  },
  {
    path: '/contract',
    name: 'Contract',
    component: () => import('../views/Contract.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
