<template>
  <div id="studentpage">
    <div class="activity">
      <div @click="toMycourse()" tabindex="1">我的课程</div>
      <div @click="toHistory()" tabindex="2">历史记录</div>
      <div @click="toUp()" tabindex="3">我的上传</div>
      <div @click="toInfo()" tabindex="4">个人信息</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    components: {
        
  },
  methods: {
    toHistory(){
      this.$router.push({
        path: '/userpage/student/history',
      })
    },
    toMycourse(){
      this.$router.push({
        path: '/userpage/student/mycourse',
      })
    },
    toUp(){
      this.$router.push({
        path: '/userpage/student/upload',
      })
    },
    toInfo(){
      this.$router.push({
        path: '/userpage/student/information',
      })
    },
      
    }
}
</script>

<style scoped>
  @import '../../lib/userpage_video_nav.css'
</style>