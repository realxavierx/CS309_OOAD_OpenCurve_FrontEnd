<template>
  <div class="background">
    <h1 align="center">Student Course Center</h1>
    <div class="course-center-stu">
      <div class="selection">
        <el-row>
          <el-col :span="Number(4)">
            <!-- 课程范围 -->
            <el-radio-group v-model="courseRange" size="large">
              <el-radio-button label="My Courses" @click="getStudentCourses"/>
              <el-radio-button label="All Courses" @click="getAllCourses"/>
            </el-radio-group>
          </el-col>


          <el-col :span="Number(4)">
            <!-- 课程院系 -->
            <el-select
                v-model="courseDepartment"
                placeholder="Any Department"
                clearable
                @change="handleSelectDepartment"
            >
              <el-option
                  v-for="department in departments"
                  :key="department"
                  :label="department"
                  :value="department"
              />
            </el-select>
          </el-col>

          <el-col :span="Number(4)">
            <!-- 课程老师 自动补全-->
            <el-autocomplete
                v-model="courseTeacher"
                :fetch-suggestions="searchTeacher"
                clearable
                placeholder="Any Teacher"
                @change="teacherSelected = 'process'"
                @select="handleSelectTeacher"
            >
              <template #default="{ item }">
                <div class="value">{{ item.teacherName }} - {{ item.teacherDepartment }}</div>
                <!--                  <span class="link">{{ item.link }}</span>-->
              </template>
            </el-autocomplete>
          </el-col>

          <el-col :span="Number(4)">
            <!-- 课程类型 -->
            <el-select
                v-model="courseType"
                placeholder="Any Type"
                clearable
                @change="handleSelectType"
            >
              <el-option
                  v-for="type in types"
                  :key="type"
                  :value="type"
                  :label="type">
              </el-option>
            </el-select>
          </el-col>

          <el-col :span="Number(4)">
            <!-- 课程状态 -->
            <el-select
                v-model="courseStatus"
                placeholder="Any Status"
                clearable
                @change="handleSelectStatus"
            >
              <el-option
                  v-for="status in statuses"
                  :key="status"
                  :value="status"
                  :label="status">
              </el-option>
            </el-select>
          </el-col>

          <el-col :span="Number(4)">
            <!-- 课程费用 -->
            <el-select
                v-model="courseFee"
                placeholder="Any Fee"
                clearable
                @change="handleSelectFee"
            >
              <el-option
                  v-for="fee in fees"
                  :key="fee.name"
                  :value="fee.value"
                  :label="fee.name">
              </el-option>
            </el-select>
          </el-col>

        </el-row>

        <el-row style="margin-top: 30px; margin-left: 150px">
          <el-steps style="margin-right: 50px; width: 1000px" space="16%" align-center>
            <el-step status="success" title="Course Range"/>
            <el-step :status="departmentSelected" title="Department"/>
            <el-step :status="teacherSelected" title="Teacher"/>
            <el-step :status="typeSelected" title="Course Type"/>
            <el-step :status="statusSelected" title="Status"/>
            <el-step :status="feeSelected" title="Course Fee"/>
          </el-steps>

          <el-button type="primary" size="large" @click="selectCourses">Select</el-button>
        </el-row>
      </div>

      <el-divider style="margin:40px">
        <el-icon>
          <StarFilled/>
        </el-icon>
      </el-divider>

      <div v-for="course in courses" :key="course.courseID" style="margin: 20px">
        <el-descriptions title="Course Information" border>
          <template #extra>
            <el-button type="primary" @click="jumpToCourseDetail(course.courseID)">课程详情</el-button>
          </template>
          <el-descriptions-item label="ID">{{ course.courseID }}</el-descriptions-item>
          <el-descriptions-item label="Name">{{ course.courseName }}</el-descriptions-item>
          <el-descriptions-item label="Teacher">{{ course.courseTeacher }}</el-descriptions-item>
          <el-descriptions-item label="Type">{{ course.courseType }}</el-descriptions-item>
          <el-descriptions-item label="Credit">{{ course.courseCredit }}</el-descriptions-item>
          <el-descriptions-item label="Description">{{ course.courseDescription }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    
  </div>
</template>

<script>
import StudentHeader from "@/components/StudentHeader";
import axios from "axios";
import router from "@/router";

export default {
  name: "StudentCourseCenter",
  components: {StudentHeader},

  data() {

    return {
      courses: [],
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
      statuses: ['Upcoming', 'Ongoing', 'Ended'],
      courseStatus: '',
      statusSelected: 'process',
      fees: [
        {name: 'Free', value: 0},
        {name: 'Less than ￥10', value: 10},
        {name: 'Less than ￥20', value: 20},
        {name: 'Less than ￥50', value: 50},
        {name: 'Other', value: 51}
      ],
      courseFee: '',
      feeSelected: 'process'
    }
  },

  methods: {
    jumpToCourseDetail(id) {

      router.push({
        name: "StudentDetailCourse",
        params: {
          course_id: id
        }
      })
    },

    getAllCourses() {
      if (this.duplicate === true) {
        this.duplicate = false
        return
      }

      this.courses = []
      this.duplicate = true

      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/course/getAllCourses',
      }).then(response => {
        console.log(response.data.message)
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

    getStudentCourses() {
      if (this.duplicate === true) {
        this.duplicate = false
        return
      }

      this.courses = []
      this.duplicate = true

      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/course/getCoursesOfStudent?student_id=' + 'lsm@hhh.com',
      }).then(response => {
        console.log(response.data.message)
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

    getAllTeachers() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/teacher/getAllTeachers',
      }).then(response => {
        console.log(response.data.message)
        let response_data = response.data.data.teachers
        response_data.forEach((data) => {
          let teacher = {
            teacherID: data.id,
            teacherName: data.name,
            teacherDepartment: data.department,
            teacherStatus: data.status
          }
          this.teachers.push(teacher)
        })

      })
    },

    getAllDepartments() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/course/getAllDepartments',
      }).then(response => {
        console.log(response.data.message)
        let response_data = response.data.data.departments
        response_data.forEach((data) => {
          this.departments.push(data)
        })
      })
    },

    searchTeacher(input, callback) {
      let teachers = this.teachers
      let results = input ? teachers.filter(this.createFilter(input)) : teachers;
      callback(results)
    },

    createFilter(input) {
      return (teacher) => {
        return (teacher.teacherName.toLowerCase().indexOf(input.toLowerCase()) === 0);
      };
    },

    handleSelectTeacher(item) {
      this.courseTeacher = item.teacherName + ' - ' + item.teacherDepartment
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
      this.courses = []

      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/course/getCoursesWithConstraints?course_range='
            + this.courseRange.split(' ')[0] + '&student_id=' + 'lsm@hhh.com' + '&department='
            + this.courseDepartment + '&teacher=' + this.courseTeacher.split('-')[0] + '&course_type='
            + this.courseType + '&course_status=' + this.courseStatus + '&course_fee=' + this.courseFee,
      }).then(response => {
        console.log(response.data.message)
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
    }
  },

  mounted() {
    this.getStudentCourses()
    this.getAllTeachers()
    this.getAllDepartments()
    this.duplicate = false
  }
}
</script>

<style scoped>
.background{
  background-color: rgb(243,244,246);
}
.course-center-stu{
  width:80%;
  margin:0 auto;
  background-color: #fff;
}
</style>