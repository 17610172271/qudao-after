<template>
  <div class="scroll-x">
    <div class="p-lg appli-container">
      <sub-header :list="subNavList"></sub-header>
      <div class="page-container">
        <div class="m-t-sm" v-loading="loading">
          <div>
            <search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>
            <div class="page-toolbar clear">
              <div class="pull-left toolbar-candle">
                <router-link :to="{name: 'films_add'}" title="添加" class="app-add btn bg-blue1 text-white"><i class="fa fa-plus-square"></i>添加</router-link>
                <a href="javascript:;" title="删除" class="app-add btn bg-red1 text-white"><i class="fa fa-trash"></i>删除</a>
                <!-- <div class="app-del btn bg-red1 text-white"><i class="fa fa-minus-square"></i>删除</div> -->
                <div class="app-refresh btn bg-gray1" title="刷新" @click="refresh"><i class="fa fa-refresh"></i></div>
              </div>
              <div class="pull-right clear">
                <div class="pull-left m-r-sm opacity-8" title="列">
                  <select-checkbox :list="showList" v-model="selectVal" style="width: 60px;"></select-checkbox>
                </div>
                <div class="pull-left btn opacity-8 search-btn" @click="searchShow = !searchShow"><i class="fa fa-search" title="搜索"></i></div>
              </div>
            </div>
            <div class="lk-table m-t-sm">
              <ul class="table-thead clear">
                <!-- <li class="col-lg-1 col-md-1 col-sm-1 col-xs-1 clear app-first-item" v-if="selectVal.indexOf('ID')!=-1"><div class="pull-left"><input type="checkbox" v-model="selectAll"></div><div class="pull-left">ID</div></li> -->
                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1"><el-checkbox v-model="selectAll">全选</el-checkbox></li>
                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1">ID</li>
                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('用户名')!=-1">用户名</li>
                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('标题')!=-1">标题</li>
                <li class="col-xs-3 p-n" v-show="selectVal.indexOf('Url')!=-1">Url</li>
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('IP')!=-1">IP</li>
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('Browser')!=-1">Browser</li>
                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('创建时间')!=-1">创建时间</li>
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
              </ul>
              <ul class="table-tbody clear">
                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1"><el-checkbox label="1" v-model="selectedGroup"></el-checkbox></li>
                <li class="col-xs-24 p-n" v-show="selectVal.indexOf('ID')!=-1">1</li>
                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('用户名')!=-1">青春无敌</li>
                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('标题')!=-1">90</li>
                <li class="col-xs-3 p-n over-omit" v-show="selectVal.indexOf('Url')!=-1">正常</li>
                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('IP')!=-1">IP</li>
                <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('Browser')!=-1">Browser</li>
                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('创建时间')!=-1">创建时间</li>
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('操作')!=-1">
                  <a href="javascript:;" title="详情" class="candle-btn btn" @click="centerDialogVisible=true"><i class="fa fa-search-plus"></i></a>
                  <a href="javascript:;" title="删除" class="candle-btn btn" @click="delItem"><i class="fa fa-trash"></i></a>
                </li>
              </ul>
            </div>
            <div class="footer clear m-t-md">
              <div class="pull-left news-record text-lg">
                <span v-show="data.rows.length>0">显示{{offset + 1}}到{{offset + data.rows.length}}条消息，</span>共<span class="text-blue">{{data.total}}</span>条记录 每页显示
                <el-select v-model="limit" placeholder="请选择" style="width: 66px;">
                  <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select> 条记录
              </div>
              <div class="pull-right">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :current-page.sync="page"
                  :page-count="pages">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="编辑"
      :visible.sync="centerDialogVisible"
      custom-class="dialog-modal1"
      :close-on-click-modal="false">
      <div class="border">
        <ul class="clear">
          <li class="col-xs-3 line-height-40 attr-edit-name">标题</li>
          <li class="col-xs-9 line-height-40">内容</li>
        </ul>
        <ul class="clear bg-f9">
          <li class="col-xs-3 line-height-40 attr-edit-name">ID</li>
          <li class="col-xs-9 line-height-40">1234</li>
        </ul>
        <ul class="clear">
          <li class="col-xs-3 line-height-40 attr-edit-name">admin_id</li>
          <li class="col-xs-9 line-height-40">5</li>
        </ul>
        <ul class="clear bg-f9">
          <li class="col-xs-3 line-height-40 attr-edit-name">用户名</li>
          <li class="col-xs-9 line-height-40">pingtai</li>
        </ul>
        <ul class="clear">
          <li class="col-xs-3 line-height-40 attr-edit-name">url</li>
          <li class="col-xs-9 line-height-40">/admin/index/login</li>
        </ul>
        <ul class="clear bg-f9">
          <li class="col-xs-3 line-height-40 attr-edit-name">标题</li>
          <li class="col-xs-9 line-height-40">登录</li>
        </ul>
        <ul class="clear">
          <li class="col-xs-3 line-height-40 attr-edit-name">内容</li>
          <li class="col-xs-9 line-height-40">好的号戽水抗旱估计是刚开会可视电话刚开始各环节的</li>
        </ul>
        <ul class="clear bg-f9">
          <li class="col-xs-3 line-height-40 attr-edit-name">ip</li>
          <li class="col-xs-9 line-height-40">192.168.1.1</li>
        </ul>
        <ul class="clear">
          <li class="col-xs-3 line-height-40 attr-edit-name">useagent</li>
          <li class="col-xs-9 line-height-40">Mozilla/5.0(Windows)</li>
        </ul>
        <ul class="clear bg-f9">
          <li class="col-xs-3 line-height-40 attr-edit-name">creattime</li>
          <li class="col-xs-9 line-height-40">2018-06-28 22:12:00</li>
        </ul>
      </div>
      <div class="text-center m-t-lg">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import SubHeader from '../common/subheader'
  import api from '@/api'
  import format from '@/tools/format'
  import SelectCheckbox from '@/components/SelectCheckbox'
  import SearchIpts from '../common/searchIpts'
  export default {
    data: () => ({
      data: {
        rows: [],
        total: 1
      },
      centerDialogVisible: false,
      selectVal: ['checkbox', 'ID', '用户名', '标题', 'Url','IP', 'Browser', '创建时间', '操作'],
      selectedGroup: [],
      selectAll: false,
      showList: ['checkbox', 'ID', '用户名', '标题', 'Url', 'IP', 'Browser', '创建时间','操作'],
      searchOptions: [
        {
          type: 'text',
          name: '用户名',
          value: null
        },
        {
          type: 'text',
          name: '标题',
          value: null
        },
        {
          type: 'select',
          name: 'Url',
          value: null,
          options: [
            {
              value: 1,
              label: '选项1'
            },
            {
              value: 2,
              label: '选项2'
            },
            {
              value: 3,
              label: '选项3'
            }
          ]
        }
      ],
      options: [10, 25, 50],
      searchShow: false,
      limit: 10,
      page: 1,
      loading: false,
      subNavList: {
        parentNode: {
          name: '影片管理',
          router: {
            name: 'right_admin'
          }
        },
        childNode: {
          name: '影片演员管理',
          desc: '主要用来绑定应用和应用列表的查看',
          router: {
            name: 'right_log'
          }
        }
      }
    }),
    components: {
      SubHeader,
      SelectCheckbox,
      SearchIpts
    },
    computed: {
      pages () {
        return this.data ? Math.ceil(this.data.total / this.limit) : 1
      },
      offset () {
        return (this.page - 1) * this.limit
      }
    },
    methods: {
      getList () {
      },
      doSearch (data) {
        this.searchOptions = data
        console.log(this.searchOptions)
      },
      refresh () {
        this.getList()
      },
      delItem() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      addPage () {
        if (this.page < this.pages) this.page += 1
      },
      delPage () {
        if (this.page > 1) this.page -= 1
      },
      format: format
    },
    created () {
      this.page = this.$route.query.page ? parseInt(this.$route.query.page) : 1
      // this.getList()
    },
    watch: {
      selectedGroup (val) {
        console.log(val)
        if (val.length === this.data.rows.length) {
          this.selectAll = true
        }
      },
      selectAll (val) {
        if (val) {
          this.selectedGroup = []
          this.data.rows.map(val => {
            this.selectedGroup.push(val.id)
          })
        } else {
          this.selectedGroup = []
        }
      },
      page (val) {
        // this.$router.replace({name: 'application_list', query: {page: val}})
        this.getList()
      },
      limit (val) {
        this.getList()
      }
    }
  }
</script>
<style scoped>
.lk-table .p-n {
  padding-left: 0;
  padding-right: 0;
}
</style>
