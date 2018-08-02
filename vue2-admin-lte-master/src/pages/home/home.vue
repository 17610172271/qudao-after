<template>
    <div class="animated fadeIn" v-loading="loading">
        <div class="home-content">
            <div class="today-data">
                <h3>平台概述<span class="text-lg">平台数据统计</span></h3>
                <div class="container-fluid m-t-md">
                    <div class="row">
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3-5 p-r-sm p-n">
                            <div class="home-data-item ">
                                <div class="data-item-icon bg-blue1"><i class="fa fa-copyright"></i></div>
                                <div class="text-md data-item-title">电影版权量</div>
                                <div class="text-lg data-item-content" v-if="data.copyright_num<10000"><span class="text-bold text-xlg">{{data.copyright_num}}</span> 部</div>
                                <div class="text-lg data-item-content" v-else><span class="text-bold text-xlg">{{parseInt(data.copyright_num / 100) / 100}}</span> 万部</div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3-5 p-r-sm p-n">
                            <div class="home-data-item">
                                <div class="data-item-icon bg-green"><i class="fa fa-wpforms"></i></div>
                                <div class="text-md data-item-title">今日录入版权</div>
                                <div class="text-lg data-item-content" v-if="data.copyright_today<10000"><span class="text-bold text-xlg">{{data.copyright_today}}</span> 部</div>
                                <div class="text-lg data-item-content" v-else><span class="text-bold text-xlg">{{parseInt(data.copyright_today / 100)/100}}</span> 万部</div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3-5 p-r-sm p-n">
                            <div class="home-data-item">
                                <div class="data-item-icon bg-orange"><i class="fa fa-question-circle-o text-40"></i>
                                </div>
                                <div class="text-md data-item-title">未审核版权</div>
                                <div class="text-lg data-item-content" v-if="data.copyright_wait < 10000"><span class="text-bold text-xlg">{{data.copyright_wait}}</span> 部</div>
                                <div class="text-lg data-item-content" v-else><span class="text-bold text-xlg">{{parseInt(data.copyright_wait/100)/100}}</span> 万部</div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3-5 p-r-sm p-n">
                            <div class="home-data-item">
                                <div class="data-item-icon bg-yellow"><i class="fa fa-check-circle-o text-40"></i></div>
                                <div class="text-md data-item-title">审核通过版权</div>
                                <div class="text-lg data-item-content" v-if="data.copyright_pass<10000"><span class="text-bold text-xlg">{{data.copyright_pass}}</span> 部</div>
                                <div class="text-lg data-item-content" v-else><span class="text-bold text-xlg">{{parseInt(data.copyright_pass/100)/100}}</span> 万部</div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-3-5 p-r-sm p-n">
                            <div class="home-data-item">
                                <div class="data-item-icon bg-red"><i class="fa fa-times-circle-o text-40"></i></div>
                                <div class="text-md data-item-title">审核未通过版权</div>
                                <div class="text-lg data-item-content" v-if="data.copyright_notpass<10000"><span class="text-bold text-xlg">{{data.copyright_notpass}}</span> 部</div>
                                <div class="text-lg data-item-content" v-else><span class="text-bold text-xlg">{{parseInt(data.copyright_notpass/100)/100}}</span> 万部</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="home-chart m-t-lg bg-white">
                <div class="home-chart-title clear">
                    <div class="pull-left text-xxlg p-l-lg today-chart-title"><span
                        class="fa fa-calendar-check-o m-r-15"></span>数据统计图
                    </div>
                    <ul class="pull-right clear text-xlg show-days hidden-xs">
                        <li class="pull-left p-o-md cursor-p"
                            :class="{'chart-selected': !$route.query.chartData || $route.query.chartData==7}"
                            @click="drawLine(7)">最近7天
                        </li>
                        <li class="pull-left p-o-md cursor-p" :class="{'chart-selected': $route.query.chartData==15}"
                            @click="drawLine(15)">最近15天
                        </li>
                        <li class="pull-left p-o-md cursor-p b-r-n"
                            :class="{'chart-selected': $route.query.chartData==30}" @click="drawLine(30)">最近30天
                        </li>
                    </ul>
                    <ul class="pull-right clear text-xlg show-days hidden-sm hidden-md hidden-lg">
                        <li class="pull-left p-o-md cursor-p"
                            :class="{'chart-selected': !$route.query.chartData || $route.query.chartData==7}"
                            @click="drawLine(7)">7天
                        </li>
                        <li class="pull-left p-o-md cursor-p" :class="{'chart-selected': $route.query.chartData==15}"
                            @click="drawLine(15)">15天
                        </li>
                        <li class="pull-left p-o-md cursor-p b-r-n"
                            :class="{'chart-selected': $route.query.chartData==30}" @click="drawLine(30)">30天
                        </li>
                    </ul>
                </div>
                <div id="homeChart" class="chart-container"></div>
            </div>
            <div class="m-t-md">
                <h3>电影版权录入员录入数据</h3>
                <div class="lk-table m-t-sm">
                    <ul class="table-thead clear text-bold">
                        <li class="col-xs-2">录入人姓名</li>
                        <li class="col-xs-2">总录入版权</li>
                        <li class="col-xs-2">今日录入版权</li>
                        <li class="col-xs-2">审核通过版权</li>
                        <li class="col-xs-2">待审核版权</li>
                        <li class="col-xs-2">审核未通过版权</li>
                    </ul>
                    <ul class="table-tbody clear" v-for="item in enterData">
                        <li class="col-xs-2">{{item.name}}</li>
                        <li class="col-xs-2">{{item.all_films}}</li>
                        <li class="col-xs-2">{{item.today_films}}</li>
                        <li class="col-xs-2">{{item.wait_films}}</li>
                        <li class="col-xs-2">{{item.pass_films}}</li>
                        <li class="col-xs-2">{{item.notpass_films}}</li>
                    </ul>
                    <ul class="table-tbody clear cursor-p" v-if="data.enterData.length !== enterData.length"
                        @click="enterData = data.enterData">
                        <li class="col-xs-12">点击查看更多</li>
                    </ul>
                </div>
            </div>
            <div class="m-t-md p-b-lg">
                <h3>电影版权审核员审核数据</h3>
                <div class="lk-table m-t-sm">
                    <ul class="table-thead clear text-bold">
                        <li class="col-xs-3-5">审核员姓名</li>
                        <li class="col-xs-3-5">总审核影片</li>
                        <li class="col-xs-3-5">待审核影片</li>
                        <li class="col-xs-3-5">审核通过影片</li>
                        <li class="col-xs-3-5">审核未通过影片</li>
                    </ul>
                    <ul class="table-tbody clear" v-for="item in checkData">
                        <li class="col-xs-3-5">{{item.name}}</li>
                        <li class="col-xs-3-5">{{item.all_films}}</li>
                        <li class="col-xs-3-5">{{item.wait_films}}</li>
                        <li class="col-xs-3-5">{{item.pass_films}}</li>
                        <li class="col-xs-3-5">{{item.notpass_films}}</li>
                    </ul>
                    <ul class="table-tbody clear cursor-p" v-if="data.checkData.length !== checkData.length"
                        @click="checkData = data.checkData">
                        <li class="col-xs-12">点击查看更多</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import api from '@/api'
    export default {
        components: {},
        name: 'dashboard',
        data () {
            return {
                address: '北京/北京/朝阳区',
                loading: false,
                data: {
                    copyright_num: 0,
                    copyright_today: 0,
                    copyright_wait: 0,
                    copyright_pass: 0,
                    copyright_notpass: 0,
                    echartsData: [],
                    enterData: [],
                    checkData: []
                },
                enterData: [],
                checkData: []
            }
        },
        methods: {
            getData () {
                this.loading =
                    this.$http.get(api.home.home, {
                        params: {}
                    }).then(res => {
                        console.log(res)
                        if (res.data.code === 1) {
                            this.loading = false
                            this.data = res.data.data
                            if (this.data.enterData.length > 3) this.enterData = this.data.enterData.slice(0, 3)
                            if (this.data.checkData.length > 3) this.checkData = this.data.checkData.slice(0, 3)
                            this.drawLine()
                            // this.changeChartsData()
                        } else {
                            this.loading = false
                            this.$message({
                                type: 'warning',
                                message: res.data.msg
                            })
                        }
                    })
            },
            drawLine (id = 7) {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('homeChart'))
                this.$router.replace({name: 'home', query: {chartData: id}})
                let column = this.data.echartsData.slice(0, id).map(val => {
                    return val.date
                })
                let films = this.data.echartsData.slice(0, id).map(val => {
                    return val.num
                })
                // 绘制图表
                myChart.setOption({
                    tooltip: {trigger: 'axis'},
                    grid: {
                        left: '2%', // 图表距边框的距离
                        top: '30px',
                        right: '4%',
                        bottom: '18%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: column
                    },
                    yAxis: {},
                    series: [{
                        name: '每日录入影片',
                        color: ['RGBA(76, 161, 255, 0.4)'],
                        type: 'line',
                        smooth: true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: films
                    }]
                })
                myChart.resize()
            }
        },
        created () {
            this.getData()
        },
        mounted () {
            // this.drawLine()
        }
    }
</script>

<style scoped>
    .chart-container {
        height: 300px;
    }

    .home-container {
        height: 100%;
    }

    .home-content {
        padding: 30px 30px 0 30px;
        padding-right: 20px;
    }

    .home-content h3 {
        font-size: 22px;
        color: #434343;
        margin: 0;
    }

    .home-content h3 > span {
        color: #666;
        margin-left: 8px;
    }

    .home-data-item {
        height: 80px;
        padding: 14px 0px 0px 80px;
        width: 100%;
        /*margin-right: 1.6%;*/
        display: inline-block;
        box-shadow: 1px 0px 1px rgba(187, 187, 187, 0.75);
        border-radius: 2px;
        color: #333;
        text-align: center;
        position: relative;
        cursor: pointer;
    }

    .home-data-item:hover {
        box-shadow: 1px 0px 10px rgba(187, 187, 187, 0.75);
    }

    .data-item-title {
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
    }

    .data-item-content {
        font-size: 16px;
        margin-top: 15px;
    }

    .data-item-icon {
        width: 80px;
        height: 80px;
        position: absolute;
        top: 0;
        left: 0;
    }

    .data-item-icon .fa {
        font-size: 30px;
        color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .data-item-icon .fa.text-40 {
        font-size: 40px;
    }

    .p-r-sm.p-n {
        padding: 0;
        padding-right: 15px;
    }

    /*图表*/
    .home-chart-title {
        height: 60px;
        line-height: 60px;
    }

    .home-chart-title .fa-calendar-check-o {
        vertical-align: 2px;
    }

    .home-chart {
        height: 380px;
    }

    .home-chart-title {
        border: 1px solid #ddd;
    }

    .chart-selected {
        border: 1px solid #ddd;
        border-top: 3px solid #3691F5;
        border-bottom: 1px solid #fff;
        background-color: #fff;
        margin-top: -4px;
    }

    .home-chart-title .b-r-n {
        border-right: none;
    }

    .data-icon-size {
        font-size: 44px;
    }

    .today-data-xs {
        font-size: 14px;
    }

    .today-data-xs > span {
        font-size: 14px;
        float: right;
    }

    @media (max-width: 768px) {
        /*图表*/
        .chart-container {
            height: 240px;
        }

        .home-chart {
            height: 330px;
        }

        .home-content {
            padding: 15px;
        }

        .home-content h3 {
            font-size: 16px;
        }

        .home-content h3 > span {
            font-size: 12px;
        }

        .home-content .today-data h3 {
            margin-bottom: 20px;
        }

        .data-col-item {
            padding-right: 5px;
        }
    }

    @media (min-width: 768px) and (max-width: 1200px) {
        .home-data-item {
            margin-top: 20px;
        }
    }
</style>
