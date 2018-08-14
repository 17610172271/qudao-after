// 引入mockjs
const Mock = require('mockjs')
// 获取 mock.Random 对象
const Random = Mock.Random
Random.extend({
    filmname: function(date) {
        var filmname = ['青春无敌', '杀破狼', '前任2', '少林寺', '神探狄仁杰', '头号玩家', '我不是药神', '赌侠1999', '碟中谍', '环太平洋', '后来的我们', '命运速递', '幕后玩家', '侏罗纪公园', '死神来了']
        return this.pick(filmname)
    },
    language: function (date) {
        var language = ['汉语', '英语', '日语', '法语', '俄语', '德语', '西班牙语', '泰语', '葡萄牙语']
        return this.pick(language)
    },
    checkstatus: function (date) {
        var checkstatus = ['待审核', '审核通过', '审核未通过']
        return this.pick(checkstatus)
    },
    status: function (date) {
        var status = ['已上线', '已下线']
        return this.pick(status)
    }
})
// mock一组数据 示例
const login = function () {
    return {
        msg: 'ok',
        code: 1,
        data: {
            userinfo: {
                token: 'askfdkasdfjksndkfsdkfjs',
                nickname: 'lk',
                sex: 0,
                mobile: 17611123456,
                avatar: '',
                username: 'likui2',
                email: 'likui@163.com'
            }
        }
    }
}
Mock.mock('/v1/user/login', 'post', login) // 登陆

const logout = function () {
    return {
        msg: 'ok',
        code: 1
    }
}
Mock.mock('/v1/user/logout', 'get', logout) // 退出登陆

const getNews = function () {
    return {
        code: 1,
        msg: 'ok',
        data: {
            message_num: Math.ceil(Math.random() * 10),
            notice_num: Math.ceil(Math.random() * 10)
        }
    }
}
Mock.mock('v1/Setting/get_num', 'get', getNews) // 获取消息数量

const homeData = function () {
    let tableData = []
    let enterData = []
    let checkData = []
    for (let i = 0; i < 30; i++) {
        let data = {
            date: Random.date(),
            num: Math.ceil(Math.random() * 10000)
        }
        tableData.push(data)
    }
    for (let i =0; i < 10; i++) {
        let enter = {
            id: Random.id(),
            name: Random.cname(),
            today_films: Math.ceil(Math.random() * 1000),
            pass_films: Math.ceil(Math.random() * 1000),
            wait_films: Math.ceil(Math.random() * 1000),
            notpass_films: Math.ceil(Math.random() * 1000),
            all_films: Math.ceil(Math.random() * 1000)
        }
        let check = {
            id: Random.id(),
            name: Random.cname(),
            pass_films: Math.ceil(Math.random() * 1000),
            wait_films: Math.ceil(Math.random() * 1000),
            notpass_films: Math.ceil(Math.random() * 1000),
            all_films: Math.ceil(Math.random() * 1000)
        }
        enterData.push(enter)
        checkData.push(check)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            copyright_num: 999,
            copyright_today: 19999,
            copyright_wait: 99,
            copyright_pass: 13888,
            copyright_notpass: 6666,
            echartsData: tableData,
            enterData: enterData,
            checkData:checkData
        }
    }
}
Mock.mock('/v1/home/index', 'get', homeData) // home数据

const copyrightList = function () {
let list = []
for (let i = 0; i < 10; i++) {
    let data = {
        id: Random.id(),
        film_name: Random.filmname(),
        copyright_name: Random.csentence(5, 10),
        regist_name: Random.cname(),
        copyright_id: Random.guid(),
        product_name: Random.csentence(3, 5),
        status: Random.status(),
        create_time: Random.datetime(),
        regist_time: Random.datetime(),
        check_time: Random.datetime(),
        remark: Random.csentence(5, 40)
    }
    list.push(data)
}
return {
    code: 1,
    msg: 'ok',
    data: {
        rows: list,
        total: 100
    }
}
}
Mock.mock('/v1/copyright/list', 'get', copyrightList) // 版权库列表

const copyrightHistory = function () {
    let list = []
    for (let i = 0; i < 8; i++) {
        let data = {
            id: Random.id(),
            film_name: Random.filmname(),
            operator: Random.cname(),
            operate_time: Random.datetime(),
            status: Random.status(),
            log: Random.csentence(5, 40)
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/copyright/history', 'get', copyrightHistory) // 版权库审核历史列表

const copyrightDetail = function () {
    return {
        code: 1,
        msg: 'ok',
        data: {
            id: Random.id(),
            film_name: Random.filmname(),
            copyright_name: Random.csentence(4, 10),
            copyright_id: Random.guid(),
            product_name: '电影',
            status: Random.status(),
            remark: Random.csentence(5,30)
        }
    }
}
Mock.mock('/v1/copyright/detail', 'get', copyrightDetail) // 版权详情

const copyrightCheck = function () {
    return {
        msg: 'ok',
        code: 1
    }
}
Mock.mock('/v1/copyright/check', 'get', copyrightCheck) // 版权库-审核

const copyrightEdit = function () {
    return {
        msg: 'ok',
        code: 1
    }
}
Mock.mock('/v1/copyright/edit', 'get', copyrightEdit) // 版权库-编辑

const copyrightDel = function () {
    return {
        msg: 'ok',
        code: 1
    }
}
Mock.mock('/v1/copyright/del', 'get', copyrightDel) // 版权库-删除

const copyrightRegist = function () {
    return {
        msg: 'ok',
        code: 1
    }
}
Mock.mock('/v1/copyright/regist', 'get', copyrightRegist) // 版权库-版权登记

const priceList = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            film_name: Random.filmname(),
            copyright_name: Random.csentence(5, 10),
            price: parseInt(Math.random()*10000),
            create_time: Random.datetime(),
            latest_time: Random.datetime()
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/financial/list', 'get', priceList) // 版权定价列表

const priceSet = function () {
    return {
        msg: 'ok',
        code: 1
    }
}
Mock.mock('/v1/copyright/priceSet', 'get', priceSet) // 版权定价-定价

const incomeList = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            film_name: Random.filmname(),
            num: parseInt(Math.random()*1000),
            income: parseInt(Math.random()*10000),
            ratio: parseInt(Math.random()*1000) / 100,
            date: Random.date()
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/financial/income', 'get', incomeList) // 版权收入列表

const infoList = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            copyright_name: Random.cname(),
            company_name: 'xxxx有限公司',
            company_type: '有限责任公司',
            legal_person: Random.cname(),
            contact_person: Random.cname(),
            contact_tel: 13993412938,
            address: Random.csentence(5,15),
            address1: Random.csentence(5,15)
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/setting/info', 'get', infoList) // 版权商信息管理

const infoDetail = function () {
    return {
        code: 1,
        msg: 'ok',
        data: {
            id: Random.id(),
            copyright_name: Random.cname(), // 版权商姓名
            company_name: 'xxxx有限公司', // 公司名
            regist_num: Random.guid(), // 营业注册号
            contact_person: Random.cname(), // 联系人
            license: Random.image(), // 营业执照
            contact_tel: 13993412938, // 联系人电话
            legal_person: Random.cname(), // 法人
            company_num: 12345678, // 公司固话
            organization_code: 123243465464564, // 组织机构代码
            registration_num: Random.guid(), // 纳税人识别号
            company_type: '有限责任公司', // 公司类型
            setup_time: Random.date(), //成立日期
            regist_address: '北京市朝阳区', // 注册地址
            regist_address1: '朝外街道', // 街道地址
            operate_address: '北京市朝阳区1', // 经营地址
            operate_address1: '朝外大街', //街道地址
            collection_name: Random.cname(), // 收款人姓名
            bank_num: 62293100034586574, // 银行账号
            bank_name: '中国工商银行' // 开户行
        }
    }
}
Mock.mock('/v1/setting/infoDetail', 'get', infoDetail) // 版权商信息-详情

const infoEdit = function () {
    return {
        msg: 'ok',
        code: 1
    }
}
Mock.mock('/v1/setting/infoEdit', 'get', infoEdit) // 版权商信息管理-编辑

const infoDel = function () {
    return {
        msg: 'ok',
        code: 1
    }
}
Mock.mock('/v1/setting/infoDel', 'get', infoDel) // 版权商信息管理-删除

const newsList = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            title: Random.csentence(5,20),
            send_time: Random.datetime(),
            read_time: Random.datetime(),
            status: Random.status()
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/setting/newsList', 'get', newsList) // 我的消息 - 消息通知

const newsRead = function () {
    return {
        msg: 'ok',
        code: 1
    }
}
Mock.mock('/v1/setting/newsRead', 'get', newsRead) // 我的消息-消息通知-标记已读

const newsDel = function () {
    return {
        msg: 'ok',
        code: 1
    }
}
Mock.mock('/v1/setting/newsDel', 'get', newsDel) // 我的消息-消息通知-删除

const noticeList = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            title: Random.csentence(5,20),
            send_time: Random.datetime(),
            read_time: Random.datetime(),
            status: Random.status()
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/setting/noticeList', 'get', noticeList) // 我的消息 - 系统公告

const noticeListRead = function () {
    return {
        msg: 'ok',
        code: 1
    }
}
Mock.mock('/v1/setting/noticeListRead', 'get', noticeListRead) // 我的消息-系统公告-标记已读

const noticeListDel = function () {
    return {
        msg: 'ok',
        code: 1
    }
}
Mock.mock('/v1/setting/noticeListDel', 'get', noticeListDel) // 我的消息-系统公告-删除

const notice = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            title: Random.filmname(),
            create_time: Random.datetime(),
            update_time: Random.datetime(),
            status: Random.status()
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/setting/notice', 'get', notice) // 系统公告

const noticeEdit = function () {
    return {
        msg: 'ok',
        code: 1
    }
}
Mock.mock('/v1/setting/noticeEdit', 'get', noticeEdit) // 系统公告-编辑

const noticeDel = function () {
    return {
        msg: 'ok',
        code: 1
    }
}
Mock.mock('/v1/setting/noticeDel', 'get', noticeDel) // 系统公告-删除

const adminList = function () {
    let list = []
    for (let i = 0; i < 3; i++) {
        let data = {
            id: Random.id(),
            username: Random.name(),
            name: Random.cname(),
            gender: '男',
            role: '管理员',
            email: Random.email(),
            tel: 13934293848,
            end_time: Random.datetime(),
            status: Random.status()
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/admin/adminList', 'get', adminList) // 管理员管理

const adminDetail = function () {
    return {
        code: 1,
        msg: 'ok',
        data: {
            id: Random.id(),
            role: Random.cname(), // 角色
            username: Random.name(),
            name: Random.cname(),
            gender: '男',
            password: '123456',
            defeat_times: Math.ceil(Math.random() * 10),
            role: '管理员',
            email: Random.email(),
            tel: 13934293848,
            status: Random.status()
        }
    }
}
Mock.mock('/v1/admin/adminDetail', 'get', adminDetail) // 管理员管理-详情

const adminReset = function () {
    return {
        msg: 'ok',
        code: 1
    }
}
Mock.mock('/v1/admin/adminReset', 'get', adminReset) // 管理员管理-密码重置

const adminAdd = function () {
    return {
        msg: 'ok',
        code: 1
    }
}
Mock.mock('/v1/admin/adminAdd', 'get', adminAdd) // 管理员管理-添加

const adminEdit = function () {
    return {
        msg: 'ok',
        code: 1
    }
}
Mock.mock('/v1/admin/adminEdit', 'get', adminEdit) // 管理员管理-编辑

const adminDel = function () {
    return {
        msg: 'ok',
        code: 1
    }
}
Mock.mock('/v1/admin/adminDel', 'get', adminDel) // 管理员管理-删除

const logList = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            username: Random.cname(),
            title: Random.csentence(4, 10),
            url: Random.url(),
            ip: Random.ip(),
            browser: 'Browser',
            create_time: Random.datetime()
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/admin/logList', 'get', logList) // 管理员日志

const logDetail = function () {
    return {
        code: 1,
        msg: 'ok',
        data: {
            id: Random.id(),
            admin_id: 3434,
            username: Random.cname(),
            url: Random.url(),
            title: Random.csentence(5,10),
            content: Random.csentence(5, 30),
            ip: Random.ip(),
            useragent: 'useragent',
            create_time: Random.datetime()
        }
    }
}
Mock.mock('/v1/admin/logDetail', 'get', logDetail) // 管理员日志-详情

const logDel = function () {
    return {
        msg: 'ok',
        code: 1
    }
}
Mock.mock('/v1/admin/logDel', 'get', logDel) // 管理员日志-删除

const userList = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            title: Random.csentence(4, 10),
            url: Random.url(),
            ip: Random.ip(),
            latest_time: Random.datetime()
        }
        list.push(data)
    }
    return {
        code: 1,
        msg: 'ok',
        data: {
            rows: list,
            total: 100
        }
    }
}
Mock.mock('/v1/user/userList', 'get', userList) // 用户管理列表

const userEdit = function () {
    return {
        msg: 'ok',
        code: 1
    }
}
Mock.mock('/v1/user/userEdit', 'get', userEdit)  // 个人配置
