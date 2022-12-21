<template>
  
</template>

<script>
export default {
  name: "StudentHeader"
}
</script>

<style scoped>
/*@import '../lib/nav.css';*/

/*.header {*/
/*  position:absolute;*/
/*  top:0;*/
/*  width: 100%;*/
/*  height:80px;*/
/*  line-height: 80px;*/
/*  color: #fff;*/
/*  font-weight: 600;*/
/*  z-index: 2;*/
/*}*/
a {
  color:#fff;
  text-decoration: none;
}

a:hover {
  color: #FFF;
  text-shadow: 0 0 5px #ffffff, 0 0 20px #000, 0 0 30px #000;
  background-color: rgba(59, 59, 59, 0.3);
}

#nav_u {
        height: 80px;
        width: 100%;
        background-color: rgb(37,40,48);
    }

    @import '../lib/nav.css';
.nav {
    float: left;
    line-height: 80px;
}
.nav li div{
    color:#fff;
}

    @import '../lib/search.css';

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
.route-box{

}
</style>