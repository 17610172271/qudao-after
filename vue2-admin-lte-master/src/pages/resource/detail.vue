<template>
    <div class="film-detail-container" v-loading="loading">
        <el-tabs v-model="tab">
            <el-tab-pane label="基本信息" name="basic">
                <div class="container-fluid">
                    <div class="row clear">
                        <div class="col-xs-3 col-sm-2 p-o-n film-add-name p-v-sm contry-p-r">头像:</div>
                        <div class="col-xs-9 col-sm-10  p-v-sm"><a class="img1-container" :href="data.avatar" target="_blank"><img :src="data.avatar" alt="" style="width: 80px;"></a></div>
                    </div>
                    <div class="row bg-f9 clear">
                        <div class="col-xs-3 col-sm-2 p-o-n film-add-name p-v-sm contry-p-r">用户名:</div>
                        <div class="col-xs-9 col-sm-10  p-v-sm">{{data.username}}</div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-sm-2 p-o-n film-add-name p-v-sm contry-p-r">昵称:</div>
                        <div class="col-xs-9 col-sm-10  p-v-sm">{{data.nickname}}</div>
                    </div>
                    <div class="row bg-f9 clear">
                        <div class="col-xs-3 col-sm-2 p-o-n film-add-name p-v-sm contry-p-r">通讯地址:</div>
                        <div class="col-xs-9 col-sm-10  p-v-sm">{{data.address}}</div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-sm-2 p-o-n film-add-name p-v-sm contry-p-r">邮箱:</div>
                        <div class="col-xs-9 col-sm-10 p-v-sm">{{data.email}}</div>
                    </div>
                    <div class="row bg-f9 clear">
                        <div class="col-xs-3 col-sm-2 p-o-n film-add-name p-v-sm contry-p-r">手机号:</div>
                        <div class="col-xs-9 col-sm-10  p-v-sm">{{data.leader_tel}}</div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-sm-2 p-o-n film-add-name p-v-sm contry-p-r">固定电话:</div>
                        <div class="col-xs-9 col-sm-10 p-v-sm">{{data.landline}}</div>
                    </div>
                    <div class="text-center m-t-lg">
                        <el-button type="primary">确 定</el-button>
                        <!--<el-button @click="centerDialogVisible = false">取 消</el-button>-->
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="公司信息" name="company">
                <div class="container-fluid">
                    <div class="row clear">
                        <div class="col-xs-3 col-sm-2 p-o-n film-add-name p-v-sm contry-p-r">公司名称:</div>
                        <div class="col-xs-9 col-sm-10 p-v-sm">北京新光数字电影院线有限公司</div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">联系人:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">联系人</div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">联系人电话:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">联系人电话</div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">营业执照:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm"><a class="img1-container" :href="data.avatar" target="_blank"><img :src="data.avatar" alt="" style="width: 80px;"></a></div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">营业注册号:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">营业注册号</div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">法人:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">法人</div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">公司固话:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">公司固话</div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">公司类型:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">有限责任公司</div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">成立日期:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">2018-09-11</div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">注册地址:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">北京市朝阳区东大桥朝外sohuB座717</div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">街道地址:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">朝阳门外大街</div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">营业地址:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">北京市朝阳区东大桥朝外sohuB座717</div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">街道地址:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">朝阳门外大街</div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">收款人:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">李四</div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">银行账号:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">6227 31888 4563 8453</div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">所属银行:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">中国工商银行</div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">开户行:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">中国工商银行东大桥支行</div>
                    </div>
                    <div class="text-center m-t-lg">
                        <el-button type="primary">确 定</el-button>
                        <el-button>取 消</el-button>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: ['data', 'show'],
        data: () => ({
            loading: true,
            tab: 'basic'
        }),
        methods: {
        },
        mounted () {
            if (this.show) {
                console.log(1);
                let that = this
                setTimeout(() => {
                    that.loading = false
                }, 800)
            } else {
                this.loading = true
            }
        },
        watch: {
            show (val) {
                if (val) {
                    console.log(2);
                    let that = this
                    setTimeout(() => {
                        that.loading = false
                    }, 800)
                } else {
                    this.loading = true
                }
            }
        }
    }
</script>
<style>

</style>
