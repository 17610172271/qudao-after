<template>
    <div>
        <search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>
        <div class="page-toolbar clear">
            <div class="pull-left toolbar-candle">
                <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i class="fa fa-refresh"></i></div>
            </div>
            <div class="pull-right clear">
                <div class="pull-left m-r-sm opacity-8" title="列">
                    <select-checkbox :list="showList" v-model="selectVal" style="width: 60px;"></select-checkbox>
                </div>
                <div class="pull-left btn opacity-8 search-btn" @click="searchShow = !searchShow"><i
                    class="fa fa-search" title="搜索"></i></div>
            </div>
        </div>
        <div class="lk-table m-t-sm" v-loading="loading">
            <ul class="table-thead clear">
                <!-- <li class="col-lg-1 col-md-1 col-sm-1 col-xs-1 clear app-first-item" v-if="selectVal.indexOf('ID')!=-1"><div class="pull-left"><input type="checkbox" v-model="selectAll"></div><div class="pull-left">ID</div></li> -->
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('电影名称')!=-1">电影名称</li>
                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('版权商')!=-1">版权商</li>
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('版权登记号')!=-1">版权登记号</li>
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('作品/制品名称')!=-1">作品/制品名称</li>
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('审核时间')!=-1">审核时间</li>
                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
            </ul>
            <ul class="table-tbody clear" v-for="(item, index) in data.rows">
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1">{{offset + index + 1}}</li>
                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('电影名称')!=-1">{{item.film_name}}</li>
                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('版权商')!=-1">{{item.copyright_name}}</li>
                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('版权登记号')!=-1">{{item.copyright_id}}</li>
                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('作品/制品名称')!=-1">{{item.product_name}}</li>
                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1">{{item.status}}</li>
                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('审核时间')!=-1">{{item.check_time}}</li>
                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">
                    <a href="javascript:;" title="详情" class="candle-btn btn" @click="showDetail(item.id)"><i
                        class="fa fa-search-plus"></i></a>
                    <a href="javascript:;" title="审核历史" class="candle-btn btn" @click="lookHistory(item.id)"><i class="fa fa-history"></i></a>
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
            title="审核历史"
            :visible.sync="checkDailog"
            custom-class="dialog-modal1 dailog-p-t-n"
            :close-on-click-modal="false">
            <history :id="history_id"></history>
        </el-dialog>
        <el-dialog
            title="详情"
            :visible.sync="centerDialogVisible"
            custom-class="dialog-modal1 dailog-p-t-n"
            :close-on-click-modal="false">
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name">电影名称:</div>
                <div class="col-xs-12 col-md-9 line-height-40">
                    {{detailVal.film_name}}
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name">版权商:</div>
                <div class="col-xs-12 col-md-9 line-height-40">
                    {{detailVal.copyright_name}}
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name">版权登记号:</div>
                <div class="col-xs-12 col-md-9 line-height-40">
                    {{detailVal.copyright_id}}
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name">作品/制品名称:</div>
                <div class="col-xs-12 col-md-9 line-height-40">
                    {{detailVal.product_name}}
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name">状态:</div>
                <div class="col-xs-12 col-md-9 line-height-40">
                    {{detailVal.status}}
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name">备注:</div>
                <div class="col-xs-12 col-md-9 line-height-40">
                    {{detailVal.remark}}
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
    import SelectCheckbox from '@/components/SelectCheckbox'
    import SearchIpts from '../common/searchIpts'
    import History from './history.vue'
    import  api from '@/api'
    export default {
        components: {
            SelectCheckbox,
            SearchIpts,
            History
        },
        data: () => ({
            data: {
                rows: [],
                total: 1
            },
            detailVal: {
                film_name: null,
                copyright_name: null,
                copyright_id: null,
                product_name: null,
                status: null,
                remark: null
            },
            loading: false,
            centerDialogVisible: false,
            checkDailog: false,
            history_id: '',
            selectVal: ['序号', '电影名称', '版权商', '版权登记号', '作品/制品名称', '状态', '审核时间', '操作'],
            selectedGroup: [],
            selectAll: false,
            showList: ['序号', '电影名称', '版权商', '版权登记号', '作品/制品名称', '状态', '审核时间', '操作'],
            searchOptions: [
                {
                    type: 'text',
                    name: '电影名称',
                    value: null
                },
                {
                    type: 'text',
                    name: '版权商',
                    value: null
                },
                {
                    type: 'text',
                    name: '版权登记号',
                    value: null
                },
                {
                    type: 'time',
                    name: '审核时间',
                    value: null
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
                this.$http.get(api.copyright.list, {
                    params: {
//                        offset: this.offset,
//                        limit: this.limit,
//                        film_name: this.searchOptions[0].value,
//                        copyright_name: this.searchOptions[1].value,
//                        copyright_id: this.searchOptions[2].value,
//                        check_time: this.searchOptions[3].value
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
            getData (id) {
                this.$http.get(api.copyright.detail).then(res => {
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
            showDetail (id) {
                this.centerDialogVisible = true
                this.getData(id)
            },
            lookHistory (id) {
                this.history_id = id
                this.checkDailog = true
            },
            doSearch (data) {
                this.searchOptions = data
                this.getList()
            },
            refresh () {
                this.getList()
            },
            delItem() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addPage () {
                if (this.page < this.pages) this.page += 1
            },
            delPage () {
                if (this.page > 1) this.page -= 1
            }
        },
        created () {
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