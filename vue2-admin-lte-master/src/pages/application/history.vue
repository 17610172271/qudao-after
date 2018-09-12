<template>
    <div v-loading="loading">
        <!--<div class="page-toolbar clear">-->
        <!--<div class="pull-left toolbar-candle">-->
        <!--<div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i class="fa fa-refresh"></i></div>-->
        <!--</div>-->
        <!--</div>-->
        <div class="lk-table m-t-sm" v-loading="loading">
            <ul class="table-thead clear">
                <li class="col-xs-1 p-n">序号</li>
                <li class="col-xs-2 p-n">应用名称</li>
                <li class="col-xs-2 p-n">操作人</li>
                <li class="col-xs-2 p-n">操作时间</li>
                <li class="col-xs-2 p-n">状态</li>
                <li class="col-xs-3 p-n">日志消息</li>
            </ul>
            <ul class="table-tbody clear" v-for="(item, index) in data.rows">
                <li class="col-xs-1 p-n" :title="item.id">{{offset + index + 1}}</li>
                <li class="col-xs-2 p-n over-omit" :title="item.app_name">{{item.app_name}}</li>
                <li class="col-xs-2 p-n over-omit" :title="item.candle_name">{{item.candle_name}}</li>
                <li class="col-xs-2 p-n over-omit" :title="item.candle_time">{{item.candle_time}}</li>
                <li class="col-xs-2 p-n over-omit" :title="item.status">{{item.status}}</li>
                <li class="col-xs-3 p-n over-omit" :title="item.message">{{item.message}}</li>
            </ul>
            <ul class="table-tbody" v-if="data.length===0">
                <li>暂时没有审核记录</li>
            </ul>
        </div>
        <div class="footer clear m-t-md">
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
            data: {},
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
                this.$http.get(api.application.history, {
                    params: {
//                        id: this.id
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
