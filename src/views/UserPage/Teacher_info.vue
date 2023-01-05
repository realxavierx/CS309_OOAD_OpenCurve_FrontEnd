<template>
  <div class="general-info">
    <div class="general-info-t">
      <div class="general-info-avatar">
        <!-- <img :src="baseInfo.avatar_url" alt=""> -->
        <img :src="baseInfo.avatar_url" alt="">
      </div>
      <div class="general-info-t-info">
        <div class="name">{{ baseInfo.nick_name }}</div>
        <div class="email">注册邮箱:{{ baseInfo.email }}</div>
      </div>
    </div>
    <div class="general-info-b">
      <div style="margin-right:10px">我的余额:{{ baseInfo.money }}</div>
      <el-button type="primary" icon="el-icon-shopping-cart-2" @click="toVIP()">去充值</el-button>
    </div>
    <div class="base-info">
      <div class="base-info-head">基本信息</div>

      <div class="base-info-content">
        <el-descriptions>
          <el-descriptions-item label="nick Name">{{ baseInfo.nick_name }}</el-descriptions-item>
          <el-descriptions-item label="User ID">{{ baseInfo.email }}</el-descriptions-item>
          <el-descriptions-item label="Department">{{ baseInfo.major }}</el-descriptions-item>
          <el-descriptions-item label="Gender">{{ baseInfo.gender }}</el-descriptions-item>

          <el-descriptions-item label="职业">
            <el-tag size="small">{{ baseInfo.type }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
</template>

<script>

import {CodeToText} from "element-china-area-data";
export default {

  data() {
    return {
      
      baseInfo: {
        nick_name: '',
        email: localStorage.getItem('USER_ID'),
        avatar_url: '',
        money: 0,
        birthday: '未填写',
        college: '未填写',
        major: '未填写',
        gender: '未填写',
        regionCode: '',
        region:'',
        address: '未填写',
        type: localStorage.getItem('type'),
        grade: ''
      }
    }
  },
  methods: {
    getInfo() {
      this.baseInfo.nick_name = localStorage.getItem('nick_name')
      this.baseInfo.avatar_url = localStorage.getItem('avatar_url')
      this.baseInfo.birthday = localStorage.getItem('birthday')
      this.baseInfo.college = localStorage.getItem('college')
      this.baseInfo.major = localStorage.getItem('major')
      this.baseInfo.gender = localStorage.getItem('gender')
      this.baseInfo.regionCode = localStorage.getItem('regionCode')
      this.baseInfo.region = CodeToText[this.baseInfo.regionCode.split(",")[0]]+'-'+CodeToText[this.baseInfo.regionCode.split(",")[1]]+'-'+CodeToText[this.baseInfo.regionCode.split(",")[2]]
      this.baseInfo.address = localStorage.getItem('address')
      this.baseInfo.grade = localStorage.getItem('grade')
    },
    toVIP() {
      this.$router.push({
        path: '/userpage/student/vip',
      })
    },
    
    // beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    //   if (rawFile.type !== 'image/jpeg') {
    //     ElMessage.error('Avatar picture must be JPG format!')
    //     return false
    //   } else if (rawFile.size / 1024 / 1024 > 2) {
    //     ElMessage.error('Avatar picture size can not exceed 2MB!')
    //     return false
    //   }
    //   return true
    // }
  },
  mounted() {
    this.getInfo()
  }
}
</script>

<style scoped>
.general-info {
  width: 80%;
  color: #000;
  margin: 0 auto;

}

.general-info-t {
  padding: 24px 0 40px 24px;
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  background-color: rgb(255, 255, 255);
  margin-bottom: 10px;
  -webkit-box-shadow: 0 1px 8px 0 rgb(0 0 0 / 4%);
  box-shadow: 0 1px 8px 0 rgb(0 0 0 / 4%);
}

.general-info-avatar {
  flex-shrink: 0;
  position: relative;
  width: 96px;
  height: 96px;
  margin-right: 16px;
  -webkit-box-shadow: 0 0 10px 2px rgb(0 0 0 / 6%);
  box-shadow: 0 0 10px 2px rgb(0 0 0 / 6%);
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: pointer;
}

.general-info-avatar img {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 50%;
}


.general-info-t-info {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
}

.name {
  font-weight: 600;
  font-size: 250%;
}

.general-info-b {
  height: 48px;
  margin: 0 auto;
  background-color: rgb(255, 255, 255);
  font-size: 14px;
  line-height: 48px;
}

.general-info-b div {
  margin-left: 24px;
  display: inline-block;
}

.base-info {
  background-color: rgb(255, 255, 255);
}

.base-info-head {
  height: 48px;
  line-height: 48px;
  font-size: 18px;
  font-weight: 600;
  color: #000;

  padding-left: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #f0f0f2;
}

.base-info-content {
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;
}


</style>