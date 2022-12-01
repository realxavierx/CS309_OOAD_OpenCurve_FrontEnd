<template>
  <div>
    <div id="login_bg" class="animate__animated animate__bounceInDown">
      <div id="form">
        <h1>Login</h1>
        <el-radio-group v-model="LoginWay" style="margin-bottom: 10px" size="Large">
          <el-radio-button label="Password"/>
          <el-radio-button label="Verification Code" @click="getVertiCode"/>
        </el-radio-group>

        <div id="input-box" class="animate__animated animate__lightSpeedInRight">
          <div class="input-text">
            <input type="text" v-model="userId" id="inputId" placeholder="Your Email">
          </div>
          <div class="input-text">
            <input type="password" v-model="content" id="inputPassword" placeholder="Code / Password">
          </div>
          <div>
            You are:
            <input type="radio" v-model="loginType" value="Student">Student
            <input type="radio" v-model="loginType" value="Teacher">Teacher
          </div>
          <el-button class="submitBtn" type="primary" @click="login">Login</el-button>
          <br>
          <div class="sign-up" style="margin-top: 15px">
            还没账户？
            <el-button type="primary" @click="this.$router.push({path: '/welcome/register'})">立即注册</el-button>
          </div>
          <br>
          <el-button type="danger" style="margin-top: 20px" @click="this.$router.push({path: '/welcome'})">暂不登录</el-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      userId: '',
      content: '',
      loginType: '',
      holder: '',
      LoginWay: 'Password'
    }
  },
  methods: {

    getVertiCode() {
      console.log("sending register information --- wait for response")

      axios({
        method: 'POST',
        url: 'http://10.24.233.83:8080/education/register/getVertiCode',
        data: {
          Email: this.userId,
          type: this.type
        },
        transformRequest: [function (data) {
          let str = '';
          for (let key in data) {
            str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
          }
          return str;
        }]
      }).then(res => {
        if (res.status === 200) {
          console.log(res)
          this.vertiCodeFromEnd = res.data.data.vertiCode
        }
      })
    },

    login() {
      this.axios({
        method: 'GET',
        url: 'http://10.24.233.83:8080/education/login/user',
        data: {
          userid: this.userId,
          content: this.content,
          loginType: this.loginType
        },
        transformRequest: [function (data) {
          console.log(data)
          var str = '';
          for (var key in data) {
            str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
          }
          return str;
        }]
      }).then(res => {
        console.log(res.data)
        if (res.status === 200) {
          //res中需要包含uid，头像url，以及会话密钥，来让浏览器知道用户已经处于登录状态
          sessionStorage.setItem('SESSION_KEY', res.session_key)
          sessionStorage.setItem('AVATAR', res.avatar)
          //路由跳转
          this.$router.push({
            path: '/homepage',
          })
        }
      })
      // sessionStorage.removeItem('SESSION_KEY')
      // sessionStorage.getItem('SESSION_KEY')

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
  height: 350px;
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
</style>