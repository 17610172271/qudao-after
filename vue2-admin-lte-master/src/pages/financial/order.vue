<template>
    <div class="scroll-x">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="m-t-sm" v-loading="loading">
                    <div>
                        <search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>
                        <div class="page-toolbar clear">
                            <div class="pull-left toolbar-candle">
                                <a href="javascript:;" title="添加" class="app-add btn bg-blue1 text-white" @click="addItem"><i class="fa fa-plus-square"></i>添加</a>
                                <a href="javascript:;" title="删除" class="app-add btn bg-red1 text-white" @click="delItem(selectedGroup.join(','))"><i class="fa fa-trash"></i>删除</a>
                                <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i
                                    class="fa fa-refresh"></i></div>
                            </div>
                            <div class="pull-right clear">
                                <div class="pull-left m-r-sm opacity-8" title="列">
                                    <select-checkbox :list="showList" v-model="selectVal"
                                                     style="width: 60px;"></select-checkbox>
                                </div>
                                <div class="pull-left btn opacity-8 search-btn" @click="searchShow = !searchShow"><i
                                    class="fa fa-search" title="搜索"></i></div>
                            </div>
                        </div>
                        <div class="lk-table m-t-sm">
                            <ul class="table-thead clear">
                                <!-- <li class="col-lg-1 col-md-1 col-sm-1 col-xs-1 clear app-first-item" v-if="selectVal.indexOf('ID')!=-1"><div class="pull-left"><input type="checkbox" v-model="selectAll"></div><div class="pull-left">ID</div></li> -->
                                <!--<li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">-->
                                    <!--<el-checkbox v-model="selectAll">全选</el-checkbox>-->
                                <!--</li>-->
                                <li class="col-xs-24 p-n">序号</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1">ID</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('电影名称')!=-1">电影名称</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('应用名称')!=-1">应用名称</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('付款时间')!=-1">付款时间</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('应付金额')!=-1">应付金额</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('实付金额')!=-1">实付金额</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('付款用户')!=-1">付款用户</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('付款方式')!=-1">付款方式</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('订单状态')!=-1">订单状态</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item, index) in data.rows" @click="selectItem(item.id)">
                                <!--<li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">-->
                                    <!--<el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>-->
                                <!--</li>-->
                                <li class="col-xs-24 p-n">{{offset + index + 1}}</li>
                                <li class="col-xs-24 p-n over-omit" :title="item.id" v-show="selectVal.indexOf('ID')!=-1">{{item.id}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.film_name" v-show="selectVal.indexOf('电影名称')!=-1">{{item.film_name}}</li>
                                <li class="col-xs-24 p-n over-omit" :title="item.app_name" v-show="selectVal.indexOf('应用名称')!=-1">{{item.app_name}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.paid_time" v-show="selectVal.indexOf('付款时间')!=-1">{{item.paid_time}}</li>
                                <li class="col-xs-24 p-n over-omit" :title="item.cope_paid" v-show="selectVal.indexOf('应付金额')!=-1">{{item.cope_paid}}</li>
                                <li class="col-xs-24 p-n over-omit" :title="item.actually_paid" v-show="selectVal.indexOf('实付金额')!=-1">{{item.actually_paid}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.paid_name" v-show="selectVal.indexOf('付款用户')!=-1">{{item.paid_name}}</li>
                                <li class="col-xs-24 p-n over-omit" :title="item.paid_type" v-show="selectVal.indexOf('付款方式')!=-1">{{item.paid_type}}</li>
                                <li class="col-xs-24 p-n over-omit" :title="item.status" v-show="selectVal.indexOf('订单状态')!=-1">{{item.status}}</li>
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
            title="编辑"
            :visible.sync="centerDialogVisible"
            custom-class="dialog-modal1 dailog-p-t-n"
            :close-on-click-modal="false">
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name">应付金额:</div>
                <div class="col-xs-12 col-md-9">
                    <el-input placeholder="请输入应付金额" style="max-width: 300px;" v-model="detailVal.role"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name">电影名称:</div>
                <div class="col-xs-12 col-md-9">
                    <el-input placeholder="请输入电影名称" style="max-width: 300px;" v-model="detailVal.username"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name">实付金额:</div>
                <div class="col-xs-12 col-md-9">
                    <el-input placeholder="请输入实付金额" style="max-width: 300px;" v-model="detailVal.email"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name">付款用户:</div>
                <div class="col-xs-12 col-md-9">
                    <el-input placeholder="请输入付款用户" style="max-width: 300px;" v-model="detailVal.tel"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name">应用名称:</div>
                <div class="col-xs-12 col-md-9">
                    <el-input placeholder="请输入应用名称" style="max-width: 300px;" v-model="detailVal.name"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name">付款时间:</div>
                <div class="col-xs-12 col-md-9 line-height-40">
                    <el-radio v-model="detailVal.gender" label="男">男</el-radio>
                    <el-radio v-model="detailVal.gender" label="女">女</el-radio>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name">密码:</div>
                <div class="col-xs-12 col-md-9">
                    <el-input placeholder="请输入密码" type="password" style="max-width: 300px;" v-model="detailVal.password"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name">登陆失败次数:</div>
                <div class="col-xs-12 col-md-9">
                    <el-input placeholder="请输入登陆失败次数" style="max-width: 300px;" v-model="detailVal.defeat_times"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name">付款方式:</div>
                <div class="col-xs-12 col-md-9 line-height-40">
                    <el-radio v-model="detailVal.status" label="已上线">已上线</el-radio>
                    <el-radio v-model="detailVal.status" label="已下线">已下线</el-radio>
                </div>
            </div>
            <div class="text-center m-t-lg">
                <el-button type="primary" @click="dailogSubmit">确 定</el-button>
                <el-button @click="centerDialogVisible = false">取 消</el-button>
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
            type: '',
            centerDialogVisible: false,
            detailVal: {},
            selectVal: ['ID', '电影名称', '应用名称', '付款时间', '应付金额', '实付金额', '付款用户', '付款方式', '订单状态'],
            selectedGroup: [],
            selectAll: false,
            showList: ['ID', '电影名称', '应用名称', '付款时间', '应付金额', '实付金额', '付款用户', '付款方式', '订单状态'],
            searchOptions: [
                {
                    type: 'text',
                    name: 'ID',
                    value: null
                },
                {
                    type: 'text',
                    name: '电影名称',
                    value: null
                },
                {
                    type: 'text',
                    name: '应用名称',
                    value: null
                },
                {
                    type: 'select',
                    name: '付款时间',
                    value: null,
                    options: [
                        {
                            value: 0,
                            label: '男'
                        },
                        {
                            value: 1,
                            label: '女'
                        }
                    ]
                },
                {
                    type: 'text',
                    name: '实付金额',
                    value: null
                },
                {
                    type: 'text',
                    name: '付款用户',
                    value: null
                },
                {
                    type: 'select',
                    name: '付款方式',
                    value: null,
                    options: [
                        {
                            value: 0,
                            label: '正常'
                        },
                        {
                            value: 1,
                            label: '隐藏'
                        }
                    ]
                },
                {
                    type: 'time',
                    name: '订单状态',
                    value: null
                }
            ],
            options: [10, 25, 50],
            searchShow: false,
            limit: 10,
            page: 1,
            loading: false,
            subNavList: {
                parentNode: {
                    name: '财务管理',
                    router: {
                        name: 'financial_setting'
                    }
                },
                childNode: {
                    name: '订单统计',
                    desc: '主要用来统计订单详情',
                    router: {
                        name: 'financial_order'
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
                this.$http.get(api.financial.order, {
                    params: {
//                        offset: this.offset,
//                        limit: this.limit,
//                        id: this.searchOptions[0].value,
//                        username: this.searchOptions[1].value,
//                        name: this.searchOptions[2].value,
//                        gender: this.searchOptions[3].value,
//                        email: this.searchOptions[4].value,
//                        tel: this.searchOptions[5].value,
//                        status: this.searchOptions[6].value,
//                        end_time: this.searchOptions[7].value
                    }
                }).then(res => {
                    this.selectedGroup = []
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
            selectItem (id) {
                if (this.selectedGroup.indexOf(id) !== -1) {
                    this.selectedGroup.splice(this.selectedGroup.indexOf(id), 1)
                } else {
                    this.selectedGroup.push(id)
                }
            },
            doSearch (data) {
                this.searchOptions = data
                this.getList()
            },
            refresh () {
                this.getList()
            },
            getData (id) {
                this.$http.get(api.admin.adminDetail, {
                    params: {
//                        id: id
                    }
                }).then(res => {
                    if (res.data.code === 1) {
                        this.detailVal = res.data.data
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            addItem () {
                this.type = 'add'
                this.centerDialogVisible = true
                this.detailVal = {}
            },
            editItem (id) {
                this.type = 'edit'
                this.centerDialogVisible = true
                this.getData(id)
            },
            dailogSubmit () {
                if (this.type === 'edit') {
                    this.$http.get(api.admin.adminEdit, {
                        params: {
//                        ...this.detailVal
                        }
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.centerDialogVisible = false
                            this.$message({
                                type: 'success',
                                message: '保存成功'
                            })
                            this.getList()
                        } else  {
                            this.$message({
                                type: 'warning',
                                message: res.data.msg
                            })
                        }
                    })
                } else {
                    this.$http.get(api.admin.adminAdd, {
                        params: {
//                        ...this.detailVal
                        }
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.centerDialogVisible = false
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            })
                            this.getList()
                        } else  {
                            this.$message({
                                type: 'warning',
                                message: res.data.msg
                            })
                        }
                    })
                }
            },
            resetPsd (id) {
                this.$confirm('此操作将重置该管理员密码, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(api.admin.adminReset, {
                        params: {
//                                id: id
                        }
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '密码重置成功!'
                            })
                        } else {
                            this.$message({
                                type: 'warning',
                                message: res.data.msg
                            })
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                })
            },
            delItem(id) {
                if (id) {
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.get(api.admin.logDel, {
                            params: {
//                                id: id
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
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        })
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请选中需要操作的项'
                    })
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
            selectedGroup (val, oldVal) {
                console.log(val)
                if (val.length === this.data.rows.length) {
                    this.selectAll = true
                } else  {
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
                this.$router.replace({name: 'user_log', query: {page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
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
