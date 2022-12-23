<template>
  <div id="userpage">
    <UserHeader v-if="!admin"></UserHeader>
    <AdminHeader v-if="admin"></AdminHeader>
  </div>
</template>

<script>
import UserHeader from '../../components/UserHeader.vue';
import AdminHeader from '../../components/AdminHeader.vue'
export default {
  components: {
    UserHeader,
    AdminHeader
  },
  data() {
    return {
      admin: false,
    }
  },
  mounted() {
    if (sessionStorage.getItem('type') === 'Teacher') {
      this.$router.push({
        path: '/userPage/TeacherMain',
      })
    } else if (sessionStorage.getItem('type') === 'Admin') {
      this.admin = true,
          this.$router.push({
            path: '/userPage/AdminMain',
          })
    } else {
      this.$router.push({
        path: '/userPage/StudentMain',
      })
    }
  },

}

</script>

<style scoped>
#userpage {
  position:absolute;
  width: 100%;
  background-color: rgb(243,244,246);
}
</style>