<template>
  <div v-if="isUser&&isCert" class="container" >

  <CertInfo style="float: left"  class="cert" :isButtonReadonly="isButtonReadonly" :form="certData" ></CertInfo>
    <ul  class="cert">
      <li><span class="name">申请人姓名</span>
        <span class="fieldName">{{userData.name}}</span></li>
      <li><span class="name">申请人身份证号</span>
        <span class="fieldName">{{userData.cardid}}</span></li>
      <li><span class="name">申请人手机号</span>
        <span class="fieldName">{{userData.phone}}</span></li>
      <li><span class="name">申请时间</span>
        <span class="fieldName">{{$route.query.applytime | format}}</span></li>
      <li ><span class="name">申请资料</span>
        <img :src="'http://www.embracex.com:8081/resources/'+bindData.bindingimage"/></li>
      <li   class="input-box" style="margin-top: 188px;">
        <span class="name"> 驳回原因</span>
        <input  type="text" v-model.trim="bindData.reject" v-disabled /></li>
    </ul>
    <div v-if="isLoadComplete" class="button">
      <el-button size="small" type="success" class="adopt" @click="onAdoptClick">通过</el-button>
      <el-button size="small" type="danger" class="reject" @click="onRejectClick">驳回</el-button>
    </div>
    <router-link to="/bindcert"><el-button size="small" type="info" class="return">返回</el-button></router-link>
  </div>
</template>
<script>
  import  CertInfo from '@/views/utils/certinfo/certinfo'
  import {formdate} from '@/utils'
  import $ from 'jquery';
  import {bindbyid,findbyid,userbyid,bindsuccess,bindfail} from '@/api/bindcert';
  export default {
    components:{CertInfo},
    data(){
      return {
        isCert:false,
        isUser:false,
        isLoadComplete: false,
        isButtonReadonly:true,
        Sform:{},
        Fform:{}
      }
    },
    created(){
      bindbyid(this.$route.query.id).then(response=>{
          this.bindData=response.data;
          this.isLoadComplete = (this.bindData.type == '已驳回' || this.bindData.type == '已审核') ? false : true;
          findbyid(response.data.certificateid).then(cert=>{
                this.certData=cert.data;
            this.certData.birthdate = formdate(this.certData.birthdate);
            this.certData.approvalofdate = formdate(  this.certData.approvalofdate );
            this.certData.issuanceoftime = formdate(  this.certData.issuanceoftimee);
                this.isCert=true;
          });
        userbyid(response.data.userid).then(user=>{
            this.userData=user.data;
            this.isUser=true;
        })

        });
    },
    methods:{
      onAdoptClick(){
        this.$confirm('此操作将通过审核 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.Sform={
            bindingid:this.bindData.id,
            userid:this.bindData.userid,
            certificateid:this.bindData.certificateid
          };
          bindsuccess(this.Sform).then(response=>{
            this.$message({
              type: 'success',
              message: '通过成功!',
              duration: 1500
            });
            this.$router.push('/bindcert');
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
              bindingid:this.bindData.id,
              reject:this.bindData.reject
            };
            bindfail(this.Fform).then(response=>{
              this.$message({
                type: 'success',
                message: '驳回成功!',
                duration: 1500
              });
              this.$router.push('/bindcert');
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消驳回',
              duration: 1500
            });
          });
        }
        else {
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
