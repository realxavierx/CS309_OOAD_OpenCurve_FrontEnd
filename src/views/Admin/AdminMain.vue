<template>
  <div>
    <el-container>
      <el-header>
        <AdminHeader></AdminHeader>
      </el-header>

      <el-container>
        <el-main>
          <p>Administrator Main</p>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AdminHeader from "@/components/AdminHeader";
export default {
  name: "AdminMain",
  components: {AdminHeader}
}
</script>

<style scoped>

</style>