<template>
  <div>
    <p>Home</p>
    <el-button>
      <router-link to="/userPage/StudentMain" @click="setStudent()">Student</router-link>
    </el-button>
    <el-button>
      <router-link to="/userPage/TeacherMain" @click="setTeacher()">Teacher</router-link>
    </el-button>
    <el-button>
      <router-link to="/userPage/AdminMain" @click="setAdmin()">Administrator</router-link>
    </el-button>
    <el-button>
      <router-link to="/welcome">Welcome</router-link>
    </el-button>

  </div>

</template>

<script>

export default {
  name: "HomeView",
  methods: {
    setStudent() {
      sessionStorage.setItem('type','Student');
    },
    setTeacher() {
      sessionStorage.setItem('type','Teacher');
    },
    setAdmin() {
      sessionStorage.setItem('type','Admin');
    }
  },

}
</script>

<style scoped>

</style>