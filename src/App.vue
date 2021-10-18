<template>
  <div id="app" style="">
    <Topbar />
    <router-view :key="$route.path"/>
  </div>
</template>

<script>
import Topbar from "@/components/Topbar.vue";

export default {
  components: {
    Topbar,
  }
}
</script>

<style lang="scss">
body, html{
  //background-color: #e8dcd0;
  background-color: #ffffff;
  margin: auto 10px;
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
