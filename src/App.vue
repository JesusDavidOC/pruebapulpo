<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      people: [],
    };
  },
  async created() {
    let that = this;
  },
};
</script>

<style>
#app {
  font-family: Inter, sans-serif;
  font-size: 16px;
  line-height: 24px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  height: 100vh;
}
body {
  margin: 0;
}

.row [class*='col-'] {
    transition: all 0.5s ease-in-out;
}

</style>
