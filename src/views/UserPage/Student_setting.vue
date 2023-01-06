<template>
  <div class="general-setting">
    <div class="setting">
      <div class="setting-title">账号设置</div>
      <div class="setting-content">
        <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
          <el-form-item label="手机">
            <span v-if="!isSetPhone">188****6979</span>
            <el-input v-model="sizeForm.phone" style="width:280px" v-if="isSetPhone"></el-input>

            <el-button type="primary" circle @click="setPhone()" v-if="!checkPhone"><el-icon style="vertical-align: middle"><Edit /></el-icon></el-button>
            <el-button type="primary" circle v-if="checkPhone" @click="savePhone()" color="green"><el-icon style="vertical-align: middle"><Check /></el-icon></el-button>
          </el-form-item>
          <el-form-item label="邮箱">
            <span v-if="!isSetEmail">yang_j****an@163.com</span>
            <el-input v-model="sizeForm.email" style="width:280px" v-if="isSetEmail"></el-input>

            <el-button type="primary" circle @click="setEmail()" v-if="!checkEmail"><el-icon style="vertical-align: middle"><Edit /></el-icon></el-button>
            <el-button type="primary" circle v-if="checkEmail" @click="saveEmail()" ><el-icon style="vertical-align: middle"><Check /></el-icon></el-button>
          </el-form-item>
          <el-form-item label="注销账号">
            <el-button type="primary" circle @click="confirm_delete()" color="red"><el-icon style="vertical-align: middle"><Delete /></el-icon></el-button>
          </el-form-item>
          <el-form-item label="隐私设置">
            <span>展示隐私（别人将看到您的生日，书院，院系等信息）</span>
            <el-switch
                v-model="value"
                class="mt-2"
                style="margin-left: 24px"
                inline-prompt
                active-icon="Check"
                inactive-icon="Close"
                active-color="green"
            />

          </el-form-item>
        </el-form>
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
              accept="image/png, image/jpg, image/jpeg, image/gif"
              :on-success="handleAvatarSuccess"
              :limit="1">
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
          <el-form-item label="用户昵称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-col :span="11">
              <el-date-picker
                value-format="YYYY-MM-DD"
                v-model="form.birthday"
                type="date"
                placeholder="Pick a day"
              />
            </el-col>
          </el-form-item>
          <el-form-item label="书院">
            <el-select v-model="form.college" placeholder="请选择活动区域">
              <el-option label="Zhi Ren" value="zhiren"></el-option>
              <el-option label="Shu Ren" value="shuren"></el-option>
              <el-option label="Zhi Cheng" value="zhicheng"></el-option>
              <el-option label="Shu De" value="shude"></el-option>
              <el-option label="Zhi Xin" value="zhixin"></el-option>
              <el-option label="Shu Li" value="shuli"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="院系">
            <el-select
                v-model="form.major"
                placeholder="院系"
                clearable
            >
              <el-option
                  v-for="department in departments"
                  :key="department"
                  :label="department"
                  :value="department"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="grade">
            <el-select v-model="form.grade" placeholder="grade">
              <el-option label="2019" value="2019"></el-option>
              <el-option label="2020" value="2020"></el-option>
              <el-option label="2021" value="2021"></el-option>
              <el-option label="2022" value="2022"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Your Region">
            <el-cascader
                size="large"
                :options="options"
                v-model="selectedOptions"

            >
            </el-cascader>
          </el-form-item>
          <el-form-item label="Your Address">
            <el-input v-model="form.address"></el-input>
          </el-form-item>

          <el-form-item label="个人简介">
            <el-input type="textarea" v-model="form.desc" placeholder="主人很懒，还没有简介噢~"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="confirm_modify();">提交修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Check } from '@element-plus/icons-vue';
import {regionData, CodeToText} from "element-china-area-data";
export default {
  components: {
    Check
  },
  data() {
    return {
      value: true,
      sizeForm: {
        phone: '18881496979',
        email: sessionStorage.getItem('USER_ID'),
      },
      isSetPhone: false,
      isSetEmail: false,
      checkPhone: false,
      checkEmail: false,
      options: regionData,
      imageUrl: '',
      uploadActionUrl: 'http://localhost:8081/cloud_storage/file/uploading',
      departments: [],
      selectedOptions:[],
      form: {
        name: sessionStorage.getItem('NICK_NAME'),
        birthday: sessionStorage.getItem('BIRTHDAY'),
        college: sessionStorage.getItem('COLLEGE'),
        major: sessionStorage.getItem('MAJOR'),
        gender: sessionStorage.getItem('GENDER'),
        region: sessionStorage.getItem('REGIONCODE'),
        address: sessionStorage.getItem('ADDRESS'),
        desc: '',
        grade:sessionStorage.getItem('GRADE')
      },
    }
  },
  methods: {
    confirm_delete() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
          //TODO:在数据库中删除
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    setPhone() {
      this.isSetPhone = !this.isSetPhone
      this.checkPhone = !this.checkPhone
    },
    setEmail() {
      this.isSetEmail = !this.isSetEmail
      this.checkEmail = !this.checkEmail
    },
    savePhone() {
      //TODO: commit modified phone to database
      this.isSetPhone = !this.isSetPhone
      this.checkPhone = !this.checkPhone
    },
    saveEmail() {
      //TODO: commit modified email to database
      this.isSetEmail = !this.isSetEmail
      this.checkEmail = !this.checkEmail
    },
    handleAvatarSuccess(resp) {
      console.log(resp)
      this.imageUrl = resp.data.url
    },
    getAllDepartments() {
      this.axios({
        method: 'GET',
        url: 'http://localhost:8080/education/course/getAllDepartments',
      }).then(response => {
        console.log(response.data.message)
        this.departments = response.data.data.departments
      })
    },
    confirm_modify() {
      this.axios({
        method: 'POST',
        url: 'http://localhost:8080/education/Info/update',
        data: {
          id: sessionStorage.getItem('USER_ID'),
          name: this.form.name,
          department: this.form.major,
          college: this.form.college,
          grade: this.form.grade,
          picture_url: this.imageUrl,
          birthday:this.form.birthday,
          gender:this.form.gender,
          region:this.selectedOptions,
          address:this.form.address
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
        sessionStorage.setItem('NICK_NAME',this.form.name)
        sessionStorage.setItem('MAJOR',this.form.major)
        sessionStorage.setItem('COLLEGE',this.form.college)
        sessionStorage.setItem('GENDER',this.form.gender)
        sessionStorage.setItem('AVATAR',this.imageUrl)
        sessionStorage.setItem('BIRTHDAY',this.form.birthday)
        sessionStorage.setItem('REGIONCODE',this.selectedOptions)
        sessionStorage.setItem('GRADE',this.form.grade)
        sessionStorage.setItem('ADDRESS',this.form.address)
      })
    },
      

    getRegionText(codeStr){
      this.selectedOptions = codeStr.split(",")
    }
  },
  mounted() {
    this.getAllDepartments();
    this.getRegionText(this.form.region);
  }
}
</script>

<style>
.general-setting{
  width:80%;
  color: #000;
  margin:0 auto;
}
.setting {
  width: 100%;
  background-color: #fff;
}
.setting-title {
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
.setting-content {
  width: 90%;
}

.avatar-hover img {
  width: 80%;
  height: 80%;
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
</style>