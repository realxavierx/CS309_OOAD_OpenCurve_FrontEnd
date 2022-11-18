<template>
    <div id="input-box" class="animate__animated animate__lightSpeedInRight">
        <div class="input-text">
            <input type="text" v-model="Email" id="inputid" placeholder="Email">
        </div>
        <div class="input-text">
            <input type="password" v-model="password" id="inputpassword" placeholder="password">
        </div>
        <div>
        You are:
            <input type="radio" v-model="type" name='jj' value="Student">Student
            <input type="radio" v-model="type" name="jj" value="Teacher">Teacher
            
        </div>
        <button class="submitbnt" @click="login()">LOGIN</button>
        <div class="sign-up">
            还没账户？
            <router-link to="/welcome/sign/register">立即注册</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            Email: '',
            password: '',
            type: '',
        }
    },
    methods: {
        login() {
            this.axios({
            method: 'POST',
            url: 'http://10.24.233.83:8080/education/register/getVertiCode',
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
                if (res.status == 200) {
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
</style>