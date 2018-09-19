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
                        <div class="col-xs-9 col-sm-10  p-v-sm">{{data.mobile}}</div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-sm-2 p-o-n film-add-name p-v-sm contry-p-r">固定电话:</div>
                        <div class="col-xs-9 col-sm-10 p-v-sm">{{data.tel}}</div>
                    </div>
                    <div class="text-center m-t-lg">
                        <el-button type="primary" @click="closeModal">确 定</el-button>
                        <!--<el-button @click="centerDialogVisible = false">取 消</el-button>-->
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="公司信息" name="company">
                <div class="container-fluid">
                    <div class="row clear">
                        <div class="col-xs-3 col-sm-2 p-o-n film-add-name p-v-sm contry-p-r">公司名称:</div>
                        <div class="col-xs-9 col-sm-10 p-v-sm">{{data.company.company_name}}</div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">联系人:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">{{data.company.linkman}}</div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">联系人电话:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">{{data.company.linkman_phone}}</div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">营业执照:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm"><a class="img1-container" :href="data.company.license" target="_blank"><img :src="data.company.license" alt="" style="width: 80px;"></a></div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">营业注册号:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">{{data.company.registration_number}}</div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">法人:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">{{data.company.legal}}</div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">公司固话:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">{{data.company.company_phone}}</div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">公司类型:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">{{data.company.company_type}}</div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">成立日期:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">{{data.company.createtime}}</div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">注册地址:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">{{data.company.registration_address}}</div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">街道地址:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">{{data.company.place1}}</div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">营业地址:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">{{data.company.business_address}}</div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">街道地址:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">{{data.company.place2}}</div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">收款人:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">{{data.company.payee}}</div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">银行账号:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">{{data.company.bank_account}}</div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">所属银行:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">{{data.company.bank}}</div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name p-v-sm contry-p-r">开户行:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4  p-v-sm">{{data.company.open_bank}}</div>
                    </div>
                    <div class="text-center m-t-lg">
                        <el-button type="primary" @click="closeModal">确 定</el-button>
                        <!--<el-button>取 消</el-button>-->
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
            tab: 'basic',
            dailogVal: {}
        }),
        methods: {
            closeModal () {
                this.$emit('close')
            }
        },
        mounted () {
            this.dailogVal = this.data
            this.dailogVal.company = this.dailogVal.company ? this.dailogVal.company : {}
            this.tab = 'basic'
            if (this.show) {
                let that = this
                setTimeout(() => {
                    that.loading = false
                }, 500)
            } else {
                this.loading = true
            }
        },
        watch: {
            data (val) {
                this.dailogVal = this.data
                this.dailogVal.company = this.dailogVal.company ? this.dailogVal.company : {}
            },
            show (val) {
                if (val) {
                    this.tab = 'basic'
                    let that = this
                    setTimeout(() => {
                        that.loading = false
                    }, 500)
                } else {
                    this.loading = true
                }
            }
        }
    }
</script>
<style>

</style>
