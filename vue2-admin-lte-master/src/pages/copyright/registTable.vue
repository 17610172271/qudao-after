<template>
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
                <div class="pull-left btn opacity-8 search-btn" @click="searchShow = !searchShow"><i
                    class="fa fa-search" title="搜索"></i></div>
            </div>
        </div>
        <div class="lk-table m-t-sm" v-loading="loading">
            <ul class="table-thead clear">
                <!-- <li class="col-lg-1 col-md-1 col-sm-1 col-xs-1 clear app-first-item" v-if="selectVal.indexOf('ID')!=-1"><div class="pull-left"><input type="checkbox" v-model="selectAll"></div><div class="pull-left">ID</div></li> -->
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
                <li class="col-xs-3 p-n" v-show="selectVal.indexOf('电影名称')!=-1">电影名称</li>
                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                <li class="col-xs-3 p-n" v-show="selectVal.indexOf('录入时间')!=-1">录入时间</li>
                <li class="col-xs-3 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
            </ul>
            <ul class="table-tbody clear" v-for="(item, index) in data.rows">
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1">{{offset + index + 1}}</li>
                <li class="col-xs-3 p-n over-omit" v-show="selectVal.indexOf('电影名称')!=-1">{{item.film_name}}</li>
                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1">{{item.status}}</li>
                <li class="col-xs-3 p-n over-omit" v-show="selectVal.indexOf('录入时间')!=-1">{{item.create_time}}</li>
                <li class="col-xs-3 p-n" v-show="selectVal.indexOf('操作')!=-1">
                    <a href="javascript:;" title="版权登记" class="candle-btn btn" @click="regist(item)"><i class="fa fa-paper-plane blue"></i> <span class="text-md">版权登记</span></a>
                </li>
            </ul>
        </div>
        <div class="footer clear m-t-md">
            <div class="pull-left news-record text-lg">
                <span v-show="data.rows.length>0">显示{{offset + 1}}到{{offset + data.rows.length}}条消息，</span>共<span
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
        <el-dialog
            title="版权登记"
            :visible.sync="centerDialogVisible"
            custom-class="dialog-modal1 dailog-p-t-n"
            :close-on-click-modal="false">
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name"><span class="text-red">*</span>电影名称:</div>
                <div class="col-xs-12 col-md-9 line-height-40">
                    {{detailVal.film_name}}
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name"><span class="text-red">*</span>版权登记号:</div>
                <div class="col-xs-12 col-md-9">
                    <el-input placeholder="请输入版权登记号" style="max-width: 300px;" v-model="detailVal.copyright_id"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name"><span class="text-red">*</span>作品/制品名称:</div>
                <div class="col-xs-12 col-md-9">
                    <el-input placeholder="请输入作品/制品名称" style="max-width: 300px;" v-model="detailVal.product_name"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name">作品类别:</div>
                <div class="col-xs-12 col-md-9">
                    <el-input placeholder="请输入作品类别" style="max-width: 300px;" v-model="detailVal.product_type"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name">作者:</div>
                <div class="col-xs-12 col-md-9">
                    <el-input placeholder="请输入作者" style="max-width: 300px;" v-model="detailVal.writer"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name">著作权人:</div>
                <div class="col-xs-12 col-md-9">
                    <el-input placeholder="请输入著作权人" style="max-width: 300px;" v-model="detailVal.copyrighter"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name">首次发表时间:</div>
                <div class="col-xs-12 col-md-9">
                    <el-date-picker
                        v-model="detailVal.first_time"
                        type="date"
                        style="width: 100%;max-width: 300px;"
                        placeholder="选择首次发表时间">
                    </el-date-picker>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name">首次出版/制作时间:</div>
                <div class="col-xs-12 col-md-9">
                    <el-date-picker
                        v-model="detailVal.first_time1"
                        type="date"
                        style="width: 100%;max-width: 300px;"
                        placeholder="选择首次出版/制作时间">
                    </el-date-picker>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-3 line-height-40 text-right attr-edit-name"><span class="text-red">*</span>附件:</div>
                <div class="col-xs-12 col-md-9">
                    <div class="clear">
                        <div class="col-xs-9 p-n p-r-sm" style="max-width: 310px;">
                            <el-input placeholder="上传文件" v-model="detailVal.atta"></el-input>
                        </div>
                        <div class="col-xs-3 p-n">
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-success="handlePreview"
                                list-type="text">
                                <a href="javascript:;" class="btn bg-blue1 text-white add-upload-btn">上传文件</a>
                            </el-upload>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-center m-t-lg">
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                <el-button @click="centerDialogVisible = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
    import SelectCheckbox from '@/components/SelectCheckbox'
    import SearchIpts from '../common/searchIpts'
    import Detail from './detail.vue'
    import  api from '@/api'
    export default {
        components: {
            SelectCheckbox,
            SearchIpts,
            Detail
        },
        data: () => ({
            data: {
                rows: [],
                total: 1
            },
            detailVal: {
                id: null,
                film_name: null,
                copyright_name: null,
                copyright_id: null,
                product_name: null,
                status: null,
                remark: null
            },
            loading: false,
            centerDialogVisible: false,
            selectVal: ['序号', '电影名称', '状态', '录入时间', '操作'],
            selectedGroup: [],
            selectAll: false,
            showList: ['序号', '电影名称', '状态', '录入时间', '操作'],
            searchOptions: [
                {
                    type: 'text',
                    name: '电影名称',
                    value: null
                },
                {
                    type: 'time',
                    name: '录入时间',
                    value: null
                }
            ],
            options: [10, 25, 50],
            searchShow: false,
            limit: 10,
            page: 1
        }),
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
                this.$http.get(api.copyright.list, {
                    params: {
//                        offset: this.offset,
//                        limit: this.limit,
//                        film_name: this.searchOptions[0].value,
//                        create_time: this.searchOptions[1].value
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

            regist (item) {
                this.detailVal.id = item.id
                this.detailVal.film_name = item.film_name
                this.centerDialogVisible = true
            },
            doSearch (data) {
                this.searchOptions = data
                this.getList()
            },
            handlePreview () {},
            refresh () {
                this.getList()
            },
            delItem() {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            addPage () {
                if (this.page < this.pages) this.page += 1
            },
            delPage () {
                if (this.page > 1) this.page -= 1
            }
        },
        created () {
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