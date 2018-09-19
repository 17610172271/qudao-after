<template>
    <div class="film-detail-container" v-loading="loading">
        <el-tabs v-model="tab">
            <el-tab-pane label="基本信息" name="basic">
                <div class="container-fluid">
                    <div class="row clear m-b-sm">
                        <div class="col-xs-3 col-sm-2 p-o-n film-add-name p-v-sm contry-p-r text-right">用户名:</div>
                        <div class="col-xs-9 col-sm-10">
                            <el-input placeholder="请输入用户名" v-model="dailogVal.username" style="max-width: 300px;"></el-input>
                        </div>
                    </div>
                    <div class="row clear m-b-sm">
                        <div class="col-xs-3 col-sm-2 p-o-n film-add-name p-v-sm contry-p-r text-right">昵称:</div>
                        <div class="col-xs-9 col-sm-10">
                            <el-input placeholder="请输入昵称" v-model="dailogVal.nickname" style="max-width: 300px;"></el-input>
                        </div>
                    </div>
                    <div class="row clear m-b-sm">
                        <div class="col-xs-3 col-sm-2 p-o-n film-add-name p-v-sm contry-p-r text-right">密码:</div>
                        <div class="col-xs-9 col-sm-10">
                            <el-input placeholder="如不更改请留空" type="password" v-model="dailogVal.password" style="max-width: 300px;"></el-input>
                        </div>
                    </div>
                    <div class="row clear m-b-sm">
                        <div class="col-xs-3 col-sm-2 p-o-n film-add-name p-v-sm contry-p-r text-right">通讯地址:</div>
                        <div class="col-xs-9 col-sm-10">
                            <el-input placeholder="请输入通讯地址" v-model="dailogVal.address" style="max-width: 300px;"></el-input>
                        </div>
                    </div>
                    <div class="row clear m-b-sm">
                        <div class="col-xs-3 col-sm-2 p-o-n film-add-name p-v-sm contry-p-r text-right">邮箱:</div>
                        <div class="col-xs-9 col-sm-10">
                            <el-input placeholder="请输入邮箱" v-model="dailogVal.email" style="max-width: 300px;"></el-input>
                        </div>
                    </div>
                    <div class="row clear m-b-sm">
                        <div class="col-xs-3 col-sm-2 p-o-n film-add-name p-v-sm contry-p-r text-right">手机号:</div>
                        <div class="col-xs-9 col-sm-10">
                            <el-input placeholder="请输入手机号" v-model="dailogVal.mobile" style="max-width: 300px;"></el-input>
                        </div>
                    </div>
                    <div class="row clear m-b-sm">
                        <div class="col-xs-3 col-sm-2 p-o-n film-add-name p-v-sm contry-p-r text-right">固定电话:</div>
                        <div class="col-xs-9 col-sm-10">
                            <el-input placeholder="请输入固定电话" v-model="dailogVal.tel" style="max-width: 300px;"></el-input>
                        </div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-sm-2 p-o-n film-add-name p-v-sm contry-p-r text-right">头像:</div>
                        <div class="col-xs-12 col-md-10 line-height-40 p-r-80 relative">
                            <el-input placeholder="请上传头像" v-model="dailogVal.avatar" disabled></el-input>
                            <el-upload
                                class=" btn-upload"
                                :action="uploadUrl"
                                :on-success="avatarUpload"
                                :headers="header"
                                accept="image/*"
                                :show-file-list="false"
                                list-type="text">
                                <a href="javascript:;" class="btn bg-blue1 text-white add-upload-btn" style="height: 40px;line-height: 26px;">上传</a>
                            </el-upload>
                        </div>
                    </div>
                    <div class="m-t-sm clear" v-show="dailogVal.avatar">
                        <div class="col-xs-12 col-sm-offset-2 col-sm-10">
                            <a :href="dailogVal.pic" target="_blank" class="pic-container block over-hidden">
                                <img :src="dailogVal.avatar" alt="" style="width: 100%;">
                            </a>
                            <a href="javascript:;" class="btn btn-danger btn-xs btn-trash center m-t-sm" style="width: 115px;" @click="dailogVal.avatar=''"><span class="fa fa-trash" style="color: #fff;"></span></a>
                        </div>
                    </div>
                    <div class="text-center m-t-lg">
                        <el-button type="primary" @click="basicSubmit">确 定</el-button>
                        <el-button @click="reset">重 置</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="公司信息" name="company">
                <div class="container-fluid">
                    <div class="row clear m-b-sm">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name text-right p-v-sm contry-p-r">公司名称:</div>
                        <div class="col-xs-9 col-md-10">
                            <el-input placeholder="请输入公司名称" v-model="dailogVal.company.company_name" ></el-input>
                        </div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name text-right p-v-sm contry-p-r m-b-sm">联系人:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4 m-b-sm">
                            <el-input placeholder="请输入联系人" v-model="dailogVal.username" style="max-width: 300px;"></el-input>
                        </div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name text-right p-v-sm contry-p-r m-b-sm">联系人电话:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4 m-b-sm">
                            <el-input placeholder="请输入联系人电话" v-model="dailogVal.company.linkman" style="max-width: 300px;"></el-input>
                        </div>
                    </div>
                    <div class="row clear m-b-sm">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name text-right p-v-sm contry-p-r">营业注册号:</div>
                        <div class="col-xs-9 col-md-10">
                            <el-input placeholder="请输入营业注册号" v-model="dailogVal.company.registration_number"></el-input>
                        </div>
                    </div>
                    <div class="row clear m-b-sm">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name text-right p-v-sm contry-p-r">营业执照:</div>
                        <div class="col-xs-9 col-md-10 p-r-80 relative">
                            <el-input placeholder="请上传营业执照" v-model="dailogVal.company.license" disabled></el-input>
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
                    <div class="m-b-md clear" v-if="dailogVal.company.license">
                        <div class="col-xs-12 col-sm-offset-2 col-sm-10">
                            <a :href="dailogVal.pic" target="_blank" class="pic-container block over-hidden">
                                <img :src="dailogVal.company.license" alt="" style="width: 100%;">
                            </a>
                            <a href="javascript:;" class="btn btn-danger btn-xs btn-trash center m-t-sm" style="width: 115px;"@click="dailogVal.pic=''"><span class="fa fa-trash" style="color: #fff;"></span></a>
                        </div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name text-right p-v-sm contry-p-r m-b-sm">法人:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4 m-b-sm">
                            <el-input placeholder="请输入公司法人" v-model="dailogVal.company.legal" style="max-width: 300px;"></el-input>
                        </div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name text-right p-v-sm contry-p-r m-b-sm">公司固话:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4 m-b-sm">
                            <el-input placeholder="请输入公司固话" v-model="dailogVal.company.company_phone" style="max-width: 300px;"></el-input>
                        </div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name text-right p-v-sm contry-p-r m-b-sm">公司类型:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4 m-b-sm">
                            <el-input placeholder="请输入公司类型" v-model="dailogVal.company.company_type" style="max-width: 300px;"></el-input>
                        </div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name text-right p-v-sm contry-p-r m-b-sm">成立日期:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4 m-b-sm">
                            <el-date-picker
                                v-model="dailogVal.company.founding_date"
                                type="date"
                                value-format="timestamp"
                                style="width: 100%;"
                                placeholder="选择日期">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name text-right p-v-sm contry-p-r">注册地址:</div>
                        <div class="col-xs-9 col-md-10">
                            <address-link v-model="dailogVal.company.registration_address"></address-link>
                        </div>
                    </div>
                    <div class="row clear m-b-sm">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name text-right p-v-sm contry-p-r">街道地址:</div>
                        <div class="col-xs-9 col-md-10">
                            <el-input placeholder="请输入街道地址" v-model="dailogVal.company.place1"></el-input>
                        </div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name text-right p-v-sm contry-p-r">营业地址:</div>
                        <div class="col-xs-9 col-md-10">
                            <address-link v-model="dailogVal.company.business_address"></address-link>
                        </div>
                    </div>
                    <div class="row clear m-b-sm">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name text-right p-v-sm contry-p-r">街道地址:</div>
                        <div class="col-xs-9 col-md-10">
                            <el-input placeholder="请输入街道地址" v-model="dailogVal.company.place2"></el-input>
                        </div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name text-right p-v-sm contry-p-r m-b-sm">收款人:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4 m-b-sm">
                            <el-input placeholder="请输入收款人姓名" v-model="dailogVal.company.payee" style="max-width: 300px;"></el-input>
                        </div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name text-right p-v-sm contry-p-r m-b-sm">银行账号:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4 m-b-sm">
                            <el-input placeholder="请输入银行账号" v-model="dailogVal.company.bank_account" style="max-width: 300px;"></el-input>
                        </div>
                    </div>
                    <div class="row clear">
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name text-right p-v-sm contry-p-r m-b-sm">所属银行:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4 m-b-sm">
                            <el-input placeholder="请输入所属银行" v-model="dailogVal.company.bank" style="max-width: 300px;"></el-input>
                        </div>
                        <div class="col-xs-3 col-md-2 p-o-n film-add-name text-right p-v-sm contry-p-r m-b-sm">开户行:</div>
                        <div class="col-xs-9 col-md-10 col-lg-4 m-b-sm">
                            <el-input placeholder="请输入开户行" v-model="dailogVal.company.open_bank" style="max-width: 300px;"></el-input>
                        </div>
                    </div>
                    <div class="text-center m-t-lg">
                        <el-button type="primary" @click="companySubmit">确 定</el-button>
                        <el-button @click="reset">重 置</el-button>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

    </div>
</template>
<script type="text/ecmascript-6">
    import api from '@/api'
    import AddressLink from '@/components/addressLink'
    export default {
        props: ['data', 'show'],
        data: () => ({
            loading: true,
            tab: 'basic',
            dailogVal1: {},
            dailogVal: {
                address: '//',
                avatar: '',
                company: {
                    registration_address: '//',
                    business_address: '//',
                }
            },
            header: {ContentType: 'application/x-www-form-urlencoded'},
        }),
        computed: {
            uploadUrl () {
                return api.common.upload
            }
        },
        components: {
            AddressLink
        },
        methods: {
            avatarUpload (res) {
                console.log(1);
                if (res.code === 1) {
                    console.log(2);
                    this.dailogVal.avatar = res.data.url
                } else if (res.code === -14) {
                    window.sessionStorage.removeItem('authInfo')
                    this.$router.replace({name: 'login'})
                    this.$message({
                        type: 'error',
                        message: '登录信息已失效,请重新登录'
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '图片上传失败'
                    })
                }
            },
            basicSubmit () {
                if (this.dailogVal.username) {
                    this.$http.post(api.resource.editBasic, {
                        row: {
                            id: this.dailogVal.id,
                            username: this.dailogVal.username,
                            nickname: this.dailogVal.nickname,
                            password: this.dailogVal.password,
                            address: this.dailogVal.address,
                            email: this.dailogVal.email,
                            mobile: this.dailogVal.mobile,
                            tel: this.dailogVal.tel,
                            avatar: this.dailogVal.avatar
                        }
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '编辑成功'
                            })
                            this.$emit('close')
                        }
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请输入用户名'
                    })
                }
            },
            companySubmit () {
                if (this.dailogVal.company.company_name) {
                    this.$http.post(api.resource.editBasic, {
                        company: this.dailogVal.company
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '编辑成功'
                            })
                            this.$emit('close')
                        }
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请输入公司名称'
                    })
                }
            },
            reset () {
                this.dailogVal = JSON.parse(JSON.stringify(this.dailogVal1))
            },
            picUpload () {
            },
            uploadBefore () {
            },
        },
        mounted () {
            this.dailogVal = JSON.parse(JSON.stringify(this.data))
            this.dailogVal.company = this.dailogVal.company ? this.dailogVal.company : {registration_address: '//', business_address: '//'}
            this.dailogVal.company.founding_date *= 1000
            this.dailogVal1 = JSON.parse(JSON.stringify(this.dailogVal))
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
                this.dailogVal = JSON.parse(JSON.stringify(val))
                this.dailogVal.company = this.dailogVal.company ? this.dailogVal.company : {registration_address: '//', business_address: '//'}
                this.dailogVal.company.founding_date *= 1000
                this.dailogVal1 = JSON.parse(JSON.stringify(this.dailogVal))
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
