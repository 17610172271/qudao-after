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
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('checkbox')!=-1"><el-checkbox v-model="selectAll">全选</el-checkbox></li>
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
                <li class="col-xs-3 p-n" v-show="selectVal.indexOf('名称')!=-1">名称</li>
                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('权重')!=-1">权重</li>
                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                <li class="col-xs-3 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
              </ul>
              <ul class="table-tbody clear">
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('checkbox')!=-1"><el-checkbox label="1" v-model="selectedGroup"></el-checkbox></li>
                <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1">1</li>
                <li class="col-xs-3 p-n over-omit" v-show="selectVal.indexOf('名称')!=-1">青春无敌</li>
                <li class="col-xs-2 p-n" v-show="selectVal.indexOf('权重')!=-1">
                  <a href="javascript:;" class="candle-btn-up text-blue" title="上移"><i class="fa fa-long-arrow-up"></i></a>
                  <a href="javascript:;" class="candle-btn-down text-red" title="下移"><i class="fa fa-long-arrow-down"></i></a>
                </li>
                <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1">正常</li>
                <li class="col-xs-3 p-n" v-show="selectVal.indexOf('操作')!=-1">
                  <a href="javascript:;" title="编辑" class="candle-btn btn" @click="centerDialogVisible = true"><i class="fa fa-edit"></i></a>
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
      <div class="clear m-b-md">
        <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">名称:</div>
        <div class="col-xs-12 col-sm-10"><el-input placeholder="请输入名称" style="max-width: 300px;"></el-input></div>
      </div>
      <div class="clear m-b-md">
        <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">又名:</div>
        <div class="col-xs-12 col-sm-10"><el-input style="max-width: 300px;" placeholder="请输入又名"></el-input></div>
      </div>
      <div class="clear m-b-md">
        <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">简介:</div>
        <div class="col-xs-12 col-sm-8"><el-input type="textarea" placeholder="请输入简介" rows="4"></el-input></div>
      </div>
      <div class="clear m-b-md">
        <div class="col-xs-12 col-sm-2 line-height-40 text-right attr-edit-name">状态:</div>
        <div class="col-xs-12 col-sm-8 line-height-40">
          <el-radio label="1">正常</el-radio>
          <el-radio label="2">隐藏</el-radio>
        </div>
      </div>
      <div class="text-center m-t-lg">
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        <el-button @click="centerDialogVisible = false">重 置</el-button>
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
      selectVal: ['checkbox', '序号', '名称', '权重', '状态', '操作'],
      selectedGroup: [],
      selectAll: false,
      showList: ['checkbox', '序号', '名称', '权重', '状态', '操作'],
      searchOptions: [
        {
          type: 'text',
          name: '名称',
          value: null
        },
        {
          type: 'text',
          name: '权重',
          value: null
        },
        {
          type: 'select',
          name: '状态',
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
            name: 'attr_area'
          }
        },
        childNode: {
          name: '影片地区管理',
          desc: '主要用来绑定应用和应用列表的查看',
          router: {
            name: 'attr_area'
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
<style>
  
</style>
