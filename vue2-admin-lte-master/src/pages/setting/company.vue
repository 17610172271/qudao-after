<template>
    <div class="p-lg">
        <sub-header :list="subNavList"></sub-header>
        <div class="m-t-lg">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <div class="clear">
                    <el-form-item prop="company_name" class="col-xs-12 col-sm-6">
                        <span slot="label">公司名称</span>
                        <el-input v-model="ruleForm.company_name"></el-input>
                    </el-form-item>
                </div>
                <div class="clear">
                    <el-form-item prop="company_name" class="col-xs-12 col-sm-6">
                        <span slot="label">营业注册号</span>
                        <el-input v-model="ruleForm.regist_num"></el-input>
                    </el-form-item>
                    <el-form-item prop="company_name" class="col-xs-12 col-sm-6">
                        <span slot="label">营业执照</span>
                        <el-input v-model="ruleForm.license"></el-input>
                    </el-form-item>
                </div>
                <div class="clear">
                    <el-form-item prop="company_name" class="col-xs-12 col-sm-6">
                        <span slot="label">联系人</span>
                        <el-input v-model="ruleForm.contact_person"></el-input>
                    </el-form-item>
                </div>
                <div class="clear">
                    <el-form-item prop="company_name" class="col-xs-12 col-sm-6">
                        <span slot="label">联系电话</span>
                        <el-input v-model="ruleForm.contact_tel"></el-input>
                    </el-form-item>
                </div>
                <div class="clear">
                    <el-form-item prop="company_name" class="col-xs-12 col-sm-6">
                        <span slot="label">法人</span>
                        <el-input v-model="ruleForm.legal_person"></el-input>
                    </el-form-item>
                    <el-form-item prop="company_name" class="col-xs-12 col-sm-6">
                        <span slot="label">公司固话</span>
                        <el-input v-model="ruleForm.company_num"></el-input>
                    </el-form-item>
                </div>

                <div class="clear">
                    <el-form-item prop="company_name" class="col-xs-12 col-sm-6">
                        <span slot="label">组织机构代码</span>
                        <el-input v-model="ruleForm.organization_code"></el-input>
                    </el-form-item>
                    <el-form-item prop="company_name" class="col-xs-12 col-sm-6">
                        <span slot="label">纳税人识别号</span>
                        <el-input v-model="ruleForm.registration_num"></el-input>
                    </el-form-item>
                </div>
                <div class="clear">
                    <el-form-item prop="company_name" class="col-xs-12 col-sm-6">
                        <span slot="label">公司类型</span>
                        <el-input v-model="ruleForm.company_type"></el-input>
                    </el-form-item>
                    <el-form-item prop="company_name" class="col-xs-12 col-sm-6">
                        <span slot="label">成立日期</span>
                        <el-input v-model="ruleForm.setup_time"></el-input>
                    </el-form-item>
                </div>
                <div class="clear">
                    <el-form-item prop="company_name" class="col-xs-12 col-sm-6">
                        <span slot="label">注册地址</span>
                        <el-input v-model="ruleForm.regist_address"></el-input>
                    </el-form-item>
                    <el-form-item prop="company_name" class="col-xs-12 col-sm-6">
                        <span slot="label">街道地址</span>
                        <el-input v-model="ruleForm.regist_address1"></el-input>
                    </el-form-item>
                </div>
                <div class="clear">
                    <el-form-item prop="company_name" class="col-xs-12 col-sm-6">
                        <span slot="label">营业地址</span>
                        <el-input v-model="ruleForm.operate_address"></el-input>
                    </el-form-item>
                    <el-form-item prop="company_name" class="col-xs-12 col-sm-6">
                        <span slot="label">街道地址</span>
                        <el-input v-model="ruleForm.operate_address1"></el-input>
                    </el-form-item>
                </div>
                <div class="clear">
                    <el-form-item prop="company_name" class="col-xs-12 col-sm-6">
                        <span slot="label">收款人姓名</span>
                        <el-input v-model="ruleForm.collection_name"></el-input>
                    </el-form-item>
                    <el-form-item prop="company_name" class="col-xs-12 col-sm-6">
                        <span slot="label">银行账号</span>
                        <el-input v-model="ruleForm.bank_num"></el-input>
                    </el-form-item>
                </div>
                <div class="clear">
                    <el-form-item>
                        <el-button type="primary" @click="submit">提交</el-button>
                        <el-button @click="getData">重置</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import api from '@/api'
    import SubHeader from '../common/subheader'
    export default {
        data: () => ({
            ruleForm: {
                company_name: '',
                regist_num: '',
                license: '',
                contact_person: '',
                contact_tel: '',
                legal_person: '',
                company_num: '',
                organization_num: '',
                registration_num: '',
                company_type: '',
                setup_time: '',
                regist_address: '',
                regist_address1: '',
                operate_address: '',
                operate_address1: '',
                collection_name: '',
                bank_num: ''
            },
            rules: {},
            subNavList: {
                parentNode: {
                    name: '系统设置',
                    router: {
                        name: 'setting_info'
                    }
                },
                childNode: {
                    name: '公司信息',
                    desc: '主要用来绑定应用和应用列表的查看',
                    router: {
                        name: 'setting_company'
                    }
                }
            }
        }),
        components: {
            SubHeader
        },
        methods: {
            getData (id) {
                this.$http.get(api.setting.infoDetail, {
                    params: {
//                        id: id
                    }
                }).then(res => {
                    if (res.data.code === 1) {
                        this.ruleForm = res.data.data
                    }
                })
            },
            submit () {
                this.$http.get(api.setting.infoEdit, {
                    params: {
//                        ...this.ruleForm
                    }
                }).then(res => {
                    if (res.data.code === 1) {
                        this.$message({
                            type: 'success',
                            message: '保存成功'
                        })
                    } else {
                        this.$message({
                            type: 'warning',
                            message: res.data.msg
                        })
                    }
                })
            }
        },
        created () {
            this.getData()
        },
        watch: {}
    }
</script>
<style>

</style>
