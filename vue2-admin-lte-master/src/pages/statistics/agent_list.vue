<template>
    <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="m-t-sm" v-loading="loading">
                    <div id="echarts-agent">

                    </div>
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
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
                                <li class="col-xs-5 p-n" v-show="selectVal.indexOf('注册用户')!=-1">注册用户</li>
                                <li class="col-xs-5 p-n" v-show="selectVal.indexOf('注册时间')!=-1">注册时间</li>
                            </ul>
                            <ul class="table-tbody clear" v-for="(item,index) in data.rows">
                                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('序号')!=-1">{{offset + index + 1}}</li>
                                <li class="col-xs-5 p-n over-omit" :title="item.username" v-show="selectVal.indexOf('注册用户')!=-1">{{item.username}}</li>
                                <li class="col-xs-5 p-n over-omit" :title="item.create_time" v-show="selectVal.indexOf('注册时间')!=-1">{{item.create_time}}</li>
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
            selectVal: ['序号', '注册用户', '注册时间'],
            selectedGroup: [],
            selectAll: false,
            showList: ['序号', '注册用户', '注册时间'],
            searchOptions: [
                {
                    type: 'time',
                    name: '注册时间',
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
                    name: '数据统计',
                    router: {
                        name: 'statistics_agent'
                    }
                },
                childNode: {
                    name: '代理商注册统计',
                    desc: '主要用于统计代理商用户的注册情况',
                    router: {
                        name: 'statistics_agent'
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
                this.$http.get(api.statistics.agent, {
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
                        this.drawLine()
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
            drawLine () {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('echarts-agent'))
                // 绘制图表
                var data = []
                var column = []
                for (let key in this.data.dayList) {
                    data.push(this.data.dayList[key])
                    column.push(key)
                }
                myChart.setOption({
                    title: {
                        left: 'center',
                        text: '注册用户数量统计图'
                    },
                    tooltip: {trigger: 'axis'},
                    legend: {
                        x: 'center',
                        y: 'bottom'
                    },
                    grid: {
                        left: '2%', // 图表距边框的距离
                        top: '20%',
                        right: '4%',
                        bottom: '15%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: column
                    },
                    yAxis: {},
                    series: [
                        {
                            name: '营业额',
                            color: ['RGBA(252, 214, 131)'],
                            type: 'line',
//                            smooth: true,
//                            itemStyle: {normal: {areaStyle: {type: 'default'}}},
                            data: data
                        }
                    ]
                })
                myChart.resize()
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
        mounted () {
            let that = this
            window.addEventListener('resize', function () {
                that.drawLine()
            })
        },
        watch: {
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
    #echarts-agent {
        height: 300px;
    }
</style>
