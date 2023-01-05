<template>
  <div>
    <div id="login_bg" class="animate__animated animate__bounceInDown">
      <div id="form">
        <h1>Login</h1>
        <el-radio-group v-model="loginWay" style="margin-bottom: 10px" size="large">
          <el-radio-button label="Password" @click="vertiMode = false; content = ''"/>
          <el-radio-button label="Verification Code" @click="vertiMode = true; content=''"/>
        </el-radio-group>

        <div id="input-box" class="animate__animated animate__lightSpeedInRight">
          <div class="input-text">
            <input type="text" v-model="userId" id="inputId" placeholder="Your Email">
          </div>
          <div class="input-text">
            <input type="password" v-model="content" id="inputPassword" placeholder="Code / Password">
          </div>

          <el-button
              v-show="vertiMode"
              type="primary"
              style="margin-top: 10px"
              size="small"
              @click="getVertiCode"
          >
            获取验证码
          </el-button>

          <div style="margin: 10px">
            You are:
            <el-radio-group v-model="userType">
              <el-radio label="Student">Student</el-radio>
              <el-radio label="Teacher">Teacher</el-radio>
              <el-radio label="Manager">Manager</el-radio>
            </el-radio-group>
          </div>
          <el-button class="submitBtn" type="primary" @click="login">Login</el-button>
          <div class="sign-up" style="margin: 10px">
            还没账户？
            <el-button type="primary" @click="this.$router.push({path: '/welcome/register'})">立即注册</el-button>
          </div>
          <el-button type="danger" style="margin: 10px" @click="this.$router.push({path: '/welcome'})">暂不登录</el-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import axios from "axios";
import router from "@/router";
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  data() {
    return {
      vertiMode: false,
      userId: '',
      content: '',
      userType: '',
      holder: '',
      loginWay: 'Password'
    }
  },
  methods: {

    getVertiCode() {
      console.log("sending register information --- wait for response")

      if (!this.userId.includes('@')) {
        alert('Please input correct email address!')
      }

      axios({
        method: 'POST',
        url: 'http://localhost:8080/education/register/getVertiCode',
        data: {
          Email: this.userId,
          type: this.userType
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
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/Info/getInfo?id=' + this.userId + '&userType=' + this.userType,
      })
          .then(resp => {
            let response = resp.data.data
            let accountDuplicateLogin = (response.Info.online === 'True')
            let deviceDuplicateLogin = (localStorage.getItem('USER_CNT') === '1')
            let loggedInUserId = sessionStorage.getItem('USER_ID')
            let loggedInUserType = sessionStorage.getItem('TYPE')


            if (loggedInUserId !== null && loggedInUserType !== null) {
              ElMessageBox.confirm(
                  'You have already logged in an account.\nYou have to quit before you login another one.',
                  'Warning',
                  {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                  }
              )
                  .then(() => {
                    axios({
                      method: 'GET',
                      url: 'http://localhost:8080/education/login/exit?userId=' + loggedInUserId +
                          '&userType=' + loggedInUserType
                    }).then(resp => {
                      console.log(resp)
                      sessionStorage.clear()
                      localStorage.setItem('USER_CNT', '0')
                      ElMessage({
                        type: 'success',
                        message: 'Quit',
                      })
                    })
                  })
                  .catch(() => {
                    ElMessage({
                      type: 'info',
                      message: 'Canceled',
                    })
                  })
            }
            else if (accountDuplicateLogin || deviceDuplicateLogin) {
              if (accountDuplicateLogin) {
                alert("This account has already been logged in!")
              }
              else if (deviceDuplicateLogin) {
                alert("This device has already logged in an account!")
              }
            }
            else  {
              if (this.loginWay === 'Verification Code' && this.content !== this.vertiCodeFromEnd) {
                alert("Your verification code is wrong!")
              }
              else {
                this.loginWithPassword()
              }
            }
          })
    },

    loginWithPassword() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/login/user?userId='
            + this.userId + '&content=' + this.content + '&userType=' + this.userType + '&loginWay=' + this.loginWay
      }).then(res => {
        if (res.data.code === 200) {
          sessionStorage.setItem('USER_ID', res.data.data.user.id)
          sessionStorage.setItem('TYPE', this.userType)
          sessionStorage.setItem('AVATAR', res.data.data.user.picture_url)
          localStorage.setItem('USER_CNT', '1')

          //路由跳转
          if (this.userType === 'Teacher') {
            router.push('/userPage/TeacherMain')
          } else if (this.userType === 'Manager') {
            router.push('/userPage/AdminMain')
          } else {
            router.push('/userPage/StudentMain')
          }
        }
        else if (res.data.code === 2001) {
          alert(res.data.message)
        }
      })
      // sessionStorage.removeItem('SESSION_KEY')
      // sessionStorage.getItem('SESSION_KEY')
    },

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
  height: 370px;
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