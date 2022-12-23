<template>
  <div class="background">
    <div class="mainPage-student">
      <h1 align="center">Student Main Page</h1>
      <el-carousel>
        <el-carousel-item v-for="course in courses" :key="course">
          <h2>
            {{ course.course_id }}
          </h2>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="mainpage-student tab">

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="关注" name="first"></el-tab-pane>
        <el-tab-pane label="推荐" name="second"></el-tab-pane>
        <el-tab-pane label="热榜" name="third"></el-tab-pane>
        <el-tab-pane label="按专业查看" name="fourth">
          <el-row class="tac">
            <el-col :span="4">
              <el-menu
                  default-active="2"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
              >
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon>
                      <location/>
                    </el-icon>
                    <span>计算机系</span>
                  </template>
                  <el-sub-menu index="1-1">
                    <template #title>计算机科学与技术</template>
                    <el-menu-item index="1-1-1">CS996</el-menu-item>
                    <el-menu-item index="1-1-2">CS101</el-menu-item>
                    <el-menu-item index="1-1-3">CS309</el-menu-item>
                  </el-sub-menu>
                  <el-sub-menu index="1-2">
                    <template #title>人工智能科学</template>
                    <el-menu-item index="1-2-1">CS405</el-menu-item>
                    <el-menu-item index="1-2-2">CS303</el-menu-item>
                  </el-sub-menu>
                </el-sub-menu>
                <el-sub-menu index="2">
                  <template #title>
                    <el-icon>
                      <location/>
                    </el-icon>
                    <span>电子系</span>
                  </template>
                  <el-sub-menu index="2-1">
                    <template #title>item four</template>
                    <el-menu-item index="2-1-1">item one</el-menu-item>
                  </el-sub-menu>
                </el-sub-menu>
                <el-sub-menu index="3">
                  <template #title>
                    <el-icon>
                      <location/>
                    </el-icon>
                    <span>生物系</span>
                  </template>
                  <el-sub-menu index="3-1">
                    <template #title>item four</template>
                    <el-menu-item index="3-1-1">item one</el-menu-item>
                  </el-sub-menu>
                </el-sub-menu>
              </el-menu>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentMain",

  data() {

    return {
      courses: [
        {
          course_id: 'CS102'
        },
        {
          course_id: 'CS202'
        },
        {
          course_id: 'CS209'
        },
        {
          course_id: 'CS303'
        },
      ],
      activeName: 'fourth',
      tabPosition: 'left'
    }
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }

  }
}
</script>

<style scoped>
.background {
  background-color: rgb(243, 244, 246);
}

.mainPage-student {
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
}

.el-carousel__item h2 {
  color: #1e1b1b;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #eef3bc;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #b2daaf;
}


.tab {
  margin-top: 20px;
}
</style>