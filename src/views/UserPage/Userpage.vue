<template>
  <div id="userPage">
    <UserHeader v-if="!admin"></UserHeader>
    <AdminHeader v-if="admin"></AdminHeader>
  </div>
</template>

<script>
import UserHeader from '../../components/Header/UserHeader.vue';
import AdminHeader from '../../components/Header/AdminHeader.vue'
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