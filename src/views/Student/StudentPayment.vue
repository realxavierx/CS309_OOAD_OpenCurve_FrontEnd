<template>
  <iframe style="width: 100%; height: 800px;" id="iframe"></iframe>
</template>

<script>
import axios from "axios";

export default {
  name: "StudentPayment",

  data() {
    return {
     user_id: '',
     course_id: ''
    }
  },

  methods: {
    purchase() {
      axios({
        method: 'GET',
        url: 'http://localhost:8080/education/pay/purchase?courseId='
            + this.course_id + '&userId=' + this.user_id
      }).then(response => {
        console.log(this.user_id)
        console.log(this.course_id)
        console.log(response.data)
        const iframe = document.getElementById('iframe')
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document
        iframeDoc.write(response.data)
      })

    }
  },

  mounted() {
    this.user_id = this.$route.params.user_id
    this.course_id = this.$route.params.course_id
    this.purchase()
  }
}
</script>

<style scoped>

</style>