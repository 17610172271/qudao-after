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
                            <ul class="table-tbody clear" v-for="(item,index) in data.rows" @click="selectItem(item.id)">
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                                </li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">{{offset + index + 1}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.username" v-show="selectVal.indexOf('代理商名称')!=-1">{{item.username}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.company?item.company.company_type:''" v-show="selectVal.indexOf('公司类型')!=-1">{{item.company?item.company.company_type:''}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.company?item.company.legal:''" v-show="selectVal.indexOf('法人')!=-1">{{item.company?item.company.legal:''}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.company?item.company.linkman:''" v-show="selectVal.indexOf('负责人')!=-1">{{item.company?item.company.linkman:''}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.company?item.company.linkman_phone:''" v-show="selectVal.indexOf('负责人电话')!=-1">{{item.company?item.company.linkman_phone:''}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.company?item.company.business_address:''" v-show="selectVal.indexOf('营业地址')!=-1">{{item.company?item.company.business_address:''}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.company?item.company.place2:''" v-show="selectVal.indexOf('街道地址')!=-1">{{item.company?item.company.place2:''}}</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                    <a href="javascript:;" title="详情" class="candle-btn btn" @click.stop="openDetail(item)"><i class="fa fa-search-plus"></i></a>
                                    <a href="javascript:;" title="编辑" class="candle-btn btn" @click.stop="editItem(item)"><i class="fa fa-edit"></i></a>
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
            :visible.sync="detailShow"
            custom-class="dialog-modal2  dailog-p-t-n"
            :modal-append-to-body="false"
            :close-on-click-modal="false">
            <detail :data="dailogVal" @close="detailShow=false" :show="detailShow"></detail>
        </el-dialog>
        <el-dialog
            title="编辑"
            :visible.sync="editShow"
            custom-class="dialog-modal2  dailog-p-t-n"
            :modal-append-to-body="false"
            :close-on-click-modal="false">
            <edit-page :data="dailogVal" :show="editShow" @close="editShow=false"></edit-page>
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
    import SubHeader from '../common/subheader'
    import api from '@/api'
    import format from '@/tools/format'
    import SelectCheckbox from '@/components/SelectCheckbox'
    import SearchIpts from '../common/searchIpts'
    import Detail from './detail'
    import EditPage from './editPage'
    export default {
        data: () => ({
            data: {
                rows: [
                    {
                        id: '',
                        username: '代理商名称',
                        nickname: '',
                        address: '',
                        email: '',
                        mobile: '',
                        tel: '',
                        avatar: '',
                        company: {
                            agent_id: '',
                            company_name: '',
                            registration_number: '',
                            license: '',
                            legal: '',
                            organizing_code: '',
                            company_type: '',
                            registration_address: '',
                            business_address: '',
                            payee: '',
                            bank: '',
                            linkman: '',
                            linkman_phone: '',
                            company_phone: '',
                            taxpayer_code: '',
                            founding_date: '',
                            bank_account: '',
                            open_bank: '',
                            createtime: '',
                            updatetime: '',
                            place1: '',
                            place2: '',
                            registered_capital: '',
                            business_term: '',
                            business_scope: ''
                        }
                    }
                ],
                total: 1
            },
            detailShow: false,
            editShow: false,
            dailogVal: {},
            dailogVal1: {},
            type: 'add',
            selectVal: ['checkbox', '序号', '代理商名称', '公司类型', '法人', '负责人', '负责人电话', '营业地址', '街道地址', '操作'],
            selectedGroup: [],
            selectAll: false,
            showList: ['checkbox', '序号', '代理商名称', '公司类型', '法人', '负责人',  '负责人电话', '营业地址', '街道地址', '操作'],
            searchOptions: [
                {
                    type: 'text',
                    name: '代理商名称',
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
                    name: '代理商管理',
                    desc: '主要用来查看历史审核记录及其管理',
                    router: {
                        name: 'resource_agent'
                    }
                }
            }
        }),
        components: {
            SubHeader,
            SelectCheckbox,
            SearchIpts,
            Detail,
            EditPage
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
                    page: this.page,
                    limit: this.limit, // 每页限制数量
                    options: {
                        username: this.searchOptions[0].value
                    }
                }).then(res => {
                    this.loading = false
                    if (res.data.code === 1) {
                        this.data = res.data.data
                        console.log(this.data.rows[0])
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
            openDetail (item) {
                this.dailogVal = item
                this.detailShow = true
            },
            editItem (item) {
                this.dailogVal = item
                this.editShow = true
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
