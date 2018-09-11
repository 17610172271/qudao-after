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
                    path: '/application',
                    component: rs('application/index'),
                    meta: {requreAuth: true},
                    redirect: '/resource/list',
                    children: [
                        {
                            path: 'list',
                            name: 'application_list',
                            component: rs('application/list')
                        }
                    ]
                },
                {
                    path: '/resource',
                    component: rs('resource/index'),
                    meta: {requreAuth: true},
                    redirect: '/resource/films',
                    children: [
                        {
                            path: 'films',
                            name: 'resource_film',
                            component: rs('resource/film_list')
                        },
                        {
                            path: 'agent',
                            name: 'resource_agent',
                            component: rs('resource/agent_list')
                        }
                    ]
                },
                {
                    path: '/statistics',
                    component: rs('statistics/index'),
                    meta: {requreAuth: true},
                    redirect: '/statistics/agent',
                    children: [
                        {
                            path: 'agent',
                            name: 'statistics_agent',
                            component: rs('statistics/agent_list')
                        },
                        {
                            path: 'application',
                            name: 'statistics_application',
                            component: rs('statistics/application_list')
                        },
                        {
                            path: 'film',
                            name: 'statistics_film',
                            component: rs('statistics/film_list')
                        }
                    ]
                },
                {
                    path: '/right',
                    component: rs('right/index'),
                    meta: {requreAuth: true},
                    redirect: '/right/log',
                    children: [
                        {
                            path: 'log',
                            name: 'right_log',
                            component: rs('right/log')
                        },
                        {
                            path: 'admin',
                            name: 'right_admin',
                            component: rs('right/admin')
                        }
                    ]
                },
                {
                    path: '/file',
                    component: rs('file/index'),
                    meta: {requreAuth: true},
                    redirect: '/file/doc',
                    children: [
                        {
                            path: 'doc',
                            name: 'file_doc',
                            component: rs('file/doc_list')
                        },
                        {
                            path: 'sdk',
                            name: 'file_sdk',
                            component: rs('file/sdk_list')
                        }
                    ]
                },
                {
                    path: '/setting',
                    component: rs('setting/index'),
                    meta: {requreAuth: true},
                    redirect: '/setting/news',
                    children: [
                        {
                            path: 'news',
                            name: 'setting_news',
                            component: rs('setting/news')
                        },
                        {
                            path: 'notice',
                            name: 'setting_notice',
                            component: rs('setting/notice')
                        },
                        {
                            path: 'suggest',
                            name: 'setting_suggest',
                            component: rs('setting/suggest')
                        },
                        {
                            path: 'person',
                            name: 'setting_person',
                            component: rs('setting/person')
                        }
                    ]
                },
                {
                    path: '/normal',
                    component: rs('normalsetting/index'),
                    meta: {requreAuth: true},
                    children: [
                        {
                            path: 'system',
                            name: 'normalsetting_system',
                            component: rs('normalsetting/system')
                        },
                        {
                            path: 'attachment',
                            name: 'normalsetting_attachment',
                            component: rs('normalsetting/attachment')
                        }
                    ]
                },
                {
                    path: '/financial',
                    component: rs('financial/index'),
                    meta: {requreAuth: true},
                    redirect: '/financial/setting',
                    children: [
                        {
                            path: 'setting',
                            name: 'financial_setting',
                            component: rs('financial/list')
                        },
                        {
                            path: 'order',
                            name: 'financial_order',
                            component: rs('financial/order')
                        },
                        {
                            path: 'income',
                            name: 'financial_income',
                            component: rs('financial/income')
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
            query: {from: to.fullPath}
        })
    } else {
        next()
    }
})
export default router
