<template>
    <div v-loading="loading">
        <div class="page-toolbar clear">
            <div class="pull-left toolbar-candle">
                <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i class="fa fa-refresh"></i></div>
            </div>
        </div>
        <div class="lk-table m-t-sm" v-loading="loading">
            <ul class="table-thead clear">
                <li class="col-xs-2 p-n">影片编号</li>
                <li class="col-xs-2 p-n">电影名称</li>
                <li class="col-xs-2 p-n">操作者</li>
                <li class="col-xs-2 p-n">操作时间</li>
                <li class="col-xs-2 p-n">状态</li>
                <li class="col-xs-2 p-n">日志消息</li>
            </ul>
            <ul class="table-tbody clear" v-for="(item, index) in data.rows">
                <li class="col-xs-2 p-n">{{item.id}}</li>
                <li class="col-xs-2 p-n over-omit">{{item.film_name}}</li>
                <li class="col-xs-2 p-n over-omit">{{item.operator}}</li>
                <li class="col-xs-2 p-n over-omit">{{item.operate_time}}</li>
                <li class="col-xs-2 p-n over-omit">{{item.status}}</li>
                <li class="col-xs-2 p-n over-omit">{{item.log}}</li>
            </ul>
        </div>
        <div class="footer clear m-t-md">
            <!--<div class="pull-left news-record text-lg">-->
                <!--<span v-show="data.rows.length>0">显示{{offset + 1}}到{{offset + data.rows.length}}条消息，</span>共<span-->
                <!--class="text-blue">{{data.total}}</span>条记录 每页显示-->
                <!--<el-select v-model="limit" placeholder="请选择" style="width: 66px;">-->
                    <!--<el-option-->
                        <!--v-for="(item,index) in options"-->
                        <!--:key="index"-->
                        <!--:label="item"-->
                        <!--:value="item">-->
                    <!--</el-option>-->
                <!--</el-select>-->
                <!--条记录-->
            <!--</div>-->
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
</template>
<script type="text/ecmascript-6">
    import api from '@/api'
    
    export default {
        props: {
            id: ''
        },
        data: () => ({
            data: {
                rows: [],
                total: 0
            },
            loading: false,
            options: [8, 20, 50],
            limit: 8,
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
        components: {},
        methods: {
            getList () {
                this.loading = true
                this.$http.get(api.copyright.history, {
                    params: {
//                        id: this.id,
//                        offset: this.offset,
//                        limit: this.limit
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
                this.getList()
            },
            addPage () {
                if (this.page < this.pages) this.page += 1
            },
            delPage () {
                if (this.page > 1) this.page -= 1
            }
        },
        created() {
            this.getList()
        },
        watch: {
            page (val) {
                this.getList()
            },
            limit (val) {
                this.getList()
            },
            id (val) {
                this.getList()
            }
        }
    }
</script>
<style>

</style>
