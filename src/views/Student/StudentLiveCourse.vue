<template>
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
                <slot>Live Streaming Courses</slot>
              </template>
              <el-menu-item-group title="Group 1">
                <el-menu-item index="1-1">
                  Course 1
                </el-menu-item>
                <el-menu-item index="1-2">
                  Course 2
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu index="2">
              <template #title>
                <slot>Courses Replay</slot>
              </template>
              <el-menu-item-group title="Group 2">
                <el-menu-item index="2-1">
                  Course 3
                </el-menu-item>
                <el-menu-item index="2-2">
                  Course 4
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

          </el-menu>
        </el-aside>

        <el-main>
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

                  <el-button-group style="float: right">
                    <el-button>点赞</el-button>
                    <el-button>收藏</el-button>
                    <el-button>分享</el-button>
                  </el-button-group>
                </div>
              </el-col>

              <el-col :span="1"></el-col>

              <el-col :span="6" style="background-color: aliceblue">
                <div class="chat-room">
                  <h3>聊天内容/在线答题</h3>
                  <el-divider/>
                  <div class="barrage-body" id="barrage-list" style="height: 400px">
                    <div v-for="barrage in barrages" :key="barrage">
                      {{ barrage.user }}:{{ barrage.content }}
                    </div>
                  </div>
                  <el-divider/>
                  <div class="barrage-input">
                    <el-row>
                      <el-col :span="18">
                        <el-input type="text" placeholder="请输入弹幕"></el-input>
                      </el-col>
                      <el-col :span="6">
                        <el-button type="primary">发送</el-button>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {reactive} from "vue";
import StudentHeader from "@/components/StudentHeader";

export default {
  name: "StudentLiveCourse",
  components: {StudentHeader},
  data() {
    return {
      barrages: [
        {user: 'user1', content: 'hello'},
        {user: 'user2', content: 'bye'}
      ],
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
      })
    }
  },

  computed: {
    username() {
      return 'user'
    }
  }
}
</script>

<style scoped>

</style>