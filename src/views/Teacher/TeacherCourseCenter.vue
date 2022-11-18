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
            <div v-for="course in courses" :key="course.courseID" style="margin: 20px">
              <el-descriptions title="Course Information" border>
                <template #extra>
                  <el-button type="primary" @click="jumpToCourseDetail(course.courseID)">课程详情</el-button>
                </template>
                <el-descriptions-item label="ID">{{ course.courseID }}</el-descriptions-item>
                <el-descriptions-item label="Name">{{ course.courseName }}</el-descriptions-item>
                <el-descriptions-item label="Department">{{ course.courseDepartment }}</el-descriptions-item>
                <el-descriptions-item label="Type">{{ course.courseType }}</el-descriptions-item>
                <el-descriptions-item label="Credit">{{ course.courseCredit }}</el-descriptions-item>
                <el-descriptions-item label="Status"> {{ course.courseStatus }}</el-descriptions-item>
                <el-descriptions-item label="Fees"> {{ course.courseFees }}</el-descriptions-item>
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

                <el-form-item label="Course Fees">
                  <el-input v-model="form.courseFees"/>
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
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TeacherHeader from "@/components/TeacherHeader";
import router from "@/router/index"
import {reactive, ref} from "vue";
import axios from "axios";

export default {
  name: "TeacherCourseCenter",
  components: {TeacherHeader},

  data() {
    let formRef = reactive(ref(null))
    let form = reactive({
      courseID: '',
      courseName: '',
      courseType: '',
      courseCredit: '',
      courseDepartment: '',
      courseStatus: '',
      courseFees: '',
      courseDescription: ''
    })


    return {
      formRef,
      form,
      form_dialog_visible: false,
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
          course_teacher: '1',
          course_department: this.form.courseDepartment,
          course_credit: this.form.courseCredit,
          course_type: this.form.courseType,
          course_status: this.form.courseStatus,
          course_fees: this.form.courseFees,
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
      this.form.courseFees = ''
      this.form.courseDescription = ''
      this.$refs.formRef.resetFields()
    },

    getTeacherCourses() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/course/getCoursesOfTeacher?teacher_id=' + '1',
      }).then(response => {
        console.log(response.data.data.courses)
        let response_data = response.data.data.courses
        response_data.forEach((data) => {
          let course = {
            courseID: data.id,
            courseName: data.name,
            courseDepartment: data.department,
            courseType: data.course_type,
            courseCredit: data.credit,
            courseStatus: data.status,
            courseFees: data.fees,
            courseDescription: data.info
          }
          this.courses.push(course)
        })
      })
    },
  },

  created() {
    this.getTeacherCourses()
  }
}
</script>

<style scoped>

</style>