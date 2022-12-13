<template>
  <div>
    <el-container>
      <el-header>
        <StudentHeader></StudentHeader>
      </el-header>

      <el-container>
        <el-aside>
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
    </el-container>
  </div>
</template>

<script>
import StudentHeader from "@/components/StudentHeader";
import "github-markdown-css"
// import {ref} from "vue";
import {marked} from "marked"
import 'mavon-editor/dist/css/index.css'
import router from "@/router";
import axios from "axios";

export default {
  name: "StudentAssignmentCenter",
  components: {StudentHeader},

  data() {
    return {
      courses: [],
      assignments: [
        {
          id: 1,
          title: 'Assignment 1',
          course_id: 'CS996',
          due_date: '2022/12/12'
        },
        {
          id: 2,
          title: 'Assignment 1',
          course_id: 'CS996',
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
    getStudentCourses() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/course/getCourseOfStudent?student_id=' + 'lsm@hhh.com',
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
      console.log(key, keyPath)
      this.show_assignments = this.assignments.filter(n => n.course_id === key)
      this.assignments_empty = (this.show_assignments.length === 0)
    },

    async md2html(mdStr) {
      return marked.parse(mdStr);
    },

    jumpToDetailAssignment(index) {
      let id = this.assignments.at(index).id
      console.log(id)
      router.push({
        name: "StudentDetailAssignment",
        params: {
          assignment_id: id
        }
      })
    },
  },

  mounted() {
    this.getStudentCourses()
    this.show_assignments = this.assignments
  }
}

</script>

<style scoped>
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