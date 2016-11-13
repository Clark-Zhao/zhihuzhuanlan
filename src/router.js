import zIndex from './components/zIndex.vue'
import zPost from './components/zPost.vue'
import zWrite from './components/zWrite.vue'
import zLogin from './components/zLogin.vue'
import zFollowers from './components/zFollowers.vue'

const routes = [
  { path: '/', component: zIndex},
  { path: '/login', component: zLogin},
  { path: '/p/:id', name: 'post', component: zPost},
  { path: '/write', component: zWrite},
  { path: '/followers', component: zFollowers}
]

export default routes
