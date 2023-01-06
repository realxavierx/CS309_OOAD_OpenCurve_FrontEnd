<template>
  <div>
    <div id="header">
      <img src="../../img/logo.png" alt="" style="height:40px;float:left;margin:20px 0 20px 20px;">
      <div class="nav">
        <ul>
          <li>
            <div @click="toHomePage">Home</div>
          </li>
          <li>
            <div @click="signShow()">Login</div>
          </li>
          <li>
            <div @click="toUserCenter()">User Center</div>
          </li>
        </ul>
      </div>
    </div>
    <router-view></router-view>
  </div>

</template>

<script>

import router from "@/router";

export default {
  methods: {

    toHomePage() {
      if (sessionStorage.getItem('USER_ID')) {
        if (sessionStorage.getItem('TYPE') === 'Student') {
          router.push({
            name: 'StudentMain'
          })
        } else if (sessionStorage.getItem('TYPE') === 'Teacher') {
          router.push({
            name: 'TeacherMain'
          })
        } else {
          router.push({
            name: 'AdminMain'
          })
        }
      } else {
        this.$router.push({
          path: '/',
        })
      }
    },

    signShow() {
      this.$router.push({
        path: '/Welcome/login',
      })
    },

    toUserCenter() {
      if (sessionStorage.getItem('USER_ID')) {
        if (sessionStorage.getItem('TYPE') === 'Student') {
          router.push({
            name: 'StudentSelfCenter'
          })
        } else if (sessionStorage.getItem('TYPE') === 'Teacher') {
          router.push({
            name: 'TeacherSelfCenter'
          })
        }

      } else {
        this.$router.push({
          path: '/Welcome/login',
        })
      }

    }
  }
}
</script>

<style scoped>

@import '../../lib/nav.css';

#header {
  position: absolute;
  top: 0;
  width: 100%;
  height: 80px;
  line-height: 80px;
  color: #fff;
  font-weight: 600;
  z-index: 2;
}

</style>