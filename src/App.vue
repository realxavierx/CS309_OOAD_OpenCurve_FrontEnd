<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      id: '',
      password: ''
    }
  },
  methods: {

    Login() {
      this.axios.get('/Login/' + this.id + '/' + this.password).then(function (resp) {
        console.log(resp);
        if (resp.state === true) {
          console.log("ok")
        }
      })
    }
  }
}
</script>

<style>
body, html, #app {
  overflow: hidden hidden;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
