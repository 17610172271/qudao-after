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
    icon: 'fa fa-copyright',
    name: '版权管理',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '版权库',
        router: {
          name: 'copyright_list'
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
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '版权定价',
        router: {
          name: 'financial_list'
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
    icon: 'fa fa-cogs',
    name: '系统设置',
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '版权商信息管理',
        router: {
          name: 'setting_info'
        }
      },
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
      }
    ]
  },
  {
    type: 'tree',
    icon: 'fa fa-user-o',
    name: '用户管理',
    // badge: {
    //   type: 'Number',
    //   data: 4
    // },
    items: [
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '管理员日志',
        router: {
          name: 'user_log'
        }
      },
      {
        type: 'item',
        icon: 'fa fa-circle-o',
        name: '管理员管理',
        router: {
          name: 'user_admin'
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
        name: '个人配置',
        router: {
          name: 'normalsetting_person'
        }
      }
    ]
  }
]
