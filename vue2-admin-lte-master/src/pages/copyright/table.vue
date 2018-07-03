<template>
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
        <li class="col-xs-1 p-n" v-show="selectVal.indexOf('电影ID')!=-1">电影ID</li>
        <li class="col-xs-2 p-n" v-show="selectVal.indexOf('电影名称')!=-1">电影名称</li>
        <li class="col-xs-2 p-n" v-show="selectVal.indexOf('版权商')!=-1">版权商</li>
        <li class="col-xs-1 p-n" v-show="selectVal.indexOf('版权登记号')!=-1">版权登记号</li>
        <li class="col-xs-1 p-n" v-show="selectVal.indexOf('作品/制品名称')!=-1">作品/制品名称</li>
        <li class="col-xs-1 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
        <li class="col-xs-2 p-n" v-show="selectVal.indexOf('备注')!=-1">备注</li>
        <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
      </ul>
      <ul class="table-tbody clear">
        <li class="col-xs-1 p-n" v-show="selectVal.indexOf('电影ID')!=-1">111</li>
        <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('电影名称')!=-1">青春无敌</li>
        <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('版权商')!=-1">xxx电影有限公司</li>
        <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('版权登记号')!=-1">20180629</li>
        <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('作品/制品名称')!=-1">电影</li>
        <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1">已上线</li>
        <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('备注')!=-1">歌舞,冒险,谍战</li>
        <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">
          <a href="javascript:;" title="通过" class="candle-btn btn" @click="delItem"><i class="fa fa-check"></i></a>
          <a href="javascript:;" title="不通过" class="candle-btn btn" @click="delItem"><i class="fa fa-close"></i></a>
          <a href="javascript:;" title="详情" class="candle-btn btn" @click="centerDialogVisible = true"><i class="fa fa-search-plus"></i></a>
          <a href="javascript:;" title="编辑" class="candle-btn btn" @click="delItem"><i class="fa fa-edit"></i></a>
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
    <el-dialog
      title="基本信息"
      :visible.sync="centerDialogVisible"
      custom-class="dialog-modal1 dailog-p-t-n"
      :close-on-click-modal="false">
      <detail></detail>
    </el-dialog>
  </div>
</template>
<script>
  import SelectCheckbox from '@/components/SelectCheckbox'
  import SearchIpts from '../common/searchIpts'
  import Detail from './detail.vue'
  export default {
    components: {
      SelectCheckbox,
      SearchIpts,
      Detail
    },
    data: () => ({
      data: {
        rows: [],
        total: 1
      },
      centerDialogVisible: false,
      selectVal: ['电影ID', '电影名称', '版权商', '版权登记号', '作品/制品名称', '状态', '备注', '操作'],
      selectedGroup: [],
      selectAll: false,
      showList: ['电影ID', '电影名称', '版权商', '版权登记号', '作品/制品名称', '状态', '备注','操作'],
      searchOptions: [
        {
          type: 'text',
          name: '电影名称',
          value: null
        },
        {
          type: 'text',
          name: '版权商',
          value: null
        },
        {
          type: 'text',
          name: '版权登记号',
          value: null
        },
        {
          type: 'text',
          name: '作品/制品名称',
          value: null
        },
        {
          type: 'select',
          name: '审核状态',
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
        },
        {
          type: 'text',
          name: '备注',
          value: null
        }
      ],
      options: [10, 25, 50],
      searchShow: false,
      limit: 10,
      page: 1
    }),
    computed: {
      pages () {
        return this.data ? Math.ceil(this.data.total / this.limit) : 1
      },
      offset () {
        return (this.page - 1) * this.limit
      }
    },
    methods: {
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
      }
    },
    created () {
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