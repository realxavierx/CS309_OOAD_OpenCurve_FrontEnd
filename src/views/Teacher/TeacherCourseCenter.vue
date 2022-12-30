<template>
  <div class="background">
    <h1 align="center">Teacher Course Center</h1>
    <div class="course-center">

      <div class="Courses">
        <div v-for="course in courses" :key="course.id" style="margin: 20px">
          <el-descriptions title="Course Information" border>
            <template #extra>
              <el-button type="primary" @click="jumpToCourseDetail(course.id)">课程详情</el-button>
            </template>
            <el-descriptions-item label="ID">{{ course.id }}</el-descriptions-item>
            <el-descriptions-item label="Name">{{ course.name }}</el-descriptions-item>
            <el-descriptions-item label="Department">{{ course.department }}</el-descriptions-item>
            <el-descriptions-item label="Type">{{ course.course_type }}</el-descriptions-item>
            <el-descriptions-item label="Credit">{{ course.credit }}</el-descriptions-item>
            <el-descriptions-item label="Status"> {{ course.status }}</el-descriptions-item>
            <el-descriptions-item label="Fee"> {{ course.fee }}</el-descriptions-item>
            <el-descriptions-item label="Description">{{ course.info }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>

      <el-divider style="margin:40px">
        <el-icon>
          <StarFilled/>
        </el-icon>
      </el-divider>

      <div>
        <el-button type="primary" @click="form_dialog_visible = true">Create new Course</el-button>

        <el-dialog v-model="form_dialog_visible" title="添加课程" @close="cancelAddCourse">
          <el-form :model="form" ref="formRef">
            <el-form-item label="Course ID">
              <el-input v-model="form.courseID"/>
            </el-form-item>

            <el-form-item label="Course Name">
              <el-input v-model="form.courseName"/>
            </el-form-item>

            <el-form-item label="Course Department">
              <el-input v-model="form.courseDepartment"/>
            </el-form-item>

            <el-form-item label="Course Type">
              <el-input v-model="form.courseType"/>
            </el-form-item>

            <el-form-item label="Course Credit">
              <el-input v-model="form.courseCredit"/>
            </el-form-item>

            <el-form-item label="Course Status">
              <el-input v-model="form.courseStatus"/>
            </el-form-item>

            <el-form-item label="Course Fee">
              <el-input v-model="form.courseFee"/>
            </el-form-item>

            <el-form-item label="Description">
              <el-input v-model="form.courseDescription"/>
            </el-form-item>
          </el-form>

          <template #footer>
                  <span class="dialog_footer">
                    <el-button type="primary" @click="confirmAddCourse">Submit</el-button>
                    <el-button @click="cancelAddCourse">Cancel</el-button>
                  </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import TeacherHeader from "@/components/TeacherHeader";
import router from "@/router/index"
import {reactive, ref} from "vue";
import axios from "axios";

export default {
  name: "TeacherCourseCenter",

  data() {
    let formRef = reactive(ref(null))
    let form = reactive({
      courseID: '',
      courseName: '',
      courseType: '',
      courseCredit: '',
      courseDepartment: '',
      courseStatus: '',
      courseFee: '',
      courseDescription: ''
    })


    return {
      formRef,
      form,
      form_dialog_visible: false,
      user_id: '',
      courses: []
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
    },

    confirmAddCourse() {
      console.log(this.form.courseDepartment)
      axios({
        method: 'POST',
        url: 'http://localhost:8080/education/course/addCourse',
        data: {
          course_id: this.form.courseID,
          course_name: this.form.courseName,
          course_teacher: this.user_id,
          course_department: this.form.courseDepartment,
          course_credit: this.form.courseCredit,
          course_type: this.form.courseType,
          course_status: this.form.courseStatus,
          course_fee: this.form.courseFee,
          course_info: this.form.courseDescription
        },
        transformRequest: [function (data) {
          let str = '';
          for (let key in data) {
            str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
          }
          return str;
        }]
      })
          .then(response => {
            console.log(response.data)
            this.getTeacherCourses()
            this.cancelAddCourse()
          })
    },

    cancelAddCourse() {
      this.form_dialog_visible = false
      this.form.courseID = ''
      this.form.courseName = ''
      this.form.courseDepartment = ''
      this.form.courseType = ''
      this.form.courseCredit = ''
      this.form.courseStatus = ''
      this.form.courseFee = ''
      this.form.courseDescription = ''
      this.$refs.formRef.resetFields()
    },

    getTeacherCourses() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/course/getCoursesOfTeacher?teacher_id=' + this.user_id,
      }).then(resp => {
        console.log(resp.data.message)
        let response = resp.data.data
        console.log(response)
        this.courses = response.courses
      })
    },
  },

  mounted() {
    this.user_id = localStorage.getItem('USER_ID')
    this.getTeacherCourses()
  }
}
</script>

<style scoped>
.background {
  background-color: rgb(243, 244, 246);
}

.course-center {
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
}
</style>