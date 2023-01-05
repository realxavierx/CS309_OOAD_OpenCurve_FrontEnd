<template>
  <div class="background">
    <h1 align="center">Student Assignment Center</h1>
    <div class="assignment-center">
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
            <h1>Assignments List</h1>
            <el-divider></el-divider>
          </div>
          <div>
            <el-table v-if="show_assignments.length !== 0" :data="show_assignments" table-layout="fixed" stripe style="width: 100%">
              <el-table-column prop="title" label="Title"/>
              <el-table-column prop="course_id" label="Course"/>
              <el-table-column prop="due_date" label="Due Date"/>
              <el-table-column label="Operation">
                <template v-slot="scope">
                  <el-button @click="jumpToDetailAssignment(scope.row.ID)">查看</el-button>
                </template>
              </el-table-column>
            </el-table>

            <el-empty v-show="show_assignments.length === 0" description="No assignment"></el-empty>
          </div>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import "github-markdown-css"
// import {ref} from "vue";
import 'mavon-editor/dist/css/index.css'
import router from "@/router";
import axios from "axios";

export default {
  name: "StudentAssignmentCenter",

  data() {
    return {
      user_id: '',
      courses: [],
      assignments: [],
      show_assignments: [],
    }
  },

  methods: {

    getStudentAssignments() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/assignment/getStudentAssignments?student_id=' + this.user_id,
      })
          .then(resp => {
            let response = resp.data.data
            this.courses = response.courses
            this.assignments = response.assignments
            this.show_assignments = this.assignments
          })
    },

    handleMenuSelect(key, keyPath) {
      // console.log(key, keyPath)
      this.show_assignments = this.assignments.filter(n => n.course_id === key)
    },

    jumpToDetailAssignment(index) {
      let id = this.show_assignments.at(index).id

      router.push({
        name: "StudentDetailAssignment",
        params: {
          assignment_id: id
        }
      })
    },
  },

  mounted() {
    this.user_id = sessionStorage.getItem('USER_ID')
    this.getStudentAssignments()
  }
}

</script>

<style scoped>
.background{
  background-color: rgb(243,244,246);
}

.assignment-center{
  width:80%;
  margin:0 auto;
  background-color: #fff;
}

.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 100%;
  margin: 0 auto;
  padding: 45px;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>