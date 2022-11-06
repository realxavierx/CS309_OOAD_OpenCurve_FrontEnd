<template>
  <div>
    <el-container>
      <el-header>
        <TeacherHeader></TeacherHeader>
      </el-header>

      <el-container>
        <el-main>
          <div class="Courses">
            <p>课程列表</p>
            <div v-for="course in Courses" :key="course.id" style="margin: 20px">
              <el-descriptions title="Course Information" border>
                <template #extra>
                  <el-button type="primary" @click="jumpToCourseDetail(course.id)">课程详情</el-button>
                </template>
                <el-descriptions-item label="Name">{{ course.courseName }}</el-descriptions-item>
                <el-descriptions-item label="Teacher">{{ course.courseTeacher }}</el-descriptions-item>
                <el-descriptions-item label="Location">{{ course.courseLocation }}</el-descriptions-item>
                <el-descriptions-item label="Description">{{ course.courseDescription }}</el-descriptions-item>
              </el-descriptions>
            </div>
          </div>

          <el-divider style="margin:40px">
            <el-icon>
              <StarFilled/>
            </el-icon>
          </el-divider>

          <div>
            <el-button type="primary">Create new Course</el-button>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TeacherHeader from "@/components/TeacherHeader";
import router from "@/router/index"

export default {
  name: "TeacherCourseCenter",
  components: {TeacherHeader},

  data() {
    return {
      Courses: [
        {
          id: 'CS996',
          courseName: 'OOAD',
          courseTeacher: 'YUEMING ZHU',
          courseLocation: 'Lecture Hall',
          courseDescription: 'It\'s OK to work on an assignment with a friend, and think together' +
              'about the program structure, share ideas and even the global logic. At ' +
              'the time of actually writing the code, you should write it alone.'
        },
        {
          id: 'CS102',
          courseName: 'DSAA',
          courseTeacher: 'BO TANG',
          courseLocation: 'Research Building',
          courseDescription: 'It\'s OK to work on an assignment with a friend, and think together' +
              'about the program structure, share ideas and even the global logic. At ' +
              'the time of actually writing the code, you should write it alone.'
        }
      ]
    }
  },

  methods: {
    jumpToCourseDetail(id) {

      router.push({
        name: "TeacherDetailCourse",
        params: {
          course_id: id
        }
      })
    }
  }
}
</script>

<style scoped>

</style>