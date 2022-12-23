<template>
  <div id="nav_u">
    <img src="../../img/logo.png" alt="" style="height:40px;float:left;margin:20px 0 20px 20px;" @click="toWelcome()">
    <div class="nav">
        <ul>
       <li>
        <div @click="toHome()">Home</div>
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
        </ul>
    </div>
    <div class="nav_r">
        <ul>
            <li>
                <div>
                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </div>
            </li>
            <li><div id="great">Hi~12012711</div></li>
        </ul>
    </div>
    <div class="search_content">
        <input type="text" class="searchTerm" placeholder="What are you looking for?">
        <button type="submit" class="searchButton">
            <i class="fa fa-search"></i>
        </button>
    </div>
    
  </div>
</template>

<script>
export default {
    methods: {
        toHome() {
            this.$router.push({
            path: '/StudentMain',
            })
        },
        toWelcome() {
            this.$router.push({
            path: '/Welcome',
            })
        }
    }
}
</script>

<style scoped>
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
img:hover{
    cursor:pointer;
}
</style>