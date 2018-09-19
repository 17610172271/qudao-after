// all api
export const BASE_URL = '/v1'

// 通用api
export const common = {
    upload: '/api/5b9a2bab3f60e', // 上传文件
    uploadXML: '/api/5b74dc0ed7a92', // 上传xml
    uploadCover: '/api/5b74d91c459bd', // 上传封面
    uploadJson: '/api/5b7b7f8c67ecc', // 上传JSON
    codeGet: '/api/5b7aa559d235a', // 图片验证码获取
    codeCheck: '/api/5b7baa07e56f9', // 图片验证
    news: 'v1/Setting/get_num', // 消息数量
    emailCodeSend: '/api/5b7f731b36b0e', // 发送邮箱验证码
    emailCodeCheck: '/api/5b7f73451beb6', // 邮箱验证码验证
    setPassword: '/api/5b7f7377a59c1' // 找回密码
}
// 应用管理
export  const application = {
    list: '/api/5b9f72262b0a0', // 应用审核列表
    history: '/api/5b9f7ae24ea8c', // 应用审核历史列表
    checkApp: '/application/checkPass', // 审核应用
    checkPass: '/api/5b9f738500d1a', // 审核通过
    checkNotPass: '/api/5b9f7a81a283b', // 审核不通过
    freeze: '/api/5b9f7aba40ac1', // 冻结应用
}
// 资源信息管理
export  const resource = {
    film: '/api/5b9a54f0304f6', // 影片库
    agent: '/api/5b9b296724568', // 代理商管理
    editBasic: '/api/5b9b62bcc2e91'
}
// 文件管理
export  const file = {
    doc: '/api/5b9a3ead850a5', // 文档管理列表
    docAdd: '/api/5b9a3f3f2c7f7', // 文档添加
    docEdit: '/api/5b9a3f59aefed', // 文档修改
    docDel: '/api/5b9a43b0b9621', // 文档删除
    docDown: '/api/5b9a3fb4464da', // 文档下载
    sdk: '/api/5b9a3fe04c888', // sdk管理列表
    sdkAdd: '/api/5b9a401d6b2c0', // sdk添加
    sdkEdit: '/api/5b9a403879773', // sdk编辑
    sdkDel: '/api/5b9a43eb8b15d', // sdk删除
    sdkDown: '/api/5b9a438fa4e6d' // sdk下载
}
// 用户功能相关
export const user = {
    login: '/api/5b986c8703d90', // 用户登录
    logout: '/api/5b986cc1c7013', // 退出登录
    userList: '/api/5b99c947af869', // 用户管理列表
    userEdit: '/api/5b99ca895411d', // 个人配置
    findPsd: '/api/5b99f9eca68ee', // 找回密码
}

// 版权管理
export const copyright = {
    list: '/v1/copyright/list', // 版权库列表
    history: '/v1/copyright/history', // 版权审核历史列表
    options: '/v1/film/get_search', // 影片类型选项
    check: '/v1/copyright/check', // 审核
    edit: '/v1/copyright/edit', // 编辑
    del: '/v1/copyright/del', //删除
    regist: '/v1/copyright/regist', // 版权登记
    detail: '/v1/copyright/detail' // 版权详情
}

// 用户管理
export const right = {
    adminTeam: '/api/5b99ce5d99e92', // 管理员组别
    admin: '/api/5b97b5cecad8c', // 管理员管理
    adminAdd: '/api/5b9893a41a3d4', // 管理员新增
    adminEdit: '/api/5b98941c187f3', // 管理员编辑
    passReset: '/api/5b863c5aa6915', // 重置管理员密码
    adminDel: '/api/5b9894d269e68', // 管理员删除
    log: '/api/5b99cfe77c02b', //管理员日志
    logDel: '/api/5b99d00ea0b0a' // 日志删除
}
// 财务管理
export const financial = {
    list: '/v1/financial/list', // 版权定价
    priceSet: '/v1/copyright/priceSet', // 版权定价-设置
    income: '/v1/financial/income', // 收入统计
    order: '/v1/financial/order', // 订单统计
}

// 系统设置
export const setting = {
    info: '/v1/setting/suggest', // 版权商信息管理
    infoDetail: '/v1/setting/infoDetail', //版权商信息-详情
    infoEdit: '/v1/setting/infoEdit', // 版权商信息-编辑
    infoDel: '/v1/setting/infoDel', // 版权商信息-删除
    newsList: '/api/5b9f241836c81', //消息通知tab列表
    newsRead: '/api/5b9f2493f3c41', // 消息通知-标记已读
    newsDel: '/api/5b9f24c2dfab4', // 消息通知-删除
    noticeList: '/api/5b9f24fc4cc3f', //消息公告tab列表
    noticeListRead: '/api/5b9f2525c631d', // 消息公告-标记已读
    noticeListDel: '/api/5b9f255fd1bf5', // 消息公告-删除
    notice: '/api/5b98edd7586ec', // 系统公告列表
    noticeAdd: '/api/5b98ee23de507', // 系统公告-添加
    noticeEdit: '/api/5b98ee069f67d', // 系统公告-编辑
    noticeDel: '/api/5b98ee4ab809c', // 系统公告-删除
    suggest: '/api/5b9b6d63af5f4', // 意见列表
    suggestEdit: '/api/5b9b6dae0ae20', // 意见修改
    suggestDel: '/api/5b9b6de0ef221', // 意见删除
}

// 常规设置
export const normalsetting = {
    attachment: '/api/5b9e56013fe9b', // 附件管理列表
    attachEdit: '/api/5b9e5657d34e1', // 附件修改
    attachmentDel: '/api/5b9e56bab8c50', // 附件删除
    system: '/api/5b9b8e3acba88', // 系统配置
    systemEdit: '/api/5b9b90afc1276', // 系统配置编辑
    emailTest: '/api/5b9e2e440f85f', // 邮件测试
}

// 数据统计
export const statistics = {
    agent: '/statistics/agent', // 代理商注册统计
    application: '/statistics/application', // 应用绑定统计
    film: '/statistics/film' //影片操作统计
}

// 首页
export const home = {
    home: '/v1/home/index'
}

export default {
    BASE_URL,
    common,
    home,
    user,
    right,
    copyright,
    setting,
    financial,
    application,
    resource,
    file,
    normalsetting,
    statistics
}
