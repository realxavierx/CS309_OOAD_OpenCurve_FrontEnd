<template>
  <div>
    <el-container>
      <el-header>
        <StudentHeader></StudentHeader>
      </el-header>

      <el-container>
        <el-main>
          <div v-for="course in courses" :key="course.courseID" style="margin: 20px">
            <el-descriptions title="Course Information" border>
              <el-descriptions-item label="ID">{{ course.courseID }}</el-descriptions-item>
              <el-descriptions-item label="Name">{{ course.courseName }}</el-descriptions-item>
              <el-descriptions-item label="Teacher">{{ course.courseTeacher }}</el-descriptions-item>
              <el-descriptions-item label="Type">{{ course.courseType }}</el-descriptions-item>
              <el-descriptions-item label="Credit">{{ course.courseCredit }}</el-descriptions-item>
              <el-descriptions-item label="Description">{{ course.courseDescription }}</el-descriptions-item>
            </el-descriptions>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import StudentHeader from "@/components/StudentHeader";
export default {
  name: "StudentCourseCenter",
  components: {StudentHeader},

  data() {

    return {
      courses: [
        {
          courseID: 'CS996',
          courseName: 'OOAD',
          courseTeacher: 'YUEMING ZHU',
          courseType: 'Optional',
          courseCredit: '1.5',
          courseDescription: 'It\'s OK to work on an assignment with a friend, and think together' +
              'about the program structure, share ideas and even the global logic. At ' +
              'the time of actually writing the code, you should write it alone.'
        },
        {
          courseID: 'CS102',
          courseName: 'DSAA',
          courseTeacher: 'BO TANG',
          courseType: 'Optional',
          courseCredit: '2',
          courseDescription: 'It\'s OK to work on an assignment with a friend, and think together' +
              'about the program structure, share ideas and even the global logic. At ' +
              'the time of actually writing the code, you should write it alone.'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>