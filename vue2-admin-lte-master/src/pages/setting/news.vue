<template>
    <div class="scroll-x">
        <div class="p-lg appli-container">
            <sub-header :list="subNavList"></sub-header>
            <div class="page-container">
                <div class="m-t-sm">
                    <el-tabs type="card" v-model="tab">
                        <el-tab-pane label="消息通知" name="news">
                            <news-tab v-if="tab==='news'"></news-tab>
                        </el-tab-pane>
                        <el-tab-pane label="系统公告" name="notice">
                            <notice-tab v-if="tab==='notice'"></notice-tab>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import SubHeader from '../common/subheader'
    import NewsTab from './newsTab'
    import NoticeTab from './noticeTab'

    export default {
        data: () => ({
            tab: 'news',
            subNavList: {
                parentNode: {
                    name: '系统设置',
                    router: {
                        name: 'setting_info'
                    }
                },
                childNode: {
                    name: '我的消息',
                    desc: '主要用来绑定应用和应用列表的查看',
                    router: {
                        name: 'setting_news'
                    }
                }
            }
        }),
        components: {
            SubHeader,
            NewsTab,
            NoticeTab
        },
        methods: {
        },
        created () {
            this.$router.replace({name: 'setting_news', query: {type: this.tab, page: 1}})
        },
        watch: {
            tab (val) {
                this.$router.replace({name: 'setting_news', query: {type: this.tab, page: 1}})
            }
        }
    }
</script>
<style>

</style>
