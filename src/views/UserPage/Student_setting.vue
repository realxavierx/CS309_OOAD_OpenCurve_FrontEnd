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
  </div>
</template>

<script>
import { Check } from '@element-plus/icons-vue';

export default {
  components: {
    Check
  },
  data() {
    return {
      value: true,
      sizeForm: {
        phone: '18881496979',
        email: 'yang_jia_jian@163.com',
      },
      isSetPhone: false,
      isSetEmail: false,
      checkPhone: false,
      checkEmail: false,
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
    }
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
</style>