<template>
  <div class="detail_course">
    <!-- 页面头部 -->

    <el-main>
      <h3>video room</h3>
      <div class="live-room">
        <el-row :gutter="Number(30)">
          <el-col :span="18" style="background-color: #fff8c3">
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

          <el-col :span="6" style="background-color: aliceblue">
            <div>
              <h4>Playlist</h4>
              <el-scrollbar style="height: 150px">
                <el-card class="card_item" v-for="index in this.session_cnt" :key="index"
                         @click="getSessionInfo(index)">
                  <span class="card_content">Chapter {{ index }}</span>
                </el-card>
              </el-scrollbar>
            </div>

            <div class="session-info">
              <el-descriptions title="Session Information" border :column="Number(1)">
                <el-descriptions-item label="Title">{{ session_info.title }}</el-descriptions-item>
                <br>
                <el-descriptions-item label="Session">{{ session_info.session }}</el-descriptions-item>
                <br>
                <el-descriptions-item label="Description">{{ session_info.description }}</el-descriptions-item>
              </el-descriptions>
            </div>

            <div class="session-stats">
              <el-row>
                <el-col :span="Number(12)">
                  <el-tag style="margin-top: 40px; width: 110px; height: 40px; font-size: 14px;"
                          color="#FFFFFF"
                  >
                    观看进度
                  </el-tag>
                </el-col>
                <el-col :span="Number(12)">
                  <el-progress type="dashboard" :percentage="watchPercentage">
                    <template #default="{ percentage }">
                      <span class="percentage-value">{{ percentage }}%</span>
                      <span class="percentage-label">{{ progressStatus }}</span>
                    </template>
                  </el-progress>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="Number(12)">
                  <el-tag style="width: 110px; height: 40px; font-size: 14px;"
                          color="#FFFFFF"
                  >
                    章节分数
                  </el-tag>
                </el-col>

                <el-col :span="Number(12)">
                  <p>{{ this.videoScore + this.testScore}} / {{this.session_info.score}}</p>
                </el-col>
              </el-row>

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

      <el-dialog v-model="afkDialogVisible" title="AFK Checking" @close="passAfkCheck" width="30%">
        <h3>Are you still watching the video?</h3>
        <span>Countdown: {{ afkTimeString }}</span>
        <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="passAfkCheck">
                  Yes
                </el-button>
              </span>
        </template>
      </el-dialog>
    </el-main>
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
      url: '',
      score: ''
    })

    return {
      session_cnt: 0,
      session_info,
      currentSession: 1,
      watchPercentage: 0,
      videoScore: 0,
      testScore: 0,
      uploadActionUrl: 'http://localhost:8081/cloud_storage/file/uploading',
      form_dialog_visible: false,
      videoUrl: '',
      lastStartTime: 0,
      lastUpdateTime: 0,
      videoWatchTime: [],
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
        speed: true, // 进度条控制
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
      afkTimer: null,
      afkTimeInt: 90000,
      afkTimeString: '',
      afkDialogVisible: false,

      progressStatus: 'processing'
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
      this.currentSession = session
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/video/getSessionInfo?course_id=' + this.$route.params.course_id + '&session=' + session,
      }).then(response => {
        let resp = response.data.data.video
        this.session_info.title = resp.title
        this.session_info.session = resp.session
        this.session_info.description = resp.description
        this.session_info.url = resp.url
        this.session_info.score = resp.score
        this.videoOptions.src = resp.url
        setTimeout(this.monitorVideoStatus, 100)
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
      let video = document.getElementById("videoPlayer")
      video.pause()
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
              this.updateTestScore()
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

    passAfkCheck() {
      this.afkDialogVisible = false
      this.resetAfkTimer()
      let video = document.getElementById('videoPlayer')
      this.updateVideoScore()
      video.play()
    },

    monitorVideoStatus() {
      let _this = this
      let video = document.getElementById('videoPlayer')
      video.pause()
      _this.resetAfkTimer()
      _this.lastStartTime = Math.floor(video.currentTime)
      _this.lastUpdateTime = 0

      video.addEventListener(
          'loadedmetadata',
          function () {
            _this.videoWatchTime = new Array(Math.floor(video.duration)).fill(0)
          }
      )

      video.addEventListener(
          "timeupdate",
          function () {
            let totalTime;
            let duration;
            let currentTime;
            // 当前播放进度对应的秒数
            currentTime = Math.floor(video.currentTime)

            _this.videoWatchTime[currentTime] = 1
            if (Math.abs(currentTime - _this.lastUpdateTime) > 1) {
              _this.lastStartTime = currentTime
            }

            console.log(_this.lastStartTime)
            _this.lastUpdateTime = currentTime
            duration = currentTime - _this.lastStartTime;

            totalTime = Math.floor(video.duration);
            if (duration === Math.ceil(totalTime / 3)) {
              video.pause()
              _this.lastStartTime = currentTime
              _this.checkAFK()
            }
          },
          false
      )

      video.addEventListener("play", function () {
        // 监听  视频播放
        _this.lastStartTime = Math.floor(video.currentTime)
      })

      video.addEventListener("pause", function () {
        // 监听  视频暂停
      })

      video.addEventListener("ended", function () {
        // 监听  视频结束
        console.log(_this.videoWatchTime)
      })

      this.getVideoScore()
    },

    getVideoScore() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/video/getScore?course_id='
            + this.$route.params.course_id.trim() + '&session=' + this.currentSession + '&user=' + 'lsm@hhh.com'
      }).then(response => {
        console.log(response.data.data)
        this.videoScore = response.data.data.video_score
        this.testScore = response.data.data.test_score
        this.watchPercentage = (this.videoScore / (this.session_info.score - this.questions.length)).toFixed(2) * 100
      })
    },

    updateVideoScore() {
      let curVideoScore = 0

      for (let i = 0; i < this.videoWatchTime.length; i++) {
        curVideoScore += this.videoWatchTime[i]
      }

      if (curVideoScore >= this.videoWatchTime.length * 0.85) {
        curVideoScore = this.session_info.score - this.questions.length
      }

      this.videoScore = curVideoScore

      axios({
        method: 'POST',
        url: 'http://localhost:8080/education/video/updateVideoScore',
        data: {
          course_id: this.$route.params.course_id,
          session: this.currentSession,
          score: curVideoScore,
          user: 'lsm@hhh.com'
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
            console.log(response.data.message)
          })
    },

    updateTestScore() {
      let testScore = this.testScore

      axios({
        method: 'POST',
        url: 'http://localhost:8080/education/video/updateTestScore',
        data: {
          course_id: this.$route.params.course_id,
          session: this.currentSession,
          score: testScore,
          user: 'lsm@hhh.com'
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
            console.log(response.data.message)
          })
    }
  },

  mounted() {
    this.checkCheating()
    this.getSessionsCount()
    this.getSessionInfo(1)
    this.getVideoScore()
  },

  unmounted() {
    this.updateVideoScore()
    if (this.afkTimer !== null) {
      clearInterval(this.afkTimer)
    }
    let videoCnt = localStorage.getItem('VIDEO_CNT')
    videoCnt = (parseInt(videoCnt) - 1).toString()
    localStorage.setItem('VIDEO_CNT', videoCnt)
  }
}
</script>

<style scoped>
.detail_course {
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
}

.card_item {
  padding: 5px;
  height: 30px;
  font-size: 10px;
}

.card_content {

}

.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 26px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 14px;
}
</style>