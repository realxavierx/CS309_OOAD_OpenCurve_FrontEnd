<template>
  <div>
    <el-container>
      <el-header>
        <StudentHeader></StudentHeader>
      </el-header>

      <el-container>
        <el-main>
          <el-table :data="notifications">
            <el-table-column label="Course" prop="course"></el-table-column>
            <el-table-column label="Title" prop="title"></el-table-column>
            <el-table-column label="Sender" prop="sender"></el-table-column>
            <el-table-column label="Modified Time" prop="time"></el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import StudentHeader from "@/components/StudentHeader";
export default {
  name: "StudentNotificationCenter",
  components: {StudentHeader},

  data() {

    return {
      notifications: [
        {
          course: 'OOAD',
          title: 'Notification 1',
          sender: 'AAAAA',
          time: '2022/09/01',
          message: 'asasasa'
        },
        {
          course: 'CPP',
          title: 'Notification 2',
          sender: 'BBBBBB',
          time: '2022/09/30',
          message: 'aaaaaaaa'
        },
        {
          course: 'JAVA',
          title: 'Notification 3',
          sender: 'CCCCC',
          time: '2022/10/15',
          message: 'asauequequ'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>