<template>
  <div class="background">
    <h1 align="center">Manager Course Center</h1>
    <div class="course-center-admin">
      <div>
        <el-radio-group v-model="selection" >
      </div>
      <div class="CourseApplications">
        <p>课程申请列表</p>
        <div v-for="course in CourseApplications" :key="course.id" style="margin: 20px">
          <el-descriptions title="Application" border>
            <template #extra>
              <el-button type="primary">Approve</el-button>
              <el-button type="danger">Reject</el-button>
            </template>
            <el-descriptions-item label="Name">{{ course.courseName }}</el-descriptions-item>
            <el-descriptions-item label="Teacher">{{ course.courseTeacher }}</el-descriptions-item>
            <el-descriptions-item label="Location">{{ course.courseLocation }}</el-descriptions-item>
            <el-descriptions-item label="Description">{{ course.courseDescription }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
      <el-divider style="margin:40px">
        <el-icon>
          <StarFilled/>
        </el-icon>
      </el-divider>
      <div class="ExistingCourses">
        <p>已有课程列表</p>
        <div v-for="course in ExistingCourses" :key="course.id" style="margin: 20px">
          <el-descriptions title="Course Information" border>
            <template #extra>
              <el-button type="primary">Edit</el-button>
              <el-button type="danger">Delete</el-button>
            </template>
            <el-descriptions-item label="Name">{{ course.courseName }}</el-descriptions-item>
            <el-descriptions-item label="Teacher">{{ course.courseTeacher }}</el-descriptions-item>
            <el-descriptions-item label="Location">{{ course.courseLocation }}</el-descriptions-item>
            <el-descriptions-item label="Description">{{ course.courseDescription }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "AdminCourse",

  data() {
    return {
      CourseApplications: [
        {
          id: 1,
          courseName: 'OOAD',
          courseTeacher: 'YUEMING ZHU',
          courseLocation: 'Lecture Hall',
          courseDescription: 'It\'s OK to work on an assignment with a friend, and think together' +
              'about the program structure, share ideas and even the global logic. At ' +
              'the time of actually writing the code, you should write it alone.'
        },
        {
          id: 2,
          courseName: 'DSAA',
          courseTeacher: 'BO TANG',
          courseLocation: 'Research Building',
          courseDescription: 'It\'s OK to work on an assignment with a friend, and think together' +
              'about the program structure, share ideas and even the global logic. At ' +
              'the time of actually writing the code, you should write it alone.'
        }
      ],

      ExistingCourses: [
        {
          id: 1,
          courseName: 'C++',
          courseTeacher: 'SHIQI YU',
          courseLocation: 'Lecture Hall',
          courseDescription: 'It\'s OK to work on an assignment with a friend, and think together' +
              'about the program structure, share ideas and even the global logic. At ' +
              'the time of actually writing the code, you should write it alone.'
        },
        {
          id: 2,
          courseName: 'JAVA',
          courseTeacher: 'MINGXIN HE',
          courseLocation: 'Lecture Hall 3',
          courseDescription: 'It\'s OK to work on an assignment with a friend, and think together' +
              'about the program structure, share ideas and even the global logic. At ' +
              'the time of actually writing the code, you should write it alone.'
        }
      ]
    }
  }
}
</script>

<style scoped>
.background {
  background-color: rgb(243, 244, 246);
}

.course-center-admin {
  width: 80%;
  margin: 0 auto;
  background-color: #fff;
}
</style>