<template>
  <div>
    <div id="header">
      <img src="../../img/logo.png" alt="" style="height:40px;float:left;margin:20px 0 20px 20px;">
      <div class="nav">
        <ul>
          <li>
            <div @click="toHomePage">Home</div>
          </li>
          <li class="dropdown">
            <div>About</div>
            <ul>
              <li>
                <div>About Version</div>
              </li>
              <li>
                <div>About Version</div>
              </li>
              <li>
                <div>Contact Us</div>
              </li>
              <li>
                <div>Contact Us</div>
              </li>
            </ul>
          </li>
          <li class="dropdown">
            <div>Contact</div>
            <ul>
              <li>
                <div>About Version</div>
              </li>
              <li>
                <div>About Version</div>
              </li>
              <li>
                <div>Contact Us</div>
              </li>
              <li>
                <div>Contact Us</div>
              </li>
            </ul>
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

export default {
  methods: {

    toHomePage() {
      this.$router.push({
        path: '/',
      })
    },

    signShow() {
      this.$router.push({
        path: '/Welcome/login',
      })
    },

    toUserCenter() {
      if (localStorage.getItem('USER_ID')) {
        this.$router.push({
          path: '/userPage',
        })
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