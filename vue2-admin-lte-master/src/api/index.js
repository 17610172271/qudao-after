// all api
export const BASE_URL = '/v1'

// 通用api
export const common = {
    auth: 'v1/common/auth_check', // auth效验
    province: '/v1/common/getProvince',
    city: '/v1/common/getCity',
    area: '/v1/common/getArea',
    upload: '/v1/common/upload',
    codeGet: '/v1/captcha/get', // 图片验证码获取
    codeCheck: '/v1/captcha/check', // 图片验证
    telCodeSend: '/v1/sms/send', // 手机验证码发送
    telCodeCheck: '/v1/sms/check', // 手机验证码效验
    news: 'v1/Setting/get_num'
}
// 应用管理
export  const application = {
    list: '/application/list', // 应用审核列表
}
// 资源信息管理
export  const resource = {
    film: '/resource/film', // 影片库
    agent: '/resource/agent', // 代理商管理
}
// 文件管理
export  const file = {
    doc: '/file/doc', // 文档管理
    sdk: '/file/sdk', // sdk管理
}
// 用户功能相关
export const user = {
    login: '/v1/user/login', // 用户登录
    logout: '/v1/user/logout', // 退出登录
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
export const admin = {
    admin: '/v1/admin/adminList', // 管理员管理
    adminReset: '/v1/admin/adminReset', // 管理员管理-密码重置
    adminDetail: '/v1/admin/adminDetail', // 管理员管理-详情
    adminEdit: '/v1/admin/adminEdit', // 管理员管理-编辑
    adminAdd: '/v1/admin/adminAdd', // 管理员管理-添加
    adminDel: '/v1/admin/adminReset', // 管理员管理-删除
    log: '/v1/admin/logList', // 管理员日志-列表
    logDetail: '/v1/admin/logDetail', // 管理员日志-详情
    logDel: '/v1/admin/logDel' // 管理员日志-删除
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
    info: '/v1/setting/info', // 版权商信息管理
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

// 首页
export const home = {
    home: '/v1/home/index'
}

export default {
    BASE_URL,
    common,
    home,
    user,
    admin,
    copyright,
    setting,
    financial,
    application,
    resource,
    file
}
