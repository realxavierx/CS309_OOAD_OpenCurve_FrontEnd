<template>
  <div class="detail_assignment">
    <el-main>
      <h1>Assignment</h1>

      <el-card shadow="always">
        <template #header>
          <div class="assignment-title">
                <span>
                  <h2>{{ assignment.title }}</h2>
                </span>
          </div>
        </template>

        <div class="assignment-info">
          <div> {{ 'Course: ' + assignment.course_id }}</div>
          <div>{{ 'Teacher: ' + assignment.teacher_id }}</div>
          <div> {{ 'Due Date: ' + assignment.due_date }}</div>
          <div>{{ 'Resubmission allowed: ' + assignment.resubmission_allowed }}</div>
          <div>{{ 'Accept resubmission until: ' + assignment.accept_resubmission_until }}</div>
        </div>

        <div class="assignment-require">
          <h3>Requirements</h3>
          <p>{{ assignment.requirements }}</p>
        </div>

        <div class="assignment-resource">
          <h3>Additional resources</h3>
          <el-row v-for="resource in assignment.attachment" :key="resource">
            <el-link :href="resource" target="_blank" type="primary">
              {{ resource.slice(resource.lastIndexOf('/') + 1) }}
            </el-link>
          </el-row>
        </div>
      </el-card>

      <div>
        <h2>Assignment Text</h2>
        <v-md-editor v-model="submission_text" height="400px"></v-md-editor>
      </div>

      <div>
        <h2>Assignment Attachments</h2>
        <div v-if="filesString !== ''" style="margin-bottom: 10px">
          <el-row v-for="file in filesString.split(',')" :key="file">
            <el-link :href="file" target="_blank" type="primary">
              {{ file.slice(file.lastIndexOf('/') + 1) }}
            </el-link>
            <el-button style="margin-left: 10px" size="small" type="danger"
                       :icon="iconDelete" circle @click="removeFile"/>
          </el-row>
        </div>

        <el-upload
            :action="uploadActionUrl"
            :on-success="handleUploadSuccess"
            accept=".pdf, .doc, .docx, .png, .jpg, .jpeg, .mp4"
            multiple
            :show-file-list="false"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>

      <el-divider></el-divider>

      <div>
        <el-row>
          <el-col v-if="hasSubmission" :span="Number(18)">
            <el-tag type="primary" style="margin: 0 auto;padding: 30px; font-size: 20px; height: 60px">
              Your Score: {{ submission_score }}
            </el-tag>
          </el-col>
          <el-col :span="Number(6)">
            <div style="margin: 0 auto">
              <el-button type="primary" size="large" style="margin: 10px" @click="submit">Submit</el-button>
              <el-button type="danger" size="large" style="margin: 10px" @click="cancel">Cancel</el-button>
            </div>
          </el-col>
        </el-row>
      </div>


    </el-main>
  </div>
</template>

<script>

import axios from "axios";
import dayjs from "dayjs";
import {ElMessageBox} from "element-plus";
import router from "@/router";
import {
  // Check,
  Delete,
  // Edit,
  // Message,
  // Search,
  // Star,
} from '@element-plus/icons-vue'

export default {
  name: "StudentDetailAssignment",

  data() {
    return {
      user_id: '',
      assignment_id: '',
      assignment: '',
      hasSubmission: false,
      submission_text: '',
      submission_score: '',
      uploadActionUrl: 'http://localhost:8081/cloud_storage/file/uploading',
      filesString: '',
      iconDelete: Delete
    }
  },

  methods: {
    getAssignment() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/assignment/getAssignmentById?assignment_id=' + this.assignment_id,
      })
          .then(resp => {
            let response = resp.data.data
            this.assignment = response.assignment
            this.assignment.attachment = this.assignment.attachment.split(',')
          })
    },

    getSubmission() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/assignment/getSubmissionOfStudent?assignment_id='
            + this.assignment_id + '&student_id=' + this.user_id,
      })
          .then(resp => {
            let response = resp.data.data
            if (response.submission !== null) {
              this.hasSubmission = true
              this.submission_text = response.submission.text
              this.filesString = response.submission.content_url
              if (response.submission.score === null) {
                this.submission_score = 'Not Graded Yet'
              } else {
                this.submission_score = response.submission.score
              }
            }
          })
    },

    handleUploadSuccess(resp) {
      console.log('文件url为: ' + resp.data.url)
      if (this.filesString !== '') {
        this.filesString += ','
      }
      this.filesString += resp.data.url
    },

    removeFile() {
      // let fileName = file.slice(file.lastIndexOf('/') + 1)
      // this.file_list = this.file_list.filter((item) => !item.name.toString().includes(fileName))
      let endIndex = this.filesString.lastIndexOf(',')
      if (endIndex === -1) {
        this.filesString = ''
      } else {
        this.filesString.slice(0, endIndex)
      }
    },

    cancel() {
      ElMessageBox.confirm('Do you want to leave without submitting?')
          .then((value) => {
            console.log(value)
            if (value === 'confirm') {
              router.push('/userPage/StudentAssignmentCenter')
            }
          })
          .catch(() => {
            // catch error
          })
    },

    submit() {
      axios({
        method: 'POST',
        url: 'http://localhost:8080/education/assignment/submit',
        data: {
          assignment_id: this.assignment_id,
          student_id: this.user_id,
          content_url: this.filesString,
          text: this.submission_text,
          submission_date: dayjs().format('YYYY/MM/DD'),
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
          })
    },
  },

  mounted() {
    this.user_id = sessionStorage.getItem('USER_ID')
    this.assignment_id = this.$route.params.assignment_id
    this.getAssignment()
    this.getSubmission()
  }
}
</script>

<style scoped>

.detail_assignment {
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
}
</style>