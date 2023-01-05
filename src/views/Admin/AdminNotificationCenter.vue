<template>
  <div class="background">
    <h1 align="center">Manager Notification Center</h1>
    <div class="notification-center-admin">
      <div>
        <el-row>
          <el-col :span="12">
            <el-button style="width: 100%; height: 50px"
                       @click="selection = 'All Notifications'; getAllNotifications">
              All Notification
            </el-button>
          </el-col>
          <el-col :span="12">
            <el-button style="width: 100%; height: 50px"
                       @click="selection = 'Your Notifications'; getManagerNotifications">
              Your Notification
            </el-button>
          </el-col>
        </el-row>
        <el-button type="primary" style="margin-left: 44%; margin-top: 15px"
                   @click="form_dialog_visible = true"
                   size="large">
          Send Notification
        </el-button>
      </div>

      <div>
        <el-dialog v-model="form_dialog_visible" title="添加通知" @close="cancelAddNotification">
          <el-form :model="form" ref="formRef">
            <el-form-item label="Course">
              <el-input disabled v-model="form.course_id"/>
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

        <div v-for="notification in notifications" v-bind:key="notification">
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
        <el-empty v-show="this.notifications.length === 0" description="No notification"></el-empty>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import axios from "axios";
import dayjs from "dayjs";

export default {
  name: "AdminNotificationCenter",

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
      selection: '',
      user_id: '',
      department: '',
      form,
      formRef,
      form_dialog_visible: false,
      teacherDepartment: '',
      courses: [],
      notifications: [],
      notifications_empty: true
    }
  },

  methods: {
    getAllNotifications() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/notification/getAllNotifications'
      })
          .then(resp => {
            let response = resp.data.data
            this.notifications = response.notifications
          })
    },

    getManagerNotifications() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/notification/getNotificationByManager?manager_id=' + this.user_id
      })
          .then(resp => {
            let response = resp.data.data
            this.notifications = response.notifications
          })
    },

    cancelAddNotification() {
      this.form.course_id = this.department + '000'
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
  },

  mounted() {
    this.user_id = sessionStorage.getItem('USER_ID')
    this.department = sessionStorage.getItem('MAJOR')
    this.form.sender = this.user_id
    this.form.course_id = this.department + '000'
  }
}
</script>

<style scoped>
.background {
  background-color: rgb(243, 244, 246);
}

.notification-center-admin {
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
}
</style>