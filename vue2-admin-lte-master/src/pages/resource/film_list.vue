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
                                <!--<li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">-->
                                    <!--<el-checkbox v-model="selectAll">全选</el-checkbox>-->
                                <!--</li>-->
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('电影名称')!=-1">电影名称</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('电影类型')!=-1">电影类型</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('地区')!=-1">地区</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('主演')!=-1">主演</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('导演')!=-1">导演</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('版权商名称')!=-1">版权商名称</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('上映时间')!=-1">上映时间</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item,index) in data.rows">
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                                </li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">{{offset + index + 1}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.name" v-show="selectVal.indexOf('电影名称')!=-1">{{item.title}}</li>
                                <li class="col-xs-24 p-n over-omit" :title="item.type" v-show="selectVal.indexOf('电影类型')!=-1">{{item.class}}</li>
                                <li class="col-xs-24 p-n over-omit" :title="item.zone" v-show="selectVal.indexOf('地区')!=-1">{{item.zone}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.actor" v-show="selectVal.indexOf('主演')!=-1">{{item.actor}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.director" v-show="selectVal.indexOf('导演')!=-1">{{item.director}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.copyright_name" v-show="selectVal.indexOf('版权商名称')!=-1">{{item.copyright_name}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.release_time" v-show="selectVal.indexOf('上映时间')!=-1">{{item.release_date}}</li>
                                <li class="col-xs-24 p-n over-omit" :title="item.status" v-show="selectVal.indexOf('状态')!=-1">{{item.status}}</li>
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
            selectVal: ['序号', '电影名称', '电影类型', '地区', '主演', '导演', '版权商名称', '上映时间', '状态'],
            selectedGroup: [],
            selectAll: false,
            showList: ['序号', '电影名称', '电影类型', '地区', '主演',  '导演', '版权商名称', '上映时间', '状态'],
            searchOptions: [
                {
                    type: 'text',
                    name: '电影名称',
                    value: null
                },
                {
                    type: 'select',
                    name: '状态',
                    value: null,
                    options: [
                        {
                            value: 1,
                            label: '上线'
                        },
                        {
                            value: 2,
                            label: '下线'
                        }
                    ]
                }
            ],
            options: [10, 25, 50],
            searchShow: false,
            limit: 10,
            page: 1,
            loading: false,
            subNavList: {
                parentNode: {
                    name: '资源信息',
                    router: {
                        name: 'resource_film'
                    }
                },
                childNode: {
                    name: '影片库',
                    desc: '主要用来查看历史审核记录及其管理',
                    router: {
                        name: 'resource_film'
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
                this.$http.post(api.resource.film, {
                    page: this.page,
                    limit: this.limit, // 每页限制数量
                    options: {
                        title: this.searchOptions[0].value,
                        status: this.searchOptions[1].value
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
            handlePreview () {
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
            selectedGroup (val) {
                console.log(val)
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
