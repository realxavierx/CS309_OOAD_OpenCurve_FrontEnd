<template>
  <div class="general-setting">
    <div class="setting">
      <div class="setting-title">账号设置</div>
      <div class="setting-content">
        <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
          <el-form-item label="手机">
            <el-input v-model="sizeForm.phone" style="width:280px"></el-input>
            <el-button type="primary" icon="el-icon-edit" circle style="float:right"></el-button>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="sizeForm.email" style="width:280px"></el-input>
            <el-button type="primary" icon="el-icon-edit" circle style="float:right"></el-button>
          </el-form-item>
          <el-form-item label="注销账号">
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </el-form-item>
          <el-form-item label="隐私设置">
            
            <el-switch
              v-model="value"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          
          </el-form-item>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
      sizeForm: {
        phone: '18881496979',
        email: 'yang_jia_jian@163.com',
        
      }
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