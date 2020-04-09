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
  // apple-touch-icon-152x152
  {
    path: '/globe',
    name: 'Globe',
    component: Globe,
    beforeEnter: (to, from, next) => {
      if (from.name !== 'Home') {
        return next({name: 'Home'})
      }
      return next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
