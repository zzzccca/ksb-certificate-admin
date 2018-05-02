<template>
  <div v-if="isCert" class="container" >


    <CertInfo style="float: left"  class="cert" :isButtonReadonly="isButtonReadonly" :form="certData" ></CertInfo>
  <ul  class="cert" >
      <li><span class="name">证书编号</span>
        <span class="fieldName">{{bindData.certificatenumber}}</span></li>
      <li><span class="name">申请人姓名</span>
        <span class="fieldName">{{bindData.name}}</span></li>
      <li><span class="name">手机号码</span>
        <span class="fieldName">{{bindData.phone}}</span></li>
      <li><span class="name">地址</span>
        <span class="fieldName">{{bindData.address}}</span></li>
      <li class="input-box">
        <span class="name"> 驳回原因</span>
        <input  type="text" v-model.trim="bindData.reject" v-disabled /></li>
    </ul>
 <div v-if="isLoadComplete" class="button">
      <el-button size="small" type="success" class="adopt" @click="onAdoptClick">通过</el-button>
      <el-button size="small" type="danger" class="reject" @click="onRejectClick">驳回</el-button>
    </div>
    <router-link to="/usersenda"><el-button size="small" type="info" class="return">返回</el-button></router-link>
  </div>
</template>
<script>
  import  CertInfo from '@/views/utils/certinfo/certinfo'
  import {formdate} from '@/utils'
  import $ from 'jquery';
  import {expressagebyid,findbyid,expressagesuccess,reject} from '@/api/usersenda';
  export default {
    components:{CertInfo},
    data(){
      return {
        isCert:false,
        isLoadComplete: false,
        isButtonReadonly:true,
        Fform:{}
      }
    },
    created(){
      expressagebyid(this.$route.query.id).then(response=>{
        this.bindData=response.data;
        this.isLoadComplete = (this.bindData.type == '待审核') ? true: false;
        findbyid(response.data.certificateid).then(cert=>{
          this.certData=cert.data;
          this.certData.birthdate = formdate(this.certData.birthdate);
          this.certData.approvalofdate = formdate(  this.certData.approvalofdate );
          this.certData.issuanceoftime = formdate(  this.certData.issuanceoftimee);
          this.isCert=true;
        });
      });
    },
    methods:{
      onAdoptClick(){
        this.$confirm('此操作将通过审核 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          expressagesuccess(this.$route.query.id).then(response=>{
            this.$message({
              type: 'success',
              message: '通过成功!',
              duration: 1500
            });
            this.$router.push('/usersenda');
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消审核',
            duration: 1500
          });
        });
      },
      onRejectClick(){
          if(this.bindData.reject!=""&&this.bindData.reject!=null){
            this.$confirm('此操作将驳回该审核 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.Fform={
                expressageid:this.$route.query.id,
                reject:this.bindData.reject
              };
              reject(this.Fform).then(response=>{
                this.$message({
                  type: 'success',
                  message: '驳回成功!',
                  duration: 1500
                });
                this.$router.push('/usersenda');
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消驳回',
                duration: 1500
              });
            });
          }
          else{
            this.$alert('请填写驳回内容', '警告', {
              confirmButtonText: '确定'})
          }
      }
    },
    directives:{
      disabled:{
        inserted: function (el) {
          if($('.adopt').length==0){
            $(el).attr('disabled','disabled');
          }
          else{
            $(el).removeAttr('disabled');
            $(el).css({'border':'1px solid #ccc'});
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import './auditing.scss';
</style>
