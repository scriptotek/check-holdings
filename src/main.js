import '@mdi/font/css/materialdesignicons.css'
import '@babel/polyfill'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

// Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

sync(store, router)
