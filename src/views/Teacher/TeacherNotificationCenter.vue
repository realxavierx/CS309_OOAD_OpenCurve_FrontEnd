<template>
  <div>
    <el-container>
      <el-header>
        <TeacherHeader></TeacherHeader>
      </el-header>

      <el-container>
        <el-main>
          <p>Notification Center</p>

          <el-button @click="form_dialog_visible = true">Add Notification</el-button>

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

          <el-table :data="notifications">
            <el-table-column label="Course" prop="course"></el-table-column>
            <el-table-column label="Title" prop="title"></el-table-column>
            <el-table-column label="Sender" prop="sender"></el-table-column>
            <el-table-column label="Modified Time" prop="time"></el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TeacherHeader from "@/components/TeacherHeader";
import {reactive, ref} from "vue";
import axios from "axios";
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
  }
}
</script>

<style scoped>

</style>