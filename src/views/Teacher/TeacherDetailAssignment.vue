<template>
  <div class="background">
    <div class="detail_assignment">

      <h1>Assignment Information</h1>

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
        <h2>Submissions</h2>
        <el-card class="card_item" v-for="submission in show_submissions" :key="submission">
          <el-row>
            <el-col :span="Number(8)">
              Student:
              <el-tag style="width: 240px; height: 40px; margin-left: 20px" effect="dark">
                {{ submission.student_id }}
              </el-tag>
            </el-col>

            <el-col :span="Number(6)">
              Submission Time:
              <el-tag style="width: 100px; height: 40px; margin-left: 20px">{{ submission.submission_date }}</el-tag>
            </el-col>

            <el-col :span="Number(3)">
              <el-button type="primary" @click="show_submission_text(submission)">Submission Text</el-button>
            </el-col>

            <el-col :span="Number(4)">

              <el-popover placement="top" :width="200" trigger="click">
                <template #reference>
                  <el-button type="primary" style="margin-right: 16px">Submission Attachments</el-button>
                </template>
                <el-row v-for="file in submission.content_url" :key="file">
                  <el-link style="margin: 0 auto" :href="file" target="_blank" type="primary">
                    {{ file.slice(file.lastIndexOf('/') + 1) }}
                  </el-link>
                </el-row>
              </el-popover>
            </el-col>

            <el-col :span="Number(3)">
              <el-button type="success"
                         @click="ratingSubmission(submission)">
                Rate Submission
              </el-button>
            </el-col>
          </el-row>
        </el-card>

        <el-dialog v-model="textVisible" title="Submission Text">
          <p>{{ submission_text }}</p>
        </el-dialog>

        <el-dialog v-model="scoreVisible" title="Rate Submission">
          <h4>Please input the score of this submission: </h4>
          <el-input-number v-model="submissionScore" :precision="1" :step="0.5" :max="100"/>
          <template #footer>
            <el-button type="danger" size="large" @click="cancelRate">Cancel</el-button>
            <el-button type="primary" size="large" @click="confirmRate">Confirm</el-button>
          </template>
        </el-dialog>

      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import {
  // Check,
  // Delete,
  // Edit,
  // Message,
  Search,
  // Star,
} from '@element-plus/icons-vue'

export default {
  name: "TeacherDetailAssignment",

  data() {
    return {
      assignment_id: '',
      textVisible: false,
      attachmentsVisible: false,
      assignment: '',
      submissions: [],
      show_submissions: [],
      submission_text: '',
      show_attachments: [],
      attachmentContentVisible: false,
      attachmentContent: '',
      scoreVisible: false,
      rateSubmission: '',
      submissionScore: 0,
      iconSearch: Search,
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

    getSubmissions() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/assignment/getSubmissionsOfAssignment?assignment_id=' + this.assignment_id,
      })
          .then(resp => {
            let response = resp.data.data
            this.submissions = response.submissions
            for (let submission of this.submissions) {
              submission.content_url = submission.content_url.split(',')
            }
            this.show_submissions = this.submissions
          })
    },

    show_submission_text(submission) {
      this.textVisible = true
      this.submission_text = submission.text
    },

    ratingSubmission(submission) {
      this.scoreVisible = true
      this.rateSubmission = submission
      if (submission.score !== null) {
        this.submissionScore = submission.score
      }
    },

    cancelRate() {
      this.submissionScore = 0
      this.scoreVisible = false
    },

    confirmRate() {
      axios({
        method: 'POST',
        url: 'http://localhost:8080/education/assignment/gradeSubmission',
        data: {
          assignment_id: this.assignment_id,
          student_id: this.rateSubmission.student_id,
          score: this.submissionScore
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
            this.rateSubmission.score = this.submissionScore
            this.cancelRate()
          })
    },

  }
  ,

  mounted() {
    this.assignment_id = this.$route.params.assignment_id
    this.getAssignment()
    this.getSubmissions()
  }
  ,

}
</script>

<style scoped>

.background {
  background-color: rgb(243, 244, 246);
}

.detail_assignment {
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
}

.card_item {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 70px;
}
</style>