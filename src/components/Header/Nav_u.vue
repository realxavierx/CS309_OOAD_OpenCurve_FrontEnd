<template>
  <div id="nav_u">
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
        </ul>
    </div>
    <div class="nav_r">
        <ul>
            <li><div id="avatar"></div></li>
            <li><div id="great">Hi~12012711</div></li>
            <li><div id="upload">Upload</div></li>
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
#avatar {
    width:40px;
    height: 40px;
    border-radius: 5px;
    background: url('../../img/2.jpg');
    background-size:cover;
    
}
#upload {
    height: 40px;
    width: 60px;
    line-height: 40px;
    border-radius: 5px;
    background-color: rgb(249, 93, 231);
}
#great {
    height: 40px;
    color:#fff;
    
    line-height: 40px;
}
</style>