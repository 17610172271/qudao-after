<template>
    <div class="">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="m-t-sm" v-loading="loading">
                    <div>
                        <search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>
                        <div class="page-toolbar clear">
                            <div class="pull-left toolbar-candle">
                                <a href="javascript:;" title="添加" @click="dailogShow('add')"
                                   class="app-add btn bg-blue1 text-white"><i class="fa fa-plus-square"></i>添加
                                </a>
                                <a href="javascript:;" title="删除" class="app-add btn bg-red1 text-white" @click="delItem(selectedGroup)"><i
                                    class="fa fa-trash"></i>删除</a>
                                <!-- <div class="app-del btn bg-red1 text-white"><i class="fa fa-minus-square"></i>删除</div> -->
                                <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i
                                    class="fa fa-refresh"></i></div>
                            </div>
                            <div class="pull-right clear">
                                <div class="pull-left m-r-sm opacity-8" title="列">
                                    <select-checkbox :list="showList" v-model="selectVal"
                                                     style="width: 60px;"></select-checkbox>
                                </div>
                                <div class="pull-left btn opacity-8 search-btn" :class="{'bg-eee': searchShow}" @click="searchShow = !searchShow"><i
                                    class="fa fa-search" title="搜索"></i></div>
                            </div>
                        </div>
                        <div class="lk-table m-t-sm">
                            <ul class="table-thead clear">
                                <!-- <li class="col-lg-1 col-md-1 col-sm-1 col-xs-1 clear app-first-item" v-if="selectVal.indexOf('ID')!=-1"><div class="pull-left"><input type="checkbox" v-model="selectAll"></div><div class="pull-left">ID</div></li> -->
                                <li class="col-xs-24 p-n" style="max-width: 40px;" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox v-model="selectAll">全选</el-checkbox>
                                </li>
                                <li class="col-xs-24 p-n" style="max-width: 80px;" v-show="selectVal.indexOf('ID')!=-1">ID</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('用户名')!=-1">用户名</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('昵称')!=-1">昵称</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('所属组别')!=-1">所属组别</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('Email')!=-1">Email</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('最后登录')!=-1">最后登录</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item, index) in data.rows" @click="selectItem(item.id)">
                                <li class="col-xs-24 p-n" style="max-width: 40px;" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                                </li>
                                <li class="col-xs-24 p-n" style="max-width: 80px;" :title="item.id" v-show="selectVal.indexOf('ID')!=-1">{{item.id}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.username" v-show="selectVal.indexOf('用户名')!=-1">{{item.username}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.nickname" v-show="selectVal.indexOf('昵称')!=-1">{{item.nickname}}</li>
                                <li class="col-xs-24 p-n over-omit" :title="item.groups_text" v-show="selectVal.indexOf('所属组别')!=-1">{{item.groups_text}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.email" v-show="selectVal.indexOf('Email')!=-1">{{item.email}}</li>
                                <li class="col-xs-24 p-n over-omit" :title="item.status" v-show="selectVal.indexOf('状态')!=-1">{{item.status}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="format(item.logintime*1000)" v-show="selectVal.indexOf('最后登录')!=-1">{{format(item.logintime*1000)}}</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                    <a href="javascript:;" title="重置密码" class="candle-btn btn" :class="{'disabled': item.group==1}"
                                       @click.stop="resetPsd(item.id)"><i class="fa fa-undo"></i></a>
                                    <a href="javascript:;" title="编辑" class="candle-btn btn" :class="{'disabled': item.group==1}"
                                       @click.stop="dailogShow('edit', item)"><i class="fa fa-edit"></i></a>
                                    <a href="javascript:;" title="删除" class="candle-btn btn" :class="{'disabled': item.group==1}"
                                       @click.stop="delItem([item.id])"><i class="fa fa-trash"></i></a>
                                </li>
                            </ul>
                        </div>
                        <div class="footer clear m-t-md">
                            <div class="pull-left news-record text-lg">
                                <span
                                    v-show="data.rows.length>0">显示{{offset + 1}}到{{offset + data.rows.length}}条消息，</span>共<span
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
                </div>
            </div>
        </div>
        <el-dialog
            :title="type==='add'?'添加':'编辑'"
            :visible.sync="centerDialogVisible"
            custom-class="dialog-modal1"
            :modal-append-to-body="false"
            :close-on-click-modal="false">
            <div v-loading="dailogLoading">
                <div class="clear m-b-sm">
                    <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name p-n">所属组别:</div>
                    <div class="col-xs-12 col-sm-8 team-select">
                        <el-select v-model="dailogVal.group" placeholder="请选择" popper-class="select-team">
                            <el-option
                                v-for="(item, index) in teamOptions"
                                :key="index"
                                :label="item.name"
                                :disabled="item.disabled"
                                :value="item.value">
                            </el-option>
                        </el-select>
                        <p v-if="groupError" class="text-red"><span class="fa fa-close m-r-xs"></span>请选择所属组别</p>
                    </div>
                </div>
                <div class="clear m-b-sm">
                    <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name p-n">用户名:</div>
                    <div class="col-xs-12 col-sm-8">
                        <el-input placeholder="请输入用户名" v-model="dailogVal.username" @blur="validateUsername"></el-input>
                        <p v-if="usernameError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入3-12位英文、数字、下划线组成的用户名</p>
                    </div>
                </div>
                <div class="clear m-b-sm">
                    <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name p-n">Email:</div>
                    <div class="col-xs-12 col-sm-8">
                        <el-input placeholder="请输入Email" v-model="dailogVal.email" @blur="validateEmail"></el-input>
                        <p v-if="emailError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入有效的邮箱地址</p>
                    </div>
                </div>
                <div class="clear m-b-sm">
                    <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name p-n">昵称:</div>
                    <div class="col-xs-12 col-sm-8">
                        <el-input placeholder="请输入昵称" v-model="dailogVal.nickname" @blur="validateNickname"></el-input>
                        <p v-if="nicknameError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入昵称</p>
                    </div>
                </div>
                <div class="clear m-b-sm">
                    <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name p-n">手机号:</div>
                    <div class="col-xs-12 col-sm-8">
                        <el-input placeholder="请输入手机号" v-model="dailogVal.phone" @blur="validateTel"></el-input>
                        <p v-if="telError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入有效的手机号码</p>
                    </div>
                </div>
                <div class="clear m-b-sm">
                    <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name p-n">密码:</div>
                    <div class="col-xs-12 col-sm-8">
                        <el-input placeholder="请输入密码" type="password" v-model="dailogVal.password" @blur="validatePsd"></el-input>
                        <p v-if="psdError" class="text-red"><span class="fa fa-close m-r-xs"></span>请输入6-20位英文、数字、下划线组成的密码</p>
                    </div>
                </div>
                <div class="clear m-b-sm" v-if="type === 'edit'">
                    <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name p-n">登录失败次数:</div>
                    <div class="col-xs-12 col-sm-8">
                        <el-input placeholder="请输入登录失败次数" v-model="dailogVal.loginfailure"></el-input>
                    </div>
                </div>
                <div class="clear m-b-sm">
                    <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name p-n">状态:</div>
                    <div class="col-xs-12 col-sm-8 line-height-40">
                        <el-radio label="normal" v-model="dailogVal.status">正常</el-radio>
                        <el-radio label="hidden" v-model="dailogVal.status">隐藏</el-radio>
                    </div>
                </div>
                <div class="text-center m-t-lg">
                    <el-button type="primary" @click="dailogSubmit">确 定</el-button>
                    <el-button @click="dailogReset">重 置</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
    import SubHeader from '../common/subheader'
    import api from '@/api'
    import format from '@/tools/format'
    import SelectCheckbox from '@/components/SelectCheckbox'
    import SearchIpts from '../common/searchIpts'
    export default {
        data: () => ({
            data: {
                rows: [],
                total: 1
            },
            value: null,
            centerDialogVisible: false,
            type: 'add',
            dailogVal: {
                group: 100,
                username: null,
                email: null,
                nickname: null,
                phone: null,
                password: null,
                loginfailure: null,
                status: 'normal'
            },
            groupError: false,
            usernameError: false,
            emailError: false,
            nicknameError: false,
            telError: false,
            psdError: false,
            adminDetail: '',
            selectVal: ['checkbox', 'ID', '用户名', '昵称', '所属组别', 'Email', '状态', '最后登录', '操作'],
            selectedGroup: [],
            selectAll: false,
            showList: ['checkbox', 'ID', '用户名', '昵称', '所属组别', 'Email', '状态', '最后登录', '操作'],
            searchOptions: [
                {
                    type: 'text',
                    name: '用户名',
                    value: null
                },
                {
                    type: 'text',
                    name: '昵称',
                    value: null
                },
                {
                    type: 'text',
                    name: 'E-mail',
                    value: null
                }
            ],
            options: [10, 25, 50],
            teamOptions: [
                {
                    name: '管理员',
                    value: 9999999999,
                    disabled: true
                }
            ],
            searchShow: false,
            limit: 10,
            page: 1,
            loading: false,
            dailogLoading: false,
            subNavList: {
                parentNode: {
                    name: '权限管理',
                    router: {
                        name: 'right_admin'
                    }
                },
                childNode: {
                    name: '管理员管理',
                    desc: '管理员列表信息及操作',
                    router: {
                        name: 'right_admin'
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
            }
        },
        methods: {
            getList () {
                this.loading = true
                this.$http.post(api.right.admin, {
                    page: this.page,
                    limit: this.limit,
                    options: {
                        username: this.searchOptions[0].value,
                        nickname: this.searchOptions[1].value,
                        email: this.searchOptions[2].value
                    }
                }).then(res => {
                    this.selectedGroup = []
                    this.loading = false
                    if (res.data.code === 1) {
                        this.data = res.data.data
                        this.selectedGroup = []
                    } else {
                        this.data.rows = []
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            selectItem (id) {
                if (this.selectedGroup.indexOf(id) !== -1) {
                    this.selectedGroup.splice(this.selectedGroup.indexOf(id), 1)
                } else {
                    this.selectedGroup.push(id)
                }
            },
            doSearch (data) {
                this.page = 1
                this.searchOptions = data
                this.getList()
            },
            refresh () {
                this.getList()
            },
            resetPsd (id) {
                this.$confirm('此操作将重置该用户密码, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(api.right.passReset, {
                        params: {
                            id: id
                        }
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '密码重置成功!'
                            })
                            this.getList()
                        } else {
                            this.$message({
                                type: 'warning',
                                message: res.data.msg
                            })
                        }
                    })
                }).catch(() => {})
            },
            delItem(id) {
                if (id.length > 0) {
                    this.$confirm(id.length>1 ? '此操作将批量删除选中用户, 是否继续?' : '此操作将删除该用户, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.get(api.right.adminDel, {
                            params: {
                                id: id.join(',')
                            }
                        }).then(res => {
                            if (res.data.code === 1) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                })
                                this.getList()
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.data.msg
                                })
                            }
                        })
                    }).catch(() => {})
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请选中需要操作的项'
                    })
                }
            },
            resetData () {
                this.dailogVal = {
                    group: 100,
                    username: null,
                    email: null,
                    nickname: null,
                    phone: null,
                    password: null,
                    login_default: null,
                    status: 'normal'
                }
            },
            dailogShow(type, item) {
                this.groupError = false
                this.usernameError = false
                this.emailError = false
                this.nicknameError = false
                this.telError = false
                this.psdError = false
                this.type = type
                this.centerDialogVisible = true
                if (this.teamOptions.length === 1) {
                    this.$http.get(api.right.adminTeam).then(res => {
                        if (res.data.code === 1) {
                            this.teamOptions[0].name = res.data.data.group
                            res.data.data.list.map(val => {
                                this.teamOptions.push({
                                    name: val.name,
                                    value: val.id
                                })
                            })
                        }
                    })
                }
                if (type === 'edit') {
                    this.adminDetail = JSON.parse(JSON.stringify(item))
                    this.dailogVal = JSON.parse(JSON.stringify(item))
                    this.dailogVal.status = this.dailogVal.status === '正常' ?  'normal' : 'hidden'
                } else {
                    this.resetData()
                }
            },
            dailogReset () {
                if (this.type === 'add') {
                    this.resetData()
                } else {
                    this.dailogVal = JSON.parse(JSON.stringify(this.adminDetail))
                    this.dailogVal.status = this.dailogVal.status === '正常' ?  'normal' : 'hidden'
                }
            },
            dailogSubmit () {
                if (!this.dailogVal.group) {
                    this.groupError = true
                } else {
                    this.groupError = false
                }
                this.validateUsername()
                this.validateEmail()
                this.validateNickname()
                this.validateTel()
                if (this.type === 'add') this.validatePsd()

                if (this.type === 'add') {
                    if (this.groupError || this.usernameError || this.emailError || this.nicknameError || this.telError || this.psdError) return
                    if (this.dailogVal.username && this.dailogVal.group && this.dailogVal.email && this.dailogVal.nickname && this.dailogVal.phone
                        && this.dailogVal.password && this.dailogVal.status) {
                        this.dailogLoading = true
                        this.$http.post(api.right.adminAdd, {
                            row: {
                                nickname: this.dailogVal.nickname,
                                username: this.dailogVal.username,
                                email: this.dailogVal.email,
                                password: this.dailogVal.password,
                                phone: this.dailogVal.phone,
                                status: this.dailogVal.status
                            },
                            group: this.dailogVal.group
                        }).then(res => {
                            this.dailogLoading = false
                            if (res.data.code === 1) {
                                this.$message({
                                    type: 'success',
                                    message: '用户信息添加完成'
                                })
                                this.getList()
                                this.centerDialogVisible = false
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.data.msg
                                })
                            }
                        })
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '请输入内容'
                        })
                    }
                } else {
                    if (this.groupError || this.usernameError || this.emailError || this.nicknameError || this.telError) return
                    if (this.dailogVal.username && this.dailogVal.group && this.dailogVal.email && this.dailogVal.nickname && this.dailogVal.phone && this.dailogVal.status) {
                        this.dailogLoading = true
                        this.$http.post(api.right.adminEdit, {
                            row: {
                                nickname: this.dailogVal.nickname,
                                username: this.dailogVal.username,
                                email: this.dailogVal.email,
                                password: $.trim(this.dailogVal.password) ? $.trim(this.dailogVal.password) : '',
                                phone: this.dailogVal.phone,
                                loginfailure: this.dailogVal.loginfailure,
                                status: this.dailogVal.status
                            },
                            id: this.dailogVal.id,
                            group: this.dailogVal.group
                        }).then(res => {
                            this.dailogLoading = false
                            if (res.data.code === 1) {
                                this.$message({
                                    type: 'success',
                                    message: '用户信息编辑成功'
                                })
                                this.getList()
                                this.centerDialogVisible = false
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.data.msg
                                })
                            }
                        })
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '请输入内容'
                        })
                    }
                }
            },
//            验证错误
            validateUsername () {
                if (!this.dailogVal.username || !/^[a-zA-Z0-9_]{3,12}$/.test(this.dailogVal.username)) {
                    this.usernameError = true
                } else {
                    this.usernameError = false
                }
            },
            validateEmail () {
                if (!this.dailogVal.email || !/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.dailogVal.email)) {
                    this.emailError = true
                } else {
                    this.emailError = false
                }
            },
            validateNickname () {
                if (!this.dailogVal.nickname) {
                    this.nicknameError = true
                } else {
                    this.nicknameError = false
                }
            },
            validateTel () {
                if (!this.dailogVal.phone || !/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.test(this.dailogVal.phone)) {
                    this.telError = true
                } else {
                    this.telError = false
                }
            },
            validatePsd () {
                if (!this.dailogVal.password || !/^[a-zA-Z0-9_]{6,20}$/.test(this.dailogVal.password)) {
                    this.psdError = true
                } else {
                    this.psdError = false
                }
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
                if (val.length === this.data.rows.length) {
                    this.selectAll = true
                } else {
                    this.selectAll = false
                }
            },
            selectAll (val) {
                if (val) {
                    this.selectedGroup = []
                    this.data.rows.map(val => {
                        this.selectedGroup.push(val.id)
                    })
                } else {
                    if (this.selectedGroup.length !== this.data.rows.length - 1) {
                        this.selectedGroup = []
                    }
                }
            },
            page (val) {
                this.$router.replace({name: 'right_admin', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            },
            'dailogVal.group' (val) {
                if (!this.dailogVal.group) {
                    this.groupError = true
                } else {
                    this.groupError = false
                }
            }
        }
    }
</script>
<style scoped>
    .lk-table .p-n {
        padding-left: 0;
        padding-right: 0;
    }

</style>
