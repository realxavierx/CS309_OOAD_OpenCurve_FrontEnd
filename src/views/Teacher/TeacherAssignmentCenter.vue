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
                <el-select v-model="form.course_id" placeholder="Select a Course">
                  <el-option v-for="course in courses" :key="course" :label="course.id.trim()" :value="course.id"/>
                </el-select>
              </el-form-item>

              <el-form-item label="Title">
                <el-input v-model="form.title"/>
              </el-form-item>

              <el-form-item label="Teacher">
                <el-input disabled v-model="form.teacher"/>
              </el-form-item>

              <el-form-item label="Due Date">
                <el-date-picker
                    v-model="form.due_date"
                    type="date"
                    placeholder="Pick a day"
                    :disabled-date="disabledDueDate"
                />
              </el-form-item>

              <el-form-item label="Resubmission Allowed">
                <el-input-number v-model="form.resubmission_allowed"/>
              </el-form-item>

              <el-form-item label="Accept Resubmission Until">
                <el-date-picker
                    v-model="form.accept_resubmission_until"
                    type="date"
                    placeholder="Pick a day"
                    :disabled-date="disabledResubmissionDate"
                />
              </el-form-item>

              <el-form-item label="Requirements">
                <el-input v-model="form.requirements"/>
              </el-form-item>

              <el-form-item label="Resources">
                <el-upload
                :action="uploadActionUrl"
                :on-success="handleUploadSuccess"
                accept=".jpg, .jpeg, .png, .pdf, .doc, .docx"
                multiple
                :file-list="form.fileList"
                :limit="3">
                <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
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
import {reactive, ref} from "vue";
import axios from "axios";
import router from "@/router";
import dayjs from "dayjs";

export default {
  name: "TeacherAssignmentCenter",

  data() {
    let formRef = reactive(ref(null))
    let form = reactive({
      course_id: '',
      title: '',
      teacher: '',
      due_date: '',
      resubmission_allowed: 0,
      accept_resubmission_until: '',
      requirements: '',
      fileList: [],
      attachment: ''
    })

    return {
      form,
      formRef,
      user_id: '',
      form_dialog_visible: false,
      uploadActionUrl: 'http://localhost:8081/cloud_storage/file/uploading',
      courses: [],
      assignments: [],
      show_assignments: []
    }
  },

  methods: {

    getTeacherAssignments() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/assignment/getTeacherAssignments?teacher_id=' + this.user_id,
      })
          .then(resp => {
            let response = resp.data.data
            this.courses = response.courses
            this.assignments = response.assignments
            this.show_assignments = response.assignments
          })
    },

    handleMenuSelect(key, keyPath) {
      // console.log(key, keyPath)
      this.show_assignments = this.assignments.filter(n => n.course_id === key)
    },

    jumpToDetailAssignment(index) {
      let id = this.show_assignments.at(index).id
      router.push({
        name: "TeacherDetailAssignment",
        params: {
          assignment_id: id
        }
      })
    },

    handleUploadSuccess(resp) {
      console.log('文件url为: ' + resp.data.url)
      if (this.form.attachment !== '') {
        this.form.attachment += ','
      }
      this.form.attachment += resp.data.url
    },

    disabledDueDate(time) {
      return time.getTime() <= Date.now()
    },

    disabledResubmissionDate(time) {
      let date = Date.now()
      if (this.form.due_date !== '') {
        date = this.form.due_date
      }
      return time.getTime() < date
    },

    cancelAddAssignment() {
      this.form.course_id = ''
      this.form.title = ''
      this.form.due_date = ''
      this.form.resubmission_allowed = 0
      this.form.accept_resubmission_until = ''
      this.form.requirements = ''
      this.form.fileList = []
      this.form.attachment = ''
      this.$refs.formRef.resetFields()
      this.form_dialog_visible = false
    },

    confirmAddAssignment() {
      axios({
        method: 'POST',
        url: 'http://localhost:8080/education/assignment/release',
        data: {
          course_id: this.form.course_id,
          teacher_id: this.user_id,
          title: this.form.title,
          due_date: dayjs(this.form.due_date).format('YYYY/MM/DD'),
          resubmission_allowed: this.form.resubmission_allowed,
          accept_resubmission_until: dayjs(this.form.accept_resubmission_until).format('YYYY/MM/DD'),
          requirements: this.form.requirements,
          attachment: this.form.attachment
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
            this.getTeacherAssignments()
          })
    },
  },

  mounted() {
    this.user_id = localStorage.getItem('USER_ID')
    this.form.teacher = this.user_id
    this.getTeacherAssignments()
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