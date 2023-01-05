<template>
  <div id="nav_u">
    <img src="../../img/logo.png" alt="" style="height:40px;float:left;margin:20px 0 20px 20px;cursor: pointer;" @click="toWelcome()">
    <div class="nav">
      <ul>
        <li class="dropdown">
          <div class="route-box" @click="toMain()">主页</div>
        </li>
        <li class="dropdown">
          <div class="route-box" @click="toCourseCenter()">课程中心</div>
        </li>
        <li class="dropdown">
          <div class="route-box" @click="toNotificationCenter()">通知中心</div>
        </li>
        <li class="dropdown">
          <div class="route-box" @click="toAssignmentCenter()">作业中心</div>
        </li>
        <li class="dropdown">
          <div class="route-box" @click="toSelfCenter()">个人中心</div>
        </li>
      </ul>
    </div>
    <div class="nav_r">
      <ul>
        <li>
          <div>
            <el-avatar :src="avatar_url"></el-avatar>
          </div>
        </li>
        <li><div id="great">Hi ~ {{ nick_name }}</div></li>
      </ul>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
import router from "@/router";

export default {
  name: "UserHeader",

  data() {
    return {
      logo_url: '../../img/logo.png',
      avatar_url: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png', //默认头像
      nick_name: 'Visitor',
      type : localStorage.getItem('type')
    }
  },
  methods: {
    toMain() {
      if (this.type == 'Teacher') {
        router.push('/userPage/TeacherMain')
      }
      else {
        router.push('/userPage/StudentMain')
      }
    },
    toCourseCenter() {
      if (this.type == 'Teacher') {
        router.push('/userPage/TeacherCourseCenter')
      } else {
        router.push('/userPage/StudentCourseCenter')
      }
    },
    toNotificationCenter() {
      if (this.type == 'Teacher') {
        router.push('/userPage/TeacherNotificationCenter')
      } else {
        router.push('/userPage/StudentNotificationCenter')
      }
    },
    toAssignmentCenter() {
      if (this.type == 'Teacher') {
        router.push('/userPage/TeacherAssignmentCenter')
      } else {
        router.push('/userPage/StudentAssignmentCenter')
      }
    },
    toSelfCenter() {
      if (this.type == 'Teacher') {
        router.push('/userPage/TeacherSelfCenter/information')
      } else {
        router.push('/userPage/StudentSelfCenter/information')
      }
    },
    toWelcome() {
      router.push('/')
    },
    getInfo() {
      this.axios({
        method: 'GET',
        url: 'http://localhost:8080/education/Info/getInfo/?id=' + localStorage.getItem('USER_ID') + "&userType=" + localStorage.getItem('type'),
      }).then(response => {
        let resp = response.data.data.Info
        if (this.type == 'Student') {
          localStorage.setItem('avatar_url',resp.picture_url)
          localStorage.setItem('nick_name', resp.name)
          localStorage.setItem('birthday',resp.birthday)
          localStorage.setItem('college',resp.college)
          localStorage.setItem('major',resp.department)
          localStorage.setItem('gender',resp.gender)
          localStorage.setItem('regionCode',resp.region)
          localStorage.setItem('address',resp.address)
          localStorage.setItem('grade',resp.grade)
        } else if (this.type == 'Teacher') {
          localStorage.setItem('avatar_url',resp.picture_url)
          localStorage.setItem('nick_name', resp.name)
          localStorage.setItem('major',resp.department)
          localStorage.setItem('gender',resp.gender)
        }
        
      })
      this.avatar_url = localStorage.getItem('avatar_url')
      this.nick_name = localStorage.getItem('nick_name')
    }
  },
  mounted() {
    this.getInfo()
  }

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