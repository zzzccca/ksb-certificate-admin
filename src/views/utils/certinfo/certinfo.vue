<template>
  <ul>
    <li  v-for="item in cert">
      <span class="name">{{item.key}}</span>
      <input :class="['input',isButtonReadonly?'Nshow':'Tshow']"  :readonly="isButtonReadonly" v-model="form[item.value]" />
    </li>
  </ul>
</template>
<style lang="scss" scoped>
  @import "certinfo.scss";
</style>
<script>
  export  default {
      props:['form','isButtonReadonly'],
      data(){
          return {
              cert:[
                {key:'证书名称',value:'certificatename',display:true},
                {key:'持证人姓名',value:'name',display:true},
                {key:'持证人性别',value:'gender',display:true},
                {key:'持证人身份证',value:'cardid',display:true},
                {key:'持证人出生年月',value:'birthdate',display:true},
                {key:'证书编号',value:'certificatenumber',display:true},
                {key:'批准日期',value:'approvalofdate',display:true},
                {key:'签发日期',value:'issuanceoftime'},
                {key:'发证机构',value:'issuanceagencies'},
              ]
          }
      }
  }
</script>
