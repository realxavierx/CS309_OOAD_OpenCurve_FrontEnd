<template>
  <div id="userPage">
    <UserHeader></UserHeader>
  </div>
</template>

<script>
import UserHeader from '../../components/Header/UserHeader.vue';
import router from "@/router";

export default {
  components: {
    UserHeader,
  },
  data() {
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