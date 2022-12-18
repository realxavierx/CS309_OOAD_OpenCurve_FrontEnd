<template>
    <div class="general-info">
        <div class="general-info-t">
            <div class="general-info-avatar">
<!--                <img src="../../img/123.jpg" alt="">-->
                <div class="avatar-hover">
<!--                    <img src="../../img/avatar-hover.png" alt="">-->
                </div>
            </div>
            <div class="general-info-t-info">
                <div class="name">{{nick_name}}</div>
                <div class="email">注册邮箱:{{email}}</div>
            </div>
        </div>
        <div class="general-info-b">
            <div style="margin-right:10px">我的余额:114514</div>
            <el-button type="primary" icon="el-icon-shopping-cart-2" @click="toVIP()">去充值</el-button>
        </div>
        <div class="base-info">
            <div class="base-info-head">基本信息</div>
          
            <div class="base-info-content">
              <el-descriptions>
                <el-descriptions-item label="用户昵称">教父爷爷</el-descriptions-item>
                <el-descriptions-item label="用户ID">114514</el-descriptions-item>
                <el-descriptions-item label="出生日期">2001-09-24</el-descriptions-item>
                <el-descriptions-item label="书院">树仁书院</el-descriptions-item>
                <el-descriptions-item label="院系">计算机科学与工程</el-descriptions-item>
                <el-descriptions-item label="性别">男</el-descriptions-item>
                <el-descriptions-item label="所在地区">广东省-深圳市-南山区</el-descriptions-item>
                <el-descriptions-item label="配送地址">广东省-深圳市-南山区-桃园街道1088号-南方科技大学</el-descriptions-item>
                
                <el-descriptions-item label="职业">
                  <el-tag size="small">学生</el-tag>
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
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="用户昵称">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="出生日期">
                  <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.birthday" style="width: 100%;"></el-date-picker>
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
                  <el-button type="primary" @click="onSubmit">立即创建</el-button>
                  <el-button>取消</el-button>
                </el-form-item>
              </el-form>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import { regionData, CodeToText } from "element-china-area-data";
export default {
    
  data() {
    return {
      options: regionData,
        nick_name: '陌生人',
        email:sessionStorage.getItem(''),
        avatar_url: '',
        form: {
          name: '教父爷爷',
          birthday:'2001-09-24',
          collage: '树仁书院',
          major: '计算机科学与工程',
          gender: '男',
          region: ['440000','440300','440305'],
          address:'广东省-深圳市-南山区-桃园街道1088号-南方科技大学',
          desc: ''
        }
      }
  },
  methods: {
    initial() {
      this.axios({
        method: 'POST',
        url: 'http://10.24.233.83:8080/education/register/getVertiCode',
        data: {
            key: sessionStorage.getItem('SESSION_KEY')
        },
        transformRequest: [function (data) {
            var str='';
            for (var key in data) {
            str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
            }
            return str;
        }]
        }).then(res => {
            if (res.status === 200) {
              if (res.nick_name === '###') {
                  this.options.nick_name = res.email.substr(0,8)
              }
            }
        })
    },
    toVIP() {
      this.$router.push({
        path: '/userPage/student/vip',
      })
    }
  },
  mounted() {
      
    }
  }
  </script>
  
  <style scoped>
      .general-info{
          width:80%;
          color: #000;
          margin:0 auto;
          
      }
      .general-info-t {
        padding: 24px 0 40px 24px;
        position: relative;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        background-color: rgb(255,255,255);
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

      .avatar-hover{
        display: none;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,.5);
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

      .general-info-b{
        height: 48px;
        margin:0 auto;
        background-color: rgb(255,255,255);
        font-size: 14px;
        line-height: 48px;
      }
      .general-info-b div{
        margin-left: 24px;
        display: inline-block;
      }

      .base-info {
        background-color: rgb(255,255,255);
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

      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
  </style>