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
                  <el-descriptions title="Session Information" border column="1">
                    <el-descriptions-item label="Title">{{session_info.title}}</el-descriptions-item> <br>
                    <el-descriptions-item label="Session">{{session_info.session}}</el-descriptions-item> <br>
                    <el-descriptions-item label="Description">{{session_info.description}}</el-descriptions-item>
                  </el-descriptions>
                </el-col>
              </el-row>
            </div>


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
// import {useRoute} from 'vue-router'
// const route = useRoute()

export default {
  name: "StudentDetailCourse",
  components: {StudentHeader},

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
  },

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

    }
  },

  mounted() {
    this.getSessionsCount()
  }
}
</script>

<style scoped>

</style>