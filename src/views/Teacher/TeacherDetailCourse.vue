<template>
  <div>
    <div>
      <!-- 页面头部 -->
      <el-container>
        <el-header>
          <TeacherHeader></TeacherHeader>
        </el-header>

        <el-container>
          <el-aside width="230px" style="background-color: #95c5ef">
            <el-button type="primary" style="width: 100%; height: 80px" @click="form_dialog_visible = true">添加章节
            </el-button>

            <el-menu>
              <el-sub-menu index="1">
                <template #title>
                  <slot>章节</slot>
                </template>

                <el-menu-item v-for="index in this.session_cnt" :key="index" @click="getSessionInfo(index)">
                  Chapter {{ index }}
                </el-menu-item>
              </el-sub-menu>
            </el-menu>
          </el-aside>

          <el-main>
            <h3>video room</h3>
            <div class="live-room">
              <el-row>
                <el-col :span="17" style="background-color: #fff8c3">
                  <div class="video-title">
                    {{ videoOptions.title }}
                  </div>
                  <div class="video-content">
                    <vue3-video-play v-bind="videoOptions"></vue3-video-play>
                  </div>
                  <div class="student-functions">
                    <el-button-group>
                      <el-button type="primary" plain>举手</el-button>
                      <el-button type="primary" plain>提问</el-button>
                      <el-button type="primary" plain>录屏</el-button>
                      <el-button type="primary" plain>弹幕</el-button>
                    </el-button-group>

                  </div>
                </el-col>

                <el-col :span="1"></el-col>

                <el-col :span="6" style="background-color: aliceblue">
                  <div>
                    <el-descriptions title="Session Information" border :column="Number(1)">
                      <el-descriptions-item label="Title">{{ session_info.title }}</el-descriptions-item>
                      <br>
                      <el-descriptions-item label="Session">{{ session_info.session }}</el-descriptions-item>
                      <br>
                      <el-descriptions-item label="Description">{{ session_info.description }}</el-descriptions-item>
                    </el-descriptions>
                  </div>

                  <div style="margin-top: 20px">
                    <el-button style="margin-left: 10px; margin-right: 10px;"
                               type="primary"
                               @click="questionsVisible = true">
                      查看题目
                    </el-button>
                    <el-button type="primary">布置题目</el-button>
                  </div>
                </el-col>
              </el-row>

              <el-dialog v-model="form_dialog_visible" title="添加课程章节" @close="cancelAddChapter">
                <el-form :model="form" ref="formRef">
                  <el-form-item label="Title">
                    <el-input v-model="form.title"/>
                  </el-form-item>

                  <el-form-item label="Session">
                    <el-input v-model="form.session"/>
                  </el-form-item>

                  <el-form-item label="description">
                    <el-input v-model="form.description"/>
                  </el-form-item>

                  <el-form-item label="Video">
                    <el-upload
                        :action="uploadActionUrl"
                        :on-success="handleSuccess"
                        accept="video/mp4,image/jpeg,image/gif,image/png"
                        multiple
                        :file-list="form.uploadVideo"
                        :limit="1">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </el-form-item>
                </el-form>

                <template #footer>
                  <span class="dialog_footer">
                    <el-button type="primary" @click="confirmAddChapter()">Submit</el-button>
                    <el-button @click="cancelAddChapter()">Cancel</el-button>
                  </span>
                </template>
              </el-dialog>

              <el-drawer v-model="questionsVisible"
                         direction="rtl"
                         :before-close="handleCloseQuestions"
              >
                <template #title>
                  <h4>Questions</h4>
                </template>
                <template #default>
                  <div>
                    <div id="questionArea" v-for="question in questions" :key="question">
                      <h3>{{question.title}}</h3>
                    </div>
                  </div>
                </template>
                <template #footer>
                  <div style="flex: auto">
                    <el-button @click="handleCloseQuestions">Cancel</el-button>
                    <el-button type="primary" @click="confirmSave">Save</el-button>
                  </div>
                </template>
              </el-drawer>
            </div>

          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import TeacherHeader from "@/components/TeacherHeader";
import axios from "axios";
import {ElMessageBox} from "element-plus";
// import {useRoute} from 'vue-router'
// const route = useRoute()

export default {
  name: "TeacherLiveCourse",
  components: {TeacherHeader},

  data() {
    let formRef = reactive(ref(null))
    let form = reactive({
      title: '',
      session: '',
      description: '',
      uploadVideo: []
    })
    let session_info = reactive({
      title: '',
      session: '',
      description: '',
      url: ''
    })

    return {
      session_cnt: 0,
      session_info,
      formRef,
      form,
      uploadActionUrl: 'http://localhost:8081/cloud_storage/file/uploading',
      form_dialog_visible: false,
      videoUrl: '',
      videoOptions: reactive({
        width: "100%", //播放器高度
        height: "550px", //播放器高度
        color: "#409eff", //主题色
        title: "test video", //视频名称
        src: "https://www.w3schools.com/html/movie.mp4", //视频源
        muted: false, //静音
        webFullScreen: false,
        speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
        autoPlay: false, //自动播放
        loop: false, //循环播放
        mirror: false, //镜像画面
        lightOff: true, //关灯模式
        volume: 0.3, //默认音量大小
        control: true, //是否显示控制
        controlBtns: [
          "audioTrack",
          "quality",
          "speedRate",
          "volume",
          "setting",
          "pip",
          "pageFullScreen",
          "fullScreen",
        ], //显示所有按钮,
      }),
      questionsVisible: false,
      questions: [
        {
          course_id: 'CS996',
          session_id: '1',
          questionType: 'T/F',
          title: 'Are you still alive?',
          choices: ['True', 'False', 'Not Given'],
          correctAnswer: ''
        },
        {
          course_id: 'CS996',
          session_id: '1',
          questionType: 'Choice',
          title: 'Which grade are you in?',
          choices: ['1', '2', '3', '4'],
          correctAnswer: ''
        }
      ]
    }
  },

  methods: {
    handleSuccess(resp) {
      console.log('视频存储url为: ' + resp.data.url)
      this.videoUrl = resp.data.url
    },

    confirmAddChapter() {

      axios({
        method: 'POST',
        url: 'http://localhost:8080/education/video/uploadVideoMeta',
        data: {
          course_id: this.$route.params.course_id,
          title: this.form.title,
          session: this.form.session,
          url: this.videoUrl,
          description: this.form.description
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
            this.getSessionsCount()
            this.cancelAddChapter()
          })

    },

    cancelAddChapter() {
      this.form_dialog_visible = false
      this.form.title = ''
      this.form.session = ''
      this.form.description = ''
      this.form.uploadVideo = []
      this.$refs.formRef.resetFields()
    },

    getSessionsCount() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/video/getSessionsCount?course_id=' + this.$route.params.course_id,
      }).then(response => {
        this.session_cnt = response.data.data.session_count
      })
    },

    getSessionInfo(session) {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/video/getSessionInfo?course_id=' + this.$route.params.course_id + '&session=' + session,
      }).then(response => {
        let resp = response.data.data.video
        this.session_info.title = resp.title
        this.session_info.session = resp.session
        this.session_info.description = resp.description
        this.session_info.url = resp.url
        this.videoOptions.src = resp.url
      })
    },

    handleCloseQuestions() {
      ElMessageBox.confirm('Are you sure you want to close this?')
          .then((value) => {
            console.log(value)
            if (value === 'confirm') {
              this.questionsVisible = false
            }
          })
          .catch(() => {
            // catch error
          })
    },

    confirmSave() {
      ElMessageBox.confirm('Are you sure you want to save your change?')
          .then((value) => {
            console.log(value)
            if (value === 'confirm') {
              this.questionsVisible = false
            }
          })
          .catch(() => {
            // catch error
          })
    }
  },

  mounted() {
    this.getSessionsCount()
  }
}
</script>

<style scoped>

</style>