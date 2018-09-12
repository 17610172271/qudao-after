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
                                <a href="javascript:;" title="添加" class="app-add btn bg-blue1 text-white" @click="addItem"><i class="fa fa-trash"></i>添加</a>
                                <a href="javascript:;" title="删除" class="app-add btn bg-red1 text-white" @click="delItem(selectedGroup.join(','))"><i class="fa fa-trash"></i>删除</a>
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
                                    <a href="javascript:;" title="详情" class="candle-btn btn" @click.stop="openDetail(item)"><i class="fa fa-search-plus"></i></a>
                                    <a href="javascript:;" title="编辑" class="candle-btn btn" @click.stop="editItem(item)"><i class="fa fa-edit"></i></a>
                                    <a :href="item.url" title="下载" download class="candle-btn btn" @click.stop><i class="fa fa-download"></i></a>
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
            title="详情"
            :visible.sync="detailShow"
            custom-class="dialog-modal1"
            :modal-append-to-body="false"
            :close-on-click-modal="false">
            <div class="clear">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name text-bold">标题</div>
                <div class="col-xs-12 col-md-10 line-height-40 text-bold">内容</div>
            </div>
            <div class="clear bg-f9">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">文档类型</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    {{dailogVal.type}}
                </div>
            </div>
            <div class="clear">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">文档名称</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    {{dailogVal.name}}
                </div>
            </div>
            <div class="clear bg-f9">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">上传人</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    {{dailogVal.upload_name}}
                </div>
            </div>
            <div class="clear">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">上传路径</div>
                <div class="col-xs-12 col-md-10 p-v-sm">
                    {{dailogVal.url}}
                </div>
            </div>
            <div class="clear bg-f9">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">备注</div>
                <div class="col-xs-12 col-md-10 p-v-sm">
                    {{dailogVal.remark}}
                </div>
            </div>
            <div class="text-center m-t-lg">
                <el-button type="primary" @click="detailShow = false">确 定</el-button>
                <!--<el-button @click="centerDialogVisible = false">取 消</el-button>-->
            </div>
        </el-dialog>
        <el-dialog
            :title="type=='edit'?'编辑':'添加'"
            :visible.sync="editShow"
            custom-class="dialog-modal1"
            :modal-append-to-body="false"
            :close-on-click-modal="false">
            <div class="clear">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name text-bold">标题</div>
                <div class="col-xs-12 col-md-10 line-height-40 text-bold">内容</div>
            </div>
            <div class="clear m-b-sm">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">文档类型</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    <el-input placeholder="请输入文档类型" v-model="dailogVal.type"></el-input>
                </div>
            </div>
            <div class="clear m-b-sm">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">文档名称</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    <el-input placeholder="请输入文档名称" v-model="dailogVal.name"></el-input>
                </div>
            </div>
            <div class="clear m-b-sm" v-if="type=='edit'">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">上传人</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    <el-input placeholder="请输入上传人" v-model="dailogVal.upload_name"></el-input>
                </div>
            </div>
            <div class="clear m-b-sm">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">上传路径</div>
                <div class="col-xs-12 col-md-10 line-height-40 p-r-80 relative">
                    <el-input placeholder="请上传文件" v-model="dailogVal.url"></el-input>
                    <el-upload
                        class=" btn-upload"
                        :action="uploadUrl"
                        :on-success="picUpload"
                        :before-upload="uploadBefore"
                        :headers="header"
                        accept="image/*"
                        :show-file-list="false"
                        list-type="text">
                        <a href="javascript:;" class="btn bg-blue1 text-white add-upload-btn" style="height: 40px;line-height: 26px;">上传</a>
                    </el-upload>
                </div>
            </div>
            <div class="clear">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">备注</div>
                <div class="col-xs-12 col-md-10">
                    <el-input placeholder="请输入备注" type="textarea" rows="4" v-model="dailogVal.remark"></el-input>
                </div>
            </div>
            <div class="text-center m-t-lg">
                <el-button type="primary" @click="submit">确 定</el-button>
                <el-button @click="reset">重 置</el-button>
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
            detailShow: false,
            dailogVal: {},
            dailogVal1: {},
            editShow: false,
            type: 'add',
            header: {ContentType: 'application/x-www-form-urlencoded'},
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
            },
            uploadUrl () {
                return api.common.upload
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
            openDetail (item) {
                this.dailogVal = item
                this.detailShow = true
            },
            addItem () {
                this.type = 'add'
                this.dailogVal = {
                    type: '',
                    name: '',
                    url: '',
                    remark: ''
                }
                this.editShow = true
            },
            editItem (item) {
                this.type = 'edit'
                this.dailogVal = JSON.parse(JSON.stringify(item))
                this.dailogVal1 = JSON.parse(JSON.stringify(item))
                this.editShow = true
            },
            submit () {
                console.log(this.dailogVal)
                this.editShow = false
            },
            reset () {
                if (this.type === 'add') {
                    this.dailogVal = {
                        type: '',
                        name: '',
                        url: '',
                        remark: ''
                    }
                } else {
                    this.dailogVal = JSON.parse(JSON.stringify(this.dailogVal1))
                }
            },
            delItem (id) {
                id += ''
                if (id) {
                    this.$confirm(id.split(',').length>1 ? '此操作将批量删除选中图片, 是否继续?' : '此操作将删除该图片, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.get(api.file.docDel, {
                            params: {
//                                id: id
                            }
                        }).then(res => {
                            if (res.data.code === 1) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功'
                                })
                                this.getList()
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.data.msg
                                })
                            }
                        })
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请选中需要删除的项'
                    })
                }
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
            picUpload () {
            },
            uploadBefore () {

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
