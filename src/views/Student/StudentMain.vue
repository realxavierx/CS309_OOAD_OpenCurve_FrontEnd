<template>
  <div class="background">
    <div class="mainPage-student">
      <h1 align="center">Student Main Page</h1>
      <el-carousel height="400px">
        <el-carousel-item v-for="item in imgList" :key="item.name">
          <img :src="item.url" style="height:100%;width:100%;cursor: pointer;" alt="图片丢失了" :title="item.course_id" @click="jumpToCourse(item.course_id)"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="mainPage-student tab">

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="推荐" name="first" >
          <el-timeline>
            <el-timeline-item v-for="(item, index) in history" :key="index" timestamp="2022/12/17" placement="top">
              <el-card >
                <h4>{{item.title}}</h4>
                <p>{{item.teacher}} {{item.time}}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>

        <el-tab-pane label="热榜" name="second">
          <el-timeline>
            <el-timeline-item v-for="(item, index) in history" :key="index" timestamp="2022/12/17" placement="top">
              <el-card>
                <h4>{{item.title}}</h4>
                <p>{{item.teacher}} {{item.time}}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-tab-pane>
          
        </el-tabs>
    </div>
  </div>
</template>

<script>
import router from "@/router/index"
export default {
  name: "StudentMain",

  data() {

    return {
      imgList: [],
      activeName: 'first',
      tabPosition: 'left',
      history: [
        {
          title: '高等数学（上）-1',
          teacher: '吴纪桃',
          time: '2022-12-17'
        },
        {
          title: '大学物理（上）-12',
          teacher: '鲁大为',
          time: '2022-12-17'
        },
        {
          title: '面向对象设计与分析-5',
          teacher: '张煜群',
          time: '2022-12-17'
        }
      ],
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
    },
    getBanner() {
      this.axios({
        method: 'GET',
        url: 'http://localhost:8082/banner/getBanner',
      }).then(response => {
        let resp = response.data.data
        this.imgList.push({
          course_id: resp.Banner1.course_id,
          url: resp.Banner1.url
        })
        this.imgList.push({
          course_id: resp.Banner2.course_id,
          url: resp.Banner2.url
        })
        this.imgList.push({
          course_id: resp.Banner3.course_id,
          url: resp.Banner3.url
        })
        this.imgList.push({
          course_id: resp.Banner4.course_id,
          url: resp.Banner4.url
        })
      })
    },
    jumpToCourse(course_id) {
      router.push({
        name: "StudentDetailCourse",
        params: {
          course_id: course_id
        }
      })
    }
  },
  mounted() {
    this.getBanner()
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