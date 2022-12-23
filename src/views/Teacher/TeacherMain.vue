<template>
  <div class="background">
    <div class="te">
      <el-main>
        <h1 align="center">Teacher Main Page</h1>
        <el-carousel>
          <el-carousel-item v-for="course in courses" :key="course">
            <h2>
              {{ course.course_id }}
            </h2>
          </el-carousel-item>
        </el-carousel>
      </el-main>
    </div>

  </div>
</template>

<script>

export default {
  name: "TeacherMain",

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
.background {
  background-color: rgb(243,244,246);
}
.te{
  width:80%;
  margin:0 auto;
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

</style>