<template>
  <div class="app-container">


    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" v-model="listfuzzy"
                placeholder="请输入您搜索的内容" ></el-input>
      <el-button type="primary"  icon="search" @click="handleFilter">搜索</el-button>
    </div>
    <el-table :data="list" style="width: 100%" v-loading.body="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="100">
        <template scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="证书编号"  width="200" align="center">
        <template scope="scope">
          {{scope.row.certificatenumber}}
        </template>
      </el-table-column>
      <el-table-column label="所查证书名" width="200"  align="center">
        <template scope="scope">
          <span>{{scope.row.certificatename}}</span>
        </template>
      </el-table-column>
      <el-table-column label="证书持有人姓名" width="150" align="center">
        <template scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="查询时间" width="150" align="center">
        <template scope="scope">
          {{scope.row.createtime | accformat}}
        </template>
      </el-table-column>
      <el-table-column label="查询IP" align="center">
        <template scope="scope">
          {{scope.row.enquiriesip}}
        </template>
      </el-table-column>
    </el-table>
    <div class="page-container">
      <el-pagination  @current-change="handleCurrentChange"
                      layout="total,prev, pager, next, jumper"
                      :total="totalElement"  :page-size="10" :current-page.sync="currentPage" >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import { getList,removeUser } from '@/api/verifyrecord'

  export default {
    data() {
      return {
        list: null,
        totalElement:null,
        currentPage:1,
        listLoading: true,
        listfuzzy:"",
        listFuzzy:""
      }
    },
    created() {
      this.fetchData(1);  //初始化
    },
    methods: {
      handleFilter(){
        this.listFuzzy=this.listfuzzy;
        this.listLoading=true;
        setTimeout(()=>{
          this.currentPage=1;
          this.fetchData(1,this.listFuzzy);
        },600)

      },
      handleCurrentChange(val){  //分页
        this.fetchData(val,this.listFuzzy);
      },
      fetchData(currentPage,fuzzy) {  //传入页数，显示当前页数的数据
        this.listLoading = true;
        getList(currentPage,fuzzy).then(response => {
          this.totalElement=response.data.totalElements;
          this.list = response.data.content;
          this.listLoading = false;
        })
      }
    }
  }
</script>
