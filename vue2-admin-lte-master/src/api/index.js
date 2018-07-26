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
// 用户功能相关
export const user = {
    login: '/v1/user/login', // 用户登录
    logout: '/v1/user/logout', // 退出登录
    userList: '/v1/admin/userList', // 用户管理列表
    findPsd: '/v1/user/lostpwd' // 找回密码
}

// 版权管理
export const copyright = {
    list: '/v1/copyright/list', // 版权库列表
    options: 'v1/film/get_search' // 影片类型选项
}

// 用户管理
export const admin = {
    admin: '/v1/admin/adminList', // 管理员管理
    log: '/v1/admin/logList' // 管理员日志
}
// 财务管理
export const financial = {
    list: '/v1/financial/list', // 版权定价
    income: '/v1/financial/income' // 收入统计
}

// 系统设置
export const setting = {
    info: '/v1/setting/info', // 版权商信息管理
    newsList: '/v1/setting/newsList', //消息通知tab列表
    noticeList: '/v1/setting/noticeList', //消息公告tab列表
    notice: '/v1/setting/notice' //系统公告列表
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
    financial
}
