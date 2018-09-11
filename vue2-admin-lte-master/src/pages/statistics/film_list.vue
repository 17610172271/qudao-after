<template>
    <div class="p-lg appli-container">
        <sub-header :list="subNavList"></sub-header>
        <div class="page-container">
            <div class="m-t-sm" v-loading="loading">
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
                            <div class="pull-left btn opacity-8 search-btn" @click="searchShow = !searchShow"><i class="fa fa-search" title="搜索"></i></div>
                        </div>
                    </div>
                    <div class="lk-table m-t-sm">
                        <ul class="table-thead clear">
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                <el-checkbox v-model="selectAll">全选</el-checkbox>
                            </li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('日期')!=-1">日期</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('电影名称')!=-1">电影名称</li>
                            <li class="col-xs-2 p-n" v-show="selectVal.indexOf('应用名称')!=-1">应用名称</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('点击量')!=-1">点击量</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('购买量')!=-1">购买量</li>
                            <li class="col-xs-1 p-n" v-show="selectVal.indexOf('购买率')!=-1">购买率</li>
                        </ul>
                        <ul class="table-tbody clear" v-for="(item,index) in data.rows">
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                            </li>
                            <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">{{offset + index + 1}}</li>
                            <li class="col-xs-2 p-n over-omit" :title="item.date" v-show="selectVal.indexOf('日期')!=-1">{{item.date}}</li>
                            <li class="col-xs-2 p-n over-omit" :title="item.film_name" v-show="selectVal.indexOf('电影名称')!=-1">{{item.film_name}}</li>
                            <li class="col-xs-2 p-n over-omit" :title="item.app_name" v-show="selectVal.indexOf('应用名称')!=-1">{{item.app_name}}</li>
                            <li class="col-xs-1 p-n over-omit" :title="item.click_num" v-show="selectVal.indexOf('点击量')!=-1">{{item.click_num}}</li>
                            <li class="col-xs-1 p-n over-omit" :title="item.buy_num" v-show="selectVal.indexOf('购买量')!=-1">{{item.buy_num}}</li>
                            <li class="col-xs-1 p-n over-omit" :title="item.buy_rate" v-show="selectVal.indexOf('购买率')!=-1">{{item.buy_rate}}</li>
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
            selectVal: ['序号', '日期', '电影名称', '应用名称', '点击量', '购买量', '购买率'],
            selectedGroup: [],
            selectAll: false,
            showList: ['序号', '日期', '电影名称', '应用名称', '点击量', '购买量', '购买率'],
            searchOptions: [
                {
                    type: 'time',
                    name: '电影名称',
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
                    name: '数据统计',
                    router: {
                        name: 'statistics_agent'
                    }
                },
                childNode: {
                    name: '影片操作统计',
                    desc: '主要用于统计影片操作的情况',
                    router: {
                        name: 'statistics_film'
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
                this.$http.get(api.statistics.film, {
                    params: {
//                    offset: this.offset,
//                    limit: this.limit,
//                    date: this.searchOptions[0].value,
//                    film_name: this.searchOptions[1].value,
//                    film_type: this.searchOptions[2].value
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
        } ,
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
    #echarts-agent {
        height: 300px;
    }
</style>
