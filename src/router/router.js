import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/ModalView',
    name: 'ModalView',
    component: () => import('../views/ModalView.vue'),
  },
  {
    path: '/ModalView/:cost',
    name: 'ModalViewAdd',
    component: () => import('../views/ModalView.vue'),
  },
  {
    path: '/addExpence',
    name: 'addExpenceComponent',
    component: () => import('../components/ExpenceAdd.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/404View.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router