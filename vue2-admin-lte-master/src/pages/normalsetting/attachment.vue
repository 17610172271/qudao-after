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
                                <a href="javascript:;" title="删除" class="app-add btn bg-red1 text-white" @click="delItem(selectedGroup.join(','))"><i class="fa fa-trash"></i>删除</a>
                                <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i class="fa fa-refresh"></i></div>
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
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('预览')!=-1">预览</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('物理路径')!=-1">物理路径</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('宽度')!=-1">宽度</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('高度')!=-1">高度</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('图片类型')!=-1">图片类型</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('存储引擎')!=-1">存储引擎</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('文件大小')!=-1">文件大小</li>
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('Mime类型')!=-1">Mime类型</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('创建日期')!=-1">创建日期</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item,index) in data.rows" @click="selectItem(item.id)">
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                                </li>
                                <li class="col-xs-24 p-n over-omit" :title="item.id" v-show="selectVal.indexOf('ID')!=-1">{{item.id}}</li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('预览')!=-1">
                                    <a class="block" :href="item.image" @click.stop target="_blank" style="max-height: 100px;overflow: hidden">
                                        <img :src="item.image" alt="" width="70%">
                                    </a>
                                </li>
                                <li class="col-xs-1 p-n over-omit" :title="item.image" v-show="selectVal.indexOf('物理路径')!=-1">{{item.image}}</li>
                                <li class="col-xs-24 p-n over-omit" :title="item.width" v-show="selectVal.indexOf('宽度')!=-1">{{item.width}}</li>
                                <li class="col-xs-24 p-n over-omit" :title="item.height" v-show="selectVal.indexOf('高度')!=-1">{{item.height}}</li>
                                <li class="col-xs-24 p-n over-omit" :title="item.type" v-show="selectVal.indexOf('图片类型')!=-1">{{item.type}}</li>
                                <li class="col-xs-24 p-n over-omit" :title="item.storage" v-show="selectVal.indexOf('存储引擎')!=-1">{{item.storage}}</li>
                                <li class="col-xs-24 p-n over-omit" :title="item.size" v-show="selectVal.indexOf('文件大小')!=-1">{{item.size}}</li>
                                <li class="col-xs-24 p-n over-omit" :title="item.mime" v-show="selectVal.indexOf('Mime类型')!=-1">{{item.mime}}</li>
                                <li class="col-xs-1 p-n over-omit" :title="item.create_time" v-show="selectVal.indexOf('创建日期')!=-1">{{item.create_time}}</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                    <a href="javascript:;" title="编辑" class="candle-btn btn" @click.stop="editItem(item)"><i class="fa fa-edit"></i></a>
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
            title="编辑"
            :visible.sync="editShow"
            custom-class="dialog-modal1"
            :modal-append-to-body="false"
            :close-on-click-modal="false">
            <div class="clear">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name text-bold">标题</div>
                <div class="col-xs-12 col-md-10 line-height-40 text-bold">内容</div>
            </div>
            <div class="clear m-b-sm">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">物理路径</div>
                <div class="col-xs-12 col-md-10 line-height-40 p-r-80 relative">
                    <el-input placeholder="请上传文件" v-model="dailogVal.image"></el-input>
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
            <div class="clear m-b-sm">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">宽度</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    <el-input placeholder="请输入SDK名称" v-model="dailogVal.width"></el-input>
                </div>
            </div>
            <div class="clear m-b-sm">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">高度</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    <el-input placeholder="请输入版本号" v-model="dailogVal.height"></el-input>
                </div>
            </div>
            <div class="clear m-b-sm">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">图片类型</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    <el-input placeholder="请输入支持平台" v-model="dailogVal.type"></el-input>
                </div>
            </div>
            <div class="clear m-b-sm">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">图片帧数</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    <el-input placeholder="请输入开发语言" v-model="dailogVal.type"></el-input>
                </div>
            </div>
            <div class="clear m-b-sm">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">文件大小</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    <el-input v-model="dailogVal.size"></el-input>
                </div>
            </div>
            <div class="clear m-b-sm">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name p-r-n">Mime类型</div>
                <div class="col-xs-12 col-md-10">
                    <el-input placeholder="请输入备注" v-model="dailogVal.mime"></el-input>
                </div>
            </div>
            <div class="clear m-b-sm">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">透传数据</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    <el-input v-model="dailogVal.size"></el-input>
                </div>
            </div>
            <div class="clear m-b-sm">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">上传时间</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    <el-input v-model="dailogVal.create_time"></el-input>
                </div>
            </div>
            <div class="clear">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">存储引擎</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    <el-input v-model="dailogVal.storage"></el-input>
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
            editShow: false,
            dailogVal: {},
            dailogVal1: {},
            header: {ContentType: 'application/x-www-form-urlencoded'},
            selectVal: ['checkbox', 'ID', '预览', '物理路径', '宽度', '高度', '图片类型', '存储引擎', '文件大小', 'Mime类型', '创建日期', '操作'],
            selectedGroup: [],
            selectAll: false,
            showList: ['checkbox', 'ID', '预览', '物理路径', '宽度', '高度',  '图片类型', '存储引擎', '文件大小', 'Mime类型', '创建日期', '操作'],
            searchOptions: [
                {
                    type: 'text',
                    name: 'ID',
                    value: null
                },
                {
                    type: 'text',
                    name: '物理路径',
                    value: null
                },
                {
                    type: 'time1',
                    name: '宽度',
                    value: null
                },
                {
                    type: 'select',
                    name: '高度',
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
                    name: '图片类型',
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
                    name: '常规管理',
                    router: {
                        name: 'normalsetting_system'
                    }
                },
                childNode: {
                    name: '附件管理',
                    desc: '主要用图片等附件的查看及操作',
                    router: {
                        name: 'normalsetting_attachment'
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
                this.$http.get(api.normalsetting.attachment, {
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
            delItem (id) {
                id += ''
                if (id) {
                    this.$confirm(id.split(',').length>1 ? '此操作将批量删除选中图片, 是否继续?' : '此操作将删除该图片, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http.get(api.normalsetting.attachmentDel, {
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
            editItem (item) {
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
                        name: '',
                        version: '',
                        platform: '',
                        language: '',
                        url: '',
                        size: '',
                        introduction: ''
                    }
                } else {
                    this.dailogVal = JSON.parse(JSON.stringify(this.dailogVal1))
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
