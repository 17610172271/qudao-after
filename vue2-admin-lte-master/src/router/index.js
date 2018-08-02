import Vue from 'vue'
import Router from 'vue-router'
// import bus from '../lib/eventBus.js'
Vue.use(Router)
const rs = path => {
  return resolve => require(['@/pages/' + path], resolve)
}
const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: rs('home/index'),
      children: [
        {
          path: '/',
          name: 'home',
          meta: {requreAuth: true},
          component: rs('home/home')
        },
        {
          path: '/setting',
          component: rs('setting/index'),
          meta: {requreAuth: true},
          children: [
            {
              path: 'info',
              name: 'setting_info',
              component: rs('setting/info')
            },
            {
              path: 'news',
              name: 'setting_news',
              component: rs('setting/news')
            },
            {
              path: 'notice',
              name: 'setting_notice',
              component: rs('setting/notice')
            }
          ]
        },
        {
          path: '/normal',
          component: rs('normalsetting/index'),
          meta: {requreAuth: true},
          children: [
            {
              path: 'setting',
              name: 'normalsetting_person',
              component: rs('normalsetting/setting')
            }
          ]
        },
        {
          path: '/copyright',
          component: rs('copyright/index'),
          meta: {requreAuth: true},
          children: [
            {
              path: 'copyright',
              name: 'copyright_list',
              component: rs('copyright/list')
            }
          ]
        },
        {
          path: '/financial',
          component: rs('financial/index'),
          meta: {requreAuth: true},
          children: [
            {
              path: 'financial',
              name: 'financial_list',
              component: rs('financial/list')
            },
            {
              path: 'income',
              name: 'financial_income',
              component: rs('financial/income')
            }
          ]
        },
        {
          path: '/user',
          component: rs('user/index'),
          meta: {requreAuth: true},
          children: [
            {
              path: 'admin',
              name: 'user_admin',
              component: rs('user/admin')
            },
            {
              path: 'log',
              name: 'user_log',
              component: rs('user/log')
            }
          ]
        },
        {
          path: '/login',
          name: 'login',
          component: rs('common/login')
        },
        {
          path: '/404',
          name: '404',
          component: rs('common/404')
        },
        {
          path: '/500',
          name: '500',
          component: rs('common/500')
        }
      ]
    }
  ],
  linkActiveClass: 'active'
})
 router.beforeEach((to, from, next) => {
   // 判断去往的页面是否需要登录
   if (to.matched.some(record => record.meta.requreAuth) && !window.localStorage.getItem('Auth')) {
     next({
       path: '/login',
       query: { from: to.fullPath }
     })
   } else {
     next()
   }
 })
export default router
