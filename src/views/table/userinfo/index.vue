<template>
  <div class="app-container">


    <div class="filter-container">
    <el-input @keyup.enter.native="handleFilter" style="width: 200px;" v-model="listfuzzy"
              placeholder="请输入您搜索的内容" ></el-input>
    <el-button type="primary"  icon="search" @click="handleFilter">搜索</el-button>
    <el-button  type="primary" icon="document" @click="onExportUserClick">导出</el-button>
    </div>
    <el-table :data="list" style="width: 100%" v-loading.body="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="100">
        <template scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="姓名"  width="300" align="center">
        <template scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="身份证号"  align="center">
        <template scope="scope">
          <span>{{scope.row.cardid}}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="300" align="center">
        <template scope="scope">
          {{scope.row.phone}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="110" align="center">
        <template scope="scope">
          <el-button   size="small" type="danger" @click="onRemoveUserClick(scope.row.id)">删除
          </el-button>
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
import { getList,removeUser } from '@/api/userinfo'

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
    onRemoveUserClick(id){   //删除用户
      this.$confirm('此操作将删除该用户 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          removeUser(id).then(response=>{
            this.fetchData(this.currentPage,this.listFuzzy);
            this.$message({
              type: 'success',
              message: '删除成功!',
              duration: 1500
            });
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
          duration: 1500
        });
      });
    },
    handleCurrentChange(val){  //分页
      this.fetchData(val,this.listFuzzy);
    },
    onExportUserClick(){
      location.href='http://www.embracex.com:8081/getexcel';
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
