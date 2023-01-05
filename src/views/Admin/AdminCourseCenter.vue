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
        <div v-for="idx in courseApplications.length" :key="idx" style="margin: 20px">
          <el-descriptions title="Application" border>
            <template #extra>
              <el-button type="primary">Approve</el-button>
              <el-button type="danger" @click="rejectApplication()">Reject</el-button>
            </template>
            <el-descriptions-item label="ID">{{ courseApplications[idx].id }}</el-descriptions-item>
            <el-descriptions-item label="Name">{{ courseApplications[idx].name }}</el-descriptions-item>
            <el-descriptions-item label="Teacher">{{ teachers[idx] }}</el-descriptions-item>
            <el-descriptions-item label="Department">{{ courseApplications[idx].department }}</el-descriptions-item>
            <el-descriptions-item label="Type">{{ courseApplications[idx].course_type }}</el-descriptions-item>
            <el-descriptions-item label="Credit">{{ courseApplications[idx].credit }}</el-descriptions-item>
            <el-descriptions-item label="Status"> {{ courseApplications[idx].status }}</el-descriptions-item>
            <el-descriptions-item label="Fee"> {{ courseApplications[idx].fee }}</el-descriptions-item>
            <el-descriptions-item label="Description">{{ courseApplications[idx].info }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>

      <el-dialog
          v-model="dialogVisible"
          title="Tips"
          width="30%"
          :before-close="handleClose"
      >
        <span>This is a message</span>
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </span>
        </template>
      </el-dialog>

      <div v-if="selection === 'Existing Courses'" class="ExistingCourses">
        <div v-for="idx in existingCourses.length" :key="idx" style="margin: 20px">
          <el-descriptions title="Course Information" border>
            <template #extra>
              <el-button type="primary">Edit</el-button>
              <el-button type="danger">Delete</el-button>
            </template>
            <el-descriptions-item label="ID">{{ existingCourses[idx].id }}</el-descriptions-item>
            <el-descriptions-item label="Name">{{ existingCourses[idx].name }}</el-descriptions-item>
            <el-descriptions-item label="Teacher">{{ teachers[idx] }}</el-descriptions-item>
            <el-descriptions-item label="Department">{{ existingCourses[idx].department }}</el-descriptions-item>
            <el-descriptions-item label="Type">{{ existingCourses[idx].course_type }}</el-descriptions-item>
            <el-descriptions-item label="Credit">{{ existingCourses[idx].credit }}</el-descriptions-item>
            <el-descriptions-item label="Status"> {{ existingCourses[idx].status }}</el-descriptions-item>
            <el-descriptions-item label="Fee"> {{ existingCourses[idx].fee }}</el-descriptions-item>
            <el-descriptions-item label="Description">{{ existingCourses[idx].info }}</el-descriptions-item>
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
      courseApplications: [],
      existingCourses: [],
      teachers: []
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
            this.teachers = resp.data.data.teachers
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
            this.teachers = resp.data.data.teachers
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