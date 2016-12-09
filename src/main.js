import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { install } from 'z-vue-components'

import App from './App'
import Utils from './utils.js'

window._utils = Utils

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(install)

Vue.http.options.emulateJSON = true

// 路由控制
import routes from './router.js'
const router = new VueRouter({
  routes
})

// 状态管理
const store = new Vuex.Store({
  state: {
    auth: false,
    urlBase: '192.168.10.50',
    // apiBase: 'http://59.111.101.254:3000/api/',
    apiBase: 'http://localhost:3000/api/',
    title: '天道寺'
  },
  mutations: {
    isLogin (state) {
      state.auth = true
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  store
}).$mount('#app')
