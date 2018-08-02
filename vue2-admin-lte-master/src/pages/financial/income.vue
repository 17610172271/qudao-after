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
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('日期')!=-1">日期</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('电影编号')!=-1">电影编号</li>
                                <li class="col-xs-3 p-n" v-show="selectVal.indexOf('电影名称')!=-1">电影名称</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('购买数量')!=-1">购买数量</li>
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('收入(元)')!=-1">收入(元)</li>
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('分成比例(%)')!=-1">分成比例(%)</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item,index) in data.rows">
                                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1">{{offset + index + 1}}</li>
                                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('日期')!=-1">{{item.date}}</li>
                                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('电影编号')!=-1">{{item.id}}</li>
                                <li class="col-xs-3 p-n over-omit" v-show="selectVal.indexOf('电影名称')!=-1">{{item.film_name}}</li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('购买数量')!=-1">{{item.num}}</li>
                                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('收入(元)')!=-1">{{item.income}}</li>
                                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('分成比例(%)')!=-1">{{item.ratio}}</li>
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
            :visible.sync="centerDialogVisible"
            custom-class="dialog-modal1"
            :close-on-click-modal="false">
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-2 line-height-40 text-right attr-edit-name">中文名称:</div>
                <div class="col-xs-12 col-md-10">
                    <el-input placeholder="请输入中文名称" style="max-width: 300px;"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-2 line-height-40 text-right attr-edit-name">电影编号:</div>
                <div class="col-xs-12 col-md-10">
                    <el-input style="max-width: 300px;" placeholder="请输入电影编号"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-2 line-height-40 text-right attr-edit-name">电影名称:</div>
                <div class="col-xs-12 col-md-10">
                    <el-date-picker
                        type="date"
                        style="max-width: 300px;"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-2 line-height-40 text-right attr-edit-name">国家:</div>
                <div class="col-xs-12 col-md-10">
                    <el-input style="max-width: 300px;" placeholder="请输入国家"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-2 line-height-40 text-right attr-edit-name">收入(元):</div>
                <div class="col-xs-12 col-md-8 line-height-40">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="2">女</el-radio>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-2 line-height-40 text-right attr-edit-name">图片:</div>
                <div class="col-xs-12 col-md-10 clear">
                    <el-input style="max-width: 300px;" class="pull-left m-r-sm" placeholder="请输入电影编号"></el-input>
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        class="pull-left line-height-40 height-40"
                        :on-success="handlePreview"
                        list-type="text">
                        <a href="javascript:;" class="btn bg-blue1 text-white add-upload-btn">上传文件</a>
                    </el-upload>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-2 line-height-40 text-right attr-edit-name">内容:</div>
                <div class="col-xs-12 col-md-8">
                    <el-input type="textarea" placeholder="请输入内容" rows="4"></el-input>
                </div>
            </div>
            <div class="clear m-b-md">
                <div class="col-xs-12 col-md-2 line-height-40 text-right attr-edit-name">分成比例(%):</div>
                <div class="col-xs-12 col-md-8 line-height-40">
                    <el-radio label="1">正常</el-radio>
                    <el-radio label="2">隐藏</el-radio>
                </div>
            </div>
            <div class="text-center m-t-lg">
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
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
        centerDialogVisible: false,
        selectVal: ['序号', '日期', '电影编号', '电影名称', '购买数量', '收入(元)', '分成比例(%)'],
        selectedGroup: [],
        selectAll: false,
        showList: ['序号', '日期', '电影编号', '电影名称', '购买数量', '收入(元)', '分成比例(%)'],
        searchOptions: [
            {
                type: 'time',
                name: '日期',
                value: null
            },
            {
                type: 'text',
                name: '电影名称',
                value: null
            },
            {
                type: 'text',
                name: '电影类型',
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
                name: '财务管理',
                router: {
                    name: 'financial_list'
                }
            },
            childNode: {
                name: '收入统计',
                desc: '主要用来绑定应用和应用列表的查看',
                router: {
                    name: 'financial_income'
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
            this.$http.get(api.financial.income, {
                params: {
//                    offset: this.offset,
//                    limit: this.limit,
//                    date: this.searchOptions[0].value,
//                    film_name: this.searchOptions[1].value,
//                    film_type: this.searchOptions[2].value
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
        delItem () {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                })
            })
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
<style>

</style>
