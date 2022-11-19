<template>
  <div id="welcome">

    <Nav></Nav>

    <div id="page">
      <Backgroundjs></Backgroundjs>
      <img src="../../img/BG.png" style="position: fixed;top:0;left:0;height:100%;width: 100%;">
      <div id="title" class="animate__animated animate__rollIn">
        <h1>OPEN-CURVE<br/>COURSES</h1>
        <a target="_blank" href="https://github.com/2002-Goatsucker/OpenCurve/tree/master">github/OpenCurve</a><br>

      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Nav from '../../components/Header/Nav.vue'
import Footer from '../../components/Footer/Footer.vue'
import Backgroundjs from "@/views/Welcome/Backgroundjs";

export default {

  data() {
    return {
      loginVisible: false
    }
  },
  components: {
    Backgroundjs,
    Nav,
    Footer
  },
  methods: {
    showLogin() {
      this.loginVisible = !this.loginVisible;
    },

  },

}
</script>

<style scoped>

#page {
  position: absolute;
  width: 100%;
  height: 100%;
  /*touch-action: pan;*/
  color: #ffffff;
  font-family: 'Montserrat', sans-serif;
  text-align: center;
  text-shadow: 0 0 5px #ffffff, 0 0 20px #000, 0 0 30px #000;
}

#page #title {
  width: 500px;
  height: 240px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -120px;
  margin-left: -250px;
}

#page h1 {
  margin: auto 0;
  line-height: 80px;
  font-size: 60px;
}

#page a {
  margin: auto 0;
  margin-top: 10px;
  display: inline-block;
  text-decoration: none;
  color: #fff;
}

#page canvas {
  display: block;
  position: fixed;
  z-index: -1;
  top: 0;
}


</style>