<template>
  <div class="background">
    <h1 align="center">Notification Center</h1>
    <div class="notification-center">
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

          <el-menu @select="handleMenuSelect" mode="vertical" class="side_menu" :default-openeds="Array('1', '2')">


            <el-sub-menu index="1">
              <template #title>
                <span>课程通知</span>
              </template>
              <el-menu-item :index="course.id" :key="course.id" v-for="course in courses">
                <span>{{ course.id }}</span>
              </el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="2">
              <template #title>
                <span>院系通知</span>
              </template>
              <el-menu-item :index="teacherDepartment" :key="teacherDepartment">
                <span>{{ teacherDepartment }}</span>
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>

        <el-main>
          <el-row>
            <el-col :span="Number(12)">
              <h1>Notification Center</h1>
            </el-col>

            <el-col :span="Number(12)">
              <el-button style="margin-top: 15px; margin-left: 150px;" size="large" type="primary"
                         @click="form_dialog_visible = true">Add Notification
              </el-button>
            </el-col>
          </el-row>

          <el-dialog v-model="form_dialog_visible" title="添加通知" @close="cancelAddNotification">
            <el-form :model="form" ref="formRef">
              <el-form-item label="Course">
                <el-select v-model="form.course_id">
                  <el-option v-for="course in courses" :key="course.id" :label="course.id" :value="course.id"/>
                </el-select>
              </el-form-item>

              <el-form-item label="Title">
                <el-input v-model="form.title"/>
              </el-form-item>

              <el-form-item label="Sender">
                <el-input disabled v-model="form.sender"/>
              </el-form-item>

              <el-form-item label="Message">
                <el-input v-model="form.content"
                          :autosize="{ minRows: 2, maxRows: 4 }"
                          type="textarea"/>
              </el-form-item>

              <el-form-item label="Send Mail">
                <el-radio-group v-model="form.sendMail">
                  <el-radio :label="true">Yes</el-radio>
                  <el-radio :label="false">No</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>

            <template #footer>
                  <span class="dialog_footer">
                    <el-button type="primary" @click="confirmAddNotification">Submit</el-button>
                    <el-button @click="cancelAddNotification">Cancel</el-button>
                  </span>
            </template>
          </el-dialog>

          <div v-for="notification in show_notifications" v-bind:key="notification">
            <el-card shadow="always">

              <el-card class="info_card" body-style="padding: 2px" shadow="hover">
                <el-row>
                  <el-col :span="Number(18)">
                    <el-tag class="info_tag">Title</el-tag>
                    {{ notification.title }}
                  </el-col>
                  <el-col v-if="!notification.course_id.includes('000 ')" :span="Number(6)">
                    <el-button type="primary"
                               @click="sendMailToStudents(notification.course_id, notification.title, notification.content)">
                      Send Mail
                    </el-button>
                  </el-col>
                </el-row>

              </el-card>

              <el-card class="info_card" body-style="padding: 2px" shadow="hover">
                <el-row>
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
                    {{ notification.modified_date }}
                  </el-col>
                </el-row>
              </el-card>

              <el-card style="padding: 5px" body-style="padding: 2px" shadow="hover">
                <el-collapse>
                  <el-collapse-item>
                    <template #title>
                      <el-tag class="info_tag">Message</el-tag>
                      <p style="color: #729abb">---> click to show content</p>
                    </template>
                    {{ notification.content }}
                  </el-collapse-item>
                </el-collapse>
              </el-card>
            </el-card>
          </div>
          <el-empty v-show="this.show_notifications.length === 0" description="No notification"></el-empty>

        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import axios from "axios";
import dayjs from "dayjs";

export default {
  name: "TeacherNotificationCenter",

  data() {
    let formRef = reactive(ref(null))
    let form = reactive({
      course_id: '',
      title: '',
      sender: '',
      content: '',
      sendMail: true
    })

    return {
      user_id: '',
      form,
      formRef,
      form_dialog_visible: false,
      teacherDepartment: '',
      courses: [],
      notifications: [],
      show_notifications: [],
      notifications_empty: true
    }
  },

  methods: {

    cancelAddNotification() {
      this.form.course_id = ''
      this.form.title = ''
      this.form.sender = this.user_id
      this.form.content = ''
      this.form.sendMail = true
      this.$refs.formRef.resetFields()
      this.form_dialog_visible = false
    },

    confirmAddNotification() {
      axios({
        method: 'POST',
        url: 'http://localhost:8080/education/notification/addNotification',
        data: {
          course_id: this.form.course_id,
          title: this.form.title,
          teacher_id: this.form.sender,
          content: this.form.content,
          modified_date: dayjs().format('YYYY/MM/DD')
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
            console.log(response)
            if (this.form.sendMail) {
              this.sendMailToStudents(this.form.course_id, this.form.title, this.form.content)
            }
            this.cancelAddNotification()
          })
    },

    sendMailToStudents(course_id, title, content) {
      axios({
        method: 'POST',
        url: 'http://localhost:8080/education/notification/sendMailToStudents',
        data: {
          course_id: course_id,
          title: title,
          content: content
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
            console.log(response)
          })
    },

    getTeacherNotification() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/notification/getNotificationByTeacher?teacher_id=' + this.user_id,
      })
          .then(resp => {
            let response = resp.data.data
            this.courses = response.courses
            this.notifications = response.notifications
            this.teacherDepartment = response.teacherDepartment
            this.show_notifications = this.notifications
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
    this.user_id = sessionStorage.getItem('USER_ID')
    this.form.sender = this.user_id
    this.getTeacherNotification()
  }
}
</script>

<style scoped>
.background{
  background-color: rgb(243,244,246);
}

.notification-center{
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