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
                                <div class="pull-left btn opacity-8 search-btn" @click="searchShow = !searchShow"><i
                                    class="fa fa-search" title="搜索"></i></div>
                            </div>
                        </div>
                        <div class="lk-table m-t-sm">
                            <ul class="table-thead clear">
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox v-model="selectAll">全选</el-checkbox>
                                </li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
                                <li class="col-xs-3 p-n" v-show="selectVal.indexOf('标题')!=-1">标题</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('公告类型')!=-1">公告类型</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('创建时间')!=-1">创建时间</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('更新时间')!=-1">更新时间</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item, index) in data.rows">
                                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1">
                                    <el-checkbox :label="item.id" v-model="selectedGroup"></el-checkbox>
                                </li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1">{{offset + index + 1}}</li>
                                <li class="col-xs-3 p-n over-omit" v-show="selectVal.indexOf('标题')!=-1" :title="item.title">{{item.title}}</li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('公告类型')!=-1" :title="item.data_type">{{item.data_type}}</li>
                                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('创建时间')!=-1" :title="format(item.create_time*1000)">{{format(item.create_time*1000)}}</li>
                                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('更新时间')!=-1" :title="format(item.update_time*1000)">{{format(item.update_time*1000)}}</li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1" :title="item.status">{{item.status}}</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">
                                    <a href="javascript:;" title="详情" class="candle-btn btn" @click.stop="openDetail(item)"><i class="fa fa-search-plus"></i></a>
                                    <a href="javascript:;" title="编辑" class="candle-btn btn"@click.stop="editItem(item)"><i class="fa fa-edit"></i></a>
                                    <a href="javascript:;" title="删除" class="candle-btn btn"@click.stop="delItem(item.id)"><i class="fa fa-trash"></i></a>
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
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">消息类型</div>
                <div class="col-xs-12 col-md-10 line-height-40">{{dailogVal.data_type}}</div>
            </div>
            <div class="clear">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">标题</div>
                <div class="col-xs-12 col-md-10 line-height-40">{{dailogVal.title}}</div>
            </div>
            <div class="clear bg-f9">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">内容</div>
                <div class="col-xs-12 col-md-10 line-height-40">{{dailogVal.content}}</div>
            </div>
            <div class="clear">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">状态</div>
                <div class="col-xs-12 col-md-10 line-height-40">{{dailogVal.status}}</div>
            </div>
            <div class="text-center m-t-lg">
                <el-button type="primary" @click="detailShow = false">确 定</el-button>
                <!--<el-button @click="centerDialogVisible = false">取 消</el-button>-->
            </div>
        </el-dialog>
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
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">消息类型</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    <el-radio v-model="dailogVal.data_type" :label="2">前台消息</el-radio>
                    <el-radio v-model="dailogVal.data_type" :label="1">后台消息</el-radio>
                    <el-radio v-model="dailogVal.data_type" :label="0">全部</el-radio>
                </div>
            </div>
            <div class="clear m-b-sm">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">标题</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    <el-input placeholder="请输入标题" v-model="dailogVal.title"></el-input>
                </div>
            </div>
            <div class="clear m-b-sm">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">内容</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    <el-input placeholder="请输入内容" type="textarea" rows="4" v-model="dailogVal.content"></el-input>
                </div>
            </div>
            <div class="clear">
                <div class="col-xs-12 col-md-2 line-height-40 attr-edit-name">状态</div>
                <div class="col-xs-12 col-md-10 line-height-40">
                    <el-radio v-model="dailogVal.status" :label="0">隐藏</el-radio>
                    <el-radio v-model="dailogVal.status" :label="1">正常</el-radio>
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
            editShow: false,
            dailogVal: {
                data_type: null,
                title: null,
                content: null,
                status: null
            },
            dailogVal1: {},
            type: '',
            selectVal: ['checkbox', '序号', '标题', '公告类型', '创建时间', '更新时间', '状态', '操作'],
            selectedGroup: [],
            selectAll: false,
            showList: ['checkbox', '序号', '标题', '公告类型', '创建时间', '更新时间', '状态', '操作'],
            searchOptions: [
                {
                    type: 'text',
                    name: '公告标题',
                    value: null
                },
                {
                    type: 'text',
                    name: '公告内容',
                    value: null
                },
                {
                    type: 'select',
                    name: '状态',
                    value: null,
                    options: [
                        {
                            value: 0,
                            label: '隐藏'
                        },
                        {
                            value: 1,
                            label: '正常'
                        }
                    ]
                },
                {
                    type: 'select',
                    name: '公告类型',
                    value: null,
                    options: [
                        {
                            value: 0,
                            label: '全部消息'
                        },
                        {
                            value: 1,
                            label: '后台消息'
                        },
                        {
                            value: 2,
                            label: '前台消息'
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
                    name: '系统设置',
                    router: {
                        name: 'setting_news'
                    }
                },
                childNode: {
                    name: '系统公告',
                    desc: '主要用来绑定应用和应用列表的查看',
                    router: {
                        name: 'setting_notice'
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
                this.$http.post(api.setting.notice, {
                    page: this.page,
                    limit: this.limit,
                    options: {
                        title: this.searchOptions[0].value,
                        content: this.searchOptions[1].value,
                        status: this.searchOptions[2].value,
                        data_type: this.searchOptions[3].value
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
            openDetail (item) {
                this.dailogVal = item
                this.detailShow = true
            },
            editItem (item) {
                this.dailogVal = JSON.parse(JSON.stringify(item))
                this.dailogVal1 = JSON.parse(JSON.stringify(item))
                this.dailogVal.status = this.dailogVal.status === '正常' ?  1 : 0
                this.dailogVal.data_type = this.dailogVal.data_type === '前台消息' ?  2 : (this.dailogVal.data_type === '后台消息' ? 1 : 0)
                this.editShow = true
                this.type = 'edit'
            },
            addItem () {
                this.dailogVal = {
                    data_type: null,
                    title: null,
                    content: null,
                    status: null
                }
                this.editShow = true
                this.type = 'add'
            },
            reset () {
                if (this.type === 'add') {
                    this.dailogVal = {
                        data_type: null,
                        title: null,
                        content: null,
                        status: null
                    }
                } else {
                    this.dailogVal = JSON.parse(JSON.stringify(this.dailogVal1))
                }
            },
            submit () {
                if (this.dailogVal.title && this.dailogVal.content && this.dailogVal.data_type!==null && this.dailogVal.status!==null) {
                    if (this.type === 'add') {
                        this.$http.post(api.setting.noticeAdd, this.dailogVal).then(res => {
                            if (res.data.code === 1) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                })
                                this.editShow = false
                                this.getList()
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.data.msg
                                })
                            }
                        })
                    } else {
                        this.$http.post(api.setting.noticeEdit, this.dailogVal).then(res => {
                            if (res.data.code === 1) {
                                this.$message({
                                    type: 'success',
                                    message: '编辑成功'
                                })
                                this.editShow = false
                                this.getList()
                            } else {
                                this.$message({
                                    type: 'warning',
                                    message: res.data.msg
                                })
                            }
                        })
                    }
                } else {
                    this.$message({
                        type: 'warning',
                        message: '还有内容未填写完整'
                    })
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
                        this.$http.get(api.setting.noticeDel, {
                            params: {
                                id: id
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
                this.$router.replace({name: 'setting_notice', query: {page: val}})
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
