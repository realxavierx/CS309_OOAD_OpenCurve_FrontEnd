<template>
  <div>
    <el-container>
      <el-container>
        <el-main>
          <p>Notification Center</p>

          <el-table :data="notifications">
            <el-table-column label="Course" prop="course"></el-table-column>
            <el-table-column label="Title" prop="title"></el-table-column>
            <el-table-column label="Sender" prop="sender"></el-table-column>
            <el-table-column label="Last Edit Time" prop="time"></el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "AdminNotificationCenter",

  data() {
    return {
      notifications: [
        {
          title: 'Notification 1',
          sender: 'AAAAA',
          time: '2022/09/01',
          course: 'Course 1'
        },
        {
          title: 'Notification 2',
          sender: 'BBBBBB',
          time: '2022/09/30',
          course: 'Course 2'
        },
        {
          title: 'Notification 3',
          sender: 'CCCCC',
          time: '2022/10/15',
          course: 'Course 3'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>