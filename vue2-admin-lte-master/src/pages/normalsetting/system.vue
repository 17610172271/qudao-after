<template>
    <div class="">
        <div class="p-lg system-container" style="position: relative;" v-loading="loading">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="m-t-sm">
                    <el-tabs type="card" v-model="tab">
                        <el-tab-pane label="基础配置" name="normal">
                            <div class="film-detail-container">
                                <div class="container-fluid">
                                    <div class="bg-white row p-v-sm line-height-40">
                                        <div class="col-xs-3 text-bold">变量标题</div>
                                        <div class="col-xs-8 text-bold">变量值</div>
                                    </div>
                                    <div class="bg-f9 row p-v-sm line-height-40">
                                        <div class="col-xs-3">站点名称</div>
                                        <div class="col-xs-8"><el-input v-model="data.name.value" placeholder="请填写站点名称" style="max-width: 500px;"></el-input></div>
                                    </div>
                                    <div class="bg-white row p-v-sm line-height-40">
                                        <div class="col-xs-3">备案号</div>
                                        <div class="col-xs-8"><el-input v-model="data.beian.value" placeholder="请填写备案号 如: 京ICP备0000000号-1" style="max-width: 500px;"></el-input></div>
                                    </div>
                                    <div class="bg-f9 row p-v-sm line-height-40">
                                        <div class="col-xs-3">CDN地址</div>
                                        <div class="col-xs-8"><el-input v-model="data.cdnurl.value" placeholder="如果静态资源使用第三方云储存请配置CDN地址" style="max-width: 500px;"></el-input></div>
                                    </div>
                                    <div class="bg-white row p-v-sm line-height-40">
                                        <div class="col-xs-3">版本号</div>
                                        <div class="col-xs-8"><el-input v-model="data.version.value" placeholder="如果静态资源有变动请重新配置版本号" style="max-width: 500px;"></el-input></div>
                                    </div>
                                    <div class="bg-f9 row p-v-sm line-height-40">
                                        <div class="col-xs-3">时区</div>
                                        <div class="col-xs-8"><el-input v-model="data.timezone.value" placeholder="请填写时区" style="max-width: 500px;"></el-input></div>
                                    </div>
                                    <div class="bg-white row p-v-sm line-height-40">
                                        <div class="col-xs-3">禁止IP</div>
                                        <div class="col-xs-8"><el-input v-model="data.forbiddenip.value" placeholder="请填写禁止IP: 一行一条记录" type="textarea" rows="4" style="max-width: 500px;"></el-input></div>
                                    </div>
                                    <div class="bg-f9 row p-v-sm line-height-40">
                                        <div class="col-xs-3">语言</div>
                                        <div class="col-xs-8">
                                            <ul class="clear">
                                                <li class="pull-left col-xs-5 text-bold">键名</li>
                                                <li class="pull-left col-xs-5 p-l-n text-bold">键值</li>
                                                <li class="pull-left col-xs-2 p-n"></li>
                                            </ul>
                                            <ul class="clear m-b-sm" v-for="(item, index) in data.languages.value">
                                                <li class="pull-left col-xs-5"><el-input v-model="item.name"></el-input></li>
                                                <li class="pull-left col-xs-5 p-l-n"><el-input v-model="item.value"></el-input></li>
                                                <li class="pull-left col-xs-2 p-n">
                                                    <a href="javascript:;" @click="delLanguage(index)" title="删除" class="btn bg-red text-white"><i class="fa fa-trash" style="color: #fff;"></i></a>
                                                </li>
                                            </ul>
                                            <div class=" p-l-15"><a href="javascript:;" @click="addLanguage" title="追加" class="btn bg-blue1 text-white">追加</a></div>
                                        </div>
                                    </div>
                                    <div class="bg-white row p-v-sm line-height-40">
                                        <div class="col-xs-3">后台固定页</div>
                                        <div class="col-xs-8"><el-input v-model="data.fixedpage.value" placeholder="请填写后台固定页" style="max-width: 500px;"></el-input></div>
                                    </div>
                                    <div class="bg-f9 row p-v-sm line-height-40">
                                        <div class="col-xs-3">Copyright</div>
                                        <div class="col-xs-8"><el-input v-model="data.copyright.value" placeholder="请填写版权所有" style="max-width: 500px;"></el-input></div>
                                    </div>
                                    <div class="bg-white row p-v-sm line-height-40">
                                        <div class="col-xs-3">Copyright URL</div>
                                        <div class="col-xs-8"><el-input v-model="data.copyright_url.value" placeholder="请填写版权链接" style="max-width: 500px;"></el-input></div>
                                    </div>
                                    <div class="m-t-lg row">
                                        <div class="col-xs-offset-3 col-xs-6">
                                            <a href="javascript:;" class="btn bg-blue1 text-white m-r-sm" @click="normalSubmit">确定</a>
                                            <a href="javascript:;" class="btn btn-default" @click="reset">重置</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="邮件配置" name="email">
                            <div class="film-detail-container">
                                <div class="container-fluid">
                                    <div class="bg-white row p-v-sm line-height-40">
                                        <div class="col-xs-3 text-bold">变量标题</div>
                                        <div class="col-xs-8 text-bold">变量值</div>
                                        <!--<div class="col-xs-3 text-bold">变量名</div>-->
                                    </div>
                                    <div class="bg-f9 row p-v-sm line-height-40">
                                        <div class="col-xs-3">邮件发送方式</div>
                                        <div class="col-xs-8">
                                            <el-select v-model="data.mail_type.value" placeholder="请选择邮件发送方式" style="width: 100%; max-width: 500px;">
                                                <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <!--<div class="col-xs-3">{$site.mail_type}</div>-->
                                    </div>
                                    <div class="bg-white row p-v-sm line-height-40">
                                        <div class="col-xs-3">SMTP服务器</div>
                                        <div class="col-xs-8">
                                            <el-input v-model="data.mail_smtp_host.value" @focus="nameTipShow = true" @blur="nameTipShow = false" placeholder="请填写SMTP服务器" style="max-width: 500px;"></el-input>
                                            <p class="setting-tips" v-show="nameTipShow">错误的配置发送邮件会导致服务器超时</p>
                                        </div>
                                        <!--<div class="col-xs-3">{$site.mail_smtp_host}</div>-->
                                    </div>
                                    <div class="bg-f9 row p-v-sm line-height-40">
                                        <div class="col-xs-3">SMTP端口</div>
                                        <div class="col-xs-8">
                                            <el-input v-model="data.mail_smtp_port.value" @focus="portTipShow = true" @blur="portTipShow = false" placeholder="请填写SMTP端口" style="max-width: 500px;"></el-input>
                                            <p class="setting-tips" v-show="portTipShow">(不加密默认25,SSL默认465,TLS默认587)</p>
                                        </div>
                                        <!--<div class="col-xs-3">{$site.mail_smtp_port}</div>-->
                                    </div>
                                    <div class="bg-white row p-v-sm line-height-40">
                                        <div class="col-xs-3">SMTP用户名</div>
                                        <div class="col-xs-8"><el-input v-model="data.mail_smtp_user.value" placeholder="请填写SMTP用户名" style="max-width: 500px;"></el-input></div>
                                        <!--<div class="col-xs-3">{$site.mail_smtp_user}</div>-->
                                    </div>
                                    <div class="bg-f9 row p-v-sm line-height-40">
                                        <div class="col-xs-3">SMTP密码</div>
                                        <div class="col-xs-8"><el-input v-model="data.mail_smtp_pass.value" placeholder="请填写SMTP密码" style="max-width: 500px;"></el-input></div>
                                        <!--<div class="col-xs-3">{$site.mail_smtp_pass}</div>-->
                                    </div>
                                    <div class="bg-white row p-v-sm line-height-40">
                                        <div class="col-xs-3">SMTP验证方式</div>
                                        <div class="col-xs-8">
                                            <el-select v-model="data.mail_verify_type.value" placeholder="请选择SMTP验证方式" style="width: 100%; max-width: 500px;">
                                                <el-option
                                                    v-for="item in options1"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <!--<div class="col-xs-3">{$site.mail_smtp_type}</div>-->
                                    </div>
                                    <div class="bg-f9 row p-v-sm line-height-40">
                                        <div class="col-xs-3">发件人邮箱</div>
                                        <div class="col-xs-8">
                                            <el-input v-model="data.mail_from.value" placeholder="请填写发件人邮箱" style="max-width: 500px;"></el-input>
                                            <!--<a href="javascript:;" class="btn bg-blue1 text-white emai-test-btn" @click="testEmail">测试邮件</a>-->
                                        </div>
                                        <!--<div class="col-xs-3">{$site.mail_from}</div>-->
                                    </div>
                                    <div class="m-t-lg row">
                                        <div class="col-xs-offset-3 col-xs-8">
                                            <a href="javascript:;" class="btn bg-blue1 text-white m-r-sm" @click="emailSubmit">确定</a>
                                            <a href="javascript:;" class="btn btn-default" @click="reset">重置</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import SubHeader from '../common/subheader'
    import api from '@/api'
    export default {
        data: () => ({
            data: {
                name: '',
                beian: '',
                cdnurl: '',
                version: '',
                timezone: '',
                forbiddenip: '',
                languages: [
                    {
                        name: '',
                        value: ''
                    }
                ],
                fixedpage: '',
                copyright: '',
                copyright_url: '',
                mail_from: '',
                mail_smtp_host: '',
                mail_smtp_pass: '',
                mail_smtp_port: '',
                mail_smtp_user: '',
                mail_type: '',
                mail_verify_type: ''
            },
            nameTipShow: false,
            portTipShow: false,
            value: '',
            options: [{
                value: '1',
                label: 'SMTP'
            }, {
                value: '2',
                label: 'Mail'
            }],
            options1: [{
                value: '1',
                label: 'TLS'
            }, {
                value: '2',
                label: 'SSL'
            }],
            loading: false,
            tab: 'normal',
            subNavList: {
                parentNode: {
                    name: '常规管理',
                    router: {
                        name: 'normalsetting_system'
                    }
                },
                childNode: {
                    name: '系统配置',
                    desc: '主要用来配置系统设置及邮件发送',
                    router: {
                        name: 'normalsetting_system'
                    }
                }
            }
        }),
        components: {
            SubHeader
        },
        computed: {
        },
        methods: {
            getData () {
                this.loading = true
                this.$http.post(api.normalsetting.system).then(res => {
                    this.loading = false
                    if (res.data.code === 1) {
                        this.data = res.data.data
                    }
                })
            },
            normalSubmit () {
                this.loading = true
                this.$http.post(api.normalsetting.systemEdit, {
                    data: [
                        {
                            id: this.data.name.id,
                            value: this.data.name.value
                        },
                        {
                            id: this.data.beian.id,
                            value: this.data.beian.value
                        },
                        {
                            id: this.data.cdnurl.id,
                            value: this.data.cdnurl.value
                        },
                        {
                            id: this.data.version.id,
                            value: this.data.version.value
                        },
                        {
                            id: this.data.timezone.id,
                            value: this.data.timezone.value
                        },
                        {
                            id: this.data.forbiddenip.id,
                            value: this.data.forbiddenip.value
                        },
                        {
                            id: this.data.languages.id,
                            value: this.data.languages.value
                        },
                        {
                            id: this.data.fixedpage.id,
                            value: this.data.fixedpage.value
                        },
                        {
                            id: this.data.copyright.id,
                            value: this.data.copyright.value
                        },
                        {
                            id: this.data.copyright_url.id,
                            value: this.data.copyright_url.value
                        }
                    ]
                }).then(res => {
                    this.loading = false
                    if (res.data.code === 1) {
                        this.$message({
                            type: 'success',
                            message: '系统基础配置保存成功'
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            emailSubmit () {
                this.loading = true
                this.$http.post(api.normalsetting.systemEdit, {
                    data: [
                        {
                            id: this.data.mail_type.id,
                            value: this.data.mail_type.value
                        },
                        {
                            id: this.data.mail_smtp_host.id,
                            value: this.data.mail_smtp_host.value
                        },
                        {
                            id: this.data.mail_smtp_port.id,
                            value: this.data.mail_smtp_port.value
                        },
                        {
                            id: this.data.mail_smtp_user.id,
                            value: this.data.mail_smtp_user.value
                        },
                        {
                            id: this.data.mail_smtp_pass.id,
                            value: this.data.mail_smtp_pass.value
                        },
                        {
                            id: this.data.mail_verify_type.id,
                            value: this.data.mail_verify_type.value
                        },
                        {
                            id: this.data.mail_from.id,
                            value: this.data.mail_from.value
                        }
                    ]
                }).then(res => {
                    this.loading = false
                    if (res.data.code === 1) {
                        this.$message({
                            type: 'success',
                            message: '系统邮件配置保存成功'
                        })
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.data.msg
                        })
                    }
                })
            },
            addLanguage () {
                this.data.languages.value.push({
                    name: '',
                    value: ''
                })
            },
            testEmail () {
                if (this.data.mail_from.value) {
                    this.$http.get(api.normalsetting.emailTest, {
                        params: {
                            email: this.data.mail_from.value
                        }
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.$message({
                                type: 'success',
                                message: '邮件发送成功'
                            })
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.data.msg
                            })
                        }
                    })
                } else {
                    this.$message({
                        type: 'warning',
                        message: '请输入邮箱'
                    })
                }
            },
            reset () {
                this.getData()
            },
            delLanguage (index) {
                this.data.languages.value.splice(index, 1)
            }
        },
        created () {
            this.getData()
        },
        watch: {
        }
    }
</script>
<style scoped>

</style>
