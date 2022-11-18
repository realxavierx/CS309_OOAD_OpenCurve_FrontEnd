<template>
 <div>
  <div id="header">
    <img src="../../img/logo.png" alt="" style="height:40px;float:left;margin:20px 0 20px 20px;">
    <div class="nav">
      <ul>
       <li>
        <div>Home</div>
       </li>
       <li class="dropdown">
        <div>About</div>
         <ul>
          <li><div>About Version</div></li>
          <li><div>About Version</div></li>
          <li><div>Contact Us</div></li>
          <li><div>Contact Us</div></li>
         </ul>
       </li>
       <li class="dropdown">
        <div>Contact</div>
         <ul>
          <li><div>About Version</div></li>
          <li><div>About Version</div></li>
          <li><div>Contact Us</div></li>
          <li><div>Contact Us</div></li>
         </ul>
        </li>
        <li>
         <div @click="signShow()">Login丨Register</div>
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
        signShow() {
            this.$router.push({
                path: '/welcome/sign/login',
            })
        },
        toUserCenter() {
            if (true) {
                this.$router.push({
                    path: '/userpage',
                    // query: {
                    //     uid: sessionStorage.getItem('uid')
                    // }
                })
            } else if (type == 'teacher') {
                this.$router.push({
                    path: '/userpage/teacher',
                    query: {
                        id:12012711
                    }
                })
            } else {
                this.$router.push({
                    path: '/userpage/manager',
                    query: {
                        id:12012711
                    }
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>

#header {
    position:absolute;
    top:0;
    width: 100%;
    height:80px;
    line-height: 80px;
    color: #fff;
    font-weight: 600;
    z-index: 2;
}
@import '../../lib/nav.css';

</style>