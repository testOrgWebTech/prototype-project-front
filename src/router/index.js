import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard'
import ShowTeam from '@/views/team/ShowTeam'
import EditTeam from '@/views/team/EditTeam'
//import Home from '@/views/Home'
import Message from "../views/Message";


Vue.use(VueRouter)

const routes = [
  /*{
    path: '/',
    name: 'Home',
    component: Home
  },*/
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
    path: '/editTeam/:id',
    name: 'EditTeam',
    component: EditTeam
  },
  {
    path: '/message',
    name: 'Message Check',
    component: Message
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/profile/:id',
    name: 'ProfileById',
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/contract',
    name: 'Contract',
    component: () => import('../views/Contract.vue')
  },
  {
    path: '/category/:id',
    name: 'Category',
    component: () => import('../views/Category.vue')
  },
  {
    path: '/editCategory',
    name: 'EditCategory',
    component: () => import('../views/admin/EditCategory.vue')
  },
  {
    path: '/manageUser',
    name: 'ManageUser',
    component: () => import('../views/admin/ManageUser.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
