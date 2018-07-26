<template>
    <div class="scroll-x">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="m-t-sm" v-loading="loading">
                    <el-tabs type="card" v-model="tab" @tab-click="handleClick">
                        <el-tab-pane label="全部" name="all">
                            <tab v-if="tab === 'all'"></tab>
                        </el-tab-pane>
                        <el-tab-pane label="未登记" name="notregist">
                            <regist-tab v-if="tab === 'notregist'"></regist-tab>
                        </el-tab-pane>
                        <el-tab-pane label="未审核" name="notcheck">
                            <check-tab v-if="tab === 'notcheck'"></check-tab>
                        </el-tab-pane>
                        <el-tab-pane label="审核未通过" name="notpass">
                            <notpass-tab v-if="tab === 'notpass'"></notpass-tab>
                        </el-tab-pane>
                        <el-tab-pane label="审核通过" name="pass">
                            <pass-tab v-if="tab === 'pass'"></pass-tab>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import SubHeader from '../common/subheader'
    import Tab from './table.vue'
    import RegistTab from './registTable.vue'
    import CheckTab from './checkTable.vue'
    import NotpassTab from './notpassTable.vue'
    import PassTab from './passTable.vue'
    //  import api from '@/api'
    import format from '@/tools/format'
    export default {
        data: () => ({
            data: '',
            loading: false,
            tab: 'all',
            subNavList: {
                parentNode: {
                    name: '版权管理',
                    router: {
                        name: 'copyright_list'
                    }
                },
                childNode: {
                    name: '版权库',
                    desc: '主要用来绑定应用和应用列表的查看',
                    router: {
                        name: 'copyright_list'
                    }
                }
            }
        }),
        components: {
            SubHeader,
            Tab,
            RegistTab,
            CheckTab,
            NotpassTab,
            PassTab
        },
        methods: {
            handleClick () {
                this.$router.replace({name: 'copyright_list', query: {type: this.tab}})
            },
            format: format
        },
        created () {
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
            this.tab = this.$route.query.type ? this.$route.query.type : 'all'
            this.$router.replace({name: 'copyright_list', query: {type: this.tab, page: 1}})
        }
    }
</script>
<style scoped>
    .lk-table .p-n {
        padding-left: 0;
        padding-right: 0;
    }
</style>
