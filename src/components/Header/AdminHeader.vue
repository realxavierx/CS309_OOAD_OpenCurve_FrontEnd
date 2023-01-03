<template>
  <div id="nav_u">
    <img src="../../img/logo.png" alt="" style="height:40px;float:left;margin:20px 0 20px 20px;">
    <div class="nav">
      <ul>
        <li class="dropdown">
          <div class="route-box" @click="toMain()">主页</div>
        </li>
        <li class="dropdown">
          <div class="route-box" @click="toCourseManage()">课程管理中心</div>
        </li>
        <li class="dropdown">
          <div class="route-box" @click="toUserManage()">用户管理中心</div>
        </li>
        <li class="dropdown">
          <div class="route-box" @click="toNotificationManage()">通知中心</div>
        </li>
        <li class="dropdown">
          <router-link to="/" style="color:white">view</router-link>
        </li>
      </ul>
    </div>
    <div class="nav_r">
      <ul>
        <li>
          <div>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          </div>
        </li>
        <li><div id="great">Hi~12012711</div></li>
      </ul>
    </div>
  </div>
  <router-view v-loading="loading"></router-view>
</template>

<script>
import router from "@/router";

export default {
  name: "AdminHeader",
  methods: {
    toMain() {
      router.push('/userPage/AdminMain')
    },
    toCourseManage() {
      router.push('/userPage/AdminCourseCenter')
    },
    toUserManage() {
      router.push('/userPage/AdminUserCenter')
    },
    toNotificationManage() {
      router.push('/userPage/AdminNotificationCenter')
    }
  }
}
</script>

<style scoped>
#nav_u {
  height: 80px;
  width: 100%;
  background-color: rgb(37,40,48);
}

@import '../../lib/nav.css';
.nav {
  float: left;
  line-height: 80px;
}
.nav li div{
  color:#fff;
}

@import '../../lib/search.css';

.nav_r{
  float: right;
  margin:20px 0;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
}

.nav_r>ul {
  float: left;
  position: relative;
  margin: 0;
}
.nav_r li{
  list-style: none;
  float: left;
  margin: 0 10px;
}
#great {
  height: 40px;
  color:#fff;

  line-height: 40px;
}
.route-box{
  color:#fff;
}
.route-box:hover {
  color: #FFF;
  text-shadow: 0 0 5px #ffffff, 0 0 20px #000, 0 0 30px #000;
  background-color: rgba(59, 59, 59, 0.3);
}
</style>