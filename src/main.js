import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import { zyx } from 'z-vue-components'

import App from './App'
import Utils from './utils.js'

window._utils = Utils

if (process.env.NODE_ENV === "production") {
  window.__apiBase = 'http://api.zhaoyuxiang.cn/v1/'
} else {
  window.__apiBase = 'http://localhost:3000/v1/'
}

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(zyx)

Vue.http.options.emulateJSON = true

// 路由控制
import routes from './router.js'
const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

// 状态管理
const store = new Vuex.Store({
  state: {
    auth: false,
    title: '天道寺',
    author: '天道',
    authorAvatar: 'https://ooo.0o0.ooo/2016/12/20/5858bbde6e8ac.jpg'
  },
  mutations: {
    // 用户已登录
    isLogin (state) {
      state.auth = true
    },
    // 改变标题
    changeTitle (state, title) {
      state.title = title
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
