<template>
  <div id="userPage">
    <UserHeader v-if="!admin"></UserHeader>
    <AdminHeader v-if="admin"></AdminHeader>
  </div>
</template>

<script>
import UserHeader from '../../components/UserHeader.vue';
import AdminHeader from '../../components/AdminHeader.vue'
import router from "@/router";

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
      router.push('/userPage/TeacherMain')
    } else if (sessionStorage.getItem('type') === 'Admin') {
      this.admin = true
      router.push('/userPage/AdminMain')
    } else {
      router.push('/userPage/StudentMain')
    }
  },

}

</script>

<style scoped>
#userPage {
  position: absolute;
  width: 100%;
  background-color: rgb(243, 244, 246);
}
</style>