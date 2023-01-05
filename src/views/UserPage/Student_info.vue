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
          <el-descriptions-item label="用户昵称">{{ baseInfo.nick_name }}</el-descriptions-item>
          <el-descriptions-item label="用户ID">{{ baseInfo.email }}</el-descriptions-item>
          <el-descriptions-item label="出生日期">{{ baseInfo.birthday }}</el-descriptions-item>
          <el-descriptions-item label="书院">{{ baseInfo.collage }}</el-descriptions-item>
          <el-descriptions-item label="院系">{{ baseInfo.major }}</el-descriptions-item>
          <el-descriptions-item label="性别">{{ baseInfo.gender }}</el-descriptions-item>
          <el-descriptions-item label="所在地区">{{ baseInfo.region }}</el-descriptions-item>
          <el-descriptions-item label="配送地址">{{ baseInfo.address }}</el-descriptions-item>

          <el-descriptions-item label="职业">
            <el-tag size="small">{{ baseInfo.type }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <div class="base-info">
      <div class="base-info-head">编辑信息</div>
      <div class="base-info-content">

        <el-form ref="form" :model="form" label-width="80px" size="mini">
          <el-form-item label="上传头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadActionUrl"
              accept="image/png, image/jpg, image/gif"
              :on-success="handleAvatarSuccess"
              :limit="1">
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="书院">
            <el-select v-model="form.collage" placeholder="请选择活动区域">
              <el-option label="致仁书院" value="zhiren"></el-option>
              <el-option label="树仁书院" value="shuren"></el-option>
              <el-option label="致诚书院" value="zhicheng"></el-option>
              <el-option label="树德书院" value="shude"></el-option>
              <el-option label="致新书院" value="zhixin"></el-option>
              <el-option label="树礼书院" value="shuli"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="院系">
            <el-select v-model="form.major" placeholder="请选择活动区域">
              <el-option label="计算机科学与工程" value="shanghai"></el-option>
              <el-option label="生物医学工程" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="所在地区">
            <el-cascader
                size="large"
                :options="options"
                v-model="form.region"
                @change="handleChange"
            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="配送地址">
            <el-input v-model="form.address"></el-input>
          </el-form-item>

          <el-form-item label="个人简介">
            <el-input type="textarea" v-model="form.desc" placeholder="主人很懒，还没有简介噢~"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getInfo();">提交修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {regionData, CodeToText} from "element-china-area-data";

export default {

  data() {
    return {
      options: regionData,
      imageUrl: '',
      uploadActionUrl:'http://localhost:8081/cloud_storage/file/uploading',
      form: {
        name: '教父爷爷',
        birthday: '2001-09-24',
        collage: '树仁书院',
        major: '计算机科学与工程',
        gender: '男',
        region: ['440000', '440300', '440305'],
        address: '广东省-深圳市-南山区-桃园街道1088号-南方科技大学',
        desc: ''
      },
      baseInfo: {
        nick_name: '未登录',
        email: localStorage.getItem('USER_ID'),
        avatar_url: '',
        money: 0,
        birthday: '未填写',
        collage: '未填写',
        major: '未填写',
        gender: '未填写',
        region: '未填写',
        address: '未填写',
        type: localStorage.getItem('type')
      }
    }
  },
  methods: {
    getInfo() {
      this.axios({
        method: 'GET',
        url: 'http://localhost:8080/education/Info/getInfo/?id=' + this.baseInfo.email,
      }).then(response => {
        console.log(response.data.data.Info)
        this.baseInfo.nick_name = response.data.data.Info.name
        this.baseInfo.avatar_url = response.data.data.Info.picture_url
        this.baseInfo.birthday = response.data.data.Info.birthday
        this.baseInfo.collage = response.data.data.Info.collage
        this.baseInfo.major = response.data.data.Info.department
        this.baseInfo.gender = response.data.data.Info.gender
        this.baseInfo.region = response.data.data.Info.region
        this.baseInfo.address = response.data.data.Info.address
      })
      
      // var t = localStorage.getItem('type')
      // if (t == 'Student') {
      //   this.type = "学生"
      // } else if (t == 'Teacher') {
      //   this.type = "教师"
      // } else {
      //   this.type = "管理员"
      // }
      
    },
    toVIP() {
      this.$router.push({
        path: '/userpage/student/vip',
      })
    },
    handleAvatarSuccess(resp) {
      console.log(resp)
      this.imageUrl = resp.data.url
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

.avatar-hover {
  display: none;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, .5);
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  border-radius: 50%;
}

.avatar-hover img {
  width: 80%;
  height: 80%;

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
}


.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>