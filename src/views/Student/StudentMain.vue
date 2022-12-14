<template>
  <div>
    <el-container>
      <el-header>
        <StudentHeader></StudentHeader>
      </el-header>
      <el-container>
        <el-main>
          <h1 align="center">Student Main Page</h1>
          <el-carousel>
            <el-carousel-item v-for="course in courses" :key="course">
              <h2>
                {{ course.course_id }}
              </h2>
            </el-carousel-item>
          </el-carousel>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import StudentHeader from "@/components/StudentHeader";
export default {
  name: "StudentMain",
  components: {StudentHeader},

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
        {
          course_id: 'CS309'
        }
      ]
    }
  },

  methods: {}
}
</script>

<style scoped>
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

</style>