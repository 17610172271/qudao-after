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
                                <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh">
                                    <i class="fa fa-refresh"></i>
                                </div>
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
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('电影名称')!=-1">电影名称</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('版权商')!=-1">版权商</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('版权商分成')!=-1">版权商分成</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('平台分成')!=-1">平台分成</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('代理商分成')!=-1">代理商分成</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('审核时间')!=-1">审核时间</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item, index) in data.rows">
                                <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('序号')!=-1">{{offset + index + 1}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.film_name" v-show="selectVal.indexOf('电影名称')!=-1">
                                    {{item.film_name}}
                                </li>
                                <li class="col-xs-1 p-n over-omit" :title="item.copyright_name" v-show="selectVal.indexOf('版权商')!=-1">
                                    {{item.copyright_name}}
                                </li>
                                <li class="col-xs-24 p-n over-omit" :title="item.copyright_devide" v-show="selectVal.indexOf('版权商分成')!=-1">
                                    {{item.copyright_devide}}
                                </li>
                                <li class="col-xs-24 p-n over-omit" :title="item.platform_devide" v-show="selectVal.indexOf('平台分成')!=-1">
                                    {{item.platform_devide}}
                                </li>
                                <li class="col-xs-24 p-n over-omit" :title="item.agent_devide" v-show="selectVal.indexOf('代理商分成')!=-1">
                                    {{item.agent_devide}}
                                </li>
                                <li class="col-xs-24 p-n over-omit" :title="item.status" v-show="selectVal.indexOf('状态')!=-1">
                                    {{item.status}}
                                </li>
                                <li class="col-xs-1 p-n over-omit" :title="item.check_time" v-show="selectVal.indexOf('审核时间')!=-1">
                                    {{item.check_time}}
                                </li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                    <a href="javascript:;" title="定价" class="candle-btn btn"
                                       @click="setPrice(item)"><i class="fa fa-list-ul"></i></a>
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
            title="定价"
            :visible.sync="centerDialogVisible"
            custom-class="dialog-modal1"
            :close-on-click-modal="false">
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-2 line-height-40 text-right attr-edit-name">电影名称:</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    {{dailogVal.film_name}}
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-2 line-height-40 text-right attr-edit-name">单价:</div>
                <div class="col-xs-12 col-md-10">
                    <el-input placeholder="请输入单价" style="max-width: 300px;" v-model="dailogVal.price"></el-input>
                </div>
            </div>
            <div class="text-center m-t-lg">
                <el-button type="primary" @click="dailogSubmit">确 定</el-button>
                <el-button @click="centerDialogVisible = false">重 置</el-button>
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
            dailogVal: {
                film_name: null,
                price: null
            },
            centerDialogVisible: false,
            selectVal: ['checkbox', '序号', '电影名称', '版权商', '版权商分成', '平台分成', '代理商分成', '状态', '审核时间', '操作'],
            selectedGroup: [],
            selectAll: false,
            showList: ['checkbox', '序号', '电影名称', '版权商', '版权商分成', '平台分成', '代理商分成', '状态', '审核时间', '操作'],
            searchOptions: [
                {
                    type: 'text',
                    name: '版权商',
                    value: null
                },
                {
                    type: 'text',
                    name: '电影名称',
                    value: null
                },
                {
                    type: 'text',
                    name: '版权商分成',
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
                        name: 'financial_list'
                    }
                },
                childNode: {
                    name: '版权定价',
                    desc: '主要用来绑定应用和应用列表的查看',
                    router: {
                        name: 'financial_list'
                    }
                }
            }
        })
        ,
        components: {
            SubHeader,
            SelectCheckbox,
            SearchIpts
        }
        ,
        computed: {
            pages()
            {
                return this.data ? Math.ceil(this.data.total / this.limit) : 1
            }
            ,
            offset()
            {
                return (this.page - 1) * this.limit
            }
        }
        ,
        methods: {
            getList () {
                this.loading = true
                this.$http.get(api.financial.list, {
                    params: {
//                    offset: this.offset,
//                    limit: this.limit,
//                    copyright_name: this.searchOptions[0].value,
//                    film_name: this.searchOptions[1].value,
//                    price: this.searchOptions[2].value
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
            setPrice (item) {
                this.dailogVal.id = item.id
                this.dailogVal.film_name = item.film_name
                this.centerDialogVisible = true
            },
            dailogSubmit () {
                this.$http.get(api.financial.priceSet, {
                    params: {
//                        ...this.detailVal
                    }
                }).then(res => {
                    if (res.data.code === 1) {
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        })
                        this.centerDialogVisible = false
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            },
            doSearch (data) {
                this.searchOptions = data
                this.getList()
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

</style>
