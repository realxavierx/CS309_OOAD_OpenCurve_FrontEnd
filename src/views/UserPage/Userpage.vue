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
    if (sessionStorage.getItem('type') == 'Teacher') {
      this.$router.push({
        path: '/userpage/teacher',
      })
    } else {
      this.$router.push({
        path: '/userpage/student/information',
      })
    }
  }
}

</script>

<style scoped>
#userpage {
    position:absolute;
    width: 100%;
    background-color: rgb(243,244,246);
}
#occupy {
  height: 80px;
}
</style>
