<template>
<div class="general-history">
  <div class="block">
    <el-timeline>
      <el-timeline-item v-for="(item, index) in history" :key="index" timestamp="2022/12/17" placement="top">
        <el-card>
          <h4>{{item.title}}</h4>
          <p>{{item.teacher}} {{item.time}}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>  
</div>

</template>

<script>
export default {
  data() {
    return {
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
    getHistory() {
      //TODO:从数据库中获取历史记录
    }
  },
  mounted() {
    this.getHistory();
  }
}
</script>

<style scoped>
.general-history{
  width:80%;
  color: #000;
  margin:0 auto;
}

</style>