<template>
  <div style="text-align: center">
    <div id="editorElem"><el-input style="width: 300px;height: 50px;margin: 100px 0 0 0;" v-model="input" placeholder="请输入密码"></el-input></div>
    <div style="margin: 15px 0 0 0">
      <el-button  type="primary" @click="getContent" style="width: 150px;height: 50px;font-size:24px ">提交</el-button>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'editor',
    data () {
      return {
        input: ''
      }
    },
    created(){

    },
    methods: {
      getContent: function () {
        axios({
          url: 'http://kd.wzks.cn/cert/admin/update',
          method:'post',
          params: {
            password:this.input,
          }
        }).then(()=>{
          this.$alert('密码添加成功！', '修改密码', {
            confirmButtonText: '确定',
            callback: action => {
//              this.$message({
//                type: 'info',
//                message: `action: ${ action }`
//              });
            }
          });
          console.log('success')
        });
      }
    },
  }
</script>
