<template>
    <div class="">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="m-t-sm">
                    <el-tabs type="card" v-model="tab" @tab-click="handleClick">
                        <el-tab-pane label="全部" name="all">

                            <tab v-if="tab==='all'"></tab>
                        </el-tab-pane>
                        <el-tab-pane label="未审核" name="unaudited">
                            <tab v-if="tab==='unaudited'"></tab>
                        </el-tab-pane>
                        <el-tab-pane label="未通过" name="nopass">
                            <tab v-if="tab==='nopass'"></tab>
                        </el-tab-pane>
                        <el-tab-pane label="已通过" name="pass">
                            <tab v-if="tab==='pass'"></tab>
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
    import api from '@/api'
    import format from '@/tools/format'
    export default {
        data: () => ({
            data: '',
            tab: 'all',
            subNavList: {
                parentNode: {
                    name: '应用管理',
                    router: {
                        name: 'application_list'
                    }
                },
                childNode: {
                    name: '应用审核',
                    desc: '主要用来审核应用及应用列表的查看',
                    router: {
                        name: 'application_list'
                    }
                }
            }
        }),
        components: {
            SubHeader,
            Tab
        },
        methods: {
            handleClick () {
                this.$router.replace({name: 'application_list', query: {type: this.tab, page: 1}})
            }
        },
        created () {
            this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
//             this.getList()
        }
    }
</script>
<style scoped>
    .lk-table .p-n {
        padding-left: 0;
        padding-right: 0;
    }
</style>
