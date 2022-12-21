<template>

  <div class="header">
    <img src="../img/logo.png" alt="" style="height:40px;float:left;margin:10px 0 20px 20px;">
    <div class="logo">
      <router-link to="/">OpenCurve</router-link>
    </div>
    <!-- 水平一级菜单 -->
    <div style="float: left;" class="nav">
      <el-menu
          mode="horizontal"
          :ellipsis="false"
          text-color="#000000"
          active-text-color="#3989fa">
        <el-menu-item index="1">
          <router-link to="/StudentMain">主页</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/StudentCourseCenter">课程中心</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/StudentNotificationCenter">通知中心</router-link>
        </el-menu-item>
        <el-menu-item index="4">
          <router-link to="/StudentAssignmentCenter">作业中心</router-link>
        </el-menu-item>
        <el-menu-item index="5">
          <router-link to="/userPage">个人中心</router-link>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="header-right">
      <div class="header-user-space">
        <!-- 用户头像 -->
        <div class="user-avatar">
          <img src="../assets/logo.png">
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click">
          <span class="el-dropdown-link"> user <i class="el-icon-caret-bottom"></i></span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>个人资料</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
              <!--                <el-dropdown-item disabled>Action 4</el-dropdown-item>-->
              <!--                <el-dropdown-item divided>Action 5</el-dropdown-item>-->
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "StudentHeader"
}
</script>

<style scoped>
/*@import '../lib/nav.css';*/

/*.header {*/
/*  position:absolute;*/
/*  top:0;*/
/*  width: 100%;*/
/*  height:80px;*/
/*  line-height: 80px;*/
/*  color: #fff;*/
/*  font-weight: 600;*/
/*  z-index: 2;*/
/*}*/

.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
}

.header .logo {
  float: left;
  margin-left: 60px;
  margin-top: 17px;
  height: 29px;
  width: 160px;
  vertical-align: middle;
}


/* --------------- 水平一级菜单栏的样式--------------------- */
.el-menu.el-menu--horizontal {

  float: left;
  margin-left: 50px;
  background: transparent;
}

.el-menu--horizontal > .el-menu-item.is-active {
  /* border-bottom: 2px solid #3989fa;
  color: #3989fa; */
  font-weight: bold;
}

.el-menu--horizontal > .el-menu-item {
  font-size: 16px;
  margin: 0 15px;
}

/* --------------- 用户头像区域的样式 ---------------- */
.header-right {
  float: right;
  padding-right: 50px;
}

.header-user-space {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
}

.user-avatar {
  margin-left: 20px;
}

.user-avatar img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>