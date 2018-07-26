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
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox v-model="selectAll">全选</el-checkbox>
                                </li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('版权商姓名')!=-1">版权商姓名</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('公司名称')!=-1">公司名称</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('公司类型')!=-1">公司类型</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('法人')!=-1">法人</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('联系人')!=-1">联系人</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('联系电话')!=-1">联系电话</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('营业地址')!=-1">营业地址</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('街道地址')!=-1">街道地址</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item, index) in data.rows">
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox label="1" v-model="selectedGroup"></el-checkbox>
                                </li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">{{offset + index + 1}}</li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('版权商姓名')!=-1">{{item.copyright_name}}</li>
                                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('公司名称')!=-1">{{item.company_name}}</li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('公司类型')!=-1">{{item.company_type}}</li>
                                <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('法人')!=-1">{{item.legal_person}}</li>
                                <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('联系人')!=-1">{{item.contact_person}}</li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('联系电话')!=-1">{{item.contact_tel}}</li>
                                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('营业地址')!=-1">{{item.address}}</li>
                                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('街道地址')!=-1">{{item.address1}}</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                    <a href="javascript:;" title="编辑" class="candle-btn btn"><i class="fa fa-edit"></i></a>
                                    <a href="javascript:;" title="删除" class="candle-btn btn"><i class="fa fa-trash"></i></a>
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
            selectVal: ['checkbox', '序号', '版权商姓名', '公司名称', '公司类型', '法人', '联系人', '联系电话', '营业地址', '街道地址', '操作'],
            selectedGroup: [],
            selectAll: false,
            showList: ['checkbox', '序号', '版权商姓名', '公司名称', '公司类型', '法人', '联系人', '联系电话', '营业地址', '街道地址', '操作'],
            searchOptions: [
                {
                    type: 'text',
                    name: '版权商姓名',
                    value: null
                },
                {
                    type: 'text',
                    name: '公司名称',
                    value: null
                },
                {
                    type: 'select',
                    name: '公司类型',
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
            subNavList: {
                parentNode: {
                    name: '影片管理',
                    router: {
                        name: 'setting_info'
                    }
                },
                childNode: {
                    name: '版权商信息管理',
                    desc: '主要用来绑定应用和应用列表的查看',
                    router: {
                        name: 'setting_info'
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
                this.$http.get(api.setting.info, {
                    params: {
//                        offset: this.offset,
//                        limit: this.limit,
//                        token: this.$bus.token,
//                        webname: this.searchName,
//                        audit_status: this.status ? this.status : null,
//                        bind_time: this.calendarVal
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
            refresh () {
            },
            doSearch (data) {
                this.searchOptions = data
                console.log(this.searchOptions)
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
<style scoped>
    .lk-table .p-n {
        padding-left: 0;
        padding-right: 0;
    }
</style>
