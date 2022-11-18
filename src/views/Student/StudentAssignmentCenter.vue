<template>
  <div>
    <el-container>
      <el-header>
        <StudentHeader></StudentHeader>
      </el-header>

      <el-container>
        <el-main>
          <el-table :data="assignments">
            <el-table-column label="Course" prop="course"></el-table-column>
            <el-table-column label="Title" prop="title"></el-table-column>
            <el-table-column label="Teacher" prop="teacher"></el-table-column>
            <el-table-column label="Due Date" prop="due_date"></el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import StudentHeader from "@/components/StudentHeader";
export default {
  name: "StudentAssignmentCenter",
  components: {StudentHeader},

  data () {

    return {

    }
  }
}
</script>

<style scoped>

</style>