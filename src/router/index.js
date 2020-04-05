import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Globe from '../views/Globe'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:country',
    name: 'Globe',
    component: Globe
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
