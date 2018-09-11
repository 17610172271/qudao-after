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
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1">ID</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('文档名称')!=-1">文档名称</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('文档类型')!=-1">文档类型</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('上传人')!=-1">上传人</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('上传时间')!=-1">上传时间</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('备注')!=-1">备注</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item,index) in data.rows" @click="selectItem(item.id)">
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                                </li>
                                <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('ID')!=-1">{{item.id}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.name" v-show="selectVal.indexOf('文档名称')!=-1">{{item.name}}</li>
                                <li class="col-xs-24 p-n over-omit" :title="item.type" v-show="selectVal.indexOf('文档类型')!=-1">{{item.type}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.upload_name" v-show="selectVal.indexOf('上传人')!=-1">{{item.upload_name}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.upload_time" v-show="selectVal.indexOf('上传时间')!=-1">{{item.upload_time}}</li>
                                <li class="col-xs-2 p-n over-omit" :title="item.remark" v-show="selectVal.indexOf('备注')!=-1">{{item.remark}}</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                    <a href="javascript:;" title="详情" class="candle-btn btn"><i class="fa fa-search-plus"></i></a>
                                    <a href="javascript:;" title="编辑" class="candle-btn btn"><i class="fa fa-edit"></i></a>
                                    <a href="javascript:;" title="下载" class="candle-btn btn"><i class="fa fa-download"></i></a>
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
            centerDialogVisible: false,
            selectVal: ['checkbox', 'ID', '文档名称', '文档类型', '上传人', '上传时间', '备注', '操作'],
            selectedGroup: [],
            selectAll: false,
            showList: ['checkbox', 'ID', '文档名称', '文档类型', '上传人', '上传时间',  '备注', '操作'],
            searchOptions: [
                {
                    type: 'text',
                    name: '文档名称',
                    value: null
                },
                {
                    type: 'text',
                    name: '文档类型',
                    value: null
                },
                {
                    type: 'time1',
                    name: '上传人',
                    value: null
                },
                {
                    type: 'select',
                    name: '上传时间',
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
                    name: '备注',
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
                    name: '文件管理',
                    router: {
                        name: 'file_doc'
                    }
                },
                childNode: {
                    name: '文档管理',
                    desc: '主要用于文档的查看、编辑、下载、删除',
                    router: {
                        name: 'file_doc'
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
                this.$http.post(api.file.doc, {
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
