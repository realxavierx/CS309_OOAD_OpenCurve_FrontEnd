<template>
  <div>
    <el-container>
      <el-header>
        <TeacherHeader></TeacherHeader>
      </el-header>

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
            <el-card v-for="submission in show_submissions">
              <el-row>
                <el-col :span="Number(6)">
                  Student:
                  <el-tag style="width: 150px; height: 40px; margin-left: 20px" effect="dark">{{ submission.student_id }}</el-tag>
                </el-col>

                <el-col :span="Number(6)">
                  Submission Time:
                  <el-tag style="width: 150px; height: 40px; margin-left: 20px">{{ submission.time }}</el-tag>
                </el-col>

                <el-col :span="Number(6)"></el-col>

                <el-col :span="Number(3)">
                  <el-button type="primary" @click="show_text(submission.text)">Submission Text</el-button>
                </el-col>

                <el-col :span="Number(3)">
                  <el-button type="primary" @click="show_attachments(submission.attachments)">Submission Attachments
                  </el-button>
                </el-col>
              </el-row>

            </el-card>
          </div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TeacherHeader from "@/components/TeacherHeader";

export default {
  name: "TeacherDetailAssignment",
  components: {TeacherHeader},

  data() {
    return {
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
        attachments: ''
      },
      submissions: [
        {
          student_id: 'lsm@hhh.com',
          time: '2022/12/10',
          text: 'hello world',
          attachments: [
            'File A',
            'File B'
          ]
        },
        {
          student_id: 'lsm@hhh.com',
          time: '2022/12/12',
          text: 'hello world',
          attachments: [
            'File A',
            'File B'
          ]
        },
      ],
      show_submissions: []
    }
  },

  methods: {

    show_text() {

    },

    show_attachments() {

    }
  },

  mounted() {
    this.show_submissions = this.submissions
  }
}
</script>

<style scoped>

</style>