<template>
    <div class="scroll-x">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="m-t-md bg-white">
                <div class="col-xs-12 col-lg-4">
                    <div class="border-top-blue bg-white">
                        <h3 class="text-md p-l-sm">个人配置</h3>
                        <div class="avatar-other-container">
                            <div class="setting-avatar-container"><img :src="userData.avatar || '../../../static/img/home/avatar.png'" alt="avatar" width="100%" height="100%"></div>
                            <div class="text-xxlg text-center m-t-sm">李奎</div>
                            <div class="text-sm text-muted text-center">601351324@qq.com</div>
                        </div>
                        <div class="form-container p-md">
                            <div class="form-item-container">
                                <div class="m-b-xs">用户名:</div>
                                <div>
                                    <el-input disabled v-model="userData.username"></el-input>
                                </div>
                            </div>
                            <div class="form-item-container m-t-sm">
                                <div class="m-b-xs">Email:</div>
                                <div>
                                    <el-input placeholder="请输入Email" v-model="userData.email"></el-input>
                                </div>
                            </div>
                            <div class="form-item-container m-t-sm">
                                <div class="m-b-xs">昵称:</div>
                                <div>
                                    <el-input placeholder="请输入昵称" v-model="userData.nickname"></el-input>
                                </div>
                            </div>
                            <div class="form-item-container m-t-sm">
                                <div class="m-b-xs">手机号:</div>
                                <div>
                                    <el-input placeholder="请输入手机号" v-model="userData.mobile"></el-input>
                                </div>
                            </div>
                            <div class="form-item-container m-t-sm">
                                <div class="m-b-xs">密码:</div>
                                <div>
                                    <el-input placeholder="请输入密码" type="password" v-model="userData.password"></el-input>
                                </div>
                            </div>
                            <div class="form-item-container m-t-md">
                                <button class="btn bg-blue1 text-white" @click="submit">提交</button>
                                <button class="btn bg-gray1 text-white" @click="reset">重置</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-lg-8">
                    <div class="bg-white p-sm">
                        <el-tabs type="card" class="setting-tab">
                            <el-tab-pane>
                                <span slot="label"><i class="fa fa-list-ul m-r-xs"></i>用户管理</span>
                                <div>
                                    <div class="page-toolbar clear">
                                        <div class="pull-left toolbar-candle">
                                            <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i
                                                class="fa fa-refresh"></i></div>
                                        </div>
                                        <div class="pull-right clear">
                                            <div class="pull-left m-r-sm opacity-8" title="列">
                                                <select-checkbox :list="showList" v-model="selectVal"
                                                                 style="width: 60px;"></select-checkbox>
                                            </div>
                                            <div class="pull-left btn opacity-8 search-btn"
                                                 @click="searchShow = !searchShow"><i class="fa fa-search"
                                                                                      title="搜索"></i></div>
                                        </div>
                                    </div>
                                    <div class="lk-table m-t-sm">
                                        <ul class="table-thead clear">

                                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('ID')!=-1">ID</li>
                                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('标题')!=-1">标题</li>
                                            <li class="col-xs-5 p-n" v-show="selectVal.indexOf('链接')!=-1">链接</li>
                                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('IP')!=-1">IP</li>
                                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作时间')!=-1">操作时间</li>
                                        </ul>
                                        <ul class="table-tbody clear" v-for="(item,index) in data.rows">
                                            <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('ID')!=-1">{{item.id}}</li>
                                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('标题')!=-1">{{item.title}}</li>
                                            <li class="col-xs-5 p-n over-omit" v-show="selectVal.indexOf('链接')!=-1">{{item.url}}</li>
                                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('IP')!=-1">{{item.ip}}</li>
                                            <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('操作时间')!=-1">{{item.latest_time}}</li>
                                        </ul>
                                    </div>
                                    <div class="footer clear m-t-md">
                                        <div class="pull-left news-record text-lg">
                                            <span v-show="data.rows.length>0">显示{{offset + 1}}到{{offset + data.rows.length}}条消息，</span>共<span
                                            class="text-blue">{{data.total}}</span>条记录 每页显示
                                            <el-select v-model="limit" placeholder="请选择" style="width: 66px;">
                                                <el-option
                                                    v-for="(item,index) in options"
                                                    :key="index"
                                                    :label="item"
                                                    :value="item">
                                                </el-option>
                                            </el-select>
                                            条记录
                                        </div>
                                        <div class="pull-right">
                                            <el-pagination
                                                background
                                                layout="prev, pager, next"
                                                :current-page.sync="page"
                                                :page-count="pages">
                                            </el-pagination>
                                        </div>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import SubHeader from '../common/subheader'
    import api from '@/api'
    import format from '@/tools/format'
    import SelectCheckbox from '@/components/SelectCheckbox'
    import SearchIpts from '../common/searchIpts'
    import { mapGetters, mapActions } from 'vuex'
    export default {
        data: () => ({
            data: {
                rows: [],
                total: 1
            },
            selectVal: ['ID', '标题', '链接', 'IP', '操作时间'],
            selectedGroup: [],
            selectAll: false,
            showList: ['ID', '标题', '链接', 'IP', '操作时间'],
            searchOptions: [
                {
                    type: 'text',
                    name: '名称',
                    value: null
                },
                {
                    type: 'text',
                    name: '权重',
                    value: null
                },
                {
                    type: 'select',
                    name: '状态',
                    value: null,
                    options: [
                        {
                            value: 1,
                            label: '选项1'
                        },
                        {
                            value: 2,
                            label: '选项2'
                        },
                        {
                            value: 3,
                            label: '选项3'
                        }
                    ]
                }
            ],
            options: [10, 25, 50],
            searchShow: false,
            limit: 10,
            page: 1,
            loading: false,
            userData: {},
            subNavList: {
                parentNode: {
                    name: '常规管理',
                    router: {
                        name: 'normalsetting_person'
                    }
                },
                childNode: {
                    name: '个人配置',
                    desc: '主要用来绑定应用和应用列表的查看',
                    router: {
                        name: 'normalsetting_person'
                    }
                }
            }
        }),
        components: {
            SubHeader,
            SelectCheckbox,
            SearchIpts
        },
        computed: {
            pages () {
                return this.data ? Math.ceil(this.data.total / this.limit) : 1
            },
            offset () {
                return (this.page - 1) * this.limit
            },
            ...mapGetters([
                'getAuthInfo'
            ])
        },
        methods: {
            getList () {
                this.loading = true
                this.userData = JSON.parse(JSON.stringify(this.getAuthInfo))
                this.$http.get(api.user.userList, {
                    params: {
//                    offset: this.offset,
//                    limit: this.limit,
//                    token: this.$bus.token,
//                    webname: this.searchName,
//                    audit_status: this.status ? this.status : null,
//                    bind_time: this.calendarVal
                    }
                }).then(res => {
                    this.loading = false
                    if (res.data.code === 1) {
                        this.data = res.data.data
                        console.log(this.data)
                    } else {
                        this.data.rows = []
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            submit () {
                this.$http.get(api.user.userEdit, {
                    params: {
//                        ...this.userData
                    }
                }).then(res => {
                    if (res.data.code === 1) {
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        })
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            reset () {
                this.userData = JSON.parse(JSON.stringify(this.getAuthInfo))
            },
            doSearch (data) {
                this.searchOptions = data
                console.log(this.searchOptions)
            },
            refresh () {
                this.getList()
            },
            addPage () {
                if (this.page < this.pages) this.page += 1
            },
            delPage () {
                if (this.page > 1) this.page -= 1
            },
            format: format
        },
        created () {
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
            this.getList()
        },
        watch: {
            selectedGroup (val) {
                console.log(val)
                if (val.length === this.data.rows.length) {
                    this.selectAll = true
                }
            },
            selectAll (val) {
                if (val) {
                    this.selectedGroup = []
                    this.data.rows.map(val => {
                        this.selectedGroup.push(val.id)
                    })
                } else {
                    this.selectedGroup = []
                }
            },
            page (val) {
                // this.$router.replace({name: 'application_list', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            }
        }
    }
</script>
<style>
    .setting-avatar-container {
        width: 100px;
        height: 100px;
        border: 0.5px solid #f5f5f5;
        margin: 0 auto;
    }

    .setting-tab #tab-0 {
        border-bottom: 1px solid #fff;
    }
</style>
