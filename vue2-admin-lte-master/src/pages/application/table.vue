<template>
    <div v-loading="loading">
        <search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>
        <div class="page-toolbar clear">
            <div class="pull-left toolbar-candle">
                <!--<a href="javascript:;" title="删除" class="app-add btn bg-red1 text-white" @click="delItem(selectedGroup)"><i-->
                    <!--class="fa fa-trash"></i>删除</a>-->
                <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i class="fa fa-refresh"></i></div>
            </div>
            <div class="pull-right clear">
                <div class="pull-left m-r-sm opacity-8" title="列">
                    <select-checkbox :list="showList" v-model="selectVal" style="width: 60px;"></select-checkbox>
                </div>
                <div class="pull-left btn opacity-8 search-btn" :class="{'bg-eee': searchShow}" @click="searchShow = !this.searchShow">
                    <i class="fa fa-search" title="搜索"></i>
                </div>
            </div>
        </div>
        <div class="lk-table m-t-sm">
            <ul class="table-thead clear">
                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('应用名称')!=-1">应用名称</li>
                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('应用类别')!=-1">应用类别</li>
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('代理商')!=-1">代理商</li>
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('绑定时间')!=-1">绑定时间</li>
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('审核时间')!=-1">审核时间</li>
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('备注')!=-1">备注</li>
                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
            </ul>
            <ul class="table-tbody clear" v-for="(item, index) in data.rows" @click="selectItem(item.id)">
                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                    <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                </li>
                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">{{offset + index + 1}}</li>
                <li :title="item.name" class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('应用名称')!=-1">{{item.name}}</li>
                <li :title="item.type" class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('应用类别')!=-1">{{item.type}}</li>
                <li :title="item.agent" class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('代理商')!=-1">{{item.agent}}</li>
                <li :title="item.bind_time" class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('绑定时间')!=-1">{{item.bind_time}}</li>
                <li :title="item.check_time" class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('审核时间')!=-1">{{item.check_time}}</li>
                <li :title="item.status" class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1">{{item.status}}</li>
                <li :title="item.remark" class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('备注')!=-1">{{item.remark}}</li>
                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">
                    <a href="javascript:;" title="通过" class="candle-btn btn" @click.stop="checkFilm('pass', item.id)"><i class="fa fa-check"></i></a>
                    <a href="javascript:;" title="不通过" class="candle-btn btn" @click.stop="checkFilm('notpass', item.id)"><i class="fa fa-close"></i></a>
                    <a href="javascript:;" :title="item.status==='已上线'?'解冻':'冻结'" class="candle-btn btn" @click.stop="doFreeze(item)"><i class="fa" :class="item.status==='已上线' ? 'fa-lightbulb-o' : 'fa-ban'"></i></a>
                    <a href="javascript:;" title="详情" class="candle-btn btn" @click.stop="openDetail(item)"><i class="fa fa-search-plus"></i></a>
                    <a href="javascript:;" title="审核历史" class="candle-btn btn" @click="openHistory(item.id)"><i class="fa fa-history"></i></a>
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
        <el-dialog
            title="基本信息"
            :visible.sync="centerDialogVisible"
            custom-class="dialog-modal1 dailog-p-t-n"
            :modal-append-to-body="false"
            :close-on-click-modal="false">
            <detail :data="detailId" :show="centerDialogVisible"></detail>
        </el-dialog>
        <el-dialog
            title="审核历史"
            :visible.sync="historyDailog"
            custom-class="dialog-modal1"
            :close-on-click-modal="false">
            <history :data="history_id"></history>
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
    import SelectCheckbox from '@/components/SelectCheckbox'
    import SearchIpts from '../common/searchIpts'
    import Detail from './detail.vue'
    import History from './history.vue'
    import api from '@/api'
    export default {
        components: {
            SelectCheckbox,
            SearchIpts,
            Detail,
            History
        },
        data: () => ({
            data: {
                rows: [],
                total: 1
            },
            loading: false,
            centerDialogVisible: false,
            historyDailog: false,
            detailId: null,
            is_options: true,
            history_id: null,
            selectVal: ['序号', '应用名称', '应用类别', '代理商', '绑定时间', '审核时间', '状态', '备注', '操作'],
            selectedGroup: [],
            selectAll: false,
            showList: ['序号', '应用名称', '应用类别', '代理商', '绑定时间', '审核时间', '状态', '备注', '操作'],
            searchOptions: [
                {
                    type: 'text',
                    name: '应用名称',
                    value: ''
                },
                {
                    type: 'select',
                    name: '应用类别',
                    value: ''
                },
                {
                    type: 'texi',
                    name: '代理商',
                    value: ''
                },
                {
                    type: 'time',
                    name: '绑定时间',
                    value: ''
                },
                {
                    type: 'time',
                    name: '审核时间',
                    value: '',
                    options: []
                },
                {
                    type: 'select',
                    name: '状态',
                    value: '',
                    options: [
                        {
                            value: 1,
                            label: '已上线'
                        },
                        {
                            value: 2,
                            label: '已下线'
                        }
                    ]
                },
                {
                    type: 'text',
                    name: '备注',
                    value: ''
                }
            ],
            options: [10, 25, 50],
            searchShow: false,
            limit: 10,
            page: 1
        }),
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
                this.$http.post(api.application.list, {
//                    page: this.page,
//                    limit: this.limit,
//                    type: this.$route.query.type || '3',
//                    options: {
//                        title: this.searchOptions[0].value,
//                        length: this.searchOptions[1].value,
//                        language: this.searchOptions[2].value,
//                        director: this.searchOptions[3].value,
//                        actor: this.searchOptions[4].value,
//                        class: this.searchOptions[5].value,
//                        release_date: this.searchOptions[6].value,
//                        examine: this.searchOptions[7].value,
//                        status: this.searchOptions[8].value,
//                        reason: this.searchOptions[9].value
//                    }
                }).then(res => {
                    this.selectedGroup = []
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
            checkFilm(type, id) {
                if (type === 'pass') {
                    this.$confirm('您将让该应用通过审核', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.get(api.application.checkApp, {
                            params: {
//                                id: id
                            }
                        }).then(res => {
                            if (res.data.code === 1) {
                                this.getList()
                                this.$message({
                                    type: 'success',
                                    message: '操作成功'
                                })
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.data.msg
                                })
                            }
                        })

                    })
                } else {
                    this.$prompt('请输入不通过原因', '审核', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then(({ value }) => {
                        if (value) {
                            this.$http.get(api.application.checkApp, {
                                params: {
//                                    id: id,
//                                    reason: value
                                }
                            }).then(res => {
                                if (res.data.code === 1) {
                                    this.$message({
                                        type: 'success',
                                        message: '操作成功'
                                    })
                                    this.getList()
                                } else {
                                    this.$message({
                                        type: 'error',
                                        message: res.data.msg
                                    })
                                }
                            })
                        } else {
                            this.$message({
                                type: 'warning',
                                message: '请输入审核不通过原因'
                            })
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消输入'
                        })
                    })
                }
            },
            doFreeze (item) {
              if (item.status === '已上线') {
                  this.$confirm('您将解冻该应用', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                  }).then(() => {
                    this.$http.get(api.application.freeze, {
                        params: {
//                            id: item.id
                        }
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '操作成功'
                            })
                            item.status = '已下线'
                        }
                    })
                  })
              } else {
                  this.$confirm('您将冻结该应用', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                  }).then(() => {
                      this.$http.get(api.application.freeze, {
                          params: {
//                            id: item.id
                          }
                      }).then(res => {
                          if (res.data.code === 1) {
                              this.$message({
                                  type: 'success',
                                  message: '操作成功'
                              })
                              item.status = '已上线'
                          }
                      })
                  })
              }
            },
            openHistory (id) {
                this.historyDailog = true
                this.history_id = id
            },
            openDetail (item) {
                this.detailId = item
                this.centerDialogVisible = true
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
            delItem(id) {
                if (id.length > 0) {
                    this.$confirm(id.length>1 ? '此操作将批量删除选中电影, 是否继续?' : '此操作将删除该电影, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.get(api.films.del, {
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
                                    type: 'error',
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
            doDown (id) {
                this.$confirm('是否将该影片下线?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.get(api.films.down, {
                        params: {
                            id: id
                        }
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '下线成功!'
                            })
                            this.getList()
                        } else {
                            this.$message({
                                type: 'error',
                                message: '下线失败!'
                            })
                        }
                    })
                }).catch(() => {
                })
            },
            addPage () {
                if (this.page < this.pages) this.page += 1
            },
            delPage () {
                if (this.page > 1) this.page -= 1
            }
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
                this.$router.replace({name: 'films_list', query: {type: this.$route.query.type, page: val}})
                this.getList()
            },
            limit (val) {
                this.getList()
            }
        }
    }
</script>