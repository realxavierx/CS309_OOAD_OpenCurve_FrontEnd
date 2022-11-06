<template>
  <div>
    <el-container>
      <el-header>
        <StudentHeader></StudentHeader>
      </el-header>
      <el-container>
        <el-main>
          <p>Student Main</p>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import StudentHeader from "@/components/StudentHeader";
export default {
  name: "StudentMain",
  components: {StudentHeader},
}
</script>

<style scoped>

</style>