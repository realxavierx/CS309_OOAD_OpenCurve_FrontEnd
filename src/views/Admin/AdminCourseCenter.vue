<template>
  <div class="background">
    <h1 align="center">Manager Course Center</h1>
    <div class="course-center-admin">
      <div>
        <el-row>
          <el-col :span="12">
            <el-button style="width: 100%; height: 50px"
                       @click="selection = 'Course Applications'; getUnverifiedCourses">
              Course Application
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button style="width: 100%; height: 50px"
                       @click="selection = 'Existing Courses'; getExistingCourses">
              Existing Courses
            </el-button>
          </el-col>
        </el-row>
      </div>

      <div v-if="selection === 'Course Applications'" class="CourseApplications">
        <div v-for="(value, key) in courseApplications" :key="key" style="margin: 20px">
          <el-descriptions title="Application" border>
            <template #extra>
              <el-button type="primary" @click="passApplication(courseApplications[key].id)">Approve</el-button>
              <el-button type="danger"
                         @click="curApplication = courseApplications[key].id; dialogVisible = true">
                Reject
              </el-button>
            </template>
            <el-descriptions-item label="ID">{{ value.id }}</el-descriptions-item>
            <el-descriptions-item label="Name">{{ value.name }}</el-descriptions-item>
            <el-descriptions-item label="Teacher">{{ teachers[key] }}</el-descriptions-item>
            <el-descriptions-item label="Department">{{ value.department }}</el-descriptions-item>
            <el-descriptions-item label="Type">{{ value.course_type }}</el-descriptions-item>
            <el-descriptions-item label="Credit">{{ value.credit }}</el-descriptions-item>
            <el-descriptions-item label="Status"> {{ value.status }}</el-descriptions-item>
            <el-descriptions-item label="Fee"> {{ value.fee }}</el-descriptions-item>
            <el-descriptions-item label="Description">{{ value.info }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>

      <el-dialog
          v-model="dialogVisible"
          title="Rejection"
          width="30%"
          :before-close="handleClose"
      >
        <span>Please write the reason for rejection:</span>
        <el-input
            v-model="reason"
            :rows="2"
            type="textarea"
        />
        <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">Cancel</el-button>
        <el-button type="primary" @click="rejectApplication">
          Confirm
        </el-button>
      </span>
        </template>
      </el-dialog>

      <div v-if="selection === 'Existing Courses'" class="ExistingCourses">
        <div v-for="(value, key) in existingCourses" :key="key" style="margin: 20px">
          <el-descriptions title="Course Information" border>
            <template #extra>
              <el-button type="primary">Edit</el-button>
              <el-button type="danger">Delete</el-button>
            </template>
            <el-descriptions-item label="ID">{{ value.id }}</el-descriptions-item>
            <el-descriptions-item label="Name">{{ value.name }}</el-descriptions-item>
            <el-descriptions-item label="Teacher">{{ teachers[key] }}</el-descriptions-item>
            <el-descriptions-item label="Department">{{ value.department }}</el-descriptions-item>
            <el-descriptions-item label="Type">{{ value.course_type }}</el-descriptions-item>
            <el-descriptions-item label="Credit">{{ value.credit }}</el-descriptions-item>
            <el-descriptions-item label="Status"> {{ value.status }}</el-descriptions-item>
            <el-descriptions-item label="Fee"> {{ value.fee }}</el-descriptions-item>
            <el-descriptions-item label="Description">{{ value.info }}</el-descriptions-item>
          </el-descriptions>

          <el-divider>
            <el-icon><star-filled /></el-icon>
          </el-divider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import {ElMessageBox} from "element-plus";

export default {
  name: "AdminCourse",

  data() {
    return {
      selection: '',
      courseApplications: [],
      existingCourses: [],
      teachers: [],
      dialogVisible: false,
      curApplication: '',
      reason: ''
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
    },

    passApplication(course_id) {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/manage/passApplication?course=' + course_id
      })
          .then((resp) => {
            console.log(resp.data.message)
            this.courseApplications = this.courseApplications.filter((c) => c.id !== course_id)
          })
    },

    handleClose() {
      ElMessageBox.confirm('Are you sure to close this dialog?')
          .then(() => {
            this.dialogVisible = false
            this.reason = ''
          })
          .catch(() => {
            // catch error
          })
    },

    rejectApplication() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/manage/passApplication?course='
            + this.curApplication + '&reason=' + this.reason
      })
          .then((resp) => {
            console.log(resp.data.message)
            this.courseApplications = this.courseApplications.filter((c) => c.id !== this.curApplication)
            this.reason = ''
            this.dialogVisible = false
          })
    },
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