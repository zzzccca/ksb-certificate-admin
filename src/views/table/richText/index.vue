<template>
<div style="text-align: center">
  <div id="editorElem" style="text-align:left"></div>
  <div style="margin: 20px 0 0 0">
    <el-button  type="primary" @click="getContent" style="width: 150px;height: 50px;font-size:24px ">提交</el-button>
  </div>

</div>
</template>

<script>
  import E from 'wangeditor'
  import axios from 'axios'
  export default {
    name: 'editor',
    data () {
      return {
        editorContent: ''
      }
    },
    created(){

    },
    methods: {
      getContent: function () {
        axios({
          url: 'http://kd.wzks.cn/cert/info/save',
          method:'post',
          params: {
            content:this.editorContent,
            location: 'top'
          }
        }).then(()=>{
          this.$alert('内容添加成功！', '添加首页说明', {
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
    mounted() {
      var editor = new E('#editorElem')
      editor.customConfig.onchange = (html) => {
        this.editorContent = html
      }
      editor.create()
    }
  }
</script>
