<template>
  <div class="background">
    <h1 align="center">Manager User Center</h1>
    <div class="user-center-admin">
      <div>
        <el-row>
          <el-col :span="12">
            <el-button style="width: 100%; height: 50px"
                       @click="selection = 'Students'; getStudentsInfo">
              Students
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button style="width: 100%; height: 50px"
                       @click="selection = 'Teachers'; getTeachersInfo">
              Teachers
            </el-button>
          </el-col>
        </el-row>
      </div>

      <div v-if="selection === 'Students'">
        <el-row>
          <el-col v-for="student in students" :key="student.id" :span="12">
            <el-card style="height: 250px">
              <el-row>
                <el-col :span="8">
                  <el-avatar style="margin-top: 10px; margin-left: 20px" :size="140" :src="student.picture_url" />
                  <el-button style="margin-top: 25px; margin-left: 30px"
                             v-if="student.status === 'normal'"
                             type="danger" @click="blockStudent(student)">
                    Block Student
                  </el-button>
                  <el-button style="margin-top: 30px; margin-left: 26px"
                             v-if="student.status === 'blocked'"
                             type="success" @click="unblockStudent(student)">
                    Unblock Student
                  </el-button>
                </el-col>
                <el-col :span="1"></el-col>
                <el-col :span="14">
                  <el-row>
                    <h4>{{student.id}}</h4>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <p>Grade: {{student.grade}}</p>
                    </el-col>
                    <el-col :span="12">
                      <p>Department: {{student.department}}</p>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <p>Name: {{student.name}}</p>
                    </el-col>
                    <el-col :span="12">
                      <p>College: {{student.college}}</p>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-row>
                        <p>Status: </p>
                        <el-tag style="margin-left: 8px; margin-top: 15px" v-if="student.status === 'normal'">Normal</el-tag>
                        <el-tag style="margin-left: 8px; margin-top: 15px" type="danger" v-if="student.status === 'blocked'">Blocked</el-tag>
                      </el-row>
                    </el-col>
                    <el-col :span="12">
                      <el-tag style="margin-left: 8px; margin-top: 7px; width: 120px; height: 40px; font-size: 18px"
                              type="success" v-if="student.online === 'True'">
                        Online
                      </el-tag>
                      <el-tag style="margin-left: 8px; margin-top: 7px; width: 120px; height: 40px; font-size: 18px"
                              type="info" v-if="student.online === 'False'">
                        Offline
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <div v-if="selection === 'Teachers'">
          <el-row>
            <el-col v-for="teacher in teachers" :key="teacher.id" :span="12">
              <el-card style="height: 200px">
                <el-row>
                  <el-col :span="8">
                    <el-avatar style="margin-top: 10px; margin-left: 20px" :size="100" :src="teacher.picture_url" />
                    <el-button style="margin-top: 25px; margin-left: 30px"
                               v-if="teacher.status === 'normal'"
                               type="danger" @click="blockTeacher(teacher)">
                      Block Teacher
                    </el-button>
                    <el-button style="margin-top: 30px; margin-left: 26px"
                               v-if="teacher.status === 'blocked'"
                               type="success" @click="unblockTeacher(teacher)">
                      Unblock Teacher
                    </el-button>
                  </el-col>
                  <el-col :span="1"></el-col>
                  <el-col :span="14">
                    <el-row>
                      <h4>{{teacher.id}}</h4>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <p>Department: {{teacher.department}}</p>
                      </el-col>
                      <el-col :span="12">
                        <p>Name: {{teacher.name}}</p>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-row>
                          <p>Status: </p>
                          <el-tag style="margin-left: 8px; margin-top: 15px" v-if="teacher.status === 'normal'">Normal</el-tag>
                          <el-tag style="margin-left: 8px; margin-top: 15px" type="danger" v-if="teacher.status === 'blocked'">Blocked</el-tag>
                        </el-row>
                      </el-col>
                      <el-col :span="12">
                        <el-tag style="margin-left: 8px; margin-top: 7px; width: 120px; height: 40px; font-size: 18px"
                                type="success" v-if="teacher.online === 'True'">
                          Online
                        </el-tag>
                        <el-tag style="margin-left: 8px; margin-top: 7px; width: 120px; height: 40px; font-size: 18px"
                                type="info" v-if="teacher.online === 'False'">
                          Offline
                        </el-tag>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "AdminUserCenter",

  data() {
    return {
      selection: '',
      teachers: [],
      students: [],
    }
  },

  methods: {

    getTeachersInfo() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/manage/getTeachersInfo'
      })
          .then((resp) => {
            console.log(resp.data.message)
            this.teachers = resp.data.data.teachers
          })
    },

    getStudentsInfo() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/manage/getStudentsInfo'
      })
          .then((resp) => {
            console.log(resp.data.message)
            this.students = resp.data.data.students
          })
    },

    blockStudent(student) {
      axios({
        method: 'POST',
        url: 'http://localhost:8080/education/manage/blockStudent',
        data: {
          id: student.id
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
            this.getStudentsInfo()
          })
    },

    unblockStudent(student) {
      axios({
        method: 'POST',
        url: 'http://localhost:8080/education/manage/unblockStudent',
        data: {
          id: student.id
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
            this.getStudentsInfo()
          })
    }
  },

  mounted() {
    this.getTeachersInfo()
    this.getStudentsInfo()
  }
}
</script>

<style scoped>
.background {
  background-color: rgb(243, 244, 246);
}

.user-center-admin {
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
}
</style>