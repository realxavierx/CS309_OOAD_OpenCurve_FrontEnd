<template>
  <div class="detail_course">
    <!-- 页面头部 -->

    <h3> {{ course_id }}</h3>
    <div class="live-room">
      <el-row :gutter="Number(30)">
        <el-col :span="18">
          <div class="video-content">
            <canvas id="canvas" :width="this.screenWidth" :height="this.screenHeight"></canvas>
            <vue3-video-play id='videoPlayer' v-bind="videoOptions"></vue3-video-play>
          </div>
          <div class="student-functions">
            <el-input v-model="barrageMsg" @focus="readyToSendBarrage" placeholder="发一条友善的弹幕吧~" clearable>
              <template #append>
                <el-button type="primary" circle @click="sendBarrage">
                  <el-icon style="vertical-align: middle">
                    <Position/>
                  </el-icon>
                </el-button>
              </template>
            </el-input>
          </div>
        </el-col>

        <el-col :span="6">
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
                <p>{{ parseFloat(this.videoScore) + parseFloat(this.testScore) }} / {{ this.session_info.score }}</p>
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

    <div class="comment-area" style="margin-top: 20px">
      <el-tag style="width: 100%; height: 50px; font-size: 20px">Comments</el-tag>
      <el-input
          v-model="commentContent"
          placeholder="Please input">
        <template #append>
          <el-button type="primary" @click="postComment">发送</el-button>
        </template>
      </el-input>
      <el-timeline style="margin-top: 25px">
        <el-timeline-item v-for="comment in comments.filter((item) => item.father_comment_id === -1)" :key="comment"
                          :timestamp="comment.comment_date" placement="top">
          <div>
            <el-card class="father-comment">
              <h4 style="color: #409EFF">{{ comment.user_id }}</h4>
              <p>{{ comment.content }}</p>
              <el-popover placement="bottom" :width="600" trigger="click" @show="replyContent = ''">
                <template #reference>
                  <el-button style="margin-right: 16px">回复</el-button>
                </template>
                <el-input
                    v-model="replyContent"
                    placeholder="Please input your reply">
                  <template #append>
                    <el-button type="primary" @click="postReply(comment, comment)">发送</el-button>
                  </template>
                </el-input>
              </el-popover>
              <el-button v-if="show_sonComments.some((item) => item.comment_id === comment.id && item.show === true)"
                         type="primary" @click="show_sonComment(comment, false)">
                收起回复
              </el-button>
              <el-button v-if="show_sonComments.some((item) => item.comment_id === comment.id && item.show === false)"
                         type="primary" @click="show_sonComment(comment, true)">
                展开回复
              </el-button>
            </el-card>
            <div class="sonComment-area" style="margin-top: 10px"
                 v-if="show_sonComments.some((item) => item.comment_id === comment.id && item.show === true)">
              <el-timeline-item
                  v-for="sonComment in comments.filter((item) => item.father_comment_id === comment.id)"
                  :key="sonComment" :timestamp="sonComment.comment_date" placement="top">
                <el-card class="son-comment">
                  <el-row>
                    <h4 style="color: #409EFF">{{ sonComment.user_id }}</h4>
                    <p style="margin-top: 19px; margin-left: 8px; margin-right: 8px;"> reply to </p>
                    <h4 style="color: #409EFF"> {{ sonComment.reply_user_id }}</h4>
                  </el-row>

                  <p>{{ sonComment.content }}</p>
                  <el-popover placement="bottom" :width="600" trigger="click" @show="replyContent = ''">
                    <template #reference>
                      <el-button style="margin-right: 16px">回复</el-button>
                    </template>
                    <el-input
                        v-model="replyContent"
                        placeholder="Please input your reply">
                      <template #append>
                        <el-button type="primary" @click="postReply(comment, sonComment)">发送</el-button>
                      </template>
                    </el-input>
                  </el-popover>
                </el-card>
              </el-timeline-item>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
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
          <p>Your Highest Score: {{ this.testScore }}</p>
          <p>{{ this.questionTimeString }}</p>
          <div class="question-area" v-for="question in questions" :key="question">
            <h3>{{ question.title }}</h3>
            <el-radio-group v-model="question.answer">
              <el-radio v-for="choice in question.choices" :key="choice" :label="choice">{{ choice }}</el-radio>
            </el-radio-group>
          </div>
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
  </div>

</template>

<script>
import {reactive, ref} from "vue";
import axios from "axios";
import {ElMessage, ElMessageBox} from "element-plus";
import router from "@/router";
import {Barrage} from "@/components/Entity/Barrage"
import {Comment} from "@/components/Entity/Comment";
import dayjs from "dayjs";

// import {useRoute} from 'vue-router'
// const route = useRoute()

export default {
  name: "StudentDetailCourse",

  data() {
    let session_info = reactive({
      id: '',
      title: '',
      session: '',
      description: '',
      url: '',
      score: '',
      course_id: '',
      low_url: '',
      medium_url: ''
    })

    return {
      course_id: '',
      user_id: '',
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
        ], //显示所有按钮,
      }),
      // Text
      questionsVisible: false,
      questions: [],
      questionTimer: '',
      questionTimeInt: 3600000,
      totalTimeInt: 0,
      questionTimeString: '',
      progressStatus: 'watched',
      // Away From Keyboard
      afkTimer: null,
      afkTimeInt: 90000,
      afkTimeString: '',
      afkDialogVisible: false,
      // Barrage
      barrageMsg: "",
      barrageMsgList: [],
      curTime: 0,
      canvasTimer: null,
      screenWidth: 830,
      screenHeight: 200,
      // Comment
      comments: [],
      show_sonComments: [],
      commentContent: '',
      commentFatherId: -1,
      replyContent: '',
      networkTimer: null,
      now_url: ''
    }
  },

  methods: {

    getSessionsCount() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/video/getSessionsCount?course_id=' + this.course_id,
      }).then(response => {
        this.session_cnt = response.data.data.session_count
      })
    },

    getSessionInfo(session) {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/video/getSessionInfo?course_id=' + this.course_id + '&session=' + session,
      }).then(response => {
        this.session_info = response.data.data.video

        this.currentSession = this.session_info.session
        this.videoOptions.src = this.session_info.low_url
        this.now_url = this.session_info.low_url
        this.getTestBySession()
        this.getBarrage()
        this.getComment()
        setTimeout(this.monitorVideoStatus, 10)
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
      this.questionTimeInt = this.totalTimeInt
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
      let videoCnt = sessionStorage.getItem('VIDEO_CNT')
      if (videoCnt === null || videoCnt === '0') {
        videoCnt = '1'
        sessionStorage.setItem('VIDEO_CNT', videoCnt)
      } else {
        // alert('You have already open one course video!\nDO NOT CHEATING!')
        ElMessage({
          showClose: true,
          message: 'You have already open one course video!\n' +
              'DO NOT CHEATING!',
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

            if (_this.canvasTimer === null || _this.canvasTimer === undefined) {
              _this.canvasTimer = setInterval(() => {
                _this.notifyBarrages(video.currentTime)
                console.log(video.currentTime + ' notify')
              }, 20)
            }
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
            _this.curTime = currentTime

            _this.videoWatchTime[currentTime] = 1
            if (Math.abs(currentTime - _this.lastUpdateTime) > 1) {
              _this.lastStartTime = currentTime
            }

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
        console.log('play')

        if (_this.networkTimer === null || _this.networkTimer === undefined) {
          _this.networkTimer = setInterval(() => {
            _this.checkNetworkStatus()
          }, 2000)
        }

        _this.lastStartTime = Math.floor(video.currentTime)
      })

      video.addEventListener("pause", function () {
        // 监听  视频暂停
        clearInterval(_this.networkTimer)
      })

      video.addEventListener("ended", function () {
        // 监听  视频结束
        _this.updateVideoScore()
        _this.resetBarrages()
        clearInterval(_this.canvasTimer)
        clearInterval(_this.networkTimer)
      })

      this.getVideoScore()
    },

    checkNetworkStatus() {
      let video = document.getElementById('videoPlayer')
      let currentTime = video.currentTime
      let speed = window.navigator.connection.downlink
      video.pause()
      console.log('network: ' + speed)
      if (speed < 1) {
        if (this.now_url !== this.session_info.low_url) {
          this.videoOptions.src = this.session_info.low_url
          this.now_url = this.session_info.low_url
          video.currentTime = currentTime
          ElMessage({
            type: 'success',
            message: 'Change to low quality',
          })
        }
      } else if (speed < 3) {
        if (this.now_url !== this.session_info.medium_url) {
          this.videoOptions.src = this.session_info.medium_url
          this.now_url = this.session_info.medium_url
          video.currentTime = currentTime
          ElMessage({
            type: 'success',
            message: 'Change to medium quality',
          })
        }
      } else {
        if (this.now_url !== this.session_info.url) {
          this.videoOptions.src = this.session_info.url
          this.now_url = this.session_info.url
          video.currentTime = currentTime
          ElMessage({
            type: 'success',
            message: 'Change to high quality',
          })
        }
      }

      video.play()
    },

    getVideoScore() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/video/getScore?course_id='
            + this.course_id + '&session=' + this.currentSession + '&user=' + this.user_id
      }).then(response => {
        this.videoScore = response.data.data.video_score
        this.testScore = response.data.data.test_score
        this.watchPercentage = parseInt(
            (this.videoScore / (this.session_info.score - this.questions.length)).toFixed(2)) * 100
      })
    },

    updateVideoScore() {
      let curVideoScore = 0

      for (let i = 0; i < this.videoWatchTime.length; i++) {
        curVideoScore += this.videoWatchTime[i]
      }

      if (curVideoScore >= this.videoWatchTime.length * 0.95) {
        curVideoScore = this.session_info.score - this.questions.length
      } else {
        curVideoScore = (curVideoScore / this.videoWatchTime.length) * (this.session_info.score - this.questions.length)
      }

      this.videoScore = Math.max(curVideoScore, this.videoScore).toFixed(2)
      this.watchPercentage = parseInt((this.videoScore / (this.session_info.score - this.questions.length)).toFixed(2)) * 100

      axios({
        method: 'POST',
        url: 'http://localhost:8080/education/video/updateVideoScore',
        data: {
          course_id: this.course_id,
          session: this.currentSession,
          score: this.videoScore,
          user: this.user_id
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

    getTestBySession() {
      this.totalTimeInt = 0
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/video/getAllTestByCourseAndSession?course_id='
            + this.course_id + '&session=' + this.currentSession,
      }).then(response => {
        let tests = response.data.data.Tests
        console.log(tests)
        for (let test of tests) {
          this.questions.push({
            id: test.id,
            title: test.title,
            questionType: test.question_type,
            choices: test.choices.split(','),
            correctAnswer: test.correct_answer,
            time_limit: test.time_limit,
            answer: ref('')
          })

          this.totalTimeInt += 60000 * test.time_limit
        }

        this.questionTimeInt = this.totalTimeInt
      })
    },

    updateTestScore() {
      let curTestScore = 0
      for (let question of this.questions) {
        if (question.answer === question.correctAnswer) {
          curTestScore++
        }
      }

      if (curTestScore > this.testScore) {
        this.testScore = curTestScore
        axios({
          method: 'POST',
          url: 'http://localhost:8080/education/video/updateTestScore',
          data: {
            course_id: this.course_id,
            session: this.currentSession,
            score: this.testScore,
            user: this.user_id
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

    readyToSendBarrage() {
      let video = document.getElementById("videoPlayer")
      video.pause()
    },

    sendBarrage() {

      if (this.user_id) {
        if (this.barrageMsg) {
          let video = document.getElementById("videoPlayer");
          let currentTime = video.currentTime
          this.barrageMsgList.push(new Barrage(this.barrageMsg, currentTime, this.screenWidth, this.screenHeight))

          axios({
            method: "POST",
            url: "http://localhost:8080/education/barrage/save",
            data: {
              session_id: this.session_info.id,
              text: this.barrageMsg,
              time: currentTime
            },
            transformRequest: [function (data) {
              let str = "";
              for (let key in data) {
                str += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + "&";
              }
              return str;
            }]
          })
              .then(response => {
                console.log(response.data.message);
                alert('弹幕发送成功~')
                this.barrageMsg = ''
                video.play()
              });
        } else {
          alert('请输入弹幕内容~')
        }
      } else {
        alert('请登录后再发言~')
      }
    },

    getBarrage() {
      this.barrageMsgList = []
      axios({
        method: "GET",
        url: "http://localhost:8080/education/barrage/list?session_id=" + this.session_info.id,
      }).then(response => {
        let resp = response.data.data;
        for (let barrage of resp.barrages) {
          this.barrageMsgList.push(new Barrage(barrage.text, barrage.time, this.screenWidth, this.screenHeight))
        }
      });
    },

    notifyBarrages(currentTime) {
      let canvas = document.getElementById("canvas")
      let ctx = canvas.getContext("2d")
      ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);
      ctx.font = '20px Arial';
      ctx.fillStyle = '#ec7430';

      this.barrageMsgList.forEach((barrage) => {
        barrage.updatePosition(currentTime)
        if (barrage.positionX > (-barrage.text.length * 5)) {
          ctx.fillText(barrage.text, barrage.positionX, barrage.positionY)
        }
      })
    },

    resetBarrages() {
      let canvas = document.getElementById("canvas")
      let ctx = canvas.getContext("2d")
      ctx.clearRect(0, 0, this.screenWidth, this.screenHeight);

      this.barrageMsgList.forEach((barrage) => {
        barrage.generateStartPosition()
      })
    },

    getComment() {
      axios({
        method: "GET",
        url: "http://localhost:8080/education/comment/getComments?session_id=" + this.session_info.id,
      }).then(response => {
        let resp = response.data;
        console.log(resp.message)
        this.comments = resp.data.comments
        this.comments.forEach((comment) => {
          if (comment.father_comment_id === -1) {
            this.show_sonComments.push({comment_id: comment.id, show: false})
          }
        })
      });
    },

    postComment() {
      if (this.commentContent === '') return

      axios({
        method: "POST",
        url: "http://localhost:8080/education/comment/postComment",
        data: {
          content: this.commentContent,
          father_comment_id: -1,
          user_id: this.user_id,
          session_id: this.session_info.id,
          comment_date: dayjs().format("YYYY/MM/DD")
        },
        transformRequest: [function (data) {
          let str = "";
          for (let key in data) {
            str += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + "&";
          }
          return str;
        }]
      })
          .then(response => {
            console.log(response.data.message);
            this.getComment()
            this.commentContent = ''
          });
    },

    postReply(fatherComment, replyComment) {
      if (this.replyContent === '') return
      axios({
        method: "POST",
        url: "http://localhost:8080/education/comment/postReply",
        data: {
          content: this.replyContent,
          father_comment_id: fatherComment.id,
          user_id: this.user_id,
          session_id: this.session_info.id,
          comment_date: dayjs().format("YYYY/MM/DD"),
          reply_user_id: replyComment.user_id
        },
        transformRequest: [function (data) {
          let str = "";
          for (let key in data) {
            str += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]) + "&";
          }
          return str;
        }]
      })
          .then(response => {
            console.log(response.data.message);
            this.getComment()
            this.replyContent = ''
          });
    },

    show_sonComment(comment, expand) {
      for (let showSonComment of this.show_sonComments) {
        if (showSonComment.comment_id === comment.id) {
          if (expand) {
            showSonComment.show = true
          } else {
            showSonComment.show = false
          }
        }
      }
    }
  },

  mounted() {
    this.course_id = this.$route.params.course_id
    this.user_id = sessionStorage.getItem('USER_ID')
    this.checkCheating()
    this.getSessionsCount()
    this.getSessionInfo(1)
  },

  beforeUnmount() {
    clearInterval(this.afkTimer)
    clearInterval(this.canvasTimer)
    clearInterval(this.networkTimer)
    this.updateVideoScore()
    let videoCnt = parseInt(sessionStorage.getItem('VIDEO_CNT'))
    if (videoCnt <= 1) {
      sessionStorage.setItem('VIDEO_CNT', '0')
    }
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

.barrage_item {
  position: absolute;
  z-index: 20;
}

#canvas {
  position: absolute;
  z-index: 20;
  top: 60px;
}

#videoPlayer {
  position: absolute;
  z-index: 10;
}

.comment-area {
  margin-top: 25px;
}

.father-comment {

}

.son-comment {

}
</style>