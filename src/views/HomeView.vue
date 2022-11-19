<template>
  <div>
    <p>Home</p>
    <el-button>
      <router-link to="/StudentMain">Student</router-link>
    </el-button>
    <el-button>
      <router-link to="/TeacherMain">Teacher</router-link>
    </el-button>
    <el-button>
      <router-link to="/AdminMain">Administrator</router-link>
    </el-button>
    <el-button>
      <router-link to="/welcome">Welcome</router-link>
    </el-button>
  </div>

</template>

<script>

export default {
  name: "HomeView",
}
</script>

<style scoped>
</style>