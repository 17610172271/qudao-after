<template>
  <div>
    <search-ipts :options="searchOptions" @submit="doSearch" v-show="searchShow"></search-ipts>
    <div class="page-toolbar clear">
      <div class="pull-left toolbar-candle">
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
        <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
        <li class="col-xs-1 p-n" v-show="selectVal.indexOf('电影名称')!=-1">电影名称</li>
        <li class="col-xs-24 p-n" v-show="selectVal.indexOf('时长')!=-1">时长</li>
        <li class="col-xs-24 p-n" v-show="selectVal.indexOf('语言')!=-1">语言</li>
        <li class="col-xs-1 p-n" v-show="selectVal.indexOf('导演')!=-1">导演</li>
        <li class="col-xs-2 p-n" v-show="selectVal.indexOf('演员')!=-1">演员</li>
        <li class="col-xs-1 p-n" v-show="selectVal.indexOf('类型')!=-1">类型</li>
        <li class="col-xs-1 p-n" v-show="selectVal.indexOf('上映时间')!=-1">上映时间</li>
        <li class="col-xs-1 p-n" v-show="selectVal.indexOf('审核状态')!=-1">审核状态</li>
        <li class="col-xs-1 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
        <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
      </ul>
      <ul class="table-tbody clear">
        <li class="col-xs-24 p-n" v-show="selectVal.indexOf('checkbox')!=-1"><el-checkbox label="1" v-model="selectedGroup"></el-checkbox></li>
        <li class="col-xs-24 p-n" v-show="selectVal.indexOf('序号')!=-1">1</li>
        <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('电影名称')!=-1">青春无敌</li>
        <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('时长')!=-1">90</li>
        <li class="col-xs-24 p-n over-omit" v-show="selectVal.indexOf('语言')!=-1">普通话</li>
        <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('导演')!=-1">赵天宇</li>
        <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('演员')!=-1">王金明,刘洋</li>
        <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('类型')!=-1">歌舞,冒险,谍战</li>
        <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('上映时间')!=-1">2018-06-19</li>
        <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('审核状态')!=-1">未审核</li>
        <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1">已上线</li>
        <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">
          <a href="javascript:;" title="通过" class="candle-btn btn" @click="delItem"><i class="fa fa-check"></i></a>
          <a href="javascript:;" title="不通过" class="candle-btn btn" @click="delItem"><i class="fa fa-close"></i></a>
          <a href="javascript:;" title="详情" class="candle-btn btn" @click="centerDialogVisible=true"><i class="fa fa-search-plus"></i></a>
          <a href="javascript:;" title="审核历史" class="candle-btn btn"><i class="fa fa-history"></i></a>
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
  import Detail from './detail.vue'
  import SearchIpts from '../common/searchIpts'
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
      selectVal: ['checkbox', '序号', '电影名称', '时长', '语言', '导演', '演员', '类型', '上映时间', '审核状态', '状态', '操作'],
      selectedGroup: [],
      selectAll: false,
      showList: ['checkbox', '序号', '电影名称', '时长', '语言', '导演', '演员', '类型', '上映时间', '审核状态', '状态', '操作'],
      searchOptions: [
        {
          type: 'text',
          name: '电影名称',
          value: null
        },
        {
          type: 'text',
          name: '时长',
          value: null
        },
        {
          type: 'text',
          name: '语言',
          value: null
        },
        {
          type: 'text',
          name: '导演',
          value: null
        },
        {
          type: 'text',
          name: '演员',
          value: null
        },
        {
          type: 'text',
          name: '类型',
          value: null
        },
        {
          type: 'time',
          name: '上映时间',
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