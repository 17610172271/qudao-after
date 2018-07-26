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

const notice = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
        let data = {
            id: Random.id(),
            film_name: Random.filmname(),
            check_name: Random.cname(),
            check_status: Random.checkstatus(),
            create_time: Random.datetime(),
            reason: Random.csentence(5,20),
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
Mock.mock('/v1/setting/notice', 'get', notice) // 我的消息 - 系统公告

const adminList = function () {
    let list = []
    for (let i = 0; i < 10; i++) {
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
Mock.mock('/v1/admin/userList', 'get', userList) // 管理员日志