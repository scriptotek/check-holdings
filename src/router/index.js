import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Results from '@/components/results'

Vue.use(Router)

let router = new Router({
  base: process.env.NODE_ENV === 'production' ? '/check-holdings/' : '/',
  routes: [
    { path: '/', name: 'Home', component: Home, meta: {title: 'Check holdings tool'}},
    { path: '/results', name: 'Results', component: Results, meta: {title: 'Check holdings tool'}},
  ],
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router;
