<template>
  <div class="background">
    <h1 align="center">Manager Course Center</h1>
    <div class="course-center-admin">
      <div>
        <el-row>
          <el-col :span="12">
            <el-button style="width: 100%; height: 50px"
                       @click="selection = 'Course Applications'">
              Course Application
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button style="width: 100%; height: 50px"
                       @click="selection = 'Existing Courses'">
              Existing Courses
            </el-button>
          </el-col>
        </el-row>
      </div>
      <div v-if="selection === 'Course Applications'" class="CourseApplications">
        <div v-for="course in courseApplications" :key="course.id" style="margin: 20px">
          <el-descriptions title="Application" border>
            <template #extra>
              <el-button type="primary">Approve</el-button>
              <el-button type="danger">Reject</el-button>
            </template>
            <el-descriptions-item label="ID">{{ course.id }}</el-descriptions-item>
            <el-descriptions-item label="Name">{{ course.name }}</el-descriptions-item>
            <el-descriptions-item label="Teacher">{{ course.courseTeacher }}</el-descriptions-item>
            <el-descriptions-item label="Location">{{ course.courseLocation }}</el-descriptions-item>
            <el-descriptions-item label="Description">{{ course.courseDescription }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
      <div v-if="selection === 'Existing Courses'" class="ExistingCourses">
        <div v-for="course in existingCourses" :key="course.id" style="margin: 20px">
          <el-descriptions title="Course Information" border>
            <template #extra>
              <el-button type="primary">Edit</el-button>
              <el-button type="danger">Delete</el-button>
            </template>
            <el-descriptions-item label="Name">{{ course.courseName }}</el-descriptions-item>
            <el-descriptions-item label="Teacher">{{ course.courseTeacher }}</el-descriptions-item>
            <el-descriptions-item label="Location">{{ course.courseLocation }}</el-descriptions-item>
            <el-descriptions-item label="Description">{{ course.courseDescription }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "AdminCourse",

  data() {
    return {
      selection: '',
      courseApplications: [
        {
          id: 1,
          courseName: 'OOAD',
          courseTeacher: 'YUEMING ZHU',
          courseLocation: 'Lecture Hall',
          courseDescription: 'It\'s OK to work on an assignment with a friend, and think together' +
              'about the program structure, share ideas and even the global logic. At ' +
              'the time of actually writing the code, you should write it alone.'
        },
        {
          id: 2,
          courseName: 'DSAA',
          courseTeacher: 'BO TANG',
          courseLocation: 'Research Building',
          courseDescription: 'It\'s OK to work on an assignment with a friend, and think together' +
              'about the program structure, share ideas and even the global logic. At ' +
              'the time of actually writing the code, you should write it alone.'
        }
      ],

      existingCourses: [
      ]
    }
  },

  methods: {
    getUnverifiedCourses() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/manage/getAllUnverifiedCourses'
          })
          .then((resp) => {
            console.log(resp.data.message)
            console.log(resp.data.data)
            this.courseApplications = resp.data.data.unverified_courses
          })
    },

    getExistingCourses() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/manage/getAllExistingCourses'
      })
          .then((resp) => {
            console.log(resp.data.message)
            console.log(resp.data.data)
            this.existingCourses = resp.data.data.existing_courses
          })
    }
  },

  mounted() {
    this.getUnverifiedCourses()
    this.getExistingCourses()
  }
}
</script>

<style scoped>
.background {
  background-color: rgb(243, 244, 246);
}

.course-center-admin {
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
}
</style>