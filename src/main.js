import '@mdi/font/css/materialdesignicons.css'
import '@babel/polyfill'
import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

// Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  vuetify,
  store
}).$mount('#app')

sync(store, router)
