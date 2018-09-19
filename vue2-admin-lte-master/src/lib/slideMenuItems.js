module.exports = [
    {
        type: 'item',
        isHeader: true,
        name: ''
    },
    {
        type: 'item',
        icon: 'fa fa-home',
        name: '首页',
        router: {
            name: 'home'
        }
    },
    {
        type: 'tree',
        icon: 'fa fa-support',
        name: '应用管理',
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '应用审核',
                router: {
                    name: 'application_list'
                }
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-wifi',
        name: '资源信息',
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '影片库',
                router: {
                    name: 'resource_film'
                }
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '代理商管理',
                router: {
                    name: 'resource_agent'
                }
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-bar-chart-o',
        name: '数据统计',
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '代理商注册统计',
                router: {
                    name: 'statistics_agent'
                }
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '应用绑定统计',
                router: {
                    name: 'statistics_application'
                }
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '影片操作统计',
                router: {
                    name: 'statistics_film'
                }
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-gg-circle',
        name: '财务管理',
        // badge: {
        //   type: 'Number',
        //   data: 4
        // },
        items: [
            //{
            //    type: 'item',
            //    icon: 'fa fa-circle-o',
            //    name: '分账设置',
            //    router: {
            //        name: 'financial_setting'
            //    }
            //},
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '订单统计',
                router: {
                    name: 'financial_order'
                }
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '收入统计',
                router: {
                    name: 'financial_income'
                }
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-user-o',
        name: '权限管理',
        // badge: {
        //   type: 'Number',
        //   data: 4
        // },
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '管理员管理',
                router: {
                    name: 'right_admin'
                }
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '管理员日志',
                router: {
                    name: 'right_log'
                }
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-file-text-o',
        name: '文件管理',
        // badge: {
        //   type: 'Number',
        //   data: 4
        // },
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '文档管理',
                router: {
                    name: 'file_doc'
                }
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: 'SDK管理',
                router: {
                    name: 'file_sdk'
                }
            }
        ]
    },

    {
        type: 'tree',
        icon: 'fa fa-address-book-o',
        name: '常规管理',
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '系统配置',
                router: {
                    name: 'normalsetting_system'
                }
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '附件管理',
                router: {
                    name: 'normalsetting_attachment'
                }
            }
        ]
    },
    {
        type: 'tree',
        icon: 'fa fa-cogs',
        name: '系统设置',
        items: [
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '我的消息',
                router: {
                    name: 'setting_news'
                }
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '系统公告',
                router: {
                    name: 'setting_notice'
                }
            },
            {
                type: 'item',
                icon: 'fa fa-circle-o',
                name: '意见处理',
                router: {
                    name: 'setting_suggest'
                }
            },
            {
                type: 'item',
                icon: 'fa fa-drivers-license-o',
                name: '个人配置',
                router: {
                    name: 'setting_person'
                }
            }
        ]
    }
]
