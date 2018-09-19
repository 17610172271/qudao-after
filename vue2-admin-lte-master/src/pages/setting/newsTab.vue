<template>
    <div>
        <div class="news-container" v-loading="loading">
            <div>
                <search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>
                <div class="page-toolbar clear">
                    <div class="pull-left toolbar-candle">
                        <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i class="fa fa-refresh"></i></div>
                        <a href="javascript:;" title="删除" class="app-add btn bg-red1 text-white" @click="delItem(selectedGroup.join(','))"><i class="fa fa-trash"></i>删除</a>
                        <a href="javascript:;" title="标记已读" class="app-add btn bg-blue1 text-white" @click="readItem(selectedGroup.join(','))"><i class="fa fa-eye"></i>标记已读</a>
                    </div>
                    <div class="pull-right clear">
                        <div class="pull-left m-r-sm opacity-8" title="列">
                            <select-checkbox :list="showList" v-model="selectVal" style="width: 60px;"></select-checkbox>
                        </div>
                        <div class="pull-left btn opacity-8 search-btn" @click="searchShow = !searchShow"><i class="fa fa-search" title="搜索"></i></div>
                    </div>
                </div>
            </div>
            <div class="lk-table m-t-sm">
                <ul class="table-thead clear">
                    <li class="col-xs-1 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                        <el-checkbox v-model="selectAll">全选</el-checkbox>
                    </li>
                    <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
                    <li class="col-xs-3 p-n" v-show="selectVal.indexOf('标题')!=-1">标题</li>
                    <li class="col-xs-2 p-n" v-show="selectVal.indexOf('发送时间')!=-1">发送时间</li>
                    <li class="col-xs-2 p-n" v-show="selectVal.indexOf('阅读时间')!=-1">阅读时间</li>
                    <li class="col-xs-1 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                    <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                </ul>
                <ul class="table-tbody clear" v-for="(item,index) in data.rows" @click="selectItem(item.id)">
                    <li class="col-xs-1 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                        <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                    </li>
                    <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1">{{offset + index + 1}}</li>
                    <li class="col-xs-3 p-n over-omit" v-show="selectVal.indexOf('标题')!=-1">{{item.title}}</li>
                    <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('发送时间')!=-1">{{item.send_time}}</li>
                    <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('阅读时间')!=-1">{{item.read_time}}</li>
                    <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1">{{item.status}}</li>
                    <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">
                        <a href="javascript:;" title="标记已读" class="candle-btn btn" @click.stop="readItem(item.id)"><i class="fa fa-check-square-o"></i></a>
                        <a href="javascript:;" title="详情" class="candle-btn btn" @click.stop="showDetail(item.id)"><i class="fa fa-search-plus"></i></a>
                        <a href="javascript:;" title="删除" class="candle-btn btn" @click.stop="delItem(item.id)"><i class="fa fa-trash"></i></a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer clear m-t-md">
            <div class="pull-left news-record text-lg">
                <span v-show="data.rows.length>0">显示{{offset + 1}}到{{offset + data.rows.length}}条消息，</span>
                共<span class="text-blue">{{data.total}}</span>条记录 每页显示
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
</template>
<script type="text/ecmascript-6">
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
            loading: false,
            selectVal: ['checkbox', '序号', '标题', '发送时间', '阅读时间', '状态', '操作'],
            showList: ['checkbox', '序号', '标题', '发送时间', '阅读时间', '状态', '操作'],
            selectedGroup: [],
            selectAll: false,
            searchOptions: [
                {
                    type: 'text',
                    name: '标题',
                    value: null
                },
                {
                    type: 'time',
                    name: '发送时间',
                    value: null
                },
                {
                    type: 'time',
                    name: '阅读时间',
                    value: null
                },
                {
                    type: 'select',
                    name: '状态',
                    value: null,
                    options: [
                        {
                            value: 0,
                            label: '未读'
                        },
                        {
                            value: 1,
                            label: '已读'
                        }
                    ]
                }
            ],
            options: [10, 25, 50],
            searchShow: false,
            limit: 10,
            page: 1
        }),
        components: {
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
                this.$http.post(api.setting.newsList, {
                    page: this.page,
                    limit: this.limit,
                    options: {
                        title: this.searchOptions[0].value
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
            readItem (id) {
                if (id) {
                    this.$http.get(api.setting.newsRead, {
                        params: {
                            id: id
                        }
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '标记已读成功'
                            })
                            this.getList()
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
                        message: '请选中需要操作的项'
                    })
                }
            },
            showDetail (id) {},
            delItem (id) {
                console.log(!!id)
                if (id) {
                    this.$confirm('此操作将永久删除该消息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.get(api.setting.newsDel, {
                            params: {
                                id: id
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
                console.log('news', data)
            },
            refresh () {
                this.getList
            },
            addPage () {
                if (this.page < this.pages) this.page += 1
            },
            delPage () {
                if (this.page > 1) this.page -= 1
            },
            format: format
        },
        created() {
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
                this.$router.replace({name: 'setting_news', query: {type: 'news', page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            }
        }
    }
</script>
<style>

</style>
