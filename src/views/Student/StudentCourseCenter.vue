<template>
  <div class="background">
    <h1 align="center">Student Course Center</h1>
    <div class="course-center-stu">
      <div class="selection">
        <el-row>
          <el-col :span="12">
            <el-button style="width: 100%; height: 50px"
                       @click="getStudentCourses">
              My Courses
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button style="width: 100%; height: 50px"
                       @click="getAllCourses">
              All Courses
            </el-button>
          </el-col>
        </el-row>

<!--        <el-row>-->
<!--          <el-col :span="Number(4)">-->
<!--            &lt;!&ndash; 课程范围 &ndash;&gt;-->
<!--            <el-select-->
<!--                v-model="courseRange"-->
<!--                placeholder="CourseRange"-->
<!--                @change="handleSelectRange"-->
<!--            >-->
<!--              <el-option label="My Courses" value="My Courses"></el-option>-->
<!--              <el-option label="All Courses" value="All Courses"></el-option>-->
<!--            </el-select>-->
<!--          </el-col>-->


<!--          <el-col :span="Number(4)">-->
<!--            &lt;!&ndash; 课程院系 &ndash;&gt;-->
<!--            <el-select-->
<!--                v-model="courseDepartment"-->
<!--                placeholder="Any Department"-->
<!--                clearable-->
<!--                @change="handleSelectDepartment"-->
<!--            >-->
<!--              <el-option-->
<!--                  v-for="department in departments"-->
<!--                  :key="department"-->
<!--                  :label="department"-->
<!--                  :value="department"-->
<!--              />-->
<!--            </el-select>-->
<!--          </el-col>-->

<!--          <el-col :span="Number(4)">-->
<!--            &lt;!&ndash; 课程老师 自动补全&ndash;&gt;-->
<!--            <el-autocomplete-->
<!--                style="width: 100%;"-->
<!--                v-model="courseTeacher"-->
<!--                :fetch-suggestions="searchTeacher"-->
<!--                clearable-->
<!--                placeholder="Any Teacher"-->
<!--                @change="teacherSelected = 'process'"-->
<!--                @select="handleSelectTeacher"-->
<!--            >-->
<!--              <template #default="{ item }">-->
<!--                <div class="value">{{ item.name }} - {{ item.department }}</div>-->
<!--                &lt;!&ndash;                  <span class="link">{{ item.link }}</span>&ndash;&gt;-->
<!--              </template>-->
<!--            </el-autocomplete>-->
<!--          </el-col>-->

<!--          <el-col :span="Number(4)">-->
<!--            &lt;!&ndash; 课程类型 &ndash;&gt;-->
<!--            <el-select-->
<!--                v-model="courseType"-->
<!--                placeholder="Any Type"-->
<!--                clearable-->
<!--                @change="handleSelectType"-->
<!--            >-->
<!--              <el-option-->
<!--                  v-for="type in types"-->
<!--                  :key="type"-->
<!--                  :value="type"-->
<!--                  :label="type">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-col>-->

<!--          <el-col :span="Number(4)">-->
<!--            &lt;!&ndash; 课程状态 &ndash;&gt;-->
<!--            <el-select-->
<!--                v-model="courseStatus"-->
<!--                placeholder="Any Status"-->
<!--                clearable-->
<!--                @change="handleSelectStatus"-->
<!--            >-->
<!--              <el-option-->
<!--                  v-for="status in statuses"-->
<!--                  :key="status"-->
<!--                  :value="status"-->
<!--                  :label="status">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-col>-->

<!--          <el-col :span="Number(4)">-->
<!--            &lt;!&ndash; 课程费用 &ndash;&gt;-->
<!--            <el-select-->
<!--                v-model="courseFee"-->
<!--                placeholder="Any Fee"-->
<!--                clearable-->
<!--                @change="handleSelectFee"-->
<!--            >-->
<!--              <el-option-->
<!--                  v-for="fee in fee"-->
<!--                  :key="fee.name"-->
<!--                  :value="fee.value"-->
<!--                  :label="fee.name">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-col>-->
<!--        </el-row>-->

<!--        <el-row style="margin-top: 30px; margin-left: 150px">-->
<!--          <el-steps style="margin-right: 50px; width: 900px" space="16%" align-center>-->
<!--            <el-step status="success" title="Course Range"/>-->
<!--            <el-step :status="departmentSelected" title="Department"/>-->
<!--            <el-step :status="teacherSelected" title="Teacher"/>-->
<!--            <el-step :status="typeSelected" title="Course Type"/>-->
<!--            <el-step :status="statusSelected" title="Status"/>-->
<!--            <el-step :status="feeSelected" title="Course Fee"/>-->
<!--          </el-steps>-->

<!--          <el-button type="primary" size="large" @click="selectCourses">Select</el-button>-->
<!--        </el-row>-->
      </div>

      <el-divider style="margin: 40px auto">
        <el-icon>
          <StarFilled/>
        </el-icon>
      </el-divider>

      <div v-for="course in show_courses" :key="course.id" style="margin: 20px">
        <el-descriptions title="Course Information" border>
          <template #extra>
            <el-popover v-if="!checkEnrolled(course)" placement="top" :width="230" trigger="click">
              <p>The fee of this course is {{course.fee}}.</p>
              <p>Do you want to enroll this course?</p>
              <div style="text-align: center; margin: 0">
                <el-button size="small" type="primary">
                  <a :href="paymentUrl" target="_blank" style="text-decoration: none">
                    Confirm
                  </a>
                </el-button>
              </div>
              <template #reference>
                <el-button type="primary" @click="checkCourseFee(course)">报名课程</el-button>
              </template>
            </el-popover>
            <el-button v-if="checkEnrolled(course)" type="success" @click="jumpToCourseDetail(course)">进入课程</el-button>
          </template>
          <el-descriptions-item label="ID">{{ course.id }}</el-descriptions-item>
          <el-descriptions-item label="Name">{{ course.name }}</el-descriptions-item>
          <el-descriptions-item label="Type">{{ course.course_type }}</el-descriptions-item>
          <el-descriptions-item label="Credit">{{ course.credit }}</el-descriptions-item>
          <el-descriptions-item label="Credit">{{ course.fee }}</el-descriptions-item>
          <el-descriptions-item label="Description">{{ course.info }}</el-descriptions-item>
        </el-descriptions>
        <el-divider style="margin: 40px auto">
          <el-icon>
            <StarFilled/>
          </el-icon>
        </el-divider>
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
import router from "@/router";
export default {
  name: "StudentCourseCenter",

  data() {

    return {
      user_id: '',
      courses: [],
      selected_courses: [],
      show_courses: [],
      courseRange: 'My Courses',
      duplicate: false,
      departments: [],
      courseDepartment: '',
      departmentSelected: 'process',
      teachers: [],
      courseTeacher: '',
      teacherSelected: 'process',
      types: ['Optional', 'Compulsory'],
      courseType: '',
      typeSelected: 'process',
      statuses: ['Unverified', 'Rejected', 'Ongoing'],
      courseStatus: '',
      statusSelected: 'process',
      fee: [
        {name: 'Free', value: 0},
        {name: 'Less than ￥10', value: 10},
        {name: 'Less than ￥20', value: 20},
        {name: 'Less than ￥50', value: 50},
        {name: 'Other', value: 51}
      ],
      courseFee: '',
      feeSelected: 'process',
      checkFeeVisible: false,
      paymentUrl: ''
    }
  },

  methods: {
    jumpToCourseDetail(course) {

      router.push({
        name: "StudentDetailCourse",
        params: {
          course_id: course.id
        }
      })
    },

    getAllCourses() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/course/getAllCourses',
      }).then(response => {
        console.log(response.data.message)
        this.courses = response.data.data.courses
        this.show_courses = this.courses
      })
    },

    getStudentCourses() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/course/getCoursesOfStudent?student_id=' + this.user_id,
      }).then(response => {
        console.log(response.data.message)
        this.selected_courses = response.data.data.courses
        this.show_courses = this.selected_courses
      })
    },

    handleSelectRange() {
      if (this.courseRange === 'My Courses') {
        this.getStudentCourses()
      } else if (this.courseRange === 'All Courses') {
        this.getAllCourses()
      }
    },

    getAllTeachers() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/teacher/getAllTeachers',
      }).then(response => {
        console.log(response.data.message)
        this.teachers = response.data.data.teachers
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

    searchTeacher(input, callback) {
      let teachers = this.teachers
      let results = input ? teachers.filter(this.createFilter(input)) : teachers;
      callback(results)
    },

    createFilter(input) {
      return (teacher) => {
        return (teacher.name.toLowerCase().indexOf(input.toLowerCase()) === 0);
      };
    },

    handleSelectTeacher(item) {
      this.courseTeacher = item.name + ' - ' + item.department
      this.teacherSelected = 'success'
    },

    handleSelectDepartment() {
      if (this.courseDepartment === '') {
        this.departmentSelected = 'process'
      } else {
        this.departmentSelected = 'success'
      }
    },

    handleSelectType() {
      if (this.courseType === '') {
        this.typeSelected = 'process'
      } else {
        this.typeSelected = 'success'
      }
    },

    handleSelectStatus() {
      if (this.courseStatus === '') {
        this.statusSelected = 'process'
      } else {
        this.statusSelected = 'success'
      }
    },

    handleSelectFee() {
      if (this.courseFee === '') {
        this.feeSelected = 'process'
      } else {
        this.feeSelected = 'success'
      }
    },

    selectCourses() {
      // axios({
      //   method: 'GET',
      //   url: 'http://localhost:8080/education/course/getCoursesWithConstraints?course_range='
      //       + this.courseRange.split(' ')[0] + '&student_id=' + this.user_id + '&department='
      //       + this.courseDepartment + '&teacher=' + this.courseTeacher.split('-')[0] + '&course_type='
      //       + this.courseType + '&course_status=' + this.courseStatus + '&course_fee=' + this.courseFee,
      // }).then(response => {
      //   console.log(response.data.message)
      //   this.show_courses = response.data.data.courses
      // }

    },

    checkCourseFee(course) {
      if (course.fee === 0) {
        this.enrollCourse(course)
        this.checkFeeVisible = false
      }
      else {
        this.checkFeeVisible = true
        this.paymentUrl = "http://localhost:8080/education/pay/purchase?courseId=" + course.id
            + "&userId=" + this.user_id
      }
    },

    enrollCourse(course) {
      axios({
        method: 'POST',
        url: 'http://localhost:8080/education/course/enrollCourse',
        data: {
          course_id: course.id,
          student_id: this.user_id
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
            if (response.data.code === 200) {
              console.log(response.data.message)
              this.selected_courses.push(course)
              console.log(this.selected_courses)
            }
          })
    },

    checkEnrolled(course) {
      return this.selected_courses.some((item) => item.id === course.id && item.teacher_id === course.teacher_id)
    }
  },

  mounted() {
    this.user_id = sessionStorage.getItem('USER_ID')
    this.getStudentCourses()
    this.getAllTeachers()
    this.getAllDepartments()
  }
}
</script>

<style scoped>
.background {
  background-color: rgb(243, 244, 246);
}

.course-center-stu {
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
}
</style>