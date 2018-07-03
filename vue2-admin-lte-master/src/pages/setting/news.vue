<template>
  <div class="scroll-x">
    <div class="p-lg appli-container">
      <sub-header :list="subNavList"></sub-header>
      <div class="page-container">
        <div class="m-t-sm" v-loading="loading">
          <div>
            <div class="m-t-sm">
              <el-tabs type="card" v-model="tab" @tab-click="handleClick">
                <el-tab-pane label="消息通知" name="news">
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
                  </div>
                  <div class="lk-table m-t-sm">
                    <ul class="table-thead clear">
                      <li class="col-xs-1 p-n" v-show="selectVal.indexOf('checkbox')!=-1"><el-checkbox v-model="selectAll">全选</el-checkbox></li>
                      <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
                      <li class="col-xs-3 p-n" v-show="selectVal.indexOf('标题')!=-1">标题</li>
                      <li class="col-xs-2 p-n" v-show="selectVal.indexOf('发送时间')!=-1">发送时间</li>
                      <li class="col-xs-2 p-n" v-show="selectVal.indexOf('阅读时间')!=-1">阅读时间</li>
                      <li class="col-xs-1 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                      <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                    </ul>
                    <ul class="table-tbody clear">
                      <li class="col-xs-1 p-n" v-show="selectVal.indexOf('checkbox')!=-1"><el-checkbox label="1" v-model="selectedGroup"></el-checkbox></li>
                      <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1">1</li>
                      <li class="col-xs-3 p-n over-omit" v-show="selectVal.indexOf('标题')!=-1">青春无敌</li>
                      <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('发送时间')!=-1">90</li>
                      <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('阅读时间')!=-1">正常</li>
                      <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                      <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">
                        <a href="javascript:;" title="详情" class="candle-btn btn"><i class="fa fa-search-plus"></i></a>
                        <a href="javascript:;" title="删除" class="candle-btn btn"><i class="fa fa-trash"></i></a>
                      </li>
                    </ul>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="系统公告" name="notice">
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
                  </div>
                  <div class="lk-table m-t-sm">
                    <ul class="table-thead clear">
                      <li class="col-xs-1 p-n" v-show="selectVal.indexOf('checkbox')!=-1"><el-checkbox v-model="selectAll">全选</el-checkbox></li>
                      <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1">序号</li>
                      <li class="col-xs-3 p-n" v-show="selectVal.indexOf('标题')!=-1">标题</li>
                      <li class="col-xs-2 p-n" v-show="selectVal.indexOf('发送时间')!=-1">发送时间</li>
                      <li class="col-xs-1 p-n" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                      <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">操作</li>
                    </ul>
                    <ul class="table-tbody clear">
                      <li class="col-xs-1 p-n" v-show="selectVal.indexOf('checkbox')!=-1"><el-checkbox label="1" v-model="selectedGroup"></el-checkbox></li>
                      <li class="col-xs-1 p-n" v-show="selectVal.indexOf('序号')!=-1">1</li>
                      <li class="col-xs-3 p-n over-omit" v-show="selectVal.indexOf('标题')!=-1">系统公告</li>
                      <li class="col-xs-2 p-n over-omit" v-show="selectVal.indexOf('发送时间')!=-1">90</li>
                      <li class="col-xs-1 p-n over-omit" v-show="selectVal.indexOf('状态')!=-1">状态</li>
                      <li class="col-xs-2 p-n" v-show="selectVal.indexOf('操作')!=-1">
                        <a href="javascript:;" title="详情" class="candle-btn btn"><i class="fa fa-search-plus"></i></a>
                        <a href="javascript:;" title="删除" class="candle-btn btn"><i class="fa fa-trash"></i></a>
                      </li>
                    </ul>
                  </div>
                </el-tab-pane>
              </el-tabs>
              
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
      tab: 'news',
      selectVal: ['checkbox', '序号', '标题', '发送时间', '阅读时间', '状态', '操作'],
      selectedGroup: [],
      selectedGroup1: [],
      selectAll: false,
      selectAll1: false,
      showList: ['checkbox', '序号', '标题', '发送时间', '阅读时间', '状态','操作'],
      searchOptions: [
        {
          type: 'text',
          name: '标题',
          value: null
        },
        {
          type: 'text',
          name: '发送时间',
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
      handleClick () {},
      doSearch (data) {
        this.searchOptions = data
        console.log(this.searchOptions)
      },
      refresh () {
        this.getList()
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
