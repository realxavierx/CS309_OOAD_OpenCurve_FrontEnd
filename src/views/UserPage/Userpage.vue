<template>
  <div id="userpage">
    <Nav_u></Nav_u>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav_u from '../../components/Header/Nav_u.vue'

export default {
  components: {
    Nav_u
  },
  mounted() {
    if (sessionStorage.getItem('type') == 'Student') {
      this.$router.push({
        path: '/userpage/student/mycourse',
      })
    } else {
      this.$router.push({
        path: '/userpage/teacher',
      })
    }
  }
}

</script>

<style scoped>
#userpage {
    position:absolute;
    width: 100%;
    height:100%;
    background-color: #000;
}
#occupy {
  height: 80px;
}
</style>
