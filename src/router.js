import zIndex from './components/zIndex.vue'
import zPost from './components/zPost.vue'
import zWrite from './components/zWrite.vue'

const routes = [
  { path: '/', component: zIndex},
  { path: '/p/:id', name: 'post', component: zPost},
  { path: '/write', component: zWrite}
]

export default routes
