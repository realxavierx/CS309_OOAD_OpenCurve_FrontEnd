<template>
  <div id="studentpage">
    <div class="activity">
      <div @click="toInfo()" tabindex="1">教师信息</div>
      <div @click="toSetting()" tabindex="2">账号设置</div>
      <div @click="toVip()" tabindex="3">会员中心</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  components: {

  },
  methods: {
    toInfo() {
      this.$router.push({
        path: '/userPage/TeacherSelfCenter/information',
      })
    },
    toVip() {
      this.$router.push({
        path: '/userPage/TeacherSelfCenter/vip',
      })
    },
    toSetting() {
      this.$router.push({
        path: '/userPage/TeacherSelfCenter/setting',
      })
    }
  }


}
</script>

<style scoped>
@import '../../lib/userpage_video_nav.css'
</style>