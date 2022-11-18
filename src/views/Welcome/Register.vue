<template>
  <div id="register" class="animate__animated animate__lightSpeedInRight">
    <div>
        <div>
            <input type="text" v-model="Email" placeholder="Email"><br>
            <input type="password" v-model="password" placeholder="password"><br>
            <input type="password" v-model="passwordagain" placeholder="confirm password"><br>
            <div>
              You are:
              <input type="radio" v-model="type" name='jj' value="Student">Student
              <input type="radio" v-model="type" name="jj" value="Teacher">Teacher
            </div>
            <input type="text" v-model="vertiCode" placeholder="VertiCode">
            <button @click="getVertiCode()">获取验证码</button>
            <button @click="register()">注册</button><br>
            <router-link to="/welcome">cancel</router-link>
          </div>
    </div>
  </div>
</template>

<script>
export default {
  props:["off"],
  data() {
    return {
      Email: '',
      password: '',
      passwordagain: '',
      type: '',
      vertiCode: '',
      vertiCodeFromEnd:''
    }
  },
  methods: {
    getVertiCode() {
      this.axios({
      method: 'POST',
      url: 'http://10.24.233.83:8080/education/register/getVertiCode',
      data: {
        Email: this.Email,
        type:this.type
      },
      transformRequest: [function (data) {
        var str='';
        for (var key in data) {
          str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
        }
        return str;
      }]
      }).then(res => {
        if (res.status == 200) {
          console.log(res)
          this.vertiCodeFromEnd = res.data.data.vertiCode
        }
      })
    },
    register() {
      this.axios({
      method: 'POST',
      url: 'http://10.24.233.83:8080/education/register/doRegister',
      data: {
        Email: this.Email,
        password: this.password,
        type:this.type
      },

      transformRequest: [function (data) {
        var str='';
        for (var key in data) {
          str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
        }
        return str;
      }]
    }).then(res => {
      if (res.status == 200 && this.vertiCode == this.vertiCodeFromEnd) {
          console.log('注册成功')
          this.off()   
        }
      })
    }
  }
}
</script>

<style scoped>
</style>