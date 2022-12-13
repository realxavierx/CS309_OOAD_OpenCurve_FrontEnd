<template>
  <div>
    <el-container>
      <el-header>
        <StudentHeader></StudentHeader>
      </el-header>

      <el-container>
        <el-main>
          <h1>Assignment</h1>

          <el-card shadow="always">
            <template #header>
              <div class="assignment-title">
                <span>
                  <h1>{{assignment.title}}</h1>
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
              <p>{{assignment.requirements}}</p>
            </div>

            <div class="assignment-resource">
              <h3>Additional resources</h3>
              <p>{{assignment.additional_resources}}</p>
            </div>
          </el-card>

          <div>
            <h1>Assignment Text</h1>
            <v-md-editor v-model="text" height="400px"></v-md-editor>
          </div>

          <div>
            <h1>Assignment Attachments</h1>
            <el-upload
                :action="uploadAttachments"
                :on-success="handleUploadSuccess"
                accept="video/mp4,image/jpeg,image/gif,image/png"
                multiple
                :file-list="assignment.attachments"
                :limit="5">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </div>

          <el-divider></el-divider>

          <div class="operations" style="margin-top: 30px">
            <el-button type="primary" size="large" style="margin: 10px">Submit</el-button>
            <el-button size="large" style="margin:10px">Sava Draft</el-button>
            <el-button type="danger" size="large" style="margin: 10px">Cancel</el-button>
          </div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import StudentHeader from "@/components/StudentHeader";

export default {
  name: "StudentDetailAssignment",
  components: {StudentHeader},

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
      text: '',
    }
  },

  methods: {

    getAssignmentById() {

    },

    uploadAttachments() {

    },

    handleUploadSuccess() {

    },
  }
}
</script>

<style scoped>

</style>