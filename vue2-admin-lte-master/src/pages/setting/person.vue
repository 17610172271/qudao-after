<template>
    <div class="">
        <div class="p-md">
            <sub-header :list="subNavList"></sub-header>
            <div class="m-t-md clear">
                <div class="col-xs-12 col-lg-4 p-n" v-loading="settingLoading" style="position: relative;">
                    <div class="border-top-blue bg-white">
                        <h3 class="text-md p-l-sm">个人配置</h3>
                        <div class="avatar-other-container">
                            <label class="setting-avatar-container bg-f5 block cursor-p relative">
                                <div class="avatar-modal">点击编辑</div>
                                <img :src="userData.avatar || '../../../static/img/home/avatar.png'" width="100%" height="100%" alt="avatar">
                                <el-upload
                                    :action="uploadUrl"
                                    class="pos-upload1"
                                    :on-success="avatarUpload"
                                    :before-upload="uploadBefore"
                                    accept="image/*"
                                    :headers="header"
                                    :show-file-list="false"
                                    list-type="text">
                                    <!--<a href="javascript:;" class="btn bg-blue1 text-white add-upload-btn">上传</a>-->
                                </el-upload>
                            </label>
                            <div class="text-xxlg text-center m-t-sm">{{userData.nickname}}</div>
                            <div class="text-sm text-muted text-center">{{userData.email}}</div>
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
                                    <el-input placeholder="请输入手机号" v-model="userData.phone"></el-input>
                                </div>
                            </div>
                            <!--<div class="form-item-container m-t-sm">-->
                            <!--<div class="m-b-xs">密码:</div>-->
                            <!--<div>-->
                            <!--<el-input placeholder="请输入密码"></el-input>-->
                            <!--</div>-->
                            <!--</div>-->
                            <div class="form-item-container m-t-md">
                                <button class="btn bg-blue1 text-white" @click="updateInfo">提交</button>
                                <button class="btn btn-default" @click="goEditPass">修改密码</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-lg-8 usersetting-list" v-loading="loading">
                    <div class="bg-white scroll-x">
                        <div class="bg-white p-sm usersetting-container">
                            <el-tabs type="card" class="setting-tab">
                                <el-tab-pane>
                                    <span slot="label"><i class="fa fa-list-ul m-r-xs" style="color: #fff;"></i>用户管理</span>
                                    <div>
                                        <!--<div class="page-toolbar clear">-->
                                            <!--<div class="pull-left toolbar-candle">-->
                                                <!--<div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i-->
                                                    <!--class="fa fa-refresh"></i></div>-->
                                            <!--</div>-->
                                            <!--<div class="pull-right clear">-->
                                                <!--<div class="pull-left m-r-sm opacity-8" title="列">-->
                                                    <!--<select-checkbox :list="showList" v-model="selectVal"-->
                                                                     <!--style="width: 60px;"></select-checkbox>-->
                                                <!--</div>-->
                                                <!--&lt;!&ndash;<div class="pull-left btn opacity-8 search-btn"&ndash;&gt;-->
                                                <!--&lt;!&ndash;@click="searchShow = !searchShow"><i class="fa fa-search" title="搜索"></i>&ndash;&gt;-->
                                                <!--&lt;!&ndash;</div>&ndash;&gt;-->
                                            <!--</div>-->
                                        <!--</div>-->
                                        <div class="lk-table">
                                            <ul class="table-thead clear">

                                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
                                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('标题')!=-1">标题</li>
                                                <li class="col-xs-5 p-n" v-show="selectVal.indexOf('链接')!=-1">链接</li>
                                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('IP')!=-1">IP</li>
                                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作时间')!=-1">操作时间
                                                </li>
                                            </ul>
                                            <ul class="table-tbody clear" v-for="(item,index) in data.rows">
                                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('序号')!=-1">
                                                    {{offset + index + 1}}
                                                </li>
                                                <li class="col-xs-2 p-n over-omit" :title="item.title" v-show="selectVal.indexOf('标题')!=-1">
                                                    {{item.title}}
                                                </li>
                                                <li class="col-xs-5 p-n over-omit" :title="item.url" v-show="selectVal.indexOf('链接')!=-1">
                                                    {{item.url}}
                                                </li>
                                                <li class="col-xs-2 p-n over-omit" :title="item.ip" v-show="selectVal.indexOf('IP')!=-1">
                                                    {{item.ip}}
                                                </li>
                                                <li class="col-xs-2 p-n over-omit" :title="format(item.createtime*1000)"
                                                    v-show="selectVal.indexOf('操作时间')!=-1">{{format(item.createtime*1000)}}
                                                </li>
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
        <el-dialog
            title="修改密码"
            :visible.sync="centerDialogVisible"
            custom-class="dialog-modal3 dailog-p-t-n"
            :modal-append-to-body="false"
            :close-on-click-modal="false">
            <div class="p-md setting-psd" v-loading="dailogLoading">
                <div class="form-item-container m-t-sm clear">
                    <div class="m-b-xs p-n text-right line-height-40 col-xs-12 col-sm-2">旧密码:</div>
                    <div class="col-xs-12 col-sm-9">
                        <el-input type="password" style="max-width: 300px;" maxlength="20" placeholder="请输入原密码" v-model="dailogVal.oldPsd"></el-input>
                    </div>
                </div>
                <div class="form-item-container m-t-sm clear">
                    <div class="m-b-xs p-n text-right line-height-40 col-xs-12 col-sm-2">新密码:</div>
                    <div class="col-xs-12 col-sm-9">
                        <el-input type="password" style="max-width: 300px;" maxlength="20" placeholder="请输入新密码" @blur="validatePass" v-model="dailogVal.newPsd"></el-input>
                        <p class="text-red" v-show="validatePsd"><span class="fa fa-close m-r-sm"></span>密码为6-20位字母、数字及下划线组合</p>
                    </div>
                </div>
                <div class="form-item-container m-t-sm clear">
                    <div class="m-b-xs p-n text-right line-height-40 col-xs-12 col-sm-2">确认密码:</div>
                    <div class="col-xs-12 col-sm-9">
                        <el-input type="password" style="max-width: 300px;" maxlength="20" placeholder="请再次输入密码" @blur="confirmPsd" v-model="dailogVal.rePsd"></el-input>
                        <p class="text-red" v-show="confirm"><span class="fa fa-close m-r-sm"></span>两次输入密码不一致</p>
                    </div>
                </div>
                <div class="form-item-container m-t-sm">
                    <div class="col-xs-offset-2 p-l-sm">
                        <a href="javascript:;" class="btn bg-blue1 text-white m-r-sm" @click="editPsd">修改</a>
                        <a href="javascript:;" class="btn btn-default" @click="centerDialogVisible=false">取消</a>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
    import { mapGetters, mapActions } from 'vuex'
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
            userData: {},
            centerDialogVisible: false,
            dailogVal: {
                oldPsd: null,
                newPsd: null,
                rePsd: null
            },
            confirm: false,
            validatePsd: false,
            selectVal: ['序号', '标题', '链接', 'IP', '操作时间'],
            selectedGroup: [],
            selectAll: false,
            showList: ['序号', '标题', '链接', 'IP', '操作时间'],
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
            settingLoading: false,
            dailogLoading: false,
            subNavList: {
                parentNode: {
                    name: '系统设置',
                    router: {
                        name: 'setting_news'
                    }
                },
                childNode: {
                    name: '个人配置',
                    desc: '主要用来绑定应用和应用列表的查看',
                    router: {
                        name: 'setting_person'
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
            ]),
            uploadUrl () {
                return api.common.upload
            },
            header () {
                return {
                    ContentType: 'application/x-www-form-urlencoded',
                    'user-token': this.getAuthInfo['user-token'] || ''
                }
            }
        },
        methods: {
            getList () {
                this.userData = JSON.parse(JSON.stringify(this.getAuthInfo))
                this.loading = true
                this.$http.get(api.user.userList, {
                    params: {
                        page: this.page,
                        limit: this.limit
                    }
                }).then(res => {
                    this.loading = false
                    if (res.data.code === 1) {
                        this.data = res.data.data
                    } else {
                        this.data.rows = []
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            updateInfo () {
                this.settingLoading = true
                this.$http.post(api.user.userEdit, {
                    row: {
                        avatar: this.userData.avatar,
                        email: this.userData.email,
                        nickname: this.userData.nickname,
                        phone: this.userData.phone
                    }
                }).then(res => {
                    this.settingLoading = false
                    if (res.data.code === 1) {
                        window.sessionStorage.setItem('authInfo', JSON.stringify({
                            ...res.data.data,
                            group_id: this.getAuthInfo.group_id
                        }))
                        this.setAuthInfo({
                            ...res.data.data,
                            group_id: this.getAuthInfo.group_id
                        })
                        this.$message({
                            type: 'success',
                            message: '个人信息修改成功'
                        })
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            uploadBefore () {
                this.settingLoading = true
            },
            avatarUpload (res) {
                this.settingLoading = false
                if (res.code === 1) {
                    this.userData.avatar = res.data.url
                } else if (res.code === -14) {
                    window.sessionStorage.removeItem('authInfo')
                    this.$router.replace({name: 'login'})
                    this.$message({
                        type: 'error',
                        message: '登录信息已失效,请重新登录'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '图片上传失败'
                    })
                }
            },
            ...mapActions([
                'setAuthInfo'
            ]),
            validatePass () {
                if (!/^[a-zA-Z0-9_]{6,20}$/.test(this.dailogVal.newPsd)) {
                    this.validatePsd = true
                } else {
                    this.validatePsd = false
                }
            },
            confirmPsd () {
                if (this.dailogVal.newPsd !== this.dailogVal.rePsd) {
                    this.confirm = true
                } else {
                    this.confirm = false
                }
            },
            goEditPass () {
                this.validatePsd = false
                this.confirm = false
                this.dailogVal = {
                    oldPsd: null,
                    newPsd: null,
                    rePsd: null
                }
                this.centerDialogVisible = true
            },
            editPsd () {
                if (!this.validatePsd && !this.confirm) {
                    if (this.dailogVal.oldPsd && this.dailogVal.newPsd && this.dailogVal.rePsd) {
                        this.dailogLoading = true
                        this.$http.post(api.user.findPsd, {
                            oldpassword: this.dailogVal.oldPsd,
                            newpassword: this.dailogVal.newPsd,
                            repassword: this.dailogVal.rePsd
                        }).then(res => {
                            this.dailogLoading = false
                            if (res.data.code === 1) {
                                this.$message({
                                    type: 'success',
                                    message: '密码修改成功,请重新登录'
                                })
                                this.dailogVal = {
                                    oldPsd: null,
                                    newPsd: null,
                                    rePsd: null
                                }
                                this.centerDialogVisible = false
                                this.$http.get(api.user.logout).then(res => {
                                    this.$router.push({name: 'login'})
                                })

                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.data.msg
                                })
                            }
                        })
                    } else if(!this.dailogVal.rePsd && this.dailogVal.oldPsd && this.dailogVal.newPsd) {
                        this.$message({
                            type: 'warning',
                            message: '请输入确认密码'
                        })
                    } else {
                        this.$message({
                            type: 'warning',
                            message: '请输入旧密码和新密码'
                        })
                    }
                }
            },
            doSearch (data) {
                this.page = 1
                this.searchOptions = data
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
                this.$router.replace({name: 'setting_person', query: {page: val}})
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
        margin: 0 auto;
    }

    .setting-tab #tab-0 {
        border-bottom: 1px solid #fff;
    }

    .usersetting-container {
        min-width: 580px;
    }
    .setting-avatar-container:hover .avatar-modal {
        display: inline-block;
    }
    .avatar-modal {
        width: 100%;
        height: 100%;
        line-height: 100px;
        background-color: rgba(0,0,0,0.5);
        color: #fff;
        text-align: center;
        display: none;
        position: absolute;
        top: 0;
        left: 0;
    }
    @media (max-width: 768px) {
        .setting-psd .text-right {
            text-align: left;
        }
        .setting-psd.p-md {
            padding: 0;
        }
        .dialog-modal3 {
            min-width: 300px;
            z-index: 9999;
        }
    }
    @media (max-width: 1200px) {
        .usersetting-list {
            padding: 0;
            margin-top: 10px;
        }
    }
</style>
