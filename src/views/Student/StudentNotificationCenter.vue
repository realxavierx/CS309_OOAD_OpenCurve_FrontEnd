<template>
  <div class="background">
    <h1 align="center">Notification Center</h1>
    <div class="notification-center-stu">
      <el-container>
        <el-aside width="200px">
          <el-button color="#626aef" plain style="width: 150px; height: 50px; margin-left: 12px; margin-top: 50px"
                     @click="show_notifications = notifications">
            展示所有通知
          </el-button>
          <el-button color="#626aef" plain style="width: 150px; height: 50px"
                     @click="show_notifications = notifications.filter(n => !n.course_id.includes('000'))">
            展示课程通知
          </el-button>
          <el-button color="#626aef" plain style="width: 150px; height: 50px; margin-bottom: 20px"
                     @click="show_notifications = notifications.filter(n => n.course_id.includes('000'))">
            展示院系通知
          </el-button>

          <el-menu @select="handleMenuSelect" mode="vertical" class="side_menu" :default-openeds="Array( '1', '2')">
            <el-sub-menu index="1">
              <template #title>
                <span>课程通知</span>
              </template>
              <el-menu-item :index="course.id" v-for="course in courses" :key="course.id">
                <span>{{ course.id }}</span>
              </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="2">
              <template #title>
                <span>院系通知</span>
              </template>
              <el-menu-item :index="studentDepartment" :key="studentDepartment">
                <span>{{ studentDepartment }}</span>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>

        <el-main>
          <div v-for="notification in show_notifications" v-bind:key="notification">
            <el-card shadow="always">

              <el-card class="info_card" body-style="padding: 2px" shadow="hover">
                <el-tag class="info_tag">Title</el-tag>
                {{ notification.title }}
              </el-card>

              <el-card class="info_card" body-style="padding: 2px" shadow="hover">
                <el-row :gutter="Number(10)">
                  <el-col :span="Number(6)">
                    <el-tag class="info_tag">Course</el-tag>
                    {{ notification.course_id }}
                  </el-col>
                  <el-col :span="Number(10)">
                    <el-tag class="info_tag">Sender</el-tag>
                    {{ notification.sender_id }}
                  </el-col>
                  <el-col :span="Number(8)">
                    <el-tag class="info_tag">Time</el-tag>
                    {{ notification.modified_time }}
                  </el-col>
                </el-row>
              </el-card>

              <el-card style="padding: 5px" body-style="padding: 2px" shadow="hover">
                <el-collapse>
                  <el-collapse-item>
                    <template #title>
                      <el-tag class="info_tag">Content</el-tag>
                      <p style="color: #729abb">---> click to show content</p>
                    </template>
                    {{ notification.content }}
                  </el-collapse-item>
                </el-collapse>
              </el-card>

            </el-card>

          </div>

          <el-empty v-show="notifications_empty" description="No notification"></el-empty>

        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import StudentHeader from "@/components/StudentHeader";
import axios from "axios";

export default {
  name: "StudentNotificationCenter",

  data() {

    return {
      user_id: '',
      courses: [],
      notifications: [],
      show_notifications: [],
      studentDepartment: "",
      notifications_empty: true
    }
  },


  methods: {

    getNotificationByStudent() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/notification/getNotificationByStudent?student_id=' + this.user_id,
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
            this.notifications = response.notifications
            this.studentDepartment = response.studentDepartment
            this.show_notifications = this.notifications
            this.notifications_empty = (this.show_notifications.length === 0)
          })
    },

    handleMenuSelect(key, keyPath) {
      console.log(key, keyPath)
      if (keyPath[0] === '2') {
        this.show_notifications = this.notifications.filter(n => n.course_id.trim() === (key + '000'))
      } else {
        this.show_notifications = this.notifications.filter(n => n.course_id === key)
      }

      this.notifications_empty = (this.show_notifications.length === 0)
    },
  },

  mounted() {
    this.user_id = localStorage.getItem('USER_ID')
    this.getNotificationByStudent();
  }
}
</script>

<style scoped>

.background{
  background-color: rgb(243,244,246);
}

.notification-center-stu{
  width:80%;
  margin:0 auto;
  background-color: #fff;
}

.info_card {
  padding: 5px;
  height: 40px;
}

.info_tag {
  width: 100px;
  height: 35px;
  margin-right: 5px;
  font-weight: bold;
  font-size: large;
  font-style: oblique;
}
</style>