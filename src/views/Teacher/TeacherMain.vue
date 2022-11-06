<template>
  <div>
    <el-container>
      <el-header>
        <TeacherHeader></TeacherHeader>
      </el-header>

      <el-container>
        <el-main>
          <p>Teacher Main</p>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TeacherHeader from "@/components/TeacherHeader";
export default {
  name: "TeacherMain",
  components: {TeacherHeader}
}
</script>

<style scoped>

</style>