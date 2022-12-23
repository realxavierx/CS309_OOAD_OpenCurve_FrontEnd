<template>
  <div>
    <el-container>

      <el-container>
        <el-main>
          <h1>Assignment Information</h1>

          <el-card shadow="always">
            <template #header>
              <div class="assignment-title">
                <span>
                  <h1>{{ assignment.title }}</h1>
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
              <p>{{ assignment.additional_resources }}</p>
            </div>
          </el-card>

          <div>
            <h1>Submissions</h1>
            <el-card v-for="submission in show_submissions" :key="submission">
              <el-row>
                <el-col :span="Number(6)">
                  Student:
                  <el-tag style="width: 150px; height: 40px; margin-left: 20px" effect="dark">{{
                      submission.student_id
                    }}
                  </el-tag>
                </el-col>

                <el-col :span="Number(6)">
                  Submission Time:
                  <el-tag style="width: 150px; height: 40px; margin-left: 20px">{{ submission.time }}</el-tag>
                </el-col>


                 <el-col :span="Number(2)"></el-col>

                <el-col :span="Number(3)">
                  <el-button type="primary" @click="show_submission_text(submission.text)">Submission Text</el-button>
                </el-col>

                <el-col :span="Number(4)">
                  <el-button type="primary" @click="show_submission_attachments(submission.attachments)">
                    Submission Attachments
                  </el-button>
                </el-col>

                <el-col :span="Number(3)">
                  <el-button type="success" @click="scoreVisible = true; rateSubmission = submission">
                    Rate Submission
                  </el-button>
                </el-col>
              </el-row>
            </el-card>


            <el-dialog v-model="textVisible" title="Submission Text">
              <p>{{show_text}}</p>
            </el-dialog>

            <el-dialog v-model="attachmentsVisible" title="Submission Attachments">
              <div v-for="attachment in show_attachments" :key="attachment">
                <el-row>
                  <el-col :span="Number(6)">
                    {{attachment}}
                  </el-col>
                  <el-col :span="Number(10)"></el-col>
                  <el-col :span="Number(8)">
                    <el-button @click="showAttachmentContent(attachment)">在线预览</el-button>
                    <el-button @click="downloadAttachment(attachment)">下载</el-button>
                  </el-col>
                </el-row>
              </div>
            </el-dialog>

            <el-dialog v-model="scoreVisible" title="Rate Submission">
              <h4>Please input the score of this submission: </h4>
              <el-input-number v-model="submissionScore" :precision="1" :step="0.5" :max="100" />
              <template #footer>
                <el-button type="danger" size="large" @click="cancelRate">Cancel</el-button>
                <el-button type="primary" size="large" @click="confirmRate">Confirm</el-button>
              </template>
            </el-dialog>

            <el-drawer v-model="attachmentContentVisible"
                       direction="rtl"
            >
              <template #title>
              </template>
              <template #default>
                <div>
                  <p>{{attachmentContent}}</p>
                </div>
              </template>
              <template #footer>
                <div style="flex: auto">
                </div>
              </template>
            </el-drawer>
          </div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: "TeacherDetailAssignment",

  data() {
    return {
      textVisible: false,
      attachmentsVisible: false,
      assignment: {
        assignment_id: '',
        title: 'Homework',
        course_id: 'CS996',
        teacher_id: '1',
        due_date: '2022.12.31',
        resubmission_allowed: '10',
        accept_resubmission_until: '2023.1.1',
        requirements: 'Hello world! ' +
            'It\'s nice to meet you',
        additional_resources: 'File 1',
      },
      submissions: [
        {
          student_id: 'lsm@hhh.com',
          time: '2022/12/10',
          text: 'hello world',
          attachments: [
            'File A',
            'File B'
          ],
          score: 'NaN'
        },
        {
          student_id: 'lsm@hhh.com',
          time: '2022/12/12',
          text: 'hello world',
          attachments: [
            'File A',
            'File B'
          ],
          score: 'NaN'
        },
      ],
      show_submissions: [],
      show_text: '',
      show_attachments: [],
      attachmentContentVisible: false,
      attachmentContent: '',
      scoreVisible: false,
      rateSubmission: '',
      submissionScore: 0,
    }
  },

  methods: {

    show_submission_text(text) {
      this.textVisible = true
      this.show_text = text
    },

    show_submission_attachments(attachments) {
      this.attachmentsVisible = true
      this.show_attachments = attachments
    },

    cancelRate() {
      this.submissionScore = 0
      this.scoreVisible = false
    },

    confirmRate() {
      this.rateSubmission.score = this.submissionScore
      this.submissionScore = 0
      this.scoreVisible = false
    },

    showAttachmentContent(attachment) {
      this.attachmentContent = attachment
      this.attachmentContentVisible = true
    },

    downloadAttachment(attachment) {
      console.log(attachment)
    }
  },

  mounted() {
    this.show_submissions = this.submissions
  },

}
</script>

<style scoped>

</style>