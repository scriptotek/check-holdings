import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Results from '@/components/results'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home},
    { path: '/results', name: 'Results', component: Results},
  ],
})
