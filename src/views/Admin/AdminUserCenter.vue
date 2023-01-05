<template>
  <div>
    <el-container>

      <el-container>
        <el-main>
          <p>Users center</p>
          <el-row>
            <el-col v-for="user in Users" :key="user.id" :span="12" style="margin-bottom: 15px">
              <el-card>
                <el-row>
                  <el-col :span="12">
                    <img v-bind:src="user.avatar">
                  </el-col>
                  <el-col :span="12">
                    <h2 style="width: 100%">ID: {{user.id}}</h2>
                    <h2 style="width: 100%">Name: {{user.name}}</h2>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AdminHeader from "@/components/Header/AdminHeader";

export default {
  name: "AdminUserCenter",

  data() {
    return {
      Users: [
        {
          id: 10,
          name: 'XXX',
          avatar: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        },
        {
          id: 1,
          name: 'YYY',
          avatar: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        },
        {
          id: 2,
          name: 'ZZZ',
          avatar: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        },
        {
          id: 3,
          name: 'ZZZ',
          avatar: "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>