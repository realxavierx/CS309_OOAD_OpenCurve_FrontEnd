<template>
  <div>
    <div>
      <!-- 页面头部 -->
      <el-container>
        <el-header>
          <StudentHeader></StudentHeader>
        </el-header>

        <el-container>
          <el-aside width="230px" style="background-color: #95c5ef">

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

                  <div>
                    <el-button style="margin-left: 10px; margin-right: 10px;"
                               type="primary"
                               @click="handleBeginTest">
                      开始做题
                    </el-button>
                  </div>

                </el-col>
              </el-row>
            </div>

            <el-drawer v-model="questionsVisible"
                       direction="rtl"
                       :before-close="handleCloseQuestions"
            >
              <template #title>
                <h4>Questions</h4>
              </template>
              <template #default>
                <div>
                  <p>{{this.timeString}}</p>
                  Hello there
                </div>
              </template>
              <template #footer>
                <div style="flex: auto">
                  <el-button @click="handleCloseQuestions">Cancel</el-button>
                  <el-button type="primary" @click="confirmSubmit">Submit</el-button>
                </div>
              </template>
            </el-drawer>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import axios from "axios";
import StudentHeader from "@/components/StudentHeader";
import {ElMessageBox} from "element-plus";
// import {useRoute} from 'vue-router'
// const route = useRoute()

export default {
  name: "StudentDetailCourse",
  components: {StudentHeader},

  data() {
    let session_info = reactive({
      title: '',
      session: '',
      description: '',
      url: ''
    })

    return {
      session_cnt: 0,
      session_info,
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
        speed: false, // 进度条控制
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
      ],
      timer: '',
      timeInt: 3600000,
      timeString: ''
    }
  },

  methods: {

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

    startTimer() {
      this.convertTimeToString()
      this.timer = setInterval(() => {
        this.timeInt -= 1000
        this.convertTimeToString()
      }, 1000)
    },

    convertTimeToString() {
      let hour = Math.floor(this.timeInt / (3600000))
      let minute = Math.floor((this.timeInt - hour * 3600000) / 60000)
      let second = Math.floor((this.timeInt - hour * 3600000 - minute * 60000) / 1000)
      this.timeString = hour + ' Hour ' + minute + ' Minute ' + second + ' Second'
    },

    resetTimer() {
      clearInterval(this.timer)
      this.timeInt = 3600000
      this.convertTimeToString()
    },

    handleBeginTest() {
      ElMessageBox.confirm('Do you want to start the test right now?')
          .then((value) => {
            console.log(value)
            if (value === 'confirm') {
              this.questionsVisible = true
              this.startTimer()
            }
          })
          .catch(() => {
            // catch error
          })
    },

    handleCloseQuestions() {
      ElMessageBox.confirm('Are you sure you want to close this without submitting?')
          .then((value) => {
            console.log(value)
            if (value === 'confirm') {
              this.questionsVisible = false
              this.resetTimer()
            }
          })
          .catch(() => {
            // catch error
          })
    },

    confirmSubmit() {
      ElMessageBox.confirm('Are you sure you want to submit?')
          .then((value) => {
            console.log(value)
            if (value === 'confirm') {
              this.questionsVisible = false
              this.resetTimer()
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