<template>
  <div>
    <div>
      <!-- 页面头部 -->
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
                  <vue3-video-play id='videoPlayer' v-bind="videoOptions"></vue3-video-play>
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
                             @click="handleBeginQuestions">
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
                <p>{{ this.questionTimeString }}</p>
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

          <el-dialog v-model="afkDialogVisible" title="AFK Checking" width="30%">
              <h3>Are you still watching the video?</h3>
              <span>Countdown: {{afkTimeString}}</span>
            <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="() => {
                  this.resetAfkTimer();
                  let video = document.getElementById('videoPlayer')
                  video.play()
                }">
                  Yes
                </el-button>
              </span>
            </template>
          </el-dialog>
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script>
import {reactive, ref} from "vue";
import axios from "axios";
import {ElAlert, ElMessage, ElMessageBox} from "element-plus";
import router from "@/router";
import dayjs from "dayjs";
// import {useRoute} from 'vue-router'
// const route = useRoute()

export default {
  name: "StudentDetailCourse",

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
      videoStartTime: 0,
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
      questionTimer: '',
      questionTimeInt: 3600000,
      questionTimeString: '',
      afkTimer: '',
      afkTimeInt: 90000,
      afkTimeString: '',
      afkDialogVisible: false,
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

    startQuestionTimer() {
      this.convertQuestionTimeToString()
      this.questionTimer = setInterval(() => {
        this.questionTimeInt -= 1000
        this.convertQuestionTimeToString()
      }, 1000)
    },

    convertQuestionTimeToString() {
      let hour = Math.floor(this.questionTimeInt / (3600000))
      let minute = Math.floor((this.questionTimeInt - hour * 3600000) / 60000)
      let second = Math.floor((this.questionTimeInt - hour * 3600000 - minute * 60000) / 1000)
      this.questionTimeString = hour + ' Hour ' + minute + ' Minute ' + second + ' Second'
      if (hour === 0 && minute === 0 && second === 0) {
        alert("Time's up! Your answer has been submitted.")
        this.questionsVisible = false
        this.resetQuestionTimer()
      }
    },

    resetQuestionTimer() {
      clearInterval(this.questionTimer)
      this.questionTimeInt = 3600000
      this.convertQuestionTimeToString()
    },

    handleBeginQuestions() {
      ElMessageBox.confirm('Do you want to start the test right now?')
          .then((value) => {
            console.log(value)
            if (value === 'confirm') {
              this.questionsVisible = true
              this.startQuestionTimer()
            }
          })
          .catch(() => {
            // catch error
          })
    },

    handleCloseQuestions() {
      ElMessageBox.confirm('Are you sure you want to close this without submitting?', 'WARNING',
          {
            type: 'warning',
            callback: (value) => {
              console.log(value)
              if (value === 'confirm') {
                this.questionsVisible = false
                this.resetQuestionTimer()
              }
            }
          })
    },

    confirmSubmit() {
      ElMessageBox.confirm('Are you sure you want to submit?')
          .then((value) => {
            console.log(value)
            if (value === 'confirm') {
              this.questionsVisible = false
              this.resetQuestionTimer()
            }
          })
          .catch(() => {
            // catch error
          })
    },

    checkCheating() {
      let videoCnt = localStorage.getItem('VIDEO_CNT')
      if (videoCnt === null || videoCnt === '0') {
        videoCnt = '1'
        localStorage.setItem('VIDEO_CNT', videoCnt)
      } else {
        videoCnt = (parseInt(videoCnt) + 1).toString()
        localStorage.setItem('VIDEO_CNT', videoCnt)
        // alert('You have already open one course video!\nDO NOT CHEATING!')
        ElMessage({
          showClose: true,
          message: 'You have already open one course video!\\nDO NOT CHEATING!',
          type: 'error',
          center: true,
        })
        router.push('/userPage/StudentCourseCenter')
      }
    },

    startAfkTimer() {
      this.convertAfkTimeToString()
      this.afkTimer = setInterval(() => {
        this.afkTimeInt -= 1000
        this.convertAfkTimeToString()
      }, 1000)
    },

    convertAfkTimeToString() {
      let minute = Math.floor((this.afkTimeInt / 60000))
      let second = Math.floor((this.afkTimeInt - minute * 60000) / 1000)
      this.afkTimeString = minute + ' Minute ' + second + ' Second'
      if (minute === 0 && second === 0) {
        this.resetAfkTimer()
        ElMessageBox.alert('Sorry, you have been detected as AFK.', 'WARNING', {
          confirmButtonText: 'OK',
          type: 'error',
          callback: () => {
            router.push('/userPage/StudentCourseCenter')
          },
        })
      }
    },

    resetAfkTimer() {
      clearInterval(this.afkTimer)
      this.afkTimeInt = 90000
      this.convertAfkTimeToString()
    },

    checkAFK() {
      this.startAfkTimer()
      this.afkDialogVisible = true
    },

    monitorVideoStatus() {
      let _this = this
      let video = document.getElementById('videoPlayer')
      video.addEventListener(
          "timeupdate",
          function () {
            let totalTime;
            let currentTime;
            let duration;
            // 用秒数来显示当前播放进度
            currentTime = Math.floor(video.currentTime)
            duration = currentTime - _this.videoStartTime;
            totalTime = Math.floor(video.duration);
            if (duration > Math.ceil(totalTime / 3)) {
              video.pause()
              _this.videoStartTime = currentTime
              _this.checkAFK()
            }
          },
          false
      )

      video.addEventListener("play", function () {
        //监听  视频播放
        _this.videoStartTime = Math.floor(video.currentTime)
      })

      video.addEventListener("pause", function () {
        //监听  视频暂停
      })
    }
  },

  mounted() {
    this.checkCheating()
    this.getSessionsCount()
    this.monitorVideoStatus()
  },

  unmounted() {
    let videoCnt = localStorage.getItem('VIDEO_CNT')
    videoCnt = (parseInt(videoCnt) - 1).toString()
    localStorage.setItem('VIDEO_CNT', videoCnt)
  }
}
</script>

<style scoped>

</style>