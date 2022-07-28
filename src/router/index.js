import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    // 懒加载页面，优化首屏速度
    component: () => import('@/views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
