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
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox v-model="selectAll">全选</el-checkbox>
                                </li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('代理商名称')!=-1">代理商名称</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('公司类型')!=-1">公司类型</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('法人')!=-1">法人</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('负责人')!=-1">负责人</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('负责人电话')!=-1">负责人电话</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('营业地址')!=-1">营业地址</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('街道地址')!=-1">街道地址</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item,index) in data.rows">
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                                </li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">{{offset + index + 1}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.name" v-show="selectVal.indexOf('代理商名称')!=-1">{{item.name}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.type" v-show="selectVal.indexOf('公司类型')!=-1">{{item.type}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.legal" v-show="selectVal.indexOf('法人')!=-1">{{item.legal}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.leader" v-show="selectVal.indexOf('负责人')!=-1">{{item.leader}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.leader_tel" v-show="selectVal.indexOf('负责人电话')!=-1">{{item.leader_tel}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.address" v-show="selectVal.indexOf('营业地址')!=-1">{{item.address}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.address1" v-show="selectVal.indexOf('街道地址')!=-1">{{item.address1}}</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                    <a href="javascript:;" title="详情" class="candle-btn btn"><i class="fa fa-search-plus"></i></a>
                                    <a href="javascript:;" title="编辑" class="candle-btn btn"><i class="fa fa-edit"></i></a>
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
            selectVal: ['checkbox', '序号', '代理商名称', '公司类型', '法人', '负责人', '负责人电话', '营业地址', '街道地址', '操作'],
            selectedGroup: [],
            selectAll: false,
            showList: ['checkbox', '序号', '代理商名称', '公司类型', '法人', '负责人',  '负责人电话', '营业地址', '街道地址', '操作'],
            searchOptions: [
                {
                    type: 'text',
                    name: '代理商名称',
                    value: null
                },
                {
                    type: 'text',
                    name: '公司类型',
                    value: null
                },
                {
                    type: 'time1',
                    name: '法人',
                    value: null
                },
                {
                    type: 'select',
                    name: '负责人',
                    value: null,
                    options: [
                        {
                            value: 1,
                            label: '未通过'
                        },
                        {
                            value: 2,
                            label: '已通过'
                        }
                    ]
                },
                {
                    type: 'text',
                    name: '负责人电话',
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
                this.$http.post(api.resource.agent, {
//                    page: this.page,
//                    rows: this.limit, // 每页限制数量
//                    time: this.searchOptions[2].value ? this.searchOptions[2].value / 1000 : null,
//                    status: this.searchOptions[3].value,
//                    name: this.searchOptions[0].value,
//                    user: this.searchOptions[1].value,
//                    msg: this.searchOptions[4].value
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
