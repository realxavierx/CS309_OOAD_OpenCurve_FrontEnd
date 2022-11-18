<template>
  <div>
    <el-container>
      <el-header>
        <TeacherHeader></TeacherHeader>
      </el-header>

      <el-container>
        <el-main>
          <p>Assignment Center</p>

          <el-button @click="form_dialog_visible = true">Add Assignment</el-button>

          <el-dialog v-model="form_dialog_visible" title="布置作业" @close="cancelAddAssignment">
            <el-form :model="form" ref="formRef">
              <el-form-item label="Course">
                <el-input v-model="form.course"/>
              </el-form-item>

              <el-form-item label="Title">
                <el-input v-model="form.title"/>
              </el-form-item>

              <el-form-item label="Teacher">
                <el-input v-model="form.teacher"/>
              </el-form-item>

              <el-form-item label="Due Date">
                <el-input v-model="form.due_date"/>
              </el-form-item>

              <el-form-item label="Resubmission Allowed">
                <el-input v-model="form.resubmission_allowed"/>
              </el-form-item>

              <el-form-item label="Accept Resubmission Until">
                <el-input v-model="form.accept_resubmission_until"/>
              </el-form-item>

              <el-form-item label="Requirements">
                <el-input v-model="form.requirements"/>
              </el-form-item>
            </el-form>

            <template #footer>
                  <span class="dialog_footer">
                    <el-button type="primary" @click="confirmAddAssignment">Submit</el-button>
                    <el-button @click="cancelAddAssignment">Cancel</el-button>
                  </span>
            </template>
          </el-dialog>

          <el-table :data="assignments">
            <el-table-column label="Course" prop="course"></el-table-column>
            <el-table-column label="Title" prop="title"></el-table-column>
            <el-table-column label="Teacher" prop="teacher"></el-table-column>
            <el-table-column label="Due Date" prop="due_date"></el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import TeacherHeader from "@/components/TeacherHeader";
import axios from "axios";

export default {
  name: "TeacherAssignmentCenter",
  components: {TeacherHeader},

  data() {
    let formRef = reactive(ref(null))
    let form = reactive({
      course: '',
      title: '',
      teacher: '',
      due_date: '',
      resubmission_allowed: '',
      accept_resubmission_until: '',
      requirements: ''
    })

    return {
      form,
      formRef,
      form_dialog_visible: false,
    }
  },

  methods: {

    cancelAddAssignment() {
      this.form.course = ''
      this.form.title = ''
      this.form.due_date = ''
      this.form.resubmission_allowed = ''
      this.form.accept_resubmission_until = ''
      this.form.requirements = ''
      this.$refs.formRef.resetFields()
      this.form_dialog_visible = false
    },

    confirmAddAssignment() {
      axios({
        method: 'POST',
        url: 'http://localhost:8080/education/assignment/addAssignment',
        data: {
          course: this.form.course,
          title: this.form.title,
          due_date: this.form.due_date,
          resubmission_allowed: this.form.resubmission_allowed,
          accept_resubmission_until: this.form.accept_resubmission_until,
          requirements: this.form.requirements
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
          })
    }
  }
}
</script>

<style scoped>

</style>