<template>
  <div class="background">
    <h1 align="center">Teacher Course Center</h1>
    <div class="course-center">
      <div>
        <el-button type="primary" style="margin-left: 44%; margin-top: 20px" @click="form_dialog_visible = true">Create new Course</el-button>

        <el-dialog v-model="form_dialog_visible" title="添加课程" @close="cancelAddCourse">
          <el-form :model="form" ref="formRef">
            <el-form-item label="Course ID">
              <el-input v-model="form.courseID"/>
            </el-form-item>

            <el-form-item label="Course Name">
              <el-input v-model="form.courseName"/>
            </el-form-item>

            <el-form-item label="Course Department">
              <el-select v-model="form.courseDepartment">
                <el-option v-for="department in departments" :key="department" :label="department" :value="department"/>
              </el-select>
            </el-form-item>

            <el-form-item label="Course Type">
              <el-select v-model="form.courseType">
                <el-option v-for="type in courseTypes" :key="type" :label="type" :value="type"/>
              </el-select>
            </el-form-item>

            <el-form-item label="Course Credit">
              <el-input-number v-model="form.courseCredit" :precision="1" :step="0.5" :min="0" :max="5" />
            </el-form-item>

            <el-form-item label="Course Status">
              <el-input disabled v-model="form.courseStatus"/>
            </el-form-item>

            <el-form-item label="Course Fee">
              <el-input-number v-model="form.courseFee" :precision="1" :step="1" :min="0"/>
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

        <el-drawer size="45%" v-model="student_progress_visible" direction="rtl">
          <template #title>
            <h2>学生管理</h2>
          </template>
          <template #default>
            <div>
              <el-card v-for="student in students" :key="student">
                <el-row>
                  <el-col :span="Number(12)">
                    Student:
                    <el-popover placement="right" :width="150" trigger="click">
                      <template #reference>
                        <el-tag style="width: 220px; height: 32px; margin-left: 10px" effect="dark">
                          {{ student.id }}
                        </el-tag>
                      </template>
                      <template #default>
                        <el-avatar
                            :size="50"
                            :src="student.picture_url"
                        />
                        <h3 style="margin: 5px">{{ student.name }}</h3>
                        <el-row>
                          <el-col :span="Number(12)">
                            <h4 style="margin: 5px">{{ student.department }}</h4>
                          </el-col>
                          <el-col :span="Number(12)">
                            <h4 style="margin: 5px">{{ student.grade }}</h4>
                          </el-col>
                        </el-row>
                      </template>
                    </el-popover>
                  </el-col>

                  <el-col :span="Number(3)"></el-col>

                  <el-col :span="Number(5)">
                    <el-popover placement="top" :width="170" trigger="click">
                      <template #reference>
                        <el-button type="success" @click="exportStudentScore(student)">导出学生成绩</el-button>
                      </template>
                      <template #default>
                        <p>您确定要导出学生成绩吗?</p>
                        <vue3-json-excel
                            :json-data="excelData"
                            :fields="excelFields"
                            :name="excelName"
                        >
                          <el-button style="margin-left: 50px" type="primary">确认</el-button>
                        </vue3-json-excel>
                      </template>
                    </el-popover>
                  </el-col>

                  <el-col :span="Number(4)">
                    <el-popover placement="top" :width="150" trigger="click">
                      <template #reference>
                        <el-button type="danger">移除学生</el-button>
                      </template>
                      <template #default>
                        <p>您确定要移除该学生吗?</p>
                        <el-button style="margin-left: 45px" type="primary" @click="removeStudent(student)">确认</el-button>
                      </template>
                    </el-popover>
                  </el-col>
                </el-row>
              </el-card>
            </div>
          </template>
        </el-drawer>
      </div>

      <el-divider>
        <el-icon>
          <StarFilled/>
        </el-icon>
      </el-divider>

      <div class="Courses">
        <div v-for="course in courses" :key="course.id" style="margin: 20px">
          <el-descriptions title="Course Information" border>
            <template #extra>
              <el-button type="primary" @click="getCourseStudents(course)">学生管理</el-button>
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
          <el-divider>
            <el-icon>
              <StarFilled/>
            </el-icon>
          </el-divider>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import router from "@/router/index"
import {reactive, ref} from "vue";
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  name: "TeacherCourseCenter",

  data() {
    let formRef = reactive(ref(null))
    let form = reactive({
      courseID: '',
      courseName: '',
      courseType: '',
      courseCredit: 0,
      courseDepartment: '',
      courseStatus: 'Unverified',
      courseFee: 0,
      courseDescription: ''
    })


    return {
      formRef,
      form,
      form_dialog_visible: false,
      student_progress_visible: false,
      user_id: '',
      courses: [],
      departments: [],
      students: [],
      courseTypes: [
          'Optional',
          'Compulsory'
      ],
      currentCourse: '',
      excelFields: {
        'Session': 'session',
        'Video_Score': 'video_score',
        'Test_Score': 'test_score',
      },
      excelData: [],
      excelName: '',
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
            ElMessage({
              type: 'success',
              message: '添加课程成功！',
            })
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
      this.form.courseCredit = 0
      this.form.courseStatus = 'Unverified'
      this.form.courseFee = 0
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
        this.courses = response.courses
      })
    },

    getAllDepartments() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/course/getAllDepartments',
      }).then(response => {
        console.log(response.data.message)
        this.departments = response.data.data.departments
      })
    },

    getCourseStudents(course) {
      this.currentCourse = course
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/course/getStudentsOfCourse?course_id=' + course.id,
      }).then(resp => {
        console.log(resp.data.message)
        this.students = resp.data.data.students
        console.log(this.students)
        this.student_progress_visible = true
      })
    },

    exportStudentScore(student) {
      this.excelData = []
      this.excelName = student.name + '_score.xls'
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/video/getStudentCourseScore?course_id='
            + this.currentCourse.id + '&student_id=' + student.id,
      }).then(resp => {
        console.log(resp.data.message)
        if (resp.data.code === 200) {
          for (let score of resp.data.data.scores) {
            this.excelData.push({
              session: score.sess_id,
              video_score: score.video_score,
              test_score: score.test_score
            })
          }
        }
        else {
          alert(resp.data.message)
        }
      })
    },

    removeStudent(student) {
      axios({
        method: 'POST',
        url: 'http://localhost:8080/education/course/removeStudentFromCourse',
        data: {
          course_id: this.currentCourse.id,
          student_id: student.id
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
            console.log(response.data.message)
            ElMessage({
              type: 'success',
              message: '移除学生成功！',
            })
            this.students = this.students.filter((item) => item !== student)
          })
    }
  },

  mounted() {
    this.user_id = sessionStorage.getItem('USER_ID')
    this.getTeacherCourses()
    this.getAllDepartments()
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