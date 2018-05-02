<template>
  <div class="app-container">
    <div class="filter-container">
      <el-radio v-model="radio" label="已寄送">已寄送</el-radio>
      <el-radio v-model="radio" label="已申请寄送">已申请寄送</el-radio>
      <el-radio v-model="radio" label="可寄送">可寄送</el-radio>
      <el-button class="import" style="margin-left: 20px" type="primary">
        <i class="el-icon-upload el-icon--right"></i> 导入 已寄送/可寄送
        <form id="tf">
          <input class="import-input" type="file" name="filename" @click="onEmptyClick" @change="onImportChange"/>
        </form>
      </el-button>
      <el-button type="primary" icon="document" @click="onExportUserClick">导出 已申请寄送</el-button>
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" v-model="listfuzzy"
                  placeholder="请输入您搜索的证件号" ></el-input>
        <el-button type="primary"  icon="search" @click="handleFilter" >搜索</el-button>
      <!--<el-button type="primary"  @click="delData">清空数据</el-button>-->
    </div>
    <el-table :data="list" style="width: 100%" v-loading.body="listLoading" border fit highlight-current-row>
      <el-table-column align="center" label='现场领证' width="110">
        <template scope="scope">
          <span style="color: blue;cursor: pointer"
                @click="personal(scope.row.id,scope.row.name,scope.row.idCard)">本人领证</span>
          <span style="color: blue;cursor: pointer" @click="others(scope.row)">他人代领</span>
          <span style="color: blue;cursor: pointer" @click="delData(scope.row.id)">删除</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label='考生姓名' width="100">
        <template scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='证件号码' width="200">
        <template scope="scope">
          {{scope.row.idCard}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='考试名称' width="300">
        <template scope="scope">
          {{scope.row.qualification}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='合格时间' width="100">
        <template scope="scope">
          {{scope.row.appropriatetime}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='证书号码' width="110">
        <template scope="scope">
          {{scope.row.certNumber}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='邮寄地址' width="200">
        <template scope="scope">
          {{scope.row.mailAddr}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='手机号码' width="130">
        <template scope="scope">
          {{scope.row.mailMobile}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='申请时间' width="170">
        <template scope="scope">
          {{scope.row.mailReqDate}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='状态' width="120">
        <template scope="scope">
          {{scope.row.mailStatus}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='快递单号' width="140">
        <template scope="scope">
          {{scope.row.emsNumber}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='代领人姓名' width="140">
        <template scope="scope">
          {{scope.row.names}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='代领人证件号' width="140">
        <template scope="scope">
          {{scope.row.idCards}}
        </template>
      </el-table-column>
      <el-table-column align="center" label='操作时间' width="110">
        <template scope="scope">
          {{scope.row.emsDate}}
        </template>
      </el-table-column>

      <!--<el-table-column label="证书编号"  align="center">-->
      <!--<template scope="scope">-->
      <!--<span>{{scope.row.certifid}}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="申请人姓名" width="300" align="center">-->
      <!--<template scope="scope">-->
      <!--{{scope.row.name}}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="手机号" width="300" align="center">-->
      <!--<template scope="scope">-->
      <!--{{scope.row.mailMobile}}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="快递单号" width="300" align="center">-->
      <!--<template scope="scope">-->
      <!--{{scope.row.emsNumber}}-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!-- <el-table-column class-name="status-col" label="操作" width="180" align="center">
        <template scope="scope">
          <router-link
            :to="{path:'/usersenda/auditing',
            query:{id:scope.row.id}}">
            <el-button  @click="onSavePageClick"  size="small" type="warning"  >审核
            </el-button>
          </router-link>

          <el-button v-if="(scope.row.type == '待审核'||scope.row.type == '')?false:true" style="margin-left:8px" @click="onCancelSendClick(scope.row.id)"  size="small" type="danger">取消寄件
          </el-button>


        </template>
      </el-table-column> -->
    </el-table>

    <el-dialog
      title="他人代领"
      :visible.sync="dialogVisible"
      size="tiny">
      <lable style="font-weight: 600">姓名：{{form.name}} 身份证：{{form.cardid}}</lable>
      <el-input v-model="form.getcardid" placeholder="请输入代领人的身份证号"></el-input>
      <el-input v-model="form.getcertificate" style="margin-top: 20px" placeholder="请输入代领人的姓名"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onConfirmLicensing">确 定</el-button>
  </span>
    </el-dialog>

    <div class="page-container">
      <el-pagination @current-change="handleCurrentChange"
                     layout="total, sizes, prev, pager, next, jumper"
                     :page-sizes="[3,5]"
                     :page-size="this.size"
                     :total="totalElement" @size-change="handleSizeChange" :current-page.sync="currentPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {changeState, saveState} from '@/api/usersenda'
  import {getList, upload2, reject, showmailpeople,chaxun,delsj} from '@/api/usersenda';
  import {
    getPage,
    setPage,
    removePage,
    getFuzzy,
    setFuzzy,
    removeFuzzy,
    getRadio,
    setRadio,
    removeRadio
  } from '@/utils/auth';
  export default {
    data() {
      return {
        list: null,
        totalElement: null,
        currentPage: 1,
        listLoading: true,
        listfuzzy: "",
        listFuzzy:"",
        qaq:false,
        form: {
          id: '',
          name: '',
          cardid: '',
          getcardid: '',
          getcertificate: ''
        },
        radio: '已申请寄送',
        isReturn: false,
        cancelfrom: {},
        size: 3,
        dialogVisible: false
      }
    },
    created() {
      let page = getPage();
      if (page) {  //如何localstorage存在页数，即跳转到此页
        let fuzzy = getFuzzy();
        let radio = getRadio();
        this.fetchData(page, fuzzy, radio);
        this.currentPage = parseInt(page);
        this.radio = radio;
        this.listfuzzy = fuzzy;
        this.listFuzzy = fuzzy;
        if (radio != '待审核') {
          this.isReturn = true;
        }
        removePage();
        removeRadio();
        removeFuzzy();
      }
      else {
        this.fetchData(1, this.listFuzzy, this.radio);  //初始化
      }
    },
    methods: {
      delData(id){
        let a={
          id:id,
        }
        this.$confirm( '是否确定删除', '删除证书', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delsj(a).then((res)=>{
            console.log(res);
            this.$message({
              showClose: true,
              message: '删除成功！',
              type: 'success'
            });
            this.fetchData(this.currentPage,this.listFuzzy, this.radio);
          })
        })


      },


      personal(id, name, idCard){

        console.log(id);
        this.$confirm(name + idCard + '是否确定提交已发', '现场领证', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          changeState(id).then(()=> {
          });
        })


        /*      this.$alert('是否确定提交已发！', '现场领证', {
         confirmButtonText: '确定',
         callback: action => {
         this.$message({
         type: 'info',
         message: `action: ${ action }`
         });
         }
         });*/
      },
      onConfirmLicensing(){
        if (this.form.getcardid !== '' && this.form.getcertificate !== '') {
          saveState(this.form.id, this.form.getcardid, this.form.getcertificate).then(()=> {
            this.dialogVisible = false;
            this.$message.success('操作成功')
          });
        }
        else {
          this.$alert('代领信息不能为空！', '提示',)
        }

      },
      others(data){
        this.form.id = data.id;
        this.form.name = data.name;
        this.form.cardid = data.idCard;
        this.dialogVisible = true;

        /*        console.log(data)
         this.$prompt('请输入带领人姓名', '提示', {//todo 需要换成俩个框的弹框
         confirmButtonText: '确定',
         cancelButtonText: '取消',

         }).then(({ value }) => {
         saveState(value,data.names,data.idCards).then(()=>{

         })
         })*/
      },
      onCancelSendClick(id){ //取消寄件
        this.cancelfrom = {
          expressageid: id,
          reject: '快递无人接收'
        };
        this.$confirm('此操作将取消用户寄件状态 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          reject(this.cancelfrom).then(response=> {
            this.fetchData(this.currentPage, this.listFuzzy, this.radio);
            this.$message({
              type: 'success',
              message: '取消成功!',
              duration: 1500
            });
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消此次操作',
            duration: 1500
          });
        });
      },
      onExportUserClick(){ //导出
        console.log(this.radio);
        console.log(666);
        location.href = 'http://kd.wzks.cn/cert/cert/downloadexl?mailstatus=' + this.radio;
      },
      onEmptyClick(el){ //每次点击清空file
        el.target.value = "";
      },
      onImportChange(e){
        // this.$confirm('此操作将导入excel文件 是否继续?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        // const form = new FormData(document.getElementById("tf"));
        let form = new FormData();
        console.log(e);
        let files = e.target.files[0]
        console.log(form);
        form.append('exl', files);
        let data = {exl: form};
        console.log(data);
        upload2(form).then(response=> {
          console.log(response);
          this.dialogVisible = false;
          if (response.data.code == 0) {
            this.fetchData(this.currentPage, this.listFuzzy, this.radio);
            this.$message({
              type: 'success',
              message: '导入成功!',
              duration: 1500
            });
          }
          else {
            this.$message({
              type: 'error',
              message: response.data.errorinfo,
              duration: 1500
            }); //失败信息提示
          }
        });
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消',
        //     duration: 1500
        //   });
        // });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.size = val;
        this.fetchData();
      },
      onSavePageClick(){
        setPage(this.currentPage);
        setRadio(this.radio);
        setFuzzy(this.listFuzzy);
      },
      handleFilter(){   //关键词模糊查询2
        this.listFuzzy = this.listfuzzy;
//        this.listLoading = true;
//        setTimeout(()=> {
//          this.currentPage = 1;
//          this.fetchData(1, this.listFuzzy, this.radio);
//        }, 600)
            if(this.listFuzzy!=''){
              this.qaq=true;
              this.fetchData(this.currentPage, this.listFuzzy, this.radio);
            }



      },
      handleCurrentChange(val){  //分页
        console.log(val)
        this.fetchData(val, this.listFuzzy, this.radio);
      },
      fetchData(currentPage, fuzzy, type) {  //传入页数，显示当前页数的数据
        //this.listLoading = true;
        this.list=[];
        if(this.qaq==false){
          let data = {
            page: currentPage, size: this.size, mailstatus: this.radio
          }
          showmailpeople(data).then(response => {
            console.log(response);
            this.totalElement = response.data.data.totalElements;
            this.list = response.data.data.content;
            this.listLoading = false;
          })
        }else {
          let a = {
            page: this.currentPage,
            size: this.size,
            idcard: this.listFuzzy,
          };
          chaxun(a).then((res)=> {
            console.log(res.data.data.content);
            this.totalElement = res.data.data.totalElements;
            this.list = res.data.data.content;
            this.listLoading = false;
          })

        }
      }
    },
    watch: {
      radio(){
        if (!this.isReturn) {
          this.currentPage = 1;
          this.fetchData(this.currentPage, this.listFuzzy, this.radio);
          this.qaq=false;
        }
        else {
          this.isReturn = !this.isReturn;
        }
      }
    }
  }
</script>
<style scoped>
  .import {
    position: relative;
  }

  #tf {
    display: inherit;
  }

  .import-input {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
</style>
