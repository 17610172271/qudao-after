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
                                <a href="javascript:;" title="删除" class="app-add btn bg-red1 text-white" @click="delItem(selectedGroup.join(','))"><i class="fa fa-trash"></i>删除</a>
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
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('意见编号')!=-1">意见编号</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('意见类别')!=-1">意见类别</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('意见内容')!=-1">意见内容</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('附件')!=-1">附件</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('反馈用户')!=-1">反馈用户</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('用户电话')!=-1">用户电话</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('反馈时间')!=-1">反馈时间</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item, index) in data.rows" @click="selectItem(item.id)">
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                                </li>
                                <li class="col-xs-1 p-n over-omit" :title="item.id" v-show="selectVal.indexOf('意见编号')!=-1">{{item.id}}</li>
                                <li class="col-xs-24 p-n over-omit" :title="item.type" v-show="selectVal.indexOf('意见类别')!=-1">{{item.type}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.content" v-show="selectVal.indexOf('意见内容')!=-1">{{item.content}}</li>
                                <li class="col-xs-24 p-n over-omit" :title="item.attachment" v-show="selectVal.indexOf('附件')!=-1">{{item.attachment}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.suggest_name" v-show="selectVal.indexOf('反馈用户')!=-1">{{item.suggest_name}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.suggest_tel" v-show="selectVal.indexOf('用户电话')!=-1">{{item.suggest_tel}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.suggest_time" v-show="selectVal.indexOf('反馈时间')!=-1">{{item.suggest_time}}</li>
                                <li class="col-xs-14 p-n over-omit" :title="item.status" v-show="selectVal.indexOf('状态')!=-1">{{item.status}}</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                    <a href="javascript:;" title="详情" class="candle-btn btn" @click.stop="showDetail(item.id)"><i class="fa fa-search-plus"></i></a>
                                    <a href="javascript:;" title="编辑" class="candle-btn btn" @click.stop="editItem(item.id)"><i class="fa fa-edit"></i></a>
                                    <a href="javascript:;" title="删除" class="candle-btn btn" @click.stop="delItem(item.id)"><i class="fa fa-trash"></i></a>
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
            :title="type=='detail' ? '详情' : '编辑'"
            :visible.sync="centerDialogVisible"
            custom-class="dialog-modal1"
            width="60%"
            :close-on-click-modal="false">
            <div class="clear" :class="{'m-b-md': type=='edit'}">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">意见类别:</div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-if="type==='detail'">
                    {{dailogVal.copyright_name}}
                </div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-else>
                    <el-input v-model="dailogVal.copyright_name" disabled></el-input>
                </div>
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">意见内容:</div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-if="type==='detail'">
                    {{dailogVal.company_name}}
                </div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-else>
                    <el-input v-model="dailogVal.company_name"></el-input>
                </div>
            </div>
            <div class="clear" :class="{'m-b-md': type=='edit'}">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">营业注册号:</div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-if="type==='detail'">
                    {{dailogVal.regist_num}}
                </div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-else>
                    <el-input v-model="dailogVal.regist_num"></el-input>
                </div>
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">用户电话:</div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-if="type==='detail'">
                    {{dailogVal.contact_person}}
                </div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-else>
                    <el-input v-model="dailogVal.contact_person"></el-input>
                </div>
            </div>
            <div class="clear" :class="{'m-b-md': type=='edit'}">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">营业执照:</div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-if="type==='detail'">
                    <img :src="dailogVal.license" alt="" width="70%">
                </div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-else>
                    <el-input v-model="dailogVal.license"></el-input>
                </div>
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">用户电话电话:</div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-if="type==='detail'">
                    {{dailogVal.contact_tel}}
                </div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-else>
                    <el-input v-model="dailogVal.contact_tel"></el-input>
                </div>
            </div>
            <div class="clear" :class="{'m-b-md': type=='edit'}">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">反馈用户:</div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-if="type==='detail'">
                    {{dailogVal.legal_person}}
                </div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-else>
                    <el-input v-model="dailogVal.legal_person"></el-input>
                </div>
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">公司固话:</div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-if="type==='detail'">
                    {{dailogVal.company_num}}
                </div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-else>
                    <el-input v-model="dailogVal.company_num"></el-input>
                </div>
            </div>
            <div class="clear" :class="{'m-b-md': type=='edit'}">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">组织机构代码:</div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-if="type==='detail'">
                    {{dailogVal.organization_code}}
                </div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-else>
                    <el-input v-model="dailogVal.organization_code"></el-input>
                </div>
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">纳税人识别号:</div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-if="type==='detail'">
                    {{dailogVal.registration_num}}
                </div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-else>
                    <el-input v-model="dailogVal.registration_num"></el-input>
                </div>
            </div>
            <div class="clear" :class="{'m-b-md': type=='edit'}">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">附件:</div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-if="type==='detail'">
                    {{dailogVal.company_type}}
                </div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-else>
                    <el-input v-model="dailogVal.company_type"></el-input>
                </div>
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">成立日期:</div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-if="type==='detail'">
                    {{dailogVal.setup_time}}
                </div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-else>
                    <el-input v-model="dailogVal.setup_time"></el-input>
                </div>
            </div>
            <div class="clear" :class="{'m-b-md': type=='edit'}">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">注册地址:</div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-if="type==='detail'">
                    {{dailogVal.regist_address}}
                </div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-else>
                    <el-input v-model="dailogVal.regist_address"></el-input>
                </div>
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">街道地址:</div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-if="type==='detail'">
                    {{dailogVal.regist_address1}}
                </div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-else>
                    <el-input v-model="dailogVal.regist_address1"></el-input>
                </div>
            </div>
            <div class="clear" :class="{'m-b-md': type=='edit'}">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">状态:</div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-if="type==='detail'">
                    {{dailogVal.operate_address}}
                </div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-else>
                    <el-input v-model="dailogVal.operate_address"></el-input>
                </div>
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">街道地址:</div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-if="type==='detail'">
                    {{dailogVal.operate_address1}}
                </div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-else>
                    <el-input v-model="dailogVal.operate_address1"></el-input>
                </div>
            </div>
            <div class="clear" :class="{'m-b-md': type=='edit'}">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">收款人姓名:</div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-if="type==='detail'">
                    {{dailogVal.collection_name}}
                </div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-else>
                    <el-input v-model="dailogVal.collection_name"></el-input>
                </div>
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">银行账号:</div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40 wrap-line" v-if="type==='detail'">
                    {{dailogVal.bank_num}}
                </div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-else>
                    <el-input v-model="dailogVal.bank_num"></el-input>
                </div>
            </div>
            <div class="clear" :class="{'m-b-md': type=='edit'}">
                <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">开户行:</div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-if="type==='detail'">
                    {{dailogVal.bank_name}}
                </div>
                <div class="col-xs-12 col-sm-4 p-n line-height-40" v-else>
                    <el-input v-model="dailogVal.bank_name"></el-input>
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
                copyright_name: null
            },
            type: '',
            centerDialogVisible: false,
            selectVal: ['checkbox', '意见编号', '意见类别', '意见内容', '附件', '反馈用户', '用户电话', '反馈时间', '状态', '操作'],
            selectedGroup: [],
            selectAll: false,
            showList: ['checkbox', '意见编号', '意见类别', '意见内容', '附件', '反馈用户', '用户电话', '反馈时间', '状态', '操作'],
            searchOptions: [
                {
                    type: 'text',
                    name: '意见类别',
                    value: null
                },
                {
                    type: 'text',
                    name: '意见内容',
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
                    name: '系统设置',
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
//                        copyright_name: this.searchOptions[0].value,
//                        company_name: this.searchOptions[1].value
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
            getData (id) {
                this.$http.get(api.setting.infoDetail, {
                    params: {
//                        id: id
                    }
                }).then(res => {
                    if (res.data.code === 1) {
                        this.dailogVal = res.data.data
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
            showDetail (id) {
                this.type = 'detail'
                this.getData(id)
                this.centerDialogVisible = true
            },
            dailogSubmit () {
                if (this.type === 'edit') {
                    this.$http.get(api.setting.infoEdit, {
                        params: {
//                            ...this.dailogVal
                        }
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.centerDialogVisible = false
                            this.$message({
                                type: 'success',
                                message: '保存成功'
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
                    this.centerDialogVisible = false
                }
            },
            editItem (id) {
                this.type = 'edit'
                this.getData(id)
                this.centerDialogVisible = true
            },
            delItem (id) {
                if (id) {
                    this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(res => {
                        this.$http.get(api.setting.infoDel, {
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
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请选中需要操作的项'
                    })
                }
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
<style scoped>
    .lk-table .p-n {
        padding-left: 0;
        padding-right: 0;
    }
</style>
