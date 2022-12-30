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
  },

  beforeUnmount() {
    localStorage.clear()
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
