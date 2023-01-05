<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      user_id: '',
      user_type: ''
    }
  },
  methods: {
    logOutHandler() {
      this.user_id = sessionStorage.getItem('USER_ID')
      this.user_type = sessionStorage.getItem('TYPE')

      if (this.user_id !== null && this.user_id !== undefined && this.user_id !== '') {
        localStorage.setItem('USER_CNT', '0')
        axios({
          method: 'GET',
          url: 'http://localhost:8080/education/login/exit?userId=' + this.user_id + '&userType=' + this.user_type,
        })
            .then(resp => {
              console.log(resp)
            })
      }
    }
  },

  mounted() {
    window.addEventListener('beforeunload', this.logOutHandler)
  },

  unmounted() {
    window.removeEventListener('beforeunload', this.logOutHandler)
  }
}
</script>

<style>
body, html, #app {
  /*overflow: hidden hidden;*/
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
