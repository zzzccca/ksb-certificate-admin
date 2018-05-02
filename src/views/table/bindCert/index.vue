<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" v-model="listfuzzy"
                placeholder="请输入您搜索的内容" ></el-input>
      <el-button type="primary"  icon="search" @click="handleFilter">搜索</el-button>

      <el-radio style="margin-left: 10px" v-model="radio" label="待审核">待审核</el-radio>
      <el-radio  v-model="radio" label="已审核">已审核</el-radio>
      <el-radio  v-model="radio" label="已驳回">已驳回</el-radio>
      <el-radio v-model="radio" label="">全部</el-radio>

    </div>
    <el-table :data="list" style="width: 100%" v-loading.body="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="100">
        <template scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="证书名"  width="100" align="center">
        <template scope="scope">
          {{scope.row.certificatename}}
        </template>
      </el-table-column>
      <el-table-column label="证书编号"  align="center">
        <template scope="scope">
          <span>{{scope.row.certificatenumber}}</span>
        </template>
      </el-table-column>
      <el-table-column label="持有人姓名" width="150" align="center">
        <template scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="申请时间" width="200" align="center">
        <template scope="scope">
          {{scope.row.createtime| accformat}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="200" align="center">
        <template scope="scope">
          <router-link
            :to="{path:'/bindcert/auditing',
            query:{id:scope.row.id,applytime:scope.row.createtime}}">
            <el-button  @click="onSavePageClick"  size="small" type="warning"  >审核
            </el-button>
          </router-link>
          <el-button v-if="(scope.row.type=='已审核')?true:false" style="margin-left: 3px"  @click="onRelieveClick(scope.row.id)"  size="small" type="danger"  >解除绑定
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
  import {getList,relieve} from '@/api/bindcert';
  import {getPage,setPage,removePage,getFuzzy,setFuzzy,removeFuzzy,getRadio,setRadio,removeRadio} from '@/utils/auth';
  export default {
    data() {
      return {
        list: null,
        totalElement:null,
        currentPage:1,
        listLoading: true,
        listfuzzy:"",
        listFuzzy:"",
        dialogVisible:false,
        form:{},
        radio:'待审核',
        isReturn:false
      }
    },
    created() {
      let page=getPage();
      if(page){  //如何localstorage存在页数，即跳转到此页
        let fuzzy=getFuzzy();
        let radio=getRadio();
        this.fetchData(page,fuzzy,radio);
        this.currentPage=parseInt(page);
        this.radio=radio;
        this.listfuzzy=fuzzy;
        this.listFuzzy=fuzzy;
        if(radio!='待审核'){
          this.isReturn=true;
        }
        removePage();
        removeRadio();
        removeFuzzy();
      }
      else{
        this.fetchData(1,this.listFuzzy,this.radio);  //初始化
      }
    },
    methods: {
        onRelieveClick(id){
          this.$confirm('此操作将该用户与证书解除绑定 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            relieve(id).then(response=>{
              this.fetchData(this.currentPage,this.listFuzzy,this.radio);
              this.$message({
                type: 'success',
                message: '解除成功!',
                duration: 1500
              });
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消解除',
              duration: 1500
            });
          });
        },
      onSavePageClick(){
        setPage(this.currentPage);
        setRadio(this.radio);
        setFuzzy(this.listFuzzy);
      },
      handleFilter(){   //关键词模糊查询
        this.listFuzzy=this.listfuzzy;
        this.listLoading=true;
        setTimeout(()=>{
          this.currentPage=1;
          this.fetchData(1,this.listFuzzy,this.radio);
        },600)

      },
      handleCurrentChange(val){  //分页
        this.fetchData(val,this.listFuzzy,this.radio);
      },
      fetchData(currentPage,fuzzy,type) {  //传入页数，显示当前页数的数据
        this.listLoading = true;
        getList(currentPage,fuzzy,type).then(response => {
          this.totalElement=response.data.totalElements;
          this.list = response.data.content;
          this.listLoading = false;
        })
      }
    },
    watch:{
        radio(){
            if(!this.isReturn){
              this.currentPage=1;
              this.fetchData(this.currentPage,this.listFuzzy,this.radio);
            }
            else{
                this.isReturn=!this.isReturn;
            }
        }
    }
  }
</script>
