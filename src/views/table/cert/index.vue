<template>
  <div class="app-container">

    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter"  style="width: 200px;" v-model="listfuzzy"
                placeholder="请输入您搜索的内容" ></el-input>
      <el-button type="primary"  icon="search" @click="handleFilter">搜索</el-button>


   <el-button class="import" type="primary">
     <i style="margin-right:7px " class="el-icon-upload el-icon--right"></i>导入
     <form id="tf">
        <input class="import-input" type="file" name="filename"@click="onEmptyClick" @change="onImportChange"/>
     </form>
   </el-button>
    </div>
    <el-table :data="list" style="width: 100%" v-loading.body="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row>
      <el-table-column align="center" label='序号' width="100">
        <template scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>
      <el-table-column label="证书名"  width="180" align="center">
        <template scope="scope">
          {{scope.row.certificatename}}
        </template>
      </el-table-column>
      <el-table-column label="证件编号"  align="center">
        <template scope="scope">
          <span>{{scope.row.certificatenumber}}</span>
        </template>
      </el-table-column>
      <el-table-column label="持有人姓名" width="150" align="center">
        <template scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="持有人出生年月" width="200" align="center">
        <template scope="scope">
          {{scope.row.birthdate | format}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="200" align="center">
        <template scope="scope">
          <router-link :to="{path:'/cert/modify',query:{id:scope.row.id}}">
            <el-button style="margin-right: 10px" @click="onSavePageClick"  size="small" type="info"  >修改
          </el-button>
          </router-link>
          <el-button v-if="(scope.row.gettype=='现场领取')?false:true"  size="small" @click="onLicensingClick(scope.row.id)"  type="warning">领证
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
    <el-dialog
      title="现场领证"
      :visible.sync="dialogVisible"
      size="tiny">
      <el-input v-model="form.getcardid" placeholder="请输入您的身份证号"></el-input>
      <el-input v-model="form.getcertificate" style="margin-top: 20px" placeholder="请输入您的姓名"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onConfirmLicensing">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getList,licensing,upload} from '@/api/cert';
  import {getPage,setPage,removePage,getFuzzy,setFuzzy,removeFuzzy} from '@/utils/auth';
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
        form:{}
      }
    },
    created() {
        let page=getPage();
      if(page){  //如何localstorage存在页数，即跳转到此页
        let fuzzy=getFuzzy();
        this.fetchData(page,fuzzy);
        this.currentPage=parseInt(page);
        this.listfuzzy=fuzzy;
        this.listFuzzy=fuzzy;
        removePage();
        removeFuzzy();
      }
      else{
        this.fetchData(1);  //初始化
      }
    },
    methods: {
      onEmptyClick(el){
        el.target.value="";
      },
      onImportChange(el){
        this.$confirm('此操作将导入excel文件 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const form = new FormData(document.getElementById("tf"));
          upload(form).then(response=>{
            this.dialogVisible=false;
            if(response.data.errorcode==0){
              this.fetchData(this.currentPage,this.listFuzzy);
              this.$message({
                type: 'success',
                message: '导入成功!',
                duration: 1500
              });
            }
            else{
              this.$message({
                type: 'error',
                message: response.data.errorinfo,
                duration: 1500
              }); //失败信息提示
            }

          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消本次导入',
            duration: 1500
          });
        });
      },


      onLicensingClick(id){  //唤起现场领证Dialog框
          this.form={};
          this.form.certificateid=id;
          this.dialogVisible=true;
      },
      onConfirmLicensing(){ //确认领证
        this.$confirm('此操作将进行现场领证 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          licensing(this.form).then(response=>{
            this.fetchData(this.currentPage,this.listFuzzy);
            this.$message({
              type: 'success',
              message: '领证成功!',
              duration: 1500
            });
            this.dialogVisible=false;
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消现场领证',
            duration: 1500
          });
        });

      },
      onSavePageClick(){
       setPage(this.currentPage);
       setFuzzy(this.listFuzzy);
      },
      handleFilter(){   //关键词模糊查询
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
<style lang="scss" scoped>
  .import{
    position: relative;
  }
  #tf{
    display: inherit;
  }
.import-input{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>
