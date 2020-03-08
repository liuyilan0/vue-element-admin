import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/book',
    component: Layout,
    redirect: '/book/create',
    meta: { title: '图书管理', icon: 'user', roles: ['admin'] },
    children: [{
      path: '/book/create',
      name: 'create',
      component: () => import('@/views/book/create'),
      meta: { title: '新增图书', icon: 'table' }
    }, {
      path: '/book/edit',
      name: 'BookEdit',
      hidden: true,
      component: () => import('@/views/book/edit'),
      meta: { title: '编辑图书', icon: 'tree', activeMenu: '/book/list' }
    }, {
      path: '/book/list',
      name: 'BookList',
      component: () => import('@/views/book/list'),
      meta: { title: '图书列表', icon: 'tree' }
    }]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
