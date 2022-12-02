<template>
  <div>
    <el-container>
      <el-header>
        <TeacherHeader></TeacherHeader>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu mode="vertical" class="side_menu" :default-openeds="Array('1', '2')">
            <el-sub-menu index="1" >
              <template #title>
                <span>课程通知</span>
              </template>
              <el-menu-item index="1-1">CS996</el-menu-item>
            </el-sub-menu>

            <el-sub-menu index="2">
              <template #title>
                <span>院系通知</span>
              </template>
              <el-menu-item index="2-1">CSE</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>

        <el-main>
          <el-row>
            <el-col :span="Number(12)">
              <h1>Notification Center</h1>
            </el-col>

            <el-col :span="Number(12)">
              <el-button style="margin-top: 15px; margin-left: 150px;" size="large" type="primary" @click="form_dialog_visible = true">Add Notification</el-button>
            </el-col>
          </el-row>

          <el-dialog v-model="form_dialog_visible" title="添加通知" @close="cancelAddNotification">
            <el-form :model="form" ref="formRef">
              <el-form-item label="Course">
                <el-input v-model="form.course"/>
              </el-form-item>

              <el-form-item label="Title">
                <el-input v-model="form.title"/>
              </el-form-item>

              <el-form-item label="Sender">
                <el-input v-model="form.sender"/>
              </el-form-item>

              <el-form-item label="Message">
                <el-input v-model="form.message"/>
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
                <el-tag class="info_tag">Title</el-tag>
                {{ notification.title }}
              </el-card>

              <el-card class="info_card" body-style="padding: 2px" shadow="hover">
                <el-row>
                  <el-col :span="Number(12)">
                    <el-tag class="info_tag">Course</el-tag>
                    {{ notification.course }}
                  </el-col>
                  <el-col :span="Number(12)">
                    <el-tag class="info_tag">Sender</el-tag>
                    {{ notification.sender }}
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
                    {{ notification.message }}
                  </el-collapse-item>
                </el-collapse>
              </el-card>

            </el-card>
          </div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TeacherHeader from "@/components/TeacherHeader";
import {reactive, ref} from "vue";
import axios from "axios";
import moment from "moment";

export default {
  name: "TeacherNotificationCenter",
  components: {TeacherHeader},

  data() {
    let formRef = reactive(ref(null))
    let form = reactive({
      course: '',
      title: '',
      sender: '',
      message: ''
    })

    return {
      form,
      formRef,
      form_dialog_visible: false,
      notifications: [
        {
          course: 'OOAD',
          title: 'Notification 1',
          sender: 'AAAAA',
          time: '2022/09/01',
          message: 'asasasa'
        },
        {
          course: 'CPP',
          title: 'Notification 2',
          sender: 'BBBBBB',
          time: '2022/09/30',
          message: 'aaaaaaaa'
        },
        {
          course: 'JAVA',
          title: 'Notification 3',
          sender: 'CCCCC',
          time: '2022/10/15',
          message: 'asauequequ'
        }
      ]
    }
  },

  methods: {

    cancelAddNotification() {
      this.form.course = ''
      this.form.title = ''
      this.form.sender = ''
      this.form.message = ''
      this.$refs.formRef.resetFields()
      this.form_dialog_visible = false
    },

    confirmAddNotification() {
      let modified_time = moment().format('L').toString()
      console.log(modified_time)
      axios({
        method: 'POST',
        url: 'http://localhost:8080/education/notification/addNotification',
        data: {
          course: this.form.course,
          title: this.form.title,
          sender: this.form.sender,
          message: this.form.message
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
            this.cancelAddNotification()
          })
    }
  },

  mounted() {
    let modified_time = moment().format('L').toString()
    console.log(modified_time)
  }
}
</script>

<style scoped>

.info_card {
  padding: 5px;
  height: 40px;
}

.info_tag {
  width: 150px;
  height: 35px;
  margin-right: 50px;
  font-weight: bold;
  font-size: large;
  font-style: oblique;
}
</style>