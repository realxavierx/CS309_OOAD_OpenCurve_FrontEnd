<template>
  <div class="bg">
    <div class="adminMain">
      <p>Administrator Main</p>
      <el-upload
        :file-list="fileList"
        class="upload-demo"
        :action="uploadActionUrl"
        :on-change="handleChange"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        list-type="picture"
      >
        <el-button type="primary">Click to upload</el-button>
      
      </el-upload>
      输入course_id: <el-input v-model="course_id" placeholder="input course id"></el-input>
      <el-button style="margin-left: 10px;" type="success" @click="submitUpload">上传到服务器</el-button>
    </div>

  </div>
</template>

<script>  
export default {
  
  name: "AdminMain",
  data() {
    return {
      course_id: '',
      url:'',
      uploadActionUrl: 'http://localhost:8081/cloud_storage/file/uploading',
    }
  },
  methods: {
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用,function(file, fileList)
    
    handleSuccess(resp) {
      this.url = resp.data.url
    },

    submitUpload() {
      this.axios({
        method: 'POST',
        url: 'http://localhost:8082/banner/addBanner',
        data: {
          url: this.url,
          course_id: this.course_id
        },
        transformRequest: [function (data) {
          let str = '';
          for (let key in data) {
            str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
          }
          return str;
        }]
      }).then(response => {
        console.log(response.data.message)
      })
    }
  }
}
</script>

<style scoped>
.bg {
  background-color: rgb(243,244,246);
}
.adminMain{
  width:80%;
  margin:0 auto;
  background-color: rgb(243,244,246);
}
</style>