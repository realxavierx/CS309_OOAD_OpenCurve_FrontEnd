<template>
  <div id="login_bg" class="animate__animated animate__bounceInDown">
    <div id="form">
      <h1>Register</h1>
      <br>
      <div>
        <input type="text" v-model="Email" placeholder="Email address"><br>
        <input type="password" v-model="password" placeholder="Password"><br>
        <input type="password" v-model="passwordAgain" placeholder="Confirm Password"><br>
        <div>
          You are:
          <input type="radio" v-model="type" value="Student">Student
          <input type="radio" v-model="type" value="Teacher">Teacher
        </div>
        <input type="text" v-model="vertiCode" placeholder="Verification Code">
        <button @click="getVertiCode()">获取验证码</button>
        <br>
        <el-button style="margin-top: 15px" type="primary" @click="register">注册</el-button>
        <br>
        <el-button type="danger" style="margin-top: 30px" @click="this.$router.push({path: '/welcome'})">暂不注册</el-button>
      </div>
    </div>

  </div>



</template>

<script>
import axios from "axios";

export default {
  // props:["off"],
  data() {
    return {
      Email: '',
      password: '',
      passwordAgain: '',
      type: '',
      vertiCode: '',
      vertiCodeFromEnd:''
    }
  },
  methods: {
    getVertiCode() {
      console.log("sending register information --- wait for response")

      axios({
      method: 'POST',
      url: 'http://10.24.233.83:8080/education/register/getVertiCode',
      data: {
        Email: this.Email,
        type: this.type
      },
      transformRequest: [function (data) {
        let str='';
        for (let key in data) {
          str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
        }
        return str;
      }]
      }).then(res => {
        console.log(res)
        if (res.status === 200) {
          console.log(res)
          this.vertiCodeFromEnd = res.data.data.vertiCode
        }
      })
    },

    register() {
      axios({
      method: 'POST',
      url: 'http://10.24.233.83:8080/education/register/doRegister',
      data: {
        Email: this.Email,
        password: this.password,
        type:this.type
      },

      transformRequest: [function (data) {
        let str='';
        for (let key in data) {
          str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
        }
        return str;
      }]
    }).then(res => {
      if (res.status === 200 && this.vertiCode === this.vertiCodeFromEnd) {
          console.log('注册成功')
          this.$router.push({
            path: '/welcome/login',
          })
        }
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