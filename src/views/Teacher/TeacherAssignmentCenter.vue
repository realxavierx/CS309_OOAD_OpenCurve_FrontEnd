<template>
  <div class="background">
    <h1 align="center">Assignment Center</h1>
    <div class="assignmentCenter_teacher">
      <el-container>
        <el-aside style="width: 200px">
          <el-button color="#626aef" plain style="width: 150px; height: 50px; margin-left: 12px; margin-top: 50px"
                     @click="show_assignments = assignments">
            展示所有课程作业
          </el-button>
          <el-menu @select="handleMenuSelect" mode="vertical" class="side_menu" :default-openeds="Array( '1')">
            <el-sub-menu index="1">
              <template #title>
                <span>你的课程</span>
              </template>
              <el-menu-item :index="course.id" v-for="course in courses" :key="course.id">
                <span>{{ course.id }}</span>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>

        <el-main>
          <div>
            <el-row>
              <h1>Assignments List</h1>
              <el-button type="primary" size="large" style="margin-left: 500px; margin-top: 15px"
                         @click="form_dialog_visible = true">
                Add Assignment
              </el-button>
            </el-row>
            <el-divider></el-divider>
          </div>

          <el-dialog v-model="form_dialog_visible" title="布置作业" @close="cancelAddAssignment">
            <el-form :model="form" ref="formRef">
              <el-form-item label="Course">
                <el-input v-model="form.course"/>
              </el-form-item>

              <el-form-item label="Title">
                <el-input v-model="form.title"/>
              </el-form-item>

              <el-form-item label="Teacher">
                <el-input v-model="form.teacher"/>
              </el-form-item>

              <el-form-item label="Due Date">
                <el-input v-model="form.due_date"/>
              </el-form-item>

              <el-form-item label="Resubmission Allowed">
                <el-input v-model="form.resubmission_allowed"/>
              </el-form-item>

              <el-form-item label="Accept Resubmission Until">
                <el-input v-model="form.accept_resubmission_until"/>
              </el-form-item>

              <el-form-item label="Requirements">
                <el-input v-model="form.requirements"/>
              </el-form-item>
            </el-form>

            <template #footer>
                  <span class="dialog_footer">
                    <el-button type="primary" @click="confirmAddAssignment">Submit</el-button>
                    <el-button @click="cancelAddAssignment">Cancel</el-button>
                  </span>
            </template>
          </el-dialog>

          <div>
            <el-table :data="show_assignments" table-layout="fixed" stripe style="width: 100%">
              <el-table-column prop="title" label="Title"/>
              <el-table-column prop="course_id" label="Course"/>
              <el-table-column prop="due_date" label="Due Date"/>
              <el-table-column label="Operation">
                <template v-slot="scope">
                  <el-button @click="jumpToDetailAssignment(scope.row.ID)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-empty v-show="assignments_empty" description="No assignment"></el-empty>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import axios from "axios";
import router from "@/router";

export default {
  name: "TeacherAssignmentCenter",

  data() {
    let formRef = reactive(ref(null))
    let form = reactive({
      course: '',
      title: '',
      teacher: '',
      due_date: '',
      resubmission_allowed: '',
      accept_resubmission_until: '',
      requirements: ''
    })

    return {
      form,
      formRef,
      form_dialog_visible: false,
      courses: [],
      assignments: [
        {
          id: 1,
          title: 'Assignment 1',
          course_id: 'CS102',
          due_date: '2022/12/12'
        },
        {
          id: 2,
          title: 'Assignment 1',
          course_id: 'CS201',
          due_date: '2022/12/12'
        },
        {
          id: 3,
          title: 'Assignment 1',
          course_id: 'CS996',
          due_date: '2022/12/12'
        }
      ],
      show_assignments: [],
      assignments_empty: false
    }
  },

  methods: {

    getTeacherCourses() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/course/getCoursesOfTeacher?teacher_id=' + 'lsm@hhh.com',
        transformRequest: [function (data) {
          let str = '';
          for (let key in data) {
            str += encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) + '&';
          }
          return str;
        }]
      })
          .then(resp => {
            let response = resp.data.data
            this.courses = response.courses
          })
    },

    handleMenuSelect(key, keyPath) {
      // console.log(key, keyPath)
      this.show_assignments = this.assignments.filter(n => n.course_id === key.trim())
      this.assignments_empty = (this.show_assignments.length === 0)
    },

    jumpToDetailAssignment(index) {
      let id = this.assignments.at(index).id
      console.log(id)
      router.push({
        name: "TeacherDetailAssignment",
        params: {
          assignment_id: id
        }
      })
    },

    cancelAddAssignment() {
      this.form.course = ''
      this.form.title = ''
      this.form.due_date = ''
      this.form.resubmission_allowed = ''
      this.form.accept_resubmission_until = ''
      this.form.requirements = ''
      this.$refs.formRef.resetFields()
      this.form_dialog_visible = false
    },

    confirmAddAssignment() {
      axios({
        method: 'POST',
        url: 'http://localhost:8080/education/assignment/addAssignment',
        data: {
          course: this.form.course,
          title: this.form.title,
          due_date: this.form.due_date,
          resubmission_allowed: this.form.resubmission_allowed,
          accept_resubmission_until: this.form.accept_resubmission_until,
          requirements: this.form.requirements
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
            this.cancelAddAssignment()
          })
    },
  },

  mounted() {
    this.getTeacherCourses()
    this.show_assignments = this.assignments
  }
}
</script>

<style scoped>
.background {
  background-color: rgb(243, 244, 246);
}

.assignmentCenter_teacher {
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
}
</style>