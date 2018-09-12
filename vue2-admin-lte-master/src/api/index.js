// all api
export const BASE_URL = '/v1'

// 通用api
export const common = {
    upload: '/api/5b74dbba919d0', // 上传文件
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
    list: '/application/list', // 应用审核列表
    history: '/application/history', // 应用审核历史列表
    checkApp: '/application/checkPass', // 审核应用
    freeze: '/application/freeze', // 冻结应用
}
// 资源信息管理
export  const resource = {
    film: '/resource/film', // 影片库
    agent: '/resource/agent', // 代理商管理
}
// 文件管理
export  const file = {
    doc: '/file/doc', // 文档管理
    docDel: '/file/docDel', // 文档删除
    sdk: '/file/sdk', // sdk管理
}
// 用户功能相关
export const user = {
    login: '/api/5b986c8703d90', // 用户登录
    logout: '/api/5b986cc1c7013', // 退出登录
    userList: '/v1/user/userList', // 用户管理列表
    userEdit: '/v1/user/userEdit', // 个人配置
    findPsd: '/v1/user/lostpwd' // 找回密码
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
    adminTeam: '/api/5b72b499caa23', // 管理员组别
    admin: '/api/5b97b5cecad8c', // 管理员管理
    adminAdd: '/api/5b9893a41a3d4', // 管理员新增
    adminEdit: '/api/5b98941c187f3', // 管理员编辑
    passReset: '/api/5b863c5aa6915', // 重置管理员密码
    adminDel: '/api/5b9894d269e68', // 管理员删除
    log: '/api/5b727e92a9c0f', //管理员日志
    logDel: '/api/5b7290d07b8f6' // 日志删除
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
    newsList: '/v1/setting/newsList', //消息通知tab列表
    newsRead: '/v1/setting/newsRead', // 消息通知-标记已读
    newsDel: '/v1/setting/newsDel', // 消息通知-删除
    noticeList: '/v1/setting/noticeList', //消息公告tab列表
    noticeListRead: '/v1/setting/noticeListRead', // 消息公告-标记已读
    noticeListDel: '/v1/setting/noticeListDel', // 消息公告-删除
    notice: '/v1/setting/notice', // 系统公告列表
    noticeEdit: '/v1/setting/noticeEdit', // 系统公告-编辑
    noticeDel: '/v1/setting/noticeDel' // 系统公告-删除
}

// 常规设置
export const normalsetting = {
    attachment: '/normalsetting/attachment', // 附件管理列表
    attachmentDel: '/normalsetting/attachmentDel', // 附件删除
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
