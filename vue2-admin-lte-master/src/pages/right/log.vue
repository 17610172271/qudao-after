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
                                <a href="javascript:;" title="删除" class="app-add btn bg-red1 text-white" @click="delItem(selectedGroup.join(','))"><i class="fa fa-trash"></i>删除</a>
                                <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i class="fa fa-refresh"></i></div>
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
                                <!-- <li class="col-lg-1 col-md-1 col-sm-1 col-xs-1 clear app-first-item" v-if="selectVal.indexOf('序号')!=-1"><div class="pull-left"><input type="checkbox" v-model="selectAll"></div><div class="pull-left">序号</div></li> -->
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox v-model="selectAll">全选</el-checkbox>
                                </li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('用户名')!=-1">用户名</li>
                                <li class="col-xs-3 p-n" v-show="selectVal.indexOf('标题')!=-1">标题</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('Url')!=-1">Url</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('IP')!=-1">IP</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('Browser')!=-1">Browser</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('创建时间')!=-1">创建时间</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item, index) in data.rows" @click="selectItem(item.id)">
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                                </li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">{{offset + index + 1}}</li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('用户名')!=-1">{{item.username}}</li>
                                <li class="col-xs-3 p-n over-omit" v-show="selectVal.indexOf('标题')!=-1">{{item.title}}</li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('Url')!=-1">{{item.url}}</li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('IP')!=-1">{{item.ip}}</li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('Browser')!=-1">{{item.browser}}</li>
                                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('创建时间')!=-1">{{item.create_time}}</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                    <a href="javascript:;" title="详情" class="candle-btn btn" @click="showDetail(item.id)"><i class="fa fa-search-plus"></i></a>
                                    <a href="javascript:;" title="删除" class="candle-btn btn" @click="delItem(item.id)"><i class="fa fa-trash"></i></a>
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
            title="详情"
            :visible.sync="centerDialogVisible"
            custom-class="dialog-modal1"
            :close-on-click-modal="false">
            <div class="clear">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name text-bold">标题</div>
                <div class="col-xs-12 col-md-10 line-height-40 text-bold">内容</div>
            </div>
            <div class="clear">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">ID</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    {{dailogVal.id}}
                </div>
            </div>
            <div class="clear">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">admin_id</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    {{dailogVal.admin_id}}
                </div>
            </div>
            <div class="clear">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">用户名</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    {{dailogVal.username}}
                </div>
            </div>
            <div class="clear">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">Url</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    {{dailogVal.url}}
                </div>
            </div>
            <div class="clear">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">标题</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    {{dailogVal.title}}
                </div>
            </div>
            <div class="clear">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">内容</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    {{dailogVal.content}}
                </div>
            </div>
            <div class="clear">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">IP</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    {{dailogVal.ip}}
                </div>
            </div>
            <div class="clear">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">useragent</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    {{dailogVal.useragent}}
                </div>
            </div>
            <div class="clear">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">创建时间</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    {{dailogVal.create_time}}
                </div>
            </div>
            <div class="text-center m-t-lg">
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
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
            centerDialogVisible: false,
            dailogVal: {
                id: null,
                admin_id: null,
                username: null,
                url: null,
                title: null,
                content: null,
                ip: null,
                useragent: null,
                create_time: null
            },
            selectVal: ['checkbox', '序号', '用户名', '标题', 'Url', 'IP', 'Browser', '创建时间', '操作'],
            selectedGroup: [],
            selectAll: false,
            showList: ['checkbox', '序号', '用户名', '标题', 'Url', 'IP', 'Browser', '创建时间', '操作'],
            searchOptions: [
                {
                    type: 'text',
                    name: '用户名',
                    value: null
                },
                {
                    type: 'text',
                    name: '标题',
                    value: null
                },
                {
                    type: 'text',
                    name: 'Url',
                    value: null
                },
                {
                    type: 'text',
                    name: 'IP',
                    value: null
                },
                {
                    type: 'time',
                    name: '创建时间',
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
                    name: '用户管理',
                    router: {
                        name: 'user_log'
                    }
                },
                childNode: {
                    name: '管理员日志',
                    desc: '主要用来绑定应用和应用列表的查看',
                    router: {
                        name: 'user_log'
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
                this.$http.get(api.admin.log, {
                    params: {
//                        offset: this.offset,
//                        limit: this.limit,
//                        username: this.searchOptions[0].value,
//                        title: this.searchOptions[1].value,
//                        url: this.searchOptions[2].value,
//                        ip: this.searchOptions[3].value,
//                        create_time: this.searchOptions[4].value
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
            delItem(id) {
                if (id) {
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.get(api.admin.logDel, {
                            params: {
//                            id: id
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
            getData (id) {
                this.$http.get(api.admin.logDetail, {
                    params: {
//                        id: id
                    }
                }).then(res => {
                    if (res.data.code === 1) {
                        this.dailogVal = res.data.data
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            showDetail (id) {
                this.centerDialogVisible = true
                this.getData(id)
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
