<template>
  <div id="userPage">
    <UserHeader></UserHeader>
  </div>
</template>

<script>
import UserHeader from '../../components/Header/UserHeader.vue';

export default {
  components: {
    UserHeader,
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