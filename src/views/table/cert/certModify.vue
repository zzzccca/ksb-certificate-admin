<template>
  <div v-if="isShow" class="container">
    <el-form style="float: left" label-width="130px">
     <!-- <el-form-item v-for="(item,index) in form1" :key="index" v-if="item.display||form[item.value]" :label="item.key">
        <input  :class="['input',isButtonReadonly?'Nshow':'Tshow']" :readonly="isButtonReadonly" v-model="form[item.value]" />
      </el-form-item>-->
      <CertInfo  :isButtonReadonly="isButtonReadonly" :form="form"></CertInfo>
      <el-form-item>
        <el-button class="editor" icon="edit" type="primary" @click="onEditorClick">编辑</el-button>
        <el-button style="margin-left: 60px;" type="primary" @click="onSubmit">修改</el-button>
        <router-link style="margin-left: 3px" to="/cert"><el-button type="primary">返回</el-button></router-link>
      </el-form-item>
    </el-form>



    <el-form style="display: inline-block">
      <ul>
        <li  v-for="item in form2.item1" v-if="item.display||form[item.value]">
          <span class="name">{{item.key}}</span>
          <input :class="['input',isButtonReadonly?'Nshow':'Tshow']"  :readonly="isButtonReadonly" v-model="form[item.value]" />
        </li>
        <li v-for="item in form2.item2" v-if="form[item.key]">
          <span class="name">{{form[item.key]}}</span>
          <input :class="['input',isButtonReadonly?'Nshow':'Tshow']"  :readonly="isButtonReadonly" v-model="form[item.value]" />
        </li>
      </ul>
    </el-form>

   <!-- <el-form style="display: inline-block" ref="form" :model="form"  label-width="124px">
      <el-form-item  v-for="(item,index) in form2.item1" :key="index" v-if="item.display||form[item.value]" :label="item.key">
        <input :class="['input',isButtonReadonly?'Nshow':'Tshow']" :readonly="isButtonReadonly" v-model="form[item.value]">
      </el-form-item>

      <el-form-item style="margin-top: 20px" v-for="(item,index) in form2.item2" :key="index"  v-if="form[item.key]"  :label="form[item.key]">
        <input :class="['input',isButtonReadonly?'Nshow':'Tshow']" :readonly="isButtonReadonly" v-model="form[item.value]">
      </el-form-item>

    </el-form>-->
  </div>
</template>

<script>
  import  CertInfo from '@/views/utils/certinfo/certinfo'
  import {findbyid,modify} from '@/api/cert'
  import {formdate,timeStamp} from '@/utils'
  export default {
    components:{CertInfo},
    data() {
      return {
        form: {},
        isShow:false,
        isButtonReadonly:true,
       /* form1:[
          {key:'证书名称',value:'certificatename',display:true},
          {key:'持证人姓名',value:'name',display:true},
          {key:'持证人性别',value:'gender',display:true},
          {key:'持证人身份证',value:'cardid',display:true},
          {key:'持证人出生年月',value:'birthdate',display:true},
          {key:'证书编号',value:'certificatenumber',display:true},
          {key:'批准日期',value:'approvalofdate',display:true},
          {key:'签发日期',value:'issuanceoftime'},
          {key:'发证机构',value:'issuanceagencies'},
        ],*/
        form2:{
            item1:[
              {key:'其他身份证件',value:'otherscard'},
              {key:'评审委员会',value:'reviewcommittee'},
              {key:'文号',value:'referencenumber'},
              {key:'绑定状态',value:'bindingtype',display:true},
              {key:'绑定人',value:'binding',display:true},
              {key:'证书是否可寄',value:'trueorfalse',display:true},
              {key:'现场领证人姓名',value:'getcertificate'},
              {key:'现场领证人身份证',value:'getcardid'},
              {key:'现场领证时间',value:'gettime'},
            ],
          item2:[
            {key:'objectone',value:'valueone'},
            {key:'objecttwo',value:'valuetwo'},
            {key:'objectthree',value:'valuethree'},
            {key:'objectfour',value:'valuefour'},
            {key:'objectfive',value:'valuefive'},
            {key:'objectsix',value:'valuesix'},
          ]
        }
      }
    },
    created(){
      findbyid(this.$route.query.id).then(response => {
          this.form=response.data;
          this.form.approvalofdate=formdate(this.form.approvalofdate);
          this.form.issuanceoftime=formdate(this.form.issuanceoftime);
          this.form.gettime=formdate(this.form. gettime);
          this.form.birthdate=formdate(this.form.birthdate);
        /*this.form = {
          id:this.$route.query.id,
          certificatename: response.data.certificatename,
          name: response.data.name,
          cardid: response.data.cardid,
          birthdate: formdate(response.data.birthdate),
          certificatenumber: response.data.certificatenumber,
          issuanceagencies: response.data.issuanceagencies,
          approvalofdate: formdate(response.data.approvalofdate),
          issuanceoftime: formdate(response.data.issuanceoftime)
        };*/
        this.isShow=true;
      })
    },
    methods: {
      onEditorClick(){
        this.isButtonReadonly=! this.isButtonReadonly;
      },
      onSubmit() {
        this.$confirm('此操作将修改该用户 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const arr={
            gettime:timeStamp(this.form.gettime),
            birthdate:timeStamp(this.form.birthdate),
            approvalofdate:timeStamp(this.form.approvalofdate),
            issuanceoftime:timeStamp(this.form.issuanceoftime)
          };
          const info=Object.assign({},this.form,arr);
          modify(info).then(response=>{
            this.$message({
              type: 'success',
              message: '修改成功!',
              duration: 1500
            });
            this.$router.push('/cert');
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改',
            duration: 1500
          });
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "certModify.scss";
  @import "../../utils/certinfo/certinfo.scss";
</style>
