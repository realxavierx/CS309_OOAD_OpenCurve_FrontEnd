<template>
  <div id="login_bg" class="animate__animated animate__bounceInDown">
    <div id="form">
      <h1>Login</h1>
      <button @click="loginShow()">LOGIN</button>
      <button @click="registerShow()">REGISTER</button>
      <br>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>

    <!-- <Loader id="loader" v-if="loarderVisible"></Loader> -->

  </div>

</template>

<script>

export default {
  mounted() {
    setTimeout(() => {
      this.loaderVisible = false
    }, 3750)
  },

  data() {
    return {
      title: 'Login',
      Email: '',
      password: '',
      type: '',
      loaderVisible: true,
      registerVisible: false
    }
  },
  methods: {

    loginShow() {
      this.$router.push({
        path: '/Welcome/sign/login',
      })
    },

    registerShow() {
      this.$router.push({
        path: '/Welcome/sign/register',
      })
    }
  }
}


</script>

<style scoped>

#login_bg {
  position: absolute;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, .4);
  z-index: 4;
}


#form {
  position: relative;
  width: 400px;
  height: 500px;
  top: 50%;
  left: 50%;
  margin-top: -250px;
  margin-left: -200px;
  background-image: url(../../img/login2.png);
  background-size: cover;
  border-radius: 10px;
  box-shadow: rgb(244, 230, 230) 0px 0px 10px 3px;
  text-align: center;
  color: rgb(0, 0, 0);
}

#loader {
  position: absolute;
  z-index: 2;
}
</style>