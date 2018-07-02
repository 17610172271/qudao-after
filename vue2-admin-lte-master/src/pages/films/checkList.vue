<template>
  <div class="scroll-x">
    <div class="p-lg appli-container">
      <sub-header :list="subNavList"></sub-header>
      <div class="page-container">
        <div class="m-t-sm" v-loading="loading">
          <el-tabs type="card" v-model="tab" @tab-click="handleClick">
            <el-tab-pane label="全部" name="all"><tab></tab></el-tab-pane>
            <el-tab-pane label="未审核" name="notcheck"><tab></tab></el-tab-pane>
            <el-tab-pane label="审核未通过" name="notpass"><tab></tab></el-tab-pane>
            <el-tab-pane label="审核通过" name="pass"><tab></tab></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div> 
  </div>
</template>
<script>
  import SubHeader from '../common/subheader'
  import Tab from './checkTable.vue'
  import api from '@/api'
  import format from '@/tools/format'
  export default {
    data: () => ({
      data: '',
      loading: false,
      tab: 'all',
      subNavList: {
        parentNode: {
          name: '影片管理',
          router: {
            name: 'films_list'
          }
        },
        childNode: {
          name: '影片审核列表',
          desc: '主要用来绑定应用和应用列表的查看',
          router: {
            name: 'films_check_list'
          }
        }
      }
    }),
    components: {
      SubHeader,
      Tab
    },
    methods: {
      getList () {
      //   this.loading = true
        // this.$http.get(api.films.list, {
        //  params: {
        //    offset: this.offset,
        //    limit: this.limit,
        //    token: this.$bus.token,
      //       webname: this.searchName,
      //       audit_status: this.status ? this.status : null,
      //       bind_time: this.calendarVal
        //  }
        // }).then(res => {
      //     this.loading = false
        //  if (res.data.code === 1) {
      //       this.data = res.data.data
      //       this.data.rows = this.data.rows.map(val => {
      //         return {
      //           ...val,
      //           mouseover: false
      //         }
      //       })
      //       this.iptList = res.data.data.audit_status_options
      //     } else {
      //       this.data.rows = []
      //       this.$message({
      //         type: 'warning',
      //         message: res.data.msg
      //       })
      //     }
        // })
      },
      handleClick () {
        this.$router.replace({name: 'films_check_list', query: {type: this.tab}})
      },
      format: format
    },
    created () {
      this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
      // this.getList()
    }
  }
</script>
<style scoped>
.lk-table .p-n {
  padding-left: 0;
  padding-right: 0;
}
</style>
