import zIndex from './components/zIndex.vue'
import zPost from './components/zPost.vue'
import zWrite from './components/zWrite.vue'
import zLogin from './components/zLogin.vue'

const routes = [
  { path: '/', component: zIndex},
  { path: '/login', component: zLogin},
  { path: '/p/:id', name: 'post', component: zPost},
  { path: '/write', component: zWrite}
]

export default routes
